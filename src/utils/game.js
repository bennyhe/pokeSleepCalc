import {pokedex} from '../config/pokedex.js'
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
    } else if(rdm <= 10) {
      defaultPower *= 3 // 8%小暴击
    }
  }
  // 同一个id的宝可梦第二口开始判定吃饱
  if (eatTimes>=2){
    // 30%吃饱了
    if (parseInt(Math.floor(Math.random() * 100), 10) + 1 <= 30) 
    {
      eatStateType = 4
    }
  }
  return {
    point: defaultPower,
    eatStateType
  }
}