<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { Place } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import CptEnergyItem from '../components/CptEnergy/EnergyItem.vue'
import SvgIcon from '../components/SvgIcon/IconItem.vue'
import CptDialogFilterPoke from '../components/DialogFilterPoke/ItemIndex.vue'
import CptAvatar from '../components/CptAvatar/ItemIndex.vue'
import {
  get,
  sortInObjectOptions,
  toHMInLang,
  getNum,
  fnAccumulation,
  getStageLevelPicId,
  containsAny,
  getDecimalNumber
} from '../utils/index.js'
import {
  getOneDayEnergy,
  getOneDayHelpCount,
  getNewFoodPer,
  getNewSkillPer,
  getNewMaxcarry,
  getNatureDetail
} from '../utils/energy.js'
import { getLevelIndexByEnergy } from '../utils/sleep.js'
import { gameMap, areaBonusMax } from '../config/game.js'
import { orgResetObjectInBox } from '../config/filterDialog.js'
import { pokedex } from '../config/pokedex.js'
import { NAV_HELPSPEEDCALC } from '../config/nav.js'
import {
  allHelpType,
  characterOptions,
  skillOptionsExtra,
  skillOptionsExtra2,
  skillOptionsHelpSpeed,
  skillOptionsFoodPer,
  skillOptionsSkillPer,
  skillOptionsSkillCarry,
  skillOptionsTxt,
  levelOptions
} from '../config/helpSpeed.js'
import { BERRY_TYPES } from '../config/valKey.js'

import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const localeLangId = computed(() => {
  return locale.value
})

import i18n from '../i18n'
const { t } = i18n.global

