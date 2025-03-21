<script setup>
import { defineProps, computed } from 'vue'
import SvgIcon from '../SvgIcon/IconItem.vue'
import { pokedex } from '../../config/pokedex.js'
import { toHMInLang, get } from '../../utils/index.js'

import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const localeLangId = computed(() => {
  return locale.value
})

const props = defineProps({
  pokeId: {
    type: [Number, String]
  },
  helpSpeed: {
    type: [Number, String]
  },
  foodPer: {
    type: [Number, String]
  },
  skillPer: {
    type: [Number, String]
  },
  maxcarry: {
    type: [Number, String]
  },
  evotimes: {
    type: [Number, String]
  },
  useFood: {
    type: [Array]
  },
  showKey: {
    type: Array
  },
  isHightLightBerry: {
    type: Boolean
  },
  isShiny: {
    type: Boolean,
    default: false
  }
})
const getFoodType = () => {
  if(get('useFood', props, 1)) {
    return props.useFood
  }
  if(get('food.type', pokedex[props.pokeId], 1)) {
    return pokedex[props.pokeId].food.type
  }
  return []
}
</script>


<template>
  <div
    class="cpt-pokemon cpt-pokemon--l"
    v-if="pokeId && pokedex[pokeId]"
    :class="{ shiny: isShiny }"
  >
    <!-- #{{ pokeId }} -->
    <div class="cpt-pokemon__pic">
      <img
        v-lazy="`./img/pokedex/${isShiny ? 'shiny/' : ''}${pokeId}.png`"
        :alt="$t(`POKEMON_NAME.${pokeId}`)"
      />
    </div>
    <div
      class="i i-sleeptype"
      :class="`i i-sleeptype--${pokedex[pokeId].sleepType}`"
      v-if="
        pokedex[pokeId].sleepType &&
        props.showKey &&
        props.showKey.includes('sleepType')
      "
    >
      {{ $t(`SLEEP_TYPES.${pokedex[pokeId].sleepType}`) }}
    </div>
    <div v-if="
          (pokedex[pokeId].friendship &&
          props.showKey &&
          props.showKey.includes('friendship')) ||
          (pokedex[pokeId].maxcarry &&
          props.showKey &&
          props.showKey.includes('maxcarry')) ||
          ((props.evotimes!==undefined) &&
          props.showKey &&
          props.showKey.includes('evotimes') && pokedex[pokeId].evoLineKey > 0)
        ">
      <span
        v-if="
          pokedex[pokeId].friendship &&
          props.showKey &&
          props.showKey.includes('friendship')
        "
        class="cpt-pokemon__withicon cpt-pokemon__friendship"
      >
        <SvgIcon type="love" size="small" />{{ pokedex[pokeId].friendship }}
      </span>
      <span
        v-if="
          pokedex[pokeId].maxcarry &&
          props.showKey &&
          props.showKey.includes('maxcarry')
        "
        class="cpt-pokemon__withicon cpt-pokemon__maxcarry"
      >
        <SvgIcon type="carry" size="small" />{{ props.maxcarry || pokedex[pokeId].maxcarry }}
      </span>
      <span
        v-if="
          (props.evotimes!==undefined) &&
          props.showKey &&
          props.showKey.includes('evotimes') &&
          pokedex[pokeId].evoLineKey > 0
        "
        class="cpt-pokemon__withicon cpt-pokemon__evotimes"
      >
        <SvgIcon type="evo" size="small" />{{ props.evotimes }}
      </span>
    </div>
    <p
      v-if="
        pokedex[pokeId].pokeType >= 0 &&
        props.showKey &&
        props.showKey.includes('pokeType')
      "
      :class="`cpt-pokemon__poketype${pokedex[pokeId].pokeType}`"
    >
      {{ $t(`POKE_TYPES.${pokedex[pokeId].pokeType}`) }}
    </p>
    <div
      class="cpt-food cpt-food--s berry"
      :class="{ 'berry--hl': isHightLightBerry }"
      v-if="
        pokedex[pokeId].berryType &&
        props.showKey &&
        props.showKey.includes('berry')
      "
    >
      <div class="cpt-food__item">
        <img
          v-lazy="`./img/berry/${pokedex[pokeId].berryType}.png`"
          :alt="$t(`BERRY_TYPES.${pokedex[pokeId].berryType}`)"
        />
      </div>
      <p>{{ $t(`BERRY_TYPES.${pokedex[pokeId].berryType}`) }}</p>
    </div>
    <p
      v-if="
        pokedex[pokeId].helpSpeed &&
        props.showKey &&
        props.showKey.includes('helpSpeed')
      "
    >
      {{ props.helpSpeed || pokedex[pokeId].helpSpeed }}s
    </p>
    <p
      class="cpt-pokemon__hshm"
      v-if="
        pokedex[pokeId].helpSpeed &&
        props.showKey &&
        props.showKey.includes('helpSpeedHM')
      "
    >
      {{
        toHMInLang(
          props.helpSpeed || pokedex[pokeId].helpSpeed,
          "sec",
          localeLangId
        )
      }}
    </p>
    <p
      class="cpt-pokemon__skill"
      v-if="
        pokedex[pokeId].skillType &&
        props.showKey &&
        props.showKey.includes('skillType')
      "
    >
      {{ $t(`SKILL_TYPES.${pokedex[pokeId].skillType}`) }}
    </p>
    <p
      v-if="
        pokedex[pokeId].skillPer &&
        props.showKey &&
        props.showKey.includes('skillPer')
      "
      class="cpt-pokemon__skillper"
    >
      技{{ props.skillPer || pokedex[pokeId].skillPer }}%
    </p>
    <p
      v-if="
        pokedex[pokeId].foodPer &&
        props.showKey &&
        props.showKey.includes('foodPer')
      "
      class="cpt-pokemon__foodper"
    >
      食{{ props.foodPer || pokedex[pokeId].foodPer }}%
    </p>
    <div
      class="cpt-food cpt-food--s"
      v-if="
        getFoodType().length > 0 &&
        props.showKey &&
        props.showKey.includes('food')
      "
    >
      <template
        v-for="(allFoodItem, allKey) in getFoodType()"
        v-bind:key="allKey"
      >
        <div class="cpt-food__item">
          <img
            v-lazy="`./img/food/${allFoodItem}.png`"
            :alt="$t(`FOOD_TYPES.${allFoodItem}`)"
          />
        </div>
      </template>
    </div>
    <div
      class="cpt-food cpt-food--s"
      v-if="
        pokedex[pokeId].food &&
        pokedex[pokeId].food.type &&
        props.showKey &&
        props.showKey.includes('fullFood')
      "
    >
      <div v-for="(subFoodItem, subKey) in 3" v-bind:key="subKey">
        <template
          v-for="(allFoodItem, allKey) in pokedex[pokeId].food.type"
          v-bind:key="allKey"
        >
          <div
            class="cpt-food__item"
            v-if="pokedex[pokeId].food.count[allFoodItem].num[subKey] > 0"
          >
            <img
              v-lazy="`./img/food/${allFoodItem}.png`"
              :alt="$t(`FOOD_TYPES.${allFoodItem}`)"
            />
            <div
              class="cpt-food__count"
              v-if="pokedex[pokeId].food.count[allFoodItem].num[subKey] > 0"
            >
              {{ pokedex[pokeId].food.count[allFoodItem].num[subKey] }}
            </div>
          </div>
        </template>
      </div>
    </div>
    <p class="cpt-pokemon__name">
      <span v-if="isShiny" class="sptime">{{ $t("PROP.shiny") }}</span>
      {{ $t(`POKEMON_NAME.${pokeId}`) }}
      <slot name="pokeNameAfter"/>
    </p>
  </div>
</template>