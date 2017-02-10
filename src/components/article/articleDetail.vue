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
      <span class="star" @click="addStar"></span>
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
            <div class="good" @click="addGood" :data-id="item.id"></div>
          </div>
          <div class="replies-msg markdown-body" v-html='renderMarkdown(item.content)'>
          </div>
        </li>
      </ul>
    </div>
    <div class="bottom">
      <mt-field placeholder="请留下您的评论..." v-model="comment">
        <img src="../../assets/pen.png" height="45px" width="45px" slot="left">
      </mt-field>
      <mt-button type="default" @click="submit">提交</mt-button>
    </div>
    <Loading v-show="is_loading"></Loading>
  </div>
</template>

<script>
  import marked from 'marked'
  import Utils from '../../libs/utils'
  import { MessageBox } from 'mint-ui'
  import Store from '../../store/store'
  import Loading from '../loading/loading'
  const store = Store.store
  const topicId = window.location.hash.replace('#', '').replace(':', '').replace('/topic/', '')
  export default {
    data () {
      return {
        content: [],
        comment: '',
        is_loading: false,
        loginState: {}
      }
    },
    components: {
      Loading
    },
    created () {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      this.is_loading = true
      this.axios.get('https://cnodejs.org/api/v1/topic/' + this.$route.params.id.substr(1) + '?mdrender=false').then((response) => {
        response = response.data
        if (response.success === true) {
          this.content = response.data
        }

        this.is_loading = false
      }).catch(function (error) {
        console.log(error)
      })
    },
    mounted () {
      this.loginState = store.getters.getLoginState
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
      addGood (event) {
        if (!this.loginState.loginState) {
          this.judgeLoginState()
        } else {
          let id = event.target.dataset.id
          this.axios.post('https://cnodejs.org/api/v1/reply/' + id + '/ups', {
            accesstoken: this.loginState.accessToken
          }).then((res) => {
            res = res.data
            if (res.success) {
              if (res.action === 'up') {
                event.target.className = 'good click_good'
              } else {
                event.target.className = 'good'
              }
            }
          }).catch((err) => {
            if (err.response.status === 403) {
              MessageBox.alert('你好像不能给自己点赞哦')
            }
            console.log(err)
          })
        }
//        让二者一一对应
      },
      judgeLoginState () {
        MessageBox.confirm('尚未登陆，现在就去?').then(action => {
          this.$router.push('/login')
        }).catch(() => { return })
      },
      submit () {
//        提交评论 1. 判断是否已经登陆 2. 登陆则提交 3. 未登陆弹窗提示，是否去登陆
        console.log(this.loginState)
        if (!this.loginState.loginState) {
          this.judgeLoginState()
        } else {
          if (this.comment === '') {
            MessageBox.alert('请输入评论内容')
          } else {
            const path = window.location.hash.replace('#', '').replace(':', '')
            this.axios.post('https://cnodejs.org/api/v1' + path + '/replies', {
              accesstoken: this.loginState.accessToken,
              content: this.comment + ' 来自[vue-cnode](https://github.com/feng-fu/vue-cnode)'
            }).then((response) => {
              response = response.data
              console.log(response)
              if (response.success === true) {
                window.location.reload()
              }
            }).catch((error) => {
              console.log(error)
            })
          }
        }
      },
      addStar (event) {
        event.target.className = 'star stared'
        this.axios.post('https://cnodejs.org/api/v1/topic_collect/collect', {
          accesstoken: this.loginState.accessToken,
          topic_id: topicId
        }).then((res) => {
          res = res.data
          if (!res.success) {
            event.target.className = 'star'
            this.cancelStar()
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      cancelStar () {
        this.axios.post('https://cnodejs.org/api/v1/topic_collect/de_collect', {
          accesstoken: this.loginState.accessToken,
          topic_id: topicId
        }).then((res) => {
          console.log(res.data)
        }).catch((err) => {
          console.log(err)
        })
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
    min-height: 100vh
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
              background-image: url(../../assets/good_active.png)
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
      .star
        display: block
        float: right
        width: 30px
        height: 30px
        background-size: 20px
        background-position: 5px 5px
        border-radius: 5px
        background-color: #26a2ff
        background-repeat: no-repeat
        background-image: url(../../assets/add_star.png)
        &.stared
          background-image: url(../../assets/star.png)
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
