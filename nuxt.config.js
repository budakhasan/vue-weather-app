require('dotenv').config()

// Common options
export const options = {
  name: 'WeatherApp',
  shortDescription: 'Check weather forecasts of cities',
  description: 'See current weather and 5 days forecasts of selected city',
  loading: {
    color: 'var(--accent-color)',
    background: 'var(--primary-color)',
  },
  app: {
    background: '#202124',
  },
  social: {
    twitter: '@budakhasan',
  },
}

export default {
  target: process.env.nuxt_target || 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'weather-app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'keywords',
        content: 'weather, weather forecasts, nuxt real world example',
      },
      {
        name: 'X-UA-Compatible',
        content: 'IE=edge, chrome=1',
      },
      {
        itemprop: 'name',
        content: `${options.name} • ${options.shortDescription}`,
      },
      {
        itemprop: 'description',
        content: options.description,
      },
      {
        itemprop: 'image',
        content: `${process.env.BASE_URL}/banner.jpg`,
      },
      // Add to homescreen for Chrome on Android. Fallback for PWA (handled by nuxt)
      {
        name: 'application-name',
        content: options.name,
      },
      // Windows phone tile icon
      {
        name: 'msapplication-TileImage',
        content: `/icon.png`,
      },
      {
        name: 'msapplication-TileColor',
        content: options.app.background,
      },
      {
        name: 'msapplication-tap-highlight',
        content: 'no',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: true,
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Material+Icons&family=Roboto:wght@400;500;600;700&display=swap',
      },
    ],
  },

  // Customize the progress-bar color (https://nuxtjs.org/api/configuration-loading/#customizing-the-progress-bar)
  loading: {
    color: options.loading.color,
    continuous: true,
  },

  // Customize the loading indicator (https://nuxtjs.org/api/configuration-loading-indicator)
  loadingIndicator: {
    name: 'pulse',
    color: options.loading.color,
    background: options.loading.background,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/normalize', '~/assets/scss/theme', '~/assets/scss/style'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/v-tooltip'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // https://google-analytics.nuxtjs.org/
    '@nuxtjs/google-analytics',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://github.com/nuxt-community/i18n-module
    'nuxt-i18n',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // i18n module configuration (https://github.com/nuxt-community/i18n-module)
  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        iso: 'en-US',
        file: 'en-US.json',
      },
      {
        code: 'tr',
        name: 'Türkçe',
        iso: 'tr-TR',
        file: 'tr-TR.json',
      },
    ],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
    },
    lazy: true,
    langDir: 'lang/',
    detectBrowserLanguage: {
      alwaysRedirect: true,
      fallbackLocale: 'en',
    },
  },

  googleAnalytics: {
    id: process.env.GA_UID,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
