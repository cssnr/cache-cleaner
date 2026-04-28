import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-vue', '@wxt-dev/i18n/module', '@wxt-dev/auto-icons'],

  // https://wxt.dev/guide/essentials/config/auto-imports.html#disabling-auto-imports
  // imports: false,

  autoIcons: {
    enabled: true,
    baseIconPath: 'assets/icon.svg',
    developmentIndicator: false, // 'overlay' | false
    sizes: [96, 24], // Dfault: 128, 48, 32, 16
  },

  // https://wxt.dev/guide/essentials/config/manifest.html
  manifest: ({ browser, mode }) => {
    const isFirefox = browser === 'firefox'
    const isDev = mode === 'development'
    console.log(`isDev: ${isDev} - isFirefox: ${isFirefox}`)

    return {
      // icons,
      default_locale: 'en',
      name: '__MSG_name__',
      short_name: '__MSG_short_name__',
      description: '__MSG_description__',

      homepage_url: 'https://cssnr.github.io/cache-cleaner/',
      permissions: [
        'activeTab',
        'browsingData',
        'contextMenus',
        'notifications',
        'scripting',
        'storage',
      ],

      commands: {
        cache_site: {
          description: '__MSG_cmd_cache_site__',
          suggested_key: { default: isFirefox ? 'F4' : 'Ctrl+Shift+4' },
        },
        cache_siteAll: {
          description: '__MSG_cmd_cache_siteAll__',
          suggested_key: { default: isFirefox ? 'F6' : 'Ctrl+Shift+5' },
        },
        cache_browser: {
          description: '__MSG_cmd_cache_browser__',
        },
        cache_browserAll: {
          description: '__MSG_cmd_cache_browserAll__',
        },

        _execute_action: {
          description: '__MSG_cmd_executeAction__',
          ...(!isDev && { suggested_key: { default: 'Alt+Shift+A' } }),
        },
        openSidePanel: {
          description: '__MSG_cmd_openSidePanel__',
          // ...(!isDev && { suggested_key: { default: 'Alt+Shift+P' } }),
        },
        openExtPanel: {
          description: '__MSG_cmd_openExtPanel__',
          // ...(!isDev && { suggested_key: { default: 'Alt+Shift+W' } }),
        },
        openOptions: {
          description: '__MSG_cmd_openOptions__',
          suggested_key: { default: 'Alt+Shift+O' },
        },
      },

      ...(isFirefox
        ? {
            browser_specific_settings: {
              gecko: {
                id: 'cache-cleaner@cssnr.com',
                strict_min_version: '112.0', // manifest - background.type
                data_collection_permissions: { required: ['none'] },
              },
              gecko_android: { strict_min_version: '120.0' }, // permissions.request
            },
          }
        : { minimum_chrome_version: '127' }), // chrome.action.openPopup
    }
  },

  // // https://wxt.dev/guide/essentials/config/browser-startup.html
  // // NOTE: Configured in web-ext.config.ts
  // webExt: { disabled: true },

  // https://wxt.dev/guide/essentials/config/hooks
  hooks: {
    'build:manifestGenerated': (wxt, manifest) => {
      console.log('build:manifestGenerated:', wxt.config.browser)
      if (manifest.action) manifest.action.default_icon = manifest.icons
      if (manifest.sidebar_action) manifest.sidebar_action.default_icon = manifest.icons
    },
  },

  // https://wxt.dev/guide/essentials/config/vite.html
  vite: () => ({
    // NOTE: This silences bootstrap deprecation warnings
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          silenceDeprecations: [
            'import',
            'color-functions',
            'global-builtin',
            'if-function',
          ],
        },
      },
    },
  }),
})
