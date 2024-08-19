// JS Exports

export const githubURL = 'https://github.com/cssnr/cache-cleaner'

/**
 * Save Options Callback
 * @function cleanCache
 * @param {String} type
 */
export async function cleanCache(type) {
    console.debug('cleanCache:', type)
    const { options } = await chrome.storage.sync.get(['options'])
    console.debug('options:', options)

    if (type.startsWith('site')) {
        // Site Cleaner
        console.log('%cCleaning Site Cache', 'color: Yellow')

        const [tab] = await chrome.tabs.query({
            currentWindow: true,
            active: true,
        })
        console.debug('tab:', tab)
        const url = new URL(tab.url)
        console.debug('url:', url)
        // const hostname = url.hostname
        console.debug('hostname:', url.hostname)
        console.debug('origin:', url.origin)

        let removalOptions
        if (typeof browser !== 'undefined') {
            removalOptions = { hostnames: [url.hostname] }
        } else {
            removalOptions = { origins: [url.origin] }
        }
        let cleanOptions
        if (type === 'site-selected') {
            cleanOptions = options.site
        } else if (type === 'site-all') {
            cleanOptions = {
                cacheStorage: true,
                cookies: true,
                indexedDB: true,
                localStorage: true,
                serviceWorkers: true,
            }
        }
        if (typeof browser !== 'undefined') {
            if (cleanOptions.cacheStorage) {
                await clearCacheStorage()
            }
            delete cleanOptions.cacheStorage
        }
        console.debug('removalOptions:', removalOptions)
        console.debug('cleanOptions:', cleanOptions)
        await chrome.browsingData.remove(removalOptions, cleanOptions)
        if (options.autoReload) {
            await injectFunction(() => window.location.reload())
        }
    } else if (type.startsWith('browser')) {
        // Browser Cleaner
        console.log('%cCleaning Browser Cache', 'color: OrangeRed')
        let cleanOptions
        if (type === 'browser-selected') {
            cleanOptions = options.browser
        } else if (type === 'browser-all') {
            cleanOptions = {
                cacheStorage: true,
                cookies: true,
                indexedDB: true,
                localStorage: true,
                serviceWorkers: true,
                cache: true,
                downloads: true,
                formData: true,
                history: true,
                passwords: true,
                pluginData: true,
            }
        }
        if (typeof browser !== 'undefined') {
            delete cleanOptions.cacheStorage
        }
        console.debug('cleanOptions:', cleanOptions)
        await chrome.browsingData.remove({}, cleanOptions)
    }
}

/**
 * @function clearCacheStorage
 * @return {Promise<void>}
 */
async function clearCacheStorage() {
    async function cacheStorage() {
        const keys = await caches.keys()
        for (const key of keys) {
            console.log(`%cDeleting Cache: ${key}`, 'color: DeepSkyBlue')
            await caches.delete(key)
        }
    }
    const results = await injectFunction(cacheStorage)
    console.debug('results:', results)
}

/**
 * Save Options Callback
 * @function saveOptions
 * @param {UIEvent} event
 */
export async function saveOptions(event) {
    console.debug('saveOptions:', event)
    const { options } = await chrome.storage.sync.get(['options'])
    let key = event.target.id
    let value
    if (event.target.type === 'radio') {
        key = event.target.name
        const radios = document.getElementsByName(key)
        for (const input of radios) {
            if (input.checked) {
                value = input.id
                break
            }
        }
    } else if (event.target.type === 'checkbox') {
        value = event.target.checked
        // } else if (event.target.type === 'number') {
        //     value = event.target.value.toString()
    } else {
        value = event.target.value
    }

    // Handle Object Subkeys
    if (key.includes('-')) {
        const subkey = key.split('-')[1]
        key = key.split('-')[0]
        console.log(`%cSet: ${key}.${subkey}:`, 'color: DeepSkyBlue', value)
        options[key][subkey] = value
    } else if (value !== undefined) {
        console.log(`%cSet: ${key}:`, 'color: DeepSkyBlue', value)
        options[key] = value
    } else {
        console.warn('No Value for key:', key)
    }
    await chrome.storage.sync.set({ options })
}

/**
 * Update Options based on type
 * @function initOptions
 * @param {Object} options
 */
