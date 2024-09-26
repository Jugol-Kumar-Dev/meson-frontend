<script setup lang="ts">

import {useApiFetch} from "~/composables/useApiFetch";

definePageMeta({
  middleware: ['auth']
})


const route = useRoute();
const {
  data: course,
  status,
  refresh
} = await useLazyAsyncData(`single-course-${route.query?.course}`, () =>
    $fetch(`/get-single-course/${route?.params?.course_id}`, {
      baseURL: useRuntimeConfig().public?.frontendAppUrl,
      headers: {
        accept: "application/json",
      },
    }))
const coupon = ref(null)
const {data: applyCoupon, error: couponErr, execute: couponExecute, status:couponStatus} = await useApiFetch("/apply-coupon", {
  method: "POST",
  body: {coupon: coupon},
  immediate: false,
  lazy: true
});
const applyDiscount = async () => {
  couponErr.value = null
  await couponExecute()

  if (couponErr?.value) {
    push.error(couponErr.value?.data ?? 'Have An Error')
  }

  if (applyCoupon.value) {
    push.success(applyCoupon.value?.msg)
  }
}




const price = computed(() => {
  let price = course.value?.course?.price;
  let coupon = applyCoupon.value?.coupon
  if (coupon) {
    if (coupon?.type === 'percent') {
      let discount = (course.value?.course?.price * coupon?.value) / 100;
      price = price - discount
    } else {
      price = price - coupon?.value
    }
  }
  return price;
})


const discount = computed(() => {
  let price = 0;
  let coupon = applyCoupon.value?.coupon
  if (coupon) {
    if (coupon?.type === 'percent') {
      price = (course.value?.course?.price * coupon?.value) / 100;
    } else {
      price = price - coupon?.value
    }
  }
  return price;
})





const data = reactive({
  course_id: route?.params?.course_id ?? course.value?.course?.id,
  post_office: null,
  thana: null,
  district: null,
  full_address: null,
  paymentMethod: 'ssl',
  price:null,
  coupon_id:null,
})

const {data: orderResponse, error, status:orderStatus, execute} = await useApiFetch("/create-order", {
  method: "POST",
  body: data,
  immediate: false,
  lazy: true
});


