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
      color: @color-text-l;
    }

    &.router-link-active {
      font-size: 20px;
      font-weight: 600;

      .tab-link {
        color: @color-theme;
        border-bottom: 2px solid @color-theme;
      }
    }
  }
}
</style>
