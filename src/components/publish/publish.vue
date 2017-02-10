<template>
  <div class="publish">
    <mt-header fixed title="发布主题">
      <mt-button icon="back" @click='$router.go(-1)' slot="left"></mt-button>
    </mt-header>
    <mt-field label="标题" placeholder="标题" type="text" v-model="title"></mt-field>
    <mt-radio
      title="选择分类"
      v-model="category"
      align="right"
      :options="['ask', 'job', 'share']">
    </mt-radio>
    <mt-field label="内容" placeholder="请输入内容，支持markdown语法" type="textarea" rows="10" v-model="content"></mt-field>
    <mt-button type="primary" size="large" @click="publishTheme">发布</mt-button>
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

    },
    methods: {
      publishTheme () {
        console.log(this.title, this.category, this.content)
        const state = store.getters.getLoginState
        console.log(state)
        this.axios.post('https://cnodejs.org/api/v1/topics', {
          accessToken: state.accessToken,
          title: this.title,
          tab: this.category,
          content: this.content
        }).then((res) => {
          console.log(res)
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  .publish
    margin-top: 50px
</style>
