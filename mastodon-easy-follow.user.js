// ==UserScript==
// @name        Mastodon easy follow
// @namespace   agrmohit
// @grant       none
// @version     1.1.0
// @author      agrmohit
// @description Open the mastodon profile in your own instance by clicking on their @username@instance
// @downloadURL https://github.com/agrmohit/userscripts/raw/main/mastodon-easy-follow.user.js
// @require     https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// @match       https://fosstodon.org/*
// @match       https://mstdn.social/*
// @match       https://mastodon.online/*
// @match       https://mas.to/*
// @match       https://techhub.social/*
// @match       https://mastodon.social/*
// @match       https://kopiti.am/*
// @match       https://front-end.social/*
// @match       https://mastodon.xyz/*
// @match       https://octodon.social/*
// @match       https://infosec.exchange/*
// @match       https://fediscience.org/*
// @match       https://social.coop/*
// @match       https://astrodon.social/*
// @match       https://treehouse.systems/*
// @match       https://mastodon.world/*
// @match       https://social.vivaldi.net/*
// @match       https://androiddev.social/*
// @match       https://mstdn.social/*
// @match       https://toot.community/*
// @match       https://phpc.social/*
// @match       https://social.network.europa.eu/*
// @icon        https://www.google.com/s2/favicons?sz=128&domain=joinmastodon.org
// @license     MIT
// ==/UserScript==

const disconnect = VM.observe(document.body, () => {
  // Select element of interest
  let node = document.querySelector(
    ".account__header__tabs__name > h1 > small"
  );

  // For compatibility with mastodon v3.x.x
  if (!node) {
    node = document.querySelector(
      ".public-account-header__tabs__name > h1 > small"
    );
  }

  if (node) {
    const own_instance = "hachyderm.io";
    const username = node.textContent;

    // add an 'on click' event listener that works as a link
    node.addEventListener("click", () =>
      window.location.replace(`https://${own_instance}/${username}`)
    );

    // Disconnect observer
    return true;
  }
});
