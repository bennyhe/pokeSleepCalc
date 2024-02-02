<script setup>
import { ref } from 'vue'
import CptPoke from '../components/CptPoke/ItemIndex.vue'
import { sortInObjectOptions, convertSecondsToHMS } from '../utils/index.js'
import { pokedex } from '../config/pokedex.js'

const helpSpeedCalcForm = ref({
  baseHelpSpeed: 2200,
  level: 50,
  skill: ['none'],
  character: 'none'
})

const byHelpSpeedRes = ref([])
const initFilterGroup = () => {
  let byHelpSpeedResIn = []
  const byHelpSpeedOrgList = []
  for (const pokeKey in pokedex) {
    if (Object.hasOwnProperty.call(pokedex, pokeKey)) {
      const pokedexItem = pokedex[pokeKey]

      // 帮忙速度分类
      if (
        pokedexItem.helpSpeed &&
        !byHelpSpeedOrgList.includes(pokedexItem.helpSpeed)
      ) {
        byHelpSpeedResIn.push({
          id: pokedexItem.helpSpeed,
          helpSpeed: pokedexItem.helpSpeed,
          title: `${pokedexItem.helpSpeed}s`,
          list: []
        })
        byHelpSpeedOrgList.push(pokedexItem.helpSpeed)
      }
      byHelpSpeedResIn
        .find(item => item.helpSpeed === pokedexItem.helpSpeed)
        .list.push(pokedexItem)
    }
  }
  byHelpSpeedResIn.forEach(item => {
    item.count = item.list.length
    item.list = sortInObjectOptions(
      [...item.list],
      ['pokeType', 'berryType', 'id'],
      'up'
    )
  })
  byHelpSpeedResIn = sortInObjectOptions(byHelpSpeedResIn, ['helpSpeed'], 'up')
  byHelpSpeedRes.value = byHelpSpeedResIn
}
initFilterGroup()

