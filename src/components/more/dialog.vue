<template>
  <div class="dialog">
    <mt-header title="选择分类">
      <mt-button icon="back" slot="left"  @click="$router.go(-1)"></mt-button>
    </mt-header>
    <ul class="main">
      <mt-cell title="首页" is-link to="/all">
        <img slot="icon" src="../../assets/main.png" width="24" height="24">
      </mt-cell>
      <mt-cell title="精华" is-link to="/marrow">
        <img slot="icon" src="../../assets/marrow.png" width="24" height="24">
      </mt-cell>
      <mt-cell title="分享" is-link to="/share">
        <img slot="icon" src="../../assets/share.png" width="24" height="24">
      </mt-cell>
      <mt-cell title="问答" is-link to="/question">
        <img slot="icon" src="../../assets/qa.png" width="24" height="24">
      </mt-cell>
      <mt-cell title="招聘" is-link to="apply">
        <img slot="icon" src="../../assets/hire.png" width="24" height="24">
      </mt-cell>
      <mt-cell title="消息" is-link to="message">
        <img slot="icon" src="../../assets/msg.png" width="24" height="24">
      </mt-cell>
      <mt-cell title="关于" is-link to="about">
        <img slot="icon" src="../../assets/about.png" width="24" height="24">
      </mt-cell>
    </ul>
    <div class="loginstate">
      <mt-button type="danger" v-if="state">退出登录</mt-button>
      <mt-button type="primary" v-else>登录</mt-button>
    </div>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        state: false
      }
    }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  .dialog
    width: 100vw
    .loginstate
      text-align: center
      margin: 30px

</style>
