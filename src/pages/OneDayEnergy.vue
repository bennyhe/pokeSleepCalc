<script setup>
import { ref } from 'vue'
import CptPoke from '../components/CptPoke/ItemIndex.vue'
import { sortInObjectOptions } from '../utils/index.js'
import { getOneDayEnergy } from '../utils/energy.js'
import { gameMap } from '../config/game.js'
import { pokedex } from '../config/pokedex.js'
import { BERRY_TYPES, FOOD_TYPES } from '../config/valKey.js'

const newGameMap = [...gameMap]
const pageData = ref({
  curMap: 0,
  orgResRankArr: [],
  resRankArr: [],
  lv: 50
})
newGameMap.push({
  name: '未适正树果',
  id: 'none',
  berry: [8, 9, 2, 13, 3, 5]
})
// for (const key in BERRY_ENERGY) {
//   if (Object.hasOwnProperty.call(BERRY_ENERGY, key)) {
//     const element = BERRY_ENERGY[key]
//     console.log(BERRY_TYPES[key], `${element.energy[0].energy}~${element.energy[element.energy.length - 1].energy}`)
//   }
// }
for (const key in pokedex) {
  if (Object.hasOwnProperty.call(pokedex, key)) {
    const pokeItem = pokedex[key]
    pokeItem.oneDayHelpCount = {
      sum: Math.floor(86400 / (pokeItem.helpSpeed / 2.2)), // 一天总帮忙次数
      food: 0, // 其中树果的帮忙次数
      berry: 0 // 其中食材的帮忙次数
    }
    pokeItem.oneDayHelpCount.berry = Math.floor(
      pokeItem.oneDayHelpCount.sum * (1 - pokeItem.foodPer / 100)
    )
    pokeItem.oneDayHelpCount.food =
      pokeItem.oneDayHelpCount.sum - pokeItem.oneDayHelpCount.berry

    const tempFoodType = [
      [0, 0],
      [0, 0],
      [0, 1],
      [0, 1]
    ]

    tempFoodType.forEach((arrFTItem, arrFTKey) => {
      const is2n = (arrFTKey + 1) % 2 === 0
      pageData.value.resRankArr.push({
        ...pokeItem,
        id: pokeItem.id,
        nameExtra: is2n ? '树果S' : '',
        ...getOneDayEnergy(
          pokeItem,
          pageData.value.lv,
          [pokeItem.food.type[arrFTItem[0]], pokeItem.food.type[arrFTItem[1]]],
          is2n ? true : false,
          false
        )
      })
    })
  }
}
pageData.value.orgResRankArr = sortInObjectOptions(pageData.value.resRankArr, [
  'oneDayEnergy'
])
// console.log(pageData.value.orgResRankArr)
pageData.value.resRankArr = JSON.parse(
  JSON.stringify(pageData.value.orgResRankArr)
)
const getChangeOptionsAfterData = () => {
  if (pageData.value.curMap === 0) {
    pageData.value.resRankArr = JSON.parse(
      JSON.stringify(pageData.value.orgResRankArr)
    )
  } else {
    const newRes = []
    pageData.value.orgResRankArr.forEach(pokeItem => {
      newRes.push({
        ...pokeItem,
        ...getOneDayEnergy(
          pokeItem,
          pageData.value.lv,
          pokeItem.useFoods,
          pokeItem.nameExtra === '树果S',
          newGameMap[pageData.value.curMap].berry.includes(pokeItem.berryType)
        )
      })
    })
    pageData.value.resRankArr = sortInObjectOptions(newRes, ['oneDayEnergy'])
  }
}
const handleClickChangeMap = id => {
  pageData.value.curMap = id

  getChangeOptionsAfterData()
}
</script>

<template>
  <h2>{{ pageData.lv }}级一天能量排行</h2>

  <el-form label-width="90px">
    <!-- S 当前岛屿 -->
    <el-form-item label="当前岛屿">
      <ul class="cpt-select-list">
        <li
          class="cpt-select-list__item"
          v-for="(mapItem, mapIndex) in newGameMap"
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
                    :alt="BERRY_TYPES[berryItem]"
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
      </ul>
    </el-form-item>
    <!-- E 当前岛屿 -->
    <!-- <el-form-item label="宝可梦等级">
      <el-slider v-model="pageData.lv" show-input :min="1" :max="50" @change="getChangeOptionsAfterData()"/>
    </el-form-item> -->
  </el-form>
  <div class="page-inner">
    <div class="mod-tips">
      <p>* 数值均为程序预估结果，与实际有误差。</p>
      <p>* 非满包没开露营券，不含技能率。</p>
    </div>
  </div>
  <div class="poke-tb">
    <div
      class="poke-tb__item"
      v-for="(pokeItem, pokeKey) in pageData.resRankArr"
      v-bind:key="`area${pageData.curMap}_${
        pokeItem.id
      }_${pokeItem.useFoods.join('')}_${pokeItem.nameExtra || ''}`"
    >
      <p>
        <i class="i i-rank" :class="`i-rank--${pokeKey + 1}`">{{
          pokeKey + 1
        }}</i>
      </p>
      <CptPoke
        :pokeId="pokeItem.id"
        :showKey="['helpSpeed', 'berry', 'pokeType', 'foodPer', 'skillType']"
        :isHightLightBerry="
          newGameMap[pageData.curMap].berry.includes(pokeItem.berryType)
        "
      />
      <div>
        <div class="cpt-food all-food">
          <div
            class="cpt-food__item cur"
            v-for="(foodItem, foodKey) in pokeItem.useFoods"
            v-bind:key="foodKey"
          >
            <img
              v-lazy="`./img/food/${foodItem}.png`"
              :alt="FOOD_TYPES[foodItem]"
            />
            <p class="cpt-food__count">
              {{ pokeItem.food.count[foodItem].num[foodKey] }}
            </p>
          </div>
        </div>
      </div>
      <div class="poke-tb__energy">
        <p class="sptime">{{ pokeItem.nameExtra }}</p>
        <p class="cpt-pokemon__poketype1 xs">
          果{{ pokeItem.oneDayBerryEnergy }}
        </p>
        <div>
          <div class="cpt-food cpt-food--s all-food">
            <div
              class="cpt-food__item cur"
              v-for="(foodItem, foodKey) in pokeItem.oneDayFoodEnergy.useFoods"
              v-bind:key="foodKey"
            >
              <img
                v-lazy="`./img/food/${foodItem}.png`"
                :alt="FOOD_TYPES[foodItem]"
              />
              <p class="cpt-food__count">
                {{ pokeItem.oneDayFoodEnergy.count[foodKey] }}
              </p>
            </div>
          </div>
        </div>
        <p class="cpt-pokemon__poketype2 xs">
          食{{ pokeItem.oneDayFoodEnergy.allEnergy }}
        </p>
        <p class="res">
          <img class="icon" v-lazy="`./img/ui/energy.png`" />{{
            pokeItem.oneDayEnergy
          }}
        </p>
      </div>
    </div>
  </div>
</template>