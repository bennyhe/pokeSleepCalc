<script setup>
import { ref, watch, onMounted } from 'vue'
import CptEnergyItem from '../components/CptEnergy/EnergyItem.vue'
import { sortInObjectOptions, toHM } from '../utils/index.js'
import { getOneDayEnergy, getOneDayHelpCount } from '../utils/energy.js'
import { pokedex } from '../config/pokedex.js'
import {
  allHelpType,
  skillOptions,
  characterOptions,
  skillOptionsExtra,
  skillOptionsExtra2,
  levelOptions
} from '../config/helpSpeed.js'

const byHelpSpeedRes = ref([])
const targetInList = ref([])
const otherLevelShow = [25, 30, 50, 60, 100]
const helpSpeedCalcForm = ref({
  pokemonId: 26,
  baseHelpSpeed: 2200, // Number
  level: 50, // Number
  isRightBerry: false, // Boolean: true/false
  skill: ['none'], // Array: ['none', 'hs', 'hm', 'fs', 'fm', 'hg1', 'hg2', 'hg3', 'hg4', 'hg5']
  character: 'none' // String: none, hdown, hup, fdown, fup, hdownfup, hupfdown
})
// 获取选择帮忙速度的宝可梦分组
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
  byHelpSpeedResIn.forEach((item, key) => {
    item.sortIndex = key + 1
  })
  return byHelpSpeedResIn
}

// 获取计算结果
const getNewHelpSpeed = (formData, level) => {
  // console.log(formData, level)
  // formData: {
  //   baseHelpSpeed, // Number
  //   skill, // Array: ['none', 'hs', 'hm', 'fs', 'fm', 'hg1', 'hg2', 'hg3', 'hg4', 'hg5']
  //   character // String: none, hdown, hup, fdown, fup, hdownfup, hupfdown
  // }
  // 每级多0.2%
  const levelUp = (level - 1) * 0.002
  let basichelp = 0
  let mainMuti = 0
  if (formData.skill.includes('hs')) {
    basichelp += 0.07
  }
  if (formData.skill.includes('hm')) {
    basichelp += 0.14
  }
  if (formData.character.indexOf('hup') > -1) {
    mainMuti = 0.1
  }
  if (formData.character.indexOf('hdown') > -1) {
    mainMuti = -0.1
  }
  if (formData.skill.includes('hg1')) {
    basichelp += 0.05
  }
  if (formData.skill.includes('hg2')) {
    basichelp += 0.05 * 2
  }
  if (formData.skill.includes('hg3')) {
    basichelp += 0.05 * 3
  }
  if (formData.skill.includes('hg4')) {
    basichelp += 0.05 * 4
  }
  if (formData.skill.includes('hg5')) {
    basichelp += 0.05 * 5
  }
  const res =
    formData.baseHelpSpeed * (1 - levelUp) * (1 - mainMuti) * (1 - basichelp)
  return Math.floor(res)
}

const getNewFoodPer = (formData, foodPer) => {
  let basicfood = 0
  let mainMuti = 0
  if (formData.skill.includes('fs')) {
    basicfood += 0.18
  }
  if (formData.skill.includes('fm')) {
    basicfood += 0.36
  }
  if (formData.character.indexOf('fup') > -1) {
    mainMuti = 0.2
  }
  if (formData.character.indexOf('fdown') > -1) {
    mainMuti = -0.2
  }
  return parseFloat(foodPer * ((1 + basicfood) * (1 + mainMuti))).toFixed(2)
}

