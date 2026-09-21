<script setup>
import { ref, computed, onMounted } from 'vue'
import { Place } from '@element-plus/icons-vue'
import CptEnergyItem from '../components/CptEnergy/EnergyItem.vue'
import CptEnergyRowItem from '../components/CptEnergy/EnergyRowItem.vue'
import CptDialogFilterPoke from '../components/DialogFilterPoke/ItemIndex.vue'
import CptTypeRankItem from '../components/OneDayTypeRank/RankItem.vue'

import { sortInObjectOptions, containsAny, get, resolvePokeSkill } from '../utils/index.js'
import {
  fnGetFoodIndexLimits,
  fnGenerateFoodCombinations,
  getSkillLevel
} from '../utils/helpcalc.js'
import {
  getOneDayEnergy,
  getOneDayHelpCount,
  getRankPokemonsByTypes
} from '../utils/energy.js'
import {
  gameMap,
  areaBonusMax,
  POKEMON_MAX_LEVEL,
  SP_POKEMONS
} from '../config/game.js'
import { orgResetObject } from '../config/filterDialog.js'
import { pokedex } from '../config/pokedex.js'

import i18n from '../i18n'
const { t } = i18n.global

import GAME_VALS from '../i18n/lang/cn/game.js'
const { BERRY_TYPES } = GAME_VALS

const newGameMap = [...gameMap]
// 紧凑能量行：榜单池取去重后前 30，每页 10 条独立分页（仅此页面）
const ENERGY_ROW_MAX = 30
const ENERGY_ROW_PAGE_SIZE = 10
const energyRowPageIndex = ref(1)
// 搜「十项全能」时，能量行榜单只保留这些子技能（能量填充M/S + 树果递增），各取最高总能量一条
const MEW_RANK_SUBSKILLS = [2, 5, 21]
const pageData = ref({
  curMap: 0,
  orgResRankArr: [],
  resRankArr: [],
  lv: POKEMON_MAX_LEVEL,
  curPageIndex: 1,
  pageSize: 102,
  areaBonus: areaBonusMax,
  skillMaxLevel: false,
  collapseActName: ''
})
const foodResRank = ref({})
const berryResRank = ref({})
const skillResRank = ref({})

for (const key in BERRY_TYPES) {
  if (Object.hasOwnProperty.call(BERRY_TYPES, key)) {
    newGameMap.push({
      name: t(`BERRY_TYPES.${key}`),
      id: `berry_${t(`BERRY_TYPES.${key}`)}`,
      berry: [+key]
    })
  }
}

