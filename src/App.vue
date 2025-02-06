<script setup>
import { ref, onMounted } from 'vue'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'

import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)

import { getUrlQuery } from './utils/index.js'
import PageFooter from './components/PageFooter/PFooter.vue'
import SvgIcon from './components/SvgIcon/IconItem.vue'
import PageSleepCalc from './pages/SleepCalc.vue'
import PagePokedex from './pages/PokedexApp.vue'
import PageFoodRec from './pages/FoodRec.vue'
import PageNew from './pages/NewPoke.vue'
import PageHelpSpeedCalc from './pages/HelpSpeedCalc.vue'
import PageOneDayEnergy from './pages/OneDayEnergy.vue'
import PageSleepLab from './pages/SleepLab.vue'
import PageCandyCalc from './pages/CandyCalc.vue'
import PageMasterRes from './pages/MasterRes.vue'
import PageFindPm from './pages/FindPm.vue'

import { updatePoke } from './config/pokedex.js'
import { NAV_LANG, NAV_PAGE } from './config/nav.js'

const newUpdatePoke = [...updatePoke.reverse()]
const navData = ref(NAV_PAGE)

const handleClickNav = key => {
  navData.value.navIndex = key
  window.scrollTo(0, 0)
}

const sellang = ref(localStorage.getItem('psclang') || 'cn')
const { locale } = useI18n() // 先调用此方法，然后再使用
const handleClickChangeLang = () => {
  locale.value = sellang.value
  localStorage.setItem('psclang', sellang.value)
  // console.log(locale.value)
  location.reload()
}

const isDarkSwitch = ref(isDark.value)

onMounted(() => {
  // console.log('组件已经挂载')
  if (getUrlQuery('p') !== undefined) {
    navData.value.navIndex = getUrlQuery('p')
  }
})
</script>
<template>
  <div class="main" :class="`lang-${sellang}`">
    <div class="select-lang" v-if="navData.navIndex !== '0383a0134484d5bd'">
      <el-switch
        v-model="isDarkSwitch"
        @change="toggleDark()"
        inline-prompt
        :active-action-icon="Moon"
        :inactive-action-icon="Sunny"
        style="
          --el-switch-on-color: #303134;
          --el-switch-off-color: #4b4b4b;
          margin-right: 2px;
        "
      >
      </el-switch>
      <span class="select">
        Lang: {{ $t("lang") }}
        <select v-model="sellang" @change="handleClickChangeLang()">
          <option
            :value="item.id"
            v-for="(item, index) in NAV_LANG"
            v-bind:key="index"
          >
            {{ item.name }}
          </option>
        </select>
      </span>
    </div>
    <div class="page-item" :class="{ cur: +navData.navIndex === 0 }">
      <PageSleepCalc />
    </div>
    <div
      class="page-item"
      :class="{ cur: +navData.navIndex === 1 }"
      v-if="+navData.navIndex === 1"
    >
      <PageFoodRec />
    </div>
    <div
      class="page-item page-candycalc"
      :class="{ cur: +navData.navIndex === 2 }"
      v-if="+navData.navIndex === 2"
    >
      <PageCandyCalc />
    </div>
    <div
      class="page-item page-helpcalc"
      :class="{ cur: +navData.navIndex === 3 }"
      v-if="+navData.navIndex === 3"
    >
      <PageHelpSpeedCalc />
    </div>
    <div
      class="page-item page-pokedex"
      :class="{ cur: +navData.navIndex === 4 }"
    >
      <PagePokedex />
    </div>
    <div
      class="page-item"
      :class="{ cur: +navData.navIndex === 5 }"
      v-if="+navData.navIndex === 5"
    >
      <PageOneDayEnergy />
    </div>
    <div
      class="page-item"
      :class="{ cur: +navData.navIndex === 6 }"
      v-if="+navData.navIndex === 6"
    >
      <PageNew :newUpdatePoke="newUpdatePoke" />
    </div>
    <div class="page-item cur" v-if="navData.navIndex === '0383a0134484d5bd'">
      <PageSleepLab />
    </div>
    <div class="page-item cur" v-if="navData.navIndex === 'master20'">
      <PageMasterRes />
    </div>
    <div class="page-item cur page-findpm" v-if="navData.navIndex === 'findpm'">
      <PageFindPm />
    </div>
    <PageFooter />
    <nav class="nav">
      <ul>
        <li
          v-for="(navItem, key) in navData.navList"
          v-bind:key="navItem.name"
          :class="{ cur: +navData.navIndex === key }"
          @click="handleClickNav(key)"
        >
          <SvgIcon :type="navItem.icon" v-if="navItem.icon" />
          <span class="nav__text">{{ navItem.name }}</span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style lang="scss">
@import "@/style/style.scss";
</style>