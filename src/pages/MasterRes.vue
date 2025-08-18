<script setup>
import { ref } from 'vue'
import {
  formatTime,
  getNum,
  getDecimalNumber,
  getStageLevelPicId
} from '../utils/index.js'
import CptAvatar from '../components/CptAvatar/ItemIndex.vue'
import { masterRes } from '../config/masterRes/index.js'
import { gameMap } from '../config/game.js'
import { SLEEP_TYPES } from '../config/valKey.js'
import { pokedex } from '../config/pokedex.js'
const getTimes = 4000
const sleepTypeToIndex = {
  999: 3,
  1: 0,
  2: 1,
  3: 2
}
const showMax = {
  num: 399
}
const pageData = ref({
  curMap: 0,
  pokemonId: null,
  areaNum: 7
})
const handleClickChangeMap = id => {
  pageData.value.curMap = id
}
const handleChangePokemon = pokeId => {}
</script>

<template>
  <h2>Mater 20 Results</h2>
  <div class="page-inner cpt-tips">
    <!-- <p>最后更新：{{ formatTime(masterRes.updateTime) }}</p> -->
    <p>可能因为游戏更新会导致有修改，本人对此不负任何责任。</p>
  </div>
  <el-form label-width="90px">
    <!-- S 当前岛屿 -->
    <el-form-item :label="$t('OPTIONS.formLableCurIland')">
      <ul class="cpt-select-list">
        <li
          @click="handleClickChangeMap(mapIndex)"
          v-for="(mapItem, mapIndex) in gameMap"
          v-bind:key="mapItem.id"
        >
          <div
            class="cpt-select-list__item"
            :class="{ cur: pageData.curMap === mapIndex }"
          >
            <div class="cpt-select-list__name">
              {{ $t(`ILAND.${mapItem.id}`) }}
              <div></div>
            </div>
            <img
              v-if="mapItem.pic"
              class="cpt-select-list__bg"
              v-lazy="`./img/ui/${mapItem.pic}.png`"
              :alt="mapItem.name"
            />
          </div>
          <template
            v-for="(cItem, cKey) in SLEEP_TYPES"
            v-bind:key="`${mapItem.id}_${tdKey}_${cItem}`"
          >
            <template
              v-for="(tdItem, tdKey) in masterRes.level20.peaceTime.list.slice(
                mapIndex + sleepTypeToIndex[cKey] * pageData.areaNum,
                mapIndex + sleepTypeToIndex[cKey] * pageData.areaNum + 1
              )"
              v-bind:key="`${mapItem.id}_${tdKey}`"
            >
              <template
                v-for="hopeItem in tdItem.res.slice(0, 1)"
                v-bind:key="hopeItem.pokeId"
              >
                <CptAvatar :pokeId="hopeItem.pokeId">
                  <p>{{ getDecimalNumber(hopeItem.count / getTimes, 2) }}</p>
                </CptAvatar>
              </template>
            </template>
          </template>
        </li>
      </ul>
    </el-form-item>
    <!-- E 当前岛屿 -->
    <el-form-item :label="$t('PROP.pokemon')">
      <div style="width: 100%">
        <el-select
          v-model="pageData.pokemonId"
          filterable
          @change="handleChangePokemon()"
        >
          <template v-for="pokeItem in pokedex" :key="pokeItem.id">
            <el-option
              :label="`${$t(`POKEMON_NAME.${pokeItem.id}`)}-#${pokeItem.id}`"
              :value="pokeItem.id"
            >
              <img
                class="icon"
                v-lazy="`./img/pokedex/${pokeItem.id}.png`"
                :alt="$t(`POKEMON_NAME.${pokeItem.id}`)"
                v-bind:key="pokeItem.id"
              />
              {{ $t(`POKEMON_NAME.${pokeItem.id}`) }}-#{{ pokeItem.id }}
            </el-option>
          </template>
        </el-select>
      </div>
    </el-form-item>
  </el-form>
  <div class="map-pokemons" v-if="pageData.pokemonId">
    <table>
      <thead>
        <tr>
          <td></td>
          <td
            v-for="(cItem, cKey) in SLEEP_TYPES"
            v-bind:key="`${tdKey}_${cItem}`"
          >
            <div class="i i-sleeptype" :class="`i i-sleeptype--${cKey}`">
              {{ $t(`SLEEP_TYPES.${cKey}`) }}
            </div>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(mapItem, mapKey) in gameMap" v-bind:key="mapItem.id">
          <td>
            <div class="cpt-select-list__item cur">
              <div class="cpt-select-list__name">
                {{ $t(`ILAND.${mapItem.id}`) }}
                <div></div>
              </div>
              <img
                v-if="mapItem.pic"
                class="cpt-select-list__bg"
                v-lazy="`./img/ui/${mapItem.pic}.png`"
                :alt="mapItem.name"
              />
            </div>
          </td>
          <td
            v-for="(cItem, cKey) in SLEEP_TYPES"
            v-bind:key="`${tdKey}_${cItem}`"
          >
            <template
              v-for="(tdItem, tdKey) in masterRes.level20.peaceTime.list.slice(
                mapKey + sleepTypeToIndex[cKey] * pageData.areaNum,
                mapKey + sleepTypeToIndex[cKey] * pageData.areaNum + 1
              )"
              v-bind:key="`${gameMap[mapKey].id}_${tdKey}`"
            >
              <template
                v-for="hopeItem in tdItem.res"
                v-bind:key="hopeItem.pokeId"
              >
                <template v-if="pageData.pokemonId === hopeItem.pokeId">
                  <CptAvatar :pokeId="hopeItem.pokeId" :class="'cur-poke'">
                  </CptAvatar>
                  {{ getDecimalNumber(hopeItem.count / getTimes, 2) }}
                </template>
              </template>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div
    class="page-master__list"
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
        pageData.curMap + sleepTypeToIndex[cKey] * pageData.areaNum,
        pageData.curMap + sleepTypeToIndex[cKey] * pageData.areaNum + 1
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
      <template
        v-for="(hopeItem, hopeKey) in tdItem.res"
        v-bind:key="hopeItem.pokeId"
      >
        <CptAvatar
          :pokeId="hopeItem.pokeId"
          v-if="hopeKey < showMax.num"
          :class="{ 'cur-poke': pageData.pokemonId === hopeItem.pokeId }"
        >
          <p>{{ getDecimalNumber(hopeItem.count / getTimes, 2) }}</p>
        </CptAvatar>
      </template>
    </template>
    <div
      class="master-acttime"
      v-if="masterRes.level20.actTime.list.length > 0"
    >
      <h4>
        <img
          class="icon"
          v-lazy="`./img/ui/${getStageLevelPicId('大师20')}.png`"
        />
        大师20-{{ masterRes.level20.actTime.name }}
      </h4>
      <template
        v-for="(tdItem, tdKey) in masterRes.level20.actTime.list.slice(
          pageData.curMap + sleepTypeToIndex[cKey] * pageData.areaNum,
          pageData.curMap + sleepTypeToIndex[cKey] * pageData.areaNum + 1
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
        <template
          v-for="(hopeItem, hopeKey) in tdItem.res"
          v-bind:key="hopeItem.pokeId"
        >
          <CptAvatar
            :pokeId="hopeItem.pokeId"
            v-if="hopeKey < showMax.num"
            :class="{ 'cur-poke': pageData.pokemonId === hopeItem.pokeId }"
          >
            <p>{{ getDecimalNumber(hopeItem.count / getTimes, 2) }}</p>
          </CptAvatar>
        </template>
      </template>
    </div>
    <div
      class="master-extratime"
      v-if="masterRes.level20.extraTime.list.length > 0"
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
          pageData.curMap + sleepTypeToIndex[cKey] * pageData.areaNum,
          pageData.curMap + sleepTypeToIndex[cKey] * pageData.areaNum + 1
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
        <template
          v-for="(hopeItem, hopeKey) in tdItem.res"
          v-bind:key="hopeItem.pokeId"
        >
          <CptAvatar
            :pokeId="hopeItem.pokeId"
            v-if="hopeKey < showMax.num"
            :class="{ 'cur-poke': pageData.pokemonId === hopeItem.pokeId }"
          >
            <p>{{ getDecimalNumber(hopeItem.count / getTimes, 2) }}</p>
          </CptAvatar>
        </template>
      </template>
    </div>
  </div>
</template>