// console.log('created')
// 单只宝可梦：带子技能的（如梦幻）按每个子技能展开为多个计算变体，逐条产出能量条目
const pushPokeEnergyEntries = pokeItem => {
  const subs = Array.isArray(pokeItem.subSkills) ? pokeItem.subSkills : []
  const variants = subs.length
    ? subs.map(sub => resolvePokeSkill(pokeItem, sub.id))
    : [pokeItem]
  variants.forEach((v, variantKey) => {
    // 技能等级：满级开关开启时取生效技能上限，否则 Lv.1（配置显式指定则沿用）
    v.skilllevel =
      v.skilllevel ||
      (pageData.value.skillMaxLevel && v.skillType
        ? Math.max(...getSkillLevel(v.skillType))
        : 1)
    v.oneDayHelpCount = getOneDayHelpCount(v.helpSpeed, v.foodPer, v.skillPer)
    if (v.food) {
      // 如果有食材排列
      // 带子技能的梦幻：仅「揮指(13)」遍历全部食材组合，其余子技能只套「蔥蔥蔥」一条，避免条目爆炸
      let tempFoodType
      if (subs.length === 0 || v.skillType === 13) {
        const limits = fnGetFoodIndexLimits(v.id, 60)
        tempFoodType = fnGenerateFoodCombinations(
          limits,
          SP_POKEMONS.includes(+v.id)
        )
        if (v.id === 151) {
          // 梦幻60有个尾巴
          tempFoodType.push([0, 0, 7])
        }
      } else {
        // 蔥蔥蔥：food.type 中「粗枝大蔥(id 1)」所在的 uniform 组合
        const onionIdx = Math.max(0, v.food.type.indexOf(1))
        tempFoodType = [[onionIdx, onionIdx, onionIdx]]
      }

      tempFoodType.forEach((arrFTItem, arrFTKey) => {
        const useFood = [
          v.food.type[arrFTItem[0]],
          v.food.type[arrFTItem[1]],
          v.food.type[arrFTItem[2]]
        ]
        // if(SP_POKEMONS.includes(+v.id)) {
        //   useFood = [
        //     v.food.type[arrFTItem[0]]
        //   ]
        // }
        const isHasBerrys = [0, 1]
        isHasBerrys.forEach((oddItem, oddKey) => {
          const is2n = (oddKey + 1) % 2 === 0
          pageData.value.resRankArr.push({
            ...v,
            pokemonId: v.id,
            isFirstPokeFood: variantKey === 0 && oddKey === 0,
            isFirstPoke: variantKey === 0 && oddKey === 0 && arrFTKey === 0,
            isFirstSkillEntry: oddKey === 0 && arrFTKey === 0,
            nameExtra: is2n ? t('SHORT_SKILL.berrys') : '',
            ...getOneDayEnergy(
              v,
              pageData.value.lv,
              useFood,
              is2n ? true : false,
              false,
              +pageData.value.areaBonus
            )
          })
        })
      })
    } else {
      [0, 1].forEach((arrFTItem, arrFTKey) => {
        const is2n = (arrFTKey + 1) % 2 === 0
        pageData.value.resRankArr.push({
          ...v,
          isFirstPoke: variantKey === 0 && arrFTKey === 0,
          isFirstSkillEntry: arrFTKey === 0,
          pokemonId: v.id,
          nameExtra: is2n ? t('SHORT_SKILL.berrys') : '',
          ...getOneDayEnergy(
            v,
            pageData.value.lv,
            [],
            is2n ? true : false,
            false,
            +pageData.value.areaBonus
          )
        })
      })
    }
  })
}

// 依据当前等级/区域/技能等级口径重建产出与三大排行（技能等级切换时需重跑）
const buildRankData = () => {
  pageData.value.resRankArr = []
  for (const key in pokedex) {
    if (Object.hasOwnProperty.call(pokedex, key)) {
      const pokeItem = { ...pokedex[key] }
      if (pokeItem.helpSpeed && pokeItem.foodPer) {
        pokeItem.helpSpeed = Math.floor(
          pokeItem.helpSpeed * (1 - (pageData.value.lv - 1) * 0.002)
        )
        pushPokeEnergyEntries(pokeItem)
      }
    }
  }
  pageData.value.orgResRankArr = sortInObjectOptions(
    pageData.value.resRankArr,
    ['oneDayEnergy']
  )
  // console.log(pageData.value.orgResRankArr)
  pageData.value.resRankArr = JSON.parse(
    JSON.stringify(pageData.value.orgResRankArr)
  )

  getRankPokemonsByTypes(
    pageData.value.orgResRankArr.filter(pItem => pItem.isFirstPokeFood),
    res => {
      foodResRank.value = res.tempFoodResRank
    }
  )
  getRankPokemonsByTypes(
    pageData.value.orgResRankArr.filter(pItem => pItem.isFirstPoke),
    res => {
      berryResRank.value = res.tempBerryResRank
    }
  )
  // 技能排行按「各子技能」分别入组（梦幻会同时出现在其每个子技能组）
  getRankPokemonsByTypes(
    pageData.value.orgResRankArr.filter(pItem => pItem.isFirstSkillEntry),
    res => {
      skillResRank.value = res.tempSkillResRank
    }
  )
  // console.log(foodResRank.value, berryResRank.value, skillResRank.value)
}
onMounted(() => {
  buildRankData()
})
// 切换技能等级 Lv.1 ↔ 满级：重建数据后沿用当前岛屿/筛选口径
const handleChangeSkillLevelMode = () => {
  buildRankData()
  getChangeOptionsAfterData()
}

