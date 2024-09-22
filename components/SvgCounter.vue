<script setup>

const {score, total} = defineProps({score:Number, total:Number})
const circleUpdate = (score, total) =>{
  const percentage = (score / total) * 100;
  const circle = document.querySelector('.circle');
  const text = document.querySelector('.percentage');
  circle.setAttribute('stroke-dasharray', `${percentage}, 100`);
  text.textContent = `${score}/${total}`;
}

onMounted(()=> circleUpdate(score,total))

</script>


<template>
  <svg class="progress-circle" width="150" height="150" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
    <path
        class="circle-bg"
        d="M18 2.0845
         a 15.9155 15.9155 0 0 1 0 31.831
         a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke-width="4"
    />
    <path
        class="circle"
        stroke-dasharray="0, 100"
        d="M18 2.0845
         a 15.9155 15.9155 0 0 1 0 31.831
         a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke-width="4"
        stroke-linecap="round"
    />
    <text x="18" y="20.35" class="percentage" text-anchor="middle" alignment-baseline="middle">0/10</text>
  </svg>
</template>
<style >
.circle-bg {
  stroke: #e6e6e6;
}

.circle {
  transition: stroke-dasharray 0.4s ease;
  stroke: #4caf50;
  stroke-linecap: round;
}

.percentage {
  font-size: 0.5em;
  fill: #4caf50;
}
</style>
