<script setup lang="ts">
import {computed} from "vue";

import {useApiFetch} from "~/composables/useApiFetch";
import moment from "moment";

definePageMeta({
  layout:'student',
  middleware:'auth'
})
const {authUser} = useTokenStore()

const handleImageError = (event: Event, name?: string): void => {
  // The event target is cast as an HTMLImageElement
  const target = event?.target as HTMLImageElement;

  // Default to 'User' if no name is provided
  const authUserName = name ?? 'User';

  // Set the image src to the generated URL
  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(authUserName)}`;
};

const post = ref({
  description:null,
  image:null
})


const postImg = ref(null)
const handelImage = (event:Event) =>{
  let data = event?.target?.files[0] as any
  post.value.image = data;
  postImg.value = URL.createObjectURL(data) as any;
}

const isDisabled = computed(()=> post.value.image || post.value.description)
const savePostLoading = ref(false)
const submitPost = async () => {
  savePostLoading.value = true
  const formData = new FormData();
  formData.append('description', post.value.description as any);
  formData.append('image', post.value.image as any); // File data
  const { data, error, execute } = await useApiFetch("/create-post", {
    method: "POST",
    body: formData, // Pass FormData object
    immediate: false,
    lazy: true,
    watch: false,
  });

  // Execute the API call
  await execute();

  if (error.value) {
    console.error('Error creating post:', error.value);
    return;
  }
  post.value.description = null
  post.value.image = null
  postImg.value = null

  push.success("Post created");
  await refresh();
  savePostLoading.value = false
};

const comment = ref({
  description:null,
  image:null
})
const commentLoading = ref(false)
const saveComment = async (blogId: Number) => {
  commentLoading.value = true;
  const formData = new FormData();
  formData.append('postId', blogId as any);
  formData.append('comment', comment.value.description as any);
  formData.append('image', comment.value.image as any);

  const { data, error, execute } = await useApiFetch("/create-post-comment", {
    method: "POST",
    body: formData,
    immediate: false,
    lazy: true,
    watch: false,
  });

  // Execute the API call
  await execute();

  if (error.value) {
    console.error('Error creating post:', error.value);
    return;
  }
  comment.value.description = null
  comment.value.image = null
  commentLoading.value = false;

  push.success("Comment created");
  await refresh();
};
const path = ref(`/group-posts`)
const {
  data: blogs,
  status: status,
  refresh
} = await useLazyAsyncData(`studentsBlogs${authUser?.id}`,
    () => $fetch(path.value, {
      baseURL: useRuntimeConfig().public?.studentAppUrl,
      headers: {
        Authorization: `Bearer ${useTokenStore().token}`,
        accept: "application/json",
      },
    }),{
      watch:[path]
    })


const deletePost = async (url:string) =>{
  if(confirm('Are you sure? Want to delete this item?')){
    const {data, error} = await useApiFetch(url,{method:"POST"})
    push.success("Post Deleted...")
    await refresh()
  }
}


onMounted(()=> refresh())
</script>

<template>
  <div class="max-w-5xl mx-auto my-6">
    <!-- Cover Photo and Profile Section -->
    <div class="relative bg-white shadow-lg rounded-lg">
      <!-- Cover Photo -->
      <div class="relative h-36 bg-blue-500 rounded-t-lg">
        <img src="https://sb.ecobnb.net/app/uploads/sites/3/2020/01/nature-1170x490.jpg"
             alt="Cover Photo" class="object-cover w-full h-full rounded-t-lg">
        <!-- Profile Picture -->
        <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <img :src="authUser?.photo_url" @error="handleImageError($event, authUser?.name)" alt="Profile Picture" class="w-36 h-36 rounded-full border-4 border-white">
        </div>
      </div>

      <!-- Profile Info -->
      <div class="text-center mt-20 px-6 pb-6">
        <h2 class="font-bold text-2xl text-gray-900">
          {{ authUser?.name }}
        </h2>
        <p class="text-sm text-gray-500">Student</p>

        <div class="mt-4 flex justify-center gap-4">
          <button @click="path = '/group-posts'" :class="path === '/group-posts' ? 'bg-primary-700 text-white' : 'bg-gray-100 text-gray-700'" class="px-4 py-1 rounded-full transition-all">All Post</button>
          <button @click="path = '/group-my-posts'" :class="path === '/group-my-posts' ? 'bg-primary-700 text-white' : 'bg-gray-100 text-gray-700'" class="px-4 py-1 rounded-full transition-all">My Post</button>
          <button @click="path = '/group-my-pending-posts'" :class="path === '/group-my-pending-posts' ? 'bg-primary-700 text-white' : 'bg-gray-100 text-gray-700'" class="px-4 py-1 rounded-full transition-all">My Pending Post</button>
        </div>

      </div>
    </div>
  </div>
  <div class="max-w-xl mx-auto my-6">
    <!-- New Post Box -->
    <div class="bg-white shadow-md rounded-lg p-4">
      <div class="flex gap-2">
        <img src="https://via.placeholder.com/40" alt="Profile" class="w-10 h-10 rounded-full">
        <div class="flex flex-col">
          <h3 class="font-semibold text-gray-900">{{ authUser?.name }}</h3>
          <p class="text-sm text-gray-500">{{ moment(new Date())?.format('lll')}}</p>
        </div>
      </div>
      <div class="mt-4">
        <textarea rows="5" v-model="post.description" class="w-full focus:outline-none border-none appearance-none scrollbar-hide" placeholder="Whats on your mind?"></textarea>
      </div>
      <div class="flex justify-between mt-3">
        <label for="inputImage" class="cursor-pointer flex items-center gap-2 text-gray-600 hover:text-blue-500">
          <Icon name="solar:graph-new-line-duotone"></Icon> Photo
          <input type="file" @input="handelImage" id="inputImage" class="hidden">
        </label>
      </div>

      <!-- Post Image -->
      <div class="mb-4">
        <img v-if="postImg" :src="postImg" alt="Post Image" class="rounded-lg w-full max-h-40 object-cover">
      </div>
      <LoadingButton :isLoading="savePostLoading.value" @click="submitPost">
        Post
      </LoadingButton>
    </div>

    <!-- Post Container -->
    <div class="bg-white shadow-md rounded-lg p-4 mt-6" v-for="blog in blogs?.data">
      <!-- Post Header -->
      <div class="flex justify-between">
        <div class="flex items-center gap-3 mb-4">
          <img :src="blog?.user?.photo_url" @error="handleImageError($event, blog?.user?.name)" alt="Profile" class="w-10 h-10 rounded-full">
          <div>
            <h3 class="font-semibold text-gray-900">{{ blog?.user?.name }}</h3>
            <p class="text-sm text-gray-500">{{ moment(blog?.created_at)?.fromNow(true) }} ago</p>
          </div>
        </div>

        <div class="relative" v-if="blog?.user?.id === authUser?.id">
<!--          <DeleteButton class="hidden lg:block" :path="`/group-posts/delete/${blog?.id}`" @deleted="refresh">-->
<!--            <Icon name="solar:trash-bin-minimalistic-2-bold-duotone " class="text-red-500"/>-->
<!--          </DeleteButton>-->
          <button @click="deletePost(`/group-posts/delete/${blog?.id}`)" class="py-1.5 px-2 rounded-lg bg-red-100">
            <Icon name="solar:trash-bin-minimalistic-2-bold-duotone" class="text-red-700"/>
          </button>
        </div>
      </div>
      <!-- Post Content -->
      <div class="mb-4">
        <span class="text-gray-700" v-html="blog?.description"/>
      </div>
      <!-- Post Image -->
      <div class="mb-4" v-if="blog?.image_url">
        <img :src="blog?.image_url" alt="Post Image" class="rounded-lg w-full">
      </div>
      <!-- Post Actions -->
<!--      <div class="flex justify-between text-gray-600 border-t border-b py-2">
        <button class="flex items-center gap-2 hover:text-blue-500">
          <Icon name="solar:like-broken" class="bi bi-hand-thumbs-up"></Icon> Like
        </button>
        <button class="flex items-center gap-2 hover:text-blue-500">
          <Icon name="solar:chat-round-like-line-duotone" class="bi bi-hand-thumbs-up rotate-1"></Icon>Comment
        </button>
      </div>-->
      <!-- Comment Section -->
      <div class="mt-4 border-t pt-3">
        <div class="flex items-center gap-3 mb-2">
          <img :src="authUser?.photo_url" @error="handleImageError($event, authUser?.name)" alt="Profile" class="w-8 h-8 rounded-full">
          <div class="relative w-full">
            <input type="text" :disabled="commentLoading" v-model="comment.description" @keyup.enter="saveComment(blog?.id)"
                   placeholder="Write a comment..."
                   class="w-full p-2 rounded-full border disabled:bg-primary-200 bg-gray-100 focus:outline-none focus:border-gray-300">
            <button @click="saveComment(blog?.id)" class="absolute w-7 h-7 rounded-full top-2 right-2 hover:bg-secondary-300 text-white flex items-center justify-center">
              <Icon name="solar:plain-bold-duotone" class="text-secondary-600 rotate-45" size="19"/>
            </button>
          </div>
        </div>

        <!-- Comments -->
        <div class="mt-2" v-if="blog?.comments?.length">
          <div class="flex items-start gap-3 mb-2" v-for="comment in blog?.comments" :key="`s-coment-${comment?.id}`">
            <img :src="comment?.user?.photo_url" @error="handleImageError($event, comment?.user?.name)" alt="Profile" class="w-8 h-8 rounded-full">
            <div>
              <div class="bg-gray-100 p-3 rounded-lg">
                <p class="text-gray-800 font-semibold">{{ comment?.user?.name }}</p>
                <p class="text-gray-700 text-sm">
                  {{ comment?.message }}
                </p>
              </div>
              <div class="text-xs text-gray-500 mt-1">{{ moment(comment?.created_at)?.fromNow(true)  }} ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>