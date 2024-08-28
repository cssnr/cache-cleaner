// JS Background Service Worker

import { cleanCache, githubURL } from './export.js'

chrome.runtime.onInstalled.addListener(onInstalled)
chrome.runtime.onStartup.addListener(onStartup)
chrome.contextMenus?.onClicked.addListener(onClicked)
chrome.commands?.onCommand.addListener(onCommand)
chrome.storage.onChanged.addListener(onChanged)

/**
 * On Installed Callback
 * @function onInstalled
 * @param {InstalledDetails} details
 */
async function onInstalled(details) {
    console.log('onInstalled:', details)
    const options = await setDefaultOptions({
        site: {
            cacheStorage: true,
            cookies: false,
            fileSystems: true,
            indexedDB: true,
            localStorage: true,
            serviceWorkers: true,
            webSQL: true,
        },
        browser: {
            cacheStorage: true,
            cookies: false,
            fileSystems: true,
            indexedDB: true,
            localStorage: false,
            serviceWorkers: true,
            webSQL: true,

            appcache: true,
            cache: true,
            downloads: true,
            formData: false,
            history: false,
            passwords: false,
            pluginData: false,
        },
        autoReload: true,
        showConfirmation: true,
        ctx: {
            enable: true,
            site: true,
            siteAll: true,
            browser: false,
            browserAll: false,
            options: true,
        },
        showUpdate: false,
    })
    console.debug('options:', options)
    // noinspection JSUnresolvedReference
    if (options.ctx.enable) {
        createContextMenus(options.ctx)
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
    setUninstallURL()

    // const platform = await chrome.runtime.getPlatformInfo()
    // console.debug('platform:', platform)
}

/**
 * On Startup Callback
 * @function onStartup
 */
async function onStartup() {
    console.log('onStartup')
    // noinspection JSUnresolvedReference
    if (typeof browser !== 'undefined') {
        console.log('Firefox Startup Workarounds')
        const { options } = await chrome.storage.sync.get(['options'])
        // console.debug('options:', options)
        if (options.ctx.enable) {
            createContextMenus(options.ctx)
        }
        setUninstallURL()
    }
}

function setUninstallURL() {
    // const manifest = chrome.runtime.getManifest()
    // const url = new URL('https://link-extractor.cssnr.com/uninstall/')
    // url.searchParams.append('version', manifest.version)
    // chrome.runtime.setUninstallURL(url.href)
    // console.debug(`setUninstallURL: ${url.href}`)
    chrome.runtime.setUninstallURL(`${githubURL}/issues`)
    console.debug(`setUninstallURL: ${githubURL}/issues`)
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
        console.debug('%cclearSiteCache', 'color: Lime')
        await cleanCache('site-selected')
    } else if (ctx.menuItemId === 'clearAllSiteCache') {
        console.debug('%cclearAllSiteCache', 'color: Lime')
        await cleanCache('site-all')
    } else if (ctx.menuItemId === 'clearBrowserCache') {
        console.debug('%cclearBrowserCache', 'color: Lime')
        await cleanCache('browser-selected')
    } else if (ctx.menuItemId === 'clearAllBrowserCache') {
        console.debug('%cclearAllBrowserCache', 'color: Lime')
        await cleanCache('browser-all')
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
    } else if (command === 'clearBrowserCache') {
        console.debug('%cclearBrowserCache:', 'color: Lime')
        await cleanCache('browser-selected')
    } else if (command === 'clearAllBrowserCache') {
        console.debug('%cclearAllBrowserCache:', 'color: Lime')
        await cleanCache('browser-all')
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
    console.debug('onChanged:', changes, namespace)
    for (const [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (namespace === 'sync' && key === 'options' && oldValue && newValue) {
            if (JSON.stringify(oldValue.ctx) !== JSON.stringify(newValue.ctx)) {
                console.debug('%cCTX Change', 'color: Lime')
                if (newValue.ctx.enable) {
                    console.log('%cEnabled contextMenus.', 'color: Green')
                    createContextMenus(newValue.ctx)
                } else {
                    console.log('Disabled contextMenus.', 'color: Yellow')
                    chrome.contextMenus?.removeAll()
                }
            }
        }
    }
}

/**
 * Create Context Menus
 * @function createContextMenus
 * @param {options.ctx} ctx
 */
function createContextMenus(ctx) {
    console.debug('createContextMenus:', ctx)
    if (!chrome.contextMenus) {
        return console.debug('Skipping: chrome.contextMenus')
    }
    chrome.contextMenus.removeAll()
    // noinspection JSUnresolvedReference
    if (ctx.site) {
        addContext([['all'], 'clearSiteCache', 'Clear Site Cache'])
    }
    // noinspection JSUnresolvedReference
    if (ctx.siteAll) {
        addContext([['all'], 'clearAllSiteCache', 'Clear All Site Cache'])
    }
    // noinspection JSUnresolvedReference
    if (ctx.browser) {
        addContext([['all'], 'clearBrowserCache', 'Clear Browser Cache'])
    }
    // noinspection JSUnresolvedReference
    if (ctx.browserAll) {
        addContext([['all'], 'clearAllBrowserCache', 'Clear All Browser Cache'])
    }
    // noinspection JSUnresolvedReference
    if (ctx.options) {
        if (ctx.site || ctx.siteAll || ctx.browser || ctx.browserAll) {
            addContext([['all'], 'separator'])
        }
        addContext([['all'], 'openOptions', 'Open Options'])
    }
}

/**
 * Add Context from Array
 * @function addContext
 * @param {[String[],String,String?,String?]} context
 */
function addContext(context) {
    // console.debug('addContext:', context)
    try {
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
        console.warn(`Error Adding Context: ${e.message}`, e)
    }
}

/**
 * Set Default Options
 * @function setDefaultOptions
 * @param {Object} defaultOptions
 * @return {Promise<Object.<String, String|Boolean|Object>>}
 */
async function setDefaultOptions(defaultOptions) {
    console.log('setDefaultOptions', defaultOptions)
    // let { hosts } = await chrome.storage.sync.get(['hosts'])
    // if (!hosts) {
    //     await chrome.storage.sync.set({ hosts: {} })
    //     console.debug('Initialized Empty: hosts')
    // }
    let { options } = await chrome.storage.sync.get(['options'])
    options = options || {}
    let changed = false
    for (const [key, value] of Object.entries(defaultOptions)) {
        // console.log(`${key}: default: ${value} current: ${options[key]}`)
        if (options[key] === undefined) {
            changed = true
            options[key] = value
            console.log(`Set %c${key}:`, 'color: Khaki', value)
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
                        'color: Lime',
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
