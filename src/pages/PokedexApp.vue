<script setup>
import CptPoke from '../components/CptPoke/ItemIndex.vue'
import { pokedex } from '../config/pokedex.js'

const pokeList = [
  {
    evoLine: [1, 2, 3],
    needFood: [[9], [9], [4, 9]]
  }
]
</script>
<template>
  <h2>食材宝可梦推荐食材</h2>
  <ul class="score-list">
    <li v-for="(pokeItem, pokeKey) in pokeList" v-bind:key="pokeKey">
      <CptPoke
        :pokeId="pokemonsItem"
        v-for="pokemonsItem in pokeItem.evoLine"
        v-bind:key="pokemonsItem"
      />
      <img
        v-lazy="`./img/food/${foodItem}.png`"
        v-for="foodItem in pokeItem.needFood"
        v-bind:key="foodItem"
      />
    </li>
  </ul>
</template>