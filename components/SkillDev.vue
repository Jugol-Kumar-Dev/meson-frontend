<script setup>
import {ref, onMounted} from "vue";
import {Swiper, SwiperSlide} from 'swiper/vue';
import {FreeMode, Navigation, Thumbs, Pagination, Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const modules = [FreeMode, Navigation, Thumbs, Autoplay];

const {data, status, refresh} = await useLazyAsyncData('home-second-section-courses',
    () => $fetch(`/home-second-section`, {
      baseURL: useRuntimeConfig().public?.frontendAppUrl,
      headers: {
        accept: "application/json",
      },
    }))

onMounted(() => refresh())


</script>
<template>
  <section class="bg-[url('@/assets/images/banner-3.png')] bg-cover bg-no-repeat w-full h-auto mt-6 lg:mt-24">
    <div class="pt-6 lg:pt-20" v-motion-fade-visible>
      <div class="flex gap-2 items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" fill="none" viewBox="0 0 25 24">
          <g clip-path="url(#clip0_9507_68394)">
            <path fill="#EE7673"
                  d="M10.897 6.54a.704.704 0 00-.658-.34l-5.713.442a1.856 1.856 0 00-1.414.832L.714 11.101A1.28 1.28 0 00.61 12.33c.178.402.543.682.978.75l4.633.717a.702.702 0 00.7-.316l3.964-6.2a.703.703 0 00.01-.74zM17.96 13.603a.703.703 0 00-.74.01l-6.201 3.964a.703.703 0 00-.316.7l.717 4.634A1.28 1.28 0 0012.691 24c.248 0 .494-.072.708-.214l3.627-2.398c.484-.32.787-.835.832-1.414l.441-5.713a.703.703 0 00-.34-.658z"></path>
            <path fill="#FFCD6B"
                  d="M9.542 19.325c.28.28.677.411 1.067.346 5.724-.957 10.254-5.696 11.978-9.03 1.915-3.702 1.986-7.614 1.886-9.449A1.232 1.232 0 0023.309.028c-1.835-.1-5.747-.03-9.449 1.886-3.334 1.724-8.073 6.254-9.03 11.978-.065.39.066.788.345 1.067l4.367 4.366z"></path>
            <path fill="#FDC72E"
                  d="M1.218 19.779a.7.7 0 00.497-.206l2.296-2.296a.703.703 0 00-.995-.994L.721 18.578a.703.703 0 00.497 1.2zM6.114 18.387a.703.703 0 00-.995 0L.706 22.8a.703.703 0 00.994.994l4.414-4.413a.703.703 0 000-.994zM8.219 20.49a.703.703 0 00-.995 0L4.93 22.785a.703.703 0 10.994.994l2.296-2.295a.703.703 0 000-.994z"></path>
            <path fill="#fff"
                  d="M16.94 5.452c-.54 0-1.08.205-1.491.617a2.095 2.095 0 00-.618 1.491 2.112 2.112 0 004.219 0c0-.563-.22-1.093-.618-1.491a2.103 2.103 0 00-1.492-.617z"></path>
          </g>
          <defs>
            <clipPath id="clip0_9507_68394">
              <path fill="#fff" d="M0 0H24V24H0z" transform="translate(.5)"></path>
            </clipPath>
          </defs>
        </svg>
        <p class="text-center text-lg font-medium py-4 text-gray-200">Skills</p>
      </div>
      <div class="flex flex-col items-center justify-center">
        <h2 class="text-xl lg:text-4xl px-3 lg:px-0 lg:max-w-xl leading-normal text-gray-200 font-bold text-center">
          {{ data?.sectionTitle }}
        </h2>
        <div class="flex gap-1 lg:gap-4 items-center px-3 lg:px-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path fill="#6294F8" fill-rule="evenodd"
                  d="M16.295 9.605l-4.568 6a1 1 0 01-.789.395h-.007c-.307 0-.597-.142-.787-.383l-2.432-3.108a1 1 0 111.575-1.232l1.633 2.087 3.784-4.97a1 1 0 011.591 1.211zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
                  clip-rule="evenodd"></path>
            <mask id="mask0_9507_68408" width="20" height="21" x="2" y="2" maskUnits="userSpaceOnUse"
                  style="mask-type: alpha;">
              <path fill="#fff" fill-rule="evenodd"
                    d="M16.295 9.605l-4.568 6a1 1 0 01-.789.395h-.007c-.307 0-.597-.142-.787-.383l-2.432-3.108a1 1 0 111.575-1.232l1.633 2.087 3.784-4.97a1 1 0 011.591 1.211zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
                    clip-rule="evenodd"></path>
            </mask>
            <g mask="url(#mask0_9507_68408)">
              <path fill="#6294F8" d="M0 0H24V24H0z"></path>
            </g>
          </svg>
          <p class="text-center text-xs lg:text-base font-medium py-4 text-gray-300">The Best Teacher in the Country</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path fill="#6294F8" fill-rule="evenodd"
                  d="M16.295 9.605l-4.568 6a1 1 0 01-.789.395h-.007c-.307 0-.597-.142-.787-.383l-2.432-3.108a1 1 0 111.575-1.232l1.633 2.087 3.784-4.97a1 1 0 011.591 1.211zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
                  clip-rule="evenodd"></path>
            <mask id="mask0_9507_68408" width="20" height="21" x="2" y="2" maskUnits="userSpaceOnUse"
                  style="mask-type: alpha;">
              <path fill="#fff" fill-rule="evenodd"
                    d="M16.295 9.605l-4.568 6a1 1 0 01-.789.395h-.007c-.307 0-.597-.142-.787-.383l-2.432-3.108a1 1 0 111.575-1.232l1.633 2.087 3.784-4.97a1 1 0 011.591 1.211zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
                    clip-rule="evenodd"></path>
            </mask>
            <g mask="url(#mask0_9507_68408)">
              <path fill="#6294F8" d="M0 0H24V24H0z"></path>
            </g>
          </svg>
          <p class="text-center text-xs lg:text-base font-medium py-4 text-gray-300">5 Lakh+ Students</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path fill="#6294F8" fill-rule="evenodd"
                  d="M16.295 9.605l-4.568 6a1 1 0 01-.789.395h-.007c-.307 0-.597-.142-.787-.383l-2.432-3.108a1 1 0 111.575-1.232l1.633 2.087 3.784-4.97a1 1 0 011.591 1.211zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
                  clip-rule="evenodd"></path>
            <mask id="mask0_9507_68408" width="20" height="21" x="2" y="2" maskUnits="userSpaceOnUse"
                  style="mask-type: alpha;">
              <path fill="#fff" fill-rule="evenodd"
                    d="M16.295 9.605l-4.568 6a1 1 0 01-.789.395h-.007c-.307 0-.597-.142-.787-.383l-2.432-3.108a1 1 0 111.575-1.232l1.633 2.087 3.784-4.97a1 1 0 011.591 1.211zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
                    clip-rule="evenodd"></path>
            </mask>
            <g mask="url(#mask0_9507_68408)">
              <path fill="#6294F8" d="M0 0H24V24H0z"></path>
            </g>
          </svg>
          <p class="text-center text-xs lg:text-base font-medium py-4 text-gray-300">70+ Online Course</p>
        </div>
        <div class="w-full max-w-[1300px] mx-auto">
          <Swiper
              :breakpoints="{
                            '300': {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            '768': {
                                slidesPerView: 3,
                                spaceBetween: 10,
                            },
                            '1024': {
                                slidesPerView: 5,
                                spaceBetween: 25,
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
            <SwiperSlide v-for="category in data?.categories">
              <NuxtLink :to="{path:'/courses', query:{category:category?.id}}"
                        class="flex flex-col items-center justify-center w-full p-3 lg:p-0 lg:h-28 cursor-pointer bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-400 my-12">
                <h2 class="text-lg lg:text-xl font-medium text-white">
                  {{ category?.name }}
                </h2>
                <p class="text-gray-400 font-medium text-xs lg:text-sm py-2">{{ category?.courses_count }} Courses ➜</p>
              </NuxtLink>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <Container>
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
          <SwiperSlide v-for="course in data?.courses">
            <NuxtLink :to="`/courses/${course.id}`"
                      class="rounded-md w-full hover:border-primary transition-all ease-in-out duration-500">
              <div class="">
                <img class="w-full h-36 rounded-t-md "
                     :src="course?.cover_url" alt=""/>
              </div>
              <div class="px-3 py-6 bg-white">
                <h2 class="text-sm lg:text-lg font-semibold pb-4">
                  {{ course?.name }}
                </h2>
                <p class="text-xs lg:text-lg  text-primary-500 font-bold">৳ {{ course?.price }}</p>
              </div>
            </NuxtLink>
          </SwiperSlide>
        </Swiper>

        <div class="flex justify-center">
          <NuxtLink to="/courses"
                    class="flex items-center gap-3 my-9 lg:my-16 rounded bg-white text-primary-500 px-4 py-2 text-lg font-semibold">
            All Coures
            <Icon name="material-symbols:arrow-forward-ios-rounded" class="text-xl text-primary-500"/>
          </NuxtLink>
        </div>
      </Container>
    </div>
  </section>

</template>