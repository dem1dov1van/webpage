// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ],
      meta: [
        { name: 'apple-mobile-web-app-title', content: 'Garagesale' }
      ]
    }
  },
  compatibilityDate: '2024-04-03',
  srcDir: "src/",
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    'nuxt-svgo',
    '@nuxtjs/tailwindcss',
    "@vueuse/nuxt"
  ],
  css: [
    '~/css/reset.css',
    '~/css/main.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  tailwindcss: {
    editorSupport: true,
    config: {
      content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
      ],
      theme: {
        extend: {
          boxShadow: {
            'error': '0 0 0 4px rgb(248 113 113)',
            'focus': '0 0 0 4px #DADEE0'
          }
        }
      }
    },
  }
})