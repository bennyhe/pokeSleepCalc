<script setup>
import { defineProps, computed, ref } from 'vue'
import CptAvatar from '../CptAvatar/ItemIndex.vue'
import { pokedex } from '../../config/pokedex.js'
import { getNum, getPercent, get } from '../../utils/index.js'
const props = defineProps({
  pokeKey: {
    type: [String, Number]
  },
  pokeItem: {
    type: [Object]
  },
  maxEnergy: {
    type: [Number]
  },
  isHightLightBerry: {
    type: [Boolean],
    default: false
  }
})
</script>
<template>
  <div class="cpt-energyrow-item">
    <i class="i i-rank" :class="`i-rank--${pokeKey + 1}`">{{ pokeKey + 1 }}</i>
    <CptAvatar :pokeId="pokeItem.pokemonId" />
    <span
      v-if="pokedex[pokeItem.pokemonId].pokeType >= 0"
      :class="`cpt-pokemon__poketype${pokedex[pokeItem.pokemonId].pokeType}`"
    >
      {{ $t(`POKE_TYPES.${pokedex[pokeItem.pokemonId].pokeType}`) }}
    </span>
    <div class="cpt-energyrow-row">
      <p
        class="cpt-skill"
        :class="{
          'cpt-skill--3': props.pokeItem.nameExtra.indexOf('S') > -1,
        }"
      >
        {{ props.pokeItem.nameExtra }}
      </p>
    </div>
    <div class="cpt-energyprocess">
      <div
        class="cpt-energyprocess__inner"
        :style="`width: ${getPercent(pokeItem.oneDayEnergy, maxEnergy, 2)}%`"
      >
        <div
          class="cpt-energyprocess__berry"
          :style="`width: ${getPercent(
            props.pokeItem.oneDayBerryEnergy,
            pokeItem.oneDayEnergy,
            2
          )}%`"
        >
          <img class="icon" v-lazy="`./img/ui/energy.png`" />{{
            getNum(props.pokeItem.oneDayBerryEnergy)
          }}
        </div>
        <div
          class="cpt-energyprocess__food"
          :style="`width: ${getPercent(
            props.pokeItem.oneDayFoodEnergy.allEnergy,
            pokeItem.oneDayEnergy,
            2
          )}%`"
        >
          <span class="pcsee"
            ><img class="icon" v-lazy="`./img/ui/energy.png`" />{{
              getNum(props.pokeItem.oneDayFoodEnergy.allEnergy)
            }}</span
          >
        </div>
        <div
          class="cpt-energyprocess__skill"
          :style="`width: ${getPercent(
            props.pokeItem.oneDaySkillEffects.value,
            pokeItem.oneDayEnergy,
            2
          )}%`"
          v-if="
            ['berrys', 'energy', 'foods'].includes(
              props.pokeItem.oneDaySkillEffects.type
            )
          "
        >
          <span class="pcsee"
            ><img class="icon" v-lazy="`./img/ui/energy.png`" />{{
              getNum(props.pokeItem.oneDaySkillEffects.value)
            }}
          </span>
        </div>
      </div>
      <div class="cpt-energyprocess__extra">
        <div
          class="cpt-food cpt-food--s berry"
          :class="{ 'berry--hl': isHightLightBerry }"
          v-if="pokedex[pokeItem.pokemonId].berryType"
        >
          <div class="cpt-food__item">
            <img
              v-lazy="
                `./img/berry/${pokedex[pokeItem.pokemonId].berryType}.png`
              "
              :alt="$t(`BERRY_TYPES.${pokedex[pokeItem.pokemonId].berryType}`)"
            />
          </div>
        </div>
        <div
          class="cpt-food cpt-food--s"
          v-if="props.pokeItem.useFoods && props.pokeItem.useFoods.length > 0"
        >
          <div
            class="cpt-food__item cur"
            v-for="(foodItem, foodKey) in props.pokeItem.useFoods"
            v-bind:key="`${foodKey}_${foodItem}`"
          >
            <img
              v-lazy="`./img/food/${foodItem}.png`"
              :alt="$t(`FOOD_TYPES.${foodItem}`)"
            />
          </div>
        </div>
        <span class="cpt-pokemon__skilltag xs">
          <span class="cpt-pokemon__skilltag-title">
            技<template v-if="props.pokeItem.skilllevel"
              >Lv.{{ getNum(props.pokeItem.skilllevel) }}</template
            >
          </span>
          <span class="cpt-pokemon__skilltag-info"
            >{{ getNum(props.pokeItem.oneDayHelpCount.skill) }}次</span
          >
        </span>
        <span
          class="cpt-pokemon__skill"
          v-if="pokedex[pokeItem.pokemonId].skillType"
        >
          {{ $t(`SKILL_TYPES.${pokedex[pokeItem.pokemonId].skillType}`) }}
        </span>
      </div>
    </div>
    <div class="cpt-energyrow-item__energy">
      <img class="icon" v-lazy="`./img/ui/energy.png`" />{{
        getNum(pokeItem.oneDayEnergy)
      }}
    </div>
  </div>
</template>