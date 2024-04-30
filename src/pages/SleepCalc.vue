<script setup>
import { onMounted, computed, ref } from 'vue'
import CptPoke from '../components/CptPoke/ItemIndex.vue'
import CptIv from '../components/CptIv/IvItem.vue'
import CptProcss from '../components/Process/ItemIndex.vue'
import CptSleepStyle from '../components/CptSleepStyle/SleepItem.vue'
import CptGameMap from '../components/GameMap/PlayArea.vue'
import SvgIcon from '../components/SvgIcon/IconItem.vue'

import { gameMap, mapSplitVer } from '../config/game.js'
import { SLEEP_TYPES } from '../config/valKey.js'
import { SLEEP_STYLE } from '../config/sleepStyle.js'
import { pokedex } from '../config/pokedex.js'
import { NAV_SLEEPCALC } from '../config/nav.js'
import {
  getUnLockSleeps,
  getRandomSleepStyle,
  getRandomHope,
  getLevelIndexByEnergy,
  getSPOById,
  checkListInLastGet
} from '../utils/sleep.js'
import {
  toHMInLang,
  getNum,
  getNumberInMap,
  getStageLevelPicId,
  getPercent,
  sortInObjectOptions,
  getDecimalNumber,
  getRandomArr,
  calcPositions
} from '../utils/index.js'
import {
  feedSandslash,
  getRandomIV,
  getRandomPokeSkills
} from '../utils/game.js'

import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const localeLangId = computed(() => {
  return locale.value
})

import i18n from '../i18n'
const { t } = i18n.global

const navData = ref(NAV_SLEEPCALC)
const userData = ref({
  CurEnergy: 0,
  curStageIndex: 0,
  mapMaxScore: 19564316,
  curMap: 0,
  times: 1,
  cutNum: 4,
  curUnLockSleepType: '999',
  curUnlockSleeps: [],
  unLockSleeps: [],
  lockSkillCount: '0',
  isUseTicket: false,
  isActRandom: false,
  isMoreCalcLoading: false,
  mapModel: false,
  shinyUp: false,
  useIncensePokemonId: '',
  onOffBan: true,
  showBan: true,
  banPokes: [37, 38]
})
const userSleep = ref({
  count: 0,
  pokeShinyCount: 0,
  pokeShinyList: [],
  pokeSum: 0,
  showDetailShiny: false,
  isFirst243: true
})
const pageData = ref({
  showMoreMathExp: false
})
const randomSleepStyle = ref({
  resList: [],
  sleepPoint: 100
})
const sleepStyleAny = ref({
  curSPO: 0,
  sleepCatchNum: 3,
  list: new Array(8).fill(''),
  isLastGet: new Array(8).fill(false)
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
    allPokemons: []
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
    }
    if (!gameMapPokemons[gkey].allPokemons.includes(sleepsItem.pokeId)) {
      gameMapPokemons[gkey].allPokemons.push(sleepsItem.pokeId)
    }
  })
})
// console.log(gameMapPokemons)

const setDefaultCutNumber = () => {
  userData.value.cutNum = getNumberInMap(
    getScore(100),
    gameMap[userData.value.curMap].scoreList
  )
}

const setUnlockSleeps = () => {
  const resSleeps = getUnLockSleeps(
    gameMap[userData.value.curMap].levelList,
    userData.value.curStageIndex
  )
  userData.value.curUnlockSleeps = resSleeps.curUnlockSleeps
  userData.value.unLockSleeps = resSleeps.unLockSleeps
}

const resetTool = () => {
  userData.value.CurEnergy =
    gameMap[userData.value.curMap].levelList[
      userData.value.curStageIndex
    ].energy
  setDefaultCutNumber()
  setUnlockSleeps()
}

const handleClickChangeMap = id => {
  userData.value.curMap = id
  userData.value.useIncensePokemonId = ''
  // 8只起步随着切岛记录
  userData.value.mapMaxScore =
    gameMap[userData.value.curMap].scoreList[
      getNumberInMap(getScore(100), gameMap[userData.value.curMap].scoreList) -
        3
    ].startscore
  resetTool()
  setAndGetRandomSleepStyle(
    getScore(randomSleepStyle.value.sleepPoint),
    userData.value.curStageIndex
  )
}
const handleClickChangeStage = stageItem => {
  resetTool()
}

/**
 * 获取带倍数加成后的睡意之力
 * 当前能量*睡眠点数*节日倍数
 */
const getScore = point => {
  return userData.value.CurEnergy * point * userData.value.times
}
const getFirstSleepScore = () => {
  let res =
    gameMap[userData.value.curMap].scoreList[userData.value.cutNum - 3]
      .startscore /
    userData.value.CurEnergy /
    userData.value.times
  // 有小数位就进1
  const max = parseInt(res) + 1
  if (max < 100 && max - res < 1) {
    res++
  }
  return parseInt(res)
}
const firstSleepTime = () => {
  return (getFirstSleepScore() * 8.5) / 100
}

const getTargetStartScore = score => {
  return gameMap[userData.value.curMap].scoreList[
    getNumberInMap(getScore(score), gameMap[userData.value.curMap].scoreList) -
      3
  ].startscore
}

const getSleepCatchNum = point => {
  const sleepPoint = point || 100
  const resNumber = getNumberInMap(
    getScore(sleepPoint),
    gameMap[userData.value.curMap].scoreList
  )
  return resNumber
}

const setNewSleepStyleList = () => {
  sleepStyleAny.value.list.fill('')
  sleepStyleAny.value.sleepCatchNum = getNumberInMap(
    getScore(randomSleepStyle.value.sleepPoint),
    gameMap[userData.value.curMap].scoreList
  )
  sleepStyleAny.value.curSPO = Math.floor(
    getScore(randomSleepStyle.value.sleepPoint) / 38000
  )
}

const getAfterClacSPO = () => {
  let nowSPO = sleepStyleAny.value.curSPO
  sleepStyleAny.value.list.forEach(sleepStyleId => {
    if (sleepStyleId) {
      nowSPO -= getSPOById(sleepStyleId)
    }
  })
  return nowSPO
}

const getNextScoreDiff = () => {
  return (
    parseInt(
      (gameMap[userData.value.curMap].scoreList[getSleepCatchNum() - 2]
        .startscore -
        getScore(100)) /
        100 /
        userData.value.times
    ) + 1
  )
}

// 获取对应树果的宝可梦们
const getBerryPokemon = berryArr => {
  const res = []
  for (const pokeKey in pokedex) {
    if (Object.hasOwnProperty.call(pokedex, pokeKey)) {
      if (berryArr.includes(pokedex[pokeKey].berryType)) {
        res.push({
          id: pokeKey,
          ...pokedex[pokeKey]
        })
      }
    }
  }
  // console.log(res, berryId)
  return sortInObjectOptions(res, ['pokeType'], 'up')
}

// 获取掉的活力
const getLostVigour = mins => {
  // 每10分钟掉1点
  let res = mins / 10
  // 有小数位就进1
  const max = parseInt(res) + 1
  if (max < 100 && max - res < 1) {
    res++
  }
  // console.log(mins / 10, parseInt(res))
  return parseInt(res)
}

const getFilterInTypes = (arr, sleepType) => {
  const curUnLockSleepType = sleepType || userData.value.curUnLockSleepType
  if (arr.length > 0 && +curUnLockSleepType !== 999) {
    return arr.filter(item => item.sleepType === +curUnLockSleepType)
  }
  return arr
}

