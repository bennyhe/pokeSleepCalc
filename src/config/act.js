export const SLEEP_CALC_POKEMONS = {
  list: [243, 244, 245, 488, 380], // 特殊宝可梦列表，只能一个
  noLastList: [243, 244, 245, 35, 36, 173, 488, 380,
    // 710, 711,
    // 328, 329, 330, 371, 372, 373, 557, 558,
    442,
    777, 974, 975,
    213,
    742, 743,
    714, 715,
    27, 28,
    696, 697
  ], // 不进保底
  probabilityLastList: [] //概率进保底
}

export const IN_LAST_TIME_DAYS = 100
export const IN_LAST_TIME_POKEMONS = [
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
  },
  {
    ids: [742, 743],
    starttime: '2026/02/09 04:00'
  },
  {
    ids: [714, 715],
    starttime: '2026/03/23 04:00'
  },
  {
    ids: [27, 28],
    starttime: '2026/04/27 04:00'
  },
  {
    ids: [696, 697],
    starttime: '2026/05/11 04:00'
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
  onOffBan: true,
  showBan: true,
  banPokes: [696, 697], // ban 宝可梦id
  showBanArea: [0, 2, 6, 7] // 展示区域
}
export const LAB_CONFIG = {
  upIdsSmallIds: [696, 697],
  upIdsMidIds: [10,19,23,37,56,84,95,104,152,155,158,172,173,177,215,228,252,255,258,287,333,353,363,371,517,627,778,7006],
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
  //   startTime: 1774987200000,
  //   endTime: 1775073599000,
  //   notArea: [],
  //   midUp: [35, 36, 173],
  //   times: 1.5
  // },
  // {
  //   name: '满月日',
  //   namejp: '満月の日',
  //   startTime: 1775073600000,
  //   endTime: 1775159999000,
  //   notArea: [],
  //   largeUp: [35, 36, 173],
  //   times: 2
  // },
  // {
  //   name: '好眠日',
  //   namejp: '満月の前後の日',
  //   startTime: 1775160000000,
  //   endTime: 1775246399000,
  //   notArea: [],
  //   midUp: [35, 36, 173],
  //   times: 1.5
  // },
  {
    name: '果實纍纍！樹果週vol.2',
    namejp: 'どっさり！きのみウィーク vol.2',
    startTime: 1778443200000,
    endTime: 1779047999000,
    notArea: [],
    smallUp: [10,19,23,37,56,84,95,104,152,155,158,172,173,177,215,228,252,255,258,287,333,353,363,371,517,627,778,7006],
    midUp: [696, 697],
    isActRandom: true
  }
]