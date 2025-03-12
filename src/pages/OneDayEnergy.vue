<script setup>
import { ref, onMounted } from 'vue'
import { Place } from '@element-plus/icons-vue'
import CptPoke from '../components/CptPoke/ItemIndex.vue'
import CptEnergyItem from '../components/CptEnergy/EnergyItem.vue'
import CptDialogFilterPoke from '../components/DialogFilterPoke/ItemIndex.vue'
import SvgIcon from '../components/SvgIcon/IconItem.vue'
import CptTypeRankItem from '../components/OneDayTypeRank/RankItem.vue'

import { sortInObjectOptions, containsAny, getNum } from '../utils/index.js'
import {
  getOneDayEnergy,
  getOneDayHelpCount,
  getRankPokemonsByTypes
} from '../utils/energy.js'
import { gameMap, areaBonusMax } from '../config/game.js'
import { orgResetObject } from '../config/filterDialog.js'
import { pokedex } from '../config/pokedex.js'
import { BERRY_TYPES, FOOD_TYPES, SKILL_TYPES } from '../config/valKey.js'

import i18n from '../i18n'
const { t } = i18n.global

const newGameMap = [...gameMap]
const pageData = ref({
  curMap: 0,
  orgResRankArr: [],
  resRankArr: [],
  lv: 60,
  curPageIndex: 1,
  pageSize: 102,
  areaBonus: areaBonusMax,
  collapseActName: 'food'
})
const foodResRank = ref({})
const berryResRank = ref({})
const skillResRank = ref({})
newGameMap.push({
  id: 'none',
  berry: [9, 3, 5]
})

for (const key in BERRY_TYPES) {
  if (Object.hasOwnProperty.call(BERRY_TYPES, key)) {
    newGameMap.push({
      name: t(`BERRY_TYPES.${key}`),
      id: `berry_${t(`BERRY_TYPES.${key}`)}`,
      berry: [+key]
    })
  }
}

// console.log('created')
onMounted(() => {
  // console.log('onMounted')
  for (const key in pokedex) {
    if (Object.hasOwnProperty.call(pokedex, key)) {
      const pokeItem = { ...pokedex[key] }

      if (pokeItem.helpSpeed && pokeItem.foodPer) {
        pokeItem.helpSpeed = Math.floor(
          pokeItem.helpSpeed * (1 - (pageData.value.lv - 1) * 0.002)
        )
        pokeItem.oneDayHelpCount = getOneDayHelpCount(
          pokeItem.helpSpeed,
          pokeItem.foodPer,
          pokeItem.skillPer
        )

        if (pokeItem.food) {
          const tempFoodType = [
            [0, 0, 0],
            [0, 0, 1],
            [0, 1, 0],
            [0, 1, 1]
          ]
          if (pokeItem.food.type.length === 3) {
            tempFoodType.push([0, 0, 2])
            tempFoodType.push([0, 1, 2])
          }
          tempFoodType.forEach((arrFTItem, arrFTKey) => {
            const useFood = [
              pokeItem.food.type[arrFTItem[0]],
              pokeItem.food.type[arrFTItem[1]],
              pokeItem.food.type[arrFTItem[2]]
            ];
            [0, 1].forEach((oddItem, oddKey) => {
              const is2n = (oddKey + 1) % 2 === 0
              pageData.value.resRankArr.push({
                ...pokeItem,
                pokemonId: pokeItem.id,
                isFirstPokeFood: oddKey === 0,
                isFirstPoke: oddKey === 0 && arrFTKey === 0,
                nameExtra: is2n ? t('SHORT_SKILL.berrys') : '',
                ...getOneDayEnergy(
                  pokeItem,
                  pageData.value.lv,
                  useFood,
                  is2n ? true : false,
                  false,
                  +pageData.value.areaBonus
                )
              })
            })
          })
        } else {
          [0, 1].forEach((arrFTItem, arrFTKey) => {
            const is2n = (arrFTKey + 1) % 2 === 0
            pageData.value.resRankArr.push({
              ...pokeItem,
              isFirstPoke: arrFTKey === 0,
              pokemonId: pokeItem.id,
              nameExtra: is2n ? t('SHORT_SKILL.berrys') : '',
              ...getOneDayEnergy(
                pokeItem,
                pageData.value.lv,
                [],
                is2n ? true : false,
                false,
                +pageData.value.areaBonus
              )
            })
          })
        }
      }
    }
  }
  pageData.value.orgResRankArr = sortInObjectOptions(
    pageData.value.resRankArr,
    ['oneDayEnergy']
  )
  // console.log(pageData.value.orgResRankArr)
  pageData.value.resRankArr = JSON.parse(
    JSON.stringify(pageData.value.orgResRankArr)
  )

  getRankPokemonsByTypes(
    pageData.value.orgResRankArr.filter(pItem => pItem.isFirstPokeFood),
    res => {
      foodResRank.value = res.tempFoodResRank
    }
  )
  getRankPokemonsByTypes(
    pageData.value.orgResRankArr.filter(pItem => pItem.isFirstPoke),
    res => {
      berryResRank.value = res.tempBerryResRank
      skillResRank.value = res.tempSkillResRank
    }
  )
  // console.log(foodResRank.value, berryResRank.value, skillResRank.value)
})

