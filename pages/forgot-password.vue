<script setup>
const route = useRoute()
definePageMeta({
  middleware: ['guest']
})

const email = ref(null)

const {data, error, status, execute} = useApiFetch('/forgot-password', {
  method: "POST",
  body: {email:email},
  immediate: false,
})
const onSubmit = async () =>{


  error.value = null
  await execute()

  if(data.value){
    push.success(data.value)
  }
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
                   v-model="email"
                   :disabled="status === 'pending'"
                   class="block disabled:bg-primary-100 border border-primary w-full p-3 ps-2 text-sm rounded text-primary-500 bg-white placeholder-slate-500 focus:ring-0 focus:border-primary focus:outline-0"
                   placeholder="Email Address">
            <span v-if="error?.data?.errors?.email" class="text-red-500">{{ error?.data?.errors?.email[0] }}</span>
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