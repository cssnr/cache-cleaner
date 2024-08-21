// JS for options.html

import {
    linkClick,
    saveOptions,
    showToast,
    updateBrowser,
    updateManifest,
    updateOptions,
    updatePlatform,
} from './export.js'

chrome.storage.onChanged.addListener(onChanged)

document.addEventListener('DOMContentLoaded', initOptions)
document.getElementById('copy-support').addEventListener('click', copySupport)
document
    .querySelectorAll('a[href]')
    .forEach((el) => el.addEventListener('click', linkClick))
document
    .querySelectorAll('#options-form input')
    .forEach((el) => el.addEventListener('change', saveOptions))
document
    .getElementById('options-form')
    .addEventListener('submit', (e) => e.preventDefault())
document
    .querySelectorAll('[data-bs-toggle="tooltip"]')
    .forEach((el) => new bootstrap.Tooltip(el))

document.getElementById('chrome-shortcuts').addEventListener('click', () => {
    chrome.tabs.update({ url: 'chrome://extensions/shortcuts' }).then()
})

/**
 * Initialize Options
 * @function initOptions
 */
async function initOptions() {
    console.debug('initOptions')

    updateManifest()
    setShortcuts([
        'clearSiteCache',
        'clearAllSiteCache',
        'clearBrowserCache',
        'clearAllBrowserCache',
        '_execute_action',
        'openOptions',
    ]).then()
    updateBrowser().then()
    updatePlatform().then()

    const { options, hosts } = await chrome.storage.sync.get([
        'options',
        'hosts',
    ])
    console.debug('options, hosts:', options, hosts)
    updateOptions(options)
    // updateTable(hosts)
}

/**
 * On Changed Callback
 * @function onChanged
 * @param {Object} changes
 * @param {String} namespace
 */
async function onChanged(changes, namespace) {
    // console.debug('onChanged:', changes, namespace)
    for (const [key, { newValue }] of Object.entries(changes)) {
        if (namespace === 'sync') {
            if (key === 'options') {
                updateOptions(newValue)
            } else if (key === 'hosts') {
                console.debug('hosts:', newValue)
                // updateTable(newValue)
            }
        }
    }
}

/**
 * Set Keyboard Shortcuts
 * @function setShortcuts
 * @param {Array} names
 * @param {String} [selector]
 * @return {Promise<void>}
 */
async function setShortcuts(names, selector = '#keyboard-shortcuts') {
    if (!chrome.commands) {
        return console.debug('Skipping: chrome.commands')
    }
    const parent = document.querySelector(selector)
    parent.classList.remove('d-none')
    const table = parent.querySelector('table')
    const tbody = table.querySelector('tbody')
    const source = table.querySelector('tfoot > tr').cloneNode(true)
    const commands = await chrome.commands.getAll()
    for (const name of names) {
        const command = commands.find((x) => x.name === name)
        // console.debug('command:', command)
        const row = source.cloneNode(true)
        let description = command.description
        // Note: Chrome does not parse the description for _execute_action in manifest.json
        if (!description && command.name === '_execute_action') {
            description = 'Show Popup Action'
        }
        row.querySelector('.description').textContent = description
        row.querySelector('kbd').textContent = command.shortcut || 'Not Set'
        tbody.appendChild(row)
    }
}

/**
 * Copy Support/Debugging Information
 * @function copySupport
 * @param {MouseEvent} event
 */
async function copySupport(event) {
    console.debug('copySupport:', event)
    event.preventDefault()
    const manifest = chrome.runtime.getManifest()
    const { options } = await chrome.storage.sync.get(['options'])
    const permissions = await chrome.permissions.getAll()
    const result = [
        `${manifest.name} - ${manifest.version}`,
        navigator.userAgent,
        `permissions.origins: ${JSON.stringify(permissions.origins)}`,
        `options: ${JSON.stringify(options)}`,
    ]
    await navigator.clipboard.writeText(result.join('\n'))
    showToast('Support Information Copied.', 'success')
}
