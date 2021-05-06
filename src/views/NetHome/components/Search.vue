<template>
  <div class="search">
    <span @click="toggleSetting" class="iconfont iconliebiao"></span>
    <div @click="showSearch" class="search-input">
      <span class="iconfont iconsousuo"></span>
      <span class="search-input_keyword">en</span>
    </div>
    <span class="iconfont icontinggeshiqu40x40"></span>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    toggleSetting() {},
    showSearch() {},
  },
};
</script>

<style lang="less" scoped>
@import "../../../common/less/variable";
.search {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
  display: flex;
  padding: 16px 24px 28px 24px;
  align-items: center;
  color: var(--font-color);
  background-color: var(--body-bgcolor);
  z-index: 10;

  .iconliebiao {
    font-size: 28px;
  }

  .search-input {
    height: 53px;
    flex: 1;
    margin: 0 24px;
    background-color: #fcfcfc;
    border-radius: 25px;
    display: flex;
    align-items: center;
    padding-left: 23px;
    font-size: @font_size_small-s;
    color: #989898;

    .iconsousuo {
      font-size: 30px;
      margin-right: 6px;
    }
  }

  .icontinggeshiqu40x40 {
    font-size: 28px;
  }
}
</style>