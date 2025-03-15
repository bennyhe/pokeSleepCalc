export const SLEEP_CALC_POKEMONS = {
  list: [243, 244, 245], // 特殊宝可梦列表，只能一个
  noLastList: [243, 244, 245, 35, 36, 173, 627, 628 ,980, 7054,
    921, 922, 923, 7006, 7007
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
  onOffBan: true,
  showBan: true,
  banPokes: [517, 518], // ban 宝可梦id
  showBanArea: [0, 4, 5] // 展示区域
}
export const LAB_CONFIG = {
  upIdsSmallIds: [122, 196, 202, 280, 281, 282, 360, 439],
  upIdsMidIds: [517, 518],
  upIdsLargeIds: [],
  noLastList: [517, 518]
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
  // },
  // {
  //   name: '情人節2025',
  //   namejp: 'バレンタイン2025',
  //   startTime: 1739131200000,
  //   endTime: 1739217599000,
  //   notArea: [],
  //   midUp: [980, 7054],
  //   smallUp: [54, 127, 172, 280, 304, 359, 736, 778],
  //   isActRandom: true
  // },
  // {
  //   name: '好眠日&情人節2025',
  //   namejp: '満月の前後の日&バレンタイン2025',
  //   startTime: 1739217600000,
  //   endTime: 1739303999000,
  //   notArea: [],
  //   midUp: [35, 36, 173, 980, 7054],
  //   smallUp: [54, 127, 172, 280, 304, 359, 736, 778],
  //   times: 1.5,
  //   isActRandom: true
  // },
  // {
  //   name: '满月日&情人節2025',
  //   namejp: '満月の日&バレンタイン2025',
  //   startTime: 1739304000000,
  //   endTime: 1739390399000,
  //   notArea: [],
  //   largeUp: [35, 36, 173],
  //   midUp: [980, 7054],
  //   smallUp: [54, 127, 172, 280, 304, 359, 736, 778],
  //   times: 2.5,
  //   isActRandom: true
  // },
  // {
  //   name: '好眠日&情人節2025',
  //   namejp: '満月の前後の日&バレンタイン2025',
  //   startTime: 1739390400000,
  //   endTime: 1739476799000,
  //   notArea: [],
  //   midUp: [35, 36, 173, 980, 7054],
  //   smallUp: [54, 127, 172, 280, 304, 359, 736, 778],
  //   times: 1.5,
  //   isActRandom: true
  // },
  // {
  //   name: '情人節2025',
  //   namejp: 'バレンタイン2025',
  //   startTime: 1739476800000,
  //   endTime: 1739735999000,
  //   notArea: [],
  //   midUp: [980, 7054],
  //   smallUp: [54, 127, 172, 280, 304, 359, 736, 778],
  //   isActRandom: true
  // }
  {
    name: '好眠日',
    namejp: '満月の前後の日',
    startTime: 1741809600000,
    endTime: 1741895999000,
    notArea: [],
    midUp: [35, 36, 173],
    times: 1.5
  },
  {
    name: '满月日',
    namejp: '満月の日',
    startTime: 1741896000000,
    endTime: 1741982399000,
    notArea: [],
    largeUp: [35, 36, 173],
    times: 2
  },
  {
    name: '好眠日',
    namejp: '満月の前後の日',
    startTime: 1741982400000,
    endTime: 1742068799000,
    notArea: [],
    midUp: [35, 36, 173],
    times: 1.5
  },
  {
    name: '超能力屬性週',
    namejp: 'エスパータイプウィーク',
    startTime: 1742155200000,
    endTime: 1742759999000,
    notArea: [],
    midUp: [517, 518],
    smallUp: [122, 196, 202, 280, 281, 282, 360, 439],
    isActRandom: true
  }
]