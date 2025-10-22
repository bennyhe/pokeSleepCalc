export const SLEEP_CALC_POKEMONS = {
  list: [243, 244, 245, 488], // 特殊宝可梦列表，只能一个
  noLastList: [243, 244, 245, 35, 36, 173, 488,
    // 113, 242, 440,
    // 198, 430,
    // 303,
    // 83,
    // 252, 253, 254, 255, 256, 257, 258, 259, 260, 311, 312,
    848, 849, 8001,
    177, 178
  ], // 不进保底
  probabilityLastList: [] //概率进保底
}

export const IN_LAST_TIME_POKEMONS = [
  {
    ids: [848, 849, 8001],
    starttime: '2025/8/11 04:00'
  },
  {
    ids: [177, 178],
    starttime: '2025/9/29 04:00'
  },
  {
    ids: [170, 171],
    starttime: '2025/10/22 04:00'
  }
]
// export const SLEEP_TIMELIMIT_POKEMONS = {

// }
export const SLEEP_CALC_UP = {
  small: 4,
  mid: 6,
  large: 9
}
export const SLEEP_CALC_CONFIG = {
  onOffBan: false,
  showBan: false,
  banPokes: [], // ban 宝可梦id
  showBanArea: [] // 展示区域
}
export const LAB_CONFIG = {
  upIdsSmallIds: [],
  upIdsMidIds: [],
  upIdsLargeIds: [],
  noLastList: []
}
export const ACT_LIST = [
  //  {
  //    startTime: 1736078400000,
  //    endTime: 1736625599000,
  //    notArea: [],
  //    smallUp: [],
  //    midUp: [],
  //    largeUp: [],
  //    timelimitPokemons: {
  //      'green': [304, 403, 736]
  //    },
  //    actRandomNum: 0.3,  // 默认0.3 [0.3, 0.4]
  //    times: 2.5,
  //    isActRandom: true
  //  }
  // {
  //   name: '好眠日',
  //   namejp: '満月の前後の日',
  //   startTime: 1736712000000,
  //   endTime: 1736798399000,
  //   notArea: [],
  //   midUp: [35, 36, 173],
  //   times: 1.5
  // },
  // {
  //   name: '满月日',
  //   namejp: '満月の日',
  //   startTime: 1736798400000,
  //   endTime: 1736884799000,
  //   notArea: [],
  //   largeUp: [35, 36, 173],
  //   times: 3
  // },
  // {
  //   name: '好眠日',
  //   namejp: '満月の前後の日',
  //   startTime: 1736884800000,
  //   endTime: 1736971199000,
  //   notArea: [],
  //   midUp: [35, 36, 173],
  //   times: 1.5
  // }
  // {
  //   name: '2週年搶先慶企畫',
  //   namejp: 'もうすぐ2周年キャンペーン',
  //   startTime: 1751832000000,
  //   endTime: 1752091199000,
  //   notArea: [],
  //   midUp: [906, 907, 908, 909, 910, 911, 912, 913, 914],
  //   smallUp: [],
  //   isActRandom: true
  // },
  // {
  //   name: '2週年搶先慶企畫 & 好眠日',
  //   namejp: 'もうすぐ2周年キャンペーン & 満月の前後の日',
  //   startTime: 1752091200000,
  //   endTime: 1752177599000,
  //   notArea: [],
  //   midUp: [906, 907, 908, 909, 910, 911, 912, 913, 914, 35, 36, 173],
  //   times: 1.5,
  //   isActRandom: true
  // },
  // {
  //   name: '2週年搶先慶企畫 & 满月日',
  //   namejp: 'もうすぐ2周年キャンペーン & 満月の日',
  //   startTime: 1752177600000,
  //   endTime: 1752263999000,
  //   notArea: [],
  //   midUp: [906, 907, 908, 909, 910, 911, 912, 913, 914],
  //   largeUp: [35, 36, 173],
  //   times: 2,
  //   isActRandom: true
  // },
  // {
  //   name: '2週年搶先慶企畫 & 好眠日',
  //   namejp: 'もうすぐ2周年キャンペーン & 満月の前後の日',
  //   startTime: 1752264000000,
  //   endTime: 1752350399000,
  //   notArea: [],
  //   midUp: [906, 907, 908, 909, 910, 911, 912, 913, 914, 35, 36, 173],
  //   times: 1.5,
  //   isActRandom: true
  // },
  // {
  //   name: '2週年搶先慶企畫',
  //   namejp: 'もうすぐ2周年キャンペーン',
  //   startTime: 1752350400000,
  //   endTime: 1752436799000,
  //   notArea: [],
  //   midUp: [906, 907, 908, 909, 910, 911, 912, 913, 914],
  //   smallUp: [],
  //   isActRandom: true
  // },
  // {
  //   name: '2週年紀念嘉年華第1週',
  //   namejp: '2周年記念フェスティバル1週目',
  //   startTime: 1752436800000,
  //   endTime: 1753041599000,
  //   notArea: [],
  //   midUp: [252, 255, 258, 311, 312],
  //   smallUp: [],
  //   isActRandom: true
  // },
]