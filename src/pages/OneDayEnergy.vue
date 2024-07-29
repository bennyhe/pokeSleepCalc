<script setup>
import { ref, onMounted } from 'vue'
import CptPoke from '../components/CptPoke/ItemIndex.vue'
import CptEnergyItem from '../components/CptEnergy/EnergyItem.vue'
import CptDialogFilterPoke from '../components/DialogFilterPoke/ItemIndex.vue'
import SvgIcon from '../components/SvgIcon/IconItem.vue'
import { sortInObjectOptions, containsAny, getNum } from '../utils/index.js'
import { getOneDayEnergy, getOneDayHelpCount } from '../utils/energy.js'
import { gameMap, areaBonusMax } from '../config/game.js'
import { orgResetObject } from '../config/filterDialog.js'
import { pokedex } from '../config/pokedex.js'
import { BERRY_TYPES, FOOD_TYPES } from '../config/valKey.js'

import i18n from '../i18n'
const { t } = i18n.global

const newGameMap = [...gameMap]
const pageData = ref({
  curMap: 0,
  orgResRankArr: [],
  resRankArr: [],
  lv: 55,
  curPageIndex: 1,
  pageSize: 102,
  areaBonus: 60
})
const rankOpts = ref({
  foodIsMore: false,
  foodMax: 1,
  berryIsMore: false,
  berryMax: 1
})
const foodResRank = ref({})
const berryResRank = ref({})
newGameMap.push({
  id: 'none',
  berry: [8, 9, 2, 13, 3, 5]
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

      pokeItem.helpSpeed = Math.floor(
        pokeItem.helpSpeed * (1 - (pageData.value.lv - 1) * 0.002)
      )
      pokeItem.oneDayHelpCount = getOneDayHelpCount(
        pokeItem.helpSpeed,
        pokeItem.foodPer,
        pokeItem.skillPer
      )

      const tempFoodType = [
        [0, 0],
        [0, 0],
        [0, 1],
        [0, 1]
      ]

      if (pokeItem.food) {
        tempFoodType.forEach((arrFTItem, arrFTKey) => {
          const is2n = (arrFTKey + 1) % 2 === 0
          pageData.value.resRankArr.push({
            ...pokeItem,
            pokemonId: pokeItem.id,
            isFirstPoke: arrFTKey === 0,
            nameExtra: is2n ? t('SHORT_SKILL.berrys') : '',
            ...getOneDayEnergy(
              pokeItem,
              pageData.value.lv,
              [
                pokeItem.food.type[arrFTItem[0]],
                pokeItem.food.type[arrFTItem[1]]
              ],
              is2n ? true : false,
              false,
              +pageData.value.areaBonus
            )
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
  pageData.value.orgResRankArr = sortInObjectOptions(
    pageData.value.resRankArr,
    ['oneDayEnergy']
  )
  console.log(pageData.value.orgResRankArr)
  pageData.value.resRankArr = JSON.parse(
    JSON.stringify(pageData.value.orgResRankArr)
  )

  const tempFoodResRank = {}
  for (const foodKey in FOOD_TYPES) {
    if (Object.hasOwnProperty.call(FOOD_TYPES, foodKey)) {
      if (!tempFoodResRank[foodKey]) {
        tempFoodResRank[foodKey] = {
          foodId: +foodKey,
          rankList: []
        }
      }
      pageData.value.orgResRankArr
        .filter(pItem => pItem.nameExtra !== t('SHORT_SKILL.berrys'))
        .forEach(pokeItem => {
          if (pokeItem.useFoods.includes(+foodKey)) {
            // console.log(foodKey, FOOD_TYPES[foodKey], pokeItem.oneDayFoodEnergy.count[0])
            tempFoodResRank[foodKey].rankList.push({
              pokemonId: pokeItem.pokemonId,
              oneDayFoodEnergy: pokeItem.oneDayFoodEnergy,
              useFoods: pokeItem.useFoods,
              helpSpeed: pokeItem.helpSpeed,
              FOODRANK_COUNT:
                pokeItem.oneDayFoodEnergy.count[
                  pokeItem.oneDayFoodEnergy.useFoods.indexOf(+foodKey)
                ]
            })
          }
        })
    }
  }
  for (const rankKey in tempFoodResRank) {
    if (Object.hasOwnProperty.call(tempFoodResRank, rankKey)) {
      tempFoodResRank[rankKey].rankList = sortInObjectOptions(
        tempFoodResRank[rankKey].rankList,
        ['FOODRANK_COUNT']
      )
    }
  }
  const tempBerryResRank = {}
  for (const berryKey in BERRY_TYPES) {
    if (Object.hasOwnProperty.call(BERRY_TYPES, berryKey)) {
      if (!tempBerryResRank[berryKey]) {
        tempBerryResRank[berryKey] = {
          berryId: +berryKey,
          rankList: []
        }
      }
      pageData.value.orgResRankArr
        .filter(pItem => pItem.isFirstPoke)
        .forEach(pokeItem => {
          if (+pokeItem.berryType === +berryKey) {
            // console.log(berryKey, BERRY_TYPES[berryKey], pokeItem.oneDayFoodEnergy.count[0])
            tempBerryResRank[berryKey].rankList.push({
              pokemonId: pokeItem.pokemonId,
              oneDayBerryEnergy: pokeItem.oneDayBerryEnergy,
              helpSpeed: pokeItem.helpSpeed,
              BERRYRANK_COUNT: pokeItem.oneDayBerryCount
            })
          }
        })
    }
  }
  for (const rankKey in tempBerryResRank) {
    if (Object.hasOwnProperty.call(tempBerryResRank, rankKey)) {
      tempBerryResRank[rankKey].rankList = sortInObjectOptions(
        tempBerryResRank[rankKey].rankList,
        ['BERRYRANK_COUNT']
      )
    }
  }
  foodResRank.value = tempFoodResRank
  berryResRank.value = tempBerryResRank
  console.log(foodResRank.value, berryResRank.value)
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

const handleClickShowRank = (type, max) => {
  max = max || 6
  rankOpts.value[`${type}IsMore`] = !rankOpts.value[`${type}IsMore`]
  if (rankOpts.value[`${type}IsMore`]) {
    rankOpts.value[`${type}Max`] = max
  } else {
    rankOpts.value[`${type}Max`] = 1
  }
}

// const handleClickSlider = () => {
//   getChangeOptionsAfterData()
// }
</script>

<template>
  <h2>{{ $t("PAGE_TITLE.onedayenergy", [pageData.lv]) }}</h2>
  <el-form label-width="82px">
    <!-- S 当前岛屿 -->
    <el-form-item :label="$t('OPTIONS.formLableCurIland')">
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
    <CptDialogFilterPoke
      :filterObj="FILTER_OBJECT"
      :handleClickFilterPokes="handleClickFilterPokes"
      :showKey="['pokeType', 'berryType', 'foodType', 'mainSkill', 'resetBtn']"
      :handleClickFilterReset="handleClickFilterReset"
    />
    <div class="mod-tips">
      <p>* {{ $t("TIPS.energy1") }}</p>
      <p>* {{ $t("TIPS.energy2") }}</p>
    </div>
  </div>
  <div class="typerank">
    <h3>
      一天食材个数排行<el-button
        size="small"
        @click="handleClickShowRank('food')"
        :class="{ 'btn--show': rankOpts.foodIsMore }"
        >{{ $t("OPTIONS.detail") }}<svgIcon size="small" type="arrowDown"
      /></el-button>
    </h3>
    <div
      class="typerank__item"
      v-for="foodItem in foodResRank"
      v-bind:key="`food_rank_${foodItem.foodId}`"
    >
      <h4>
        <img
          class="icon"
          v-lazy="`./img/food/${foodItem.foodId}.png`"
          :alt="$t(`FOOD_TYPES.${foodItem.foodId}`)"
        />
        {{ $t(`FOOD_TYPES.${foodItem.foodId}`) }}
      </h4>
      <ul>
        <template
          v-for="(pokeItem, pokeKey) in foodItem.rankList.slice(0, 6)"
          v-bind:key="`food_rank_item_${foodItem.foodId}_${pokeItem.pokemonId}`"
        >
          <li v-if="pokeKey < rankOpts.foodMax">
            <i class="i i-rank" :class="`i-rank--${pokeKey + 1}`">{{
              pokeKey + 1
            }}</i>
            <CptPoke
              :pokeId="pokeItem.pokemonId"
              :showKey="['helpSpeedHM', 'foodPer']"
              :helpSpeed="pokeItem.helpSpeed"
            />
            <div class="cpt-food all-food">
              <template
                v-for="(sItemFoodId, sItemFoodKey) in pokeItem.oneDayFoodEnergy
                  .useFoods"
                v-bind:key="`food_rank_item_${foodItem.foodId}_${pokeItem.pokemonId}_sfood_${sItemFoodId}`"
              >
                <div class="cpt-food__item cur">
                  <img
                    v-lazy="`./img/food/${sItemFoodId}.png`"
                    :alt="$t(`FOOD_TYPES.${sItemFoodId}`)"
                  />
                  <p class="cpt-food__count">
                    {{ pokeItem.oneDayFoodEnergy.count[sItemFoodKey] }}
                  </p>
                </div>
              </template>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </div>
  <div class="typerank">
    <h3>
      一天树果个数排行<span class="cpt-skill cpt-skill--3">{{
        $t("SHORT_SKILL.berrys")
      }}</span
      ><el-button
        size="small"
        @click="handleClickShowRank('berry', 3)"
        :class="{ 'btn--show': rankOpts.berryIsMore }"
        >{{ $t("OPTIONS.detail") }}<svgIcon size="small" type="arrowDown"
      /></el-button>
    </h3>
    <div
      class="typerank__item"
      v-for="berryItem in berryResRank"
      v-bind:key="`food_rank_${berryItem.berryId}`"
    >
      <h4>
        <img
          class="icon"
          v-lazy="`./img/berry/${berryItem.berryId}.png`"
          :alt="$t(`BERRY_TYPES.${berryItem.berryId}`)"
        />
        {{ $t(`BERRY_TYPES.${berryItem.berryId}`) }}
      </h4>
      <ul>
        <template
          v-for="(pokeItem, pokeKey) in berryItem.rankList.slice(0, 3)"
          v-bind:key="`food_rank_item_${berryItem.berryId}_${pokeItem.pokemonId}`"
        >
          <li v-if="pokeKey < rankOpts.berryMax">
            <i class="i i-rank" :class="`i-rank--${pokeKey + 1}`">{{
              pokeKey + 1
            }}</i>
            <CptPoke
              :pokeId="pokeItem.pokemonId"
              :showKey="['helpSpeedHM', 'foodPer', 'pokeType']"
              :helpSpeed="pokeItem.helpSpeed"
            />
            <div class="cpt-food all-food">
              <div class="cpt-food__item cur">
                <img
                  v-lazy="`./img/berry/${berryItem.berryId}.png`"
                  :alt="$t(`BERRY_TYPES.${berryItem.berryId}`)"
                />
                <p class="cpt-food__count">
                  {{ pokeItem.BERRYRANK_COUNT }}
                </p>
              </div>
            </div>
            <span class="res">
              <img class="icon" v-lazy="`./img/ui/energy.png`" />{{
                getNum(pokeItem.oneDayBerryEnergy)
              }}
            </span>
          </li>
        </template>
      </ul>
    </div>
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
  <div class="cpt-empty" v-else>暂无宝可梦</div>
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