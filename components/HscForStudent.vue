<script setup >
import {ref, onMounted} from "vue";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode, Navigation, Thumbs,Pagination,Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
const modules  = [FreeMode, Navigation, Thumbs];


</script>

<template>
    <Container>
        <div class="flex flex-col items-center justify-center py-8 lg:py-20 ">
            <h2 class="text-lg lg:text-5xl leading-normal text-gray-800 font-bold text-center">For SSC And HSC Students</h2>
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
            <SwiperSlide v-for="category in 10" >
                <div class="rounded-md w-full border hover:border-primary transition-all ease-in-out duration-500">
                    <div class="">
                        <img class="w-full h-36 rounded-t-md " src="@/assets/images/banner-2.gif" alt="" />
                    </div>
                    <div class="px-3 py-6">
                        <h2 class="text-sm lg:text-lg font-semibold pb-4">Every Chapter Will Have Practice as Desired</h2>
                        <p class="text-xs lg:text-lg  text-primary-500 font-bold">৳ 3500</p>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
         
    </Container>
</template>