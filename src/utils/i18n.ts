import { createI18n } from 'vue-i18n'
import enUS from 'vant/es/locale/lang/en-US'
import zhCN from 'vant/es/locale/lang/zh-CN'

/**
 * All i18n resources specified in the plugin `include` option can be loaded
 * at once using the import syntax
 */
import messages from '@intlify/unplugin-vue-i18n/messages'
import { Locale, type PickerColumn } from 'vant'

/** 默认语言包名称 */
const FALLBACK_LOCALE = 'US'

/** 多语言 picker columns */
export const languageColumns: PickerColumn = [
  { text: 'English', value: 'US', country: 'United States' },
  { text: 'हिंदी', value: 'HI', country: 'India' },
  { text: 'বাংলা', value: 'BN', country: 'Bangladesh' },
  // { text: 'العربية', value: 'AR', country: 'Saudi Arabia' },
  { text: 'नेपाली', value: 'NP', country: 'Nepal' },
  { text: 'Türkçe', value: 'TR', country: 'Turkey' },
  { text: 'Bahasa Indonesia', value: 'ID', country: 'Indonesia' },
  { text: 'Filipino', value: 'PH', country: 'Philippines' },
  { text: 'Tiếng Việt', value: 'VI', country: 'Vietnam' },
  { text: 'اردو', value: 'PK', country: 'Pakistan' },
  { text: 'தமிழ்', value: 'LK', country: 'Sri Lanka' },
  { text: 'Nederlands', value: 'NL', country: 'Netherlands' },
  { text: 'Deutsch', value: 'DE', country: 'Germany' },
  { text: 'Français', value: 'FR', country: 'France' },

]
function comLocale(type: string | null | undefined) {
  let nowLocale = 'US'
  languageColumns.some(item => {
    if (type.toUpperCase() == item.value) {
      nowLocale = item.value as string
      return true
    }
  })
  return nowLocale
}

/** 获取当前语言对应的语言包名称 */
function getI18nLocale() {
  console.log('当前TG语言', navigator.language)
  const locale = localStorage.getItem('language') ? localStorage.getItem('language') : comLocale(navigator.language)
  for (const l of languageColumns) {
    const value = l.value as string
    console.log(locale, '语言')
    if (value === locale) {
      return locale // 存在当前语言的语言包
    }
    else if (value.indexOf(locale) === 0)
      return value // 存在当前语言的任意地区的语言包
  }
  // return FALLBACK_LOCALE // 使用默认语言包
}

export const i18n = createI18n({
  locale: getI18nLocale(),
  legacy: false,
  messages,
})

/** 当前语言 */
export const locale = computed({
  get() {
    return i18n.global.locale.value
  },
  set(language: string) {
    localStorage.setItem('language', language)
    i18n.global.locale.value = language
    Locale.use(language)
  },
})

// 载入 vant 语言包
Locale.use('zh', zhCN)
Locale.use('US', enUS)

// 根据当前语言切换 vant 语言包
Locale.use(locale.value)
