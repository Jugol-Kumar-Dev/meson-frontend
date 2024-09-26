<script setup lang="ts">
import moment from "moment";

definePageMeta({
  layout: 'student',
  middleware: ['auth']
})

const {authUser} = useTokenStore()
const {
  data: exams,
  status: status,
  refresh
} = await useLazyAsyncData(`student-practice-${authUser?.id}-exams`, () => $fetch(`/get-live-exams`, {
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
      <h2 class="font-bold text-xl">Live Exams</h2>
<!--      <p class="text-sm font-semibold text-secondary-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>-->
    </div>

    <div class="mt-10">
      <PlaceholderExam v-if="status === 'pending'"/>
      <div v-if="status === 'success' && exams?.data?.length" class="flex flex-col gap-5">
        <div class="bg-white flex items-center justify-between shadow-lg p-5" v-for="exam in exams?.data" :key="exam">
          <div>
            <p class="font-bold text-lg text-secondary-800">{{ exam?.name }}</p>
            <p class="font-semibold text-sm text-secondary-500">{{ exam?.course_name }}</p>
          </div>
          <div class="flex items-center gap-2">
            <Icon name="solar:alarm-bold-duotone" class="bg-orange-400 p-3 text-white rounded-lg"/>
            <div class="flex flex-col gap-1">
              <p class="font-bold text-sm text-secondary-700 flex gap-2" >
                <span>{{ moment(exam.start_time)?.format('lll')}}</span>
                <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">start time</span>
              </p>
              <hr>
              <p class="font-bold text-sm text-secondary-700 flex gap-2" >
                <span>{{ moment(exam.end_time)?.format('lll')}}</span>
                <span class="bg-orange-100 text-orange-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">end time</span>
              </p>
            </div>
          </div>
          <div>
            <Icon name="solar:check-circle-bold-duotone" v-if="exam?.status" size="25" class="text-green-500" />
            <Icon name="solar:close-circle-bold-duotone" v-else size="25" class="text-red-500" />
          </div>
          <div>
            <NuxtLink :to="`/student/exam/live-exam/details?course_id=${exam?.course_id}&exam_id=${exam.id}`"
                      class="flex items-center gap-1 bg-primary-200 px-4 py-2 hover:bg-primary-500 hover:text-primary-100 font-semibold text-sm rounded transition-all ease-in-out">
              <span>See Details</span>
              <Icon name="solar:arrow-right-line-duotone" size="20"/>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center" v-if="status === 'success' && !exams?.data?.length">
        <h2 class="font-bold uppercase text-lg">No Have Any Live Exams</h2>
      </div>
    </div>
  </div>
</template>