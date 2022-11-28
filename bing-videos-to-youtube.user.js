// ==UserScript==
// @name        Bing Videos to YouTube
// @namespace   agrmohit
// @grant       none
// @version     1.1.0
// @author      agrmohit
// @description Redirect youtube videos playing in bing to youtube
// @downloadURL https://github.com/agrmohit/userscripts/raw/main/bing-videos-to-youtube.user.js
// @match       https://www.bing.com/videos/*&&view=detail&mid*
// @match       https://www.bing.com/videos/search?*
// @license     MIT
// ==/UserScript==

const selector = ".mmvdp_meta_title_link";

window.addEventListener("load", () => {
  if (document.querySelector(selector)) {
    window.location = document.querySelector(selector).href;
  }
});
