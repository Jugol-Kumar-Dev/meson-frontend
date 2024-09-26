<script setup>
import moment from "moment";

definePageMeta({
  layout:'student',
  middleware:['auth']
})


const {authUser} = useTokenStore()
const {
  data,
  status: status,
  refresh
} = await useLazyAsyncData(`student-today-${authUser?.id}-dashboard`, () => $fetch(`/dashboard`, {
  baseURL: useRuntimeConfig().public?.studentAppUrl,
  headers: {
    Authorization: `Bearer ${useTokenStore().token}`,
    accept: "application/json",
  },
}))
</script>


<template>
  <div class="flex flex-col gap-3">
    <Acordion class="bg-white font-bold py-4 rounded-md shadow-md border-none" :border="false" title="Today Live Exams">
      <div>
        <PlaceholderExam v-if="status === 'pending'" :count="3"/>
        <div v-if="status === 'success' && data?.mocktests?.length" class="flex flex-col gap-5">
          <div class="bg-white flex items-center justify-between border border-primary-200 rounded-lg p-5" v-for="exam in data?.mocktests" :key="exam">
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
        <div class="flex items-center justify-center" v-if="status === 'success' && !data?.mocktests?.length">
          <h2 class="font-bold uppercase text-lg">No Have Any Active Items</h2>
        </div>
      </div>

    </Acordion>
    <Acordion class="bg-white font-bold py-4 rounded-md shadow-md border-none" :border="false" title="Today Live Classes">
      <div>
        <PlaceholderExam v-if="status === 'pending'" :count="3"/>
        <div v-if="status === 'success' && data?.classes?.length" class="flex flex-col gap-5">
          <div class="bg-white flex items-center justify-between border border-primary-200 rounded-lg p-5" v-for="exam in data?.classes" :key="exam">
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

        <div class="flex items-center justify-center" v-if="status === 'success' && !data?.classes?.length">
          <h2 class="font-bold uppercase text-lg">No Have Any Active Items</h2>
        </div>
      </div>
    </Acordion>
  </div>
</template>