#!/usr/bin/env python3
# Copyright (C) 2026 Lenovo
# All Rights Reserved.
# Lenovo Confidential Restricted.

"""Refresh the static kids-news story bank and render missing voice clips.

The updater is deliberately build-time only. GitHub Pages serves the resulting
JSON and MP3 files as static assets; no Python process is needed for visitors.
Feed failures are non-fatal so the curated 44-story bank remains deployable.
"""

from __future__ import annotations

import argparse
import asyncio
import hashlib
import html
import json
import re
import shutil
import subprocess
import tempfile
import urllib.request
from urllib.parse import urljoin
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parent
STORIES_PATH = ROOT / "stories-v2.json"
META_PATH = ROOT / "session-meta.json"
MANIFEST_PATH = ROOT / "audio-manifest.json"
AUDIO_ROOT = ROOT / "audio" / "clips"
TARGET_SECONDS = 20 * 60
TOPICS = ["科学", "航天", "太空", "AI", "科技", "金融", "地理", "发明", "生物", "大自然", "简单政治"]
VOICES = {
    "female": "zh-CN-XiaoxiaoNeural",
    "male": "zh-CN-YunxiNeural",
}
FEEDS = (
    ("NASA", "https://www.nasa.gov/rss/dyn/breaking_news.rss"),
    ("Science News Explores", "https://www.snexplores.org/feed"),
    ("BBC Newsround", "https://feeds.bbci.co.uk/newsround/rss.xml"),
    ("中国科学院科普", "https://www.cas.cn/kxcb/rss.xml"),
    ("中国国家航天局", "https://www.cnsa.gov.cn/n6758823/n6758838/index.html"),
    ("中国少年报", "https://www.ccppg.cn/zgsnb/"),
    ("科普中国", "https://www.kepuchina.cn/"),
)
TOPIC_KEYWORDS = {
    "航天": ("rocket", "launch", "spacecraft", "satellite", "火箭", "发射", "航天", "卫星", "探测器"),
    "太空": ("mars", "moon", "lunar", "planet", "star", "galaxy", "asteroid", "火星", "月球", "行星", "星系"),
    "AI": ("artificial intelligence", "machine learning", "robot", "人工智能", "机器学习", "机器人"),
    "科技": ("technology", "chip", "computer", "energy", "technology", "芯片", "计算机", "能源"),
    "金融": ("money", "budget", "bank", "price", "saving", "金融", "银行", "预算", "价格", "存钱"),
    "地理": ("earth", "climate", "ocean", "river", "mountain", "geography", "地球", "海洋", "河流", "山"),
    "发明": ("invention", "engineering", "design", "3d print", "发明", "工程", "设计", "打印"),
    "生物": ("animal", "biology", "cell", "gene", "coral", "whale", "动物", "生物", "细胞", "基因", "珊瑚"),
    "大自然": ("forest", "wildlife", "bird", "weather", "rain", "nature", "森林", "野生", "鸟", "天气", "自然"),
    "简单政治": ("community", "government", "civic", "rights", "public", "社区", "政府", "权利", "公共"),
    "科学": ("science", "experiment", "physics", "chemistry", "research", "科学", "实验", "物理", "化学", "研究"),
}
TOPIC_HEADLINES = {
    "科学": "科学家正在用实验寻找答案",
    "航天": "新的航天任务正在准备出发",
    "太空": "远方太空又传来一条新线索",
    "AI": "人工智能正在学习解决一个新问题",
    "科技": "一项新技术正在把想法变成工具",
    "金融": "生活里的一个选择藏着金融知识",
    "地理": "地图上的一处变化连接着整个地球",
    "发明": "一个小小的不方便催生了新点子",
    "生物": "生命世界又展示了一种特别本领",
    "大自然": "自然界正在上演一场安静的变化",
    "简单政治": "社区里的共同问题需要大家一起商量",
}
SIGNAL_LABELS = {
    "rocket": "火箭与发射",
    "launch": "发射任务",
    "satellite": "卫星观测",
    "mars": "火星探索",
    "moon": "月球探索",
    "lunar": "月球研究",
    "planet": "行星观察",
    "galaxy": "星系观测",
    "artificial intelligence": "人工智能",
    "machine learning": "机器学习",
    "robot": "机器人",
    "chip": "芯片技术",
    "energy": "能源利用",
    "experiment": "科学实验",
    "physics": "物理规律",
    "research": "科学研究",
    "ocean": "海洋变化",
    "climate": "气候变化",
    "river": "河流与水资源",
    "mountain": "山地环境",
    "invention": "发明设计",
    "engineering": "工程方法",
    "animal": "动物观察",
    "biology": "生命科学",
    "cell": "细胞研究",
    "gene": "遗传线索",
    "coral": "珊瑚生态",
    "forest": "森林生态",
    "wildlife": "野生动物",
    "bird": "鸟类迁徙",
    "weather": "天气现象",
    "community": "社区协作",
    "government": "公共管理",
    "rights": "权利与责任",
}


