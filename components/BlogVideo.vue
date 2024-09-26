<script setup>
const { data,  status, refresh } =
    await useLazyAsyncData('home-blogs',
    () =>$fetch(`/home-blogs`, {
      baseURL: useRuntimeConfig().public?.frontendAppUrl,
      headers: {
        accept: "application/json",
      },
    }))

onMounted(()=> refresh())
</script>

<template>
    <Container>
        <div class="flex flex-col items-center justify-center  pt-10 lg:pt-20 " id="blogs">
            <h2 class="text-xl lg:text-4xl max-w-xl leading-normal text-gray-800 font-bold text-center">What is in the Online Batch Throughout the Year?</h2>
            <p class="text-center text-xs lg:text-lg font-medium py-4 text-gray-600">May the Progress of Education Continue From any Part of the Country Under the Care of the Best Teachers</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <NuxtLink :to="`/blog/${item?.id}`"  class="col-span-1 px-4" v-for="item in data" v-motion-fade-visible>
                <div class="rounded-xl border hover:border-primary transition-all ease-in-out duration-500">
                    <div class="p-2">
                        <img class="w-full rounded-xl "
                             :src="item?.image_url" alt="" />
                    </div>
                    <div class="p-5">
                        <h2 class="text-lg lg:text-xl font-semibold pb-3">
                          {{ item?.title }}
                        </h2>
                        <p class="text-xs lg:text-sm text-gray-600 font medium" v-if="item?.description">
                          {{ item?.description?.slice(0, 60) }}
                        </p>
                    </div>
                </div>
            </NuxtLink>
        </div>
<!--        <div class="flex justify-center">-->
<!--            <button class="flex items-center gap-3 my-8 lg:my-16 rounded bg-primary-500 hover:bg-purple-700 text-white px-4 py-2 text-lg font-semibold">-->
<!--                Chooce Your Class-->
<!--                <Icon name="material-symbols:arrow-forward-ios-rounded" class="text-xl text-white" />-->
<!--            </button>-->
<!--        </div>-->
            

</Container>    
</template>