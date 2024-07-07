import { BERRY_ENERGY } from '../config/berryEnergy.js'
import { FOOD_ENERGY } from '../config/valKey.js'
import { getDecimalNumber, get } from '../utils/index.js'

const getOneDayBerryEnergy = (pokeItem, pokeLevel, isDoubleBerry, isRightBerry, areaBonus) => {
  areaBonus = areaBonus || 0
  let pokeType = pokeItem.pokeType === 1 ? 2 : 1
  if (isDoubleBerry) {
    pokeType++
  }
  let res = Math.floor(
    pokeItem.oneDayHelpCount.berry *
    (BERRY_ENERGY[pokeItem.berryType].energy[pokeLevel - 1].energy *
      pokeType)
  )
  if (isRightBerry) {
    res = res * 2
  }
  return Math.floor(res * (1 + areaBonus / 100))
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
  for (let i = 0; i < useFoods.length; i++) {
    helpFoodEnergy.count[i] =
      Math.floor(pokeItem.oneDayHelpCount.food / useFoods.length) *
      pokeItem.food.count[useFoods[i]].num[i]
    helpFoodEnergy.energy[i] =
      helpFoodEnergy.count[i] * FOOD_ENERGY[useFoods[i]]
    helpFoodEnergy.allEnergy += helpFoodEnergy.energy[i]
  }
  // console.log(useFoods, JSON.parse(JSON.stringify(helpFoodEnergy)))
  for (let y = 0; y < useFoods.length; y++) {
    for (let j = 0; j < helpFoodEnergy.useFoods.length; j++) {
      for (let k = j + 1; k < helpFoodEnergy.useFoods.length; k++) {
        if (helpFoodEnergy.useFoods[j] === helpFoodEnergy.useFoods[k]) {
          helpFoodEnergy.count[j] = helpFoodEnergy.count[j] + helpFoodEnergy.count[k]

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
    helpFoodEnergy.allEnergy = Math.floor(helpFoodEnergy.allEnergy)
  }
  // console.log(helpFoodEnergy)
  return helpFoodEnergy
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
  let skillCount = getDecimalNumber(
    oneDayHelpCount.sum * (skillPer / 100)
    , 1)
  oneDayHelpCount.skill = skillCount
  if (skillPer > 0 && skillCount < 1) {
    skillCount = 1
  }
  let foodCount = parseInt(
    oneDayHelpCount.sum * (foodPer / 100)
    , 10)
  if (foodPer > 0 && foodCount < 1) {
    foodCount = 1
  }
  oneDayHelpCount.food = foodCount
  oneDayHelpCount.berry =
    oneDayHelpCount.sum - parseInt(skillCount, 10) - oneDayHelpCount.food

  return oneDayHelpCount
}
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
  return {
    useFoods,
    oneDayBerryEnergy,
    oneDayFoodEnergy,
    oneDayEnergy: oneDayBerryEnergy + oneDayFoodEnergy.allEnergy,
    oneDayFoodEnergyAll: oneDayFoodEnergy.allEnergy || 0,
    oneDayHelpCountSkill: pokeItem.oneDayHelpCount.skill || 0
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