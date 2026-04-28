// NOTE: All functions below are ported from VanillaJS

export function openSidePanel(close?: boolean) {
  console.debug('openSidePanel - close:', close)
  if (chrome.sidePanel) {
    // console.debug('chrome.sidePanel')
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.sidePanel
        .open({ windowId: tab.windowId })
        .then(() => {
          if (close) window.close()
        })
        .catch((e) => console.warn(e))
    })
  } else if (chrome.sidebarAction) {
    // console.debug('chrome.sidebarAction')
    chrome.sidebarAction.open()
    if (close) window.close()
  } else {
    console.log('Side Panel Not Supported')
  }
}

export function openOptions(close = false) {
  console.debug('openOptions')
  chrome.runtime
    .openOptionsPage()
    .then(() => {
      if (close) window.close()
    })
    .catch((e) => console.warn(e))
}

export async function openPopup() {
  console.debug('openPopup')
  // Note: This fails if popup is already open (ex. double clicks)
  try {
    await chrome.action.openPopup()
  } catch (e) {
    console.debug(e)
  }
}

export async function openExtPanel(close = false) {
  console.debug('openExtPanel:', close)

  const panelPath = 'popout.html'
  const [defaultWidth, defaultHeight] = [390, 600]
  const type = chrome.windows.CreateType.POPUP

  if (!chrome.windows) return console.log('Browser does not support: chrome.windows')

  const local = await chrome.storage.local.get([
    'lastPanelID',
    'panelWidth',
    'panelHeight',
  ])
  // console.debug('local:', local)

  const lastPanelID = local.lastPanelID as number | undefined
  // console.debug('lastPanelID:', lastPanelID)

  try {
    if (lastPanelID) {
      // NOTE: This throws if lastPanelID is not an existing window ID
      const panel = await chrome.windows.get(lastPanelID)
      // console.debug('panel', panel)
      // console.debug('panel?.id', panel?.id)
      if (panel?.id) {
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
        // console.debug('tabs:', tabs)
        // console.debug('tabs[0]?.windowId:', tabs[0]?.windowId)
        if (panel.id != tabs[0]?.windowId) {
          console.debug('%c Panel found:', 'color: SpringGreen', panel.id)
          await chrome.windows.update(panel.id, { focused: true })
          if (close) window.close()
          return
        }
      }
    }
  } catch (e) {
    console.debug(e)
  }

  const panelWidth = local.panelWidth as number | undefined
  // console.debug('panelWidth:', panelWidth)
  const panelHeight = local.panelHeight as number | undefined
  // console.debug('panelHeight:', panelHeight)
  const width = panelWidth || defaultWidth // NOSONAR
  const height = panelHeight || defaultHeight // NOSONAR
  // console.debug(`width, height:`, width, height)
  const url = chrome.runtime.getURL(panelPath)
  // console.debug('url:', url)
  const panel = await chrome.windows.create({ type, url, width, height })
  // console.debug('panel:', panel)
  if (panel) {
    console.debug(`%c Created new window: ${panel.id}`, 'color: Magenta')
    chrome.storage.local.set({ lastPanelID: panel.id }).catch(console.warn)
  }
  if (close) window.close()
}

export async function activateOrOpen(url: string, open = true) {
  console.debug('activateOrOpen:', url, open)
  // Note: To Get Tab from Tabs (requires host permissions or tabs)
  const tabs = await chrome.tabs.query({ currentWindow: true })
  // console.debug('tabs:', tabs)
  for (const tab of tabs) {
    if (tab.url === url) {
      console.debug('%cTab found, activating:', 'color: Lime', tab)
      return await chrome.tabs.update(tab.id, { active: true })
    }
  }
  if (open) {
    console.debug('%cTab not found, opening url:', 'color: Yellow', url)
    return await chrome.tabs.create({ active: true, url })
  }
  console.warn('tab not found and open not set for url:', url)
}

export function clickOpen(e: Event, close = false) {
  const target = e.currentTarget as HTMLAnchorElement
  let url = target.href
  console.debug('clickOpen:', close, url)
  if (!url || url === '#') return
  if (url.startsWith('/')) {
    url = chrome.runtime.getURL(url)
  }
  activateOrOpen(url)
    .then(() => {
      if (close || target.dataset.close === 'true') window.close()
    })
    .catch(console.log)
}

export async function sendNotifications(title: string, message: string) {
  // TODO: Add error icon...
  const notification = await chrome.notifications.create({
    type: 'basic',
    iconUrl: chrome.runtime.getURL('icons/48.png'),
    title,
    message: message,
  })
  console.debug('notification:', notification)
}
