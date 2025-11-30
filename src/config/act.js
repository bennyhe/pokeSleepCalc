export const SLEEP_CALC_POKEMONS = {
  list: [243, 244, 245, 488], // 特殊宝可梦列表，只能一个
  noLastList: [243, 244, 245, 35, 36, 173, 488,
    252, 253, 254, 255, 256, 257, 258, 259, 260, 311, 312,
    848, 849, 8001,
    177, 178,
    710, 711,
    328, 329, 330, 371, 372, 373, 557, 558
  ], // 不进保底
  probabilityLastList: [] //概率进保底
}

export const IN_LAST_TIME_POKEMONS = [
  {
    ids: [252, 253, 254, 255, 256, 257, 258, 259, 260, 311, 312],
    starttime: '2025/7/14 04:00'
  },
  {
    ids: [848, 849, 8001],
    starttime: '2025/8/11 04:00'
  },
  {
    ids: [177, 178],
    starttime: '2025/9/29 04:00'
  },
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
  banPokes: [442], // ban 宝可梦id
  showBanArea: [0, 3, 4, 6, 7] // 展示区域
}
export const LAB_CONFIG = {
  upIdsSmallIds: [50, 69, 74, 83, 115, 132, 194, 246, 303, 359, 403, 439, 453, 459, 736, 759, 764, 845, 912, 7054, 710],
  upIdsMidIds: [442],
  upIdsLargeIds: [],
  noLastList: [442]
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
  {
    name: '分量加大！料理週vol.2',
    namejp: 'デカ盛り！料理ウィーク vol.2',
    startTime: 1764532800000,
    endTime: 1764791999000,
    notArea: [],
    smallUp: [50, 69, 74, 83, 115, 132, 194, 246, 303, 359, 403, 439, 453, 459, 736, 759, 764, 845, 912, 7054, 710],
    midUp: [442],
    isActRandom: true
  },
  {
    name: '分量加大！料理週vol.2 & 好眠日',
    namejp: 'デカ盛り！料理ウィーク vol.2 & 満月の前後の日',
    startTime: 1764792000000,
    endTime: 1764878399000,
    notArea: [],
    smallUp: [50, 69, 74, 83, 115, 132, 194, 246, 303, 359, 403, 439, 453, 459, 736, 759, 764, 845, 912, 7054, 710],
    midUp: [442, 35, 36, 173],
    times: 1.5,
    isActRandom: true
  },
  {
    name: '分量加大！料理週vol.2 & 满月日',
    namejp: 'デカ盛り！料理ウィーク vol.2 & 満月の日',
    startTime: 1764878400000,
    endTime: 1764964799000,
    notArea: [],
    largeUp: [35, 36, 173],
    smallUp: [50, 69, 74, 83, 115, 132, 194, 246, 303, 359, 403, 439, 453, 459, 736, 759, 764, 845, 912, 7054, 710],
    midUp: [442],
    times: 2,
    isActRandom: true
  },
  {
    name: '分量加大！料理週vol.2 & 好眠日',
    namejp: 'デカ盛り！料理ウィーク vol.2 & 満月の前後の日',
    startTime: 1764964800000,
    endTime: 1765051199000,
    notArea: [],
    smallUp: [50, 69, 74, 83, 115, 132, 194, 246, 303, 359, 403, 439, 453, 459, 736, 759, 764, 845, 912, 7054, 710],
    midUp: [442, 35, 36, 173],
    times: 1.5,
    isActRandom: true
  },
  {
    name: '分量加大！料理週vol.2',
    namejp: 'デカ盛り！料理ウィーク vol.2',
    startTime: 1765051200000,
    endTime: 1765137599000,
    notArea: [],
    smallUp: [50, 69, 74, 83, 115, 132, 194, 246, 303, 359, 403, 439, 453, 459, 736, 759, 764, 845, 912, 7054, 710],
    midUp: [442],
    isActRandom: true
  }
]