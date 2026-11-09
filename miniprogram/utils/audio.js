/*
 * Copyright (C) 2026 Lenovo
 * All Rights Reserved.
 * Lenovo Confidential Restricted.
 */

const REMOTE_BASE_URL = "https://jiewusupelec-ctrl.github.io/curiohub";
const DEFAULT_COVER_URL = "https://jiewusupelec-ctrl.github.io/curiohub/assets/icons/wonderpod-icon-512.png";

class KidsRadioAudioService {
  constructor() {
    this.bgAudio = null;
    this.playlist = [];
    this.currentIndex = 0;
    this.voice = "female";
    this.playing = false;
    this.paused = false;
    this.clipCurrentTime = 0;
    this.clipDuration = 0;
    this.currentSrc = "";
    this.listeners = new Set();
    this._initManager();
  }

  _initManager() {
    if (typeof wx !== "undefined" && typeof wx.getBackgroundAudioManager === "function") {
      this.bgAudio = wx.getBackgroundAudioManager();
    } else if (typeof wx !== "undefined" && typeof wx.createInnerAudioContext === "function") {
      this.bgAudio = wx.createInnerAudioContext();
    }

    if (!this.bgAudio) return;

    if (typeof this.bgAudio.onPlay === "function") {
      this.bgAudio.onPlay(() => {
        this.playing = true;
        this.paused = false;
        this._emit("statechange", { event: "play" });
      });
    }

    if (typeof this.bgAudio.onPause === "function") {
      this.bgAudio.onPause(() => {
        this.playing = false;
        this.paused = true;
        this._emit("statechange", { event: "pause" });
      });
    }

    if (typeof this.bgAudio.onStop === "function") {
      this.bgAudio.onStop(() => {
        this.playing = false;
        this.paused = false;
        this.clipCurrentTime = 0;
        this._emit("statechange", { event: "stop" });
      });
    }

    if (typeof this.bgAudio.onEnded === "function") {
      this.bgAudio.onEnded(() => {
        this.next(true);
      });
    }

    if (typeof this.bgAudio.onTimeUpdate === "function") {
      this.bgAudio.onTimeUpdate(() => {
        this.clipCurrentTime = Number(this.bgAudio.currentTime) || 0;
        this.clipDuration = Number(this.bgAudio.duration) || this.getCurrentStoryDuration();
        this._emit("timeupdate", {
          clipCurrentTime: this.clipCurrentTime,
          clipDuration: this.clipDuration,
          totalElapsed: this.getTotalElapsedSeconds(),
          totalDuration: this.getTotalPlaylistSeconds()
        });
      });
    }

    if (typeof this.bgAudio.onError === "function") {
      this.bgAudio.onError((err) => {
        this.playing = false;
        this.paused = false;
        this._emit("error", { error: err });
      });
    }

    if (typeof this.bgAudio.onNext === "function") {
      this.bgAudio.onNext(() => {
        this.next(true);
      });
    }

    if (typeof this.bgAudio.onPrev === "function") {
      this.bgAudio.onPrev(() => {
        this.prev(true);
      });
    }
  }

  subscribe(callback) {
    if (typeof callback === "function") {
      this.listeners.add(callback);
    }
    return () => {
      this.listeners.delete(callback);
    };
  }

  _emit(type, payload = {}) {
    const snapshot = this.getSnapshot();
    this.listeners.forEach((cb) => {
      try {
        cb(type, { ...snapshot, ...payload });
      } catch (e) {
        console.error("[AudioService] listener error:", e);
      }
    });
  }

  resolveClipUrl(story, voice = this.voice) {
    if (!story || !story.id) return "";
    const raw = story.audio && story.audio[voice] ? story.audio[voice] : "";
    if (/^https?:\/\//i.test(raw)) {
      return raw;
    }
    if (raw.startsWith("./")) {
      return `${REMOTE_BASE_URL}/${raw.slice(2)}`;
    }
    if (raw.startsWith("/")) {
      return `${REMOTE_BASE_URL}${raw}`;
    }
    return `${REMOTE_BASE_URL}/audio/clips/${voice}/${encodeURIComponent(story.id)}.mp3`;
  }

