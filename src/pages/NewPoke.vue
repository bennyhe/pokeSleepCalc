<script setup>
import CptPoke from '../components/CptPoke/ItemIndex.vue'
import { formatTime, get } from '../utils/index.js'
import { pokedex, updatePoke } from '../config/pokedex.js'

const newUpdatePoke = updatePoke.reverse()

const getShowKeyVal = pokemonsItem => {
  const showKey = ['pokeType']
  if(pokedex[pokemonsItem] && get('pokeType', pokedex[pokemonsItem])) {
    const res =  pokedex[pokemonsItem]
    // console.log(res)
    if(res.pokeType === 1) { // 树果型
      showKey.push('helpSpeed', 'berry')
    } else if(res.pokeType === 2) { // 食材型
      showKey.push('food', 'foodPer')
    }
  }
  // console.log(showKey)
  return showKey
}
</script>
<template>
  <h2>最新宝可梦</h2>
  <ul class="cpt-list">
    <li v-for="updateItem in newUpdatePoke" v-bind:key="updateItem.time">
      <h3>
        {{ formatTime(updateItem.time, "YY年MM月") }}(<span class="sptime"
          >{{ updateItem.pokemons.length }}只</span
        >)：
      </h3>
      <CptPoke
        :pokeId="pokemonsItem"
        v-for="pokemonsItem in updateItem.pokemons"
        v-bind:key="pokemonsItem"
        :showKey="getShowKeyVal(pokemonsItem)"
      />
    </li>
  </ul>
</template>