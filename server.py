#!/usr/bin/env python3
# Copyright (C) 2026 Lenovo
# All Rights Reserved.
# Lenovo Confidential Restricted.

"""Local server for the kids knowledge audio player."""

from __future__ import annotations

import json
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent
MANIFEST = ROOT / "audio-manifest.json"
AUDIO_ROOT = ROOT / "audio" / "clips"


class PlayerHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self) -> None:
        route = self.path.split("?", 1)[0]
        if route == "/api/health":
            payload = json.dumps(
                {"ok": True, "service": "kids-news-player", "port": 8765},
                ensure_ascii=False,
            ).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)
            return
        if route == "/api/refresh":
            data = json.loads(MANIFEST.read_text(encoding="utf-8"))
            verified = []
            for story in data.get("stories", []):
                clips = {
                    voice: AUDIO_ROOT / voice / f"{story['id']}.mp3"
                    for voice in ("female", "male")
                }
                if all(path.is_file() and path.stat().st_size > 1000 for path in clips.values()):
                    verified.append(story)
            payload = json.dumps(
                {
                    "builtAt": data.get("builtAt"),
                    "targetDurationSec": data.get("targetDurationSec", 1200),
                    "voiceModels": data.get("voiceModels", {}),
                    "stories": verified,
                    "verifiedClipCount": len(verified) * 2,
                },
                ensure_ascii=False,
            ).encode("utf-8")
            self.send_response(200 if len(verified) >= 44 else 503)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.send_header("Content-Length", str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)
            return
        if route in ("/", "/index.html"):
            self.path = "/index-v2.html"
        super().do_GET()

    def log_message(self, format: str, *args) -> None:
        print(f"[kids-news] {self.address_string()} - {format % args}")


if __name__ == "__main__":
    server = ThreadingHTTPServer(("0.0.0.0", 8765), PlayerHandler)
    print("小小知识电台 running at http://127.0.0.1:8765/")
    server.serve_forever()
