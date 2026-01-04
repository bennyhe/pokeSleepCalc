<script setup>
import { ref } from 'vue'
import { pokedex } from '../config/pokedex.js'
import { gameMap } from '../config/game.js'
import {
  getRandomHopeWithMulti,
  getLevelIndexByEnergy,
  getSPOById
} from '../utils/sleep.js'
import {
  getDecimalNumber,
  getNum,
  getStageLevelPicId
} from '../utils/index.js'
import { SPO_DATA, SPONEW_TO_SPOOLD, SPO38000 } from '../config/spo.js'
import { SLEEP_STYLE } from '../config/sleepStyle.js'
import { SLEEP_TYPES } from '../config/valKey.js'
import { NAV_SLEEPLAB } from '../config/nav.js'
import { LAB_CONFIG, SLEEP_CALC_POKEMONS } from '../config/act.js'
import CptSleepStyle from '../components/CptSleepStyle/SleepItem.vue'
import CptAvatar from '../components/CptAvatar/ItemIndex.vue'
import CptSelectOptions from '../components/CptSelect/OptionsItem.vue'

const navData = ref(NAV_SLEEPLAB)
const pageData = ref({
  curMap: 0,
  mapSleepType: '1',
  maxScore: '5000000',
  minScore: '0',
  banPokes: [],
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
  noLastList: [...SLEEP_CALC_POKEMONS.noLastList, ...LAB_CONFIG.noLastList]
})

