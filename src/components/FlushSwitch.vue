<script setup lang="ts">
import { i18n } from '#imports'

withDefaults(
  defineProps<{
    cacheType?: 'site' | 'browser'
  }>(),
  {
    cacheType: 'site',
  },
)

const emit = defineEmits(['change'])
</script>

<template>
  <div class="d-flex gap-1 gap-sm-4 px-1 px-sm-4 my-1">
    <template v-for="type in ['site', 'browser']" :key="type">
      <button
        class="btn btn-sm user-select-none text-truncate w-100 px-0"
        :class="cacheType === type ? 'btn-primary' : 'btn-outline-secondary'"
        @click="emit('change', type)"
      >
        {{ i18n.t(`ui.text.${type}Cache` as any) }}
      </button>
    </template>
  </div>
</template>
