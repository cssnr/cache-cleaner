<script setup lang="ts">
import { i18n } from '#imports'
import OptionsForm from '@/components/OptionsForm.vue'
import HorizontalRule from '@/components/HorizontalRule.vue'

withDefaults(
  defineProps<{
    cacheType?: 'site' | 'browser'
    siteHeading?: boolean
  }>(),
  {
    cacheType: 'site',
    siteHeading: false,
  },
)
</script>

<template>
  <HorizontalRule v-if="cacheType === 'site' && siteHeading">{{ i18n.t('options.form.siteSpecific') }}</HorizontalRule>
  <OptionsForm
    v-show="cacheType === 'site'"
    :show="['extension']"
    :extension="['autoReload']"
    :heading="false"
    :close-window="true"
    :compact="true"
  />

  <OptionsForm
    :show="[cacheType]"
    browser-heading="full"
    :heading="false"
    :close-window="true"
    :compact="true"
    class="overflow-x-hidden"
  />
</template>
