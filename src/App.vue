<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'

import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)

import PageFooter from './components/PageFooter/PFooter.vue'
import SvgIcon from './components/SvgIcon/IconItem.vue'
import { pageRoutes } from './router/index.js'
import { NAV_LANG } from './config/nav.js'

const route = useRoute()
const router = useRouter()

const sellang = ref(localStorage.getItem('psclang') || (window.navigator.language.indexOf('ja') > -1 ? 'jp' : 'cn'))
const { locale } = useI18n() // 先调用此方法，然后再使用
const changeLanguage = () => {
  locale.value = sellang.value
  localStorage.setItem('psclang', sellang.value)
}
changeLanguage()

// sellang(cn/jp) 与路由前缀(zh/ja) 的映射
const langToRoute = { cn: 'zh', jp: 'ja' }
const routeToLang = { zh: 'cn', ja: 'jp' }

const handleClickChangeLang = () => {
  changeLanguage()
  // 跳转到相同路径但切换语言前缀
  const routePrefix = langToRoute[sellang.value] || 'zh'
  const pagePath = route.path.split('/').slice(2).join('/')
  router.push(`/${routePrefix}/${pagePath}`)
}

// 导航列表（从路由配置中读取）
const navList = pageRoutes.filter(r => r.inNav)

const currentLang = ref(langToRoute[sellang.value] || 'zh')

// 当前页面路径
const currentPath = computed(() => route.path.split('/').filter(p => p)[1] || '')

// 监听路由变化更新语言（immediate 确保初始加载时同步）
watch(() => route.path, () => {
  const routeLang = route.path.split('/')[1] || 'zh'
  currentLang.value = routeLang
  // 同步 sellang
  const mapped = routeToLang[routeLang]
  if (mapped && sellang.value !== mapped) {
    sellang.value = mapped
    changeLanguage()
  }
  // 动态设置页面 title
  const title = route.meta.title
  document.title = title ? `${title} - PokeSleepCalc` : 'PokeSleepCalc'
}, { immediate: true })

// 黑夜模式开关
const isDarkSwitch = ref(isDark.value)

// 是否根路径（用于隐藏语言切换）
const isRootPath = computed(() => route.path === '/')

// 导航跳转
const navigateTo = page => {
  router.push(`/${currentLang.value}/${page.path}`)
  window.scrollTo(0, 0)
}

// 页面容器 class（从路由配置中读取）
const getPageClass = computed(() => {
  const page = pageRoutes.find(r => r.path === currentPath.value)
  return page?.pageClass || ''
})
</script>
<template>
  <div class="main" :class="`lang-${sellang}`">
    <div class="select-lang" v-if="!isRootPath">
      <el-switch
        v-model="isDarkSwitch"
        @change="toggleDark()"
        inline-prompt
        :active-action-icon="Moon"
        :inactive-action-icon="Sunny"
        style="
          --el-switch-on-color: #303134;
          --el-switch-off-color: #4b4b4b;
          margin-right: 2px;
        "
      >
      </el-switch>
      <span class="select">
        Lang: {{ $t("lang") }}
        <select v-model="sellang" @change="handleClickChangeLang()">
          <option
            :value="item.id"
            v-for="(item, index) in NAV_LANG"
            :key="index"
          >
            {{ item.name }}
          </option>
        </select>
      </span>
    </div>
    
    <!-- 使用 router-view 显示页面 -->
    <router-view v-slot="{ Component }">
      <div class="page-item cur" :class="getPageClass">
        <component :is="Component" :key="currentLang" />
      </div>
    </router-view>
    
    <PageFooter />
    <nav class="nav">
      <ul>
        <li
          v-for="page in navList"
          :key="page.path"
          :class="{ cur: currentPath === page.path }"
          @click="navigateTo(page)"
        >
          <SvgIcon :type="page.icon" v-if="page.icon" />
          <span class="nav__text">{{ page.navName }}</span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style lang="scss">
@import "@/style/style.scss";
</style>
