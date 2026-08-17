export const SLEEP_CALC_POKEMONS = {
  list: [243, 244, 245, 488, 380, 381], // 特殊宝可梦列表，只能一个
  noLastList: [243, 244, 245, 35, 36, 173, 488, 380, 381,
    213,
    742, 743,
    714, 715,
    27, 28,
    696, 697,
    780,
    387, 388, 389, 390, 391, 392, 393, 394, 395,
    701,
    9007, 957, 958, 959
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
  },
  {
    ids: [701],
    starttime: '2026/08/10 04:00'
  },
  {
    ids: [9007,957, 958, 959],
    starttime: '2026/08/17 04:00'
  }
]
// export const SLEEP_TIMELIMIT_POKEMONS = {

// }
export const SLEEP_CALC_UP = {
  small: 4,
  mid: 6,
  large: 9
}
export const SLEEP_CALC_CONFIG = (() => {
  const config = {
    onOffBan: false,
    showBan: false,
    banPokes: [], // ban 宝可梦id
    showBanArea: [], // 展示区域
    endTime: '2026/08/16 22:00'
  }
  // 过了 endTime 自动停用 ban：不再计算 ban 且不展示 ban 开关，活动过期后无需改配置
  if (config.endTime && Date.now() >= new Date(config.endTime).getTime()) {
    config.onOffBan = false
    config.showBan = false
  }
  return config
})()
export const LAB_CONFIG = {
  upIdsSmallIds: [4, 5, 6, 113, 147, 148, 149, 194, 195, 242, 302, 440, 447, 448, 906, 907, 908, 909, 910, 911, 912, 913, 914],
  upIdsMidIds: [9007, 957, 958, 959],
  upIdsLargeIds: [],
  noLastList: []
}
const fnGetMoonDays = (startTime, EndTime, multiTimes) => {
  startTime = new Date(startTime).getTime()
  EndTime = new Date(EndTime).getTime()
  const dayMs = (EndTime - startTime + 1000) / 3
  const upIds = [35, 36, 173]
  const makeDay = (offset, name, namejp, times, upKey) => {
    const s = startTime + offset * dayMs
    return {
      name,
      namejp,
      startTime: s,
      endTime: s + dayMs - 1000,
      notArea: [],
      [upKey]: upIds,
      times
    }
  }
  return [
    makeDay(0, '好眠日', '満月の前後の日', 1.5, 'midUp'),
    makeDay(1, '满月日', '満月の日', multiTimes, 'largeUp'),
    makeDay(2, '好眠日', '満月の前後の日', 1.5, 'midUp')
  ]
}
export const ACT_LIST = [
  //  {
  //    startTime: '2025/01/05 20:00',
  //    endTime: '2025/01/12 03:59:59',
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
  //   startTime: '2026/06/29 04:00',
  //   endTime: '2026/06/30 03:59:59',
  //   notArea: [],
  //   midUp: [35, 36, 173],
  //   times: 1.5
  // },
  // {
  //   name: '满月日',
  //   namejp: '満月の日',
  //   startTime: '2026/06/30 04:00',
  //   endTime: '2026/07/01 03:59:59',
  //   notArea: [],
  //   largeUp: [35, 36, 173],
  //   times: 3
  // },
  // {
  //   name: '好眠日',
  //   namejp: '満月の前後の日',
  //   startTime: '2026/07/01 04:00',
  //   endTime: '2026/07/02 03:59:59',
  //   notArea: [],
  //   midUp: [35, 36, 173],
  //   times: 1.5
  // }
  // ...fnGetMoonDays('2026/07/28 04:00', '2026/07/31 03:59:59', 2.5),
  {
    name: '寶可夢動畫合作週',
    namejp: 'アニポケコラボウィーク',
    startTime: '2026/08/16 22:00:00',
    endTime: '2026/08/24 03:59:59',
    notArea: [],
    midUp: [957, 958, 959, 9007],
    smallUp: [4, 5, 6, 113, 147, 148, 149, 194, 195, 242, 302, 440, 447, 448, 906, 907, 908, 909, 910, 911, 912, 913, 914],
    timelimitPokemons: {
      'beach': [9007],
      'hole': [9007],
      'snow': [9007],
      'lake': [9007],
      'plant': [9007],
      'amber': [9007],
      'greenex': [9007],
      'beachex': [9007]
    },
    actRandomNum: 0.3,  // 默认0.3 [0.3, 0.4]
    isActRandom: true
  }
]