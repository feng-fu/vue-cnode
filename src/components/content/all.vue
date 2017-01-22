<template>
  <div class="all">
    <mt-header fixed :title="getTheme($route.params.id)">
      <router-link tag="div" to="/dialog" slot="left">
        <mt-button icon="more"></mt-button>
      </router-link>
      <router-link tag="div" to="/person" slot="right">
        <mt-button>
          <img src="../../assets/head.png" alt="head" width="24px">
        </mt-button>
      </router-link>
    </mt-header>
    <ul v-if='message'>
      <router-link tag='li' :to="'/topic/:'+item.id" v-for='item in message'>
        <div class="title clearfix">
          <img :src="item.author.avatar_url" alt="avatar">
          <span>{{item.author.loginname}}</span>
          <span class="date">{{getRecentTime(item.create_at)}}</span>
        </div>
        <div class="detail">
          {{item.title}}
        </div>
        <div class="operate clearfix">
          <span class="view icon lside"></span><span class="view_text lside">{{item.visit_count}}</span>
          <span class="reply icon lside"></span><span class="reply_text lside">{{item.reply_count}}</span>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
  import Utils from '../../libs/utils'
  export default {
    data () {
      return {
        message: []
      }
    },
    created () {
      let page = 1
      let category = ''
      if (this.$route.params.id) {
        category = '&tab=' + this.$route.params.id.substr(1)
      }
      this.axios.get('https://cnodejs.org/api/v1/topics' + '?limit=20&page=' + page + category).then((response) => {
        page++
        response = response.data
        if (response.success === true) {
          this.message = response.data
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    methods: {
      getTheme (id) {
        if (id === undefined) {
          return '全部'
        }
        id = id.substr(1)
        switch (id) {
          case ('ask') :
            return '问答'
          case ('share') :
            return '分享'
          case ('job') :
            return '招聘'
          case ('good') :
            return '精华'
          default:
            return '全部'
        }
      },
      getRecentTime (date) {
        return Utils.getIntervalTime(date)
      }
    }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../normal/stylus/normal'
  .all
    margin-top: 40px
    li
      width: 100%
      box-sizing: border-box
      padding: 0 10px
      height: 110px
      border-npx(1px,#ccc)
      .title
        img
          width: 30px
          height: 30px
          margin: 5px
          border-radius: 50%
          float: left
        span
          display: block
          float: left
          margin: 0 10px
          lh-height(40px)
          color: #333;
          &.date
            color: #969696
      .detail
        display: block
        ellipsis(100%)
        lh-height(40px)
        font-size: 14px
      .operate
        margin: 0 5px
        span
          display: inline-block
          lh-height(25px)
          color: #bfbfbf
          &.lside
            float: left
            margin-right: 10px
          &.icon
            width: 25px
            background-size: 25px
            background-repeat: no-repeat
            &.view
              background-image: url(../../assets/view.png)
            &.reply
              background-image: url(../../assets/reply.png)


</style>
