// https://wxt.dev/guide/essentials/config/runtime.html
// noinspection JSUnusedGlobalSymbols

import { defineAppConfig } from '#imports'

// NOTE: To avoid defining manifest and config or having duplication...
const manifest = chrome.runtime.getManifest()

declare module 'wxt/utils/define-app-config' {
  export interface WxtAppConfig {
    name: string
    shortName: string
    version: string
    githubUrl: string
    homepageUrl: string
    updateUrl: string
    uninstallUrl: string
  }
}

export default defineAppConfig({
  name: manifest.name,
  shortName: manifest.short_name || manifest.name, // NOSONAR
  version: manifest.version,
  githubUrl: 'https://github.com/cssnr/cache-cleaner',
  homepageUrl: 'https://cssnr.github.io/cache-cleaner/',
  updateUrl: 'https://cssnr.github.io/cache-cleaner/updates',
  uninstallUrl: 'https://cssnr.github.io/feedback/?name=cache-cleaner',
})
