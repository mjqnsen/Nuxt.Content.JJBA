// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-11-18',
  devtools: { enabled: true },
  
  // Configure for Cloudflare Pages
  nitro: {
    preset: 'cloudflare_pages'
  },
  
  // Generate static site
  ssr: true,
  
  modules: [
    '@nuxt/content', 
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module'
  ],
  
  // SEO and meta configuration
  app: {
    head: {
      title: 'Jan Jansen bouwkundig Adviseurs',
      meta: [
        { name: 'description', content: 'Professionele bouwkundige diensten in Westervoort. Specialisten in architectuur, renovatie en duurzame bouwoplossingen.' },
        { name: 'keywords', content: 'architectuur, bouwkundig adviseur, renovatie, Westervoort, duurzaam bouwen' },
        { property: 'og:title', content: 'Jan Jansen bouwkundig Adviseurs' },
        { property: 'og:description', content: 'Professionele bouwkundige diensten in Westervoort. Specialisten in architectuur, renovatie en duurzame bouwoplossingen.' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/JJBAIcon.png' },
        { rel: 'canonical', href: 'https://janjansen.pages.dev' }
      ]
    }
  },
  
  primevue: {
    importTheme: { from: '~/assets/presets/jjba.js' },
    components: {
      include: '*'
    },
    directives: {
      include: ['Tooltip', 'Ripple']
    }
  },
  content: {
    // https://content.nuxtjs.org/api/configuration
    documentDriven: true,
    markdown: {
      anchorLinks: false
    }
  },
  
  css: ['~/assets/css/main.css', 'primeicons/primeicons.css']
})
