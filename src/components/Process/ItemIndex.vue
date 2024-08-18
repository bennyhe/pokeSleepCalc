<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  score: {
    type: Number
  }
})
</script>

<template>
  <div class="cpt-process">
    <div
      class="cpt-process__val"
      :style="`transform:translateY(${100 - props.score}%)`"
    ></div>
    <div class="cpt-process__info">{{ props.score }}</div>
  </div>
</template>