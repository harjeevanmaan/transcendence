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


# ────────────────── Hard-coded sample mode ─────────────────
# Flip to False to restore "live" behaviour.
USE_SAMPLE = False

# Cache so the expensive OpenAI call happens only once.
_CACHED_SAMPLE_MAP: "MindMap | None" = None

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


def _build_map_openai(text: str) -> MindMap:
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


# Public helper that honours the USE_SAMPLE flag
def build_map(_: str | None = None) -> MindMap:
    global _CACHED_SAMPLE_MAP

    if not USE_SAMPLE:
        # Fall back to live behaviour
        return _build_map_openai(_ or "")

    # Sample mode
    if _CACHED_SAMPLE_MAP is None:
        print("⚡ Generating mind-map from hard-coded transcript …", file=sys.stderr)
        _CACHED_SAMPLE_MAP = _build_map_openai(SAMPLE_TRANSCRIPT)
    return _CACHED_SAMPLE_MAP


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

# The YouTube transcript you pasted.  Keep it verbatim so GPT has full context.
SAMPLE_TRANSCRIPT = """
00:00:00.640
two days ago i put together a video
00:00:03.040
listing out my training priorities and
00:00:05.680
probably what your training priorities
00:00:07.839
should be in terms of bag work sparring
00:00:10.719
shadow boxing skipping what is the most
00:00:13.120
important and where should you put your
00:00:14.719
focus but then i had a couple comments
00:00:17.680
people saying you should do this same
00:00:19.520
list but for beginners so today is a
00:00:22.880
training priority list for those people
00:00:25.920
looking to learn any striking style
00:00:29.039
could be kickboxing could be muay thai
00:00:31.519
could be karate we're going to break
00:00:33.280
down what you should be prioritizing and
00:00:36.000
what is the least important thing that
00:00:37.840
you don't need to worry about until you
00:00:39.440
get more to that intermediate level
00:00:42.740
[Music]
00:00:52.960
so me making a video called the most
00:00:55.440
important training priorities and not
00:00:57.680
really differentiating that this was
00:00:59.760
more for people who had an established
00:01:01.840
base in martial arts it's kind of my
00:01:03.920
fault i should have said this is for the
00:01:05.680
intermediate advanced guys and then i'll
00:01:07.600
follow up with a video like we're doing
00:01:09.280
today for the people who are beginners
00:01:11.360
because you don't want to be making the
00:01:12.799
mistake of prioritizing things that you
00:01:15.759
shouldn't even be moving on to yet for
00:01:17.840
example i listed pad work is number one
00:01:21.040
running is priority number two and
00:01:23.439
sparring is priority number three but
00:01:25.520
you don't really need to worry about any
00:01:26.960
of that until your skill level builds so
00:01:29.439
let's start off and move on to priority
00:01:32.079
number eight and we will work our way
00:01:34.479
from the least important all the way up
00:01:37.119
to the most important i gotta do that
00:01:39.119
work from bottom to top just to keep
00:01:41.200
everybody entertained and make sure you
00:01:43.119
guys don't just get point number one and
00:01:45.040
then skip out on the rest of the video
00:01:46.560
because it's important to have
00:01:48.079
everything properly listed out so
00:01:50.560
priority number eight
00:01:52.399
in my opinion is pad work and like i
00:01:55.360
said i listed this as the number one
00:01:57.600
most important thing that i would not be
00:01:59.439
willing to give up in my training camp
00:02:01.840
but as you are starting off it's not as
00:02:04.719
important as everything else we're gonna
00:02:06.399
list above because for me as i mentioned
00:02:09.199
pad work is that time where i can get a
00:02:11.920
simulation of hard sparring i can work
00:02:14.400
on my technique i can work on my defense
00:02:17.360
everything is together with a good pad
00:02:20.319
holder but you want to break things down
00:02:22.800
individually
00:02:24.239
when you are learning so pad work is not
00:02:26.560
something that you have to be focused on
00:02:28.480
even though it is absolutely one of the
00:02:30.400
most fun things you can do in the gym
00:02:32.480
priority number seven is to get your
00:02:34.959
clench work on point and we want to make
00:02:37.840
sure that clench work is coming along
00:02:40.000
because it doesn't matter if you're
00:02:41.040
doing mma
00:02:42.480
kickboxing muay thai the inside fight
00:02:45.680
game is neglected by many people and is
00:02:48.080
so darn important but there are other
00:02:51.519
things which are more important which we
00:02:53.599
will get to but you still want to make
00:02:55.519
sure this is added in keep in mind there
00:02:57.599
are some things that are so low on the
00:03:00.080
priority list that i didn't even list
00:03:01.519
them i just put down eight things which
00:03:03.440
you should be working on and kind of
00:03:05.120
ignored everything else things that you
00:03:07.280
don't even need to think about at this
00:03:09.040
moment but remember that clench work is
00:03:11.280
absolutely something you want to add in
00:03:13.440
and if it doesn't come around on your
00:03:15.280
first second third week of training
00:03:17.599
that's fine even if it takes a couple
00:03:19.280
months you will get there eventually but
00:03:21.680
don't let yourself wait for a super long
00:03:24.720
time because eventually you will want to
00:03:26.480
get this aspect of martial arts down pat
00:03:30.000
now next up i want to talk about
00:03:31.519
calisthenics
00:03:32.959
obviously
00:03:34.319
cardio is a massive massive part of
00:03:36.720
fight sports but you don't need to head
00:03:38.480
out and start doing the road work early
00:03:40.000
on because the cardio will come and you
00:03:42.319
can improve it but you do want to start
00:03:45.440
building your body strength especially
00:03:47.840
if you're a beginner how do we go about
00:03:49.360
doing that well we use calisthenics like
00:03:52.080
push-ups sit-ups squats body weight
00:03:55.280
exercises that are going to make you
00:03:56.959
that much stronger and help improve your
00:03:58.959
cardio so when you eventually do get to
00:04:01.200
that intermediate stage and start adding
00:04:03.519
in the running and the road work you're
00:04:05.840
not feeling out of your depth and your
00:04:07.599
cardio is already pretty high easy way
00:04:10.480
to add in these type of motions and to
00:04:12.319
challenge your heart rate is to do
00:04:13.840
something like circuits maybe you do
00:04:15.680
something like 30 seconds of push-ups 30
00:04:18.079
seconds of sit-ups 30 seconds of burpees
00:04:20.798
maybe 30 seconds of straight punches you
00:04:23.280
do that as fast as you can for two
00:04:24.880
minutes you take a one-minute break and
00:04:26.479
you repeat three times
00:04:28.400
exercises like this are very important
00:04:30.800
and they're going to benefit you as you
00:04:32.400
move forward in your martial arts career
00:04:35.120
or journey next up we are talking about
00:04:37.759
defense how do we deal with shots coming
00:04:40.479
at us and obviously it's not a priority
00:04:43.919
but we're not going to prioritize the
00:04:45.360
defense over the offense because the
00:04:47.120
very first thing is to get down all that
00:04:49.680
offense but the defense comes along very
00:04:52.000
quickly and you do not want to forget
00:04:53.680
about it in the beginner stages and i
00:04:56.240
preach on this channel so often that
00:04:58.960
many gyms do not spend enough time on
00:05:01.840
defense so if your instructor is not
00:05:04.400
taking time to teach you defense and
00:05:06.240
actually drill it grab somebody after
00:05:08.560
class and tell them throw a jab at me 10
00:05:11.360
times and you're going to work block
00:05:13.120
block all the different ways that you
00:05:15.199
might evade that jab and then have them
00:05:17.280
throw a round kick and then have them
00:05:18.639
throw the front kick you have to
00:05:20.560
prioritize the defense and make sure you
00:05:22.800
are learning it so that when we do
00:05:24.720
eventually get to sparring which isn't
00:05:26.720
even on this list sparring should not be
00:05:28.639
on the list because you're learning so
00:05:30.320
many other things first but when you do
00:05:32.080
get to your first sparring session you
00:05:34.080
have had time to practice your defense
00:05:36.800
next up and priority number four we are
00:05:39.520
talking about bag work i do not love bad
00:05:43.199
work myself and when i listed out my
00:05:45.919
training priorities it was way down low
00:05:48.800
but for somebody who is starting off bag
00:05:51.280
work is super important because as
00:05:54.160
opposed to pad work where somebody else
00:05:55.919
is rushing you telling you what to do on
00:05:58.240
bag work you can take your time you can
00:06:00.560
slow down and you're going to be
00:06:02.639
learning about hitting something solid
00:06:04.560
and making sure every bit of your
00:06:06.880
technique is correct if i throw my hook
00:06:08.720
like this i'm safe if i throw my hook
00:06:11.360
like that i'm going to probably end up
00:06:13.600
injuring something the wrist being the
00:06:16.080
part that's at risk the most right now
00:06:18.319
so the bag work is going to be a time to
00:06:20.319
keep you very honest in the quality of
00:06:22.639
your technique and you can slow things
00:06:25.039
down create your own combos in your mind
00:06:27.680
and let them go on the bag and in
00:06:30.160
addition as you're doing your bag work
00:06:31.919
you can work your defense which we
00:06:34.000
already talked about which was listed
00:06:35.840
just one below number four of bag work
00:06:39.199
now we're moving into the top three
00:06:40.960
priorities the very important ones if
00:06:43.440
you are starting off and we are focusing
00:06:46.319
now on footwork and in addition to
00:06:50.080
learning your footwork you can also say
00:06:52.400
that skipping is footwork as well so i
00:06:55.360
listed skipping super low super low down
00:06:58.240
i think it was like the last one number
00:06:59.919
10 on my list but as a beginner grabbing
00:07:03.120
the rope and learning to bounce around
00:07:04.960
and just get that movement in place is
00:07:07.039
great in addition to that you also want
00:07:09.440
to be practicing pushing backwards
00:07:12.000
forwards cutting off on angles using all
00:07:15.120
that together but skipping is a
00:07:16.880
fantastic way to start your footwork and
00:07:19.120
then in addition you can start
00:07:20.880
practicing moving forward and back in
00:07:23.199
your bag work and all those other
00:07:24.639
aspects but you do not want to be a
00:07:26.560
stationary target you don't want to be
00:07:28.240
somebody when you start sparring who is
00:07:30.639
just in one place and you only have your
00:07:33.280
offense and your defense but you forget
00:07:35.599
about the movement aspect so make sure
00:07:38.479
you add in your footwork very early on
00:07:41.599
definitely in the top three in the
00:07:43.440
priority list for me next up number two
00:07:46.720
on the priority list and something that
00:07:48.319
i put down again very low in my personal
00:07:51.199
training priorities as i get ready for a
00:07:53.120
fight is shadow boxing shadow boxing is
00:07:56.560
going to be so darn important because
00:07:59.520
unlike bag work you can throw
00:08:02.400
but not damage yourself you're not going
00:08:04.080
to hurt your fists your wrists your foot
00:08:06.960
your shins when you are shadow boxing
00:08:09.440
you can take your time throw everything
00:08:12.000
nice and fluid come back set your feet
00:08:15.039
on the ground work on some footwork work
00:08:17.120
on some defense you can put everything
00:08:19.039
together in shadow boxing at a pace that
00:08:22.240
you are comfortable with that is why
00:08:24.400
this is such an important aspect of
00:08:28.080
learning a martial art and really just
00:08:30.319
getting comfortable with the motions and
00:08:32.958
the final most important thing
00:08:36.000
in priority list when you are learning a
00:08:38.000
martial art is to get down the technique
00:08:41.279
and we are talking here strictly about
00:08:43.760
offense now i actually have a video
00:08:46.320
which is perfect for anybody out there
00:08:47.839
who is brand new you can follow along
00:08:49.519
it's a full-length 40 minute follow
00:08:51.680
along beginner tutorial on striking
00:08:54.160
technique perfect for anybody out there
00:08:56.480
but just keep in mind that the best
00:08:58.560
thing you can do on your first day is
00:09:00.160
just get into your stance boom boom
00:09:02.880
and you just run through the technique
00:09:04.880
you run through it until you feel really
00:09:06.800
comfortable then maybe you go through
00:09:08.399
your kick over and over and over and
00:09:10.800
then we work our way down in the list
00:09:12.720
once you have your technique down then
00:09:14.399
you move to the shadow boxing which we
00:09:16.000
mentioned then you can start working
00:09:17.920
your footwork after and then when you're
00:09:19.680
feeling good on all that you start
00:09:21.279
adding in bag work because you want to
00:09:23.120
start getting used to hitting something
00:09:24.880
solid work your way backwards once you
00:09:27.519
get the striking technique down very
00:09:30.560
important when you are a beginner in
00:09:32.399
martial arts to follow this list you
00:09:34.399
might not agree with me 100 you might
00:09:36.720
have other priorities you might want to
00:09:38.640
shuffle them a little bit but overall
00:09:41.040
this is sort of your bread and butter on
00:09:42.880
how to get better as fast as possible
00:09:45.680
you do not want to run in and start
00:09:47.600
doing long distance run or going and
00:09:50.000
focusing on sparring or trying to do
00:09:52.320
really hard pad work on your first days
00:09:54.240
you're going to make too many mistakes
00:09:55.600
and it's going to slow down your overall
00:09:57.760
progress of getting very good very fast
00:10:01.519
and that is my training priority list
00:10:04.320
for beginners if you know somebody out
00:10:06.399
there who would benefit from watching
00:10:08.079
this video please make sure you share it
00:10:09.760
with them if you enjoyed the video give
00:10:11.279
it a like if you haven't already join
00:10:13.040
the channel get subscribed for lots of
00:10:15.279
other videos coming at you daily and as
00:10:17.920
always guys train hard and i will see
00:10:19.680
you back here soon for another video
""".strip()
