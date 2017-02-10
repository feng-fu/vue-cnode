<template>
  <div class="publish">
    <mt-header fixed title="发布主题">
      <mt-button icon="back" @click='$router.go(-1)' slot="left"></mt-button>
    </mt-header>
    <mt-field label="标题" placeholder="标题" type="text"></mt-field>
    <form action="" method="get">
      您最喜欢水果？<br /><br />
      <label><input name="Fruit" type="radio" value="" /> </label>
      <label><input name="Fruit" type="radio" value="" />问答 </label>
      <label><input name="Fruit" type="radio" value="" />招聘 </label>
    </form>
    <mt-field label="内容" placeholder="请输入内容，支持markdown语法" type="textarea" rows="10"></mt-field>
    <mt-button type="primary" size="large">发布</mt-button>
  </div>
</template>

<script>
  import Store from '../../store/store'
  const store = Store.store
  export default {
    data () {
      return {
        title: '',
        category: '',
        content: ''
      }
    },
    mounted () {
      window.onclick = function () {

      }
    },
    methods: {
      publishTheme () {
        const state = store.getters.getLoginState
        this.axios.post('https://cnodejs.org/api/v1/topics', {
          accessToken: state.accessToken,
          title: this.title,
          tab: this.category,
          content: this.content
        })
      }
    }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  .publish
    margin-top: 50px
</style>
