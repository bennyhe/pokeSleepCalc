<script setup>
import CptPoke from '../components/CptPoke/ItemIndex.vue'
import { formatTime } from '../utils/index.js'
import { pokedex } from '../config/pokedex.js'
import { foodRecommend } from '../config/foodRecommend.js'
import { pokeTypes, foodTypes } from '../config/valKey.js'
</script>
<template>
  <h2>食材宝可梦推荐</h2>
  <div class="mod-tips">
    <p>
      注:
      新人优先树果队，不要玩食材队，食材队收益较低，千算万算不如人家树果队稳定，千算万算不如人家料理暴击一顿。需要扩食材包，需要解锁高级食材，需要严选宝可梦，需要扩锅手，组队难度大，培养成本高，做饭不暴击失落感强，容易弃坑。
    </p>
    <p>可能因为游戏更新会导致有修改，本人对此不负任何责任。</p>
    最后更新：{{ formatTime(foodRecommend.pdateTime) }}
  </div>
  <ul class="cpt-list food-list">
    <li v-for="(pokeItem, pokeKey) in foodRecommend.list" v-bind:key="pokeKey">
      <p class="mod-tips">{{ pokeTypes[pokedex[pokeItem.evoLine[0]].pokeType] }}型</p>
      <CptPoke
        :pokeId="pokemonsItem"
        v-for="pokemonsItem in pokeItem.evoLine"
        v-bind:key="pokemonsItem"
      />
      <div>
        <span
          class="cpt-food"
          v-for="(foodItem,foodKey) in pokeItem.needFood"
          v-bind:key="foodItem"
        >
          <template
            v-for="(subFoodItem, subKey) in foodItem"
            v-bind:key="subFoodItem"
          >
            <div class="cpt-food__item">
              <img
                v-lazy="`./img/food/${subFoodItem}.png`"
                :alt="foodTypes[subFoodItem]"
              />
              <p v-if="pokedex[pokeItem.evoLine[0]].food">X {{ pokedex[pokeItem.evoLine[0]].food[subFoodItem].num[foodKey] }}</p>
            </div>
            <template v-if="subKey !== foodItem.length - 1">/</template>
          </template>
        </span>
      </div>
      <p class="desc" v-html="pokeItem.desc"></p>
    </li>
  </ul>
</template>