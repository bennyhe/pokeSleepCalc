<script setup>
import { ref, onMounted } from 'vue'
import CptPoke from '../components/CptPoke/ItemIndex.vue'
import { pokedex } from '../config/pokedex.js'
import { get, sortInObjectOptions, getPercent } from '../utils/index.js'
import { FOOD_TYPES, BERRY_TYPES, SKILL_TYPES } from '../config/valKey.js'

const pokedexLength = ref(0)
const showRes = ref([])
const curFilter = ref('all')
const byHelpSpeedRes = ref([])
const byBerryTypeRes = ref([])
const bySkillTypeRes = ref([])
const byFoodTypeRes = ref([])
const initFilterGroup = () => {
  let byHelpSpeedResIn = []
  const byHelpSpeedOrgList = []

  let byBerryTypeResIn = []
  const byBerryTypeOrgList = []

  let bySkillTypeResIn = []
  const bySkillTypeOrgList = []

  let byFoodTypeResIn = []

  // 食材类型
  for (const key in FOOD_TYPES) {
    if (Object.hasOwnProperty.call(FOOD_TYPES, key)) {
      byFoodTypeResIn.push({
        id: +key,
        foodType: FOOD_TYPES[key],
        title: `${FOOD_TYPES[key]}`,
        list: []
      })
    }
  }

  let plistLength = 0
  for (const pokeKey in pokedex) {
    if (Object.hasOwnProperty.call(pokedex, pokeKey)) {
      plistLength++

      const pokeItem = pokedex[pokeKey]

      // 帮忙速度分类
      if (
        pokeItem.helpSpeed &&
        !byHelpSpeedOrgList.includes(pokeItem.helpSpeed)
      ) {
        byHelpSpeedResIn.push({
          id: pokeItem.helpSpeed,
          helpSpeed: pokeItem.helpSpeed,
          title: `${pokeItem.helpSpeed}s`,
          list: []
        })
        byHelpSpeedOrgList.push(pokeItem.helpSpeed)
      }
      byHelpSpeedResIn
        .find(item => item.helpSpeed === pokeItem.helpSpeed)
        .list.push(pokeItem)

      // 树果类型
      if (
        pokeItem.berryType &&
        !byBerryTypeOrgList.includes(pokeItem.berryType)
      ) {
        byBerryTypeResIn.push({
          id: pokeItem.berryType,
          berryType: pokeItem.berryType,
          title: `${BERRY_TYPES[pokeItem.berryType]}`,
          list: []
        })
        byBerryTypeOrgList.push(pokeItem.berryType)
      }
      byBerryTypeResIn
        .find(item => item.berryType === pokeItem.berryType)
        .list.push(pokeItem)

      // 技能类型
      if (
        pokeItem.skillType &&
        !bySkillTypeOrgList.includes(pokeItem.skillType)
      ) {
        bySkillTypeResIn.push({
          id: pokeItem.skillType,
          skillType: pokeItem.skillType,
          title: `${SKILL_TYPES[pokeItem.skillType].name}`,
          list: []
        })
        bySkillTypeOrgList.push(pokeItem.skillType)
      }
      bySkillTypeResIn
        .find(item => item.skillType === pokeItem.skillType)
        .list.push(pokeItem)

      // 食材类型
      if (get('food.type', pokeItem, 1)) {
        byFoodTypeResIn.forEach(item => {
          if (pokeItem.food.type.includes(item.id)) {
            item.list.push(pokeItem)
          }
        })
      }
    }
  }
  pokedexLength.value = plistLength

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

  const levelArr = [0, 30, 60]
  byFoodTypeResIn.forEach(resItem => {
    resItem.count = resItem.list.length

    levelArr.forEach((levelItem, levelKey) => {
      const res = resItem.list.filter(
        pitem => pitem.food.type[levelKey] === resItem.id
      )
      resItem[`level${levelKey}List`] = {
        subTitle: levelItem,
        subCount: res.length,
        subList: res
      }
    })
  })
  byFoodTypeResIn = sortInObjectOptions(byFoodTypeResIn, ['count'], 'down')
  byFoodTypeRes.value = byFoodTypeResIn
}
const getShowKeyVal = pokemonsItem => {
  const showKey = [
    'helpSpeed',
    'berry',
    'pokeType',
    'skillType',
    'foodPer',
    'fullFood'
  ]
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
  if (filterType === 'helpSpeed') {
    showRes.value = byHelpSpeedRes.value
  } else if (filterType === 'berryType') {
    showRes.value = byBerryTypeRes.value
  } else if (filterType === 'skillType') {
    showRes.value = bySkillTypeRes.value
  } else if (filterType === 'foodType') {
    showRes.value = byFoodTypeRes.value
  }
}