const FILTER_OBJECT = ref(JSON.parse(JSON.stringify(orgResetObject)))
const handleClickFilterReset = () => {
  FILTER_OBJECT.value = JSON.parse(JSON.stringify(orgResetObject))
  getChangeOptionsAfterData()
}
const getChangeOptionsAfterData = () => {
  // if (pageData.value.curMap === 0) {
  //   pageData.value.resRankArr = JSON.parse(
  //     JSON.stringify(pageData.value.orgResRankArr)
  //   )
  // } else {
  const newRes = []
  const isUseFilter = true
  pageData.value.orgResRankArr.forEach(pokeItem => {
    // console.log(pokeItem)
    let addIn = true
    if (isUseFilter) {
      if (FILTER_OBJECT.value.pokeTypes.length > 0) {
        addIn =
          addIn &&
          FILTER_OBJECT.value.pokeTypes.includes(
            pokedex[pokeItem.pokemonId].pokeType
          )
      }
      if (FILTER_OBJECT.value.berrys.length > 0) {
        addIn =
          addIn &&
          FILTER_OBJECT.value.berrys.includes(
            pokedex[pokeItem.pokemonId].berryType
          )
      }
      if (
        FILTER_OBJECT.value.foods.length > 0 &&
        pokeItem.useFoods &&
        pokeItem.useFoods.length > 0
      ) {
        addIn =
          addIn && containsAny(FILTER_OBJECT.value.foods, pokeItem.useFoods)
      }
      if (FILTER_OBJECT.value.mainSkills.length > 0) {
        addIn =
          addIn &&
          FILTER_OBJECT.value.mainSkills.includes(
            pokedex[pokeItem.pokemonId].skillType
          )
      }
    }
    if (addIn) {
      newRes.push({
        ...pokeItem,
        ...getOneDayEnergy(
          pokeItem,
          pageData.value.lv,
          pokeItem.useFoods,
          pokeItem.nameExtra.indexOf('S') > -1,
          newGameMap[pageData.value.curMap].berry.includes(pokeItem.berryType),
          +pageData.value.areaBonus
        )
      })
    }
  })
  pageData.value.resRankArr = sortInObjectOptions(newRes, ['oneDayEnergy'])
  // }
}
const handleClickChangeMap = id => {
  pageData.value.curMap = id
  pageData.value.curPageIndex = 1

  getChangeOptionsAfterData()
}
const handleChangeBonus = () => {
  getChangeOptionsAfterData()
}
const handleClickFilterPokes = (typeKey, val) => {
  if (FILTER_OBJECT.value[typeKey].includes(val)) {
    FILTER_OBJECT.value[typeKey] = FILTER_OBJECT.value[typeKey].filter(
      item => item !== val
    )
  } else {
    FILTER_OBJECT.value[typeKey].push(val)
  }
  getChangeOptionsAfterData()
}

// const handleClickSlider = () => {
//   getChangeOptionsAfterData()
// }
</script>

