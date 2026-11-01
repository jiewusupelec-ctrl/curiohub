#!/usr/bin/env python3
# Copyright (C) 2026 Lenovo
# All Rights Reserved.
# Lenovo Confidential Restricted.

"""
Generate the 44-story, two-voice audio bank for 小小新闻电台.

Usage:
    python3 generate_audio.py
"""

from __future__ import annotations

import argparse
import asyncio
import json
import subprocess
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parent
STORIES_PATH = ROOT / "stories.json"
AUDIO_ROOT = ROOT / "audio"
CLIPS_ROOT = AUDIO_ROOT / "clips"
VOICES = {
    "female": "zh-CN-XiaoxiaoNeural",
    "male": "zh-CN-YunxiNeural",
}
DEFAULT_IDS = [
    "science-02",
    "space-01",
    "space-05",
    "ai-01",
    "tech-02",
    "finance-01",
    "geography-01",
    "invention-03",
    "biology-01",
    "nature-01",
    "politics-01",
    "science-04",
    "space-03",
    "ai-03",
    "nature-04",
]

EXTENSIONS = {
    "科学": "做一个小观察时，先写下自己的猜想，再记录看到的变化，最后比较猜想和证据。科学不是猜得最像答案，而是愿意把过程说清楚，别人也能照着检查。",
    "航天": "每一项航天任务都有清楚的目标、备用方案和地面团队。工程师会把最小的螺丝、最短的延迟都算进去，因为在太空中，提前准备就是可靠性。",
    "太空": "望远镜和探测器看到的光，常常已经旅行了很久。我们研究它们，不只是为了知道远方长什么样，也是在追问地球和太阳系从哪里来、将来会怎样。",
    "AI": "使用智能工具时，先确认它的答案有没有证据，再检查它是否漏掉了重要的人和情况。会提问、会核实、会承担责任，才是比按下按钮更重要的智能。",
    "科技": "一项技术从实验室走进生活，还要经过安全测试、成本计算和长期维护。真正有用的科技，不只看起来新奇，还要让更多人用得起、用得久、用得放心。",
    "金融": "遇到钱的决定，可以先停十秒，问自己三个问题：我真的需要吗？最坏会怎样？有没有更稳妥的办法？把冲动换成比较，往往能保护未来的选择。",
    "地理": "地理学家会把地图、卫星图像和实地观察放在一起，因为一条线索很少能解释全部。学会从位置、方向、距离和相互影响去看世界，地图就活起来了。",
    "发明": "好的发明通常从真实需要出发，也要接受使用者的挑剔。画草图、做模型、找出失败原因、再改一次，这个循环比一次做对更能带来可靠的答案。",
    "生物": "生命之间很少是孤零零的个体，食物、住所、传粉和分解把它们连成网络。保护一种生物时，也要看看它依赖的环境，整个网络才能继续运转。",
    "大自然": "观察自然最好的工具有时只是耐心和笔记本：记下日期、地点、天气和变化，就能把一次偶遇变成长期记录。很多重要发现，都是从认真看开始的。",
    "简单政治": "公共决定需要事实、倾听和程序，也需要接受结果后继续沟通。尊重不同意见不等于放弃判断，而是让每个人都能用理由说话，并一起承担共同生活的责任。",
}

MORE = {
    "科学": "如果结果和预想不一样，不要急着把它改成自己喜欢的样子；重新测量、换一个条件、请别人重复，意外往往会变成新的问题。这样积累的小证据，最后能拼出可靠的结论。",
    "航天": "从地面看，发射只是一道几分钟的火焰；从工程角度看，它包含数年的设计、制造、训练和复盘。每一次任务留下的数据，都会让下一次飞得更远、更安全。",
    "太空": "人类目前只探索了宇宙很小的一角，许多答案仍然没有找到。正因为不知道，科学家才会设计新的观测方法，把一个遥远的亮点变成可以研究的证据。",
    "AI": "当你发现工具给出奇怪答案时，保留原问题和结果，告诉大人或老师一起检查。把错误留下来研究，比悄悄相信一个听起来很像真的句子，更能保护自己和别人。",
    "科技": "从一张草图到真正产品，中间还要考虑维修、回收和对环境的影响。好的设计会把使用者放在心里，也会为产品离开生活之后的去处提前负责。",
    "金融": "不要把别人的成功故事当成自己的保证，更不要把密码、验证码和身份证信息交给陌生人。保护信息、看清合同、需要时向可信任的大人求助，都是金钱安全的一部分。",
    "地理": "同一幅地图还可以叠加人口、降雨、交通和植被数据，原本安静的颜色就会讲出城市如何生活、河流怎样变化的故事。地图是观察世界的工具，不是世界本身。",
    "发明": "发明还要回答一个问题：谁能使用它？如果只能在实验室里工作，或让某些人更难行动，就需要继续改进。真正的创新会让生活更安全、更方便，也更有尊重。",
    "生物": "遇到野生动物或陌生植物时，不触摸、不喂食、不随意带走，是最基本的观察礼仪。保持距离，拍下时间和地点，才能让记录帮助研究，而不会打扰生命。",
    "大自然": "自然没有“没用”的角色，落叶、细菌、昆虫和风都在完成自己的工作。我们越了解这些联系，就越知道为什么保护一小块湿地、森林或海岸很重要。",
    "简单政治": "当规则需要改变时，可以先提出清楚的问题，再查找可靠资料，听取受到影响的人。参与公共生活不是一次说服所有人，而是把事情一步步做得更明白、更可检查。",
}


