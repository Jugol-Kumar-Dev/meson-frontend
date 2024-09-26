<template>
  <NuxtLink :to="`/courses/${course.id}`" class="flex gap-3 pt-8 pb-10 lg:pb-20">
    <div class="flex flex-col h-full bg-white rounded-t-xl overflow-hidden">
      <img
          class="w-full h-auto"
          :src="course?.cover_url"
          @error="$event.target.src='@/assets/images/photo-2.jpg'"
          alt=""
      />
      <div class="flex-grow flex flex-col items-center justify-center py-2">
        <p class="font-bold text-primary-500 uppercase">
          {{ course?.name }}
        </p>
        <p class="text-xl font-bold">{{ course?.price }}</p>
      </div>
    </div>
  </NuxtLink>
</template>
<script setup lang="ts">
const {course} = defineProps({course:Object})
</script>