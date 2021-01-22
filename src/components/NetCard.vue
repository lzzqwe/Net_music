<template>
    <div v-if="data.length>0" class="net-card">
      <div class="title">
        <h1 class="txt">{{title}}</h1>
        <van-button type="default">
          <span class="iconfont iconbofang4">播放</span>
        </van-button>
      </div>
      <slot></slot>
    </div>
</template>

<script>
    export default {
      name: "NetCard",
      props:{
        title:{
          type:String
        },
        data:{
          type:Array,
          default:() => ([])
        }
      }
    }
</script>

<style lang="less" scoped>
  @import '~../common/less/variable.less';
  .net-card {
    margin: 0 24px 24px 24px;
    background-color: rgb(255,255,255);
    padding: 0 24px;
    .title {
      display: flex;
      padding-top: 34px;
      justify-content: space-between;
      padding-bottom: 12px;
      .txt {
        font-size: @font_size_large;
        font-weight: 600;
        color: @font-black;
      }
    }
  }
</style>
