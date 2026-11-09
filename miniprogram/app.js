/*
 * Copyright (C) 2026 Lenovo
 * All Rights Reserved.
 * Lenovo Confidential Restricted.
 */

App({
  globalData: {
    remoteBaseUrl: "https://jiewusupelec-ctrl.github.io/curiohub",
    storiesUrl: "https://jiewusupelec-ctrl.github.io/curiohub/stories-v2.json",
    sessionMetaUrl: "https://jiewusupelec-ctrl.github.io/curiohub/session-meta.json",
    targetDurationSec: 20 * 60,
    maxDurationSec: 22 * 60,
    maxDailyRefreshes: 5,
    voices: {
      female: {
        id: "female",
        label: "女声",
        model: "zh-CN-XiaoxiaoNeural",
        speakerName: "晓晓姐姐"
      },
      male: {
        id: "male",
        label: "男声",
        model: "zh-CN-YunxiNeural",
        speakerName: "云希哥哥"
      }
    }
  },

  onLaunch() {
    // Keep screen audio session cooperative with background lock-screen playback
    if (wx.setInnerAudioOption) {
      wx.setInnerAudioOption({
        mixWithOther: false,
        obeyMuteSwitch: false
      });
    }
  }
});
