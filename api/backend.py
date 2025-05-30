"""Serverless function that turns a transcript into a mind-map JSON.

Key points for readers unfamiliar with `BaseHTTPRequestHandler`:
• `self.rfile`  – a file-like stream from which request bytes can be read.
• `self.wfile` – a writable stream that sends bytes back to the client.
  Think of them as `request.body` and `response.write()` in other frameworks.
"""

from http.server import BaseHTTPRequestHandler
import json, os, sys
from typing import List, Optional

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
MODEL = "gpt-4o-mini"
# We clip to 20 000 chars (~8k tokens) as a safety guard; raise if you like.
MAX_CHARS = 20_000


SYSTEM_PROMPT = (
    "You are a helpful assistant that turns meeting transcripts into a JSON "
    "mind-map. Read the transcript and return a JSON object with two arrays: "
    "'nodes' and 'edges'. Each node must have: id (kebab-case, unique), label "
    "(human-readable), and optional importance 1-5. Each edge must have: "
    "source (node id), target (node id), optional relation string, and optional "
    "weight 1-5. Return *only* valid JSON – no markdown, no extra keys."
)


def build_map(text: str) -> MindMap:
    """Call GPT and validate the returned JSON against `MindMap`."""

    res = CLIENT.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": text[:MAX_CHARS]},
        ],
        response_format={"type": "json_object"},
        temperature=0.2,
    )
    print(f"GPT response: {res}")

    raw = res.choices[0].message.content  # already a JSON string

    try:
        return MindMap.model_validate_json(raw)
    except ValidationError as e:
        raise RuntimeError(f"Invalid LLM JSON: {e}\n{raw}") from e


# ──────────────────── HTTP handler class ──────────────────


class handler(BaseHTTPRequestHandler):
    def _json(self, code: int, obj):
        payload = json.dumps(obj).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(payload)

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