<script setup lang="ts">
import moment from "moment";
import {vueVimeoPlayer} from 'vue-vimeo-player'

definePageMeta({
  layout: 'student',
  middleware: ['auth']
})
const playVideoId = ref(null)
const {authUser} = useTokenStore()
const {
  data: chapters,
  status: status,
  refresh
} = await useLazyAsyncData(`studnet-course-lessons`, () => $fetch(`/get-course-lessons/${useRoute()?.query?.course_id}`, {
  baseURL: useRuntimeConfig().public?.studentAppUrl,
  headers: {
    Authorization: `Bearer ${useTokenStore().token}`,
    accept: "application/json",
  },
}))

onMounted(() => refresh())
</script>


<template>
  <div class="w-full h-full min-h-screen">
    <div class="bg-white w-full flex items-center justify-center flex-col py-5 shadow-md">
      <h2 class="font-bold text-xl">Course Contents</h2>
    </div>

    <div class="mt-10">
      <PlaceholderChapter v-if="status === 'pending'"/>
      <div v-else class="flex flex-col-reverse lg:flex-row gap-5">
        <div class="w-full lg:w-[30%] flex flex-col gap-5 max-h-screen overflow-y-scroll">
          <div class="bg-white shadow-lg p-5" v-for="chapter in chapters"
               :key="chapter?.id">
            <div>
              <p class="font-bold text-lg text-secondary-800">{{ chapter?.course?.name }}</p>
              <p class="font-semibold text-sm text-secondary-500">{{ chapter?.chapter_title }}</p>
            </div>

            <hr>
            <div class="mt-10 flex flex-col gap-3">
              <div class="shadow-sm bg-secondary-50 p-3 flex items-center justify-between rounded-lg"
                   v-for="video in chapter?.videos">
                <div>
                  <p class="font-bold text-sm text-secondary-800">{{ video?.name }}</p>
                  <p class="font-semibold text-xs text-secondary-500">{{ video?.description }}</p>
                </div>
                <div class="flex items-center gap-3">
                  <button v-if="video?.video"
                          @click="playVideoId = video"
                          class="w-7 h-7 flex items-center justify-center bg-orange-100 transition-all ease-in-out duration-150 hover:bg-orange-300 rounded-full">
                    <Icon name="solar:play-bold" class="text-orange-400" size="15"/>
                  </button>
                  <button v-if="video?.file"
                          class="w-7 h-7 flex items-center justify-center bg-red-100 transition-all ease-in-out duration-150 hover:bg-red-300 rounded-full">
                    <Icon name="solar:link-line-duotone" class="text-red-700" size="15"/>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div class="w-full lg:w-[70%] bg-white" v-if="playVideoId?.video">
          <div class="px-5 py-4">
            <h2 class="font-bold text-lg text-secondary-900">{{ playVideoId?.name }}</h2>
          </div>
          <client-only class="w-full">
            <iframe :src="`https://player.vimeo.com/video/${playVideoId?.video}?h={hash_parameter}`"
                    width="100%"
                    height="auto"
                    frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<!--            <div class="w-full aspect-w-16 aspect-h-9">
              <vueVimeoPlayer :video-id="playVideoId?.video" class="w-full h-full" />
            </div>-->
          </client-only>
          <div class="px-5 py-4 mt-10 border-t">
            <p>{{ playVideoId?.description }}</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>