# userscripts

A collection of userscripts

## Steps to install

- Install [Violentmonkey](https://violentmonkey.github.io/get-it/) (Recommended) or any other userscript manager
- Click on the script you want to install in the table below
- Follow given instructions
- A Violentmonkey page will open automatically
- Go through the code and permissions to make sure its safe (VERY IMPORTANT)
- Click the green 'Confirm installation' button
- Close the page

| Script                   | Description                                                                            |
| ------------------------ | -------------------------------------------------------------------------------------- |
| [Bing Videos to YouTube] | Redirect youtube videos playing in bing to youtube                                     |
| [Mastodon easy follow]   | Open the mastodon profile in your own instance by clicking on their @username@instance |
| [Page Actions]           | Extension to perform various actions on wesbites                                       |

## Configuration options

### Common Instructions

```txt
- Install the user script
- Let the user script run at least once by loading an applicable url
- Click the edit button for this script from the Violentmonkey menu
- Open the 'Values' tab for this script.
- Click on the configuration option you want to change and edit the value
- Click the 'Apply' button
- Refresh or visit the page to see the changes
```

### Mastodon easy follow

- [Install](https://github.com/agrmohit/userscripts/raw/main/mastodon-easy-follow.user.js)
- Read [Common Instructions](#common-instructions)
- Change your instance url

| Option     | Description                                         | Default                                         |
| ---------- | --------------------------------------------------- | ----------------------------------------------- |
| selector   | CSS selector for username component                 | .account__header__tabs__name > h1 > small       |
| selectorV3 | CSS selector for username component for mastodon v3 | .public-account-header__tabs__name > h1 > small |
| instance   | Your instance url                                   | hachyderm.io                                    |

### Page Actions

- [Install](https://github.com/agrmohit/userscripts/raw/main/page-actions.user.js)

| Option   | Description                                  | Default |
| -------- | -------------------------------------------- | ------- |
| shortcut | Keyboard shortcut to trigger the page action | alt-p   |

[Bing Videos to YouTube]: https://github.com/agrmohit/userscripts/raw/main/bing-videos-to-youtube.user.js
[Mastodon easy follow]: #mastodon-easy-follow
[Page Actions]: #page-actions
