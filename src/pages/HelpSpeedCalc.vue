<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import CptEnergyItem from '../components/CptEnergy/EnergyItem.vue'
import SvgIcon from '../components/SvgIcon/IconItem.vue'
import {
  get,
  sortInObjectOptions,
  toHMInLang,
  getNum,
  fnAccumulation,
  getStageLevelPicId
} from '../utils/index.js'
import {
  getOneDayEnergy,
  getOneDayHelpCount,
  getNewFoodPer,
  getNewSkillPer
} from '../utils/energy.js'
import { getLevelIndexByEnergy } from '../utils/sleep.js'
import { gameMap } from '../config/game.js'
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
  levelOptions
} from '../config/helpSpeed.js'

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
  skill: ['none'], // Array: ['none', 'hs', 'hm', 'fs', 'fm', 'hg1', 'hg2', 'hg3', 'hg4', 'hg5']
  character: 'none', // String: none, hdown, hup, fdown, fup, hdownfup, hupfdown
  useFoods: [0, 0, 0],
  rankIndex: 1,
  resLength: 0,
  contrastPoke: null,
  isShiny: false,
  calcTime: 86400,
  areaBonus: 0
})
const calcTimeConfig = ref([
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
])
const userPokemons = ref({
  list: []
})
const userPokemonsNoSvae = ref({
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
  return `${t('PROP.nature')}:${getNatureDetail(resTxt)}`
}

const getTargetPokemonEnergy = pokeId => {
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
  pokeItem.skillPer = getNewSkillPer(
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
  pokeItem.skillPer = getNewSkillPer(
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
  pokeItem.skillPer = getNewSkillPer(
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

  const res = sortInObjectOptions(resRankArr, ['oneDayEnergy'], 'down')

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

const getNatureDetail = cItem => {
  let natureInfo = ''
  if (cItem.label === 'none') {
    return t(`OPTIONS.${cItem.txt}`)
  }
  if (get('useNatures', cItem, 1)) {
    cItem.useNatures.forEach((natureId, natureIndex) => {
      natureInfo += t(`NATURE_NAMES.${natureId}`)
      if (natureIndex % 2 === 0 && cItem.useNatures.length > 1) {
        natureInfo += '、'
      }
    })
  }
  natureInfo += cItem.txt
  return natureInfo
}

const handleChangePokemon = () => {
  helpSpeedCalcForm.value.baseHelpSpeed =
    pokedex[helpSpeedCalcForm.value.pokemonId].helpSpeed
  helpSpeedCalcForm.value.useFoods = [0, 0, 0]
  setTargetListByHelp()
}

const getBoxCurEnergy = dataList => {
  let resRankArr = []
  dataList.forEach(upItem => {
    const pokeItem = {
      ...pokedex[upItem.pokemonId],
      ...upItem
    }
    pokeItem.helpSpeed = getNewHelpSpeed(upItem, upItem.level)
    pokeItem.foodPer = getNewFoodPer(upItem, pokeItem.foodPer)
    pokeItem.skillPer = getNewSkillPer(upItem, pokeItem.skillPer)
    resRankArr = resRankArr.concat(
      addArrInOptions(
        getNature(pokeItem),
        pokeItem,
        true,
        gameMap[helpSpeedCalcForm.value.curMap].berry.includes(
          pokeItem.berryType
        )
      )
    )
  })
  const res = sortInObjectOptions(resRankArr, ['oneDayEnergy'], 'down')
  return res
}
const LS_NAME = 'myPokemonBox'
const getLSBOX = localStorage.getItem(LS_NAME)
if (getLSBOX) {
  userPokemons.value.list = JSON.parse(getLSBOX)
  saveBoxData.value = JSON.stringify(userPokemons.value.list)
}
const hanldeClickAddBox = () => {
  const curRes = {
    dataId: `${new Date().getTime()}_${helpSpeedCalcForm.value.pokemonId}`,
    pokemonId: helpSpeedCalcForm.value.pokemonId,
    baseHelpSpeed: helpSpeedCalcForm.value.baseHelpSpeed,
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
const handleClickTime = () => {
  if (helpSpeedCalcForm.value.calcTime === 'threehours') {
    helpSpeedCalcForm.value.isUseTicket = false
  }
}
const handleClickDelPoke = dataId => {
  const msg = 'Are you going to delete Pokémon?'
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
const hanldeClickAddBoxTemp = () => {
  const curRes = {
    dataId: `${new Date().getTime()}_${helpSpeedCalcForm.value.pokemonId}`,
    pokemonId: helpSpeedCalcForm.value.pokemonId,
    baseHelpSpeed: helpSpeedCalcForm.value.baseHelpSpeed,
    isShiny: helpSpeedCalcForm.value.isShiny,
    level: helpSpeedCalcForm.value.level,
    skill: [...helpSpeedCalcForm.value.skill],
    character: helpSpeedCalcForm.value.character,
    useFoods: [...helpSpeedCalcForm.value.useFoods]
  }
  userPokemonsNoSvae.value.list.push(curRes)
  ElMessage({
    message: '加入队伍成功！',
    type: 'success'
  })
}
const handleClickDelPoke2 = dataId => {
  userPokemonsNoSvae.value.list.splice(
    userPokemonsNoSvae.value.list.findIndex(item => item.dataId === dataId),
    1
  )
}
const handleClickChangeMap = id => {
  helpSpeedCalcForm.value.curMap = id
}
const handleClickGetMostEnergyPokemons = () => {
  userPokemonsNoSvae.value.list = []
  const resList = getBoxCurEnergy(userPokemons.value.list)
  for (let i = 0; i < 5; i++) {
    if (resList[i]) {
      const curRes = {
        dataId: `${new Date().getTime()}_${resList[i].pokemonId}`,
        pokemonId: resList[i].pokemonId,
        baseHelpSpeed: resList[i].baseHelpSpeed,
        isShiny: resList[i].isShiny,
        level: resList[i].level,
        skill: [...resList[i].skill],
        character: resList[i].character,
        useFoods: [...resList[i].pokeUseFoods]
      }
      userPokemonsNoSvae.value.list.push(curRes)
    }
  }
  if (userPokemonsNoSvae.value.list.length > 0) {
    ElMessage({
      message: '自动组队成功！',
      type: 'success'
    })
  }
}

const getTeamCurEnergy = () => {
  const resList = getBoxCurEnergy(userPokemonsNoSvae.value.list)
  if (userPokemonsNoSvae.value.list.length > 0) {
    return fnAccumulation(resList, 'oneDayEnergy')
  }
  return 0
}

const getTeamCurEnergyLevel = () => {
  const energy = getTeamCurEnergy()
  if (energy > 0) {
    return getLevelIndexByEnergy(
      gameMap[helpSpeedCalcForm.value.curMap].levelList,
      energy
    )
  }
  return 0
}

onMounted(() => {
  byHelpSpeedRes.value = initFilterGroup()
  setTargetListByHelp()

  // debug
  // const tempPokeItem2 = { ...pokedex[282] }
  // const res1 = getNewHelpSpeed(
  //   {
  //     baseHelpSpeed: tempPokeItem2.helpSpeed,
  //     ...{
  //       skill: ['hs'],
  //       character: ''
  //     }
  //   },
  //   35
  // )
  // const res2 = getNewHelpSpeed(
  //   {
  //     baseHelpSpeed: tempPokeItem2.helpSpeed,
  //     ...{
  //       skill: ['hs', 'hg2'],
  //       character: ''
  //     }
  //   },
  //   35
  // )
  // console.log(res1, toHMInLang(res1, 'sec', localeLangId))
  // console.log(res2, toHMInLang(res2, 'sec', localeLangId))
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
      <span
        class="cpt-avatar"
        v-for="pokeItem in targetInList.list"
        v-bind:key="pokeItem.id"
      >
        <img
          class="cpt-avatar__pic"
          v-lazy="`./img/pokedex/${pokeItem.id}.png`"
          :alt="$t(`POKEMON_NAME.${pokeItem.id}`)"
        />
      </span>
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
    <el-form-item :label="$t(skillOptionsHelpSpeed[0].txt).replace('S', '')">
      <div style="width: 100%">
        <el-checkbox-group
          class="el-checkbox-group--inline"
          v-model="helpSpeedCalcForm.skill"
          :min="0"
          :max="5"
        >
          <el-checkbox-button
            :label="skillItem.label"
            v-for="skillItem in skillOptionsHelpSpeed"
            v-bind:key="skillItem.label"
            ><span class="cpt-skill" :class="`cpt-skill--${skillItem.rare}`"
              >{{ skillItem.txtExtra.indexOf("7") > -1 ? "S" : "M"
              }}{{ skillItem.txtExtra }}</span
            ></el-checkbox-button
          >
        </el-checkbox-group>
      </div>
    </el-form-item>
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
            v-for="skillItem in skillOptionsFoodPer"
            v-bind:key="skillItem.label"
            ><span class="cpt-skill" :class="`cpt-skill--${skillItem.rare}`"
              >{{ skillItem.txtExtra.indexOf("18") > -1 ? "S" : "M"
              }}{{ skillItem.txtExtra }}</span
            ></el-checkbox-button
          >
        </el-checkbox-group>
      </div>
    </el-form-item>
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
            v-for="skillItem in skillOptionsSkillPer"
            v-bind:key="skillItem.label"
            ><span class="cpt-skill" :class="`cpt-skill--${skillItem.rare}`"
              >{{ skillItem.txtExtra.indexOf("18") > -1 ? "S" : "M"
              }}{{ skillItem.txtExtra }}</span
            ></el-checkbox-button
          >
        </el-checkbox-group>
      </div>
    </el-form-item>
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
      <div class="mod-tips">* {{ $t("PAGE_HELPSPEEDCALC.tipsHS") }}</div>
    </el-form-item>
    <el-form-item :label="$t('PROP.nature')">
      <el-select filterable v-model="helpSpeedCalcForm.character">
        <el-option
          :label="getNatureDetail(cItem)"
          v-for="cItem in characterOptions"
          v-bind:key="cItem.label"
          :class="{ vigour: cItem.txt.indexOf('帮↓') > -1 }"
          :value="cItem.label"
        >
          {{ getNatureDetail(cItem) }}</el-option
        >
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="success" plain @click="hanldeClickAddBox()"
        ><SvgIcon type="box" />加入盒子</el-button
      >
      <el-button type="primary" plain @click="hanldeClickAddBoxTemp()"
        ><SvgIcon type="team" />加入队伍</el-button
      >
    </el-form-item>
    <el-form-item label="计算结果">
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
    <el-form-item :label="$t('OPTIONS.formLableCurIland')">
      <el-switch
        v-if="navData.navIndex === 0"
        v-model="helpSpeedCalcForm.isRightBerry"
        inline-prompt
        :active-text="`${$t('OPTIONS.yes')}(${$t('OPTIONS.doubleEnergy')})`"
        :inactive-text="$t('OPTIONS.no')"
        style="--el-switch-on-color: #ffaf00"
      />
      <ul class="cpt-select-list cpt-select-list--iland" v-else>
        <template v-for="(mapItem, mapIndex) in gameMap">
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
    </el-form-item>
    <el-form-item :label="$t('PROP.areaBonus')">
      <div class="el-form-slider--bonus">
        <el-slider
          size="small"
          v-model="helpSpeedCalcForm.areaBonus"
          show-input
          show-stops
          :min="0"
          :max="60"
          :step="5"
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
    <el-form-item label="时间">
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
              >({{ userPokemonsNoSvae.list.length }})</span
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
        当前能量排位：第
        <i
          class="i i-rank"
          :class="`i-rank--${helpSpeedCalcForm.rankIndex + 1}`"
          >{{ helpSpeedCalcForm.rankIndex + 1 }}</i
        >
        / {{ helpSpeedCalcForm.resLength }} 位
      </div>
      <el-select
        v-model="helpSpeedCalcForm.contrastPoke"
        placeholder="请选择要对比的宝可梦"
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
        ]"
        :class="{
          cur: pokeItem.extraDesc.indexOf('自选') > -1,
          default: pokeItem.extraDesc.indexOf('白') > -1,
          contrast: pokeItem.extraDesc.indexOf('对比') > -1,
        }"
        v-for="(pokeItem, pokeKey) in getTargetPokemonEnergy(
          helpSpeedCalcForm.pokemonId
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
          >({{ userPokemons.list.length }})</span
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
          ]"
          v-for="(pokeItem, pokeKey) in getBoxCurEnergy(userPokemons.list)"
          v-bind:key="`${pokeItem.dataId}_${
            pokeItem.id
          }_${pokeKey}_${pokeItem.useFoods.join('')}_${
            pokeItem.nameExtra || ''
          }`"
          :isHightLightBerry="
            gameMap[helpSpeedCalcForm.curMap].berry.includes(pokeItem.berryType)
          "
        >
          <i class="i i-close" @click="handleClickDelPoke(pokeItem.dataId)"></i>
        </CptEnergyItem>
      </div>
      <div class="mod-tips" v-else>暂无宝可梦</div>
    </div>
    <div v-if="navData.navIndex === 2">
      <h3>
        <SvgIcon type="team" />队伍<span class="extra"
          >({{ userPokemonsNoSvae.list.length }})</span
        >
      </h3>
      <el-button
        type="success"
        size="small"
        plain
        :disabled="userPokemons.list.length === 0"
        @click="handleClickGetMostEnergyPokemons()"
        >从盒子自动组队(能量最高的前5)</el-button
      >
      <p>
        {{$t('PROP.energy')}}: <img class="icon" v-lazy="`./img/ui/energy.png`" /><span
          class="sptime"
          >{{ getNum(getTeamCurEnergy()) }}</span
        >
      </p>
      <p>
        {{$t('PROP.level')}}:
        <img
          class="icon"
          v-lazy="
            `./img/ui/${getStageLevelPicId(
              gameMap[0].levelList[getTeamCurEnergyLevel()].name
            )}.png`
          "
        />{{
          $t(
            `LEVEL_TITLE.${
              gameMap[0].levelList[getTeamCurEnergyLevel()].nameId
            }`
          )
        }}{{ gameMap[0].levelList[getTeamCurEnergyLevel()].nameIndex }}
      </p>
      <div
        class="poke-tb poke-tb--xscorll poke-tb--box"
        v-if="userPokemonsNoSvae.list.length > 0"
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
          ]"
          v-for="(pokeItem, pokeKey) in getBoxCurEnergy(
            userPokemonsNoSvae.list
          )"
          v-bind:key="`${pokeItem.dataId}_${
            pokeItem.id
          }_${pokeKey}_${pokeItem.useFoods.join('')}_${
            pokeItem.nameExtra || ''
          }`"
          :isHightLightBerry="
            gameMap[helpSpeedCalcForm.curMap].berry.includes(pokeItem.berryType)
          "
        >
          <i
            class="i i-close"
            @click="handleClickDelPoke2(pokeItem.dataId)"
          ></i>
        </CptEnergyItem>
      </div>
      <div class="mod-tips" v-else>暂无宝可梦</div>
    </div>
  </div>
  <el-form label-width="90px">
    <el-form-item>
      <div class="mod-tips">
        <p>* {{ $t("TIPS.energy1") }}</p>
        <p>* {{ $t("TIPS.energy2") }}</p>
        <p>* 非满包满活力，技能型宝可梦更容易触发技能。</p>
        <p>* 宝可梦盒子仅支持本地存储，不支持云存档。</p>
      </div>
    </el-form-item>
  </el-form>
</template>