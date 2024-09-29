<script setup>
const {settings} = defineProps({
  settings:Object
})
const {data:footerPages, status, refresh} = await useLazyAsyncData('footer-pages',
    () => $fetch(`/pages`, {
      baseURL: useRuntimeConfig().public?.frontendAppUrl,
      headers: {
        accept: "application/json",
      },
    }))



onMounted(async() =>await  refresh())

</script>
<template>
  <footer>
    <Container>
      <div class="flex flex-col lg:flex-row bg-white py-10 pt-20 lg:pt-0">
        <div class="w-full lg:w-1/3">
          <div class="text-center lg:text-left pe-3">
            <NuxtLink to="/">
              <img class="w-40 h-auto p-1 mx-auto lg:mx-0" src="@/assets/images/logo.png" alt=""/>
            </NuxtLink>
            <p>Meson is an uprising E-learning platform focusing on HSC & Admission preparation.
            </p>
<!--            <p class="font-medium py-1">Download Our Mobile App</p>
            <div class="flex justify-center lg:justify-start gap-4 py-3">
              <img class="w-28 lg:w-40 h-12 lg:h-auto p-1"
                   src="https://cdn.10minuteschool.com/images/google-play-icon_1695731678094.png?w=156&h=49" alt=""/>
              <img class="w-28 lg:w-40 h-12 lg:h-auto p-1"
                   src="https://cdn.10minuteschool.com/images/ios-store-icon_1695731704002.png?w=156&h=49" alt=""/>
            </div>-->
          </div>
        </div>
        <div class="w-full lg:w-1/3 lg:ms-5">
          <div class="flex justify-around lg:justify-start gap-5 lg:gap-10 pt-6 lg:pt-0">
            <div class="text-center lg:text-left" v-if="footerPages?.length">
              <h2 class="text-xl font-bold leading-loose">Company</h2>
              <ul class="font-medium text-sm lg:text-base text-gray-700 ">
                <li class="hover:text-primary-500 lg:pb-3" v-for="item in footerPages">
                  <NuxtLink :to="`/page/${item?.slug}`">{{ item?.title }}</NuxtLink>
                </li>
              </ul>
            </div>
            <div class="text-center lg:text-left ">
              <h2 class="text-xl font-bold leading-loose">Quick Links</h2>
              <ul class="font-medium text-sm lg:text-base text-gray-700 lg:leading-loose">
                <li class="hover:text-primary-500">
                  <NuxtLink to="/#blogs">Blog</NuxtLink>
                </li>
                <li class="hover:text-primary-500">
                  <NuxtLink to="/courses">Courses</NuxtLink>
                </li>
                <li class="hover:text-primary-500">
                  <NuxtLink to="/login">Login</NuxtLink>
                </li>
                <li class="hover:text-primary-500">
                  <NuxtLink to="/register">Register</NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-1/3">
          <div class="px-4 lg:px-8 text-center lg:text-left pt-6 lg:pt-0">
            <h2 class="text-xl font-bold leading-loose">Others</h2>
            <ul class="leading-loose text-base">
              <li>Email Us: <span class="text-primary-500 lg:px-3">{{ settings?.profile?.email }}</span></li>
              <li>Call Us: <span class="text-primary-500 lg:px-3">{{ settings?.profile?.phone }}</span> (24x7)</li>
              <li>whatsapp: <span class="text-primary-500 lg:px-3"> {{ settings?.profile?.whatsapp }}</span> (24x7)</li>
              <li>Address: <span class="text-primary-500 lg:px-3">{{ settings?.profile?.address }}</span></li>
            </ul>
          </div>
          <div>

          </div>
        </div>
      </div>
      <div class="flex items-center justify-between text-sm lg:text-base text-gray-600 py-4">
        <p class="text-center text-xs">{{ new Date()?.getFullYear() }} Copyright © <a class="text-primary-500 underline" href="https://mesonacademy.com">Meson Academy</a>. All rights reserved.</p>
        <p class="text-center text-xs"><a class="text-primary-500 underline" href="https://creativetechpark.com" target="_blank">Web Development Company</a> Creative Tech Park</p>
      </div>
    </Container>
  </footer>
</template>