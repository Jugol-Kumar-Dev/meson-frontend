<script setup lang="ts">
definePageMeta({
  layout: 'student',
  middleware: ['auth']
})
</script>


<template>
  <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
    <div class="flex justify-between">
      <div>
        <!-- Timer and Submit -->
        <div class="flex justify-between items-center mb-6">
          <div class="flex items-center gap-2">
            <Icon name="solar:clock-circle-line-duotone"/>
            <p class="font-semibold text-lg">Time remaining: 14:44:00</p>
          </div>
          <button class="bg-green-500 text-white px-4 py-2 rounded">Submit</button>
        </div>

        <!-- Question and Answer -->
        <div class="mb-6">
          <p class="font-semibold text-lg mb-4">Question 1 of 10</p>
          <p class="text-gray-600 mb-4">Which of the following is a popular programming language for developing multimedia
            webpages?</p>
          <div class="grid grid-cols-2 gap-4">
            <button class="border p-3 rounded">A. COBOL</button>
            <button class="border p-3 rounded">B. COBOL</button>
            <button class="border p-3 rounded">C. COBOL</button>
            <button class="border p-3 rounded">D. COBOL</button>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-between">
          <button class="bg-gray-300 text-gray-600 px-4 py-2 rounded">Prev</button>
          <button class="bg-gray-300 text-gray-600 px-4 py-2 rounded">Next</button>
        </div>
      </div>
      <div>
        <svg class="progress-circle" width="100" height="100" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
          <path
              class="circle-bg"
              d="M18 2.0845
       a 15.9155 15.9155 0 0 1 0 31.831
       a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e6e6e6"
              stroke-width="2.5"
          />
          <path
              class="circle"
              stroke-dasharray="90, 100"
              d="M18 2.0845
       a 15.9155 15.9155 0 0 1 0 31.831
       a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#4caf50"
              stroke-width="2.5"
              stroke-linecap="round"
          />
          <text x="18" y="20.35" class="percentage" fill="#4caf50" font-size="0.5em" text-anchor="middle" alignment-baseline="middle">9/10</text>
        </svg>
      </div>
    </div>
  </div>
</template>