export function updateOptions(options) {
    console.debug('updateOptions:', options)
    for (let [key, value] of Object.entries(options)) {
        if (typeof value === 'undefined') {
            console.warn('Value undefined for key:', key)
            continue
        }
        // console.debug(`%cKey: ${key}`, 'color: Lime', value)
        if (typeof value === 'object') {
            // console.debug('%cProcessing Object', 'color: Yellow', key)
            for (const [subKey, subValue] of Object.entries(value)) {
                // console.debug(`subKey: ${key}-${subKey}:`, subValue)
                const el = document.getElementById(`${key}-${subKey}`)
                processEl(el, subValue)
            }
            continue
        }
        const el = document.getElementById(key)
        processEl(el, value)
    }
}

/**
 * @function processEl
 * @param {HTMLElement} el
 * @param {Boolean} value
 */
function processEl(el, value) {
    if (!el) {
        return
    }
    if (el.tagName !== 'INPUT') {
        el.textContent = value.toString()
    } else if (['checkbox', 'radio'].includes(el.type)) {
        el.checked = value
    } else {
        el.value = value
    }
    if (el.dataset.related) {
        hideShowElement(`#${el.dataset.related}`, value)
    }
    if (el.dataset.warning) {
        addWarningClass(el.nextElementSibling, value, el.dataset.warning)
    }
}

/**
 * Hide or Show Element with JQuery
 * @function hideShowElement
 * @param {String} selector
 * @param {Boolean} [show]
 * @param {String} [speed]
 */
function hideShowElement(selector, show, speed = 'fast') {
    const element = $(`${selector}`)
    // console.debug('hideShowElement:', show, element)
    if (show) {
        element.show(speed)
    } else {
        element.hide(speed)
    }
}

/**
 * Add Warning Class to Element
 * @function addWarningClass
 * @param {HTMLElement} element
 * @param {Boolean} value
 * @param {String} warning
 */
function addWarningClass(element, value, warning) {
    // console.debug('addWarningClass:', value, element)
    if (value) {
        element.classList.add(warning)
    } else {
        element.classList.remove(warning)
    }
}

/**
 * Link Click Callback
 * Firefox requires a call to window.close()
 * @function linkClick
 * @param {MouseEvent} event
 * @param {Boolean} [close]
 */
export async function linkClick(event, close = false) {
    // console.debug('linkClick:', event, close)
    event.preventDefault()
    const href = event.currentTarget.getAttribute('href').replace(/^\.+/g, '')
    // console.debug('href:', href)
    if (href.startsWith('#')) {
        return
    }
    let url
    if (href.endsWith('html/options.html')) {
        await chrome.runtime.openOptionsPage()
        if (close) window.close()
        return
    } else if (href.startsWith('http')) {
        url = href
    } else {
        url = chrome.runtime.getURL(href)
    }
    console.debug('url:', url)
    await chrome.tabs.create({ active: true, url })
    if (close) window.close()
}

/**
 * Update DOM with Manifest Details
 * @function updateManifest
 */
export function updateManifest() {
    const manifest = chrome.runtime.getManifest()
    document.querySelectorAll('.version').forEach((el) => {
        el.textContent = manifest.version
    })
    document.querySelectorAll('[href="version_url"]').forEach((el) => {
        el.href = `${githubURL}/releases/tag/${manifest.version}`
    })
    document.querySelectorAll('[href="homepage_url"]').forEach((el) => {
        el.href = manifest.homepage_url
    })
}

/**
 * Inject Function into Current Tab with args
 * @function injectFunction
 * @param {Function} func
 * @param {Array} [args]
 * @return {Promise<InjectionResult[]>}
 */
export async function injectFunction(func, args = []) {
    const [tab] = await chrome.tabs.query({ currentWindow: true, active: true })
    return await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: func,
        args: args,
    })
}

/**
 * Show Bootstrap Toast
 * @function showToast
 * @param {String} message
 * @param {String} type
 */
export function showToast(message, type = 'primary') {
    console.debug(`showToast: ${type}: ${message}`)
    const clone = document.querySelector('.d-none > .toast')
    const container = document.getElementById('toast-container')
    if (!clone || !container) {
        return console.warn('Missing clone or container:', clone, container)
    }
    const element = clone.cloneNode(true)
    element.querySelector('.toast-body').innerHTML = message
    element.classList.add(`text-bg-${type}`)
    container.appendChild(element)
    const toast = new bootstrap.Toast(element)
    element.addEventListener('mousemove', () => toast.hide())
    toast.show()
}

/**
 * @function processBrowser
 * @return {Promise<void>}
 */
export function processBrowser() {
    return new Promise((resolve) => {
        let selector
        if (typeof browser !== 'undefined') {
            selector = '.firefox'
        } else {
            selector = '.chrome'
        }
        document
            .querySelectorAll(selector)
            .forEach((el) => el.classList.remove('d-none'))
        resolve()
    })
}
