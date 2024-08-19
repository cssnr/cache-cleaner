// JS for options.html

import {
    checkPerms,
    grantPerms,
    linkClick,
    onAdded,
    onRemoved,
    processBrowser,
    revokePerms,
    saveOptions,
    showToast,
    updateManifest,
    updateOptions,
} from './export.js'

chrome.storage.onChanged.addListener(onChanged)
chrome.permissions.onAdded.addListener(onAdded)
chrome.permissions.onRemoved.addListener(onRemoved)

document.addEventListener('DOMContentLoaded', initOptions)
document.getElementById('copy-support').addEventListener('click', copySupport)

document
    .querySelectorAll('.revoke-permissions')
    .forEach((el) => el.addEventListener('click', revokePerms))
document
    .querySelectorAll('.grant-permissions')
    .forEach((el) => el.addEventListener('click', grantPerms))
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

/**
 * Initialize Options
 * @function initOptions
 */
async function initOptions() {
    console.debug('initOptions')

    updateManifest()
    setShortcuts('#keyboard-shortcuts', true).then()
    checkPerms().then()
    processBrowser().then()

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
 * @param {String} selector
 * @param {Boolean} action
 * @return {Promise<void>}
 */
async function setShortcuts(selector = '#keyboard-shortcuts', action = false) {
    if (!chrome.commands) {
        return console.debug('Skipping: chrome.commands')
    }
    const table = document.querySelector(selector)
    const tbody = table.querySelector('tbody')
    const source = table.querySelector('tfoot > tr').cloneNode(true)
    const commands = await chrome.commands.getAll()
    for (const command of commands) {
        // console.debug('command:', command)
        const row = source.cloneNode(true)
        // TODO: Chrome does not parse the description for _execute_action in manifest.json
        let description = command.description
        if (!description && command.name === '_execute_action') {
            description = 'Show Popup'
        }
        row.querySelector('.description').textContent = description
        row.querySelector('kbd').textContent = command.shortcut || 'Not Set'
        tbody.appendChild(row)
    }
    if (action) {
        const userSettings = await chrome.action.getUserSettings()
        const row = source.cloneNode(true)
        row.querySelector('i').className = 'fa-solid fa-puzzle-piece me-1'
        row.querySelector('.description').textContent = 'Toolbar Icon Pinned'
        row.querySelector('kbd').textContent = userSettings ? 'Yes' : 'No'
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
