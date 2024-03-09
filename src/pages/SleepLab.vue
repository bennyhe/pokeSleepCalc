<script setup>
import { ref } from 'vue'
import { pokedex } from '../config/pokedex.js'
import { gameMap } from '../config/game.js'
import { getRandomHope, getLevelIndexByEnergy } from '../utils/sleep.js'
import { getDecimalNumber,getNum } from '../utils/index.js'
import { SPO_DATA } from '../config/spo.js'
import { SLEEP_STYLE } from '../config/sleepStyle.js'
import { SLEEP_NAMES } from '../config/valKey.js'
import CptPoke from '../components/CptPoke/ItemIndex.vue'

// const agm = [...gameMap]
// for (let i = 5; i < agm.length; i++) {
//   const gmItem = agm[i]
//   gmItem.levelList.forEach(levelItem => {
//     if (levelItem.sleepStyles.length > 0) {
//       const arr = []
//       levelItem.sleepStyles.forEach((sleepItem, sleepKey) => {
//         for (const key in pokedex) {
//           if (Object.hasOwnProperty.call(pokedex, key)) {
//             const pokeItem = pokedex[key]
//             if (
//               !arr[sleepKey] &&
//               sleepItem.indexOf('#') > -1 &&
//               sleepItem.indexOf(pokeItem.name) > -1
//             ) {
//               const res = `${pokeItem.id}-id-${sleepItem
//                 .replace(pokeItem.name, '')
//                 .replace('#', '')}`
//               arr[sleepKey] = res
//             }
//           }
//         }
//       })
//       levelItem.sleepStyles = arr
//     }
//   })
//   console.log(gmItem.levelList)
// }
// // 导出数据用
// const arr = {}
// testing4.forEach(item=>{
//   const res = item.split(',')
//   arr[`${res[0]}-id-${res[4]}`] = {
//     id: +res[6],
//     spo: +res[5]
//   }
//   console.log(res[0], res[5], res[6])
// })
// console.log(arr)

const getTimes = 4000
const basePoint = 0
const targetPokeId = 280
const targetRes = []
const testData = ref([])
const startTime = new Date().getTime()
const baseStarI = 595
const splitPoint = 1000
for (let i = baseStarI; i < baseStarI + 1; i++) {
  const curAllScore = (basePoint + splitPoint * i)
  const res = getRandomHope(
    gameMap[4],
    2,
    curAllScore * 100,
    getLevelIndexByEnergy(gameMap[4], curAllScore),
    getTimes
  )
  console.log(i, new Date().getTime() - startTime)
  const lastRes = {
    basePoint: curAllScore,
    allPoint: curAllScore * 100,
    res
  }
  targetRes.push(lastRes)
}
testData.value = targetRes
console.log(targetRes)
</script>

<template>
  <div v-for="tdItem in testData" v-bind:key="tdItem.allPoint">
    <h3>{{ getNum(tdItem.basePoint)}}-{{getNum(tdItem.allPoint) }}</h3>
    <div class="page-inner">
      <div
        class="cpt-avatar"
        v-for="hopeItem in tdItem.res"
        v-bind:key="hopeItem.pokeId"
      >
        <img
          v-lazy="`./img/pokedex/${hopeItem.pokeId}.png`"
          :alt="pokedex[hopeItem.pokeId].name"
        />
        <p>{{ getDecimalNumber(hopeItem.count / getTimes, 2) }}</p>
      </div>
    </div>
  </div>
  <div>
        <template v-for="gmItem in gameMap" v-bind:key="gmItem.id">
          <h3>
            {{ gmItem.name }}
          </h3>
          <div
            class="poke-tb"
            v-for="levelItem in gmItem.levelList"
            v-bind:key="levelItem.energy"
          >
            <h4>
              {{ levelItem.name }}
              <span class="extra" v-if="levelItem.sleepStyles"
                >{{ levelItem.sleepStyles.length }}只</span
              >
            </h4>
            <template v-for="sleepId in levelItem.sleepStyles">
              <div
                class="poke-tb__item"
                v-if="SLEEP_STYLE[sleepId]"
                v-bind:key="sleepId"
              >
                <CptPoke :pokeId="SLEEP_STYLE[sleepId].pokeId" />
                <p>{{ SLEEP_STYLE[sleepId].id }}</p>
                <p>{{ SLEEP_NAMES[SLEEP_STYLE[sleepId].sleepNameId] }}</p>
                <p>{{ SLEEP_STYLE[sleepId].star }}星</p>
                <div v-if="SPO_DATA[gmItem.id] && SPO_DATA[gmItem.id][sleepId] && SPO_DATA[gmItem.id][sleepId].spo">
                  <p>SPO:{{ SPO_DATA[gmItem.id][sleepId].spo }}</p>
                  <p>SPOID:{{ SPO_DATA[gmItem.id][sleepId].id }}</p>
                </div>
                <div v-else>没有spo</div>
                <p>{{ SLEEP_STYLE[sleepId].exp }}</p>
                <p>{{ SLEEP_STYLE[sleepId].shards }}</p>
                <p>{{ SLEEP_STYLE[sleepId].candys }}</p>
              </div>
            </template>
          </div>
        </template>
      </div>
      <div class="poke-tb">
        <template v-for="pokeItem in pokedex" v-bind:key="pokeItem.id">
          <template
            v-for="sleepId in SLEEP_STYLE"
            v-bind:key="`${sleepId.pokeId}_${sleepId.id}`"
          >
            <div class="poke-tb__item" v-if="pokeItem.id === sleepId.pokeId">
              <CptPoke :pokeId="sleepId.pokeId" />
              <p>{{ sleepId.id }}</p>
              <p>{{ SLEEP_NAMES[sleepId.sleepNameId] }}</p>
              <p>{{ sleepId.star }}星</p>
              <p>{{ sleepId.exp }}</p>
              <p>{{ sleepId.shards }}</p>
              <p>{{ sleepId.candys }}</p>
            </div>
          </template>
        </template>
      </div>
</template>