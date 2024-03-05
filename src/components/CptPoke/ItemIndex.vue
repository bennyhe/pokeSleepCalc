<script setup>
import { defineProps } from 'vue'
import { pokedex } from '../../config/pokedex.js'
import { toHM } from '../../utils/index.js'
import {
  POKE_TYPES,
  FOOD_TYPES,
  BERRY_TYPES,
  SKILL_TYPES,
  SLEEP_TYPES
} from '../../config/valKey.js'
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
</script>


<template>
  <div
    class="cpt-pokemon cpt-pokemon--l"
    v-if="pokeId"
    :class="{ shiny: isShiny }"
  >
    <!-- #{{ pokeId }} -->
    <div class="cpt-pokemon__pic">
      <img v-lazy="`./img/pokedex/${pokeId}.png`" :alt="pokedex[pokeId].name" />
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
      {{ SLEEP_TYPES[pokedex[pokeId].sleepType] }}
    </div>
    <p
      v-if="
        pokedex[pokeId].pokeType >= 0 &&
        props.showKey &&
        props.showKey.includes('pokeType')
      "
      :class="`cpt-pokemon__poketype${pokedex[pokeId].pokeType}`"
    >
      {{ POKE_TYPES[pokedex[pokeId].pokeType] }}型
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
          :alt="BERRY_TYPES[pokedex[pokeId].berryType]"
        />
      </div>
      <p>{{ BERRY_TYPES[pokedex[pokeId].berryType] }}</p>
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
      {{ toHM(props.helpSpeed || pokedex[pokeId].helpSpeed, "sec") }}
    </p>
    <p
      class="cpt-pokemon__skill"
      v-if="
        pokedex[pokeId].skillType &&
        props.showKey &&
        props.showKey.includes('skillType')
      "
    >
      {{ SKILL_TYPES[pokedex[pokeId].skillType] }}
    </p>
    <div
      class="cpt-food cpt-food--s"
      v-if="
        pokedex[pokeId].food &&
        pokedex[pokeId].food.type &&
        props.showKey &&
        props.showKey.includes('food')
      "
    >
      <template
        v-for="(allFoodItem, allKey) in pokedex[pokeId].food.type"
        v-bind:key="allKey"
      >
        <div class="cpt-food__item">
          <img
            v-lazy="`./img/food/${allFoodItem}.png`"
            :alt="FOOD_TYPES[allFoodItem]"
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
              :alt="FOOD_TYPES[allFoodItem]"
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
    <p class="cpt-pokemon__name">
      <span v-if="isShiny" class="sptime">闪光</span>
      {{ pokedex[pokeId].name }}
    </p>
  </div>
</template>