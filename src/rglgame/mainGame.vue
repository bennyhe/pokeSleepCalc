<script setup>
import RgCard from './components/PokemonCard/CardItem.vue'
const CARDS = [
  {
    cid: 's1',
    pokeId: 94,
    sortId: 1,
    val: 10,
    txt: 'A'
  },
  {
    cid: 's2',
    pokeId: 94,
    sortId: 2,
    val: 2,
    txt: '2'
  },
  {
    cid: 's3',
    pokeId: 94,
    sortId: 3,
    val: 3,
    txt: '3'
  },
  {
    cid: 's4',
    pokeId: 94,
    sortId: 4,
    val: 4,
    txt: '4'
  },
  {
    cid: 's5',
    pokeId: 94,
    sortId: 5,
    val: 5,
    txt: '5'
  },
  {
    cid: 's6',
    pokeId: 94,
    sortId: 6,
    val: 6,
    txt: '6'
  },
  {
    cid: 's7',
    pokeId: 94,
    sortId: 7,
    val: 7,
    txt: '7'
  },
  {
    cid: 's8',
    pokeId: 94,
    sortId: 8,
    val: 8,
    txt: '8'
  },
  {
    cid: 's9',
    pokeId: 94,
    sortId: 9,
    val: 9,
    txt: '9'
  },
  {
    cid: 's10',
    pokeId: 94,
    sortId: 10,
    val: 10,
    txt: '10'
  },
  {
    cid: 's11',
    pokeId: 94,
    sortId: 11,
    val: 10,
    txt: 'J'
  },
  {
    cid: 's12',
    pokeId: 94,
    sortId: 12,
    val: 10,
    txt: 'Q'
  },
  {
    cid: 's13',
    pokeId: 94,
    sortId: 13,
    val: 10,
    txt: 'K'
  }
]
</script>
<template>
  <div class="rg-game">
    <RgCard v-for="cItem in CARDS" v-bind:key="cItem.id" :dataSource="cItem" />
  </div>
</template>

<style lang="scss">
@import "./style/main.scss";
</style>  