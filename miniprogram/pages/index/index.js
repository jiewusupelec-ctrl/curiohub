/*
 * Copyright (C) 2026 Lenovo
 * All Rights Reserved.
 * Lenovo Confidential Restricted.
 */

const {
  TOPICS,
  LENGTH_LABELS,
  PLAY_ICON_URI,
  PAUSE_ICON_URI,
  ART_TOPICS,
  BUNDLED_STORIES
} = require("../../data/bundled-stories");
const { audioService } = require("../../utils/audio");

const TARGET_SECONDS = 20 * 60;
const MIN_SESSION_SECONDS = 19 * 60;
const MAX_SESSION_SECONDS = 22 * 60; // Strictly <= 22 minutes (1320s)
const LIMIT = 5; // 5 daily refreshes
const STORAGE_KEY = "kids-news-mp-v3";
const HISTORY_KEY = "kids-news-mp-history-v3";
const REMOTE_STORIES_URL = "https://jiewusupelec-ctrl.github.io/curiohub/stories-v2.json";
const REMOTE_META_URL = "https://jiewusupelec-ctrl.github.io/curiohub/session-meta.json";

function todayKey() {
  const now = new Date();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${m}-${d}`;
}

function formatTime(seconds) {
  const safe = Math.max(0, Math.floor(Number(seconds) || 0));
  const mins = String(Math.floor(safe / 60)).padStart(2, "0");
  const secs = String(safe % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

function hashSeed(value) {
  let hash = 2166136261;
  const text = String(value);
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function randomOrder(items, seed) {
  const copy = [...items];
  let value = seed || 1;
  for (let i = copy.length - 1; i > 0; i -= 1) {
    value = (Math.imul(value ^ (value >>> 16), 2246822519) + 3266489917) >>> 0;
    const j = value % (i + 1);
    const tmp = copy[i];
    copy[i] = copy[j];
    copy[j] = tmp;
  }
  return copy;
}

function isLegacyStaticStory(story) {
  return /^(science|space|ai|tech|finance|geography|invention|biology|nature|politics)-\d+$/.test(
    String((story && story.id) || "")
  );
}

function getStoryDuration(story) {
  return Number(story && story.durationSec) || 75;
}

function getLengthCategory(story) {
  if (story && story.lengthCategory) return story.lengthCategory;
  const sec = getStoryDuration(story);
  if (sec <= 70) return "short";
  if (sec <= 120) return "medium";
  return "long";
}

function decorateStory(story) {
  if (!story || !story.id) return null;
  const dur = getStoryDuration(story);
  const cat = getLengthCategory(story);
  return {
    ...story,
    durationSec: dur,
    lengthCategory: cat,
    lengthBadge: LENGTH_LABELS[cat] || "精选故事",
    durationFormatted: formatTime(dur)
  };
}

Page({
  data: {
    topics: TOPICS,
    playIconUri: PLAY_ICON_URI,
    pauseIconUri: PAUSE_ICON_URI,
    heroClassName: "topic-science",
    heroArtUri: ART_TOPICS["科学"].dataUri,
    heroArtLabel: ART_TOPICS["科学"].label,
    artChanging: false,

    nowTitle: "准备开始",
    nowTopic: "从 11 个知识主题中选出今日新故事",
    voice: "female",
    playing: false,
    paused: false,
    playLabel: "点击播放",
    statusText: "正在准备今日故事……",
    statusTone: "",

    elapsedSeconds: 0,
    totalSeconds: TARGET_SECONDS,
    progressPercent: 0,
    timeLabel: "00:00 / 20:00",
    actualLabel: "本场总长约 20:00（≤22:00）",

    refreshes: 0,
    remainingRefreshes: LIMIT,
    remainingLabel: `今日还可切换 ${LIMIT} / ${LIMIT} 次`,
    refreshing: false,

    storyCountLabel: "长短搭配",
    playlistPill: `今日第 1 批（共 ${LIMIT + 1} 批）`,
    playlist: [],
    currentIndex: 0,
    currentStory: null,
    showScript: false,
    dataSourceBadge: "云端同步中…"
  },

  onLoad() {
    this._allStories = [];
    this._shownTodayIds = new Set();
    this._seenPastDaysIds = new Set();
    this._lastSignature = "";
    this._artTimer = null;
    this._seeking = false;

    this._loadUsageFromStorage();

    this._unsubscribeAudio = audioService.subscribe((eventType, snapshot) => {
      this._onAudioServiceEvent(eventType, snapshot);
    });

    this._initStoryBank();
  },

  onUnload() {
    if (this._unsubscribeAudio) {
      this._unsubscribeAudio();
      this._unsubscribeAudio = null;
    }
    if (this._artTimer) {
      clearTimeout(this._artTimer);
    }
  },

  onPullDownRefresh() {
    this._fetchRemoteStories()
      .then((stories) => {
        if (stories && stories.length >= 44) {
          this._allStories = stories.map(decorateStory).filter(Boolean);
          this.setData({ dataSourceBadge: `已同步最新库（${this._allStories.length} 条）` });
          wx.showToast({ title: "已同步最新故事库", icon: "success" });
        }
      })
      .catch(() => {
        wx.showToast({ title: "当前使用本地精选库", icon: "none" });
      })
      .finally(() => {
        wx.stopPullDownRefresh();
      });
  },

  onShareAppMessage() {
    const current = this.data.currentStory;
    return {
      title: current
        ? `正在听：${current.title} · WonderPod 好奇心补给站`
        : "WonderPod · 好奇心补给站（每天 20 分钟中文儿童科普电台）",
      path: "/pages/index/index",
      imageUrl: "https://jiewusupelec-ctrl.github.io/curiohub/assets/icons/wonderpod-banner-preview.png"
    };
  },

  _loadUsageFromStorage() {
    const today = todayKey();
    let refreshes = 0;
    try {
      const saved = wx.getStorageSync(STORAGE_KEY) || {};
      if (saved.day === today) {
        refreshes = Math.min(LIMIT, Number(saved.refreshes) || 0);
        if (Array.isArray(saved.shownTodayIds)) {
          this._shownTodayIds = new Set(saved.shownTodayIds);
        }
      } else {
        refreshes = 0;
        this._shownTodayIds = new Set();
      }
    } catch (_) {
      refreshes = 0;
      this._shownTodayIds = new Set();
    }

    try {
      const history = wx.getStorageSync(HISTORY_KEY) || {};
      const pastIds = [];
      Object.keys(history).forEach((day) => {
        if (day !== today && Array.isArray(history[day])) {
          pastIds.push(...history[day]);
        }
      });
      this._seenPastDaysIds = new Set(pastIds);
    } catch (_) {
      this._seenPastDaysIds = new Set();
    }

    const remaining = Math.max(0, LIMIT - refreshes);
    this.setData({
      refreshes,
      remainingRefreshes: remaining,
      remainingLabel: `今日还可切换 ${remaining} / ${LIMIT} 次`
    });
  },

  _saveUsageToStorage() {
    const today = todayKey();
    const refreshes = this.data.refreshes;
    const shownArr = Array.from(this._shownTodayIds);
    try {
      wx.setStorageSync(STORAGE_KEY, {
        day: today,
        refreshes,
        shownTodayIds: shownArr
      });

      const history = wx.getStorageSync(HISTORY_KEY) || {};
      history[today] = shownArr;
      const keys = Object.keys(history).sort().slice(-14);
      const trimmed = {};
      keys.forEach((k) => {
        trimmed[k] = history[k];
      });
      wx.setStorageSync(HISTORY_KEY, trimmed);
    } catch (_) {
      // Ignore storage write error
    }
  },

  _fetchRemoteStories() {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${REMOTE_STORIES_URL}?t=${Date.now()}`,
        method: "GET",
        timeout: 8000,
        success: (res) => {
          const raw = res.data;
          const list = Array.isArray(raw) ? raw : raw && Array.isArray(raw.stories) ? raw.stories : [];
          if (res.statusCode === 200 && list.length >= 44) {
            resolve(list);
          } else {
            reject(new Error("Invalid remote stories payload"));
          }
        },
        fail: (err) => reject(err)
      });
    });
  },

  _fetchRemoteSessionMeta() {
    return new Promise((resolve) => {
      wx.request({
        url: `${REMOTE_META_URL}?t=${Date.now()}`,
        method: "GET",
        timeout: 6000,
        success: (res) => {
          if (res.statusCode === 200 && res.data && res.data.updatedAt) {
            resolve(res.data);
          } else {
            resolve(null);
          }
        },
        fail: () => resolve(null)
      });
    });
  },

  async _initStoryBank() {
    // 1. Load bundled stories immediately for instant zero-wait startup
    this._allStories = BUNDLED_STORIES.map(decorateStory).filter(Boolean);
    if (this.data.refreshes === 0) {
      this._shownTodayIds = new Set();
    }
    const initSeed = hashSeed(`${todayKey()}-init-${this.data.refreshes}`);
    const initialPlaylist = this._makePlaylist(initSeed);
    this._applyPlaylist(initialPlaylist, false, "今日故事已准备好，点击播放开始（支持锁屏后台收听）。");
    this.setData({ dataSourceBadge: "内置精选库" });

    // 2. Asynchronously fetch latest daily stories from GitHub Pages
    try {
      const [remoteStories, sessionMeta] = await Promise.all([
        this._fetchRemoteStories(),
        this._fetchRemoteSessionMeta()
      ]);
      if (remoteStories && remoteStories.length >= 44) {
        this._allStories = remoteStories.map(decorateStory).filter(Boolean);
        const dateTag = sessionMeta && sessionMeta.updatedAt
          ? String(sessionMeta.updatedAt).slice(0, 10)
          : todayKey();
        this.setData({
          dataSourceBadge: `每日云端已同步 (${dateTag})`
        });
        // If user hasn't started playing yet, refresh initial playlist from latest remote bank
        if (!this.data.playing && !this.data.paused && this.data.refreshes === 0) {
          this._shownTodayIds = new Set();
          const freshPlaylist = this._makePlaylist(hashSeed(`${todayKey()}-remote-0`));
          this._applyPlaylist(
            freshPlaylist,
            false,
            `今日云端故事已就绪（${freshPlaylist.length} 条长短搭配），点击播放开始。`
          );
        }
      }
    } catch (_) {
      this.setData({ dataSourceBadge: "离线精选库（已就绪）" });
    }
  },

  _prioritizePool(candidates, seed) {
    const tier1 = [];
    const tier2 = [];
    const tier3 = [];
    const tier4 = [];

    for (let i = 0; i < candidates.length; i += 1) {
      const story = candidates[i];
      const shownToday = this._shownTodayIds.has(story.id);
      const seenPast = this._seenPastDaysIds.has(story.id);
      const legacy = isLegacyStaticStory(story);
      if (!shownToday && !seenPast && !legacy) {
        tier1.push(story);
      } else if (!shownToday && !legacy) {
        tier2.push(story);
      } else if (!shownToday && !seenPast) {
        tier3.push(story);
      } else {
        tier4.push(story);
      }
    }

    return [
      ...randomOrder(tier1, seed + 11),
      ...randomOrder(tier2, seed + 23),
      ...randomOrder(tier3, seed + 37),
      ...randomOrder(tier4, seed + 53)
    ];
  },

  _makePlaylist(seed) {
    const selected = [];
    const used = new Set();
    let totalSec = 0;

    const desiredCategories = [
      "short", "medium", "long", "short", "medium",
      "short", "long", "medium", "short", "medium", "short"
    ];
    const shuffledTopics = randomOrder(TOPICS, seed ^ 0x5a5a5a5a);

    for (let i = 0; i < shuffledTopics.length; i += 1) {
      const topic = shuffledTopics[i];
      const targetCat = desiredCategories[(i + this.data.refreshes) % desiredCategories.length];
      const topicPool = this._prioritizePool(
        this._allStories.filter(
          (story) =>
            story.topic === topic &&
            !used.has(story.id) &&
            !this._shownTodayIds.has(story.id)
        ),
        seed + i * 31
      );
      if (!topicPool.length) continue;

      const catMatch = topicPool.find(
        (story) =>
          story.lengthCategory === targetCat &&
          totalSec + story.durationSec <= MAX_SESSION_SECONDS - 35
      );
      const chosen = catMatch || topicPool[0];
      if (totalSec + chosen.durationSec <= MAX_SESSION_SECONDS - 35) {
        selected.push(chosen);
        used.add(chosen.id);
        totalSec += chosen.durationSec;
      }
    }

    const unseenExtras = this._prioritizePool(
      this._allStories.filter(
        (story) => !used.has(story.id) && !this._shownTodayIds.has(story.id)
      ),
      seed ^ 0x9e3779b9
    );
    const fallbackExtras = this._prioritizePool(
      this._allStories.filter(
        (story) => !used.has(story.id) && this._shownTodayIds.has(story.id)
      ),
      seed ^ 0x3c6ef372
    );
    const extras = [...unseenExtras, ...fallbackExtras];

    for (let i = 0; i < extras.length; i += 1) {
      const story = extras[i];
      if (totalSec + story.durationSec <= 1265) {
        selected.push(story);
        used.add(story.id);
        totalSec += story.durationSec;
      }
      if (totalSec >= 1165) break;
    }

    if (totalSec < MIN_SESSION_SECONDS) {
      for (let i = 0; i < extras.length; i += 1) {
        const story = extras[i];
        if (used.has(story.id)) continue;
        if (totalSec + story.durationSec <= MAX_SESSION_SECONDS) {
          selected.push(story);
          used.add(story.id);
          totalSec += story.durationSec;
          if (totalSec >= MIN_SESSION_SECONDS) break;
        }
      }
    }

    while (
      selected.length > 1 &&
      selected.reduce((sum, s) => sum + s.durationSec, 0) > MAX_SESSION_SECONDS
    ) {
      selected.pop();
    }

    return selected;
  },

  _applyPlaylist(playlist, autoplay = false, statusMessage = "") {
    playlist.forEach((story) => {
      this._shownTodayIds.add(story.id);
    });
    this._saveUsageToStorage();
    this._lastSignature = playlist.map((s) => s.id).join(",");

    audioService.setPlaylist(playlist, autoplay);
    const totalSec = audioService.getTotalPlaylistSeconds();
    const firstStory = playlist[0] || null;
    const remaining = Math.max(0, LIMIT - this.data.refreshes);

    this.setData({
      playlist,
      currentIndex: 0,
      currentStory: firstStory,
      totalSeconds: totalSec,
      elapsedSeconds: 0,
      progressPercent: 0,
      timeLabel: `00:00 / ${formatTime(totalSec)}`,
      actualLabel: `本场总长 ${formatTime(totalSec)}（≤22:00）`,
      storyCountLabel: `${playlist.length} 条故事 · 长短搭配`,
      playlistPill: `今日第 ${this.data.refreshes + 1} 批（共 ${LIMIT + 1} 批）`,
      remainingRefreshes: remaining,
      remainingLabel: `今日还可切换 ${remaining} / ${LIMIT} 次`,
      statusText: statusMessage || "今日故事已准备好，点击播放开始。",
      statusTone: ""
    });

    if (firstStory) {
      this._updateHeroAndNow(firstStory, 0);
    }
  },

  _updateHeroAndNow(story, index) {
    if (!story) return;
    const config = ART_TOPICS[story.topic] || ART_TOPICS["科学"];
    const prevTopic = this._currentHeroTopic;
    this._currentHeroTopic = story.topic;

    const nowTopicText = `${story.topic} · ${story.lengthBadge}（${story.durationFormatted}） · ${story.source}`;

    if (!prevTopic || prevTopic === story.topic) {
      this.setData({
        currentIndex: index,
        currentStory: story,
        nowTitle: story.title,
        nowTopic: nowTopicText,
        heroClassName: config.className,
        heroArtUri: config.dataUri,
        heroArtLabel: config.label,
        artChanging: false
      });
      return;
    }

    this.setData({
      currentIndex: index,
      currentStory: story,
      nowTitle: story.title,
      nowTopic: nowTopicText,
      heroClassName: config.className,
      artChanging: true
    });

    if (this._artTimer) clearTimeout(this._artTimer);
    this._artTimer = setTimeout(() => {
      this.setData({
        heroArtUri: config.dataUri,
        heroArtLabel: config.label,
        artChanging: false
      });
    }, 180);
  },

  _onAudioServiceEvent(eventType, snapshot) {
    if (eventType === "error") {
      this.setData({
        playing: false,
        paused: false,
        playLabel: "音频未能播放",
        statusText: "自然音频加载失败，请检查网络或配置小程序合法域名后重试。",
        statusTone: "error"
      });
      return;
    }

    if (eventType === "ended" && snapshot.completed) {
      const total = snapshot.totalDuration || this.data.totalSeconds;
      this.setData({
        playing: false,
        paused: false,
        elapsedSeconds: total,
        progressPercent: 100,
        timeLabel: `${formatTime(total)} / ${formatTime(total)}`,
        playLabel: "播放完成",
        statusText: "今天的 20 分钟广播听完了，可以点击“换一批”听全新故事。",
        statusTone: ""
      });
      return;
    }

    if (eventType === "trackchange" && snapshot.currentStory) {
      this._updateHeroAndNow(snapshot.currentStory, snapshot.currentIndex);
    }

    if (!this._seeking) {
      const denom = snapshot.totalDuration || this.data.totalSeconds || TARGET_SECONDS;
      const elapsed = Math.min(denom, Math.floor(snapshot.totalElapsed || 0));
      const percent = Math.min(100, Number(((elapsed / denom) * 100).toFixed(2)));
      const voiceName = snapshot.voice === "female" ? "女声（晓晓）" : "男声（云希）";
      let playLabel = this.data.playLabel;
      let statusText = this.data.statusText;

      if (snapshot.playing) {
        playLabel = "正在播放";
        statusText = `${voiceName} · 第 ${snapshot.currentIndex + 1}/${snapshot.playlist.length} 条 · 支持锁屏播放`;
      } else if (snapshot.paused) {
        playLabel = "已暂停";
        statusText = "已暂停，点击继续收听";
      }

      this.setData({
        voice: snapshot.voice,
        playing: snapshot.playing,
        paused: snapshot.paused,
        currentIndex: snapshot.currentIndex,
        currentStory: snapshot.currentStory,
        elapsedSeconds: elapsed,
        totalSeconds: denom,
        progressPercent: percent,
        timeLabel: `${formatTime(elapsed)} / ${formatTime(denom)}`,
        actualLabel: `本场总长 ${formatTime(denom)}（≤22:00）`,
        playLabel,
        statusText,
        statusTone: ""
      });
    }
  },

  onTogglePlay() {
    audioService.togglePlay();
  },

  onSelectVoice(e) {
    const voice = e.currentTarget.dataset.voice;
    if (!voice || voice === this.data.voice) return;
    audioService.setVoice(voice);
    const label = voice === "female" ? "女声（晓晓）" : "男声（云希）";
    this.setData({
      voice,
      statusText: `${label}已切换，当前播放单保持不变`,
      statusTone: ""
    });
  },

  onRefreshPlaylist() {
    if (this.data.refreshing) return;
    if (this.data.refreshes >= LIMIT) {
      this.setData({
        statusText: "今日 5 次换批额度已用完，明天会自动恢复并更新新内容。",
        statusTone: "error"
      });
      return;
    }

    const nextRefreshes = this.data.refreshes + 1;
    this.setData({
      refreshing: true,
      refreshes: nextRefreshes,
      statusText: "正在换一批不重样的新故事，请稍候……",
      statusTone: ""
    });

    setTimeout(() => {
      const seed = hashSeed(`${todayKey()}-batch-${nextRefreshes}-${Date.now()}`);
      let playlist = this._makePlaylist(seed);
      const sig = playlist.map((s) => s.id).join(",");
      if (sig === this._lastSignature) {
        playlist = this._makePlaylist(seed + 7919);
      }
      const totalSec = playlist.reduce((sum, s) => sum + s.durationSec, 0);
      this._applyPlaylist(
        playlist,
        false,
        `已切换到今日第 ${nextRefreshes + 1} 批全新故事（共 ${playlist.length} 条，长短搭配 ${formatTime(totalSec)}）。`
      );
      this.setData({
        refreshing: false,
        playLabel: "点击播放"
      });
    }, 220);
  },

  onTapSegment(e) {
    const index = Number(e.currentTarget.dataset.index);
    if (!Number.isInteger(index) || !this.data.playlist[index]) return;
    const wasPlaying = this.data.playing;
    audioService.playTrack(index, wasPlaying, 0);
    this._updateHeroAndNow(this.data.playlist[index], index);
    if (!wasPlaying) {
      const beforeSec = audioService.getElapsedBeforeCurrent();
      const totalSec = this.data.totalSeconds || TARGET_SECONDS;
      this.setData({
        elapsedSeconds: beforeSec,
        progressPercent: Math.min(100, Number(((beforeSec / totalSec) * 100).toFixed(2))),
        timeLabel: `${formatTime(beforeSec)} / ${formatTime(totalSec)}`,
        statusText: `已选第 ${index + 1} 条「${this.data.playlist[index].topic}」，点击播放即可收听。`
      });
    }
  },

  onTapTopic(e) {
    const topic = e.currentTarget.dataset.topic;
    if (!topic) return;

    const existingIdx = this.data.playlist.findIndex((item) => item.topic === topic);
    if (existingIdx >= 0) {
      const wasPlaying = this.data.playing;
      audioService.playTrack(existingIdx, wasPlaying, 0);
      this._updateHeroAndNow(this.data.playlist[existingIdx], existingIdx);
      const beforeSec = audioService.getElapsedBeforeCurrent();
      const totalSec = this.data.totalSeconds || TARGET_SECONDS;
      this.setData({
        elapsedSeconds: beforeSec,
        progressPercent: Math.min(100, Number(((beforeSec / totalSec) * 100).toFixed(2))),
        timeLabel: `${formatTime(beforeSec)} / ${formatTime(totalSec)}`,
        statusText: `已预览「${topic}」主题，点击播放即可收听。`,
        statusTone: ""
      });
      return;
    }

    const candidates = this._prioritizePool(
      this._allStories.filter((item) => item.topic === topic),
      Date.now()
    );
    const chosen = candidates[0];
    if (!chosen) return;

    const nextList = [chosen, ...this.data.playlist.filter((item) => item.id !== chosen.id)];
    while (
      nextList.length > 1 &&
      nextList.reduce((sum, s) => sum + s.durationSec, 0) > MAX_SESSION_SECONDS
    ) {
      nextList.pop();
    }
    this._applyPlaylist(nextList, false, `已把「${topic}」主题放到播放单第一段。`);
  },

  onSliderChanging(e) {
    this._seeking = true;
    const val = Number(e.detail.value) || 0;
    const denom = this.data.totalSeconds || TARGET_SECONDS;
    this.setData({
      elapsedSeconds: val,
      progressPercent: Math.min(100, Number(((val / denom) * 100).toFixed(2))),
      timeLabel: `${formatTime(val)} / ${formatTime(denom)}`
    });
  },

  onSliderChange(e) {
    const val = Number(e.detail.value) || 0;
    this._seeking = false;
    audioService.seekTotalSeconds(val);
  },

  onTapProgressBar() {
    // Handled smoothly by overlaid <slider>
  },

  onToggleScript() {
    this.setData({
      showScript: !this.data.showScript
    });
  },

  onOpenAbout() {
    wx.navigateTo({
      url: "/pages/about/about"
    });
  }
});
