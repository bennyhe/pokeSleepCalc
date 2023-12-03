import { createApp } from 'vue'
import VueLazyload from 'vue3-lazyload'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

createApp(App).use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1
}).use(ElementPlus).mount('#app')
