<script setup>
import { ref } from 'vue'
import { pokedex } from '../../config/pokedex.js'
import { toSimpleChinese } from '../../utils/index.js'

// 通用可搜索下拉：保留传入的 el-option，并额外支持「简体输入」匹配「繁体存储」的选项。
// 未提供插槽时，默认渲染全量宝可梦列表（编号含 '-' 的形态除外）。
const selRef = ref()

const handleFilter = query => {
  const sel = selRef.value
  if (!sel) return
  const kw = String(query || '').trim()
  const simpleKw = toSimpleChinese(kw)
  // 与原生 filterable 一致，忽略大小写
  const lowerKw = kw.toLowerCase()
  const lowerSimpleKw = simpleKw.toLowerCase()
  let visibleCount = 0
  // sel.options 为已注册的 el-option 集合，逐个按简体 / 原文子串命中后控制显隐
  sel.options.forEach(option => {
    const label = String(option.currentLabel ?? '').toLowerCase()
    const hit =
      !kw ||
      label.includes(lowerKw) ||
      toSimpleChinese(label).includes(lowerSimpleKw)
    option.states.visible = hit
    if (hit) visibleCount += 1
  })
  sel.filteredOptionsCount = visibleCount
}
</script>

<template>
  <el-select ref="selRef" filterable :filter-method="handleFilter">
    <slot>
      <template v-for="pokeItem in pokedex" :key="pokeItem.id">
        <!-- 排除 id 带 '-' 的特殊形态（如南瓜精 / 南瓜怪人的小/大/巨顆種），只保留常规编号 -->
        <el-option
          v-if="pokeItem.id.toString().indexOf('-') === -1"
          :label="`${$t(`POKEMON_NAME.${pokeItem.id}`)}-#${pokeItem.id}`"
          :value="pokeItem.id"
        >
          <img
            class="icon"
            v-lazy="`${IMG_PATH}pokedex/${pokeItem.id}.png`"
            :alt="$t(`POKEMON_NAME.${pokeItem.id}`)"
            :key="pokeItem.id"
          />
          {{ $t(`POKEMON_NAME.${pokeItem.id}`) }}-#{{ pokeItem.id }}
        </el-option>
      </template>
    </slot>
  </el-select>
</template>
