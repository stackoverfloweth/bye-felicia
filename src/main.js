import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './styles/main.scss'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  router,
  store,
  // eslint-disable-next-line
  render: h => h(App)
}).$mount('#app')
