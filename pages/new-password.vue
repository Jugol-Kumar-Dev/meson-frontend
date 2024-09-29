<script setup>
const route = useRoute()
definePageMeta({
  middleware: ['guest']
})

const password = ref(null)
const confirm_password = ref(null)

const {data, error, status, execute} = useApiFetch('/save-new-password', {
  method: "POST",
  body: {
    email:useRoute()?.query?.email,
    password:password,
    confirm_password:confirm_password
  },
  immediate: false,
})
const onSubmit = async () =>{
  await $fetch(useRuntimeConfig().public.baseUrl+ '/sanctum/csrf-cookie',{
    credentials:'include'
  })
  error.value = null
  await execute()

  if(data.value){
    push.success(data.value)
    await navigateTo('/login')
  }
}
onMounted(()=>{
  if(!useRoute()?.query?.email){
    push.error('New password email not valid...')
    return navigateTo('/')
  }

})
</script>


<template>
  <Container>
    <div class="flex items-center justify-center h-full min-h-screen">
      <div class="px-3 py-6 rounded-lg border shadow-lg w-full max-w-lg">
        <form @submit.prevent="onSubmit">
          <h2 class="text-lg lg:text-xl font-bold text-gray-600 pb-5">New Passwrod</h2>
          <div class="flex flex-col gap-4">
            <input type="password" id="table-search-users"
                   v-model="password"
                   :disabled="status === 'pending'"
                   class="block disabled:bg-primary-100 border border-primary w-full p-3 ps-2 text-sm rounded text-primary-500 bg-white placeholder-slate-500 focus:ring-0 focus:border-primary focus:outline-0"
                   placeholder="New password">
            <span v-if="error?.data?.errors?.password" class="text-red-500">{{ error?.data?.errors?.password[0] }}</span>
          </div>
          <div class="flex flex-col gap-4 mt-1">
            <input type="password" id="table-search-users"
                   v-model="confirm_password"
                   :disabled="status === 'pending'"
                   class="block disabled:bg-primary-100 border border-primary w-full p-3 ps-2 text-sm rounded text-primary-500 bg-white placeholder-slate-500 focus:ring-0 focus:border-primary focus:outline-0"
                   placeholder="Confirm password">
            <span v-if="error?.data?.errors?.confirm_password" class="text-red-500">{{ error?.data?.errors?.confirm_password[0] }}</span>
          </div>
          <LoadingButton class="mt-4" type="submit" :isLoading="status === 'pending'">Submit</LoadingButton>
          <div class="mt-4">
            <span>Already have an account? </span>
            <NuxtLink class="underline text-primary-500" to="/login">Login Here</NuxtLink>
          </div>
        </form>
      </div>
    </div>
  </Container>
</template>