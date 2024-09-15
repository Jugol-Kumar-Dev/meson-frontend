<script setup>
</script>
<template>
  <div class="w-full bg-secondary-200 min-h-screen flex">
    <aside class="w-48 mx-auto overflow-y-scroll scrollbar-hide fixed top-0 left-0 bottom-0 h-screen bg-secondary-900">
      <StudentSideBar />
    </aside>
    <main class="ml-48 w-full p-4 mb-8">
      <StudentHeader/>
      <div class="mt-16">
        <slot />
      </div>
    </main>
  </div>
</template>
