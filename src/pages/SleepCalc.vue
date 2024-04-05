<script setup>
import { ref } from 'vue'
import CptPoke from '../components/CptPoke/ItemIndex.vue'
import CptIv from '../components/CptIv/IvItem.vue'
import CptProcss from '../components/Process/ItemIndex.vue'
import CptSleepStyle from '../components/CptSleepStyle/SleepItem.vue'
import { gameMap, mapSplitVer } from '../config/game.js'
import { SLEEP_TYPES } from '../config/valKey.js'
import { SUB_SKILLS } from '../config/pokeSkill.js'
import { pokedex } from '../config/pokedex.js'
import { POKE_243_IV } from '../config/lockIV.js'
import { NAV_SLEEPCALC } from '../config/nav.js'
import {
  getUnLockSleeps,
  getRandomSleepStyle,
  getRandomHope,
  getLevelIndexByEnergy
} from '../utils/sleep.js'
import {
  toHM,
  getNum,
  getNumberInMap,
  getStageLevelPicId,
  sortInObjectOptions,
  getDecimalNumber,
  getRandomArr
} from '../utils/index.js'

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
  onOffBan: false,
  isUseTicket: false,
  isActRandom: false,
  isMoreCalcLoading: false,
  useIncensePokemonId: '',
  banPokes: []
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
  return getNumberInMap(
    getScore(sleepPoint),
    gameMap[userData.value.curMap].scoreList
  )
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

const getSkillRare = arrProbability => {
  arrProbability = arrProbability || [15, 50]
  // 金技能出现几率 15%，蓝技能出现几率 35%，白技能出现几率 50%
  const arr = getRandomArr([...Array(100).keys()], 200)
  // 随机0-99
  const res = arr[parseInt(Math.floor(Math.random() * 100), 10)]
  let level = 1
  if (res < arrProbability[0]) {
    level = 3
  } else if (res < arrProbability[1]) {
    level = 2
  }
  return level
}
const getRandomPokeSkills = () => {
  const subSkills = []
  const unlockLevel = [10, 25, 50, 75, 100]
  const allSkillsByRare = {
    1: getRandomArr([...SUB_SKILLS.filter(item => item.rare === 1)], 200),
    2: getRandomArr([...SUB_SKILLS.filter(item => item.rare === 2)], 200),
    3: getRandomArr([...SUB_SKILLS.filter(item => item.rare === 3)], 200)
  }
  for (let i = 0; i < 5; i++) {
    let skillRare = 1
    let isLockRare = false
    if (
      +userData.value.lockSkillCount > 0 &&
      i < +userData.value.lockSkillCount
    ) {
      skillRare = 3
      isLockRare = true
    } else if (allSkillsByRare[1].length === 0) {
      skillRare = getSkillRare([30, 100])
    } else {
      skillRare = getSkillRare()
    }
    const rdmSkillRareIndex = parseInt(
      Math.floor(Math.random() * allSkillsByRare[skillRare].length),
      10
    )
    subSkills.push({
      nameId: allSkillsByRare[skillRare][rdmSkillRareIndex].nameId,
      skillRare,
      isLockRare,
      unlockLevel: unlockLevel[i]
    })
    allSkillsByRare[skillRare].splice(rdmSkillRareIndex, 1)
  }
  return subSkills
}

const setAndGetRandomSleepStyle = (score, curStageIndex) => {
  const res = getRandomSleepStyle(
    gameMap[userData.value.curMap],
    userData.value.curUnLockSleepType,
    score,
    curStageIndex,
    {
      banPokes: userData.value.banPokes,
      useIncensePokemonId: userData.value.useIncensePokemonId,
      isUseTicket: userData.value.isUseTicket,
      isActRandom: userData.value.isActRandom
    }
  )
  // 随机个体
  res.forEach((sleepItem, key) => {
    if (pokedex[sleepItem.pokeId].food) {
      const useFoods = [pokedex[sleepItem.pokeId].food.type[0]]
      for (let i = 1; i < 3; i++) {
        const rdm = parseInt(Math.floor(Math.random() * 3), 10)
        // 1/3概率a食材
        if (rdm === 2) {
          useFoods.push(pokedex[sleepItem.pokeId].food.type[0])
        } else if (i === 1) {
          useFoods.push(pokedex[sleepItem.pokeId].food.type[i])
        } else {
          let lastFoods = [...pokedex[sleepItem.pokeId].food.type]
          lastFoods = lastFoods.slice(1, lastFoods.length)
          if (lastFoods.length === 1) {
            useFoods.push(lastFoods[0])
          } else {
            useFoods.push(
              lastFoods[parseInt(Math.floor(Math.random() * 2), 10)]
            )
          }
        }
      }
      let ivRes = {
        useFoods,
        natureId: parseInt(Math.floor(Math.random() * 25), 10) + 1
      }
      if (userSleep.value.isFirst243 && sleepItem.pokeId === 243) {
        userSleep.value.isFirst243 = false
        ivRes = {
          ...ivRes,
          ...POKE_243_IV
        }
      } else {
        ivRes.skills = getRandomPokeSkills()
      }
      sleepItem.iv = ivRes
    }
  })
  // console.log(res)
  randomSleepStyle.value.resList = res
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

    getRandomHope(
      gameMap[userData.value.curMap],
      userData.value.curUnLockSleepType,
      getScore(randomSleepStyle.value.sleepPoint),
      userData.value.curStageIndex,
      getTimes,
      {
        banPokes: userData.value.banPokes,
        isActRandom: userData.value.isActRandom
      },
      getRandomHopeCb
    )
  }
}

