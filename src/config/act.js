export const SLEEP_CALC_POKEMONS = {
  list: [243, 244, 245, 488], // 特殊宝可梦列表，只能一个
  noLastList: [243, 244, 245, 35, 36, 173, 488,
    252, 253, 254, 255, 256, 257, 258, 259, 260, 311, 312,
    848, 849, 8001,
    177, 178,
    710, 711,
    328, 329, 330, 371, 372, 373, 557, 558,
    442
    // 777, 974, 975, 9006
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
  },
  {
    ids: [777, 974, 975],
    starttime: '2025/12/22 04:00'
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
  banPokes: [777, 974, 975, 9002, 9004, 9006], // ban 宝可梦id
  showBanArea: [0, 3, 5, 6, 7] // 展示区域
}
export const LAB_CONFIG = {
  upIdsSmallIds: [225, 363, 364, 365, 459, 460, 471, 921, 922, 923, 7006, 7007],
  upIdsMidIds: [9002, 9004],
  upIdsLargeIds: [777, 974, 975, 9006],
  noLastList: [777, 974, 975, 9006]
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
    name: '佳節2025：夢之碎片倍增研究',
    namejp: 'ホリデー2025：ダブルゆめのかけらリサーチ',
    startTime: 1766347200000,
    endTime: 1766951999000,
    notArea: [1, 2, 3, 4, 5, 6],
    largeUp: [777, 974, 975, 9006],
    midUp: [9002, 9004],
    smallUp: [225, 363, 364, 365, 459, 460, 471, 921, 922, 923, 7006, 7007],
    isActRandom: true
  },
  {
    name: '新年2026(第1週)',
    namejp: 'ニューイヤー2026(1週目)',
    startTime: 1766952000000,
    endTime: 1767556799000,
    notArea: [],
    smallUp: [83, 113, 198, 242, 252, 253, 254, 255, 256, 257, 258, 259, 260, 303, 430, 440, 517, 518, 627, 628, 980, 7054],
    isActRandom: true
  },
  {
    name: '新年2026(第2週)',
    namejp: 'ニューイヤー2026(2週目)',
    startTime: 1767556800000,
    endTime: 1768161599000,
    notArea: [1],
    smallUp: [177, 178, 311, 312, 328, 329, 330, 371, 372, 373, 442, 557, 558, 848, 849, 8001, 710, 711],
    isActRandom: true
  }
]