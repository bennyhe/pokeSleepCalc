import { BERRY_ENERGY } from '../config/berryEnergy.js'
import { FOOD_ENERGY } from '../config/valKey.js'
import { BERRY_TYPES, FOOD_TYPES, SKILL_TYPES } from '../config/valKey.js'
import { skillEffects } from '../config/skillEffects.js'

import { getDecimalNumber, get, sortInObjectOptions } from '../utils/index.js'

const getOneDayBerryEnergy = (pokeItem, pokeLevel, isDoubleBerry, isRightBerry, areaBonus) => {
  areaBonus = areaBonus || 0
  let pokeType = [1, 4].includes(+pokeItem.pokeType) ? 2 : 1 // 树果型、全类型自带树果*2
  if (isDoubleBerry) {
    pokeType++
  }
  const berryCount = getDecimalNumber(pokeItem.oneDayHelpCount.berry * pokeType, 1)
  let res = berryCount * BERRY_ENERGY[pokeItem.berryType].energy[pokeLevel - 1].energy
  if (isRightBerry) {
    res = res * 2
  }
  return {
    berryCount,
    berryEnergy: Math.floor(res * (1 + areaBonus / 100))
  }
}
const getOneDayFoodEnergy = (pokeItem, useFoods, areaBonus) => {
  areaBonus = areaBonus || 0
  // console.log(pokeItem.oneDayHelpCount.food, useFoods)
  const helpFoodEnergy = {
    useFoods: [...useFoods],
    count: [],
    energy: [],
    allEnergy: 0
  }
  // const count = get('food.type', pokeItem).length || useFoods.length
  for (let i = 0; i < useFoods.length; i++) {
    helpFoodEnergy.count[i] =
      getDecimalNumber(pokeItem.oneDayHelpCount.food / useFoods.length *
        pokeItem.food.count[useFoods[i]].num[i], 1)
    if (helpFoodEnergy.count[i] >= 100) {
      helpFoodEnergy.count[i] = Math.floor(helpFoodEnergy.count[i])
    }
    helpFoodEnergy.energy[i] =
      helpFoodEnergy.count[i] * FOOD_ENERGY[useFoods[i]]
    helpFoodEnergy.allEnergy += helpFoodEnergy.energy[i]
  }
  // console.log(useFoods, JSON.parse(JSON.stringify(helpFoodEnergy)))
  for (let y = 0; y < useFoods.length; y++) {
    for (let j = 0; j < helpFoodEnergy.useFoods.length; j++) {
      for (let k = j + 1; k < helpFoodEnergy.useFoods.length; k++) {
        if (helpFoodEnergy.useFoods[j] === helpFoodEnergy.useFoods[k]) { // 如果是同一种食材就进行合并
          helpFoodEnergy.count[j] = getDecimalNumber(helpFoodEnergy.count[j] + helpFoodEnergy.count[k], 1)
          if (helpFoodEnergy.count[j] >= 100) {
            helpFoodEnergy.count[j] = Math.floor(helpFoodEnergy.count[j])
          }

          helpFoodEnergy.useFoods.splice(k, 1)
          helpFoodEnergy.count.splice(k, 1)
          break
        }
      }
    }
  }
  if (areaBonus > 0) {
    helpFoodEnergy.allEnergy = 0
    helpFoodEnergy.energy.forEach(item => {
      helpFoodEnergy.allEnergy += item * (1 + areaBonus / 100)
      return item * (1 + areaBonus / 100)
    })
  }
  helpFoodEnergy.allEnergy = Math.floor(helpFoodEnergy.allEnergy)
  return helpFoodEnergy
}
/**
 * 获取技能效果
 * @param {Object} pokeItem 宝可梦数据
 * @param {Number} areaBonus 岛屿加成
 * @returns 
 */
