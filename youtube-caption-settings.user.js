// ==UserScript==
// @name        YouTube caption settings
// @namespace   agrmohit
// @match       https://www.youtube.com/*
// @match       https://www.youtube-nocookie.com/embed/*
// @run-at      document-start
// @grant       none
// @version     1.0.0
// @author      agrmohit
// @description Force your caption display settings on YouTube
// @downloadURL https://github.com/agrmohit/userscripts/raw/main/youtube-caption-settings.user.js
// @supportURL  https://github.com/agrmohit/userscripts/issues
// @icon        https://www.google.com/s2/favicons?sz=128&domain=youtube.com
// @license     MIT
// ==/UserScript==

// Values are in the form YouTube stores; comments give the caption menu label.
// Fields not listed here keep whatever YouTube already has stored.
const displaySettings = {
  fontFamily: 5, // Casual
  fontSizeIncrement: -1, // 75%
  backgroundOpacity: 0, // 0%
  charEdgeStyle: 4, // Drop Shadow
};

const storageKey = "yt-player-caption-display-settings";
const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;

// The player reads this key once while it starts, so the script runs at document-start.
// The entry is YouTube's storage wrapper: `data` is a JSON string, both timestamps are epoch milliseconds.
let stored = {};
try {
  stored = JSON.parse(JSON.parse(localStorage.getItem(storageKey))?.data ?? "{}");
} catch (error) {
  console.warn(`[YouTube caption settings] Could not read ${storageKey}, overwriting it`, error);
}

const now = Date.now();
localStorage.setItem(
  storageKey,
  JSON.stringify({
    data: JSON.stringify({ ...stored, ...displaySettings }),
    expiration: now + thirtyDaysMs,
    creation: now,
  }),
);