def clean_text(value: str) -> str:
    value = html.unescape(re.sub(r"<[^>]+>", " ", value or ""))
    return re.sub(r"\s+", " ", value).strip()


def child_text(node: ET.Element, *names: str) -> str:
    wanted = set(names)
    for child in list(node):
        if child.tag.rsplit("}", 1)[-1] in wanted and child.text:
            return clean_text(child.text)
    return ""


def fetch_feed(source: str, url: str) -> list[dict[str, str]]:
    request = urllib.request.Request(url, headers={"User-Agent": "kids-news-player/1.0"})
    try:
        with urllib.request.urlopen(request, timeout=15) as response:
            payload = response.read()
    except Exception as error:
        print(f"[feed] {source}: skipped ({error})")
        return []

    try:
        root = ET.fromstring(payload)
    except ET.ParseError:
        # Some Chinese public sources publish an HTML headline page instead of RSS.
        html_entries: list[dict[str, str]] = []
        document = payload.decode("utf-8", errors="ignore")
        for href, raw_title in re.findall(
            r"<a\b[^>]*href=[\"']([^\"']+)[\"'][^>]*>(.*?)</a>",
            document,
            flags=re.IGNORECASE | re.DOTALL,
        ):
            title = clean_text(raw_title)
            if 8 <= len(title) <= 180 and not href.startswith(("javascript:", "#")):
                html_entries.append({
                    "title": title,
                    "link": urljoin(url, href),
                    "summary": "",
                    "source": source,
                })
        return html_entries[:12]

    entries: list[dict[str, str]] = []
    for node in root.iter():
        tag = node.tag.rsplit("}", 1)[-1]
        if tag not in {"item", "entry"}:
            continue
        title = child_text(node, "title")
        link = child_text(node, "link")
        if not link:
            link_node = next((child for child in list(node) if child.tag.rsplit("}", 1)[-1] == "link"), None)
            link = (link_node.attrib.get("href", "") if link_node is not None else "").strip()
        summary = child_text(node, "description", "summary", "content")
        if title and link:
            entries.append({"title": title, "link": link, "summary": summary, "source": source})
    return entries[:12]


def classify(entry: dict[str, str]) -> str | None:
    haystack = f"{entry['title']} {entry['summary']}".lower()
    matches = [(sum(keyword.lower() in haystack for keyword in keywords), topic) for topic, keywords in TOPIC_KEYWORDS.items()]
    score, topic = max(matches, default=(0, ""))
    return topic if score else None


def localized_detail(entry: dict[str, str], topic: str) -> str:
    haystack = f"{entry['title']} {entry['summary']}".lower()
    labels = [label for keyword, label in SIGNAL_LABELS.items() if keyword in haystack]
    unique_labels = list(dict.fromkeys(labels))[:3]
    if unique_labels:
        return f"报道中的线索包括{'、'.join(unique_labels)}"
    return f"报道把问题放在{topic}中的一个新观察上"


