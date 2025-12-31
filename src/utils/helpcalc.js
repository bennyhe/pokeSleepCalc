import {
  getOneDayEnergy,
  getOneDayHelpCount,
  getNatureDetail,
  getNewFoodPer,
  getNewSkillPer,
  getNewMaxcarry
} from './energy.js'
import {
  sortInObjectOptions,
  get
} from './index.js'
import {
  characterOptions
} from '../config/helpSpeed.js'
import { pokedex as pokedexAll } from '../config/pokedex.js'
import i18n from '../i18n'
const { t } = i18n.global

/**
 * 食品Index长度配置函数
 * @param {*} pokemonId 
 * @param {*} pokeLevel 
 * @returns 
 * 规则：
  如果等级小于30，则只有1位，即返回数组长度为1，且值根据之前的规则，但只取第一个元素（如果原来规则返回的数组长度大于1，则截取）

  如果等级在30到59之间，则返回2位，即数组长度为2，取原来规则的前两个元素。

  如果等级大于等于60，则返回3位，即原来规则的数组。

  但是注意，我们之前的规则有三种情况：
  a. 如果pokedexAll[pokemonId].food.type.length === 2，则返回[1,2,2] -> 现在要根据等级调整长度
  b. 如果是达克莱伊，返回三个相同的值（食物类型的长度）
  c. 默认返回[1,2,3]
 */
export function fnGetFoodIndexLimits(pokemonId, pokeLevel) {
  // 根据等级确定数组长度
  let arrayLength
  if (pokeLevel < 30) {
    arrayLength = 1
  } else if (pokeLevel < 60) {
    arrayLength = 2
  } else {
    arrayLength = 3
  }

  // 特殊情况1：如果pokedexAll[pokemonId].food.type.length === 2，返回[1,2,2]（根据等级截取）
  if (pokedexAll[pokemonId] && pokedexAll[pokemonId].food && pokedexAll[pokemonId].food.type && pokedexAll[pokemonId].food.type.length === 2) {
    const specialLimits = [1, 2, 2]
    return specialLimits.slice(0, arrayLength)
  }

  // 特殊情况2：达克莱伊(491)
  if (+pokemonId === 491) {
    const darkraiFoodTypes = pokedexAll[491].food.type.length
    const darkraiLimits = [darkraiFoodTypes, 1, 1]
    return darkraiLimits.slice(0, arrayLength)
  }

  // 默认情况：根据等级返回相应长度的数组
  // 第一个食物最多1种，第二个最多2种，第三个最多3种
  const defaultLimits = [1, 2, 3]
  return defaultLimits.slice(0, arrayLength)
}
/**
 * 遍历出所有可能的食物类型组合
 * @param {Array} limits 
 * @param {Boolean} uniform 用来只输出所有的aaa
 * @returns 
 */
export function fnGenerateFoodCombinations(limits, uniform) {
  uniform = uniform || false
  const combinations = []

  // 👉 同值模式
  if (uniform) {
    const loopCount = limits[0] || 0       // for 循环次数
    const subLength = limits.length        // 子数组长度

    for (let i = 0; i < loopCount; i++) {
      combinations.push(new Array(subLength).fill(i))
    }
    // console.log(limits, combinations)
    return combinations
  }

  // 递归函数生成所有组合
  function generate(current, depth) {
    if (depth === limits.length) {
      combinations.push([...current])
      return
    }

    for (let i = 0; i < limits[depth]; i++) {
      current[depth] = i
      generate(current, depth + 1)
    }
  }

  generate([], 0)
  return combinations
}
export const addArrInOptions = (helpSpeedCalcFormData, extraDesc, pokeItem, isPlayer, isRightBerry, mapBonusData) => {
  isRightBerry = isRightBerry || helpSpeedCalcFormData.isRightBerry
  const pokeLevel = pokeItem.level || helpSpeedCalcFormData.level
  const pokeUseFoods = pokeItem.useFoods || helpSpeedCalcFormData.useFoods
  const pokeUseSkill = pokeItem.skill || helpSpeedCalcFormData.skill
  const newPokeItem = { ...pokeItem }
  newPokeItem.skilllevel = pokeItem.skilllevel || helpSpeedCalcFormData.skilllevel
  newPokeItem.oneDayHelpCount = getOneDayHelpCount(
    newPokeItem.helpSpeed,
    newPokeItem.foodPer,
    +helpSpeedCalcFormData.calcTime === 10800 ? 0 : newPokeItem.skillPer,
    helpSpeedCalcFormData.calcTime
  )

  const resRankArr = []

  const limits = fnGetFoodIndexLimits(+newPokeItem.id, pokeLevel)
  let tempFoodType = fnGenerateFoodCombinations(limits, +newPokeItem.id === 491)

  if (isPlayer) { // 玩家则
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

      // if (+newPokeItem.id === 491) { // 未解锁30 60食材的噩梦神
      //   arrFood = [
      //     newPokeItem.food.type[arrFTItem[0]]
      //   ]
      // }
    }
    resRankArr.push({
      ...newPokeItem,
      id: newPokeItem.id,
      nameExtra: is2n ? t('SHORT_SKILL.berrys') : '',
      extraDesc,
      pokeUseFoods,
      ...getOneDayEnergy(
        newPokeItem,
        pokeLevel,
        arrFood,
        is2n ? true : false,
        isRightBerry,
        +helpSpeedCalcFormData.areaBonus,
        mapBonusData
      )
    })
  })
  return resRankArr
}

