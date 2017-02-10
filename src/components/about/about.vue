<template>
  <div class="about">
    <mt-header fixed title="关于">
      <mt-button icon="back" @click='$router.go(-1)' slot="left"></mt-button>
    </mt-header>
    <div class="content">
      <h3>这是一个基于vue的项目</h3>
      <h4>主要采用的技术包括：</h4>
      <ul v-if="items">
        <li v-for="item in items">{{item.tec}}</li>
      </ul>
      <p>如果你觉得有用，就来给个<a target="_blank" href="https://github.com/feng-fu/vue-cnode">star</a>吧</p>
    </div>
    <p>扫描二维码预览：</p>
    <img src="../../assets/ewm.png" alt="扫我">
  </div>
</template>

<script>

  export default {
    data () {
      return {
        items: [{tec: 'vue'}, {tec: 'vue-router'}, {tec: 'vuex'}, {tec: 'axios'}, {tec: 'mint-ui'}]
      }
    }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  .about
    margin-top: 50px
    text-align: center
    .content
      margin-bottom: 30px
      h3
        font-size: 24px
        font-weight: 700
        line-height: 40px
      h4
        font-size: 18px
        font-weight: 600
        line-height: 30px
      ul
        li
          height: 40px
          line-height: 40px
          list-style: disc
          a
            color: #f00
</style>
