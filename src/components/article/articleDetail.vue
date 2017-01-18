<template>
  <div class="article">
    <mt-header fixed title="主题">
      <mt-button slot="left" icon='back' @click='$router.go(-1)'></mt-button>
    </mt-header>
    <div class="title">
      {{content.title}}
      {{content.loginname}}
    </div>
    <div class="content" v-html='content.content'></div>
    <ul v-if='content.replies' class='replies'>
      <li v-for='item in content.replies'>
        <div class="author-msg">
          <img :src="item.author.avatar_url" alt="replies-author">
          <span>{{item.author.loginname}}</span>
        </div>
        <div class="replies-msg" v-html='item.content'>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        content: []
      }
    },
    created () {
      this.axios.get('https://cnodejs.org/api/v1/topic/' + this.$route.params.id.substr(1)).then((response) => {
        response = response.data
        if (response.success === true) {
          this.content = response.data
        }
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../normal/stylus/normal'
  .article
    .title
      text-align: center
      font-size: 16px
      font-weight: 600
    .content
      font-size: 12px
      .markdown-text
        a
          color: #345
          &:active
            text-decortion: underline
    .replies
      li
        border-npx(1px,#ccc)
        .author-msg
          lh-height(20px)
          img
            width: 20px
            height: 20px
            border-radius: 50%
</style>
