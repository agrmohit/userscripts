// ==UserScript==
// @name        Page Actions
// @namespace   agrmohit
// @require     https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// @require     https://cdn.jsdelivr.net/npm/@violentmonkey/shortcut@1
// @match       https://www.youtube.com/watch?v=*
// @match       https://mangadex.org/title/*
// @match       https://mangasee123.com/manga/*
// @match       https://mangakatana.com/manga/*
// @match       https://imgur.com/*
// @exclude-match https://imgur.com/gallery/*
// @grant       GM_registerMenuCommand
// @grant       GM_unregisterMenuCommand
// @grant       GM_setValue
// @grant       GM_getValue
// @version     1.2.0
// @author      agrmohit
// @description Extension to perform various actions on wesbites
// @downloadURL https://github.com/agrmohit/userscripts/raw/main/page-actions.user.js
// @supportURL  https://github.com/agrmohit/userscripts/issues
// @license     MIT
// ==/UserScript==

const { register } = VM.shortcut;

// Write default config values if user config is not present
if (typeof GM_setValue !== "undefined" && typeof GM_getValue !== "undefined") {
  if (GM_getValue("shortcut") === undefined) {
    GM_setValue("shortcut", "alt-p");
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

const youtubeActions = () => {
  const clip = document.querySelector('[aria-label="Clip"]');
  if (clip) clip.remove();

  const thanks = document.querySelector('[aria-label="Thanks"]');
  if (thanks) thanks.remove();

  const join = document.querySelector('[aria-label="Join this channel"]');
  if (join) join.remove();

  const removeRightSidebar = () => {
    let el = document.querySelector("#secondary");
    if (el) el.remove();
  };

  const removeCommentsSection = () => {
    let el = document.querySelector("#comments");
    if (el) el.remove();
  };

  GM_registerMenuCommand(
    "Remove right sidebar (Watch Next, Live Chat)",
    removeRightSidebar
  );

  GM_registerMenuCommand("Remove comments section", removeCommentsSection);

  register(GM_getValue("shortcut"), () => {
    const choice = prompt(
      `1. Remove right sidebar (Watch Next, Live Chat)\n2. Remove comments section\n3. Dismiss`
    );
    switch (choice) {
      case "1":
        removeRightSidebar();
        break;
      case "2":
        removeCommentsSection();
        break;
    }
  });
};

const mangadexActions = () => {
  let regex = /https:\/\/mangadex.org\/title\/([a-z0-9-]+)/i;
  let match = regex.exec(window.location.href);

  const readInCubari = () => {
    window.location.href = `https://cubari.moe/read/mangadex/${match[1]}`;
  };

  GM_registerMenuCommand("Read in Cubari", readInCubari);
  register(GM_getValue("shortcut"), readInCubari);
};

const mangaseeActions = () => {
  let regex = /https:\/\/mangasee123.com\/manga\/([a-z0-9-]+)/i;
  let match = regex.exec(window.location.href);

  const readInCubari = () => {
    window.location.href = `https://cubari.moe/read/mangasee/${match[1]}`;
  };

  GM_registerMenuCommand("Read in Cubari", readInCubari);
  register(GM_getValue("shortcut"), readInCubari);
};

const mangakatanaActions = () => {
  const readInCubari = () => {
    window.location.href = `https://cubari.moe/mk/${window.location.href}`;
  };

  GM_registerMenuCommand("Read in Cubari", readInCubari);
  register(GM_getValue("shortcut"), readInCubari);
};

const imgurActions = () => {
  VM.observe(document.body, () => {
    const imageElement = document.querySelector(".image-placeholder");
    if (imageElement && imageElement.src.match(/./)) {
      const openImage = () => {
        window.location.href = imageElement.src;
      };

      GM_registerMenuCommand("Open image", openImage);
      register(GM_getValue("shortcut"), openImage);
    } else {
      GM_unregisterMenuCommand("Open image", openImage);
      register(GM_getValue("shortcut"), null);
    }
  });
};

switch (window.location.hostname) {
  case "www.youtube.com":
    setTimeout(() => youtubeActions(), 7_000);
    break;
  case "mangadex.org":
    mangadexActions();
    break;
  case "mangasee123.com":
    mangaseeActions();
    break;
  case "mangakatana.com":
    mangakatanaActions();
    break;
  case "imgur.com":
    imgurActions();
    break;
}
