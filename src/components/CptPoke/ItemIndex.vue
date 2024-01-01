<script setup>
import { defineProps } from 'vue'
import { pokedex } from '../../config/pokedex.js'
const props = defineProps({
  pokeId: {
    type: Number
  }
})
</script>


<template>
  <div class="mod-pokemon">
    <div class="mod-pokemon__pic">
      <img v-lazy="`./img/pokedex/${pokeId}.png`" />
    </div>
    <p class="mod-pokemon__name">{{ pokedex[pokeId].name }}</p>
  </div>
</template>