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
  } else if (cid.indexOf('diamond') > -1) {
    return '♣'
  }
  return '♦'
}
</script>
<template>
  <div
    class="rg-card"
    :class="[`rg-card--${dataSource.cid.replace(/\d+/g, '')}`]"
    v-if="dataSource && dataSource.cid"
  >
    <div class="rg-card-number">
      {{ getSuit(dataSource.cid) }} {{ dataSource.txt }}
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