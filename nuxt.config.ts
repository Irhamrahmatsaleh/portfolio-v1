const config = require('./developer.json')
const siteTitle = `${config.name} | ${config.role}`

/*
 * Nuxt 3 Config File
 * Usage: https://nuxt.com/docs/api/configuration/nuxt-config
 */
export default defineNuxtConfig({
  compatibilityDate: '2025-02-28',
  devtools: { enabled: true },

  // App Config
  app: {
    head: {
      htmlAttrs: {
        lang: 'en', // App language
      },
      title: siteTitle, // App window nav title
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'A awesome developer portfolio design.',
        },
        { hid: 'og:title', property: 'og:title', content: siteTitle },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'A awesome developer portfolio design.',
        },
        { hid: 'og:image', property: 'og:image', content: 'demo-share.jpg' },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://irhamrahmatsaleh.vercel.app/',
        },
        { name: 'theme-color', content: '#010C15' },
      ],
      link: [
        { rel: 'manifest', href: 'pwa/manifest.json' },
        { rel: 'apple-touch-icon', href: 'pwa/icons/apple-touch-icon.png' },
      ],
    },
  },

  // Nuxt 3 Modules
  modules: ['@nuxtjs/tailwindcss'],

  components: {
    dirs: ['~/components'],
  },

  // Tailwind CSS Config
  tailwindcss: {
    cssPath: '~/assets/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: true,
    viewer: false,
  },

  // Runtime Config (Environment Variables)
  runtimeConfig: {
    // PRIVATE: ONLY available server-side
    apiSecret: '123',
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    GOOGLE_CX: process.env.GOOGLE_CX,
    public: {
      apiBase: '/api',
    },
  },
})
