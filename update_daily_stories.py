#!/usr/bin/env python3
# Copyright (C) 2026 Lenovo
# All Rights Reserved.
# Lenovo Confidential Restricted.

"""Refresh the static kids-news story bank with varied-length daily stories and render both voices.

The updater is build-time only. GitHub Pages serves the resulting JSON and MP3
files as static assets; no Python process is needed for visitors.
It pulls live daily stories from multiple public science/space/history/nature APIs
and RSS feeds, tracks seen URLs across days in seen_history.json, composes natural
varied-length stories (short ~45-65s, medium ~75-115s, long ~130-175s) suitable for
~10-year-old listeners, measures true MP3 durations via ffprobe, and builds a ~20-minute
(strictly <= 22 minutes / 1320s) default broadcast session.
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
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import urljoin

ROOT = Path(__file__).resolve().parent
STORIES_PATH = ROOT / "stories-v2.json"
META_PATH = ROOT / "session-meta.json"
MANIFEST_PATH = ROOT / "audio-manifest.json"
SEEN_HISTORY_PATH = ROOT / "seen_history.json"
AUDIO_ROOT = ROOT / "audio" / "clips"

TARGET_SECONDS = 20 * 60
MIN_SESSION_SECONDS = 19 * 60
MAX_SESSION_SECONDS = 22 * 60  # Strictly <= 22 minutes (1320s)
MAX_DAILY_REFRESHES = 5

TOPICS = [
    "科学",
    "航天",
    "太空",
    "AI",
    "科技",
    "金融",
    "地理",
    "发明",
    "生物",
    "大自然",
    "简单政治",
]

VOICES = {
    "female": "zh-CN-XiaoxiaoNeural",
    "male": "zh-CN-YunxiNeural",
}

USER_AGENT = "CurioHubKidsRadio/2.0 (https://github.com/jiewusupelec-ctrl/curiohub; kids-science-player)"

# High-availability international & Chinese science/nature/tech RSS feeds
RSS_FEEDS = (
    ("Science News Explores", "https://www.snexplores.org/feed", "en"),
    ("ScienceDaily", "https://www.sciencedaily.com/rss/all.xml", "en"),
    ("BBC Science & Environment", "https://feeds.bbci.co.uk/news/science_and_environment/rss.xml", "en"),
    ("BBC Newsround", "https://feeds.bbci.co.uk/newsround/rss.xml", "en"),
    ("Phys.org", "https://phys.org/rss-feed/", "en"),
    ("NASA Image of the Day", "https://www.nasa.gov/feeds/iotd-feed/", "en"),
    ("New Scientist", "https://www.newscientist.com/feed/home/", "en"),
    ("Solidot 奇客科学", "https://www.solidot.org/index.rss", "zh"),
    ("少数派科技", "https://sspai.com/feed", "zh"),
    ("爱范儿未来科技", "https://www.ifanr.com/feed", "zh"),
)

UNSAFE_PATTERNS = re.compile(
    r"(murder|suicide|terroris|assault|rape|porn|massacre|execution|kill|killed|attack|war|warfare|military|weapon|missile|bomb|drone strike|cia|nixon|vietnam|soldier|blood|dead|death|"
    r"阉割|睾丸|杀害|杀死|自杀|恐袭|色情|赌博|毒品|血腥|凶杀|尸体|武装|袭击|战争|越战|炸弹|导弹|死亡|身亡|遇难|冲突|总统请求)",
    re.IGNORECASE,
)

SCIENCE_ONTHISDAY_KEYWORDS = re.compile(
    r"(spacecraft|satellite|astronaut|rocket|launch|planet|telescope|invent|discover|scientist|nobel|physics|chemistry|biology|dna|vaccine|computer|internet|ocean|antarctic|species|fossil|dinosaur|railway|bridge|museum|library)",
    re.IGNORECASE,
)

BOILERPLATE_NOISE_PATTERNS = re.compile(
    r"(TB\s*\d+-\d+|Download PDF|contact .*?@|appeared first on|首先出现在|欲了解更多信息|请联系|媒体认证|media accreditation)",
    re.IGNORECASE,
)

TOPIC_KEYWORDS: dict[str, tuple[str, ...]] = {
    "航天": (
        "rocket", "launch", "spacecraft", "satellite", "astronaut", "iss", "lunar lander",
        "rover", "artemis", "crew", "orbit", "booster", "space station", "capsule",
        "火箭", "发射", "航天", "卫星", "探测器", "空间站", "月球车", "宇航员", "飞船", "着陆器",
    ),
    "太空": (
        "mars", "moon", "lunar", "planet", "star", "galaxy", "asteroid", "comet", "nebula",
        "black hole", "telescope", "jwst", "webb", "jupiter", "saturn", "venus", "exoplanet", "cosmos",
        "火星", "月球", "行星", "星系", "小行星", "彗星", "望远镜", "黑洞", "木星", "土星", "宇宙", "脉冲星", "天文",
    ),
    "AI": (
        "artificial intelligence", "machine learning", "neural network", "robot", "chatbot",
        "algorithm", "deep learning", "llm", "computer vision", "autonomous",
        "人工智能", "机器学习", "神经网络", "机器人", "大模型", "算法", "深度学习", "智能",
    ),
    "科技": (
        "chip", "semiconductor", "quantum", "battery", "solar", "laser", "fiber", "supercomputer",
        "train", "bridge", "tunnel", "radar", "sensor", "5g", "display", "electric",
        "芯片", "半导体", "量子", "电池", "太阳能", "激光", "光纤", "超算", "高铁", "隧道", "传感器", "屏幕",
    ),
    "金融": (
        "economy", "money", "market", "bank", "trade", "coin", "currency", "price", "saving",
        "budget", "treasure", "gold", "tariff", "cost", "shop", "insurance",
        "金融", "银行", "货币", "硬币", "纸币", "价格", "贸易", "经济", "储蓄", "预算", "保险", "成本",
    ),
    "地理": (
        "earth", "ocean", "river", "mountain", "volcano", "glacier", "antarctic", "arctic",
        "desert", "island", "continent", "earthquake", "tectonic", "canyon", "lake", "map",
        "地球", "海洋", "河流", "山脉", "火山", "冰川", "南极", "北极", "沙漠", "岛屿", "地震", "板块", "湖泊", "海峡",
    ),
    "发明": (
        "invent", "design", "material", "3d print", "biomimicry", "inspired by", "patent",
        "prototype", "device", "tool", "microscope", "medical device", "velcro", "antibiotic",
        "发明", "设计", "新材料", "打印", "仿生", "原型", "装置", "工具", "显微镜", "专利",
    ),
    "生物": (
        "animal", "biology", "cell", "gene", "dna", "protein", "fossil", "dinosaur", "whale",
        "octopus", "dolphin", "insect", "bacteria", "species", "evolution", "brain", "sleep",
        "动物", "生物", "细胞", "基因", "蛋白质", "化石", "恐龙", "鲸", "章鱼", "海豚", "昆虫", "细菌", "物种", "大脑",
    ),
    "大自然": (
        "forest", "wildlife", "bird", "weather", "rain", "cloud", "aurora", "coral", "reef",
        "migration", "butterfly", "tree", "ecosystem", "plant", "flower", "wind", "storm",
        "森林", "野生", "鸟", "天气", "彩虹", "极光", "珊瑚", "迁徙", "蝴蝶", "树木", "生态", "植物", "花", "风暴",
    ),
    "简单政治": (
        "community", "city", "public", "library", "school", "rule", "law", "vote", "treaty",
        "unesco", "unicef", "park", "traffic", "accessibility", "museum", "history", "seed vault",
        "社区", "城市", "公共", "图书馆", "学校", "规则", "公约", "博物馆", "无障碍", "交通", "合作", "历史",
    ),
    "科学": (
        "science", "experiment", "physics", "chemistry", "atom", "molecule", "light", "sound",
        "gravity", "water", "ice", "heat", "magnet", "energy", "research", "scientist",
        "科学", "实验", "物理", "化学", "原子", "分子", "光学", "声音", "重力", "结冰", "热量", "磁场", "科学家",
    ),
}

TOPIC_INTROS: dict[str, list[str]] = {
    "科学": [
        "在奇妙的科学世界里，往往藏着让人意想不到的真相。",
        "如果把日常习以为常的现象放到放大镜下，你会发现一个好玩的科学问题。",
        "今天我们来聊一个既有趣又可以跟家人一起讨论的科学新发现。",
    ],
    "航天": [
        "抬头望向星空，人类派出的航天器正在轨道和深空里执行新的任务。",
        "每一次火箭点火和探测器飞行背后，都藏着航天工程师的巧妙构思。",
        "来自航天发射场与空间站的新消息，带我们看看人类是如何一步步走向太空的。",
    ],
    "太空": [
        "在距离地球几亿公里甚至几光年外的宇宙深处，天文学家又捕捉到了新的线索。",
        "用空间望远镜看向浩瀚宇宙，远方的星球远比科幻故事还要奇妙。",
        "今天我们的太空望远镜对准了宇宙深处，去看看那里的星辰与行星。",
    ],
    "AI": [
        "人工智能不仅能聊天和画画，科学家正教它学习解决真正的科学难题。",
        "当计算机拥有了向海量数据学习的本领，它会怎样帮人类观察世界呢？",
        "今天我们来看看人工智能实验室里刚刚发生的一件新鲜事。",
    ],
    "科技": [
        "一项好的工程与科技，能把实验室里的物理原理变成守护生活的超级工具。",
        "在我们的城市、海洋与天空背后，许多看不见的硬核科技正在安静运转。",
        "今天的科技故事，带大家拆开现代工程里的一个巧妙设计。",
    ],
    "金融": [
        "买东西、存零花钱、管理资源，日常生活里的每个选择其实都藏着经济学智慧。",
        "钱和交易是怎么让全世界的人们互相合作的？今天我们来看一个有趣的金融故事。",
        "用经济学家的眼光看生活，你会发现数字和价格背后有一套好玩的逻辑。",
    ],
    "地理": [
        "旋转地球仪，高山、深海、沙漠和季风正在地球表面上演跨越千里的联动。",
        "地图上的每一条海岸线、每一座雪山，都有一段跨越百万年的地理传奇。",
        "今天我们跟着地理学家的脚步，去探索地球上一个奇特的角落。",
    ],
    "发明": [
        "许多改变世界的伟大发明，最初都来自一次不经意的观察，或者对大自然本领的模仿。",
        "当工程师遇到卡脖子的难题时，一个巧妙的小点子往往能打开全新的大门。",
        "今天我们要认识一项聪明又好玩的发明，看看它背后的灵感是从哪儿来的。",
    ],
    "生物": [
        "在地球数十亿年的生命演化中，动物、植物和微生物练就了令人惊叹的生存绝活。",
        "生命世界远比我们想象的更聪明，每一种生物身体里都藏着精妙的科学密码。",
        "今天我们走进奇妙的生物圈，去认识一位身怀绝技的生命朋友。",
    ],
    "大自然": [
        "大自然是最神奇的设计师，风、雨、雷电和万物生灵每时每刻都在默契配合。",
        "只要停下脚步仔细倾听和观察，森林、海洋和天空就会给你讲一段动人的自然故事。",
        "今天的大自然广播，带大家去看看地球生态圈里的一场奇妙变化。",
    ],
    "简单政治": [
        "几百万人住在一起的城市和地球村，怎样才能既公平又温暖地运转？这离不开公共规则的智慧。",
        "从一条斑马线到跨国合作公约，好的公共决定能让每一个普通人都受到照顾。",
        "今天我们来聊聊社区与公共生活里的一个好办法，看看大家是如何商量着把事情办好的。",
    ],
}

TOPIC_TAKEAWAYS: dict[str, list[str]] = {
    "科学": [
        "科学最迷人的地方，就是不把任何现象当成理所当然。下次在厨房、操场或雨后的路边看到奇怪的现象，不妨先提出一个猜想，再像科学家一样找证据验证它。",
        "你看，无论是大实验还是小观察，只要多问一句“为什么会这样”，平平无奇的生活角落也会变成你的科学实验室。今天听到的小原理，晚上吃饭时可以考考爸爸妈妈哦！",
    ],
    "航天": [
        "在太空探索中，没有任何一个细节是小事。从一颗螺丝钉到几万行导航代码，正是无数工程师的严谨配合，才让人类能够飞向月球与更远的星辰。",
        "每一次航天任务的突破，都是把不可能变成可能的过程。也许十几年后，正在听广播的你也能参与设计飞向深空的下一代探测器！",
    ],
    "太空": [
        "宇宙浩瀚无垠，人类目前读懂的还只是万里星空中的小小一页。保持对夜空的好奇，每次抬头看星星时，你也在和天文学家一起眺望宇宙的历史。",
        "从太阳系的行星风暴到遥远星系的脉冲信号，每一束穿越太空来到地球的光，都在告诉我们地球家园是多么独特而珍贵。",
    ],
    "AI": [
        "人工智能是人类造出的强大助手，但它依然需要人类的好奇心、判断力和责任感来引导。学会提出好问题、核实真证据，才是未来最重要的本领。",
        "当AI帮科学家处理海量数据时，人类就能腾出更多精力去思考更有创造力的问题。善用工具、独立思考，你也能和AI一起探索未知世界。",
    ],
    "科技": [
        "真正优秀的科技，不一定要看起来炫酷复杂，而是能稳稳当当地解决问题，让人们的生活更安全、更环保、更方便。",
        "每一项大国工程和日常科技背后，都凝结着物理、材料和数学的智慧。留心观察身边的桥梁、列车和屏幕，你会发现科学就在脚下。",
    ],
    "金融": [
        "懂得金融和经济知识，不是为了数钱，而是为了明白每一份劳动、每一份信任和每一次选择背后的价值，做自己时间和零花钱的聪明小主人。",
        "无论是古代的纸币还是现代的消费选择，守信用、看长远、不盲目跟风，都是跨越几百年依然管用的生活智慧。",
    ],
    "地理": [
        "地球不是一块块孤立拼图的堆砌，沙漠的风、大洋的流、高山的雪都在互相影响。读懂了地理，你手里的地图就会变成一部立体的地球百科全书。",
        "跨越山海的地理故事告诉我们，哪怕相隔万里，不同大陆的气候与生态也紧紧相连。爱护我们身边的环境，就是在守护整颗蓝色星球。",
    ],
    "发明": [
        "大发明家并不是永远不犯错的超人，他们只是比别人更善于观察细节，甚至能从一次实验失误或一只小动物身上找到灵感。",
        "如果你在生活或学习中觉得某样东西用起来不够顺手，别急着抱怨，试着画张草图改一改——说不定下一个改变生活的发明就诞生在你的书桌上！",
    ],
    "生物": [
        "每一种生物都是历经千万年自然选择留下的生命奇迹。尊重生命、保护生物多样性，不仅是在保护动物和植物，也是在留住大自然最宝贵的智慧库。",
        "从深海到森林，生命总能找到令人惊叹的出路。去公园或郊外时，带着安静和礼貌去观察小生物，你会发现一个热闹非凡的微观世界。",
    ],
    "大自然": [
        "大自然里的每一滴雨、每一只鸟、每一棵树都处在微妙的平衡之中。当我们学会像生态学家一样思考，就会更加懂得如何与自然温柔相处。",
        "不用等到去遥远的保护区，窗外的云朵、雨后的泥土和迁徙的候鸟，每天都在上演大自然的纪录片，等着细心的你去发现。",
    ],
    "简单政治": [
        "公共生活不是只有大人才能关心的话题。学会倾听别人的需要、遵守共同的规则、用有条理的建议让学校和社区变得更好，就是最棒的公民素养。",
        "好的规则既有尺度又有温度，既讲公平又照顾弱者。从班级里的一次分工到城市里的一条坡道，每个人都能为更友善的世界出一份力。",
    ],
}


def clean_text(value: str) -> str:
    value = html.unescape(re.sub(r"<[^>]+>", " ", value or ""))
    value = re.sub(r"https?://\S+", "", value)
    value = re.sub(r"\[\s*(?:\.\.\.|…)\s*\]", "", value)
    value = re.sub(r"The post .*? appeared first on .*?\.", "", value, flags=re.IGNORECASE)
    value = re.sub(r"首先出现在.*?上。", "", value)
    value = re.sub(r"（[左中右上下圖图\s]+）", "", value)
    value = re.sub(r"\((?:left|right|center|middle|pictured)[^)]*\)", "", value, flags=re.IGNORECASE)
    return re.sub(r"\s+", " ", value).strip()


def is_kid_safe(text: str) -> bool:
    if not text or len(text) < 15:
        return False
    if UNSAFE_PATTERNS.search(text):
        return False
    if BOILERPLATE_NOISE_PATTERNS.search(text):
        return False
    return True


def translate_to_zh(text: str) -> str:
    """Translate English title/summary into natural Simplified Chinese using public GTX endpoint."""
    text = clean_text(text)[:900]
    if not text:
        return ""
    zh_chars = len(re.findall(r"[\u4e00-\u9fff]", text))
    if zh_chars > len(text) * 0.35:
        return text
    url = (
        "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh-CN&dt=t&q="
        + urllib.parse.quote(text)
    )
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=8) as resp:
            data = json.loads(resp.read().decode("utf-8", errors="ignore"))
            translated = "".join(seg[0] for seg in data[0] if seg and seg[0])
            return clean_text(translated)
    except Exception as exc:
        print(f"[translate] fallback ({exc})")
        return ""


def load_seen_history() -> dict[str, Any]:
    if SEEN_HISTORY_PATH.is_file():
        try:
            data = json.loads(SEEN_HISTORY_PATH.read_text(encoding="utf-8"))
            if isinstance(data, dict):
                return data
        except Exception:
            pass
    return {"seenUrls": [], "seenTitles": [], "updatedAt": ""}


def save_seen_history(history: dict[str, Any]) -> None:
    history["seenUrls"] = list(dict.fromkeys(history.get("seenUrls", [])))[-2000:]
    history["seenTitles"] = list(dict.fromkeys(history.get("seenTitles", [])))[-2000:]
    history["updatedAt"] = datetime.now(timezone.utc).isoformat()
    SEEN_HISTORY_PATH.write_text(
        json.dumps(history, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def classify_topic(title: str, summary: str) -> str | None:
    haystack = f"{title} {summary}".lower()
    best_topic = None
    best_score = 0
    for topic, keywords in TOPIC_KEYWORDS.items():
        score = sum(2 if kw.lower() in title.lower() else 1 for kw in keywords if kw.lower() in haystack)
        if score > best_score:
            best_score = score
            best_topic = topic
    return best_topic if best_score > 0 else None


def fetch_spaceflight_api() -> list[dict[str, str]]:
    url = "https://api.spaceflightnewsapi.net/v4/articles/?limit=15"
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    items: list[dict[str, str]] = []
    try:
        with urllib.request.urlopen(req, timeout=12) as resp:
            payload = json.loads(resp.read().decode("utf-8", errors="ignore"))
        for row in payload.get("results", []):
            title = clean_text(row.get("title", ""))
            summary = clean_text(row.get("summary", ""))
            link = row.get("url", "").strip()
            site = row.get("news_site", "Spaceflight News")
            if title and len(summary) >= 45 and link and is_kid_safe(f"{title} {summary}"):
                items.append({
                    "title": title,
                    "summary": summary,
                    "link": link,
                    "source": f"Spaceflight News · {site}",
                    "lang": "en",
                })
    except Exception as exc:
        print(f"[api] Spaceflight News skipped: {exc}")
    return items


def fetch_wikipedia_on_this_day() -> list[dict[str, str]]:
    now = datetime.now(timezone.utc)
    url = f"https://en.wikipedia.org/api/rest_v1/feed/onthisday/selected/{now:%m/%d}"
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    items: list[dict[str, str]] = []
    try:
        with urllib.request.urlopen(req, timeout=12) as resp:
            payload = json.loads(resp.read().decode("utf-8", errors="ignore"))
        for entry in payload.get("selected", [])[:25]:
            year = entry.get("year")
            text = clean_text(entry.get("text", ""))
            pages = entry.get("pages") or []
            extract = ""
            link = f"https://en.wikipedia.org/wiki/{now:%B}_{now.day}"
            page_title = ""
            if pages:
                page = pages[0]
                extract = clean_text(page.get("extract", ""))
                page_title = clean_text(page.get("titles", {}).get("normalized", ""))
                content_urls = page.get("content_urls", {}).get("desktop", {})
                link = content_urls.get("page", link)
            combined = f"{text} {extract}".strip()
            if not is_kid_safe(combined) or not SCIENCE_ONTHISDAY_KEYWORDS.search(combined):
                continue
            topic = classify_topic(f"{page_title} {text}", extract)
            if not topic:
                continue
            items.append({
                "title": f"科学史上的今天（{year}年）：{text}",
                "summary": extract or text,
                "link": link,
                "source": "维基百科 · 科学史上的今天",
                "lang": "en",
                "forced_topic": topic,
            })
    except Exception as exc:
        print(f"[api] Wikipedia OnThisDay skipped: {exc}")
    return items[:6]


def child_text(node: ET.Element, *names: str) -> str:
    wanted = set(names)
    for child in list(node):
        if child.tag.rsplit("}", 1)[-1] in wanted and child.text:
            return clean_text(child.text)
    return ""


def fetch_rss_feed(source: str, url: str, lang: str) -> list[dict[str, str]]:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=12) as resp:
            payload = resp.read()
    except Exception as exc:
        print(f"[feed] {source}: skipped ({exc})")
        return []

    try:
        root = ET.fromstring(payload)
    except ET.ParseError:
        return []

    entries: list[dict[str, str]] = []
    for node in root.iter():
        tag = node.tag.rsplit("}", 1)[-1]
        if tag not in {"item", "entry"}:
            continue
        title = child_text(node, "title")
        link = child_text(node, "link")
        if not link:
            link_node = next(
                (child for child in list(node) if child.tag.rsplit("}", 1)[-1] == "link"),
                None,
            )
            link = (link_node.attrib.get("href", "") if link_node is not None else "").strip()
        summary = child_text(node, "description", "summary", "content")
        if title and link and len(summary) >= 40 and is_kid_safe(f"{title} {summary}"):
            entries.append({
                "title": title,
                "summary": summary,
                "link": urljoin(url, link),
                "source": source,
                "lang": lang,
            })
    return entries[:10]


def compose_varied_story(
    topic: str,
    entry: dict[str, str],
    length_category: str,
    seed_num: int,
) -> tuple[str, str] | None:
    """Compose a natural Chinese title and script of varied length (short/medium/long)."""
    raw_title = entry["title"]
    raw_summary = entry["summary"]

    zh_title = translate_to_zh(raw_title) if entry.get("lang") == "en" else clean_text(raw_title)
    zh_summary = translate_to_zh(raw_summary) if entry.get("lang") == "en" else clean_text(raw_summary)

    if not zh_title or not zh_summary or len(zh_summary) < 28:
        return None
    if not is_kid_safe(f"{zh_title} {zh_summary}"):
        return None

    zh_title = re.sub(r"\s+", " ", zh_title).strip(" 。；，-")
    if len(zh_title) > 38:
        zh_title = zh_title[:37] + "…"

    intros = TOPIC_INTROS.get(topic, TOPIC_INTROS["科学"])
    takeaways = TOPIC_TAKEAWAYS.get(topic, TOPIC_TAKEAWAYS["科学"])
    intro = intros[seed_num % len(intros)]
    takeaway = takeaways[seed_num % len(takeaways)]
    source = entry["source"]

    sentences = [
        s.strip()
        for s in re.split(r"[。！？!?]+", zh_summary)
        if len(s.strip()) >= 8 and not BOILERPLATE_NOISE_PATTERNS.search(s)
    ]
    if not sentences:
        return None

    core_body = "。".join(sentences[:4]) + "。"

    if length_category == "short":
        short_body = "。".join(sentences[:2]) + "。"
        script = (
            f"{intro}"
            f"根据{source}的最新分享，{zh_title}。"
            f"{short_body}"
            f"为什么这件事值得我们留意呢？因为它展示了{topic}领域里一个正在发生的具体变化，让我们看到科学家和研究者是如何一步步用真实数据解开谜题的。"
        )
    elif length_category == "medium":
        script = (
            f"{intro}"
            f"最近，{source}报道了一条关于“{zh_title}”的新进展。"
            f"具体是怎么回事呢？原来，{core_body}"
            f"看到这样的发现，研究团队并没有只停留在表面现象上，而是进一步追问背后的原理：这个现象需要满足什么样的条件？如果换一个环境，结果还会一样吗？"
            f"{takeaway}"
        )
    else:
        extra_sentences = "。".join(sentences[:6]) + "。"
        script = (
            f"{intro}"
            f"今天我们要深入聊聊来自{source}的一篇特别报道：{zh_title}。"
            f"故事要从研究人员观察到的具体线索说起：{extra_sentences}"
            f"把这条线索放到整个{topic}的大地图里来看，你会发现科学研究从来不是一蹴而就的。"
            f"在得出结论之前，科研人员往往要先设计对照实验或者长期观测方案，把可能干扰结果的因素一个个排除掉，还要把测量数据公开出来，请世界各地的同行一起检验。"
            f"对于我们十岁左右的小听众来说，理解这条新发现最好的办法，就是先抓住它最核心的那个变化：它到底解决了什么旧难题，或者推翻了哪一个过去的猜想？"
            f"{takeaway}"
        )

    return zh_title, script


def measure_mp3_duration(path: Path) -> int:
    """Measure exact MP3 duration in seconds using ffprobe."""
    ffprobe = shutil.which("ffprobe")
    if ffprobe and path.is_file():
        try:
            out = subprocess.check_output(
                [
                    ffprobe,
                    "-v",
                    "error",
                    "-show_entries",
                    "format=duration",
                    "-of",
                    "default=noprint_wrappers=1:nokey=1",
                    str(path),
                ],
                text=True,
                timeout=10,
            ).strip()
            return max(25, round(float(out)))
        except Exception:
            pass
    return 60


def estimate_duration_from_script(script: str) -> int:
    return max(35, min(180, round(len(script) / 4.85)))


def story_audio_paths(story_id: str) -> dict[str, str]:
    return {voice: f"./audio/clips/{voice}/{story_id}.mp3" for voice in VOICES}


def make_story_id(link: str, today_str: str) -> str:
    digest = hashlib.sha1(link.encode("utf-8")).hexdigest()[:10]
    return f"daily-{today_str.replace('-', '')}-{digest}"


def refresh_story_bank(max_new_fetch: int = 18) -> tuple[list[dict[str, Any]], set[str]]:
    stories: list[dict[str, Any]] = json.loads(STORIES_PATH.read_text(encoding="utf-8"))
    if not isinstance(stories, list):
        raise ValueError("stories-v2.json must contain a JSON array")

    today_str = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    history = load_seen_history()
    seen_urls: set[str] = set(history.get("seenUrls", []))
    seen_titles: set[str] = set(history.get("seenTitles", []))

    for s in stories:
        if s.get("url"):
            seen_urls.add(s["url"])
        if s.get("title"):
            seen_titles.add(s["title"])

    changed_ids: set[str] = set()
    today_stories = [
        s for s in stories
        if (s.get("publishedDate") == today_str or s.get("date") == today_str)
    ]

    # Collect candidates grouped by source so we interleave across all feeds/topics
    feed_buckets: list[list[dict[str, str]]] = []
    if max_new_fetch > 0:
        for source, url, lang in RSS_FEEDS:
            bucket = fetch_rss_feed(source, url, lang)
            if bucket:
                feed_buckets.append(bucket)
        wiki_bucket = fetch_wikipedia_on_this_day()
        if wiki_bucket:
            feed_buckets.append(wiki_bucket)
        sf_bucket = fetch_spaceflight_api()
        if sf_bucket:
            feed_buckets.append(sf_bucket)

    candidates: list[dict[str, str]] = []
    max_bucket_len = max((len(b) for b in feed_buckets), default=0)
    for row_idx in range(max_bucket_len):
        for bucket in feed_buckets:
            if row_idx < len(bucket):
                candidates.append(bucket[row_idx])

    length_cycle = ("short", "medium", "short", "long", "medium")
    additions = 0
    new_stories: list[dict[str, Any]] = []
    topic_new_counts: dict[str, int] = {t: 0 for t in TOPICS}

    for idx, entry in enumerate(candidates):
        if additions >= max_new_fetch:
            break
        link = entry["link"]
        if link in seen_urls:
            continue
        topic = entry.get("forced_topic") or classify_topic(entry["title"], entry["summary"])
        if not topic:
            continue
        # Keep topic balance across daily fetched items (max 3 per topic per run)
        if topic_new_counts.get(topic, 0) >= 3:
            continue
        new_id = make_story_id(link, today_str)
        if any(s.get("id") == new_id for s in stories) or any(s.get("id") == new_id for s in new_stories):
            continue

        length_cat = length_cycle[additions % len(length_cycle)]
        composed = compose_varied_story(topic, entry, length_cat, idx + additions)
        if not composed:
            continue
        zh_title, script = composed
        if zh_title in seen_titles:
            continue

        est_sec = estimate_duration_from_script(script)
        story_obj = {
            "id": new_id,
            "topic": topic,
            "title": zh_title,
            "source": entry["source"],
            "url": link,
            "date": today_str,
            "publishedDate": today_str,
            "isToday": True,
            "lengthCategory": length_cat,
            "script": script,
            "durationSec": est_sec,
            "audio": story_audio_paths(new_id),
            "updatedAt": datetime.now(timezone.utc).isoformat(),
        }
        new_stories.append(story_obj)
        seen_urls.add(link)
        seen_titles.add(zh_title)
        changed_ids.add(new_id)
        topic_new_counts[topic] = topic_new_counts.get(topic, 0) + 1
        additions += 1

    # Place curio-* rich stories first, followed by newly fetched daily-* stories, then legacy fallback
    stories = new_stories + stories

    for story in stories:
        sid = story["id"]
        expected_audio = story_audio_paths(sid)
        if story.get("audio") != expected_audio:
            story["audio"] = expected_audio
        s_date = story.get("publishedDate") or story.get("date") or ""
        story["isToday"] = bool(s_date == today_str)
        if not story.get("durationSec"):
            story["durationSec"] = estimate_duration_from_script(story.get("script", ""))

    def rank_story(s: dict[str, Any]) -> tuple[int, int]:
        sid = str(s.get("id", ""))
        is_legacy = bool(re.match(r"^(science|space|ai|tech|finance|geography|invention|biology|nature|politics)-\d+$", sid))
        if is_legacy:
            return (2, 0)
        date_int = int((s.get("publishedDate") or s.get("date") or "2026-01-01").replace("-", "") or 20260101)
        is_curio = 0 if sid.startswith("curio-") else 1
        return (0, -date_int * 10 + is_curio)

    stories.sort(key=rank_story)

    if len(stories) > 135:
        removed = stories[135:]
        stories = stories[:135]
        for stale in removed:
            for voice in VOICES:
                (AUDIO_ROOT / voice / f"{stale['id']}.mp3").unlink(missing_ok=True)

    history["seenUrls"] = list(seen_urls)
    history["seenTitles"] = list(seen_titles)
    save_seen_history(history)

    STORIES_PATH.write_text(json.dumps(stories, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"[stories] total={len(stories)}, today_count={len(today_stories) + additions}, newly_fetched={additions}")
    return stories, changed_ids


async def synthesize_and_measure(stories: list[dict[str, Any]], changed_ids: set[str]) -> None:
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
            for attempt in range(3):
                try:
                    await edge_tts.Communicate(story["script"], voice).save(str(output))
                    break
                except Exception:
                    if attempt == 2:
                        raise
                    await asyncio.sleep(1.5 * (attempt + 1))
        print(f"[tts] {voice_name}/{story['id']}.mp3")

    await asyncio.gather(*(render(story, name, voice) for story in stories for name, voice in VOICES.items()))

    updated = False
    for story in stories:
        female_clip = AUDIO_ROOT / "female" / f"{story['id']}.mp3"
        if female_clip.is_file() and female_clip.stat().st_size > 1000:
            actual_sec = measure_mp3_duration(female_clip)
            if story.get("durationSec") != actual_sec:
                story["durationSec"] = actual_sec
                updated = True
            if actual_sec <= 70:
                story["lengthCategory"] = "short"
            elif actual_sec <= 120:
                story["lengthCategory"] = "medium"
            else:
                story["lengthCategory"] = "long"

    if updated:
        STORIES_PATH.write_text(json.dumps(stories, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def select_lineup(stories: list[dict[str, Any]], batch_index: int = 0) -> list[dict[str, Any]]:
    """Select a varied-length playlist around ~20 minutes (1140s-1260s) and strictly <= 22 minutes (1320s)."""
    fresh_pool = [
        s for s in stories
        if not re.match(r"^(science|space|ai|tech|finance|geography|invention|biology|nature|politics)-\d+$", s["id"])
    ]
    pool = fresh_pool if len(fresh_pool) >= 44 else stories

    selected: list[dict[str, Any]] = []
    used_ids: set[str] = set()
    total_sec = 0

    desired_cats = ["short", "medium", "long", "short", "medium", "short", "long", "medium", "short", "medium", "short"]
    for idx, topic in enumerate(TOPICS):
        topic_stories = [s for s in pool if s.get("topic") == topic and s["id"] not in used_ids]
        if not topic_stories:
            continue
        target_cat = desired_cats[(idx + batch_index) % len(desired_cats)]
        cat_matches = [s for s in topic_stories if s.get("lengthCategory") == target_cat]
        chosen = cat_matches[batch_index % len(cat_matches)] if cat_matches else topic_stories[batch_index % len(topic_stories)]
        dur = int(chosen.get("durationSec") or 75)
        if total_sec + dur <= MAX_SESSION_SECONDS - 40:
            selected.append(chosen)
            used_ids.add(chosen["id"])
            total_sec += dur

    remaining = [s for s in pool if s["id"] not in used_ids]
    for candidate in remaining:
        dur = int(candidate.get("durationSec") or 75)
        if total_sec + dur <= 1265:
            selected.append(candidate)
            used_ids.add(candidate["id"])
            total_sec += dur
        if total_sec >= 1170:
            break

    while len(selected) > 1 and sum(int(s.get("durationSec") or 75) for s in selected) > MAX_SESSION_SECONDS:
        selected.pop()

    return selected


def write_audio_manifest(stories: list[dict[str, Any]], default_lineup: list[dict[str, Any]]) -> None:
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
        "maxDurationSec": MAX_SESSION_SECONDS,
        "maxDailyRefreshes": MAX_DAILY_REFRESHES,
        "voiceModels": VOICES,
        "defaultPlaylist": [s["id"] for s in default_lineup],
        "stories": verified,
        "verifiedClipCount": len(verified) * 2,
    }
    MANIFEST_PATH.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def build_sessions(lineup: list[dict[str, Any]]) -> None:
    ffmpeg = shutil.which("ffmpeg")
    if not ffmpeg:
        raise RuntimeError("ffmpeg is required to concatenate the daily sessions")
    with tempfile.TemporaryDirectory() as temporary:
        list_file = Path(temporary) / "concat.txt"
        list_file.write_text(
            "".join(
                f"file '{(AUDIO_ROOT / 'female' / (story['id'] + '.mp3')).as_posix()}'\n"
                for story in lineup
            ),
            encoding="utf-8",
        )
        female = ROOT / "audio" / "session-female.mp3"
        subprocess.run(
            [ffmpeg, "-y", "-f", "concat", "-safe", "0", "-i", str(list_file), "-c:a", "libmp3lame", "-q:a", "4", str(female)],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.PIPE,
        )
        list_file.write_text(
            "".join(
                f"file '{(AUDIO_ROOT / 'male' / (story['id'] + '.mp3')).as_posix()}'\n"
                for story in lineup
            ),
            encoding="utf-8",
        )
        male = ROOT / "audio" / "session-male.mp3"
        subprocess.run(
            [ffmpeg, "-y", "-f", "concat", "-safe", "0", "-i", str(list_file), "-c:a", "libmp3lame", "-q:a", "4", str(male)],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.PIPE,
        )
    shutil.copyfile(female, ROOT / "audio" / "session-current.mp3")


def write_session_meta(lineup: list[dict[str, Any]]) -> None:
    now = datetime.now(timezone.utc).isoformat()
    total_sec = sum(int(story.get("durationSec") or 75) for story in lineup)
    segments = [
        {
            "id": story["id"],
            "title": story["title"],
            "topic": story.get("topic", ""),
            "durationSec": story.get("durationSec", 75),
            "lengthCategory": story.get("lengthCategory", "medium"),
            "date": story.get("publishedDate") or story.get("date") or "",
            "text": story["script"],
            "kind": "story",
            "source": story.get("source", ""),
            "region": "每日科普与全球新知",
            "link": story.get("url", ""),
        }
        for story in lineup
    ]
    metadata = {
        "updatedAt": now,
        "builtAt": now,
        "slot": "daily",
        "targetDurationSec": TARGET_SECONDS,
        "maxDurationSec": MAX_SESSION_SECONDS,
        "actualDurationSec": total_sec,
        "maxDailyRefreshes": MAX_DAILY_REFRESHES,
        "durationLabel": "约 20 分钟（不超过 22 分钟）",
        "audio": "audio/session-current.mp3",
        "voiceModels": VOICES,
        "segmentCount": len(segments),
        "segments": segments,
    }
    META_PATH.write_text(json.dumps(metadata, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--skip-audio", action="store_true", help="update JSON and metadata without invoking edge-tts")
    parser.add_argument("--max-new", type=int, default=18, help="max new stories to fetch from live feeds")
    args = parser.parse_args()

    stories, changed_ids = refresh_story_bank(max_new_fetch=args.max_new)
    if not args.skip_audio:
        asyncio.run(synthesize_and_measure(stories, changed_ids))
        lineup = select_lineup(stories)
        write_audio_manifest(stories, lineup)
        build_sessions(lineup)
    else:
        lineup = select_lineup(stories)
    write_session_meta(lineup)
    total_sec = sum(int(s.get("durationSec") or 75) for s in lineup)
    print(f"[done] updatedAt={datetime.now(timezone.utc).isoformat()} lineup={len(lineup)} stories ({total_sec}s)")


if __name__ == "__main__":
    main()
