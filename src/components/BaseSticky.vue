<template>
  <div class="play-all">
    <div @click="play" class="play">
      <span :class="getPlayIcon" class="iconfont"></span>
      <span>播放全部</span>
    </div>
    <span class="iconfont iconquanxuan"></span>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
      name: "BaseSticky",
      computed:{
        getPlayIcon() {
          return this.playing?'iconbofang3':'iconbofang7'
        },
        ...mapGetters(['playing'])
      },
      methods:{
        play() {
          this.$emit('play')
        }
      }
    }
</script>

<style lang="less" scoped>
  .play-all {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 22px 0 22px 0;
    position: sticky;
    top: 82px;
    overflow: hidden;
    background-color: var(--body-bgcolor);
    color: var(--font-color);
    z-index: 14;
    .play {
      font-size: 23px;
      color: rgb(51,51,51);
      .iconbofang7 {
        font-size: 30px;
        margin-right: 23px;
        background-color: rgb(255,64,49);
        color: rgb(255,255,255);
        border-radius: 50%;
      }
      .iconbofang3 {
        font-size: 30px;
        margin-right: 23px;
        background-color: rgb(255,64,49);
        color: rgb(255,255,255);
        border-radius: 50%;
      }
    }
    .iconquanxuan {
      color: rgb(51,51,51);
      font-size: 30px;
    }
  }
</style>
