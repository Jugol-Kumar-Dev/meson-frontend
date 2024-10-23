<script setup>
const showMenuSidebar = ref(false);

</script>
<template>
  <div class="w-full bg-secondary-200 min-h-screen flex">

    <aside class="hidden lg:block w-48 mx-auto h-full overflow-y-scroll scrollbar-hide fixed top-0 left-0 bottom-0 min-h-screen bg-secondary-900 transition-all ease-in-out duration-200">
      <StudentSideBar/>
    </aside>

    <aside :class="showMenuSidebar ? 'opacity-100 -ms-1 translate-x-1 z-50' : 'opacity-0 translate-x-0 -z-50'"
           class="block md:hidden w-48 mx-auto h-full overflow-y-scroll scrollbar-hide fixed top-0 left-0 bottom-0 min-h-screen bg-secondary-900 transition-all ease-in-out duration-200">
      <StudentSideBar/>
    </aside>

    <main class="lg:ml-48 w-full lg:p-4 h-full ">
      <StudentHeader @showSidebar="showMenuSidebar = !showMenuSidebar"/>
      <div class="mt-16 p-2 lg:p-0 h-full min-h-[79vh] relative">
        <slot />
      </div>
      <footer>
        <div class="flex items-center justify-between text-sm lg:text-base text-gray-600">
          <p class="text-center text-xs">{{ new Date()?.getFullYear() }} Copyright © <a class="text-primary-500 underline" href="https://mesonacademy.com">Meson Academy</a>. All rights reserved.</p>
          <p class="text-center text-xs"><a class="text-primary-500 underline" href="https://creativetechpark.com" target="_blank">Web Development Company</a> Creative Tech Park</p>
        </div>
      </footer>
    </main>

  </div>
</template>
