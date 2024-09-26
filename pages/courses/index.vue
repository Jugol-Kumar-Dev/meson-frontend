<script setup>


const { data:categores, status, refresh } = await useLazyAsyncData('course-categories',
    () =>$fetch(`/course-categories`, {
      baseURL: useRuntimeConfig().public?.frontendAppUrl,
      headers: {
        accept: "application/json",
      },
    }))

const changeCat = ref(useRoute()?.query?.category)
const search = ref(useRoute()?.query?.search)

const { data:courses, status:coursesStatus, refresh:coursesRefresh } = await useLazyAsyncData('filter-courses',
    () =>$fetch(`/category-courses`, {
      baseURL: useRuntimeConfig().public?.frontendAppUrl,
      headers: {
        accept: "application/json",
      },
      query:{
        category: changeCat.value,
        search: search.value
      },
    }), {watch:[changeCat, search]})
// Handle category change
const changeCategory = (event) => {
  const selectedValue = event?.target?.value;

  // Set the category to null if "All Courses" is selected
  changeCat.value = selectedValue === 'null' ? null : selectedValue;
};
onMounted(async ()=>{
  await refresh()
  await coursesRefresh()
})
</script>


<template>
  <section class="relative bg-[url('@/assets/images/banner-3.png')] bg-no-repeat bg-cover bg-top h-auto">
    <!-- <span class="absolute top-0 left-0 bottom-0 right-0 w-full h-full bg-black/65"></span> -->
    <Container>
      <div class="lg:max-w-2xl">
        <h2 class="text-xl lg:text-4xl text-center lg:text-left font-bold text-white py-10 tracking-wider"> Admission & Course - 2024</h2>
        <p class="text-sm lg:text-base text-gray-300 pb-3 px-3">
          Every year lakhs of students pass the HSC examination but the number of seats in public universities is limited. These lakhs of students struggle to grab a seat for themselves in the admission tests. And for science students, this fight is more difficult. This is why to help the students of science background.
        </p>
        <p class="text-sm lg:text-base text-gray-300 pb-8 px-3">
          This course will make the aspirant's admission journey easy and organized through live classes, lecture sheets, doubt-solving classes, and daily, weekly, and monthly exams. Renowned teachers of the country are present in this course for your guidance and mentorship.
        </p>
      </div>
    </Container>
  </section>
  <section class="mb-16">
    <Container>
      <div class="flex justify-between items-center pt-12  mb-16">
        <h2 class="flex-1 text-lg lg:text-4xl font-bold">All Courses</h2>
        <select @change="changeCategory" class="flex-1 w-60 lg:h-12 border-2 border-primary px-3 rounded-md">
          <option value="null" :selected="!$route?.query?.category">All Courses</option>
          <option :value="cat?.id" v-for="cat in categores" :selected="cat.id === parseInt($route?.query?.category)">{{ cat?.name }}</option>
        </select>
      </div>

      <div v-if="coursesStatus === 'pending'" class="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        <div class="col-span-1" v-for="i in 16">
          <div class="rounded-md w-full border animate-pulse transition-all ease-in-out duration-500">
            <div class="bg-gray-200 w-full h-36 rounded-t-md"></div>
            <div class="px-3 py-6">
              <div class="bg-gray-200 h-4 rounded-md w-3/4 mb-4"></div>
              <div class="bg-gray-200 h-4 rounded-md w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="grid grid-cols-2 gap-1 lg:grid-cols-4 lg:gap-6">
        <NuxtLink :to="`/courses/${course.id}`" v-if="courses?.data?.length" class="col-span-1 lg:px-3 py-3" v-for="course in courses?.data">
          <div class="rounded-md w-full border hover:border-primary transition-all ease-in-out duration-500">
            <div class="">
              <img class="w-full h-28 lg:h-36 rounded-t-md" :src="course?.cover_url" alt="" />
            </div>
            <div class="px-3 py-6">
              <h2 class="text-sm lg:text-lg font-semibold pb-4">{{ course?.name }}</h2>
              <p class="text-xs lg:text-lg  text-primary font-bold">৳ {{ course?.price }}</p>
            </div>
          </div>
        </NuxtLink>
      </div>
      <div v-if="!courses?.data?.length" class="h-full min-h-64 grid place-items-center">
        <p class="uppercase font-bold text-xl">no course found</p>
      </div>

    </Container>
  </section>
</template>