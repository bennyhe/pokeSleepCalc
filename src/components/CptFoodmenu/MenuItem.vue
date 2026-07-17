<script setup>
import { defineProps } from 'vue'
import { fnAccumulation, getNum } from '../../utils/index.js'

const props = defineProps({
  menuItem: {
    type: [Object]
  },
  menuType: {
    type: [Number, String]
  },
  isEdit: {
    type: [Boolean],
    default: false
  }
})
</script>

<template>
  <div
    v-if="props.menuItem"
    class="cpt-foodmenu"
    :class="`cpt-foodmenu--${menuType || props.menuItem.type}`"
  >
    <p class="cpt-foodmenu__name" v-if="!props.menuItem.isEdit">
      <template v-if="props.menuItem.id">{{
        $t(`MENU_TYPES.${props.menuItem.id}`)
      }}</template
      ><template v-else>未选择</template
      ><template v-if="props.menuItem.from"
        >({{ fnAccumulation(props.menuItem.from, "num") }})</template
      >
    </p>
    <div class="cpt-food all-food" v-if="props.menuItem.from">
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
    <p class="cpt-foodmenu__bs" v-if="!props.menuItem.isEdit">
      <img class="icon" v-lazy="`./img/ui/energy.png`" />
      {{ getNum(props.menuItem.baseEnergy) }}
      <template v-if="props.menuItem.menuPercent"
        >(+{{ props.menuItem.menuPercent }}%)</template
      >
    </p>
    <img
      class="cpt-foodmenu__bg"
      v-lazy="`./img/food/${props.menuItem.id}.png`"
      :alt="$t(`MENU_TYPES.${props.menuItem.id}`)"
      v-if="props.menuItem.id"
    />
    <slot />
  </div>
</template>