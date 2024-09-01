<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  dataSource: {
    type: [Object]
  }
})
const getSuit = cid => {
  if (cid.indexOf('spade') > -1) {
    return '♠'
  } else if (cid.indexOf('heart') > -1) {
    return '♥'
  } else if (cid.indexOf('club') > -1) {
    return '♣'
  }
  return '♦'
}
</script>
<template>
  <div
    class="rg-card"
    :class="[
      `rg-card--${dataSource.cid.replace(/\d+/g, '')}`,
      `rg-card--${dataSource.sortId}`,
    ]"
    v-if="dataSource && dataSource.cid"
  >
    <div class="rg-card-number">
      <p>{{ dataSource.txt }}</p>
      {{ getSuit(dataSource.cid) }}
    </div>
    <div
      class="rg-card-txt"
      :style="`background-image: url(${`./img/pokedex/${
        dataSource.isShiny ? 'shiny/' : ''
      }${dataSource.pokeId}.png`})`"
    >
      <template v-if="dataSource.sortId<=10">
        <span class="rg-card-txt__item" v-for="item in dataSource.sortId" v-bind:key="item">
          {{ getSuit(dataSource.cid) }}
        </span>
      </template>
      <template v-else>{{ getSuit(dataSource.cid) }}</template>
    </div>
    <div class="rg-card__pic">
      <img
        v-lazy="
          `./img/pokedex/${dataSource.isShiny ? 'shiny/' : ''}${
            dataSource.pokeId
          }.png`
        "
        :alt="$t(`POKEMON_NAME.${dataSource.pokeId}`)"
      />
    </div>
  </div>
</template>