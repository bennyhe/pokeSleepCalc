<script setup>
import { ref, onMounted } from 'vue'
import CptPoke from '../components/CptPoke/ItemIndex.vue'
import CptEnergyItem from '../components/CptEnergy/EnergyItem.vue'
import { sortInObjectOptions } from '../utils/index.js'
import { getOneDayEnergy, getOneDayHelpCount } from '../utils/energy.js'
import { gameMap } from '../config/game.js'
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
  pageSize: 100
})
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
  // for (const key in BERRY_ENERGY) {
  //   if (Object.hasOwnProperty.call(BERRY_ENERGY, key)) {
  //     const element = BERRY_ENERGY[key]
  //     console.log(t(`BERRY_TYPES.${key}`), `${element.energy[0].energy}~${element.energy[element.energy.length - 1].energy}`)
  //   }
  // }
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
            id: pokeItem.id,
            nameExtra: is2n ? t('SHORT_SKILL.berrys') : '',
            ...getOneDayEnergy(
              pokeItem,
              pageData.value.lv,
              [
                pokeItem.food.type[arrFTItem[0]],
                pokeItem.food.type[arrFTItem[1]]
              ],
              is2n ? true : false,
              false
            )
          })
        })
      } else {
        [0,1].forEach((arrFTItem, arrFTKey) => {
          const is2n = (arrFTKey + 1) % 2 === 0
          pageData.value.resRankArr.push({
            ...pokeItem,
            id: pokeItem.id,
            nameExtra: is2n ? t('SHORT_SKILL.berrys') : '',
            ...getOneDayEnergy(
              pokeItem,
              pageData.value.lv,
              [],
              is2n ? true : false,
              false
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
  // console.log(pageData.value.orgResRankArr)
  pageData.value.resRankArr = JSON.parse(
    JSON.stringify(pageData.value.orgResRankArr)
  )
})

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
          pokeItem.nameExtra.indexOf('S') > -1,
          newGameMap[pageData.value.curMap].berry.includes(pokeItem.berryType)
        )
      })
    })
    pageData.value.resRankArr = sortInObjectOptions(newRes, ['oneDayEnergy'])
  }
}
const handleClickChangeMap = id => {
  pageData.value.curMap = id
  pageData.value.curPageIndex = 1

  getChangeOptionsAfterData()
}

// const handleClickSlider = () => {
//   getChangeOptionsAfterData()
// }
</script>

<template>
  <h2>{{ pageData.lv }}{{$t('PAGE_TITLE.onedayenergy')}}</h2>
  <el-form label-width="82px">
    <!-- S 当前岛屿 -->
    <el-form-item label="当前岛屿">
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
    <el-form-item label="2倍树果">
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
  </el-form>
  <div class="page-inner">
    <div class="mod-tips">
      <p>* 数值均为程序预估结果，与实际有误差。</p>
      <p>* 非满包满活力没开露营券，非技能型宝可梦无技能保底。</p>
    </div>
  </div>
  <div class="cpt-pagination">
    <el-pagination
      layout="prev, pager, next"
      :total="pageData.resRankArr.length"
      :page-size="pageData.pageSize"
      v-model:current-page="pageData.curPageIndex"
    />
  </div>
  <div class="poke-tb">
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
          pokeItem.id
        }_${pokeKey}_${pokeItem.useFoods.join('')}_${pokeItem.nameExtra || ''}`"
        :isHightLightBerry="
          newGameMap[pageData.curMap].berry.includes(pokeItem.berryType)
        "
      />
    </template>
  </div>
  <div class="cpt-pagination">
    <el-pagination
      layout="prev, pager, next"
      :total="pageData.resRankArr.length"
      :page-size="pageData.pageSize"
      v-model:current-page="pageData.curPageIndex"
    />
  </div>
</template>