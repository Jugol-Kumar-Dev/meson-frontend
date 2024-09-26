<script setup>
import moment from 'moment'
definePageMeta({
  layout:'student',
  middleware:['auth']
})


const {authUser} = useTokenStore()
const {
  data,
  status: status,
  refresh
} = await useLazyAsyncData(`my-transactions-${authUser?.id}-single-${useRoute()?.params?.id}`, () => $fetch(`/transactions/${useRoute()?.params?.id}`, {
  baseURL: useRuntimeConfig().public?.studentAppUrl,
  headers: {
    Authorization: `Bearer ${useTokenStore().token}`,
    accept: "application/json",
  },
}))
</script>


<template>
  <div class="min-h-screen flex items-center justify-center my-16">
    <div class="w-full max-w-3xl bg-white shadow-md rounded-lg overflow-hidden">
      <!-- Invoice Body -->
      <div class="p-6">
        <!-- Transaction Details -->
        <div class="grid grid-cols-2 justify-between gap-6 mb-6">
          <div>
            <h3 class="text-lg font-bold text-gray-700">Billing Details</h3>
            <p class="text-gray-600">{{ data?.user?.name }}</p>
            <p class="text-gray-600">{{ data?.user?.email }}</p>
            <p class="text-gray-600">{{ data?.user?.phone }}</p>
          </div>
          <div class="text-right">
            <h3 class="text-lg font-bold text-gray-700 mt-4">Invoice</h3>
            <p class="text-gray-600">Trx_ID: # {{ data?.trx }}</p>
            <h3 class="text-lg font-bold text-gray-700">Invoice Date</h3>
            <p class="text-gray-600">{{ moment(data?.created_at)?.format('DD-MM-YYYY') }}</p>
          </div>
        </div>

        <!-- Transaction Table -->
        <table class="w-full text-left mb-6">
          <thead>
          <tr class="bg-gray-100">
            <th class="p-3 text-gray-600">Description</th>
            <th class="p-3 text-gray-600 text-right">Price</th>
            <th class="p-3 text-gray-600 text-right">Discount</th>
            <th class="p-3 text-gray-600 text-right">Total</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td class="p-3 border-b">{{ data?.course?.name }}</td>
            <td class="p-3 border-b text-right">৳ {{ data?.order?.total_amount }}</td>
            <td class="p-3 border-b text-right">৳ {{ data?.order?.coupon_discount }}</td>
            <td class="p-3 border-b text-right">৳ {{ parseInt(data?.order?.total_amount) - parseInt(data?.order?.coupon_discount) }}</td>
          </tr>
          </tbody>
        </table>

        <!-- Summary -->
        <div class="flex justify-end">
          <div class="w-full max-w-sm">
            <div class="flex justify-between mb-2">
              <span class="text-gray-700">Subtotal</span>
              <span class="text-gray-700">৳ {{ data?.order?.total_amount }}</span>
            </div>
            <div class="flex justify-between mb-2">
              <span class="text-gray-700">Discount</span>
              <span class="text-gray-700">৳ {{ data?.order?.coupon_discount }}</span>
            </div>
            <div class="flex justify-between font-bold text-gray-800">
              <span>Total</span>
              <span>৳ {{ parseInt(data?.order?.total_amount) - parseInt(data?.order?.coupon_discount)  }}.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>