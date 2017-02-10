import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let local = {
  setLocalItem () {
    window.localStorage.setItem('loginState', arguments[0])
    window.localStorage.setItem('accessToken', arguments[1])
    window.localStorage.setItem('userName', arguments[2])
  },
  getLocalItem (a, b, c) {
    a = window.localStorage.getItem('loginState')
    b = window.localStorage.getItem('accessToken')
    c = window.localStorage.getItem('userName')
    return [a, b, c]
  },
  deleteLocalItem () {
    window.localStorage.clear()
  }
}

const store = new Vuex.Store({
  state: {
    loginState: false,
    accessToken: '',
    userName: ''
  },
  mutations: {
    loginIn (state, reload) {
      state.loginState = true
      state.accessToken = reload.accessToken
      state.userName = reload.loginname
      local.setLocalItem(true, reload.accessToken, reload.loginname)
    },
    loginOut (state) {
      state.loginState = false
      state.accessToken = ''
      state.userName = ''
      local.deleteLocalItem()
    }
  },
  getters: {
    getLoginState (state) {
      let arr = local.getLocalItem()
      state.loginState = arr[0]
      state.accessToken = arr[1]
      state.userName = arr[2]
      return state
    }
  }
})

export default({
  store: store
})
