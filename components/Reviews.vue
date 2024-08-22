<script setup >
import {ref, onMounted} from "vue";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode, Navigation, Thumbs,Pagination,Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
const modules  = [FreeMode, Navigation, Thumbs,Autoplay];

</script>

<template>
    <Container>
        <div class=" py-20 ">
            <h2 class="text-4xl max-w-3xl mx-auto leading-normal text-gray-800 font-bold text-center">
                Why We Are The First Choice of Students And Parents?
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
                    slidesPerView: 3,
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
                    <div class="relative border border-gray-300 my-12 h-auto">
                        <span class="absolute -top-4 left-5 flex h-10 w-10 flex-row items-center justify-center rounded-full bg-[#FCE0D6] p-2 z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 20 30"><path fill="#D33242" d="M10.699 10.753c1.019-1.82 2.871-3.777 6.021-5.642.88-.5 1.436-1.41 1.436-2.366 0-1.957-2.038-3.322-3.89-2.503C8.938 2.562 0 8.342 0 20.308 0 25.677 4.4 30 9.819 30c5.419 0 9.865-4.323 9.865-9.692 0-5.005-3.937-9.1-8.985-9.555z"></path></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 20 30"><path fill="#D33242" d="M10.699 10.753c1.019-1.82 2.871-3.777 6.021-5.642.88-.5 1.436-1.41 1.436-2.366 0-1.957-2.038-3.322-3.89-2.503C8.938 2.562 0 8.342 0 20.308 0 25.677 4.4 30 9.819 30c5.419 0 9.865-4.323 9.865-9.692 0-5.005-3.937-9.1-8.985-9.555z"></path></svg>
                        </span>
                        <div class="px-6 pt-12 pb-4">
                            <p class="text-base text-gray-600 pb-4">
                                Each section of the course had clear instructions. Especially, the “Reading” and “Writing” sections were so informative which made the Mock Test and Real Exam easy for me. I like the “Writing Part” the most.
                            </p>

                            <h3 class="text-base font-medium  text-gray-800">Zakirul Islam</h3>
                            <p class="text-sm font-medium  text-gray-400">Businessman</p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
    </Container>
</template>