/* 抽取睡姿 */
const setAndGetRandomSleepStyle = (score, curStageIndex) => {
  let banPokes = []
  if (userData.value.onOffBan) {
    banPokes = userData.value.banPokes
  }
  const res = getRandomSleepStyle(
    gameMap[userData.value.curMap],
    userData.value.curUnLockSleepType,
    score,
    curStageIndex,
    {
      banPokes,
      useIncensePokemonId: userData.value.useIncensePokemonId,
      isUseTicket: userData.value.isUseTicket,
      isActRandom: userData.value.isActRandom,
      extraTextIncense: t('PROP.incense'),
      extraTextTicket: t('PROP.ticket'),
      shinyUp: userData.value.shinyUp
    }
  )
  // 随机个体
  res.forEach((sleepItem, key) => {
    sleepItem.iv = getRandomIV(sleepItem.pokeId, {
      isFirst243: userSleep.value.isFirst243,
      lockSkillCount: userData.value.lockSkillCount
    })
    if (userSleep.value.isFirst243 && sleepItem.pokeId === 243) {
      userSleep.value.isFirst243 = false
    }

    let isCurPokeMapLock = 0
    if (catchPokeState.value.friendshipLevel[sleepItem.pokeId] >= 99) {
      isCurPokeMapLock = 3
    } else if (catchPokeState.value.friendshipLevel[sleepItem.pokeId] >= 39) {
      isCurPokeMapLock = 2
    } else if (catchPokeState.value.friendshipLevel[sleepItem.pokeId] >= 9) {
      isCurPokeMapLock = 1
    }
    if (!catchPokeState.value.friendshipLevel[sleepItem.pokeId]) {
      catchPokeState.value.friendshipLevel[sleepItem.pokeId] = 1
    }
    sleepItem.ivInMap = getRandomIV(sleepItem.pokeId, {
      isFirst243: userSleep.value.isFirst243,
      lockSkillCount: isCurPokeMapLock
    })

    sleepItem.isScaleX = parseInt(Math.floor(Math.random() * 2), 10)
    sleepItem.eatStateType = 3

    // 贪吃判定，闪光必贪吃，露营券必贪吃，其它10%贪吃
    if (sleepItem.isShiny || sleepItem.isUseTicket) {
      sleepItem.eatStateType = 1
    } else {
      const rdmRes = parseInt(Math.floor(Math.random() * 100), 10) <= 10
      if (rdmRes) {
        sleepItem.eatStateType = 1
      }
    }
  })
  calcPositions(res)
  // console.log(res)
  catchPokeState.value.eatTimes = {} //重置吃饱判定
  catchPokeState.value.hasBall = {
    ...catchPokeState.value.hasBall,
    //重置球数量
    1: 5,
    2: 3,
    3: 1
  }
  randomSleepStyle.value.resList = res
}

const getSleepStyle = () => {
  let orgSleepList = [
    ...userData.value.curUnlockSleeps,
    ...userData.value.unLockSleeps
  ]
  if (!userData.value.isActRandom) {
    orgSleepList = getFilterInTypes(
      orgSleepList,
      userData.value.curUnLockSleepType
    )
  }
  orgSleepList = sortInObjectOptions(orgSleepList, ['spo', 'spoid'], 'down')
  return orgSleepList
}

const getTimes = 4000
const hopeList = ref([])
const getRandomHopeCb = res => {
  // setAndGetRandomSleepStyle(
  //   getScore(randomSleepStyle.value.sleepPoint),
  //   userData.value.curStageIndex
  // )
  // console.log(res)
  userData.value.isMoreCalcLoading = false
  hopeList.value = res
}

const handleClickSleepMoreTimes = () => {
  if (!userData.value.isMoreCalcLoading) {
    console.log('start clac more times...')
    userData.value.isMoreCalcLoading = true
    let banPokes = []
    if (userData.value.onOffBan) {
      banPokes = userData.value.banPokes
    }
    getRandomHope(
      gameMap[userData.value.curMap],
      userData.value.curUnLockSleepType,
      getScore(randomSleepStyle.value.sleepPoint),
      userData.value.curStageIndex,
      getTimes,
      {
        banPokes,
        isActRandom: userData.value.isActRandom
      },
      getRandomHopeCb
    )
  }
}

const handleClickTimes = () => {
  setDefaultCutNumber()
}

/* 点击抽取睡姿按钮 */
const handleClickSleepOnce = () => {
  setAndGetRandomSleepStyle(
    getScore(randomSleepStyle.value.sleepPoint),
    userData.value.curStageIndex
  )
  userSleep.value.count++
  if (userSleep.value.count > 49 && userSleep.value.count % 50 === 0) {
    catchPokeState.value.hasBall[4]++
  }
  userSleep.value.pokeSum += randomSleepStyle.value.resList.length
  const shinyList = randomSleepStyle.value.resList.filter(
    item => item.isShiny
  )
  userSleep.value.pokeShinyCount += shinyList.length
  userSleep.value.pokeShinyList = userSleep.value.pokeShinyList.concat([
    ...shinyList
  ])
}

const handleClickShinyDetail = () => {
  userSleep.value.showDetailShiny = !userSleep.value.showDetailShiny
}
const handleClickCatchDetail = () => {
  catchPokeState.value.showDetailCatchList =
    !catchPokeState.value.showDetailCatchList
}
const handleClickShowMoreMathExp = () => {
  pageData.value.showMoreMathExp = !pageData.value.showMoreMathExp
}
const handleClickShinyClear = () => {
  userSleep.value = {
    count: 0,
    pokeShinyCount: 0,
    pokeShinyList: [],
    pokeSum: 0,
    showDetailShiny: false
  }
}

const catchPokeState = ref({
  list: [],
  showDetailCatchList: false,
  eatTimes: {},
  friendship: {},
  friendshipLevel: {},
  useBallId: 1,
  ballEatPoint: {
    1: 1,
    2: 3,
    3: 4,
    4: 999
  },
  hasBall: {
    1: 5,
    2: 3,
    3: 1,
    4: 0
  }
})
const handleClickPokeBll = ballId => {
  if (catchPokeState.value.hasBall[ballId] > 0) {
    catchPokeState.value.useBallId = ballId
  }
}
const handleClickMapPokeItem = (sleepItem, sleepKey) => {
  // console.log(sleepItem, sleepItem.eatStateType)
  // eatStateType:[1,2,3,4] // 1:贪吃 2:友情点MAX 3:平常 4:吃饱了
  if (
    (sleepItem.eatStateType === 1 || sleepItem.eatStateType === 3) &&
    catchPokeState.value.hasBall[catchPokeState.value.useBallId] > 0
  ) {
    catchPokeState.value.hasBall[catchPokeState.value.useBallId]--

    const curId = `${sleepKey}_${sleepItem.pokeId}`
    if (!catchPokeState.value.eatTimes[curId]) {
      catchPokeState.value.eatTimes[curId] = 1
    } else {
      catchPokeState.value.eatTimes[curId]++
    }

    const getFriendShip = feedSandslash(
      sleepItem,
      catchPokeState.value.ballEatPoint[catchPokeState.value.useBallId],
      catchPokeState.value.eatTimes[curId]
    )
    if (catchPokeState.value.friendship[sleepItem.pokeId] === undefined) {
      catchPokeState.value.friendship[sleepItem.pokeId] = 0
    }
    // 友情点数MAX
    if (
      sleepItem.isShiny ||
      catchPokeState.value.friendship[sleepItem.pokeId] + getFriendShip.point >=
        pokedex[sleepItem.pokeId].friendship
    ) {
      catchPokeState.value.friendship[sleepItem.pokeId] =
        pokedex[sleepItem.pokeId].friendship
      randomSleepStyle.value.resList[sleepKey].eatStateType = 2
      catchPokeState.value.list.push({
        pokeId: sleepItem.pokeId,
        isShiny: sleepItem.isShiny,
        ...randomSleepStyle.value.resList[sleepKey].ivInMap
      })
      catchPokeState.value.friendshipLevel[sleepItem.pokeId]++
    } else {
      catchPokeState.value.friendship[sleepItem.pokeId] += getFriendShip.point
    }

    if (
      catchPokeState.value.eatTimes[curId] >= 2 &&
      sleepItem.eatStateType !== 2 &&
      sleepItem.eatStateType !== 4
    ) {
      randomSleepStyle.value.resList[sleepKey].eatStateType =
        getFriendShip.eatStateType
    }

    if (sleepItem.eatStateType === 1) {
      randomSleepStyle.value.resList[sleepKey].eatStateType = 3
    }

    setTimeout(() => {
      if (
        catchPokeState.value.friendship[sleepItem.pokeId] >=
        pokedex[sleepItem.pokeId].friendship
      ) {
        catchPokeState.value.friendship[sleepItem.pokeId] = 0
      }
    }, 200)
    console.log(getFriendShip, catchPokeState.value.list)
  }
}

