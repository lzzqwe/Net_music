<template>
  <div v-if="hotComments.length" class="good-content">
    <h2 class="good-title">{{ title }}</h2>
    <ul>
      <li class="content-item" :key="item.commentId" v-for="item in hotComments">
        <div class="user">
          <div class="avatar">
            <img :src="item.user.avatarUrl" alt="">
            <div class="nick-pub">
              <span class="nickname">{{ item.user.nickname }}</span>
              <p class="publish-time">{{ item.time |formateDate }}</p>
            </div>
          </div>
          <div class="like">
            <span class="like-count">{{ item.likedCount }}</span><span class="iconfont icondianzan"></span>
          </div>
        </div>
        <p class="appraisal-content van-hairline--bottom">{{ item.content }}</p>
      </li>
    </ul>
    <!-- <div class="loading-container" v-show='!hotComments.length'>
      <van-loading type="spinner" color="#1989fa">加载中...</van-loading>
    </di -->
  </div>
</template>
<script>
import { getDate } from 'common/js/until.js'
export default {
  name: 'MvComment',
  props: {
    hotComments: {
      type: Array
    },
    title: {
      type: String,
      default: '精彩评论'
    }
  },
  filters: {
    formateDate(dt) {
      let time = new Date(dt)
      return getDate(time)
    }
  }
}

</script>
<style lang='stylus' scoped>
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';
.good-content 
  padding: 20px 20px 0 20px;
  .good-title 
    line-height: 40px;
    font-size: $font-size-medium-x;
    font-weight: 600;
  .content-item 
    margin-bottom: 15px;
    .user 
      display: flex;
      justify-content: space-between;
      .avatar 
        font-size: 0;
        display: flex;
        img 
          width: 45px;
          height: 45px;
          border-radius: 50%;
          vertical-align: middle;
        .nick-pub 
          margin-left: 15px;
          .nickname 
            font-size: $font-size-small;
            color: #898989;
          .publish-time 
            font-size: $font-size-small;
            margin-top: 10px;
      .like
        .like-count 
          font-size: $font-size-small;
          margin-right: 5px;
    .appraisal-content 
      line-height: 25px;
      font-size: $font-size-medium;
      color: $color-theme;
      margin-left: 30px;
      padding-bottom: 10px;
</style>
