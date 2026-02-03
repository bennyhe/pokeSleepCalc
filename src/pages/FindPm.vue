<script setup>
import { ref, nextTick, onBeforeUnmount } from 'vue'
import CptAvatar from '../components/CptAvatar/ItemIndex.vue'
import CptSelectOptions from '../components/CptSelect/OptionsItem.vue'
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
import { SLEEP_STYLE } from '../config/sleepStyle.js'
import { LAB_CONFIG, SLEEP_CALC_POKEMONS } from '../config/act.js'

import * as echarts from 'echarts/core'
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  MarkPointComponent,
  MarkLineComponent
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
  MarkPointComponent,
  MarkLineComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
])

const pageData = ref({
  curMap: 0, //未使用参数
  mapSleepType: [],
  // maxScore: '10981171',
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
  noLastList: [...SLEEP_CALC_POKEMONS.noLastList, ...LAB_CONFIG.noLastList],
  pokemonId: 7006,
  chartShow: {
    st1: false,
    st2: false,
    st3: false,
    st999: false
  }
})
// 存储 ECharts 实例，避免重复初始化
const chartInstances = ref({})

// 销毁图表实例的函数
const disposeChart = chartId => {
  if (chartInstances.value[chartId]) {
    chartInstances.value[chartId].dispose()
    delete chartInstances.value[chartId]
  }
}
// 组件卸载时清理所有图表实例
const cleanupCharts = () => {
  Object.keys(chartInstances.value).forEach(chartId => {
    disposeChart(chartId)
  })
}

// 初始化或更新图表的函数
const initOrUpdateChart = (chartId, options) => {
  // 添加 DOM 存在性检查
  const chartDom = document.getElementById(chartId)
  if (!chartDom) {
    console.warn(`DOM element with id ${chartId} not found`)
    return
  }

  // 如果已有实例，先销毁
  disposeChart(chartId)
  
  // 创建新实例
  const chartInstance = echarts.init(chartDom)
  chartInstances.value[chartId] = chartInstance
  chartInstance.setOption(options)
}

// 存储每个地图每个等级会出现的宝可梦
const gameMapPokemons = [
  // {
  //   levelPokemons: [], //stage level pokemons
  //   allPokemons: [] //all pokemons
  // }
]
const orginChartShow = ref({})
gameMap.forEach((gitem, gkey) => {
  const curMapSleeps = getUnLockSleeps(
    gitem.id,
    gitem.levelList,
    34
  ).allUnlockSleepsList
  gameMapPokemons.push({
    levelPokemons: [],
    allPokemons: [],
    pokemonsIdToMapLevelIndex: {}
  })
  orginChartShow.value[gitem.id] = false
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
pageData.value.chartShow = {
  ...orginChartShow.value,
  ...pageData.value.chartShow
}
const getTimes = 3500
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
      // isNoMoreData: true,
      actRandomNum: pageData.value.actRandomNum || 0.3,
      noLastPokes: pageData.value.noLastList
    }
  )
}

import i18n from '../i18n'
const { t } = i18n.global
// 0-10w 1000
// 10w-50w 2000
// 50w以上-400w 5000
// 400w-500w 100000
const handleClickGet = mapType => {
  const startTime = new Date().getTime()
  const targetRes = []
  let lastGetList = []
  testData.value = []
  // allMap
  gameMap.forEach((mapItem, mapKey) => {
    if (
      gameMapPokemons[mapKey].allPokemons.includes(+pageData.value.pokemonId)
    ) {
      pageData.value.mapSleepType.forEach(sltItem => {
        console.log('quick start...', mapItem.id, gameMap[mapKey].levelList)
        let k = 0
        const iland = []
        gameMap[mapKey].levelList.forEach((item, mapIndex) => {
          const curAllScore = item.energy
          const allPoint = curAllScore * 100
          // if (curAllScore <= +pageData.value.maxScore) {
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
          // }
        })
        targetRes.push({
          curMap: mapItem.id,
          sleepType: sltItem,
          res: iland
        })
      })
    }
  })
  testData.value = targetRes

  // 使用 nextTick 确保 DOM 更新完成后再初始化图表
  nextTick(() => {
    initChart(targetRes)
  })

  console.log(targetRes, lastGetList)
}

