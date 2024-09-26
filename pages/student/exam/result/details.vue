<script setup lang="ts">

definePageMeta({
  layout: 'student',
  middleware: ['auth']
})
const {authUser} = useTokenStore()
const {
  data,
  status,
  refresh
} = await useLazyAsyncData(`student-practice-${authUser?.id}-exams-${useRoute()?.query?.exam_id}-results`,
    () => $fetch(`/show-result-details/${useRoute()?.query?.exam_id}`, {
      baseURL: useRuntimeConfig().public?.studentAppUrl,
      headers: {
        Authorization: `Bearer ${useTokenStore().token}`,
        accept: "application/json",
      },
    }))

onMounted(() => refresh())

</script>


<template>

  <main class="min-h-screen max-w-5xl mx-auto overflow-hidden">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="col-span-1 bg-white flex flex-col text-center border border-gray-300 rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <p class="font-bold text-xl text-gray-700 uppercase">Marks</p>
        <span class="font-semibold text-lg text-gray-800">{{ data?.ansCountes?.mark }}</span>
      </div>
      <div class="col-span-1 bg-white flex flex-col text-center border border-gray-300 rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <p class="font-bold text-xl text-gray-700 uppercase">Total Correct</p>
        <span class="font-semibold text-lg text-gray-800">{{ data?.ansCountes?.total_correct }}</span>
      </div>
      <div class="col-span-1 bg-white flex flex-col text-center border border-gray-300 rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <p class="font-bold text-xl text-gray-700 uppercase">Total Incorrect</p>
        <span class="font-semibold text-lg text-gray-800">{{ data?.ansCountes?.total_incaorrect }}</span>
      </div>
      <div class="col-span-1 bg-white flex flex-col text-center border border-gray-300 rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <p class="font-bold text-xl text-gray-700 uppercase">Minus Mark</p>
        <span class="font-semibold text-lg text-gray-800">{{ data?.ansCountes?.minus_mark }}</span>
      </div>
      <div class="col-span-1 bg-white flex flex-col text-center border border-gray-300 rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <p class="font-bold text-xl text-gray-700 uppercase">Rank</p>
        <span class="font-semibold text-lg text-gray-800">{{ data?.ansCountes?.position }}</span>
      </div>
      <div class="col-span-1 bg-white flex flex-col text-center border border-gray-300 rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <p class="font-bold text-xl text-gray-700 uppercase">Participants</p>
        <span class="font-semibold text-lg text-gray-800">{{ data?.ansCountes?.partisipants }}</span>
      </div>
      <div class="col-span-1 bg-white flex flex-col text-center border border-gray-300 rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <p class="font-bold text-xl text-gray-700 uppercase">Main Mark</p>
        <span class="font-semibold text-lg text-gray-800">{{ data?.ansCountes?.mark - data?.ansCountes?.minus_mark }}</span>
      </div>
      <div class="col-span-1 bg-white flex flex-col text-center border border-gray-300 rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <p class="font-bold text-xl text-gray-700 uppercase">Total Questions</p>
        <span class="font-semibold text-lg text-gray-800">{{ data?.ansCountes?.mocktest?.total_q }}</span>
      </div>
    </div>


    <PlaceholderResultDetails v-if="status === 'pending'" />

    <div v-else class="bg-white p-6 rounded-lg shadow-md mt-6" v-for="(ans, i) in data?.answerDetails" :key="`ans-${ans.id}`">
      <div class="flex justify-between items-center border-b pb-4 mb-4">
        <div>
          <h3 class="font-semibold text-xl text-gray-800">Question {{ i + 1 }}:</h3>
          <p class="text-lg text-gray-600" v-html="ans?.question?.title"></p>
        </div>
        <div v-if="ans.user_answer !== null">
          <p v-if="ans.user_answer === ans?.question?.answer" class="bg-green-500 text-white px-4 py-2 rounded-md">
            Correct Answer
          </p>
          <p v-else class="bg-red-500 text-white px-4 py-2 rounded-md">
            Wrong Answer
          </p>
        </div>
        <p v-else class="bg-orange-500 text-white px-4 py-2 rounded-md">
          No Select Answer
        </p>
      </div>

      <div class="space-y-3">
        <div v-for="option in ['a', 'b', 'c', 'd']" :key="option" :class="{
        'bg-green-100 border-green-500': ans?.user_answer === ans.question.answer && ans?.user_answer === option || ans?.question.answer === option,
        'bg-red-100 border-red-500': ans.user_answer === option && ans?.user_answer !== ans.question.answer,
        'bg-white border-gray-300': ans?.user_answer !== option && ans?.question.answer !== option
      }" class="flex justify-between items-center p-4 border rounded-lg">
          <span v-html="ans?.question?.[option]"></span>
          <Icon name="solar:check-circle-bold-duotone" size="25" class="text-green-500" v-if="ans?.question?.answer === option"></Icon>
          <Icon name="solar:close-circle-line-duotone" size="25" class="text-red-500" v-if="ans?.user_answer === option && ans?.question.answer !== option"></Icon>
        </div>
      </div>

      <div class="mt-6">
        <h6 class="text-lg font-semibold text-gray-700">Question Feedback:</h6>
        <p class="bg-gray-100 p-4 rounded-lg mt-2" v-html="ans?.question?.feedback"></p>
      </div>
    </div>
  </main>

</template>
