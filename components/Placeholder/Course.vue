<script setup>
const {count} = defineProps({count: {type: Number, default: 10}})
</script>

<template>

  <div class="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-5">
    <div class="col-span-1 bg-white rounded-md overflow-hidden shadow-lg animate-pulse" v-for="n in count" :key="n">
      <!-- Image Placeholder -->
      <div class="h-32 bg-gray-300"></div>

      <!-- Text Placeholder -->
      <div class="p-4">
        <div class="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      </div>
    </div>
  </div>
</template>