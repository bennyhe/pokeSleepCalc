import peaceTimeList from './peaceTime.js'
import actTimeList from './actTime.js'
import extraTimeList from './extraTime.js'

export const masterRes = {
  updateTime: 1737720992670,
  level20: {
    peaceTime: {
      name: '平时-1.19+',
      list: peaceTimeList
    },
    actTime: {
      name: '強化發動！技能週',
      startTime: 1737288054000,
      endTime: 1737835199000,
      list: actTimeList
    },
    extraTime: {
      name: '平时-6岛3只进保底',
      startTime: 1731873600000,
      endTime: 1732391999000,
      list: extraTimeList
    }
  }
}