<template>
  <div class="bg-white p-5 mt-4 animate-pulse" v-for="i in 10">
    <div class="card-body">
      <div class="bg-gray-300 h-6 w-48 mb-3 rounded"></div> <!-- Placeholder for question number -->
      <div class="bg-gray-200 h-4 w-full mb-4 rounded"></div> <!-- Placeholder for question title -->
      <hr>
      <ul class="border-0 m-0 p-0 d-flex flex-column gap-4">
        <!-- Placeholder for each answer option -->
        <li class="flex items-center gap-4 p-2 shadow-sm border-0 justify-between rounded-md bg-gray-100 h-8"></li>
        <li class="flex items-center gap-4 p-2 shadow-sm border-0 justify-between rounded-md bg-gray-100 h-8"></li>
        <li class="flex items-center gap-4 p-2 shadow-sm border-0 justify-between rounded-md bg-gray-100 h-8"></li>
        <li class="flex items-center gap-4 p-2 shadow-sm border-0 justify-between rounded-md bg-gray-100 h-8"></li>
      </ul>
      <hr>
      <div class="bg-gray-200 h-4 w-1/3 rounded"></div> <!-- Placeholder for feedback heading -->
      <div class="bg-gray-100 h-16 mt-2 rounded"></div> <!-- Placeholder for feedback content -->
    </div>
  </div>
</template>
<script setup lang="ts">
</script>