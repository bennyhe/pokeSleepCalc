import { createRouter, createWebHistory } from 'vue-router'
import SleepCalc from '../pages/SleepCalc.vue'
import FoodRec from '../pages/FoodRec.vue'
import CandyCalc from '../pages/CandyCalc.vue'
import HelpSpeedCalc from '../pages/HelpSpeedCalc.vue'
import PagePokedex from '../pages/PokedexApp.vue'
import OneDayEnergy from '../pages/OneDayEnergy.vue'
import NewPoke from '../pages/NewPoke.vue'
import SleepLab from '../pages/SleepLab.vue'
import MasterRes from '../pages/MasterRes.vue'
import FindPm from '../pages/FindPm.vue'

// 页面路由表（集中管理 path、title、icon、navName、pageClass、inNav）
export const pageRoutes = [
  { path: 'sleepcalc', component: SleepCalc, title: 'Sleep Calc', icon: 'sleep', navName: 'SLEEP CALC', inNav: true },
  { path: 'foodrec', component: FoodRec, title: 'Food', icon: 'food', navName: 'FOOD', inNav: true },
  { path: 'candycalc', component: CandyCalc, title: 'Candy Calc', icon: 'candy2', navName: 'CANDY CALC', inNav: true, pageClass: 'page-candycalc' },
  { path: 'helpspeedcalc', component: HelpSpeedCalc, title: 'Help Speed Calc', icon: 'lab', navName: 'HELP SPEED CALC', inNav: true, pageClass: 'page-helpcalc' },
  { path: 'pokedex', component: PagePokedex, title: 'Pokedex', icon: 'pokeball', navName: 'POKEDEX', inNav: true, pageClass: 'page-pokedex' },
  { path: 'onedayenergy', component: OneDayEnergy, title: 'One Day Energy', icon: 'board', navName: 'ONE DAY ENERGY', inNav: true },
  { path: 'new', component: NewPoke, title: 'New Pokemon', icon: 'calendar', navName: 'NEW', inNav: true },
  { path: 'sleeplab', component: SleepLab, title: 'Sleep Lab', inNav: false },
  { path: 'master20', component: MasterRes, title: 'Master Resource', inNav: false, pageClass: 'page-master' },
  { path: 'findpm', component: FindPm, title: 'Find Pokemon', inNav: false, pageClass: 'page-findpm' }
]

const defaultPage = pageRoutes[0].path

// 根据已保存的语言偏好决定重定向目标
const savedLangRedirect = () => {
  const saved = localStorage.getItem('psclang')
  const prefix = saved === 'jp' ? 'ja' : 'zh'
  return `/${prefix}/${defaultPage}`
}

const routes = [
  // 根据已保存的语言偏好动态重定向
  { path: '/', redirect: savedLangRedirect },
  // 中文路由
  ...pageRoutes.map(r => ({
    path: `/zh/${r.path}`,
    component: r.component,
    meta: { lang: 'zh', title: r.title }
  })),
  { path: '/zh', redirect: `/zh/${defaultPage}` },
  // 日语路由
  ...pageRoutes.map(r => ({
    path: `/ja/${r.path}`,
    component: r.component,
    meta: { lang: 'ja', title: r.title }
  })),
  { path: '/ja', redirect: `/ja/${defaultPage}` },
  // 其他路径重定向
  { path: '/:pathMatch(.*)*', redirect: savedLangRedirect }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