def generated_script(topic: str, entry: dict[str, str]) -> str:
    source = entry["source"]
    detail = localized_detail(entry, topic)
    return (
        f"最近，{source}分享了一条和{topic}有关的新消息。"
        f"这条消息的重点是：{detail}。"
        f"先别急着只记住一个结论，我们可以把它拆成几个问题。"
        f"它观察了什么，使用了什么方法，又可能怎样影响我们的生活？"
        f"如果这是一次实验，科学家还要重复测量；如果这是一个工程，工程师还要检查安全和可靠；"
        f"如果它和社区有关，就要听见不同人的需要。"
        f"这条报道给我们的启发是，面对新鲜消息要看来源、找证据，也要把大问题变成自己能观察的小问题。"
        f"你可以记下一个关键词，回家后用地图、书本或可靠的科普网站继续查一查。"
    )


def estimate_duration(script: str) -> int:
    return max(75, min(95, round(len(script) / 3.8)))


def story_audio_paths(story_id: str) -> dict[str, str]:
    return {voice: f"./audio/clips/{voice}/{story_id}.mp3" for voice in VOICES}


def story_id(entry: dict[str, str]) -> str:
    digest = hashlib.sha1(entry["link"].encode("utf-8")).hexdigest()[:10]
    return f"daily-{datetime.now(timezone.utc):%Y%m%d}-{digest}"


