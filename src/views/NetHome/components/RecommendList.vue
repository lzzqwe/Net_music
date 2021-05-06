<template>
  <div>
    <base-section
      :recommend-list="recommendList"
      title="推荐歌单"
    ></base-section>
  </div>
</template>

<script>
import BaseSection from "@/components/BaseSection";
export default {
  props: {
    recommendList: {
      type: Array,
    },
  },
  name: "Recommendlist",
  components: {
    BaseSection,
  },
  data() {
    return {
      arr: [],
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
</style>