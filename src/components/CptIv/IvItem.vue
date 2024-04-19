<script setup>
import { computed, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import SvgIcon from '../SvgIcon/IconItem.vue'
import { pokedex } from '../../config/pokedex.js'
import { NATURE } from '../../config/pokeNature.js'
import { POKE_TYPES } from '../../config/valKey.js'

const { locale } = useI18n()
const localeLangId = computed(() => {
  return locale.value
})
const props = defineProps({
  dataSource: {
    type: [Object]
  },
  pokeId: {
    type: [String, Number]
  },
  isShiny: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <div class="cpt-iv" :class="`lang-${localeLangId}`" v-if="pokeId">
    <span v-if="isShiny" class="shiny">{{ $t("PROP.shiny") }}</span>
    {{ $t(`POKE_TYPES.${pokedex[pokeId].pokeType}`) }}
    <div class="cpt-food cpt-food--s berry">
      <div class="cpt-food__item">
        <img
          v-lazy="`./img/berry/${pokedex[pokeId].berryType}.png`"
          :alt="$t(`BERRY_TYPES.${pokedex[pokeId].berryType}`)"
        />
      </div>
      <p>
        {{ $t(`BERRY_TYPES.${pokedex[pokeId].berryType}`) }}
      </p>
    </div>
    <h4>食材</h4>
    <div
      class="cpt-food all-food"
      v-if="dataSource.useFoods && dataSource.useFoods.length > 0"
    >
      <div
        class="cpt-food__item cur"
        v-for="(foodItem, foodKey) in dataSource.useFoods"
        v-bind:key="`${foodKey}_${foodItem}`"
      >
        <img
          v-lazy="`./img/food/${foodItem}.png`"
          :alt="$t(`FOOD_TYPES.${foodItem}`)"
        />
        <p class="cpt-food__count">
          {{ pokedex[pokeId].food.count[foodItem].num[foodKey] }}
        </p>
      </div>
    </div>
    <div class="mb3" v-else>NULL</div>
    <h4>主技能/副技能</h4>
    <div class="skill">
      <div class="main-skill">
        <div class="main-skill__inner">
          {{ $t(`SKILL_TYPES.${pokedex[pokeId].skillType}`) }}
        </div>
      </div>
      <div
        class="mb3"
        v-for="skillItem in dataSource.skills"
        :key="skillItem.nameId"
      >
        <span class="level">lv{{ skillItem.unlockLevel }}</span>
        <span class="cpt-skill" :class="`cpt-skill--${skillItem.skillRare}`"
          ><SvgIcon type="lock" v-if="skillItem.isLockRare" />{{
            $t(`SUBSKILLS_NAMES.${skillItem.nameId}`)
          }}
        </span>
      </div>
    </div>
    <h4>性格</h4>
    {{ $t(`NATURE_NAMES.${dataSource.natureId}`) }}
    <p
      class="nature-up"
      v-if="NATURE[dataSource.natureId] && NATURE[dataSource.natureId].up"
    >
      {{ $t(`NATURE_UPDOWN.${NATURE[dataSource.natureId].up}`) }}△△
    </p>
    <p
      class="nature-down"
      v-if="NATURE[dataSource.natureId] && NATURE[dataSource.natureId].down"
    >
      {{ $t(`NATURE_UPDOWN.${NATURE[dataSource.natureId].down}`) }}▽▽
    </p>
    <p
      v-if="
        NATURE[dataSource.natureId] &&
        NATURE[dataSource.natureId].up === undefined
      "
    >
      {{ $t("NATURE_UPDOWN.没有性格带来的特色") }}
    </p>
  </div>
</template>