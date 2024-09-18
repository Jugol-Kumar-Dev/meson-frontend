<script setup lang="ts">
import moment from "moment/moment";

definePageMeta({
  layout: 'student',
  middleware: ['auth']
})


const {authUser} = useTokenStore()
const {
  data: exams,
  status: status,
  refresh
} = await useLazyAsyncData(`student-${authUser?.id}-single-exams-${useRoute().query?.exam_id}`,
    () => $fetch(`/get-exam-details/${useRoute().query?.exam_id}`, {
  baseURL: useRuntimeConfig().public?.studentAppUrl,
  headers: {
    Authorization: `Bearer ${useTokenStore().token}`,
    accept: "application/json",
  },
}))

onMounted(()=>{
  if(useRoute()?.query?.exam_id) refresh();
})

</script>


<template>
  <div class="w-full h-full min-h-screen">
    <div class="flex justify-between w-full mt-20 bg-white shadow-lg p-10">
      <div class="w-1/3">
        <p class="text-xl font-bold">{{ exams?.name }}</p>
        <p>Total Exam questions: <span>{{ exams?.total_q }}</span></p>
        <p>Duration: <span>{{ exams?.duration }}</span></p>
        <p>Statrt Time: <span>{{ exams?.start_time }}</span></p>
        <p>End Time: <span>{{ exams?.end_time }}</span></p>
        <p>Minus Mark: <span>{{ exams?.minus_mark }}</span></p>
        <p>Pass Mark: <span>{{ exams?.pass_mark }}</span></p>
      </div>
      <div class="w-1/3">
        <p>Instraction For Given Exam</p>
        <p class="whitespace-pre-wrap">{{ exams?.about }}</p>
      </div>
      <div class="w-1/3 flex items-start justify-end">
        <div class="w-max flex gap-3">
          <NuxtLink to="/" class="flex items-center gap-1 bg-primary-200 px-4 py-2 hover:bg-primary-500 hover:text-primary-100 font-semibold text-sm rounded transition-all ease-in-out">
            <Icon name="solar:arrow-left-line-duotone"/>
            <span>Go Back</span>
          </NuxtLink>
          <NuxtLink to="/student/givenexam" class="flex items-center gap-1 hover:bg-primary-200 px-4 py-2 bg-primary-500 hover:text-primary-700 text-primary-100 font-semibold text-sm rounded transition-all ease-in-out">
            <span>Start Exam</span>
            <Icon name="solar:arrow-right-line-duotone"/>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>