def refresh_story_bank() -> tuple[list[dict[str, Any]], set[str]]:
    stories = json.loads(STORIES_PATH.read_text(encoding="utf-8"))
    if not isinstance(stories, list):
        raise ValueError("stories-v2.json must contain an array")
    changed_ids: set[str] = set()
    known_links = {story.get("url") for story in stories if story.get("url")}

    candidates: list[dict[str, str]] = []
    for source, url in FEEDS:
        candidates.extend(fetch_feed(source, url))
    additions = 0
    for entry in candidates:
        if entry["link"] in known_links:
            continue
        topic = classify(entry)
        if not topic:
            continue
        new_id = story_id(entry)
        if any(story.get("id") == new_id for story in stories):
            continue
        stories.append({
            "id": new_id,
            "topic": topic,
            "title": TOPIC_HEADLINES[topic],
            "source": entry["source"],
            "url": entry["link"],
            "script": generated_script(topic, entry),
            "durationSec": estimate_duration(entry["summary"] or entry["title"]),
            "audio": story_audio_paths(new_id),
            "updatedAt": datetime.now(timezone.utc).isoformat(),
        })
        known_links.add(entry["link"])
        changed_ids.add(new_id)
        additions += 1
        if additions >= len(TOPICS):
            break

    for story in stories:
        expected_audio = story_audio_paths(story["id"])
        if story.get("audio") != expected_audio:
            story["audio"] = expected_audio
            changed_ids.add(story["id"])
        story.setdefault("durationSec", 78)

    # Keep generated items rotating without allowing the feed to grow forever.
    for topic in TOPICS:
        generated = sorted(
            (story for story in stories if story.get("topic") == topic and story["id"].startswith("daily-")),
            key=lambda story: story.get("updatedAt", ""),
            reverse=True,
        )
        for stale in generated[8:]:
            stories.remove(stale)
            for voice in VOICES:
                (AUDIO_ROOT / voice / f"{stale['id']}.mp3").unlink(missing_ok=True)

    counts = {topic: sum(story.get("topic") == topic for story in stories) for topic in TOPICS}
    if len(stories) < 44 or any(count < 4 for count in counts.values()):
        raise ValueError(f"story bank invariant failed: {len(stories)} stories, counts={counts}")
    STORIES_PATH.write_text(json.dumps(stories, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"[stories] {len(stories)} stories, {additions} new")
    return stories, changed_ids


async def synthesize(stories: list[dict[str, Any]], changed_ids: set[str]) -> None:
    try:
        import edge_tts
    except ImportError as error:
        raise RuntimeError("edge-tts is required; install it with python -m pip install edge-tts") from error

    semaphore = asyncio.Semaphore(8)

    async def render(story: dict[str, Any], voice_name: str, voice: str) -> None:
        output = AUDIO_ROOT / voice_name / f"{story['id']}.mp3"
        if story["id"] not in changed_ids and output.is_file() and output.stat().st_size > 1000:
            return
        output.parent.mkdir(parents=True, exist_ok=True)
        async with semaphore:
            await edge_tts.Communicate(story["script"], voice).save(str(output))
        print(f"[tts] {voice_name}/{story['id']}.mp3")

    await asyncio.gather(*(render(story, name, voice) for story in stories for name, voice in VOICES.items()))


def write_audio_manifest(stories: list[dict[str, Any]]) -> None:
    verified = [
        story for story in stories
        if all(
            (AUDIO_ROOT / voice / f"{story['id']}.mp3").is_file()
            and (AUDIO_ROOT / voice / f"{story['id']}.mp3").stat().st_size > 1000
            for voice in VOICES
        )
    ]
    if len(verified) < 44:
        raise RuntimeError(f"only {len(verified)} stories have both verified clips")
    manifest = {
        "builtAt": datetime.now(timezone.utc).isoformat(),
        "targetDurationSec": TARGET_SECONDS,
        "voiceModels": VOICES,
        "stories": verified,
        "verifiedClipCount": len(verified) * 2,
    }
    MANIFEST_PATH.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def select_lineup(stories: list[dict[str, Any]]) -> list[dict[str, Any]]:
    ordered: list[dict[str, Any]] = []
    for topic in TOPICS:
        options = [story for story in stories if story.get("topic") == topic]
        if options:
            ordered.append(options[0])
    for story in stories:
        if story not in ordered:
            ordered.append(story)
        if len(ordered) >= 15:
            break
    return ordered[:15]


def build_sessions(lineup: list[dict[str, Any]]) -> None:
    ffmpeg = shutil.which("ffmpeg")
    if not ffmpeg:
        raise RuntimeError("ffmpeg is required to concatenate the daily sessions")
    with tempfile.TemporaryDirectory() as temporary:
        list_file = Path(temporary) / "concat.txt"
        list_file.write_text(
            "".join(f"file '{(AUDIO_ROOT / voice / (story['id'] + '.mp3')).as_posix()}'\n" for story in lineup for voice in ["female"]),
            encoding="utf-8",
        )
        female = ROOT / "audio" / "session-female.mp3"
        subprocess.run([ffmpeg, "-y", "-f", "concat", "-safe", "0", "-i", str(list_file), "-c:a", "libmp3lame", "-q:a", "4", str(female)], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
        list_file.write_text(
            "".join(f"file '{(AUDIO_ROOT / voice / (story['id'] + '.mp3')).as_posix()}'\n" for story in lineup for voice in ["male"]),
            encoding="utf-8",
        )
        male = ROOT / "audio" / "session-male.mp3"
        subprocess.run([ffmpeg, "-y", "-f", "concat", "-safe", "0", "-i", str(list_file), "-c:a", "libmp3lame", "-q:a", "4", str(male)], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
    shutil.copyfile(female, ROOT / "audio" / "session-current.mp3")


def write_session_meta(lineup: list[dict[str, Any]]) -> None:
    now = datetime.now(timezone.utc).isoformat()
    segments = [
        {
            "id": story["id"],
            "title": story["title"],
            "text": story["script"],
            "kind": "story",
            "source": story.get("source", ""),
            "region": "公开科普与儿童栏目",
            "link": story.get("url", ""),
        }
        for story in lineup
    ]
    metadata = {
        "updatedAt": now,
        "builtAt": now,
        "slot": "daily",
        "targetDurationSec": TARGET_SECONDS,
        "durationLabel": "约 20 分钟",
        "audio": "audio/session-current.mp3",
        "voiceModels": VOICES,
        "segmentCount": len(segments),
        "segments": segments,
    }
    META_PATH.write_text(json.dumps(metadata, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--skip-audio", action="store_true", help="update JSON and metadata without invoking edge-tts")
    args = parser.parse_args()
    stories, changed_ids = refresh_story_bank()
    if not args.skip_audio:
        asyncio.run(synthesize(stories, changed_ids))
        write_audio_manifest(stories)
        lineup = select_lineup(stories)
        build_sessions(lineup)
    else:
        lineup = select_lineup(stories)
    write_session_meta(lineup)
    print(f"[done] updatedAt={datetime.now(timezone.utc).isoformat()} lineup={len(lineup)}")


if __name__ == "__main__":
    main()
