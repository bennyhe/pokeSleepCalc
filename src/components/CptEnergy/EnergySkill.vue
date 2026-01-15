<script setup>
import { defineProps } from 'vue'
import { getNum, get } from '../../utils/index.js'
const props = defineProps({
  dataSource: {
    type: [Object]
  }
})
</script>

<template>
  <div>
    <p class="cpt-pokemon__poketype1 xs">
      果{{ getNum(dataSource.oneDayBerryEnergy) }}
    </p>
    <p class="cpt-pokemon__poketype2 xs">
      食{{ getNum(dataSource.oneDayFoodEnergy.allEnergy) }}
    </p>
    <div class="cpt-pokemon__poketype3 xs">
      技<img
        class="icon"
        v-lazy="`./img/ui/shards.png`"
        v-if="dataSource.oneDaySkillEffects.type === 'shards'"
      /><template
        v-else-if="
          dataSource.oneDaySkillEffects.type === 'berrys' &&
          get(
            'berrys[0].berryType',
            dataSource.oneDaySkillEffects.skillExtra
          )
        "
      >
        <div class="cpt-food cpt-food--s all-food cpt-food--energy">
          <div class="cpt-food__item cur">
            <img
              v-lazy="
                `./img/berry/${dataSource.oneDaySkillEffects.skillExtra.berrys[0].berryType}.png`
              "
              :alt="
                $t(
                  `BERRY_TYPES.${dataSource.oneDaySkillEffects.skillExtra.berrys[0].berryType}`
                )
              "
            />
            <p class="cpt-food__count">
              {{
                dataSource.oneDaySkillEffects.skillExtra.berrys[0]
                  .berryCount
              }}
            </p>
          </div>
        </div>
      </template><template
        v-else-if="
          dataSource.oneDaySkillEffects.type === 'foods' &&
          get(
            'foods[0].foodType',
            dataSource.oneDaySkillEffects.skillExtra
          )
        "
      >
      <div class="cpt-food cpt-food--s all-food cpt-food--energy">
        <div
          class="cpt-food__item cur"
          v-for="(foodItem, foodKey) in dataSource.oneDaySkillEffects.skillExtra
            .foods"
          v-bind:key="foodKey"
        >
          <img
            v-lazy="`./img/food/${foodItem.foodType}.png`"
            :alt="$t(`FOOD_TYPES.${foodItem.foodType}`)"
          />
          <p class="cpt-food__count">
            {{ foodItem.foodCount }}
          </p>
        </div>
      </div>
      </template>
      <template v-if="dataSource.oneDaySkillEffects.type !== 'foods'">{{ getNum(dataSource.oneDaySkillEffects.value || 0) }}</template>
    </div>
    <div class="cpt-pokemon__poketype3 xs"  v-if="dataSource.oneDaySkillEffects.type === 'foods'">
      {{ getNum(dataSource.oneDaySkillEffects.value || 0) }}
      </div>
    <p class="cpt-pokemon__skilltag xs">
      <span class="cpt-pokemon__skilltag-title">
        技<template v-if="dataSource.skilllevel"
          >Lv.{{ getNum(dataSource.skilllevel) }}</template
        >
      </span>
      <span class="cpt-pokemon__skilltag-info"
        >{{ getNum(dataSource.oneDayHelpCount.skill) }}次</span
      >
    </p>
    <div
      v-if="
        dataSource.oneDayFoodEnergy.useFoods &&
        dataSource.oneDayFoodEnergy.useFoods.length > 0
      "
    >
      <div class="cpt-food cpt-food--s all-food cpt-food--energy">
        <div
          class="cpt-food__item cur"
          v-for="(foodItem, foodKey) in dataSource.oneDayFoodEnergy
            .useFoods"
          v-bind:key="foodKey"
        >
          <img
            v-lazy="`./img/food/${foodItem}.png`"
            :alt="$t(`FOOD_TYPES.${foodItem}`)"
          />
          <p class="cpt-food__count">
            {{ dataSource.oneDayFoodEnergy.count[foodKey] }}
          </p>
        </div>
      </div>
    </div>
    <p class="res">
      <img class="icon" v-lazy="`./img/ui/energy.png`" />{{
        getNum(dataSource.oneDayEnergy)
      }}
    </p>
  </div>
</template>