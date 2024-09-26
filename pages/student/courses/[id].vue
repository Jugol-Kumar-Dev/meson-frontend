<script setup lang="ts">

definePageMeta({
  layout: 'student',
  middleware: ['auth']
})
const playVideoId = ref(null)
const {authUser} = useTokenStore()
const {
  data: courseDetails,
  status: status,
  refresh,
    error
} = await useLazyAsyncData(`studnet-course-lessons`, () => $fetch(`/get-course-details/${useRoute()?.params?.id}`, {
  baseURL: useRuntimeConfig().public?.studentAppUrl,
  headers: {
    Authorization: `Bearer ${useTokenStore().token}`,
    accept: "application/json",
  },
}))

// onMounted(() => refresh())
const handleImageError = (event: Event, name?: string): void => {
  // The event target is cast as an HTMLImageElement
  const target = event?.target as HTMLImageElement;

  // Default to 'User' if no name is provided
  const authUserName = name ?? 'User';

  // Set the image src to the generated URL
  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(authUserName)}`;
};

// const frequentlyAskQuestion = computed(() => courseDetails.value?.faqs ? JSON.parse(courseDetails.value?.faqs) : [])
// const features = computed(() => courseDetails?.value?.features ? JSON.parse(courseDetails?.value?.features) : [])

</script>


<template>
  <div>
    <PlaceholderCourseDetails v-if="status === 'pending'"/>
    <div v-if="status === 'success' && courseDetails" class="w-full h-full min-h-screen">
      <div class="bg-white w-full flex items-start flex-col lg:flex-row shadow-md gap-8 p-2 lg:p-5">
        <img :src="courseDetails?.cover_url" class="lg:w-[40%]" alt="course-image"/>
        <div class="flex flex-col gap-2">
          <h2 class="font-bold text-xl">{{ courseDetails?.name }}</h2>
          <p class="text-sm font-semibold text-secondary-600">{{ courseDetails?.description }}</p>
          <div class="flex items-start justify-center gap-2 lg:gap-6">
            <NuxtLink :to="`/student/exam/practiceexam`"
                      class="flex-1 flex items-center justify-center text-center flex-col rounded-lg shadow-md lg:min-h-32 min-h-20 bg-green-200">
              <p class="font-bold text-lg">{{ courseDetails?.mocktests_count }}</p>
              <p class="font-bold text-sm">Total Exam</p>
            </NuxtLink>

            <NuxtLink :to="`/student/liveclass?course_id=${courseDetails?.id}`"
                      class="flex-1 flex items-center justify-center flex-col text-center rounded-lg shadow-md lg:min-h-32 min-h-20 bg-orange-200">
              <p class="font-bold text-lg">{{ courseDetails?.live_classes_count }}</p>
              <p class="font-bold text-sm">Live Class</p>
            </NuxtLink>

            <NuxtLink :to="`/student/courses/content?course_id=${courseDetails?.id}`"
                      class="flex-1 flex items-center justify-center flex-col rounded-lg text-center shadow-md lg:min-h-32 min-h-20 bg-purple-200">
              <p class="font-bold text-lg">{{ courseDetails?.chapters_count }}</p>
              <p class="font-bold text-sm">Course Content</p>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="my-5" v-if="courseDetails?.instractors !== 'null' && courseDetails?.instractors?.length">
        <h2 class="text-lg font-bold mt-7 mb-3">Meet Instractors</h2>
        <div class="w-full grid grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-8">
          <div class="col-span-1 rounded-lg shadow-md bg-white" v-for="instractor in  courseDetails?.instractors"
               :key="`single-ins-${instractor?.id}`">
            <div class="flex flex-col lg:flex-row items-center gap-3 p-2 lg:p-5">
              <img class="border-2 p-0.5 lg:p-1 w-16  h-16 border-primary rounded-full"
                   :src="instractor?.photo_url"
                   @error="$event.target.src=`https://ui-avatars.com/api/?background=ffffff&color=000000&name=${instractor.name}`"
                   :alt="instractor.name">
              <div class="text-center lg:text-left font-medium">
                <p class="text-lg font-bold">{{ instractor?.name }}</p>
                <p class="text-sm font-semibold text-secondary-700">DU, CU (8+ Years Exp)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="my-5" v-if="courseDetails?.features?.length">
        <div>
          <h2 class="text-xl lg:text-2xl font-bold text-center lg:text-left px-5 lg:px-0 text-gray-600 py-10 tracking-wide">
            What You Will Learn By Doing The Course</h2>
          <div v-if="courseDetails?.features?.length">
            <ul class="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-7 lg:px-0">
              <li class="col-span-1  shadow-md rounded-md flex bg-white p-3 lg:p-5 gap-1" v-for="item in courseDetails?.features">
                <Icon name="material-symbols:check" class="text-blue-300" size="30"/>
                <p class="max-w-xs text-sm lg:text-base">{{ item?.title }}</p>
              </li>
            </ul>
          </div>
        </div>

        <div v-if="courseDetails?.faqs.length">
          <h2 class="text-xl lg:text-2xl font-bold text-center lg:text-left px-5 lg:px-0 text-gray-600 pt-5 pb-3 tracking-wide">
            Frequently Ask Questions
          </h2>
          <div class="border rounded-lg lg:p-4 flex flex-col gap-3" v-if="courseDetails?.faqs?.length">
            <Acordion class="bg-white font-bold py-4 rounded-md shadow-md border-none" :title="ques?.question"
                      v-for="ques in courseDetails?.faqs">
              <p>
                {{ ques?.answer }}
              </p>
            </Acordion>
          </div>
        </div>
      </div>
    </div>
    <div v-if="error?.data">
      <div class="flex items-center justify-center min-h-screen">
      <div class="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div class="p-6">
          <h2 class="text-2xl font-bold text-red-600 mb-4">
            {{ error?.data?.title }}
          </h2>
          <p class="text-gray-700 mb-6">
            {{ error?.data?.message }}
          </p>
          <NuxtLink to="/"
             class="block text-center bg-primary-600 text-white py-2 rounded-md  transition duration-200">
            Home
          </NuxtLink>
        </div>
      </div>
    </div>

    </div>
  </div>
</template>