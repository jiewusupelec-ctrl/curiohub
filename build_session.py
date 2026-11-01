#!/usr/bin/env python3
# Copyright (C) 2026 Lenovo
# All Rights Reserved.
# Lenovo Confidential Restricted.

"""
Build a ~20-minute 小小新闻电台 session:
  1) Gather CN + international kid-safe items
  2) Write host-style Chinese scripts
  3) Render with sherpa-onnx Matcha (icefall zh-baker + Vocos)
  4) Write audio/session-current.mp3 + session-meta.json

Usage:
  python3 build_session.py
  python3 build_session.py --slot morning
Cron example (local time):
  0 7,17 * * * cd /path/to/kids-news-player && python3 build_session.py
"""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
import tempfile
import time
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parent
TTS_DIR = ROOT / "tts-models"
MATCHA_DIR = TTS_DIR / "matcha-icefall-zh-baker"
VOCODER = TTS_DIR / "vocos-22khz-univ.onnx"
# Piper kept only as last-resort fallback if Matcha assets missing
PIPER_VOICE = TTS_DIR / "zh_CN-huayan-medium.onnx"
PIPER_CFG = TTS_DIR / "zh_CN-huayan-medium.onnx.json"
AUDIO_DIR = ROOT / "audio"
META_PATH = ROOT / "session-meta.json"
OFFLINE_PATH = ROOT / "offline-news.json"
CN_CACHE = ROOT / "cn-bundled-news.json"

TARGET_SECONDS = 20 * 60
PIPER = os.path.expanduser("~/.local/bin/piper")
UA = "Mozilla/5.0 KidsNewsBot/1.0 (educational; local static player)"
VOICE_LABEL = "sherpa-onnx Matcha icefall-zh-baker + Vocos (native Mandarin female)"
VOICE_LICENSE = (
    "sherpa-onnx Apache-2.0; Matcha/icefall code Apache-2.0; "
    "Baker/Biaobei dataset non-commercial; Vocos model per sherpa-onnx release"
)

BLOCK = re.compile(
    r"战争|武器|杀人|谋杀|恐怖|炸弹|枪击|死亡|自杀|暴力|犯罪|色情|赌博|股市|选举|政变|"
    r"war|weapon|kill|murder|terror|bomb|shoot|death|suicid|crime|sexual|election|scandal",
    re.I,
)
ALLOW = re.compile(
    r"科学|航天|太空|火箭|卫星|动物|植物|自然|环境|地理|发明|节日|文化|运动|图书馆|社区|"
    r"天文|生物|海洋|气候|故宫|月饼|中秋|蜜蜂|水豚|火星|望远镜|跳绳|科普|"
    r"science|space|nasa|animal|plant|nature|festival|invent|sport|moon|mars|bee|zoo",
    re.I,
)

BRIDGES = [
    "",
    "接下来，",
    "再说一件。",
    "咦，还有这个——",
    "我们换个方向听听。",
    "对了，",
    "再往远处看看：",
    "你听过这件事吗？",
    "还有一条挺有意思的。",
]


def fetch(url: str, timeout: int = 25) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read().decode("utf-8", "ignore")


def strip_html(s: str) -> str:
    s = re.sub(r"<[^>]+>", " ", s or "")
    return re.sub(r"\s+", " ", s).strip()


def parse_rss(xml: str, source: str, region: str) -> list[dict]:
    try:
        root = ET.fromstring(xml)
    except ET.ParseError:
        return []
    items = []
    for node in root.findall(".//item")[:20]:
        title = strip_html((node.findtext("title") or ""))
        desc = strip_html(node.findtext("description") or node.findtext("summary") or "")
        link = (node.findtext("link") or "").strip()
        blob = f"{title} {desc}"
        if not title or BLOCK.search(blob):
            continue
        if not ALLOW.search(blob) and source != "NASA 每日一图":
            continue
        if re.search(r"watch newsround|signed and subtitled", blob, re.I):
            continue
        items.append(
            {
                "title": title,
                "summary": desc[:280],
                "link": link,
                "source": source,
                "region": region,
            }
        )
    return items


