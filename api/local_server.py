# api/local_server.py
from http.server import HTTPServer
from backend import handler           # ← the class you already have

if __name__ == "__main__":
    port = 5001
    print(f"🔌 local API on http://localhost:{port}/api/backend")
    HTTPServer(("0.0.0.0", port), handler).serve_forever()