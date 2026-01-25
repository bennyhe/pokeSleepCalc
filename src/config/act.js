export const SLEEP_CALC_POKEMONS = {
  list: [243, 244, 245, 488], // 特殊宝可梦列表，只能一个
  noLastList: [243, 244, 245, 35, 36, 173, 488,
    710, 711,
    328, 329, 330, 371, 372, 373, 557, 558,
    442,
    777, 974, 975,
    213
  ], // 不进保底
  probabilityLastList: [] //概率进保底
}

export const IN_LAST_TIME_DAYS = 100
export const IN_LAST_TIME_POKEMONS = [
  // {
  //   ids: [252, 253, 254, 255, 256, 257, 258, 259, 260, 311, 312],
  //   starttime: '2025/7/14 04:00'
  // },
  // {
  //   ids: [848, 849, 8001],
  //   starttime: '2025/8/11 04:00'
  // },
  // {
  //   ids: [177, 178],
  //   starttime: '2025/9/29 04:00'
  // },
  {
    ids: [710, 711],
    starttime: '2025/10/27 04:00'
  },
  {
    ids: [328, 329, 330, 371, 372, 373, 557, 558],
    starttime: '2025/11/10 04:00'
  },
  {
    ids: [442],
    starttime: '2025/12/01 04:00'
  },
  {
    ids: [777, 974, 975],
    starttime: '2025/12/22 04:00'
  },
  {
    ids: [213],
    starttime: '2026/01/19 04:00'
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
  {
    name: '強化發動！技能週vol.3',
    namejp: '連発！スキルウィーク vol.3',
    startTime: 1768766400000,
    endTime: 1769371199000,
    notArea: [],
    smallUp: [52, 54, 58, 79, 81, 133, 174, 175, 179, 198, 214, 252, 280, 302, 311, 312, 316, 360, 425, 438, 447, 557, 627, 702, 777, 778, 848, 921],
    midUp: [213],
    isActRandom: true
  }
]