<template>
  <div class="dialog">
    <mt-header title="选择分类">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <ul class="main">
      <mt-cell title="首页" is-link to="/all">
        <img slot="icon" src="../../assets/main.png" width="24" height="24">
      </mt-cell>
      <mt-cell title="精华" is-link to="/all/:good">
        <img slot="icon" src="../../assets/marrow.png" width="24" height="24">
      </mt-cell>
      <mt-cell title="分享" is-link to="/all/:share">
        <img slot="icon" src="../../assets/share.png" width="24" height="24">
      </mt-cell>
      <mt-cell title="问答" is-link to="/all/:ask">
        <img slot="icon" src="../../assets/qa.png" width="24" height="24">
      </mt-cell>
      <mt-cell title="招聘" is-link to="/all/:job">
        <img slot="icon" src="../../assets/hire.png" width="24" height="24">
      </mt-cell>
      <mt-cell title="消息" is-link to="/message">
        <img slot="icon" src="../../assets/msg.png" width="24" height="24">
      </mt-cell>
      <mt-cell title="关于" is-link to="/about">
        <img slot="icon" src="../../assets/about.png" width="24" height="24">
      </mt-cell>
    </ul>
    <div class="loginstate">
      <mt-button type="danger" v-if="getLoginState" @click="quitLogin">
        <img slot="icon" src="../../assets/quit.png" width="20" height="20">
        退出
      </mt-button>
      <router-link v-else to="/login">
        <mt-button type="primary">
          <img slot="icon" src="../../assets/login.png" width="20" height="20">
          登录
        </mt-button>
      </router-link>
    </div>
  </div>
</template>

<script>
  import Store from '../../store/store'
  const store = Store.store
  export default {
    data () {
      return {
        state: false
      }
    },
    computed: {
      getLoginState () {
        return store.getters.getLoginState.loginState
      }
    },
    methods: {
      quitLogin () {
        store.commit('loginOut')
      }
    }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  .dialog
    width: 100vw
    height: 100vh
    .loginstate
      text-align: center
      margin: 30px

</style>
