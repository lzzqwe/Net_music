<template>
  <transition name="van-fade">
    <div v-show="flag" class="comment">
      <div class="back">
        <span @click="Back" class="iconfont iconyoujiantou"></span>
        <span class="back-sub-title" style="margin-left:15px">{{title}}</span>
      </div>
      <base-scroll :delayTime="delayTime" :data="list" class="comment-list">
        <div class="list">
          <div :key="index" class="comment-item" v-for="(item,index) in list">
            <div class="user">
              <img class="user-img" :src="item.user.avatarUrl" alt />
            </div>
            <div class="content">
              <div class="like">
                <div class="like-name">
                  <span class="name">{{ item.user.nickname }}</span>
                  <p class="time">12:30</p>
                </div>
                <span class="iconfont icondianzan">{{item.likedCount}}</span>
              </div>
              <div class="pinlun">{{item.content}}</div>
            </div>
          </div>
        </div>
      </base-scroll>
      <div class="loading-container" v-show="!list.length">
        <van-loading type="spinner" color="#1989fa">加载中...</van-loading>
      </div>
    </div>
  </transition>
</template>
<script>
import BaseScroll from "base/BaseScroll/BaseScroll";
export default {
  name: "BaseComment",
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  components: {
    BaseScroll
  },
  data() {
    return {
      title: "评论",
      flag: false,
      delayTime: 1000
    };
  },
  methods: {
    showComment() {
      this.flag = true;
    },
    Back() {
      this.flag = false;
    }
  }
};
</script>
<style lang='less' scoped>
@import '~common/less/variable.less';

.comment {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 220;
  background-color: @color-background;

  .back {
    height: 50px;
    line-height: 50px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: @color-background;
    width: 100%;

    .back-sub-title {
      font-size: 16px;
    }

    .iconyoujiantou {
      color: @color-theme;
      margin-left: 20px;
      font-size: 20px;
    }
  }

  .loading-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
  }

  .comment-list {
    position: fixed;
    top: 50px;
    bottom: 0;
    width: 100%;
    overflow: hidden;

    .comment-item {
      padding: 10px;
      display: flex;

      .user {
        margin-right: 15px;
        width: 30px;
        flex: 0 0 30px;

        .user-img {
          border-radius: 50%;
          width: 30px;
          height: 30px;
        }
      }

      .content {
        flex: 1;

        .like {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;

          .like-name {
            .name {
              font-size: 12px;
              margin-bottom: 5px;
              line-height: 25px;
            }

            .time {
              font-size: 12px;
            }
          }
        }

        .pinlun {
          line-height: 25px;
          font-size: 14px;
        }
      }
    }
  }
}
</style> 