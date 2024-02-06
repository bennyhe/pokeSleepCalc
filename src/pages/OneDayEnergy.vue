<script setup>
import CptPoke from '../components/CptPoke/ItemIndex.vue'
import { sortInObjectOptions } from '../utils/index.js'
import { pokedex } from '../config/pokedex.js'
import { BERRY_ENERGY } from '../config/berryEnergy.js'
import { BERRY_TYPES } from '../config/valKey.js'

// for (const key in BERRY_ENERGY) {
//   if (Object.hasOwnProperty.call(BERRY_ENERGY, key)) {
//     const element = BERRY_ENERGY[key]
//     console.log(BERRY_TYPES[key], `${element.energy[0].energy}~${element.energy[element.energy.length - 1].energy}`)
//   }
// }
const lv = 50
let resRankArr = []
for (const key in pokedex) {
  if (Object.hasOwnProperty.call(pokedex, key)) {
    const element = pokedex[key]
    const base =
      Math.floor(86400 / (element.helpSpeed / 2.2)) *
      (1 - element.foodPer / 100)
    resRankArr.push(
      {
        ...element,
        id: element.id,
        oneDayBerryEnergy: Math.floor(
          base *
            (BERRY_ENERGY[element.berryType].energy[lv - 1].energy *
              (element.pokeType === 1 ? 2 : 1))
        )
      },
      {
        ...element,
        id: element.id,
        nameExtra: '树果s',
        oneDayBerryEnergy: Math.floor(
          base *
            (BERRY_ENERGY[element.berryType].energy[lv - 1].energy *
              (element.pokeType === 1 ? 3 : 2))
        )
      }
    )
  }
}
resRankArr = sortInObjectOptions(resRankArr, ['oneDayBerryEnergy'])
</script>

<template>
  <h2>{{ lv }}级一天能量排行</h2>
  <div class="page-inner">
    <div class="mod-tips">
      <p>* 非满包没开露营券。</p>
      <p>* 仅计算纯树果能量产出，未计算食材产出能量。</p>
    </div>
  </div>
  <div class="poke-tb">
    <div
      class="poke-tb__item"
      v-for="(pokeItem, pokeKey) in resRankArr"
      v-bind:key="pokeItem.id"
    >
      <p>
        <i class="i i-rank" :class="`i-rank--${pokeKey + 1}`">{{
          pokeKey + 1
        }}</i>
      </p>
      <CptPoke
        :pokeId="pokeItem.id"
        :showKey="['helpSpeed', 'berry', 'pokeType', 'foodPer']"
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