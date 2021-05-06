<template>
  <li class="item">
    <div class="avatar">
      <img class="avatar-img" v-lazy="item.user.avatarUrl" alt="" />
    </div>
    <div class="comment-info van-hairline--bottom">
      <div class="user">
        <div class="name">
          <span class="nickname">{{ item.user.nickname }}</span>
          <span class="time">{{ parseTime(item.time) }}</span>
        </div>
        <div class="count">
          <span>{{ item.likedCount }}</span>
          <span class="iconfont icondianzan"></span>
        </div>
      </div>
      <p class="text">{{ item.content }}</p>
    </div>
  </li>
</template>

<script>
import moment from "moment";
export default {
  name: "BaseComment",
  props: {
    item: {
      type: Object,
    },
  },
  methods: {
    parseTime(value) {
      const date = new Date(value);
      const year = date.getFullYear();
      if (year >= 2021) {
        return moment(value).format("MM-DD");
      } else {
        return moment(value).format("YYYY-MM-DD");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.item {
  display: flex;
  margin-bottom: 15px;
  .avatar {
    width: 55px;
    flex: 0 0 55px;
    font-size: 0;
    .avatar-img {
      width: 55px;
      height: 55px;
      border-radius: 50%;
    }
  }
  .comment-info {
    margin-left: 15px;
    flex: 1;
    padding-bottom: 25px;
    .user {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 8px;
      .name {
        display: flex;
        flex-direction: column;
        .nickname {
          font-size: 16px;
          color: rgb(102, 102, 102);
        }
        .time {
          font-size: 12px;
          color: rgb(175, 175, 175);
          margin-top: 12px;
        }
      }
      .count {
        font-size: 14px;
        color: rgb(153, 153, 153);
        .icondianzan {
          font-size: 22px;
          margin-left: 8px;
        }
      }
    }
    .text {
      font-size: 18px;
      margin-top: 23px;
      line-height: 32px;
    }
  }
}
</style>
