<script setup>
import { ref, defineProps } from 'vue'
import SvgIcon from '../SvgIcon/IconItem.vue'
import CptPoke from '../CptPoke/ItemIndex.vue'

import { getNum } from '../../utils/index.js'

import i18n from '../../i18n'
const { t } = i18n.global

const props = defineProps({
  dataList: {
    type: [Array, Object]
  },
  showType: {
    type: [String],
    default: 'food'
  },
  showMax: {
    type: [Number],
    default: 3
  }
})
const rankOpts = ref({
  foodIsMore: false,
  foodMax: 1,
  berryIsMore: false,
  berryMax: 1,
  skillIsMore: false,
  skillMax: 1,
  max: 6
})
const handleClickShowRank = type => {
  rankOpts.value[`${type}IsMore`] = !rankOpts.value[`${type}IsMore`]
  if (rankOpts.value[`${type}IsMore`]) {
    rankOpts.value[`${type}Max`] = rankOpts.value.max
  } else {
    rankOpts.value[`${type}Max`] = 1
  }
}
const getWithData = rItem => {
  if (props.showType === 'berry') {
    return {
      imgUrl: `./img/berry/${rItem.berryId}.png`,
      name: t(`BERRY_TYPES.${rItem.berryId}`)
    }
  } else if (props.showType === 'food') {
    return {
      imgUrl: `./img/food/${rItem.foodId}.png`,
      name: t(`FOOD_TYPES.${rItem.foodId}`)
    }
  }
}
const getCptPokeShowKey = () => {
  const arr = ['helpSpeedHM']
  if (props.showType === 'berry') {
    arr.push('foodPer', 'pokeType')
  } else if (props.showType === 'food') {
    arr.push('foodPer', 'food')
  } else {
    arr.push('skillPer', 'pokeType')
  }
  return arr
}
</script>

<template>
  <el-button
    class="typerank__morebtn"
    size="small"
    @click="handleClickShowRank(showType)"
    :class="{ 'btn--show': rankOpts[`${type}IsMore`] }"
    >{{ $t("OPTIONS.detail2") }}<svgIcon size="small" type="arrowDown"
  /></el-button>
  <div>
    <template
      v-for="(typeRankItem, typeRankKey) in dataList"
      v-bind:key="`type_rank_item_${showType}_${typeRankKey}`"
    >
      <div class="typerank__item" v-if="typeRankItem.rankList.length > 0">
        <h4>
          <template v-if="showType !== 'skill'">
            <img
              class="icon"
              v-lazy="getWithData(typeRankItem).imgUrl"
              :alt="getWithData(typeRankItem).name"
            />
            {{ getWithData(typeRankItem).name }}
          </template>
          <template v-else>
            {{ $t(`SKILL_TYPES.${typeRankItem.skillId}`) }}
          </template>
        </h4>
        <ul>
          <template
            v-for="(pokeItem, pokeKey) in typeRankItem.rankList.slice(
              0,
              showMax
            )"
            v-bind:key="`type_rank_item_${showType}_${typeRankKey}_${pokeKey}`"
          >
            <li v-if="pokeKey < rankOpts[`${showType}Max`]">
              <i class="i i-rank" :class="`i-rank--${pokeKey + 1}`">{{
                pokeKey + 1
              }}</i>
              <CptPoke
                :pokeId="pokeItem.pokemonId"
                :showKey="getCptPokeShowKey()"
                :useFood="pokeItem.useFoodType"
                :helpSpeed="pokeItem.helpSpeed"
              />
              <div
                class="cpt-food all-food typerank__foodres"
                v-if="showType === 'food'"
              >
                <template
                  v-for="(sItemFoodId, sItemFoodKey) in pokeItem
                    .oneDayFoodEnergy.useFoods"
                  v-bind:key="`food_rank_item_${typeRankItem.foodId}_${pokeItem.pokemonId}_sfood_${sItemFoodId}`"
                >
                  <div class="cpt-food__item cur">
                    <img
                      v-lazy="`./img/food/${sItemFoodId}.png`"
                      :alt="$t(`FOOD_TYPES.${sItemFoodId}`)"
                    />
                    <p class="cpt-food__count">
                      {{ pokeItem.oneDayFoodEnergy.count[sItemFoodKey] }}
                    </p>
                  </div>
                </template>
              </div>
              <template v-else-if="showType === 'berry'">
                <div class="cpt-food all-food">
                  <div class="cpt-food__item cur">
                    <img
                      v-lazy="`./img/berry/${typeRankItem.berryId}.png`"
                      :alt="$t(`BERRY_TYPES.${typeRankItem.berryId}`)"
                    />
                    <p class="cpt-food__count">
                      {{ pokeItem.BERRYRANK_COUNT }}
                    </p>
                  </div>
                </div>
                <span class="res">
                  <img class="icon" v-lazy="`./img/ui/energy.png`" />{{
                    getNum(pokeItem.oneDayBerryEnergy)
                  }}
                </span>
              </template>
              <template v-else-if="showType === 'skill'">
                {{ pokeItem.SKILLRANK_COUNT }}次
              </template>
            </li>
          </template>
        </ul>
      </div>
    </template>
  </div>
</template>