const addArrInOptions = (extraDesc, pokeItem, isPlayer) => {
  const newPokeItem = { ...pokeItem }
  newPokeItem.oneDayHelpCount = getOneDayHelpCount(
    newPokeItem.helpSpeed,
    newPokeItem.foodPer
  )

  const resRankArr = []
  let tempFoodType = [
    [0, 0],
    [0, 1]
  ]
  if (helpSpeedCalcForm.value.level < 30) {
    tempFoodType = [[0]]
  } else if (helpSpeedCalcForm.value.level >= 60) {
    if (pokeItem.food.type.length === 3) {
      tempFoodType = [
        [0, 0, 0],
        [0, 0, 1],
        [0, 0, 2],
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 2]
      ]
    } else {
      tempFoodType = [
        [0, 0, 0],
        [0, 0, 1],
        [0, 1, 0],
        [0, 1, 1]
      ]
    }
  }

  if (!isPlayer) {
    const nArr = []
    for (let i = 0; i < tempFoodType.length; i++) {
      nArr.push(tempFoodType[i], tempFoodType[i])
    }
    tempFoodType = nArr
  }

  tempFoodType.forEach((arrFTItem, arrFTKey) => {
    let is2n = (arrFTKey + 1) % 2 === 0
    if (isPlayer) {
      is2n = helpSpeedCalcForm.value.skill.includes('berrys')
    }
    const arrFood = [
      newPokeItem.food.type[arrFTItem[0]],
      newPokeItem.food.type[arrFTItem[1]]
    ]
    if (helpSpeedCalcForm.value.level < 30) {
      arrFood.splice(1, arrFood.length)
    } else if (helpSpeedCalcForm.value.level >= 60) {
      arrFood.push(newPokeItem.food.type[arrFTItem[2]])
    }
    resRankArr.push({
      ...newPokeItem,
      id: newPokeItem.id,
      nameExtra: is2n ? '树果S' : '',
      extraDesc: extraDesc,
      ...getOneDayEnergy(
        newPokeItem,
        helpSpeedCalcForm.value.level,
        arrFood,
        is2n ? true : false,
        helpSpeedCalcForm.value.isRightBerry
      )
    })
  })
  return resRankArr
}

const getPlayerExtraDesc = () => {
  let extraDesc = '自选'
  if (
    helpSpeedCalcForm.value.skill.includes('hs') ||
    helpSpeedCalcForm.value.skill.includes('hm')
  ) {
    extraDesc += '\n'
  }
  if (helpSpeedCalcForm.value.skill.includes('hs')) {
    extraDesc += '帮忙S'
  }
  if (
    helpSpeedCalcForm.value.skill.includes('hs') &&
    helpSpeedCalcForm.value.skill.includes('hm')
  ) {
    extraDesc += ','
  }
  if (helpSpeedCalcForm.value.skill.includes('hm')) {
    extraDesc += '帮忙M'
  }
  if (
    helpSpeedCalcForm.value.skill.includes('hg1') ||
    helpSpeedCalcForm.value.skill.includes('hg2') ||
    helpSpeedCalcForm.value.skill.includes('hg3') ||
    helpSpeedCalcForm.value.skill.includes('hg4') ||
    helpSpeedCalcForm.value.skill.includes('hg5')
  ) {
    extraDesc += '\n帮手奖励'
  }
  if (
    helpSpeedCalcForm.value.skill.includes('fs') ||
    helpSpeedCalcForm.value.skill.includes('fm')
  ) {
    extraDesc += '\n'
  }
  if (helpSpeedCalcForm.value.skill.includes('fs')) {
    extraDesc += '食率S'
  }
  if (
    helpSpeedCalcForm.value.skill.includes('fs') &&
    helpSpeedCalcForm.value.skill.includes('fm')
  ) {
    extraDesc += ','
  }
  if (helpSpeedCalcForm.value.skill.includes('fm')) {
    extraDesc += '食率M'
  }
  extraDesc += `\n${
    characterOptions.find(
      item => item.label === helpSpeedCalcForm.value.character
    ).txt
  }`
  return extraDesc
}

