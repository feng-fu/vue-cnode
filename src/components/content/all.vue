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
    <div class="load_more" v-show="firstLoading">
      <div v-if="showloadMore === 1" @click="loadMore">加载更多</div>
      <div v-else-if="showloadMore === -1">加载失败</div>
      <div v-else><img src="../../assets/ring.gif" alt="loading"></div>
    </div>
  </div>
</template>

<script>
  import Utils from '../../libs/utils'
  export default {
    data () {
      return {
        message: [],
        page: 1,
        category: '',
        showloadMore: 1,
        firstLoading: false
      }
    },
    created () {
      if (this.$route.params.id) {
        this.category = '&tab=' + this.$route.params.id.substr(1)
      }
      this.axios.get('https://cnodejs.org/api/v1/topics' + '?limit=20&page=' + this.page + this.category).then((response) => {
        response = response.data
        this.page++
        if (response.success === true) {
          for (let i = 0; i < response.data.length; i++) {
            this.message.push(response.data[i])
          }
          this.firstLoading = true
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
      },
      loadMore () {
        this.showloadMore = 0
        this.axios.get('https://cnodejs.org/api/v1/topics' + '?limit=20&page=' + this.page + this.category).then((response) => {
          response = response.data
          this.page++
          if (response.success === true) {
            for (let i = 0; i < response.data.length; i++) {
              this.message.push(response.data[i])
            }
            this.showloadMore = 1
          }
        }).catch(function (error) {
          console.log(error)
          this.showloadMore = -1
        })
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
    .load_more
      width: 100px
      margin: 10px auto
      text-align: center
      lh-height(40px)
      border: 1px solid #f0f0f0
      border-radius: 10px
      background-color: #26a2ff
      color: #f0f0f0
      img
        height: 30px
        padding-top: 5px
        padding-bottom: 5px
</style>
