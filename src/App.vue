<template>
  <div id="app">
    <transition-group name="list" tag="div">
      <router-view></router-view>
    </transition-group>
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
