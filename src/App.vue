<script setup>
import { ref, onMounted } from 'vue'
import { getUrlQuery } from './utils/index.js'
import PageFooter from './components/PageFooter/PFooter.vue'
import PageSleepCalc from './pages/SleepCalc.vue'
import PagePokedex from './pages/PokedexApp.vue'
import PageFoodRec from './pages/FoodRec.vue'
import PageNew from './pages/NewPoke.vue'
import PageHelpSpeedCalc from './pages/HelpSpeedCalc.vue'
import PageOneDayEnergy from './pages/OneDayEnergy.vue'
import { updatePoke } from './config/pokedex.js'

const newUpdatePoke = [...updatePoke.reverse()]
const showPageIndex = ref(0)
const nav = [
  {
    name: 'SLEEP CALC'
  },
  {
    name: 'FOOD RECOMMEND'
  },
  {
    name: 'HELP SPEED CALC'
  },
  {
    name: 'POKEDEX'
  },
  {
    name: 'ONE DAY ENERGY'
  },
  {
    name: 'NEW'
  }
]

const handleClickNav = key => {
  showPageIndex.value = key
  window.scrollTo(0, 0)
}

onMounted(() => {
  // console.log('组件已经挂载')
  if (+getUrlQuery('p') >= 0) {
    showPageIndex.value = +getUrlQuery('p')
  }
})
</script>

<template>
  <div class="main">
    <div
      class="page-item"
      :class="{ cur: showPageIndex === 0 }"
    >
      <PageSleepCalc />
    </div>
    <div class="page-item" :class="{ cur: showPageIndex === 1 }">
      <PageFoodRec />
    </div>
    <div class="page-item" :class="{ cur: showPageIndex === 3 }">
      <PagePokedex />
    </div>
    <div
      class="page-item"
      :class="{ cur: showPageIndex === 2 }"
      v-if="showPageIndex === 2"
    >
      <PageHelpSpeedCalc />
    </div>
    <div
      class="page-item"
      :class="{ cur: showPageIndex === 4 }"
      v-if="showPageIndex === 4"
    >
      <PageOneDayEnergy />
    </div>
    <div
      class="page-item"
      :class="{ cur: showPageIndex === 5 }"
      v-if="showPageIndex === 5"
    >
      <PageNew :newUpdatePoke="newUpdatePoke" />
    </div>
    <PageFooter />
    <nav class="nav">
      <ul>
        <li
          v-for="(navItem, key) in nav"
          v-bind:key="navItem.name"
          :class="{ cur: showPageIndex === key }"
          @click="handleClickNav(key)"
        >
          {{ navItem.name }}
        </li>
      </ul>
    </nav>
  </div>
</template>

<style lang="scss">
@import "@/style/style.scss";
</style>