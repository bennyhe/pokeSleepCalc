<script setup>
import { defineProps } from 'vue'
import { pokedex } from '../../config/pokedex.js'
import { POKE_TYPES, FOOD_TYPES, BERRY_TYPES, SKILL_TYPES } from '../../config/valKey.js'
const props = defineProps({
  pokeId: {
    type: [Number, String]
  },
  showKey: {
    type: Array
  }
})
</script>


<template>
  <div class="cpt-pokemon cpt-pokemon--l">
    <div class="cpt-pokemon__pic">
      <img v-lazy="`./img/pokedex/${pokeId}.png`" :alt="pokedex[pokeId].name" />
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
      {{ pokedex[pokeId].helpSpeed }}s
    </p>
    <p class="cpt-pokemon__skill"
      v-if="
        pokedex[pokeId].skillType &&
        props.showKey &&
        props.showKey.includes('skillType')
      "
    >
      {{ SKILL_TYPES[pokedex[pokeId].skillType].name }}
    </p>
    <p
      v-if="
        pokedex[pokeId].foodPer &&
        props.showKey &&
        props.showKey.includes('foodPer')
      "
    >
      食{{ pokedex[pokeId].foodPer }}%
    </p>
    <p class="cpt-pokemon__name">{{ pokedex[pokeId].name }}</p>
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
  </div>
</template>