import Vue from 'vue'
import App from './app.vue'
import router from './router'
import Rx from 'rxjs/Rx'
import VueRx from 'vue-rx'

// will be dealt by post css loader
import './assets/css/reset.css'

// use vue-rx plugin
Vue.use(VueRx, Rx)

new Vue({
  router,
  el: '#app',
  render: h => h(App) // or instance mount method
})