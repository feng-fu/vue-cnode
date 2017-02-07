<template>
  <div id="app">
    <transition name="page-slide">
      <router-view keep-alive></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        show_animate: false
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .page-slide-enter-active {
    transition: all .5s ease;
  }

  .page-slide-leave-active {
    transition: all .5s ease-out;
  }

  .page-slide-enter, .page-slide-leave-active {
    transform: translateX(-100vw)
  }
</style>