<template>
  <h2>{{ $t("PAGE_TITLE.onedayenergy", [pageData.lv]) }}</h2>
  <el-form label-width="4.5em">
    <!-- S 当前岛屿 -->
    <el-form-item>
      <template #label>
        <div>
          <el-icon size="16" style="vertical-align: middle"><Place /></el-icon
          >{{ $t("OPTIONS.formLableCurIland") }}
        </div>
      </template>
      <ul class="cpt-select-list cpt-select-list--iland">
        <template v-for="(mapItem, mapIndex) in newGameMap">
          <li
            class="cpt-select-list__item"
            v-if="!(mapItem.id.indexOf('berry_') > -1)"
            v-bind:key="mapItem.id"
            :class="{ cur: pageData.curMap === mapIndex }"
            @click="handleClickChangeMap(mapIndex)"
          >
            <div class="cpt-select-list__name">
              {{ $t(`ILAND.${mapItem.id}`) }}
              <div>
                <div
                  class="cpt-food cpt-food--s berry"
                  v-for="(berryItem, berryKey) in mapItem.berry"
                  v-bind:key="berryKey"
                >
                  <div class="cpt-food__item">
                    <img
                      v-if="berryItem !== '?'"
                      v-lazy="`./img/berry/${berryItem}.png`"
                      :alt="$t(`BERRY_TYPES.${berryItem}`)"
                    />
                    <template v-else>?</template>
                  </div>
                </div>
              </div>
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
    </el-form-item>
    <!-- E 当前岛屿 -->
    <!-- S 2倍树果 -->
    <el-form-item :label="$t('OPTIONS.doubleEnergy')">
      <ul class="cpt-select-list cpt-select-list--berry">
        <template v-for="(mapItem, mapIndex) in newGameMap">
          <li
            class="cpt-select-list__item"
            v-if="mapItem.id.indexOf('berry_') > -1"
            v-bind:key="mapItem.id"
            :class="{ cur: pageData.curMap === mapIndex }"
            @click="handleClickChangeMap(mapIndex)"
          >
            <div class="cpt-select-list__name">
              {{ mapItem.name }}
              <div>
                <div
                  class="cpt-food cpt-food--s berry"
                  v-for="(berryItem, berryKey) in mapItem.berry"
                  v-bind:key="berryKey"
                >
                  <div class="cpt-food__item">
                    <img
                      v-if="berryItem !== '?'"
                      v-lazy="`./img/berry/${berryItem}.png`"
                      :alt="$t(`BERRY_TYPES.${berryItem}`)"
                    />
                    <template v-else>?</template>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </template>
      </ul>
    </el-form-item>
    <!-- E 2倍树果 -->
    <!-- <el-form-item label="宝可梦等级">
      <el-slider
        v-model="pageData.lv"
        show-input
        :min="50"
        :max="55"
        @change="handleClickSlider()"
      />
    </el-form-item> -->
    <el-form-item :label="$t('PROP.areaBonus')">
      <div class="el-form-slider--bonus">
        <el-slider
          @change="handleChangeBonus()"
          size="small"
          v-model="pageData.areaBonus"
          show-input
          show-stops
          :min="0"
          :max="areaBonusMax"
          :step="5"
        />
      </div>
    </el-form-item>
  </el-form>
  <div class="page-inner">
    <div class="cpt-tips">
      <p>* {{ $t("TIPS.energy1") }}</p>
      <p>* {{ $t("TIPS.energy2") }}</p>
    </div>
  </div>
  <div class="typerank">
    <el-collapse accordion v-model="pageData.collapseActName">
      <el-collapse-item name="food">
        <template #title><h3>一日食材排行</h3> </template>
        <CptTypeRankItem :dataList="foodResRank" showType="food" :showMax="6" />
      </el-collapse-item>
      <el-collapse-item name="berry">
        <template #title> <h3>一日树果排行</h3> </template>
        <CptTypeRankItem
          :dataList="berryResRank"
          showType="berry"
          :showMax="3"
        />
      </el-collapse-item>
      <el-collapse-item name="skill">
        <template #title> <h3>一日技能排行</h3> </template>
        <CptTypeRankItem
          :dataList="skillResRank"
          showType="skill"
          :showMax="5"
        />
      </el-collapse-item>
    </el-collapse>
  </div>
  <div class="page-inner mt3">
    <CptDialogFilterPoke
      :filterObj="FILTER_OBJECT"
      :handleClickFilterPokes="handleClickFilterPokes"
      :showKey="['pokeType', 'berryType', 'foodType', 'mainSkill', 'resetBtn']"
      :handleClickFilterReset="handleClickFilterReset"
    />
  </div>
  <div
    class="cpt-pagination"
    v-if="pageData.resRankArr.length / pageData.pageSize > 1"
  >
    <el-pagination
      layout="prev, pager, next"
      :total="pageData.resRankArr.length"
      :page-size="pageData.pageSize"
      v-model:current-page="pageData.curPageIndex"
    />
  </div>
  <div class="poke-tb" v-if="pageData.resRankArr.length > 0">
    <template v-for="(pokeItem, pokeKey) in pageData.resRankArr">
      <CptEnergyItem
        :pokeItem="pokeItem"
        :pokeKey="pokeKey"
        :showKey="[
          'helpSpeed',
          'helpSpeedHM',
          'berry',
          'pokeType',
          'foodPer',
          'skillPer',
          'skillType',
        ]"
        v-if="
          pokeKey >= (pageData.curPageIndex - 1) * pageData.pageSize &&
          pokeKey <
            (pageData.curPageIndex - 1) * pageData.pageSize + pageData.pageSize
        "
        v-bind:key="`area${pageData.curMap}_${
          pokeItem.pokemonId
        }_${pokeKey}_${pokeItem.useFoods.join('')}_${pokeItem.nameExtra || ''}`"
        :isHightLightBerry="
          newGameMap[pageData.curMap].berry.includes(pokeItem.berryType)
        "
      />
    </template>
  </div>
  <div class="cpt-empty" v-else>{{ $t("OPTIONS.noHasPokemons") }}</div>
  <div
    class="cpt-pagination"
    v-if="pageData.resRankArr.length / pageData.pageSize > 1"
  >
    <el-pagination
      layout="prev, pager, next"
      :total="pageData.resRankArr.length"
      :page-size="pageData.pageSize"
      v-model:current-page="pageData.curPageIndex"
    />
  </div>
</template>