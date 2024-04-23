<script setup>
import { defineProps } from 'vue'
import { fnAccumulation } from '../../utils/index.js'

const props = defineProps({
  menuItem: {
    type: [Object]
  }
})
</script>

<template>
  <div
    v-if="props.menuItem"
    class="cpt-foodmenu"
    :class="`cpt-foodmenu--${props.menuItem.type}`"
  >
    <p class="cpt-foodmenu__name">
      {{ $t(`MENU_TYPES.${props.menuItem.id}`) }}({{
        fnAccumulation(props.menuItem.from, "num")
      }})
    </p>
    <div class="cpt-food all-food">
      <div
        class="cpt-food__item cur"
        v-for="allFoodItem in props.menuItem.from"
        v-bind:key="allFoodItem.id"
      >
        <img
          v-lazy="`./img/food/${allFoodItem.id}.png`"
          :alt="$t(`FOOD_TYPES.${allFoodItem.id}`)"
        />
        <p>X{{ allFoodItem.num }}</p>
      </div>
    </div>
    <p class="cpt-foodmenu__bs">
      <img class="icon" v-lazy="`./img/ui/energy.png`" />
      {{ props.menuItem.baseEnergy }}
      (+{{ props.menuItem.menuPercent }}%)
    </p>
    <img
      class="cpt-foodmenu__bg"
      v-lazy="`./img/food/${props.menuItem.id}.png`"
      :alt="$t(`MENU_TYPES.${props.menuItem.id}`)"
    />
  </div>
</template>