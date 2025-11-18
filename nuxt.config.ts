// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/content', 
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module'
  ],
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/JJBAIcon.png' }
      ]
    }
  },
  primevue: {
    options: {
      theme: {
        preset: '~/assets/presets/zenith.js',
        options: {
          prefix: 'p',
          darkModeSelector: 'class',
          cssLayer: false
        }
      }
    },
    components: {
      include: '*'
    },
    directives: {
      include: ['Tooltip', 'Ripple']
    }
  },
  content: {
    // https://content.nuxtjs.org/api/configuration
  },
  css: ['~/assets/css/main.css', 'primeicons/primeicons.css']
})
