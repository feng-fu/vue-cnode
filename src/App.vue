<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view keep-alive></router-viewkeep-alive>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {

      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }
</style>
