// JS Background Service Worker

import { cleanCache, githubURL } from './export.js'

chrome.runtime.onStartup.addListener(onStartup)
chrome.runtime.onInstalled.addListener(onInstalled)
chrome.contextMenus?.onClicked.addListener(onClicked)
chrome.commands?.onCommand.addListener(onCommand)
chrome.storage.onChanged.addListener(onChanged)

/**
 * On Startup Callback
 * @function onStartup
 */
async function onStartup() {
    console.log('onStartup')
    const { options } = await chrome.storage.sync.get(['options'])
    // await updateIcon(options)
    if (typeof browser !== 'undefined') {
        console.log('Firefox CTX Menu Workaround')
        // console.debug('options:', options)
        if (options.contextMenu) {
            createContextMenus()
        }
    }
}

/**
 * On Installed Callback
 * @function onInstalled
 * @param {InstalledDetails} details
 */
async function onInstalled(details) {
    console.log('onInstalled:', details)
    // const uninstallURL = new URL('https://link-extractor.cssnr.com/uninstall/')
    const options = await setDefaultOptions({
        site: {
            cacheStorage: true,
            cookies: true,
            indexedDB: true,
            localStorage: true,
            serviceWorkers: true,
        },
        browser: {
            cacheStorage: true,
            cookies: true,
            indexedDB: true,
            localStorage: true,
            serviceWorkers: true,
            cache: true,
            downloads: false,
            formData: false,
            history: false,
            passwords: false,
            pluginData: false,
        },
        autoReload: true,
        contextMenu: true,
        showUpdate: false,
    })
    console.debug('options:', options)
    if (options.contextMenu) {
        createContextMenus()
    }
    const manifest = chrome.runtime.getManifest()
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        await chrome.runtime.openOptionsPage()
    } else if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
        if (options.showUpdate) {
            if (manifest.version !== details.previousVersion) {
                const url = `${githubURL}/releases/tag/${manifest.version}`
                await chrome.tabs.create({ active: false, url })
            }
        }
    }
    // uninstallURL.searchParams.append('version', manifest.version)
    // console.log('uninstallURL:', uninstallURL.href)
    // await chrome.runtime.setUninstallURL(uninstallURL.href)
    await chrome.runtime.setUninstallURL(`${githubURL}/issues`)
}

/**
 * On Clicked Callback
 * @function onClicked
 * @param {OnClickData} ctx
 * @param {chrome.tabs.Tab} tab
 */
async function onClicked(ctx, tab) {
    console.debug('onClicked:', ctx, tab)
    if (ctx.menuItemId === 'openOptions') {
        await chrome.runtime.openOptionsPage()
    } else if (ctx.menuItemId === 'clearSiteCache') {
        console.debug('%cclearSiteCache:', 'color: Lime')
        await cleanCache('site-selected')
    } else if (ctx.menuItemId === 'clearAllSiteCache') {
        console.debug('%cclearAllSiteCache:', 'color: Lime')
        await cleanCache('site-all')
    } else {
        console.error(`Unknown ctx.menuItemId: ${ctx.menuItemId}`)
    }
}

/**
 * On Command Callback
 * @function onCommand
 * @param {String} command
 */
async function onCommand(command) {
    console.debug(`onCommand: ${command}`)
    if (command === 'openOptions') {
        await chrome.runtime.openOptionsPage()
    } else if (command === 'clearSiteCache') {
        console.debug('%cclearSiteCache:', 'color: Lime')
        await cleanCache('site-selected')
    } else if (command === 'clearAllSiteCache') {
        console.debug('%cclearAllSiteCache:', 'color: Lime')
        await cleanCache('site-all')
    } else {
        console.error(`Unknown command: ${command}`)
    }
}

/**
 * On Changed Callback
 * @function onChanged
 * @param {Object} changes
 * @param {String} namespace
 */
async function onChanged(changes, namespace) {
    // console.debug('onChanged:', changes, namespace)
    for (const [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (namespace === 'sync' && key === 'options' && oldValue && newValue) {
            if (oldValue.contextMenu !== newValue.contextMenu) {
                if (newValue?.contextMenu) {
                    console.info('Enabled contextMenu...')
                    createContextMenus()
                } else {
                    console.info('Disabled contextMenu...')
                    chrome.contextMenus.removeAll()
                }
            }
        }
    }
}

/**
 * Create Context Menus
 * @function createContextMenus
 */
function createContextMenus() {
    console.debug('createContextMenus')
    chrome.contextMenus.removeAll()
    /** @type {Array[String[], String, String, String]} */
    const contexts = [
        [['all'], 'clearSiteCache', 'Clear Site Cache'],
        [['all'], 'clearAllSiteCache', 'Clear All Site Cache'],
        [['all'], 'separator'],
        [['all'], 'openOptions', 'Open Options'],
    ]
    contexts.forEach(addContext)
}

/**
 * Add Context from Array
 * @function addContext
 * @param {[[ContextType],String,String,String]} context
 */
function addContext(context) {
    try {
        console.debug('addContext:', context)
        if (context[1] === 'separator') {
            context[1] = Math.random().toString().substring(2, 7)
            context.push('separator', 'separator')
        }
        chrome.contextMenus.create({
            contexts: context[0],
            id: context[1],
            title: context[2],
            type: context[3],
        })
    } catch (e) {
        console.log(`%cError Adding Context: ${e.message}`, 'color: Red', e)
    }
}

/**
 * Set Default Options
 * @function setDefaultOptions
 * @param {Object} defaultOptions
 * @return {Promise<Object.<String, String|Boolean>>}
 */
async function setDefaultOptions(defaultOptions) {
    console.log('setDefaultOptions', defaultOptions)
    let { hosts } = await chrome.storage.sync.get(['hosts'])
    if (!hosts) {
        await chrome.storage.sync.set({ hosts: {} })
        console.debug('Initialized Empty: hosts')
    }
    let { options } = await chrome.storage.sync.get(['options'])
    options = options || {}
    let changed = false
    for (const [key, value] of Object.entries(defaultOptions)) {
        // console.log(`${key}: default: ${value} current: ${options[key]}`)
        if (options[key] === undefined) {
            changed = true
            options[key] = value
            console.log(`%cSet ${key}:`, 'color: Yellow', value)
        } else if (typeof defaultOptions[key] === 'object') {
            console.debug(`%cProcessing Object: ${key}`, 'color: Magenta')
            for (const [subKey, subValue] of Object.entries(
                defaultOptions[key]
            )) {
                if (options[key][subKey] === undefined) {
                    changed = true
                    options[key][subKey] = subValue
                    console.log(
                        `%cSet: ${key}.${subKey}:`,
                        'color: Yellow',
                        subValue
                    )
                }
            }
        }
    }
    if (changed) {
        await chrome.storage.sync.set({ options })
        console.log('changed:', options)
    }
    return options
}
