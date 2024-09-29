<script setup>
import {Swiper, SwiperSlide} from 'swiper/vue';
import {FreeMode, Navigation, Thumbs, Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const modules = [FreeMode, Navigation, Thumbs, Autoplay];
const route = useRoute()

definePageMeta({
  middleware: ['guest']
})

const { setToken, setAuthUser } = useTokenStore();
const form = ref()
const state = reactive({
  name:null,
  phone:null,
  email: null,
  password: null,
  remember: false
})


const {signup, fetchUser} = useAuthStore();
const pending = ref(false)
const errors = ref({})


const onSubmit = async () => {
  errors.value = null;
  pending.value = true;
  const {data, error} = await signup(state)
  errors.value = error?.value?.data
  if(error?.value){
    push.error(error.value?.data)
  }
  if (!error.value){
    setToken(data.value)
    console.log(data.value)
    const userData = await fetchUser();
    console.log('data', userData)
    setAuthUser(userData?.data?.value)
    push.success('Registration Successfully Done...')
    if(userData?.data?.value){
      console.log(userData?.data?.value)
      return navigateTo(route?.query?.redirect ?? '/student/dashboard')
    }
  }
  pending.value = false;
}

</script>


<template>
  <Container>
    <div class="max-w-full flex flex-col lg:flex-row items-center justify-center h-full min-h-screen">
      <div class="p-4 mt-20 lg:p-6 w-full max-w-md lg:max-w-none">
        <form @submit.prevent="onSubmit" class="w-full lg:max-w-sm lg:px-0">
          <h2 class="text-lg lg:text-xl font-bold text-gray-600 pb-5">Registration</h2>
          <div class="flex flex-col gap-2">
            <input type="text" id="table-search-users"
                   v-model="state.name"
                   :disabled="pending"
                   class="block disabled:bg-primary-100 border border-primary w-full lg:w-80 p-3 ps-2 text-sm rounded text-primary-500 bg-white placeholder-slate-500 focus:ring-0 focus:border-primary focus:outline-0"
                   placeholder="Your Name.">
            <span v-if="errors?.errors?.name" class="text-red-500">{{ errors?.errors?.name[0] }}</span>

            <input type="text" id="table-search-users"
                   v-model="state.email"
                   :disabled="pending"
                   class="block disabled:bg-primary-100 border border-primary w-full lg:w-80 p-3 ps-2 text-sm rounded text-primary-500 bg-white placeholder-slate-500 focus:ring-0 focus:border-primary focus:outline-0"
                   placeholder="Email Address">
            <span v-if="errors?.errors?.email" class="text-red-500">{{ errors?.errors?.email[0] }}</span>

            <input type="text" id="table-search-users"
                   v-model="state.phone"
                   :disabled="pending"
                   class="block disabled:bg-primary-100 border border-primary w-full lg:w-80 p-3 ps-2 text-sm rounded text-primary-500 bg-white placeholder-slate-500 focus:ring-0 focus:border-primary focus:outline-0"
                   placeholder="Phone Number">
            <span v-if="errors?.errors?.phone" class="text-red-500">{{ errors?.errors?.phone[0] }}</span>
            <input type="password"
                   v-model="state.password"
                   id="table-search-users"
                   :disabled="pending"
                   class="block disabled:bg-primary-100 border border-primary w-full lg:w-80 p-3 ps-2 text-sm rounded text-primary-500 bg-white placeholder-slate-500 focus:ring-0 focus:border-primary focus:outline-0"
                   placeholder="Password">
            <span v-if="errors?.errors?.password" class="text-red-500">{{ errors?.errors?.password[0] }}</span>

          </div>
          <LoadingButton class="w-full lg:!w-80" :isLoading="pending">Register</LoadingButton>
        </form>
        <div class="my-4">
          <span>Alrady have account? </span>
          <NuxtLink class="underline text-primary-500" to="/login">Login Here</NuxtLink>
        </div>
      </div>


      <div class="w-full lg:w-1/2">
        <div class="max-w-sm mx-auto px-8 lg:px-0">
          <h2 class="text-lg lg:text-xl font-bold text-gray-600 pb-5 text-center">Maintain Study Routine by Attending
            Daily Live Classes</h2>
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
              :speed="500"
              :freeMode="true"
              :freeModeMomentum="false"
              :freeModeMomentumBounce="false"
              :grabCursor="true"
              :autoplay="{
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
              <img class="w-full h-72 object-cover p-5 rounded-xl"
                   src="https://app.10minuteschool.com/assets/login/routine3.svg" alt=""/>
            </SwiperSlide>
            <SwiperSlide>
              <img class="w-full object-cover h-72 p-5 rounded-xl"
                   src="https://app.10minuteschool.com/assets/login/routine.svg" alt=""/>
            </SwiperSlide>
            <SwiperSlide>
              <img class="w-full object-cover h-72 p-5 rounded-xl"
                   src="https://app.10minuteschool.com/assets/login/routine1.svg" alt=""/>
            </SwiperSlide>
            <SwiperSlide>
              <img class="w-full h-72  p-5 rounded-xl" src="https://app.10minuteschool.com/assets/login/routine2.svg"
                   alt=""/>
            </SwiperSlide>

          </Swiper>
        </div>
      </div>
    </div>
  </Container>
</template>