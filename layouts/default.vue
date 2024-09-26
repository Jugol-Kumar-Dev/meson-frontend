<script setup>
const {data: categories, status, refresh} = await useLazyAsyncData('hero-categories',
    () => $fetch(`/header-categories`, {
      baseURL: useRuntimeConfig().public?.frontendAppUrl,
      headers: {
        accept: "application/json",
      },
    }))

const {data: settings, refresh: settRefresh} = await useLazyAsyncData('profile-settings',
    () => $fetch(`/get-settings/?name=profile`, {
      baseURL: useRuntimeConfig().public?.frontendAppUrl,
      headers: {
        accept: "application/json",
      },
    }))

provide('profileSettings', settings)
</script>

<template>

  <header>
    <Header :categories="categories" :settings="settings"/>
  </header>


  <!-- MobileNav  -->
  <MobileNav :categories="categories"/>
  <main class="min-h-screen lg:pt-[68px]">
    <slot/>
  </main>
  <footer>
    <Footer :settings="settings"/>
  </footer>
  <div class="fixed right-5 bottom-5 animate-pulse">
    <a :href="`https://wa.me/${settings?.profile?.whatsapp}`" class="">
    <Icon name="streamline:whatsapp-solid" class="bg-green-600 text-white shadow-lg" size="40"/>
    </a>
  </div>
</template>