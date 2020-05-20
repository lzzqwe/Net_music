<template>
  <div class="back">
    <span @click="Back" class="iconfont iconyoujiantou"></span>
    <span class="back-title">{{title}}</span>
  </div>
</template>
<script>
export default {
  name: "SlideBar",
  props: {
    title: {
      type: String
    }
  },
  methods: {
    Back() {
      this.$router.back();
    }
  }
};
</script>
<style lang="less" scoped>
@import '~common/less/variable.less';

.back {
  height: 50px;
  line-height: 50px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: #ffffff;
  width: 100%;

  .iconyoujiantou {
    color: #333333;
    margin-left: 20px;
    font-size: 20px;
  }

  .back-title {
    font-size: 16px;
    margin-left: 15px;
    color: #222921;
  }
}
</style>