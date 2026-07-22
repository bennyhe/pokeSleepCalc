import { createApp } from 'vue'
import VueLazyload from 'vue3-lazyload'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'md-js' // 全局副作用：挂载 window.Mdjs，供 DialogUpdateLog/DialogSupport 使用
import i18n from './i18n'
import App from './App.vue'

createApp(App).use(i18n).use(VueLazyload, {
  preLoad: 1.3,
  error: 'img/null.png',
  attempt: 1
}).use(ElementPlus).mount('#app')
