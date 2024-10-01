<script setup>
import { defineProps } from 'vue'
import CptPoke from '../components/CptPoke/ItemIndex.vue'
import { formatTime, get } from '../utils/index.js'
import { pokedex } from '../config/pokedex.js'

const props = defineProps({
  newUpdatePoke: {
    type: Array
  }
})
const getShowKeyVal = pokemonsItem => {
  const showKey = ['berry', 'pokeType', 'sleepType', 'helpSpeed', 'friendship', 'skillType', 'helpSpeedHM']
  if (pokedex[pokemonsItem] && get('pokeType', pokedex[pokemonsItem])) {
    const res = pokedex[pokemonsItem]
    // console.log(res)
    if (res.pokeType === 1) {
      // 树果型
      // showKey.push('berry')
    } else if (res.pokeType === 2) {
      // 食材型
      showKey.push('food')
    } 
    // else if (res.pokeType === 3) {
    //   // 技能型
    //   showKey.push('skillType')
    // }
  }
  // console.log(showKey)
  return showKey
}
</script>
<template>
  <h2>{{$t('PAGE_TITLE.newpoke')}}</h2>
  <ul class="cpt-list">
    <li v-for="updateItem in props.newUpdatePoke" v-bind:key="updateItem.time">
      <h3>
        {{ formatTime(updateItem.time, "YY年MM月")
        }}<span class="extra">({{ updateItem.pokemons.length }}{{$t(`OPTIONS.one`)}})</span>
      </h3>
      <div class="poke-tb">
        <div
          class="poke-tb__item"
          v-for="pokemonsItem in updateItem.pokemons"
          v-bind:key="pokemonsItem"
        >
          <CptPoke
            :pokeId="pokemonsItem"
            :showKey="getShowKeyVal(pokemonsItem)"
          />
        </div>
      </div>
    </li>
  </ul>
</template>