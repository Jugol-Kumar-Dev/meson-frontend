<template>
  <div class="w-full lg:w-1/3 px-2 order-first lg:order-none pt-8">
    <div class="bg-white lg:-mt-[300px] relative z-40">
      <div v-if="!course?.course" class="animate-pulse">
        <!-- Image Placeholder -->
        <div class="p-1 w-full h-64 bg-gray-200"></div>
        <!-- Price Placeholder -->
        <div class="p-3 bg-gray-200 h-8 w-32 mt-4 rounded"></div>
        <!-- Enroll Button Placeholder -->
        <div class="mx-5 mt-4">
          <div class="w-full h-12 rounded bg-gray-200"></div>
        </div>
        <!-- Course Description Placeholder -->
        <div class="p-3 mt-9">
          <div class="bg-gray-200 h-6 w-48 rounded mb-4"></div>
          <ul class="space-y-4">
            <li class="flex items-center gap-5">
              <div class="bg-gray-200 rounded-full w-6 h-6"></div>
              <div class="bg-gray-200 rounded h-4 w-48"></div>
            </li>
            <li class="flex items-center gap-5">
              <div class="bg-gray-200 rounded-full w-6 h-6"></div>
              <div class="bg-gray-200 rounded h-4 w-48"></div>
            </li>
            <li class="flex items-center gap-5">
              <div class="bg-gray-200 rounded-full w-6 h-6"></div>
              <div class="bg-gray-200 rounded h-4 w-48"></div>
            </li>
          </ul>
        </div>
        <!-- Contact Placeholder -->
        <div class="text-sm flex justify-between py-5 px-3">
          <div class="bg-gray-200 h-4 w-48 rounded"></div>
          <div class="bg-gray-200 h-4 w-32 rounded"></div>
        </div>
      </div>

      <div v-else>
        <!-- Actual content when course data is loaded -->
        <img class="p-1 w-full" :src="course?.course?.cover_url" alt="">
        <p class="text-2xl font-semibold p-3">৳ {{ course?.course?.price }}</p>
        <div class="mx-5">
          <NuxtLink :to="`/admission?course=${course?.course?.id}`" class="flex items-center justify-center gap-3 w-full rounded bg-primary-500 hover:bg-purple-900 text-white px-4 py-2 text-lg font-semibold">
            Enroll Now
          </NuxtLink>
        </div>
        <h2 class="text-xl font-semibold p-3 pt-9">What is in this course</h2>
        <ul class="p-3 leading-loose text-gray-600 pl-6" v-if="course?.course?.inclues && JSON.parse(course?.course?.inclues)?.length">
          <li class="flex items-center gap-5" v-for="item in JSON.parse(course?.course?.inclues)">
            <span><Icon :name="item?.icon" class="text-lg"/></span>
            <p>{{ item?.title }}</p>
          </li>
        </ul>
        <div class="text-sm flex justify-between py-5 px-3">
          <p class="text-gray-400">For details about the course</p>
          <p class="flex items-center gap-1 text-primary-500 font-semibold">
            <span class=""><Icon name="material-symbols:call-outline" class=""/></span>
            Call (16910)
          </p>
        </div>
      </div>
    </div>
  </div>
</template>