const getOneDaySkillEffects = (pokeItem, areaBonus) => {
  const canCalcSkillTypes = [1, 2, 5, 3, 6] // , 11, 14
  const pokeSkillCount = get('oneDayHelpCount.skill', pokeItem)
  const pokeSkillType = +get('skillType', pokeItem)
  const pokeSkillLevel = +get('skilllevel', pokeItem) || 1
  if (pokeSkillCount && canCalcSkillTypes.includes(pokeSkillType) && get('id', skillEffects[pokeSkillType])) {
    let skillOnceEnergy = 0
    const curSkillValue = skillEffects[pokeSkillType].effects[pokeSkillLevel - 1].value
    if (Array.isArray(curSkillValue)) { // 区间则取平均值
      skillOnceEnergy = curSkillValue.reduce((sum, current) => sum + current, 0) / curSkillValue.length
    } else {
      skillOnceEnergy = curSkillValue
    }
    let energy = pokeSkillCount * skillOnceEnergy
    let type = 'energy'
    if ([1, 2, 5].includes(pokeSkillType) && areaBonus) {
      energy = energy * (1 + areaBonus / 100)
    }
    if ([3, 6].includes(pokeSkillType)) {
      type = 'shards'
    }
    // console.log(pokeItem, areaBonus)
    return {
      type,
      value: Math.floor(energy)
    }
  }
  return {}
}
export const getOneDayHelpCount = (helpSpeed, foodPer, skillPer, calcTime) => {
  foodPer = parseFloat(foodPer || 0)
  skillPer = parseFloat(skillPer || 0)
  calcTime = +calcTime || 86400
  const oneDayHelpCount = {
    sum: Math.floor(calcTime / (helpSpeed / 2.2)), // 一天总帮忙次数
    food: 0, // 其中树果的帮忙次数
    berry: 0, // 其中食材的帮忙次数
    skill: 0 // 其中技能的帮忙次数
  }
  let skillCount = getDecimalNumber(oneDayHelpCount.sum * (skillPer / 100), 1)
  oneDayHelpCount.skill = skillCount
  if (skillPer > 0 && skillCount < 1) {
    skillCount = 1
  }
  let foodCount = getDecimalNumber(oneDayHelpCount.sum * (foodPer / 100), 2)
  if (foodPer > 0 && foodCount < 1) {
    foodCount = 1
  }
  oneDayHelpCount.food = foodCount
  oneDayHelpCount.berry = getDecimalNumber(oneDayHelpCount.sum - skillCount - oneDayHelpCount.food, 2)
  return oneDayHelpCount
}
/**
 * 获取宝可梦一天能量相关
 * @param {*} pokeItem 
 * @param {*} pokeLevel 
 * @param {*} useFoods 
 * @param {*} isDoubleBerry 
 * @param {*} isRightBerry 
 * @param {*} areaBonus 
 * @returns 
 */
export const getOneDayEnergy = (pokeItem, pokeLevel, useFoods, isDoubleBerry, isRightBerry, areaBonus) => {
  const level = pokeLevel || 50
  areaBonus = areaBonus || 0
  const oneDayBerryEnergy = getOneDayBerryEnergy(
    pokeItem,
    level,
    isDoubleBerry,
    isRightBerry,
    areaBonus
  )
  const oneDayFoodEnergy = getOneDayFoodEnergy(pokeItem, useFoods, areaBonus)
  const oneDaySkillEffects = getOneDaySkillEffects(pokeItem, areaBonus)
  let oneDayEnergy = oneDayBerryEnergy.berryEnergy + oneDayFoodEnergy.allEnergy
  if (oneDaySkillEffects.type === 'energy') {
    oneDayEnergy += oneDaySkillEffects.value
  }
  return {
    useFoods,
    oneDayBerryEnergy: oneDayBerryEnergy.berryEnergy,
    oneDayBerryCount: oneDayBerryEnergy.berryCount,
    oneDayFoodEnergy,
    oneDayEnergy,
    oneDayFoodEnergyAll: oneDayFoodEnergy.allEnergy || 0,
    oneDayHelpCountSkill: pokeItem.oneDayHelpCount.skill || 0,
    oneDaySkillEffects
  }
}

export function getNewFoodPer(formData, foodPer) {
  foodPer = foodPer || 0
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
  return Math.floor(foodPer * ((1 + basicfood) * (1 + mainMuti)) * 1000) / 1000
}

export function getNewSkillPer(formData, skillPer) {
  skillPer = skillPer || 0
  let basicsKill = 0
  let mainMuti = 0
  if (formData.skill.includes('ss')) {
    basicsKill += 0.18
  }
  if (formData.skill.includes('sm')) {
    basicsKill += 0.36
  }
  if (formData.character.indexOf('sup') > -1) {
    mainMuti = 0.2
  }
  if (formData.character.indexOf('sdown') > -1) {
    mainMuti = -0.2
  }
  return (
    Math.floor(skillPer * ((1 + basicsKill) * (1 + mainMuti)) * 1000) / 1000
  )
}

export function getNewMaxcarry(formData, maxcarry) {
  maxcarry = maxcarry || 0
  if (formData.skill.includes('cs')) {
    maxcarry += 6
  }
  if (formData.skill.includes('cm')) {
    maxcarry += 12
  }
  if (formData.skill.includes('cl')) {
    maxcarry += 18
  }
  if (formData.evotimes) {
    maxcarry += (formData.evotimes * 5)
  }
  return maxcarry
}

export function getNewSkillLevel(formData) {
  let maxLevel = 1
  if (formData.skill.includes('sls')) {
    maxLevel += 1
  }
  if (formData.skill.includes('slm')) {
    maxLevel += 2
  }
  if (formData.evotimes) {
    maxLevel += formData.evotimes
  }
  return maxLevel
}

