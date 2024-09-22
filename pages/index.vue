<script setup>


import {onMounted} from "vue";

const { data: categories,  status, refresh } = await useLazyAsyncData('hero-categories',
    () =>$fetch(`/hero-categories`, {
  baseURL: useRuntimeConfig().public?.frontendAppUrl,
  headers: {
    accept: "application/json",
  },
}))



const { data: homeCourses,  status:homeCourseStatus, refresh:homeCourseRef } = await useLazyAsyncData('home-page-courses',
    () =>$fetch(`/home-page-courses`, {
      baseURL: useRuntimeConfig().public?.frontendAppUrl,
      headers: {
        accept: "application/json",
      },
    }))

onMounted(async()=>{
  await refresh()
  await homeCourseRef()
})


</script>
<template>

    <!-- MobileNav  -->
     <MobileNav />

    <!-- hero ection -->
    <section class="bg-[url('@/assets/images/background-image.webp')] bg-black bg-cover bg-right py-12">
        <Container v-motion-fade-visible>
            <div class="pt-10 lg:pt-0">
                <h2 class="text-xl lg:text-5xl text-center lg:text-left max-w-2xl font-bold text-white leading-normal">6th-HSC Class
                    Online Batch Admission is Going On!</h2>
                <p class="text-sm lg:text-lg text-center lg:text-left font-medium text-gray-400 py-3">💯 to 💯 preparation of complete syllabus with experienced teachers throughout the year!</p>
            </div>


            <div class="flex flex-wrap py-8">
                <div class="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-3 lg:px-2 py-3 lg:py-0" v-for="cat in categories?.categories" :key="cat.id">
                    <div class="flex flex-col items-center justify-center w-full h-28 cursor-pointer bg-brown-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 27 27"
                             class="w-7 md:w-12">
                          <mask id="mask0_19054_48978" width="27" height="27" x="0"
                                                       y="0" maskUnits="userSpaceOnUse" style="mask-type: alpha;">
                          <path fill="#fff" d="M0.529 0.443H26.674V26.588H0.529z"></path>
                        </mask>
                          <g mask="url(#mask0_19054_48978)">
                            <path fill="#FF9D99" fill-rule="evenodd" d="M13.39 5.854a1.608 1.608 0 100-3.216 1.608 1.608 0 000 3.216zm0 1.378a2.986 2.986 0 100-5.972 2.986 2.986 0 000 5.972z" clip-rule="evenodd"></path>
                            <path fill="#FF9D99" d="M23.242 15.877c.993 0 1.797.805 1.797 1.797v4.001c0 .897-.595 1.62-1.332 1.62a2.261 2.261 0 01-2.261-2.261v-3.36c0-.992.804-1.797 1.796-1.797zM3.957 15.878c-.992 0-1.796.804-1.796 1.797v4c0 .897.594 1.62 1.332 1.62a2.261 2.261 0 002.26-2.26v-3.36c0-.993-.803-1.797-1.796-1.797z"></path>
                            <path fill="#FFC6C6" d="M22.603 9.738v13.696a2.269 2.269 0 01-2.269 2.269H6.864a2.269 2.269 0 01-2.27-2.269V9.738a5.66 5.66 0 015.66-5.66h6.69a5.66 5.66 0 015.659 5.66z"></path><path fill="#A51E35" d="M10.404 19.109v-8.392h1.775v3.462h3.601v-3.462h1.77v8.392h-1.77v-3.467H12.18v3.467h-1.775z"></path>
                          </g>
                        </svg>
                        <p class="text-white font-medium uppercase py-2">{{ cat?.name }} ➜</p>
                    </div>
                </div>
            </div>
            <div class="flex gap-3 items-center justify-center">
                <p class="text-sm lg:text-lg text-gray-400 py-1 hover:text-primary-500">Know More About Online Batch </p>
                <Icon name="material-symbols:keyboard-double-arrow-right" class="text-lg lg:text-2xl text-gray-400" />
            </div>
        </Container>
    </section>
    <!-- skill development -->
    <section class="relative bg-black" v-motion-fade-visible>
        <div class="absolute left-0 bottom-0 w-4/6 h-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="1084" height="677" fill="none" viewBox="0 0 1084 677" class="hidden lg:block z-0 md:max-w-full h-full"><g clip-path="url(#clip0_11631_97147)" opacity="0.2"><g filter="url(#filter0_f_11631_97147)"><ellipse cx="486.541" cy="481.787" fill="#8349FF" rx="324.094" ry="178.867" transform="rotate(-6.481 486.541 481.787)"></ellipse></g><g filter="url(#filter1_f_11631_97147)"><path fill="url(#paint0_linear_11631_97147)" d="M714.294 371.683c29.526-41.833 31.214-73.763 45.947-122.801 28.441-94.659 7.495-156.823 41.298-249.702 68.975-189.515 188.25 407.04 18.598 516.088-106.648 68.552-418.719 84.986-324.641 0 37.572-33.94 73.532-30.356 115.963-57.981 43.791-28.509 72.703-42.914 102.835-85.604z"></path></g><g filter="url(#filter2_f_11631_97147)"><path fill="#0013FF" d="M121.837 400.369C44.269 405.473-6.356 434.105-55.598 500.721c-99.754 134.953 483.072 177.823 401.904 29.562-51.179-93.481-125.391-136.432-224.469-129.914z"></path></g><g filter="url(#filter3_f_11631_97147)"><path fill="#0FF" d="M125.099 437.789c-64.495 4.243-106.589 28.05-147.532 83.44-82.944 112.21 401.663 147.855 334.173 24.58-42.554-77.727-104.26-113.44-186.641-108.02z"></path></g></g><defs><filter id="filter0_f_11631_97147" width="973.528" height="691.169" x="-0.223" y="136.203" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur result="effect1_foregroundBlur_11631_97147" stdDeviation="82.049"></feGaussianBlur></filter><filter id="filter1_f_11631_97147" width="702.442" height="884.235" x="341.302" y="-174.477" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur result="effect1_foregroundBlur_11631_97147" stdDeviation="68.374"></feGaussianBlur></filter><filter id="filter2_f_11631_97147" width="749.407" height="551.89" x="-231.223" y="235.627" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur result="effect1_foregroundBlur_11631_97147" stdDeviation="82.049"></feGaussianBlur></filter><filter id="filter3_f_11631_97147" width="569.024" height="404.794" x="-141.414" y="327.855" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur result="effect1_foregroundBlur_11631_97147" stdDeviation="54.699"></feGaussianBlur></filter><linearGradient id="paint0_linear_11631_97147" x1="772.549" x2="664.791" y1="172.85" y2="485.184" gradientUnits="userSpaceOnUse"><stop stop-color="#FF0095"></stop><stop offset="1" stop-color="#FFCDFF"></stop></linearGradient><clipPath id="clip0_11631_97147"><rect width="1084" height="677" fill="#fff" rx="20"></rect></clipPath></defs></svg>
        </div>

        <div>
            <Container class="">
                <div class="flex flex-col lg:flex-row gap-8 pt-o">
                    <div class="w-full lg:w-1/2 px-4 lg:px-0">
                        <div class="flex gap-5 items-center w-full h-24 cursor-pointer bg-brown-600 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-500">
                            <div class="max-w-32 h-auto pl-4">
                                    <img class="" src="https://cdn.10minuteschool.com/images/HSC_26_Demo_Class_1715858895279.png?w=70&h=70" alt="">
                            </div>
                            <div class="flex items-center justify-between gap-16">
                                <div>
                                    <h1 class="text-white font-medium text-base lg:text-xl">HSC 26 Batch Free Live Class</h1>
                                    <p class="text-white text-xs lg:text-sm ">Free Live Class to Full Month</p>
                                </div>
                                <div class=" gap-1 hidden lg:block">
                                    <p class="text-white text-xs lg:text-sm ">Booking Class</p>
                                    <Icon name="material-symbols:keyboard-double-arrow-right" class="text-xl text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full lg:w-1/2 px-4 lg:px-0">
                        <div class="flex gap-5 items-center w-full h-24 cursor-pointer bg-brown-600 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-500">
                            <div class="max-w-32 h-auto pl-4">
                                <img class="" src="https://cdn.10minuteschool.com/images/OB_(6-9)_Demo_Class_1715858935161.png?w=70&h=70" alt="">
                            </div>
                            <div class="flex items-center justify-between gap-16">
                                <div>
                                    <h1 class="text-white font-medium text-base lg:text-xl">06 - 09 Free Live Class</h1>
                                    <p class="text-white text-xs lg:text-sm ">Free Live Class to Full Month</p>
                                </div>
                                <div class=" gap-1 hidden lg:block">
                                    <p class="text-white text-xs lg:text-sm ">Booking Class</p>
                                    <Icon name="material-symbols:keyboard-double-arrow-right" class="text-xl text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <!-- offer scetion  -->

          <OfferCourses />
            
        </div>
    </section>

    <!-- jorney of organizing  -->
    <section>
        <OrganizedClass />
    </section>

    <!-- blog section -->

    <BlogVideo v-motion-fade-visible />

    <!-- HSC & SSC For student -->

    <HscForStudent v-for="item in homeCourses" :sectionInfo="item"/>

    <!-- Skill Development Course  -->

    <SkillDev />

    <!-- Review Section -->

    <Reviews />

    <!-- Teacher Lecture Sheet -->

    <LectureSheet />

    <!-- Success Admission -->

     <SuccessAdmission />
</template>