<script setup>
import { ref } from 'vue'
import CptPoke from '../components/CptPoke/ItemIndex.vue'
import { pokedex } from '../config/pokedex.js'
import { get, sortInObjectOptions } from '../utils/index.js'
import {
  POKE_TYPES,
  FOOD_TYPES,
  BERRY_TYPES,
  SKILL_TYPES
} from '../config/valKey.js'

const isShowAll = ref(true)
const showRes = ref([])
const byHelpSpeedRes = ref([])
const byBerryTypeRes = ref([])
const bySkillTypeRes = ref([])
const initFilterGroup = () => {
  let byHelpSpeedResIn = []
  const byHelpSpeedOrgList = []

  let byBerryTypeResIn = []
  const byBerryTypeOrgList = []

  let bySkillTypeResIn = []
  const bySkillTypeOrgList = []

  for (const pokeKey in pokedex) {
    if (Object.hasOwnProperty.call(pokedex, pokeKey)) {
      const pokedexItem = pokedex[pokeKey]

      // 帮忙速度分类
      if (
        pokedexItem.helpSpeed &&
        !byHelpSpeedOrgList.includes(pokedexItem.helpSpeed)
      ) {
        byHelpSpeedResIn.push({
          id: pokedexItem.helpSpeed,
          helpSpeed: pokedexItem.helpSpeed,
          title: `${pokedexItem.helpSpeed}s`,
          list: []
        })
        byHelpSpeedOrgList.push(pokedexItem.helpSpeed)
      }
      byHelpSpeedResIn
        .find(item => item.helpSpeed === pokedexItem.helpSpeed)
        .list.push(pokedexItem)

      // 树果类型
      if (
        pokedexItem.berryType &&
        !byBerryTypeOrgList.includes(pokedexItem.berryType)
      ) {
        byBerryTypeResIn.push({
          id: pokedexItem.berryType,
          berryType: pokedexItem.berryType,
          title: `${BERRY_TYPES[pokedexItem.berryType]}`,
          list: []
        })
        byBerryTypeOrgList.push(pokedexItem.berryType)
      }
      byBerryTypeResIn
        .find(item => item.berryType === pokedexItem.berryType)
        .list.push(pokedexItem)

      // 技能类型
      if (
        pokedexItem.skillType &&
        !bySkillTypeOrgList.includes(pokedexItem.skillType)
      ) {
        bySkillTypeResIn.push({
          id: pokedexItem.skillType,
          skillType: pokedexItem.skillType,
          title: `${SKILL_TYPES[pokedexItem.skillType].name}`,
          list: []
        })
        bySkillTypeOrgList.push(pokedexItem.skillType)
      }
      bySkillTypeResIn
        .find(item => item.skillType === pokedexItem.skillType)
        .list.push(pokedexItem)
    }
  }
  byHelpSpeedResIn.forEach(item => {
    item.count = item.list.length
    item.list = sortInObjectOptions(
      [...item.list],
      ['pokeType', 'berryType', 'id'],
      'up'
    )
  })
  byHelpSpeedResIn = sortInObjectOptions(byHelpSpeedResIn, ['helpSpeed'], 'up')
  byHelpSpeedRes.value = byHelpSpeedResIn

  byBerryTypeResIn.forEach(item => {
    item.count = item.list.length
    item.list = sortInObjectOptions(
      [...item.list],
      ['berryType', 'pokeType'],
      'up'
    )
  })
  byBerryTypeResIn = sortInObjectOptions(
    byBerryTypeResIn,
    ['count', 'skillType'],
    'down'
  )
  byBerryTypeRes.value = byBerryTypeResIn

  bySkillTypeResIn.forEach(item => {
    item.count = item.list.length
    item.list = sortInObjectOptions([...item.list], ['pokeType'], 'down')
  })
  bySkillTypeResIn = sortInObjectOptions(
    bySkillTypeResIn,
    ['count', 'SkillType'],
    'down'
  )
  bySkillTypeRes.value = bySkillTypeResIn
}
const getShowKeyVal = pokemonsItem => {
  const showKey = ['helpSpeed', 'berry', 'pokeType', 'skillType', 'foodPer', 'fullFood']
  // if (pokedex[pokemonsItem] && get('pokeType', pokedex[pokemonsItem])) {
  //   const res = pokedex[pokemonsItem]
  //   // console.log(res)
  //   if (res.pokeType === 1) {
  //     // 树果型
  //     // showKey.push('helpSpeed', 'berry')
  //   } else if (res.pokeType === 2) {
  //     // 食材型
  //     // showKey.push('foodPer')
  //   }
  // }
  // console.log(showKey)
  return showKey
}

const fnGetBy = filterType => {
  if (filterType === 'all') {
    isShowAll.value = true
  } else {
    isShowAll.value = false
  }
  if (filterType === 'helpSpeed') {
    showRes.value = byHelpSpeedRes.value
  } else if (filterType === 'berryType') {
    showRes.value = byBerryTypeRes.value
  } else if (filterType === 'skillType') {
    showRes.value = bySkillTypeRes.value
  }
}

initFilterGroup() // 初始化索引
</script>
<template>
  <h2>全图鉴速查</h2>
  <div class="btn-wrap">
    <span class="btn btn-m" @click="fnGetBy('all')">ALL</span>
    <span class="btn btn-m" @click="fnGetBy('helpSpeed')">帮忙速度↓</span>
    <span class="btn btn-m" @click="fnGetBy('berryType')">树果类型↓</span>
    <span class="btn btn-m" @click="fnGetBy('skillType')">技能类型↓</span>
  </div>
  <div class="page-inner pokedex-list">
    <template v-if="isShowAll === false">
      <div v-for="resItem in showRes" v-bind:key="resItem.id">
        <h3>
          {{ resItem.title }}
          <span class="extra">({{ resItem.list.length }}只)</span>
        </h3>
        <div>
          <CptPoke
            :pokeId="pokemonsItem.id"
            v-for="(pokemonsItem, pokemonKey) in resItem.list"
            v-bind:key="pokemonsItem.name"
            :showKey="getShowKeyVal(pokemonKey)"
          />
        </div>
      </div>
    </template>
    <!-- S 全图鉴 -->
    <template v-else>
      <CptPoke
        :pokeId="+pokemonKey"
        v-for="(pokemonsItem, pokemonKey) in pokedex"
        v-bind:key="pokemonsItem.name"
        :showKey="getShowKeyVal(pokemonKey)"
      />
      <!-- E 全图鉴 -->
    </template>
  </div>
</template>