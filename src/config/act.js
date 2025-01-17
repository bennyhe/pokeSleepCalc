export const SLEEP_CALC_POKEMONS = {
  list: [243, 244, 245], // 特殊宝可梦列表，只能一个
  noLastList: [243, 244, 245, 35, 36, 173, 425, 426, 778, 215, 461, 921, 922, 923, 7006, 7007], // 不进保底
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
export const ACT_LIST = [
  // {
  //   name: '1週年紀念嘉年華',
  //   namejp: '1周年記念フェスティバル',
  //   startTime: 1720963486934,
  //   endTime: 1721591999000,
  //   notArea: [1, 2, 3, 4],
  //   midUp: [906, 909, 912]
  // },
  // {
  //   name: '1週年紀念嘉年華',
  //   namejp: '1周年記念フェスティバル',
  //   startTime: 1721592000000,
  //   endTime: 1722196799000,
  //   notArea: [3],
  //   midUp: [906, 907, 908, 909, 910, 911, 912, 913, 914]
  // },
  // {
  //   name: '水屬性週',
  //   namejp: 'みずタイプウィーク',
  //   startTime: 1724011200000,
  //   endTime: 1724615940000,
  //   notArea: [3, 4, 5],
  //   midUp: [7, 8, 9, 54, 55, 79, 80, 134, 158, 159, 160, 194, 195, 199, 912, 913]
  // },
  // {
  //   name: '水君研究',
  //   namejp: 'スイクンリサーチイベント',
  //   startTime: 1725220800000,
  //   endTime: 1726430399000,
  //   notArea: [],
  //   smallUp: [7, 8, 9, 54, 55, 79, 80, 134, 158, 159, 160, 194, 195, 199, 912, 913, 245]
  // }
  // {
  //   name: '萬聖節2024：糖果倍增研究',
  //   namejp: 'ハロウィン2024：ダブルアメリサーチ',
  //   startTime: 1730059200000,
  //   endTime: 1730663999000,
  //   notArea: [1, 2, 3, 4, 5],
  //   midUp: [92, 93, 94, 353, 354, 425, 426, 911],
  //   largeUp: [778, 9001],
  //   // randomGetPercent: 30,
  //   timelimitPokemons: {
  //     'green': [426, 94, 911, 9001]
  //   }
  // }
  // {
  //   name: '伊布週2024',
  //   namejp: 'イーブイウィーク2024',
  //   startTime: 1731873600000,
  //   endTime: 1732391999000,
  //   notArea: [],
  //   largeUp: [133],
  //   midUp: [134, 135, 136, 196, 197, 470, 471, 700]
  // },
  // {
  //   name: '佳節2024：夢之碎片倍增研究',
  //   namejp: 'ホリデー2024：ダブルゆめのかけらリサーチ',
  //   startTime: 1734877179000,
  //   endTime: 1735473599999,
  //   notArea: [1, 2, 3, 4, 5],
  //   midUp: [225, 363, 364, 365, 459, 460, 471, 921, 922, 923, 7006, 7007],
  //   largeUp: [9002, 9004],
  //   // randomGetPercent: 30,
  //   timelimitPokemons: {
  //     'green': [364, 365, 459, 460, 922, 923, 7006, 7007, 9002, 9004]
  //   },
  //   actRandomNum: 0.3
  // },
  // {
  //   name: '新年2025(第1週)',
  //   namejp: 'ニューイヤー2025(1週目)',
  //   startTime: 1735473600000,
  //   endTime: 1736107199000,
  //   notArea: [],
  //   smallUp: [37, 38, 147, 148, 149, 280, 281, 282, 475, 702, 759, 760, 764, 845],
  //   timelimitPokemons: {
  //     'green': [147, 280, 759]
  //   },
  //   actRandomNum: 0.3
  // },
  // {
  //   name: '新年2025(第2週)',
  //   namejp: 'ニューイヤー2025(2週目)',
  //   startTime: 1736078400000,
  //   endTime: 1736625599000,
  //   notArea: [],
  //   smallUp: [194, 195, 215, 304, 305, 306, 403, 404, 405, 425, 426, 461, 736, 737, 738, 778, 906, 907, 908, 909, 910, 911, 912, 913, 914],
  //   timelimitPokemons: {
  //     'green': [304, 403, 736]
  //   },
  //   actRandomNum: 0.3
  // },
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
]