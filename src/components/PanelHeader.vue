<script setup lang="ts">
import { i18n, useAppConfig } from '#imports'
import { clickOpen, openExtPanel, openOptions, openPopup, openSidePanel } from '@/utils/extension.ts'
import { isMobile } from '@/utils/system.ts'
import ThemeSwitch from '@/components/ThemeSwitch.vue'
import OptionsModal from '@/components/OptionsModal.vue'

withDefaults(
  defineProps<{
    panelButton?: boolean
    sideButton?: boolean
    popupButton?: boolean
    optionsButton?: boolean
    closeWindow?: boolean
    icon?: boolean
  }>(),
  {
    panelButton: true,
    sideButton: true,
    popupButton: true,
    optionsButton: true,
    closeWindow: false,
    icon: true,
  },
)

const config = useAppConfig()
</script>

<template>
  <div class="container-fluid p-2">
    <div class="d-flex flex-row align-items-center text-nowrap">
      <ThemeSwitch />

      <div class="d-flex flex-grow-1 overflow-hidden align-items-baseline">
        <a
          :title="i18n.t('ui.text.homePage')"
          class="link-body-emphasis text-decoration-none fs-4"
          :href="config.homepageUrl"
          target="_blank"
          @click.prevent="clickOpen($event, closeWindow)"
        >
          <img v-if="icon" src="@/assets/icon.svg" alt="L" class="mb-1" style="height: 1.1em" />
          {{ config.shortName }}</a
        >
        <a
          :title="i18n.t('ui.text.releaseNotes')"
          class="link-body-emphasis text-decoration-none small ms-1"
          :href="`${config.githubUrl}/releases/tag/${config.version}`"
          target="_blank"
          @click.prevent="clickOpen($event, closeWindow)"
        >
          v<span class="version">{{ config.version }}</span></a
        >
      </div>

      <div v-if="!isMobile && panelButton" class="ms-1">
        <button
          :title="i18n.t('ui.action.extensionPanel')"
          class="btn btn-sm btn-outline-info"
          @click="openExtPanel(closeWindow)"
        >
          <i class="fa-regular fa-window-restore me-1"></i>
        </button>
      </div>

      <div v-if="!isMobile && sideButton" class="ms-1">
        <button
          :title="i18n.t('ui.action.sidePanel')"
          class="btn btn-sm btn-outline-info"
          @click="openSidePanel(closeWindow)"
        >
          <i class="fa-solid fa-table-columns"></i>
        </button>
      </div>

      <div v-if="!isMobile && popupButton" class="ms-1">
        <button :title="i18n.t('ui.action.openPopup')" class="btn btn-sm btn-outline-info" @click="openPopup()">
          <i class="fa-solid fa-window-maximize"></i>
        </button>
      </div>

      <div v-if="optionsButton" class="ms-1">
        <a
          :title="i18n.t('ui.text.options')"
          href="/options.html"
          class="btn btn-sm btn-outline-info"
          @click.prevent="openOptions(closeWindow)"
        >
          <i class="fa-solid fa-gears"></i
        ></a>
      </div>

      <OptionsModal :close-window="closeWindow" class="btn btn-sm btn-outline-success ms-1">
        <i class="fa-solid fa-sliders"></i>
      </OptionsModal>
    </div>
  </div>

  <hr class="my-0" />
</template>
