export const SLEEP_CALC_POKEMONS = {
  list: [243, 244, 245, 488], // 特殊宝可梦列表，只能一个
  noLastList: [243, 244, 245, 35, 36, 173, 488,
    // 113, 242, 440,
    // 198, 430,
    303,
    83,
    252, 253, 254, 255, 256, 257, 258, 259, 260, 311, 312,
    848, 849, 8001,
    177, 178
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
  upIdsSmallIds: [10, 19, 23, 37, 56, 84, 95, 104, 152, 155, 158, 172, 173, 215, 228, 252, 255, 258, 287, 333, 353, 363, 517, 627, 778, 7006],
  upIdsMidIds: [177, 178],
  upIdsLargeIds: [],
  noLastList: [177, 178]
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
  {
    name: '果實纍纍！樹果週vol.1',
    namejp: 'どっさり！きのみウィーク vol.1',
    startTime: 1759089600000,
    endTime: 1759694399000,
    notArea: [],
    smallUp: [10, 19, 23, 37, 56, 84, 95, 104, 152, 155, 158, 172, 173, 215, 228, 252, 255, 258, 287, 333, 353, 363, 517, 627, 778, 7006],
    midUp: [177, 178],
    isActRandom: true
  },
  {
    name: '好眠日',
    namejp: '満月の前後の日',
    startTime: 1759694400000,
    endTime: 1759780799000,
    notArea: [],
    midUp: [35, 36, 173],
    times: 1.5,
    isActRandom: true
  },
  {
    name: '满月日',
    namejp: '満月の日',
    startTime: 1759780800000,
    endTime: 1759867199000,
    notArea: [],
    largeUp: [35, 36, 173],
    times: 3,
    isActRandom: true
  },
  {
    name: '好眠日',
    namejp: '満月の前後の日',
    startTime: 1759867200000,
    endTime: 1759953599000,
    notArea: [],
    midUp: [35, 36, 173],
    times: 1.5,
    isActRandom: true
  },
  {
    name: '發現寶可夢睡姿週vol.2',
    namejp: 'ポケモン寝顔発見ウィーク vol.2',
    startTime: 1759953600000,
    endTime: 1760299199000,
    notArea: [],
    midUp: [],
    isActRandom: true
  }
]