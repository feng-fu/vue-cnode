<template>
  <div class="userDetail">
    <mt-header fixed title="个人中心">
      <mt-button icon="back" @click='$router.go(-1)' slot="left"></mt-button>
      <router-link to="'/message">
        <mt-button   slot="right">
          <img src="../../assets/message.png" alt="message_center" width: 24px>
        </mt-button>
      </router-link>
    </mt-header>
    <div class="content" v-if="isLogin">
      <div class="header clearfix">
        <div class="bg"></div>
        <img :src="userMessage.avatar_url" alt="head">
        <div class="loginname">
          <div class="name">{{userMessage.loginname}}</div>
          <div class="score">{{userMessage.score}}积分</div>
        </div>

      </div>
      <ul class="container" v-if="userMessage.recent_topics">
        <li v-for="item in userMessage.recent_topics">
          <router-link tag="div" :to="'/topic/:'+item.id">
            <div class="author-msg clearfix">
              <img :src="item.author.avatar_url" alt="avatar">
              <span class="loginname">{{item.author.loginname}}</span>
              <span class="last_repl">最后回复：{{getlastReplayTime(item.last_reply_at)}}</span>
            </div>
            <div class="title">{{item.title}}</div>
          </router-link>
        </li>
      </ul>
    </div>
    <div v-else>

    </div>
  </div>
</template>

<script>
  import Utils from '../../libs/utils'
  import Store from '../../store/store'
  const store = Store.store
  export default {
    data () {
      return {
        isLogin: true,
        userMessage: []
      }
    },
    methods: {
      getlastReplayTime (date) {
        return Utils.getIntervalTime(date)
      }
    },
    created () {
      let usr = store.getters.getLoginState.userName
      this.axios.get('https://cnodejs.org/api/v1/user/' + usr).then((response) => {
        response = response.data
        if (response.success === true) {
          console.log(response.data)
          this.userMessage = response.data
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../normal/stylus/normal'
  .userDetail
    padding-top: 40px
    .content
      .header
        position: relative
        text-align: right
        .bg
          height: 50%
          width: 100%
          z-index: -1
          position: absolute
          top: 0
          left: 0
          background-image: linear-gradient( 180deg, #dfdfdf 0%, #ededed 100%)
        img
          width: 100px
          height: 100px
          border-radius: 50%
          margin: 10px
          float: right
        .loginname
          float: right
          margin-top: 30px
          .name
            lh-height: 30px
            font-size: 16px
            font-weight: 600
          .score
            lh-height: 22px
      .container
        li
          border-npx(1px,#f0f0f0)
          padding: 5px 5px 5px 10px
        img
          width: 30px
          height: 30px
          border-radius: 50%
          float: left
          margin: 5px 10px 5px 0
        span
          display: block
          float: left
          lh-height: 40px
          &.last_repl
            float: right
</style>
