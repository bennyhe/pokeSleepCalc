import map1 from './gameMap/1.js'
import map2 from './gameMap/2.js'
import map3 from './gameMap/3.js'
import map4 from './gameMap/4.js'
import map5 from './gameMap/5.js'
import map6 from './gameMap/6.js'
import map7 from './gameMap/7.js'
import map10001 from './gameMap/10001.js'
import map10002 from './gameMap/10002.js'

export const POKEMON_MAX_LEVEL = 70
export const EX_HELP_SPEED = { // ex岛屿帮忙间隔配置，新增ex岛屿时在此追加
  greenex: { bonus: 10, penalty: 15 }, // bonus=首个选中树果缩短%，penalty=其他属性延长%
  beachex: { bonus: 20, penalty: 35 }
}

export const FMB_MAP_INDEXES = [0, 7, 8] // 共享树果偏好（FMB）的岛屿索引，新增岛屿时只需在此追加
export const areaBonusMax = 85
export const mapSplitVer = '3.0.4'
export const gameMap = [
  map1,
  map2,
  map3,
  map4,
  map5,
  map6,
  map7,
  map10001,
  map10002
]

export const SHINY_LOCK_POKEMONS = [491, 151, 9007] // 锁闪：无闪光形态的宝可梦，仅用于闪光 UI 控制
export const SP_POKEMONS = [491, 151] // 特殊食材槽位宝可梦（达克莱伊491、梦幻151等），仅用于食材组合计算