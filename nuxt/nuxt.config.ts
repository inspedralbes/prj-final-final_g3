// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/tailwindcss',
  ],
  runtimeConfig:{
    public:{
      ENV: process.env.ENV,
      API_DEV_URI: process.env.API_DEV_URL,
      API_PROD_URI: process.env.API_PROD_URL,
      SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
      SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
      SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
      GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
      TICKETMASTER_API_KEY: process.env.TICKETMASTER_API_KEY,
    }
  }
})