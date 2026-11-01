#!/usr/bin/env node
/*
 * Copyright (C) 2026 Lenovo
 * All Rights Reserved.
 * Lenovo Confidential Restricted.
 */

/**
 * Optional Node helper: prefetch RSS into bundled-news.json for offline/static use.
 * Usage: node refresh-news.mjs
 */
import { writeFile } from "node:fs/promises";

const FEEDS = [
  { name: "BBC Newsround", url: "https://feeds.bbci.co.uk/newsround/rss.xml" },
  { name: "TIME for Kids", url: "https://www.timeforkids.com/k1/feed/" },
  { name: "NASA Image of the Day", url: "https://www.nasa.gov/feeds/iotd-feed/" },
  { name: "Science News Explores", url: "https://www.snexplores.org/feed" },
];

function strip(html) {
  return String(html || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function itemsFromRss(xml, source) {
  const blocks = xml.split(/<item[\s>]/i).slice(1);
  return blocks.slice(0, 10).map((block, i) => {
    const title = strip((block.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "");
    const desc = strip(
      (block.match(/<description[^>]*>([\s\S]*?)<\/description>/i) || [])[1] || ""
    );
    const link = strip((block.match(/<link[^>]*>([\s\S]*?)<\/link>/i) || [])[1] || "");
    return {
      id: `${source}-${i}`,
      source,
      region: "国际",
      title: title.replace(/^<!\[CDATA\[|\]\]>$/g, ""),
      summary: desc.replace(/^<!\[CDATA\[|\]\]>$/g, "").slice(0, 280),
      link,
    };
  });
}

const all = [];
for (const feed of FEEDS) {
  try {
    const res = await fetch(feed.url);
    if (!res.ok) throw new Error(String(res.status));
    const xml = await res.text();
    all.push(...itemsFromRss(xml, feed.name));
    console.log("ok", feed.name, res.status);
  } catch (e) {
    console.warn("fail", feed.name, e.message || e);
  }
}

const out = {
  fetchedAt: new Date().toISOString(),
  count: all.length,
  items: all,
};
await writeFile(new URL("./bundled-news.json", import.meta.url), JSON.stringify(out, null, 2));
console.log("wrote bundled-news.json with", all.length, "items");
