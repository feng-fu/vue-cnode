<template>
  <div class="message">
    <mt-header fixed title="消息">
      <mt-button icon="back" @click='$router.go(-1)' slot="left"></mt-button>
    </mt-header>
    <div class="tab">
      <div class="read" :class="{active:in_read}" @click="toggleHasRead">已读消息</div>
      <div class="notread" :class="{active:in_not_read}" @click="toggleNotRead">未读消息</div>
    </div>
    <div class="content" v-if="hasBoth(content.has_read_messages,content.hasnot_read_messages)">
      <ul class="hasread" v-if="in_read">
        <router-link tag="li" :to="'/topic/:'+item.topic.id" v-for="item in content.has_read_messages">
          <div class="relative">
            <div class="reply_title ellipse">{{item.topic.title}}</div><div class="time" v-text="getRecentTime(item.topic.last_reply_at)"></div>
          </div>
          <div class="clearfix">
            <span class="reply_guy ellipse">{{item.author.loginname}}</span><span>回复了你：</span>
          </div>
          <p v-html="item.reply.content"></p>
          <div class="to"></div>
        </router-link>
        <div class="no_data" v-show="content.has_read_messages.length === 0">暂无~~~</div>
      </ul>
      <ul class="hasnotread" v-if="in_not_read">
        <router-link tag="li" to="'/topic/:'+item.topic.id" v-for="item in content.has_notread_messages">
          <div class="relative">
            <div class="reply_title ellipse">{{item.topic.title}}</div><div class="time" v-text="getRecentTime(item.topic.last_reply_at)"></div>
          </div>
          <div class="clearfix">
            <span class="reply_guy ellipse">{{item.author.loginname}}</span><span>回复了你：</span>
          </div>
          <p v-html="item.reply.content"></p>
          <div class="to"></div>
        </router-link>
        <div class="no_data" v-show="content.hasnot_read_messages.length === 0">暂无~~~</div>
      </ul>
    </div>
    <Loading v-show="loading"></Loading>
  </div>
</template>

<script>
  import Store from '../../store/store'
  import Utils from '../../libs/utils'
  import Loading from '../loading/loading'
  const store = Store.store
  export default {
    data () {
      return {
        content: [],
        selected: 0,
        in_not_read: false,
        in_read: true,
        loading: false
      }
    },
    components: {
      Loading
    },
    created () {
      this.loading = true
      let state = store.getters.getLoginState
      if (state.loginState === false) {
        this.$router.push('/login')
        return
      }
      let token = store.getters.getLoginState.accessToken
      this.axios.get('https://cnodejs.org/api/v1/messages?accesstoken=' + token).then(res => {
        res = res.data
        if (res.success === true) {
          this.content = res.data
          this.loading = false
//          几个数据 已读消息和未读消息
//          1.has_read_messages 2.hasnot_read_messages
        }
      }).catch(err => {
        console.log(err)
      })
    },
    methods: {
      toggleNotRead () {
        this.in_read = false
        this.in_not_read = true
      },
      toggleHasRead () {
        this.in_read = true
        this.in_not_read = false
      },
      getRecentTime (time) {
        return Utils.getIntervalTime(time)
      },
      hasBoth (a, b) {
        return a && b
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .message
    .relative
      position: relative
    .tab
      margin-top: 40px
      display: flex
      height: 50px
      line-height: 50px
      text-align: center
      div
        flex: 1
        box-sizing: border-box
        background-color: #f0f0f0
        // box-shadow: 8px 2px 1px -1px rgba(0,0,0,0.2)
        &.active {
          background-color: #fff
          box-shadow:inset 0px 15px 7px -15px #000
        }
    .content
      .no_data
        position: fixed
        color: #ccc
        top: 200px
        left: 50%
        transform: translateX(-50%)
        font-size: 30px
      li
        position: relative
        padding: 10px 40px 10px 30px
        background-position: 5px 5px
        background-repeat: no-repeat
        background-size: 15px
        line-height: 30px
        box-shadow: 3px 3px 5px 0 #f0f0f0
        .ellipse
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
        span
          display: block
          float: left
        .time
          position: absolute
          top: 0
          right: -20px
          color: #cfcfcf
        .to
          position: absolute
          top: 50%
          right: 10px
          transform: translateY(-50%)
          width: 20px
          height: 20px
          background-image: url(../../assets/to.png)
          background-repeat: no-repeat
          background-size: 20px
        .reply_title
          width: 100%
          box-sizing: border-box
          padding-right: 2em
      .hasread
        li
          background-image: url(../../assets/read.png)
      .hasnotread
        li
          background-image: url(../../assets/wait_read.png)

</style>