const getTargetPokemonEnergy = pokeId => {
  let resRankArr = []
  const pokeItem = { ...pokedex[pokeId] }
  pokeItem.helpSpeed = getNewHelpSpeed(
    helpSpeedCalcForm.value,
    helpSpeedCalcForm.value.level
  )
  pokeItem.foodPer = getNewFoodPer(helpSpeedCalcForm.value, pokeItem.foodPer)

  resRankArr = resRankArr.concat(
    addArrInOptions(getPlayerExtraDesc(), pokeItem, true)
  ) // 玩家自选

  const tempPokeItem = { ...pokedex[pokeId] }
  tempPokeItem.helpSpeed = getNewHelpSpeed(
    {
      baseHelpSpeed: tempPokeItem.helpSpeed,
      skill: ['none'], // Array: ['none', 'hs', 'hm', 'fs', 'fm', 'hg1', 'hg2', 'hg3', 'hg4', 'hg5']
      character: 'none' // String: none, hdown, hup, fdown, fup, hdownfup, hupfdown
    },
    helpSpeedCalcForm.value.level
  )
  resRankArr = resRankArr.concat(addArrInOptions('白板', tempPokeItem))

  const tempPokeItem2 = { ...pokedex[pokeId] }
  const tempSCOptions2 = {
    skill: ['fs', 'fm'], // Array: ['none', 'hs', 'hm', 'fs', 'fm', 'hg1', 'hg2', 'hg3', 'hg4', 'hg5']
    character: 'hup' // String: none, hdown, hup, fdown, fup, hdownfup, hupfdown
  }
  tempPokeItem2.helpSpeed = getNewHelpSpeed(
    {
      baseHelpSpeed: tempPokeItem2.helpSpeed,
      ...tempSCOptions2
    },
    helpSpeedCalcForm.value.level
  )
  tempPokeItem2.foodPer = getNewFoodPer(
    {
      ...tempSCOptions2
    },
    tempPokeItem2.foodPer
  )
  resRankArr = resRankArr.concat(
    addArrInOptions('食材S,M\n性格:帮忙↑', tempPokeItem2)
  )

  const tempPokeItem3 = { ...pokedex[pokeId] }
  const tempSCOptions3 = {
    skill: ['hs', 'hm'], // Array: ['none', 'hs', 'hm', 'fs', 'fm', 'hg1', 'hg2', 'hg3', 'hg4', 'hg5']
    character: 'hupfdown' // String: none, hdown, hup, fdown, fup, hdownfup, hupfdown
  }
  tempPokeItem3.helpSpeed = getNewHelpSpeed(
    {
      baseHelpSpeed: tempPokeItem3.helpSpeed,
      ...tempSCOptions3
    },
    helpSpeedCalcForm.value.level
  )
  tempPokeItem3.foodPer = getNewFoodPer(
    {
      ...tempSCOptions3
    },
    tempPokeItem3.foodPer
  )
  resRankArr = resRankArr.concat(
    addArrInOptions('帮忙S,M\n性格:固执', tempPokeItem3)
  )

  const tempPokeItem4 = { ...pokedex[pokeId] }
  const tempSCOptions4 = {
    skill: ['fs', 'fm'], // Array: ['none', 'hs', 'hm', 'fs', 'fm', 'hg1', 'hg2', 'hg3', 'hg4', 'hg5']
    character: 'fup' // String: none, hdown, hup, fdown, fup, hdownfup, hupfdown
  }
  tempPokeItem4.helpSpeed = getNewHelpSpeed(
    {
      baseHelpSpeed: tempPokeItem4.helpSpeed,
      ...tempSCOptions4
    },
    helpSpeedCalcForm.value.level
  )
  tempPokeItem4.foodPer = getNewFoodPer(
    {
      ...tempSCOptions4
    },
    tempPokeItem4.foodPer
  )
  resRankArr = resRankArr.concat(
    addArrInOptions('食材S,M\n性格:食材↑', tempPokeItem4)
  )

  return sortInObjectOptions(resRankArr, ['oneDayEnergy'], 'down')
}

const getProcessMuti = formData => {
  return (
    getNewHelpSpeed(
      {
        baseHelpSpeed: formData.baseHelpSpeed,
        skill: ['none'],
        character: 'hdown'
      },
      formData.level
    ) -
    getNewHelpSpeed(
      {
        baseHelpSpeed: formData.baseHelpSpeed,
        skill: ['hs', 'hm'],
        character: 'hup'
      },
      formData.level
    )
  )
}
const getProcessWidth = formData => {
  let res =
    ((getNewHelpSpeed(formData, formData.level) -
      getNewHelpSpeed(
        {
          baseHelpSpeed: formData.baseHelpSpeed,
          skill: ['none'],
          character: 'hdown'
        },
        formData.level
      )) /
      getProcessMuti(formData)) *
    -100

  if (res > 100) {
    res = 100
  }
  return res
}

const setTargetListByHelp = () => {
  targetInList.value = byHelpSpeedRes.value.find(
    item => item.helpSpeed === helpSpeedCalcForm.value.baseHelpSpeed
  )
}

const handleChangePokemon = () => {
  helpSpeedCalcForm.value.baseHelpSpeed =
    pokedex[helpSpeedCalcForm.value.pokemonId].helpSpeed
  setTargetListByHelp()
}