const submitCheckout = async () => {
  data.price  = price
  data.coupon_id =  applyCoupon?.value?.coupon?.id


  await execute();
  if (orderResponse.value) {
    await navigateTo(orderResponse.value?.url?.data, {
      external: true,
    })
  }
  if (error.value) {
    push.warning(error.value?.data ?? 'Already exist this course your account...!')
  }
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
          {{ course?.description  }}
        </p>
      </div>
    </Container>
  </section>
  <section class="my-5 lg:my-20">
    <Container>
      <div class="grid grid-cols-12 gap-10 w-full">
        <div class="hidden lg:block col-span-8">
          <div>
            <h2 class="px-5 py-2 bg-primary-500 text-white font-bold">Where Are you From?</h2>
            <div class="mt-10 flex flex-col gap-5">
              <div class="grid grid-cols-3 gap-5 justify-between">
                <div class="col-span-1">
                  <input type="text" v-model="data.post_office"
                         class="px-2 w-full rounded-none py-3 border focus:outline-none focus:border-primary"
                         placeholder="Post Office"/>
                  <span class="text-red-500"
                        v-if="error?.data?.errors?.post_office">{{ error?.data?.errors?.post_office[0] }}</span>
                </div>

                <div class="col-span-1">
                  <input type="text" v-model="data.thana"
                         class="px-2 w-full rounded-none py-3 border focus:outline-none focus:border-primary"
                         placeholder="Thana / Sub-District"/>
                  <span class="text-red-500" v-if="error?.data?.errors?.thana">{{
                      error?.data?.errors?.thana[0]
                    }}</span>
                </div>

                <div class="col-span-1">
                  <input type="text" v-model="data.district"
                         class="px-2 w-full rounded-none py-3 border focus:outline-none focus:border-primary"
                         placeholder="District"/>
                  <span class="text-red-500" v-if="error?.data?.errors?.district">{{
                      error?.data?.errors?.district[0]
                    }}</span>
                </div>

              </div>
              <div>
                <input type="text" v-model="data.full_address"
                       class="px-2 w-full rounded-none py-3 border focus:outline-none focus:border-primary"
                       placeholder="Full Address"/>
                <span class="text-red-500"
                      v-if="error?.data?.errors?.full_address">{{ error?.data?.errors?.full_address[0] }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-9 max-w-full mx-auto lg:col-span-4">
          <div class="bg-white lg:-mt-[300px] relative z-40">
            <img class="p-1 w-full" :src="course?.course?.cover_url" alt="">
            <div class="flex flex-col gap-5 mb-10 px-5">
              <div class="flex flex-col gap-1 mt-10">
                <div class="flex justify-between items-center">
                  <p class="font-bold text-secondary-600 text-lg">Course Price: </p>
                  <p class="font-bold text-secondary-600 text-lg">৳ {{ course?.course?.price }}</p>
                </div>
                <div class="flex justify-between items-center" v-if="applyCoupon?.coupon">
                  <div>
                    <p class="font-semibold text-sm">Coupon Discount: </p>
                    <p class="text-xs text-green-500">code({{ applyCoupon?.coupon?.code }})
                      <span>
                      {{ applyCoupon?.coupon?.value }}
                      {{ applyCoupon?.coupon?.type === 'percent' ? '%' : '৳' }}
                    </span>
                    </p>
                  </div>
                  <p class=""> ৳{{ discount }}</p>
                </div>
                <hr v-if="applyCoupon?.coupon">
                <div class="flex justify-between items-center" v-if="applyCoupon?.coupon">
                  <p class="font-bold text-lg">Total Price: </p>
                  <p class="text-2xl font-semibold">৳ {{ price }}</p>
                </div>
              </div>

              <div class="flex items-center justify-between" v-if="!applyCoupon?.coupon">
                <input type="text"
                       class="px-2 w-full rounded-none py-2 border focus:outline-none disabled:bg-primary-200 focus:border-primary"
                       v-model="coupon"
                       :disabled="couponStatus === 'pending'"
                       placeholder="enter promo"/>
                <LoadingButton class="!w-[40%] text-white" :isLoading="couponStatus === 'pending'" @click="applyDiscount">Try Now</LoadingButton>
              </div>
              <span v-if="couponErr?.data" class="text-red-500">{{ couponErr?.data?.message ?? couponErr?.data }}</span>


              <div class="lg:hidden">
                <div class="mt-10 flex flex-col gap-3">
                  <div class="flex flex-col gap-3 justify-between">
                    <div class="col-span-1">
                      <input type="text" v-model="data.post_office"
                             class="px-2 w-full rounded-none py-3 border focus:outline-none focus:border-primary"
                             placeholder="Post Office"/>
                      <span class="text-red-500"
                            v-if="error?.data?.errors?.post_office">{{ error?.data?.errors?.post_office[0] }}</span>
                    </div>
                    <div class="col-span-1">
                      <input type="text" v-model="data.thana"
                             class="px-2 w-full rounded-none py-3 border focus:outline-none focus:border-primary"
                             placeholder="Thana / Sub-District"/>
                      <span class="text-red-500" v-if="error?.data?.errors?.thana">{{
                          error?.data?.errors?.thana[0]
                        }}</span>
                    </div>
                    <div class="col-span-1">
                      <input type="text" v-model="data.district"
                             class="px-2 w-full rounded-none py-3 border focus:outline-none focus:border-primary"
                             placeholder="District"/>
                      <span class="text-red-500" v-if="error?.data?.errors?.district">{{
                          error?.data?.errors?.district[0]
                        }}</span>
                    </div>
                  </div>
                  <div>
                    <input type="text" v-model="data.full_address"
                           class="px-2 w-full rounded-none py-3 border focus:outline-none focus:border-primary"
                           placeholder="Full Address"/>
                    <span class="text-red-500"
                          v-if="error?.data?.errors?.full_address">{{ error?.data?.errors?.full_address[0] }}</span>
                  </div>
                </div>
              </div>

              <LoadingButton :isLoading="orderStatus === 'pending'" @click="submitCheckout">Payment Now</LoadingButton>
              <!--              <button-->
              <!--                  -->
              <!--                  type="button"-->
              <!--                  class="flex items-center justify-center gap-3 w-full rounded bg-primary-500 hover:bg-purple-900 text-white px-4 py-2 text-lg font-semibold">-->
              <!--                -->
              <!--              </button>-->

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