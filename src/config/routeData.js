// 路由元数据（不含组件）：src/router/index.js 与 vite.config.js 共用，避免两处维护
// 约束：此文件必须保持纯数据，不得 import .vue 组件或使用 import.meta/localStorage，
// 否则 vite.config.js（Node 侧经 esbuild 打包加载）无法直接引用

// 路由语言前缀；与 App.vue 的 langToRoute（cn→zh、jp→ja）对应
export const LANG_PREFIXES = ['zh', 'ja']

// 页面路由元数据：path 为路由段，component 由 src/router/index.js 通过 pageComponents 注入
export const pageRouteMeta = [
  { path: 'sleepcalc', title: 'Sleep Calc', icon: 'sleep', navName: 'SLEEP CALC', inNav: true },
  { path: 'foodrec', title: 'Food', icon: 'food', navName: 'FOOD', inNav: true },
  { path: 'candycalc', title: 'Candy Calc', icon: 'candy2', navName: 'CANDY CALC', inNav: true, pageClass: 'page-candycalc' },
  { path: 'helpspeedcalc', title: 'Help Speed Calc', icon: 'lab', navName: 'HELP SPEED CALC', inNav: true, pageClass: 'page-helpcalc' },
  { path: 'pokedex', title: 'Pokedex', icon: 'pokeball', navName: 'POKEDEX', inNav: true, pageClass: 'page-pokedex' },
  { path: 'onedayenergy', title: 'One Day Energy', icon: 'board', navName: 'ONE DAY ENERGY', inNav: true },
  { path: 'new', title: 'New Pokemon', icon: 'calendar', navName: 'NEW', inNav: true },
  { path: 'sleeplab', title: 'Sleep Lab', inNav: false },
  { path: 'master20', title: 'Master Resource', inNav: false, pageClass: 'page-master' },
  { path: 'findpm', title: 'Find Pokemon', inNav: false, pageClass: 'page-findpm' }
]
