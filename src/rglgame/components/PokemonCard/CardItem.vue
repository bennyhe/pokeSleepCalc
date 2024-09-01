<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  dataSource: {
    type: [Object]
  }
})
</script>
<template>
  <div class="rg-card" v-if="dataSource && dataSource.cid">
    {{ dataSource.txt }}
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