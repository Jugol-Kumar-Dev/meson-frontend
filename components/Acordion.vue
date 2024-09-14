<template>
  <div class="space-y-8">
    <div class="border-b border-dashed border-gray-200">
      <div class="flex justify-between items-center">
        <button @click="toggleAccordion"
            class="w-full text-left px-4 py-2">
          <span class="text-sm font-bold text-slate-800">{{ title }}</span>
        </button>
        <Icon :name="isOpen ? 'material-symbols:keyboard-arrow-down-rounded' : 'material-symbols:keyboard-arrow-up-rounded'"
              class="font-bold transition-all ease-in-out duration-500" size="30"/>
      </div>
      <div v-if="isOpen" class="ms-4 font-normal text-xs text-slate-600 px-4 py-2">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  }
})

const isOpen = ref(false)

const toggleAccordion = () => {
  isOpen.value = !isOpen.value
}
</script>

<style>
/* Tailwind-based accordion transition */
.accordion-enter-active, .accordion-leave-active {
  transition: all 0.3s linear;
  opacity: 1;
}
.accordion-enter-from, .accordion-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}
.accordion-enter-to, .accordion-leave-from {
  max-height: 500px; /* Adjust based on content height */
  opacity: 0;

}
</style>