const FILTER_OBJECT = ref(JSON.parse(JSON.stringify(orgResetObject)))
const handleClickFilterReset = () => {
  FILTER_OBJECT.value = JSON.parse(JSON.stringify(orgResetObject))
  getChangeOptionsAfterData()
}
const getChangeOptionsAfterData = () => {
  energyRowPageIndex.value = 1
  // if (pageData.value.curMap === 0) {
  //   pageData.value.resRankArr = JSON.parse(
  //     JSON.stringify(pageData.value.orgResRankArr)
  //   )
  // } else {
  const newRes = []
  const isUseFilter = true
  pageData.value.orgResRankArr.forEach(pokeItem => {
    // console.log(pokeItem)
    let addIn = true
    if (isUseFilter) {
      if (FILTER_OBJECT.value.pokeTypes.length > 0) {
        addIn =
          addIn &&
          FILTER_OBJECT.value.pokeTypes.includes(
            pokedex[pokeItem.pokemonId].pokeType
          )
      }
      if (FILTER_OBJECT.value.berrys.length > 0) {
        addIn =
          addIn &&
          FILTER_OBJECT.value.berrys.includes(
            pokedex[pokeItem.pokemonId].berryType
          )
      }
      if (
        FILTER_OBJECT.value.foods.length > 0 &&
        pokeItem.useFoods &&
        pokeItem.useFoods.length > 0
      ) {
        addIn =
          addIn && containsAny(FILTER_OBJECT.value.foods, pokeItem.useFoods)
      }
      if (FILTER_OBJECT.value.mainSkills.length > 0) {
        // 生效技能 或 基础技能 任一命中即可：
        // 梦幻基础技能=33(十项全能)，选「十项全能」应出它全部变体；
        // 其子技能变体生效技能=对应 id，选「树果递增(21)」应只出该变体；
        // 普通宝可梦两者相同，行为不变。
        const selectedSkills = FILTER_OBJECT.value.mainSkills
        addIn =
          addIn &&
          (selectedSkills.includes(pokeItem.skillType) ||
            selectedSkills.includes(pokedex[pokeItem.pokemonId].skillType))
      }
    }
    if (addIn) {
      newRes.push({
        ...pokeItem,
        ...getOneDayEnergy(
          pokeItem,
          pageData.value.lv,
          pokeItem.useFoods,
          pokeItem.nameExtra.indexOf('S') > -1,
          newGameMap[pageData.value.curMap].berry.includes(pokeItem.berryType),
          +pageData.value.areaBonus
        )
      })
    }
  })
  pageData.value.resRankArr = sortInObjectOptions(newRes, ['oneDayEnergy'])
  // }
}
const handleClickChangeMap = id => {
  pageData.value.curMap = id
  pageData.value.curPageIndex = 1

  getChangeOptionsAfterData()
}
const handleChangeBonus = () => {
  getChangeOptionsAfterData()
}
const handleClickFilterPokes = (typeKey, val) => {
  if (FILTER_OBJECT.value[typeKey].includes(val)) {
    FILTER_OBJECT.value[typeKey] = FILTER_OBJECT.value[typeKey].filter(
      item => item !== val
    )
  } else {
    FILTER_OBJECT.value[typeKey].push(val)
  }
  getChangeOptionsAfterData()
}
const filterOnceTop = (dataList, typeKey, topCount) => {
  const hasList = []
  const res = []
  for (let i = 0; i < dataList.length && res.length < topCount; i++) {
    const pokeItem = dataList[i]
    if (get('pokemonId', pokeItem) && !hasList.includes(pokeItem.pokemonId)) {
      res.push({ ...pokeItem })
      hasList.push(pokeItem.pokemonId)
    }
  }
  return res.slice(0, topCount)
}
// 紧凑能量行：默认取去重后前 ENERGY_ROW_MAX 条作为榜单池，再按页切分；
// 搜「十项全能(33)」时走下方 energyRowPool 的白名单分支
const energyRowPool = computed(() => {
  const list = pageData.value.resRankArr
  if (FILTER_OBJECT.value.mainSkills.includes(33)) {
    const best = new Map()
    list.forEach(item => {
      if (
        MEW_RANK_SUBSKILLS.includes(item.selectedSubId) &&
        !best.has(item.selectedSubId)
      ) {
        best.set(item.selectedSubId, item)
      }
    })
    // 白名单变体被其它筛选项排除干净时，回退到常规去重前 30 榜，避免空榜
    return best.size
      ? Array.from(best.values())
      : filterOnceTop(list, 'all', ENERGY_ROW_MAX)
  }
  return filterOnceTop(list, 'all', ENERGY_ROW_MAX)
})
const energyRowPageList = computed(() => {
  const start = (energyRowPageIndex.value - 1) * ENERGY_ROW_PAGE_SIZE
  return energyRowPool.value.slice(start, start + ENERGY_ROW_PAGE_SIZE)
})

