<script setup lang="ts">
import { i18n } from '#imports'
import { provide } from 'vue'
import ToastAlerts from '@/components/ToastAlerts.vue'
import PanelHeader from '@/components/PanelHeader.vue'
import PanelFooter from '@/components/PanelFooter.vue'
import OptionsForm from '@/components/OptionsForm.vue'
import FlushView from '@/components/FlushView.vue'
import { openPopup } from '@/utils/extension.ts'

// console.debug('%c sidepanel/App.vue', 'color: SandyBrown')

provide('siteInfo', undefined)
provide('updateTab', undefined)
</script>

<template>
  <header class="flex-shrink-0">
    <PanelHeader :side-button="false" />
    <div class="d-grid gap-2 m-2">
      <FlushView cache-type="browser" :show-site="false" col-class="gap-2 px-0" />
      <button class="btn btn-success" @click="openPopup()">
        <i class="fa-solid fa-window-maximize"></i> {{ i18n.t('ui.text.siteCache') }}
      </button>
    </div>
  </header>

  <main class="flex-grow-1 overflow-auto">
    <OptionsForm :compact="true" />
  </main>

  <footer class="flex-shrink-0">
    <PanelFooter />
  </footer>

  <ToastAlerts />
</template>
