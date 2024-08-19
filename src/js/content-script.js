// JS Content Script

console.debug('%cCache Cleaner: content-script.js', 'color: Yellow')

// const url = new URL(window.location)
// let tabEnabled = false

if (!chrome.storage.onChanged.hasListener(onChanged)) {
    chrome.storage.onChanged.addListener(onChanged)
}

;(async () => {
    const { options, hosts } = await chrome.storage.sync.get([
        'options',
        'hosts',
    ])
    console.debug('options, hosts:', options, hosts)
    // if (url.hostname in hosts) {
    //     tabEnabled = true
    //     console.debug('%cHost Settings Found.', 'color: LimeGreen')
    //     await chrome.runtime.sendMessage({
    //         badgeText: 'On',
    //         badgeColor: 'green',
    //     })
    // }
})()

/**
 * On Changed Callback
 * @function onChanged
 * @param {Object} changes
 * @param {String} namespace
 */
async function onChanged(changes, namespace) {
    // console.debug('onChanged:', changes, namespace)
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (namespace === 'sync' && key === 'options') {
            console.debug('options:', oldValue, newValue)
        }
        if (namespace === 'sync' && key === 'host') {
            console.debug('hosts:', oldValue, newValue)
            // if (tabEnabled && !(url.host in newValue)) {
            //     await chrome.runtime.sendMessage({
            //         badgeText: '',
            //     })
            // }
        }
    }
}
