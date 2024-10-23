<script setup>
import {onMounted} from "vue";

const {isLogin} = useTokenStore()

// definePageMeta({
//   layout: isLogin ? 'authfront' : 'default'
// })

// Fetch categories
const {data: categories, refresh} = await useLazyAsyncData('hero-categories', () =>
        $fetch(`/hero-categories`, {
          baseURL: useRuntimeConfig().public?.frontendAppUrl,
          headers: {accept: "application/json"}
        }),
        {
          immediate: true,
        }
);
// Fetch home courses
const {data: homeCourses, refresh: homeCourseRef} = await useLazyAsyncData('home-page-courses', () =>
        $fetch(`/home-page-courses`, {
          baseURL: useRuntimeConfig().public?.frontendAppUrl,
          headers: {accept: "application/json"}
        }),
    {
      immediate: true,
    }
);


</script>
<template>
  <!-- hero section -->
  <section id="home"
           class="relative bg-[url('@/assets/images/image.png')] bg-black bg-cover bg-right py-16 lg:py-24">
    <!-- Background overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>

    <Container v-motion-fade-visible class="relative z-10">
      <!-- Hero Text -->
      <div class="pt-10 lg:pt-0 text-center lg:text-left">
        <h2 class="text-2xl lg:text-5xl font-bold text-white leading-snug max-w-3xl mx-auto lg:mx-0">
          6th-HSC Class Online Batch Admission is Going On!
        </h2>
        <p class="text-sm lg:text-lg text-gray-400 font-medium mt-4 max-w-xl mx-auto lg:mx-0">
          💯 Comprehensive syllabus preparation with experienced teachers throughout the year!
        </p>
      </div>

      <!-- Categories Section -->
      <div class="grid grid-cols-2 lg:grid-cols-6 gap-6 py-10">
        <NuxtLink :to="{path:'/courses', query:{category:cat?.id}}"
            class="col-span-1"
            v-for="cat in categories?.categories"
            :key="cat.id"
        >
          <div
              class="flex flex-col items-center justify-center w-full h-32 cursor-pointer bg-white bg-opacity-10 rounded-md backdrop-blur-md border border-b-4 border-gray-500 shadow-lg hover:border-b hover:bg-opacity-20 transition-all ease-in-out"
          >
            <img :src="cat?.photo_url" alt="" class="w-12 h-12 object-contain mb-2">
            <p class="text-white text-sm lg:text-md font-semibold uppercase tracking-wide">
              {{ cat?.name }} ➜
            </p>
          </div>
        </NuxtLink>
      </div>

      <!-- Optional Call-to-Action Button -->
      <div class="text-center lg:text-left mt-8">
        <NuxtLink to="/courses"
                  class="inline-block px-8 py-3 bg-primary text-white font-bold rounded-lg shadow-lg hover:bg-opacity-90 transition-all">
          Know More About Courses
        </NuxtLink>
      </div>
    </Container>
  </section>


  <section class="relative bg-black overflow-hidden" v-motion-fade-visible>
    <div
        class="absolute w-80 h-60 bg-gradient-to-br from-red-400/20 rounded-full to-transparent blur-2xl -bottom-5 -left-4"/>


    <div class="absolute right-0 overflow-hidden">
      <svg xmlns="http://www.w3.org/2000/svg" width="1084" height="677" fill="none" viewBox="0 0 1084 677"
           class="hidden lg:block z-0 md:max-w-full h-full">
        <g clip-path="url(#clip0_11631_97147)" opacity="0.2">
          <g filter="url(#filter0_f_11631_97147)">
            <ellipse cx="486.541" cy="481.787" fill="#8349FF" rx="324.094" ry="178.867"
                     transform="rotate(-6.481 486.541 481.787)"></ellipse>
          </g>
          <g filter="url(#filter1_f_11631_97147)">
            <path fill="url(#paint0_linear_11631_97147)"
                  d="M714.294 371.683c29.526-41.833 31.214-73.763 45.947-122.801 28.441-94.659 7.495-156.823 41.298-249.702 68.975-189.515 188.25 407.04 18.598 516.088-106.648 68.552-418.719 84.986-324.641 0 37.572-33.94 73.532-30.356 115.963-57.981 43.791-28.509 72.703-42.914 102.835-85.604z"></path>
          </g>
          <g filter="url(#filter2_f_11631_97147)">
            <path fill="#0013FF"
                  d="M121.837 400.369C44.269 405.473-6.356 434.105-55.598 500.721c-99.754 134.953 483.072 177.823 401.904 29.562-51.179-93.481-125.391-136.432-224.469-129.914z"></path>
          </g>
          <g filter="url(#filter3_f_11631_97147)">
            <path fill="#0FF"
                  d="M125.099 437.789c-64.495 4.243-106.589 28.05-147.532 83.44-82.944 112.21 401.663 147.855 334.173 24.58-42.554-77.727-104.26-113.44-186.641-108.02z"></path>
          </g>
        </g>
        <defs>
          <filter id="filter0_f_11631_97147" width="973.528" height="691.169" x="-0.223" y="136.203"
                  color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
            <feGaussianBlur result="effect1_foregroundBlur_11631_97147" stdDeviation="82.049"></feGaussianBlur>
          </filter>
          <filter id="filter1_f_11631_97147" width="702.442" height="884.235" x="341.302" y="-174.477"
                  color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
            <feGaussianBlur result="effect1_foregroundBlur_11631_97147" stdDeviation="68.374"></feGaussianBlur>
          </filter>
          <filter id="filter2_f_11631_97147" width="749.407" height="551.89" x="-231.223" y="235.627"
                  color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
            <feGaussianBlur result="effect1_foregroundBlur_11631_97147" stdDeviation="82.049"></feGaussianBlur>
          </filter>
          <filter id="filter3_f_11631_97147" width="569.024" height="404.794" x="-141.414" y="327.855"
                  color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
            <feGaussianBlur result="effect1_foregroundBlur_11631_97147" stdDeviation="54.699"></feGaussianBlur>
          </filter>
          <linearGradient id="paint0_linear_11631_97147" x1="772.549" x2="664.791" y1="172.85" y2="485.184"
                          gradientUnits="userSpaceOnUse">
            <stop stop-color="#FF0095"></stop>
            <stop offset="1" stop-color="#FFCDFF"></stop>
          </linearGradient>
          <clipPath id="clip0_11631_97147">
            <rect width="1084" height="677" fill="#fff" rx="20"></rect>
          </clipPath>
        </defs>
      </svg>
    </div>
    <div>
      <!--
            <Container class="">
              <div class="flex flex-col lg:flex-row gap-8 pt-o">
                <div class="w-full lg:w-1/2 px-4 lg:px-0">
                  <div
                      class="flex gap-5 items-center w-full h-24 cursor-pointer bg-brown-600 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-500">
                    <div class="max-w-32 h-auto pl-4">
                      <img class="" src="https://cdn.10minuteschool.com/images/HSC_26_Demo_Class_1715858895279.png?w=70&h=70"
                           alt="">
                    </div>
                    <div class="flex items-center justify-between gap-16">
                      <div>
                        <h1 class="text-white font-medium text-base lg:text-xl">HSC 26 Batch Free Live Class</h1>
                        <p class="text-white text-xs lg:text-sm ">Free Live Class to Full Month</p>
                      </div>
                      <div class=" gap-1 hidden lg:block">
                        <p class="text-white text-xs lg:text-sm ">Booking Class</p>
                        <Icon name="material-symbols:keyboard-double-arrow-right" class="text-xl text-gray-400"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="w-full lg:w-1/2 px-4 lg:px-0">
                  <div
                      class="flex gap-5 items-center w-full h-24 cursor-pointer bg-brown-600 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-500">
                    <div class="max-w-32 h-auto pl-4">
                      <img class=""
                           src="https://cdn.10minuteschool.com/images/OB_(6-9)_Demo_Class_1715858935161.png?w=70&h=70" alt="">
                    </div>
                    <div class="flex items-center justify-between gap-16">
                      <div>
                        <h1 class="text-white font-medium text-base lg:text-xl">06 - 09 Free Live Class</h1>
                        <p class="text-white text-xs lg:text-sm ">Free Live Class to Full Month</p>
                      </div>
                      <div class=" gap-1 hidden lg:block">
                        <p class="text-white text-xs lg:text-sm ">Booking Class</p>
                        <Icon name="material-symbols:keyboard-double-arrow-right" class="text-xl text-gray-400"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
      -->

      <!-- offer scetion  -->

      <OfferCourses/>

    </div>
  </section>


  <!-- jorney of organizing  -->
  <section>
    <OrganizedClass/>
  </section>

  <!-- blog section -->

  <BlogVideo v-motion-fade-visible/>

  <!-- HSC & SSC For student -->

  <HscForStudent v-for="item in homeCourses" :sectionInfo="item"/>

  <!-- Skill Development Course  -->

  <SkillDev/>

  <!-- Review Section -->

  <Reviews/>

  <!-- Teacher Lecture Sheet -->

  <!--  <LectureSheet/>-->

  <!-- Success Admission -->
  <SuccessAdmission/>
</template>