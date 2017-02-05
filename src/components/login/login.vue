<template>
  <div class="login">
    <mt-header fixed title="用户登录">
      <mt-button icon="back" @click="$router.go(-1)" slot="left"></mt-button>
    </mt-header>
    <div class="main">
      <mt-field placeholder="请输入32位的accessToken." state="state" v-model="accessToken"></mt-field>
      <mt-button type="primary" @click="login">
        <img slot="icon" src="../../assets/login.png" width="20" height="20">
        登录
      </mt-button>
      <mt-popup
        position="top"
        v-model="popupVisible"
        popup-transition="popup-fade">
        {{loginResult}}
      </mt-popup>
    </div>

  </div>
</template>

<script>
  import Store from '../../store/store'
  import { Toast } from 'mint-ui'
  var store = Store.store
  export default {
    data () {
      return {
        accessToken: '',
        state: '',
        popupVisible: false,
        loginResult: ''
      }
    },
    methods: {
      login () {
        console.log(this.MintUi)
        this.axios.post('https://cnodejs.org/api/v1/accesstoken', {
          accesstoken: this.accessToken
        }).then((response) => {
          response = response.data
          if (response.success === true) {
            let loginsname = response.loginname
            store.commit('loginIn')
            store.commit('storeAccessToken', this.accessToken)
            store.commit('storeUserName', loginsname)
            Toast({
              message: '登录成功',
              iconClass: 'icon icon-success'
            })
            this.$router.go(-1)
          }
        }).catch((error) => {
          console.log(error)
          Toast({
            message: '登录失败，请重试',
            iconClass: 'icon icon-error'
          })
        })
      }
    }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../normal/stylus/normal'
  .icon
    height: 50px
    width: 50px
    margin: 0 auto
    background-size: 50px
    background-repeat: no-repeat
    &.icon-success
      background-image: url(../../assets/success.png)
    &.icon-error
      background-image: url(../../assets/error.png)
  .login
    margin: 100px 20px 20px
    .main
      margin: 0 auto
      text-align: center
      .mint-cell
        border: 1px solid #ccc
        border-radius: 5px
        .mint-cell-wrapper
          background-size: 0;
          input
            text-align: center
      button
        margin-top: 20px
</style>
