<script setup>
import { ref } from 'vue'
import CptPoke from '../components/CptPoke/ItemIndex.vue'
import CptFoodmenu from '../components/CptFoodmenu/MenuItem.vue'
import {
  formatTime,
  findMenuWithFood,
  sortInObjectOptions
} from '../utils/index.js'
import { COOKMENU } from '../config/cookmenu.js'
import { pokedex } from '../config/pokedex.js'
import { foodRecommend } from '../config/foodRecommend/foodRecommend.js'
import {
  COOK_TYPES,
  MENU_TYPES,
  FOOD_TYPES,
  FOOD_ENERGY
} from '../config/valKey.js'
import { getDecimalNumber } from '../utils/index.js'

import i18n from '../i18n'
const { t } = i18n.global

const foodConfig = ref({
  pokemonType: 1,
  list: [null, null, null],
  count: [0, 0, 0],
  countOrg: [0, 0, 0]
})
const handleChangeFood = () => {
  foodConfig.value.count[0] = foodConfig.value.pokemonType === 1 ? 2 : 1 // 食材型基础2,非食材型基础1
  foodConfig.value.countOrg[0] = foodConfig.value.count[0]
  foodConfig.value.countOrg[1] =
    (FOOD_ENERGY[foodConfig.value.list[0]] * foodConfig.value.count[0] * 2.25) /
    FOOD_ENERGY[foodConfig.value.list[1]]
  foodConfig.value.countOrg[2] =
    (FOOD_ENERGY[foodConfig.value.list[0]] *
      foodConfig.value.count[0] *
      2.25 *
      1.6) /
    FOOD_ENERGY[foodConfig.value.list[2]]
  foodConfig.value.count[1] = Math.round(foodConfig.value.countOrg[1])
  foodConfig.value.count[2] = Math.round(foodConfig.value.countOrg[2])
}

const nFoodRecommend = { ...foodRecommend }
nFoodRecommend.list.forEach(pokeItem => {
  const needFoods = []
  pokeItem.needFood.forEach(item => {
    item.forEach(sitem => {
      if (!needFoods.includes(sitem)) {
        needFoods.push(sitem)
      }
    })
  })
  pokeItem.menuList = findMenuWithFood(needFoods)
})

