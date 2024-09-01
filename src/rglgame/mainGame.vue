<script setup>
import RgCard from './components/PokemonCard/CardItem.vue'
const CARDS = [
  {
    cid: 'spade2',
    pokeId: 94,
    sortId: 2,
    val: 2,
    txt: '2'
  },
  {
    cid: 'spade3',
    pokeId: 94,
    sortId: 3,
    val: 3,
    txt: '3'
  },
  {
    cid: 'spade4',
    pokeId: 94,
    sortId: 4,
    val: 4,
    txt: '4'
  },
  {
    cid: 'spade5',
    pokeId: 94,
    sortId: 5,
    val: 5,
    txt: '5'
  },
  {
    cid: 'spade6',
    pokeId: 94,
    sortId: 6,
    val: 6,
    txt: '6'
  },
  {
    cid: 'spade7',
    pokeId: 94,
    sortId: 7,
    val: 7,
    txt: '7'
  },
  {
    cid: 'spade8',
    pokeId: 94,
    sortId: 8,
    val: 8,
    txt: '8'
  },
  {
    cid: 'spade9',
    pokeId: 94,
    sortId: 9,
    val: 9,
    txt: '9'
  },
  {
    cid: 'spade10',
    pokeId: 94,
    sortId: 10,
    val: 10,
    txt: '10'
  },
  {
    cid: 'spade11',
    pokeId: 94,
    sortId: 11,
    val: 10,
    txt: 'J'
  },
  {
    cid: 'spade12',
    pokeId: 94,
    sortId: 12,
    val: 10,
    txt: 'Q'
  },
  {
    cid: 'spade13',
    pokeId: 199,
    sortId: 13,
    val: 10,
    txt: 'K'
  },
  {
    cid: 'spade1',
    pokeId: 245,
    sortId: 14,
    val: 10,
    txt: 'A'
  },
  {
    cid: 'heart2',
    pokeId: 94,
    sortId: 2,
    val: 2,
    txt: '2'
  },
  {
    cid: 'heart3',
    pokeId: 94,
    sortId: 3,
    val: 3,
    txt: '3'
  },
  {
    cid: 'heart4',
    pokeId: 94,
    sortId: 4,
    val: 4,
    txt: '4'
  },
  {
    cid: 'heart5',
    pokeId: 94,
    sortId: 5,
    val: 5,
    txt: '5'
  },
  {
    cid: 'heart6',
    pokeId: 94,
    sortId: 6,
    val: 6,
    txt: '6'
  },
  {
    cid: 'heart7',
    pokeId: 94,
    sortId: 7,
    val: 7,
    txt: '7'
  },
  {
    cid: 'heart8',
    pokeId: 94,
    sortId: 8,
    val: 8,
    txt: '8'
  },
  {
    cid: 'heart9',
    pokeId: 94,
    sortId: 9,
    val: 9,
    txt: '9'
  },
  {
    cid: 'heart10',
    pokeId: 94,
    sortId: 10,
    val: 10,
    txt: '10'
  },
  {
    cid: 'heart11',
    pokeId: 94,
    sortId: 11,
    val: 10,
    txt: 'J'
  },
  {
    cid: 'heart12',
    pokeId: 94,
    sortId: 12,
    val: 10,
    txt: 'Q'
  },
  {
    cid: 'heart13',
    pokeId: 94,
    sortId: 13,
    val: 10,
    txt: 'K'
  },
  {
    cid: 'heart1',
    pokeId: 244,
    sortId: 14,
    val: 10,
    txt: 'A'
  },
  {
    cid: 'club2',
    pokeId: 94,
    sortId: 2,
    val: 2,
    txt: '2'
  },
  {
    cid: 'club3',
    pokeId: 94,
    sortId: 3,
    val: 3,
    txt: '3'
  },
  {
    cid: 'club4',
    pokeId: 94,
    sortId: 4,
    val: 4,
    txt: '4'
  },
  {
    cid: 'club5',
    pokeId: 94,
    sortId: 5,
    val: 5,
    txt: '5'
  },
  {
    cid: 'club6',
    pokeId: 94,
    sortId: 6,
    val: 6,
    txt: '6'
  },
  {
    cid: 'club7',
    pokeId: 94,
    sortId: 7,
    val: 7,
    txt: '7'
  },
  {
    cid: 'club8',
    pokeId: 94,
    sortId: 8,
    val: 8,
    txt: '8'
  },
  {
    cid: 'club9',
    pokeId: 94,
    sortId: 9,
    val: 9,
    txt: '9'
  },
  {
    cid: 'club10',
    pokeId: 94,
    sortId: 10,
    val: 10,
    txt: '10'
  },
  {
    cid: 'club11',
    pokeId: 94,
    sortId: 11,
    val: 10,
    txt: 'J'
  },
  {
    cid: 'club12',
    pokeId: 94,
    sortId: 12,
    val: 10,
    txt: 'Q'
  },
  {
    cid: 'club13',
    pokeId: 94,
    sortId: 13,
    val: 10,
    txt: 'K'
  },
  {
    cid: 'club1',
    pokeId: 243,
    sortId: 14,
    val: 10,
    txt: 'A'
  },
  {
    cid: 'diamond2',
    pokeId: 94,
    sortId: 2,
    val: 2,
    txt: '2'
  },
  {
    cid: 'diamond3',
    pokeId: 94,
    sortId: 3,
    val: 3,
    txt: '3'
  },
  {
    cid: 'diamond4',
    pokeId: 94,
    sortId: 4,
    val: 4,
    txt: '4'
  },
  {
    cid: 'diamond5',
    pokeId: 94,
    sortId: 5,
    val: 5,
    txt: '5'
  },
  {
    cid: 'diamond6',
    pokeId: 94,
    sortId: 6,
    val: 6,
    txt: '6'
  },
  {
    cid: 'diamond7',
    pokeId: 94,
    sortId: 7,
    val: 7,
    txt: '7'
  },
  {
    cid: 'diamond8',
    pokeId: 94,
    sortId: 8,
    val: 8,
    txt: '8'
  },
  {
    cid: 'diamond9',
    pokeId: 94,
    sortId: 9,
    val: 9,
    txt: '9'
  },
  {
    cid: 'diamond10',
    pokeId: 94,
    sortId: 10,
    val: 10,
    txt: '10'
  },
  {
    cid: 'diamond11',
    pokeId: 94,
    sortId: 11,
    val: 10,
    txt: 'J'
  },
  {
    cid: 'diamond12',
    pokeId: 94,
    sortId: 12,
    val: 10,
    txt: 'Q'
  },
  {
    cid: 'diamond13',
    pokeId: 94,
    sortId: 13,
    val: 10,
    txt: 'K'
  },
  {
    cid: 'diamond1',
    pokeId: 149,
    sortId: 14,
    val: 10,
    txt: 'A'
  }
]
</script>
<template>
  <div class="rg-game">
    <RgCard v-for="cItem in CARDS" v-bind:key="cItem.id" :dataSource="cItem" />
  </div>
</template>

<style lang="scss">
@import "./style/rgGame.scss";

// debug styles
.rg-card {
  margin-right: 3px;
  margin-bottom: 3px;
}
.rg-card--14 {
  margin-right: 200px;
}
</style>  