const stXAxis = gameMap[0].levelList.map(
  stageItem => t(`LEVEL_TITLE.${stageItem.nameId}`) + stageItem.nameIndex
)
const initChart = targetRes => {
  const stObject = {
    st1: [],
    st2: [],
    st3: [],
    st999: []
  }
  gameMap.forEach((mapItem, mapKey) => {
    if (
      gameMapPokemons[mapKey].allPokemons.includes(+pageData.value.pokemonId)
    ) {
      const chartMapOptions = {
        title: `${t(`POKEMON_NAME.${pageData.value.pokemonId}`)}-${t(`ILAND.${mapItem.id}`)}`,
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
      const resInMap = targetRes.filter(item => item.curMap === mapItem.id)
      chartMapOptions.legendData = resInMap.map(resInMapItem => {
        const onceData = []
        const onceDataEveryStyles = resInMapItem.res[resInMapItem.res.length - 1].res.find(
          pointSubItem => +pointSubItem.pokeId === +pageData.value.pokemonId
        ).list.map(styleItem=>{
          return {
            sleepName: `${t(`SLEEP_TYPES.${resInMapItem.sleepType}`)}-${SLEEP_STYLE[styleItem.id].star}✩-${t(`SLEEPSTYLE_NAME.${SLEEP_STYLE[styleItem.id].sleepNameId}`)}`,
            styleId: styleItem.id,
            data: new Array(34).fill(0)
          }
        })
        chartMapOptions.xAxis = resInMapItem.res.map((pointItem, pointKey) => {
          const curPokeRes = pointItem.res.find(
            pointSubItem => +pointSubItem.pokeId === +pageData.value.pokemonId
          )
          let num = 0
          if (curPokeRes && curPokeRes.count) {
            num = getDecimalNumber(curPokeRes.count / getTimes, 2)
          }
          onceData.push(num)
        
          if(curPokeRes && curPokeRes.list && curPokeRes.list.length > 0) {
            curPokeRes.list.forEach(styleItem => {
              onceDataEveryStyles.forEach(everyItem => {
                if(everyItem.styleId === styleItem.id && styleItem.count) {
                  everyItem.data[pointKey] = getDecimalNumber(styleItem.count / getTimes, 2)
                }
              })
            })
          }

          return getNum(pointItem.allPoint)
        })
        console.log(onceDataEveryStyles)
        console.log(t(`SLEEP_TYPES.${resInMapItem.sleepType}`), onceData)
        // 按睡眠类型输出图表

        chartMapOptions.series.push({
          name: t(`SLEEP_TYPES.${resInMapItem.sleepType}`),
          type: 'line',
          data: onceData,
          // 添加最高值和平均值标记
          markPoint: {
            data: [
              { 
                type: 'max', 
                name: '最大期望'
              }
            ],
            label: {
              formatter: '{c}',
              position: 'top'
            },
            symbol: 'pin', // 使用图钉形状
            symbolSize: 40
          },
          markLine: {
            data: [{ type: 'average', name: 'Avg' }]
          }
        })
        
        onceDataEveryStyles.forEach(everyItem => {
          chartMapOptions.series.push({
            name: everyItem.sleepName,
            type: 'line',
            data: everyItem.data,
            // 添加最高值和平均值标记
            markPoint: {
              data: [
                { 
                  type: 'max', 
                  name: '最大期望'
                }
              ],
              label: {
                formatter: '{c}',
                position: 'top'
              },
              symbol: 'pin', // 使用图钉形状
              symbolSize: 40
            },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            }
          })
        
        })
        
        stObject[`st${resInMapItem.sleepType}`].push({
          name: t(`ILAND.${mapItem.id}`),
          type: 'line',
          data: onceData,
          // 同样为全局图表添加标记
          markPoint: {
            data: [
              { 
                type: 'max', 
                name: '最大期望'
              }
            ],
            label: {
              formatter: '{c}',
              position: 'top'
            },
            symbol: 'pin', // 使用图钉形状
            symbolSize: 40
          },
          markLine: {
            data: [{ type: 'average', name: 'Avg' }]
          }
        })
        return t(`SLEEP_TYPES.${resInMapItem.sleepType}`)
      })
      console.log(chartMapOptions)
      // 使用新的初始化函数，按地图输出图表
      initOrUpdateChart(`echart_dom_map_${mapItem.id}`, {
        title: {
          text: chartMapOptions.title
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: chartMapOptions.legendData
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
          data: chartMapOptions.xAxis
        },
        yAxis: {
          type: 'value'
        },
        series: chartMapOptions.series
      })
      console.log(stObject)
      for (const stKey in stObject) {
        if (Object.prototype.hasOwnProperty.call(stObject, stKey)) {
          const stObjectItem = stObject[stKey]
          // 使用新的初始化函数
          initOrUpdateChart(`echart_dom_${stKey}`, {
            title: {
              text: t(`SLEEP_TYPES.${stKey.replace('st', '')}`)
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: stObjectItem.map(item => item.name)
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
              data: stXAxis
            },
            yAxis: {
              type: 'value'
            },
            series: stObjectItem
          })
        }
      }

      for (const stKey in stObject) {
        if (Object.prototype.hasOwnProperty.call(stObject, stKey)) {
          const stObjectItem = stObject[stKey]
          const chartSt = echarts.init(
            document.getElementById(`echart_dom_${stKey}`)
          )
          chartSt.setOption({
            title: {
              text: t(`SLEEP_TYPES.${stKey.replace('st', '')}`)
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: stObjectItem.map(item => item.name)
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
              data: stXAxis
            },
            yAxis: {
              type: 'value'
            },
            series: stObjectItem
          })
        }
      }
    }
  })
}

