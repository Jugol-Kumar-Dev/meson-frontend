<script setup lang="ts">

import moment from "moment/moment";

const router = useRouter()
definePageMeta({
  layout: 'student',
  middleware: ['auth']
})

const {authUser} = useTokenStore()
const {
  data: exams,
  status,
  refresh
} = await useLazyAsyncData(`student-${authUser?.id}-single-exams-${useRoute().query?.exam_id}`,
    () => $fetch(`/get-exam-details/${useRoute().query?.exam_id}`, {
  baseURL: useRuntimeConfig().public?.studentAppUrl,
  headers: {
    Authorization: `Bearer ${useTokenStore().token}`,
    accept: "application/json",
  },
}))
const loadExamStatus = ref(false)
const getExamToken = async () =>{
  loadExamStatus.value = true;
  const {data, error, status} = await useApiFetch(`/check-mocktest/${useRoute().query?.exam_id}`,{
    method:'POST',
    cache:"no-cache"
  })
  if(localStorage.getItem('exam_token_for'+authUser?.id)){
    localStorage.removeItem('exam_token_for'+authUser?.id)
  }
  localStorage.setItem('exam_token_for'+authUser?.id, data.value?.examToken);
  loadExamStatus.value = false

  await router.push(`/student/givenexam/${useRoute().query?.exam_id}`)
}


onMounted(()=>{
  if(useRoute()?.query?.exam_id) refresh();
})

</script>


<template>
  <div class="w-full h-full min-h-screen">
    <!-- Main Container -->
    <div v-if="status !== 'pending'" class="container mx-auto mt-20 bg-white shadow-lg p-10 rounded-lg">
      <div class="flex flex-col lg:flex-row justify-between gap-8">
        <!-- Exam Information -->
        <div class="lg:w-1/3 bg-primary-50 p-6 rounded-lg shadow-md">
          <p class="text-2xl font-bold text-primary-800 mb-3">{{ exams?.name }}</p>
          <ul class="text-gray-700 space-y-2">
            <li class="flex items-center justify-between">
              <span>Total Exam Questions:</span>
              <span class="font-semibold">{{ exams?.total_q }}</span>
            </li>
            <li class="flex items-center justify-between">
              <span>Duration:</span>
              <span class="font-semibold">{{ exams?.duration }} mins</span>
            </li>
            <li class="flex items-center justify-between">
              <span>Start Time:</span>
              <span class="font-semibold">{{ moment(exams?.start_time)?.format('lll') }}</span>
            </li>
            <li class="flex items-center justify-between">
              <span>End Time:</span>
              <span class="font-semibold">{{ moment(exams?.end_time)?.format('lll') }}</span>
            </li>
            <li class="flex items-center justify-between">
              <span>Minus Mark:</span>
              <span class="font-semibold">{{ exams?.minus_mark }} %</span>
            </li>
            <li class="flex items-center justify-between">
              <span>Pass Mark:</span>
              <span class="font-semibold">{{ exams?.pass_mark }}</span>
            </li>
          </ul>
        </div>

        <!-- Action Buttons -->
        <div class="lg:w-1/3 flex items-start justify-end">
          <div class="flex flex-col gap-3 w-max">
            <NuxtLink to="/student/exam/practiceexam"
                      class="flex items-center gap-2 px-5 py-3 bg-primary-200 hover:bg-primary-500 text-primary-800 hover:text-white font-semibold text-sm rounded-lg shadow-lg transition-all">
              <Icon name="solar:arrow-left-line-duotone" class="text-lg"/>
              <span>Go Back</span>
            </NuxtLink>

            <LoadingButton type="button" :isLoading="loadExamStatus" @click="getExamToken"
                           class="flex items-center gap-2 px-5 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm rounded-lg shadow-lg transition-all">
              <span>Start Exam</span>
              <Icon name="solar:arrow-right-line-duotone" class="text-lg"/>
            </LoadingButton>
            <NuxtLink :to="`/student/exam/result/practiceexam?exam_id=${$route.query?.exam_id}`"
                      class="flex items-center gap-2 px-5 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold text-sm rounded-lg shadow-lg transition-all">
              <span>Results</span>
              <Icon name="solar:arrow-right-line-duotone" class="text-lg"/>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Skeleton Loader (visible during loading) -->
    <div v-else class="container mx-auto mt-20 bg-white shadow-lg p-10 rounded-lg animate-pulse">
      <div class="flex flex-col lg:flex-row justify-between gap-8">
        <!-- Skeleton for Exam Information -->
        <div class="lg:w-1/3 bg-gray-200 p-6 rounded-lg shadow-md">
          <div class="w-3/4 h-6 bg-gray-300 mb-3"></div>
          <ul class="space-y-2">
            <li class="flex items-center justify-between">
              <span class="w-1/2 h-4 bg-gray-300 rounded"></span>
              <span class="w-1/4 h-4 bg-gray-300 rounded"></span>
            </li>
            <li class="flex items-center justify-between">
              <span class="w-1/2 h-4 bg-gray-300 rounded"></span>
              <span class="w-1/4 h-4 bg-gray-300 rounded"></span>
            </li>
            <li class="flex items-center justify-between">
              <span class="w-1/2 h-4 bg-gray-300 rounded"></span>
              <span class="w-1/4 h-4 bg-gray-300 rounded"></span>
            </li>
            <li class="flex items-center justify-between">
              <span class="w-1/2 h-4 bg-gray-300 rounded"></span>
              <span class="w-1/4 h-4 bg-gray-300 rounded"></span>
            </li>
          </ul>
        </div>

        <!-- Skeleton for Action Buttons -->
        <div class="lg:w-1/3 flex items-start justify-end">
          <div class="flex flex-col gap-3 w-max">
            <div class="w-32 h-10 bg-gray-300 rounded"></div>
            <div class="w-32 h-10 bg-gray-300 rounded"></div>
            <div class="w-32 h-10 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Instruction Section -->
    <div v-if="status !== 'pending'" class="container mx-auto mt-5 bg-gray-50 shadow-lg p-10 rounded-lg">
      <p class="text-lg font-semibold text-primary-600 mb-2">Instructions for the Exam</p>
      <p class="text-gray-600 whitespace-pre-wrap">{{ exams?.about }}</p>
    </div>

    <div v-else class="container mx-auto mt-5 bg-gray-50 shadow-lg p-10 rounded-lg animate-pulse">
      <div class="w-2/3 h-6 bg-gray-300 mb-3"></div>
      <div class="w-full h-4 bg-gray-300"></div>
    </div>
  </div>
</template>