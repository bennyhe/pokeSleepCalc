<script setup>
import { ref } from 'vue'
import { pokedex } from '../config/pokedex.js'
import { gameMap } from '../config/game.js'
import {
  getRandomHopeWithMulti,
  getLevelIndexByEnergy,
  getUnLockSleeps
} from '../utils/sleep.js'
import {
  getDecimalNumber,
  getNum,
  getStageLevelPicId
} from '../utils/index.js'
import { SLEEP_TYPES } from '../config/valKey.js'
import { LAB_CONFIG, SLEEP_CALC_POKEMONS } from '../config/act.js'

import * as echarts from 'echarts/core'
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
])

const pageData = ref({
  curMap: 0,
  mapSleepType: [],
  maxScore: '5000000',
  minScore: '0',
  isActRandom: false,
  actRandomNum: 0.3,
  upIdsSmall: {
    upType: 'small',
    ids: LAB_CONFIG.upIdsSmallIds
  },
  upIdsMid: {
    upType: 'mid',
    ids: LAB_CONFIG.upIdsMidIds
  },
  upIdsLarge: {
    upType: 'large',
    ids: LAB_CONFIG.upIdsLargeIds
  },
  pokemonId: 7006,
  chartShow: {
    'green': false,
    'beach': false,
    'hole': false,
    'snow': false,
    'lake': false,
    'plant': false
  }
})

// 存储每个地图每个等级会出现的宝可梦
const gameMapPokemons = [
  // {
  //   levelPokemons: [], //stage level pokemons
  //   allPokemons: [] //all pokemons
  // }
]
gameMap.forEach((gitem, gkey) => {
  const curMapSleeps = getUnLockSleeps(gitem.levelList, 34).allUnlockSleepsList
  gameMapPokemons.push({
    levelPokemons: [],
    allPokemons: [],
    pokemonsIdToMapLevelIndex: {}
  })
  curMapSleeps.forEach(sleepsItem => {
    if (!gameMapPokemons[gkey].levelPokemons[sleepsItem.unLockLevel]) {
      gameMapPokemons[gkey].levelPokemons[sleepsItem.unLockLevel] = []
    }
    if (
      !gameMapPokemons[gkey].levelPokemons[sleepsItem.unLockLevel].includes(
        sleepsItem.pokeId
      ) &&
      !gameMapPokemons[gkey].allPokemons.includes(sleepsItem.pokeId)
    ) {
      gameMapPokemons[gkey].levelPokemons[sleepsItem.unLockLevel].push(
        sleepsItem.pokeId
      )
      gameMapPokemons[gkey].pokemonsIdToMapLevelIndex[sleepsItem.pokeId] =
        sleepsItem.unLockLevel
    }
    if (!gameMapPokemons[gkey].allPokemons.includes(sleepsItem.pokeId)) {
      gameMapPokemons[gkey].allPokemons.push(sleepsItem.pokeId)
    }
  })
})
// console.log(gameMapPokemons)

const getTimes = 3200
const testData = ref([])
const getRes = (curAllScore, allPoint, mapId, mapSleepType, getTimesInFun) => {
  mapSleepType = mapSleepType || +pageData.value.mapSleepType[0]
  mapId = mapId || pageData.value.curMap
  getTimesInFun = getTimesInFun || getTimes
  return getRandomHopeWithMulti(
    gameMap[mapId],
    mapSleepType,
    allPoint,
    getLevelIndexByEnergy(gameMap[mapId].levelList, curAllScore),
    getTimesInFun,
    {
      isActRandom: pageData.value.isActRandom,
      banPokes: [],
      upIdsMid: pageData.value.upIdsMid,
      upIdsLarge: pageData.value.upIdsLarge,
      upIdsSmall: pageData.value.upIdsSmall,
      isNoMoreData: true,
      actRandomNum: pageData.value.actRandomNum || 0.3
    }
  )
}

