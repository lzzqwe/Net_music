<template>
    <div id="app">
        <base-head></base-head>
        <base-tab></base-tab>
        <keep-alive>
            <!-- <transition
            name="custom-classes-transition"
            enter-active-class="animated bounceInLeft"
            leave-active-class="animated bounceOutDown"
            >
                <router-view />
            </transition> -->
             <transition
            name="van-slide-left"
            >
                <router-view />
            </transition>
      
        </keep-alive>
        <net-player></net-player>
    </div>
</template>
<script>
import BaseTab from 'base/BaseTab/BaseTab'
import BaseHead from 'base/BaseHead/BaseHead'
import NetPlayer from 'components/NetPlayer/NetPlayer'
export default {
    name: 'App',
    components: {
        BaseTab,
        BaseHead,
        NetPlayer
    }
}
</script>
<style lang="stylus" scoped>
#app
  width 100%
  height 100%
  .v-enter
    transform translate3d(100%,0,0)
  .v-leave-to
    transform translate3d(-100%,0,0)
  .v-enter-active
    transition all 0.4s
  .v-leave-active
    transition all 0.4s
</style>