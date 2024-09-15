<script setup>
const activeLink = ref(null);
const setItem = (item) => activeLink.value = item
const menus = ref([
  {
    name: 'Dashboard',
    path: '/student/dashboard',
    icon: 'solar:home-smile-angle-bold-duotone',
  },
  {
    name: 'Courses',
    icon: 'solar:chat-round-video-bold-duotone',
    submenu: [
      {
        name: 'Enrolled Courses',
        path: '/student/courses/enrolled',
        can: ['authorization.index'],
      },
      {
        name: 'Add Course',
        path: '#',
        can: ['authorization.create'],
      }
    ]
  },
  {
    name: 'Past Exams',
    path: '/student/exam/pastexams',
    icon: 'solar:question-circle-bold-duotone',
  },
  {
    name: 'Practice Exams',
    path: '/student/exam/practiceexam',
    icon: 'solar:question-square-bold-duotone',
  },
  {
    name: 'Past Classes',
    path: '/student/dashboard',
    icon: 'solar:bookmark-square-bold-duotone',
  },
  /*   {
     name:'Users',
     icon:'solar:users-group-rounded-bold-duotone',
     can: ['user.index', 'user.create'],
     submenu:[
       {
         name:'Users',
         path:'/users',
         can: ['user.index'],
       },
       {
         name:'Create User',
         path:'/add-user',
         can: ['user.create'],
       },
     ]
   },
   {
     name:'Category',
     path:'/category',
     icon:'solar:widget-6-bold-duotone',
   },
   {
     name:'Vendor',
     icon:'solar:shop-bold-duotone',
     can: ['user.index', 'user.create'],
     submenu:[
       {
         name:'Vendors',
         path:'/vendor',
         can: ['user.index'],
       },
       {
         name:'Create Vendor',
         path:'/add-vendor',
         can: ['user.create'],
       },
     ]
   },
   {
     name:'Product',
     icon:'solar:palette-round-bold-duotone',
     can: ['user.index', 'user.create'],
     submenu:[
       {
         name:'Products',
         path:'/products',
         can: ['user.index'],
       },
       {
         name:'Create Product',
         path:'/add-product',
         can: ['user.create'],
       },
     ]
   },
   {
     name:'Settings',
     path:'/settings',
     icon:'solar:settings-bold-duotone',
     can: ['settings.show']
   },*/
])
</script>

<template>
  <div class="relative">
    <div class="bg-secondary-800 py-5 mb-10">
      <p class="text-white text-center uppercase tracking-widest font-bold">Messon Lms</p>
    </div>
    <ul class="flex flex-col">
      <template v-for="item in menus">
        <!--        <li class="sidebar-item" v-if="item?.submenu?.length && (user.roles[0]?.name === supperAdmin || item.can?.some(permission => user.can?.includes(permission)))">-->
        <li class="sidebar-item" v-if="item?.submenu?.length">
          <div
              class="group flex items-center gap-3 rounded-lg transition-all ease-in-out duration-300 cursor-pointer relative"
              @click="setItem(activeLink === item.name ? null : item.name)">
            <Icon :name="item.icon" class="text-white"/>
            <span class="text-white text-xs font-normal transition-all ease-in-out duration-300">{{ item.name }}</span>
            <div class="absolute top-1/2 -translate-y-1/2 right-2 transition-all  ease-in-out duration-300"
                 :class="{'rotate-90 ' : activeLink === item.name}">
              <Icon name="solar:double-alt-arrow-right-line-duotone" size="20"
                    class="text-white transition-all ease-in-out duration-300"/>
            </div>
          </div>
          <div class="overflow-hidden">
            <ul class="shop-links flex flex-col gap-4 pl-4 py-4"
                :class="{'shop-links--active' : activeLink === item.name}">
              <template v-for="menu in item?.submenu">
                <!--                <li v-if="user.roles[0]?.name === supperAdmin || menu.can?.some(subPer => user.can?.includes(subPer))">-->
                <li>
                  <RouterLink :to="menu.path" class="flex items-center gap-3 ">
                    <Icon name="solar:check-read-line-duotone" class="text-white"/>
                    <span class="text-sm text-white">{{ menu?.name }}</span>
                  </RouterLink>
                </li>
              </template>
            </ul>
          </div>
        </li>
        <!--        <li class="sidebar-item" v-else v-if="!item?.submenu?.length && (user.roles[0]?.name === supperAdmin || item.can?.some(permission => user.can?.includes(permission)))">-->
        <li class="sidebar-item" v-else>
          <RouterLink :to="item.path" class="flex items-center gap-2">
            <Icon :name="item.icon" class="text-white"/>
            <p class="text-white text-xs">{{ item?.name }}</p>
          </RouterLink>
        </li>
      </template>
    </ul>
  </div>
</template>
