<script setup>
import { ref } from 'vue'
import CptPoke from '../components/CptPoke/ItemIndex.vue'
import { pokedex } from '../config/pokedex.js'
import { get, sortInObjectOptions } from '../utils/index.js'
import { POKE_TYPES, FOOD_TYPES } from '../config/valKey.js'

const isShowAll = ref(true)
const showRes = ref([])
const byHelpSpeedRes = ref([])
const initFilterGroup = () => {
  let byHelpSpeedResIn = []
  const byHelpSpeedBaseList = []
  for (const pokeKey in pokedex) {
    if (Object.hasOwnProperty.call(pokedex, pokeKey)) {
      const pokedexItem = pokedex[pokeKey]
      if (
        pokedexItem.helpSpeed &&
        !byHelpSpeedBaseList.includes(pokedexItem.helpSpeed)
      ) {
        byHelpSpeedResIn.push({
          id: pokedexItem.helpSpee,
          helpSpeed: pokedexItem.helpSpeed,
          list: []
        })
        byHelpSpeedBaseList.push(pokedexItem.helpSpeed)
      }
      byHelpSpeedResIn
        .find(item => item.helpSpeed === pokedexItem.helpSpeed)
        .list.push(pokedexItem)
    }
  }
  byHelpSpeedResIn.forEach(item => {
    item.list = sortInObjectOptions([...item.list], ['pokeType', 'berryType', 'id'], 'up')
  })
  byHelpSpeedResIn = sortInObjectOptions(byHelpSpeedResIn, ['helpSpeed'], 'up')

  byHelpSpeedRes.value = byHelpSpeedResIn
}
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

const fnGetBy = filterType => {
  if (filterType === 'all') {
    isShowAll.value = true
  } else{
    isShowAll.value = false
  }
  if (filterType === 'helpSpeed') {
    showRes.value = byHelpSpeedRes.value
  }
}

initFilterGroup() // 初始化索引
</script>
<template>
  <h2>全图鉴速查</h2>
  <div class="btn-wrap">
    <span class="btn btn-m" @click="fnGetBy('all')">ALL</span>
    <span class="btn btn-m" @click="fnGetBy('helpSpeed')">帮忙速度↓</span>
  </div>
  <div v-if="isShowAll === false">
    <div v-for="resItem in showRes" v-bind:key="resItem.id">
      <h3>{{ resItem.helpSpeed }}s</h3>
      <div>
        <CptPoke
          :pokeId="pokemonsItem.id"
          v-for="(pokemonsItem, pokemonKey) in resItem.list"
          v-bind:key="pokemonsItem.name"
          :showKey="getShowKeyVal(pokemonKey)"
        />
      </div>
    </div>
  </div>
  <!-- S 全图鉴 -->
  <div v-else>
    <CptPoke
      :pokeId="+pokemonKey"
      v-for="(pokemonsItem, pokemonKey) in pokedex"
      v-bind:key="pokemonsItem.name"
      :showKey="getShowKeyVal(pokemonKey)"
    />
    <!-- E 全图鉴 -->
  </div>
</template>