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
    transition: all .3s ease;
  }
  .page-slide-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .page-slide-enter, .page-slide-leave-active {
    transform: translateX(10px) translateY(-50px);
    opacity: 0;
  }
</style>