  getStoryDuration(story) {
    return Number(story && story.durationSec) || 75;
  }

  getCurrentStory() {
    return this.playlist[this.currentIndex] || null;
  }

  getCurrentStoryDuration() {
    return this.getStoryDuration(this.getCurrentStory());
  }

  getElapsedBeforeCurrent() {
    let sum = 0;
    for (let i = 0; i < this.currentIndex; i += 1) {
      sum += this.getStoryDuration(this.playlist[i]);
    }
    return sum;
  }

  getTotalPlaylistSeconds() {
    return this.playlist.reduce((sum, story) => sum + this.getStoryDuration(story), 0);
  }

  getTotalElapsedSeconds() {
    const before = this.getElapsedBeforeCurrent();
    const currentMax = this.getCurrentStoryDuration();
    const current = Math.min(currentMax, Math.max(0, this.clipCurrentTime || 0));
    return Math.min(this.getTotalPlaylistSeconds(), before + current);
  }

  setPlaylist(playlist, autoplay = false) {
    this.playlist = Array.isArray(playlist) ? playlist : [];
    this.currentIndex = 0;
    this.clipCurrentTime = 0;
    this.clipDuration = this.getCurrentStoryDuration();
    if (!autoplay) {
      this.stopSilent();
      this._emit("playlistchange");
    } else {
      this.playTrack(0, true);
    }
  }

  stopSilent() {
    this.playing = false;
    this.paused = false;
    this.clipCurrentTime = 0;
    this.currentSrc = "";
    if (this.bgAudio && typeof this.bgAudio.stop === "function") {
      try {
        this.bgAudio.stop();
      } catch (_) {
        // Ignore stop errors when idle
      }
    }
  }

  playTrack(index = this.currentIndex, autoplay = true, startOffsetSec = 0) {
    if (!this.playlist.length) return;
    const boundedIndex = Math.max(0, Math.min(this.playlist.length - 1, Number(index) || 0));
    this.currentIndex = boundedIndex;
    const story = this.playlist[this.currentIndex];
    if (!story) return;

    this.clipCurrentTime = Math.max(0, Number(startOffsetSec) || 0);
    this.clipDuration = this.getStoryDuration(story);
    const url = this.resolveClipUrl(story, this.voice);

    if (!autoplay) {
      this.playing = false;
      this.paused = false;
      this._emit("trackchange", { story, index: this.currentIndex });
      return;
    }

    if (!this.bgAudio) return;

    const voiceLabel = this.voice === "female" ? "晓晓女声" : "云希男声";
    this.bgAudio.title = story.title || "WonderPod 小小知识电台";
    this.bgAudio.epname = `${story.topic || "科学"} · WonderPod 好奇心电台`;
    this.bgAudio.singer = `WonderPod 好奇心电台（${voiceLabel}）`;
    this.bgAudio.coverImgUrl = DEFAULT_COVER_URL;
    if (startOffsetSec > 0 && "startTime" in this.bgAudio) {
      this.bgAudio.startTime = Math.floor(startOffsetSec);
    } else if ("startTime" in this.bgAudio) {
      this.bgAudio.startTime = 0;
    }
    this.currentSrc = url;
    this.bgAudio.src = url;
    if (typeof this.bgAudio.play === "function") {
      try {
        this.bgAudio.play();
      } catch (_) {
        // BackgroundAudioManager auto-plays once src is assigned
      }
    }
    this.playing = true;
    this.paused = false;
    this._emit("trackchange", { story, index: this.currentIndex });
  }

  togglePlay() {
    if (!this.playlist.length) return;
    if (this.playing) {
      this.pause();
    } else if (this.paused && this.currentSrc) {
      this.resume();
    } else {
      this.playTrack(this.currentIndex, true, this.clipCurrentTime);
    }
  }

