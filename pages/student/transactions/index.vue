<script setup>
import moment from "moment";
definePageMeta({
  layout: 'student',
  middleware: ['auth']
})


const {authUser} = useTokenStore()
const {
  data,
  status: status,
  refresh
} = await useLazyAsyncData(`my-transactions-${authUser?.id}`, () => $fetch(`/transactions`, {
  baseURL: useRuntimeConfig().public?.studentAppUrl,
  headers: {
    Authorization: `Bearer ${useTokenStore().token}`,
    accept: "application/json",
  },
}))
</script>


<template>
  <div class="max-w-6xl min-h-screen w-full bg-white shadow-lg rounded-lg p-6">
    <!-- Table Heading -->
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Transactions</h2>

    <!-- Invoice Table -->
    <table class="w-full text-left table-auto">
      <thead>
      <tr class="bg-gray-100 text-gray-800">
        <th class="px-4 py-2">Invoice #</th>
        <th class="px-4 py-2">Date</th>
        <th class="px-4 py-2">Amount</th>
        <th class="px-4 py-2">Status</th>
        <th class="px-4 py-2">Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="trx in data">
        <td class="border px-4 py-2">#{{ trx?.trx }}</td>
        <td class="border px-4 py-2">{{ moment(trx?.created_at).format('DD-MM-YYYY') }}</td>
        <td class="border px-4 py-2">৳ {{ trx?.amount }}</td>
        <td class="border px-4 py-2" :class="trx?.status === 'Pending' ? 'text-orange-500' : 'text-green-600'">
          {{ trx?.status }}
        </td>
        <td class="border px-4 py-2">
          <NuxtLink :to="{name:'student-transactions-id', params:{id:trx?.trx}}" class="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-500 transition duration-200">View
          </NuxtLink>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>