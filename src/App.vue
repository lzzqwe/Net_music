<template>
  <div id="app">
    <router-view/>
    <net-player></net-player>
  </div>
</template>
<script>
  import NetPlayer from "./views/NetPlayer";
  export default {
    name:'App',
    components:{
      NetPlayer
    }
  }
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
}
</style>
