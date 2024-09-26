<script setup lang="ts">
import moment from "moment";

definePageMeta({
  layout: 'student',
  middleware: ['auth']
})

const {authUser} = useTokenStore()
const {
  data,
  status,
  refresh
} = await useLazyAsyncData(`student-live-classes-${authUser?.id}`,
    () => $fetch(`/all-live-classes`, {
      baseURL: useRuntimeConfig().public?.studentAppUrl,
      headers: {
        Authorization: `Bearer ${useTokenStore().token}`,
        accept: "application/json",
      },
      params:{
        course_id:useRoute()?.query?.course_id
      }
    }))
onMounted(() => refresh())


</script>


<template>
  <div class="w-full h-full min-h-screen">
    <div class="bg-white w-full flex items-center justify-center flex-col py-5 shadow-md">
      <h2 class="font-bold text-xl">Live Classes</h2>
<!--      <p class="text-sm font-semibold text-secondary-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>-->
    </div>

    <div class="mt-10">
      <PlaceholderResult v-if="status === 'pending'"/>
      <div v-else class="flex flex-col gap-2">
        <!-- Header -->
        <div class="hidden bg-white lg:flex items-center justify-between shadow-lg rounded-lg p-4">
          <div class="flex-1">
            <p class="font-bold text-sm capitalize text-gray-600">Exam Name</p>
          </div>
          <div class="flex-1 text-center">
            <p class="font-bold text-sm text-secondary-700">Start Time</p>
          </div>
          <div class="flex-1 text-center">
            <p class="font-bold text-sm text-secondary-700">Status</p>
          </div>
          <div class="flex-1 text-right">
            <p class="font-bold text-sm text-secondary-700">Action</p>
          </div>
        </div>
        <!-- Exam Results List -->
        <div v-for="item in data?.data" :key="item.id" class="bg-white shadow-md rounded-lg py-2 px-5 flex-col lg:flex-row flex items-start lg:items-center justify-between gap-2 lg:gap-6">
          <!-- Exam Name -->
          <div class="lg:w-[30%]">
            <div class="flex flex-col lg:flex-row gap-2">
              <img class="w-full lg:w-32 h-auto object-contain" :src="item?.photo_url" @error="$event.target.src='https://placehold.co/600x400'" alt="">
              <div>
                <p class="font-bold capitalize text-primary-700">{{ item?.title }}</p>
                <p class="font-semibold text-xs">{{ item?.course?.name }}</p>
              </div>
            </div>
          </div>

          <!-- Given Date with Icon -->
          <div class="flex-1 text-center flex items-center justify-center gap-2">
            <Icon name="solar:alarm-bold-duotone" class="bg-primary-400 p-3 text-white rounded-lg" />
            <div class="flex flex-col">
              <p class="font-bold text-sm text-secondary-700">{{ moment(item.start_time)?.format('lll') }}</p>
            </div>
          </div>
          <!-- Given Date with Icon -->
          <div class="flex-1 text-center flex items-center justify-center gap-2">
            <div class="flex items-center gap-2" v-if="new Date(item.start_time) > new Date()">
              <Icon name="solar:check-circle-bold" class="bg-green-400 p-3 text-white rounded-lg"  />
              <p class="font-bold text-sm text-secondary-700">Date Passed</p>
            </div>
            <div class="flex items-center gap-2" v-else>
              <Icon name="solar:check-circle-line-duotone" class="bg-orange-400 p-3 text-white rounded-lg" />
              <p class="font-bold text-sm text-secondary-700">Upcoming</p>
            </div>
          </div>

          <!-- Action Button -->
          <div class="flex-1 text-right">
            <a target="_blank"
                :href="item?.link"
                class="inline-flex items-center gap-2 bg-primary-500 text-white px-4 py-2 rounded-full hover:bg-primary-600 transition-all ease-in-out"
            >
              <span>Join Class</span>
              <Icon name="solar:arrow-right-line-duotone" size="20" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>