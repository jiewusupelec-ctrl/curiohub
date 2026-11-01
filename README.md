# 小小知识电台 — v2 使用说明

儿童向简体中文音频新闻 / 知识播放器。默认每场约 **20 分钟**，面向约 10 岁听众。`server.py` 只用于本地预览；正式部署是纯静态 GitHub Pages。

## 如何打开

```bash
cd docs/kids-news-player
python3 server.py
```

打开 `http://127.0.0.1:8765/`。根路径会加载 v2 页面，健康检查为 `http://127.0.0.1:8765/api/health`。

## 播放与每日切换

- 播放 / 暂停、进度条、分段播放单都在播放器顶部。
- 每次默认从 44 条故事中选 15 条，覆盖 11 个主题，组成约 20 分钟播放单。
- “换一批”显示 `今日还可切换 20 / 20 次`，每点击一次消耗一次额度；计数按本地日历日保存在 `localStorage`，到 0 后按钮锁定，次日自动恢复。
- 换批会用新的种子重新抽取故事，并保证与上一批的播放单不同；加载期间会显示进度动画。
- “女声 / 男声”切换不消耗额度，会立即用同一播放单切换 MP3 片段。
- 播放器现在使用浅蓝天空渐变与独立的大幅卡通舞台；11 套场景会随故事主题、主题按钮和换批即时变化，播放中会轻轻漂浮、闪烁并出现声波环。
- 页面使用 `viewport-fit=cover`、安全区 inset 和触控友好按钮，适配桌面、平板横竖屏、Android 手机浏览器和 iPhone Safari。

## 两种 Edge Neural 语音

由开源 Python `edge-tts` 包生成，脚本使用 `asyncio.Semaphore(8)` 并发合成；语音预先保存为本地 MP3，播放期间不依赖浏览器语音能力：

- 女声：`zh-CN-XiaoxiaoNeural`
- 男声：`zh-CN-YunxiNeural`

`audio/clips/female/` 与 `audio/clips/male/` 各有 44 条 MP3；每条是约 75–95 秒的完整故事。默认拼接产物：

- `audio/session-female.mp3`
- `audio/session-male.mp3`
- `audio/session-current.mp3`（默认女声副本）

播放器已彻底移除浏览器 `speechSynthesis` / 机器朗读回退。每次打开、换批、切故事和切换声线，都只接受服务器已验证的两套自然神经网络 MP3；音频加载失败时会停止并提示重试，不会突然换成人机语音。`/api/refresh` 只有在 44 条故事的男女声文件都存在且有效时才返回成功。

`edge-tts` Python 包是开源软件；音频文件已本地预生成，因此播放器长期运行无需在线合成。Xiaoxiao/Yunxi 是 Edge 的免费神经声线服务，实际部署仍应遵守该服务及声线条款。

重新生成需要联网访问 Edge TTS：

```bash
python3 -m pip install --user edge-tts
python3 generate_audio.py
```

## 11 个主题与内容来源

每个主题 4 条，共 44 条：**科学、航天、太空、AI、科技、金融、地理、发明、生物、大自然、简单政治**。故事由公开科普与儿童栏目改写为具体、可理解、有收获的叙事，不在正文插入年龄提示或填充句。

参考来源包括 NASA / NASA Space Place、国家航天局、中国科普博览、国家科技馆、中国国家地理、Science News Explores、National Geographic Kids、Smithsonian、UNICEF 等公开网页与儿童资源。每条故事的来源、链接和主题写在 `stories-v2.json` / `audio-manifest.json`。

## 文件

- `index-v2.html` / `styles-v2.css` / `app-v2.js` — v2 页面
- `index.html` — GitHub Pages 主入口，与 `index-v2.html` 完全一致
- `server.py` — 8765 本地服务
- `stories-v2.json` — 44 条中文故事原稿（男女声片段校验清单）
- `generate_audio.py` — Edge TTS 并发生成器
- `audio-manifest.json` — 时长、声线、来源与默认播放单
- `update_daily_stories.py` — 构建期 RSS 更新、双声线生成与会话拼接
- `.github/workflows/daily-update-and-deploy.yml` — GitHub Pages 发布与每日两次更新
- `deploy-to-github.sh` / `deploy-to-github.bat` — 一键初始化、提交和推送

## GitHub Pages 部署

GitHub Pages 访问者只下载 HTML、CSS、JavaScript、JSON 和 MP3，不需要 Python 运行时。`app-v2.js` 会先尝试相对路径 `./api/refresh`；GitHub Pages 没有该接口时，会自动回退到 `./stories-v2.json`。故事 JSON 为每条故事提供 `./audio/clips/female/<id>.mp3` 与 `./audio/clips/male/<id>.mp3`，因此换一批、声线切换、主题预览和 20 分钟播放单都能在项目子路径下工作。

### 一键发布

1. 在 GitHub 创建一个空仓库，复制 HTTPS 或 SSH 仓库地址。
2. macOS / Linux / Git Bash 在本目录运行：

   ```bash
   bash deploy-to-github.sh https://github.com/你的账号/你的仓库.git
   ```

   Windows 双击 `deploy-to-github.bat`，或在命令提示符运行 `deploy-to-github.bat <仓库地址>`。
3. 第一次 Actions 运行后，在仓库的 **Settings → Pages** 将构建来源设为 **GitHub Actions**。之后工作流会自动上传并发布静态站点。

脚本会在当前播放器目录初始化 `main` 分支、设置 `origin`、提交所有文件并推送。请先在本机配置好 GitHub 登录凭据；不要把访问令牌写入脚本或提交到仓库。

### 每日自动更新

`.github/workflows/daily-update-and-deploy.yml` 会在以下时机运行：

- UTC `22:30` 与 `08:30`（北京时间次日 `06:30` 与 `16:30`）
- 推送到 `main`
- 手动 `workflow_dispatch`

工作流安装 Python、`ffmpeg` 和开源 `edge-tts`，运行 `update_daily_stories.py`。脚本抓取 NASA、Science News Explores、BBC Newsround 及中国公开科普 / 航天源，按 11 个主题筛选，保留至少 44 条故事；新故事使用 `asyncio.Semaphore(8)` 并行生成 `zh-CN-XiaoxiaoNeural` 女声和 `zh-CN-YunxiNeural` 男声 MP3，并更新 `session-meta.json`、双声线拼接会话和静态故事路径。抓取失败时保留现有精选故事，不会让部署变空。

工作流会把变更后的 JSON、MP3 和页面提交回 `main`，再通过 `actions/upload-pages-artifact` 与 `actions/deploy-pages` 发布。生成提交带有 `[skip ci]`，避免更新提交触发无休止的重复运行。

