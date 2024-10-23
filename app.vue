<template>
  <div v-if="loading" class="fixed left-0 top-0 h-full grid place-items-center min-h-screen w-full z-[999999] bg-primary-200/10 backdrop-blur-xl">
    <Icon name="svg-spinners:3-dots-bounce" class="text-primary-400" size="100"/>
  </div>

  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>

  <NuxtLoadingIndicator class="!opacity-100 bg-primary-500" :height="5" color="bg-primary-700" :throttle="0"/>
  <Notivue v-slot="item">
    <Notification :item="item"/>
  </Notivue>
</template>


<script setup lang="ts">
const nuxtApp = useNuxtApp();
const loading = ref(false);
nuxtApp.hook("page:start", () => {
  loading.value = true;
});
nuxtApp.hook("page:finish", () => {
  loading.value = false;
});
</script>