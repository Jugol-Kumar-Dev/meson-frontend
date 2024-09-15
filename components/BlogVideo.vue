<template>
    <Container>
        <div class="flex flex-col items-center justify-center  pt-10 lg:pt-20 ">
            <h2 class="text-xl lg:text-4xl max-w-xl leading-normal text-gray-800 font-bold text-center">What is in the Online Batch Throughout the Year?</h2>
            <p class="text-center text-xs lg:text-lg font-medium py-4 text-gray-600">May the Progress of Education Continue From any Part of the Country Under the Care of the Best Teachers</p>
        </div>

        <div class="flex flex-col lg:flex-row lg:pt-16">
            <div class="w-full lg:w-1/3 px-4" v-for="item in 3" v-motion-fade-visible>
                <div class="rounded-xl border hover:border-primary transition-all ease-in-out duration-500">
                    <div class="p-2">
                        <img class="w-full rounded-xl " src="https://cdn.10minuteschool.com/images/thumbnails/HSC_26_OB_Thumbnails/hsc-2026-online-batch-science-group-thumbnail.jpg?w=272&h=152" alt="" />
                    </div>
                    <div class="p-5">
                        <h2 class="text-lg lg:text-xl font-semibold pb-3">Every Chapter Will Have Practice as Desired</h2>
                        <p class="text-xs lg:text-sm text-gray-600 font medium">Online batch library provides opportunity to practice chapter-wise questions of all subjects</p>
                    </div>
                </div>
            </div>  
        </div>
        <div class="flex justify-center">
            <button class="flex items-center gap-3 my-8 lg:my-16 rounded bg-primary-500 hover:bg-purple-700 text-white px-4 py-2 text-lg font-semibold">
                Chooce Your Class
                <Icon name="material-symbols:arrow-forward-ios-rounded" class="text-xl text-white" />
            </button>
        </div>
            

</Container>    
</template>