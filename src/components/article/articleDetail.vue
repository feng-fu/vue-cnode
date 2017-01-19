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
    </div>
    <div class="markdown-body content" v-if="content.content" v-html='renderMarkdown(content.content)'></div>
    <ul v-if='content.replies' class='replies'>
      <li v-for='item in content.replies'>
        <div class="author-msg">
          <img :src="item.author.avatar_url" alt="replies-author">
          <span>{{item.author.loginname}}</span>
        </div>
        <div class="replies-msg markdown-body" v-html='renderMarkdown(item.content)'>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import marked from 'marked'
  export default {
    data () {
      return {
        content: []
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
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../normal/stylus/normal'
  @import "../../normal/style/markdown.css"
  .article
    padding: 60px 5px 20px
    img
      max-width: 100%
    .title
      text-align: center
      font-size: 20px
      font-weight: 700
      margin-bottom: 15px
    .replies
      margin-top: 20px
      li
        border-npx(1px,#ccc)
        padding-bottom: 5px
        .author-msg
          lh-height(20px)
          img
            width: 20px
            height: 20px
            border-radius: 50%
    .author
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
</style>
