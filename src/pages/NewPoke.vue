<script setup>
import { formatTime } from '../utils/index.js'
import { pokedex, updatePoke } from '../config/pokedex.js'

const newUpdatePoke = updatePoke.reverse()
</script>
<template>
  <h2>最新宝可梦</h2>
  <ul class="score-list">
    <li v-for="updateItem in newUpdatePoke" v-bind:key="updateItem.time">
      {{ formatTime(updateItem.time, "YY年MM月") }}
      (<span class="sptime">{{ updateItem.pokemons.length }}只</span>)：
      <div
        class="mod-pokemon"
        v-for="pokemonsItem in updateItem.pokemons"
        v-bind:key="pokemonsItem"
      >
        <div class="mod-pokemon__pic">
          <img v-lazy="`./img/pokedex/${pokemonsItem}.png`" />
        </div>
        <p class="mod-pokemon__name">{{ pokedex[pokemonsItem].name }}</p>
      </div>
    </li>
  </ul>
</template>