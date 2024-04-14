import { pokedex } from '../config/pokedex.js'
import { SUB_SKILLS } from '../config/pokeSkill.js'
import { POKE_243_IV } from '../config/lockIV.js'
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
  const { isFirst243, lockSkillCount } = options
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
    let ivRes = {
      useFoods,
      natureId: parseInt(Math.floor(Math.random() * 25), 10) + 1
    }
    if (isFirst243 && pokeId === 243) {
      isFirst243 = false
      ivRes = {
        ...ivRes,
        ...POKE_243_IV
      }
    } else {
      ivRes.skills = getRandomPokeSkills(lockSkillCount)
    }
    return ivRes
  }
}

export function getSkillRare(arrProbability) {
  arrProbability = arrProbability || [15, 50]
  // 金技能出现几率 15%，蓝技能出现几率 35%，白技能出现几率 50%
  const arr = getRandomArr([...Array(100).keys()], 200)
  // 随机0-99
  const res = arr[parseInt(Math.floor(Math.random() * 100), 10)]
  let level = 1
  if (res < arrProbability[0]) {
    level = 3
  } else if (res < arrProbability[1]) {
    level = 2
  }
  return level
}

export function getRandomPokeSkills(lockSkillCount) {
  const subSkills = []
  const unlockLevel = [10, 25, 50, 75, 100]
  const allSkillsByRare = {
    1: getRandomArr([...SUB_SKILLS.filter(item => item.rare === 1)], 200),
    2: getRandomArr([...SUB_SKILLS.filter(item => item.rare === 2)], 200),
    3: getRandomArr([...SUB_SKILLS.filter(item => item.rare === 3)], 200)
  }
  for (let i = 0; i < 5; i++) {
    let skillRare = 1
    let isLockRare = false
    if (
      +lockSkillCount > 0 &&
      i < +lockSkillCount
    ) {
      skillRare = 3
      isLockRare = true
    } else if (allSkillsByRare[1].length === 0) {
      skillRare = getSkillRare([30, 100])
    } else {
      skillRare = getSkillRare()
    }
    const rdmSkillRareIndex = parseInt(
      Math.floor(Math.random() * allSkillsByRare[skillRare].length),
      10
    )
    subSkills.push({
      nameId: allSkillsByRare[skillRare][rdmSkillRareIndex].nameId,
      skillRare,
      isLockRare,
      unlockLevel: unlockLevel[i]
    })
    allSkillsByRare[skillRare].splice(rdmSkillRareIndex, 1)
  }
  return subSkills
}