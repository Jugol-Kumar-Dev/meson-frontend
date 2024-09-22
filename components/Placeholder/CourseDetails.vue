<template>
  <div class="w-full h-full min-h-screen animate-pulse">
    <!-- Course Details Header Placeholder -->
    <div class="bg-white w-full flex items-start shadow-md gap-8 p-5">
      <div class="w-[40%] h-52 bg-gray-300 rounded"></div>
      <div class="flex flex-col gap-2 w-full">
        <div class="h-6 bg-gray-300 rounded w-3/4"></div>
        <div class="h-4 bg-gray-300 rounded w-full"></div>
        <div class="flex items-start gap-6 mt-4">
          <div class="flex-1 flex items-center justify-center flex-col rounded-lg shadow-md min-h-32 bg-gray-200">
            <div class="h-6 bg-gray-300 rounded w-10"></div>
            <p class="font-bold text-sm text-gray-400">Total Exam</p>
          </div>
          <div class="flex-1 flex items-center justify-center flex-col rounded-lg shadow-md min-h-32 bg-gray-200">
            <div class="h-6 bg-gray-300 rounded w-10"></div>
            <p class="font-bold text-sm text-gray-400">Live Class</p>
          </div>
          <div class="flex-1 flex items-center justify-center flex-col rounded-lg shadow-md min-h-32 bg-gray-200">
            <div class="h-6 bg-gray-300 rounded w-10"></div>
            <p class="font-bold text-sm text-gray-400">Course Content</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Instructors Placeholder -->
    <div class="my-5">
      <h2 class="text-lg font-bold mt-7 mb-3 bg-gray-300 h-6 w-1/3"></h2>
      <div class="w-full grid grid-cols-3 gap-8">
        <div class="col-span-1 rounded-lg shadow-md bg-gray-200" v-for="n in 3" :key="n">
          <div class="flex flex-col lg:flex-row items-center gap-3 p-5">
            <div class="w-16 h-16 bg-gray-300 rounded-full"></div>
            <div class="flex flex-col gap-1 w-full">
              <div class="h-4 bg-gray-300 rounded w-3/4"></div>
              <div class="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Course Features Placeholder -->
    <div class="my-5">
      <h2 class="text-xl lg:text-2xl font-bold bg-gray-300 h-6 w-2/3 mx-auto lg:mx-0"></h2>
      <div class="grid grid-cols-3 gap-3 lg:gap-7 mt-5">
        <div class="col-span-1 shadow-md rounded-md bg-gray-200 h-16 p-5" v-for="n in 6" :key="n"></div>
      </div>
    </div>

    <!-- FAQs Placeholder -->
    <div class="my-5">
      <h2 class="text-xl lg:text-2xl font-bold bg-gray-300 h-6 w-2/3 mx-auto lg:mx-0"></h2>
      <div class="border rounded-lg p-4 mt-4 flex flex-col gap-3">
        <div class="bg-gray-200 rounded-md p-4 h-16" v-for="n in 3" :key="n"></div>
      </div>
    </div>
  </div>
</template>