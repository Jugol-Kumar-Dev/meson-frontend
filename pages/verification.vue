<script setup>
const route = useRoute()
definePageMeta({
  middleware: ['auth'],
  layout:'authfront'
})

const {authUser} = useTokenStore()

const loading = ref(false)
const errors = ref(null)
const onSubmit = async () => {
  const {data, error, status} = useApiFetch(`/verification-resend/${authUser.email}`)
  if(data.value?.message){
    push.success(data.value?.message)
  }
  loading.value = status;
  errors.value = error
}

</script>


<template>
  <Container>
    <div class="flex items-center justify-center h-full min-h-screen">
      <div class="px-3 rounded-lg border shadow-lg w-full max-w-lg">
          <div class="text-center text-white">
            <div class="bg-white text-gray-800 rounded-lg w-full max-w-md mx-auto p-6">
              <h3 class="text-lg font-semibold mb-4">Check your inbox to verify your email</h3>
              <p class="text-sm text-gray-600 mb-6">
                We've sent a verification link to your email address. Please click the link in the email to confirm your account.
              </p>
              <!-- Error Message -->
              <div class="text-red-500" v-if="errors">
                {{ errors?.data?.message }}
              </div>
              <!-- Action Section -->
              <div class="space-y-4">
                <!-- Resend Email Button -->
                <LoadingButton :isLoading="loading.value === 'pending'" @click="onSubmit" class="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
                  Resend Verification Email
                </LoadingButton>
                <p class="text-sm text-gray-600">
                  Already verified? <NuxtLink to="/login" class="text-blue-500 underline">Login</NuxtLink> to resend.
                </p>
              </div>
            </div>
          </div>
        </div>
    </div>
  </Container>
</template>