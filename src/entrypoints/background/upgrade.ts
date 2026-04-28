import { getAppConfig } from '#imports'
import { type Options } from '@/utils/options.ts'

export function processUpdate(options: Options, version: string, previous?: string) {
  console.log('processUpdate:', options)
  console.log('version:', version)
  console.log('previous:', previous)
  const config = getAppConfig()

  if (
    previous !== undefined &&
    compareSemver(previous, '1.0.0') < 0 &&
    compareSemver(version, '1.0.0') >= 0
  ) {
    upgrade100(options)
    // TODO: Determine strategy to set updateUrl path...
    const url = `${config.updateUrl}/v1.0`
    console.log('url:', url)
    chrome.tabs.create({ active: false, url }).catch(console.warn)
  }
}

function upgrade100(options: Options) {
  console.log('%c--- Processing v1.0.0 Upgrade ---', 'color: Gold')
  let changed
  if ('enable' in options.ctx) {
    console.log('Deleting: options.ctx.enable:', options.ctx.enable)
    delete options.ctx.enable
    changed = true
  }
  if (changed) {
    chrome.storage.sync
      .set({ options })
      .then(() => console.log('%cUpgrade Successful', 'color: Lime'))
      .catch(console.warn)
  } else {
    console.log('%cNo Changes Detected', 'color: SpringGreen')
  }
}

function compareSemver(a: string, b: string): number {
  const pa = a.split('.').map(Number)
  const pb = b.split('.').map(Number)

  for (let i = 0; i < 3; i++) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0)
    if (diff !== 0) return diff
  }
  return 0
}
