<script setup>
const route = useRoute();
const {data: course, refresh, status} = await useLazyAsyncData(`single-course-${route?.params?.id}`, () =>
        $fetch(`/get-single-course/${route?.params?.id}`, {
          baseURL: useRuntimeConfig().public?.frontendAppUrl,
          headers: {
            accept: "application/json",
          },
        }),
    {
      immediate: true,
    }
);


const frequentlyAskQuestion = computed(() => course.value?.course?.faqs ? JSON.parse(course.value?.course?.faqs) : [])
const features = computed(() => course?.course?.features ? JSON.parse(course?.course?.features) : [])
// const includes = computed(()=> course?.course?.inclues ? JSON.parse(course?.course?.inclues) : [])
const settings = inject('profileSettings')
</script>


<template>
  <section class="relative bg-[url('@/assets/images/banner-3.png')] bg-no-repeat bg-cover bg-top min-h-[50vh] h-auto">
    <!-- <span class="absolute top-0 left-0 bottom-0 right-0 w-full h-full bg-black/65"></span> -->
    <Container>
      <div v-if="status === 'pending'" class="lg:max-w-2xl pt-10">
        <!-- Skeleton for the heading -->
        <div class="animate-pulse">
          <div class="bg-gray-300 h-10 py-10 lg:h-14 rounded w-3/4 lg:w-full mb-6"></div>
        </div>
        <!-- Skeleton for the paragraph -->
        <div class="animate-pulse">
          <div class="bg-gray-300 h-5 lg:h-6 rounded w-full mb-2"></div>
          <div class="bg-gray-300 h-5 lg:h-6 rounded w-4/5 mb-2"></div>
          <div class="bg-gray-300 h-5 lg:h-6 rounded w-3/5"></div>
        </div>
      </div>
      <div v-else class="lg:max-w-2xl mt-10 lg:mt-0">
        <h2 class="text-xl lg:text-4xl text-center capitalize lg:text-left font-bold text-white py-10 tracking-wider">
          {{ course?.course?.name }}
        </h2>
        <p class="text-sm lg:text-base text-gray-300 pb-3 px-3">
          {{ course?.course?.description }}
        </p>
      </div>
    </Container>
  </section>

  <section class="mb-20">
    <Container>
      <div>

        <div class="flex flex-wrap">
          <div class="w-full lg:w-2/3">

            <div v-if="status === 'pending'" class="animate-pulse">
              <h2 class="text-xl lg:text-4xl font-bold text-center lg:text-left text-gray-300 py-10 tracking-wider">
                Course Instructors
              </h2>
              <div class="flex flex-col lg:flex-row flex-wrap gap-6">
                <!-- Instructor Placeholder -->
                <div v-for="n in 2" :key="n" class="w-full lg:w-1/2 py-3">
                  <div class="flex items-center gap-3">
                    <!-- Skeleton for instructor image -->
                    <div class="w-16 h-16 bg-gray-300 rounded-full"></div>
                    <!-- Skeleton for instructor info -->
                    <div class="flex flex-col gap-2">
                      <div class="w-3/4 h-4 bg-gray-300 rounded"></div>
                      <div class="w-1/2 h-4 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else v-if="course?.course?.instractors !== 'null' && course?.course?.instractors?.length">
              <h2 class="text-xl lg:text-4xl font-bold text-center lg:text-left text-gray-600 py-10 tracking-wider">
                Course
                Instructors</h2>
              <div v-if="course?.course?.instractors?.length" class="flex flex-col lg:flex-row flex-wrap">
                <div class="w-full lg:w-1/2 py-3" v-for="item in course?.course?.instractors">
                  <div class="flex items-center gap-3">
                    <img class="border-2 p-0.5 lg:p-1 w-16  h-16 border-primary rounded-full"
                         :src="item?.photo_url"
                         @error="$event.target.src=`https://ui-avatars.com/api/?background=ffffff&color=000000&name=${item.name}`"
                         :alt="item.name">
                    <div class="text-sm lg:text-base text-center lg:text-left font-medium">
                      <p>{{ item?.name }}</p>
                      <p>{{ item?.about }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="status === 'pending'" class="animate-pulse">
              <!-- Heading Placeholder -->
              <h2 class="text-xl lg:text-2xl font-bold text-center lg:text-left px-5 lg:px-0 text-gray-300 py-10 tracking-wide">
                What You Will Learn By Doing The Course
              </h2>

              <!-- Feature List Placeholder -->
              <ul class="flex flex-wrap gap-3 lg:gap-7 px-5 lg:px-0">
                <li v-for="n in 5" :key="n" class="flex gap-1">
                  <!-- Skeleton for Icon -->
                  <div class="w-6 h-6 bg-gray-300 rounded"></div>

                  <!-- Skeleton for Feature Text -->
                  <div class="w-40 lg:w-60 h-4 bg-gray-300 rounded"></div>
                </li>
              </ul>
            </div>
            <div v-else v-if="course?.course?.features?.length">
              <h2 class="text-xl lg:text-2xl font-bold text-center lg:text-left px-5 lg:px-0 text-gray-600 py-10 tracking-wide">
                What You Will Learn By Doing The Course</h2>
              <div v-if="course?.course?.features?.length">
                <ul class="flex flex-wrap gap-3 lg:gap-7 px-5 lg:px-0">
                  <li class="flex gap-1" v-for="item in course?.course?.features">
                    <Icon name="material-symbols:check" class="text-blue-300" size="30"/>
                    <p class="max-w-xs text-sm lg:text-base">{{ item?.title }}</p>
                  </li>
                </ul>
              </div>
            </div>
            <div v-if="status === 'pending'" class="animate-pulse">
              <!-- Heading Placeholder -->
              <h2 class="text-xl lg:text-2xl font-bold text-center lg:text-left px-5 lg:px-0 text-gray-300 py-10 tracking-wide">
                Course Content
              </h2>

              <!-- Chapters Placeholder -->
              <div class="border rounded-lg p-4 flex flex-col gap-3">
                <div v-for="n in 3" :key="n" class="flex flex-col gap-3">
                  <!-- Chapter Title Placeholder -->
                  <div class="w-3/4 h-5 bg-gray-300 rounded"></div>

                  <!-- Videos List Placeholder -->
                  <ul class="flex flex-col gap-3">
                    <li v-for="v in 3" :key="v" class="flex items-center gap-4">
                      <!-- Skeleton for Video Icon -->
                      <div class="flex items-center justify-center w-7 h-7 bg-gray-300 rounded-full"></div>

                      <!-- Skeleton for Video Title -->
                      <div class="w-48 h-4 bg-gray-300 rounded"></div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div v-else v-if="course?.course?.chapters?.length">
              <h2 class="text-xl lg:text-2xl font-bold text-center lg:text-left px-5 lg:px-0 text-gray-600 py-10 tracking-wide">
                Course Content
              </h2>

              <div class="border rounded-lg p-4 flex flex-col gap-3" v-if="course?.course?.chapters?.length">
                <Acordion :title="chap?.chapter_title" v-for="chap in course?.course?.chapters">
                  <ul class="flex flex-col gap-3">
                    <li v-for="video in chap?.videos">
                      <div class="flex items-center gap-4">
                        <div class="flex items-center justify-center w-7 h-7 bg-primary-500 rounded-full text-white">
                          <Icon name="material-symbols:lock" size="16"/>
                        </div>
                        <p class="font-semibold">{{ video?.name }}</p>
                      </div>
                    </li>
                  </ul>
                </Acordion>
              </div>
            </div>

            <div v-if="status === 'pending'" class="animate-pulse">
              <!-- Heading Placeholder -->
              <h2 class="text-xl lg:text-2xl font-bold text-center lg:text-left px-5 lg:px-0 text-gray-300 py-10 tracking-wide">
                Frequently Asked Questions
              </h2>

              <!-- FAQ List Placeholder -->
              <div class="border rounded-lg p-4 flex flex-col gap-3">
                <!-- Skeleton for FAQs -->
                <div v-for="n in 3" :key="n" class="flex flex-col gap-3">
                  <!-- Question Placeholder -->
                  <div class="w-3/4 h-5 bg-gray-300 rounded"></div>

                  <!-- Answer Placeholder -->
                  <div class="w-full h-4 bg-gray-300 rounded"></div>
                  <div class="w-5/6 h-4 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
            <div v-else v-if="course?.course?.faqs?.length">
              <h2 class="text-xl lg:text-2xl font-bold text-center lg:text-left px-5 lg:px-0 text-gray-600 py-10 tracking-wide">
                Frequently Ask Questions
              </h2>
              <div class="border rounded-lg p-4 flex flex-col gap-3" v-if="course?.course?.faqs?.length">
                <Acordion :title="ques?.question" v-for="ques in course?.course?.faqs">
                  <p>
                    {{ ques?.answer }}
                  </p>
                </Acordion>
              </div>
            </div>
          </div>

          <div v-if="status === 'success'" class="w-full lg:w-1/3 px-2 order-first lg:order-none pt-8">
            <div class="bg-white lg:-mt-[300px] relative z-40 ">
              <img class="p-1 w-full"
                   :src="course?.course?.cover_url" alt="">
              <p class="text-2xl font-semibold p-3">৳ {{ course?.course?.price }}</p>
              <div class="mx-5">
                <NuxtLink :to="`/admission/${course?.course?.id}`"
                          class="flex items-center justify-center gap-3 w-full rounded bg-primary-500 hover:bg-purple-900 text-white px-4 py-2 text-lg font-semibold">
                  Enroll Now
                </NuxtLink>
              </div>

              <h2 class="text-xl font-semibold p-3 mt-5">What is in this course</h2>
              <div class="px-4 py-2 bg-[#fac252] text-white rounded-lg">
                <p class="text-xl text-black font-bold">Total Enrolled: {{ course?.course?.orders_count }} Students</p>
              </div>
              <div class="px-4 py-2 bg-[#fac252] text-white rounded-lg mt-2"
                   v-if="course?.course?.access_time && course?.course?.access_type">
                <p class="text-xl text-black font-bold">Access Time: {{ course?.course?.access_time }}
                  {{ course?.course?.access_type }}</p>
              </div>

              <ul class="p-3 leading-loose text-gray-600 pl-6"
                  v-if=" course?.course?.inclues?.length">
                <li class="flex items-center gap-5" v-for="item in course?.course?.inclues">
                  <span><Icon :name="item?.icon" class="text-lg"/></span>
                  <p>{{ item?.title }}</p>
                </li>
              </ul>

              <div class="text-sm flex justify-between py-5 px-3">
                <p class="text-gray-400">For details about the course</p>
                <p class="flex items-center gap-1 text-primary-500 font-semibold">
                  <span class=""><Icon name="material-symbols:call-outline" class=""/></span>
                  Call <a :href="`tel:${settings?.profile?.phone}`">{{ settings?.profile?.phone }}</a>
                </p>
              </div>
            </div>
          </div>
          <FrontendEnrollArea v-else/>
        </div>
      </div>
    </Container>
  </section>
</template>