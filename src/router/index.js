import { createRouter, createWebHistory } from 'vue-router'
import { LANG_PREFIXES, pageRouteMeta } from '@/config/routeData'
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

// path -> 页面组件；新增页面时在此补一行，并在 src/config/routeData.js 补一条元数据
const pageComponents = {
  sleepcalc: SleepCalc,
  foodrec: FoodRec,
  candycalc: CandyCalc,
  helpspeedcalc: HelpSpeedCalc,
  pokedex: PagePokedex,
  onedayenergy: OneDayEnergy,
  new: NewPoke,
  sleeplab: SleepLab,
  master20: MasterRes,
  findpm: FindPm
}

// 页面路由表（元数据 + 组件）：若某条 path 忘记补组件映射，加载时立即报错，避免出现 component 为 undefined 的空路由
export const pageRoutes = pageRouteMeta.map(meta => {
  const component = pageComponents[meta.path]
  if (!component) throw new Error(`[router] pageComponents 缺少 "${meta.path}" 的组件映射，请检查 src/router/index.js`)
  return { ...meta, component }
})

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
  // 各语言路由：{prefix}/{page}
  ...LANG_PREFIXES.flatMap(prefix =>
    pageRoutes.map(r => ({
      path: `/${prefix}/${r.path}`,
      component: r.component,
      meta: { lang: prefix, title: r.title }
    }))
  ),
  // 各语言根路径重定向到默认页
  ...LANG_PREFIXES.map(prefix => ({ path: `/${prefix}`, redirect: `/${prefix}/${defaultPage}` })),
  // 其他路径重定向
  { path: '/:pathMatch(.*)*', redirect: savedLangRedirect }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
