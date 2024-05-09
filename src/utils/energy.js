import { BERRY_ENERGY } from '../config/berryEnergy.js'
import { FOOD_ENERGY } from '../config/valKey.js'
import { getDecimalNumber } from '../utils/index.js'

const getOneDayBerryEnergy = (pokeItem, pokeLevel, isDoubleBerry, isRightBerry) => {
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
  return res
}
const getOneDayFoodEnergy = (pokeItem, useFoods) => {
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
  // console.log(helpFoodEnergy)
  return helpFoodEnergy
}
export const getOneDayHelpCount = (helpSpeed, foodPer, skillPer, calcTime) => {
  foodPer = Math.floor(foodPer || 0)
  skillPer = Math.floor(skillPer || 0)
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
  if (skillCount < 1) {
    skillCount = 1
  }
  let foodCount = getDecimalNumber(
    oneDayHelpCount.sum * (foodPer / 100)
    , 1)
  oneDayHelpCount.food = foodCount
  if (foodCount < 1) {
    foodCount = 1
  }
  oneDayHelpCount.berry =
    oneDayHelpCount.sum - oneDayHelpCount.skill - oneDayHelpCount.food

  return oneDayHelpCount
}
export const getOneDayEnergy = (pokeItem, pokeLevel, useFoods, isDoubleBerry, isRightBerry) => {
  const level = pokeLevel || 50
  const oneDayBerryEnergy = getOneDayBerryEnergy(
    pokeItem,
    level,
    isDoubleBerry,
    isRightBerry
  )
  const oneDayFoodEnergy = getOneDayFoodEnergy(pokeItem, useFoods)
  return {
    useFoods,
    oneDayBerryEnergy,
    oneDayFoodEnergy,
    oneDayEnergy: oneDayBerryEnergy + oneDayFoodEnergy.allEnergy
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