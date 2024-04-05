<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { getUrlQuery } from './utils/index.js'
import PageFooter from './components/PageFooter/PFooter.vue'
import PageSleepCalc from './pages/SleepCalc.vue'
import PagePokedex from './pages/PokedexApp.vue'
import PageFoodRec from './pages/FoodRec.vue'
import PageNew from './pages/NewPoke.vue'
import PageHelpSpeedCalc from './pages/HelpSpeedCalc.vue'
import PageOneDayEnergy from './pages/OneDayEnergy.vue'
import PageSleepLab from './pages/SleepLab.vue'

import { updatePoke } from './config/pokedex.js'

const newUpdatePoke = [...updatePoke.reverse()]
const showPageIndex = ref('0')
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

const sellang = ref(localStorage.getItem('psclang') || 'cn')
const allLang = [
  {
    id: 'cn',
    name: '中文'
  },
  {
    id: 'jp',
    name: '日本語'
  }
]
const { locale } = useI18n() // 先调用此方法，然后再使用
const handleClickChangeLang = () => {
  locale.value = sellang.value
  localStorage.setItem('psclang', sellang.value)
  // console.log(locale.value)
  location.reload()
}

onMounted(() => {
  // console.log('组件已经挂载')
  if (getUrlQuery('p') !== undefined) {
    showPageIndex.value = getUrlQuery('p')
  }
})
</script>
<template>
  <div class="main" :class="`lang-${sellang}`">
    <span class="select select-lang">
      Language: {{ $t("lang") }}
      <select v-model="sellang" @change="handleClickChangeLang()">
        <option
          :value="item.id"
          v-for="(item, index) in allLang"
          v-bind:key="index"
        >
          {{ item.name }}
        </option>
      </select>
    </span>
    <div class="page-item" :class="{ cur: +showPageIndex === 0 }">
      <PageSleepCalc />
    </div>
    <div
      class="page-item"
      :class="{ cur: +showPageIndex === 1 }"
      v-if="+showPageIndex === 1"
    >
      <PageFoodRec />
    </div>
    <div class="page-item page-pokedex" :class="{ cur: +showPageIndex === 3 }">
      <PagePokedex />
    </div>
    <div
      class="page-item page-helpcalc"
      :class="{ cur: +showPageIndex === 2 }"
      v-if="+showPageIndex === 2"
    >
      <PageHelpSpeedCalc />
    </div>
    <div
      class="page-item"
      :class="{ cur: +showPageIndex === 4 }"
      v-if="+showPageIndex === 4"
    >
      <PageOneDayEnergy />
    </div>
    <div
      class="page-item"
      :class="{ cur: +showPageIndex === 5 }"
      v-if="+showPageIndex === 5"
    >
      <PageNew :newUpdatePoke="newUpdatePoke" />
    </div>
    <div class="page-item cur" v-if="showPageIndex === '0383a0134484d5bd'">
      <PageSleepLab />
    </div>
    <PageFooter />
    <nav class="nav">
      <ul>
        <li
          v-for="(navItem, key) in nav"
          v-bind:key="navItem.name"
          :class="{ cur: +showPageIndex === key }"
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