<template>
  <div ref="swiperContainer" class="swiper-container">
    <div class="swiper-content">
      <van-swipe class="my-swipe" indicator-color="white">
        <van-swipe-item :key="item.bannerId" v-for="item in banners">
          <img class="swip-item-img" width="100%" v-lazy="item.pic" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    banners: {
      type: Array,
    },
  },
  name: "HomeSwiper",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
@import "../../../common/less/variable";
.swiper-container {
  background-color: var(--body-bgcolor);
  color: var(--font-color);
  position: relative;

  &:after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    /*background-image: var(--bacUrl);*/
    filter: blur(200px);
    background-size: 100% 100%;
  }

  .swiper-content {
    padding: 0 24px 0 24px;

    .my-swipe {
      width: 100%;
      overflow: hidden;
      border-radius: 5px;

      .van-swipe-item {
        color: #fff;
        font-size: 20px;
        text-align: center;
        display: inline-block;
        border-radius: 5px;
        overflow: hidden;

        .swip-item-img {
          width: 100%;
          height: 200px;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>