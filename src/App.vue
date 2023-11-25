<script setup>
import { ref } from 'vue'
import PageFooter from './components/PageFooter/index.vue'
import gameMap from './config/game.js'
import { toHM, getNum } from './utils/index.js'

const userData = ref({
  CurEnergy: 0,
  curStageIndex: 0,
  maxNumScore: 19564316,
  curMap: 0
})

const handleClickChangeMap = id => {
  userData.value.curMap = id
  // 8只起步随着切岛记录
  userData.value.maxNumScore = gameMap[userData.value.curMap].scoreList[
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
                clearable
                filterable
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
                v-model="userData.CurEnergy"
                placeholder="请输入当前能量"
                clearable
                class="m-2"
            /></el-col>
          </el-form-item>
          <el-form-item label="不拆分">
            满睡眠8小时30分钟，可获得至少{{
              getNum(userData.CurEnergy * 100)
            }}睡眠之力
          </el-form-item>
          <el-form-item
            label="第1觉"
            v-if="userData.CurEnergy * 100 > userData.maxNumScore"
          >
            达到8只所需睡眠{{
              toHM(((userData.maxNumScore / userData.CurEnergy) * 8.5) / 100)
            }}，可获得至少{{ getNum(userData.maxNumScore) }}睡眠之力
          </el-form-item>
          <el-form-item
            label="第2觉"
            v-if="userData.CurEnergy * 100 > userData.maxNumScore"
          >
            <p>
              剩余睡眠{{
                toHM(
                  8.5 -
                    ((userData.maxNumScore / userData.CurEnergy) * 8.5) / 100
                )
              }}即可达到当日评分满分，可获得至少{{
                getNum(
                  userData.CurEnergy *
                    (100 - userData.maxNumScore / userData.CurEnergy)
                )
              }}睡眠之力
            </p>
          </el-form-item>
          <el-form-item label="">
            <div class="mod-tips">
              <p>* 开帐篷可额外加1只，熏香可额外加1只</p>
              <p>* 开帐篷以及特殊日子的睡眠之力不再计算范围内</p>
            </div>
          </el-form-item>
        </el-form>
        <h2>{{ gameMap[userData.curMap].name }}-睡眠之力参考</h2>
        <ul class="score-list">
          <li
            v-for="(catchItem, catchKey) in gameMap[userData.curMap].scoreList"
            v-bind:key="catchItem.catchNum"
          >
            {{ catchItem.catchNum }} 只: {{ getNum(catchItem.startscore) }}
            <template
              v-if="catchKey !== gameMap[userData.curMap].scoreList.length - 1"
              >- {{ getNum(catchItem.endScore) }}</template
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