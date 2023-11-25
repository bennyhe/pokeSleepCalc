<script setup>
import { ref } from 'vue'
import PageFooter from './components/PageFooter/index.vue'
import gameMap from './config/game.js'
import {toHM,getNum} from './utils/index.js'

const userData = ref({
  CurEnergy: 564000,
  curStageIndex: 0,
  maxNumScore: 19564316,
  curMap: 0,
  isSplitSleep: 1
})

const handleClickChangeMap = id => {
  userData.value.curMap = id
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
          <!-- <el-form-item label="是否拆分睡眠">
            <el-radio-group v-model="userData.isSplitSleep" class="ml-4">
              <el-radio label="1">拆分2觉</el-radio>
              <el-radio label="0">不拆</el-radio>
            </el-radio-group>
          </el-form-item> -->
          <el-form-item label="第1觉">
            达到8只所需睡眠{{
             toHM( ((userData.maxNumScore / userData.CurEnergy) * 8.5) / 100)
            }}，可获得{{ getNum(userData.maxNumScore) }}睡眠之力
          </el-form-item>
          <el-form-item label="第2觉">
            <p>
              剩余睡眠{{
               toHM(8.5 - ((userData.maxNumScore / userData.CurEnergy) * 8.5) / 100)
              }}即可达到当日评分满分，可获得{{getNum(
                userData.CurEnergy *
                (100 - userData.maxNumScore / userData.CurEnergy))
              }}睡眠之力
            </p>
          </el-form-item>
        </el-form>

        <h2>{{ gameMap[userData.curMap].name }}-睡眠之力参考</h2>
        <ul>
          <li
            v-for="catchItem in gameMap[userData.curMap].scoreList"
            v-bind:key="catchItem.catchNum"
          >
            {{ catchItem.catchNum }} 只: {{getNum(catchItem.startscore)}} -
            {{getNum(catchItem.endScore)}}
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