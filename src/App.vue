<script setup>
import { ref, onMounted } from 'vue'
import { getUrlQuery } from './utils/index.js'
import PageFooter from './components/PageFooter/index.vue'
import PageSleepCalc from './pages/SleepCalc.vue'
import PagePokedex from './pages/PokedexApp.vue'
import PageNew from './pages/NewPoke.vue'

const showPageIndex = ref(0)
const nav = [
  {
    name: 'SLEEP CALC'
  },
  {
    name: 'FOOD POKEDEX'
  },
  {
    name: 'NEW'
  }
]

onMounted(()=>{
  console.log('组件已经挂载')
  if (+getUrlQuery('p') >= 0) {
    showPageIndex.value = +getUrlQuery('p')
  }
})
</script>

<template>
  <div class="main">
    <div class="page-item" :class="{ cur: showPageIndex === 0 }" v-if="showPageIndex === 0">
      <PageSleepCalc />
    </div>
    <div class="page-item" :class="{ cur: showPageIndex === 1 }">
      <PagePokedex />
    </div>
    <div class="page-item" :class="{ cur: showPageIndex === 2 }" v-if="showPageIndex === 2">
      <PageNew />
    </div>
    <PageFooter />
    <nav class="nav">
      <ul>
        <li
          v-for="(navItem, key) in nav"
          v-bind:key="navItem.name"
          :class="{ cur: showPageIndex === key }"
          @click="showPageIndex = key"
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