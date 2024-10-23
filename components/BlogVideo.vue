<script setup>
import moment from "moment";
const { data,  status, refresh } =
    await useLazyAsyncData('home-blogs',
    () =>$fetch(`/home-blogs`, {
      baseURL: useRuntimeConfig().public?.frontendAppUrl,
      headers: {
        accept: "application/json",
      },
    }),{immediate:true})
const settings = inject('profileSettings')
</script>

<template>
    <Container>
        <div class="flex flex-col items-center justify-center  pt-10 lg:pt-20 " id="blogs">
            <h2 class="text-xl lg:text-4xl max-w-xl leading-normal text-gray-800 font-bold text-center">
              {{ settings?.profile?.name }} Blogs
            </h2>
            <p class="text-center text-xs lg:text-lg font-medium py-4 text-gray-600">May the Progress of Education Continue From any Part of the Country Under the Care of the Best Teachers</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <NuxtLink :to="`/blog/${item?.id}`" class="col-span-1 px-4" v-for="item in data" v-motion-fade-visible>
            <div class="rounded-xl border-4 border-gray-200 hover:border-primary-500 transition-all ease-in-out duration-500 shadow-lg hover:shadow-2xl transform">
              <!-- Blog Image -->
              <div class="p-2 relative overflow-hidden">
                <img class="w-full h-40 lg:h-52 object-cover rounded-t-xl transition-transform duration-300 ease-in-out hover:scale-110" :src="item?.image_url" alt="Blog image" />
                <!-- Publish Date -->
                <div class="absolute bottom-2 right-2 bg-white/70 text-xs px-2 py-1 rounded-lg text-gray-700 shadow">
                  {{ moment(item?.published_at).format('ll') }}
                </div>
              </div>

              <!-- Blog Content -->
              <div class="p-5 bg-white rounded-b-xl">
                <!-- Blog Title -->
                <h2 class="text-lg lg:text-xl font-semibold pb-3 leading-tight truncate">
                  {{ item?.title }}
                </h2>

                <!-- Blog Description -->
                <p class="text-xs lg:text-sm text-gray-600 font-medium pb-4">
                  {{ item?.description?.slice(0, 100) }}...
                </p>

                <!-- Read More Button -->
                <div class="text-right">
                  <button class="text-xs lg:text-sm text-primary-500 hover:text-primary-600 font-bold transition-all duration-300 ease-in-out">
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          </NuxtLink>

        </div>
        <div class="flex justify-center" v-if="data?.length > 5">
            <button class="flex items-center gap-3 my-8 lg:my-16 rounded bg-primary-500 hover:bg-purple-700 text-white px-4 py-2 text-lg font-semibold">
                Show More
                <Icon name="material-symbols:arrow-forward-ios-rounded" class="text-xl text-white" />
            </button>
        </div>
            

</Container>    
</template>