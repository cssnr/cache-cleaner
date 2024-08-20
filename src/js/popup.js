// JS for popup.html

import {
    cleanCache,
    injectFunction,
    linkClick,
    processBrowser,
    saveOptions,
    showToast,
    updateManifest,
    updateOptions,
} from './export.js'

chrome.storage.onChanged.addListener(onChanged)

document.addEventListener('DOMContentLoaded', initPopup)
document
    .querySelectorAll('a[href]')
    .forEach((el) => el.addEventListener('click', (e) => linkClick(e, true)))
document
    .querySelectorAll('.options-form input')
    .forEach((el) => el.addEventListener('change', saveOptions))
document
    .getElementsByName('cacheType')
    .forEach((el) => el.addEventListener('change', cacheTypeChange))
document
    .querySelectorAll('[data-clean]')
    .forEach((el) => el.addEventListener('click', cleanCacheClick))
document
    .querySelectorAll('[data-bs-toggle="tooltip"]')
    .forEach((el) => new bootstrap.Tooltip(el))

const hostnameEl = document.getElementById('hostname')
const confirmModal = new bootstrap.Modal('#confirm-modal')

/**
 * Initialize Popup
 * @function initPopup
 */
async function initPopup() {
    console.debug('initPopup')
    updateManifest()
    processBrowser().then()

    const { options } = await chrome.storage.sync.get(['options'])
    console.debug('options:', options)
    updateOptions(options)

    // Check Site Access
    const result = await getSiteInfo()
    if (!result) {
        console.log('%cNo result from getSiteInfo', 'color: Yellow')
        hostnameEl.classList.replace('border-success', 'border-danger')
        document.getElementById('site-access').classList.add('d-none')
        return
    }

    // Update Site Data
    hostnameEl.textContent = result.hostname
    document.getElementById('cache-usage').textContent = formatBytes(
        result.estimate.usage
    )
    document.querySelectorAll('[data-clean]').forEach((el) => {
        el.dataset.hostname = result.hostname
    })
}

async function getSiteInfo() {
    async function getInfo() {
        return {
            hostname: window.location.hostname,
            estimate: await navigator.storage.estimate(),
        }
    }
    try {
        const results = await injectFunction(getInfo)
        console.debug('results:', results)
        const result = results[0]?.result
        console.debug('result:', result)
        return result
    } catch (e) {
        console.debug(`%cInjection error: ${e.message}`, 'color: OrangeRed')
    }
}

/**
 * Clean Cache Change Callback
 * @function cacheTypeChange
 * @param {UIEvent} event
 */
async function cacheTypeChange(event) {
    console.debug('cacheTypeChange:', event)
    document.getElementById('site-settings').classList.toggle('d-none')
    document.getElementById('browser-settings').classList.toggle('d-none')
}

/**
 * Clean Cache Click Callback
 * @function cleanCacheClick
 * @param {UIEvent} event
 */
async function cleanCacheClick(event) {
    console.debug('cleanCacheClick:', event)
    const target = event.currentTarget
    console.debug('target:', target)
    const { options } = await chrome.storage.sync.get(['options'])
    console.debug('options:', options)
    console.debug('type:', target.dataset.clean)

    if (
        options.showConfirmation &&
        target.dataset.clean.startsWith('browser') &&
        !target.dataset.confirm
    ) {
        console.debug('Show Confirmation for:', target.dataset.clean)
        const btn = target.cloneNode(true)
        btn.dataset.confirm = 'true'
        btn.addEventListener('click', cleanCacheClick)
        const parent = confirmModal._element.querySelector('.d-grid')
        parent.innerHTML = ''
        parent.appendChild(btn)
        confirmModal.show()
        return
    }

    try {
        const [tab] = await chrome.tabs.query({
            currentWindow: true,
            active: true,
        })
        console.debug('tab:', tab)
        await cleanCache(target.dataset.clean)
        window.close()
    } catch (e) {
        console.log('e:', e)
        showToast(e.message, 'danger')
    }
}

/**
 * Format Bytes
 * @function humanSize
 * @param {Number|String} bytes Number of bytes
 * @param {Number} decimals Number of decimal places to display
 * @return {String} Formatted string
 */
function formatBytes(bytes, decimals = 2) {
    bytes = parseInt(bytes)
    if (!bytes) return '0 Bytes'
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(decimals))} ${sizes[i]}`
}

/**
 * On Changed Callback
 * @function onChanged
 * @param {Object} changes
 * @param {String} namespace
 */
function onChanged(changes, namespace) {
    // console.debug('onChanged:', changes, namespace)
    for (let [key, { newValue }] of Object.entries(changes)) {
        if (namespace === 'sync' && key === 'options') {
            updateOptions(newValue)
        }
    }
}
