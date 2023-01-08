// ==UserScript==
// @name        Bing Videos to YouTube
// @namespace   agrmohit
// @match       https://www.bing.com/videos/*&&view=detail&mid*
// @match       https://www.bing.com/videos/search?*
// @grant       none
// @version     1.2.1
// @author      agrmohit
// @description Redirect youtube videos playing in bing to youtube
// @downloadURL https://github.com/agrmohit/userscripts/raw/main/bing-videos-to-youtube.user.js
// @supportURL  https://github.com/agrmohit/userscripts/issues
// @icon        https://www.google.com/s2/favicons?sz=128&domain=youtube.com
// @license     MIT
// ==/UserScript==

const selector = ".source";

window.addEventListener("load", () => {
  if (document.querySelector(selector)) {
    window.location = document.querySelector(selector).href;
  }
});
