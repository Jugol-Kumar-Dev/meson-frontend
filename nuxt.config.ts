// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
    css:["~/assets/css/main.css"],
    modules: [
        "@nuxtjs/tailwindcss",
        "@nuxt/icon",
        "@pinia/nuxt",
        "pinia-plugin-persistedstate/nuxt",
        "@vueuse/motion/nuxt"
    ],
    runtimeConfig: {
        public: {
            baseUrl: import.meta.env.BASE_URL,
            appUrl: import.meta.env.APP_URL,
            frontendPrefix: import.meta.env.FRONTEND_API_PREFIX,
            studentApiPrefix: import.meta.env.STUDNET_API_REFIX,
            frontendAppUrl: import.meta.env.BASE_URL + import.meta.env.FRONTEND_API_PREFIX,
            studentAppUrl: import.meta.env.BASE_URL + import.meta.env.STUDENT_API_PREFIX,
        }
    }
})