// 所有食谱
const cookMenuRes = []
for (const cookTypeKey in COOK_TYPES) {
  if (Object.hasOwnProperty.call(COOK_TYPES, cookTypeKey)) {
    const res = []
    for (const menuKey in MENU_TYPES) {
      if (Object.hasOwnProperty.call(MENU_TYPES, menuKey)) {
        if (+COOKMENU[menuKey].type === +cookTypeKey) {
          res.push(COOKMENU[menuKey])
        }
      }
    }
    cookMenuRes.push({
      id: cookTypeKey,
      name: t(`COOK_TYPES.${cookTypeKey}`),
      list: sortInObjectOptions(res, ['baseEnergy'], 'down')
    })
  }
}
</script>
<template>
  <h2>{{ $t("PROP.recipes") }}</h2>
  <div class="page-inner">
    <template v-for="cookTypeItem in cookMenuRes" v-bind:key="cookTypeItem.id">
      <h3>
        {{ cookTypeItem.name
        }}<span class="extra"
          >({{ cookTypeItem.list.length }}{{ $t("OPTIONS.oneThing") }})</span
        >
      </h3>
      <div class="cpt-foodmenu-scroll">
        <template
          v-for="menuItem in cookTypeItem.list"
          v-bind:key="menuItem.id"
        >
          <CptFoodmenu :menuItem="menuItem" />
        </template>
      </div>
    </template>
  </div>
  <h2>宝可梦面板食材数量模拟</h2>
  <div class="page-inner pokemon-food-calc">
    <el-radio-group
      v-model="foodConfig.pokemonType"
      @change="handleChangeFood()"
    >
      <el-radio :label="1">{{ $t(`POKE_TYPES.2`) }}</el-radio>
      <el-radio :label="0"
        >{{ $t(`POKE_TYPES.1`) }} & {{ $t(`POKE_TYPES.3`) }}</el-radio
      >
    </el-radio-group>
    <div class="mt3">
      <template v-for="(foodItem, foodKey) in [0, 30, 60]" v-bind:key="foodKey">
        <el-select
          v-model="foodConfig.list[foodKey]"
          clearable
          filterable
          :placeholder="`Lv.${foodItem}`"
          @change="handleChangeFood()"
        >
          <template
            v-for="(mapItem, key) in FOOD_TYPES"
            v-bind:key="`f_${$t(`FOOD_TYPES.${key}`)}`"
          >
            <el-option
              :label="`Lv.${foodItem}-${$t(`FOOD_TYPES.${key}`)}`"
              :value="key"
            >
              <img
                class="icon"
                v-lazy="`./img/food/${+key}.png`"
                :alt="$t(`FOOD_TYPES.${+key}`)"
              />
              {{ $t(`FOOD_TYPES.${key}`) }}
            </el-option>
          </template>
        </el-select>
      </template>
    </div>
    <div
      class="mt3"
      v-if="
        foodConfig.list[0] !== null &&
        foodConfig.list[0] !== '' &&
        foodConfig.count[0] > 0
      "
    >
      <div class="cpt-food all-food">
        <template
          v-for="(foodVal, key) in foodConfig.list"
          v-bind:key="`f_${$t(`FOOD_TYPES.${foodVal}`)}`"
        >
          <div class="cpt-food__item cur" v-if="foodConfig.count[key] > 0">
            <img
              v-lazy="`./img/food/${+foodVal}.png`"
              :alt="$t(`FOOD_TYPES.${+foodVal}`)"
            />
            <p class="cpt-food__count">
              X{{ foodConfig.count[key]
              }}<span class="extra" v-if="key > 0"
                >({{ getDecimalNumber(foodConfig.countOrg[key], 3) }})</span
              >
            </p>
          </div>
        </template>
      </div>
    </div>
  </div>
  <h2>食材宝可梦推荐</h2>
  <div class="page-inner cpt-tips">
    <p>创建时间：{{ formatTime(nFoodRecommend.creatTime) }}</p>
    <p>最后更新：{{ formatTime(nFoodRecommend.updateTime) }}</p>
    <p>本文基于app v{{ nFoodRecommend.appVer }}</p>
    <p>可能因为游戏更新会导致有修改，本人对此不负任何责任。</p>
    <p>
      新人优先树果队，不要玩食材队，食材队收益较低，千算万算不如人家树果队稳定，千算万算不如人家料理暴击一顿。需要扩食材包，需要解锁高级食材，需要严选宝可梦，需要扩锅手，需要做饭暴击手，组队难度大，培养成本高，做饭不暴击失落感强，容易弃坑。
    </p>
  </div>
  <ul class="cpt-list food-list">
    <li v-for="(pokeItem, pokeKey) in nFoodRecommend.list" v-bind:key="pokeKey">
      <p class="cpt-tips">
        {{ $t(`POKE_TYPES.${pokedex[pokeItem.evoLine[0]].pokeType}`) }}
      </p>
      <CptPoke
        :pokeId="pokemonsItem"
        v-for="pokemonsItem in pokeItem.evoLine"
        v-bind:key="pokemonsItem"
        :showKey="['helpSpeed', 'foodPer', 'berry', 'skillType', 'maxcarry']"
      />
      <div>
        <div
          class="cpt-food all-food"
          v-for="(foodItem, foodKey) in pokeItem.needFood"
          v-bind:key="foodKey"
        >
          <template
            v-for="(allFoodItem, allKey) in pokedex[pokeItem.evoLine[0]].food
              .type"
            v-bind:key="allKey"
          >
            <div
              class="cpt-food__item"
              v-if="
                pokedex[pokeItem.evoLine[0]].food.count[allFoodItem].num[
                  foodKey
                ] > 0
              "
              :class="{ cur: foodItem.includes(allFoodItem) }"
            >
              <img
                v-lazy="`./img/food/${allFoodItem}.png`"
                :alt="$t(`FOOD_TYPES.${allFoodItem}`)"
              />
              <p
                class="cpt-food__count"
                v-if="pokedex[pokeItem.evoLine[0]].food"
              >
                {{
                  pokedex[pokeItem.evoLine[0]].food.count[allFoodItem].num[
                    foodKey
                  ]
                }}
              </p>
            </div>
          </template>
        </div>
      </div>
      <p class="desc" v-html="pokeItem.desc"></p>
      <div class="cpt-foodmenu-list">
        <h3>
          {{ $t("PROP.with") }}{{ $t("PROP.recipes")
          }}<span class="extra"
            >({{ pokeItem.menuList.length }}{{ $t("OPTIONS.oneThing") }})</span
          >
        </h3>
        <div class="cpt-foodmenu-scroll">
          <template
            v-for="menuItem in pokeItem.menuList"
            v-bind:key="menuItem.id"
          >
            <CptFoodmenu :menuItem="menuItem" />
          </template>
        </div>
      </div>
    </li>
  </ul>
</template>