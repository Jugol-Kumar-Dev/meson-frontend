<template>
    <div class="flex items-center justify-between p-5">
    </div>
    <div class="relative container mx-auto">
      <div class="grid grid-cols-3 gap-10">
        <div class="col-span-1">
          <div>
            <p class="text-lg font-bold">Personal Information</p>
            <p class="text-sm text-gray-700">Setup your personal admin profile</p>
          </div>
        </div>
        <div class="col-span-2">
          <div class="flex items-center gap-8">
            <div class="w-24 h-24 rounded-lg overflow-hidden">
              <img class="w-full h-full object-cover" :src="previewImage"
                   alt="">
            </div>
            <div class="flex flex-col gap-2">
              <label for="profileupdate"
                     class="font-semibold text-white rounded-lg w-max bg-primary-700 px-4 py-2">
                Change Avatar
                <input class="hidden" @change="onFileChange" type="file" id="profileupdate">
              </label>
              <span class="text-sm">JPG, PNG, SVG. 1MB max</span>
            </div>
          </div>
          <form @submit.prevent="updateProfile" class="flex flex-col gap-5 mt-16">
            <div class="w-full">
              <label for="name" class="text-sm block mb-2 font-semibold">Name<span
                  class="text-red-500">*</span></label>
              <input type="text" :disabled="status === 'pending'" v-model="createForm.name"
                     class="border disabled:bg-teal-50 border-primary-300 rounded-md font-normal text-sm p-3
                         w-full focus:ring-primary-300 focus:border-primary-500 focus:outline-none">
              <span class="text-red-500" v-if="error?.data?.errors?.name">
                {{
                  error?.data?.errors?.name[0]
                }}
                                </span>
            </div>
            <div class="w-full">
              <label for="name" class="text-sm block mb-2 font-semibold">Email<span
                  class="text-red-500">*</span></label>
              <input type="text" :disabled="status === 'pending'" v-model="createForm.email" class="border disabled:bg-teal-50 border-primary-300 rounded-md font-normal text-sm p-3
                         w-full focus:ring-primary-300 focus:border-primary-500 focus:outline-none">
              <span class="text-red-500" v-if="error?.data?.errors?.email">{{
                  error?.data?.errors?.email[0]
                }}</span>
            </div>
            <div>
              <LoadingButton :isLoading="status === 'pending'">Update Profile</LoadingButton>
            </div>
          </form>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-10 mt-16">
        <div class="col-span-1">
          <div>
            <p class="text-lg font-bold">Change Your Password</p>
            <p class="text-sm text-gray-700">update your new password.</p>
          </div>
        </div>
        <div class="col-span-2">
          <form @submit.prevent="passwordExecture" class="flex flex-col gap-5">
            <div class="w-full">
              <label for="name" class="text-sm block mb-2 font-semibold">Current Passord<span
                  class="text-red-500">*</span></label>
              <input type="password" :disabled="passwordStatus === 'pending'" v-model="updatePassword.current_password"
                     class="border disabled:bg-teal-50 border-primary-300 rounded-md font-normal text-sm p-3
                         w-full focus:ring-primary-300 focus:border-primary-500 focus:outline-none">
              <span class="text-red-500" v-if="passErr?.data?.errors?.current_password">{{
                  passErr?.data?.errors?.current_password[0]
                }}</span>
            </div>
            <div class="w-full">
              <label for="name" class="text-sm block mb-2 font-semibold">New Password<span
                  class="text-red-500">*</span></label>
              <input type="password" :disabled="passwordStatus === 'pending'" v-model="updatePassword.new_password" class="border disabled:bg-teal-50 border-primary-300 rounded-md font-normal text-sm p-3
                         w-full focus:ring-primary-300 focus:border-primary-500 focus:outline-none">
              <span class="text-red-500" v-if="passErr?.data?.errors?.new_password">{{
                  passErr?.data?.errors?.new_password[0]
                }}</span>
            </div>
            <div class="w-full">
              <label for="name" class="text-sm block mb-2 font-semibold">Confirm Password<span
                  class="text-red-500">*</span></label>
              <input type="password" :disabled="passwordStatus === 'pending'" v-model="updatePassword.confirm_password" class="border disabled:bg-teal-50 border-primary-300 rounded-md font-normal text-sm p-3
                         w-full focus:ring-primary-300 focus:border-primary-500 focus:outline-none">
              <span class="text-red-500" v-if="passErr?.data?.errors?.confirm_password">{{
                  passErr?.data?.errors?.confirm_password[0]
                }}</span>
            </div>
            <div>
              <LoadingButton :isLoading="passwordStatus === 'pending'">Update Password</LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>

<script setup>
definePageMeta({
  layout: 'student',
  middleware: ['auth']
})
const authStore = useTokenStore()
const {logout} = useAuthStore()


const createForm = ref({
  name: authStore.authUser.name,
  email: authStore.authUser.email,
  image: {}
})

const {data, error, status, execute} = await useApiFetch(`/profile-update`, {
  method: 'POST',
  immediate: false,
  body: createForm,
  watch:false,
  cache: "no-cache",
})
const updateProfile = async () => {
  error.value = null
  await execute()
  if(!error.value){
    push.success('Information Updated..!')
    await logout()
  }
}

const updatePassword = ref({
  current_password: null,
  new_password: null,
  confirm_password: null,
})

const {data:passData, error:passErr, status:passwordStatus, execute:passwordExecture} = await useApiFetch(`/password-update`, {
  method: 'POST',
  immediate: false,
  body: updatePassword.value,
  watch:false,
  cache: "no-cache",
})

if(passData.value){
  push.success('Password Update Done...')
  logout();
}


const profileImage = ref({})
const previewImage = ref(authStore.user?.image ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(authStore.authUser?.name)}`)
const onFileChange = (event) => {
  const image = event.target.files[0]
  createForm.value.image = image
  previewImage.value = URL.createObjectURL(image)
}


</script>
