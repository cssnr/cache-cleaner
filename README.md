[![Chrome Web Store Users](https://img.shields.io/chrome-web-store/users/xxchromeidxx?logo=google&logoColor=white&label=users)](https://chromewebstore.google.com/detail/cache-cleaner/xxchromeidxx)
[![Mozilla Add-on Users](https://img.shields.io/amo/users/cache-cleaner?logo=mozilla&label=users)](https://addons.mozilla.org/addon/cache-cleaner)
[![Chrome Web Store Rating](https://img.shields.io/chrome-web-store/rating/xxchromeidxx?logo=google&logoColor=white)](https://chromewebstore.google.com/detail/cache-cleaner/xxchromeidxx)
[![Mozilla Add-on Rating](https://img.shields.io/amo/rating/cache-cleaner?logo=mozilla&logoColor=white)](https://addons.mozilla.org/addon/cache-cleaner)
[![GitHub Repo Stars](https://img.shields.io/github/stars/cssnr/cache-cleaner?style=flat&logo=github&logoColor=white)](https://github.com/cssnr/cache-cleaner/stargazers)
[![Chrome Web Store Version](https://img.shields.io/chrome-web-store/v/xxchromeidxx?label=chrome&logo=googlechrome)](https://chromewebstore.google.com/detail/cache-cleaner/xxchromeidxx)
[![Mozilla Add-on Version](https://img.shields.io/amo/v/cache-cleaner?label=firefox&logo=firefox)](https://addons.mozilla.org/addon/cache-cleaner)
[![GitHub Release Version](https://img.shields.io/github/v/release/cssnr/cache-cleaner?logo=github&logoColor=white)](https://github.com/cssnr/cache-cleaner/releases/latest)
[![Build](https://img.shields.io/github/actions/workflow/status/cssnr/cache-cleaner/build.yaml?logo=github&logoColor=white&label=build)](https://github.com/cssnr/cache-cleaner/actions/workflows/build.yaml)
[![Test](https://img.shields.io/github/actions/workflow/status/cssnr/cache-cleaner/test.yaml?logo=github&logoColor=white&label=test)](https://github.com/cssnr/cache-cleaner/actions/workflows/test.yaml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=cssnr_cache-cleaner&metric=alert_status&label=quality)](https://sonarcloud.io/summary/overall?id=cssnr_cache-cleaner)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/cssnr/cache-cleaner?logo=github&logoColor=white&label=updated)](https://github.com/cssnr/cache-cleaner/graphs/commit-activity)
[![GitHub Top Language](https://img.shields.io/github/languages/top/cssnr/cache-cleaner?logo=htmx&logoColor=white)](https://github.com/cssnr/cache-cleaner)
[![GitHub Org Stars](https://img.shields.io/github/stars/cssnr?style=flat&logo=github&logoColor=white&label=org%20stars)](https://cssnr.github.io/)
[![Discord](https://img.shields.io/discord/899171661457293343?logo=discord&logoColor=white&label=discord&color=7289da)](https://discord.gg/wXy6m2X8wY)

# Cache Cleaner

Modern Chrome Web Extension and Firefox Browser Addon to easily clean selected cache items specific sites or the whole
browser with a single key press, from the right-click context menu or via the toolbar icon popup.

Firefox does not have an API to clear cache storage, the cache created by service workers. Furthermore, it has no
option to bypass the service worker for network when testing. This extension resolves that issue by using a custom
function to clear **Cache Storage** when clearing site cache plus has an option automatically reload the page after
clearing
the cache. Now after making a change to a site with a service worker, all you have to do is press `F4` (default keybind
to clear cache) to clear the cache and refresh the site. Additionally, the browsing data API differs on Firefox and
Chrome so logic was added to allow the extension to run on both browsers.

More information on the individual APIs
for [Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/browsingData)
and [Chrome](https://developer.chrome.com/docs/extensions/reference/api/browsingData).

* [Install](#Install)
* [Features](#Features)
    - [Upcoming Features](#Upcoming-Features)
    - [Known Issues](#Known-Issues)
* [Configuration](#Configuration)
* [Support](#Support)
* [Development](#Development)
    - [Building](#Building)
* [Contributing](#Contributing)

## Install

* [Google Chrome Web Store](https://chromewebstore.google.com/detail/cache-cleaner/xxchromeidxx)
* [Mozilla Firefox Add-ons](https://addons.mozilla.org/addon/cache-cleaner)

[![Chrome](https://raw.githubusercontent.com/smashedr/logo-icons/master/browsers/chrome_48.png)](https://chromewebstore.google.com/detail/cache-cleaner/xxchromeidxx)
[![Firefox](https://raw.githubusercontent.com/smashedr/logo-icons/master/browsers/firefox_48.png)](https://addons.mozilla.org/addon/cache-cleaner)
[![Edge](https://raw.githubusercontent.com/smashedr/logo-icons/master/browsers/edge_48.png)](https://chromewebstore.google.com/detail/cache-cleaner/xxchromeidxx)
[![Brave](https://raw.githubusercontent.com/smashedr/logo-icons/master/browsers/brave_48.png)](https://chromewebstore.google.com/detail/cache-cleaner/xxchromeidxx)
[![Opera](https://raw.githubusercontent.com/smashedr/logo-icons/master/browsers/opera_48.png)](https://chromewebstore.google.com/detail/cache-cleaner/xxchromeidxx)
[![Chromium](https://raw.githubusercontent.com/smashedr/logo-icons/master/browsers/chromium_48.png)](https://chromewebstore.google.com/detail/cache-cleaner/xxchromeidxx)

All **Chromium** Based Browsers can install the extension from
the [Chrome Web Store](https://chromewebstore.google.com/detail/cache-cleaner/xxchromeidxx).

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
> Request one on
> the [Feature Request Discussion](https://github.com/cssnr/cache-cleaner/discussions/categories/feature-requests).

### Known Issues

- No major issues detected at the moment...

> [!TIP]
> **Don't see your issue here?**
> Open one on the [Issues](https://github.com/cssnr/cache-cleaner/issues).

## Configuration

You can pin the Addon by clicking the `Puzzle Piece`, find the Cache Cleaner icon, then;  
**Chrome,** click the `Pin` icon.  
**Firefox,** click the `Settings Wheel` and `Pin to Toolbar`.

To open the options, click on the icon (from above) then click `Open Options`.  
You can also access `Options` through the right-click context menu (enabled by default).

## Support

For help using the web extension, see:

- Q&A Discussion: https://github.com/cssnr/cache-cleaner/discussions/categories/q-a
- Request a Feature: https://github.com/cssnr/cache-cleaner/discussions/categories/feature-requests

If you are experiencing an issue/bug or getting unexpected results, you can:

- Report an Issue: https://github.com/cssnr/cache-cleaner/issues
- Chat with us on Discord: https://discord.gg/wXy6m2X8wY
- Provide General Feedback: [https://cssnr.github.io/feedback](https://cssnr.github.io/feedback/?app=Cache%20Cleaner)

Logs can be found inspecting the page (Ctrl+Shift+I), clicking on the Console, and;
Firefox: toggling Debug logs, Chrome: toggling Verbose from levels dropdown.

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

Currently, the best way to contribute to this project is to give a 5-star rating
on [Google](https://chromewebstore.google.com/detail/cache-cleaner/xxchromeidxx)
or [Mozilla](https://addons.mozilla.org/addon/cache-cleaner) and to star this project on GitHub.

Other Web Extensions I have created and published:

- [Link Extractor](https://github.com/cssnr/link-extractor)
- [Open Links in New Tab](https://github.com/cssnr/open-links-in-new-tab)
- [HLS Video Downloader](https://github.com/cssnr/hls-video-downloader)
- [SMWC Web Extension](https://github.com/cssnr/smwc-web-extension)
- [PlayDrift Extension](https://github.com/cssnr/playdrift-extension)
- [ASN Plus](https://github.com/cssnr/asn-plus)
- [Aviation Tools](https://github.com/cssnr/aviation-tools)
- [Text Formatter](https://github.com/cssnr/text-formatter)

For a full list of current projects visit: [https://cssnr.github.io/](https://cssnr.github.io/)