def scrape_ccppg() -> list[dict]:
    """中国少年报 / 中少在线 — HTML titles (summarize + attribute)."""
    try:
        html = fetch("https://www.ccppg.cn/zgsnb/")
    except Exception as e:
        print("ccppg scrape failed:", e, file=sys.stderr)
        return []
    text = re.sub(r"<script[\s\S]*?</script>", " ", html, flags=re.I)
    text = re.sub(r"<style[\s\S]*?</style>", " ", text, flags=re.I)
    text = re.sub(r"<[^>]+>", "\n", text)
    lines = [re.sub(r"\s+", " ", ln).strip() for ln in text.splitlines()]
    pairs = []
    buf = [ln for ln in lines if 8 <= len(ln) <= 80 and re.search(r"[\u4e00-\u9fff]{4,}", ln)]
    skip = re.compile(
        r"声明|备案|地铁|地址|协会|公司|订阅|登录|版权|先锋队网|中少在线$|红领巾|书记|习近平|发力方向|手机沉迷|好习惯养成总犯难"
    )
    # keep kid-safe science/life/culture-ish
    prefer = re.compile(
        r"谣言|冰水|守护者|运动|打卡|故宫|书信|蜗牛|科学|身体|冬天|比赛|花|动物|自然|航天|卫星|皮肤"
    )
    i = 0
    while i < len(buf) - 1:
        t, d = buf[i], buf[i + 1]
        if skip.search(t) or skip.search(d):
            i += 1
            continue
        blob = t + d
        if BLOCK.search(blob):
            i += 1
            continue
        if prefer.search(blob) or ALLOW.search(blob):
            pairs.append(
                {
                    "title": t,
                    "summary": d,
                    "link": "https://www.ccppg.cn/zgsnb/",
                    "source": "中国少年报 / 中少在线",
                    "region": "国内",
                }
            )
        i += 2
    return pairs[:8]


def curated_cn_space() -> list[dict]:
    """Recent public CNSA-style space headlines (summarized; attributed)."""
    return [
        {
            "title": "朱雀二号改进型火箭把卫星送上天",
            "summary": "商业火箭飞行试验成功，多颗卫星进入预定轨道。",
            "link": "https://www.cnsa.gov.cn/",
            "source": "国家航天局（公开要闻摘要）",
            "region": "国内",
        },
        {
            "title": "长征系列火箭又一次发射成功",
            "summary": "海南商业航天发射场，卫星互联网低轨卫星顺利入轨。",
            "link": "https://www.cnsa.gov.cn/",
            "source": "国家航天局（公开要闻摘要）",
            "region": "国内",
        },
        {
            "title": "它们的名字叫“长征”",
            "summary": "长征系列运载火箭陪伴中国航天走过很多年。",
            "link": "https://www.cnsa.gov.cn/",
            "source": "国家航天局（公开要闻摘要）",
            "region": "国内",
        },
    ]


def load_offline() -> list[dict]:
    data = json.loads(OFFLINE_PATH.read_text(encoding="utf-8"))
    return data.get("items") or []


def topic(blob: str) -> str:
    t = blob.lower()
    rules = [
        ("space", r"太空|航天|火箭|卫星|火星|月亮|望远镜|nasa|space|mars|orbit"),
        ("animal", r"动物|蜜蜂|水豚|蜗牛|鸟|zoo|animal|bee"),
        ("nature", r"植物|花|自然|海洋|光合作用|plant|nature|coral"),
        ("environment", r"环境|气候|回收|环保|environment|climate|recycle"),
        ("culture", r"节日|中秋|月饼|故宫|樱花|文化|festival|culture"),
        ("geography", r"地理|黄河|地图|火山|geography"),
        ("tech", r"发明|科技|纸箱|机器人|invent|tech|robot"),
        ("sport", r"运动|跳绳|打卡|sport|olympic"),
        ("civic", r"图书馆|社区|公共|library|community"),
        ("science", r"科学|谣言|冰水|身体|science|research"),
    ]
    for name, pat in rules:
        if re.search(pat, t, re.I):
            return name
    return "wonder"


