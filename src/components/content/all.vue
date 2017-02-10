<template>
  <div class="all">
    <mt-header fixed :title="getTheme($route.params.id)">
      <router-link tag="div" to="/dialog" slot="left">
        <mt-button icon="more"></mt-button>
      </router-link>
      <mt-button @click="personCenter" slot="right">
        <img src="../../assets/head.png" alt="head" width="24px">
      </mt-button>
    </mt-header>
    <mt-loadmore :top-method="loadTop" ref="loadmore">
    <ul v-if='message' v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
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
    </mt-loadmore>
    <div class="load_more" v-show="firstLoading">
      <div v-if="showloadMore === 1">加载更多</div>
      <div v-else-if="showloadMore === -1">加载失败</div>
      <div v-else class="loading_gif"></div>
    </div>
    <Loading v-show="is_loading"></Loading>
    <div class="return_top" @click="returnTop" v-show="show_return"></div>
  </div>
</template>

<script>
  import Utils from '../../libs/utils'
  import Store from '../../store/store'
  import Loading from '../loading/loading'
  let store = Store.store
  export default {
    data () {
      return {
        message: [],
        page: 1,
        category: '',
        showloadMore: 1,
        firstLoading: false,
        is_loading: false,
        show_return: false
      }
    },
    components: {
      Loading
    },
    created () {
      this.is_loading = true
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
          this.is_loading = false
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    mounted () {
      document.onscroll = this.toggleReturnTopState
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
      toggleReturnTopState () {
        if (document.body.scrollTop > 1000) {
          this.show_return = true
        } else {
          this.show_return = false
        }
      },
      loadTop () {
        this.page = 1
        this.axios.get('https://cnodejs.org/api/v1/topics' + '?limit=20&page=' + this.page + this.category).then((response) => {
          response = response.data
          this.page++
          if (response.success === true) {
            this.message = []
            for (let i = 0; i < response.data.length; i++) {
              this.message.push(response.data[i])
            }
            this.$refs.loadmore.onTopLoaded()
          }
        }).catch(function (error) {
          console.log(error)
        })
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
      },
      personCenter () {
        let state = store.getters.getLoginState
        if (!state.loginState) {
          this.$router.push('/login')
          return
        } else {
          this.$router.push('/person')
        }
      },
      returnTop () {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      }
    }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../normal/stylus/normal'
  .all
    margin-top: 40px
    .return_top
      background-image: url(../../assets/to_top.png)
      width: 20px
      height: 20px
      padding: 5px
      box-sizing: content-box
      border-radius: 50%
      background-color: #199af5
      background-position: 5px 4px
      background-size: 20px
      position: fixed
      bottom: 10px
      right: 10px
      background-repeat: no-repeat
      &:hover
        background-color: #3295ff
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
      .loading_gif
        background-image: url(../../assets/ring.gif)
        height: 30px
        background-size: auto 50px
        background-repeat: no-repeat
        padding-top: 5px
        padding-bottom: 5px
        background-position: 25px -5px
</style>
