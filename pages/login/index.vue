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
  email: 'student@student.com',//undefined,
  password: '12345678',//undefined,
  remember: false
})


const {login, fetchUser} = useAuthStore();
const pending = ref(false)
const errors = ref({})


const onSubmit = async () => {
  pending.value = true;
  const {data, error} = await login(state)
  errors.value = error?.value?.data
  if(error?.value){
    push.error(error?.value?.data ?? "Have An Error, Please Try Again...")
  }
  if (!error.value){
    setToken(data.value)
    console.log(data.value)
    const userData = await fetchUser();
    setAuthUser(userData?.data?.value)
    if(userData?.data?.value){
      push.success("Login Successfully Done...")
      console.log('redirect', route)
      return navigateTo(route?.query?.redirect ?? '/student/dashboard')
    }
  }
  pending.value = false;
}

</script>


<template>
  <Container>
    <div class="max-w-full flex flex-col lg:flex-row items-center justify-center h-full min-h-screen overflow-hidden">
      <div class="p-4 mt-20 lg:p-6 w-full max-w-md lg:max-w-none">
        <form @submit.prevent="onSubmit" class="w-full lg:max-w-sm lg:px-0">
          <h2 class="text-lg lg:text-xl font-bold text-gray-600 pb-5">Proceed With Email</h2>
          <div class="flex flex-col gap-4">
            <input type="text" id="table-search-users"
                   v-model="state.email"
                   :disabled="pending"
                   class="block disabled:bg-primary-100 border border-primary w-full p-3 ps-2 text-sm rounded text-primary-500 bg-white placeholder-slate-500 focus:ring-0 focus:border-primary focus:outline-0"
                   placeholder="Email Address">
            <span v-if="errors?.errors?.email" class="text-red-500">{{ errors?.errors?.email[0] }}</span>
            <input type="password"
                   :disabled="pending"
                   v-model="state.password"
                   id="table-search-users"
                   class="block disabled:bg-primary-100 border border-primary w-full p-3 ps-2 text-sm rounded text-primary-500 bg-white placeholder-slate-500 focus:ring-0 focus:border-primary focus:outline-0"
                   placeholder="Password">
          </div>
          <NuxtLink to="/forgot-password" class="flex justify-end mt-1 underline text-primary-400">Forgot password?</NuxtLink>
          <LoadingButton class="mt-4" type="submit" :isLoading="pending">Submit</LoadingButton>

          <div class="mt-4">
            <span>Don't have an account? </span>
            <NuxtLink class="underline text-primary-500" to="/register">Register Here</NuxtLink>
          </div>
        </form>
      </div>

      <div class="w-full lg:block lg:w-1/2 mt-6 lg:mt-0">
        <div class="max-w-md mx-auto px-4 lg:px-0">
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
              <img class="w-full h-56 lg:h-72 object-cover p-4 lg:p-5 rounded-xl"
                   src="https://app.10minuteschool.com/assets/login/routine3.svg" alt=""/>
            </SwiperSlide>
            <SwiperSlide>
              <img class="w-full object-cover h-56 lg:h-72 p-4 lg:p-5 rounded-xl"
                   src="https://app.10minuteschool.com/assets/login/routine.svg" alt=""/>
            </SwiperSlide>
            <SwiperSlide>
              <img class="w-full object-cover h-56 lg:h-72 p-4 lg:p-5 rounded-xl"
                   src="https://app.10minuteschool.com/assets/login/routine1.svg" alt=""/>
            </SwiperSlide>
            <SwiperSlide>
              <img class="w-full h-56 lg:h-72 p-4 lg:p-5 rounded-xl"
                   src="https://app.10minuteschool.com/assets/login/routine2.svg" alt=""/>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>

  </Container>
</template>