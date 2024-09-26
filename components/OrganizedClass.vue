<script setup>
const {data: category, status: courseStatus, refresh: topCatRef} = await useLazyAsyncData('top-for-category',
    () => $fetch(`/top-for-categories`, {
      baseURL: useRuntimeConfig().public?.frontendAppUrl,
      headers: {
        accept: "application/json",
      },
    }))

onMounted(() => topCatRef())
</script>

<template>
  <Container>
    <div class="flex flex-col items-center justify-center pt-10 lg:pt-20 " v-motion-fade-visible>
      <h2 class="text-lg lg:text-4xl max-w-xl leading-normal text-gray-800 font-bold text-center">Let The Journey of
        Organizing Your Own Learning Begin</h2>
      <p class="text-center text-xs lg:text-lg font-medium py-4 text-gray-600">Go to the ection of Your Choice to Learn
        Anything About Anything</p>
    </div>

    <div class="flex flex-wrap">
      <NuxtLink :to="{path:'/courses', query:{category:item?.id}}" class="w-full lg:w-1/2 lg:px-7 lg:py-5 py-2" v-motion-fade-visible v-for="item in category"
           :key="`single-top-cat-${item?.id}`">
        <div
            class="flex items-center gap-4 border hover:border-primary rounded-xl p-7 transition-all ease-in-out duration-500">
          <img :src="item?.photo_url" class="w-20 h-20" alt="">
          <div class="flex justify-between items-center w-full">
            <div>
              <h2 class="text-lg lg:text-mdtext-2xl font-bold">{{ item?.name }}</h2>
              <p class="font font-medium text-xs lg:text-md text-gray-600">Free Video, Live Class</p>
            </div>
            <Icon name="material-symbols:arrow-forward-ios-rounded" class="text-xl text-gray-600"/>
          </div>
        </div>
      </NuxtLink>
    </div>
  </Container>
</template>