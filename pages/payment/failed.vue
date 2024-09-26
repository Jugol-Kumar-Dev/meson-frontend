<script setup>
const settings = inject('profileSettings')
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center">
    <!-- Payment failed card -->
    <div class="bg-white rounded-lg shadow-md p-8 max-w-md text-center">
      <div class="flex justify-center mb-4">
        <svg class="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M9.172 9.172a4 4 0 015.656 5.656L9.172 9.172zm2.828 0a4 4 0 01-5.656 5.656l5.656-5.656z"></path></svg>
      </div>
      <h1 class="text-2xl font-bold text-gray-800 mb-2">Payment Failed</h1>
      <p class="text-gray-600 mb-6">Unfortunately, your payment could not be processed. Please try again or contact support for assistance.</p>

      <div class="mt-6">
        <NuxtLink to="/" class="bg-primary-700 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition">
          Home
        </NuxtLink>
      </div>
      <div class="mt-4">
        <p class="font-semibold">Contact Support</p>
        <div class="flex flex-col">
          <a :href="`tel:${settings?.profile?.email}`" class="text-blue-500 hover:underline">{{ settings?.profile?.phone }}</a>
          <a :href="`mailto:${settings?.profile?.email}`" class="text-blue-500 hover:underline">{{ settings?.profile?.email }}</a>
        </div>
      </div>
    </div>
  </div>
</template>