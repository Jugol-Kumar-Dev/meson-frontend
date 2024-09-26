<script setup lang="ts">
import moment from "moment";

const route = useRoute();


const {
  data: order,
  status,
  refresh
} = await useLazyAsyncData(`check-payment`, () => $fetch(`/get-confirm-order/${route.query?.trx_id}`, {
  baseURL: useRuntimeConfig().public?.studentAppUrl,
  headers: {
    Authorization: `Bearer ${useTokenStore().token}`,
    accept: "application/json",
  },
}))


onMounted(()=> refresh())

</script>



<template>
  <div class="min-h-screen flex items-center justify-center p-2 lg:p-6 bg-gray-50 dark:bg-gray-900 mt-20 lg:mt-0">
    <div class="w-full max-w-lg bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-md">
      <div class="flex flex-col items-center gap-4 p-6 text-center">
        <!-- Success Icon -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-green-500" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="m9 12 2 2 4-4"></path>
        </svg>

        <!-- Success Message -->
        <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Payment Successful</h1>
        <p class="text-gray-600 dark:text-gray-400 max-w-md">
          Your course purches successfully done. Enjoy this course in your dashbaord.
        </p>
      </div>

      <!-- Order Details Card -->
      <div class="border-t border-gray-200 dark:border-gray-700 p-2 lg:p-6">
        <div class="space-y-4 text-sm">
          <div class="flex justify-between">
            <span class="font-medium text-gray-900 dark:text-white">Order Number:</span>
            <span class="text-gray-700 dark:text-gray-300" v-if="order?.trx">#{{ moment(order?.trx?.created_at)?.format('YYYYMMDD')+order.trx?.order?.id }}</span>
          </div>

          <div class="flex justify-between">
            <span class="font-medium text-gray-900 dark:text-white">Date:</span>
            <span class="text-gray-700 dark:text-gray-300" v-if="order?.trx">{{ moment(order?.trx?.created_at)?.format('lll') }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-medium text-gray-900 dark:text-white">Total Amount:</span>
            <span class="text-gray-700 dark:text-gray-300" v-if="order?.trx">{{ order?.trx?.amount }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-medium text-gray-900 dark:text-white">Payment By:</span>
            <span class="text-gray-700 dark:text-gray-300" v-if="order?.trx">{{ order?.trx?.order?.payment_method }}</span>
          </div>
          <hr class="my-4 border-gray-200 dark:border-gray-700" />
          <div class="flex justify-between">
            <span class="font-medium text-gray-900 dark:text-white">Email:</span>
            <span class="text-gray-700 dark:text-gray-300">sophia@example.com</span>
          </div>
          <div class="flex justify-between">
            <span class="font-medium text-gray-900 dark:text-white">Phone:</span>
            <span class="text-gray-700 dark:text-gray-300">+1 123 456 7890</span>
          </div>
        </div>

        <!-- View Button -->
        <div class="mt-6 flex gap-3 lg:justify-around">
          <NuxtLink to="/" class="flex-1 bg-primary-600 text-sm hover:bg-primary-500 text-white font-semibold rounded-lg px-4 py-2 transition-colors">
            Explore More
          </NuxtLink>
          <NuxtLink to="/student/dashboard" class="flex-1 text-sm border border-secondary-500 text-primary-500  hover:bg-primary-500 hover:text-white font-semibold rounded-lg px-4 py-2 transition-colors">
            View in Account
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
