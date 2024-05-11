<script setup>
import { defineProps } from 'vue'
import CptPoke from '../CptPoke/ItemIndex.vue'
import {
  skillOptionsExtra,
  skillOptionsHelpSpeed,
  skillOptionsFoodPer,
  skillOptionsSkillPer
} from '../../config/helpSpeed.js'
import { getNum } from '../../utils/index.js'

const props = defineProps({
  pokeKey: {
    type: [String, Number]
  },
  pokeItem: {
    type: [Object]
  },
  showKey: {
    type: Array
  },
  isHightLightBerry: {
    type: [Boolean],
    default: false
  }
})
</script>

<template>
  <div class="poke-tb__item">
    <p>
      <i class="i i-rank" :class="`i-rank--${pokeKey + 1}`">{{
        pokeKey + 1
      }}</i>
    </p>
    <CptPoke
      :pokeId="props.pokeItem.id"
      :helpSpeed="props.pokeItem.helpSpeed"
      :foodPer="props.pokeItem.foodPer"
      :skillPer="props.pokeItem.skillPer"
      :showKey="props.showKey"
      :isHightLightBerry="props.isHightLightBerry"
      :isShiny="props.pokeItem.isShiny"
    />
    <div v-if="props.pokeItem.useFoods && props.pokeItem.useFoods.length > 0">
      <div class="cpt-food all-food">
        <div
          class="cpt-food__item cur"
          v-for="(foodItem, foodKey) in props.pokeItem.useFoods"
          v-bind:key="`${foodKey}_${foodItem}`"
        >
          <img
            v-lazy="`./img/food/${foodItem}.png`"
            :alt="$t(`FOOD_TYPES.${foodItem}`)"
          />
          <p class="cpt-food__count">
            {{ props.pokeItem.food.count[foodItem].num[foodKey] }}
          </p>
        </div>
      </div>
    </div>
    <div class="poke-tb__energy">
      <p
        class="cpt-skill"
        :class="{
          'cpt-skill--3': props.pokeItem.nameExtra.indexOf('S') > -1,
        }"
      >
        {{ props.pokeItem.nameExtra }}
      </p>
      <p class="cpt-pokemon__poketype1 xs">
        果{{ getNum(props.pokeItem.oneDayBerryEnergy) }}
      </p>
      <p class="cpt-pokemon__poketype2 xs">
        食{{ getNum(props.pokeItem.oneDayFoodEnergy.allEnergy) }}
      </p>
      <p class="cpt-pokemon__poketype3 xs">
        技{{ getNum(props.pokeItem.oneDayHelpCount.skill) }}次
      </p>
      <div
        v-if="
          props.pokeItem.oneDayFoodEnergy.useFoods &&
          props.pokeItem.oneDayFoodEnergy.useFoods.length > 0
        "
      >
        <div class="cpt-food cpt-food--s all-food">
          <div
            class="cpt-food__item cur"
            v-for="(foodItem, foodKey) in props.pokeItem.oneDayFoodEnergy
              .useFoods"
            v-bind:key="foodKey"
          >
            <img
              v-lazy="`./img/food/${foodItem}.png`"
              :alt="$t(`FOOD_TYPES.${foodItem}`)"
            />
            <p class="cpt-food__count">
              {{ props.pokeItem.oneDayFoodEnergy.count[foodKey] }}
            </p>
          </div>
        </div>
      </div>
      <p class="res">
        <img class="icon" v-lazy="`./img/ui/energy.png`" />{{
          getNum(props.pokeItem.oneDayEnergy)
        }}
      </p>
    </div>
    <p class="spscore" v-if="props.pokeItem.level">
      Lv.{{ props.pokeItem.level }}
    </p>
    <pre
      v-if="props.pokeItem.extraDesc"
      class="sptime extra-desc"
      v-html="props.pokeItem.extraDesc"
    ></pre>
    <div class="other-skill" v-if="props.pokeItem.skill">
      <template
        v-for="skillItem in skillOptionsExtra"
        v-bind:key="skillItem.label"
      >
        <span
          v-if="props.pokeItem.skill.includes(skillItem.label)"
          class="cpt-skill"
          :class="`cpt-skill--3`"
          >{{ $t(`${skillItem.txt}`) }}</span
        >
      </template>
      <template
        v-for="skillItem in skillOptionsHelpSpeed"
        v-bind:key="skillItem.label"
      >
        <span
          v-if="props.pokeItem.skill.includes(skillItem.label)"
          class="cpt-skill"
          :class="`cpt-skill--${skillItem.rare}`"
          >{{ $t(`${skillItem.txt}`) }}</span
        >
      </template>
      <template
        v-for="skillItem in skillOptionsFoodPer"
        v-bind:key="skillItem.label"
      >
        <span
          v-if="props.pokeItem.skill.includes(skillItem.label)"
          class="cpt-skill"
          :class="`cpt-skill--${skillItem.rare}`"
          >{{ $t(`${skillItem.txt}`) }}</span
        >
      </template>
      <template
        v-for="skillItem in skillOptionsSkillPer"
        v-bind:key="skillItem.label"
      >
        <span
          v-if="props.pokeItem.skill.includes(skillItem.label)"
          class="cpt-skill"
          :class="`cpt-skill--${skillItem.rare}`"
          >{{ $t(`${skillItem.txt}`) }}</span
        >
      </template>
    </div>
    <slot />
  </div>
</template>