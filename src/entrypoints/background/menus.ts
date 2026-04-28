import { i18n } from '#imports'
import { Options } from '@/utils/options.ts'

const config = {
  cache: {
    site: ['all'],
    siteAll: ['all'],
    browser: ['all'],
    browserAll: ['all'],
  },
  extension: {
    popup: ['all'],
    sidepanel: ['all'],
    options: ['all'],
  },
}

export async function updateContextMenus(options: Options) {
  // console.debug('updateContextMenus:', options.contextMenu, options.ctx)
  if (!chrome.contextMenus) return console.debug('Skipping: chrome.contextMenus')

  const contexts: chrome.contextMenus.CreateProperties[] = []

  for (const [key, value] of Object.entries(config['cache'])) {
    addContextMenuItem(contexts, options, key, value, 'cache')
  }

  if (contexts.length) {
    const ctx =
      options.ctx.popup || options.ctx.sidepanel || options.ctx.options ? 'all' : 'action'
    contexts.push({
      type: 'separator',
      id: crypto.randomUUID(),
      contexts: [ctx],
    })
  }
  const length = contexts.length

  for (const [key, value] of Object.entries(config['extension'])) {
    addContextMenuItem(contexts, options, key, value, 'extension')
  }

  if (length == contexts.length) contexts.pop()
  // console.debug(`contexts: ${contexts.length}:`, contexts)

  chrome.contextMenus.removeAll().then(() => {
    contexts.forEach((item) => chrome.contextMenus.create(item))
  })
}

function addContextMenuItem(
  contexts: chrome.contextMenus.CreateProperties[],
  options: Options,
  key: string,
  value: unknown,
  pk?: string,
) {
  const ctxKey = key as keyof Options['ctx']
  // console.debug('%c addContextMenuItem:', 'color: SpringGreen', ctxKey, '- pk:', pk)
  // console.debug(`%c ${pk}/${ctxKey}:`, 'color: SpringGreen', value)
  if (!options.contextMenu || !options.ctx[ctxKey]) {
    if (!options.contextAction && pk === 'cache') return
    value = ['action']
  }
  // console.debug(`%c ${pk}/${ctxKey}:`, 'color: LightSalmon', value)
  contexts.push({
    id: pk ? `${pk}-${key}` : key,
    contexts: value as chrome.contextMenus.CreateProperties['contexts'],
    title: i18n.t(`ctx.${key}.label` as any),
  })
}