export function getNatureDetail(cItem, t) {
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

export function getRankPokemonsByTypes(dataList, callback) {
  const tempFoodResRank = {}
  for (const foodKey in FOOD_TYPES) {
    if (Object.hasOwnProperty.call(FOOD_TYPES, foodKey)) {
      if (!tempFoodResRank[foodKey]) {
        tempFoodResRank[foodKey] = {
          foodId: +foodKey,
          rankList: []
        }
      }
      dataList.forEach(pokeItem => {
        if (
          pokeItem.helpSpeed &&
          pokeItem.foodPer &&
          pokeItem.useFoods.includes(+foodKey)
        ) {
          // console.log(foodKey, FOOD_TYPES[foodKey], pokeItem.pokemonId, pokeItem.oneDayFoodEnergy)
          tempFoodResRank[foodKey].rankList.push({
            pokemonId: pokeItem.pokemonId,
            oneDayFoodEnergy: pokeItem.oneDayFoodEnergy,
            useFoods: pokeItem.useFoods,
            helpSpeed: pokeItem.helpSpeed,
            foodPer: pokeItem.foodPer,
            useFoodType: pokeItem.useFoods,
            FOODRANK_COUNT:
              pokeItem.oneDayFoodEnergy.count[
                pokeItem.oneDayFoodEnergy.useFoods.indexOf(+foodKey)
              ],
            level: pokeItem.level,
            isShiny: pokeItem.isShiny
          })
        }
      })
    }
  }
  for (const rankKey in tempFoodResRank) {
    if (Object.hasOwnProperty.call(tempFoodResRank, rankKey)) {
      tempFoodResRank[rankKey].rankList = sortInObjectOptions(
        tempFoodResRank[rankKey].rankList,
        ['FOODRANK_COUNT']
      )
    }
  }
  const tempBerryResRank = {}
  for (const berryKey in BERRY_TYPES) {
    if (Object.hasOwnProperty.call(BERRY_TYPES, berryKey)) {
      if (!tempBerryResRank[berryKey]) {
        tempBerryResRank[berryKey] = {
          berryId: +berryKey,
          rankList: []
        }
      }
      dataList.forEach(pokeItem => {
        if (
          pokeItem.helpSpeed &&
          pokeItem.foodPer &&
          +pokeItem.berryType === +berryKey
        ) {
          // console.log(berryKey, BERRY_TYPES[berryKey], pokeItem.oneDayFoodEnergy.count[0])
          tempBerryResRank[berryKey].rankList.push({
            pokemonId: pokeItem.pokemonId,
            berryType: +pokeItem.berryType,
            oneDayBerryEnergy: pokeItem.oneDayBerryEnergy,
            helpSpeed: pokeItem.helpSpeed,
            BERRYRANK_COUNT: pokeItem.oneDayBerryCount,
            level: pokeItem.level,
            isShiny: pokeItem.isShiny
          })
        }
      })
    }
  }
  for (const rankKey in tempBerryResRank) {
    if (Object.hasOwnProperty.call(tempBerryResRank, rankKey)) {
      tempBerryResRank[rankKey].rankList = sortInObjectOptions(
        tempBerryResRank[rankKey].rankList,
        ['oneDayBerryEnergy', 'BERRYRANK_COUNT']
      )
    }
  }
  const tempSkillResRank = {}
  for (const skillKey in SKILL_TYPES) {
    if (Object.hasOwnProperty.call(SKILL_TYPES, skillKey)) {
      if (!tempSkillResRank[skillKey] && +skillKey !== 20) {
        tempSkillResRank[skillKey] = {
          skillId: +skillKey,
          rankList: []
        }
      }
      dataList.forEach(pokeItem => {
        // console.log(skillKey, SKILL_TYPES[skillKey], pokeItem)
        if (
          pokeItem.helpSpeed &&
          pokeItem.foodPer &&
          +pokeItem.skillType === +skillKey
        ) {
          let nSkillKey = +skillKey
          if (+skillKey === 19 || +skillKey === 20) {
            nSkillKey = 19
          } else if (+skillKey === 17 || +skillKey === 21) {
            nSkillKey = 17
          }
          tempSkillResRank[nSkillKey].rankList.push({
            pokemonId: pokeItem.pokemonId,
            helpSpeed: pokeItem.helpSpeed,
            SKILLRANK_COUNT: pokeItem.oneDayHelpCountSkill,
            level: pokeItem.level,
            isShiny: pokeItem.isShiny,
            skillPer: pokeItem.skillPer
          })
        }
      })
    }
  }
  for (const rankKey in tempSkillResRank) {
    if (Object.hasOwnProperty.call(tempSkillResRank, rankKey)) {
      tempSkillResRank[rankKey].rankList = sortInObjectOptions(
        tempSkillResRank[rankKey].rankList,
        ['SKILLRANK_COUNT']
      )
    }
  }
  if (callback) {
    callback({
      tempFoodResRank,
      tempBerryResRank,
      tempSkillResRank
    })
  }
}