const handleChangeSleepStyle = () => {
  console.log('change select...')
  // console.log(sleepStyleAny.value.list)
  sleepStyleAny.value.isLastGet = checkListInLastGet(
    gameMap[userData.value.curMap],
    userData.value.curUnLockSleepType,
    userData.value.curStageIndex,
    sleepStyleAny.value.list,
    sleepStyleAny.value.curSPO,
    getAfterClacSPO()
  )
}

const handleBlurEnergy = () => {
  if (userData.value.CurEnergy < 0) {
    userData.value.CurEnergy = 0
    userData.value.curStageIndex = 0
  } else {
    userData.value.curStageIndex = getLevelIndexByEnergy(
      gameMap[userData.value.curMap].levelList,
      userData.value.CurEnergy
    )
  }
  setDefaultCutNumber()
  setUnlockSleeps()
}

// 初始化默认
setDefaultCutNumber()
setUnlockSleeps()

onMounted(() => {
  setAndGetRandomSleepStyle(
    getScore(randomSleepStyle.value.sleepPoint),
    userData.value.curStageIndex
  )
})
// setAndGetRandomSleepStyle(3000000, userData.value.curStageIndex) // debug

// debug
// userData.value.curStageIndex = 29
// userData.value.curMap = 0
// sleepStyleAny.value.list = [
//   '225-id-4',
//   '135-id-2',
//   '454-id-2',
//   '132-id-1',
//   '354-id-1',
//   '180-id-1',
//   '155-id-1',
//   '453-id-1'
// ]
// sleepStyleAny.value.sleepCatchNum = 3073
// sleepStyleAny.value.curSPO = 3073
// sleepStyleAny.value.isLastGet = checkListInLastGet(
//   gameMap[userData.value.curMap],
//   999,
//   userData.value.curStageIndex,
//   sleepStyleAny.value.list,
//   sleepStyleAny.value.curSPO,
//   getAfterClacSPO()
// )
</script>

