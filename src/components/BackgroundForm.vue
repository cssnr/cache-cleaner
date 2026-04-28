<script setup lang="ts">
import { i18n } from '#imports'
import { ref, watch } from 'vue'
import { useOptions } from '@/composables/useOptions.ts'
import { saveKeyValue } from '@/utils/options.ts'
import HorizontalRule from '@/components/HorizontalRule.vue'

const options = useOptions()

const bgRef = ref<'bgNone' | 'bgPicture' | 'bgVideo'>('bgNone')
const pictureURL = ref('')
const videoURL = ref('')

watch(
  options,
  (opts) => {
    // console.log('%cBackgroundForm.vue watch - options:', 'color: GreenYellow', opts)
    bgRef.value = opts.radioBackground
    pictureURL.value = opts.pictureURL
    videoURL.value = opts.videoURL
  },
  { deep: true },
)

// NOTE: This was ported from VanillaJS and may need refactoring
</script>

<template>
  <div>
    <HorizontalRule>New Tab Background</HorizontalRule>
    <form @change="saveKeyValue('radioBackground', bgRef)">
      <div class="d-flex flex-column flex-md-row ms-1 ms-md-3">
        <div class="form-check form-check-inline mb-2 mb-md-0">
          <input
            v-model="bgRef"
            class="form-check-input"
            type="radio"
            name="radioBackground"
            id="bgNone"
            value="bgNone"
          />
          <label class="form-check-label" for="bgNone">
            <i class="fa-regular fa-square"></i> {{ i18n.t('background.none') }}
          </label>
        </div>

        <div class="form-check form-check-inline mb-2 mb-md-0">
          <input
            v-model="bgRef"
            class="form-check-input"
            type="radio"
            name="radioBackground"
            id="bgPicture"
            value="bgPicture"
          />
          <label class="form-check-label" for="bgPicture">
            <i class="fa-regular fa-image"></i> {{ i18n.t('background.picture') }}
          </label>
        </div>

        <div class="form-check form-check-inline mb-2">
          <input
            v-model="bgRef"
            class="form-check-input"
            type="radio"
            name="radioBackground"
            id="bgVideo"
            value="bgVideo"
          />
          <label class="form-check-label" for="bgVideo">
            <i class="fa-solid fa-video"></i> {{ i18n.t('background.video') }}
          </label>
        </div>
      </div>
    </form>

    <div class="ms-0 ms-md-3">
      <div v-if="bgRef === 'bgPicture'" id="bgPictureInput" class="input-group">
        <span
          class="input-group-text"
          id="picture-addon"
          data-bs-toggle="tooltip"
          :data-bs-title="i18n.t('background.pictureTip')"
          v-bs
        >
          <i class="fa-solid fa-circle-info"></i
        ></span>
        <input
          v-model="pictureURL"
          type="text"
          class="form-control"
          :placeholder="i18n.t('background.pictureLabel')"
          :aria-label="i18n.t('background.pictureLabel')"
          id="pictureURL"
          name="pictureURL"
          aria-describedby="picture-addon"
          @change="saveKeyValue('pictureURL', pictureURL)"
        />
      </div>
      <div v-if="bgRef === 'bgVideo'" id="bgVideoInput" class="input-group">
        <span
          class="input-group-text"
          id="video-addon"
          data-bs-toggle="tooltip"
          :data-bs-title="i18n.t('background.videoTip')"
          v-bs
        >
          <i class="fa-solid fa-circle-info"></i
        ></span>
        <input
          v-model="videoURL"
          type="text"
          class="form-control"
          :placeholder="i18n.t('background.videoLabel')"
          :aria-label="i18n.t('background.videoLabel')"
          id="videoURL"
          name="videoURL"
          aria-describedby="video-addon"
          @change="saveKeyValue('videoURL', videoURL)"
        />
      </div>
    </div>
  </div>
</template>
