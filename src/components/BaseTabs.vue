<template>
  <div class="tabs">
    <van-tabs @click="changeTag">
      <van-tab :key="tag.name" v-for="{tag,index} in tags" :title="tag.name">
        <slot :index="index"></slot>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
    export default {
      name: "BaseTabs",
      props:{
        tags:{
          type:Array
        }
      },
      methods:{
        changeTag() {
          this.$emit('change',name,title)
        }
      }
    }
</script>

<style lang="less" scoped>
  .tabs {
    /deep/ .van-tabs__wrap {
      height: 60px;
      border-bottom: 1px solid rgb(181,186,187);
      background-color: rgb(193,197,201);
    }
    /deep/ .van-tab {
      font-size: 20px;
      color: rgb(81,84,84);
    }
    /deep/ .van-tabs__nav--complete {
      padding: 0 12px;
    }
    /deep/ .van-tab--active {
      color: rgb(38,41,41);
      font-weight: 600;
    }
  }
</style>
