<script setup>
import { ref } from 'vue'
import PageFooter from './components/PageFooter/index.vue'
import gameMap from './config/game.js'
import { toHM, getNum, getNumberInMap } from './utils/index.js'

const userData = ref({
  CurEnergy: 0,
  curStageIndex: 0,
  mapMaxScore: 19564316,
  curMap: 0,
  times: '1'
})

const handleClickChangeMap = id => {
  userData.value.curMap = id
  // 8只起步随着切岛记录
  userData.value.mapMaxScore =
    gameMap[userData.value.curMap].scoreList[
      gameMap[userData.value.curMap].scoreList.length - 1
    ].startscore
  userData.value.CurEnergy =
    gameMap[userData.value.curMap].levelList[
      userData.value.curStageIndex
    ].energy
}
const handleClickChangeStage = stageItem => {
  userData.value.CurEnergy =
    gameMap[userData.value.curMap].levelList[
      userData.value.curStageIndex
    ].energy
}
const getScore = point => {
  return userData.value.CurEnergy * point * parseFloat(userData.value.times)
}
const getFirstSleepScore = () => {
  let res =
    userData.value.mapMaxScore /
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
</script>

<template>
  <div>
    <div class="main">
      <div class="page cur">
        <h2>拆分睡眠计算</h2>
        <el-form label-width="120px">
          <el-form-item label="当前岛屿">
            <ul class="mod-select-list">
              <li
                class="mod-select-list__item"
                v-for="(mapItem, mapIndex) in gameMap"
                v-bind:key="mapItem.id"
                :class="{ cur: userData.curMap === mapIndex }"
                @click="handleClickChangeMap(mapIndex)"
              >
                {{ mapItem.name }}
              </li>
            </ul>
          </el-form-item>
          <el-form-item label="卡比兽级别/能量">
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
                /> </el-select
            ></el-col>
            <el-col :span="11">
              <el-input
                type="tel"
                v-model="userData.CurEnergy"
                placeholder="请输入当前能量"
                clearable
                class="m-2"
            /></el-col>
          </el-form-item>
          <el-form-item label="特殊加成">
            <el-radio-group v-model="userData.times" class="ml-4">
              <el-radio label="1">平时</el-radio>
              <el-radio label="1.5">好眠日1.5倍</el-radio>
              <el-radio label="4">满月日4倍</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="不拆分">
            满睡眠<span class="sptime">8小时30分钟</span>，可捕捉<span
              class="sptime"
              >{{
                getNumberInMap(
                  getScore(100),
                  gameMap[userData.curMap].scoreList
                )
              }}只</span
            >，<span class="spscore">100分</span>，可获得至少<span
              class="spscore"
              >{{ getNum(getScore(100)) }}</span
            >睡意之力
          </el-form-item>
          <el-form-item
            label="第1觉"
            v-if="
              userData.CurEnergy * 100 * userData.times > userData.mapMaxScore
            "
          >
            所需睡眠<span class="sptime">{{ toHM(firstSleepTime()) }}</span
            >，可捕捉<span class="sptime">8只</span>，约<span class="spscore"
              >{{ getFirstSleepScore() }}分</span
            >，可获得至少<span class="spscore"
              >{{ getNum(getScore(getFirstSleepScore())) }}({{
                getNum(userData.mapMaxScore)
              }})</span
            >睡意之力
          </el-form-item>
          <el-form-item
            label="第2觉"
            v-if="
              userData.CurEnergy * 100 * userData.times > userData.mapMaxScore
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
              >，约<span class="spscore"
                >{{ 100 - getFirstSleepScore() }}分</span
              >，可获得至少<span class="spscore">{{
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
        <h2>{{ gameMap[userData.curMap].name }}-睡意之力参考</h2>
        <ul class="score-list">
          <li
            v-for="(catchItem, catchKey) in gameMap[userData.curMap].scoreList"
            v-bind:key="catchItem.catchNum"
          >
            {{ catchItem.catchNum }} 只: {{ getNum(catchItem.startscore) }}
            <template
              v-if="catchKey !== gameMap[userData.curMap].scoreList.length - 1"
              >- {{ getNum(catchItem.endscore) }}</template
            >
            <template v-else>以上</template>
          </li>
        </ul>
      </div>
      <PageFooter />
    </div>
  </div>
</template>

<style lang="scss">
@import "@/style/style.scss";
</style>