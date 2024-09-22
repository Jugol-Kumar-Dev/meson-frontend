<script setup>
const {count} = defineProps({count: {type: Number, default: 10}})
</script>

<template>
  <div class="flex flex-col gap-5">
    <!-- Placeholder Item -->
    <div class="bg-white flex items-center justify-between shadow-lg p-5 animate-pulse" v-for="n in count" :key="n">
      <!-- Exam Name and Course -->
      <div class="flex-1">
        <div class="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div class="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>

      <!-- Time (Start/End) -->
      <div class="flex items-center gap-2 flex-1">
        <div class="h-12 w-12 bg-gray-300 rounded-full"></div>
        <div class="flex flex-col gap-2 w-full">
          <div class="flex items-center gap-2">
            <div class="h-4 bg-gray-300 rounded w-2/3"></div>
            <div class="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
          <hr>
          <div class="flex items-center gap-2">
            <div class="h-4 bg-gray-300 rounded w-2/3"></div>
            <div class="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>

      <!-- Status Icon -->
      <div class="flex-1">
        <div class="h-6 w-6 bg-gray-300 rounded-full"></div>
      </div>

      <!-- Action Button -->
      <div class="flex-1">
        <div class="h-10 bg-gray-300 rounded-full w-28 ml-auto"></div>
      </div>
    </div>
  </div>

</template>