// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@sidebase/nuxt-auth'],
  css: ['~/assets/css/main.css'],
  auth: {
    provider: {
      type: 'local',
      // endpoints: {
      //   signIn: { path: '/login', method: 'post' },
      //   signOut: { path: '/logout', method: 'post' },
      // },
      // token: {
      //   signInResponseTokenPointer: '/token',
      //   type: 'Bearer',
      //   cookieName: 'auth.token',
      //   headerName: 'Authorization',
      //   maxAgeInSeconds: 1800,
      //   sameSiteAttribute: 'lax',
      //   cookieDomain: 'sidebase.io',
      //   secureCookieAttribute: false,
      //   httpOnlyCookieAttribute: false,
      // }
    }
  }
})