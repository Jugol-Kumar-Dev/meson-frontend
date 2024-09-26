<template>
  <NuxtLayout>
      <NuxtPage />
  </NuxtLayout>

  <NuxtLoadingIndicator class="!opacity-100 bg-primary-500" :height="5" color="bg-primary-700" :throttle="0" />
  <Notivue v-slot="item">
    <Notification :item="item" />
  </Notivue>
</template>