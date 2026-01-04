<script setup>
// import { defineProps } from 'vue'
import { pokedex } from '../../config/pokedex.js'

// const props = defineProps({
//   disabled: {
//     type: Boolean,
//     default: false
//   }
// })
</script>
<template>
  <template v-for="pokeItem in pokedex" :key="pokeItem.id">
    <el-option
      :label="`${$t(`POKEMON_NAME.${pokeItem.id}`)}-#${ pokeItem.id }`"
      :value="pokeItem.id"
      v-if="pokeItem.id.toString().indexOf('-') === -1"
    >
      <img
        class="icon"
        v-lazy="`./img/pokedex/${pokeItem.id}.png`"
        :alt="$t(`POKEMON_NAME.${pokeItem.id}`)"
        v-bind:key="pokeItem.id"
      />
      {{ $t(`POKEMON_NAME.${pokeItem.id}`) }}-#{{ pokeItem.id }}
    </el-option>
  </template>
</template>