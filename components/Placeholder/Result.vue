<script setup>
const {count} = defineProps({count: {type: Number, default: 10}})
</script>

<template>
  <div class="flex flex-col gap-2">

    <!-- Header (Placeholder) -->
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

    <!-- Placeholder Skeleton -->
    <div v-for="n in count" :key="n"
         class="bg-white shadow-md rounded-lg py-2 px-5 flex-col lg:flex-row flex items-center justify-between gap-2 lg:gap-6 animate-pulse">

      <!-- Exam Name Placeholder -->
      <div class="flex-1">
        <div class="h-6 bg-gray-200 rounded w-3/4"></div>
      </div>

      <!-- Exam Duration and Questions Placeholder -->
      <div class="flex-1 text-center">
        <div class="h-6 bg-gray-200 rounded w-1/3 mx-auto"></div>
        <div class="h-4 bg-gray-200 rounded w-1/4 mx-auto mt-2"></div>
      </div>

      <!-- Given Date Placeholder -->
      <div class="flex-1 text-center flex items-center justify-center gap-2">
        <div class="h-12 w-12 bg-gray-200 rounded-full"></div>
        <div class="flex flex-col gap-2">
          <div class="h-4 bg-gray-200 rounded w-20"></div>
          <div class="h-4 bg-gray-200 rounded w-16"></div>
        </div>
      </div>

      <!-- Action Button Placeholder -->
      <div class="flex-1 text-right">
        <div class="h-10 bg-gray-200 rounded-full w-16 ml-auto"></div>
      </div>
    </div>
  </div>
</template>