<script setup>
import { ref, onMounted } from 'vue'
import CptPoke from '../components/CptPoke/ItemIndex.vue'
import CptFoodmenu from '../components/CptFoodmenu/MenuItem.vue'
import CptDialogFilterPoke from '../components/DialogFilterPoke/ItemIndex.vue'
import CptDialogPokemonDetail from '../components/DialogPokemonDetail/ItemIndex.vue'

import { pokedex } from '../config/pokedex.js'
import { gameMap } from '../config/game.js'
import { orgResetObjectInPokedex } from '../config/filterDialog.js'
import {
  get,
  sortInObjectOptions,
  getPercent,
  findMenuWithFood,
  getStageLevelPicId,
  containsAny,
  extractPrefix
} from '../utils/index.js'
import { getUnLockSleeps } from '../utils/sleep.js'

import i18n from '../i18n'
const { t } = i18n.global

import GAME_VALS from '../i18n/lang/cn/game.js'
const { FOOD_TYPES } = GAME_VALS

const pokedexLength = ref(0)
const curFilter = ref('all')
const filterResGroup = ref({
  helpSpeed: {},
  berryType: {},
  skillType: {},
  foodType: {},
  sleepType: {}
})

// 存储每个地图每个等级会出现的宝可梦
const gameMapPokemons = [
  // {
  //   levelPokemons: [], //stage level pokemons
  //   allPokemons: [] //all pokemons
  // }
]
gameMap.forEach((gitem, gkey) => {
  const curMapSleeps = getUnLockSleeps(gitem.levelList, 34).allUnlockSleepsList
  console.log(curMapSleeps)
  gameMapPokemons.push({
    levelPokemons: [],
    allPokemons: [],
    pokemonsIdToMapLevelIndex: {}
  })
  curMapSleeps.forEach(sleepsItem => {
    if (!gameMapPokemons[gkey].levelPokemons[sleepsItem.unLockLevel]) {
      gameMapPokemons[gkey].levelPokemons[sleepsItem.unLockLevel] = []
    }
    if (
      !gameMapPokemons[gkey].levelPokemons[sleepsItem.unLockLevel].includes(
        sleepsItem.pokeId
      ) &&
      !gameMapPokemons[gkey].allPokemons.includes(sleepsItem.pokeId)
    ) {
      gameMapPokemons[gkey].levelPokemons[sleepsItem.unLockLevel].push(
        sleepsItem.pokeId
      )
      gameMapPokemons[gkey].pokemonsIdToMapLevelIndex[sleepsItem.pokeId] =
        sleepsItem.unLockLevel
    }
    if (!gameMapPokemons[gkey].allPokemons.includes(sleepsItem.pokeId)) {
      gameMapPokemons[gkey].allPokemons.push(sleepsItem.pokeId)
    }
  })
})
// console.log(gameMapPokemons)

const filterItemInFor = (pokeItem, resList, orgList, keyVel, title) => {
  if (pokeItem[keyVel] && !orgList.includes(pokeItem[keyVel])) {
    const resItem = {
      id: pokeItem[keyVel],
      title: title,
      list: []
    }
    resItem[keyVel] = pokeItem[keyVel]
    resList.push(resItem)
    orgList.push(pokeItem[keyVel])
  }
  const res = resList.find(item => item[keyVel] === pokeItem[keyVel])
  if (res && res.list) {
    res.list.push(pokeItem)
  }
}

