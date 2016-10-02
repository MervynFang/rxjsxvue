import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/hello',
      name: 'hello',
      component: resolve => require(['../views/hello.vue'], resolve)
    },
    {
      path: '/hi',
      name: 'hi',
      component: resolve => require(['../views/hi.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/hello'
    }
  ]
})