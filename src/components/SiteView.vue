<script setup lang="ts">
import { i18n } from '#imports'
import { type Ref, computed, inject } from 'vue'
import { showToast } from '@/composables/useToast.ts'
import HorizontalRule from '@/components/HorizontalRule.vue'

defineOptions({ inheritAttrs: false })

const siteInfo = inject<Ref<SiteInfo | undefined>>('siteInfo')

const cacheSize = computed(() => {
  if (typeof siteInfo?.value?.estimate?.usage !== 'number') return i18n.t('ui.text.unknown')
  return formatBytes(siteInfo?.value?.estimate?.usage)
})

function formatBytes(bytes: number): string {
  const i = bytes <= 0 ? 0 : Math.floor(Math.log(bytes) / Math.log(1024))
  const sizes = ['byte', 'kilobyte', 'megabyte', 'gigabyte', 'terabyte']
  return new Intl.NumberFormat(undefined, {
    style: 'unit',
    unit: sizes[i],
    unitDisplay: 'short',
    maximumFractionDigits: 2,
  }).format(bytes / Math.pow(1024, i))
}

async function copyText(e: MouseEvent) {
  const target = e.target as HTMLElement
  const text = target.textContent
  // console.log('copyText:', text)
  if (!text) return console.log('no text:', text)
  await navigator.clipboard.writeText(text)
  showToast(i18n.t('ui.text.hostCopied'))
}
</script>

<template>
  <HorizontalRule v-if="siteInfo">
    Site Cache Size: <span class="d-inline-block text-warning-emphasis fw-bolder">{{ cacheSize }}</span>
  </HorizontalRule>
  <HorizontalRule v-else>{{ i18n.t('options.form.siteSpecific') }}</HorizontalRule>

  <div
    v-bind="$attrs"
    class="text-center text-ellipsis border border-2 rounded p-1"
    :class="{ 'border-success': siteInfo, 'border-danger': !siteInfo, 'pb-0': siteInfo }"
    style="margin-top: 5px; margin-bottom: 5px"
  >
    <kbd v-if="siteInfo" class="d-inline-block text-ellipsis py-0" role="button" @click="copyText">{{
      siteInfo.hostname
    }}</kbd>
    <template v-else>{{ i18n.t('ui.text.noTabAccess') }}</template>
  </div>
</template>
