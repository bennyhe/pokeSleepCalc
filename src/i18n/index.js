import { createI18n } from 'vue-i18n'
import cn from './lang/cn/index.js'
import jp from './lang/jp/index.js'

const i18n = createI18n({
  locale: localStorage.getItem('psclang') || 'cn', // 设置当前语言类型
  legacy: false, // 如果要支持compositionAPI，此项必须设置为false;
  globalInjection: true, // 全局注册$t方法
  messages: {
    cn,
    jp
  }
})

export default i18n