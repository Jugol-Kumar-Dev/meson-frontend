<script setup lang="ts">
definePageMeta({
  layout: 'student',
  middleware: ['auth']
})

const {authUser} = useTokenStore()
const {
  data: courses,
  status: courseStatus,
  refresh: courseRefresh
} = await useLazyAsyncData(`student-${authUser?.id}-courses`, () => $fetch(`/get-my-courses`, {
  baseURL: useRuntimeConfig().public?.studentAppUrl,
  headers: {
    Authorization: `Bearer ${useTokenStore().token}`,
    accept: "application/json",
  },
}))

onMounted(() => courseRefresh())


</script>


<template>
  <div class="w-full h-full min-h-screen">
    <div class="bg-white w-full flex items-center justify-center flex-col py-5">
      <h2 class="font-bold text-xl">Enrolled Courses</h2>
      <p class="text-sm font-semibold text-secondary-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </div>

    <div class="mt-10">
      <div class="grid grid-cols-12 gap-5">
        <div class="col-span-3 bg-white rounded-md overflow-hidden shadow-lg" v-for="course in courses?.data" :key="course?.course_id">
          <img :src="course?.course?.cover_url" class=""/>
          <div class="p-4">
            <p class="font-bold capitalize">{{ course?.course?.name }}</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>