def expand_story(text: str, item: dict) -> str:
    """Lengthen into a fuller spoken story (concrete news/科普 only)."""
    summary = zh_speakable(item.get("summary") or "")
    base = text.strip()
    if summary and summary not in base:
        base += f"报道里还提到：{summary}"
    bucket = topic(f"{item.get('title','')} {item.get('summary','')}")
    beat = {
        "space": "太空探索像拼图，每一张照片、每一次发射，都多拼上一小片。火箭离开地面之后，卫星还要自己找准轨道，才能开始工作。",
        "animal": "动物世界里，耐心观察比大声惊叹更重要。它们的吃食、休息和玩耍，都藏着适应环境的小智慧。",
        "nature": "自然变化常常很慢，慢，才让人看得清楚。一棵树、一片海、一场季节的转换，都值得再看一眼。",
        "environment": "环保故事最好带着希望：蜜蜂回来了，树林更绿了，大家也能做得到一点点。",
        "culture": "节日和文化让日子更有味道。食物、歌谣和结伴出门，都是在说：我们在一起。",
        "geography": "地理不只是地名，还是风、水、山怎么安排人们的生活。地图上的一条线，背后可能是一条真的大河。",
        "tech": "发明常常从生活里的一点点不方便开始。先试试看，再改一改，新东西就慢慢出现了。",
        "sport": "运动故事里，开心和坚持往往比输赢更长久。出汗之后喝口水、加件衣服，也是一种照顾自己。",
        "civic": "社区里的图书馆和公园，靠大家轻轻使用、轮流分享，才能一直开着。",
        "science": "科学鼓励我们问为什么，也鼓励我们找靠谱的答案，而不是只听传说。",
        "wonder": "新鲜事听多了，心里的地图会一点点变大。",
    }[bucket]
    return f"{base}{beat}"


def host_script(item: dict, index: int) -> str:
    if item.get("script") and index == 0:
        return zh_speakable(item["script"], item["script"])
    if item.get("script"):
        s = zh_speakable(item["script"].strip(), item["script"].strip())
        if re.match(r"^(接下来|再说|咦|对了|还有|我们换|你听过|再往)", s):
            return s
        return f"{BRIDGES[index % len(BRIDGES)]}{s}" if index else s

    bridge = BRIDGES[index % len(BRIDGES)] if index else ""
    raw_title = item["title"]
    raw_summary = item.get("summary") or ""
    bucket = topic(f"{raw_title} {raw_summary}")
    title = zh_speakable(raw_title, "国外小朋友关心的一条新鲜事")
    summary = zh_speakable(raw_summary, "消息来自国际儿童新闻，我们用中文慢慢讲。")
    if not re.search(r"[\u4e00-\u9fff]", raw_title):
        # English headline: don't read Latin aloud; paraphrase by topic.
        title = {
            "space": "太空里又有新照片或新发现",
            "animal": "动物朋友的一条消息",
            "nature": "大自然的一条消息",
            "environment": "环保方面的一条消息",
            "culture": "节日或文化方面的一条消息",
            "geography": "地图和地理方面的一条消息",
            "tech": "发明和科技方面的一条消息",
            "sport": "运动场上的一条消息",
            "civic": "社区和公共生活的一条消息",
            "science": "科学角的一条消息",
            "wonder": "一条值得听听的新鲜事",
        }[bucket]
        summary = "国外儿童媒体报道了这件事，我们把它讲成中文小故事。"
    bodies = {
        "space": f"{bridge}太空和航天这边：{title}。{summary}火箭把卫星送到天上，像给地球请来新的小伙伴。抬头看看夜空，说不定哪一闪就是人造卫星。",
        "animal": f"{bridge}动物朋友出场：{title}。{summary}轻轻看、安静听，它们会更自在。",
        "nature": f"{bridge}大自然也有消息：{title}。{summary}花草树木每天都在悄悄忙活。",
        "environment": f"{bridge}环保小故事：{title}。{summary}保护蜜蜂、树林和干净的水，我们也能帮一点小忙。",
        "culture": f"{bridge}节日和文化：{title}。{summary}世界各地过节的方式不一样，开心团圆的感觉却很像。",
        "geography": f"{bridge}地图上的故事：{title}。{summary}用手指描一描路线，方位就记在心里了。",
        "tech": f"{bridge}发明和科技：{title}。{summary}好多好点子，开始时只是一句“能不能更方便一点？”",
        "sport": f"{bridge}运动场上：{title}。{summary}先活动开，再认真玩，出汗了记得加件衣服。",
        "civic": f"{bridge}社区里：{title}。{summary}图书馆、公园是大家一起用的好地方。",
        "science": f"{bridge}科学角：{title}。{summary}多问一个为什么，世界会清楚一点点。",
        "wonder": f"{bridge}今天还有一件事：{title}。{summary}",
    }
    return bodies[bucket]


