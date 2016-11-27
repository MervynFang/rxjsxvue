import Vue from 'vue'
import App from './app.vue'
import router from './router'
import Rx from 'rxjs/Rx'
import VueRx from 'vue-rx'

import './assets/css/reset.css'

Vue.use(VueRx, Rx)

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})