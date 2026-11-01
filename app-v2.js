/*
 * Copyright (C) 2026 Lenovo
 * All Rights Reserved.
 * Lenovo Confidential Restricted.
 */

(() => {
  "use strict";

  const TARGET_SECONDS = 20 * 60;
  const LIMIT = 20;
  const STORAGE_KEY = "kids-news-player-v2";
  const TOPICS = ["科学", "航天", "太空", "AI", "科技", "金融", "地理", "发明", "生物", "大自然", "简单政治"];
  const VOICES = {
    female: "zh-CN-XiaoxiaoNeural",
    male: "zh-CN-YunxiNeural",
  };
  const ART_TOPICS = {
    "科学": {
      className: "topic-science",
      label: "科学 · 发现",
      svg: `<svg viewBox="0 0 330 190" role="img" aria-label="冒泡的科学实验室">
        <circle class="art-bg" cx="230" cy="94" r="86"/><circle class="sound-ring" cx="206" cy="105" r="44"/>
        <g class="hero-main">
          <path class="art-line" d="M85 39l-18 6 7 24m34-30 16 8-7 21"/><path class="art-line" d="M79 47c9-12 30-13 39-1"/>
          <path class="art-blue" d="M73 69h32l-5 73c-1 12-20 12-22 0z"/><path class="art-white" d="M76 113h27l-2 28c-2 11-19 11-21 0z"/>
          <path class="art-pink" d="M122 72h35l-14 69c-2 11-20 11-22 0z"/><path class="art-cream" d="M120 105h31l-8 36c-2 10-17 10-19 0z"/>
          <circle class="art-yellow orb" cx="82" cy="45" r="6"/><circle class="art-pink orb" cx="121" cy="34" r="5"/><circle class="art-blue orb" cx="151" cy="44" r="4"/>
          <circle class="art-yellow" cx="235" cy="91" r="25"/><circle class="art-dark" cx="235" cy="91" r="17"/>
          <path class="art-line" d="M247 104l22 22"/><path class="art-line" d="M235 61v-19m-30 49h-19m49 0h19m-27 27 0 18m-21-52 18 18m0-36-18 18m42 0-18 18m0-36 18 18"/>
          <path class="art-line" d="M269 47l3 8 8 3-8 3-3 8-3-8-8-3 8-3z"/>
        </g><g class="sparkle"><path class="art-line" d="M46 103v18m-9-9h18"/></g><g class="sparkle"><path class="art-line" d="M294 126v14m-7-7h14"/></g>
      </svg>`
    },
    "航天": {
      className: "topic-aerospace",
      label: "航天 · 出发",
      svg: `<svg viewBox="0 0 330 190" role="img" aria-label="发射中的卡通火箭">
        <circle class="art-bg" cx="225" cy="98" r="88"/><circle class="sound-ring" cx="210" cy="103" r="46"/>
        <g class="sparkle"><path class="art-line" d="M56 44v16m-8-8h16"/></g><g class="sparkle"><path class="art-line" d="M288 51v12m-6-6h12"/></g>
        <g class="hero-main">
          <path class="art-cream" d="M93 153c-19 5-35 16-39 26 13-2 28-7 41-18z"/><path class="art-yellow" d="M110 143c-2 17 4 29 13 39 7-13 9-28 4-43z"/>
          <path class="art-pink" d="M133 142c4 14 14 23 28 27-1-15-8-28-22-36z"/>
          <path class="art-white" d="M125 45c27 17 39 47 29 83l-23 31-33-20-1-38c6-26 13-43 28-56z"/>
          <path class="art-blue" d="M125 45c-5 18-3 32 7 45 18-9 25-23 28-38-10-7-22-10-35-7z"/>
          <path class="art-pink" d="M97 101 69 112c4 12 15 20 30 23l16-19z"/><path class="art-pink" d="m145 130 12 28c13-4 21-15 23-30l-18-14z"/>
          <circle class="art-dark" cx="125" cy="78" r="14"/><circle class="art-blue" cx="125" cy="78" r="8"/><circle class="art-white" cx="122" cy="75" r="3"/>
          <path class="art-line-dark" d="M119 105q8 7 16 0"/>
        </g><g class="orb"><path class="art-cream" d="M212 145c20-9 39-6 53 7-16 9-36 10-53 1z"/></g><g class="orb"><path class="art-white" d="M247 158c13-7 29-4 36 6-12 6-25 5-36 0z"/></g>
      </svg>`
    },
    "太空": {
      className: "topic-space",
      label: "太空 · 远方",
      svg: `<svg viewBox="0 0 330 190" role="img" aria-label="带环行星和望远镜">
        <circle class="art-bg" cx="222" cy="94" r="88"/><circle class="sound-ring" cx="210" cy="100" r="47"/>
        <g class="sparkle"><path class="art-line" d="M55 51v17m-9-8h18"/></g><g class="sparkle"><path class="art-line" d="M287 40v14m-7-7h14"/></g><g class="sparkle"><path class="art-line" d="M279 133v11m-6-5h12"/></g>
        <g class="hero-main">
          <ellipse class="art-yellow" cx="211" cy="84" rx="45" ry="12" transform="rotate(-12 211 84)"/><circle class="art-pink" cx="211" cy="84" r="29"/><ellipse class="art-cream" cx="211" cy="84" rx="43" ry="9" transform="rotate(-12 211 84)"/><circle class="art-pink" cx="211" cy="84" r="22"/>
          <path class="art-line-dark" d="M202 86q9 8 18 0"/><circle class="art-dark" cx="204" cy="78" r="2.5"/><circle class="art-dark" cx="218" cy="76" r="2.5"/>
          <path class="art-cream" d="M91 52c20 3 29 20 22 37-7 16-26 21-41 12 11-2 18-10 19-21 1-11-4-21-14-27z"/>
          <path class="art-blue" d="m88 141 35-19 9 11-35 18z"/><path class="art-white" d="m119 122 16-30 13 7-12 31z"/><circle class="art-yellow" cx="143" cy="92" r="11"/><path class="art-line" d="M91 153h76m-44-8 17-50"/>
        </g>
      </svg>`
    },
    "AI": {
      className: "topic-ai",
      label: "AI · 想一想",
      svg: `<svg viewBox="0 0 330 190" role="img" aria-label="思考中的可爱机器人">
        <circle class="art-bg" cx="222" cy="96" r="87"/><circle class="sound-ring" cx="208" cy="105" r="45"/>
        <g class="sparkle"><path class="art-line" d="M65 50v16m-8-8h16"/></g><g class="sparkle"><path class="art-line" d="M278 42v15m-7-7h14"/></g><g class="orb"><circle class="art-yellow" cx="275" cy="78" r="6"/></g>
        <g class="hero-main">
          <path class="art-line" d="M158 69V48m0 0c0-10 15-10 15 0"/><circle class="art-yellow" cx="158" cy="40" r="7"/>
          <rect class="art-white" x="117" y="67" width="82" height="61" rx="20"/><rect class="art-blue" x="129" y="78" width="58" height="35" rx="13"/>
          <circle class="art-dark" cx="148" cy="94" r="6"/><circle class="art-dark" cx="169" cy="94" r="6"/><path class="art-line-dark" d="M148 104q11 8 22 0"/>
          <path class="art-pink" d="M117 83 99 92l18 10zm82 0 18 9-18 10z"/><rect class="art-cream" x="137" y="127" width="17" height="22" rx="8"/><rect class="art-cream" x="163" y="127" width="17" height="22" rx="8"/>
          <path class="art-line" d="M108 147h84"/><path class="art-line" d="M221 70q21-20 37-3"/><path class="art-line" d="M232 53l11 14 13-14"/>
        </g>
      </svg>`
    },
    "科技": {
      className: "topic-tech",
      label: "科技 · 发明",
      svg: `<svg viewBox="0 0 330 190" role="img" aria-label="发光芯片和高速小火车">
        <circle class="art-bg" cx="224" cy="95" r="88"/><circle class="sound-ring" cx="207" cy="106" r="47"/>
        <g class="sparkle"><path class="art-line" d="M55 56v16m-8-8h16"/></g><path class="art-line" d="M285 52l6 12 12 6-12 6-6 13-6-13-12-6 12-6z"/>
        <g class="hero-main">
          <rect class="art-yellow" x="101" y="61" width="73" height="73" rx="13"/><rect class="art-blue" x="114" y="74" width="47" height="47" rx="8"/><circle class="art-dark" cx="138" cy="98" r="10"/><path class="art-line" d="M138 85v26m-13-13h26"/>
          <path class="art-line" d="M110 52v10m18-10v10m19-10v10m18-10v10m-65 82v10m18-10v10m19-10v10m18-10v10M91 73h10m-10 20h10m-10 20h10m73-40h10m-10 20h10m-10 20h10"/>
          <path class="art-pink" d="M187 121h61l14 18h-91z"/><path class="art-white" d="M199 104h35l14 17h-50z"/><circle class="art-dark" cx="204" cy="140" r="7"/><circle class="art-dark" cx="247" cy="140" r="7"/>
          <path class="art-yellow" d="m276 91 11 10-11 10 11 10-11 10" fill="none" stroke="#ffd15f" stroke-width="6"/>
        </g>
      </svg>`
    },
    "金融": {
      className: "topic-finance",
      label: "金融 · 小计划",
      svg: `<svg viewBox="0 0 330 190" role="img" aria-label="存钱罐和金币宝箱">
        <circle class="art-bg" cx="222" cy="95" r="88"/><circle class="sound-ring" cx="207" cy="108" r="46"/>
        <g class="sparkle"><path class="art-line" d="M64 47v16m-8-8h16"/></g><g class="sparkle"><path class="art-line" d="M282 45v15m-7-7h14"/></g>
        <g class="hero-main">
          <path class="art-green" d="M137 54c-2-18 17-25 22-8 11-15 28-3 19 11-11 11-28 10-41-3z"/>
          <ellipse class="art-pink" cx="135" cy="111" rx="54" ry="38"/><circle class="art-pink" cx="181" cy="99" r="21"/><ellipse class="art-dark" cx="188" cy="96" rx="3" ry="5"/><circle class="art-dark" cx="176" cy="91" r="3"/><path class="art-line-dark" d="M174 105q8 7 15 0"/><path class="art-line-dark" d="M104 143v12m49-12v12m-34-68h20"/><ellipse class="art-cream" cx="120" cy="89" rx="10" ry="4"/>
          <rect class="art-yellow" x="205" y="121" width="66" height="33" rx="7"/><path class="art-line-dark" d="M205 130h66"/><circle class="art-cream" cx="238" cy="137" r="8"/><circle class="art-yellow" cx="245" cy="105" r="13"/><circle class="art-cream" cx="265" cy="112" r="11"/>
        </g>
      </svg>`
    },
    "地理": {
      className: "topic-geography",
      label: "地理 · 去旅行",
      svg: `<svg viewBox="0 0 330 190" role="img" aria-label="带山脉和指南针的卡通地球">
        <circle class="art-bg" cx="221" cy="96" r="88"/><circle class="sound-ring" cx="207" cy="105" r="47"/>
        <g class="sparkle"><path class="art-line" d="M59 45v16m-8-8h16"/></g><g class="orb"><path class="art-white" d="M270 57q13-14 27 0 15-4 20 10h-55q-3-10 8-10z"/></g>
        <g class="hero-main">
          <circle class="art-blue" cx="145" cy="100" r="45"/><path class="art-green" d="M106 88q15-19 29-4 13 14 27 3 12-10 25 3l3 18q-21 17-39 14-22-4-45 6z"/><path class="art-white" d="m115 93 17-20 15 20 12-13 20 24h-64z"/>
          <circle class="art-cream" cx="244" cy="114" r="27"/><path class="art-pink" d="m244 91 6 17 17 6-17 6-6 18-6-18-17-6 17-6z"/><path class="art-line" d="M244 87v-9m0 63v9m-31-32h-9m71 0h9"/>
          <path class="art-line" d="M120 157h110"/>
        </g>
      </svg>`
    },
    "发明": {
      className: "topic-invention",
      label: "发明 · 好点子",
      svg: `<svg viewBox="0 0 330 190" role="img" aria-label="会思考的发光灯泡和齿轮">
        <circle class="art-bg" cx="220" cy="96" r="88"/><circle class="sound-ring" cx="207" cy="106" r="46"/>
        <g class="sparkle"><path class="art-line" d="M59 48v16m-8-8h16"/></g><g class="sparkle"><path class="art-line" d="M288 50l4 9 9 4-9 4-4 9-4-9-9-4 9-4z"/></g>
        <g class="hero-main">
          <path class="art-yellow" d="M135 53c-31 0-48 34-32 59 7 11 18 16 19 28h28c1-12 13-17 19-28 16-25-1-59-34-59z"/><path class="art-line-dark" d="M124 142h26m-22 8h18"/>
          <circle class="art-dark" cx="125" cy="88" r="4"/><circle class="art-dark" cx="145" cy="88" r="4"/><path class="art-line-dark" d="M126 102q9 9 18 0"/>
          <path class="art-line-dark" d="M110 80q-11-11-17-20m54 18q12-12 18-25"/>
          <circle class="art-blue" cx="226" cy="126" r="24"/><circle class="art-dark" cx="226" cy="126" r="9"/><path class="art-line" d="M226 91v12m0 46v12m-35-35h12m46 0h12"/>
          <path class="art-pink" d="m281 72 8 25-14-8-8 14-1-26z"/><path class="art-line" d="M268 63l-19 29"/>
        </g>
      </svg>`
    },
    "生物": {
      className: "topic-biology",
      label: "生物 · 生命圈",
      svg: `<svg viewBox="0 0 330 190" role="img" aria-label="海洋动物和 DNA 叶片">
        <circle class="art-bg" cx="223" cy="96" r="88"/><circle class="sound-ring" cx="207" cy="107" r="46"/>
        <g class="sparkle"><path class="art-line" d="M58 52v16m-8-8h16"/></g><g class="orb"><circle class="art-yellow" cx="283" cy="57" r="6"/></g>
        <g class="hero-main">
          <path class="art-blue" d="M77 113c18-30 66-31 91-6 13-2 28 4 32 15-13 4-24 3-34-2-20 28-69 24-89-7z"/><path class="art-line-dark" d="M94 119q9 7 18 0m44-5q11 0 17 6"/><circle class="art-dark" cx="99" cy="110" r="3"/><path class="art-white" d="M78 113 58 96l6 27z"/>
          <path class="art-line" d="M211 61c-26 14-26 30 0 44s26 30 0 44m0-88c26 14 26 30 0 44s-26 30 0 44M197 75h28m-28 30h28m-28 29h28"/>
          <path class="art-green" d="M258 140c1-21 15-35 34-38-2 20-12 35-34 38z"/><path class="art-line" d="M259 139 286 107"/>
        </g>
      </svg>`
    },
    "大自然": {
      className: "topic-nature",
      label: "大自然 · 去看看",
      svg: `<svg viewBox="0 0 330 190" role="img" aria-label="彩虹森林和蝴蝶">
        <circle class="art-bg" cx="220" cy="97" r="88"/><circle class="sound-ring" cx="207" cy="107" r="46"/>
        <g class="hero-main">
          <circle class="art-yellow" cx="101" cy="62" r="22"/><path d="M60 96a53 53 0 0 1 106 0" fill="none" stroke="#ff9c91" stroke-width="7"/><path d="M69 96a44 44 0 0 1 88 0" fill="none" stroke="#ffd15f" stroke-width="7"/><path d="M79 96a34 34 0 0 1 68 0" fill="none" stroke="#8bd59f" stroke-width="7"/>
          <path class="art-green" d="M67 153V111l23-33 18 33 20-48 28 48v42z"/><path class="art-dark" d="M88 152v-29h14v29m31 0v-35h15v35z"/>
          <path class="art-blue" d="M211 76q8 13 0 25m18-25q8 13 0 25m18-25q8 13 0 25"/><path class="art-line" d="M208 72v-12m20 12V57m20 15V60"/>
          <path class="art-pink" d="M277 127q-13-18-25 0 12 0 25 0 12-18 25 0-13 13-25 0z"/><circle class="art-yellow" cx="277" cy="127" r="4"/><path class="art-line" d="M277 131v17"/>
        </g><g class="sparkle"><path class="art-line" d="M287 96v14m-7-7h14"/></g>
      </svg>`
    },
    "简单政治": {
      className: "topic-civics",
      label: "社区 · 一起做",
      svg: `<svg viewBox="0 0 330 190" role="img" aria-label="友好的社区市政厅和和平鸽">
        <circle class="art-bg" cx="223" cy="96" r="88"/><circle class="sound-ring" cx="207" cy="107" r="46"/>
        <g class="sparkle"><path class="art-line" d="M58 51v16m-8-8h16"/></g><g class="orb"><path class="art-white" d="M275 57q14-13 27 0 14-4 18 10h-54q-3-10 9-10z"/></g>
        <g class="hero-main">
          <path class="art-cream" d="m104 83 42-29 42 29z"/><path class="art-white" d="M112 83h68v56h-68z"/><path class="art-blue" d="M121 94h12v30h-12zm23 0h12v30h-12zm23 0h12v30h-12z"/><path class="art-pink" d="M105 139h84v11h-84z"/><circle class="art-yellow" cx="146" cy="66" r="7"/>
          <path class="art-line" d="M72 149q23-25 45 0m-45 0h45m83 0q23-25 46 0m-46 0h46"/>
          <path class="art-blue" d="M246 66q24 4 31 24-22 3-35-12z"/><path class="art-white" d="M244 69q-9-15-22-4 11 9 25 9z"/><circle class="art-dark" cx="247" cy="72" r="2"/>
          <path class="art-line" d="M236 92q15 15 31 1"/>
        </g>
      </svg>`
    },
  };
  const el = {
    nowTitle: document.querySelector("#nowTitle"),
    nowTopic: document.querySelector("#nowTopic"),
    playBtn: document.querySelector("#playBtn"),
    playLabel: document.querySelector("#playLabel"),
    status: document.querySelector("#status"),
    refreshBtn: document.querySelector("#refreshBtn"),
    remainingLabel: document.querySelector("#remainingLabel"),
    loadingBar: document.querySelector("#loadingBar"),
    progressFill: document.querySelector("#progressFill"),
    timeLabel: document.querySelector("#timeLabel"),
    actualLabel: document.querySelector("#actualLabel"),
    segments: document.querySelector("#segments"),
    topicCloud: document.querySelector("#topicCloud"),
    storyCount: document.querySelector("#storyCount"),
    playlistPill: document.querySelector("#playlistPill"),
    heroArt: document.querySelector("#heroArt"),
    playerCard: document.querySelector(".player-card"),
  };
  const state = {
    manifest: null,
    stories: [],
    playlist: [],
    voice: "female",
    index: 0,
    elapsedBefore: 0,
    playing: false,
    paused: false,
    currentStartedAt: 0,
    totalSeconds: TARGET_SECONDS,
    refreshes: 0,
    audio: new Audio(),
    timer: null,
    audioToken: 0,
    currentClipUrl: "",
    lastSignature: "",
  };

  function todayKey() {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  }

  function loadUsage() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      if (saved.day === todayKey()) {
        state.refreshes = Math.min(LIMIT, Number(saved.refreshes) || 0);
      }
    } catch (_) {
      state.refreshes = 0;
    }
    updateRemaining();
  }

  function saveUsage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ day: todayKey(), refreshes: state.refreshes }));
  }

  function updateRemaining() {
    const remaining = Math.max(0, LIMIT - state.refreshes);
    el.remainingLabel.textContent = `今日还可切换 ${remaining} / ${LIMIT} 次`;
    el.refreshBtn.disabled = remaining === 0 || !state.manifest;
  }

  function hashSeed(value) {
    let hash = 2166136261;
    for (const char of String(value)) {
      hash ^= char.charCodeAt(0);
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
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function makePlaylist(seed) {
    const selected = [];
    const used = new Set();
    for (const topic of TOPICS) {
      const choices = randomOrder(state.stories.filter((story) => story.topic === topic), seed + topic.length);
      if (choices[0]) {
        selected.push(choices[0]);
        used.add(choices[0].id);
      }
    }
    const extras = randomOrder(state.stories.filter((story) => !used.has(story.id)), seed ^ 0x9e3779b9);
    for (const story of extras) {
      if (selected.length >= 15) break;
      selected.push(story);
    }
    return selected;
  }

  function setStatus(message, tone = "") {
    el.status.textContent = message;
    el.status.dataset.tone = tone;
  }

  function formatTime(seconds) {
    const safe = Math.max(0, Math.floor(seconds || 0));
    return `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
  }

  function getStoryDuration(story) {
    return Number(story.durationSec) || 78;
  }

  function totalPlaylistSeconds() {
    return state.playlist.reduce((sum, story) => sum + getStoryDuration(story), 0);
  }

  function normalizeStory(story) {
    if (!story || !story.id) return null;
    const id = encodeURIComponent(story.id);
    return {
      ...story,
      audio: {
        female: story.audio?.female || `./audio/clips/female/${id}.mp3`,
        male: story.audio?.male || `./audio/clips/male/${id}.mp3`,
      },
    };
  }

  function normalizeStories(stories) {
    return (Array.isArray(stories) ? stories : []).map(normalizeStory).filter(Boolean);
  }

  async function fetchJson(path) {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) throw new Error(`${path} returned ${response.status}`);
    return response.json();
  }

  async function loadManifest() {
    try {
      const remote = await fetchJson("./api/refresh");
      const stories = normalizeStories(remote.stories);
      if (stories.length >= 44) return { ...remote, stories };
    } catch (error) {
      console.info("本地 API 不可用，切换到静态故事库。", error);
    }
    const local = await fetchJson("./stories-v2.json");
    const stories = normalizeStories(Array.isArray(local) ? local : local.stories);
    if (stories.length < 44) throw new Error("static story bank incomplete");
    return { stories, source: "stories-v2.json", targetDurationSec: TARGET_SECONDS };
  }

  function elapsedSeconds() {
    if (!state.playing) return state.elapsedBefore;
    return state.elapsedBefore + Math.max(0, (Date.now() - state.currentStartedAt) / 1000);
  }

  function renderTopics() {
    el.topicCloud.innerHTML = TOPICS.map((topic) => `<button class="topic-tag" type="button" data-topic="${topic}">${topic}</button>`).join("");
    el.topicCloud.querySelectorAll(".topic-tag").forEach((button) => {
      button.addEventListener("click", () => previewTopic(button.dataset.topic));
    });
  }

  function renderPlaylist() {
    el.storyCount.textContent = `${state.playlist.length} 条故事`;
    el.playlistPill.textContent = `今日第 ${state.refreshes + 1} 版`;
    el.segments.innerHTML = state.playlist.map((story, index) => `
      <li class="segment${index === state.index ? " active" : ""}" data-index="${index}" tabindex="0">
        <p class="segment-title">${escapeHtml(story.title)}</p>
        <div class="segment-meta"><b>${escapeHtml(story.topic)}</b><span>${escapeHtml(story.source)}</span><span>${formatTime(getStoryDuration(story))}</span></div>
      </li>`).join("");
    el.segments.querySelectorAll(".segment").forEach((item) => {
      item.addEventListener("click", () => jumpTo(Number(item.dataset.index)));
      item.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") jumpTo(Number(item.dataset.index));
      });
    });
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[char]));
  }

  function updateNow() {
    const story = state.playlist[state.index];
    if (!story) return;
    el.nowTitle.textContent = story.title;
    el.nowTopic.textContent = `${story.topic} · ${story.source}`;
    renderHero(story);
    el.segments.querySelectorAll(".segment").forEach((item, index) => {
      item.classList.toggle("active", index === state.index);
    });
  }

  function renderHero(story) {
    const config = ART_TOPICS[story.topic] || ART_TOPICS["科学"];
    const previous = el.heroArt.dataset.topic;
    const paint = () => {
      el.heroArt.innerHTML = `${config.svg}<span class="art-caption">${config.label}</span>`;
      el.heroArt.dataset.topic = story.topic;
      el.heroArt.classList.remove("is-changing");
    };
    el.playerCard.classList.remove(...Object.values(ART_TOPICS).map((item) => item.className));
    el.playerCard.classList.add(config.className);
    if (!previous || previous === story.topic) {
      paint();
      return;
    }
    el.heroArt.classList.add("is-changing");
    window.setTimeout(paint, 180);
  }

  function updateProgress() {
    const elapsed = Math.min(state.totalSeconds, elapsedSeconds());
    el.progressFill.style.width = `${Math.min(100, (elapsed / TARGET_SECONDS) * 100)}%`;
    el.timeLabel.textContent = `${formatTime(elapsed)} / 20:00`;
    el.actualLabel.textContent = `语音实际约 ${formatTime(state.totalSeconds)}`;
  }

  function clipUrl(story) {
    return story.audio?.[state.voice] || `./audio/clips/${state.voice}/${encodeURIComponent(story.id)}.mp3`;
  }

  function previewTopic(topic) {
    const index = state.playlist.findIndex((story) => story.topic === topic);
    if (index >= 0) {
      jumpTo(index);
      setStatus(`已预览「${topic}」主题，点击播放即可收听。`);
      return;
    }
    const story = state.stories.find((item) => item.topic === topic);
    if (!story) return;
    state.playlist = [story, ...state.playlist.filter((item) => item.id !== story.id)].slice(0, 15);
    state.index = 0;
    state.elapsedBefore = 0;
    state.totalSeconds = totalPlaylistSeconds();
    renderPlaylist();
    loadClip(false);
    updateProgress();
    setStatus(`已把「${topic}」主题放到播放单第一段。`);
  }

  function loadClip(autoplay = false) {
    const story = state.playlist[state.index];
    if (!story) return;
    const token = ++state.audioToken;
    state.currentClipUrl = new URL(clipUrl(story), window.location.href).href;
    state.audio.src = state.currentClipUrl;
    state.audio.load();
    updateNow();
    if (autoplay) {
      state.audio.play().catch(() => {
        if (token === state.audioToken) handleAudioFailure();
      });
    }
  }

  function handleAudioFailure() {
    state.playing = false;
    state.paused = false;
    el.playerCard.classList.remove("is-playing");
    el.playBtn.classList.remove("playing");
    el.playBtn.setAttribute("aria-label", "播放");
    el.playLabel.textContent = "音频未能播放";
    setStatus("自然音频加载失败，请检查网络或点击播放重试。未切换为浏览器朗读。", "error");
  }

  function start() {
    if (!state.playlist.length) return;
    state.playing = true;
    state.paused = false;
    state.currentStartedAt = Date.now();
    el.playerCard.classList.add("is-playing");
    el.playBtn.classList.add("playing");
    el.playBtn.setAttribute("aria-label", "暂停");
    el.playLabel.textContent = "正在播放";
    setStatus(`${state.voice === "female" ? "女声" : "男声"} · ${state.index + 1}/${state.playlist.length} 条`);
    state.audio.play().catch(() => handleAudioFailure());
  }

  function pause() {
    state.elapsedBefore = Math.min(state.totalSeconds, elapsedSeconds());
    state.playing = false;
    state.paused = true;
    el.playerCard.classList.remove("is-playing");
    state.audio.pause();
    el.playBtn.classList.remove("playing");
    el.playBtn.setAttribute("aria-label", "播放");
    el.playLabel.textContent = "已暂停";
    setStatus("已暂停，点击继续");
    updateProgress();
  }

  function nextClip() {
    if (state.index >= state.playlist.length - 1) {
      state.elapsedBefore = state.totalSeconds;
      state.playing = false;
      state.paused = false;
      el.playerCard.classList.remove("is-playing");
      el.playBtn.classList.remove("playing");
      el.playLabel.textContent = "播放完成";
      setStatus("今天的 20 分钟广播听完了，可以换一批再听。");
      updateProgress();
      return;
    }
    state.elapsedBefore += getStoryDuration(state.playlist[state.index]);
    state.index += 1;
    loadClip(state.playing);
    updateProgress();
  }

  function jumpTo(index) {
    if (!Number.isInteger(index) || !state.playlist[index]) return;
    const wasPlaying = state.playing;
    state.audio.pause();
    state.index = index;
    state.elapsedBefore = state.playlist.slice(0, index).reduce((sum, story) => sum + getStoryDuration(story), 0);
    loadClip(wasPlaying);
    updateProgress();
  }

  function togglePlay() {
    if (state.playing) pause();
    else start();
  }

  function setVoice(voice) {
    if (!VOICES[voice] || state.voice === voice) return;
    const wasPlaying = state.playing;
    state.audio.pause();
    state.voice = voice;
    document.querySelectorAll(".voice-btn").forEach((button) => {
      button.classList.toggle("active", button.dataset.voice === voice);
    });
    loadClip(wasPlaying);
    setStatus(`${voice === "female" ? "女声" : "男声"} 已切换，播放单保持不变`);
  }

  async function refreshPlaylist(consume = false) {
    if (consume && state.refreshes >= LIMIT) {
      setStatus("今天的切换次数已用完，明天会自动恢复。", "error");
      return;
    }
    el.loadingBar.hidden = false;
    el.refreshBtn.disabled = true;
    setStatus("正在换一批故事，请稍候……");
    await new Promise((resolve) => window.requestAnimationFrame(resolve));
    state.audio.pause();
    el.playerCard.classList.remove("is-playing");
    state.playing = false;
    state.paused = false;
    if (consume) {
      state.refreshes += 1;
      saveUsage();
    }
    let seed = hashSeed(`${todayKey()}-${state.refreshes}-${Date.now()}`);
    let playlist = makePlaylist(seed);
    let signature = playlist.map((story) => story.id).join(",");
    if (signature === state.lastSignature) {
      playlist = makePlaylist(seed + 1);
      signature = playlist.map((story) => story.id).join(",");
    }
    state.lastSignature = signature;
    state.playlist = playlist;
    state.index = 0;
    state.elapsedBefore = 0;
    state.totalSeconds = totalPlaylistSeconds();
    renderPlaylist();
    loadClip(false);
    updateProgress();
    updateRemaining();
    setStatus(consume ? "已换成全新的故事组合，点击播放开始。" : "今日故事已准备好，点击播放开始。");
    el.loadingBar.hidden = true;
  }

  async function init() {
    loadUsage();
    renderTopics();
    try {
      state.manifest = await loadManifest();
      state.stories = normalizeStories(state.manifest.stories);
      if (state.stories.length < 44) throw new Error("story bank incomplete");
      state.playlist = makePlaylist(hashSeed(todayKey()));
      state.lastSignature = state.playlist.map((story) => story.id).join(",");
      state.totalSeconds = totalPlaylistSeconds();
      renderPlaylist();
      loadClip(false);
      updateProgress();
      updateRemaining();
      setStatus("今日故事已准备好，点击播放开始。");
    } catch (error) {
      setStatus("正在等待音频库生成，请刷新页面重试。", "error");
      el.loadingBar.hidden = true;
      console.error(error);
    }
    el.playBtn.addEventListener("click", togglePlay);
    el.refreshBtn.addEventListener("click", () => refreshPlaylist(true));
    document.querySelectorAll(".voice-btn").forEach((button) => {
      button.addEventListener("click", () => setVoice(button.dataset.voice));
    });
    state.audio.addEventListener("ended", nextClip);
    state.audio.addEventListener("error", () => {
      if (state.playing && state.audio.src === state.currentClipUrl) handleAudioFailure();
    });
    state.audio.addEventListener("timeupdate", updateProgress);
    state.audio.addEventListener("loadedmetadata", () => {
      updateProgress();
    });
    state.timer = window.setInterval(updateProgress, 500);
  }

  init();
})();
