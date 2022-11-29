// ==UserScript==
// @name        Mastodon easy follow
// @namespace   agrmohit
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_listValues
// @version     1.2.0
// @author      agrmohit
// @description Open the mastodon profile in your own instance by clicking on their @username@instance
// @downloadURL https://github.com/agrmohit/userscripts/raw/main/mastodon-easy-follow.user.js
// @require     https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// @match       https://androiddev.social/*
// @match       https://astrodon.social/*
// @match       https://fediscience.org/*
// @match       https://fosstodon.org/*
// @match       https://front-end.social/*
// @match       https://hachyderm.io/*
// @match       https://infosec.exchange/*
// @match       https://kopiti.am/*
// @match       https://mas.to/*
// @match       https://mastodon.online/*
// @match       https://mastodon.social/*
// @match       https://mastodon.world/*
// @match       https://mastodon.xyz/*
// @match       https://mstdn.social/*
// @match       https://octodon.social/*
// @match       https://phpc.social/*
// @match       https://social.coop/*
// @match       https://social.network.europa.eu/*
// @match       https://social.vivaldi.net/*
// @match       https://techhub.social/*
// @match       https://toot.community/*
// @match       https://treehouse.systems/*
// @icon        https://www.google.com/s2/favicons?sz=128&domain=joinmastodon.org
// @license     MIT
// ==/UserScript==

const defaultConfig = {
  selector: ".account__header__tabs__name > h1 > small",
  selectorV3: ".public-account-header__tabs__name > h1 > small",
  instance: "hachyderm.io",
};

const constants = {
  log_prefix: "[Mastodon easy follow]",
};

// Write default config values if user config is not present
if (typeof GM_setValue !== "undefined" && typeof GM_getValue !== "undefined") {
  for (const key in defaultConfig) {
    if (GM_getValue(key) === undefined) {
      GM_setValue(key, defaultConfig[key]);
    }
  }
} else {
  console.log(
    `${constants.log_prefix} Storage access is not allowed by userscript manager, please update to the latest version`
  );
  console.log(
    `${constants.log_prefix} Alternatively, use Violentmonkey (https://violentmonkey.github.io/get-it/)`
  );

  return;
}

const disconnect = VM.observe(document.body, () => {
  // Select element of interest
  let node = document.querySelector(GM_getValue(GM_listValues()[0]));

  // For compatibility with mastodon v3.x.x
  if (!node) {
    node = document.querySelector(GM_getValue(GM_listValues()[1]));
  }

  if (node) {
    const username = node.textContent;

    // Don't add event listener if user is on their own instance
    if (window.location.hostname == GM_getValue(GM_listValues()[2])) {
      return true;
    }

    // Add an 'click' event listener that works as a link
    node.addEventListener("click", () =>
      window.location.replace(
        `https://${GM_getValue(GM_listValues()[2])}/${username}`
      )
    );

    // Disconnect observer
    return true;
  }
});
