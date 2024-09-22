<script setup>
const {count} = defineProps({count: {type: Number, default: 6}})
</script>

<template>
  <div class="grid grid-cols-2 gap-5">
    <div class="col-span-1 bg-white shadow-lg p-5 animate-pulse" v-for="n in 4" :key="n">
      <!-- Placeholder for Course Name and Chapter Title -->
      <div>
        <div class="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>

      <hr class="my-4">

      <!-- Placeholder for Videos -->
      <div class="mt-10 flex flex-col gap-3">
        <div class="shadow-sm bg-secondary-50 p-3 flex items-center justify-between rounded-lg" v-for="m in 3" :key="m">
          <div>
            <div class="h-5 bg-gray-300 rounded w-2/3 mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div class="flex items-center gap-3">
            <!-- Play Button Placeholder -->
            <div class="w-7 h-7 bg-gray-300 rounded-full"></div>
            <!-- Link Button Placeholder -->
            <div class="w-7 h-7 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>