// const handleClickSlider = () => {
//   getChangeOptionsAfterData()
// }
// console.log('init page onedayenergy...')
</script>

<template>
  <h2>{{ $t("PAGE_TITLE.onedayenergy", [pageData.lv]) }}</h2>
  <el-form label-width="4.5em">
    <!-- S 当前岛屿 -->
    <el-form-item>
      <template #label>
        <div>
          <el-icon size="16" style="vertical-align: middle"><Place /></el-icon
          >{{ $t("OPTIONS.formLableCurIland") }}
        </div>
      </template>
      <ul class="cpt-select-list cpt-select-list--iland">
        <template v-for="(mapItem, mapIndex) in newGameMap">
          <li
            class="cpt-select-list__item"
            v-if="!(mapItem.id.indexOf('berry_') > -1)"
            :key="mapItem.id"
            :class="{ cur: pageData.curMap === mapIndex }"
            @click="handleClickChangeMap(mapIndex)"
          >
            <div class="cpt-select-list__name">
              {{ $t(`ILAND.${mapItem.id}`) }}
              <div>
                <div
                  class="cpt-food cpt-food--s berry"
                  v-for="(berryItem, berryKey) in mapItem.berry"
                  :key="berryKey"
                >
                  <div class="cpt-food__item">
                    <img
                      v-if="berryItem !== '?'"
                      v-lazy="`${IMG_PATH}berry/${berryItem}.png`"
                      :alt="$t(`BERRY_TYPES.${berryItem}`)"
                    />
                    <template v-else>?</template>
                  </div>
                </div>
              </div>
            </div>
            <img
              v-if="mapItem.pic"
              class="cpt-select-list__bg"
              v-lazy="`${IMG_PATH}ui/${mapItem.pic}.png`"
              :alt="mapItem.name"
            />
          </li>
        </template>
      </ul>
    </el-form-item>
    <!-- E 当前岛屿 -->
    <!-- S 2倍树果 -->
    <el-form-item :label="$t('OPTIONS.doubleEnergy')">
      <ul class="cpt-select-list cpt-select-list--berry">
        <template v-for="(mapItem, mapIndex) in newGameMap">
          <li
            class="cpt-select-list__item"
            v-if="mapItem.id.indexOf('berry_') > -1"
            :key="mapItem.id"
            :class="{ cur: pageData.curMap === mapIndex }"
            @click="handleClickChangeMap(mapIndex)"
          >
            <div class="cpt-select-list__name">
              {{ mapItem.name }}
              <div>
                <div
                  class="cpt-food cpt-food--s berry"
                  v-for="(berryItem, berryKey) in mapItem.berry"
                  :key="berryKey"
                >
                  <div class="cpt-food__item">
                    <img
                      v-if="berryItem !== '?'"
                      v-lazy="`${IMG_PATH}berry/${berryItem}.png`"
                      :alt="$t(`BERRY_TYPES.${berryItem}`)"
                    />
                    <template v-else>?</template>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </template>
      </ul>
    </el-form-item>
    <!-- E 2倍树果 -->
    <!-- <el-form-item label="宝可梦等级">
      <el-slider
        v-model="pageData.lv"
        show-input
        :min="50"
        :max="55"
        @change="handleClickSlider()"
      />
    </el-form-item> -->
    <el-form-item :label="$t('PROP.areaBonus')">
      <div class="el-form-slider--bonus">
        <el-slider
          @change="handleChangeBonus()"
          size="small"
          v-model="pageData.areaBonus"
          show-input
          show-stops
          :min="0"
          :max="areaBonusMax"
          :step="5"
        />
      </div>
    </el-form-item>
    <!-- 技能等级开关：Lv.1 ↔ 满级（文本用语言无关 token，避免新增 i18n） -->
    <el-form-item :label="$t('PROP.mainSkillLevel')">
      <el-switch
        v-model="pageData.skillMaxLevel"
        @change="handleChangeSkillLevelMode()"
        style="--el-switch-on-color: #ffaf00"
        active-text="MAX"
        inactive-text="Lv.1"
      />
    </el-form-item>
  </el-form>
  <div class="page-inner">
    <div class="cpt-tips">
      <p>* {{ $t("TIPS.energy1") }}</p>
      <p>* {{ $t("TIPS.energy2") }}</p>
    </div>
  </div>
  <div class="typerank">
    <el-collapse accordion v-model="pageData.collapseActName">
      <el-collapse-item name="food">
        <template #title><h3>一日食材排行</h3> </template>
        <CptTypeRankItem :dataList="foodResRank" showType="food" :showMax="6" />
      </el-collapse-item>
      <el-collapse-item name="berry">
        <template #title> <h3>一日树果排行(不含树果S)</h3> </template>
        <CptTypeRankItem
          :dataList="berryResRank"
          showType="berry"
          :showMax="3"
        />
      </el-collapse-item>
      <el-collapse-item name="skill">
        <template #title> <h3>一日技能排行</h3> </template>
        <CptTypeRankItem
          :dataList="skillResRank"
          showType="skill"
          :showMax="5"
        />
      </el-collapse-item>
    </el-collapse>
  </div>
  <div class="page-inner mt3">
    <CptDialogFilterPoke
      :filterObj="FILTER_OBJECT"
      :handleClickFilterPokes="handleClickFilterPokes"
      :showKey="['pokeType', 'berryType', 'foodType', 'mainSkill', 'resetBtn']"
      :handleClickFilterReset="handleClickFilterReset"
    />
  </div>
  <div class="cpt-energyrow" v-if="energyRowPageList.length > 0">
    <template
      v-for="(pokeItem, pokeKey) in energyRowPageList"
      :key="`area${pageData.curMap}_${
        pokeItem.pokemonId
      }_${pokeKey}_${pokeItem.useFoods.join('')}_${pokeItem.nameExtra || ''}_2`"
    >
      <CptEnergyRowItem
        :pokeItem="pokeItem"
        :pokeKey="(energyRowPageIndex - 1) * ENERGY_ROW_PAGE_SIZE + pokeKey"
        :maxEnergy="energyRowPool[0].oneDayEnergy"
        :isHightLightBerry="
          newGameMap[pageData.curMap].berry.includes(pokeItem.berryType)
        "
      />
    </template>
    <div class="cpt-pagination" v-if="energyRowPool.length > ENERGY_ROW_PAGE_SIZE">
      <el-pagination
        small
        background
        layout="prev, pager, next"
        :total="energyRowPool.length"
        :page-size="ENERGY_ROW_PAGE_SIZE"
        v-model:current-page="energyRowPageIndex"
      />
    </div>
  </div>
  <div
    class="cpt-pagination"
    v-if="pageData.resRankArr.length / pageData.pageSize > 1"
  >
    <el-pagination
      layout="prev, pager, next"
      :total="pageData.resRankArr.length"
      :page-size="pageData.pageSize"
      v-model:current-page="pageData.curPageIndex"
    />
  </div>
  <div class="poke-tb" v-if="pageData.resRankArr.length > 0">
    <template v-for="(pokeItem, pokeKey) in pageData.resRankArr">
      <CptEnergyItem
        :pokeItem="pokeItem"
        :pokeKey="pokeKey"
        :showKey="[
          'helpSpeed',
          'helpSpeedHM',
          'berry',
          'pokeType',
          'foodPer',
          'skillPer',
          'skillType',
        ]"
        :isHightLightBerry="
          newGameMap[pageData.curMap].berry.includes(pokeItem.berryType)
        "
        v-if="
          pokeKey >= (pageData.curPageIndex - 1) * pageData.pageSize &&
          pokeKey <
            (pageData.curPageIndex - 1) * pageData.pageSize + pageData.pageSize
        "
        :key="`area${pageData.curMap}_${
          pokeItem.pokemonId
        }_${pokeKey}_${pokeItem.useFoods.join('')}_${pokeItem.nameExtra || ''}`"
      />
    </template>
  </div>
  <div class="cpt-empty" v-else>{{ $t("OPTIONS.noHasPokemons") }}</div>
  <div
    class="cpt-pagination"
    v-if="pageData.resRankArr.length / pageData.pageSize > 1"
  >
    <el-pagination
      layout="prev, pager, next"
      :total="pageData.resRankArr.length"
      :page-size="pageData.pageSize"
      v-model:current-page="pageData.curPageIndex"
    />
  </div>
</template>