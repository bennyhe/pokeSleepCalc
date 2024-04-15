<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  type: {
    type: [String]
  },
  size: {
    type: [String]
  }
})
</script>
<template>
  <template v-if="type">
    <svg
      class="svg-icon"
      :class="`svg-icon--${size}`"
      v-if="type === 'arrowDown'"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      data-v-ea893728=""
    >
      <path
        fill="currentColor"
        d="M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
      ></path>
    </svg>
    <svg
      v-else-if="type === 'lock'"
      class="svg-icon"
      :class="`svg-icon--${size}`"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path
        d="M791.1 388.4h-92.9V311c0-49.7-19.3-96.4-54.4-131.5-35.1-35.1-81.8-54.4-131.5-54.4s-96.4 19.3-131.5 54.4-54.4 81.8-54.4 131.5v77.4h-92.9c-8.6 0-15.5 7-15.5 15.5v433.7c0 8.6 7 15.5 15.5 15.5h557.6c8.6 0 15.5-7 15.5-15.5V403.9c0-8.6-6.9-15.5-15.5-15.5zM357.5 311c0-41.4 16.1-80.3 45.3-109.5 29.2-29.2 68.1-45.3 109.5-45.3 41.4 0 80.3 16.1 109.5 45.3 29.2 29.2 45.3 68.1 45.3 109.5v77.4H357.5V311zm418.1 511.1H249.1V419.4h526.5v402.7z"
      />
      <path
        d="M558.8 589.8c0 13.7-6.1 25.9-15.5 34.4v43c0 17.1-13.9 31-31 31s-31-13.9-31-31v-43c-9.4-8.5-15.5-20.7-15.5-34.4 0-25.7 20.8-46.5 46.5-46.5s46.5 20.8 46.5 46.5z"
      />
    </svg>
  </template>
</template>