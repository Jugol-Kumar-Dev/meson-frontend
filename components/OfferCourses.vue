<script setup >
import {ref} from "vue";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode, Navigation, Thumbs,Pagination,Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
const modules  = [FreeMode, Navigation, Thumbs,Autoplay];


const { data: courses,  status:courseStatus, refresh:courseRefresh } = await useLazyAsyncData('hero-courses', () =>$fetch(`/hero-courses`, {
  baseURL: useRuntimeConfig().public?.frontendAppUrl,
  headers: {
    accept: "application/json",
  },
}))

onMounted(()=> courseRefresh())

</script>

<template><Container>
  <div class="pt-12">
    <h2 class="text-lg lg:text-4xl text-center lg:text-left font-bold text-white py-5 tracking-wider">
      Great Discounts On Select Skill Development Courses!
    </h2>
    <p class="text-xs lg:text-lg text-center lg:text-left font-medium text-gray-400">
      Get selected Ten Minute School courses at special prices throughout the month. Start learning now with Ten Minute School!
    </p>
  </div>
  <Swiper
      :breakpoints="{
      '375': {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      '768': {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      '1024': {
        slidesPerView: 5,
        spaceBetween: 30,
      },
    }"
      :centeredSlides="true"
      :speed="3000"
      :freeMode="true"
      :freeModeMomentum="false"
      :freeModeMomentumBounce="false"
      :grabCursor="true"
      :autoplay="{
      delay: 0,
      disableOnInteraction: true,
    }"
      :loop="true"
      :allowTouchMove="true"
      :disableOnInteraction="true"
      :modules="modules"
      class="mySwiper"
  >
    <SwiperSlide v-for="course in courses?.courses" :key="course.id">
      <NuxtLink :to="`/courses/${course.id}`" class="flex gap-3 pt-8 pb-10 lg:pb-20">
        <div class="flex flex-col h-full bg-white rounded-xl overflow-hidden">
          <img
              class="w-full h-auto"
              :src="course?.cover_url"
              @error="$event.target.src='@/assets/images/photo-2.jpg'"
              alt=""
          />
        </div>
      </NuxtLink>
    </SwiperSlide>
  </Swiper>
</Container>

</template>