export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  server:{
    port: 3333,
    host:'localhost'
  },
  head: {
    title: 'storyblok',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
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
    '~/plugins/components'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      'storyblok-nuxt',
      {
        accessToken: process.env.NODE_ENV == 'production' ? process.env.STORYBLOK_API_KEY_PUBLIC : process.env.STORYBLOK_API_KEY_PREVIEW ,  // STORYBLOK_API_KEY_PREVIEW used for draft versions
        //accessToken: process.env.STORYBLOK_API_KEY_PREVIEW,
        cacheProvider: 'memory'
      }
    ]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  publicRuntimeConfig: {
    managementApiKey: process.env.STORYBLOK_MANAGEMENT_API_KEY
  }
}