const initFilterGroup = () => {
  let byHelpSpeedResIn = []
  const byHelpSpeedOrgList = []

  let byBerryTypeResIn = []
  const byBerryTypeOrgList = []

  let bySkillTypeResIn = []
  const bySkillTypeOrgList = []

  let bySleepTypeResIn = []
  const bySleepTypeOrgList = []

  let byFoodTypeResIn = []

  // 食材类型
  for (const key in FOOD_TYPES) {
    if (Object.hasOwnProperty.call(FOOD_TYPES, key)) {
      byFoodTypeResIn.push({
        id: +key,
        foodType: FOOD_TYPES[key],
        title: t(`FOOD_TYPES.${key}`),
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
      filterItemInFor(
        pokeItem,
        byHelpSpeedResIn,
        byHelpSpeedOrgList,
        'helpSpeed',
        `${pokeItem.helpSpeed}s`
      )

      // 睡眠类型分类
      filterItemInFor(
        pokeItem,
        bySleepTypeResIn,
        bySleepTypeOrgList,
        'sleepType',
        t(`SLEEP_TYPES.${pokeItem.sleepType}`)
      )

      // 树果类型
      filterItemInFor(
        pokeItem,
        byBerryTypeResIn,
        byBerryTypeOrgList,
        'berryType',
        t(`BERRY_TYPES.${pokeItem.berryType}`)
      )

      // 技能类型
      filterItemInFor(
        pokeItem,
        bySkillTypeResIn,
        bySkillTypeOrgList,
        'skillType',
        t(`SKILL_TYPES.${pokeItem.skillType}`)
      )

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
  filterResGroup.value.helpSpeed = byHelpSpeedResIn

  bySleepTypeResIn.forEach(item => {
    item.count = item.list.length
  })
  bySleepTypeResIn = sortInObjectOptions(bySleepTypeResIn, ['count'], 'down')
  filterResGroup.value.sleepType = bySleepTypeResIn

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
  filterResGroup.value.berryType = byBerryTypeResIn

  bySkillTypeResIn.forEach(item => {
    item.count = item.list.length
    item.list = sortInObjectOptions([...item.list], ['pokeType'], 'down')
  })
  bySkillTypeResIn = sortInObjectOptions(
    bySkillTypeResIn,
    ['count', 'SkillType'],
    'down'
  )
  filterResGroup.value.skillType = bySkillTypeResIn

  const levelArr = [0, 30, 60]
  byFoodTypeResIn.forEach(resItem => {
    resItem.count = resItem.list.length
    resItem.menuList = findMenuWithFood([resItem.id])

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
  filterResGroup.value.foodType = byFoodTypeResIn
}
const getShowKeyVal = pokemonsItem => {
  const showKey = [
    'helpSpeed',
    'berry',
    'pokeType',
    'skillType',
    'foodPer',
    'skillPer',
    'fullFood',
    'sleepType',
    'friendship',
    'maxcarry'
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
  curFilter.value = filterType
}

const FILTER_OBJECT = ref(JSON.parse(JSON.stringify(orgResetObjectInPokedex)))
const handleClickFilterReset = () => {
  FILTER_OBJECT.value = JSON.parse(JSON.stringify(orgResetObjectInPokedex))
}
const handleClickFilterPokes = (typeKey, val) => {
  if (FILTER_OBJECT.value[typeKey].includes(val)) {
    FILTER_OBJECT.value[typeKey] = FILTER_OBJECT.value[typeKey].filter(
      item => item !== val
    )
  } else {
    FILTER_OBJECT.value[typeKey].push(val)
  }
}
const getAfterFilterPoke = () => {
  const newRes = []
  const isUseFilter = true
  for (const key in pokedex) {
    if (Object.hasOwnProperty.call(pokedex, key)) {
      const pokeItem = pokedex[key]
      let addIn = true
      if (isUseFilter) {
        if (FILTER_OBJECT.value.pokeTypes.length > 0) {
          addIn =
            addIn && FILTER_OBJECT.value.pokeTypes.includes(pokeItem.pokeType)
        }
        if (FILTER_OBJECT.value.sleepTypes.length > 0) {
          addIn =
            addIn &&
            FILTER_OBJECT.value.sleepTypes.includes(pokeItem.sleepType)
        }
        if (FILTER_OBJECT.value.berrys.length > 0) {
          addIn =
            addIn && FILTER_OBJECT.value.berrys.includes(pokeItem.berryType)
        }
        if (
          FILTER_OBJECT.value.foods.length > 0 &&
          pokeItem.food &&
          pokeItem.food.type
        ) {
          addIn =
            addIn && containsAny(FILTER_OBJECT.value.foods, pokeItem.food.type)
        }
        if (FILTER_OBJECT.value.mainSkills.length > 0) {
          addIn =
            addIn &&
            FILTER_OBJECT.value.mainSkills.includes(pokeItem.skillType)
        }
      }
      if (addIn) {
        newRes.push(pokeItem)
      }
    }
  }
  console.log(newRes.map(item => item.id))
  return newRes
}

const isShowDialog = ref(false)
const dialogId = ref(false)
const curDialogPokeId = ref(null)
const handleClickPokemons = pokeId => {
  curDialogPokeId.value = pokeId
  isShowDialog.value = true
  dialogId.value = `pokemonsDetail_${Math.random()}`
}

onMounted(() => {
  initFilterGroup() // 初始化索引
})
</script>
<template>
  <h2>
    {{ $t("PAGE_TITLE.pokedex")
    }}<span class="extra">({{ pokedexLength }}{{ $t(`OPTIONS.one`) }})</span>
  </h2>
  <div class="page-inner">
    <el-radio-group :class="{ mb3: curFilter === 'all' }" v-model="curFilter">
      <el-radio-button label="all" @click="fnGetBy('all')">ALL</el-radio-button>
      <el-radio-button label="helpSpeed" @click="fnGetBy('helpSpeed')"
        >帮速↓</el-radio-button
      >
      <el-radio-button label="berryType" @click="fnGetBy('berryType')"
        >树果↓</el-radio-button
      >
      <el-radio-button label="foodType" @click="fnGetBy('foodType')"
        >食材↓</el-radio-button
      >
      <el-radio-button label="skillType" @click="fnGetBy('skillType')"
        >技能↓</el-radio-button
      >
      <el-radio-button label="sleepType" @click="fnGetBy('sleepType')"
        >睡眠类型↓</el-radio-button
      >
    </el-radio-group>
    <p v-if="curFilter === 'all'">
      <CptDialogFilterPoke
        :filterObj="FILTER_OBJECT"
        :handleClickFilterPokes="handleClickFilterPokes"
        :showKey="[
          'pokeType',
          'berryType',
          'foodType',
          'sleepType',
          'mainSkill',
          'resetBtn',
        ]"
        :handleClickFilterReset="handleClickFilterReset"
      />
    </p>
  </div>
  <div class="pokedex-list">
    <template v-if="curFilter !== 'all'">
      <div
        class="pokedex-list__item"
        v-for="resItem in filterResGroup[curFilter]"
        v-bind:key="resItem.id"
      >
        <h3>
          {{ resItem.title }}
          <span class="extra"
            >({{ resItem.list.length }}{{ $t(`OPTIONS.one`) }} /
            {{ getPercent(resItem.list.length, pokedexLength, 2) }}%)</span
          >
        </h3>
        <div class="poke-tb">
          <template v-if="curFilter === 'foodType'">
            <div class="cpt-foodmenu-list">
              <h3>
                {{ $t("PROP.with") }}{{ $t("PROP.recipes")
                }}<span class="extra">({{ resItem.menuList.length }}个)</span>
              </h3>
              <div class="cpt-foodmenu-scroll cpt-foodmenu-scroll--singlerow">
                <CptFoodmenu
                  v-for="menuItem in resItem.menuList"
                  v-bind:key="menuItem.id"
                  :menuItem="menuItem"
                />
              </div>
            </div>
            <div
              class="poke-tb__col"
              v-for="(levelItem, levelKey) in 3"
              v-bind:key="`${resItem.id}_${levelKey}`"
            >
              <h4>
                Lv.{{ resItem[`level${levelKey}List`].subTitle }}
                <span class="extra"
                  >({{ resItem[`level${levelKey}List`].subList.length
                  }}{{ $t(`OPTIONS.one`) }}
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
                    }}%</template
                  >)
                </span>
              </h4>
              <div
                class="cpt-tips"
                v-if="resItem[`level${levelKey}List`].subList.length === 0"
              >
                {{ $t("OPTIONS.noHas") }}
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
    <template v-else>
      <div class="poke-tb" v-if="getAfterFilterPoke().length > 0">
        <div
          class="poke-tb__item"
          v-for="pokemonsItem in getAfterFilterPoke()"
          v-bind:key="pokemonsItem.id"
          @click="handleClickPokemons(pokemonsItem.id)"
        >
          <CptPoke
            :pokeId="pokemonsItem.id"
            :showKey="getShowKeyVal(pokemonsItem.id)"
          />
          <ul class="cpt-select-list">
            <template
              v-for="(mapItem, mapKey) in gameMap"
              v-bind:key="mapItem.id"
            >
              <li
                class="cpt-select-list__item cur"
                v-if="
                  gameMapPokemons[mapKey].allPokemons.includes(+extractPrefix(pokemonsItem.id))
                "
              >
                <div class="cpt-select-list__name">
                  {{ $t(`ILAND.${mapItem.id}`) }}
                  <p>
                    <img
                      class="icon"
                      v-lazy="
                        `./img/ui/${getStageLevelPicId(
                          gameMap[mapKey].levelList[
                            gameMapPokemons[mapKey].pokemonsIdToMapLevelIndex[
                              +extractPrefix(pokemonsItem.id)
                            ]
                          ].name
                        )}.png`
                      "
                    />{{
                      $t(
                        `LEVEL_TITLE.${
                          gameMap[mapKey].levelList[
                            gameMapPokemons[mapKey].pokemonsIdToMapLevelIndex[
                              +extractPrefix(pokemonsItem.id)
                            ]
                          ].nameId
                        }`
                      )
                    }}{{
                      gameMap[mapKey].levelList[
                        gameMapPokemons[mapKey].pokemonsIdToMapLevelIndex[
                          +extractPrefix(pokemonsItem.id)
                        ]
                      ].nameIndex
                    }}
                  </p>
                </div>
                <img
                  v-if="mapItem.pic"
                  class="cpt-select-list__bg"
                  v-lazy="`./img/ui/${mapItem.pic}.png`"
                  :alt="mapItem.name"
                />
              </li>
            </template>
          </ul>
        </div>
      </div>
      <div class="cpt-empty" v-else>{{ $t("OPTIONS.noHasPokemons") }}</div>
    </template>
    <!-- E 全图鉴 -->
    <!-- S 详细弹窗 -->
    <CptDialogPokemonDetail
      :isShow="isShowDialog"
      :dialogId="dialogId"
      :curDialogPokeId="curDialogPokeId"
    >
    </CptDialogPokemonDetail>
    <!-- S 详细弹窗 -->
  </div>
</template>