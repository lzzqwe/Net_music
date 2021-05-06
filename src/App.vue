<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <net-player></net-player>
  </div>
</template>
<script>
import NetPlayer from "./views/NetPlayer/NetPlayer";
export default {
  metaInfo() {
    return {
      title: "欢迎来的net-music",
    };
  },
  deactivated() {
    console.log("deactivated");
  },
  activated() {
    console.log("activated");
  },
  name: "App",
  components: {
    NetPlayer,
  },
};
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
}
</style>
