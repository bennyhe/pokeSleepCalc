import i18n from '../i18n'
const { t } = i18n.global
export const NAV_SLEEPCALC = {
  navList: [
    {
      name: t('PAGE_SLEEPCALC.navSplitByNum'),
      value: 0
    },
    {
      name: t('PAGE_SLEEPCALC.navRandomGet'),
      value: 2
    },
    {
      name: t('PAGE_SLEEPCALC.navAnalytics'),
      value: 3
    }
  ],
  navIndex: 0
}
export const NAV_HELPSPEEDCALC = {
  navList: [
    {
      name: '默认',
      value: 0
    },
    {
      name: '盒子对比',
      value: 1
    }
  ],
  navIndex: 0
}