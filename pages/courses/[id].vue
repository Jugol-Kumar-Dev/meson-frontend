<script setup>
const route = useRoute();
const {data: course, refresh, status} = await useLazyAsyncData(`single-course-${route?.params?.id}`, () =>
    $fetch(`/get-single-course/${route?.params?.id}`, {
      baseURL: useRuntimeConfig().public?.frontendAppUrl,
      headers: {
        accept: "application/json",
      },
    })
);

onMounted(async () => await refresh())

const frequentlyAskQuestion = computed(() => course.value?.course?.faqs ? JSON.parse(course.value?.course?.faqs) : [])
const features = computed(() => course?.course?.features ? JSON.parse(course?.course?.features) : [])
// const includes = computed(()=> course?.course?.inclues ? JSON.parse(course?.course?.inclues) : [])

</script>


<template>
  <section class="relative bg-[url('@/assets/images/banner-3.png')] bg-no-repeat bg-cover bg-top min-h-[50vh] h-auto">
    <!-- <span class="absolute top-0 left-0 bottom-0 right-0 w-full h-full bg-black/65"></span> -->
    <Container>
      <div class="lg:max-w-2xl">
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
            <h2 class="text-xl lg:text-4xl font-bold text-center lg:text-left text-gray-600 py-10 tracking-wider">Course
              Instructors</h2>
            <div class="flex flex-wrap">
              <div class="w-1/2 py-3" v-for="item in course?.course?.instructors">
                <div class="flex flex-col lg:flex-row items-center gap-3">
                  <img class="border-2 p-0.5 lg:p-1 w-16  h-16 border-primary rounded-full"
                       :src="item?.photo_url"
                       @error="$event.target.src=`https://ui-avatars.com/api/?background=ffffff&color=000000&name=${item.name}`"
                       :alt="item.name">
                  <div class="text-sm lg:text-base text-center lg:text-left font-medium">
                    <p>{{ item?.name }}</p>
                    <p>DU, CU (8+ Years Exp)</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 class="text-xl lg:text-2xl font-bold text-center lg:text-left px-5 lg:px-0 text-gray-600 py-10 tracking-wide">
                What You Will Learn By Doing The Course</h2>
              <div v-if="features?.length">
                <ul class="flex flex-wrap gap-3 lg:gap-7 px-5 lg:px-0">
                  <li class="flex gap-1" v-for="item in features">
                    <Icon name="material-symbols:check" class="text-blue-300" size="30"/>
                    <p class="max-w-xs text-sm lg:text-base">{{ item?.title }}</p>
                  </li>
                </ul>
              </div>
            </div>

            <div>
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

            <div>
              <h2 class="text-xl lg:text-2xl font-bold text-center lg:text-left px-5 lg:px-0 text-gray-600 py-10 tracking-wide">
                Frequently Ask Questions
              </h2>
              <div class="border rounded-lg p-4 flex flex-col gap-3" v-if="frequentlyAskQuestion.length">
                <Acordion :title="ques?.question" v-for="ques in frequentlyAskQuestion">
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

              <h2 class="text-xl font-semibold p-3 pt-9">What is in this course</h2>
              <ul class="p-3 leading-loose text-gray-600 pl-6"
                  v-if="course?.course?.inclues && JSON.parse(course?.course?.inclues)?.length">
                <li class="flex items-center gap-5" v-for="item in JSON.parse(course?.course?.inclues)">
                  <span><Icon :name="item?.icon" class="text-lg"/></span>
                  <p>{{ item?.title }}</p>
                </li>
              </ul>

              <div class="text-sm flex justify-between py-5 px-3">
                <p class="text-gray-400">For details about the course</p>
                <p class="flex items-center gap-1 text-primary-500 font-semibold">
                  <span class=""><Icon name="material-symbols:call-outline" class=""/></span>
                  Call (16910)
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