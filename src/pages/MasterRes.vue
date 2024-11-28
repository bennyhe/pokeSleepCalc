<script setup>
import { ref } from 'vue'
import {
  formatTime,
  getNum,
  getDecimalNumber,
  getStageLevelPicId
} from '../utils/index.js'
import { masterRes } from '../config/masterRes/index.js'
import { gameMap } from '../config/game.js'
import { SLEEP_TYPES } from '../config/valKey.js'
const getTimes = 4000
const sleepTypeToIndex = {
  999: 3,
  1: 0,
  2: 1,
  3: 2
}
const showMax = {
  num: 99
}
const pageData = ref({
  curMap: 0
})
const handleClickChangeMap = id => {
  pageData.value.curMap = id
}
</script>

<template>
  <h2>Mater 20 Results</h2>
  <div class="page-inner cpt-tips">
    <p>最后更新：{{ formatTime(1731811757726) }}</p>
    <p>可能因为游戏更新会导致有修改，本人对此不负任何责任。</p>
  </div>
  <el-form label-width="90px">
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
  </el-form>
  <div
    v-for="(cItem, cKey) in SLEEP_TYPES"
    v-bind:key="`${gameMap[pageData.curMap].id}_${tdKey}_${cItem}`"
  >
    <div class="i i-sleeptype" :class="`i i-sleeptype--${cKey}`">
      {{ $t(`SLEEP_TYPES.${cKey}`) }}
    </div>
    <h4>
      <img
        class="icon"
        v-lazy="`./img/ui/${getStageLevelPicId('大师20')}.png`"
      />
      大师20-{{ masterRes.level20.peaceTime.name }}
    </h4>
    <template
      v-for="(tdItem, tdKey) in masterRes.level20.peaceTime.list.slice(
        pageData.curMap + sleepTypeToIndex[cKey] * 6,
        pageData.curMap + sleepTypeToIndex[cKey] * 6 + 1
      )"
      v-bind:key="`${gameMap[pageData.curMap].id}_${tdKey}`"
    >
      <h3>
        <img class="icon" v-lazy="`./img/ui/energy.png`" />
        {{ getNum(tdItem.basePoint) }}-{{ getNum(tdItem.allPoint) }}
        <span class="extra"
          >({{ tdItem.res.length }}{{ $t(`OPTIONS.one`) }})</span
        >
      </h3>
      <div
        class="cpt-avatar"
        v-for="(hopeItem, hopeKey) in tdItem.res"
        v-bind:key="hopeItem.pokeId"
      >
        <template v-if="hopeKey < showMax.num">
          <img
            class="cpt-avatar__pic"
            v-lazy="`./img/pokedex/${hopeItem.pokeId}.png`"
            :alt="$t(`POKEMON_NAME.${hopeItem.pokeId}`)"
          />
          <p>{{ getDecimalNumber(hopeItem.count / getTimes, 2) }}</p>
        </template>
      </div>
    </template>
    <template v-if="masterRes.level20.actTime.list.length > 0">
      <h4>
        <img
          class="icon"
          v-lazy="`./img/ui/${getStageLevelPicId('大师20')}.png`"
        />
        大师20-{{ masterRes.level20.actTime.name }}
      </h4>
      <template
        v-for="(tdItem, tdKey) in masterRes.level20.actTime.list.slice(
          pageData.curMap + sleepTypeToIndex[cKey] * 6,
          pageData.curMap + sleepTypeToIndex[cKey] * 6 + 1
        )"
        v-bind:key="`${gameMap[pageData.curMap].id}_${tdKey}`"
      >
        <h3>
          <img class="icon" v-lazy="`./img/ui/energy.png`" />
          {{ getNum(tdItem.basePoint) }}-{{ getNum(tdItem.allPoint) }}
          <span class="extra"
            >({{ tdItem.res.length }}{{ $t(`OPTIONS.one`) }})</span
          >
        </h3>
        <div
          class="cpt-avatar"
          v-for="(hopeItem, hopeKey) in tdItem.res"
          v-bind:key="hopeItem.pokeId"
        >
          <template v-if="hopeKey < showMax.num">
            <img
              class="cpt-avatar__pic"
              v-lazy="`./img/pokedex/${hopeItem.pokeId}.png`"
              :alt="$t(`POKEMON_NAME.${hopeItem.pokeId}`)"
            />
            <p>{{ getDecimalNumber(hopeItem.count / getTimes, 2) }}</p>
          </template>
        </div>
      </template>
    </template>
    <template
      v-if="
        pageData.curMap === 5 && masterRes.level20.extraTime.list.length > 0
      "
    >
      <h4>
        <img
          class="icon"
          v-lazy="`./img/ui/${getStageLevelPicId('大师20')}.png`"
        />
        大师20-{{ masterRes.level20.extraTime.name }}
      </h4>
      <template
        v-for="(tdItem, tdKey) in masterRes.level20.extraTime.list.slice(
          pageData.curMap + sleepTypeToIndex[cKey] * 6,
          pageData.curMap + sleepTypeToIndex[cKey] * 6 + 1
        )"
        v-bind:key="`${gameMap[pageData.curMap].id}_${tdKey}`"
      >
        <h3>
          <img class="icon" v-lazy="`./img/ui/energy.png`" />
          {{ getNum(tdItem.basePoint) }}-{{ getNum(tdItem.allPoint) }}
          <span class="extra"
            >({{ tdItem.res.length }}{{ $t(`OPTIONS.one`) }})</span
          >
        </h3>
        <div
          class="cpt-avatar"
          v-for="(hopeItem, hopeKey) in tdItem.res"
          v-bind:key="hopeItem.pokeId"
        >
          <template v-if="hopeKey < showMax.num">
            <img
              class="cpt-avatar__pic"
              v-lazy="`./img/pokedex/${hopeItem.pokeId}.png`"
              :alt="$t(`POKEMON_NAME.${hopeItem.pokeId}`)"
            />
            <p>{{ getDecimalNumber(hopeItem.count / getTimes, 2) }}</p>
          </template>
        </div>
      </template>
    </template>
  </div>
</template>