const handleClickTimes = () => {
  setDefaultCutNumber()
}

const handleClickSleepOnce = () => {
  setAndGetRandomSleepStyle(
    getScore(randomSleepStyle.value.sleepPoint),
    userData.value.curStageIndex
  )
  userSleep.value.count++
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
setAndGetRandomSleepStyle(
  getScore(randomSleepStyle.value.sleepPoint),
  userData.value.curStageIndex
)
// setAndGetRandomSleepStyle(3000000, userData.value.curStageIndex) // debug
</script>

<template>
  <div class="page-sleepcalc">
    <h2>拆分睡眠计算</h2>
    <el-form label-width="90px">
      <el-form-item>
        <el-radio-group v-model="navData.navIndex" fill="#41ae3c">
          <el-radio-button
            :label="cItem.value"
            v-for="cItem in navData.navList"
            v-bind:key="cItem.name"
            >{{ cItem.name }}</el-radio-button
          >
        </el-radio-group>
      </el-form-item>
      <!-- S 当前岛屿 -->
      <el-form-item label="当前岛屿">
        <ul class="cpt-select-list">
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
      <el-form-item label="级别/能量">
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
              :label="stageItem.name"
              :value="stageIndex"
            >
              <img
                class="icon"
                v-lazy="`./img/ui/${getStageLevelPicId(stageItem.name)}.png`"
              />
              {{ stageItem.name }}
            </el-option>
          </el-select></el-col
        >
        <el-col :span="11">
          <el-input
            type="tel"
            v-model="userData.CurEnergy"
            placeholder="请输入当前能量"
            clearable
            class="m-2"
            @blur="handleBlurEnergy"
          >
            <template #prefix>
              <img class="icon" v-lazy="`./img/ui/energy.png`" />
            </template> </el-input
        ></el-col>
      </el-form-item>
      <el-form-item label="特殊加成">
        <el-radio-group v-model="userData.times" @change="handleClickTimes()">
          <el-radio :label="1">平时</el-radio>
          <el-radio :label="1.5">好眠日1.5倍</el-radio>
          <el-radio :label="2">满月日2倍</el-radio>
          <el-radio :label="2.5">满月日2.5倍(周三)</el-radio>
          <el-radio :label="3">满月日3倍(周二)</el-radio>
          <el-radio :label="4">满月日4倍(周一)</el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="+navData.navIndex === 0">
        <el-form-item label="不拆分">
          满睡眠<span class="sptime">8小时30分钟</span>，可捕捉<span
            class="sptime"
            >{{ getSleepCatchNum() }}只</span
          >，<CptProcss score="100" />分，可获得至少<span class="spscore">{{
            getNum(getScore(100))
          }}</span
          >睡意之力，预计掉<span class="vigour">{{
            getLostVigour(8 * 60 + 30)
          }}</span
          >点活力
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
        <el-form-item v-if="getSleepCatchNum() > 3">
          按<el-input-number
            v-model="userData.cutNum"
            :min="4"
            :max="getSleepCatchNum()"
            :step="1"
          />只拆分睡眠
        </el-form-item>
        <el-form-item
          label="第1觉"
          v-if="
            userData.cutNum > 3 &&
            userData.CurEnergy * 100 * userData.times > getTargetStartScore(100)
          "
        >
          所需睡眠<span class="sptime">{{ toHM(firstSleepTime()) }}</span
          >，可捕捉<span class="sptime">{{ userData.cutNum }}只</span
          >，约<CptProcss :score="getFirstSleepScore()" />分，可获得至少<span
            class="spscore"
            >{{ getNum(getScore(getFirstSleepScore()))
            }}<span class="spscore__extra"
              >({{ getNum(getTargetStartScore(getFirstSleepScore())) }})</span
            ></span
          >睡意之力，预计掉<span class="vigour">{{
            getLostVigour(toHM(firstSleepTime(), "mm"))
          }}</span
          >点活力
        </el-form-item>
        <el-form-item
          label="第2觉"
          v-if="
            userData.cutNum > 3 &&
            userData.CurEnergy * 100 * userData.times > getTargetStartScore(100)
          "
        >
          <p>
            剩余睡眠<span class="sptime">{{
              toHM(8.5 - firstSleepTime())
            }}</span
            >，可捕捉<span class="sptime"
              >{{
                getNumberInMap(
                  getScore(100 - getFirstSleepScore()),
                  gameMap[userData.curMap].scoreList
                )
              }}只</span
            >，约<CptProcss
              :score="100 - getFirstSleepScore()"
            />分，可获得至少<span class="spscore">{{
              getNum(getScore(100 - getFirstSleepScore()))
            }}</span
            >睡意之力，预计掉<span class="vigour">{{
              getLostVigour(toHM(8.5 - firstSleepTime(), "mm"))
            }}</span
            >点活力
          </p>
        </el-form-item>
      </template>
    </el-form>
    <div class="page-inner" v-if="+navData.navIndex === 0">
      <div class="mod-tips">
        <p>* 开帐篷（每天第一觉）可额外加1只，熏香可额外加1只。</p>
        <p>* 开帐篷&熏香不在计算范围内。</p>
      </div>
    </div>
    <template v-if="+navData.navIndex === 2">
      <div class="sleeplist" v-if="randomSleepStyle.resList.length > 0">
        <el-form label-width="90px">
          <el-form-item label="睡眠类型">
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
          <el-form-item label="需睡眠分数">
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
          <el-form-item label="需睡眠时长">
            <span class="sptime">{{
              toHM((randomSleepStyle.sleepPoint / 100) * 8.5)
            }}</span>
            <div style="width: 100%">
              <span class="sptime">{{
                getNum(getScore(randomSleepStyle.sleepPoint))
              }}</span
              >分
            </div>
          </el-form-item>
          <el-form-item label="抽取选项">
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
                <template v-if="cItem === 0">不锁</template
                ><template v-else>锁{{ cItem }}金</template></el-radio-button
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="熏香">
            <el-select
              v-model="userData.useIncensePokemonId"
              placeholder="请选择宝可梦熏香"
              filterable
            >
              <el-option label="不使用" value=""> 不使用熏香 </el-option>
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
          <el-form-item>
            <div
              style="
                margin-left: -53px;
                margin-right: 10px;
                color: var(--el-text-color-regular);
              "
            >
              露营券
              <span
                style="
                  display: inline-block;
                  vertical-align: middle;
                  width: 85px;
                  margin-left: 6px;
                "
              >
                <el-switch
                  v-model="userData.isUseTicket"
                  inline-prompt
                  active-text="使用(多1只)"
                  inactive-text="不使用"
                  style="--el-switch-on-color: #ffaf00"
                />
              </span>
            </div>
            <div style="color: var(--el-text-color-regular)">
              活动无特征
              <span style="display: inline-block; vertical-align: middle">
                <el-switch
                  v-model="userData.isActRandom"
                  inline-prompt
                  active-text="是"
                  inactive-text="否"
                  style="--el-switch-on-color: #ffaf00"
                />
              </span>
            </div>
          </el-form-item>
          <el-form-item v-if="userData.curMap === 0 && userData.onOffBan">
            <el-checkbox-group v-model="userData.banPokes" size="small">
              <el-checkbox :label="243"
                >抽取去除<span class="cpt-avatar">
                  <img
                    v-lazy="`./img/pokedex/${243}.png`"
                    :alt="$t(`POKEMON_NAME.${243}`)"
                  /> </span
                >{{ $t(`POKEMON_NAME.${243}`) }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div class="page-inner mb3">
          <p class="mb3">
            <el-alert
              title="游戏v1.4.0更新了大量对睡姿相关内容，请注意抽取睡姿该功能可能不符合期望结果。"
              type="warning"
              show-icon
            >
              <div class="mod-tips">
                <p>
                  *
                  抽取睡姿不支持<em>睡眠日up、活动up以及雷公等特殊宝可梦自带的极低概率</em>等特殊情况。
                </p>
                <p>* 抽取结果不代表游戏内结果，仅作为参考。</p>
                <p>* 抽取结果的闪率并不是游戏内的闪率。</p>
              </div>
            </el-alert>
          </p>
          <el-button type="success" plain @click="handleClickSleepOnce()"
            >点击抽取<img
              class="icon"
              v-lazy="
                `./img/ui/${getStageLevelPicId(
                  gameMap[userData.curMap].levelList[userData.curStageIndex]
                    .name
                )}.png`
              "
            />{{
              gameMap[userData.curMap].levelList[userData.curStageIndex].name
            }}「{{ $t(`SLEEP_TYPES.${userData.curUnLockSleepType}`) }}」({{
              getNumberInMap(
                getScore(randomSleepStyle.sleepPoint),
                gameMap[userData.curMap].scoreList
              )
            }}种)睡姿</el-button
          >
        </div>
        <div class="page-inner">
          <h3>
            抽取睡姿结果
            <span class="extra">({{ randomSleepStyle.resList.length }}种)</span>
          </h3>
          <div class="mod-tips" v-if="userSleep.count > 0">
            你睡了<span class="sptime">{{ userSleep.count }}</span
            >次，遇到<span class="sptime">{{ userSleep.pokeSum }}</span
            >只宝可梦，其中<span class="sptime">{{
              userSleep.pokeShinyCount
            }}</span
            >只闪光。
            <el-button
              size="small"
              @click="handleClickShinyDetail()"
              v-if="userSleep.pokeShinyCount > 0"
              >闪光详情(<template v-if="userSleep.showDetailShiny"
                >收起</template
              ><template v-else>展开</template>)</el-button
            >
            <el-button
              size="small"
              type="warning"
              plain
              @click="handleClickShinyClear()"
              v-if="userSleep.pokeShinyCount > 0"
              >从头再来</el-button
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
              <CptPoke :pokeId="sleepItem.pokeId" :showKey="['sleepType']" />
              <CptIv :sleepItem="sleepItem" v-if="sleepItem.iv" />
            </div>
          </div>
          <div>
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
                    <i class="i i-rank" :class="`i-rank--${sleepKey + 1}`">{{
                      sleepKey + 1
                    }}</i>
                  </p>
                  <CptSleepStyle
                    :sleepItem="sleepItem"
                    :showKey="['sleepType']"
                    :userData="userData"
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
                        />个体</el-button
                      >
                    </template>
                    <CptIv :sleepItem="sleepItem" v-if="sleepItem.iv" />
                  </el-popover>
                </div>
              </template>
            </div>
            <div class="page-inner mb3">
              <el-button
                :loading="userData.isMoreCalcLoading"
                type="primary"
                plain
                @click="handleClickSleepMoreTimes()"
                >点击计算期望(睡{{ getTimes }}次，不含熏香和露营券)</el-button
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
                    gameMap[userData.curMap].levelList[userData.curStageIndex]
                      .name
                  }}-期望宝可梦睡姿列表
                  <span class="extra">({{ hopeList.length }}只)</span>
                </h3>
                <div style="font-size: 12px">
                  「{{ $t(`SLEEP_TYPES.${userData.curUnLockSleepType}`) }}」
                  <template v-if="userData.isActRandom">活动无特征</template>
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
                      >期望详情(<template v-if="pageData.showMoreMathExp"
                        >收起</template
                      ><template v-else>展开</template>)</el-button
                    >
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
                    <div>
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
                      :userData="userData"
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
    </template>
    <div class="sleeplist">
      <div class="page-inner">
        <h3>
          {{$t('PAGE_SLEEPCALC.sleepStyle')}}
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
        v-bind:key="gameMap[userData.curMap]"
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
        <span class="sptime">{{ catchItem.catchNum }}只</span>：{{
          getNum(catchItem.startscore)
        }}
        <template
          v-if="catchKey !== gameMap[userData.curMap].scoreList.length - 1"
          >- {{ getNum(catchItem.endscore) }}</template
        >
        <template v-else>以上</template>
      </li>
    </ul>
    <template
      v-if="
        +navData.navIndex !== 2 && gameMap[userData.curMap].berry[0] !== '?'
      "
    >
      <h2>对应树果宝可梦</h2>
      <div class="poke-tb">
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