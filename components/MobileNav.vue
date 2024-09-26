<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const toggleNav = ref(false);
const menuRef = ref(null); // Reference to the menu element

const { categories } = defineProps({ categories: Object });

// Function to close the menu if clicked outside
const handleClickOutside = (event) => {
  // if (toggleNav.value && menuRef.value && !menuRef.value.contains(event.target)) {
    toggleNav.value = false;
  // }
};

// Add event listener when component is mounted
onMounted(() => {
  window.addEventListener('click', handleClickOutside);
});

// Remove event listener when component is unmounted
onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside);
});

// Prevent closing the menu when clicking on the toggle button itself
const toggleMenu = (event) => {
  event.stopPropagation(); // Prevent click from bubbling up
  toggleNav.value = !toggleNav.value;
};
</script>

<template>
  <!-- Phone nav bar -->
  <nav class="lg:hidden px-5 z-50 fixed top-0 left-0 right-0 w-full bg-primary-500 shadow-xl flex items-center justify-between py-4">
    <div>
      <NuxtLink to="/">
        <img class="w-32 h-auto" src="@/assets/images/white-logo.png" alt="Logo">
      </NuxtLink>
    </div>
    <div class="elegance-hamburger-menu" @click="toggleMenu">
      <div class="elegance-hamburger-menu__btn" :class="{'elegance-hamburger-menu__btn--active': toggleNav}">
        <span></span>
      </div>
    </div>
  </nav>

  <div
      ref="menuRef"
      :class="{'translate-x-0': toggleNav, 'translate-x-80': !toggleNav}"
      class="fixed top-0 right-0 bottom-0 w-64 h-full z-50 lg:hidden transition-all ease-in-out duration-500 bg-white overflow-y-scroll"
      @click.stop
  >
    <div class="flex justify-between p-3 bg-primary-500">
      <button @click="toggleNav = false">
        <Icon name="material-symbols:close-small" class="text-4xl text-white"/>
      </button>
      <div class="flex items-center gap-4">
        <NuxtLink to="/login" class="bg-white border w-8 h-8 rounded-full flex items-center justify-center">
          <Icon name="solar:user-rounded-bold" size="20" class="text-lg text-secondary"/>
        </NuxtLink>
      </div>
    </div>

    <div class="px-4 py-3 text-gray-600">
      <h2 class="tracking-wider font-extrabold text-base text-primary-500">Menu</h2>
      <ul class="py-3 px-2 text-primary-500 leading-loose font-semibold text-sm tracking-wide">
        <li>
          <NuxtLink to="/courses" class="text-nowrap">All Courses</NuxtLink>
        </li>
        <li v-for="cat in categories?.categories" :key="`single-cat-menu-${cat.id}`">
          <NuxtLink :to="{ path: '/courses', query: { category: cat?.id } }" class="text-nowrap">
            {{ cat?.name }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
  <!-- Phone nav bar end -->
</template>
