<template>
  <div class="publish">
    <mt-header fixed title="发布主题">
      <mt-button icon="back" @click='$router.go(-1)' slot="left"></mt-button>
    </mt-header>
    <mt-field label="标题" placeholder="标题" type="text" v-model="title" @keyup.enter="titleInputCheck" :state="titleState"></mt-field>
    <label class="select_category" for="">选择分类 </label>
    <select v-model="category">
      <option>ask</option>
      <option>job</option>
      <option>share</option>
    </select>
    <mt-field label="内容" placeholder="请输入内容，支持markdown语法" type="textarea" rows="10" v-model="content"></mt-field>
    <mt-button type="primary" size="large" @click="publishTheme">发布</mt-button>
  </div>
</template>

<script>
  import Store from '../../store/store'
  import { MessageBox } from 'mint-ui'
  const store = Store.store
  export default {
    data () {
      return {
        title: '',
        category: '',
        content: '',
        titleState: ''
      }
    },
    methods: {
      publishTheme () {
        console.log(this)
        if (!this.checkContentSure()) {
          return
        }
        const state = store.getters.getLoginState
        console.log(state)
        this.axios.post('https://cnodejs.org/api/v1/topics', {
          accesstoken: state.accessToken,
          title: this.title,
          tab: this.category,
          content: this.content
        }).then((res) => {
          res = res.data
          if (res.success) {
            this.$router.push('/topic/:' + res.topic_id)
          } else {
            MessageBox.alert('发布失败')
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      titleInputCheck () {
        console.log(this.titleState)
        if (this.title.length < 10) {
          this.titleState = 'error'
        } else {
          this.titleState = 'success'
        }
      },
      checkContentSure () {
        if (this.title.length > 10) {
          if (this.category !== '') {
            if (this.content !== '') {
              return true
            } else {
              MessageBox.alert('请输入内容')
              return false
            }
          } else {
            MessageBox.alert('请选择分类')
            return false
          }
        } else {
          MessageBox.alert('标题长度不能少于10个字')
          return false
        }
      }
    }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  .publish
    margin-top: 50px
    select
      width: 150px
      height: 30px
      border-radius: 3px
      margin-left: 36px
      option
        text-align: center
    button
      margin-top: 20px
    textarea,input
      border: 1px solid #ccc
      border-radius: 3px
    .select_category
      padding-left: 10px
</style>
