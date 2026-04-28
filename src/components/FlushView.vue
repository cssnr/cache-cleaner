<script setup lang="ts">
import { i18n } from '#imports'
import { type Ref, inject, ref } from 'vue'
import { showToast } from '@/composables/useToast.ts'
import { useOptions } from '@/composables/useOptions.ts'
import { clearCache } from '@/utils/cache.ts'
import ConfirmModal from '@/components/ConfirmModal.vue'

const siteInfo = inject<Ref<SiteInfo | undefined>>('siteInfo')
const updateTab = inject<() => Promise<void>>('updateTab')

defineOptions({ inheritAttrs: false })

withDefaults(
  defineProps<{
    cacheType?: 'site' | 'browser'
    showSite?: boolean
    colClass?: string
  }>(),
  {
    cacheType: 'site',
    showSite: true,
    colClass: 'px-0',
  },
)

const options = useOptions()
const confirmModal = ref<InstanceType<typeof ConfirmModal> | null>(null)

async function onConfirm(type: ClearCacheType) {
  // console.log('onConfirm:', type)
  try {
    await clearCache(type)
    const text = i18n.t(`ui.cache.type.${type}`)
    showToast(`${i18n.t('ui.cache.cleared')} ${text} ${i18n.t('ui.cache.cache')}.`)
    // NOTE: activeTab permissions are lost on reload and therefore require re-activation...
    //  The only work around is to add optional host permissions, just for this feature.
    if (type.startsWith('site') && options.value.autoReload) return window.close()
    // NOTE: chrome.browsingData.remove clears cache asynchronously after resolving, therefore;
    //  there is no reliable way to know when to re-check the site cache size...
    if (updateTab) setTimeout(updateTab, 1000)
  } catch (e) {
    console.log(e)
    let message = i18n.t('ui.cache.error')
    if (e instanceof Error) message += `: ${e.message.slice(0, 80)}...`
    showToast(message, 'danger')
  }
}

function clearCacheClick(type: ClearCacheType) {
  // console.log(`clearCacheClick: ${type}:`, options.value?.confirm[type])
  if (options.value.showConfirmation && options.value?.confirm[type]) {
    confirmModal.value?.show(type)
  } else {
    onConfirm(type)
  }
}
</script>

<template>
  <div class="row m-0" v-bind="$attrs">
    <div
      v-if="showSite && (cacheType === 'site' || options.showAllButtons)"
      :class="[options.showAllButtons ? 'col-6' : 'col-12', 'd-flex flex-column', colClass]"
    >
      <button
        class="btn btn-success text-truncate w-100 px-0"
        :class="{ disabled: !siteInfo }"
        @click="clearCacheClick('site')"
      >
        <i class="fa-solid fa-toggle-on me-1"></i> {{ i18n.t('ui.cache.type.site') }}
      </button>
      <button
        class="btn btn-info text-truncate w-100 px-0"
        :class="{ disabled: !siteInfo }"
        @click="clearCacheClick('siteAll')"
      >
        <i class="fa-solid fa-broom me-1"></i> {{ i18n.t('ui.cache.type.siteAll') }}
      </button>
    </div>

    <div
      v-if="cacheType === 'browser' || options.showAllButtons"
      :class="[options.showAllButtons && showSite ? 'col-6' : 'col-12', 'd-flex flex-column', colClass]"
    >
      <button class="btn btn-warning text-truncate w-100 px-0" @click="clearCacheClick('browser')">
        <i class="fa-solid fa-toggle-on me-1"></i> {{ i18n.t('ui.cache.type.browser') }}
      </button>
      <button class="btn btn-danger text-truncate w-100 px-0" @click="clearCacheClick('browserAll')">
        <i class="fa-solid fa-skull-crossbones me-1"></i> {{ i18n.t('ui.cache.type.browserAll') }}
      </button>
    </div>
  </div>

  <ConfirmModal ref="confirmModal" @confirm="onConfirm" />
</template>
