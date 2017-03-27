import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './config/routes'
import {App} from './components'
require('../css/app.css')

Vue.use(VueRouter)

const environment = process.env.NODE_ENV

const router = new VueRouter({
  mode: 'history',
  history: true,
  linkActiveClass: 'is-active',
  routes
})

const VueApp = new Vue({
  el: '#App',
  render: r => r(App),
  router,
})

if (window && environment === 'development') {
  window.App = VueApp
}
