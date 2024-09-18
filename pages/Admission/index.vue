<script setup lang="ts">

import {useApiFetch} from "~/composables/useApiFetch";

definePageMeta({
  middleware:['auth']
})





const route = useRoute();
const {
  data: course,
  status,
  refresh
} = await useLazyAsyncData(`single-course-${route.query?.course}`, () => $fetch(`/get-single-course/${route.query?.course}`, {
  baseURL: useRuntimeConfig().public?.frontendAppUrl,
  headers: {
    accept: "application/json",
  },
}))
const price = ref(course.value?.course?.price)

const discount = (event: any) => price.value = price.value - event.target.value

const data = reactive({
  course_id: course.value?.course?.id,
  post_office: null,
  thana: null,
  price: price.value,
  district: null,
  full_address: null,
  paymentMethod:'ssl'
})

const {data:orderResponse, error, execute} = await useApiFetch("/create-order", {
  method: "POST",
  body: data,
  immediate:false,
  lazy: true
});
const submitCheckout = async () =>{
  await execute();
  if(orderResponse.value){
    await navigateTo(orderResponse.value?.url?.data, {
      external:true,
    })
  }
  console.log('response', )
  console.log('error', error)
}


</script>

<template>


  <section class="relative bg-[url('@/assets/images/banner-3.png')] bg-no-repeat bg-cover bg-top min-h-[50vh] h-auto">
    <!-- <span class="absolute top-0 left-0 bottom-0 right-0 w-full h-full bg-black/65"></span> -->
    <Container>
      <div class="lg:max-w-2xl">
        <h2 class="text-xl lg:text-4xl text-center capitalize lg:text-left font-bold text-white py-10 tracking-wider">
          Make Admission This Course
        </h2>
        <p class="text-sm lg:text-base text-gray-300 pb-3 px-3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque aut autem dignissimos dolore dolorem
          doloremque dolores dolorum ducimus,
        </p>
      </div>
    </Container>
  </section>
  <section class="my-20">
    <Container>
      <div class="grid grid-cols-12 gap-10">
        <div class="col-span-8">
          <div>
            <h2 class="px-5 py-2 bg-primary-500 text-white font-bold">Where Are you From?</h2>
            <div class="mt-10 flex flex-col gap-5">

              <div class="flex items-center gap-5">
                <div>
                  <input type="text" v-model="data.post_office" class="px-2 w-full rounded-none py-3 border focus:outline-none focus:border-primary" placeholder="Post Office"/>
                  <span class="text-red-500" v-if="error?.data?.errors?.post_office">{{ error?.data?.errors?.post_office[0] }}</span>
                </div>

                <div>
                  <input type="text" v-model="data.thana" class="px-2 w-full rounded-none py-3 border focus:outline-none focus:border-primary" placeholder="Thana / Sub-District"/>
                  <span class="text-red-500" v-if="error?.data?.errors?.thana">{{ error?.data?.errors?.thana[0] }}</span>
                </div>

                <div>
                  <input type="text" v-model="data.district" class="px-2 w-full rounded-none py-3 border focus:outline-none focus:border-primary" placeholder="District"/>
                  <span class="text-red-500" v-if="error?.data?.errors?.district">{{ error?.data?.errors?.district[0] }}</span>
                </div>

              </div>
              <div>
                <input type="text" v-model="data.full_address" class="px-2 w-full rounded-none py-3 border focus:outline-none focus:border-primary" placeholder="Full Address"/>
                <span class="text-red-500" v-if="error?.data?.errors?.full_address">{{ error?.data?.errors?.full_address[0] }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-4">
          <div class="bg-white lg:-mt-[300px] relative z-40">
            <img class="p-1 w-full" :src="course?.course?.cover_url" alt="">
            <div class="flex flex-col gap-5 mb-10 px-5">
              <div class="flex justify-between items-center">
                <p class="font-bold text-lg">Course Price: </p>
                <p class="text-2xl font-semibold p-3">৳ {{ price }}</p>
              </div>

              <div class="flex justify-between mb-5">
                <input type="number"
                       class="px-2 w-full rounded-none py-3 border focus:outline-none focus:border-primary"
                       @input="discount"
                       placeholder="enter promo"/>
                <button class="bg-primary-500 w-[30%] text-white px-2 py-3">Try Now</button>
              </div>

              <button
                  @click="submitCheckout"
                  type="button"
                  class="flex items-center justify-center gap-3 w-full rounded bg-primary-500 hover:bg-purple-900 text-white px-4 py-2 text-lg font-semibold">
                Payment Now
              </button>

            </div>

            <div class="text-sm flex justify-between py-5 px-3">
              <p class="text-gray-400">For details about the course</p>
              <p class="flex items-center gap-1 text-primary-500 font-semibold">
                <span class=""><Icon name="material-symbols:call-outline" class=""/></span>
                Call (16910)
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>

</template>