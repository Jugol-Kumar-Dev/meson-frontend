<script setup lang="ts">
import moment from "moment";

definePageMeta({
  layout: 'student',
  middleware: ['auth']
})

const {authUser} = useTokenStore()
const {
  data: resluts,
  status: status,
  refresh
} = await useLazyAsyncData(`student-practice-${authUser?.id}-exams-results`,
    () => $fetch(`/show-results/${useRoute()?.query?.exam_id}`, {
  baseURL: useRuntimeConfig().public?.studentAppUrl,
  headers: {
    Authorization: `Bearer ${useTokenStore().token}`,
    accept: "application/json",
  },
}))

onMounted(() => refresh())


</script>


<template>
  <div class="w-full h-full min-h-screen">
    <div class="bg-white w-full flex items-center justify-center flex-col py-5 shadow-md">
      <h2 class="font-bold text-xl">Practice Exams</h2>
<!--      <p class="text-sm font-semibold text-secondary-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>-->
    </div>

    <div class="mt-10">
      <PlaceholderResult v-if="status === 'pending'"/>
      <div v-else class="flex flex-col gap-2">
        <!-- Header -->
        <div class="hidden bg-white lg:flex items-center justify-between shadow-lg rounded-lg p-4">
          <div class="flex-1">
            <p class="font-semibold text-sm capitalize text-gray-600">Exam Name</p>
          </div>
          <div class="flex-1 text-center">
            <p class="font-bold text-sm text-secondary-800">Duration</p>
          </div>
          <div class="flex-1 text-center">
            <p class="font-bold text-sm text-secondary-700">Given Date</p>
          </div>
          <div class="flex-1 text-right">
            <p class="font-bold text-sm text-secondary-700">Action</p>
          </div>
        </div>

        <!-- Exam Results List -->
        <div v-for="exam in resluts?.data" :key="exam.id" class="bg-white shadow-md rounded-lg py-2 px-5 flex-col lg:flex-row flex items-center justify-between gap-2 lg:gap-6">

          <!-- Exam Name -->
          <div class="flex-1">
            <p class="font-semibold text-base capitalize text-primary-700">{{ exam?.mocktest?.name }}</p>
          </div>

          <!-- Exam Duration and Total Questions -->
          <div class="flex-1 text-center">
            <p class="font-bold text-lg text-secondary-800">{{ exam?.mocktest?.duration }} min</p>
            <p class="font-semibold text-sm text-secondary-500">{{ exam?.mocktest?.total_q }} Questions</p>
          </div>

          <!-- Given Date with Icon -->
          <div class="flex-1 text-center flex items-center justify-center gap-2">
            <Icon name="solar:alarm-bold-duotone" class="bg-orange-400 p-3 text-white rounded-lg" />
            <div class="flex flex-col">
              <p class="font-bold text-sm text-secondary-700">{{ moment(exam.created_at)?.format('DD-MM-YYYY') }}</p>
            </div>
          </div>

          <!-- Action Button -->
          <div class="flex-1 text-right">
            <NuxtLink
                :to="`/student/exam/result/details?exam_id=${exam.id}`"
                class="inline-flex items-center gap-2 bg-primary-500 text-white px-4 py-2 rounded-full hover:bg-primary-600 transition-all ease-in-out"
            >
              <span>Show</span>
              <Icon name="solar:arrow-right-line-duotone" size="20" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>