import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import uView from '@/uni_modules/uview-ui'
import API from './utils/api.js'
Vue.use(uView)
Vue.config.productionTip = false
Vue.prototype.$http = API
App.mpType = 'app'
const app = new Vue({ ...App })
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return { app }
}
// #endif