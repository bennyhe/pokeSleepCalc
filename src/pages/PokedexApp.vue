<script setup>
import CptPoke from '../components/CptPoke/ItemIndex.vue'
import { pokedex } from '../config/pokedex.js'
import { get } from '../utils/index.js'
import { POKE_TYPES, FOOD_TYPES } from '../config/valKey.js'

const getShowKeyVal = pokemonsItem => {
  const showKey = ['helpSpeed', 'berry', 'pokeType']
  if (pokedex[pokemonsItem] && get('pokeType', pokedex[pokemonsItem])) {
    const res = pokedex[pokemonsItem]
    // console.log(res)
    if (res.pokeType === 1) {
      // 树果型
      // showKey.push('helpSpeed', 'berry')
    } else if (res.pokeType === 2) {
      // 食材型
      showKey.push('food', 'foodPer')
    }
  }
  // console.log(showKey)
  return showKey
}
</script>
<template>
  <h2>全图鉴速查</h2>
      <CptPoke
        :pokeId="pokemonKey"
        v-for="(pokemonsItem, pokemonKey) in pokedex"
        v-bind:key="pokemonKey"
        :showKey="getShowKeyVal(pokemonKey)"
      />
</template>