export const SLEEP_CALC_POKEMONS = {
  list: [243, 244, 245, 488, 380, 381], // 特殊宝可梦列表，只能一个
  noLastList: [243, 244, 245, 35, 36, 173, 488, 380, 381,
    213,
    742, 743,
    714, 715,
    27, 28,
    696, 697,
    780
    // 387, 388, 389, 390, 391, 392, 393, 394, 395
  ], // 不进保底
  probabilityLastList: [] //概率进保底
}

export const IN_LAST_TIME_DAYS = 100
export const IN_LAST_TIME_POKEMONS = [
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
  },
  {
    ids: [780],
    starttime: '2026/05/25 04:00'
  },
  {
    ids: [387, 388, 389, 390, 391, 392, 393, 394, 395],
    starttime: '2026/07/13 04:00'
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
  banPokes: [387, 388, 389, 390, 391, 392, 393, 394, 395], // ban 宝可梦id
  showBanArea: [0, 1, 2, 3, 4, 6, 7] // 展示区域
}
export const LAB_CONFIG = {
  upIdsSmallIds: [],
  upIdsMidIds: [387, 388, 389, 390, 391, 392, 393, 394, 395],
  upIdsLargeIds: [],
  noLastList: [387, 388, 389, 390, 391, 392, 393, 394, 395]
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
  //   startTime: 1782676800000,
  //   endTime: 1782763199000,
  //   notArea: [],
  //   midUp: [35, 36, 173],
  //   times: 1.5
  // },
  // {
  //   name: '满月日',
  //   namejp: '満月の日',
  //   startTime: 1782763200000,
  //   endTime: 1782849599000,
  //   notArea: [],
  //   largeUp: [35, 36, 173],
  //   times: 3
  // },
  // {
  //   name: '好眠日',
  //   namejp: '満月の前後の日',
  //   startTime: 1782849600000,
  //   endTime: 1782935999000,
  //   notArea: [],
  //   midUp: [35, 36, 173],
  //   times: 1.5
  // }
  {
    name: '3週年搶先慶企畫',
    namejp: 'もうすぐ3周年キャンペーン',
    startTime: 1783281600000,
    endTime: 1783886399000,
    notArea: [3],
    midUp: [252, 253, 254, 255, 256, 257, 258, 259, 260, 311, 312],
    actRandomNum: 0.3,  // 默认0.3 [0.3, 0.4]
    isActRandom: true
  },
  {
    name: '3週年紀念嘉年華第1週',
    namejp: '3周年記念フェスティバル1週目',
    startTime: 1783886400000,
    endTime: 1784491199000,
    notArea: [5],
    midUp: [387, 390, 393],
    actRandomNum: 0.3,  // 默认0.3 [0.3, 0.4]
    isActRandom: true
  },
  {
    name: '3週年紀念嘉年華第2週',
    namejp: '3周年記念フェスティバル2週目',
    startTime: 1784491200000,
    endTime: 1785095999000,
    notArea: [5],
    midUp: [387, 388, 389, 390, 391, 392, 393, 394, 395],
    actRandomNum: 0.3,  // 默认0.3 [0.3, 0.4]
    isActRandom: true
  }
]