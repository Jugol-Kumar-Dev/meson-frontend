<script setup >
import {ref, onMounted} from "vue";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode, Navigation, Thumbs,Pagination,Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
const modules  = [FreeMode, Navigation, Thumbs];

defineProps({
  sectionInfo:Object
})

</script>

<template>
    <Container  v-motion-fade-visible >
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
            :speed= "1000"
            :loop="true"
            :allowTouchMove="true"
            :disableOnInteraction="true"
            :navigation="true"
            :modules="modules"
            class="mySwiper"
            
        >
            <SwiperSlide v-for="course in sectionInfo?.courses" >
                <div class="rounded-md w-full border hover:border-primary transition-all ease-in-out duration-500">
                    <div class="">
                        <img class="w-full h-36 rounded-t-md "
                             :src="course?.cover_url" alt="" />
                    </div>
                    <div class="px-3 py-6">
                        <h2 class="text-sm lg:text-lg font-semibold pb-4">
                          {{ course?.name }}
                        </h2>
                        <p class="text-xs lg:text-lg  text-primary-500 font-bold">৳ {{ course?.price }}</p>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
         
    </Container>
</template>