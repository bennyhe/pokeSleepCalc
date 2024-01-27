<script setup>
import CptPoke from '../components/CptPoke/ItemIndex.vue'
import { formatTime, sortInObjectOptions } from '../utils/index.js'
import { pokedex } from '../config/pokedex.js'
import { COOKMENU } from '../config/cookmenu.js'
import { foodRecommend } from '../config/foodRecommend.js'
import { POKE_TYPES, FOOD_TYPES, MENU_TYPES } from '../config/valKey.js'

console.log(COOKMENU)
const findMenuWithFood = pokemonFoodKey => {
  // console.log('pokemon:', pokemonFoodKey)
  const res = []
  for (const menuItem in COOKMENU) {
    if (Object.hasOwnProperty.call(COOKMENU, menuItem)) {
      const element = COOKMENU[menuItem]
      for (let i = 0; i < element.from.length; i++) {
        if (pokemonFoodKey.includes(element.from[i].id)) {
          res.push(COOKMENU[menuItem])
          break
        }
      }
    }
  }
  return sortInObjectOptions(res, ['baseEnergy'], 'down')
}

const fnAccumulation = (arr, key) => {
  const res = arr.reduce((acc, item) => acc + item[key], 0)
  return res
}
</script>
<template>
  <h2>食材宝可梦推荐</h2>
  <div class="mod-tips">
    <p>创建时间：{{ formatTime(foodRecommend.creatTime) }}</p>
    <p>最后更新：{{ formatTime(foodRecommend.updateTime) }}</p>
    <p>本文基于app v{{ foodRecommend.appVer }}</p>
    <p>可能因为游戏更新会导致有修改，本人对此不负任何责任。</p>
    <p>
      新人优先树果队，不要玩食材队，食材队收益较低，千算万算不如人家树果队稳定，千算万算不如人家料理暴击一顿。需要扩食材包，需要解锁高级食材，需要严选宝可梦，需要扩锅手，组队难度大，培养成本高，做饭不暴击失落感强，容易弃坑。
    </p>
  </div>
  <ul class="cpt-list food-list">
    <li v-for="(pokeItem, pokeKey) in foodRecommend.list" v-bind:key="pokeKey">
      <p class="mod-tips">
        {{ POKE_TYPES[pokedex[pokeItem.evoLine[0]].pokeType] }}型
      </p>
      <CptPoke
        :pokeId="pokemonsItem"
        v-for="pokemonsItem in pokeItem.evoLine"
        v-bind:key="pokemonsItem"
        :showKey="['helpSpeed', 'foodPer', 'berry']"
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
                :alt="FOOD_TYPES[allFoodItem]"
              />
              <p v-if="pokedex[pokeItem.evoLine[0]].food">
                X
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
          关联菜谱({{
            findMenuWithFood(pokedex[pokeItem.evoLine[0]].food.type).length
          }})
        </h3>
        <div class="cpt-foodmenu-scroll">
          <div
            class="cpt-foodmenu"
            :class="`cpt-foodmenu--${menuItem.type}`"
            v-for="menuItem in findMenuWithFood(
              pokedex[pokeItem.evoLine[0]].food.type
            )"
            v-bind:key="menuItem.id"
          >
            <p class="cpt-foodmenu__name">
              {{ MENU_TYPES[menuItem.id] }}({{
                fnAccumulation(menuItem.from, "num")
              }})
            </p>
            <div class="cpt-food all-food">
              <div
                class="cpt-food__item cur"
                v-for="allFoodItem in menuItem.from"
                v-bind:key="allFoodItem.id"
              >
                <img
                  v-lazy="`./img/food/${allFoodItem.id}.png`"
                  :alt="FOOD_TYPES[allFoodItem.id]"
                />
                <p>X{{ allFoodItem.num }}</p>
              </div>
            </div>
            <p class="cpt-foodmenu__bs">
              <img class="icon" v-lazy="`./img/ui/energy.png`" />
              {{ menuItem.baseEnergy }}
            </p>
            <img
              class="cpt-foodmenu__bg"
              v-lazy="`./img/food/${menuItem.id}.png`"
              :alt="MENU_TYPES[menuItem.id]"
            />
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>