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
// @match       https://raw.githubusercontent.com/*
// @exclude-match https://imgur.com/gallery/*
// @match       https://cdn.jsdelivr.net/npm/*
// @grant       GM_registerMenuCommand
// @grant       GM_unregisterMenuCommand
// @grant       GM_setValue
// @grant       GM_getValue
// @version     1.5.0
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

  // Repurpose share button to open video in mpv
  document.querySelectorAll('button[aria-label="Share"]')[1].onclick = () => {
    window.location = `ytdl://${window.location}`;
  };

  const removeRightSidebar = () => {
    const el = document.querySelector("#secondary");
    if (el) el.remove();
  };

  const removeCommentsSection = () => {
    const el = document.querySelector("#comments");
    if (el) el.remove();
  };

  GM_registerMenuCommand(
    "Remove right sidebar (Watch Next, Live Chat)",
    removeRightSidebar
  );

  GM_registerMenuCommand("Remove comments section", removeCommentsSection);

  register(GM_getValue("shortcut"), () => {
    const choice = prompt(
      `1. Remove right sidebar (Watch Next, Live Chat)\n2. Remove comments section\n3. All of the above`
    );
    switch (choice) {
      case "1":
        removeRightSidebar();
        break;
      case "2":
        removeCommentsSection();
        break;
      case "3":
        removeRightSidebar();
        removeCommentsSection();
        break;
    }
  });
};

const mangadexActions = () => {
  const regex = /https:\/\/mangadex.org\/title\/([a-z0-9-]+)/;
  const match = regex.exec(window.location.href);

  const readInCubari = () => {
    window.location.href = `https://cubari.moe/read/mangadex/${match[1]}`;
  };

  GM_registerMenuCommand("Read in Cubari", readInCubari);
  register(GM_getValue("shortcut"), readInCubari);
};

const mangaseeActions = () => {
  const regex = /https:\/\/mangasee123.com\/manga\/([a-z0-9-]+)/;
  const match = regex.exec(window.location.href);

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

const jsdelivrActions = () => {
  const regex =
    /https:\/\/cdn.jsdelivr.net\/npm\/(@?[a-zA\/0-9]+)(?:[@0-9a-z\/\.-]*)/;
  const match = regex.exec(window.location.href);

  const openInNpm = () => {
    window.location.href = `https://www.npmjs.com/package/${match[1]}`;
  };

  GM_registerMenuCommand("Open in npm", openInNpm);
  register(GM_getValue("shortcut"), openInNpm);
};

const githubRawActions = () => {
  const regex =
    /http.?:\/\/raw.githubusercontent.com\/([\w-]*)\/([\w_.-]*)\/([\w_.-]*)\/([a-zA-Z0-9-_\/\.]*)/;
  const match = regex.exec(window.location.href);

  const openInGitHub = () => {
    window.location.href = `https://github.com/${match[1]}/${match[2]}/blob/${match[3]}/${match[4]}`;
  };

  GM_registerMenuCommand("Open in GitHub", openInGitHub);
  register(GM_getValue("shortcut"), openInGitHub);
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
  case "cdn.jsdelivr.net":
    jsdelivrActions();
    break;
  case "raw.githubusercontent.com":
    githubRawActions();
    break;
}
