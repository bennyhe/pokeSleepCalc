<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  score: {
    type: Number
  }
})
</script>

<template>
  <div class="mod-process">
    <div
      class="mod-process__val"
      :style="`transform:translateY(${100 - props.score}%)`"
    ></div>
    <div class="mod-process__info">{{ props.score }}</div>
  </div>
</template>