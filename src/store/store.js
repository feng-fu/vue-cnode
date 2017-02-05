import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loginState: false,
    accessToken: '',
    userName: ''
  },
  mutations: {
    loginIn (state) {
      state.loginState = true
    },
    loginOut (state) {
      state.loginState = false
    },
    storeAccessToken (state, accessToken) {
      state.accessToken = accessToken
    },
    storeUserName (state, userName) {
      state.userName = userName
    }
  },
  getters: {
    getLoginState (state) {
      return state
    }
  }
})

export default({
  store: store
})
