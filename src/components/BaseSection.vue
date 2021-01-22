<template>
  <div class="section">
    <div class="title">
      <h1 class="text">{{title}}</h1>
      <div @click="$router.push('/playlistCollection')" class="more">
        更多<span class="iconfont icongengduo1"></span>
      </div>
    </div>
    <base-scroll :data="recommendList" :scroll-x="scrollX" class="song-list-wrap">
      <ul class="song-list-content">
        <li @click="skip(item)" :key="item.id" class="song-list-item" v-for="(item) in recommendList">
          <div class="item-icon">
            <img class="img" v-lazy="item.picUrl" alt="">
            <div class="play-count">
              <span class="iconfont iconbofangliang1"></span>{{_normalNum(item.playCount,1)}}
            </div>
          </div>
          <p class="text">
            {{item.name}}
          </p>
        </li>
      </ul>
    </base-scroll>
  </div>
</template>

<script>
import BaseScroll from "./BaseScroll";
export default {
  props:{
    title:{
      type:String
    },
    recommendList:{
      type:Array
    }
  },
  data() {
    return {
      scrollX:true
    }
  },
  methods:{
    skip(item) {
      this.$router.push(`/playlistCollection/${item.id}`)
    },
    _normalNum(num,point) {
      let numStr = num.toString();
      if(numStr.length<6) {
        return numStr
      } else if(6<=numStr.length && numStr.length<=8) {
        return parseInt(num/10000)+"万"
      } else if(numStr.length>8) {//(1,3)
        let decimal = numStr.substring(numStr.length-8,numStr.length-8+point)
        return parseFloat(parseInt(num/100000000)+"."+decimal)+"亿"
      }
    }
  },
  components:{
    BaseScroll
  }
}
</script>

<style lang="less" scoped>
  @import '~../common/less/variable.less';
.section {
  margin-left: 24px;
  margin-right: 24px;
  padding: 18px 0 29px 0;
  border-top: 1px solid rgb(var(--font-color));
  color: var(--font-color);
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    .text {
      font-size: @font_size_large;
      font-weight: 600;
    }
    .more {
      width: 79px;
      height: 37px;
      border: 1px solid var(--btn-border-color);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 16px;
      font-size: @font_size_small-s;
    }
  }
  .song-list-wrap {
    overflow: hidden;
    .song-list-content {
      display: flex;
      width: 1734px;
      .song-list-item {
        margin-right: 16px;
        &:last-child {
          margin-right: 0;
        }
        .item-icon {
          width: 149px;
          height: 149px;
          margin-bottom: 10px;
          position: relative;
          .img {
            width: 100%;
            height: 100%;
            border-radius: 12px;
          }
          .play-count {
            position: absolute;
            top: 6px;
            right: 6px;
            width: 81px;
            height: 26px;
            border-radius: 11px;
            background-color: rgba(164,184,198,0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            color: rgb(255,255,255);
            font-size: @font_size_small-m;
            .iconbofangliang1 {
              font-size: @font_size_small-m;
              margin-right: 5px;
            }
          }
        }
        .text {
          width: 149px;
          text-overflow: ellipsis;
          overflow: hidden;
          padding: 0 5px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          font-size: @font_size_small;
          line-height: 26px;
        }
      }
    }
  }
}
</style>>
