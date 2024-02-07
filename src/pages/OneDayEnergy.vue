<script setup>
import { ref } from 'vue'
import CptPoke from '../components/CptPoke/ItemIndex.vue'
import { sortInObjectOptions } from '../utils/index.js'
import { gameMap } from '../config/game.js'
import { pokedex } from '../config/pokedex.js'
import { BERRY_ENERGY } from '../config/berryEnergy.js'
import { BERRY_TYPES } from '../config/valKey.js'

const pageData = ref({
  curMap: 0,
  orgResRankArr: [],
  resRankArr: [],
  lv: 50
})
// for (const key in BERRY_ENERGY) {
//   if (Object.hasOwnProperty.call(BERRY_ENERGY, key)) {
//     const element = BERRY_ENERGY[key]
//     console.log(BERRY_TYPES[key], `${element.energy[0].energy}~${element.energy[element.energy.length - 1].energy}`)
//   }
// }
const getOneDayBerryEnergy = (pokeItem, isDoubleBerry, isRightBerry) => {
  const base =
    Math.floor(86400 / (pokeItem.helpSpeed / 2.2)) *
    (1 - pokeItem.foodPer / 100)
  let pokeType = pokeItem.pokeType === 1 ? 2 : 1
  if (isDoubleBerry) {
    pokeType = pokeItem.pokeType === 1 ? 3 : 2
  }
  let res = Math.floor(
    base *
      (BERRY_ENERGY[pokeItem.berryType].energy[pageData.value.lv - 1].energy *
        pokeType)
  )
  if (isRightBerry) {
    res = res * 2
  }
  return res
}
for (const key in pokedex) {
  if (Object.hasOwnProperty.call(pokedex, key)) {
    const pokeItem = pokedex[key]
    pageData.value.resRankArr.push(
      {
        ...pokeItem,
        id: pokeItem.id,
        oneDayBerryEnergy: getOneDayBerryEnergy(pokeItem, false, false)
      },
      {
        ...pokeItem,
        id: pokeItem.id,
        nameExtra: '树果S',
        oneDayBerryEnergy: getOneDayBerryEnergy(pokeItem, true, false)
      }
    )
  }
}
pageData.value.orgResRankArr = sortInObjectOptions(pageData.value.resRankArr, [
  'oneDayBerryEnergy'
])
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
      pokeItem.oneDayBerryEnergy = getOneDayBerryEnergy(
        pokeItem,
        pokeItem.nameExtra === '树果S',
        gameMap[pageData.value.curMap].berry.includes(pokeItem.berryType)
      )
      newRes.push(pokeItem)
    })
    pageData.value.resRankArr = sortInObjectOptions(newRes, [
      'oneDayBerryEnergy'
    ])
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
          v-for="(mapItem, mapIndex) in gameMap"
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
            class="cpt-select-list__bg"
            v-lazy="`./img/ui/${mapItem.pic}.png`"
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
      <p>* 非满包没开露营券。</p>
      <p>* 仅计算纯树果能量产出，未计算食材产出能量。</p>
    </div>
  </div>
  <div class="poke-tb">
    <div
      class="poke-tb__item"
      v-for="(pokeItem, pokeKey) in pageData.resRankArr"
      v-bind:key="`${pageData.curMap}_${pokeItem.id}`"
    >
      <p>
        <i class="i i-rank" :class="`i-rank--${pokeKey + 1}`">{{
          pokeKey + 1
        }}</i>
      </p>
      <CptPoke
        :pokeId="pokeItem.id"
        :showKey="['helpSpeed', 'berry', 'pokeType', 'foodPer']"
        :isHightLightBerry="
          gameMap[pageData.curMap].berry.includes(pokeItem.berryType)
        "
      />
      <div class="poke-tb__energy">
        <p>{{ pokeItem.nameExtra }}</p>
        <img class="icon" v-lazy="`./img/ui/energy.png`" />{{
          pokeItem.oneDayBerryEnergy
        }}
      </div>
    </div>
  </div>
</template>