<script setup>
import { ref } from 'vue'
import CptPoke from '../components/CptPoke/ItemIndex.vue'
import CptProcss from '../components/Process/ItemIndex.vue'
import CptSleepStyle from '../components/CptSleepStyle/SleepItem.vue'
import { gameMap, mapSplitVer } from '../config/game.js'
import { BERRY_TYPES, SLEEP_TYPES, SLEEP_NAMES } from '../config/valKey.js'
import { pokedex } from '../config/pokedex.js'
import {
  getUnLockSleeps,
  getRandomSleepStyle,
  getRandomHope
} from '../utils/sleep.js'
import {
  toHM,
  getNum,
  getNumberInMap,
  getStageLevelPicId,
  sortInObjectOptions,
  getDecimalNumber
} from '../utils/index.js'

const navData = ref({
  navList: [
    {
      name: '按只数拆分睡眠',
      value: 0
    },
    {
      name: '抽取睡姿',
      value: 2
    }
  ],
  navIndex: 0
})
const userData = ref({
  CurEnergy: 0,
  curStageIndex: 0,
  mapMaxScore: 19564316,
  curMap: 0,
  times: 1,
  cutNum: 4,
  curUnLockSleepType: 999,
  curUnlockSleeps: [],
  unLockSleeps: []
})
const randomSleepStyle = ref({
  resList: [],
  sleepPoint: 100
})
const setDefaultCutNumber = () => {
  userData.value.cutNum = getNumberInMap(
    getScore(100),
    gameMap[userData.value.curMap].scoreList
  )
}

const setUnlockSleeps = () => {
  const resSleeps = getUnLockSleeps(
    gameMap[userData.value.curMap],
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

const setAndGetRandomSleepStyle = (score, curStageIndex) => {
  randomSleepStyle.value.resList = getRandomSleepStyle(
    gameMap[userData.value.curMap],
    userData.value.curUnLockSleepType,
    score,
    curStageIndex
  )
}

const getTimes = 4000
const hopeList = ref([])
const getRandomHopeCb = res => {
  setAndGetRandomSleepStyle(
    getScore(randomSleepStyle.value.sleepPoint),
    userData.value.curStageIndex
  )
  hopeList.value = res
}

const handleClickTimes = () => {
  setDefaultCutNumber()
}

const handleBlurEnergy = () => {
  const curMapLevelList = gameMap[userData.value.curMap].levelList
  for (let gKey = 0; gKey < curMapLevelList.length; gKey++) {
    const gItem = curMapLevelList[gKey]
    if (gKey < curMapLevelList.length - 1) {
      if (
        userData.value.CurEnergy >= gItem.energy &&
        userData.value.CurEnergy < curMapLevelList[gKey + 1].energy
      ) {
        userData.value.curStageIndex = gKey
        break
      }
    } else {
      userData.value.curStageIndex = gKey
    }
  }
  resetTool()
  setAndGetRandomSleepStyle(
    getScore(randomSleepStyle.value.sleepPoint),
    userData.value.curStageIndex
  )
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
                  {{ SLEEP_TYPES[cKey] }}
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
        </el-form>
        <div class="page-inner mb3">
          <el-button
            type="success"
            plain
            @click="
              setAndGetRandomSleepStyle(
                getScore(randomSleepStyle.sleepPoint),
                userData.curStageIndex
              )
            "
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
            }}「{{ SLEEP_TYPES[userData.curUnLockSleepType] }}」({{
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
        </div>
        <div class="poke-tb poke-tb--xscorll poke-tb--lottery mb3">
          <template v-for="(sleepItem, sleepKey) in randomSleepStyle.resList">
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
            </div>
          </template>
        </div>
        <div class="page-inner mb3">
          <el-button
            type="primary"
            plain
            @click="
              getRandomHope(
                gameMap[userData.curMap],
                userData.curUnLockSleepType,
                getScore(randomSleepStyle.sleepPoint),
                userData.curStageIndex,
                getTimes,
                getRandomHopeCb
              )
            "
            >点击计算期望(睡{{ getTimes }}次)</el-button
          >
        </div>
        <div v-if="hopeList.length > 0">
          <div class="page-inner">
            <h3>
              期望宝可梦睡姿列表
              <span class="extra">({{ hopeList.length }}只)</span>
            </h3>
          </div>
          <div class="poke-tb poke-tb--xscorll">
            <div class="page-inner">
              <div
                class="cpt-avatar"
                v-for="hopeItem in hopeList"
                v-bind:key="hopeItem.pokeId"
              >
                <img
                  v-lazy="`./img/pokedex/${hopeItem.pokeId}.png`"
                  :alt="pokedex[hopeItem.pokeId].name"
                />
                <p>{{ getDecimalNumber(hopeItem.count / getTimes, 2) }}</p>
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
                <CptPoke :pokeId="hopeItem.pokeId" :showKey="['sleepType']" />
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
        </div>
        <div class="page-inner">
          <div class="mod-tips">
            <p>* 抽取睡姿不支持活动up等特殊情况。</p>
            <p>* 抽取结果不代表游戏内结果，仅作为参考。</p>
            <p>* 抽取结果的闪率并不是游戏内的闪率。</p>
          </div>
        </div>
      </div>
    </template>
    <div class="sleeplist">
      <div class="page-inner">
        <h3>
          已解锁睡姿
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
            >{{ cItem
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
                :userData="userData"
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
              :sleepItem="sleepItem"
              :showKey="['sleepType']"
              :userData="userData"
            />
          </div>
        </template>
      </div>
    </div>
    <h2>
      {{ gameMap[userData.curMap].name }}-数据区间参考<span
        class="mod-tips extra"
        >(v{{ mapSplitVer }})</span
      >
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