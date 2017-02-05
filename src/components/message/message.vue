<template>
  <div class="message">
    <mt-header fixed title="消息">
      <mt-button icon="back" @click='$router.go(-1)' slot="left"></mt-button>
    </mt-header>
  </div>
</template>

<script>
  import Store from '../../store/store'
  const store = Store.store
  export default {
    data () {
      return {
        content: []
      }
    },
    created () {
      let token = store.getters.getLoginState.accessToken
//      1cbc2a58-6c1b-426f-971d-070676fb849d
      this.axios.get('https://cnodejs.org/api/v1/messages?accesstoken=' + token).then(res => {
        res = res.data
        if (res.success === true) {
          this.content = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>