import i18n from '../i18n'
const { t } = i18n.global
// 0-10w 1000
// 10w-50w 2000
// 50w以上-400w 5000
// 400w-500w 100000
const handleClickGet = type => {
  const startTime = new Date().getTime()
  const targetRes = []
  let lastGetList = []
  const splitPoint = 1000
  testData.value = []
  if (type === 'allMap1') {
  } else {
    // allMap
    console.log('quick start...', gameMap[pageData.value.curMap].levelList)
    gameMap.forEach((mapItem, mapKey) => {
      if (
        gameMapPokemons[mapKey].allPokemons.includes(+pageData.value.pokemonId)
      ) {
        pageData.value.mapSleepType.forEach(sltItem => {
          let k = 0
          const iland = []
          gameMap[pageData.value.curMap].levelList.forEach((item, mapIndex) => {
            const curAllScore = item.energy
            const allPoint = curAllScore * 100
            if (curAllScore <= +pageData.value.maxScore) {
              const randomRes = getRes(curAllScore, allPoint, mapKey, sltItem)
              const res = randomRes.res
              lastGetList = lastGetList.concat(randomRes.lastGetList)
              console.log(
                k,
                curAllScore,
                allPoint,
                `${(new Date().getTime() - startTime) / 1000}s`
              )
              const lastRes = {
                basePoint: curAllScore,
                allPoint,
                res
              }
              iland.push(lastRes)
              k++
            }
          })
          targetRes.push({
            curMap: mapItem.id,
            sleepType: sltItem,
            res: iland
          })
        })
      }
    })
  }
  testData.value = targetRes

  console.log(targetRes)
  gameMap.forEach((mapItem, mapKey) => {
    if (
      gameMapPokemons[mapKey].allPokemons.includes(+pageData.value.pokemonId)
    ) {
      const chart_options = {
        title: t(`ILAND.${mapItem.id}`),
        legendData: [],
        xAxis: [],
        series: [
          // {
          //   name: 'Email',
          //   type: 'line',
          //   stack: 'Total',
          //   data: [120, 132, 101, 134, 90, 230, 210]
          // }
        ]
      }
      const resInMap = targetRes.filter(item=>item.curMap === mapItem.id)
      chart_options.legendData = resInMap.map(resInMapItem=>{
        const onece = []

        chart_options.xAxis = resInMapItem.res.map(pointItem=>{

          const curPokeRes = pointItem.res.find(pointSubItem=>+pointSubItem.pokeId === +pageData.value.pokemonId)
          let num = 0
          if(curPokeRes && curPokeRes.count) {
            num = getDecimalNumber(curPokeRes.count / getTimes, 2)
          }
          onece.push(num)
          return getNum(pointItem.allPoint)
        })
        console.log(t(`SLEEP_TYPES.${resInMapItem.sleepType}`), onece)
        chart_options.series.push({
          name: t(`SLEEP_TYPES.${resInMapItem.sleepType}`),
          type: 'line',
          data: onece
        })
        return t(`SLEEP_TYPES.${resInMapItem.sleepType}`)
      })
      console.log(chart_options)
      const myChart = echarts.init(document.getElementById(`echart_dom_${mapItem.id}_echart`))
      myChart.setOption({
        title: {
          text: chart_options.title
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: chart_options.legendData
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: chart_options.xAxis
        },
        yAxis: {
          type: 'value'
        },
        series: chart_options.series
      })
    }
  })
  console.log(targetRes, lastGetList)
}

const handleClickChangeMap = id => {
  pageData.value.curMap = id
}

const handleChangeUps = () => {
  console.log(
    pageData.value.upIdsLarge.ids,
    pageData.value.upIdsMid.ids,
    pageData.value.upIdsSmall.ids
  )
}

const handleChangePokemon = () => {
  pageData.value.chartShow = {
    'green': false,
    'beach': false,
    'hole': false,
    'snow': false,
    'lake': false,
    'plant': false
  }
  gameMap.forEach((mapItem, mapKey) => {
    if (
      gameMapPokemons[mapKey].allPokemons.includes(+pageData.value.pokemonId)
    ) {
      pageData.value.chartShow[mapItem.id] = true
    }
  })
  pageData.value.mapSleepType = [
    pokedex[pageData.value.pokemonId].sleepType.toString(),
    '999'
  ]
}
pageData.value.chartShow = {
  'green': false,
  'beach': false,
  'hole': false,
  'snow': false,
  'lake': false,
  'plant': false
}
gameMap.forEach((mapItem, mapKey) => {
  if (
    gameMapPokemons[mapKey].allPokemons.includes(+pageData.value.pokemonId)
  ) {
    pageData.value.chartShow[mapItem.id] = true
  }
})
pageData.value.mapSleepType = [
  pokedex[pageData.value.pokemonId].sleepType.toString(),
  '999'
]
</script>

