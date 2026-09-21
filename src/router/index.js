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

// 页面路由表
const pageRoutes = [
  { path: 'sleepcalc', component: SleepCalc, title: 'Sleep Calc' },
  { path: 'foodrec', component: FoodRec, title: 'Food' },
  { path: 'candycalc', component: CandyCalc, title: 'Candy Calc' },
  { path: 'helpspeedcalc', component: HelpSpeedCalc, title: 'Help Speed Calc' },
  { path: 'pokedex', component: PagePokedex, title: 'Pokedex' },
  { path: 'onedayenergy', component: OneDayEnergy, title: 'One Day Energy' },
  { path: 'newpoke', component: NewPoke, title: 'New Pokemon' },
  { path: 'sleeplab', component: SleepLab, title: 'Sleep Lab' },
  { path: 'masterres', component: MasterRes, title: 'Master Resource' },
  { path: 'findpm', component: FindPm, title: 'Find Pokemon' }
]

// 根据已保存的语言偏好决定重定向目标
const savedLangRedirect = () => {
  const saved = localStorage.getItem('psclang')
  const prefix = saved === 'jp' ? 'ja' : 'zh'
  return `/${prefix}/sleepcalc`
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
  { path: '/zh', redirect: '/zh/sleepcalc' },
  // 日语路由
  ...pageRoutes.map(r => ({
    path: `/ja/${r.path}`,
    component: r.component,
    meta: { lang: 'ja', title: r.title }
  })),
  { path: '/ja', redirect: '/ja/sleepcalc' },
  // 其他路径重定向
  { path: '/:pathMatch(.*)*', redirect: savedLangRedirect }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
