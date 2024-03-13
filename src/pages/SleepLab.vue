<script setup>
import { ref } from 'vue'
import { pokedex } from '../config/pokedex.js'
import { gameMap } from '../config/game.js'
import { getRandomHope, getLevelIndexByEnergy } from '../utils/sleep.js'
import {
  getDecimalNumber,
  getNum,
  getStageLevelPicId
} from '../utils/index.js'
import { SPO_DATA } from '../config/spo.js'
import { SLEEP_STYLE } from '../config/sleepStyle.js'
import { SLEEP_NAMES, SLEEP_TYPES } from '../config/valKey.js'
import CptPoke from '../components/CptPoke/ItemIndex.vue'
import CptSleepStyle from '../components/CptSleepStyle/SleepItem.vue'

const pageData = ref({
  curMap: 0,
  mapSleepType: '1',
  maxScore: '5000000',
  minScore: '0'
})

const getTimes = 4000
const targetPokeId = 280
const testData = ref([])
// 0-10w 1000
// 10w-50w 2000
// 50w以上-400w 5000
// 400w-500w 100000
const handleClickGet = () => {
  const basePoint = +pageData.value.minScore
  const startTime = new Date().getTime()
  const baseStarI = 0
  const targetRes = []
  let splitPoint = 1000
  testData.value = []
  for (let i = baseStarI; i < baseStarI + 2000; i++) {
    const curAllScore = basePoint + splitPoint
    const allPoint = curAllScore * 100
    const res = getRandomHope(
      gameMap[pageData.value.curMap],
      +pageData.value.mapSleepType,
      allPoint,
      getLevelIndexByEnergy(
        gameMap[pageData.value.curMap].levelList,
        curAllScore
      ),
      getTimes
    )
    console.log(
      i,
      curAllScore,
      allPoint,
      `${(new Date().getTime() - startTime) / 1000}s`
    )
    const lastRes = {
      basePoint: curAllScore,
      allPoint,
      res
    }
    targetRes.push(lastRes)
    if (curAllScore >= +pageData.value.maxScore) {
      break
    }
    if (basePoint + splitPoint > 4000000) {
      splitPoint += 100000
    } else if (
      basePoint + splitPoint > 500000 &&
      basePoint + splitPoint <= 4000000
    ) {
      splitPoint += 5000
    } else if (
      basePoint + splitPoint > 100000 &&
      basePoint + splitPoint <= 500000
    ) {
      splitPoint += 2000
    } else {
      splitPoint += 1000
    }
  }
  testData.value = targetRes
  console.log(targetRes)
}

const handleClickChangeMap = id => {
  pageData.value.curMap = id
}
</script>

