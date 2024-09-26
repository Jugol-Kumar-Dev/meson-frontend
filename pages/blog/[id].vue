<script setup>
const { data,  status, refresh } =
    await useLazyAsyncData(`home-${useRoute()?.params?.id}-blogs`,
        () =>$fetch(`/single-blog/${useRoute()?.params?.id}`, {
          baseURL: useRuntimeConfig().public?.frontendAppUrl,
          headers: {
            accept: "application/json",
          },
        }))

onMounted(()=> refresh())
</script>


<template>
  <section class="relative bg-[url('@/assets/images/banner-3.png')] bg-no-repeat bg-cover bg-top h-auto">

    <Container>
      <div class="flex flex-wrap justify-between">
        <div class="w-full lg:w-1/2 lg:max-w-2xl">
<!--          <h2 class="text-xl lg:text-4xl text-center lg:text-left font-bold text-white py-10 tracking-wider"> Blog Page </h2>-->
          <p class="text-lg lg:text-2xl font-semibold text-gray-300 pb-3 mt-20">
            {{ data?.title }}
          </p>
          <p class="text-sm lg:text-base text-gray-300 pb-8">
            {{ data?.description }}
          </p>
        </div>
        <div class="w-full lg:w-1/2">
          <div class="flex justify-center">
            <img class="h-96 py-20 object-contain rounded-lg shadow-md" :src="data?.image_url" alt="">
          </div>
        </div>
      </div>

    </Container>
  </section>
  <div class="py-10">

    <Container class="flex justify-center">
      <div class="px-2 w-full lg:max-w-2xl">
        <span v-html="data?.content"/>
      </div>
    </Container>
  </div>
</template>