const getNewHelpSpeed = (basicTime, level, isGoldHelp) => {
  // 每级多0.2%
  const levelUp = (level - 1) * 0.002
  let basichelp = 0
  let mainMuti = 0
  if (helpSpeedCalcForm.value.skill.includes('s')) {
    basichelp += 0.07
  }
  if (helpSpeedCalcForm.value.skill.includes('m')) {
    basichelp += 0.14
  }
  if (helpSpeedCalcForm.value.character === 'up') {
    mainMuti = 0.1
  }
  if (helpSpeedCalcForm.value.character === 'down') {
    mainMuti = -0.1
  }
  if (isGoldHelp) {
    mainMuti += 0.05
  }
  // console.log(`${basicTime} * (1 - ${levelUp}) * (1 - ${mainMuti}) * (1 - ${basichelp})`)
  const res = basicTime * (1 - levelUp) * (1 - mainMuti) * (1 - basichelp)
  return Math.floor(res)
}
</script>
<template>
  <h2>帮忙速度计算器</h2>
  <el-form label-width="110px">
    <el-form-item label="基础帮忙速度">
      <el-select
        v-model="helpSpeedCalcForm.baseHelpSpeed"
        placeholder="请选择卡比兽级别"
        class="m-2"
      >
        <el-option
          v-for="helpItem in byHelpSpeedRes"
          :key="helpItem.id"
          :label="`${helpItem.helpSpeed}s`"
          :value="helpItem.id"
        >
          {{ helpItem.helpSpeed }}s
          <img
            class="icon"
            v-lazy="`./img/pokedex/${pokeItem.id}.png`"
            :alt="pokeItem.name"
            v-for="pokeItem in helpItem.list"
            v-bind:key="pokeItem.id"
          />
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="宝可梦等级">
      <el-slider v-model="helpSpeedCalcForm.level" show-input />
    </el-form-item>
    <el-form-item label="技能">
      <el-checkbox-group v-model="helpSpeedCalcForm.skill" class="ml-4">
        <el-checkbox label="s">帮忙速度S(7%)</el-checkbox>
        <el-checkbox label="m">帮忙速度M(14%)</el-checkbox>
        <el-checkbox label="gold">帮手奖励(5%)</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="性格">
      <el-radio-group v-model="helpSpeedCalcForm.character" class="ml-4">
        <el-radio label="none">无加成</el-radio>
        <el-radio label="up">帮忙速度↑(+10%)</el-radio>
        <el-radio label="down"
          ><span class="vigour">帮忙速度↓(-10%)</span></el-radio
        >
      </el-radio-group>
    </el-form-item>
    <el-form-item label="计算结果">
      <ul>
        <li>
          {{ helpSpeedCalcForm.level }}级
          <span class="sptime"
            >{{
              getNewHelpSpeed(
                helpSpeedCalcForm.baseHelpSpeed,
                helpSpeedCalcForm.level
              )
            }}s</span
          >
          {{
            convertSecondsToHMS(
              getNewHelpSpeed(
                helpSpeedCalcForm.baseHelpSpeed,
                helpSpeedCalcForm.level
              )
            )
          }}
          <template v-if="helpSpeedCalcForm.skill.includes('gold')">
            (帮手奖励:<span class="sptime"
              >{{
                getNewHelpSpeed(
                  helpSpeedCalcForm.baseHelpSpeed,
                  helpSpeedCalcForm.level,
                  helpSpeedCalcForm.skill.includes("gold")
                )
              }}s</span
            >
            {{
              convertSecondsToHMS(
                getNewHelpSpeed(
                  helpSpeedCalcForm.baseHelpSpeed,
                  helpSpeedCalcForm.level,
                  helpSpeedCalcForm.skill.includes("gold")
                )
              )
            }})
          </template>
        </li>
      </ul>
    </el-form-item>
    <el-form-item label="参考">
      <ul>
        <li
          v-if="helpSpeedCalcForm.level !== 30 && helpSpeedCalcForm.level < 30"
        >
          30级
          <span class="sptime"
            >{{ getNewHelpSpeed(helpSpeedCalcForm.baseHelpSpeed, 30) }}s</span
          >
          {{
            convertSecondsToHMS(
              getNewHelpSpeed(helpSpeedCalcForm.baseHelpSpeed, 30)
            )
          }}
        </li>
        <li
          v-if="helpSpeedCalcForm.level !== 50 && helpSpeedCalcForm.level < 50"
        >
          50级
          <span class="sptime"
            >{{ getNewHelpSpeed(helpSpeedCalcForm.baseHelpSpeed, 50) }}s</span
          >
          {{
            convertSecondsToHMS(
              getNewHelpSpeed(helpSpeedCalcForm.baseHelpSpeed, 50)
            )
          }}
        </li>
        <li
          v-if="helpSpeedCalcForm.level !== 60 && helpSpeedCalcForm.level < 60"
        >
          60级
          <span class="sptime"
            >{{ getNewHelpSpeed(helpSpeedCalcForm.baseHelpSpeed, 60) }}s</span
          >
          {{
            convertSecondsToHMS(
              getNewHelpSpeed(helpSpeedCalcForm.baseHelpSpeed, 60)
            )
          }}
        </li>
        <li
          v-if="
            helpSpeedCalcForm.level !== 100 && helpSpeedCalcForm.level < 100
          "
        >
          100级
          <span class="sptime"
            >{{ getNewHelpSpeed(helpSpeedCalcForm.baseHelpSpeed, 100) }}s</span
          >
          {{
            convertSecondsToHMS(
              getNewHelpSpeed(helpSpeedCalcForm.baseHelpSpeed, 100)
            )
          }}
        </li>
      </ul>
      <!-- ( 约{{
        (getNewHelpSpeed(helpSpeedCalcForm.baseHelpSpeed) /
          helpSpeedCalcForm.baseHelpSpeed) *
        100
      }}% ) -->
    </el-form-item>
  </el-form>
</template>