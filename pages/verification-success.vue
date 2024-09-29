<script setup>
const {fetchUser} = useAuthStore()
const {setAuthUser, removeToken}= useTokenStore()

onMounted(async ()=>{
  removeToken();
})

</script>


<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="rounded-lg border shadow-lg w-full max-w-lg">
      <div class="text-center text-white">
        <div class="bg-green-100 py-5 flex items-center justify-center">
          <div class="bg-white shadow-lg rounded-lg max-w-md mx-auto p-8 text-center">
            <!-- Success Icon -->
            <div class="flex justify-center mb-4">
              <svg class="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7 12l-2 2m0-2l2-2m2-2l2 2m2 2l2-2"></path>
              </svg>
            </div>

            <!-- Success Message -->
            <h2 class="text-2xl font-bold text-green-600 mb-2">Account Verified!</h2>
            <p class="text-gray-600 mb-6">
              Your account has been successfully verified. You can now enjoy all the features of our platform.
            </p>

            <!-- Navigation Button -->
            <a href="/login" class="inline-block w-full px-4 py-2 bg-primary-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400">
              Login Here
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