def full_script(story: dict) -> str:
    return f"{story['script']} {EXTENSIONS[story['topic']]} {MORE[story['topic']]}"

MALE_PACING = "把今天听到的知识讲给家人听，你也许会发现一个新的问题。"


async def synthesize_one(story: dict, voice_name: str, voice: str, sem: asyncio.Semaphore) -> None:
    path = CLIPS_ROOT / voice_name / f"{story['id']}.mp3"
    path.parent.mkdir(parents=True, exist_ok=True)
    async with sem:
        if path.exists() and path.stat().st_size > 1000:
            return
        text = full_script(story)
        if voice_name == "male":
            text = f"{text} {MALE_PACING}"
        communicate = edge_tts.Communicate(text, voice)
        await communicate.save(str(path))
        print(f"{voice_name}: {story['id']}", flush=True)


async def synthesize_bank(stories: list[dict]) -> None:
    sem = asyncio.Semaphore(8)
    tasks = [
        synthesize_one(story, voice_name, voice, sem)
        for story in stories
        for voice_name, voice in VOICES.items()
    ]
    await asyncio.gather(*tasks)


def duration(path: Path) -> float:
    output = subprocess.check_output(
        [
            "ffprobe",
            "-v",
            "error",
            "-show_entries",
            "format=duration",
            "-of",
            "default=nw=1:nk=1",
            str(path),
        ],
        text=True,
    ).strip()
    return float(output)


def concat_voice(stories: list[dict], voice_name: str, output_name: str) -> float:
    output = AUDIO_ROOT / output_name
    list_path = AUDIO_ROOT / f".concat-{voice_name}.txt"
    lines = []
    for story in stories:
        clip = CLIPS_ROOT / voice_name / f"{story['id']}.mp3"
        lines.append(f"file '{clip.as_posix()}'")
    list_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-f",
            "concat",
            "-safe",
            "0",
            "-i",
            str(list_path),
            "-c",
            "copy",
            str(output),
        ],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    list_path.unlink(missing_ok=True)
    return duration(output)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--force", action="store_true", help="regenerate existing clips")
    args = parser.parse_args()
    stories = json.loads(STORIES_PATH.read_text(encoding="utf-8"))
    if args.force:
        for voice_name in VOICES:
            for story in stories:
                (CLIPS_ROOT / voice_name / f"{story['id']}.mp3").unlink(missing_ok=True)
    AUDIO_ROOT.mkdir(parents=True, exist_ok=True)
    asyncio.run(synthesize_bank(stories))
    by_id = {story["id"]: story for story in stories}
    selected = [by_id[story_id] for story_id in DEFAULT_IDS]
    durations = {
        voice_name: {
            story["id"]: round(duration(CLIPS_ROOT / voice_name / f"{story['id']}.mp3"), 2)
            for story in stories
        }
        for voice_name in VOICES
    }
    session_durations = {
        voice_name: round(concat_voice(selected, voice_name, f"session-{voice_name}.mp3"), 2)
        for voice_name in VOICES
    }
    current = AUDIO_ROOT / "session-current.mp3"
    current.write_bytes((AUDIO_ROOT / "session-female.mp3").read_bytes())
    manifest = {
        "builtAt": __import__("datetime").datetime.now().isoformat(timespec="seconds"),
        "targetDurationSec": 1200,
        "voiceModels": VOICES,
        "stories": [
            {
                "id": story["id"],
                "topic": story["topic"],
                "title": story["title"],
                "source": story["source"],
                "url": story["url"],
                "script": full_script(story),
                "durationSec": durations["female"][story["id"]],
            }
            for story in stories
        ],
        "defaultPlaylist": DEFAULT_IDS,
        "sessionDurations": session_durations,
        "audio": {
            "female": "audio/session-female.mp3",
            "male": "audio/session-male.mp3",
            "current": "audio/session-current.mp3",
        },
    }
    (ROOT / "audio-manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(json.dumps({"clips": len(stories) * 2, "sessions": session_durations}, ensure_ascii=False))


if __name__ == "__main__":
    main()
