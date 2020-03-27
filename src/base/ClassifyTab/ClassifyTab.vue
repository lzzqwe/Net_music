<template>
  <base-scroll
    v-if="this.tabs.length"
    :data="this.tabs"
    :scrollX="scrollX"
    ref="tabsSinger"
    class="tab-item"
  >
    <ul :style="{width:width+'px'}" class="tab-item-ls">
      <span class="classify-title">{{ title }}:</span>
      <li
        ref="tabItem"
        :class="{active:index===nowIndex}"
        @click="onClick(index)"
        :key="index"
        v-for="(item,index) in this.tabs"
        class="item-ls-in"
      >{{item.title}}</li>
    </ul>
  </base-scroll>
</template>
<script>
import BaseScroll from "base/BaseScroll/BaseScroll";
export default {
  name: "ClassifyTab",
  props: {
    tabs: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: "分类"
    },
    width: {
      type: Number,
      default: 1050
    }
  },
  data() {
    return {
      scrollX: true,
      nowIndex: null
    };
  },
  methods: {
    onClick(index) {
      this.nowIndex = index;
      this.$refs.tabsSinger.scrollToElement(
        this.$refs.tabItem[index],
        300,
        -50,
        0
      );
      this.$emit("onClick", index);
    }
  },
  components: {
    BaseScroll
  }
};
</script>
<style lang="less" scoped>
.tab-item {
  height: 30px;
  line-height: 30px;
  overflow: hidden;
  background-color: #1f0404;
  margin-bottom: 5px;

  .tab-item-ls {
    display: flex;

    .classify-title {
      font-size: 14px;
    }

    .item-ls-in {
      padding: 0 5px;
      font-size: 12px;
      color: #666666;

      &.active {
        font-weight: 600;
        color: #ffffff;
        font-size: 16px;
        background-color: #666666;
        border-radius: 5px;
      }
    }
  }
}
</style>
