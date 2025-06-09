export const SLEEP_CALC_POKEMONS = {
  list: [243, 244, 245, 488], // 特殊宝可梦列表，只能一个
  noLastList: [243, 244, 245, 35, 36, 173,
    517, 518,
    488,
    113, 242, 440,
    198, 430,
    303
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
  upIdsSmallIds: [1, 4, 7, 92, 127, 133, 147, 194, 198, 214, 225, 304, 440, 906, 909],
  upIdsMidIds: [303],
  upIdsLargeIds: [],
  noLastList: [303]
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
  //   name: '新月之日前',
  //   namejp: '新月の前後の日',
  //   startTime: 1748203200000,
  //   endTime: 1748289599000,
  //   notArea: [],
  //   midUp: [198, 430],
  //   isActRandom: true
  // },
  // {
  //   name: '新月之日',
  //   namejp: '新月の日',
  //   startTime: 1748289600000,
  //   endTime: 1748375999000,
  //   notArea: [],
  //   midUp: [198, 430],
  //   isActRandom: true
  // },
  // {
  //   name: '新月之日后',
  //   namejp: '新月の前後の日',
  //   startTime: 1748376000000,
  //   endTime: 1748462399000,
  //   notArea: [],
  //   midUp: [198, 430],
  //   isActRandom: true
  // }
  {
    name: '分量加大！料理週vol.1',
    namejp: 'デカ盛り！料理ウィーク vol.1',
    startTime: 1749412800000,
    endTime: 1749499199000,
    notArea: [],
    midUp: [303],
    smallUp: [1, 4, 7, 92, 127, 133, 147, 194, 198, 214, 225, 304, 440, 906, 909],
    isActRandom: true
  },
  {
    name: '分量加大！料理週vol.1 & 好眠日',
    namejp: 'デカ盛り！料理ウィーク vol.1 & 満月の前後の日',
    startTime: 1749499200000,
    endTime: 1749585599000,
    notArea: [],
    midUp: [35, 36, 173, 303],
    smallUp: [1, 4, 7, 92, 127, 133, 147, 194, 198, 214, 225, 304, 440, 906, 909],
    times: 1.5,
    isActRandom: true
  },
  {
    name: '分量加大！料理週vol.1 & 满月日',
    namejp: 'デカ盛り！料理ウィーク vol.1 & 満月の日',
    startTime: 1749585600000,
    endTime: 1749671999000,
    notArea: [],
    largeUp: [35, 36, 173],
    midUp: [303],
    smallUp: [1, 4, 7, 92, 127, 133, 147, 194, 198, 214, 225, 304, 440, 906, 909],
    times: 2.5,
    isActRandom: true
  },
  {
    name: '分量加大！料理週vol.1 & 好眠日',
    namejp: 'デカ盛り！料理ウィーク vol.1 & 満月の前後の日',
    startTime: 1749672000000,
    endTime: 1749758399000,
    notArea: [],
    midUp: [35, 36, 173, 303],
    smallUp: [1, 4, 7, 92, 127, 133, 147, 194, 198, 214, 225, 304, 440, 906, 909],
    times: 1.5,
    isActRandom: true
  },
  {
    name: '分量加大！料理週vol.1',
    namejp: 'デカ盛り！料理ウィーク vol.1',
    startTime: 1749758400000,
    endTime: 1750017599000,
    notArea: [],
    midUp: [303],
    smallUp: [1, 4, 7, 92, 127, 133, 147, 194, 198, 214, 225, 304, 440, 906, 909],
    isActRandom: true
  }
]