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
        <div class="flex items-center justify-center h-screen">
            <div class="w-1/2">
                <div class="max-w-sm mx-auto">
                    <h2 class="text-xl font-bold text-gray-600 pb-5">Proceed With Mobile Number/Email</h2>
                        <input type="text" id="table-search-users"
                            class="block border border-primary w-80 p-3 ps-2 text-sm rounded text-primary bg-white placeholder-slate-500 focus:ring-0 focus:border-primary focus:outline-0"
                            placeholder="Phone Number / Email ">
                          
                        <button class="flex items-center justify-center gap-3 my-5 w-80 rounded bg-primary hover:bg-purple-900 text-white px-4 py-2 text-lg font-semibold">
                            Submit
                        </button>
                       
                </div>
            </div>
            <div class="w-1/2">
                <div class="max-w-sm mx-auto">
                    <h2 class="text-xl font-bold text-gray-600 pb-5 text-center">Maintain Study Routine by Attending Daily Live Classes</h2>
                    <Swiper
                            :breakpoints="{
                            '375': {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            '768': {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            '1024': {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                        }"
                            :centeredSlides="true"
                            :speed= "500"
                            :freeMode="true"
                            :freeModeMomentum="false"
                            :freeModeMomentumBounce="false"
                            :grabCursor="true"
                            :autoplay= "{
                            delay:3000,
                            disableOnInteraction: true,
                        }"
                            :loop="true"
                            :allowTouchMove="true"
                            :disableOnInteraction="true"
                            :modules="modules"
                            class="mySwiper"
                        >
                        <SwiperSlide>
                            <img class="w-full h-72 object-cover p-5 rounded-xl" src="https://app.10minuteschool.com/assets/login/routine3.svg" alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img class="w-full object-cover h-72 p-5 rounded-xl" src="https://app.10minuteschool.com/assets/login/routine.svg" alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img class="w-full object-cover h-72 p-5 rounded-xl" src="https://app.10minuteschool.com/assets/login/routine1.svg" alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img class="w-full h-72 object-cover p-5 rounded-xl" src="https://app.10minuteschool.com/assets/login/routine2.svg" alt="" />
                        </SwiperSlide>
                        
                    </Swiper>   
                </div>
            </div>
        </div>
    </Container>
</template>