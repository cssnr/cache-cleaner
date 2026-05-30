import DefaultTheme, { VPBadge } from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './custom.css'

import '@catppuccin/vitepress/theme/mocha/peach.css'

import BrowserIcons from './components/BrowserIcons.vue'

import Contributors from '@cssnr/vitepress-plugin-contributors'
import '@cssnr/vitepress-plugin-contributors/style.css'
import contributors from '../contributors.json'

import VPSwiper from '@cssnr/vitepress-swiper'
import '@cssnr/vitepress-swiper/style.css'

import VitePressChat from '@cssnr/vitepress-chat'
import '@cssnr/vitepress-chat/style.css'

// noinspection JSUnusedGlobalSymbols
export default {
  ...DefaultTheme,

  ...VitePressChat(DefaultTheme, {
    api: import.meta.env.VITE_AI_API,
    headers: import.meta.env.VITE_AI_AUTH
      ? { Authorization: import.meta.env.VITE_AI_AUTH }
      : undefined,
  }),

  enhanceApp({ app }) {
    // eslint-disable-next-line vue/multi-word-component-names
    app.component('Badge', VPBadge)

    app.component('BrowserIcons', BrowserIcons)

    // eslint-disable-next-line vue/multi-word-component-names
    app.component('Contributors', Contributors)
    app.config.globalProperties.$contributors = contributors

    app.component('VPSwiper', VPSwiper)
  },
} satisfies Theme