<template>
  <el-form label-width="90px">
    <!-- S 当前岛屿 -->
    <!-- <el-form-item :label="$t('OPTIONS.formLableCurIland')">
      <ul class="cpt-select-list">
        <li
          class="cpt-select-list__item"
          v-for="(mapItem, mapIndex) in gameMap"
          v-bind:key="mapItem.id"
          :class="{ cur: pageData.curMap === mapIndex }"
          @click="handleClickChangeMap(mapIndex)"
        >
          <div class="cpt-select-list__name">
            {{ $t(`ILAND.${mapItem.id}`) }}
          </div>
          <img
            v-if="mapItem.pic"
            class="cpt-select-list__bg"
            v-lazy="`./img/ui/${mapItem.pic}.png`"
            :alt="mapItem.name"
          />
        </li>
      </ul>
    </el-form-item> -->
    <!-- E 当前岛屿 -->
    <el-form-item :label="$t('PROP.pokemon')">
      <div style="width: 100%">
        <el-select
          v-model="pageData.pokemonId"
          filterable
          @change="handleChangePokemon()"
        >
          <template v-for="pokeItem in pokedex" :key="pokeItem.id">
            <el-option
              :label="`${$t(`POKEMON_NAME.${pokeItem.id}`)}-#${pokeItem.id}`"
              :value="pokeItem.id"
            >
              <img
                class="icon"
                v-lazy="`./img/pokedex/${pokeItem.id}.png`"
                :alt="$t(`POKEMON_NAME.${pokeItem.id}`)"
                v-bind:key="pokeItem.id"
              />
              {{ $t(`POKEMON_NAME.${pokeItem.id}`) }}-#{{ pokeItem.id }}
            </el-option>
          </template>
        </el-select>
      </div>
      <ul class="cpt-select-list">
        <template v-for="(mapItem, mapKey) in gameMap" v-bind:key="mapItem.id">
          <li
            class="cpt-select-list__item cur"
            v-if="
              gameMapPokemons[mapKey].allPokemons.includes(+pageData.pokemonId)
            "
          >
            <div class="cpt-select-list__name">
              {{ $t(`ILAND.${mapItem.id}`) }}
              <p>
                <img
                  class="icon"
                  v-lazy="
                    `./img/ui/${getStageLevelPicId(
                      gameMap[mapKey].levelList[
                        gameMapPokemons[mapKey].pokemonsIdToMapLevelIndex[
                          +pageData.pokemonId
                        ]
                      ].name
                    )}.png`
                  "
                />{{
                  $t(
                    `LEVEL_TITLE.${
                      gameMap[mapKey].levelList[
                        gameMapPokemons[mapKey].pokemonsIdToMapLevelIndex[
                          +pageData.pokemonId
                        ]
                      ].nameId
                    }`
                  )
                }}{{
                  gameMap[mapKey].levelList[
                    gameMapPokemons[mapKey].pokemonsIdToMapLevelIndex[
                      +pageData.pokemonId
                    ]
                  ].nameIndex
                }}
              </p>
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
    <el-form-item label="睡眠类型">
      <el-checkbox-group v-model="pageData.mapSleepType">
        <el-checkbox
          :label="cKey"
          v-for="(cItem, cKey) in SLEEP_TYPES"
          v-bind:key="cItem"
          ><div class="i i-sleeptype" :class="`i i-sleeptype--${cKey}`">
            {{ $t(`SLEEP_TYPES.${cKey}`) }}
          </div>
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item>
      <div style="color: var(--el-text-color-regular)">
        {{ $t("PAGE_SLEEPCALC.formLableActRandom") }}
        <span style="display: inline-block; vertical-align: middle">
          <el-switch
            v-model="pageData.isActRandom"
            inline-prompt
            :active-text="$t('OPTIONS.yes')"
            :inactive-text="$t('OPTIONS.no')"
            style="--el-switch-on-color: #ffaf00"
          />
        </span>
        <el-input-number
          v-if="pageData.isActRandom"
          v-model="pageData.actRandomNum"
          :min="0.3"
          :max="0.4"
        />
      </div>
    </el-form-item>
    <el-form-item label="不进保底">
      <template
        v-for="pokeId in SLEEP_CALC_POKEMONS.noLastList"
        v-bind:key="`midUp_${pokeId}`"
      >
        <span class="cpt-avatar">
          <img
            class="cpt-avatar__pic"
            v-lazy="`./img/pokedex/${pokeId}.png`"
            :alt="$t(`POKEMON_NAME.${pokeId}`)"
          />
        </span>
      </template>
    </el-form-item>
    <el-form-item label="大UP">
      <el-select
        v-model="pageData.upIdsLarge.ids"
        placeholder="大UP"
        @change="handleChangeUps"
        filterable
        clearable
        multiple
        collapse-tags
        collapse-tags-tooltip
      >
        <template v-for="pokeItem in pokedex" :key="pokeItem.id">
          <el-option
            :label="$t(`POKEMON_NAME.${pokeItem.id}`)"
            :value="pokeItem.id"
          >
            <img
              class="icon"
              v-lazy="`./img/pokedex/${pokeItem.id}.png`"
              :alt="$t(`POKEMON_NAME.${pokeItem.id}`)"
              v-bind:key="pokeItem.id"
            />
            {{ $t(`POKEMON_NAME.${pokeItem.id}`) }}
          </el-option>
        </template>
      </el-select>
    </el-form-item>
    <el-form-item label="中UP">
      <el-select
        v-model="pageData.upIdsMid.ids"
        placeholder="中UP"
        @change="handleChangeUps"
        filterable
        clearable
        multiple
        collapse-tags
        collapse-tags-tooltip
      >
        <template v-for="pokeItem in pokedex" :key="pokeItem.id">
          <el-option
            :label="$t(`POKEMON_NAME.${pokeItem.id}`)"
            :value="pokeItem.id"
          >
            <img
              class="icon"
              v-lazy="`./img/pokedex/${pokeItem.id}.png`"
              :alt="$t(`POKEMON_NAME.${pokeItem.id}`)"
              v-bind:key="pokeItem.id"
            />
            {{ $t(`POKEMON_NAME.${pokeItem.id}`) }}
          </el-option>
        </template>
      </el-select>
    </el-form-item>
    <el-form-item label="小UP">
      <el-select
        v-model="pageData.upIdsSmall.ids"
        placeholder="小UP"
        @change="handleChangeUps"
        filterable
        clearable
        multiple
        collapse-tags
        collapse-tags-tooltip
      >
        <template v-for="pokeItem in pokedex" :key="pokeItem.id">
          <el-option
            :label="$t(`POKEMON_NAME.${pokeItem.id}`)"
            :value="pokeItem.id"
          >
            <img
              class="icon"
              v-lazy="`./img/pokedex/${pokeItem.id}.png`"
              :alt="$t(`POKEMON_NAME.${pokeItem.id}`)"
              v-bind:key="pokeItem.id"
            />
            {{ $t(`POKEMON_NAME.${pokeItem.id}`) }}
          </el-option>
        </template>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button @click="handleClickGet('allMap')">计算结果</el-button>
    </el-form-item>
  </el-form>
  <template v-for="mapItem in gameMap" v-bind:key="`${mapItem.id}-echart`">
      <div
        class="chart-item"
        :class="{'hide': !pageData.chartShow[mapItem.id]}"
        :id="`echart_dom_${mapItem.id}_echart`"
        style="height: 450px"
      ></div>
  </template>
  <template
    v-for="iLandItem in testData"
    v-bind:key="`${iLandItem.curMap}-${iLandItem.sleepType}`"
  >
    <h2>
      {{ $t(`ILAND.${iLandItem.curMap}`) }}-{{
        $t(`SLEEP_TYPES.${iLandItem.sleepType}`)
      }}
    </h2>
    <div
      v-for="tdItem in iLandItem.res"
      v-bind:key="`${iLandItem.curMap}-${iLandItem.sleepType}-${tdItem.allPoint}`"
    >
      <h3>
        <img class="icon" v-lazy="`./img/ui/energy.png`" />
        {{ getNum(tdItem.basePoint) }}-{{ getNum(tdItem.allPoint) }}
        <span class="extra"
          >({{ tdItem.res.length }}{{ $t(`OPTIONS.one`) }})</span
        >
      </h3>
      <div class="page-inner">
        <div
          class="cpt-avatar"
          v-for="hopeItem in tdItem.res"
          v-bind:key="hopeItem.pokeId"
        >
          <img
            class="cpt-avatar__pic"
            v-lazy="`./img/pokedex/${hopeItem.pokeId}.png`"
            :alt="$t(`POKEMON_NAME.${hopeItem.pokeId}`)"
          />
          <p>{{ getDecimalNumber(hopeItem.count / getTimes, 2) }}</p>
        </div>
      </div>
    </div>
  </template>
</template>