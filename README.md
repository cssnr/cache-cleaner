[![Chrome Web Store Users](https://img.shields.io/chrome-web-store/users/nbkhplnnajkikghffmincdbipjalpobi?logo=google&logoColor=white&label=users)](https://chromewebstore.google.com/detail/nbkhplnnajkikghffmincdbipjalpobi)
[![Mozilla Add-on Users](https://img.shields.io/amo/users/cache-cleaner-addon?logo=firefox&logoColor=white&label=users)](https://addons.mozilla.org/addon/cache-cleaner-addon)
[![Chrome Web Store Rating](https://img.shields.io/chrome-web-store/rating/nbkhplnnajkikghffmincdbipjalpobi?logo=google&logoColor=white)](https://chromewebstore.google.com/detail/nbkhplnnajkikghffmincdbipjalpobi)
[![Mozilla Add-on Rating](https://img.shields.io/amo/rating/cache-cleaner-addon?logo=firefox&logoColor=white)](https://addons.mozilla.org/addon/cache-cleaner-addon)
[![Chrome Web Store Version](https://img.shields.io/chrome-web-store/v/nbkhplnnajkikghffmincdbipjalpobi?label=chrome&logo=googlechrome)](https://chromewebstore.google.com/detail/nbkhplnnajkikghffmincdbipjalpobi)
[![Mozilla Add-on Version](https://img.shields.io/amo/v/cache-cleaner-addon?label=firefox&logo=firefoxbrowser)](https://addons.mozilla.org/addon/cache-cleaner-addon)
[![GitHub Release Version](https://img.shields.io/github/v/release/cssnr/cache-cleaner?logo=github)](https://github.com/cssnr/cache-cleaner/releases/latest)
[![GitHub Locales](https://img.shields.io/github/directory-file-count/cssnr/cache-cleaner/src/locales?type=file&extension=yaml&logo=libretranslate&label=locales)](https://github.com/cssnr/cache-cleaner/tree/master/src/locales)
[![Deployment Chrome](https://img.shields.io/github/deployments/cssnr/cache-cleaner/chrome?logo=googlechrome&logoColor=white&label=chrome)](https://github.com/cssnr/cache-cleaner/deployments/chrome)
[![Deployment Mozilla](https://img.shields.io/github/deployments/cssnr/cache-cleaner/mozilla?logo=firefox&logoColor=white&label=mozilla)](https://github.com/cssnr/cache-cleaner/deployments/mozilla)
[![Deployment Docs](https://img.shields.io/github/deployments/cssnr/cache-cleaner/docs?logo=vitepress&logoColor=white&label=docs)](https://github.com/cssnr/cache-cleaner/deployments/docs)
[![Deployment Preview](https://img.shields.io/github/deployments/cssnr/cache-cleaner/preview?logo=docker&logoColor=white&label=preview)](https://github.com/cssnr/cache-cleaner/deployments/preview)
[![Workflow Build](https://img.shields.io/github/actions/workflow/status/cssnr/cache-cleaner/build.yaml?logo=norton&logoColor=white&label=build)](https://github.com/cssnr/cache-cleaner/actions/workflows/build.yaml)
[![Workflow Lint](https://img.shields.io/github/actions/workflow/status/cssnr/cache-cleaner/lint.yaml?logo=norton&logoColor=white&label=lint)](https://github.com/cssnr/cache-cleaner/actions/workflows/lint.yaml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=cssnr_cache-cleaner&metric=alert_status&label=quality)](https://sonarcloud.io/summary/overall?id=cssnr_cache-cleaner)
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

<a title="Cache Cleaner" href="https://cssnr.github.io/cache-cleaner/" target="_blank">
<img alt="Cache Cleaner" align="right" width="128" height="auto" src="https://raw.githubusercontent.com/cssnr/cache-cleaner/refs/heads/master/.github/assets/logo.svg"></a>

- [Install](#install)
- [Features](#features)
  - [Languages](#languages)
  - [Upcoming features](#upcoming-features)
  - [Known issues](#known-issues)
- [Support](#support)
- [Contributing](#contributing)

Modern Chrome Web Extension and Firefox Browser Add-on to easily clean selected cache items specific sites or the whole
browser with a single key press, from the right-click context menu or via the toolbar icon popup. Cache cleaner is also
available for mobile browsers, see [Install](#install) below.

[![View Documentation](https://img.shields.io/badge/view_documentation-blue?style=for-the-badge&logo=googledocs&logoColor=white)](https://cssnr.github.io/cache-cleaner/)

Firefox does not have an API to clear cache storage, the cache created by service workers. Furthermore, it has no
option to bypass the service worker for network when testing. This extension resolves that issue by using a custom
function to clear **Cache Storage** when clearing site cache plus has an option automatically reload the page after
clearing the cache. Now after making a change to a site with a service worker, all you have to do is press `F4` (default
keybind to clear cache) to clear the cache and refresh the site. Additionally, the browsing data API differs on Firefox
and Chrome so logic was added to allow the extension to run on both browsers.

More information on the individual APIs
for [Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/browsingData)
and [Chrome](https://developer.chrome.com/docs/extensions/reference/api/browsingData).

> [!TIP]  
> This is the new TypeScript+Vue branch.  
> For the **deprecated** JavaScript version, see the [legacy](https://github.com/cssnr/cache-cleaner/tree/legacy) branch.

## Install

- [Google Chrome Web Store](https://chromewebstore.google.com/detail/nbkhplnnajkikghffmincdbipjalpobi)
- [Mozilla Firefox Add-ons](https://addons.mozilla.org/addon/cache-cleaner-addon)

[![Chrome](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/75.0.1/chrome/chrome_48x48.png)](https://chromewebstore.google.com/detail/nbkhplnnajkikghffmincdbipjalpobi)
[![Firefox](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/75.0.1/firefox/firefox_48x48.png)](https://addons.mozilla.org/addon/cache-cleaner-addon)
[![Edge](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/75.0.1/edge/edge_48x48.png)](https://chromewebstore.google.com/detail/nbkhplnnajkikghffmincdbipjalpobi)
[![Brave](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/75.0.1/brave/brave_48x48.png)](https://chromewebstore.google.com/detail/nbkhplnnajkikghffmincdbipjalpobi)
[![Opera](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/75.0.1/opera/opera_48x48.png)](https://chromewebstore.google.com/detail/nbkhplnnajkikghffmincdbipjalpobi)
[![Chromium](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/75.0.1/chromium/chromium_48x48.png)](https://chromewebstore.google.com/detail/nbkhplnnajkikghffmincdbipjalpobi)

All **Chromium** Based Browsers can install the extension from
the [Chrome Web Store](https://chromewebstore.google.com/detail/nbkhplnnajkikghffmincdbipjalpobi).

Mobile browser support available for
[Firefox](https://addons.mozilla.org/addon/cache-cleaner-addon),
[Yandex](https://chromewebstore.google.com/detail/nbkhplnnajkikghffmincdbipjalpobi) and
[Kiwi](https://chromewebstore.google.com/detail/nbkhplnnajkikghffmincdbipjalpobi).

[![QR Code GitHub](https://raw.githubusercontent.com/smashedr/repo-images/refs/heads/master/cache-cleaner/qr-code-firefox.png)](https://addons.mozilla.org/addon/cache-cleaner-addon)

[![View Documentation](https://img.shields.io/badge/view_documentation-blue?style=for-the-badge&logo=googledocs&logoColor=white)](https://cssnr.github.io/cache-cleaner/)

## Features

- Clear cache and reload site with a single key or button press
- Choose which cache items to clear or clear all data
- Clear cache for a specific site or the whole browser
- Option to clear **Cache Storage** in Firefox for individual sites
- UI includes a Popup, Side Panel, and an Extension Panel
- Works in both Firefox and Chromium based browsers

### Languages

The extension is localized in the following languages:

- Chinese (China) `zh_CN` - 中文（简体）
- English `en` - English
- French `fr` - Français
- German `de` - Deutsch
- Japanese `ja` - 日本語
- Korean `ko` - 한국어
- Persian `fa` - فارسی
- Portuguese (Brazil) `pt_BR` - Português (Brasil)
- Russian `ru` - Русский
- Spanish `es_419` - Español

The only way to change the language is to change your browser's language and restart the browser.

To view or edit the locales, see the related file in the [src/locales](src/locales) directory.

### Upcoming Features

- Custom time frames to clear supported caches
- Chrome only, option to exclude specified origins

> **Don't see your feature here?**
> Submit a [Feature Request](https://github.com/cssnr/cache-cleaner/issues/new?template=1-feature.yaml).

### Known Issues

- No major issues detected at the moment...

> **Don't see your issue here?**
> Open a [New Issues](https://github.com/cssnr/cache-cleaner/issues).

[![View Documentation](https://img.shields.io/badge/view_documentation-blue?style=for-the-badge&logo=googledocs&logoColor=white)](https://cssnr.github.io/cache-cleaner/)

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

## Contributing

For instructions on building the extension or documentation, see the [CONTRIBUTING.md](#contributing-ov-file).

Please consider making a donation to support the development of this project
and [additional](https://cssnr.com/) open source projects.

[![Ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/cssnr)

Additionally, you can give a 5-star rating
on [Google](https://chromewebstore.google.com/detail/nbkhplnnajkikghffmincdbipjalpobi)
or [Mozilla](https://addons.mozilla.org/addon/cache-cleaner-addon) and star this project on GitHub.

Other Web Extensions I have created and published:

- [Link Extractor](https://github.com/cssnr/link-extractor?tab=readme-ov-file#readme)
- [Open Links in New Tab](https://github.com/cssnr/open-links-in-new-tab?tab=readme-ov-file#readme)
- [Auto Auth](https://github.com/cssnr/auto-auth?tab=readme-ov-file#readme)
- [Cache Cleaner](https://github.com/cssnr/cache-cleaner?tab=readme-ov-file#readme)
- [HLS Video Downloader](https://github.com/cssnr/hls-video-downloader?tab=readme-ov-file#readme)
- [Zipline Extension](https://github.com/cssnr/zipline-extension?tab=readme-ov-file#readme)
- [Obtainium Extension](https://github.com/cssnr/obtainium-extension?tab=readme-ov-file#readme)
- [SMWC Web Extension](https://github.com/cssnr/smwc-web-extension?tab=readme-ov-file#readme)
- [PlayDrift Extension](https://github.com/cssnr/playdrift-extension?tab=readme-ov-file#readme)
- [ASN Plus](https://github.com/cssnr/asn-plus?tab=readme-ov-file#readme)
- [Aviation Tools](https://github.com/cssnr/aviation-tools?tab=readme-ov-file#readme)
- [Text Formatter](https://github.com/cssnr/text-formatter?tab=readme-ov-file#readme)
- [GeoImage](https://github.com/cssnr/geo-image?tab=readme-ov-file#readme)
- [New Tab](https://github.com/cssnr/new-tab?tab=readme-ov-file#readme)

For a full list of current projects visit: [https://cssnr.github.io/](https://cssnr.github.io/)
