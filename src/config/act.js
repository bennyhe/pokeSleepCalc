export const SLEEP_CALC_POKEMONS = {
  list: [243, 244, 245, 488], // 特殊宝可梦列表，只能一个
  noLastList: [243, 244, 245, 35, 36, 173, 488,
    710, 711,
    328, 329, 330, 371, 372, 373, 557, 558,
    442,
    777, 974, 975,
    213,
    742, 743
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
  },
  {
    ids: [742, 743],
    starttime: '2026/02/09 04:00'
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
  upIdsMidIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 152, 153, 154, 155, 156, 157, 158, 159, 160, 252, 253, 254, 255, 256, 257, 258, 259, 260, 906, 907, 908, 909, 910, 911, 912, 913, 914],
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
  //   startTime: 1769889600000,
  //   endTime: 1769975999000,
  //   notArea: [],
  //   midUp: [35, 36, 173],
  //   times: 1.5
  // },
  // {
  //   name: '满月日',
  //   namejp: '満月の日',
  //   startTime: 1769976000000,
  //   endTime: 1770062399000,
  //   notArea: [],
  //   largeUp: [35, 36, 173],
  //   times: 4
  // },
  // {
  //   name: '好眠日',
  //   namejp: '満月の前後の日',
  //   startTime: 1770062400000,
  //   endTime: 1770148799000,
  //   notArea: [],
  //   midUp: [35, 36, 173],
  //   times: 1.5
  // }
  {
    name: 'Pokémon Day紀念企畫vol.1 & 好眠日',
    namejp: 'ポケモンデー記念キャンペーン vol.1 & 満月の前後の日',
    startTime: 1772395200000,
    endTime: 1772481599000,
    notArea: [],
    midUp: [35, 36, 173, 1, 2, 3, 4, 5, 6, 7, 8, 9, 152, 153, 154, 155, 156, 157, 158, 159, 160, 252, 253, 254, 255, 256, 257, 258, 259, 260, 906, 907, 908, 909, 910, 911, 912, 913, 914],
    times: 1.5,
    isActRandom: true
  },
  {
    name: 'Pokémon Day紀念企畫vol.1 & 满月日',
    namejp: 'ポケモンデー記念キャンペーン vol.1 & 満月の日',
    startTime: 1772481600000,
    endTime: 1772567999000,
    notArea: [],
    midUp: [1, 2, 3, 4, 5, 6, 7, 8, 9, 152, 153, 154, 155, 156, 157, 158, 159, 160, 252, 253, 254, 255, 256, 257, 258, 259, 260, 906, 907, 908, 909, 910, 911, 912, 913, 914],
    largeUp: [35, 36, 173],
    times: 3,
    isActRandom: true
  },
  {
    name: 'Pokémon Day紀念企畫vol.1 & 好眠日',
    namejp: 'ポケモンデー記念キャンペーン vol.1 & 満月の前後の日',
    startTime: 1772568000000,
    endTime: 1772654399000,
    notArea: [],
    midUp: [35, 36, 173, 1, 2, 3, 4, 5, 6, 7, 8, 9, 152, 153, 154, 155, 156, 157, 158, 159, 160, 252, 253, 254, 255, 256, 257, 258, 259, 260, 906, 907, 908, 909, 910, 911, 912, 913, 914],
    times: 1.5,
    isActRandom: true
  },
  {
    name: 'Pokémon Day紀念企畫vol.1',
    namejp: 'ポケモンデー記念キャンペーン vol.1',
    startTime: 1772654400000,
    endTime: 1772999999000,
    notArea: [],
    midUp: [1, 2, 3, 4, 5, 6, 7, 8, 9, 152, 153, 154, 155, 156, 157, 158, 159, 160, 252, 253, 254, 255, 256, 257, 258, 259, 260, 906, 907, 908, 909, 910, 911, 912, 913, 914],
    isActRandom: true
  }
]