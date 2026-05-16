import { getAppConfig } from '#imports'
import { isFirefox } from '@/utils/system.ts'
import { defineBackground } from 'wxt/utils/define-background'
import { openExtPanel, openPopup, openSidePanel } from '@/utils/extension.ts'
import { type Options, defaultOptions, getOptions } from '@/utils/options.ts'
import { clearCache } from '@/utils/cache.ts'
import { updateContextMenus } from './menus.ts'
import { processUpdate } from './upgrade.ts'

const config = getAppConfig()
const banner = `%c  |  ${config.name}
  |    %cv${config.version}%c
 /X\\
//X\\\\ %c${config.homepageUrl}`

export default defineBackground(() => {
  console.log(banner, 'Color: #fa6d62', 'Color: #ffd58c', 'Color: #fa6d62')
  if (import.meta.env.DEV) {
    console.log('%cWARNING: DEV Mode Enabled', 'color: Tomato')
  }

  chrome.runtime.onInstalled.addListener(onInstalled)
  chrome.runtime.onStartup.addListener(onStartup)
  chrome.storage.sync.onChanged.addListener(onChanged)
  chrome.commands?.onCommand.addListener(onCommand)
  chrome.contextMenus?.onClicked.addListener(onClicked)

  // chrome.notifications.onClicked.addListener(notificationsOnClicked)
})

async function onInstalled(details: chrome.runtime.InstalledDetails) {
  console.debug('onInstalled:', details)

  const options = await setDefaultOptions(defaultOptions)
  // console.debug('options:', options)
  updateContextMenus(options).catch(console.warn)
  setUninstall().catch(console.warn)

  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    await chrome.runtime.openOptionsPage()
  } else if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
    processUpdate(options, config.version, details.previousVersion)

    if (options.showUpdate && config.version !== details.previousVersion) {
      const url = `${config.githubUrl}/releases/tag/${config.version}`
      await chrome.tabs.create({ active: false, url })
    }
  }
}

async function onStartup() {
  console.debug('onStartup')
  if (isFirefox) {
    console.debug('Firefox Startup Workarounds')
    const options = await getOptions()
    console.debug('options:', options)
    updateContextMenus(options).catch(console.warn)
    setUninstall().catch(console.warn)
  }
}

function onChanged(changes: Record<string, chrome.storage.StorageChange>) {
  // console.debug('%c background/index.ts - onChanged:', 'color: Cyan', changes)
  if (changes?.options) {
    const oldValue = changes.options?.oldValue as Options | undefined
    const newValue = changes.options?.newValue as Options | undefined
    if (!oldValue || !newValue) return console.debug('missing oldValue or newValue')

    if (
      oldValue?.contextMenu !== newValue.contextMenu ||
      oldValue?.contextAction !== newValue.contextAction
    ) {
      updateContextMenus(newValue).catch(console.warn)
    }

    if (JSON.stringify(oldValue.ctx) !== JSON.stringify(newValue.ctx)) {
      updateContextMenus(newValue).catch(console.warn)
    }
  }
}

async function onCommand(command: string, tab?: chrome.tabs.Tab) {
  console.debug('onCommand:', command, tab)
  if (command === 'openOptions') {
    await chrome.runtime.openOptionsPage()
  } else if (command === 'openExtPanel') {
    await openExtPanel()
  } else if (command === 'openSidePanel') {
    openSidePanel()
  } else if (command.startsWith('cache_')) {
    const cacheType = command.slice(6) as ClearCacheType
    // console.debug('onCommand - cacheType:', cacheType)
    await clearCache(cacheType)
  } else {
    console.warn(`Unknown Command: ${command}`)
  }
}

async function onClicked(ctx: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab) {
  console.debug('onClicked:', ctx.menuItemId, ctx, tab)
  if (ctx.menuItemId === 'extension-options') {
    await chrome.runtime.openOptionsPage()
  } else if (ctx.menuItemId === 'extension-popup') {
    await openPopup()
  } else if (ctx.menuItemId === 'extension-popout') {
    await openExtPanel()
  } else if (ctx.menuItemId === 'extension-sidepanel') {
    openSidePanel()
  } else if (ctx.menuItemId.toString().startsWith('cache')) {
    const cacheType = ctx.menuItemId.toString().split('-')[1] as ClearCacheType
    // console.debug('onClicked - cacheType:', cacheType)
    await clearCache(cacheType)
  } else {
    console.warn(`Unknown ctx.menuItemId: ${ctx.menuItemId}`)
  }
}

// async function notificationsOnClicked(notificationId: string) {
//   console.debug('notificationsOnClicked:', notificationId)
//   await chrome.notifications.clear(notificationId)
// }

async function setDefaultOptions(defaultOptions: object) {
  // console.debug('setDefaultOptions', defaultOptions)
  const options = await getOptions()
  let changed = false
  for (const [key, value] of Object.entries(defaultOptions)) {
    // console.debug(`${key}: default: ${value} current: ${options[key]}`)
    if (options[key] === undefined) {
      changed = true
      options[key] = value
      // console.debug(`Set %c${key}:`, 'color: Khaki', value)
    }
  }
  if (changed) {
    await chrome.storage.sync.set({ options })
    // console.debug('chrome.storage.sync.set:', options)
  }
  return options
}

async function setUninstall() {
  // NOTE: Calling this setUninstallURL and using getAppConfig breaks WXT
  const url = new URL(config.uninstallUrl)
  url.searchParams.append('version', config.version)
  url.searchParams.append('id', chrome.runtime.id)
  // console.debug('chrome.runtime.setUninstallURL:', url.href)
  await chrome.runtime.setUninstallURL(url.href)
}
