import colors from 'vuetify/es5/util/colors'

export default {
  // RuntimeConfig
  publicRuntimeConfig: {
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID
    }
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'DQW最適こころ',
    htmlAttrs: {
      lang: 'ja',
      prefix: 'og: https://ogp.me/ns#'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'ドラクエウォークの上級職において最適だと考えられるこころの組み合わせを提案します。' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'ドラクエウォーク最適こころ計算ツール' },
      { hid: 'og:title', property: 'og:title', content: 'DQW最適こころ' },
      { hid: 'og:description', property: 'og:description', content: 'ドラクエウォークの上級職において最適だと考えられるこころの組み合わせを提案します。' },
      { hid: 'og:url', property: 'og:url', content: 'https://dqw.hirooka.pro' },
      { hid: 'og:image', property: 'og:image', content: 'https://dqw.hirooka.pro/icon.jpg' },
      { name: 'twitter:card', content: 'summary' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // https://google-analytics.nuxtjs.org
    '@nuxtjs/google-analytics'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'cookie-universal-nuxt'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true
  },
  proxy: {
    '/v1/': process.env.API_URI || 'http://localhost:8888'
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend (config) {
      config.node = {
        fs: 'empty'
      }
    }
  },

  server: {
    host: '0.0.0.0',
    port: 3000
  },

  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID
  }
}
