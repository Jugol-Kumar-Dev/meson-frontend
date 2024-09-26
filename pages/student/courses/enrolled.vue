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
<!--      <p class="text-sm font-semibold text-secondary-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>-->
    </div>

    <div class="mt-10">
      <PlaceholderCourse :count="12" v-if="courseStatus === 'pending'"/>
      <div v-if="courseStatus !== 'pending' && courses?.data?.length" class="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-5">
        <NuxtLink :to="`/student/courses/${course?.course?.id}`"
                  class="col-span-1 bg-white rounded-md overflow-hidden shadow-lg"
                  v-for="course in courses?.data" :key="course?.course_id">
          <img :src="course?.course?.cover_url" class=""/>
          <div class="p-4">
            <p class="font-bold capitalize text-xs lg:text-sm">{{ course?.course?.name }}</p>
          </div>
        </NuxtLink>
      </div>
      <div v-if="courseStatus === 'success' && !courses?.data?.length" class="mt-20 flex items-center justify-center">
        <h2 class="font-bold capitalize">You haven't enrolled in any courses yet.</h2>
      </div>

    </div>
  </div>
</template>