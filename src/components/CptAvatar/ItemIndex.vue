<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  pokeId: {
    type: [String, Number]
  }
  // isShiny: {
  //   type: Boolean,
  //   default: false
  // }
})
</script>
<template>
  <div class="cpt-avatar">
    <img
      class="cpt-avatar__pic"
      v-lazy="`./img/pokedex/${pokeId}.png`"
      :alt="$t(`POKEMON_NAME.${pokeId}`)"
    />
    <slot />
  </div>
</template>