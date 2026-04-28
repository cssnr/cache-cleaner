type ClearCacheType = 'site' | 'siteAll' | 'browser' | 'browserAll'

interface SiteInfo {
  hostname: string
  estimate?: StorageEstimate
}