const getTimes = 4000
const testData = ref([])
const getRes = (curAllScore, allPoint, mapId, mapSleepType, getTimesInFun) => {
  mapSleepType = mapSleepType || +pageData.value.mapSleepType
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
      banPokes: pageData.value.banPokes,
      upIdsMid: pageData.value.upIdsMid,
      upIdsLarge: pageData.value.upIdsLarge,
      upIdsSmall: pageData.value.upIdsSmall,
      isNoMoreData: true,
      actRandomNum: pageData.value.actRandomNum || 0.3,
      noLastPokes: pageData.value.noLastList
    }
  )
}
// 0-10w 1000
// 10w-50w 2000
// 50w以上-400w 5000
// 400w-500w 100000
const handleClickGet = type => {
  const basePoint = +pageData.value.minScore
  const startTime = new Date().getTime()
  const baseStarI = 0
  const targetRes = []
  let lastGetList = []
  let splitPoint = 1000
  testData.value = []
  if (type === 'quickLevel') {
    console.log('quick start...', gameMap[pageData.value.curMap].levelList)
    let k = 0
    gameMap[pageData.value.curMap].levelList.forEach((item, mapIndex) => {
      const curAllScore = item.energy
      const allPoint = curAllScore * 100
      if (curAllScore <= +pageData.value.maxScore) {
        const randomRes = getRes(curAllScore, allPoint)
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
        targetRes.push(lastRes)
        k++
      }
    })
  } else if (type === 'mapInMaster20') {
    let k = 0
    for (const st in SLEEP_TYPES) {
      if (Object.hasOwnProperty.call(SLEEP_TYPES, st)) {
        // console.log(+st, SLEEP_TYPES[st])
        gameMap.forEach((gmItem, gmKey) => {
          const curAllScore =
            gameMap[gmKey].levelList[gameMap[gmKey].levelList.length - 1]
              .energy
          const allPoint = curAllScore * 100
          const randomRes = getRes(curAllScore, allPoint, gmKey, +st)
          const res = randomRes.res
          console.log(randomRes.res)
          lastGetList = lastGetList.concat(randomRes.lastGetList)
          console.log(
            k,
            gmItem.id,
            curAllScore,
            allPoint,
            `${(new Date().getTime() - startTime) / 1000}s`,
            +st,
            SLEEP_TYPES[st]
          )
          const lastRes = {
            basePoint: curAllScore,
            allPoint,
            res
          }
          targetRes.push(lastRes)
          k++
        })
      }
    }
  } else {
    for (let i = baseStarI; i < baseStarI + 2000; i++) {
      const curAllScore = basePoint + splitPoint
      const allPoint = curAllScore * 100
      const randomRes = getRes(curAllScore, allPoint)
      const res = randomRes.res
      lastGetList = lastGetList.concat(randomRes.lastGetList)
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
  }
  testData.value = targetRes
  console.log(targetRes, lastGetList)
}

const handleClickChangeMap = id => {
  pageData.value.curMap = id
}

const dateTime1 = ref('')
const defaultTime1 = [
  new Date(2000, 1, 1, 4, 0, 0),
  new Date(2000, 2, 1, 3, 59, 59)
]

const handleChangeUps = () => {
  console.log(
    pageData.value.upIdsLarge.ids,
    pageData.value.upIdsMid.ids,
    pageData.value.upIdsSmall.ids
  )
}

import i18n from '../i18n'
const { t } = i18n.global
const pokemonNames = ref('')
const handleChangeInputPM = () => {
  const res = []
  if (pokemonNames.value.indexOf('、') > -1) {
    const PMArr = pokemonNames.value.split('、')
    for (const pId in pokedex) {
      if (Object.prototype.hasOwnProperty.call(pokedex, pId)) {
        const pItem = pokedex[pId]
        PMArr.forEach(PMItem => {
          if (t(`POKEMON_NAME.${pItem.id}`) === PMItem) {
            res.push(pItem.id)
          }
        })
      }
    }
    console.log(
      PMArr.length === res.length,
      PMArr.length,
      res.length,
      res.join(',')
    )
  }
}
</script>

<template>
  <el-form label-width="90px">
    <el-form-item>
      {{ new Date(dateTime1[0]).getTime() }}
      {{ new Date(dateTime1[1]).getTime() }}
      <el-date-picker
        v-model="dateTime1"
        type="datetimerange"
        start-placeholder="Start Date"
        end-placeholder="End Date"
        :default-time="defaultTime1"
      />
    </el-form-item>
    <el-form-item>
      <el-input
        v-model="pokemonNames"
        style="width: 100%"
        :rows="2"
        type="textarea"
        @input="handleChangeInputPM"
      />
    </el-form-item>
    <!-- S 当前岛屿 -->
    <el-form-item :label="$t('OPTIONS.formLableCurIland')">
      <ul class="cpt-select-list">
        <li
          class="cpt-select-list__item"
          v-for="(mapItem, mapIndex) in gameMap"
          v-bind:key="mapItem.id"
          :class="{ cur: pageData.curMap === mapIndex }"
          @click="handleClickChangeMap(mapIndex)"
        >
          <div class="cpt-select-list__name">
            {{ $t(`ILAND.${mapItem.id}`) }}
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
            {{ $t(`SLEEP_TYPES.${cKey}`) }}
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
    <el-form-item label="去除宝可梦">
      <el-select
        v-model="pageData.banPokes"
        placeholder="请选择要去除的宝可梦"
        filterable
        clearable
        multiple
        collapse-tags
        collapse-tags-tooltip
      >
        <CptSelectOptions />
      </el-select>
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
        <template v-for="pokeItem in pokedex" :key="pokeItem.id">
          <el-option
            :label="$t(`POKEMON_NAME.${pokeItem.id}`)"
            :value="pokeItem.id"
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
      <CptAvatar
        :pokeId="pokeId"
        v-for="pokeId in pageData.upIdsSmall.ids"
        :key="pokeId"
      />
    </el-form-item>
    <el-form-item>
      <el-button @click="handleClickGet()">计算结果</el-button>
      <el-button @click="handleClickGet('quickLevel')" type="success"
        >按等级快速计算</el-button
      >
      <el-button @click="handleClickGet('mapInMaster20')" type="warning"
        >各类型大师20</el-button
      >
    </el-form-item>
  </el-form>
  <h2>
    {{ $t(`ILAND.${gameMap[pageData.curMap].id}`) }}-{{
      $t(`SLEEP_TYPES.${pageData.mapSleepType}`)
    }}
  </h2>
  <div v-for="tdItem in testData" v-bind:key="tdItem.allPoint">
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
  <el-radio-group
    class="first-page-nav"
    v-model="navData.navIndex"
    fill="#41ae3c"
  >
    <template v-for="cItem in navData.navList" v-bind:key="cItem.name">
      <el-radio-button :label="cItem.value"> {{ cItem.name }}</el-radio-button>
    </template>
  </el-radio-group>
  <div class="sleeplist" v-if="navData.navIndex === 0">
    <template
      v-for="gmItem in [gameMap[pageData.curMap]]"
      v-bind:key="gmItem.id"
    >
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
            >{{ levelItem.sleepStyles.length }}{{ $t(`OPTIONS.one`) }}</span
          >
        </h4>
        <template v-for="sleepId in levelItem.sleepStyles">
          <div
            class="poke-tb__item"
            v-if="SLEEP_STYLE[sleepId]"
            v-bind:key="sleepId"
          >
            <CptSleepStyle
              :sleepItem="SLEEP_STYLE[sleepId]"
              :showKey="['sleepType']"
            >
              <p v-if="SLEEP_STYLE[sleepId].id">
                {{ SLEEP_STYLE[sleepId].id }}
              </p>
              <p v-if="SPO_DATA[SLEEP_STYLE[sleepId].id]">
                spoId: {{ SPO_DATA[SLEEP_STYLE[sleepId].id].id }}
              </p>
              <p v-if="SPO_DATA[SLEEP_STYLE[sleepId].id]">
                spo: {{ getSPOById(SLEEP_STYLE[sleepId].id) }}
              </p>
            </CptSleepStyle>
          </div>
        </template>
      </div>
    </template>
  </div>
  <div class="sleeplist" v-else-if="navData.navIndex === 1">
    <div
      class="poke-tb"
      v-for="(spoNewItem, spoNewKey) in SPONEW_TO_SPOOLD"
      v-bind:key="spoNewItem"
    >
      <h4>
        {{ spoNewKey }}/{{ spoNewItem }}-<span class="extra">{{
          getNum(spoNewItem * SPO38000)
        }}</span>
      </h4>
      <template
        v-for="(sleepItem, sleepKey) in SPO_DATA"
        v-bind:key="`${sleepItem.pokeId}_${sleepItem.id}`"
      >
        <div class="poke-tb__item" v-if="getSPOById(sleepKey) === spoNewItem">
          <CptSleepStyle
            :sleepItem="SLEEP_STYLE[sleepKey]"
            :showKey="['sleepType']"
          />
        </div>
      </template>
    </div>
  </div>
  <div class="poke-tb" v-else-if="navData.navIndex === 2">
    <template v-for="pokeItem in pokedex" v-bind:key="pokeItem.id">
      <template
        v-for="sleepItem in SLEEP_STYLE"
        v-bind:key="`${sleepItem.pokeId}_${sleepItem.id}`"
      >
        <div class="poke-tb__item" v-if="pokeItem.id === sleepItem.pokeId">
          <CptSleepStyle :sleepItem="sleepItem" :showKey="['sleepType']">
            <p v-if="sleepItem.id">
              {{ sleepItem.id }}
            </p>
            <p v-if="SPO_DATA[sleepItem.id]">
              spoId: {{ SPO_DATA[sleepItem.id].id }}
            </p>
            <p v-if="SPO_DATA[sleepItem.id]">
              spo: {{ getSPOById(sleepItem.id) }}
            </p>
          </CptSleepStyle>
        </div>
      </template>
    </template>
  </div>
</template>