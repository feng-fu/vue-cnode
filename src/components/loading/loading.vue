<template>
  <div class="loading">
    <div class="icon"></div>
  </div>
</template>

<script>

  export default {

  }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  .loading
    position: fixed
    background-color: rgba(0, 0, 0, .5)
    width: 100vw
    height: 100vh
    z-index: 100
    top: 0
    left: 0
    .icon
      width: 100px
      height: 100px
      position: fixed
      top: 50vh
      left: 50vw
      transform: translateX(-50%) translateY(-50%)
      background-image: url(../../assets/loading.gif)
      background-size: 100px
</style>
