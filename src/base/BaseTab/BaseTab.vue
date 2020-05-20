<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="tab-link">个性推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/videos">
      <span class="tab-link">MV</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "BaseTab"
};
</script>

<style lang="less" scoped>
@import '~common/less/variable.less';

.tab {
  display: flex;
  height: 44px;
  line-height: 44px;
  font-size: @font-size-medium;
  width: 80%;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  .tab-item {
    flex: 1;
    text-align: center;

    .tab-link {
      padding-bottom: 5px;
      color: #797979;
    }

    &.router-link-exact-active>.tab-link {
      font-size: 20px;
      font-weight: 600;
      color: #303030 !important;

      // .tab-link {
      //   color:#303030;
      //   border-bottom: 2px solid #303030;
      // }
    }
  }
}
</style>
