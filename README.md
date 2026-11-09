# 小小知识电台 — v2 使用说明

儿童向简体中文音频新闻 / 知识播放器。默认每场约 **20 分钟（严格不超过 22 分钟）**，面向约 10 岁听众。`server.py` 只用于本地预览；正式部署是纯静态 GitHub Pages。

## 如何打开

```bash
cd docs/kids-news-player
python3 server.py
```

打开 `http://127.0.0.1:8765/`。根路径会加载 v2 页面，健康检查为 `http://127.0.0.1:8765/api/health`。

## 播放、长短搭配与每日 5 次切换

- 播放 / 暂停、进度条、分段播放单都在播放器顶部。
- 每篇故事不再固定为 1 分 18 秒，而是根据故事内容自然采用**长短搭配**：
  - **短篇快讯**：约 40–65 秒
  - **中篇故事**：约 75–115 秒
  - **深度长篇**：约 125–175 秒
- 每次自动从最新故事库中组合约 **20 分钟**（总时长严格控制在 **22 分钟 / 1320 秒以内**）的播放单，覆盖 11 个知识主题；根据长短搭配不同，每场包含约 11–16 条故事。
- “换一批”显示 `今日还可切换 5 / 5 次`，每点击一次消耗一次额度；计数与已听历史按日历日保存在 `localStorage`，到 0 后按钮锁定，次日自动恢复。
- **零重复保障**：当天初始播放单与 5 次“换一批”（共 6 批）优先选用最新日期的未听故事，保证同一天内各批次 **100% 不重样**，并跨天记录已听 ID（`kids-news-player-history-v3`），避免连续几天听到相同内容。
- “女声 / 男声”切换不消耗额度，会立即用同一播放单切换 MP3 片段。
- 播放器使用浅蓝天空渐变与独立的大幅卡通舞台；11 套场景会随故事主题、主题按钮和换批即时变化，播放中会轻轻漂浮、闪烁并出现声波环。

## 两种 Edge Neural 语音

由开源 Python `edge-tts` 包生成，脚本使用 `asyncio.Semaphore(8)` 并发合成；语音预先保存为本地 MP3，播放期间不依赖浏览器语音能力：

- 女声：`zh-CN-XiaoxiaoNeural`
- 男声：`zh-CN-YunxiNeural`

`audio/clips/female/` 与 `audio/clips/male/` 保存了全部故事的双声线 MP3，并由 `ffprobe` 实测真实秒数写入 `stories-v2.json`。默认拼接产物：

- `audio/session-female.mp3`
- `audio/session-male.mp3`
- `audio/session-current.mp3`（默认女声副本）

重新生成需要联网访问 Edge TTS：

```bash
python3 -m pip install --user edge-tts
python3 update_daily_stories.py
```

## 11 个主题与每日内容来源

涵盖 11 个主题：**科学、航天、太空、AI、科技、金融、地理、发明、生物、大自然、简单政治**。

参考来源包括 NASA、Spaceflight News API、维基百科“科学史上的今天”、Science News Explores、ScienceDaily、Phys.org、BBC Science & Environment、BBC Newsround、New Scientist、Solidot 奇客科学、少数派、爱范儿、国家航天局、中国科学院等公开科普与新闻源。每条故事的来源、链接、发布日期、时长分类和真实秒数写在 `stories-v2.json` / `audio-manifest.json`，并通过 `seen_history.json` 记录已抓取过的链接与标题，保证每日更新不重复。

## 文件

- `index-v2.html` / `styles-v2.css` / `app-v2.js` — v2 页面与播放器逻辑（每日 5 次不重复换批、长短搭配 ≤22 分钟）
- `index.html` — GitHub Pages 主入口，与 `index-v2.html` 完全一致
- `server.py` — 8765 本地服务
- `stories-v2.json` — 中文故事库（含短篇、中篇、长篇与实测时长）
- `seen_history.json` — 已抓取链接与标题去重记录
- `audio-manifest.json` — 时长、声线、来源与默认播放单
- `update_daily_stories.py` — 每日多源抓取、儿童向故事改写、双声线生成与会话拼接
- `.github/workflows/daily-update-and-deploy.yml` — GitHub Pages 发布与每日两次自动更新
- `deploy-to-github.sh` / `deploy-to-github.bat` — 一键初始化、提交和推送
- `project.config.json` & `miniprogram/` — **微信小程序完整原生版**（支持微信后台与锁屏连续播放、11 个主题卡通舞台、男女声切换、每日 5 次不重样换批、自动同步 GitHub Pages 最新每日故事与离线精选库兜底；详见 [`miniprogram/README.md`](./miniprogram/README.md)）
