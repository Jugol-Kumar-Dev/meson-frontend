<script setup>
import {ref, onMounted} from "vue";
import {Swiper, SwiperSlide} from 'swiper/vue';
import {FreeMode, Navigation, Thumbs, Pagination, Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const modules = [FreeMode, Navigation, Thumbs];

defineProps({
  sectionInfo: Object
})

</script>

<template>
  <Container v-motion-fade-visible>
    <div class="flex flex-col items-center justify-center py-8 lg:py-20 ">
      <h2 class="text-lg lg:text-5xl leading-normal text-gray-800 font-bold text-center">
        {{ sectionInfo?.section }}
      </h2>
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
                slidesPerView: 4,
                spaceBetween: 30,
            },
        }"
        :speed="1000"
        :loop="true"
        :allowTouchMove="true"
        :disableOnInteraction="true"
        :navigation="true"
        :modules="modules"
        class="mySwiper"

    >
      <SwiperSlide v-for="course in sectionInfo?.courses">
        <!--                <NuxtLink :to="`/courses/${course.id}`" class="rounded-md w-full border hover:border-primary transition-all ease-in-out duration-500">-->
        <!--                    <div class="">-->
        <!--                        <img class="w-full h-36 rounded-t-md "-->
        <!--                             :src="course?.cover_url" alt="" />-->
        <!--                    </div>-->
        <!--                    <div class="px-3 py-6">-->
        <!--                        <h2 class="text-sm lg:text-lg font-semibold pb-4">-->
        <!--                          {{ course?.name }}-->
        <!--                        </h2>-->
        <!--                        <p class="text-xs lg:text-lg  text-primary-500 font-bold">৳ {{ course?.price }}</p>-->
        <!--                    </div>-->
        <!--                </NuxtLink>-->

        <NuxtLink :to="`/courses/${course.id}`"
                  class="relative block bg-white rounded-lg w-full border-2 border-gray-200 shadow-lg transition-all duration-500 ease-in-out overflow-hidden">
          <!-- Card Background -->
          <div class="absolute inset-0 bg-gradient-to-t from-primary-50 to-transparent pointer-events-none"></div>

          <!-- Course Image -->
          <div class="relative">
            <img
                class="w-full h-40 lg:h-48 object-cover rounded-t-lg transition-transform duration-300 ease-in-out hover:scale-110"
                :src="course?.cover_url" alt="Course cover"/>
            <!-- Course Tag (New or Featured) -->
          </div>

          <!-- Course Content -->
          <div class="px-5 py-6 bg-white rounded-b-lg z-10 relative">
            <!-- Course Title -->
            <h2 class="text-base lg:text-xl font-semibold text-gray-800 leading-tight">
              {{ course?.name }}
            </h2>
            <!-- Course Price -->
            <div class="flex justify-between items-center mt-4">
              <p class="text-sm lg:text-lg text-primary-500 font-bold">
                ৳ {{ course?.price }}
              </p>
              <button
                  class="text-sm lg:text-base text-white bg-primary-500 hover:bg-primary-600 font-medium py-2 px-4 rounded-md transition-all duration-300 ease-in-out">
                Enroll Now
              </button>
            </div>
          </div>
        </NuxtLink>
      </SwiperSlide>
    </Swiper>

  </Container>
</template>