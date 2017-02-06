<template>
  <div class="message">
    <mt-header fixed title="消息">
      <mt-button icon="back" @click='$router.go(-1)' slot="left"></mt-button>
    </mt-header>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">选项一</mt-tab-item>
      <mt-tab-item id="2">选项二</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <mt-cell v-for="n in 10" :title="'内容 ' + n" />
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <mt-cell v-for="n in 4" :title="'测试 ' + n" />
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  import Store from '../../store/store'
  const store = Store.store
  export default {
    data () {
      return {
        content: [],
        selected: 0
      }
    },
    created () {
      let token = store.getters.getLoginState.accessToken
      console.log(token)
//      1cbc2a58-6c1b-426f-971d-070676fb849d
      this.axios.get('https://cnodejs.org/api/v1/messages?accesstoken=78be99ee-06c9-401e-81c5-6983486c3305').then(res => {
//      this.axios.get('https://cnodejs.org/api/v1/messages?accesstoken=' + token).then(res => {
        res = res.data
        if (res.success === true) {
          this.content = res.data
          console.log(res.data)
//          几个数据 已读消息和未读消息
//          1.has_read_messages 2.hasnot_read_messages
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>
