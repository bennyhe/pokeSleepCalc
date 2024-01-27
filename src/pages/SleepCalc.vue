<script setup>
import { ref } from 'vue'
import CptProcss from '../components/Process/ItemIndex.vue'
import {gameMap, mapSplitVer} from '../config/game.js'
import {
  toHM,
  getNum,
  getNumberInMap,
  getStageLevelPicId
} from '../utils/index.js'

const userData = ref({
  CurEnergy: 0,
  curStageIndex: 0,
  mapMaxScore: 19564316,
  curMap: 0,
  times: '1',
  cutNum: 4
})
const setDefaultCutNumber = () => {
  userData.value.cutNum = getNumberInMap(
    getScore(100),
    gameMap[userData.value.curMap].scoreList
  )
}

const resetTool = () => {
  userData.value.CurEnergy =
    gameMap[userData.value.curMap].levelList[
      userData.value.curStageIndex
    ].energy
  setDefaultCutNumber()
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
}
const handleClickChangeStage = stageItem => {
  resetTool()
}
const getScore = point => {
  return userData.value.CurEnergy * point * parseFloat(userData.value.times)
}
const getFirstSleepScore = () => {
  let res =
    gameMap[userData.value.curMap].scoreList[userData.value.cutNum - 3]
      .startscore /
    userData.value.CurEnergy /
    parseFloat(userData.value.times)
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
        parseFloat(userData.value.times)
    ) + 1
  )
}

// 初始化默认
setDefaultCutNumber()
</script>

<template>
  <div>
    <h2>拆分睡眠计算</h2>
    <el-form label-width="90px">
      <!-- S 当前岛屿 -->
      <el-form-item label="当前岛屿">
        <ul class="mod-select-list">
          <li
            class="mod-select-list__item"
            v-for="(mapItem, mapIndex) in gameMap"
            v-bind:key="mapItem.id"
            :class="{ cur: userData.curMap === mapIndex }"
            @click="handleClickChangeMap(mapIndex)"
          >
            <span class="mod-select-list__name">{{ mapItem.name }}</span>
            <img v-lazy="`./img/ui/${mapItem.pic}.png`" />
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
        <el-radio-group v-model="userData.times" class="ml-4">
          <el-radio label="1">平时</el-radio>
          <el-radio label="1.5">好眠日1.5倍</el-radio>
          <el-radio label="2">满月日2倍</el-radio>
          <el-radio label="2.5">满月日2.5倍(周三)</el-radio>
          <el-radio label="3">满月日3倍(周二)</el-radio>
          <el-radio label="4">满月日4倍(周一)</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="不拆分">
        满睡眠<span class="sptime">8小时30分钟</span>，可捕捉<span
          class="sptime"
          >{{ getFullSleepCatchNum() }}只</span
        >，<CptProcss score="100" />分，可获得至少<span class="spscore">{{
          getNum(getScore(100))
        }}</span
        >睡意之力
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
        >睡意之力
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
          >睡意之力
        </p>
      </el-form-item>
      <el-form-item label="">
        <div class="mod-tips">
          <p>* 开帐篷可额外加1只，熏香可额外加1只。</p>
          <p>* 开帐篷不在计算范围内。</p>
        </div>
      </el-form-item>
    </el-form>
    <h2>{{ gameMap[userData.curMap].name }}-数据区间参考<span class="mod-tips extra">(v{{mapSplitVer}})</span></h2>
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
  </div>
</template>

<style lang="scss">
</style>