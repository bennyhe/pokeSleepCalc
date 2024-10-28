export const SLEEP_CALC_POKEMONS = {
  list: [243, 244, 245], // 特殊宝可梦列表，只能一个
  noLastList: [243, 244, 245, 35, 36, 173, 304, 305, 306, 403, 404, 405, 736, 737, 738, 425, 426], // 不进保底
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
  // },
  // {
  //   name: '黃金舊發電廠登場企畫&好眠日',
  //   namejp: 'ゴールド旧発電所登場キャンペーン&満月の前後の日',
  //   startTime: 1729022400000,
  //   endTime: 1729108799000,
  //   notArea: [],
  //   smallUp: [304, 403, 736, 425],
  //   midUp: [35, 36, 173]
  // },
  // {
  //   name: '黃金舊發電廠登場企畫&满月日',
  //   namejp: '黃金舊發電廠登場企畫ゴールド旧発電所登場キャンペーン&満月の日',
  //   startTime: 1729108800000,
  //   endTime: 1729195199000,
  //   notArea: [],
  //   smallUp: [304, 403, 736, 425],
  //   largeUp: [35, 36, 173]
  // },
  // {
  //   name: '黃金舊發電廠登場企畫&好眠日',
  //   namejp: '黃金舊發電廠登場企畫ゴールド旧発電所登場キャンペーン&満月の前後の日',
  //   startTime: 1729195200000,
  //   endTime: 1729281599000,
  //   notArea: [],
  //   smallUp: [304, 403, 736, 425],
  //   midUp: [35, 36, 173]
  // },
  // {
  //   name: '黃金舊發電廠登場企畫',
  //   namejp: 'ゴールド旧発電所登場キャンペーン',
  //   startTime: 1729281600000,
  //   endTime: 1729454399000,
  //   notArea: [1, 2, 3, 4],
  //   smallUp: [304, 403, 736, 425]
  // },
  {
    name: '萬聖節2024：糖果倍增研究',
    namejp: 'ハロウィン2024：ダブルアメリサーチ',
    startTime: 1730059200000,
    endTime: 1730663999000,
    notArea: [1, 2, 3, 4, 5],
    midUp: [92, 93, 94, 353, 354, 425, 426, 911],
    largeUp: [778, 9001],
    timelimitPokemons: {
      'green': [426, 94, 911, 9001]
    }
  }
]