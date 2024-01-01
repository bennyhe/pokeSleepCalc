<script setup>
import { ref } from 'vue'
import PageFooter from './components/PageFooter/index.vue'
import PageSleepCalc from './pages/SleepCalc.vue'
import PageNew from './pages/NewPoke.vue'

const showPageIndex = ref(0)
const nav = [
  {
    name: 'SLEEP CALC'
  },
  {
    name: 'POKEDEX'
  },
  {
    name: 'NEW'
  }
]
</script>

<template>
  <div class="main">
    <div class="page-item" :class="{ cur: showPageIndex === 0 }">
      <PageSleepCalc />
    </div>
    <div class="page-item" :class="{ cur: showPageIndex === 2 }">
      <PageNew />
    </div>
    <teleport to="body">
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
    </teleport>
  </div>
</template>

<style lang="scss">
@import "@/style/style.scss";
</style>