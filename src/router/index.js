import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/hello',
      name: 'hello',
      component: () => System.import('../views/1.vue')
    },
    {
      path: '/hi',
      name: 'hi',
      component: () => System.import('../views/2.vue')
    },
    {
      path: '*',
      redirect: '/hello'
    }
  ]
})