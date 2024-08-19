// JS Exports

/**
 * Save Options Callback
 * @function cleanCache
 * @param {String} type
 // * @param {chrome.tabs.Tab} tab
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
            console.debug('window.location.reload()')
            await injectFunction(() => window.location.reload())
        }
    } else if (type.startsWith('browser')) {
        // Browser Cleaner
        console.log('%cCleaning Browser Cache', 'color: Red')
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

async function clearCacheStorage() {
    async function cacheStorage() {
        const keys = await caches.keys()
        for (const key of keys) {
            console.log(`%cDeleting Cache: ${key}`, 'color: OrangeRed')
            await caches.delete(key)
        }
    }
    const results = await injectFunction(cacheStorage)
    console.debug('results:', results)
}

/**
 * Show Extension Panel
 * @function showPanel
 * @param {Number} height
 * @param {Number} width
 */
export async function showPanel(height = 520, width = 480) {
    return await chrome.windows.create({
        type: 'panel',
        url: '/html/panel.html',
        width,
        height,
    })
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
        console.log(`%cSet: ${key}.${subkey}:`, 'color: Magenta', value)
        options[key][subkey] = value
    } else if (value !== undefined) {
        console.log(`%cSet: ${key}:`, 'color: Magenta', value)
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

function processEl(el, value) {
    if (!el) {
        // console.debug('no el')
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
        // console.debug('return on anchor link')
        return
    }
    let url
    if (href.endsWith('html/options.html')) {
        await chrome.runtime.openOptionsPage()
        if (close) window.close()
        return
    } else if (href.endsWith('html/panel.html')) {
        await showPanel()
        if (close) window.close()
        return
    } else if (href.startsWith('http')) {
        url = href
    } else {
        url = chrome.runtime.getURL(href)
    }
    console.debug('url:', url)
    await activateOrOpen(url)
    if (close) window.close()
}

/**
 * Activate or Open Tab from URL
 * @function activateOrOpen
 * @param {String} url
 * @param {Boolean} [open]
 * @return {Promise<Boolean>}
 */
export async function activateOrOpen(url, open = true) {
    console.debug('activateOrOpen:', url)
    // Get Tab from Tabs (requires host permissions)
    const tabs = await chrome.tabs.query({ currentWindow: true })
    // console.debug('tabs:', tabs)
    for (const tab of tabs) {
        if (tab.url === url) {
            console.debug('found tab in tabs:', tab)
            return await chrome.tabs.update(tab.id, { active: true })
        }
    }
    console.debug('tab not found, open:', open)
    if (open) {
        return await chrome.tabs.create({ active: true, url })
    }
}

/**
 * Update DOM with Manifest Details
 * @function updateManifest
 */
export function updateManifest() {
    const manifest = chrome.runtime.getManifest()
    document
        .querySelectorAll('.version')
        .forEach((el) => (el.textContent = manifest.version))
    document
        .querySelectorAll('[href="homepage_url"]')
        .forEach((el) => (el.href = manifest.homepage_url))
}

/**
 * Check Host Permissions
 * @function checkPerms
 * @return {Promise<Boolean>}
 */
export async function checkPerms() {
    const hasPerms = await chrome.permissions.contains({
        origins: ['*://*/*'],
    })
    console.debug('checkPerms:', hasPerms)
    // Firefox still uses DOM Based Background Scripts
    if (typeof document === 'undefined') {
        return hasPerms
    }
    const hasPermsEl = document.querySelectorAll('.has-perms')
    const grantPermsEl = document.querySelectorAll('.grant-perms')
    if (hasPerms) {
        hasPermsEl.forEach((el) => el.classList.remove('d-none'))
        grantPermsEl.forEach((el) => el.classList.add('d-none'))
    } else {
        grantPermsEl.forEach((el) => el.classList.remove('d-none'))
        hasPermsEl.forEach((el) => el.classList.add('d-none'))
    }
    return hasPerms
}

/**
 * Grant Permissions Click Callback
 * @function grantPerms
 * @param {MouseEvent} event
 * @param {Boolean} [close]
 */
export async function grantPerms(event, close = false) {
    console.debug('grantPerms:', event)
    requestPerms() // Firefox: Do NOT await so that we can call window.close()
    if (close) {
        window.close()
    }
}

/**
 * Request Host Permissions
 * @function requestPerms
 * @return {Promise<Boolean>}
 */
export async function requestPerms() {
    return await chrome.permissions.request({
        origins: ['*://*/*'],
    })
}

/**
 * Revoke Permissions Click Callback
 * NOTE: For many reasons Chrome will determine host_perms are required and
 *       will ask for them at install time and not allow them to be revoked
 * @function revokePerms
 * @param {MouseEvent} event
 */
export async function revokePerms(event) {
    console.debug('revokePerms:', event)
    const permissions = await chrome.permissions.getAll()
    console.debug('permissions:', permissions)
    try {
        await chrome.permissions.remove({
            origins: permissions.origins,
        })
        await checkPerms()
    } catch (e) {
        console.log(`%cError: ${e.message}`, 'color: Red', e)
        showToast(e.toString(), 'danger')
    }
}

/**
 * Permissions On Added Callback
 * @param {chrome.permissions} permissions
 */
export async function onAdded(permissions) {
    console.debug('onAdded', permissions)
    await checkPerms()
}

/**
 * Permissions On Removed Callback
 * @param {chrome.permissions} permissions
 */
export async function onRemoved(permissions) {
    console.debug('onRemoved', permissions)
    await checkPerms()
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