onMounted(() => {
  byHelpSpeedRes.value = initFilterGroup()
  setTargetListByHelp()
})
watch(helpSpeedCalcForm.value, val => {
  if (!val.level) {
    helpSpeedCalcForm.value.level = 10
  }
})
</script>
<template>
  <h2>帮忙速度计算</h2>
  <el-form label-width="90px">
    <el-form-item label="宝可梦">
      <el-select
        v-model="helpSpeedCalcForm.pokemonId"
        placeholder="请选择宝可梦"
        filterable
        @change="handleChangePokemon()"
      >
        <el-option
          v-for="pokeItem in pokedex"
          :key="pokeItem.id"
          :label="`${pokeItem.name}-${pokeItem.helpSpeed}s`"
          :value="pokeItem.id"
        >
          <img
            class="icon"
            v-lazy="`./img/pokedex/${pokeItem.id}.png`"
            :alt="pokeItem.name"
            v-bind:key="pokeItem.id"
          />
          {{ pokeItem.name }}-{{ pokeItem.helpSpeed }}s
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <i class="i i-rank" :class="`i-rank--${targetInList.sortIndex}`">{{
        targetInList.sortIndex
      }}</i>
      {{ helpSpeedCalcForm.baseHelpSpeed }}s
      <img
        class="icon"
        v-lazy="`./img/pokedex/${pokeItem.id}.png`"
        :alt="pokeItem.name"
        v-for="pokeItem in targetInList.list"
        v-bind:key="pokeItem.id"
      />
    </el-form-item>
    <el-form-item label="等级(10-60)">
      <el-slider
        v-model="helpSpeedCalcForm.level"
        show-input
        :min="10"
        :max="60"
      />
    </el-form-item>
    <el-form-item>
      <el-radio-group
        v-model="helpSpeedCalcForm.level"
        class="ml-4"
        size="small"
      >
        <el-radio-button
          :label="cItem.label"
          v-for="cItem in levelOptions"
          v-bind:key="cItem.label"
          >{{ cItem.txt }}</el-radio-button
        >
      </el-radio-group>
    </el-form-item>
    <el-form-item label="技能">
      <el-checkbox-group
        v-model="helpSpeedCalcForm.skill"
        class="ml-4"
        :min="0"
        :max="5"
      >
        <el-checkbox
          :label="skillItem.label"
          v-for="skillItem in skillOptionsExtra2"
          v-bind:key="skillItem.label"
          >{{ skillItem.txt }}</el-checkbox
        >
      </el-checkbox-group>
    </el-form-item>
    <el-form-item>
      <el-checkbox-group
        v-model="helpSpeedCalcForm.skill"
        class="ml-4"
        :min="0"
        :max="5"
      >
        <el-checkbox
          :label="skillItem.label"
          v-for="skillItem in skillOptions"
          v-bind:key="skillItem.label"
          >{{ skillItem.txt }}</el-checkbox
        >
      </el-checkbox-group>
    </el-form-item>
    <el-form-item>
      <el-checkbox-group
        v-model="helpSpeedCalcForm.skill"
        class="ml-4"
        :min="0"
        :max="5"
      >
        <el-checkbox
          :label="skillItem.label"
          v-for="skillItem in skillOptionsExtra"
          v-bind:key="skillItem.label"
          >{{ skillItem.txt }}</el-checkbox
        >
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="性格">
      <el-radio-group v-model="helpSpeedCalcForm.character" class="ml-4">
        <el-radio
          :label="cItem.label"
          v-for="cItem in characterOptions"
          v-bind:key="cItem.label"
          :class="{ vigour: cItem.txt.indexOf('帮↓') > -1 }"
          >{{ cItem.txt }}</el-radio
        >
      </el-radio-group>
    </el-form-item>
    <el-form-item label="计算结果">
      <ul>
        <li>
          {{ helpSpeedCalcForm.level }}级：
          <span class="sptime"
            >{{
              getNewHelpSpeed(helpSpeedCalcForm, helpSpeedCalcForm.level)
            }}s</span
          >
          /
          {{
            toHM(
              getNewHelpSpeed(helpSpeedCalcForm, helpSpeedCalcForm.level),
              "sec"
            )
          }}
        </li>
      </ul>
      <div class="helpprocess">
        <i class="helpprocess__inner"
          ><i :style="`width: ${getProcessWidth(helpSpeedCalcForm)}%`"></i
        ></i>
        <div
          v-for="(processItem, processKey) in allHelpType"
          v-bind:key="processItem.title"
          :style="`left: ${
            ((getNewHelpSpeed(
              {
                baseHelpSpeed: helpSpeedCalcForm.baseHelpSpeed,
                ...processItem,
              },
              helpSpeedCalcForm.level
            ) -
              getNewHelpSpeed(
                {
                  baseHelpSpeed: helpSpeedCalcForm.baseHelpSpeed,
                  skill: ['none'],
                  character: 'hdown',
                },
                helpSpeedCalcForm.level
              )) /
              getProcessMuti(helpSpeedCalcForm)) *
            -100
          }%`"
          class="helpprocess__tag"
          :class="[
            processItem.character.indexOf('hdown') > -1 ? 'down' : '',
            processItem.character.indexOf('hup') > -1 ? 'up' : '',
            `helpprocess__tag--${processKey + 1}`,
            getNewHelpSpeed(helpSpeedCalcForm, helpSpeedCalcForm.level) ===
            getNewHelpSpeed(
              {
                baseHelpSpeed: helpSpeedCalcForm.baseHelpSpeed,
                ...processItem,
              },
              helpSpeedCalcForm.level
            )
              ? 'cur'
              : '',
          ]"
        >
          <pre class="helpprocess__title" v-html="processItem.title"></pre>
          <div class="helpprocess__value">
            {{
              getNewHelpSpeed(
                {
                  baseHelpSpeed: helpSpeedCalcForm.baseHelpSpeed,
                  ...processItem,
                },
                helpSpeedCalcForm.level
              )
            }}s
          </div>
        </div>
      </div>
    </el-form-item>
    <el-form-item label="参考" v-if="helpSpeedCalcForm.level < 100">
      <ul>
        <template v-for="olItem in otherLevelShow" v-bind:key="olItem">
          <li
            v-if="
              helpSpeedCalcForm.level !== olItem &&
              helpSpeedCalcForm.level < olItem
            "
          >
            {{ olItem }}级：
            <span class="sptime"
              >{{ getNewHelpSpeed(helpSpeedCalcForm, olItem) }}s</span
            >
            /
            {{ toHM(getNewHelpSpeed(helpSpeedCalcForm, olItem), "sec") }}
          </li>
        </template>
      </ul>
    </el-form-item>
    <el-form-item label="适正岛屿">
      <el-radio-group v-model="helpSpeedCalcForm.isRightBerry" class="ml-4">
        <el-radio-button :label="true">是（双倍树果）</el-radio-button>
        <el-radio-button :label="false">否</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="快速等级">
      <el-radio-group
        v-model="helpSpeedCalcForm.level"
        class="ml-4"
        size="small"
      >
        <el-radio-button
          :label="cItem.label"
          v-for="cItem in levelOptions"
          v-bind:key="cItem.label"
          >{{ cItem.txt }}</el-radio-button
        >
      </el-radio-group>
    </el-form-item>
  </el-form>
  <div class="page-inner">
    <div class="poke-tb poke-tb--xscorll">
      <CptEnergyItem
        :pokeItem="pokeItem"
        :pokeKey="pokeKey"
        :showKey="['helpSpeed', 'helpSpeedHM', 'berry', 'pokeType', 'foodPer']"
        :class="{
          cur: pokeItem.extraDesc.indexOf('自选') > -1,
          default: pokeItem.extraDesc.indexOf('白') > -1,
        }"
        v-for="(pokeItem, pokeKey) in getTargetPokemonEnergy(
          helpSpeedCalcForm.pokemonId
        )"
        v-bind:key="`${pokeItem.id}_${pokeItem.useFoods.join('')}_${
          pokeItem.nameExtra || ''
        }_${pokeItem.extraDesc || ''}`"
        :isHightLightBerry="helpSpeedCalcForm.isRightBerry"
      />
    </div>
  </div>
  <el-form label-width="90px">
    <el-form-item>
      <div class="mod-tips">
        <p>* 数值均为程序预估结果，与实际有误差。</p>
        <p>* 结果为对应等级一天产出。</p>
        <p>* 非满包没开露营券，不含技能率。</p>
        <p>* 游戏内不会显示帮手奖励后的时间。</p>
      </div>
    </el-form-item>
  </el-form>
</template>