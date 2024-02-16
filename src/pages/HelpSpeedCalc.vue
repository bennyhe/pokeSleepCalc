<script setup>
import { ref } from 'vue'
import CptPoke from '../components/CptPoke/ItemIndex.vue'
import { sortInObjectOptions, convertSecondsToHMS } from '../utils/index.js'
import { getOneDayEnergy, getOneDayHelpCount } from '../utils/energy.js'
import { FOOD_TYPES } from '../config/valKey.js'
import { pokedex } from '../config/pokedex.js'
import {
  allHelpType,
  skillOptions,
  characterOptions
} from '../config/helpSpeed.js'

const byHelpSpeedRes = ref([])
const targetInList = ref([])
const otherLevelShow = [25, 30, 50, 60, 100]
const helpSpeedCalcForm = ref({
  pokemonId: 26,
  baseHelpSpeed: 2200, // Number
  level: 50, // Number
  skill: ['none'], // Array: ['none', 'hs', 'hm', 'fs', 'fm']
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
const getNewHelpSpeed = (formData, level, isGoldHelp) => {
  // console.log(formData, level, isGoldHelp)
  // formData: {
  //   baseHelpSpeed, // Number
  //   skill, // Array: ['none', 'hs', 'hm', 'fs', 'fm']
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
  // if (isGoldHelp) {
  //   mainMuti += 0.05
  // }
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

const addArrInOptions = (extraDesc, pokeItem) => {
  const newPokeItem = {...pokeItem}
  const resRankArr = []
  const tempFoodType = [
    [0, 0],
    [0, 0],
    [0, 1],
    [0, 1]
  ]
  newPokeItem.oneDayHelpCount = getOneDayHelpCount(
    newPokeItem.helpSpeed,
    newPokeItem.foodPer
  )
  tempFoodType.forEach((arrFTItem, arrFTKey) => {
    const is2n = (arrFTKey + 1) % 2 === 0
    resRankArr.push({
      ...newPokeItem,
      id: newPokeItem.id,
      nameExtra: is2n ? '树果S' : '',
      extraDesc: extraDesc,
      ...getOneDayEnergy(
        newPokeItem,
        helpSpeedCalcForm.value.level,
        [newPokeItem.food.type[arrFTItem[0]], newPokeItem.food.type[arrFTItem[1]]],
        is2n ? true : false,
        false
      )
    })
  })
  return resRankArr
}

const getTargetPokemonEnergy = pokeId => {
  let resRankArr = []
  const pokeItem = { ...pokedex[pokeId] }
  pokeItem.helpSpeed = getNewHelpSpeed(
    helpSpeedCalcForm.value,
    helpSpeedCalcForm.value.level
  )
  pokeItem.foodPer = getNewFoodPer(helpSpeedCalcForm.value, pokeItem.foodPer)
  let extraDesc = '玩家'
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

  resRankArr = resRankArr.concat(addArrInOptions(extraDesc, pokeItem))

  const tempPokeItem = { ...pokedex[pokeId] }
  tempPokeItem.helpSpeed = getNewHelpSpeed(
    {
      baseHelpSpeed: tempPokeItem.helpSpeed,
      skill: ['none'], // Array: ['none', 'hs', 'hm', 'fs', 'fm']
      character: 'none' // String: none, hdown, hup, fdown, fup, hdownfup, hupfdown
    },
    helpSpeedCalcForm.value.level
  )
  resRankArr = resRankArr.concat(addArrInOptions('白板', tempPokeItem))

  const tempPokeItem2 = { ...pokedex[pokeId] }
  const tempSCOptions2 = {
    skill: ['fs', 'fm'], // Array: ['none', 'hs', 'hm', 'fs', 'fm']
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
    skill: ['hs', 'hm'], // Array: ['none', 'hs', 'hm', 'fs', 'fm']
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

  return sortInObjectOptions(resRankArr, ['oneDayEnergy'], 'down')
}

const handleChangePokemon = () => {
  helpSpeedCalcForm.value.baseHelpSpeed =
    pokedex[helpSpeedCalcForm.value.pokemonId].helpSpeed
  targetInList.value = byHelpSpeedRes.value.find(
    item => item.helpSpeed === helpSpeedCalcForm.value.baseHelpSpeed
  )
}

byHelpSpeedRes.value = initFilterGroup()
targetInList.value = byHelpSpeedRes.value.find(
  item => item.helpSpeed === helpSpeedCalcForm.value.baseHelpSpeed
)
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
    <el-form-item label="等级">
      <el-slider
        v-model="helpSpeedCalcForm.level"
        show-input
        :min="30"
        :max="50"
      />
    </el-form-item>
    <el-form-item label="技能">
      <el-checkbox-group v-model="helpSpeedCalcForm.skill" class="ml-4">
        <el-checkbox
          :label="skillItem.label"
          v-for="skillItem in skillOptions"
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
            convertSecondsToHMS(
              getNewHelpSpeed(helpSpeedCalcForm, helpSpeedCalcForm.level)
            )
          }}
          <!-- <template v-if="helpSpeedCalcForm.skill.includes('hgold')">
            (帮手奖励:<span class="sptime"
              >{{
                getNewHelpSpeed(
                  helpSpeedCalcForm,
                  helpSpeedCalcForm.level,
                  helpSpeedCalcForm.skill.includes("hgold")
                )
              }}s</span
            >
            {{
              convertSecondsToHMS(
                getNewHelpSpeed(
                  helpSpeedCalcForm,
                  helpSpeedCalcForm.level,
                  helpSpeedCalcForm.skill.includes("hgold")
                )
              )
            }})
          </template> -->
        </li>
      </ul>
      <div class="helpprocess">
        <i class="helpprocess__inner"
          ><i
            :style="`width: ${
              ((getNewHelpSpeed(helpSpeedCalcForm, helpSpeedCalcForm.level) -
                getNewHelpSpeed(
                  {
                    baseHelpSpeed: helpSpeedCalcForm.baseHelpSpeed,
                    skill: ['none'],
                    character: 'hdown',
                  },
                  helpSpeedCalcForm.level
                )) /
                (getNewHelpSpeed(
                  {
                    baseHelpSpeed: helpSpeedCalcForm.baseHelpSpeed,
                    skill: ['none'],
                    character: 'hdown',
                  },
                  helpSpeedCalcForm.level
                ) -
                  getNewHelpSpeed(
                    {
                      baseHelpSpeed: helpSpeedCalcForm.baseHelpSpeed,
                      skill: ['hs', 'hm'],
                      character: 'hup',
                    },
                    helpSpeedCalcForm.level
                  ))) *
              -100
            }%`"
          ></i
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
              (getNewHelpSpeed(
                {
                  baseHelpSpeed: helpSpeedCalcForm.baseHelpSpeed,
                  skill: ['none'],
                  character: 'hdown',
                },
                helpSpeedCalcForm.level
              ) -
                getNewHelpSpeed(
                  {
                    baseHelpSpeed: helpSpeedCalcForm.baseHelpSpeed,
                    skill: ['hs', 'hm'],
                    character: 'hup',
                  },
                  helpSpeedCalcForm.level
                ))) *
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
            {{
              convertSecondsToHMS(getNewHelpSpeed(helpSpeedCalcForm, olItem))
            }}
          </li>
        </template>
      </ul>
    </el-form-item>
  </el-form>
  <div class="page-inner">
    <div class="poke-tb poke-tb--xscorll">
      <div
        class="poke-tb__item"
        :class="{
          cur: pokeItem.extraDesc.indexOf('玩家') > -1,
          default: pokeItem.extraDesc.indexOf('白') > -1,
        }"
        v-for="(pokeItem, pokeKey) in getTargetPokemonEnergy(
          helpSpeedCalcForm.pokemonId
        )"
        v-bind:key="`${pokeItem.id}_${pokeItem.useFoods.join('')}_${
          pokeItem.nameExtra || ''
        }_${pokeItem.extraDesc || ''}`"
      >
        <p>
          <i class="i i-rank" :class="`i-rank--${pokeKey + 1}`">{{
            pokeKey + 1
          }}</i>
        </p>
        <CptPoke
          :pokeId="pokeItem.id"
          :helpSpeed="pokeItem.helpSpeed"
          :foodPer="pokeItem.foodPer"
          :showKey="['helpSpeed', 'berry', 'pokeType', 'foodPer']"
        />
        <div>
          <div class="cpt-food all-food">
            <div
              class="cpt-food__item cur"
              v-for="(foodItem, foodKey) in pokeItem.useFoods"
              v-bind:key="foodKey"
            >
              <img
                v-lazy="`./img/food/${foodItem}.png`"
                :alt="FOOD_TYPES[foodItem]"
              />
              <p class="cpt-food__count">
                {{ pokeItem.food.count[foodItem].num[foodKey] }}
              </p>
            </div>
          </div>
        </div>
        <div class="poke-tb__energy">
          <p class="sptime">{{ pokeItem.nameExtra }}</p>
          <p class="cpt-pokemon__poketype1 xs">
            果{{ pokeItem.oneDayBerryEnergy }}
          </p>
          <div>
            <div class="cpt-food cpt-food--s all-food">
              <div
                class="cpt-food__item cur"
                v-for="(foodItem, foodKey) in pokeItem.oneDayFoodEnergy
                  .useFoods"
                v-bind:key="foodKey"
              >
                <img
                  v-lazy="`./img/food/${foodItem}.png`"
                  :alt="FOOD_TYPES[foodItem]"
                />
                <p class="cpt-food__count">
                  {{ pokeItem.oneDayFoodEnergy.count[foodKey] }}
                </p>
              </div>
            </div>
          </div>
          <p class="cpt-pokemon__poketype2 xs">
            食{{ pokeItem.oneDayFoodEnergy.allEnergy }}
          </p>
          <p class="res">
            <img class="icon" v-lazy="`./img/ui/energy.png`" />{{
              pokeItem.oneDayEnergy
            }}
          </p>
        </div>
        <pre
          v-if="pokeItem.extraDesc"
          class="sptime extra-desc"
          v-html="pokeItem.extraDesc"
        ></pre>
      </div>
    </div>
  </div>
  <el-form label-width="90px">
    <el-form-item>
      <div class="mod-tips">
        <p>* 数值均为程序预估结果，与实际有误差。</p>
        <p>* 结果为对应等级一天能量产出。</p>
        <p>* 非满包没开露营券，不含技能率，不含适应岛。</p>
        <p>* 游戏内不会显示帮手奖励后的时间。</p>
        <p>* 暂不支持帮手奖励相关计算。</p>
      </div>
    </el-form-item>
  </el-form>
</template>