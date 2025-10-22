<script setup>
import { defineProps } from 'vue'
import { extractPrefix } from '../../utils/index.js'
const props = defineProps({
  pokeId: {
    type: [String, Number]
  },
  isShiny: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: ''
  }
})
</script>
<template>
  <div class="cpt-avatar" :class="`cpt-avatar--${size}`">
    <img
      class="cpt-avatar__pic"
      v-lazy="
        `./img/pokedex/${isShiny ? 'shiny/' : ''}${extractPrefix(pokeId)}.png`
      "
      :alt="$t(`POKEMON_NAME.${pokeId}`)"
    />
    <slot />
  </div>
</template>