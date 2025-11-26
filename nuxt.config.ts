import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';

// Custom PrimeVue 4 theme preset with orange primary colors
const MyPreset = definePreset(Aura, {
  primitive: {
    borderRadius: {
      none: '0',
      xs: '2px',
      sm: '4px',
      md: '6px',
      lg: '8px',
      xl: '12px'
    },
    orange: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316',
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
      950: '#431407'
    },
    zinc: {
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
      950: '#09090b'
    },
    slate: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617'
    }
  },
  semantic: {
    primary: {
      50: '{orange.50}',
      100: '{orange.100}',
      200: '{orange.200}',
      300: '{orange.300}',
      400: '{orange.400}',
      500: '{orange.500}',
      600: '{orange.600}',
      700: '{orange.700}',
      800: '{orange.800}',
      900: '{orange.900}',
      950: '{orange.950}'
    },
    colorScheme: {
      light: {
        primary: {
          color: '{orange.600}',
          contrastColor: '#ffffff',
          hoverColor: '{orange.700}',
          activeColor: '{orange.800}'
        },
        surface: {
          0: '#ffffff',
          50: '{zinc.50}',
          100: '{zinc.100}',
          200: '{zinc.200}',
          300: '{zinc.300}',
          400: '{zinc.400}',
          500: '{zinc.500}',
          600: '{zinc.600}',
          700: '{zinc.700}',
          800: '{zinc.800}',
          900: '{zinc.900}',
          950: '{zinc.950}'
        }
      },
      dark: {
        primary: {
          color: '{orange.500}',
          contrastColor: '{slate.50}',
          hoverColor: '{orange.400}',
          activeColor: '{orange.300}'
        },
        surface: {
          0: '#ffffff',
          50: '{slate.50}',
          100: '{slate.100}',
          200: '{slate.200}',
          300: '{slate.300}',
          400: '{slate.400}',
          500: '{slate.500}',
          600: '{slate.600}',
          700: '{slate.700}',
          800: '{slate.800}',
          900: '{slate.900}',
          950: '{slate.950}'
        }
      }
    }
  }
});

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-11-18',
  devtools: { enabled: true },
  
  // Static Site Generation
  nitro: {
    prerender: {
      routes: [
        '/'//,
        // Prerender nieuws pagination pages (estimated 8 pages for ~89 articles with 12 per page)
        // '/nieuws/page-1',
        // '/nieuws/page-2', 
        // '/nieuws/page-3',
        // '/nieuws/page-4',
        // '/nieuws/page-5',
        // '/nieuws/page-6',
        // '/nieuws/page-7',
        // '/nieuws/page-8'
      ],
      crawlLinks: true
    }
  },
  
  modules: [
    '@nuxt/content', 
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module'
  ],
  
  // SEO and meta configuration
  app: {
    head: {
      title: 'Jan Jansen bouwkundig adviseurs',
      meta: [
        { name: 'description', content: 'Professionele bouwkundige diensten in Westervoort. Specialisten in architectuur, renovatie en duurzame bouwoplossingen.' },
        { name: 'keywords', content: 'architectuur, bouwkundig adviseur, renovatie, Westervoort, duurzaam bouwen' },
        { property: 'og:title', content: 'Jan Jansen bouwkundig adviseurs' },
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
    options: {
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: '.dark'
        }
      },
      // Global passthrough options for consistent styling
      // pt: {
      // }
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
    markdown: {
      anchorLinks: false
    }
  },
  
  css: ['primeicons/primeicons.css']
})
