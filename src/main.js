// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import all from 'components/content/all'
import message from 'components/message/message'
import about from 'components/about/about'
import MintUi from 'mint-ui'
import articleDetail from 'components/article/articleDetail'
import Dialog from 'components/more/dialog'
import Login from 'components/login/login'
import Person from 'components/person/person'
import Store from './store/store'
import './libs/style.css'

Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(MintUi)

console.log(Store)

const routes = [
  {
    path: '/',
    component: all
  },
  {
    path: '/all',
    component: all
  },
  {
    path: '/message',
    component: message
  },
  {
    path: '/about',
    component: about
  },
  {
    path: '/all/:id',
    component: all
  },
  {
    path: '/topic/:id',
    component: articleDetail
  },
  {
    path: '/dialog',
    component: Dialog
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/person',
    component: Person
  }
]

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  router,
  components: { App }
})
