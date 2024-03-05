<script setup>
import { ref } from 'vue'
import CptPoke from '../components/CptPoke/ItemIndex.vue'
import CptProcss from '../components/Process/ItemIndex.vue'
import CptSleepStyle from '../components/CptSleepStyle/SleepItem.vue'
import { gameMap, mapSplitVer } from '../config/game.js'
import { BERRY_TYPES, SLEEP_TYPES, SLEEP_NAMES } from '../config/valKey.js'
import { SPO_DATA } from '../config/spo.js'
import { pokedex } from '../config/pokedex.js'
import { SLEEP_STYLE } from '../config/sleepStyle.js'
import {
  toHM,
  getNum,
  getNumberInMap,
  getStageLevelPicId,
  sortInObjectOptions,
  getRandomArr
} from '../utils/index.js'

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
  const resSleeps = getUnLockSleeps()
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

const getUnLockSleeps = stageIndex => {
  const curStageIndex = stageIndex || userData.value.curStageIndex
  let unLockSleeps = []
  let curUnlockSleeps = []
  if (curStageIndex > 0) {
    const aResLast = []
    gameMap[userData.value.curMap].levelList
      .slice(0, curStageIndex)
      .forEach((levelItem, levelKey) => {
        if (levelItem.sleepStyles.length > 0) {
          levelItem.sleepStyles.forEach(sItem => {
            if (SLEEP_STYLE[sItem]) {
              aResLast.push({
                ...SLEEP_STYLE[sItem],
                sleepType: pokedex[SLEEP_STYLE[sItem].pokeId].sleepType,
                spo: SPO_DATA[gameMap[userData.value.curMap].id][sItem].spo,
                spoId: SPO_DATA[gameMap[userData.value.curMap].id][sItem].id,
                unLockLevel: levelKey
              })
            }
            // else {
            //   console.log(sItem)
            // }
          })
        }
      })
    unLockSleeps = sortInObjectOptions(
      aResLast,
      ['sleepType', 'pokeId', 'star'],
      'up'
    )
  }
  if (
    gameMap[userData.value.curMap].levelList[curStageIndex].sleepStyles.length >
    0
  ) {
    const aRes = []
    gameMap[userData.value.curMap].levelList[curStageIndex].sleepStyles.forEach(
      sItem => {
        if (SLEEP_STYLE[sItem]) {
          aRes.push({
            ...SLEEP_STYLE[sItem],
            sleepType: pokedex[SLEEP_STYLE[sItem].pokeId].sleepType,
            spo: SPO_DATA[gameMap[userData.value.curMap].id][sItem].spo,
            spoId: SPO_DATA[gameMap[userData.value.curMap].id][sItem].id,
            unLockLevel: curStageIndex
          })
        }
        // else {
        //   console.log(sItem)
        // }
      }
    )
    curUnlockSleeps = sortInObjectOptions(
      aRes,
      ['sleepType', 'pokeId', 'star'],
      'up'
    )
  }
  return {
    unLockSleeps,
    curUnlockSleeps,
    allUnlockSleepsList: [...unLockSleeps, ...curUnlockSleeps]
  }
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

const getFullSleepCatchNum = () => {
  return getNumberInMap(
    getScore(100),
    gameMap[userData.value.curMap].scoreList
  )
}

const getNextScoreDiff = () => {
  return (
    parseInt(
      (gameMap[userData.value.curMap].scoreList[getFullSleepCatchNum() - 2]
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

const getRandomSleepStyle = (score, curStageIndex) => {
  const res = []
  let cathPokeCount = getNumberInMap(
    score,
    gameMap[userData.value.curMap].scoreList
  )
  let curSpo = Math.floor(score / 38000)
  let orgSleepList = getUnLockSleeps(curStageIndex).allUnlockSleepsList
  // 睡眠类型图鉴筛选
  if (+userData.value.curUnLockSleepType !== 999) {
    orgSleepList = orgSleepList.filter(
      item => item.sleepType === +userData.value.curUnLockSleepType
    )
  }
  // 随机洗牌，如果10倍长度少于1000，则默认1000次
  orgSleepList = getRandomArr(
    orgSleepList,
    orgSleepList.length * 10 < 1000 ? 1000 : orgSleepList.length * 10
  )

  // SPO 值最小，且解锁的卡比兽等级最低，且睡姿 ID 最小的睡姿
  const spoZeroPoke = sortInObjectOptions(
    orgSleepList,
    ['spo', 'unLockLevel', 'spoId'],
    'up'
  )[0]
  // console.log(`等级解锁睡姿——${orgSleepList.length}个`, orgSleepList)

  let isSleepOnStomach = false

  while (cathPokeCount > 1) {
    let sleepList = orgSleepList.filter(
      item =>
        item.spo <= curSpo && (isSleepOnStomach ? item.sleepNameId !== 4 : true)
    )
    sleepList = getRandomArr(sleepList, sleepList.length * 10)
    //当剩余的 SPO 小于 2 时(即小于可用的睡姿的 SPO 时)，将固定抽出 SPO 值最小，且解锁的卡比兽等级最低，且睡姿 ID 最小的睡姿
    if (curSpo < 2) {
      res.push({
        ...spoZeroPoke
        // extra: 'SPO<2' //debug
      })
      curSpo = 1
    } else {
      const rdmIndex = parseInt(
        Math.floor(Math.random() * sleepList.length),
        10
      )
      const rdmRes = sleepList[rdmIndex]
      // 大肚子睡只能1次
      if (rdmRes.sleepNameId && rdmRes.sleepNameId === 4) {
        isSleepOnStomach = true
      }
      // console.log(sleepList[rdmIndex])
      res.push({
        ...rdmRes
      })
      curSpo -= sleepList[rdmIndex].spo
      if (curSpo < 2) {
        curSpo = 1
      }
    }
    // console.log(curSpo)
    cathPokeCount--
  }
  //当抽取到最后一个睡姿的时候，将根据剩余的 SPO 固定抽出最后一个 SPO 最大，且解锁的卡比兽等级最低，且睡姿 ID 最小的睡姿
  if (curSpo < 2) {
    res.push(spoZeroPoke)
  } else {
    let lastList = orgSleepList.filter(
      item =>
        item.spo <= curSpo && (isSleepOnStomach ? item.sleepNameId !== 4 : true)
    )
    lastList = sortInObjectOptions(lastList, ['spo'], 'down')
    const lastMostSpo = lastList[0].spo
    lastList = lastList.filter(item => item.spo === lastMostSpo)
    if (lastList.length > 0) {
      lastList = sortInObjectOptions(lastList, ['unLockLevel', 'spoId'], 'up')
    }
    res.push(lastList[0])
  }

  return res
  // console.log(
  //   gameMap[userData.value.curMap].name,
  //   gameMap[userData.value.curMap].levelList[curStageIndex].name,
  //   3000000,
  //   `剩余SPO:${curSpo}`,
  //   SLEEP_TYPES[userData.value.curUnLockSleepType],
  //   `${getNumberInMap(score, gameMap[userData.value.curMap].scoreList)}只`
  // )
  // console.log('res', res)
}

const setAndGetRandomSleepStyle = (score, curStageIndex) => {
  randomSleepStyle.value.resList = getRandomSleepStyle(score, curStageIndex)
}

const getTimes = 3000
const hopeList = ref([])
const hopeLoading = ref(false)
const getRandomHope = (score, curStageIndex) => {
  hopeLoading.value = true
  let orgList = []
  for (let i = 0; i < getTimes; i++) {
    orgList = orgList.concat(getRandomSleepStyle(score, curStageIndex))
  }
  const mergeRes = []
  orgList.forEach(item => {
    const findTargetResItem = mergeRes.find(
      resItem => resItem.id === item.id
    )
    if (!findTargetResItem) {
      mergeRes.push({
        ...item,
        count: 1
      })
    } else {
      findTargetResItem.count++
    }
  })
  let res = []
  mergeRes.forEach(item => {
    const findTargetResItem = res.find(
      resItem => resItem.pokeId === item.pokeId
    )
    if (!findTargetResItem) {
      res.push({
        pokeId: item.pokeId,
        list: [item],
        count: item.count
      })
    } else {
      findTargetResItem.list.push(item)
      findTargetResItem.count += item.count
    }
  })
  res.forEach(item => {
    item.list = sortInObjectOptions(item.list, ['count'], 'down')
  })
  res = sortInObjectOptions(res, ['count', 'pokeId'], 'down')

  setAndGetRandomSleepStyle(score, curStageIndex)
  hopeList.value = res
  hopeLoading.value = false
  // console.log({
  //   res,
  //   orgList,
  //   getTimes
  // })
}

const handleClickTimes = () => {
  setDefaultCutNumber()
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
      <el-form-item label="不拆分">
        满睡眠<span class="sptime">8小时30分钟</span>，可捕捉<span
          class="sptime"
          >{{ getFullSleepCatchNum() }}只</span
        >，<CptProcss score="100" />分，可获得至少<span class="spscore">{{
          getNum(getScore(100))
        }}</span
        >睡意之力，预计掉<span class="vigour">{{
          getLostVigour(8 * 60 + 30)
        }}</span
        >点活力
      </el-form-item>
      <el-form-item v-if="getFullSleepCatchNum() < 8 && getNextScoreDiff() > 0">
        <p>
          距离抓<span class="sptime">{{ getFullSleepCatchNum() + 1 }}只</span
          >还需<span class="sptime"
            ><img class="icon" v-lazy="`./img/ui/energy.png`" />{{
              getNextScoreDiff()
            }}</span
          >能量
        </p>
      </el-form-item>
      <el-form-item v-if="getFullSleepCatchNum() > 3">
        按<el-input-number
          v-model="userData.cutNum"
          :min="4"
          :max="getFullSleepCatchNum()"
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
          剩余睡眠<span class="sptime">{{ toHM(8.5 - firstSleepTime()) }}</span
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
    </el-form>
    <div class="mod-tips">
      <p>* 开帐篷可额外加1只，熏香可额外加1只。</p>
      <p>* 开帐篷&熏香不在计算范围内。</p>
    </div>
    <div class="page-inner">
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
    <div class="sleeplist">
      <h4>
        已解锁的睡姿
        <span class="extra"
          >(<template v-if="getFilterInTypes(userData.unLockSleeps).length > 0"
            >{{ getFilterInTypes(userData.unLockSleeps).length }}种</template
          ><template
            v-if="getFilterInTypes(userData.curUnlockSleeps).length > 0"
            >+{{
              getFilterInTypes(userData.curUnlockSleeps).length
            }}种</template
          >)</span
        >
      </h4>
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
    <div class="sleeplist" v-if="randomSleepStyle.resList.length > 0">
      <h2>
        抽取
        <img
          class="icon"
          v-lazy="
            `./img/ui/${getStageLevelPicId(
              gameMap[userData.curMap].levelList[userData.curStageIndex].name
            )}.png`
          "
        />{{
          gameMap[userData.curMap].levelList[userData.curStageIndex].name
        }}({{ SLEEP_TYPES[userData.curUnLockSleepType] }})睡姿
      </h2>
      <el-form label-width="90px">
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
            >
              <template #prefix>
                <img class="icon" v-lazy="`./img/ui/energy.png`" />
              </template> </el-input
          ></el-col>
        </el-form-item>
        <el-form-item label="睡眠分数">
          <div style="width: 300px">
            <el-slider
              v-model="randomSleepStyle.sleepPoint"
              show-input
              :min="1"
              :max="100"
            />
          </div>
        </el-form-item>
      </el-form>
      <div class="page-inner mb3">
        <div class="mb3">
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
        <p class="mb3">
          <el-button
            type="success"
            plain
            @click="
              setAndGetRandomSleepStyle(
                getScore(randomSleepStyle.sleepPoint),
                userData.curStageIndex
              )
            "
            >点击抽取{{ getNum(getScore(randomSleepStyle.sleepPoint)) }}分({{
              getNumberInMap(
                getScore(randomSleepStyle.sleepPoint),
                gameMap[userData.curMap].scoreList
              )
            }}种睡姿)</el-button
          >
        </p>
        <p>
          <el-button
            type="primary"
            plain
            :loading="hopeLoading"
            @click="
              getRandomHope(
                getScore(randomSleepStyle.sleepPoint),
                userData.curStageIndex
              )
            "
            >点击计算期望(睡{{ getTimes }}次)</el-button
          >
        </p>
      </div>
      <h4>
        抽取睡姿结果
        <span class="extra">({{ randomSleepStyle.resList.length }}种)</span>
      </h4>
      <div class="poke-tb poke-tb--xscorll">
        <template v-for="(sleepItem, sleepKey) in randomSleepStyle.resList">
          <div
            class="poke-tb__item"
            v-if="sleepItem.id"
            v-bind:key="sleepItem.id"
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
      <div v-if="hopeList.length > 0">
        <h4>
          期望宝可梦睡姿列表
          <span class="extra">({{ hopeList.length }}只)</span>
        </h4>
        <div class="page-inner">
          <span class="cpt-avatar" v-for="hopeItem in hopeList" v-bind:key="hopeItem.pokeId">
            <img
              v-lazy="`./img/pokedex/${hopeItem.pokeId}.png`"
              :alt="pokedex[hopeItem.pokeId].name"
            />
          </span>
        </div>
        <div class="poke-tb poke-tb--xscorll" v-loading="hopeLoading">
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
    <template v-if="gameMap[userData.curMap].berry[0] !== '?'">
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