"""Serverless function that turns a transcript into a mind-map JSON.

Key points for readers unfamiliar with `BaseHTTPRequestHandler`:
• `self.rfile`  – a file-like stream from which request bytes can be read.
• `self.wfile` – a writable stream that sends bytes back to the client.
  Think of them as `request.body` and `response.write()` in other frameworks.
"""

from http.server import BaseHTTPRequestHandler
import json, os, sys
from typing import List, Optional
import time

from pydantic import BaseModel, ValidationError
from openai import OpenAI

# ───────────────────────── Schema ──────────────────────────


class Node(BaseModel):
    id: str
    label: str
    importance: Optional[int] = None  # 1-5


class Edge(BaseModel):
    source: str
    target: str
    relation: Optional[str] = None
    weight: Optional[int] = None  # 1-5


class MindMap(BaseModel):
    nodes: List[Node]
    edges: List[Edge]


# ────────────────── OpenAI companion function ──────────────


CLIENT = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
MODEL = "o4-mini-2025-04-16"
# We clip to 20 000 chars (~8k tokens) as a safety guard; raise if you like.
MAX_CHARS = 20_000


SYSTEM_PROMPT = (
    # ── ROLE ────────────────────────────────────────────────────────────
    "You are a meeting analyst who turns transcripts into an ultra-compact "
    "table-of-contents mind-map.\n\n"

    # ── OUTPUT CONTRACT ────────────────────────────────────────────────
    "Return ONE JSON object with exactly two arrays: 'nodes' and 'edges'. "
    "Do NOT add markdown, comments, or extra keys.\n\n"

    # ── GRAPH SHAPE (DAG) ──────────────────────────────────────────────
    "1. Level-0 root  – one node labelled with the meeting title.\n"
    "2. Level-1 topics – 3-8 major topics worth remembering.\n"
    "3. Level-2 call-outs – for each topic, 0-3 key Decisions / Action-Items / "
    "Risks.  If none, omit this level.\n"
    "The graph is a directed acyclic graph (parent → child).  No cycles.  "
    "Total nodes ≤ 20.\n\n"

    # ── FIELD SCHEMA (must match frontend) ─────────────────────────────
    "Node  { id, label, importance }\n"
    "Edge  { source, target, relation, weight }\n"
    "• id            = unique kebab-case string (e.g. 'budget-approval').\n"
    "• label         = ≤ 5 words, Title Case.\n"
    "• importance    = 5 for root, 3 for topics, 1 for call-outs.\n"
    "• relation      = 'includes' for every edge.\n"
    "• weight        = same value as the target node's importance.\n\n"

    # ── SELECTION RULES ────────────────────────────────────────────────
    "Before output, apply this relevance test:\n"
    "– Mention frequency, discussion duration, and presence of a decision/action "
    "(score each 0-1).  Average ≥ 0.5 to include.\n"
    "Merge overlapping topics; prune anything that fails the test.\n\n"

    # ── REMINDER ───────────────────────────────────────────────────────
    "Return ONLY valid JSON conforming to the schema above."
)


def build_map(text: str) -> MindMap:
    """Call GPT and validate the returned JSON against `MindMap`."""

    start = time.perf_counter()
    res = CLIENT.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": text[:MAX_CHARS]},
        ],
        response_format={"type": "json_object"}
    )
    elapsed_ms = round((time.perf_counter() - start) * 1000)
    print(f"🕒  {elapsed_ms}ms", file=sys.stderr)

    raw = res.choices[0].message.content  # JSON string from LLM

    try:
        mindmap = MindMap.model_validate_json(raw)
        preview = mindmap.model_dump()
        print(
            f"✅ nodes={len(preview['nodes'])} edges={len(preview['edges'])} "
            f"example-node={preview['nodes'][0]['id'] if preview['nodes'] else 'none'}",
            file=sys.stderr,
        )
        return mindmap
    except ValidationError as e:
        raise RuntimeError(f"Invalid LLM JSON: {e}\n{raw}") from e


# ──────────────────── HTTP handler class ──────────────────


class handler(BaseHTTPRequestHandler):
    def _set_cors(self):
        # Allow all origins for local development; tighten in prod if needed
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")

    def _json(self, code: int, obj):
        payload = json.dumps(obj).encode()
        self.send_response(code)
        self._set_cors()
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(payload)

    # Handle CORS pre-flight
    def do_OPTIONS(self):
        self.send_response(204)
        self._set_cors()
        self.end_headers()

    def do_POST(self):
        # 1️⃣  Grab body (could be 0-bytes)
        length = int(self.headers.get("content-length", 0))
        body = self.rfile.read(length).decode() if length else "{}"
        data = json.loads(body or "{}")
        text = (data.get("text") or "").strip()

        # Empty transcript → just return an empty map; no exceptions.
        if not text:
            print("ℹ️  empty transcript", file=sys.stderr)
            self._json(200, {"nodes": [], "edges": []})
            return

        # 2️⃣  Call GPT
        try:
            result = build_map(text)
            self._json(200, result.model_dump())
        except Exception as err:
            print("❌  backend error:", err, file=sys.stderr)
            self._json(500, {"error": "Mind-map generation failed"})


# ─────────────────────── Local test ───────────────────────


if __name__ == "__main__":
    transcript = sys.stdin.read()
    print(build_map(transcript).model_dump_json(indent=2))