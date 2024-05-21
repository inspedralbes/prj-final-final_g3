// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
  '@pinia/nuxt', 
  // '@nuxtjs/tailwindcss',
  '@pinia-plugin-persistedstate/nuxt', 
  "@nuxt/ui"
  ],
  runtimeConfig:{
    public:{
      ENV: process.env.VITE_APP_ENV,
      API_DEV_URI: process.env.VITE_APP_API_DEV_URL,
      API_PROD_URI: process.env.VITE_APP_API_PROD_URL,
      MONGO_API_DEV_URI: process.env.VITE_APP_MONGO_API_DEV_URL,
      MONGO_API_PROD_URI: process.env.VITE_APP_MONGO_API_PROD_URL,
      SPOTIFY_CLIENT_ID: process.env.VITE_APP_SPOTIFY_CLIENT_ID,
      SPOTIFY_CLIENT_SECRET: process.env.VITE_APP_SPOTIFY_CLIENT_SECRET,
      SPOTIFY_REDIRECT_URI: process.env.VITE_APP_SPOTIFY_REDIRECT_URI,
      GOOGLE_CLIENT_ID: process.env.VITE_APP_GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.VITE_APP_GOOGLE_CLIENT_SECRET,
      GOOGLE_REDIRECT_URI: process.env.VITE_APP_GOOGLE_REDIRECT_URI,
      TICKETMASTER_API_KEY: process.env.VITE_APP_TICKETMASTER_API_KEY,
    }
  },
  colorMode: {
    preference: 'light'
  }
})