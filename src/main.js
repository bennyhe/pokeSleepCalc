import { createApp } from 'vue'
import VueLazyload from 'vue3-lazyload'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'md-js' // 全局副作用：挂载 window.Mdjs，供 DialogUpdateLog/DialogSupport 使用
import i18n from './i18n'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.config.globalProperties.IMG_PATH = import.meta.env.BASE_URL + 'img/'
app.use(i18n).use(VueLazyload, {
  preLoad: 1.3,
  error: import.meta.env.BASE_URL + 'img/null.png',
  attempt: 1
}).use(ElementPlus).use(router).mount('#app')