<template>
  <div class="page-sleepcalc">
    <h2>{{ $t("PAGE_TITLE.sleepcalc") }}</h2>
    <div class="page-inner">
      <el-radio-group
        v-model="navData.navIndex"
        fill="#41ae3c"
        class="first-page-nav"
      >
        <el-radio-button
          :label="cItem.value"
          v-for="cItem in navData.navList"
          v-bind:key="cItem.name"
        >
          {{ $t(`PAGE_SLEEPCALC.${cItem.name}`) }}</el-radio-button
        >
      </el-radio-group>
    </div>
    <!-- <div class="map-pokemons">
      <table>
        <thead>
          <tr>
            <th style="width: 5em"></th>
            <th
              v-for="(gItem, gkey) in gameMapPokemons"
              v-bind:key="`pomap_${gameMap[gkey].id}`"
            >
              {{ $t(`ILAND.${gameMap[gkey].id}`) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <template
            v-for="(ggItem, ggkey) in gameMap[0].levelList"
            v-bind:key="ggItem.id"
          >
            <tr 
                  v-if="ggkey<=23">
              <td>
                <img
                  class="icon"
                  v-lazy="`./img/ui/${getStageLevelPicId(ggItem.name)}.png`"
                />
                {{ $t(`LEVEL_TITLE.${ggItem.nameId}`) }}{{ ggItem.nameIndex }}
              </td>
              <td
                class="map-pokemons__item"
                v-for="(gItem, gkey) in gameMapPokemons"
                v-bind:key="`pomap_${gameMap[gkey].id}`"
              >
                <template
                  v-if="
                    gItem.levelPokemons[ggkey] &&
                    gItem.levelPokemons[ggkey].length > 0
                  "
                >
                  <span
                    class="cpt-avatar"
                    v-for="pokeItem in gItem.levelPokemons[ggkey]"
                    v-bind:key="`map_${stageKey}_${pokeItem}`"
                  >
                    <img
                      class="cpt-avatar__pic"
                      v-lazy="`./img/pokedex/${pokeItem}.png`"
                      :alt="$t(`POKEMON_NAME.${pokeItem}`)"
                    />
                  </span>
                </template>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div> -->
    <el-form label-width="90px">
      <!-- S 当前岛屿 -->
      <el-form-item :label="$t('OPTIONS.formLableCurIland')">
        <ul class="cpt-select-list cpt-select-list--iland">
          <li
            class="cpt-select-list__item"
            v-for="(mapItem, mapIndex) in gameMap"
            v-bind:key="mapItem.id"
            :class="{ cur: userData.curMap === mapIndex }"
            @click="handleClickChangeMap(mapIndex)"
          >
            <div class="cpt-select-list__name">
              {{ $t(`ILAND.${mapItem.id}`)
              }}<span class="cpt-select-list__extra"
                >({{ gameMapPokemons[mapIndex].allPokemons.length }})</span
              >
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
        </ul>
      </el-form-item>
      <!-- E 当前岛屿 -->
      <el-form-item :label="$t('PAGE_SLEEPCALC.formLableLevel')">
        <el-col :span="11">
          <el-select
            v-model="userData.curStageIndex"
            placeholder="请选择卡比兽级别"
            class="m-2"
            @change="handleClickChangeStage()"
          >
            <el-option
              v-for="(stageItem, stageIndex) in gameMap[userData.curMap]
                .levelList"
              :key="stageIndex"
              :label="
                $t(`LEVEL_TITLE.${stageItem.nameId}`) + stageItem.nameIndex
              "
              :value="stageIndex"
            >
              <img
                class="icon"
                v-lazy="`./img/ui/${getStageLevelPicId(stageItem.name)}.png`"
              />
              {{ $t(`LEVEL_TITLE.${stageItem.nameId}`)
              }}{{ stageItem.nameIndex }}
            </el-option>
          </el-select></el-col
        >
        <el-col :span="11">
          <el-input
            type="tel"
            v-model="userData.CurEnergy"
            :placeholder="$t('PLACEHOLDER.energy')"
            clearable
            class="m-2"
            @blur="handleBlurEnergy"
          >
            <template #prefix>
              <img class="icon" v-lazy="`./img/ui/energy.png`" />
            </template> </el-input
        ></el-col>
      </el-form-item>
      <el-form-item :label="$t('PAGE_SLEEPCALC.formLableDays')">
        <el-radio-group v-model="userData.times" @change="handleClickTimes()">
          <el-radio :label="1">{{ $t("OPTIONS.otherDay") }}</el-radio>
          <el-radio :label="1.5">{{ $t("OPTIONS.sleepDay") }}*1.5倍</el-radio>
          <el-radio :label="2">{{ $t("OPTIONS.fullMoon") }}*2倍</el-radio>
          <el-radio :label="2.5"
            >{{ $t("OPTIONS.fullMoon") }}*2.5倍({{
              $t("OPTIONS.Wed")
            }})</el-radio
          >
          <el-radio :label="3"
            >{{ $t("OPTIONS.fullMoon") }}*3倍({{ $t("OPTIONS.Tue") }})</el-radio
          >
          <el-radio :label="4"
            >{{ $t("OPTIONS.fullMoon") }}*4倍({{ $t("OPTIONS.Mon") }})</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <template v-if="+navData.navIndex === 0">
        <template v-if="localeLangId === 'jp'">
          <el-form-item :label="$t('PAGE_SLEEPCALC.formLableNoSplit')">
            <p>
              一回フル睡眠（<span class="sptime">8時間30分</span>）で、<span
                class="mobile-br"
                ><CptProcss score="100" />睡眠スコアGet!、</span
              ><span class="mobile-br"
                ><span class="sptime">{{ getSleepCatchNum() }}匹</span
                >のポケモンが捕獲可能。</span
              ><span class="mobile-br"
                ><span class="spscore">{{ getNum(getScore(100)) }}</span
                >のねむけパワー獲得、</span
              >約<span class="vigour">{{ getLostVigour(8 * 60 + 30) }}</span
              >げんき消費。
            </p>
          </el-form-item>
          <el-form-item v-if="getSleepCatchNum() < 8 && getNextScoreDiff() > 0">
            <p>
              <span class="sptime">{{ getSleepCatchNum() + 1 }}匹</span
              >捕獲まで<span class="sptime"
                ><img class="icon" v-lazy="`./img/ui/energy.png`" />{{
                  getNextScoreDiff()
                }}</span
              >エナジーが必要
            </p>
          </el-form-item>
          <el-form-item v-if="getSleepCatchNum(99) > 3">
            <el-input-number
              v-model="userData.cutNum"
              :min="4"
              :max="getSleepCatchNum(99)"
              :step="1"
            />匹で分割睡眠
          </el-form-item>
          <el-form-item
            label="第1回目寝"
            v-if="
              userData.cutNum > 3 &&
              userData.CurEnergy * 100 * userData.times >
                getTargetStartScore(100)
            "
          >
            <p>
              必須睡眠時間（<span class="sptime">{{
                toHMInLang(firstSleepTime(), "", localeLangId)
              }}</span
              >）で、<span class="mobile-br"
                ><CptProcss
                  :score="getFirstSleepScore()"
                />睡眠スコアGet!、</span
              ><span class="mobile-br"
                ><span class="sptime">{{ userData.cutNum }}匹</span
                >のポケモンが捕獲可能。</span
              ><span class="mobile-br"
                ><span class="spscore"
                  >{{ getNum(getScore(getFirstSleepScore()))
                  }}<span class="spscore__extra"
                    >({{
                      getNum(getTargetStartScore(getFirstSleepScore()))
                    }})</span
                  ></span
                >のねむけパワー獲得、</span
              >
              約<span class="vigour">{{
                getLostVigour(toHMInLang(firstSleepTime(), "mm", localeLangId))
              }}</span
              >げんき消費。
            </p>
          </el-form-item>
          <el-form-item
            label="第2回目寝"
            v-if="
              userData.cutNum > 3 &&
              userData.CurEnergy * 100 * userData.times >
                getTargetStartScore(100)
            "
          >
            <p>
              残り睡眠時間（<span class="sptime">{{
                toHMInLang(8.5 - firstSleepTime(), "", localeLangId)
              }}</span
              >）で、<span class="mobile-br"
                ><CptProcss
                  :score="100 - getFirstSleepScore()"
                />睡眠スコアGet!、</span
              ><span class="mobile-br"
                ><span class="sptime"
                  >{{
                    getNumberInMap(
                      getScore(100 - getFirstSleepScore()),
                      gameMap[userData.curMap].scoreList
                    )
                  }}匹</span
                >のポケモンが捕獲可能。</span
              ><span class="mobile-br"
                ><span class="spscore">{{
                  getNum(getScore(100 - getFirstSleepScore()))
                }}</span
                >のねむけパワー獲得、</span
              >約<span class="vigour">{{
                getLostVigour(toHMInLang(8.5 - firstSleepTime(), "mm"))
              }}</span
              >げんき消費。
            </p>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item :label="$t('PAGE_SLEEPCALC.formLableNoSplit')">
            <p>
              <span class="mobile-br"
                >满睡眠<span class="sptime">8小时30分钟</span>，可捕捉<span
                  class="sptime"
                  >{{ getSleepCatchNum() }}只</span
                >，</span
              ><span class="mobile-br"
                ><CptProcss score="100" />分，可获得至少<span class="spscore">{{
                  getNum(getScore(100))
                }}</span
                >睡意之力，</span
              >预计掉<span class="vigour">{{ getLostVigour(8 * 60 + 30) }}</span
              >点活力
            </p>
          </el-form-item>
          <el-form-item v-if="getSleepCatchNum() < 8 && getNextScoreDiff() > 0">
            <p>
              距离抓<span class="sptime">{{ getSleepCatchNum() + 1 }}只</span
              >还需<span class="sptime"
                ><img class="icon" v-lazy="`./img/ui/energy.png`" />{{
                  getNextScoreDiff()
                }}</span
              >能量
            </p>
          </el-form-item>
          <el-form-item v-if="getSleepCatchNum(99) > 3">
            按<el-input-number
              v-model="userData.cutNum"
              :min="4"
              :max="getSleepCatchNum(99)"
              :step="1"
            />只拆分睡眠
          </el-form-item>
          <el-form-item
            label="第1觉"
            v-if="
              userData.cutNum > 3 &&
              userData.CurEnergy * 100 * userData.times >
                getTargetStartScore(100)
            "
          >
            <p>
              <span class="mobile-br"
                >所需睡眠<span class="sptime">{{
                  toHMInLang(firstSleepTime(), "", localeLangId)
                }}</span
                >，可捕捉<span class="sptime">{{ userData.cutNum }}只</span
                >，</span
              ><span class="mobile-br"
                >约<CptProcss
                  :score="getFirstSleepScore()"
                />分，可获得至少<span class="spscore"
                  >{{ getNum(getScore(getFirstSleepScore()))
                  }}<span class="spscore__extra"
                    >({{
                      getNum(getTargetStartScore(getFirstSleepScore()))
                    }})</span
                  ></span
                >睡意之力，</span
              >预计掉<span class="vigour">{{
                getLostVigour(toHMInLang(firstSleepTime(), "mm", localeLangId))
              }}</span
              >点活力
            </p>
          </el-form-item>
          <el-form-item
            label="第2觉"
            v-if="
              userData.cutNum > 3 &&
              userData.CurEnergy * 100 * userData.times >
                getTargetStartScore(100)
            "
          >
            <p>
              <span class="mobile-br"
                >剩余睡眠<span class="sptime">{{
                  toHMInLang(8.5 - firstSleepTime(), "", localeLangId)
                }}</span
                >，可捕捉<span class="sptime"
                  >{{
                    getNumberInMap(
                      getScore(100 - getFirstSleepScore()),
                      gameMap[userData.curMap].scoreList
                    )
                  }}只</span
                >，</span
              ><span class="mobile-br"
                >约<CptProcss
                  :score="100 - getFirstSleepScore()"
                />分，可获得至少<span class="spscore">{{
                  getNum(getScore(100 - getFirstSleepScore()))
                }}</span
                >睡意之力，</span
              >预计掉<span class="vigour">{{
                getLostVigour(
                  toHMInLang(8.5 - firstSleepTime(), "mm", localeLangId)
                )
              }}</span
              >点活力
            </p>
          </el-form-item>
        </template>
      </template>
    </el-form>
    <div class="page-inner" v-if="+navData.navIndex === 0">
      <div class="mod-tips">
        <p>* {{ $t("PAGE_SLEEPCALC.tipsUseTickets1") }}</p>
        <p>* {{ $t("PAGE_SLEEPCALC.tipsUseTickets2") }}</p>
      </div>
    </div>
    <el-form
      label-width="90px"
      v-if="+navData.navIndex === 2 || +navData.navIndex === 3"
    >
      <el-form-item :label="$t('PAGE_SLEEPCALC.formLableSleepStyle')">
        <el-radio-group v-model="userData.curUnLockSleepType">
          <el-radio
            :label="cKey"
            v-for="(cItem, cKey) in SLEEP_TYPES"
            v-bind:key="cItem"
            ><div class="i i-sleeptype" :class="`i i-sleeptype--${cKey}`">
              {{ $t(`SLEEP_TYPES.${cKey}`) }}
              ({{
                getFilterInTypes(userData.curUnlockSleeps, cKey).length +
                getFilterInTypes(userData.unLockSleeps, cKey).length
              }})
            </div>
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('PAGE_SLEEPCALC.formLableSleepPoint')">
        <div style="width: 300px">
          <el-slider
            v-model="randomSleepStyle.sleepPoint"
            show-input
            :min="1"
            :max="100"
          />
        </div>
      </el-form-item>
      <!-- <el-form-item v-if="getSleepCatchNum(randomSleepStyle.sleepPoint) > 3">
            按<el-input-number
              v-model="userData.cutNum"
              :min="4"
              :max="getSleepCatchNum(randomSleepStyle.sleepPoint)"
              :step="1"
            />只选择分数
          </el-form-item> -->
      <el-form-item :label="$t('PAGE_SLEEPCALC.formLableSleepTime')">
        <span class="sptime">{{
          toHMInLang(
            (randomSleepStyle.sleepPoint / 100) * 8.5,
            "",
            localeLangId
          )
        }}</span>
        <div style="width: 100%">
          <span class="sptime">{{
            getNum(getScore(randomSleepStyle.sleepPoint))
          }}</span
          >分
        </div>
      </el-form-item>
    </el-form>
    <div :class="{ hide: +navData.navIndex !== 2 }">
      <div class="sleeplist" v-if="randomSleepStyle.resList.length > 0">
        <el-form label-width="90px">
          <el-form-item :label="$t('PAGE_SLEEPCALC.formLableRandomOptions')">
            <el-radio-group
              v-model="userData.lockSkillCount"
              size="small"
              fill="#fecc11"
            >
              <el-radio-button
                :label="cKey"
                v-for="(cItem, cKey) in [0, 1, 2, 3]"
                v-bind:key="cItem"
              >
                <template v-if="cItem === 0">{{
                  $t("PAGE_SLEEPCALC.noLock")
                }}</template
                ><template v-else>{{
                  $t("PAGE_SLEEPCALC.lockOptions", [cItem])
                }}</template></el-radio-button
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('PROP.incense')">
            <el-select
              v-model="userData.useIncensePokemonId"
              placeholder="请选择宝可梦熏香"
              filterable
            >
              <el-option :label="$t('OPTIONS.nouse')" value="">
                {{ $t("OPTIONS.nouse") }}
              </el-option>
              <template v-for="pokeItem in pokedex" :key="pokeItem.id">
                <el-option
                  :label="`${$t(`POKEMON_NAME.${pokeItem.id}`)}`"
                  :value="pokeItem.id"
                  :disabled="
                    !gameMapPokemons[userData.curMap].allPokemons.includes(
                      pokeItem.id
                    )
                  "
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
          <el-form-item :label="$t('PROP.ticket')">
            <span
              style="
                display: inline-block;
                vertical-align: middle;
                width: 105px;
              "
            >
              <el-switch
                v-model="userData.isUseTicket"
                inline-prompt
                :active-text="`${$t('OPTIONS.use')}(${$t(
                  'PAGE_SLEEPCALC.moreOne'
                )})`"
                :inactive-text="$t('OPTIONS.nouse')"
                style="--el-switch-on-color: #ffaf00"
              />
            </span>
            <div style="color: var(--el-text-color-regular)">
              {{ $t("PAGE_SLEEPCALC.formLableActRandom") }}
              <span style="display: inline-block; vertical-align: middle">
                <el-switch
                  v-model="userData.isActRandom"
                  inline-prompt
                  :active-text="$t('OPTIONS.yes')"
                  :inactive-text="$t('OPTIONS.no')"
                  style="--el-switch-on-color: #ffaf00"
                />
              </span>
            </div>
          </el-form-item>
          <el-form-item :label="$t('PAGE_SLEEPCALC.formLableMapModel')">
            <span
              style="
                display: inline-block;
                vertical-align: middle;
                width: 105px;
              "
            >
              <el-switch
                v-model="userData.mapModel"
                inline-prompt
                :active-text="$t('OPTIONS.yes')"
                :inactive-text="$t('OPTIONS.no')"
                style="--el-switch-on-color: #ffaf00"
              />
            </span>
            <div style="color: var(--el-text-color-regular)">
              {{ $t("PAGE_SLEEPCALC.formLableShinyUp") }}
              <span style="display: inline-block; vertical-align: middle">
                <el-switch
                  v-model="userData.shinyUp"
                  inline-prompt
                  :active-text="$t('OPTIONS.yes')"
                  :inactive-text="$t('OPTIONS.no')"
                  style="--el-switch-on-color: #ffaf00"
                />
              </span>
            </div>
          </el-form-item>
          <el-form-item
            v-if="
              (userData.curMap === 0 || userData.curMap === 2) &&
              userData.showBan
            "
          >
            <el-checkbox v-model="userData.onOffBan" size="small"
              >{{ $t("OPTIONS.getWithout")
              }}<template
                v-for="chItem in userData.banPokes"
                v-bind:key="`ban${chItem}`"
                ><span class="cpt-avatar">
                  <img
                    class="cpt-avatar__pic"
                    v-lazy="`./img/pokedex/${chItem}.png`"
                    :alt="$t(`POKEMON_NAME.${chItem}`)"
                  /> </span
                >{{ $t(`POKEMON_NAME.${chItem}`) }}</template
              ></el-checkbox
            >
          </el-form-item>
        </el-form>
        <div class="page-inner mb3">
          <p class="mb3">
            <el-alert
              :title="$t('PAGE_SLEEPCALC.tipsTitle')"
              type="warning"
              show-icon
            >
              <div class="mod-tips">
                <p>
                  *
                  {{ $t("PAGE_SLEEPCALC.tipsNoSupportBefore")
                  }}<em>{{ $t("PAGE_SLEEPCALC.tipsNoSupportMid") }}</em
                  >{{ $t("PAGE_SLEEPCALC.tipsNoSupportAfter") }}
                </p>
                <p>* {{ $t("PAGE_SLEEPCALC.tipsNoRes") }}</p>
                <p>* {{ $t("PAGE_SLEEPCALC.tipsShiny") }}</p>
              </div>
            </el-alert>
          </p>
          <el-button
            class="el-button-sp"
            type="success"
            plain
            @click="handleClickSleepOnce()"
            >{{ $t("PAGE_SLEEPCALC.btnSleepOnceBefore")
            }}<span
              ><img
                class="icon"
                v-lazy="
                  `./img/ui/${getStageLevelPicId(
                    gameMap[userData.curMap].levelList[userData.curStageIndex]
                      .name
                  )}.png`
                "
              />{{
                $t(
                  `LEVEL_TITLE.${
                    gameMap[userData.curMap].levelList[userData.curStageIndex]
                      .nameId
                  }`
                )
              }}</span
            >{{
              gameMap[userData.curMap].levelList[userData.curStageIndex]
                .nameIndex
            }}「{{ $t(`SLEEP_TYPES.${userData.curUnLockSleepType}`) }}」({{
              getNumberInMap(
                getScore(randomSleepStyle.sleepPoint),
                gameMap[userData.curMap].scoreList
              ) +
              (userData.useIncensePokemonId ? 1 : 0) +
              (userData.isUseTicket ? 1 : 0)
            }}{{ $t("PAGE_SLEEPCALC.btnSleepOnceAfter") }}</el-button
          >
        </div>
        <div class="page-inner">
          <h3>
            {{ $t("PAGE_SLEEPCALC.titleSleepRes") }}
            <span class="extra"
              >({{
                getNumberInMap(
                  getScore(randomSleepStyle.sleepPoint),
                  gameMap[userData.curMap].scoreList
                ) +
                (userData.useIncensePokemonId ? 1 : 0) +
                (userData.isUseTicket ? 1 : 0)
              }}种)</span
            >
          </h3>
          <div
            class="mod-tips"
            v-if="localeLangId === 'jp' && userSleep.count > 0"
          >
            <span class="sptime">{{ userSleep.count }}</span
            >回寝て、<span class="sptime">{{ userSleep.pokeSum }}</span
            >{{ $t(`OPTIONS.one`) }}のポケモンに遭遇した ({{
              $t("PROP.shiny")
            }}い<span class="sptime">{{ userSleep.pokeShinyCount }}</span
            >{{ $t(`OPTIONS.one`) }})。
            <el-button
              size="small"
              @click="handleClickShinyDetail()"
              v-if="userSleep.pokeShinyCount > 0"
              :class="{ 'btn--show': userSleep.showDetailShiny }"
              >{{ $t("PROP.shiny") }}{{ $t("OPTIONS.detail")
              }}<svgIcon size="small" type="arrowDown"
            /></el-button>
            <el-button
              size="small"
              type="warning"
              plain
              @click="handleClickShinyClear()"
              v-if="userSleep.pokeShinyCount > 0"
              >{{ $t("OPTIONS.restart") }}</el-button
            >
          </div>
          <div class="mod-tips" v-else-if="userSleep.count > 0">
            你睡了<span class="sptime">{{ userSleep.count }}</span
            >次，遇到<span class="sptime">{{ userSleep.pokeSum }}</span
            >{{ $t(`OPTIONS.one`) }}宝可梦，其中遇到<span class="sptime">{{
              userSleep.pokeShinyCount
            }}</span
            >{{ $t(`OPTIONS.one`) }}{{ $t("PROP.shiny") }}。
            <el-button
              size="small"
              @click="handleClickShinyDetail()"
              v-if="userSleep.pokeShinyCount > 0"
              :class="{ 'btn--show': userSleep.showDetailShiny }"
              >{{ $t("PROP.shiny") }}{{ $t("OPTIONS.detail")
              }}<svgIcon size="small" type="arrowDown"
            /></el-button>
            <el-button
              size="small"
              type="warning"
              plain
              @click="handleClickShinyClear()"
              v-if="userSleep.pokeShinyCount > 0"
              >{{ $t("OPTIONS.restart") }}</el-button
            >
          </div>
          <div class="get-shiny" v-if="userSleep.showDetailShiny">
            <div
              class="get-shiny__item"
              v-for="(sleepItem, sleepKey) in userSleep.pokeShinyList"
              v-bind:key="`${sleepItem.id}_${sleepKey}`"
            >
              <p>
                <i class="i i-rank" :class="`i-rank--${sleepKey + 1}`">{{
                  sleepKey + 1
                }}</i>
              </p>
              <CptPoke
                :pokeId="sleepItem.pokeId"
                :showKey="['sleepType']"
                :isShiny="sleepItem.isShiny"
              />
              <CptIv
                :pokeId="sleepItem.pokeId"
                :dataSource="sleepItem.iv"
                :isShiny="sleepItem.isShiny"
                v-if="sleepItem.iv"
              />
            </div>
          </div>
          <div
            class="mod-tips"
            v-if="localeLangId === 'jp' && userData.mapModel"
          >
            ポケモンを<span class="sptime">{{
              catchPokeState.list.length
            }}</span
            >匹入手した（{{ $t("PROP.shiny") }}い<span class="sptime">{{
              catchPokeState.list.filter((cListItem) => cListItem.isShiny)
                .length
            }}</span
            >{{ $t(`OPTIONS.one`) }}）。
            <el-button
              size="small"
              @click="handleClickCatchDetail()"
              type="primary"
              v-if="catchPokeState.list.length > 0"
              :class="{ 'btn--show': catchPokeState.showDetailCatchList }"
              >BOX<svgIcon size="small" type="arrowDown"
            /></el-button>
          </div>
          <div class="mod-tips" v-else-if="userData.mapModel">
            获得<span class="sptime">{{ catchPokeState.list.length }}</span
            >{{ $t(`OPTIONS.one`) }}宝可梦，其中<span class="sptime">{{
              catchPokeState.list.filter((cListItem) => cListItem.isShiny)
                .length
            }}</span
            >{{ $t(`OPTIONS.one`) }}{{ $t("PROP.shiny") }}。
            <el-button
              size="small"
              @click="handleClickCatchDetail()"
              type="primary"
              v-if="catchPokeState.list.length > 0"
              :class="{ 'btn--show': catchPokeState.showDetailCatchList }"
              >BOX<svgIcon size="small" type="arrowDown"
            /></el-button>
          </div>
          <div
            class="catchpoke-list"
            v-if="
              userData.mapModel &&
              catchPokeState.showDetailCatchList &&
              catchPokeState.list.length > 0
            "
          >
            <div
              class="catchpoke-list__item"
              v-for="(sleepItem, sleepKey) in catchPokeState.list"
              v-bind:key="`cathList_${sleepItem.pokeId}_${sleepKey}`"
            >
              <p>
                <i class="i i-rank" :class="`i-rank--${sleepKey + 1}`">{{
                  sleepKey + 1
                }}</i>
              </p>
              <div class="cpt-pokemon">
                <div class="cpt-pokemon__pic">
                  <img
                    v-lazy="
                      `./img/portrait/${sleepItem.isShiny ? 'shiny/' : ''}${
                        sleepItem.pokeId
                      }.png`
                    "
                    :alt="$t(`POKEMON_NAME.${sleepItem.pokeId}`)"
                  />
                </div>
                <div
                  class="cpt-pokemon__name"
                  :class="{ shiny: sleepItem.isShiny }"
                >
                  <span v-if="sleepItem.isShiny" class="sptime">{{
                    $t("PROP.shiny")
                  }}</span>
                  {{ $t(`POKEMON_NAME.${sleepItem.pokeId}`) }}
                </div>
              </div>
              <el-popover
                placement="bottom"
                :title="$t(`POKEMON_NAME.${sleepItem.pokeId}`)"
                trigger="click"
                :width="200"
                :key="`catch_${userData.CurEnergy}_${sleepKey + 1}`"
              >
                <template #reference>
                  <el-button size="small">{{
                    $t("PROP.individual")
                  }}</el-button>
                </template>
                <CptIv
                  :pokeId="sleepItem.pokeId"
                  :dataSource="sleepItem"
                  :isShiny="sleepItem.isShiny"
                />
              </el-popover>
            </div>
          </div>
          <div>
            <CptGameMap
              v-bind:key="`map${userSleep.count}`"
              v-if="userData.mapModel"
              :resList="randomSleepStyle.resList"
              :curMap="userData.curMap"
              :handleClickPokeItem="handleClickMapPokeItem"
              :catchPokeFriendship="catchPokeState.friendship"
              :catchPokeFriendshipLevel="catchPokeState.friendshipLevel"
              :useBallId="catchPokeState.useBallId"
              :hasBall="catchPokeState.hasBall"
              :handleClickPokeBll="handleClickPokeBll"
            />
            <div class="poke-tb poke-tb--lottery mb3">
              <template
                v-for="(sleepItem, sleepKey) in randomSleepStyle.resList"
              >
                <div
                  class="poke-tb__item"
                  v-if="sleepItem.id"
                  v-bind:key="sleepItem.id"
                  :class="{ shiny: sleepItem.isShiny }"
                >
                  <p>
                    <i
                      class="i i-rank"
                      :class="`i-rank--${sleepKey + 1} ${
                        sleepItem.extra ? 'i-rank--ipt' : ''
                      }`"
                      >{{ sleepKey + 1 }}</i
                    >
                  </p>
                  <CptSleepStyle
                    :sleepItem="sleepItem"
                    :showKey="['sleepType']"
                  />
                  <el-popover
                    v-if="sleepItem.iv"
                    placement="bottom"
                    :title="$t(`POKEMON_NAME.${sleepItem.pokeId}`)"
                    trigger="click"
                    :width="200"
                    :key="`${userData.CurEnergy}_${sleepKey + 1}`"
                  >
                    <template #reference>
                      <el-button size="small" v-if="sleepItem.iv"
                        ><img
                          class="icon"
                          v-lazy="`./img/ui/${getStageLevelPicId('普通')}.png`"
                        />{{ $t("PROP.individual") }}</el-button
                      >
                    </template>
                    <CptIv
                      :pokeId="sleepItem.pokeId"
                      :dataSource="sleepItem.iv"
                      :isShiny="sleepItem.isShiny"
                      v-if="sleepItem.iv"
                    />
                  </el-popover>
                </div>
              </template>
            </div>
            <div class="page-inner mb3">
              <el-button
                class="el-button-sp"
                :loading="userData.isMoreCalcLoading"
                type="primary"
                plain
                @click="handleClickSleepMoreTimes()"
                >{{
                  $t("PAGE_SLEEPCALC.btnSleepMoreTime", [getTimes])
                }}</el-button
              >
            </div>
            <div class="has-loading" v-if="hopeList.length > 0">
              <div class="page-inner">
                <h3>
                  <img
                    class="icon"
                    v-lazy="
                      `./img/ui/${getStageLevelPicId(
                        gameMap[userData.curMap].levelList[
                          userData.curStageIndex
                        ].name
                      )}.png`
                    "
                  />{{
                    $t(
                      `LEVEL_TITLE.${
                        gameMap[userData.curMap].levelList[
                          userData.curStageIndex
                        ].nameId
                      }`
                    )
                  }}{{
                    gameMap[userData.curMap].levelList[userData.curStageIndex]
                      .nameIndex
                  }}-{{ $t("PAGE_SLEEPCALC.titleMathExp") }}
                  <span class="extra"
                    >({{ hopeList.length }}{{ $t(`OPTIONS.one`) }})</span
                  >
                </h3>
                <div style="font-size: 12px">
                  「{{ $t(`SLEEP_TYPES.${userData.curUnLockSleepType}`) }}」
                  <template v-if="userData.isActRandom">{{
                    $t("PAGE_SLEEPCALC.formLableActRandom")
                  }}</template>
                  (<span class="sptime">{{
                    getNum(getScore(randomSleepStyle.sleepPoint))
                  }}</span
                  >分)
                </div>
              </div>
              <div class="poke-tb poke-tb--4000 poke-tb--xscorll">
                <div class="page-inner">
                  <div
                    class="cpt-avatar"
                    v-for="hopeItem in hopeList"
                    v-bind:key="hopeItem.pokeId"
                  >
                    <img
                      class="cpt-avatar__pic"
                      v-lazy="`./img/pokedex/${hopeItem.pokeId}.png`"
                      :alt="$t(`POKEMON_NAME.${hopeItem.pokeId}`)"
                    />
                    <p>{{ getDecimalNumber(hopeItem.count / getTimes, 2) }}</p>
                    <p v-if="pageData.showMoreMathExp">
                      <img class="icon" v-lazy="`./img/ui/exp.png`" />{{
                        getDecimalNumber(hopeItem.expSum / getTimes, 2)
                      }}
                    </p>
                    <p v-if="pageData.showMoreMathExp">
                      <img class="icon" v-lazy="`./img/ui/shards.png`" />{{
                        getDecimalNumber(hopeItem.shardsSum / getTimes, 2)
                      }}
                    </p>
                    <p v-if="pageData.showMoreMathExp">
                      <img class="icon" v-lazy="`./img/ui/candy.png`" />{{
                        getDecimalNumber(hopeItem.candysSum / getTimes, 2)
                      }}
                    </p>
                  </div>
                  <div>
                    <el-button
                      size="small"
                      @click="handleClickShowMoreMathExp()"
                      :class="{ 'btn--show': pageData.showMoreMathExp }"
                      >{{ $t("PAGE_SLEEPCALC.sleepMathExp")
                      }}{{ $t("OPTIONS.detail")
                      }}<svgIcon size="small" type="arrowDown"
                    /></el-button>
                  </div>
                </div>
                <template v-for="(hopeItem, hopeKey) in hopeList">
                  <div
                    class="poke-tb__item"
                    v-if="hopeItem.pokeId"
                    v-bind:key="hopeItem.pokeId"
                  >
                    <p>
                      <i class="i i-rank" :class="`i-rank--${hopeKey + 1}`">{{
                        hopeKey + 1
                      }}</i>
                    </p>
                    <div v-if="localeLangId === 'jp'">
                      <span class="sptime">{{ hopeItem.count }}</span
                      >回獲得
                    </div>
                    <div v-else>
                      获得<span class="sptime">{{ hopeItem.count }}</span
                      >次
                    </div>
                    <CptPoke
                      :pokeId="hopeItem.pokeId"
                      :showKey="['sleepType']"
                    />
                    <CptSleepStyle
                      class="sleeplist__sub-item"
                      v-for="sleepItem in hopeItem.list"
                      v-bind:key="sleepItem.id"
                      :sleepItem="sleepItem"
                      :showCptPoke="false"
                    />
                  </div>
                </template>
              </div>
              <div
                class="cpt-loading"
                :class="{ hide: !userData.isMoreCalcLoading }"
              >
                <i class="i i-loading"></i>LOADING...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="+navData.navIndex === 3">
      <el-form label-width="90px">
        <el-form-item>
          <div style="color: var(--el-text-color-regular)">
            {{ $t("PAGE_SLEEPCALC.formLableActRandom") }}
            <span style="display: inline-block; vertical-align: middle">
              <el-switch
                v-model="userData.isActRandom"
                inline-prompt
                :active-text="$t('OPTIONS.yes')"
                :inactive-text="$t('OPTIONS.no')"
                style="--el-switch-on-color: #ffaf00"
              />
            </span>
          </div>
        </el-form-item>
      </el-form>
      <div class="page-inner mb3">
        <p class="mb3">
          <el-alert
            :title="$t('PAGE_SLEEPCALC.tipsTitle')"
            type="warning"
            show-icon
          >
          </el-alert>
        </p>
        <el-button
          class="mb3"
          type="success"
          plain
          @click="setNewSleepStyleList()"
          >点击获取用来研究「<img
            class="icon"
            v-lazy="
              `./img/ui/${getStageLevelPicId(
                gameMap[userData.curMap].levelList[userData.curStageIndex].name
              )}.png`
            "
          />{{
            $t(
              `LEVEL_TITLE.${
                gameMap[userData.curMap].levelList[userData.curStageIndex]
                  .nameId
              }`
            )
          }}{{
            gameMap[userData.curMap].levelList[userData.curStageIndex]
              .nameIndex
          }}」({{
            getNumberInMap(
              getScore(randomSleepStyle.sleepPoint),
              gameMap[userData.curMap].scoreList
            )
          }}种)总SPO</el-button
        >
        <ul class="spo-calc-list">
          <template
            v-for="(sleepStyleId, key) in sleepStyleAny.list"
            v-bind:key="`selectCatch${key}`"
          >
            <li v-if="key < sleepStyleAny.sleepCatchNum">
              <i class="i i-rank mr3" :class="`i-rank--${key + 1}`">{{
                key + 1
              }}</i>
              <el-select
                placeholder="请选择宝可梦睡姿"
                filterable
                v-model="sleepStyleAny.list[key]"
                class="el-select-sleepstyle mr3"
                @change="handleChangeSleepStyle()"
              >
                <template v-for="sItem in getSleepStyle()" :key="sItem.id">
                  <el-option
                    :label="`${$t(`POKEMON_NAME.${sItem.pokeId}`)}-${
                      sItem.star
                    }✩`"
                    :value="sItem.id"
                  >
                    <img
                      class="icon"
                      v-lazy="`./img/pokedex/${sItem.pokeId}.png`"
                      :alt="$t(`POKEMON_NAME.${sItem.pokeId}`)"
                      v-bind:key="sItem.pokeId"
                    />
                    {{ $t(`POKEMON_NAME.${sItem.pokeId}`) }}-<span
                      class="i i-sleeptype"
                      :class="`i i-sleeptype--${sItem.sleepType}`"
                    >
                      {{ $t(`SLEEP_TYPES.${sItem.sleepType}`) }}</span
                    >-{{ sItem.star }}✩-{{
                      $t(`SLEEPSTYLE_NAME.${sItem.sleepNameId}`)
                    }}-SPO:{{ sItem.spo }}
                  </el-option>
                </template>
              </el-select>
              <template v-if="sleepStyleId">
                <span class="cpt-avatar">
                  <img
                    class="cpt-avatar__pic"
                    v-lazy="
                      `./img/pokedex/${SLEEP_STYLE[sleepStyleId].pokeId}.png`
                    "
                    :alt="
                      $t(`POKEMON_NAME.${SLEEP_STYLE[sleepStyleId].pokeId}`)
                    "
                  />
                </span>
                <span
                  class="i i-sleeptype"
                  :class="`i i-sleeptype--${
                    pokedex[SLEEP_STYLE[sleepStyleId].pokeId].sleepType
                  }`"
                >
                  {{
                    $t(
                      `SLEEP_TYPES.${
                        pokedex[SLEEP_STYLE[sleepStyleId].pokeId].sleepType
                      }`
                    )
                  }}</span
                >
              </template>
              <span class="mr3" v-if="sleepStyleId">
                <span
                  class="sptime"
                  v-if="sleepStyleId && getSPOById(sleepStyleId)"
                  >{{ getSPOById(sleepStyleId) }}</span
                >
                <span class="sptime" v-else>{{
                  SPO_DATA[sleepStyleId].spo
                }}</span>
                SPO</span
              >
              <span
                class="cpt-tag cpt-tag-important"
                v-if="sleepStyleId && sleepStyleAny.isLastGet[key]"
                >{{ $t("OPTIONS.lastGet") }}?</span
              >
            </li>
          </template>
        </ul>
        <p>
          当前睡眠总SPO:<span class="sptime">{{ sleepStyleAny.curSPO }}</span>
        </p>
        <p>
          剩余SPO:<span class="sptime" v-if="sleepStyleAny.curSPO > 0">{{
            getAfterClacSPO()
          }}</span
          ><span class="sptime" v-else>0</span>
        </p>
        <p v-if="getAfterClacSPO() >= 0 && sleepStyleAny.curSPO > 0">
          有效分数:<span class="sptime">{{
            getPercent(
              sleepStyleAny.curSPO - getAfterClacSPO(),
              sleepStyleAny.curSPO,
              2
            )
          }}</span
          >%
        </p>
      </div>
    </div>
    <div class="sleeplist sleeplist-unlock">
      <div class="page-inner">
        <h3>
          {{ $t("PAGE_SLEEPCALC.sleepStyle") }}
          <span class="extra"
            >(<template
              v-if="getFilterInTypes(userData.unLockSleeps).length > 0"
              >{{ getFilterInTypes(userData.unLockSleeps).length }}种</template
            ><template
              v-if="getFilterInTypes(userData.curUnlockSleeps).length > 0"
              >+{{
                getFilterInTypes(userData.curUnlockSleeps).length
              }}种</template
            >)</span
          >
        </h3>
        <el-radio-group v-model="userData.curUnLockSleepType" size="small">
          <el-radio-button
            :label="cKey"
            v-for="(cItem, cKey) in SLEEP_TYPES"
            v-bind:key="cItem"
            >{{ $t(`SLEEP_TYPES.${cKey}`)
            }}<span class="extra"
              >({{
                getFilterInTypes(userData.curUnlockSleeps, cKey).length +
                getFilterInTypes(userData.unLockSleeps, cKey).length
              }})</span
            ></el-radio-button
          >
        </el-radio-group>
      </div>
      <div
        class="poke-tb poke-tb--xscorll"
        v-bind:key="`ss_${gameMap[userData.curMap].id}`"
      >
        <template v-if="getFilterInTypes(userData.curUnlockSleeps).length > 0">
          <template
            v-for="sleepItem in getFilterInTypes(userData.curUnlockSleeps)"
          >
            <div
              class="poke-tb__item"
              :class="{ cur: userData.curStageIndex > 0 }"
              v-if="sleepItem.id"
              v-bind:key="sleepItem.id"
            >
              <CptSleepStyle
                :showMapLevel="true"
                :sleepItem="sleepItem"
                :showKey="['sleepType']"
                :curMap="userData.curMap"
                :mapLevel="userData.curStageIndex"
              />
            </div>
          </template>
        </template>
        <template v-for="sleepItem in getFilterInTypes(userData.unLockSleeps)">
          <div
            class="poke-tb__item"
            v-if="sleepItem.id"
            v-bind:key="sleepItem.id"
          >
            <CptSleepStyle
              :showMapLevel="true"
              :sleepItem="sleepItem"
              :showKey="['sleepType']"
              :curMap="userData.curMap"
            />
          </div>
        </template>
      </div>
    </div>
    <h2>
      {{ $t(`ILAND.${gameMap[userData.curMap].id}`) }}-{{
        $t(`PAGE_SLEEPCALC.titleCutNum`)
      }}<span class="mod-tips extra">(v{{ mapSplitVer }})</span>
    </h2>
    <ul class="cpt-list">
      <li
        v-for="(catchItem, catchKey) in gameMap[userData.curMap].scoreList"
        v-bind:key="catchItem.catchNum"
      >
        <span class="sptime"
          >{{ catchItem.catchNum }}{{ $t(`OPTIONS.one`) }}</span
        >：{{ getNum(catchItem.startscore) }}
        <template
          v-if="catchKey !== gameMap[userData.curMap].scoreList.length - 1"
          >- {{ getNum(catchItem.endscore) }}</template
        >
        <template v-else>以上</template>
      </li>
    </ul>
    <template
      v-if="
        +navData.navIndex === 0 && gameMap[userData.curMap].berry[0] !== '?'
      "
    >
      <h2>{{ $t("PAGE_TITLE.berrypokeinmap") }}</h2>
      <div class="poke-tb poke-tb--curmapberry">
        <div
          class="poke-tb__item"
          v-for="pokemonsItem in getBerryPokemon(
            gameMap[userData.curMap].berry
          )"
          v-bind:key="pokemonsItem.id"
        >
          <CptPoke
            :pokeId="pokemonsItem.id"
            :showKey="['helpSpeed', 'berry', 'pokeType']"
          />
        </div>
      </div>
    </template>
  </div>
</template>