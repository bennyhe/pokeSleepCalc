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
  <div class="cpt-pokemon">
    <div class="cpt-pokemon__pic">
      <img v-lazy="`./img/pokedex/${pokeId}.png`" :alt="pokedex[pokeId].name"/>
    </div>
    <p class="cpt-pokemon__name">{{ pokedex[pokeId].name }}</p>
    <p v-if="pokedex[pokeId].helpSpeed">{{ pokedex[pokeId].helpSpeed }}s</p>
    <p v-if="pokedex[pokeId].foodPer">食{{ pokedex[pokeId].foodPer }}%</p>
  </div>
</template>