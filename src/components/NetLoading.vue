<template>
  <div  class="loading-wrap">
    <div class="loader">
      <div class="line-scale-pulse-out">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="loading-text">正在加载中...</div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "NetLoading"
    }
</script>

<style lang="less" scoped>
  .loading-wrap {
    width: 100%;
    height: 30px;
    .loader {
      width: 100%;
      height: 30px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      .loading-text {
        font-size: 20px;
        margin-left: 5px;
        color: rgb(128,128,128);
      }
    }
  }
</style>