  pause() {
    if (!this.bgAudio) return;
    try {
      this.bgAudio.pause();
      this.playing = false;
      this.paused = true;
      this._emit("statechange", { event: "pause" });
    } catch (e) {
      console.error("[AudioService] pause error:", e);
    }
  }

  resume() {
    if (!this.bgAudio) return;
    const story = this.getCurrentStory();
    const expectedUrl = this.resolveClipUrl(story, this.voice);
    if (!this.currentSrc || this.currentSrc !== expectedUrl) {
      this.playTrack(this.currentIndex, true, this.clipCurrentTime);
      return;
    }
    try {
      this.bgAudio.play();
      this.playing = true;
      this.paused = false;
      this._emit("statechange", { event: "play" });
    } catch (e) {
      this.playTrack(this.currentIndex, true, this.clipCurrentTime);
    }
  }

  next(autoplay = true) {
    if (!this.playlist.length) return;
    if (this.currentIndex >= this.playlist.length - 1) {
      this.playing = false;
      this.paused = false;
      this.clipCurrentTime = this.getCurrentStoryDuration();
      this._emit("ended", { completed: true });
      return;
    }
    this.playTrack(this.currentIndex + 1, autoplay, 0);
  }

  prev(autoplay = true) {
    if (!this.playlist.length) return;
    if (this.clipCurrentTime > 5) {
      this.seekWithinCurrent(0);
      return;
    }
    const prevIdx = Math.max(0, this.currentIndex - 1);
    this.playTrack(prevIdx, autoplay, 0);
  }

  setVoice(voice) {
    if (voice !== "female" && voice !== "male") return;
    if (this.voice === voice) return;
    const wasPlaying = this.playing;
    const offset = this.clipCurrentTime;
    this.voice = voice;
    if (wasPlaying) {
      this.playTrack(this.currentIndex, true, offset);
    } else {
      this.currentSrc = "";
      this._emit("voicechange", { voice });
    }
  }

  seekWithinCurrent(seconds) {
    const story = this.getCurrentStory();
    if (!story) return;
    const maxSec = this.getStoryDuration(story);
    const target = Math.max(0, Math.min(maxSec - 1, Number(seconds) || 0));
    this.clipCurrentTime = target;
    if (this.bgAudio && this.currentSrc && typeof this.bgAudio.seek === "function") {
      try {
        this.bgAudio.seek(target);
      } catch (_) {
        // Ignore seek error when paused
      }
    }
    this._emit("timeupdate", {
      clipCurrentTime: this.clipCurrentTime,
      clipDuration: maxSec,
      totalElapsed: this.getTotalElapsedSeconds(),
      totalDuration: this.getTotalPlaylistSeconds()
    });
  }

  seekTotalSeconds(targetTotalSeconds) {
    if (!this.playlist.length) return;
    const total = this.getTotalPlaylistSeconds();
    const clamped = Math.max(0, Math.min(total - 1, Number(targetTotalSeconds) || 0));
    let acc = 0;
    for (let i = 0; i < this.playlist.length; i += 1) {
      const dur = this.getStoryDuration(this.playlist[i]);
      if (clamped < acc + dur || i === this.playlist.length - 1) {
        const offset = Math.max(0, clamped - acc);
        if (i === this.currentIndex && this.currentSrc) {
          this.seekWithinCurrent(offset);
        } else {
          this.playTrack(i, this.playing, offset);
        }
        return;
      }
      acc += dur;
    }
  }

  getSnapshot() {
    return {
      playlist: this.playlist,
      currentIndex: this.currentIndex,
      currentStory: this.getCurrentStory(),
      voice: this.voice,
      playing: this.playing,
      paused: this.paused,
      clipCurrentTime: this.clipCurrentTime,
      clipDuration: this.getCurrentStoryDuration(),
      totalElapsed: this.getTotalElapsedSeconds(),
      totalDuration: this.getTotalPlaylistSeconds()
    };
  }
}

const audioService = new KidsRadioAudioService();

module.exports = {
  audioService,
  KidsRadioAudioService
};
