<template>
  <div class="base-input">
    <div class="input-content">
        <span @click="isClose" class="iconfont iconxia"></span>
        <div class="input-keyword">
          <input ref="keyword" v-model="keyword" class="input-value" type="text">
          <span @click.stop="clearKeyword" v-show="keyword" class="iconfont iconiconjia"></span>
        </div>
      </div>
  </div>
</template>

<script>
    export default {
      name: "BaseInput",
      props:{
        keyword:{
          type:String
        }
      }
    }
</script>

<style lang="less" scoped>
  @import '~../common/less/variable.less';
  .input-content {
    display: flex;
    padding-left: 27px;
    margin-right: 36px;
    margin-top: 26px;
    margin-bottom: 12px;
    align-items: center;
    position: relative;
    z-index: 10;
    overflow: hidden;
    .iconxia {
      font-size: @font_size_large;
      margin-right: 27px;
      flex: 0 0 26px;
    }
    .vertical-line {
      width: 2px;
      height: 27px;
      background-color: rgb(70,70,70);
    }
    .input-keyword {
      position: relative;
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:before {
        content: '';
        display: inline-block;
        width: 2px;
        height: 34px;
        background-color: rgb(70,70,70);
        position: absolute;
        top: 0;
        left: 0;
      }
      flex: 1;
      .input-value {
        font-size: @font_size_medium;
        line-height: 20px;
        color: rgb(179,179,179);
        box-sizing: border-box;
        width: 100%;
        padding: 6px 0 14px 6px;
        border-bottom: 2px solid rgb(133,133,133);
      }
    }
  }
</style>
