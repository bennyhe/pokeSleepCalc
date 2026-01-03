<script setup>
import { ref, onMounted } from 'vue'
import { InfoFilled } from '@element-plus/icons-vue'
import CptPoke from '../components/CptPoke/ItemIndex.vue'
import CptAvater from '../components/CptAvatar/ItemIndex.vue'
import { formatTime, get } from '../utils/index.js'
import { pokedex, updatePoke } from '../config/pokedex.js'

const getShowKeyVal = pokemonsItem => {
  const showKey = [
    'berry',
    'pokeType',
    'sleepType',
    'helpSpeed',
    'friendship',
    'skillType',
    'helpSpeedHM',
    'maxcarry'
  ]
  if (pokedex[pokemonsItem] && get('pokeType', pokedex[pokemonsItem])) {
    const res = pokedex[pokemonsItem]
    // console.log(res)
    if (res.pokeType === 1) {
      // 树果型
      // showKey.push('berry')
    } else if (res.pokeType === 2) {
      // 食材型
      showKey.push('food', 'foodPer')
    } else if (res.pokeType === 3) {
      // 技能型
      showKey.push('skillPer')
    }
  }
  // console.log(showKey)
  return showKey
}
const NewPokesByDate = ref([
  {
    year: 2025,
    list: new Array(12).fill([])
  },
  {
    year: 2024,
    list: new Array(12).fill([])
  },
  {
    year: 2023,
    list: new Array(12).fill([])
  }
])
const newUpdatePoke = ref([])
const filterPokeByDate = () => {
  for (let i = 0; i < NewPokesByDate.value.length; i++) {
    const yearItem = NewPokesByDate.value[i]
    for (let j = 0; j < 12; j++) {
      const monthItem = j
      for (const key in newUpdatePoke.value) {
        if (Object.prototype.hasOwnProperty.call(newUpdatePoke.value, key)) {
          const updateItem = newUpdatePoke.value[key]
          if (
            new Date(updateItem.time).getMonth() === monthItem &&
            new Date(updateItem.time).getFullYear() === yearItem.year
          ) {
            yearItem.list[j] = [...updateItem.pokemons]
          }
        }
      }
    }
  }
  // console.log(NewPokesByDate.value)
}
onMounted(() => {
  newUpdatePoke.value = [...updatePoke.reverse()]
  filterPokeByDate()
  // console.log(NewPokesByDate.value, newUpdatePoke.value)
})
</script>
<template>
  <h2>
    {{ $t("PAGE_TITLE.newpoke")
    }}<el-popover
      placement="bottom"
      trigger="click"
      :width="360"
      :key="`NEWPOKEMONS`"
    >
      <template #reference>
        <el-icon size="16" style="vertical-align: middle"
          ><InfoFilled
        /></el-icon>
      </template>
      <div class="map-pokemons">
        <table style="width: 100%">
          <thead>
            <tr>
              <th></th>
              <th
                style="width: 96px"
                v-for="item in NewPokesByDate"
                v-bind:key="item.year"
              >
                {{ item.year }}年
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="monthItem in 12" v-bind:key="monthItem">
              <td>{{ monthItem }}月</td>
              <td
                v-for="item in NewPokesByDate"
                v-bind:key="item.year"
                class="map-pokemons__item"
                :class="{ 'td-none': item.list[monthItem - 1].length === 0 }"
              >
                <CptAvater
                  v-for="pokemonsItem in item.list[monthItem - 1]"
                  :pokeId="pokemonsItem"
                  v-bind:key="pokemonsItem"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-popover>
  </h2>
  <ul class="cpt-list">
    <li v-for="updateItem in newUpdatePoke" v-bind:key="updateItem.time">
      <h3>
        {{ formatTime(updateItem.time, "YY年MM月")
        }}<span class="extra"
          >({{ updateItem.pokemons.length }}{{ $t(`OPTIONS.one`) }})</span
        >
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