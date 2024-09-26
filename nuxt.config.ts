// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: false},
    css:[
        "~/assets/css/main.css",
        'notivue/notification.css', // Only needed if using built-in notifications
        'notivue/animations.css' // Only needed if using built-in animations
    ],
    modules: [
        "@nuxtjs/tailwindcss",
        "@nuxt/icon",
        "@pinia/nuxt",
        "pinia-plugin-persistedstate/nuxt",
        "@vueuse/motion/nuxt",
        'notivue/nuxt'
    ],

    app: {
        head: {
            title: 'Meson - মেসন ',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'description', content:`Meson is an uprising E-learning platform focusing on HSC & Admission preparation. তোমদের HSC এবং এডমিশন প্রস্তুতিকে সহজতর করতে আমরা আছি ''মেসন'' টিম।`},

                {property:'og:image', content:"https://mesonacademy.com/image/logo2.png"},
                {property:'og:title', content:"Meson is an uprising E-learning platform focusing on HSC & Admission preparation."},
                {property:'og:description', content:`Meson is an uprising E-learning platform focusing on HSC & Admission preparation. তোমদের HSC এবং এডমিশন প্রস্তুতিকে সহজতর করতে আমরা আছি ''মেসন'' টিম।`},


                // Twitter Card meta tags
                { name: 'twitter:card', content: 'summary_large_image' }, // Use 'summary' if a smaller image is needed
                { name: 'twitter:title', content: 'Meson is an uprising E-learning platform focusing on HSC & Admission preparation.' },
                { name: 'twitter:description', content: `Meson is an uprising E-learning platform focusing on HSC & Admission preparation. তোমদের HSC এবং এডমিশন প্রস্তুতিকে সহজতর করতে আমরা আছি 'মেসন' টিম।` },
                { name: 'twitter:image', content: 'https://mesonacademy.com/image/logo2.png' },
                { name: 'twitter:site', content: '@MesonAcademy' }, // Optional: Add your Twitter handle here
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', sizes:'32x32', href: 'https://mesonacademy.com/./favicon/favicon-32x32.png' },
                { rel: 'icon', type: 'image/png', sizes:'32x32', href: 'https://mesonacademy.com/./favicon/favicon-32x32.png' },
                { rel: 'icon', type: 'image/png', sizes:'16x16', href: 'https://mesonacademy.com/./favicon/favicon-16x16.png' },
            ],
        },
    },
    runtimeConfig: {
        public: {
            baseUrl: import.meta.env.BASE_URL,
            appUrl: import.meta.env.APP_URL,
            frontendPrefix: import.meta.env.FRONTEND_API_PREFIX,
            studentApiPrefix: import.meta.env.STUDNET_API_REFIX,
            frontendAppUrl: import.meta.env.BASE_URL + import.meta.env.FRONTEND_API_PREFIX,
            studentAppUrl: import.meta.env.BASE_URL + import.meta.env.STUDENT_API_PREFIX,
        }
    },
    nitro:{
        routeRules:{
            '/admission/*': {prerender:false},
            '/student/dashboard': { prerender: false },
            '/student/groups': { prerender: false },
            '/student/profile': { prerender: false },
            '/student/liveclass': { prerender: false },
            '/student/courses/*': { prerender: false },
            '/student/exam/*': { prerender: false },
            '/courses?search/*': { prerender: false },
            '/student/dashboard/*': { prerender: false },
            '/student/exam/live-exam/*': { prerender: false },
            '/student/exam/practiceexam/*': { prerender: false },
            '/student/exam/result/*': { prerender: false },
            '/student/transactions': { prerender: false },

            // '/student/courses/*': {prerender:false},
            // '/student/exam/live-exam/*': {prerender:false},
            // '/student/exam/practiceexam/*': {prerender:false},
            // '/student/exam/result/*': {prerender:false},
            // '/student/givenexam/*': {prerender:false},
            // '/student/exam/*': {prerender:false},
            // '/courses/*': {prerender:false},
            // '/student/*': {prerender:false},
        }
    }
})