// const handleClickChangeMap = id => {
//   pageData.value.curMap = id
// }

const handleChangeUps = () => {
  console.log(
    pageData.value.upIdsLarge.ids,
    pageData.value.upIdsMid.ids,
    pageData.value.upIdsSmall.ids
  )
}

const initState = () => {
  pageData.value.chartShow = {
    ...orginChartShow.value,
    st1: false,
    st2: false,
    st3: false,
    st999: false
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
  pageData.value.mapSleepType.forEach(mstItem => {
    pageData.value.chartShow[`st${mstItem}`] = true
  })
}
const handleChangeSleepTypes = () => {
  pageData.value.chartShow.st1 = false
  pageData.value.chartShow.st2 = false
  pageData.value.chartShow.st3 = false
  pageData.value.chartShow.st999 = false
  pageData.value.mapSleepType.forEach(mstItem => {
    pageData.value.chartShow[`st${mstItem}`] = true
  })
}
const handleChangePokemon = () => {
  initState()
}
initState()
// 组件卸载时自动清理图表实例
onBeforeUnmount(() => {
  cleanupCharts()
})
</script>

<template>
  <el-form label-width="90px">
    <el-form-item :label="$t('PROP.pokemon')">
      <div style="width: 100%">
        <el-select
          v-model="pageData.pokemonId"
          filterable
          @change="handleChangePokemon()"
        >
          <CptSelectOptions />
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
          @change="handleChangeSleepTypes"
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
      <el-select
        v-model="pageData.noLastList"
        placeholder="不进保底"
        @change="handleChangeUps"
        filterable
        clearable
        multiple
        collapse-tags
        collapse-tags-tooltip
      >
        <CptSelectOptions />
      </el-select>
      <CptAvatar
        :pokeId="pokeId"
        v-for="pokeId in pageData.noLastList"
        v-bind:key="`noLast_${pokeId}`"
      />
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
        <CptSelectOptions />
      </el-select>
      <CptAvatar
        :pokeId="pokeId"
        v-for="pokeId in pageData.upIdsLarge.ids"
        :key="pokeId"
      />
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
        <CptSelectOptions />
      </el-select>
      <CptAvatar
        :pokeId="pokeId"
        v-for="pokeId in pageData.upIdsMid.ids"
        :key="pokeId"
      />
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
        <CptSelectOptions />
      </el-select>
      <CptAvatar
        :pokeId="pokeId"
        v-for="pokeId in pageData.upIdsSmall.ids"
        :key="pokeId"
      />
    </el-form-item>
    <el-form-item>
      <el-button @click="handleClickGet('allMap')">计算结果</el-button>
    </el-form-item>
  </el-form>
  <template v-for="(cItem, cKey) in SLEEP_TYPES" v-bind:key="`${cKey}-echart`">
    <div
      class="chart-item"
      :class="{ hide: !pageData.chartShow[`st${cKey}`] }"
      :id="`echart_dom_st${cKey}`"
      style="height: 450px"
    ></div>
  </template>
  <template v-for="mapItem in gameMap" v-bind:key="`${mapItem.id}-echart`">
    <div
      class="chart-item"
      :class="{ hide: !pageData.chartShow[mapItem.id] }"
      :id="`echart_dom_map_${mapItem.id}`"
      style="height: 450px"
    ></div>
  </template>
  <!-- <template
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
        <CptAvatar
          v-for="hopeItem in tdItem.res"
          v-bind:key="hopeItem.pokeId"
          :pokeId="hopeItem.pokeId"
        >
          <p>{{ getDecimalNumber(hopeItem.count / getTimes, 2) }}</p>
        </CptAvatar>
      </div>
    </div>
  </template> -->
</template>