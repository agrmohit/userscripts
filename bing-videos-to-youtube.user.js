// ==UserScript==
// @name        Bing Videos to YouTube
// @namespace   agrmohit
// @match       https://www.bing.com/videos/*&&view=detail&mid*
// @match       https://www.bing.com/videos/search?*
// @grant       none
// @version     1.0.1
// @author      agrmohit
// @description Redirect youtube videos playing in bing to youtube
// @license     MIT
// ==/UserScript==

const selector = ".mmvdp_meta_title_link";

window.addEventListener("load", () => {
  if (document.querySelector(selector)) {
    window.location = document.querySelector(selector).href;
  }
});
