<template>
  <div class="all">
    <mt-header fixed :title="getTheme($route.params.id)">
      <router-link tag="div" to="/dialog" slot="left">
        <mt-button icon="more"></mt-button>
      </router-link>
    </mt-header>
    <ul v-if='message'>
      <router-link tag='li' :to="'/topic/:'+item.id" v-for='item in message'>
        <div class="title">
          <span :class='getCategory(item.good, item.top, item.tab).className' v-text='getCategory(item.good, item.top, item.tab).str'></span>
          {{item.title}}
        </div>
        <div class="detail">
          <img :src="item.author.avatar_url" alt="avatar">
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
      getCategory (good, top, view) {
        return Utils.getCategory(good, top, view)
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
      height: 60px
      border-npx(1px,#ccc)
      .title
        ellipsis(100%)
        lh-height(24px)
        font-size: 14px
        span
          display: inline-block
          border-radius: 2px
          margin: 2px
          padding: 0 3px
          lh-height(20px)
          color: #ffffff;
          &.top
            background: #E74C3C
          &.ask
            background: #3498DB
          &.good
            background: #E67E22
          &.job
            background: #9B59B6
          &.share
            background: #1ABC9C
      .detail
        img
          width: 20px
          height: 20px
          border-radius: 50%
</style>
