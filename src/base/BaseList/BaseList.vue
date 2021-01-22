<template>
  <div ref="recommendItem" class="recommd-item">
    <div :key="index" @click="selectItem(lis)" class="disc-item" v-for="(lis,index) in list">
      <img v-if="lis.picUrl" class="icon" v-lazy="lis.picUrl" alt />
      <img v-else class="icon" v-lazy="lis.coverImgUrl" alt />
      <p class="text">{{ lis.name }}</p>
      <span class="iconfont iconbofangliang"></span>
      <span class="play-count">{{ _nomalNum(lis.playCount,2)}}</span>
    </div>
    <!-- <van-loading v-show="hasMore" type="spinner" color="#1989fa">加载中...</van-loading> -->
  </div>
</template>
<script>
export default {
  name: "BaseList",
  props: {
    list: {
      type: Array,
      default: () => []
    },
    hasMore:{
      type:Boolean,
      default:false
    }
  },
   beforeMount() {
    
  },
  mounted() {
    
  },
  beforeUpdate() {
    
  },
  updated() {
    
  },
  beforeDestroy() {
    
  },
  destroyed() {
    
  },
  methods: {
    _nomalNum(num, point) {
      console.log(num);
      // 简化数字拆分为字符串
      let numStr = num.toString().split(".")[0];
      if (numStr.length < 6) {
        return numStr;
      } else if (6 <= numStr.length && numStr.length <= 8) {
        //获取小数点的位数  (4,6)
        let decimal = numStr.substring(
          numStr.length - 4,
          numStr.length - 4 + point
        );
        return parseFloat(parseInt(num / 10000) + "." + decimal) + "万";
      } else if (numStr.length > 8) {
        //获取小数点的位数
        let decimal = numStr.substring(
          numStr.length - 8,
          numStr.length - 8 + point
        );
        return parseFloat(parseInt(num / 100000000) + "." + decimal) + "亿";
      }
    },
    selectItem(item) {
      this.$emit("select", item);
    }
  }
};
</script>

<style scoped lang="less">
.recommd-item {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  .disc-item {
    width: 32%;
    position: relative;

    .icon {
      width: 100%;
      border-radius: 2.5px;
    }

    .text {
      text-overflow: ellipsis;
      overflow: hidden;
      padding: 0 5px;
      margin-bottom: 5px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      font-size: 12px;
      color: #2f2f2f;
      line-height: 20px;
    }

    .iconbofangliang {
      position: absolute;
      top: 5px;
      left: 10px;
      font-size: 12px;
    }

    .play-count {
      position: absolute;
      top: 5px;
      left: 27px;
      font-size: 12px;
    }
  }
}
</style>
