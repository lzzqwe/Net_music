<template>
  <div class="head">
    <router-link to="/mine" class="mine">
      <span class="iconfont iconyonghu"></span>
    </router-link>
    <router-link to="/search" class="mine">
      <span class="iconfont iconsousuo"></span>
    </router-link>
  </div>
</template>
<script>
export default {
};
</script>
<style lang="less" scoped>
@import '~common/less/variable.less';

.head {
  font-size: 0;
  text-align: center;
  line-height: 40px;
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;

  .icon {
    display: inline-block;
    width: 30px;
    height: 32px;
    background-size: 30px 32px;
    vertical-align: middle;
    margin-right: 10px;
  }

  .text {
    display: inline-block;
    font-size: 16px;
    color: #ffcd32;
  }

  .mine {
    .iconyonghu {
      font-size: 20px;
      color: #212121;
    }

    .iconsousuo {
      font-size: 20px;
      color: #212121;
    }
  }
}
</style>
