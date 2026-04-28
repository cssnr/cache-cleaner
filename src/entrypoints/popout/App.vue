<script setup lang="ts">
import { i18n } from '#imports'
import { onMounted, onUnmounted, provide } from 'vue'
import { debounce } from '@/utils'
import { useTitle } from '@/composables/useTitle.ts'
import ToastAlerts from '@/components/ToastAlerts.vue'
import BackToTop from '@/components/BackToTop.vue'
import PanelHeader from '@/components/PanelHeader.vue'
import PanelFooter from '@/components/PanelFooter.vue'
import OptionsForm from '@/components/OptionsForm.vue'
import FlushView from '@/components/FlushView.vue'

// console.debug('%c popout/App.vue', 'color: SandyBrown')

provide('siteInfo', undefined)
provide('updateTab', undefined)

useTitle(i18n.t('popout.title'))

async function windowResize() {
  const size = { panelWidth: window.outerWidth, panelHeight: window.outerHeight }
  // console.debug('windowResize:', size)
  await chrome.storage.local.set(size).catch(console.warn)
}

const debounceWindowResize = debounce(windowResize, 500)

onMounted(() => {
  window.addEventListener('resize', debounceWindowResize)
  chrome.windows.getCurrent().then((window) => {
    chrome.storage.local.set({ lastPanelID: window.id }).then(() => {
      console.debug('%cSet lastPanelID:', 'color: SpringGreen', window.id)
    })
  })
})
onUnmounted(() => window.removeEventListener('resize', debounceWindowResize))
</script>

<template>
  <header class="flex-shrink-0">
    <PanelHeader :panel-button="false" :side-button="false" :popup-button="false" />
    <div class="d-grid gap-2 m-2">
      <FlushView cache-type="browser" :show-site="false" col-class="gap-2 px-0" />
    </div>
  </header>

  <main class="flex-grow-1 overflow-auto">
    <OptionsForm :compact="true" />
  </main>

  <footer class="flex-shrink-0">
    <PanelFooter />
  </footer>

  <ToastAlerts />
  <BackToTop />
</template>
