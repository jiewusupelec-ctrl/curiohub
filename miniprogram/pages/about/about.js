/*
 * Copyright (C) 2026 Lenovo
 * All Rights Reserved.
 * Lenovo Confidential Restricted.
 */

const { TOPICS } = require("../../data/bundled-stories");

Page({
  data: {
    topics: TOPICS,
    sources: [
      { name: "NASA / NASA Space Place", desc: "美国宇航局天文与行星科学公开科普" },
      { name: "中国国家航天局 / 中国载人航天", desc: "天宫空间站、嫦娥探月与深空探测科普" },
      { name: "中国科学院科普 / 中国天眼 FAST", desc: "自然科学、物理、生物与生态研究进展" },
      { name: "Science News Explores", desc: "面向青少年的全球前沿科学新闻与实验故事" },
      { name: "ScienceDaily & Phys.org", desc: "每日基础科学、材料工程与地球科学快讯" },
      { name: "BBC Science & Newsround", desc: "自然生态、气候环境与英国少儿新闻栏目" },
      { name: "Spaceflight News API", desc: "全球航天发射与在轨科学任务实时动态" },
      { name: "维基百科 · 科学史上的今天", desc: "改变人类历史的科学发现与伟大发明纪念日" },
      { name: "UNICEF / 联合国教科文组织", desc: "儿童友好城市、世界遗产与全球公共合作案例" }
    ]
  },

  onClearHistory() {
    wx.showModal({
      title: "清空已听历史",
      content: "确定要清空近 14 天的已听故事去重记录吗？（今日剩余换批次数保持不变）",
      confirmText: "确定清空",
      confirmColor: "#167bb7",
      success: (res) => {
        if (res.confirm) {
          try {
            wx.removeStorageSync("kids-news-mp-history-v3");
            wx.showToast({
              title: "已清空收听历史",
              icon: "success"
            });
          } catch (_) {
            // Ignore error
          }
        }
      }
    });
  },

  onBackPlayer() {
    const pages = getCurrentPages();
    if (pages.length > 1) {
      wx.navigateBack();
    } else {
      wx.reLaunch({ url: "/pages/index/index" });
    }
  }
});
