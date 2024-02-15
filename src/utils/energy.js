import { BERRY_ENERGY } from '../config/berryEnergy.js'
import { FOOD_ENERGY } from '../config/valKey.js'

const getOneDayBerryEnergy = (pokeItem, pokeLevel, isDoubleBerry, isRightBerry) => {
  let pokeType = pokeItem.pokeType === 1 ? 2 : 1
  if (isDoubleBerry) {
    pokeType = pokeItem.pokeType === 1 ? 3 : 2
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
  // console.log(helpFoodEnergy)
  if (useFoods[0] === useFoods[1]) {
    // aa食材则合并
    helpFoodEnergy.count = [helpFoodEnergy.count[0] + helpFoodEnergy.count[1]]

    helpFoodEnergy.energy.splice(0, 1)
    helpFoodEnergy.useFoods.splice(0, 1)
  }
  // console.log(helpFoodEnergy)
  return helpFoodEnergy
}
export const getOneDayEnergy = (pokeItem, pokeLevel, useFoods, isDoubleBerry, isRightBerry) => {
  const oneDayBerryEnergy = getOneDayBerryEnergy(
    pokeItem,
    pokeLevel,
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