onMounted(() => {
  initFilterGroup() // 初始化索引
})
</script>
<template>
  <h2>全图鉴速查<span class="extra">({{ pokedexLength }}只)</span></h2>
  <el-form>
    <el-form-item label-width="10px">
      <el-radio-group v-model="curFilter">
        <el-radio-button label="all" @click="fnGetBy('all')"
          >ALL</el-radio-button
        >
        <el-radio-button label="helpSpeed" @click="fnGetBy('helpSpeed')"
          >帮忙速度↓</el-radio-button
        >
        <el-radio-button label="berryType" @click="fnGetBy('berryType')"
          >树果类型↓</el-radio-button
        >
        <el-radio-button label="foodType" @click="fnGetBy('foodType')"
          >食材类型↓</el-radio-button
        >
        <el-radio-button label="skillType" @click="fnGetBy('skillType')"
          >技能类型↓</el-radio-button
        >
      </el-radio-group>
    </el-form-item>
  </el-form>
  <div class="pokedex-list">
    <template v-if="curFilter !== 'all'">
      <div v-for="resItem in showRes" v-bind:key="resItem.id">
        <h3>
          {{ resItem.title }}
          <span class="extra"
            >({{ resItem.list.length }}只 /
            {{ getPercent(resItem.list.length, pokedexLength, 2) }}%)</span
          >
        </h3>
        <div class="poke-tb">
          <template v-if="curFilter === 'foodType'">
            <div
              class="poke-tb__col"
              v-for="(levelItem, levelKey) in 3"
              v-bind:key="`${resItem.id}_${levelKey}`"
            >
              <h4>
                {{ resItem[`level${levelKey}List`].subTitle }}级
                <span class="extra"
                  >({{ resItem[`level${levelKey}List`].subList.length }}只
                  <template
                    v-if="resItem[`level${levelKey}List`].subList.length > 0"
                  >
                    /
                    {{
                      getPercent(
                        resItem[`level${levelKey}List`].subList.length,
                        pokedexLength,
                        2
                      )
                    }}%</template>)
                </span>
              </h4>
              <div
                class="mod-tips"
                v-if="resItem[`level${levelKey}List`].subList.length === 0"
              >
                无
              </div>
              <div class="poke-tb__sublist" v-else>
                <div
                  class="poke-tb__item"
                  v-for="(pokemonsItem, pokemonKey) in resItem[
                    `level${levelKey}List`
                  ].subList"
                  v-bind:key="pokemonsItem.name"
                >
                  <CptPoke
                    :pokeId="pokemonsItem.id"
                    :showKey="getShowKeyVal(pokemonKey)"
                  />
                </div>
              </div>
            </div>
          </template>
          <div class="poke-tb__sublist" v-else>
            <div
              class="poke-tb__item"
              v-for="(pokemonsItem, pokemonKey) in resItem.list"
              v-bind:key="pokemonsItem.name"
            >
              <CptPoke
                :pokeId="pokemonsItem.id"
                :showKey="getShowKeyVal(pokemonKey)"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- S 全图鉴 -->
    <div class="poke-tb" v-else>
      <div
        class="poke-tb__item"
        v-for="(pokemonsItem, pokemonKey) in pokedex"
        v-bind:key="pokemonsItem.name"
      >
        <CptPoke :pokeId="+pokemonKey" :showKey="getShowKeyVal(pokemonKey)" />
      </div>
      <!-- E 全图鉴 -->
    </div>
  </div>
</template>