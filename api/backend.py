# api/backend.py
from http.server import BaseHTTPRequestHandler
import json, sys

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        print("🌐  /api/backend called", file=sys.stderr)

        # read body
        length = int(self.headers.get("content-length", 0))
        raw = self.rfile.read(length).decode()
        try:
            body = json.loads(raw or "{}")
        except json.JSONDecodeError:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b'{"error":"Invalid JSON"}')
            return

        # echo back
        resp = json.dumps({"ok": True, "echo": body}).encode()

        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(resp)