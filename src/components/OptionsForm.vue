<!--suppress JSUnusedLocalSymbols -->
<script setup lang="ts">
import { i18n } from '#imports'
import { computed } from 'vue'
import { isFirefox } from '@/utils/system.ts'
import { useOptions } from '@/composables/useOptions.ts'
import HorizontalRule from '@/components/HorizontalRule.vue'
import FormSwitch from '@/components/FormSwitch.vue'

const props = withDefaults(
  defineProps<{
    compact?: boolean
    heading?: boolean
    subPadding?: string

    browserHeading?: 'short' | 'full'
    browserClass?: string

    show?: string[]
    extension?: string[]
    ctx?: string[]
    confirm?: string[]
    site?: string[]
    allSite?: string[]
    allBrowser?: string[]
  }>(),
  {
    compact: false,
    heading: true,
    subPadding: '66',
    browserHeading: 'short',
    browserClass: 'ms-0',
    show: () => ['site', 'browser', 'extension'],
    extension: () => [
      'autoReload',
      'showAllButtons',
      'popupBrowser',
      'showConfirmation',
      'contextMenu',
      'contextAction',
      'showErrorNotifications',
      'showDeprecated',
      'showUpdate',
    ],
    ctx: () => ['site', 'siteAll', 'browser', 'browserAll', 'popup', 'sidepanel', 'options'],
    confirm: () => ['site', 'siteAll', 'browser', 'browserAll'],
    site: () => [
      'cookies',
      'indexedDB',
      'localStorage',
      'serviceWorkers',
      'cacheStorage',
      'fileSystems',
      'appcache',
      'webSQL',
    ],
    allSite: () => [
      'cookies',
      'fileSystems',
      'indexedDB',
      'localStorage',
      'serviceWorkers',
      'cacheStorage',
      'appcache',
      'webSQL',
    ],
    allBrowser: () => ['cache', 'downloads', 'formData', 'history', 'passwords', 'pluginData'],
  },
)

const options = useOptions()

const deprecated = new Set(['appcache', 'pluginData', 'webSQL'])
if (!isFirefox) ['passwords'].forEach((item) => deprecated.add(item))
const ffExcludes = new Set(['appcache', 'fileSystems', 'webSQL'])
const ffExcludesAll = new Set([...ffExcludes, 'cacheStorage'])

const extensionKeys = computed(() => props.extension.filter((ext) => ext !== 'contextMenu' || !!chrome?.contextMenus))

const siteKeys = computed(() => {
  return props.site.filter((item) => {
    if (isFirefox && ffExcludes.has(item)) return false
    return !(!options.value.showDeprecated && deprecated.has(item))
  })
})

const allSiteKeys = computed(() => {
  return props.allSite.filter((item) => {
    if (isFirefox && ffExcludesAll.has(item)) return false
    return !(!options.value.showDeprecated && deprecated.has(item))
  })
})

const allBrowserKeys = computed(() => {
  if (options.value.showDeprecated) return props.allBrowser
  return props.allBrowser.filter((item) => !deprecated.has(item))
})
</script>

<template>
  <form v-if="options">
    <template v-if="options?.site && show.includes('site')">
      <HorizontalRule v-if="heading" class="my-2">{{ i18n.t('options.form.siteSpecific') }}</HorizontalRule>
      <div class="px-2">
        <template v-for="id in siteKeys" :key="id">
          <FormSwitch v-model="(options['site'] as Record<string, boolean>)[id]" :id="id" subkey="site" />
        </template>
      </div>
    </template>

    <template v-if="options?.browser && show.includes('browser')">
      <HorizontalRule v-if="heading" class="my-2">{{ i18n.t('options.form.globalBrowser') }}</HorizontalRule>

      <div v-if="browserHeading === 'short'" class="ms-2">{{ i18n.t('options.form.allSites') }}:</div>
      <HorizontalRule v-if="browserHeading === 'full'">{{ i18n.t('options.form.allSites') }}</HorizontalRule>

      <div class="px-2">
        <template v-for="id in allSiteKeys" :key="id">
          <FormSwitch
            v-model="(options['browser'] as Record<string, boolean>)[id]"
            :id="id"
            subkey="browser"
            class="col-12"
            :class="browserClass"
          />
        </template>
      </div>

      <div v-if="browserHeading === 'short'" class="ms-2">{{ i18n.t('options.form.browser') }}:</div>
      <HorizontalRule v-if="browserHeading === 'full'">{{ i18n.t('options.form.browser') }}</HorizontalRule>

      <div class="px-2">
        <template v-for="id in allBrowserKeys" :key="id">
          <FormSwitch
            v-model="(options['browser'] as Record<string, boolean>)[id]"
            :id="id"
            subkey="browser"
            class="col-12"
            :class="browserClass"
          />
        </template>
      </div>
    </template>

    <template v-if="show.includes('extension')">
      <HorizontalRule v-if="heading" class="my-2">{{ i18n.t('options.extension') }}</HorizontalRule>
      <div class="px-2">
        <template v-for="id in extensionKeys" :key="id">
          <FormSwitch v-model="options[id]" :id="id" class="col-12" />

          <Transition name="fade">
            <div v-if="id === 'contextMenu' && options['contextMenu']">
              <FormSwitch
                v-for="id in ctx"
                :key="id"
                v-model="(options['ctx'] as Record<string, boolean>)[id]"
                :id="id"
                subkey="ctx"
                :label="i18n.t(`ctx.${id}.label` as any)"
                :tooltip="i18n.t(`ctx.${id}.tip` as any)"
                class="col-12"
                :padding="subPadding"
              />
            </div>
          </Transition>

          <Transition name="fade">
            <div v-if="id === 'showConfirmation' && options['showConfirmation']">
              <FormSwitch
                v-for="id in confirm"
                :key="id"
                v-model="(options['confirm'] as Record<string, boolean>)[id]"
                :id="id"
                subkey="confirm"
                class="col-12"
                :padding="subPadding"
              />
            </div>
          </Transition>
        </template>
      </div>
    </template>
  </form>
</template>
