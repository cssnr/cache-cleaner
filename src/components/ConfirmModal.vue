<script setup lang="ts">
import { i18n } from '#imports'
import { ref } from 'vue'
import { Modal } from 'bootstrap'

const emit = defineEmits(['confirm'])

const modalEl = ref(null)
const clearCacheType = ref<ClearCacheType | null>(null)

const config = {
  site: {
    icon: 'fa-toggle-on',
    btn: 'btn-success',
  },
  siteAll: {
    icon: 'fa-broom',
    btn: 'btn-info',
  },
  browser: {
    icon: 'fa-toggle-on',
    btn: 'btn-warning',
  },
  browserAll: {
    icon: 'fa-skull-crossbones',
    btn: 'btn-danger',
  },
}

function show(type: ClearCacheType) {
  if (!modalEl.value) return
  // console.log('show:', type)
  clearCacheType.value = type
  Modal.getOrCreateInstance(modalEl.value).show()
}

function hide() {
  if (!modalEl.value) return
  Modal.getInstance(modalEl.value)?.hide()
}

function handleConfirm() {
  emit('confirm', clearCacheType.value)
  hide()
}

defineExpose({ show })
</script>

<template>
  <Teleport to="body">
    <div class="modal fade" ref="modalEl" tabindex="-1" aria-labelledby="delete-modal-label" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 v-if="clearCacheType" class="modal-title fs-5 text-truncate" id="delete-modal-label">
              {{ i18n.t('ui.cache.clear') }} {{ i18n.t(`ui.cache.type.${clearCacheType}`) }}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              :aria-label="i18n.t('ui.action.close')"
              tabindex="-1"
            ></button>
          </div>
          <div class="modal-body text-center p-2">
            <button
              v-if="clearCacheType"
              type="button"
              class="btn text-truncate w-100 mt-2"
              :class="config[clearCacheType].btn"
              @click="handleConfirm"
            >
              <i class="fa-solid ms-2" :class="config[clearCacheType].icon"></i> {{ i18n.t('ui.cache.clear') }}
              {{ i18n.t(`ui.cache.type.${clearCacheType}`) }} {{ i18n.t('ui.cache.cache') }}
            </button>
          </div>
          <div class="modal-footer p-2">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              {{ i18n.t('ui.action.cancel') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
