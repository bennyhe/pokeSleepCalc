import { createI18n } from 'vue-i18n'
import cn from './lang/cn/index.js'
import jp from './lang/jp/index.js'
// import en from './lang/en/index.js'

const curLang = window.navigator.language.indexOf('ja') > -1 ? 'jp' : 'cn'
const i18n = createI18n({
  locale: localStorage.getItem('psclang') || curLang, // 设置当前语言类型
  legacy: false, // 如果要支持compositionAPI，此项必须设置为false;
  globalInjection: true, // 全局注册$t方法
  messages: {
    cn,
    jp
    // en
  }
})

export default i18n