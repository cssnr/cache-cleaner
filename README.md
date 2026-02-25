[![Chrome Web Store Users](https://img.shields.io/chrome-web-store/users/nbkhplnnajkikghffmincdbipjalpobi?logo=google&logoColor=white&label=users)](https://chromewebstore.google.com/detail/cache-cleaner/nbkhplnnajkikghffmincdbipjalpobi)
[![Mozilla Add-on Users](https://img.shields.io/amo/users/cache-cleaner-addon?logo=mozilla&label=users)](https://addons.mozilla.org/addon/cache-cleaner-addon)
[![Chrome Web Store Rating](https://img.shields.io/chrome-web-store/rating/nbkhplnnajkikghffmincdbipjalpobi?logo=google&logoColor=white)](https://chromewebstore.google.com/detail/cache-cleaner/nbkhplnnajkikghffmincdbipjalpobi)
[![Mozilla Add-on Rating](https://img.shields.io/amo/rating/cache-cleaner-addon?logo=mozilla&logoColor=white)](https://addons.mozilla.org/addon/cache-cleaner-addon)
[![Chrome Web Store Version](https://img.shields.io/chrome-web-store/v/nbkhplnnajkikghffmincdbipjalpobi?label=chrome&logo=googlechrome)](https://chromewebstore.google.com/detail/cache-cleaner/nbkhplnnajkikghffmincdbipjalpobi)
[![Mozilla Add-on Version](https://img.shields.io/amo/v/cache-cleaner-addon?label=firefox&logo=firefox)](https://addons.mozilla.org/addon/cache-cleaner-addon)
[![GitHub Release Version](https://img.shields.io/github/v/release/cssnr/cache-cleaner?logo=github&logoColor=white)](https://github.com/cssnr/cache-cleaner/releases/latest)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=cssnr_cache-cleaner&metric=alert_status&label=quality)](https://sonarcloud.io/summary/overall?id=cssnr_cache-cleaner)
[![Workflow Build](https://img.shields.io/github/actions/workflow/status/cssnr/cache-cleaner/build.yaml?logo=norton&logoColor=white&label=build)](https://github.com/cssnr/cache-cleaner/actions/workflows/build.yaml)
[![Workflow Test](https://img.shields.io/github/actions/workflow/status/cssnr/cache-cleaner/test.yaml?logo=norton&logoColor=white&label=test)](https://github.com/cssnr/cache-cleaner/actions/workflows/test.yaml)
[![Workflow Lint](https://img.shields.io/github/actions/workflow/status/cssnr/cache-cleaner/lint.yaml?logo=norton&logoColor=white&label=lint)](https://github.com/cssnr/cache-cleaner/actions/workflows/lint.yaml)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/cssnr/cache-cleaner?logo=listenhub&label=updated)](https://github.com/cssnr/cache-cleaner/pulse)
[![GitHub Repo Size](https://img.shields.io/github/repo-size/cssnr/cache-cleaner?logo=buffer&label=repo%20size)](https://github.com/cssnr/cache-cleaner?tab=readme-ov-file#readme)
[![GitHub Top Language](https://img.shields.io/github/languages/top/cssnr/cache-cleaner?logo=devbox)](https://github.com/cssnr/cache-cleaner?tab=readme-ov-file#readme)
[![GitHub Contributors](https://img.shields.io/github/contributors-anon/cssnr/cache-cleaner?logo=southwestairlines)](https://github.com/cssnr/cache-cleaner/graphs/contributors)
[![GitHub Issues](https://img.shields.io/github/issues/cssnr/cache-cleaner?logo=codeforces&logoColor=white)](https://github.com/cssnr/cache-cleaner/issues)
[![GitHub Discussions](https://img.shields.io/github/discussions/cssnr/cache-cleaner?logo=theconversation)](https://github.com/cssnr/cache-cleaner/discussions)
[![GitHub Forks](https://img.shields.io/github/forks/cssnr/cache-cleaner?style=flat&logo=forgejo&logoColor=white)](https://github.com/cssnr/cache-cleaner/forks)
[![GitHub Repo Stars](https://img.shields.io/github/stars/cssnr/cache-cleaner?style=flat&logo=gleam&logoColor=white)](https://github.com/cssnr/cache-cleaner/stargazers)
[![GitHub Org Stars](https://img.shields.io/github/stars/cssnr?style=flat&logo=apachespark&logoColor=white&label=org%20stars)](https://cssnr.github.io/)
[![Discord](https://img.shields.io/discord/899171661457293343?logo=discord&logoColor=white&label=discord&color=7289da)](https://discord.gg/wXy6m2X8wY)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-72a5f2?logo=kofi&label=support)](https://ko-fi.com/cssnr)

# Cache Cleaner

<a title="Cache Cleaner" href="https://github.com/cssnr/cache-cleaner#readme-ov-file" target="_blank">
<img alt="Cache Cleaner" align="right" width="128" height="auto" src="https://raw.githubusercontent.com/cssnr/cache-cleaner/refs/heads/master/src/images/logo128.png"></a>

- [Install](#install)
- [Features](#features)
  - [Upcoming features](#upcoming-features)
  - [Known issues](#known-issues)
- [Configuration](#configuration)
- [Usage](#usage)
- [Support](#support)
- [Development](#development)
  - [Building](#building)
- [Contributing](#contributing)

Modern Chrome Web Extension and Firefox Browser Addon to easily clean selected cache items specific sites or the whole
browser with a single key press, from the right-click context menu or via the toolbar icon popup. Cache cleaner is also
available for mobile browsers, see [Install](#install) below.

Firefox does not have an API to clear cache storage, the cache created by service workers. Furthermore, it has no
option to bypass the service worker for network when testing. This extension resolves that issue by using a custom
function to clear **Cache Storage** when clearing site cache plus has an option automatically reload the page after
clearing the cache. Now after making a change to a site with a service worker, all you have to do is press `F4` (default
keybind to clear cache) to clear the cache and refresh the site. Additionally, the browsing data API differs on Firefox
and Chrome so logic was added to allow the extension to run on both browsers.

More information on the individual APIs
for [Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/browsingData)
and [Chrome](https://developer.chrome.com/docs/extensions/reference/api/browsingData).

## Install

- [Google Chrome Web Store](https://chromewebstore.google.com/detail/cache-cleaner/nbkhplnnajkikghffmincdbipjalpobi)
- [Mozilla Firefox Add-ons](https://addons.mozilla.org/addon/cache-cleaner-addon)

[![Chrome](https://raw.githubusercontent.com/smashedr/logo-icons/master/browsers/chrome_48.png)](https://chromewebstore.google.com/detail/cache-cleaner/nbkhplnnajkikghffmincdbipjalpobi)
[![Firefox](https://raw.githubusercontent.com/smashedr/logo-icons/master/browsers/firefox_48.png)](https://addons.mozilla.org/addon/cache-cleaner-addon)
[![Edge](https://raw.githubusercontent.com/smashedr/logo-icons/master/browsers/edge_48.png)](https://chromewebstore.google.com/detail/cache-cleaner/nbkhplnnajkikghffmincdbipjalpobi)
[![Brave](https://raw.githubusercontent.com/smashedr/logo-icons/master/browsers/brave_48.png)](https://chromewebstore.google.com/detail/cache-cleaner/nbkhplnnajkikghffmincdbipjalpobi)
[![Opera](https://raw.githubusercontent.com/smashedr/logo-icons/master/browsers/opera_48.png)](https://chromewebstore.google.com/detail/cache-cleaner/nbkhplnnajkikghffmincdbipjalpobi)
[![Chromium](https://raw.githubusercontent.com/smashedr/logo-icons/master/browsers/chromium_48.png)](https://chromewebstore.google.com/detail/cache-cleaner/nbkhplnnajkikghffmincdbipjalpobi)
[![Yandex](https://raw.githubusercontent.com/smashedr/logo-icons/master/browsers/yandex_48.png)](https://chromewebstore.google.com/detail/cache-cleaner/nbkhplnnajkikghffmincdbipjalpobi)

All **Chromium** Based Browsers can install the extension from
the [Chrome Web Store](https://chromewebstore.google.com/detail/cache-cleaner/nbkhplnnajkikghffmincdbipjalpobi).

Mobile browser support available for
[Firefox](https://addons.mozilla.org/addon/cache-cleaner-addon),
[Yandex](https://chromewebstore.google.com/detail/cache-cleaner/nbkhplnnajkikghffmincdbipjalpobi) and
[Kiwi](https://chromewebstore.google.com/detail/cache-cleaner/nbkhplnnajkikghffmincdbipjalpobi).

[![QR Code GitHub](https://raw.githubusercontent.com/smashedr/repo-images/refs/heads/master/cache-cleaner/qr-code-firefox.png)](https://addons.mozilla.org/addon/auto-auth)

## Features

- Clear cache and reload site with a single key or button press
- Choose which cache items to clear or clear all data
- Clear cache for a specific site or the whole browser
- Option to clear **Cache Storage** in Firefox for individual sites
- Works in both Firefox and Chromium based browsers

### Upcoming Features

- Custom time frames to clear supported caches
- Chrome only, option to exclude specified origins

> [!TIP]
> **Don't see your feature here?**
> Submit a [Feature Request](https://github.com/cssnr/cache-cleaner/issues/new?template=1-feature.yaml).

### Known Issues

- No major issues detected at the moment...

> [!TIP]
> **Don't see your issue here?**
> Open a [New Issues](https://github.com/cssnr/cache-cleaner/issues).

## Configuration

You can pin the Addon by clicking the `Puzzle Piece`, find the Cache Cleaner icon, then;  
**Chrome,** click the `Pin` icon.  
**Firefox,** click the `Settings Wheel` and `Pin to Toolbar`.

To open the options, click on the icon (from above) then click `Open Options`.  
You can also access `Options` through the right-click context menu (enabled by default).

## Usage

Use the extension in one of the three following ways:

- Click on the Toolbar Icon and using the Popup
- Set Keyboard Shortcuts for Clearing Cache or Activating the Popup
- Using the Right Click Context Menu (configurable from Options Page)

## Support

Logs can be found inspecting the page (Ctrl+Shift+I), clicking on the Console, and;
Firefox: toggling Debug logs, Chrome: toggling Verbose from levels dropdown.

If you run into any issues or need help getting started, please do one of the following:

- Report an Issue: <https://github.com/cssnr/cache-cleaner/issues>
- Q&A Discussion: <https://github.com/cssnr/cache-cleaner/discussions/categories/q-a>
- Request a Feature: <https://github.com/cssnr/cache-cleaner/issues/new?template=1-feature.yaml>
- Chat with us on Discord: <https://discord.gg/wXy6m2X8wY>

[![Features](https://img.shields.io/badge/features-brightgreen?style=for-the-badge&logo=rocket&logoColor=white)](https://github.com/cssnr/cache-cleaner/issues/new?template=1-feature.yaml)
[![Issues](https://img.shields.io/badge/issues-red?style=for-the-badge&logo=southwestairlines&logoColor=white)](https://github.com/cssnr/cache-cleaner/issues)
[![Discussions](https://img.shields.io/badge/discussions-blue?style=for-the-badge&logo=livechat&logoColor=white)](https://github.com/cssnr/cache-cleaner/discussions)
[![Discord](https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/wXy6m2X8wY)

To support this project, see the [Contributing](#Contributing) section at the bottom.

# Development

**Quick Start**

First, clone (or download) this repository and change into the directory.

Second, install the dependencies:

```shell
npm install
```

Finally, to run Chrome or Firefox with web-ext, run one of the following:

```shell
npm run chrome
npm run firefox
```

Additionally, to Load Unpacked/Temporary Add-on make a `manifest.json` and run from the [src](src) folder, run one of
the following:

```shell
npm run manifest:chrome
npm run manifest:firefox
```

Chrome: [https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked)  
Firefox: [https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/)

For more information on
web-ext, [read this documentation](https://extensionworkshop.com/documentation/develop/web-ext-command-reference/).  
To pass additional arguments to an `npm run` command, use `--`.  
Example: `npm run chrome -- --chromium-binary=...`

## Building

Install the requirements and copy libraries into the `src/dist` directory by running `npm install`.
See [gulpfile.js](gulpfile.js) for more information on `postinstall`.

```shell
npm install
```

To create a `.zip` archive of the [src](src) directory for the desired browser run one of the following:

```shell
npm run build
npm run build:chrome
npm run build:firefox
```

For more information on building, see the scripts section in the [package.json](package.json) file.

### Chrome Setup

1. Build or Download a [Release](https://github.com/cssnr/cache-cleaner/releases).
1. Unzip the archive, place the folder where it must remain and note its location for later.
1. Open Chrome, click the `3 dots` in the top right, click `Extensions`, click `Manage Extensions`.
1. In the top right, click `Developer Mode` then on the top left click `Load unpacked`.
1. Navigate to the folder you extracted in step #3 then click `Select Folder`.

### Firefox Setup

1. Build or Download a [Release](https://github.com/cssnr/cache-cleaner/releases).
1. Unzip the archive, place the folder where it must remain and note its location for later.
1. Go to `about:debugging#/runtime/this-firefox` and click `Load Temporary Add-on...`
1. Navigate to the folder you extracted earlier, select `manifest.json` then click `Select File`.
1. Optional: open `about:config` search for `extensions.webextensions.keepStorageOnUninstall` and set to `true`.

If you need to test a restart, you must pack the addon. This only works in ESR, Development, or Nightly.
You may also use an Unbranded
Build: [https://wiki.mozilla.org/Add-ons/Extension_Signing#Unbranded_Builds](https://wiki.mozilla.org/Add-ons/Extension_Signing#Unbranded_Builds)

1. Run `npm run build:firefox` then use `web-ext-artifacts/{name}-firefox-{version}.zip`.
1. Open `about:config` search for `xpinstall.signatures.required` and set to `false`.
1. Open `about:addons` and drag the zip file to the page or choose Install from File from the Settings wheel.

# Contributing

Please consider making a donation to support the development of this project
and [additional](https://cssnr.com/) open source projects.

[![Support](https://img.shields.io/badge/Ko--fi-579fbf?style=for-the-badge&logo=kofi&label=Support)](https://ko-fi.com/cssnr)

Additionally, you can give a 5-star rating
on [Google](https://chromewebstore.google.com/detail/cache-cleaner/nbkhplnnajkikghffmincdbipjalpobi)
or [Mozilla](https://addons.mozilla.org/addon/cache-cleaner-addon) and star this project on GitHub.

Other Web Extensions I have created and published:

- [Link Extractor](https://github.com/cssnr/link-extractor?tab=readme-ov-file#readme)
- [Open Links in New Tab](https://github.com/cssnr/open-links-in-new-tab?tab=readme-ov-file#readme)
- [Auto Auth](https://github.com/cssnr/auto-auth?tab=readme-ov-file#readme)
- [Cache Cleaner](https://github.com/cssnr/cache-cleaner?tab=readme-ov-file#readme)
- [HLS Video Downloader](https://github.com/cssnr/hls-video-downloader?tab=readme-ov-file#readme)
- [Obtainium Extension](https://github.com/cssnr/obtainium-extension?tab=readme-ov-file#readme)
- [SMWC Web Extension](https://github.com/cssnr/smwc-web-extension?tab=readme-ov-file#readme)
- [PlayDrift Extension](https://github.com/cssnr/playdrift-extension?tab=readme-ov-file#readme)
- [ASN Plus](https://github.com/cssnr/asn-plus?tab=readme-ov-file#readme)
- [Aviation Tools](https://github.com/cssnr/aviation-tools?tab=readme-ov-file#readme)
- [Text Formatter](https://github.com/cssnr/text-formatter?tab=readme-ov-file#readme)

For a full list of current projects visit: [https://cssnr.github.io/](https://cssnr.github.io/)

<a href="https://github.com/cssnr/cache-cleaner/stargazers">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=cssnr/cache-cleaner&type=date&legend=bottom-right&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=cssnr/cache-cleaner&type=date&legend=bottom-right" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=cssnr/cache-cleaner&type=date&legend=bottom-right" />
 </picture>
</a>
