import peaceTimeList from './peaceTime.js'
import actTimeList from './actTime.js'
import extraTimeList from './extraTime.js'

export const masterRes = {
  updateTime: 1733060113580,
  level20: {
    peaceTime: {
      name: '平时',
      list: peaceTimeList
    },
    actTime: {
      name: '伊布週2024',
      startTime: 1731873600000,
      endTime: 1732391999000,
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