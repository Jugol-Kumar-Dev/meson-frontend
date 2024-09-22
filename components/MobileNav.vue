<script setup lang="ts">
import {ref} from 'vue'

const toggleNav = ref(false);
</script>

<template>
  <!--  phone nav bar-->

  <nav
      class="lg:hidden px-5 z-50 fixed top-0 left-0 right-0 w-full bg-primary-500 shadow-xl flex items-center justify-between py-2">

    <!--        menu & logo  -->


    <div>
      <NuxtLink to="/" class="">
        <img class="w-24 h-auto" src="@/assets/images/white-logo.png" alt="Logo">
      </NuxtLink>
    </div>


    <div class="elegance-hamburger-menu" @click="toggleNav = !toggleNav">
      <div class="elegance-hamburger-menu__btn" :class="{'elegance-hamburger-menu__btn--active' : toggleNav}">
        <span></span>
      </div>
    </div>


  </nav>
  <div :class="{'translate-x-0': toggleNav, 'translate-x-80': !toggleNav}" class="fixed top-0 right-0 bottom-0 w-64 h-full z-50 lg:hidden transition-all ease-in-out duration-500
                         bg-secondary border-2 border-gray-100 overflow-y-scroll">
    <div class="flex justify-between p-3 bg-primary-500">
      <button @click="toggleNav = false">
        <Icon name="material-symbols:close-small" class=" text-4xl text-white"/>
      </button>
      <div class="flex items-center gap-4">
        <NuxtLink to="/login">
          <Icon
              name="streamline:interface-id-user-identification-angle-secure-human-id-person-face-silhouette-security-brackets"
              class="text-lg text-secondary"/>
        </NuxtLink>
        <NuxtLink to="#">
          <Icon name="ic:baseline-app-registration" class="text-2xl text-secondary"/>
        </NuxtLink>
      </div>
    </div>

    <div class="px-4 py-3 text-gray-600 ">
      <h2 class="tracking-wider font-extrabold text-base text-primary-500">Menu</h2>
      <ul class="py-3 px-2 text-primary-500 leading-loose font-semibold text-xs tracking-wide">
        <li>
          <NuxtLink to="#" class="text-nowrap ">All Categories</NuxtLink>
        </li>
        <li>Phone</li>
        <li>iPad & Tab</li>
        <li>Mac</li>
        <li>Wearables</li>
        <li>Headphones & Speaker</li>
        <li>Accessorries</li>
        <li>Camera</li>
        <li>Video Game</li>
      </ul>
      <h2 class="tracking-wider font-extrabold text-base text-primary-500">Top Brand</h2>
      <ul class="py-3 px-2 text-primary-500 leading-loose font-semibold text-xs tracking-wide">
        <li class=" uppercase">Samsung</li>
        <li class=" uppercase">Huawei</li>
        <li class=" uppercase">Oppo</li>
        <li class=" uppercase">Vivo</li>
        <li class=" uppercase">Nokia</li>
        <li class=" uppercase">Realme</li>
      </ul>
    </div>
  </div>
  <!--  phone nav bar end-->
</template>
