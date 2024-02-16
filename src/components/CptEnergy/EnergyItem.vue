<script setup>
import { defineProps } from 'vue'
import CptPoke from '../CptPoke/ItemIndex.vue'
import { FOOD_TYPES } from '../../config/valKey.js'

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
      :showKey="props.showKey"
      :isHightLightBerry="props.isHightLightBerry"
    />
    <div>
      <div class="cpt-food all-food">
        <div
          class="cpt-food__item cur"
          v-for="(foodItem, foodKey) in props.pokeItem.useFoods"
          v-bind:key="foodKey"
        >
          <img
            v-lazy="`./img/food/${foodItem}.png`"
            :alt="FOOD_TYPES[foodItem]"
          />
          <p class="cpt-food__count">
            {{ props.pokeItem.food.count[foodItem].num[foodKey] }}
          </p>
        </div>
      </div>
    </div>
    <div class="poke-tb__energy">
      <p class="sptime">{{ props.pokeItem.nameExtra }}</p>
      <p class="cpt-pokemon__poketype1 xs">
        果{{ props.pokeItem.oneDayBerryEnergy }}
      </p>
      <p class="cpt-pokemon__poketype2 xs">
        食{{ props.pokeItem.oneDayFoodEnergy.allEnergy }}
      </p>
      <div>
        <div class="cpt-food cpt-food--s all-food">
          <div
            class="cpt-food__item cur"
            v-for="(foodItem, foodKey) in props.pokeItem.oneDayFoodEnergy.useFoods"
            v-bind:key="foodKey"
          >
            <img
              v-lazy="`./img/food/${foodItem}.png`"
              :alt="FOOD_TYPES[foodItem]"
            />
            <p class="cpt-food__count">
              {{ props.pokeItem.oneDayFoodEnergy.count[foodKey] }}
            </p>
          </div>
        </div>
      </div>
      <p class="res">
        <img class="icon" v-lazy="`./img/ui/energy.png`" />{{
          props.pokeItem.oneDayEnergy
        }}
      </p>
    </div>
    <pre
      v-if="props.pokeItem.extraDesc"
      class="sptime extra-desc"
      v-html="props.pokeItem.extraDesc"
    ></pre>
  </div>
</template>