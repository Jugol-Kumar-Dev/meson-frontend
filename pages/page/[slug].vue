<script setup>

import moment from "moment";

const {data:content, status, refresh} = await useLazyAsyncData(`single-${useRoute()?.params?.slug}-pages`,
    () => $fetch(`/pages/${useRoute()?.params?.slug}`, {
      baseURL: useRuntimeConfig().public?.frontendAppUrl,
      headers: {
        accept: "application/json",
      },
    }))

onMounted(() => refresh())

</script>
<template>
  <div class="container mx-auto px-4 lg:px-8 py-10">
    <!-- Page Title -->
    <header class="text-center mb-10">
      <h1 class="text-3xl lg:text-5xl font-bold text-secondary-900">
        {{ content?.title }}
      </h1>
      <p class="text-gray-500 mt-2">Published on <span class="font-bold">{{ moment(content?.created_at)?.format('ll') }}</span></p>
    </header>
    <!-- Main Content Section -->
    <section class="bg-white shadow-lg rounded-lg p-6 lg:p-10">
      <!-- Article Body -->
      <article class="prose max-w-none text-secondary-700">
        <div v-html="content?.summery"></div>
      </article>
    </section>
  </div>

</template>