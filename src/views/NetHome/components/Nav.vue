<template>
  <ul ref="navCotent" class="nav-content">
    <router-link
      :to="handleString(item.url)"
      tag="li"
      :key="item.id"
      v-for="item in navIcon"
      class="nav-item"
      ref="navItem"
    >
      <div class="nav-icon">
        <img v-lazy="item.iconUrl" class="img" alt="" />
      </div>
      <p class="text">{{ item.name }}</p>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: {
    navIcon: {
      type: Array,
    },
  },
  name: "Nav",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    handleString(str) {
      return str.slice(9);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../common/less/variable";
.net-nav-wrap {
  padding: 24px 0 24px 0;
  margin-left: 24px;
  margin-right: 24px;
  overflow: hidden;

  .nav-content {
    display: flex;
    width: 840px;

    .nav-item {
      padding-right: 30px;
      text-align: center;

      &:last-child {
        padding-right: 0;
      }

      .nav-icon {
        width: 75px;
        height: 75px;
        background-color: #8f342d;
        border-radius: 50%;
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        align-items: center;

        .img {
          width: 33px;
          height: 33px;
        }
      }

      .text {
        font-size: @font_size_small-s;
        width: 75px;
      }
    }
  }
}
</style>