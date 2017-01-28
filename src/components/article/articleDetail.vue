<template>
  <div class="article">
    <mt-header fixed title="主题">
      <mt-button slot="left" icon='back' @click='$router.go(-1)'></mt-button>
    </mt-header>
    <div class="title">
      {{content.title}}
    </div>
    <div class="author clearfix" v-if="content.author">
      <img :src="content.author.avatar_url" alt="avatar">
      <span class="name">{{content.author.loginname}}</span>
      <span class="editor">作者</span>
    </div>
    <div class="publish_time" v-if="content.create_at">发表于：{{getChineseDate(content.create_at)}}</div>
    <div class="markdown-body content" v-if="content.content" v-html='renderMarkdown(content.content)'></div>
    <div>
      <ul v-if='content.replies' class='replies'>
        <div class="total">{{getCommit(content.replies)}}</div>
        <li v-for='item in content.replies'>
          <div class="author-msg clearfix">
            <img :src="item.author.avatar_url" alt="replies-author">
            <div class="reply_msg">
              <span class="author_name">{{item.author.loginname}}</span>
              <span class="show_time" v-if="item.create_at">{{getRecentDate(item.create_at)}}</span>
            </div>
            <div class="good" :class="{click_good:click_good}" @click="addGood"></div>
          </div>
          <div class="replies-msg markdown-body" v-html='renderMarkdown(item.content)'>
          </div>
        </li>
      </ul>
    </div>
    <div class="bottom">
      <mt-field placeholder="请留下您的评论...">
        <img src="../../assets/pen.png" height="45px" width="45px" slot="left">
      </mt-field>
      <mt-button type="default">提交</mt-button>
    </div>
  </div>
</template>

<script>
  import marked from 'marked'
  import Utils from '../../libs/utils'
  export default {
    data () {
      return {
        content: [],
        click_good: false
      }
    },
    created () {
      this.axios.get('https://cnodejs.org/api/v1/topic/' + this.$route.params.id.substr(1) + '?mdrender=false').then((response) => {
        response = response.data
        if (response.success === true) {
          this.content = response.data
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    methods: {
      renderMarkdown (input) {
        return marked(input, { sanitize: true })
      },
      getChineseDate (date) {
        var year = date.substr(0, 10)
        var time = date.substr(11, 8)
        return year + '   ' + time
      },
      getCommit (commit) {
        var length = commit.length
        if (length > 0) {
          return '共有' + length + '条评论.'
        } else {
          return '暂无评论'
        }
      },
      getRecentDate (date) {
        return Utils.getIntervalTime(date)
      },
      addGood () {
        this.click_good = true
        console.log(this)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../normal/stylus/normal'
  @import "../../normal/style/markdown.css"
  .article
    padding: 60px 5px 20px
    background-color: #f8f8f9
    min-height: 100%
    margin-bottom: 40px
    img
      max-width: 100%
    .title
      text-align: center
      font-size: 20px
      font-weight: 700
      margin-bottom: 15px
    .replies
      margin-top: 20px
      .total
        height: 25px
        line-height: 25px
      li
        border-npx(1px,#ccc)
        background-color: #fff
        padding-bottom: 5px
        .author-msg
          lh-height(40px)
          margin-bottom: 5px
          img
            width: 37px
            height: 37px
            border-radius: 50%
            float: left
          .reply_msg
            float: left
            margin-left: 15px
            .author_name
              display: block
              line-height: 20px
            .show_time
              display: block
              line-height:17px
              color: #d9d9d9
          .good
            background-image: url(../../assets/good.png)
            background-size: 20px
            background-position: 0
            margin: 10px 20px
            width: 20px
            height: 20px
            float: right
            &.click_good
              background-url: url(../../assets/good_active.png)
    .author
      margin: 10px
      img
        float: left
        margin: 0 5px
        width: 36px
        height: 36px
        border-radius: 50%
      .name
        display: block
        float: left
        margin: 10px 5px
        color: #484848;
      .editor
        display: block
        float: left
        color: #e78170
        border: 1px solid #e78170
        padding: 2px
        margin: 6px
        border-radius: 3px
    .publish_time
      margin-bottom: 20px
      padding-left: 15px
    .content
      background-color: #fff
      padding: 30px 0
    .bottom
      position: fixed
      bottom: 0
      left: 0
      width: 100%
      display: flex
      .mint-cell
        flex: 4
      button
        flex: 1
        height: 48px
</style>
