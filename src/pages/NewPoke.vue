<script setup>
import CptPoke from '../components/CptPoke/ItemIndex.vue'
import { formatTime } from '../utils/index.js'
import { updatePoke } from '../config/pokedex.js'

const newUpdatePoke = updatePoke.reverse()
</script>
<template>
  <h2>最新宝可梦</h2>
  <ul class="cpt-list">
    <li v-for="updateItem in newUpdatePoke" v-bind:key="updateItem.time">
      {{ formatTime(updateItem.time, "YY年MM月") }}
      (<span class="sptime">{{ updateItem.pokemons.length }}只</span>)：
      <CptPoke
        :pokeId="pokemonsItem"
        v-for="pokemonsItem in updateItem.pokemons"
        v-bind:key="pokemonsItem"
      />
    </li>
  </ul>
</template>