<template>
  <el-form label-width="90px">
    <!-- S 当前岛屿 -->
    <el-form-item label="当前岛屿">
      <ul class="cpt-select-list">
        <li
          class="cpt-select-list__item"
          v-for="(mapItem, mapIndex) in gameMap"
          v-bind:key="mapItem.id"
          :class="{ cur: pageData.curMap === mapIndex }"
          @click="handleClickChangeMap(mapIndex)"
        >
          <div class="cpt-select-list__name">
            {{ mapItem.name }}
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
    <el-form-item label="睡眠类型">
      <el-radio-group v-model="pageData.mapSleepType">
        <el-radio
          :label="cKey"
          v-for="(cItem, cKey) in SLEEP_TYPES"
          v-bind:key="cItem"
          ><div class="i i-sleeptype" :class="`i i-sleeptype--${cKey}`">
            {{ SLEEP_TYPES[cKey] }}
          </div>
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="能量范围">
      <img class="icon" v-lazy="`./img/ui/energy.png`" />
      <el-select
        v-model="pageData.minScore"
        placeholder="请填写下限分数"
        filterable
        allow-create
        type="tel"
        style="width: 150px"
      >
        <el-option
          v-for="(stageItem, stageIndex) in gameMap[pageData.curMap].levelList"
          :key="stageIndex"
          :label="stageItem.energy"
          :value="stageItem.energy"
        >
          <img
            class="icon"
            v-lazy="`./img/ui/${getStageLevelPicId(stageItem.name)}.png`"
          />
          {{ stageItem.name }}
          -
          {{ stageItem.energy }}
        </el-option>
      </el-select>
      —
      <el-select
        v-model="pageData.maxScore"
        placeholder="请填写上限分数"
        filterable
        allow-create
        type="tel"
        style="width: 150px"
      >
        <el-option
          v-for="(stageItem, stageIndex) in gameMap[pageData.curMap].levelList"
          :key="stageIndex"
          :label="stageItem.energy"
          :value="stageItem.energy"
        >
          <img
            class="icon"
            v-lazy="`./img/ui/${getStageLevelPicId(stageItem.name)}.png`"
          />
          {{ stageItem.name }}
          -
          {{ stageItem.energy }}
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button @click="handleClickGet">计算结果</el-button>
    </el-form-item>
  </el-form>
  <h2>
    {{ gameMap[pageData.curMap].name }}-{{ SLEEP_TYPES[pageData.mapSleepType] }}
  </h2>
  <div v-for="tdItem in testData" v-bind:key="tdItem.allPoint">
    <h3>
      <img class="icon" v-lazy="`./img/ui/energy.png`" />
      {{ getNum(tdItem.basePoint) }}-{{ getNum(tdItem.allPoint) }}
      <span class="extra">({{ tdItem.res.length }}只)</span>
    </h3>
    <div class="page-inner">
      <div
        class="cpt-avatar"
        v-for="hopeItem in tdItem.res"
        v-bind:key="hopeItem.pokeId"
      >
        <img
          v-lazy="`./img/pokedex/${hopeItem.pokeId}.png`"
          :alt="pokedex[hopeItem.pokeId].name"
        />
        <p>{{ getDecimalNumber(hopeItem.count / getTimes, 2) }}</p>
      </div>
    </div>
  </div>
  <div class="hide">
    <template v-for="gmItem in gameMap" v-bind:key="gmItem.id">
      <h3>
        {{ gmItem.name }}
      </h3>
      <div
        class="poke-tb"
        v-for="levelItem in gmItem.levelList"
        v-bind:key="levelItem.energy"
      >
        <h4>
          {{ levelItem.name }}
          <span class="extra" v-if="levelItem.sleepStyles"
            >{{ levelItem.sleepStyles.length }}只</span
          >
        </h4>
        <template v-for="sleepId in levelItem.sleepStyles">
          <div
            class="poke-tb__item"
            v-if="SLEEP_STYLE[sleepId]"
            v-bind:key="sleepId"
          >
            <CptPoke :pokeId="SLEEP_STYLE[sleepId].pokeId" />
            <p>{{ SLEEP_STYLE[sleepId].id }}</p>
            <p>{{ SLEEP_NAMES[SLEEP_STYLE[sleepId].sleepNameId] }}</p>
            <p>{{ SLEEP_STYLE[sleepId].star }}星</p>
            <div v-if="SPO_DATA[sleepId] && SPO_DATA[sleepId].spo">
              <p>SPO:{{ SPO_DATA[sleepId].spo }}</p>
              <p>SPOID:{{ SPO_DATA[sleepId].id }}</p>
            </div>
            <div v-else>没有spo</div>
            <p>{{ SLEEP_STYLE[sleepId].exp }}</p>
            <p>{{ SLEEP_STYLE[sleepId].shards }}</p>
            <p>{{ SLEEP_STYLE[sleepId].candys }}</p>
          </div>
        </template>
      </div>
    </template>
  </div>
  <div class="poke-tb hide">
    <template v-for="pokeItem in pokedex" v-bind:key="pokeItem.id">
      <template
        v-for="sleepItem in SLEEP_STYLE"
        v-bind:key="`${sleepItem.pokeId}_${sleepItem.id}`"
      >
        <div class="poke-tb__item" v-if="pokeItem.id === sleepItem.pokeId">
          <CptSleepStyle
            :showMapLevel="true"
            :sleepItem="sleepItem"
            :showKey="['sleepType']"
          />
        </div>
      </template>
    </template>
  </div>
</template>