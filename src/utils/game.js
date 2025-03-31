import { pokedex } from '../config/pokedex.js'
import { SUB_SKILLS } from '../config/pokeSkill.js'
import { POKE_243_IV, POKE_488_IV } from '../config/lockIV.js'
import {
  getRandomArr
} from '../utils/index.js'

export function feedSandslash(sleepItem, sandslashPower, eatTimes) {
  let defaultPower = sandslashPower
  let eatStateType = 3
  // sleepItem.eatStateType [1,2,3,4] // 1:贪吃 2:友情点MAX 3:平常 4:吃饱了
  if (sleepItem.eatStateType === 1) { // 贪吃
    if (parseInt(Math.floor(Math.random() * 100), 10) + 1 <= 90) {
      defaultPower *= 3 // 90%小暴击
    } else {
      defaultPower = pokedex[sleepItem.pokeId].friendship // 10%大暴击
    }
  } else { // 不贪吃
    const rdm = parseInt(Math.floor(Math.random() * 100), 10) + 1
    if (rdm <= 2) {
      defaultPower = pokedex[sleepItem.pokeId].friendship // 2%大暴击
    } else if (rdm <= 10) {
      defaultPower *= 3 // 8%小暴击
    }
  }
  // 同一个id的宝可梦第二口开始判定吃饱
  if (eatTimes >= 2) {
    // 30%吃饱了
    if (parseInt(Math.floor(Math.random() * 100), 10) + 1 <= 30) {
      eatStateType = 4
    }
  }
  return {
    point: defaultPower,
    eatStateType
  }
}

export function getRandomIV(pokeId, options) {
  const { isFirst243, isFirst244, isFirst245, isFirst488,  lockSkillCount } = options
  let ivRes = {
    useFoods: [],
    natureId: parseInt(Math.floor(Math.random() * 25), 10) + 1
  }
  if (pokedex[pokeId].food) {
    const useFoods = [pokedex[pokeId].food.type[0]]
    for (let i = 1; i < 3; i++) {
      const rdm = parseInt(Math.floor(Math.random() * 3), 10)
      // 1/3概率a食材
      if (rdm === 2) {
        useFoods.push(pokedex[pokeId].food.type[0])
      } else if (i === 1) {
        useFoods.push(pokedex[pokeId].food.type[i])
      } else {
        let lastFoods = [...pokedex[pokeId].food.type]
        lastFoods = lastFoods.slice(1, lastFoods.length)
        if (lastFoods.length === 1) {
          useFoods.push(lastFoods[0])
        } else {
          useFoods.push(lastFoods[parseInt(Math.floor(Math.random() * 2), 10)])
        }
      }
    }
    ivRes.useFoods = useFoods
  } 
  if ((isFirst243 && pokeId === 243) || (isFirst244 && pokeId === 244) || (isFirst245 && pokeId === 245)) {
    ivRes = {
      ...ivRes,
      ...POKE_243_IV
    }
  } else if ((isFirst243 && pokeId === 488)) {
    ivRes = {
      ...ivRes,
      ...POKE_488_IV
    }
  } else {
    ivRes.skills = getRandomPokeSkills(lockSkillCount)
  }
  return ivRes
}

// 根据稀有度计算权重
// 金技能出现几率 15%，蓝技能出现几率 35%，白技能出现几率 50%
const rarityWeights = {
  1: 50,
  2: 35,
  3: 15
}
// 权重随机选择函数
function weightedRandomSelect(items, weights) {
  const totalWeight = weights.reduce((acc, weight) => acc + weight, 0)
  let random = Math.random() * totalWeight
  for (let i = 0; i < items.length; i++) {
    random -= weights[i]
    if (random <= 0) {
      return items[i]
    }
  }
}
export function getRandomPokeSkills(lockSkillCount) {
  const uniqueSubSkills = new Set()
  const unlockLevel = [10, 25, 50, 75, 100]
  let i = 0
  let rare3Skills = getRandomArr([...SUB_SKILLS].filter(skill => skill.rare === 3), 100)

  // 随机抽取稀有度为3的技能
  while (lockSkillCount > 0 && i < lockSkillCount && rare3Skills.length > 0) {
    const subSkill = weightedRandomSelect(rare3Skills, rare3Skills.map(skill => rarityWeights[skill.rare]))
    uniqueSubSkills.add({
      nameId: subSkill.nameId,
      skillRare: 3,
      isLockRare: true,
      unlockLevel: unlockLevel[i]
    })
    i++
    rare3Skills = rare3Skills.filter(skill => skill.nameId !== subSkill.nameId) // 移除已选取的技能
  }

  // 随机抽取剩余的技能，确保不重复
  while (uniqueSubSkills.size < 5) {
    const remainingSkills = getRandomArr(SUB_SKILLS.filter(skill => ![...uniqueSubSkills].some(uniqueSkill => uniqueSkill.nameId === skill.nameId)), 100)
    const subSkill = weightedRandomSelect(remainingSkills, remainingSkills.map(skill => rarityWeights[skill.rare]))
    uniqueSubSkills.add({
      nameId: subSkill.nameId,
      skillRare: subSkill.rare,
      isLockRare: false,
      unlockLevel: unlockLevel[i]
    })
    i++
  }
  return Array.from(uniqueSubSkills)
}