def gather() -> list[dict]:
    items: list[dict] = []
    # Chinese
    items.extend(scrape_ccppg())
    items.extend(curated_cn_space())
    # International RSS
    feeds = [
        ("BBC Newsround", "https://feeds.bbci.co.uk/newsround/rss.xml", "国际"),
        ("TIME for Kids", "https://www.timeforkids.com/k1/feed/", "国际"),
        ("NASA 每日一图", "https://www.nasa.gov/feeds/iotd-feed/", "国际"),
        ("Science News Explores", "https://www.snexplores.org/feed", "国际"),
    ]
    for name, url, region in feeds:
        try:
            xml = fetch(url)
            got = parse_rss(xml, name, region)
            print(f"ok {name}: {len(got)}")
            items.extend(got)
        except Exception as e:
            print(f"fail {name}: {e}", file=sys.stderr)

    # Offline pack fills gaps / Chinese depth
    items.extend(load_offline())

    # Dedup + variety
    seen = set()
    bucket_counts: dict[str, int] = {}
    unique = []
    for it in items:
        key = it["title"][:40]
        if key in seen:
            continue
        b = topic(f"{it['title']} {it.get('summary','')}")
        if bucket_counts.get(b, 0) >= 6:
            continue
        seen.add(key)
        bucket_counts[b] = bucket_counts.get(b, 0) + 1
        unique.append(it)
        if len(unique) >= 36:
            break
    return unique


def estimate_chars_for_20min() -> int:
    # Matcha Baker @ speed≈0.95, Mandarin-only scripts ≈ ~5.0 Han chars/sec
    # (incl. inter-segment gaps). Pad so real MP3 lands ≥20:00.
    return int(TARGET_SECONDS * 5.25)


def zh_speakable(text: str, fallback: str = "") -> str:
    """Drop Latin runs so Matcha lexicon stays Mandarin-only."""
    s = re.sub(r"[A-Za-z][A-Za-z0-9'’\-./]{1,}", " ", text or "")
    s = re.sub(r"\s+", " ", s).strip(" ，,;；")
    if re.search(r"[\u4e00-\u9fff]", s):
        return s
    return fallback


def matcha_ready() -> bool:
    need = [
        MATCHA_DIR / "model-steps-3.onnx",
        MATCHA_DIR / "lexicon.txt",
        MATCHA_DIR / "tokens.txt",
        MATCHA_DIR / "dict",
        VOCODER,
    ]
    return all(p.exists() for p in need)


