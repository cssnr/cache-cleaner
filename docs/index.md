---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Cache Cleaner
  text: Browser Addon
  tagline: Easily clear selected cache items for the current site or whole browser with a single key press.
  image:
    src: /images/logo.svg
    alt: Cache Cleaner
  actions:
    - text: Get Started
      link: /install
      theme: brand
    - text: Usage
      link: /usage
      theme: alt
    - text: Options
      link: /options
      theme: alt
    - text: Support
      link: /support
      theme: alt

features:
  - title: Install and Usage
    details: View Install and Usage Guides
    link: /install
  - title: Support
    details: Get Help with Anything
    link: /support
  - title: Source Code
    details: View Source Code on GitHub
    link: https://github.com/cssnr/cache-cleaner
---

<BrowserIcons
style="text-align: center; margin: 40px 0 0 0;"
chrome="https://chromewebstore.google.com/detail/nbkhplnnajkikghffmincdbipjalpobi"
firefox="https://addons.mozilla.org/addon/cache-cleaner-addon"
animation="animate__rotateIn animate__slow"
size="64"
/>

<Contributors :contributors="$contributors" heading="Contributors" size="48" margin="36px 0 96px" />
