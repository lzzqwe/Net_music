<template>
  <div class="project">
    <slide-bar :title="title"></slide-bar>
    <h1 class="project-title">点击以下文字访问</h1>
    <img class="imgstyl" src="http://indust-creation.icci.top/a8ec8a13632762d0e2c49adcacec08fa503dc6de.gif" alt />
    <a class="address" href="https://github.com/lzzqwe/Net_music.git">项目地址</a>
  </div>
</template>
<script>
import SlideBar from "base/SlideBar/SlideBar.vue";
export default {
  name: "NetProject",
  data() {
    return {
      title: "项目地址"
    };
  },
  components: {
    SlideBar
  }
};
</script>
<style lang="less" scoped>
@import '~common/less/variable.less';

.project {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: @color-background;

  .project-title {
    font-size: 40px;
    margin: 50px;
    font-weight: normal;
    text-shadow: 5px 5px 5px #000000;
  }

  .address {
    text-align: center;
    width: 300px;
    margin: 0 auto;
    display: block;
    color: rgb(14, 13, 13);
  }

  .imgstyl {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
}
</style>