// 获取选择帮忙速度的宝可梦分组
export const initFilterGroup = pokedex => {
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

export const getNature = pokemons => {
  const resTxt = characterOptions.find(
    item => item.label === pokemons.character
  )
  return `${t('PROP.nature')}:${getNatureDetail(resTxt, t)}`
}


// 获取计算结果
export const getNewHelpSpeed = (formData, level, isUseTicket, mapBonusData) => {
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
    mainMuti = -0.075
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
  let res =
    (Math.floor((1 - mainMuti) * (1 - basichelp) * (1 - levelUp) * 10000) /
      10000) *
    formData.baseHelpSpeed
  // 是否使用露营券
  if (isUseTicket) {
    res = res / 1.2
  }
  // ex岛屿
  if (get('curMapData.id', mapBonusData) === 'greenex') {
    // console.log('11111ex')
    if (get('curMapData.berry', mapBonusData, 1) && get('curMapData.berry', mapBonusData).includes(get('curPokeBerryType', mapBonusData))) { //已选中对应树果
      if (get('curMapData.berry', mapBonusData)[0]===get('curPokeBerryType', mapBonusData)){
        res = res * 0.9 //帮手宝可梦的帮忙间隔缩短10%
      }
    } else { // ex其它属性帮忙间隔延长15%
      // console.log('11111ex other')
      res = res * 1.15
    }
  }
  return Math.floor(res)
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
/**
 * 帮速计算-单个宝可梦横向对比数据列表
 * @param {*} helpSpeedCalcFormData 
 * @param {*} pokedex 
 * @param {*} pokeId 
 * @param {*} isUseRankSort 
 * @returns 
 */
export const getTargetPokemonEnergy = (helpSpeedCalcFormData, pokedex, pokeId, isUseRankSort) => {
  let resRankArr = []
  const pokeItem = { ...pokedex[pokeId] }
  pokeItem.isShiny = helpSpeedCalcFormData.isShiny
  pokeItem.evotimes = helpSpeedCalcFormData.evotimes
  pokeItem.skilllevel = helpSpeedCalcFormData.skilllevel
  pokeItem.helpSpeed = getNewHelpSpeed(
    helpSpeedCalcFormData,
    helpSpeedCalcFormData.level,
    helpSpeedCalcFormData.isUseTicket
  )
  pokeItem.foodPer = getNewFoodPer(helpSpeedCalcFormData, pokeItem.foodPer)
  pokeItem.skillPer = getNewSkillPer(
    helpSpeedCalcFormData,
    pokeItem.skillPer
  )
  pokeItem.maxcarry = getNewMaxcarry(
    helpSpeedCalcFormData,
    pokeItem.maxcarry
  )

  resRankArr = resRankArr.concat(
    addArrInOptions(
      helpSpeedCalcFormData,
      getPlayerExtraDesc(helpSpeedCalcFormData),
      {
        ...pokeItem,
        skill: helpSpeedCalcFormData.skill,
        character: helpSpeedCalcFormData.character
      },
      true
    )
  ) // 玩家自选

  const hsDefaultOptions = {
    skill: ['none'], // Array: ['none', 'hs', 'hm', 'fs', 'fm', 'hg1', 'hg2', 'hg3', 'hg4', 'hg5']
    character: 'none' // String: none, hdown, hup, fdown, fup, hdownfup, hupfdown
  }

  if (helpSpeedCalcFormData.contrastPoke) {
    const tempPokeItem = { ...pokedex[helpSpeedCalcFormData.contrastPoke] }
    tempPokeItem.helpSpeed = getNewHelpSpeed(
      {
        baseHelpSpeed: tempPokeItem.helpSpeed,
        ...hsDefaultOptions
      },
      helpSpeedCalcFormData.level,
      helpSpeedCalcFormData.isUseTicket
    )
    resRankArr = resRankArr.concat(
      addArrInOptions(helpSpeedCalcFormData, '对比白板', tempPokeItem)
    )
  }

  const tempPokeItem = { ...pokedex[pokeId] }
  tempPokeItem.helpSpeed = getNewHelpSpeed(
    {
      baseHelpSpeed: tempPokeItem.helpSpeed,
      ...hsDefaultOptions
    },
    helpSpeedCalcFormData.level,
    helpSpeedCalcFormData.isUseTicket
  )
  resRankArr = resRankArr.concat(
    addArrInOptions(helpSpeedCalcFormData, '白板', tempPokeItem)
  )

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
  if (helpSpeedCalcFormData.level < 50) {
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
    helpSpeedCalcFormData.level,
    helpSpeedCalcFormData.isUseTicket
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
    addArrInOptions(helpSpeedCalcFormData, tempExtra2, {
      ...tempPokeItem2,
      ...tempSCOptions2
    })
  )

  tempPokeItem3.helpSpeed = getNewHelpSpeed(
    {
      baseHelpSpeed: tempPokeItem3.helpSpeed,
      ...tempSCOptions3
    },
    helpSpeedCalcFormData.level,
    helpSpeedCalcFormData.isUseTicket
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
    addArrInOptions(helpSpeedCalcFormData, tempExtra3, {
      ...tempPokeItem3,
      ...tempSCOptions3
    })
  )

  tempPokeItem4.helpSpeed = getNewHelpSpeed(
    {
      baseHelpSpeed: tempPokeItem4.helpSpeed,
      ...tempSCOptions4
    },
    helpSpeedCalcFormData.level,
    helpSpeedCalcFormData.isUseTicket
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
    addArrInOptions(helpSpeedCalcFormData, tempExtra4, {
      ...tempPokeItem4,
      ...tempSCOptions4
    })
  )

  tempPokeItem5.helpSpeed = getNewHelpSpeed(
    {
      baseHelpSpeed: tempPokeItem5.helpSpeed,
      ...tempSCOptions5
    },
    helpSpeedCalcFormData.level,
    helpSpeedCalcFormData.isUseTicket
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
    addArrInOptions(helpSpeedCalcFormData, tempExtra5, {
      ...tempPokeItem5,
      ...tempSCOptions5
    })
  )

  tempPokeItem6.helpSpeed = getNewHelpSpeed(
    {
      baseHelpSpeed: tempPokeItem6.helpSpeed,
      ...tempSCOptions6
    },
    helpSpeedCalcFormData.level,
    helpSpeedCalcFormData.isUseTicket
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
    addArrInOptions(helpSpeedCalcFormData, tempExtra6, {
      ...tempPokeItem6,
      ...tempSCOptions6
    })
  )

  let sortArr = ['oneDayEnergy']
  if (isUseRankSort) {
    if (helpSpeedCalcFormData.rankSort === 'berry') {
      sortArr = ['oneDayBerryEnergy', 'oneDayEnergy']
    } else if (helpSpeedCalcFormData.rankSort === 'food') {
      sortArr = ['oneDayFoodEnergyAll', 'oneDayEnergy']
    } else if (helpSpeedCalcFormData.rankSort === 'skillCount') {
      sortArr = ['oneDayHelpCountSkill', 'oneDayEnergy']
    }
  }
  const res = sortInObjectOptions(resRankArr, sortArr, 'down')

  helpSpeedCalcFormData.rankIndex = res.findIndex(
    item => item.extraDesc.indexOf('自选') > -1
  )
  helpSpeedCalcFormData.resLength = res.length

  return res
}

export const getSkillLevel = pokeSkillType => {
  const arrLevel = [1, 2, 3, 4, 5, 6, 7]
  if ([3, 6].includes(pokeSkillType)) {
    arrLevel.push(8)
  } else if ([4, 7, 8, 14, 15, 17, 18, 21, 22].includes(pokeSkillType)) {
    arrLevel.splice(6, 1)
  }
  return arrLevel
}