<script setup>
const route = useRoute()
definePageMeta({
  middleware: ['guest']
})

const { setToken, setAuthUser } = useTokenStore();
const form = ref()
const state = reactive({
  email: null,
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
    <div class="flex items-center justify-center h-full min-h-screen">
      <div class="px-3 py-6 rounded-lg border shadow-lg w-full max-w-lg">
        <form @submit.prevent="onSubmit">
          <h2 class="text-lg lg:text-xl font-bold text-gray-600 pb-5">Proceed With Email</h2>
          <div class="flex flex-col gap-4">
            <input type="text" id="table-search-users"
                   v-model="state.email"
                   :disabled="pending"
                   class="block disabled:bg-primary-100 border border-primary w-full p-3 ps-2 text-sm rounded text-primary-500 bg-white placeholder-slate-500 focus:ring-0 focus:border-primary focus:outline-0"
                   placeholder="Email Address">
            <span v-if="errors?.errors?.email" class="text-red-500">{{ errors?.errors?.email[0] }}</span>
          </div>
          <LoadingButton class="mt-4" type="submit" :isLoading="pending">Submit</LoadingButton>
          <div class="mt-4">
            <span>Already have an account? </span>
            <NuxtLink class="underline text-primary-500" to="/login">Login Here</NuxtLink>
          </div>
        </form>
      </div>
    </div>
  </Container>
</template>