def make_matcha_tts():
    import sherpa_onnx

    rule_fsts = ",".join(
        str(MATCHA_DIR / name)
        for name in ("phone.fst", "date.fst", "number.fst")
        if (MATCHA_DIR / name).exists()
    )
    cfg = sherpa_onnx.OfflineTtsConfig(
        model=sherpa_onnx.OfflineTtsModelConfig(
            matcha=sherpa_onnx.OfflineTtsMatchaModelConfig(
                acoustic_model=str(MATCHA_DIR / "model-steps-3.onnx"),
                vocoder=str(VOCODER),
                lexicon=str(MATCHA_DIR / "lexicon.txt"),
                tokens=str(MATCHA_DIR / "tokens.txt"),
                dict_dir=str(MATCHA_DIR / "dict"),
                noise_scale=1.0,
                length_scale=1.0,
            ),
            num_threads=max(2, (os.cpu_count() or 4) // 2),
            provider="cpu",
        ),
        rule_fsts=rule_fsts,
        max_num_sentences=2,
        silence_scale=0.35,
    )
    if not cfg.validate():
        raise SystemExit("Invalid Matcha TTS config")
    return sherpa_onnx.OfflineTts(cfg)


def render_matcha(segments: list[dict], wav_path: Path) -> float:
    """Synthesize all segments; return wall-clock seconds."""
    import soundfile as sf

    tts = make_matcha_tts()
    chunks: list[np.ndarray] = []
    sample_rate = 22050
    gap = np.zeros(int(0.45 * sample_rate), dtype=np.float32)
    t0 = time.time()
    for i, seg in enumerate(segments):
        text = (seg.get("text") or "").strip()
        if not text:
            continue
        audio = tts.generate(text, sid=0, speed=0.95)
        sample_rate = int(audio.sample_rate)
        samples = np.asarray(audio.samples, dtype=np.float32)
        chunks.append(samples)
        chunks.append(gap)
        if i % 5 == 0 or i == len(segments) - 1:
            elapsed = time.time() - t0
            dur = sum(len(c) for c in chunks) / sample_rate
            print(f"  tts {i+1}/{len(segments)} audio≈{dur:.0f}s wall≈{elapsed:.1f}s", flush=True)
    if not chunks:
        raise SystemExit("No audio generated")
    out = np.concatenate(chunks)
    # trim trailing gap
    if len(out) > len(gap):
        out = out[: -len(gap)]
    sf.write(str(wav_path), out, sample_rate)
    return time.time() - t0


def build_scripts(items: list[dict], slot: str) -> list[dict]:
    greet = (
        "早上好，我是小小新闻电台。今天早报开始啦，我们一条一条慢慢听。"
        if slot == "morning"
        else "傍晚好，我是小小新闻电台。晚报准备好了，我们一起听听今天的新鲜事。"
    )
    segs = [{"id": "intro", "title": "开场", "text": greet, "kind": "intro", "source": "", "region": ""}]
    need = estimate_chars_for_20min()
    total = len(greet)
    for i, it in enumerate(items):
        text = expand_story(host_script(it, i), it)
        segs.append(
            {
                "id": it.get("id") or f"story-{i}",
                "title": it["title"],
                "text": text,
                "kind": "story",
                "source": it.get("source", ""),
                "region": it.get("region", ""),
                "link": it.get("link", ""),
            }
        )
        total += len(re.sub(r"\s+", "", text))
        # Prefer ≥20:00 fill, but stop once char budget is met (min 10 stories).
        if total >= need and i >= 9:
            break
    # If still short, cycle offline / gathered stories with fresh host wording
    offline = load_offline()
    pool = items + offline
    j = 0
    while total < need and j < 80:
        it = pool[j % len(pool)]
        text = expand_story(host_script({**it, "script": None}, len(segs) + j), it)
        if segs and segs[-1]["title"] == it["title"]:
            j += 1
            continue
        segs.append(
            {
                "id": f"extra-{j}",
                "title": it["title"],
                "text": text,
                "kind": "story",
                "source": it.get("source", ""),
                "region": it.get("region", ""),
            }
        )
        total += len(re.sub(r"\s+", "", text))
        j += 1
    segs.append(
        {
            "id": "outro",
            "title": "结束",
            "text": "好，今天就讲到这儿。谢谢你听完，我们下次早报或晚报再见。",
            "kind": "outro",
            "source": "",
            "region": "",
        }
    )
    print(f"script chars≈{total}, segments={len(segs)}")
    return segs


def render_piper_fallback(segments: list[dict], wav_path: Path) -> float:
    """Trivial fallback only if Matcha models are missing."""
    if not PIPER_VOICE.exists() or not Path(PIPER).exists():
        raise SystemExit(
            f"Matcha TTS missing under {MATCHA_DIR} and Piper fallback unavailable."
        )
    text = "\n".join(s["text"] for s in segments)
    with tempfile.NamedTemporaryFile("w", encoding="utf-8", suffix=".txt", delete=False) as f:
        f.write(text)
        txt_path = f.name
    cmd = [
        PIPER,
        "-m",
        str(PIPER_VOICE),
        "-c",
        str(PIPER_CFG),
        "-i",
        txt_path,
        "-f",
        str(wav_path),
        "--length-scale",
        "1.12",
        "--sentence-silence",
        "0.55",
    ]
    print("WARN: Matcha missing; Piper fallback:", " ".join(cmd), file=sys.stderr)
    t0 = time.time()
    subprocess.check_call(cmd)
    os.unlink(txt_path)
    return time.time() - t0


def wav_to_mp3(wav_path: Path, mp3_path: Path) -> float:
    subprocess.check_call(
        [
            "ffmpeg",
            "-y",
            "-i",
            str(wav_path),
            "-codec:a",
            "libmp3lame",
            "-qscale:a",
            "3",
            str(mp3_path),
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    out = subprocess.check_output(
        [
            "ffprobe",
            "-v",
            "error",
            "-show_entries",
            "format=duration",
            "-of",
            "default=nw=1:nk=1",
            str(mp3_path),
        ],
        text=True,
    ).strip()
    return float(out)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--slot", choices=["morning", "evening", "auto"], default="auto")
    args = ap.parse_args()
    hour = datetime.now().hour
    slot = args.slot if args.slot != "auto" else ("morning" if hour < 14 else "evening")

    AUDIO_DIR.mkdir(exist_ok=True)
    items = gather()
    CN_CACHE.write_text(json.dumps({"fetchedAt": datetime.now().isoformat(), "items": items}, ensure_ascii=False, indent=2), encoding="utf-8")
    print("gathered", len(items), "items")

    segments = build_scripts(items, slot)
    wav = AUDIO_DIR / "session-current.wav"
    mp3 = AUDIO_DIR / "session-current.mp3"
    if matcha_ready():
        print("TTS: Matcha icefall-zh-baker + Vocos (CPU)")
        render_sec = render_matcha(segments, wav)
        voice = VOICE_LABEL
        license_ = VOICE_LICENSE
    else:
        render_sec = render_piper_fallback(segments, wav)
        voice = "Piper zh_CN-huayan-medium (fallback only)"
        license_ = "Piper voices — https://github.com/rhasspy/piper"
    duration = wav_to_mp3(wav, mp3)
    try:
        wav.unlink()
    except OSError:
        pass

    meta = {
        "builtAt": datetime.now().isoformat(timespec="seconds"),
        "slot": slot,
        "durationSec": round(duration, 2),
        "durationLabel": f"{int(duration // 60):02d}:{int(duration % 60):02d}",
        "audio": "audio/session-current.mp3",
        "voice": voice,
        "license": license_,
        "renderSec": round(render_sec, 1),
        "segmentCount": len(segments),
        "segments": segments,
        "sourcesNote": "国内：中国少年报/中少在线 HTML、国家航天局公开要闻摘要；国际：Newsround / TFK / NASA / SN Explores",
    }
    META_PATH.write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding="utf-8")
    print("wrote", mp3, "duration", meta["durationLabel"], f"render={render_sec:.1f}s")
    print("meta", META_PATH)


if __name__ == "__main__":
    main()
