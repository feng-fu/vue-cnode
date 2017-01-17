<template>
  <div id="app">
    <div class='index'>
      <router-link to='/all' tag='li'>全部</router-link>
      <router-link to='/marrow' tag='li'>精华</router-link>
      <router-link to='/about' tag='li'>关于</router-link>
      <li @click='toggleDialog(true)'>更多</li>
    </div>
    <router-view></router-view>
    <div class="dialog" v-show='isShow'>
      <div class="return" @click='toggleDialog(false)'>
        x
      </div>
      <v-dialog></v-dialog>
    </div>
  </div>
</template>

<script>
import Dialog from 'components/more/dialog'
export default {
  name: 'app',
  data () {
    return {
      isShow: false
    }
  },
  components: {
    'v-dialog': Dialog
  },
  methods: {
    toggleDialog (n) {
      if (n) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import 'normal/stylus/normal'
  #app
    .index
      display: flex
      text-align: center
      lh-height(40px)
      border-npx(1px,red)
      li
        flex: 1
        &.active
          color: #f20
    .dialog
      position: fixed
      top: 0
      left: 0
      width: 100vw
      height: 100vh
      background-color: rgba(0,0,0,.3)
</style>
