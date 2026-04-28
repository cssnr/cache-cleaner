<script setup lang="ts">
import { i18n } from '#imports'
import { useTitle } from '@/composables/useTitle.ts'
import BackToTop from '@/components/BackToTop.vue'
import ToastAlerts from '@/components/ToastAlerts.vue'
import OptionsForm from '@/components/OptionsForm.vue'
import KeyboardShortcuts from '@/components/KeyboardShortcuts.vue'
import PageFooter from '@/components/PageFooter.vue'
import CopySupport from '@/components/CopySupport.vue'
import BackgroundForm from '@/components/BackgroundForm.vue'
import PageHeader from '@/components/PageHeader.vue'
import UseBackground from '@/components/UseBackground.vue'

// console.debug('%c options/App.vue', 'color: SandyBrown')

useTitle(i18n.t('options.title'))
</script>

<template>
  <div class="d-flex align-items-center justify-content-center h-100 w-100 p-1 p-md-3">
    <div class="m-auto pb-4 w-100">
      <div id="options-wrapper" class="glass-outline rounded rounded-3 w-100 m-auto p-2 p-md-3">
        <PageHeader />

        <KeyboardShortcuts />

        <OptionsForm browser-class="ms-2" />

        <BackgroundForm />

        <CopySupport
          class="fst-italic small my-4"
          :message="i18n.t('options.copySupportMsg')"
          :tip="i18n.t('options.copySupportTip')"
          >{{ i18n.t('options.copySupport') }}</CopySupport
        >

        <hr class="my-2 my-md-3" />

        <PageFooter />
      </div>
    </div>
  </div>

  <ToastAlerts />
  <BackToTop />
  <UseBackground />
</template>

<style scoped>
#options-wrapper {
  max-width: 576px;
}
</style>