const navData = ref(NAV_HELPSPEEDCALC)
const byHelpSpeedRes = ref([])
const targetInList = ref([])
const otherLevelShow = [25, 30, 50, 60, 100]
const saveBoxData = ref('')
const uploadData = ref('')
const textareaBoxData = ref()
const helpSpeedCalcForm = ref({
  curMap: 0,
  pokemonId: 26,
  baseHelpSpeed: 2200, // Number
  level: 50, // Number
  isUseTicket: false, // Boolean: true/false
  isRightBerry: false, // Boolean: true/false
  skill: ['none'], // Array: ['none', 'hs', 'hm', 'fs', 'fm', 'hg1', 'hg2', 'hg3', 'hg4', 'hg5', 'cs', 'cm', 'cl']
  character: 'none', // String: none, hdown, hup, fdown, fup, hdownfup, hupfdown
  useFoods: [0, 0, 0],
  rankIndex: 1,
  resLength: 0,
  contrastPoke: null,
  isShiny: false,
  calcTime: 86400,
  areaBonus: 0,
  rankSort: 'energy'
})
const gameMapNew = ref(JSON.parse(JSON.stringify(gameMap)))
const subskillOn = computed(() => {
  const teamSkill = {
    helpBonus: {
      count: 0,
      energy: 0,
      energyList: [],
      list: []
    }
  }
  if (userTeam.value.list.length > 0) {
    // 统计出多少个金帮
    userTeam.value.list.forEach(pokeItem => {
      if (pokeItem.skill.includes('hg1')) {
        teamSkill.helpBonus.list.push(pokeItem.pokemonId)
        teamSkill.helpBonus.count++
      }
    })

    // 开始算金帮后的总能量
    let afterBonusList = []
    if (teamSkill.helpBonus.count > 0) {
      userTeam.value.list.forEach(pokeItem => {
        let skill = [...pokeItem.skill]
        if (skill.includes('hg1')) {
          skill = skill.filter(item => !(item.indexOf('hg') > -1))
        }
        skill.push(`hg${teamSkill.helpBonus.count}`)
        afterBonusList.push({
          ...JSON.parse(JSON.stringify(pokeItem)),
          skill
        })
      })
    } else {
      afterBonusList = [...userTeam.value.list]
    }
    teamSkill.helpBonus.energyList = getBoxCurEnergy(afterBonusList)
    teamSkill.helpBonus.energy = fnAccumulation(
      teamSkill.helpBonus.energyList,
      'oneDayEnergy'
    )
    // console.log(
    //   teamSkill.helpBonus.energyList,
    //   afterBonusList,
    //   teamSkill.helpBonus.energy
    // )
  }
  return teamSkill
})
const calcTimeConfig = [
  {
    name: `${t('PROP.whistle')}(${toHMInLang(3, '', localeLangId.value)})`,
    value: 10800
  },
  {
    name: '1日',
    value: 86400
  },
  {
    name: '1周(7日)',
    value: 604800
  }
]
const userPokemons = ref({
  list: []
})
const userTeam = ref({
  list: []
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
      if (pokedexItem.helpSpeed) {
        byHelpSpeedResIn
          .find(item => item.helpSpeed === pokedexItem.helpSpeed)
          .list.push(pokedexItem)
      }
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

const LS_NAME = 'myPokemonBox'
const getLSBOX = localStorage.getItem(LS_NAME)
if (getLSBOX) {
  userPokemons.value.list = JSON.parse(getLSBOX)
  saveBoxData.value = JSON.stringify(userPokemons.value.list)
}
const getLSFMBs = localStorage.getItem('PSC_FMBs')
if (getLSFMBs) {
  gameMapNew.value[0].berry = JSON.parse(getLSFMBs)
}
const getLSAB = localStorage.getItem('PSC_AB')
if (getLSAB) {
  helpSpeedCalcForm.value.areaBonus = +getLSAB
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
  if (basichelp >= 0.35) {
    // 所有帮速技能加起来不能大于35%
    basichelp = 0.35
  }
  let res = Math.floor(
    (Math.floor((1 - mainMuti) * (1 - basichelp) * (1 - levelUp) * 10000) /
      10000) *
      formData.baseHelpSpeed
  )
  if (helpSpeedCalcForm.value.isUseTicket) {
    res = Math.floor(res / 1.2)
  }
  return res
}

const addArrInOptions = (extraDesc, pokeItem, isPlayer, isRightBerry) => {
  isRightBerry = isRightBerry || helpSpeedCalcForm.value.isRightBerry
  const pokeLevel = pokeItem.level || helpSpeedCalcForm.value.level
  const pokeUseFoods = pokeItem.useFoods || helpSpeedCalcForm.value.useFoods
  const pokeUseSkill = pokeItem.skill || helpSpeedCalcForm.value.skill
  const newPokeItem = { ...pokeItem }
  newPokeItem.oneDayHelpCount = getOneDayHelpCount(
    newPokeItem.helpSpeed,
    newPokeItem.foodPer,
    +helpSpeedCalcForm.value.calcTime === 10800 ? 0 : newPokeItem.skillPer,
    helpSpeedCalcForm.value.calcTime
  )

  const resRankArr = []
  let tempFoodType = [
    [0, 0],
    [0, 1]
  ]
  if (pokeLevel < 30) {
    tempFoodType = [[0]]
  } else if (pokeLevel >= 60) {
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

  if (isPlayer) {
    tempFoodType = [[...pokeUseFoods]]
    if (pokeLevel >= 30 && pokeLevel < 60) {
      tempFoodType[0].splice(2, 1)
    } else if (pokeLevel < 30) {
      tempFoodType = [[0]]
    }
    // console.log(pokeUseFoods, tempFoodType)
  } else {
    const nArr = []
    for (let i = 0; i < tempFoodType.length; i++) {
      nArr.push(tempFoodType[i], tempFoodType[i])
    }
    tempFoodType = nArr
  }

  tempFoodType.forEach((arrFTItem, arrFTKey) => {
    let is2n = (arrFTKey + 1) % 2 === 0
    if (isPlayer) {
      is2n = pokeUseSkill.includes('berrys')
    }

    let arrFood = []
    if (newPokeItem.food) {
      arrFood = [
        newPokeItem.food.type[arrFTItem[0]],
        newPokeItem.food.type[arrFTItem[1]]
      ]
      if (pokeLevel < 30) {
        arrFood.splice(1, arrFood.length)
      } else if (pokeLevel >= 60) {
        arrFood.push(newPokeItem.food.type[arrFTItem[2]])
      }
    }
    resRankArr.push({
      ...newPokeItem,
      id: newPokeItem.id,
      nameExtra: is2n ? t('SHORT_SKILL.berrys') : '',
      extraDesc: extraDesc,
      pokeUseFoods: pokeUseFoods,
      ...getOneDayEnergy(
        newPokeItem,
        pokeLevel,
        arrFood,
        is2n ? true : false,
        isRightBerry,
        +helpSpeedCalcForm.value.areaBonus
      )
    })
  })
  return resRankArr
}

const getPlayerExtraDesc = pokemons => {
  let extraDesc = '自选'
  if (pokemons.skill.includes('hg1')) {
    extraDesc += `\n${t('SUBSKILLS_NAMES.3')}*1`
  }
  if (pokemons.skill.includes('hg2')) {
    extraDesc += `\n${t('SUBSKILLS_NAMES.3')}*2`
  }
  if (pokemons.skill.includes('hg3')) {
    extraDesc += `\n${t('SUBSKILLS_NAMES.3')}*3`
  }
  if (pokemons.skill.includes('hg4')) {
    extraDesc += `\n${t('SUBSKILLS_NAMES.3')}*4`
  }
  if (pokemons.skill.includes('hg5')) {
    extraDesc += `\n${t('SUBSKILLS_NAMES.3')}*5`
  }
  extraDesc += `\n${getNature(pokemons)}`
  return extraDesc
}

const getNature = pokemons => {
  const resTxt = characterOptions.find(
    item => item.label === pokemons.character
  )
  return `${t('PROP.nature')}:${getNatureDetail(resTxt, t)}`
}

const getTargetPokemonEnergy = (pokeId, isUseRankSort) => {
  let resRankArr = []
  const pokeItem = { ...pokedex[pokeId] }
  pokeItem.isShiny = helpSpeedCalcForm.value.isShiny
  pokeItem.helpSpeed = getNewHelpSpeed(
    helpSpeedCalcForm.value,
    helpSpeedCalcForm.value.level
  )
  pokeItem.foodPer = getNewFoodPer(helpSpeedCalcForm.value, pokeItem.foodPer)
  pokeItem.skillPer = getNewSkillPer(
    helpSpeedCalcForm.value,
    pokeItem.skillPer
  )
  pokeItem.maxcarry = getNewMaxcarry(
    helpSpeedCalcForm.value,
    pokeItem.maxcarry
  )

  resRankArr = resRankArr.concat(
    addArrInOptions(
      getPlayerExtraDesc(helpSpeedCalcForm.value),
      {
        ...pokeItem,
        skill: helpSpeedCalcForm.value.skill,
        character: helpSpeedCalcForm.value.character
      },
      true
    )
  ) // 玩家自选

  const hsDefaultOptions = {
    skill: ['none'], // Array: ['none', 'hs', 'hm', 'fs', 'fm', 'hg1', 'hg2', 'hg3', 'hg4', 'hg5']
    character: 'none' // String: none, hdown, hup, fdown, fup, hdownfup, hupfdown
  }

  if (helpSpeedCalcForm.value.contrastPoke) {
    const tempPokeItem = { ...pokedex[helpSpeedCalcForm.value.contrastPoke] }
    tempPokeItem.helpSpeed = getNewHelpSpeed(
      {
        baseHelpSpeed: tempPokeItem.helpSpeed,
        ...hsDefaultOptions
      },
      helpSpeedCalcForm.value.level
    )
    resRankArr = resRankArr.concat(addArrInOptions('对比白板', tempPokeItem))
  }

  const tempPokeItem = { ...pokedex[pokeId] }
  tempPokeItem.helpSpeed = getNewHelpSpeed(
    {
      baseHelpSpeed: tempPokeItem.helpSpeed,
      ...hsDefaultOptions
    },
    helpSpeedCalcForm.value.level
  )
  resRankArr = resRankArr.concat(addArrInOptions('白板', tempPokeItem))

  const tempPokeItem2 = { ...pokedex[pokeId] }
  const tempSCOptions2 = {
    skill: ['fs', 'fm'], // Array: ['none', 'hs', 'hm', 'fs', 'fm', 'hg1', 'hg2', 'hg3', 'hg4', 'hg5']
    character: 'hup' // String: none, hdown, hup, fdown, fup, hdownfup, hupfdown
  }
  const tempPokeItem3 = { ...pokedex[pokeId] }
  const tempSCOptions3 = {
    skill: ['hs', 'hm'], // Array: ['none', 'hs', 'hm', 'fs', 'fm', 'hg1', 'hg2', 'hg3', 'hg4', 'hg5']
    character: 'hupfdown' // String: none, hdown, hup, fdown, fup, hdownfup, hupfdown
  }
  const tempPokeItem4 = { ...pokedex[pokeId] }
  const tempSCOptions4 = {
    skill: ['fs', 'fm'], // Array: ['none', 'hs', 'hm', 'fs', 'fm', 'hg1', 'hg2', 'hg3', 'hg4', 'hg5']
    character: 'fup' // String: none, hdown, hup, fdown, fup, hdownfup, hupfdown
  }
  const tempPokeItem5 = { ...pokedex[pokeId] }
  const tempSCOptions5 = {
    skill: ['ss', 'sm'], // Array: ['none', 'hs', 'hm', 'fs', 'fm', 'hg1', 'hg2', 'hg3', 'hg4', 'hg5']
    character: 'sup' // String: none, hdown, hup, fdown, fup, hdownfup, hupfdown
  }
  const tempPokeItem6 = { ...pokedex[pokeId] }
  const tempSCOptions6 = {
    skill: ['hm', 'sm'], // Array: ['none', 'hs', 'hm', 'fs', 'fm', 'hg1', 'hg2', 'hg3', 'hg4', 'hg5']
    character: 'sup' // String: none, hdown, hup, fdown, fup, hdownfup, hupfdown
  }
  let tempExtra2 = `${t('PROP.nature')}:帮↑`
  let tempExtra3 = `${t('PROP.nature')}:${t('NATURE_NAMES.2')}`
  let tempExtra4 = `${t('PROP.nature')}:食↑`
  let tempExtra5 = `${t('PROP.nature')}:技↑`
  let tempExtra6 = `${t('PROP.nature')}:技↑`
  if (helpSpeedCalcForm.value.level < 50) {
    tempSCOptions2.skill = ['fm']
    tempSCOptions3.skill = ['hm']
    tempSCOptions4.skill = ['fm']
    tempSCOptions5.skill = ['sm']
    tempSCOptions6.skill = ['hm']
    tempExtra2 = `${t('PROP.nature')}:帮↑`
    tempExtra3 = `${t('PROP.nature')}:${t('NATURE_NAMES.2')}`
    tempExtra4 = `${t('PROP.nature')}:食↑`
    tempExtra5 = `${t('PROP.nature')}:技↑`
    tempExtra6 = `${t('PROP.nature')}:技↑`
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
  tempPokeItem2.skillPer = getNewSkillPer(
    {
      ...tempSCOptions2
    },
    tempPokeItem2.skillPer
  )
  resRankArr = resRankArr.concat(
    addArrInOptions(tempExtra2, { ...tempPokeItem2, ...tempSCOptions2 })
  )

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
  tempPokeItem3.skillPer = getNewSkillPer(
    {
      ...tempSCOptions3
    },
    tempPokeItem3.skillPer
  )
  resRankArr = resRankArr.concat(
    addArrInOptions(tempExtra3, { ...tempPokeItem3, ...tempSCOptions3 })
  )

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
  tempPokeItem4.skillPer = getNewSkillPer(
    {
      ...tempSCOptions4
    },
    tempPokeItem4.skillPer
  )
  resRankArr = resRankArr.concat(
    addArrInOptions(tempExtra4, { ...tempPokeItem4, ...tempSCOptions4 })
  )

  tempPokeItem5.helpSpeed = getNewHelpSpeed(
    {
      baseHelpSpeed: tempPokeItem5.helpSpeed,
      ...tempSCOptions5
    },
    helpSpeedCalcForm.value.level
  )
  tempPokeItem5.foodPer = getNewFoodPer(
    {
      ...tempSCOptions5
    },
    tempPokeItem5.foodPer
  )
  tempPokeItem5.skillPer = getNewSkillPer(
    {
      ...tempSCOptions5
    },
    tempPokeItem5.skillPer
  )
  resRankArr = resRankArr.concat(
    addArrInOptions(tempExtra5, { ...tempPokeItem5, ...tempSCOptions5 })
  )

  tempPokeItem6.helpSpeed = getNewHelpSpeed(
    {
      baseHelpSpeed: tempPokeItem6.helpSpeed,
      ...tempSCOptions6
    },
    helpSpeedCalcForm.value.level
  )
  tempPokeItem6.foodPer = getNewFoodPer(
    {
      ...tempSCOptions6
    },
    tempPokeItem6.foodPer
  )
  tempPokeItem6.skillPer = getNewSkillPer(
    {
      ...tempSCOptions6
    },
    tempPokeItem6.skillPer
  )
  resRankArr = resRankArr.concat(
    addArrInOptions(tempExtra6, { ...tempPokeItem6, ...tempSCOptions6 })
  )

  let sortArr = ['oneDayEnergy']
  if (isUseRankSort) {
    if (helpSpeedCalcForm.value.rankSort === 'berry') {
      sortArr = ['oneDayBerryEnergy', 'oneDayEnergy']
    } else if (helpSpeedCalcForm.value.rankSort === 'food') {
      sortArr = ['oneDayFoodEnergyAll', 'oneDayEnergy']
    } else if (helpSpeedCalcForm.value.rankSort === 'skillCount') {
      sortArr = ['oneDayHelpCountSkill', 'oneDayEnergy']
    }
  }
  const res = sortInObjectOptions(resRankArr, sortArr, 'down')

  helpSpeedCalcForm.value.rankIndex = res.findIndex(
    item => item.extraDesc.indexOf('自选') > -1
  )
  helpSpeedCalcForm.value.resLength = res.length

  return res
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
  helpSpeedCalcForm.value.useFoods = [0, 0, 0]
  setTargetListByHelp()
}
const getBoxCurEnergy = (dataList, isUseFilter, isUseRankSort) => {
  let resRankArr = []
  dataList.forEach(upItem => {
    let addIn = true
    if (isUseFilter) {
      if (FILTER_OBJECT.value.isShiny) {
        addIn = addIn && upItem.isShiny
      }
      if (FILTER_OBJECT.value.pokeTypes.length > 0) {
        addIn =
          addIn &&
          FILTER_OBJECT.value.pokeTypes.includes(
            pokedex[upItem.pokemonId].pokeType
          )
      }
      if (FILTER_OBJECT.value.berrys.length > 0) {
        addIn =
          addIn &&
          FILTER_OBJECT.value.berrys.includes(
            pokedex[upItem.pokemonId].berryType
          )
      }
      if (
        FILTER_OBJECT.value.foods.length > 0 &&
        pokedex[upItem.pokemonId].food
      ) {
        const useFoods = []
        upItem.useFoods.forEach(sf => {
          useFoods.push(pokedex[upItem.pokemonId].food.type[sf])
        })
        addIn = addIn && containsAny(FILTER_OBJECT.value.foods, useFoods)
      }
      if (FILTER_OBJECT.value.mainSkills.length > 0) {
        addIn =
          addIn &&
          FILTER_OBJECT.value.mainSkills.includes(
            pokedex[upItem.pokemonId].skillType
          )
      }
      if (FILTER_OBJECT.value.subSkills.length > 0) {
        addIn =
          addIn && containsAny(FILTER_OBJECT.value.subSkills, upItem.skill)
      }
    }
    if (addIn) {
      const pokeItem = {
        ...pokedex[upItem.pokemonId],
        ...upItem,
        baseHelpSpeed: pokedex[upItem.pokemonId].helpSpeed
      }
      pokeItem.helpSpeed = getNewHelpSpeed(
        { ...upItem, baseHelpSpeed: pokedex[upItem.pokemonId].helpSpeed },
        upItem.level
      )
      pokeItem.foodPer = getNewFoodPer(upItem, pokeItem.foodPer)
      pokeItem.skillPer = getNewSkillPer(upItem, pokeItem.skillPer)
      pokeItem.maxcarry = getNewMaxcarry(upItem, pokeItem.maxcarry)
      // console.log(pokeItem)
      resRankArr = resRankArr.concat(
        addArrInOptions(
          getNature(pokeItem),
          pokeItem,
          true,
          gameMapNew.value[helpSpeedCalcForm.value.curMap].berry.includes(
            pokeItem.berryType
          )
        )
      )
    }
  })

  let sortArr = ['oneDayEnergy']
  if (isUseRankSort) {
    if (helpSpeedCalcForm.value.rankSort === 'berry') {
      sortArr = ['oneDayBerryEnergy', 'oneDayEnergy']
    } else if (helpSpeedCalcForm.value.rankSort === 'food') {
      sortArr = ['oneDayFoodEnergyAll', 'oneDayEnergy']
    } else if (helpSpeedCalcForm.value.rankSort === 'skillCount') {
      sortArr = ['oneDayHelpCountSkill', 'oneDayEnergy']
    }
  }
  const res = sortInObjectOptions(resRankArr, sortArr, 'down')

  return res
}
const hanldeClickAddBox = () => {
  const curRes = {
    dataId: `${new Date().getTime()}_${helpSpeedCalcForm.value.pokemonId}`,
    pokemonId: helpSpeedCalcForm.value.pokemonId,
    // baseHelpSpeed: helpSpeedCalcForm.value.baseHelpSpeed,
    isShiny: helpSpeedCalcForm.value.isShiny,
    level: helpSpeedCalcForm.value.level,
    skill: [...helpSpeedCalcForm.value.skill],
    character: helpSpeedCalcForm.value.character,
    useFoods: [...helpSpeedCalcForm.value.useFoods]
  }
  userPokemons.value.list.push(curRes)
  saveBoxData.value = JSON.stringify(userPokemons.value.list)
  localStorage.setItem(LS_NAME, JSON.stringify(userPokemons.value.list))
  // console.log(curRes)
  ElMessage({
    message: '成功添加到盒子！',
    type: 'success'
  })
}

const closeDialogCB = () => {
  localStorage.setItem(LS_NAME, JSON.stringify(userPokemons.value.list))
  ElMessage({
    message: '修改宝可梦成功！',
    type: 'success'
  })
}
const handleClickTime = () => {
  if (helpSpeedCalcForm.value.calcTime === 'threehours') {
    helpSpeedCalcForm.value.isUseTicket = false
  }
}
const handleClickDelPoke = dataId => {
  const msg = '真的放生宝可梦?'
  if (confirm(msg)) {
    userPokemons.value.list.splice(
      userPokemons.value.list.findIndex(item => item.dataId === dataId),
      1
    )
    saveBoxData.value = JSON.stringify(userPokemons.value.list)
    localStorage.setItem(LS_NAME, JSON.stringify(userPokemons.value.list))
    ElMessage({
      message: '删除宝可梦成功！',
      type: 'success'
    })
  }
}
const handleClickCopyData = () => {
  textareaBoxData.value.select() // 选中文本
  document.execCommand('copy') // 执行浏览器复制命令
  ElMessage({
    message: '导出并复制到剪贴板成功！',
    type: 'success'
  })
}
const handleClickUploadData = () => {
  if (uploadData.value) {
    userPokemons.value.list = JSON.parse(uploadData.value)
    localStorage.setItem(LS_NAME, JSON.stringify(userPokemons.value.list))
    uploadData.value = ''
    ElMessage({
      message: '导入数据成功！',
      type: 'success'
    })
  }
}
const handleClickAddCurPokemonTeam = pokemonItem => {
  const curRes = {
    dataId: `${new Date().getTime()}_${pokemonItem.pokemonId}`,
    pokemonId: pokemonItem.pokemonId,
    // baseHelpSpeed: pokemonItem.baseHelpSpeed,
    isShiny: pokemonItem.isShiny,
    level: pokemonItem.level,
    skill: [...pokemonItem.skill],
    character: pokemonItem.character,
    useFoods: [...pokemonItem.pokeUseFoods]
  }
  userTeam.value.list.push(curRes)
  ElMessage({
    message: '加入队伍成功！',
    type: 'success'
  })
}
const hanldeClickAddTeam = () => {
  const curRes = {
    dataId: `${new Date().getTime()}_${helpSpeedCalcForm.value.pokemonId}`,
    pokemonId: helpSpeedCalcForm.value.pokemonId,
    // baseHelpSpeed: helpSpeedCalcForm.value.baseHelpSpeed,
    isShiny: helpSpeedCalcForm.value.isShiny,
    level: helpSpeedCalcForm.value.level,
    skill: [...helpSpeedCalcForm.value.skill],
    character: helpSpeedCalcForm.value.character,
    useFoods: [...helpSpeedCalcForm.value.useFoods]
  }
  userTeam.value.list.push(curRes)
  ElMessage({
    message: '加入队伍成功！',
    type: 'success'
  })
}
const handleClickDelPokeInTeam = dataId => {
  userTeam.value.list.splice(
    userTeam.value.list.findIndex(item => item.dataId === dataId),
    1
  )
}
const handleClickChangeMap = id => {
  helpSpeedCalcForm.value.curMap = id
}
const handleClickChangeFMBerrys = berryId => {
  if (gameMapNew.value[0].berry.includes(berryId)) {
    gameMapNew.value[0].berry = gameMapNew.value[0].berry.filter(
      item => item !== berryId
    )
  } else {
    if (gameMapNew.value[0].berry.join('') === '???') {
      gameMapNew.value[0].berry = []
    }
    gameMapNew.value[0].berry.push(berryId)
  }
  if (gameMapNew.value[0].berry.length === 0) {
    gameMapNew.value[0].berry = ['?', '?', '?']
  }
  localStorage.setItem('PSC_FMBs', JSON.stringify(gameMapNew.value[0].berry))
  // console.log(gameMapNew.value[0].berry)
}
const handleChangeAreaBonus = () => {
  localStorage.setItem('PSC_AB', helpSpeedCalcForm.value.areaBonus)
}
const handleClickAutoTeam = () => {
  userTeam.value.list = []
  const resList = getBoxCurEnergy(userPokemons.value.list)
  for (let i = 0; i < 5; i++) {
    if (resList[i]) {
      const curRes = {
        dataId: `${new Date().getTime()}_${i}_${resList[i].pokemonId}`,
        pokemonId: resList[i].pokemonId,
        // baseHelpSpeed: pokedex[resList[i].pokemonId].helpSpeed,
        isShiny: resList[i].isShiny,
        level: resList[i].level,
        skill: [...resList[i].skill],
        character: resList[i].character,
        useFoods: [...resList[i].pokeUseFoods]
      }
      // console.log(curRes)
      userTeam.value.list.push(curRes)
    }
  }
  if (userTeam.value.list.length > 0) {
    ElMessage({
      message: '自动组队成功！',
      type: 'success'
    })
  }
}

const FILTER_OBJECT = ref(JSON.parse(JSON.stringify(orgResetObjectInBox)))
const handleClickFilterReset = () => {
  FILTER_OBJECT.value = JSON.parse(JSON.stringify(orgResetObjectInBox))
}
const handleClickFilterPokes = (typeKey, val) => {
  if (FILTER_OBJECT.value[typeKey].includes(val)) {
    FILTER_OBJECT.value[typeKey] = FILTER_OBJECT.value[typeKey].filter(
      item => item !== val
    )
  } else {
    FILTER_OBJECT.value[typeKey].push(val)
  }
}

const getTeamAfterBonus = () => {
  let afterBonusList = []
  if (userTeam.value.list.length > 0) {
    userTeam.value.list.forEach(pokeItem => {
      const skill = [...pokeItem.skill].filter(
        item => !(item.indexOf('hg') > -1)
      )
      afterBonusList.push({
        ...JSON.parse(JSON.stringify(pokeItem)),
        skill
      })
    })
    afterBonusList = getBoxCurEnergy(afterBonusList)
  }
  return afterBonusList
}

const getTeamCurEnergy = () => {
  let energy = 0
  if (userTeam.value.list.length > 0) {
    const energyList = getTeamAfterBonus()
    energy = fnAccumulation(energyList, 'oneDayEnergy')
  }
  return energy
}

const getTeamCurFoods = () => {
  const foodRes = []
  if (subskillOn.value.helpBonus.energyList.length > 0) {
    subskillOn.value.helpBonus.energyList.forEach(pokeItem => {
      if (get('oneDayFoodEnergy.useFoods', pokeItem, 1)) {
        pokeItem.oneDayFoodEnergy.useFoods.forEach((foodId, foodKey) => {
          const findFromResArr = foodRes.filter(
            item => item.foodId === foodId
          )
          if (findFromResArr.length === 0) {
            foodRes.push({
              foodId: foodId,
              count: pokeItem.oneDayFoodEnergy.count[foodKey]
            })
          } else {
            findFromResArr[0].count += pokeItem.oneDayFoodEnergy.count[foodKey]
          }
        })
      }
      console.log(pokeItem)
    })
  }
  console.log(foodRes)
  return sortInObjectOptions(foodRes, ['count'], 'down')
}

const getTeamCurEnergyLevel = () => {
  const energy = getTeamCurEnergy()
  if (energy > 0) {
    return getLevelIndexByEnergy(
      gameMapNew.value[helpSpeedCalcForm.value.curMap].levelList,
      energy
    )
  }
  return 0
}

const handleClickChangeRankSort = rankSort => {
  helpSpeedCalcForm.value.rankSort = rankSort
}
const getNowUseRankSort = () => {
  let txt = '总能量'
  if (helpSpeedCalcForm.value.rankSort === 'berry') {
    txt = '树果能量'
  } else if (helpSpeedCalcForm.value.rankSort === 'food') {
    txt = '食材能量'
  } else if (helpSpeedCalcForm.value.rankSort === 'skillCount') {
    txt = '技能次数'
  }
  return txt
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
  <h2>{{ $t("PAGE_TITLE.helpspeedcalc") }}</h2>
  <el-form label-width="90px">
    <el-form-item :label="$t('PROP.pokemon')">
      <el-select
        v-model="helpSpeedCalcForm.pokemonId"
        filterable
        @change="handleChangePokemon()"
      >
        <template v-for="pokeItem in pokedex" :key="pokeItem.id">
          <el-option
            :label="`${$t(`POKEMON_NAME.${pokeItem.id}`)}-${
              pokeItem.helpSpeed
            }s`"
            :value="pokeItem.id"
          >
            <img
              class="icon"
              v-lazy="`./img/pokedex/${pokeItem.id}.png`"
              :alt="$t(`POKEMON_NAME.${pokeItem.id}`)"
              v-bind:key="pokeItem.id"
            />
            {{ $t(`POKEMON_NAME.${pokeItem.id}`) }}-{{ pokeItem.helpSpeed }}s
          </el-option>
        </template>
      </el-select>
    </el-form-item>
    <el-form-item>
      <i class="i i-rank" :class="`i-rank--${targetInList.sortIndex}`">{{
        targetInList.sortIndex
      }}</i>
      {{ helpSpeedCalcForm.baseHelpSpeed }}s
      <CptAvatar
        :pokeId="pokeItem.id"
        v-for="pokeItem in targetInList.list"
        v-bind:key="pokeItem.id"
      />
    </el-form-item>
    <el-form-item
      :label="$t('PROP.food')"
      v-if="pokedex[helpSpeedCalcForm.pokemonId].food"
    >
      <div
        class="cpt-food cpt-food--noborder"
        v-for="(subFoodItem, subKey) in 3"
        v-bind:key="subKey"
      >
        <el-radio-group
          size="small"
          v-model="helpSpeedCalcForm.useFoods[subKey]"
        >
          <template
            v-for="(allFoodItem, allKey) in pokedex[helpSpeedCalcForm.pokemonId]
              .food.type"
            v-bind:key="allKey"
          >
            <el-radio-button
              :label="allKey"
              v-if="
                pokedex[helpSpeedCalcForm.pokemonId].food.count[allFoodItem]
                  .num[subKey] > 0
              "
              style="--el-radio-button-checked-bg-color: #c2e4ff"
            >
              <div class="cpt-food__item">
                <img
                  v-lazy="`./img/food/${allFoodItem}.png`"
                  :alt="$t(`FOOD_TYPES.${allFoodItem}`)"
                />
                <div
                  class="cpt-food__count"
                  v-if="
                    pokedex[helpSpeedCalcForm.pokemonId].food.count[allFoodItem]
                      .num[subKey] > 0
                  "
                >
                  {{
                    pokedex[helpSpeedCalcForm.pokemonId].food.count[allFoodItem]
                      .num[subKey]
                  }}
                </div>
              </div>
            </el-radio-button>
          </template>
        </el-radio-group>
      </div>
    </el-form-item>
    <el-form-item label="当前等级(Lv.10-60)">
      <el-slider
        v-model="helpSpeedCalcForm.level"
        show-input
        :min="10"
        :max="60"
      />
      <div style="width: 100%">
        <el-radio-group v-model="helpSpeedCalcForm.level" size="small">
          <el-radio-button
            class="radiogroup--level"
            :label="cItem.label"
            v-for="cItem in levelOptions"
            v-bind:key="cItem.label"
            >{{ cItem.txt }}</el-radio-button
          >
        </el-radio-group>
      </div>
    </el-form-item>
    <el-form-item>
      <el-checkbox-group v-model="helpSpeedCalcForm.skill" :min="0" :max="5">
        <el-checkbox
          :label="skillItem.label"
          v-for="skillItem in skillOptionsExtra2"
          v-bind:key="skillItem.label"
        >
          <span class="cpt-skill cpt-skill--3">{{ $t(skillItem.txt) }}</span>
        </el-checkbox>
      </el-checkbox-group>
      <div style="margin-top: 3px; margin-left: 12px">
        <el-checkbox v-model="helpSpeedCalcForm.isShiny">
          {{ $t("PROP.shiny") }}
        </el-checkbox>
      </div>
    </el-form-item>
    <div class="cpt-form-item-half-wrap">
      <div class="cpt-form-item-half">
        <el-form-item
          :label="$t(skillOptionsHelpSpeed[0].txt).replace('S', '')"
        >
          <div style="width: 100%">
            <el-checkbox-group
              class="el-checkbox-group--inline"
              v-model="helpSpeedCalcForm.skill"
              :min="0"
              :max="5"
            >
              <el-checkbox-button
                :label="skillItem.label"
                v-for="(skillItem, skillKey) in skillOptionsHelpSpeed"
                v-bind:key="skillItem.label"
                ><span class="cpt-skill" :class="`cpt-skill--${skillItem.rare}`"
                  >{{ skillOptionsTxt[skillKey] }}{{ skillItem.txtExtra }}</span
                ></el-checkbox-button
              >
            </el-checkbox-group>
          </div>
        </el-form-item>
      </div>
      <div class="cpt-form-item-half">
        <el-form-item :label="$t(skillOptionsFoodPer[0].txt).replace('S', '')">
          <div style="width: 100%">
            <el-checkbox-group
              class="el-checkbox-group--inline"
              v-model="helpSpeedCalcForm.skill"
              :min="0"
              :max="5"
            >
              <el-checkbox-button
                :label="skillItem.label"
                v-for="(skillItem, skillKey) in skillOptionsFoodPer"
                v-bind:key="skillItem.label"
                ><span class="cpt-skill" :class="`cpt-skill--${skillItem.rare}`"
                  >{{ skillOptionsTxt[skillKey] }}{{ skillItem.txtExtra }}</span
                ></el-checkbox-button
              >
            </el-checkbox-group>
          </div>
        </el-form-item>
      </div>
      <div class="cpt-form-item-half">
        <el-form-item :label="$t(skillOptionsSkillPer[0].txt).replace('S', '')">
          <div style="width: 100%">
            <el-checkbox-group
              class="el-checkbox-group--inline"
              v-model="helpSpeedCalcForm.skill"
              :min="0"
              :max="5"
            >
              <el-checkbox-button
                :label="skillItem.label"
                v-for="(skillItem, skillKey) in skillOptionsSkillPer"
                v-bind:key="skillItem.label"
                ><span class="cpt-skill" :class="`cpt-skill--${skillItem.rare}`"
                  >{{ skillOptionsTxt[skillKey] }}{{ skillItem.txtExtra }}</span
                ></el-checkbox-button
              >
            </el-checkbox-group>
          </div>
        </el-form-item>
      </div>
      <div class="cpt-form-item-half">
        <el-form-item
          :label="$t(skillOptionsSkillCarry[0].txt).replace('S', '')"
        >
          <div style="width: 100%">
            <el-checkbox-group
              class="el-checkbox-group--inline"
              v-model="helpSpeedCalcForm.skill"
              :min="0"
              :max="5"
            >
              <el-checkbox-button
                :label="skillItem.label"
                v-for="(skillItem, skillKey) in skillOptionsSkillCarry"
                v-bind:key="skillItem.label"
                ><span class="cpt-skill" :class="`cpt-skill--${skillItem.rare}`"
                  >{{ skillOptionsTxt[skillKey] }}{{ skillItem.txtExtra }}</span
                ></el-checkbox-button
              >
            </el-checkbox-group>
          </div>
        </el-form-item>
      </div>
    </div>
    <el-form-item :label="$t(skillOptionsExtra[0].txt)">
      <div style="width: 100%">
        <el-checkbox-group
          class="el-checkbox-group--inline"
          v-model="helpSpeedCalcForm.skill"
          :min="0"
          :max="5"
        >
          <el-checkbox-button
            :label="skillItem.label"
            v-for="skillItem in skillOptionsExtra"
            v-bind:key="skillItem.label"
            ><span class="cpt-skill cpt-skill--3">{{
              skillItem.txtExtra
            }}</span></el-checkbox-button
          >
        </el-checkbox-group>
      </div>
      <div class="cpt-tips">* {{ $t("PAGE_HELPSPEEDCALC.tipsHS") }}</div>
    </el-form-item>
    <el-form-item :label="$t('PROP.nature')">
      <el-select filterable v-model="helpSpeedCalcForm.character">
        <el-option
          :label="getNatureDetail(cItem, $t)"
          v-for="cItem in characterOptions"
          v-bind:key="cItem.label"
          :class="{ vigour: cItem.txt.indexOf('帮↓') > -1 }"
          :value="cItem.label"
        >
          {{ getNatureDetail(cItem, $t) }}</el-option
        >
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="success" plain @click="hanldeClickAddBox()"
        ><SvgIcon type="box" />加入盒子</el-button
      >
      <el-button type="primary" plain @click="hanldeClickAddTeam()"
        ><SvgIcon type="team" />加入队伍</el-button
      >
    </el-form-item>
    <el-form-item :label="$t('OPTIONS.calcRes')">
      <ul>
        <li>
          Lv.{{ helpSpeedCalcForm.level }}:
          <span class="sptime"
            >{{
              getNewHelpSpeed(helpSpeedCalcForm, helpSpeedCalcForm.level)
            }}s</span
          >
          /
          {{
            toHMInLang(
              getNewHelpSpeed(helpSpeedCalcForm, helpSpeedCalcForm.level),
              "sec",
              localeLangId
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
            Lv.{{ olItem }}:
            <span class="sptime"
              >{{ getNewHelpSpeed(helpSpeedCalcForm, olItem) }}s</span
            >
            /
            {{
              toHMInLang(
                getNewHelpSpeed(helpSpeedCalcForm, olItem),
                "sec",
                localeLangId
              )
            }}
          </li>
        </template>
      </ul>
    </el-form-item>
    <el-form-item>
      <template #label>
        <div>
          <el-icon size="16" style="vertical-align: middle"><Place /></el-icon
          >{{ $t("OPTIONS.formLableCurIland") }}
        </div>
      </template>
      <el-switch
        v-if="navData.navIndex === 0"
        v-model="helpSpeedCalcForm.isRightBerry"
        inline-prompt
        :active-text="`${$t('OPTIONS.yes')}(${$t('OPTIONS.doubleEnergy')})`"
        :inactive-text="$t('OPTIONS.no')"
        style="--el-switch-on-color: #ffaf00"
      />
      <ul class="cpt-select-list cpt-select-list--iland" v-else>
        <template v-for="(mapItem, mapIndex) in gameMapNew">
          <li
            class="cpt-select-list__item"
            v-if="!(mapItem.id.indexOf('berry_') > -1)"
            v-bind:key="mapItem.id"
            :class="{ cur: helpSpeedCalcForm.curMap === mapIndex }"
            @click="handleClickChangeMap(mapIndex)"
          >
            <div class="cpt-select-list__name">
              {{ $t(`ILAND.${mapItem.id}`) }}
              <div>
                <div
                  class="cpt-food cpt-food--s berry"
                  v-for="(berryItem, berryKey) in mapItem.berry"
                  v-bind:key="berryKey"
                >
                  <div class="cpt-food__item">
                    <img
                      v-if="berryItem !== '?'"
                      v-lazy="`./img/berry/${berryItem}.png`"
                      :alt="$t(`BERRY_TYPES.${berryItem}`)"
                    />
                    <template v-else>?</template>
                  </div>
                </div>
              </div>
            </div>
            <img
              v-if="mapItem.pic"
              class="cpt-select-list__bg"
              v-lazy="`./img/ui/${mapItem.pic}.png`"
              :alt="mapItem.name"
            />
          </li>
        </template>
      </ul>
      <div
        style="width: 100%"
        v-if="navData.navIndex !== 0 && helpSpeedCalcForm.curMap === 0"
      >
        <ul class="cpt-select-list cpt-select-list--berry">
          <template
            v-for="(mapItem, key) in BERRY_TYPES"
            v-bind:key="`berry_${$t(`BERRY_TYPES.${key}`)}`"
          >
            <li
              class="cpt-select-list__item"
              @click="handleClickChangeFMBerrys(+key)"
              :class="{ cur: gameMapNew[0].berry.includes(+key) }"
            >
              <div class="cpt-select-list__name">
                <div class="cpt-food cpt-food--s berry">
                  <div class="cpt-food__item">
                    <img
                      v-lazy="`./img/berry/${+key}.png`"
                      :alt="$t(`BERRY_TYPES.${+key}`)"
                    />
                  </div>
                </div>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </el-form-item>
    <el-form-item :label="$t('PROP.areaBonus')">
      <div class="el-form-slider--bonus">
        <el-slider
          size="small"
          v-model="helpSpeedCalcForm.areaBonus"
          show-input
          show-stops
          :min="0"
          :max="areaBonusMax"
          :step="5"
          @change="handleChangeAreaBonus()"
        />
      </div>
    </el-form-item>
    <el-form-item :label="$t('PROP.ticket')">
      <el-switch
        v-model="helpSpeedCalcForm.isUseTicket"
        inline-prompt
        :active-text="`${$t('OPTIONS.use')}(${$t('PROP.helpSpeed')}1.2倍)`"
        :inactive-text="$t('OPTIONS.nouse')"
        style="--el-switch-on-color: #ffaf00"
      />
    </el-form-item>
    <el-form-item label="持续时间">
      <el-radio-group
        v-model="helpSpeedCalcForm.calcTime"
        @change="handleClickTime()"
      >
        <template v-for="cItem in calcTimeConfig" v-bind:key="cItem.name">
          <el-radio-button
            size="small"
            class="radiogroup--primary"
            :label="cItem.value"
            >{{ cItem.name }}</el-radio-button
          >
        </template>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-radio-group
        class="first-page-nav"
        v-model="navData.navIndex"
        fill="#41ae3c"
      >
        <template v-for="cItem in navData.navList" v-bind:key="cItem.name">
          <el-radio-button :label="cItem.value">
            <SvgIcon :type="cItem.icon" v-if="cItem.icon" />{{ cItem.name
            }}<span v-if="cItem.value === 1"
              >({{ userPokemons.list.length }})</span
            ><span v-if="cItem.value === 2"
              >({{ userTeam.list.length }})</span
            ></el-radio-button
          >
        </template>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="快速等级" v-if="navData.navIndex === 0">
      <el-radio-group v-model="helpSpeedCalcForm.level" size="small">
        <el-radio-button
          class="radiogroup--level"
          :label="cItem.label"
          v-for="cItem in levelOptions"
          v-bind:key="cItem.label"
          >{{ cItem.txt }}</el-radio-button
        >
      </el-radio-group>
      <div style="width: 100%">
        当前等级：Lv.<span class="sptime">{{ helpSpeedCalcForm.level }}</span>
      </div>
      <div style="width: 100%">
        当前{{ getNowUseRankSort() }}排位：第
        <i
          class="i i-rank"
          :class="`i-rank--${helpSpeedCalcForm.rankIndex + 1}`"
          >{{ helpSpeedCalcForm.rankIndex + 1 }}</i
        >
        / {{ helpSpeedCalcForm.resLength }} 位
      </div>
      <el-select
        v-model="helpSpeedCalcForm.contrastPoke"
        :placeholder="$t('PLACEHOLDER.contrast')"
        filterable
        clearable
        class="mb3"
      >
        <template v-for="pokeItem in pokedex" :key="pokeItem.id">
          <el-option
            :label="`对比${$t(`POKEMON_NAME.${pokeItem.id}`)}-${
              pokeItem.helpSpeed
            }s`"
            :value="pokeItem.id"
          >
            <img
              class="icon"
              v-lazy="`./img/pokedex/${pokeItem.id}.png`"
              :alt="$t(`POKEMON_NAME.${pokeItem.id}`)"
              v-bind:key="pokeItem.id"
            />
            {{ $t(`POKEMON_NAME.${pokeItem.id}`) }}-{{ pokeItem.helpSpeed }}s
          </el-option>
        </template>
      </el-select>
    </el-form-item>
    <el-form-item class="el-btn-s">
      <el-button
        size="small"
        color="#fdb43b"
        :plain="helpSpeedCalcForm.rankSort !== 'energy'"
        @click="handleClickChangeRankSort('energy')"
        >总能量↓</el-button
      >
      <el-button
        size="small"
        color="#41ae3c"
        :plain="helpSpeedCalcForm.rankSort !== 'berry'"
        @click="handleClickChangeRankSort('berry')"
        >树果能量↓</el-button
      >
      <el-button
        size="small"
        color="#fcc307"
        :plain="helpSpeedCalcForm.rankSort !== 'food'"
        @click="handleClickChangeRankSort('food')"
        >食材能量↓</el-button
      >
      <el-button
        size="small"
        color="#5cb3cc"
        :plain="helpSpeedCalcForm.rankSort !== 'skillCount'"
        @click="handleClickChangeRankSort('skillCount')"
        >技能次数↓</el-button
      >
    </el-form-item>
  </el-form>
  <div class="page-inner">
    <div class="poke-tb poke-tb--xscorll mb3" v-if="navData.navIndex === 0">
      <CptEnergyItem
        :pokeItem="pokeItem"
        :pokeKey="pokeKey"
        :showKey="[
          'helpSpeed',
          'helpSpeedHM',
          'berry',
          'pokeType',
          'foodPer',
          'skillPer',
          'maxcarry',
        ]"
        :class="{
          cur: pokeItem.extraDesc.indexOf('自选') > -1,
          default: pokeItem.extraDesc.indexOf('白') > -1,
          contrast: pokeItem.extraDesc.indexOf('对比') > -1,
        }"
        v-for="(pokeItem, pokeKey) in getTargetPokemonEnergy(
          helpSpeedCalcForm.pokemonId,
          true
        )"
        v-bind:key="`${pokeItem.id}_${pokeKey}_${pokeItem.useFoods.join('')}_${
          pokeItem.nameExtra || ''
        }_${pokeItem.extraDesc || ''}`"
        :isHightLightBerry="helpSpeedCalcForm.isRightBerry"
      />
    </div>
    <div v-if="navData.navIndex === 1">
      <h3>
        <SvgIcon type="box" size="small" />宝可梦盒子<span class="extra"
          >({{ getBoxCurEnergy(userPokemons.list, true).length }} /
          {{ userPokemons.list.length }})</span
        >
      </h3>
      <textarea
        type="text"
        ref="textareaBoxData"
        class="textarea textarea--data"
        v-model="saveBoxData"
        readonly
      ></textarea>
      <el-button
        type="success"
        size="small"
        plain
        @click="handleClickCopyData()"
        ><SvgIcon type="download" />导出数据到剪贴板</el-button
      >
      <el-popover
        placement="bottom"
        title="导入数据"
        trigger="click"
        :width="200"
      >
        <template #reference>
          <el-button type="primary" size="small" plain
            ><SvgIcon type="upload" />导入数据</el-button
          >
        </template>
        <el-input
          class="mb3"
          v-model="uploadData"
          style="width: 100%"
          :rows="2"
          type="textarea"
        />
        <el-button
          type="primary"
          size="small"
          plain
          @click="handleClickUploadData()"
          ><SvgIcon type="upload" />导入数据</el-button
        >
      </el-popover>
      <CptDialogFilterPoke
        :filterObj="FILTER_OBJECT"
        :handleClickFilterPokes="handleClickFilterPokes"
        :showKey="[
          'isShiny',
          'pokeType',
          'berryType',
          'foodType',
          'mainSkill',
          'subSkill',
          'resetBtn',
        ]"
        :handleClickFilterReset="handleClickFilterReset"
      />
      <div
        class="poke-tb poke-tb--xscorll poke-tb--box"
        v-if="userPokemons.list.length > 0"
      >
        <CptEnergyItem
          class="poke-tb__item--hasclose"
          :pokeItem="pokeItem"
          :pokeKey="pokeKey"
          :showKey="[
            'helpSpeed',
            'helpSpeedHM',
            'berry',
            'pokeType',
            'foodPer',
            'skillPer',
            'skillType',
            'maxcarry',
          ]"
          v-for="(pokeItem, pokeKey) in getBoxCurEnergy(
            userPokemons.list,
            true,
            true
          )"
          v-bind:key="`${pokeItem.dataId}`"
          :isHightLightBerry="
            gameMapNew[helpSpeedCalcForm.curMap].berry.includes(
              pokeItem.berryType
            )
          "
          :editPokeData="
            userPokemons.list.find((item) => item.dataId === pokeItem.dataId)
          "
          :isEdit="true"
          :closeDialogCB="closeDialogCB"
        >
          <el-button
            type="success"
            size="small"
            plain
            @click="handleClickAddCurPokemonTeam(pokeItem)"
            ><SvgIcon type="team" />加入</el-button
          >
          <i class="i i-close" @click="handleClickDelPoke(pokeItem.dataId)"></i>
        </CptEnergyItem>
      </div>
      <div class="cpt-empty" v-else>{{ $t("OPTIONS.noHasPokemons") }}</div>
      <div
        class="cpt-empty"
        v-if="getBoxCurEnergy(userPokemons.list, true).length === 0"
      >
        {{ $t("OPTIONS.noHasPokemons") }}
      </div>
    </div>
    <div v-if="navData.navIndex === 2">
      <h3>
        <SvgIcon type="team" />队伍<span class="extra"
          >({{ userTeam.list.length }})</span
        >
      </h3>
      <el-button
        type="success"
        size="small"
        plain
        :disabled="userPokemons.list.length === 0"
        @click="handleClickAutoTeam()"
        >从盒子自动组队(能量最高的前5)</el-button
      >
      <el-row>
        <el-col style="max-width: 9em">
          {{ $t(`ILAND.${gameMapNew[helpSpeedCalcForm.curMap].id}`) }}(+<span
            class="sptime"
            >{{ helpSpeedCalcForm.areaBonus }}</span
          >%)
        </el-col>
        <el-col span="12">
          <img
            class="icon"
            v-lazy="
              `./img/ui/${getStageLevelPicId(
                gameMapNew[0].levelList[getTeamCurEnergyLevel()].name
              )}.png`
            "
          />{{
            $t(
              `LEVEL_TITLE.${
                gameMapNew[0].levelList[getTeamCurEnergyLevel()].nameId
              }`
            )
          }}{{ gameMapNew[0].levelList[getTeamCurEnergyLevel()].nameIndex }}
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          队伍{{ $t("PROP.energy") }}：
          <img class="icon" v-lazy="`./img/ui/energy.png`" /><span
            class="sptime"
          >
            <template v-if="subskillOn.helpBonus.energy > 0">
              {{ getNum(subskillOn.helpBonus.energy) }}</template
            ><template v-else>{{ getNum(getTeamCurEnergy()) }}</template></span
          ><template v-if="subskillOn.helpBonus.count > 0"
            >(全队技能生效中)</template
          >
        </el-col>
      </el-row>
      <el-row v-if="getTeamCurFoods().length > 0">
        <el-col>
          食材：
          <div class="cpt-food all-food">
            <template
              v-for="foodItem in getTeamCurFoods()"
              v-bind:key="`teamfood_${foodItem.foodId}`"
            >
              <div class="cpt-food__item cur">
                <img
                  v-lazy="`./img/food/${foodItem.foodId}.png`"
                  :alt="$t(`FOOD_TYPES.${foodItem.foodId}`)"
                />
                <p class="cpt-food__count">
                  {{ getDecimalNumber(foodItem.count, 1) }}
                </p>
              </div>
            </template>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="subskillOn.helpBonus.count > 0">
        全队技能：
        <span class="cpt-skill cpt-skill--3">{{
          $t("SUBSKILLS_NAMES.3")
        }}</span>
        * {{ subskillOn.helpBonus.count }}
        <CptAvatar
          :pokeId="pokeId"
          v-for="pokeId in subskillOn.helpBonus.list"
          v-bind:key="pokeId"
        />
      </el-row>
      <div
        class="poke-tb poke-tb--xscorll poke-tb--box"
        v-if="userTeam.list.length > 0"
      >
        <CptEnergyItem
          class="poke-tb__item--hasclose"
          :pokeItem="pokeItem"
          :pokeKey="pokeKey"
          :showKey="[
            'helpSpeed',
            'helpSpeedHM',
            'berry',
            'pokeType',
            'foodPer',
            'skillPer',
            'skillType',
            'maxcarry',
          ]"
          v-for="(pokeItem, pokeKey) in getBoxCurEnergy(
            userTeam.list,
            false,
            true
          )"
          v-bind:key="`${pokeItem.dataId}`"
          :isHightLightBerry="
            gameMapNew[helpSpeedCalcForm.curMap].berry.includes(
              pokeItem.berryType
            )
          "
          :showAfterBonusInfo="
            subskillOn.helpBonus.energyList.length > 0 &&
            subskillOn.helpBonus.energyList.find(
              (item) => item.dataId === pokeItem.dataId
            ).oneDayEnergy !== pokeItem.oneDayEnergy
          "
          :pokeItemAfterBonus="
            subskillOn.helpBonus.energyList.find(
              (item) => item.dataId === pokeItem.dataId
            )
          "
          :editPokeData="
            userTeam.list.find((item) => item.dataId === pokeItem.dataId)
          "
          :isEdit="true"
        >
          <i
            class="i i-close"
            @click="handleClickDelPokeInTeam(pokeItem.dataId)"
          ></i>
        </CptEnergyItem>
      </div>
      <div class="cpt-empty" v-else>{{ $t("OPTIONS.noHasPokemons") }}</div>
    </div>
  </div>
  <div class="page-inner cpt-tips">
    <p>* {{ $t("TIPS.energy1") }}</p>
    <p>* {{ $t("TIPS.energy2") }}</p>
    <p>* 非满包满活力，技能型宝可梦更容易触发技能。</p>
    <p>* 宝可梦盒子仅支持本地存储，不支持云存档。</p>
  </div>
</template>