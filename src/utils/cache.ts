// noinspection JSDeprecatedSymbols

import { i18n } from '#imports'
import { isFirefox, isMobile } from '@/utils/system.ts'
import { getOptions } from '@/utils/options.ts'
import { sendNotifications } from '@/utils/extension.ts'
import type { Options } from '@/utils/options.ts'

export async function clearCache(type: ClearCacheType) {
  const isAll = type.endsWith('All')
  console.log('%cClear Cache:', 'color: Coral', `${isAll ? 'All' : 'Selected'}`, type)
  const options = await getOptions()
  try {
    if (type.startsWith('site')) {
      await clearSiteCache(options, isAll)
    } else {
      await clearBrowserCache(options, isAll)
    }
  } catch (e) {
    console.error(e)
    if (options.showErrorNotifications) {
      const message = e instanceof Error ? e.message : i18n.t('ui.text.unknown')
      await sendNotifications(i18n.t('ui.cache.error'), message)
    }
  }
}

// NOTE: Below functions refactored from VanillaJS

async function clearBrowserCache(options: Options, all = false) {
  console.log('%cClear Browser Cache:', 'color: Crimson', all)

  let cleanOptions: chrome.browsingData.DataTypeSet
  if (!all) {
    cleanOptions = options.browser
  } else {
    cleanOptions = {
      appcache: true,
      cacheStorage: true,
      cookies: true,
      fileSystems: true,
      indexedDB: true,
      localStorage: true,
      serviceWorkers: true,
      webSQL: true,

      cache: true,
      downloads: true,
      formData: true,
      history: true,
      passwords: true,
      pluginData: true,
    }
  }

  if (isFirefox) {
    delete cleanOptions.appcache
    delete cleanOptions.cacheStorage
    delete cleanOptions.fileSystems
    delete cleanOptions.webSQL
  }

  if (!options.showDeprecated || !options.browser.appcache) delete cleanOptions.appcache
  if ((!options.showDeprecated && !isFirefox) || !options.browser.passwords)
    delete cleanOptions.passwords
  if (!options.showDeprecated || !options.browser.pluginData)
    delete cleanOptions.pluginData
  if (!options.showDeprecated || !options.browser.webSQL) delete cleanOptions.webSQL

  // NOTE: These cause chrome.browsingData.remove to fail on Android with no error despite being listed as supported
  //  https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/browsingData/DataTypeSet#browser_compatibility
  if (isFirefox && isMobile) delete cleanOptions.downloads
  if (isFirefox && isMobile) delete cleanOptions.formData
  if (isFirefox && isMobile) delete cleanOptions.history

  console.debug('cleanOptions:', cleanOptions)
  await chrome.browsingData.remove({}, cleanOptions)
  console.log('%cSuccess - chrome.browsingData.remove', 'color: SpringGreen')
}

async function clearSiteCache(options: Options, all = false) {
  console.log('%cClear Site Cache:', 'color: Gold', all)

  const [tab] = await chrome.tabs.query({ currentWindow: true, active: true })
  console.debug('tab:', tab)
  if (!tab.url) return console.warn('no tab.url')

  const url = new URL(tab.url)
  console.debug('url:', url)
  // console.debug('hostname:', url.hostname)
  // console.debug('origin:', url.origin)

  const removalOptions:
    | chrome.browsingData.RemovalOptions
    | browser.browsingData.RemovalOptions = isFirefox
    ? { hostnames: [url.hostname] }
    : { origins: [url.origin] }

  const cleanOptions: chrome.browsingData.DataTypeSet = all
    ? {
        cacheStorage: true,
        cookies: true,
        indexedDB: true,
        localStorage: true,
        serviceWorkers: true,
      }
    : options.site

  if (isFirefox) {
    if (cleanOptions.cacheStorage) clearCacheStorage().catch(console.warn)

    delete cleanOptions.appcache
    delete cleanOptions.cacheStorage
    delete cleanOptions.fileSystems
    delete cleanOptions.webSQL
  }

  if (!options.showDeprecated || !options.site.appcache) delete cleanOptions.appcache
  if (!options.showDeprecated || !options.site.webSQL) delete cleanOptions.webSQL

  console.debug('removalOptions:', removalOptions)
  console.debug('cleanOptions:', cleanOptions)

  await chrome.browsingData.remove(
    removalOptions as chrome.browsingData.RemovalOptions,
    cleanOptions,
  )
  console.log('%cSuccess - chrome.browsingData.remove', 'color: SpringGreen')

  if (options.autoReload) await injectFunction(() => window.location.reload())
}

async function clearCacheStorage() {
  async function cacheStorage() {
    // console.debug('cacheStorage: isSecureContext:', self.isSecureContext)
    // if (!self.isSecureContext) {
    //   throw new Error('Cache Storage API requires a secure context (HTTPS or localhost)')
    // }
    const keys = await caches.keys()
    console.log('%cCache Keys Found:', 'color: PowderBlue', keys.length)
    for (const key of keys) {
      console.log('%cDeleting Cache:', 'color: Yellow', key)
      await caches.delete(key)
    }
  }
  const results = await injectFunction(cacheStorage)
  // console.debug('results:', results)
  if (results?.[0]?.error) console.log(results[0].error)
}

async function injectFunction<Args extends unknown[], R>(
  func: (...args: Args) => R,
  args: Args = [] as unknown as Args,
) {
  const [tab] = await chrome.tabs.query({ currentWindow: true, active: true })
  if (!tab.id) return console.warn('no tab.id')
  return await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func,
    args,
  })
}
