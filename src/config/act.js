export const SLEEP_CALC_POKEMONS = {
  list: [243, 244, 245, 488], // 特殊宝可梦列表，只能一个
  noLastList: [243, 244, 245, 35, 36, 173, 627, 628, 980, 7054,
    517, 518,
    488,
    113, 242, 440
    // 198, 430
  ], // 不进保底
  probabilityLastList: [] //概率进保底
}
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
  upIdsMidIds: [198, 430],
  upIdsLargeIds: [],
  noLastList: [198, 430]
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
  //   name: '春日嘉年華2025',
  //   namejp: 'スプリングフェス2025',
  //   startTime: 1746388800000,
  //   endTime: 1746993599000,
  //   notArea: [],
  //   midUp: [113, 242, 440],
  //   smallUp: [81, 132, 175, 225, 302, 333, 353, 363, 447, 453, 845],
  //   isActRandom: true
  // },
  {
    name: '新月之日前',
    namejp: '新月の前後の日',
    startTime: 1748203200000,
    endTime: 1748289599000,
    notArea: [],
    midUp: [198, 430],
    isActRandom: true
  },
  {
    name: '新月之日',
    namejp: '新月の日',
    startTime: 1748289600000,
    endTime: 1748375999000,
    notArea: [],
    midUp: [198, 430],
    isActRandom: true
  },
  {
    name: '新月之日后',
    namejp: '新月の前後の日',
    startTime: 1748376000000,
    endTime: 1748462399000,
    notArea: [],
    midUp: [198, 430],
    isActRandom: true
  }
]