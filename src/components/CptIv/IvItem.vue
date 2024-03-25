<script setup>
import { defineProps } from 'vue'
import { pokedex } from '../../config/pokedex.js'
import { NATURE } from '../../config/pokeNature.js'
import { FOOD_TYPES, POKE_TYPES } from '../../config/valKey.js'

const props = defineProps({
  sleepItem: {
    type: [Object]
  }
})
</script>
<template>
  <div class="cpt-iv">
    <span v-if="sleepItem.isShiny" class="shiny">闪光</span>
    {{ POKE_TYPES[pokedex[sleepItem.pokeId].pokeType] }}型
    <div class="cpt-food cpt-food--s berry">
      <div class="cpt-food__item">
        <img
          v-lazy="`./img/berry/${pokedex[sleepItem.pokeId].berryType}.png`"
          :alt="$t(`BERRY_TYPES.${pokedex[sleepItem.pokeId].berryType}`)"
        />
      </div>
      <p>
        {{ $t(`BERRY_TYPES.${pokedex[sleepItem.pokeId].berryType}`) }}
      </p>
    </div>
    <h4>食材</h4>
    <div class="cpt-food all-food">
      <div
        class="cpt-food__item cur"
        v-for="(foodItem, foodKey) in sleepItem.iv.useFoods"
        v-bind:key="`${foodKey}_${foodItem}`"
      >
        <img
          v-lazy="`./img/food/${foodItem}.png`"
          :alt="FOOD_TYPES[foodItem]"
        />
        <p class="cpt-food__count">
          {{ pokedex[sleepItem.pokeId].food.count[foodItem].num[foodKey] }}
        </p>
      </div>
    </div>
    <h4>主技能/副技能</h4>
    <div class="skill">
      <div class="main-skill">
        <div class="main-skill__inner">
          {{ $t(`SKILL_TYPES.${pokedex[sleepItem.pokeId].skillType}`) }}
        </div>
      </div>
      <div
        class="mb3"
        v-for="skillItem in sleepItem.iv.skills"
        :key="skillItem.nameId"
      >
        <span class="level">lv{{ skillItem.unlockLevel }}</span>
        <span class="cpt-skill" :class="`cpt-skill--${skillItem.skillRare}`"
          ><svg
            v-if="skillItem.isLockRare"
            class="svg-icon"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <path
              d="M791.1 388.4h-92.9V311c0-49.7-19.3-96.4-54.4-131.5-35.1-35.1-81.8-54.4-131.5-54.4s-96.4 19.3-131.5 54.4-54.4 81.8-54.4 131.5v77.4h-92.9c-8.6 0-15.5 7-15.5 15.5v433.7c0 8.6 7 15.5 15.5 15.5h557.6c8.6 0 15.5-7 15.5-15.5V403.9c0-8.6-6.9-15.5-15.5-15.5zM357.5 311c0-41.4 16.1-80.3 45.3-109.5 29.2-29.2 68.1-45.3 109.5-45.3 41.4 0 80.3 16.1 109.5 45.3 29.2 29.2 45.3 68.1 45.3 109.5v77.4H357.5V311zm418.1 511.1H249.1V419.4h526.5v402.7z"
            />
            <path
              d="M558.8 589.8c0 13.7-6.1 25.9-15.5 34.4v43c0 17.1-13.9 31-31 31s-31-13.9-31-31v-43c-9.4-8.5-15.5-20.7-15.5-34.4 0-25.7 20.8-46.5 46.5-46.5s46.5 20.8 46.5 46.5z"
            /></svg
          >{{ $t(`SUBSKILLS_NAMES.${skillItem.nameId}`) }}
        </span>
      </div>
    </div>
    <h4>性格</h4>
    {{ $t(`NATURE_NAMES.${sleepItem.iv.natureId}`) }}
    <p
      class="nature-up"
      v-if="NATURE[sleepItem.iv.natureId] && NATURE[sleepItem.iv.natureId].up"
    >
      {{ $t(`NATURE_UPDOWN.${NATURE[sleepItem.iv.natureId].up}`) }}△△
    </p>
    <p
      class="nature-down"
      v-if="NATURE[sleepItem.iv.natureId] && NATURE[sleepItem.iv.natureId].down"
    >
      {{ $t(`NATURE_UPDOWN.${NATURE[sleepItem.iv.natureId].down}`) }}▽▽
    </p>
    <p
      v-if="
        NATURE[sleepItem.iv.natureId] &&
        NATURE[sleepItem.iv.natureId].up === undefined
      "
    >
      没有性格带来的特色
    </p>
  </div>
</template>