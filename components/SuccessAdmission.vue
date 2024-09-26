<script setup>
const { data,  status, refresh } =
    await useLazyAsyncData('admission-success',
        () =>$fetch(`/get-settings?name=counter`, {
          baseURL: useRuntimeConfig().public?.frontendAppUrl,
          headers: {
            accept: "application/json",
          },
        }))

onMounted(()=> refresh())
</script>


<template>
    <section class="relative bg-[url('@/assets/images/banner-2.gif')] bg-no-repeat bg-cover pt-10 lg:py-16 lg:my-16">
        <span class="absolute top-0 left-0 bottom-0 right-0 w-full h-full bg-black/65"></span>
        <Container class="relative z-10">
            <h2 class=" text-xl lg:text-4xl font-bold text-center text-white tracking-wide">{{ data?.counter?.title }}</h2>
<!--            <p class=" text-white font-semibold text-xl py-2 text-center">Your Success is Our Inspiration</p>-->
            <div class="flex flex-col lg:gap-0 lg:flex-row gap-4 py-10">
                <div class="w-full lg:w-1/3 px-2 lg:px-5">
                    <div class="flex flex-col items-center justify-center  py-5 lg:py-0 w-full lg:h-40 cursor-pointer bg-white bg-opacity-15 border border-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md">
                        <h2 class="text-sm lg:text-4xl font-bold tracking-widest text-white">{{ data?.counter?.students }}+</h2>
                        <p class="text-white font-semibold text-xs px-1 lg:px-0 text-center lg:text-lg py-2 ">Total Students</p>
                    </div>
                </div>
                <div class="w-full lg:w-1/3 px-2 lg:px-5">
                    <div class="flex flex-col items-center justify-center  py-5 lg:py-0 w-full lg:h-40 cursor-pointer bg-white bg-opacity-15 border border-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md">
                        <h2 class="text-sm lg:text-4xl font-bold tracking-widest text-white">{{ data?.counter?.courses }} +</h2>
                        <p class="text-white font-semibold text-xs px-1 lg:px-0 text-center lg:text-lg py-2 ">Total Course</p>
                    </div>
                </div>
                <div class="w-full lg:w-1/3 px-2 lg:px-5">
                    <div class="flex flex-col items-center justify-center  py-5 lg:py-0 w-full lg:h-40 cursor-pointer bg-white bg-opacity-15 border border-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md">
                        <h2 class="text-sm lg:text-4xl font-bold tracking-widest text-white">{{ data?.counter?.certificate }}+</h2>
                        <p class="text-white font-semibold text-xs px-1 lg:px-0 text-center lg:text-lg py-2 ">Got Success</p>
                    </div>
                </div>
<!--                <div class="w-full lg:w-1/3 px-2 lg:px-5">-->
<!--                    <div class="flex flex-col items-center justify-center w-full h-28 lg:h-40 cursor-pointer bg-white bg-opacity-15 border border-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm my-12">-->
<!--                        <h2 class="text-xl lg:text-4xl font-bold tracking-widest text-white">1,400+</h2>-->
<!--                        <p class="text-white font-semibold text-xs px-1 lg:px-0 lg:text-lg text-center py-2">A Chance Student</p>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="w-full lg:w-1/3 px-2 lg:px-5">-->
<!--                    <div class="flex flex-col items-center justify-center w-full h-28 lg:h-40 cursor-pointer bg-white bg-opacity-15 border border-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm my-12">-->
<!--                        <h2 class="text-xl lg:text-4xl font-bold tracking-widest text-white">34</h2>-->
<!--                        <p class="text-white font-semibold text-xs lg:text-lg px-1 lg:px-0 text-center py-2">Top 100 Chance students</p>-->
<!--                    </div>-->
<!--                </div>-->
            </div>
            
        </Container>
    </section>
</template>