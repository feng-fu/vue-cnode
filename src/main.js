// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import all from 'components/content/all'
import marrow from 'components/content/marrow'
import share from 'components/content/share'
import question from 'components/content/question'
import apply from 'components/content/apply'
import message from 'components/message/message'
import about from 'components/about/about'
import MintUi from 'mint-ui'
import './libs/style.css'
import articleDetail from 'components/article/articleDetail'
import Dialog from 'components/more/dialog'

Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(MintUi)

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
    path: '/marrow',
    component: marrow
  },
  {
    path: '/share',
    component: share
  },
  {
    path: '/apply',
    component: apply
  },
  {
    path: '/question',
    component: question
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
    path: '/topic/:id',
    component: articleDetail
  },
  {
    path: '/dialog',
    component: Dialog
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
