<script setup>
const {categories, settings} = defineProps({
  categories: Object,
  settings: Object,
})
const {authUser,isLogin} = useTokenStore()
const authStore = useAuthStore();
const inputsearch = ref(null)
const gocourses = () => {
  navigateTo(`/courses?search=${inputsearch.value}`)
}


const logoutUser = () => {
  authStore.logout();

}

</script>


<template>
    <section class="fixed z-50 top-0 left-0 right-0 w-full py-4 bg-white hidden lg:block">
      <div class="max-w-screen-2xl mx-auto">
        <div class="flex items-center gap-5 lg:px-10">
          <div class="w-full lg:w-2/6">
            <div class="flex gap-4">
              <NuxtLink to="/">
                <img class="w-32 h-auto p-1" src="@/assets/images/logo.png" alt=""/>
              </NuxtLink>
              <div class="flex items-center space-x-1">
                <!-- Icon container -->
                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="24" fill="none" viewBox="0 0 27 24">
                  <path fill="#fff" d="M0 0H26.514V23.99H0z"></path>
                  <path fill="#111827"
                        d="M21.247 20.065l-2.83-2.82a6.59 6.59 0 001.407-4.078 6.657 6.657 0 10-6.657 6.657 6.59 6.59 0 004.077-1.407l2.82 2.83a.834.834 0 001.365-.271.833.833 0 00-.182-.911zM8.174 13.167a4.993 4.993 0 119.985 0 4.993 4.993 0 01-9.985 0z"></path>
                  <path fill="#F1844C"
                        d="M3.875.975l1.238 1.807c.33.481.853.794 1.433.857l2.178.236-1.807 1.239c-.481.33-.794.852-.857 1.432l-.237 2.178-1.238-1.807a1.998 1.998 0 00-1.432-.857L.974 5.824l1.808-1.239c.48-.33.794-.853.857-1.432L3.875.975zM8.59 19.77l-.337.54a1.998 1.998 0 00-.21 1.656l.19.607-.54-.337a1.998 1.998 0 00-1.655-.21l-.607.19.337-.54c.308-.494.385-1.099.21-1.655l-.19-.607.54.337c.494.308 1.099.385 1.655.21l.607-.19zM23.575 6.068l.223 1.396c.092.576.43 1.083.927 1.388l1.205.74-1.396.222a1.998 1.998 0 00-1.388.928l-.74 1.204-.222-1.396a1.997 1.997 0 00-.927-1.387l-1.205-.74 1.396-.223a1.997 1.997 0 001.388-.927l.74-1.205z"></path>
                </svg>
                <!-- Search Input -->
                <div class="relative w-full max-w-sm">
                  <input
                      v-model="inputsearch"
                      @keyup.enter="gocourses"
                      type="text"
                      id="table-search-users"
                      class="block w-full pl-4 border pr-12 py-2 rounded-md bg-white text-sm text-gray-700 placeholder-slate-500 focus:border  focus:outline-none"
                      placeholder="Search..."
                  />

                  <!-- Search Button -->
                  <NuxtLink :to="{path:'/courses', query:{search:inputsearch}}"
                            class="absolute right-2 top-1.5 p-2 rounded-md  transition-all bg-primary-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-5 text-primary-500" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l7-7m0 0l-7-7m7 7H3"></path>
                    </svg>
                  </NuxtLink>
                </div>
              </div>

            </div>
          </div>

          <div class="w-full lg:w-4/6">
            <div class="flex gap-4 justify-between">
              <div>
                <ul class="flex items-center gap-6 text-base font-medium text-slate-500">
                  <li v-for="cat in categories?.categories" :key="`singel-h-cat-${cat?.id}`">
                    <NuxtLink :to="{path:'/courses', query:{category:cat?.id}}"
                              class="group relative hover:text-primary-500 transition-all ease-in-out duration-500">
                      {{ cat?.name }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
              <div class="flex gap-7 items-center">
                <p class="flex items-center gap-1 text-sm font-medium text-primary-500">
                  <Icon name="material-symbols:phone-in-talk-watchface-indicator-sharp"/>
                  {{ settings?.profile?.phone }}
                </p>

                <div v-if="isLogin" class="flex gap-2 items-center  px-2 rounded-md">
                  <img class="w-8 h-8 rounded-full object-cover"
                       :src="authUser?.photo_url"
                       @error="handleImageError"
                       alt="Rounded avatar">
                  <div class="flex flex-col justify-end">
                    <p class="m-0 ps-0 font-semibold text-gray-600 text-sm capitalize">{{ authUser?.name }}</p>
                    <div class="flex items-center gap-2">
                      <NuxtLink to="/student/dashboard" class="text-sm text-gray-400">Pofile</NuxtLink>
                      <span>|</span>
                      <small @click="logoutUser" class="text-sm cursor-pointer text-gray-400">Logout</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>