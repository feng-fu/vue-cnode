<template>
  <div id="app">
    <transition name="fade">
      <router-view keep-alive></router-viewkeep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      isShow: false
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
