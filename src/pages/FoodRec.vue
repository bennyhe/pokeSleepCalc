<script setup>
import CptPoke from '../components/CptPoke/ItemIndex.vue'
import CptFoodmenu from '../components/CptFoodmenu/MenuItem.vue'
import { formatTime, findMenuWithFood } from '../utils/index.js'
import { pokedex } from '../config/pokedex.js'
import { foodRecommend } from '../config/foodRecommend.js'
import { POKE_TYPES, FOOD_TYPES } from '../config/valKey.js'

const nFoodRecommend = { ...foodRecommend }
nFoodRecommend.list.forEach(pokeItem => {
  pokeItem.menuList = findMenuWithFood(pokedex[pokeItem.evoLine[0]].food.type)
})
</script>
<template>
  <h2>食材宝可梦推荐</h2>
  <div class="page-inner mod-tips">
    <p>创建时间：{{ formatTime(nFoodRecommend.creatTime) }}</p>
    <p>最后更新：{{ formatTime(nFoodRecommend.updateTime) }}</p>
    <p>本文基于app v{{ nFoodRecommend.appVer }}</p>
    <p>可能因为游戏更新会导致有修改，本人对此不负任何责任。</p>
    <p>
      新人优先树果队，不要玩食材队，食材队收益较低，千算万算不如人家树果队稳定，千算万算不如人家料理暴击一顿。需要扩食材包，需要解锁高级食材，需要严选宝可梦，需要扩锅手，组队难度大，培养成本高，做饭不暴击失落感强，容易弃坑。
    </p>
  </div>
  <ul class="cpt-list food-list">
    <li v-for="(pokeItem, pokeKey) in nFoodRecommend.list" v-bind:key="pokeKey">
      <p class="mod-tips">
        {{ POKE_TYPES[pokedex[pokeItem.evoLine[0]].pokeType] }}型
      </p>
      <CptPoke
        :pokeId="pokemonsItem"
        v-for="pokemonsItem in pokeItem.evoLine"
        v-bind:key="pokemonsItem"
        :showKey="['helpSpeed', 'foodPer', 'berry', 'skillType']"
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
          关联食谱<span class="extra">({{ pokeItem.menuList.length }}个)</span>
        </h3>
        <div class="cpt-foodmenu-scroll">
          <CptFoodmenu
            v-for="menuItem in pokeItem.menuList"
            v-bind:key="menuItem.id"
            :menuItem="menuItem"
          />
        </div>
      </div>
    </li>
  </ul>
</template>