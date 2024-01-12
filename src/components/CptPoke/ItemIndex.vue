<script setup>
import { defineProps } from 'vue'
import { pokedex } from '../../config/pokedex.js'
import { pokeTypes } from '../../config/valKey.js'
const props = defineProps({
  pokeId: {
    type: Number
  },
  showKey: {
    type: Array
  }
})
</script>


<template>
  <div class="cpt-pokemon">
    <div class="cpt-pokemon__pic">
      <img v-lazy="`./img/pokedex/${pokeId}.png`" :alt="pokedex[pokeId].name"/>
    </div>
    <p v-if="pokedex[pokeId].pokeType>=0 && props.showKey && props.showKey.includes('pokeType')">{{ pokeTypes[pokedex[pokeId].pokeType] }}型</p>
    <p v-if="pokedex[pokeId].helpSpeed && props.showKey && props.showKey.includes('helpSpeed')">{{ pokedex[pokeId].helpSpeed }}s</p>
    <p v-if="pokedex[pokeId].foodPer && props.showKey && props.showKey.includes('foodPer')">食{{ pokedex[pokeId].foodPer }}%</p>
    <p class="cpt-pokemon__name">{{ pokedex[pokeId].name }}</p>
  </div>
</template>