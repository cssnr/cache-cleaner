import { defineConfig } from 'vitepress'

const settings = {
  title: 'Cache Cleaner',
  name: 'Cache Cleaner Web Extension and Browser Add-on',
  description: {
    short:
      'Easily clear specific cache types for the current site or entire browser with a single click or keyboard shortcut.',
    long: 'Web Extension and Browser Add-on to easily clear specific cache types for the current site or entire browser via a keyboard shortcut, right-click context menu, or the extension popup and panels.',
  },
  base: '/cache-cleaner/', // set to empty string for no base path
  og_image: '/cache-cleaner/images/logo.png', // must be full path
  color: '#d9925f',
  source_repo: 'https://github.com/cssnr/cache-cleaner',
  chrome_url: 'https://chromewebstore.google.com/detail/nbkhplnnajkikghffmincdbipjalpobi',
  mozilla_url: 'https://addons.mozilla.org/addon/cache-cleaner-addon',
}

// https://vitepress.dev/reference/site-config
// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  // srcDir: './docs',
  base: settings.base,
  vite: {
    server: {
      allowedHosts: true,
    },
  },

  title: settings.title,
  description: settings.description.short,
  head: [
    [
      'link',
      {
        rel: 'icon',
        sizes: 'any',
        href: `${settings.base}/images/logo.svg`,
        type: 'image/svg+xml',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        sizes: '16x16 32x32 64x64 128x128',
        href: `${settings.base}/favicon.ico`,
        type: 'image/x-icon',
      },
    ],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        sizes: '512x512',
        href: settings.og_image,
        type: 'image/png',
      },
    ],

    ['meta', { name: 'darkreader-lock' }],

    ['meta', { name: 'theme-color', content: settings.color }],
    ['meta', { name: 'description', content: settings.description.long }],

    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: settings.name }],
    ['meta', { property: 'og:title', content: settings.title }],
    ['meta', { property: 'og:description', content: settings.description.short }],
    ['meta', { property: 'og:image', content: settings.og_image }],
    ['meta', { property: 'og:image:alt', content: settings.title }],

    ['meta', { property: 'twitter:card', content: 'summary' }],
    ['meta', { property: 'twitter:site', content: settings.name }],
    ['meta', { property: 'twitter:title', content: settings.title }],
    ['meta', { property: 'twitter:description', content: settings.description.short }],
    ['meta', { property: 'twitter:image', content: settings.og_image }],
    ['meta', { property: 'twitter:image:alt', content: settings.title }],
  ],

  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: settings.title,
    logo: '/images/logo.svg',
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Get Started',
        link: '/install',
        activeMatch: '/install',
      },
      { text: 'Support', link: '/support', activeMatch: '/support' },
      {
        text: 'Links',
        items: [
          { text: 'Chrome Web Store', link: settings.chrome_url },
          { text: 'Mozilla Add-ons', link: settings.mozilla_url },
          { text: 'GitHub Source Code', link: settings.source_repo },
          { text: 'Developer Site', link: 'https://cssnr.github.io/' },
          { text: 'Contribute', link: 'https://ko-fi.com/cssnr' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: settings.source_repo },
      { icon: 'googlechrome', link: settings.chrome_url },
      { icon: 'firefoxbrowser', link: settings.mozilla_url },
      { icon: 'discord', link: 'https://discord.gg/wXy6m2X8wY' },
      { icon: 'kofi', link: 'https://ko-fi.com/cssnr' },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" style="fill: none;" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',
        },
        link: 'https://cssnr.github.io/',
      },
    ],

    sidebar: [
      {
        text: 'Get Started',
        // base: '/guides',
        // collapsed: false,
        items: [
          { text: 'Install', link: '/install' },
          { text: 'Usage', link: '/usage' },
          { text: 'Options', link: '/options' },
        ],
      },
      {
        text: 'Support',
        items: [{ text: 'Get Help', link: '/support' }],
      },
    ],

    editLink: {
      pattern: `${settings.source_repo}/blob/master/docs/:path`,
      text: 'View or Edit on GitHub',
    },

    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'medium',
      },
    },

    // search: {
    //   // provider: 'local',
    //   provider: 'algolia',
    //   options: {
    //     appId: '',
    //     apiKey: '',
    //     indexName: 'cache-cleaner-docs',
    //   },
    // },

    // footer: {
    //   message: '<a href="/privacy">Privacy Policy</a>',
    //   copyright: '<a href="/privacy">Privacy Policy</a>',
    // },

    externalLinkIcon: true,
    outline: 'deep',
  },
  // markdown: {
  //   toc: { level: [2, 3] },
  // },
})
