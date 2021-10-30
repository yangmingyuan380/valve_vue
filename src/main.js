import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
import zhLocale from 'element-ui/lib/locale/lang/zh-CN' // 引用中文版
import AFTableColumn from 'af-table-column'
Vue.use(ElementUI) // 使用中文版ElementUI
// Vue.use(ElementUI, { locale })
Vue.use(AFTableColumn)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
