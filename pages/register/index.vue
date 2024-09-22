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
  pending.value = true;
  const {data, error} = await signup(state)
  errors.value = error?.value?.data
  if(error?.value){
    alert(error)
  }
  if (!error.value){
    setToken(data.value)
    console.log(data.value)
    const userData = await fetchUser();
    setAuthUser(userData?.data?.value)
    alert('login successfully done...')
    if(userData?.data?.value){
      // console.log('redirect', route)
      return navigateTo(route?.query?.redirect ?? '/')
      // return navigateTo(route?.query?.redirect ?? '/student/dashboard')
    }
  }
  pending.value = false;
}

</script>


<template>
  <Container>
    <div class="flex flex-col lg:flex-row items-center justify-center h-screen">
      <div class="w-full lg:w-1/2 pt-20">
        <form @submit.prevent="onSubmit" class="max-w-sm mx-auto px-6 lg:px-0">
          <h2 class="text-lg lg:text-xl font-bold text-gray-600 pb-5">Registration</h2>
          <div class="flex flex-col gap-4">
            {{ errors }}
            <input type="text" id="table-search-users"
                   v-model="state.name"
                   class="block border border-primary w-80 p-3 ps-2 text-sm rounded text-primary-500 bg-white placeholder-slate-500 focus:ring-0 focus:border-primary focus:outline-0"
                   placeholder="Your Name.">
            <span v-if="errors?.errors?.name" class="text-red-500">{{ errors?.errors?.name[0] }}</span>

            <input type="text" id="table-search-users"
                   v-model="state.email"
                   class="block border border-primary w-80 p-3 ps-2 text-sm rounded text-primary-500 bg-white placeholder-slate-500 focus:ring-0 focus:border-primary focus:outline-0"
                   placeholder="Email Address">
            <span v-if="errors?.errors?.email" class="text-red-500">{{ errors?.errors?.email[0] }}</span>

            <input type="text" id="table-search-users"
                   v-model="state.phone"
                   class="block border border-primary w-80 p-3 ps-2 text-sm rounded text-primary-500 bg-white placeholder-slate-500 focus:ring-0 focus:border-primary focus:outline-0"
                   placeholder="Phone Number">
            <span v-if="errors?.errors?.phone" class="text-red-500">{{ errors?.errors?.phone[0] }}</span>
            <input type="password"
                   v-model="state.password"
                   id="table-search-users"
                   class="block border border-primary w-80 p-3 ps-2 text-sm rounded text-primary-500 bg-white placeholder-slate-500 focus:ring-0 focus:border-primary focus:outline-0"
                   placeholder="Password">
            <span v-if="errors?.errors?.password" class="text-red-500">{{ errors?.errors?.password[0] }}</span>

          </div>
          <button
              class="flex items-center justify-center gap-3 my-5 w-80 rounded bg-primary-500 hover:bg-purple-900 text-white px-4 py-2 text-lg font-semibold">
            Submit
          </button>

        </form>
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