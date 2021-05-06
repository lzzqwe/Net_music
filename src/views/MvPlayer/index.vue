<template>
  <div class="mv-player">
    <div ref="mvPlayer" class="player"></div>
    <div class="nav-bar-container">
      <nav-bar></nav-bar>
    </div>
    <div class="operation">
      <ul>
        <li class="operator_item">
          <span class="iconfont icondianzan1"></span>
          <span v-if="likedCount" class="num">{{
            likedCount | parseNum(likedCount, 1)
          }}</span>
        </li>
        <li @click="showComment" class="operator_item">
          <span class="iconfont iconicon_fapinglun-mian"></span>
          <span v-if="commentCount" class="num">{{
            commentCount | parseNum(commentCount, 1)
          }}</span>
        </li>
        <li class="operator_item">
          <span class="iconfont iconshare-fill"></span>
          <span v-if="shareCount" class="num">{{
            shareCount | parseNum(shareCount, 1)
          }}</span>
        </li>
        <li class="operator_item">
          <span class="iconfont icontianjia"></span>
          <span class="num">收藏</span>
        </li>
      </ul>
    </div>
    <div class="user">
      <div class="avatar">
        <img
          v-if="userInfo.artists"
          class="img"
          :src="userInfo.artists[0].img1v1Url"
          alt=""
        />
        <span class="name">{{ userInfo.artistName }}</span>
        <span class="iconfont iconhao"></span>
      </div>
      <div class="desc">{{ userInfo.name }}</div>
      <div class="watch" v-if="userInfo.playCount">
        <span class="iconfont iconsq">热点情报局</span
        ><span class="number"
          >{{
            userInfo.playCount | parseNum(userInfo.playCount, 1)
          }}次观看</span
        >
      </div>
    </div>
    <transition name="van-slide-up">
      <div class="content-wrap" v-show="show">
        <div class="title">
          <h1 v-if="commentCount">评论区({{ commentCount | parseNum(commentCount, 1) }})</h1>
          <span @click="closeComment" class="iconfont iconiconjia"></span>
        </div>
        <base-scroll
          ref="comment"
          @scrollToEnd="loadMore"
          :pullup="pullup"
          :data="comment"
          class="content"
        >
          <ul class="comment-list">
            <base-comment
              :key="index"
              :item="item"
              v-for="(item, index) in comment"
            ></base-comment>
            <net-loading v-show="hasMore"></net-loading>
            <div class="no-result" v-show="!hasMore">已经没有了更多了</div>
          </ul>
        </base-scroll>
      </div>
    </transition>
  </div>
</template>

<script>
import {prefixStyle} from '@/common/js/dom'
import { getMvUrl, getMvDetail, getMvInfo, getMvComment } from "@/api";
import Player from "xgplayer";
import NavBar from "@/components/NavBar";
import BaseComment from "@/components/BaseComment";
import NetLoading from "@/components/NetLoading";
import BaseScroll from "@/components/BaseScroll";
const transform = prefixStyle('transform')
export default {
  name: "MvPlayer",
  created() {
    this._getMvUrl();
    this._getMvDetail();
    this._getMvInfo(this.$route.params.id);
  },
  data() {
    return {
      url: "",
      likedCount: 0,
      shareCount: 0,
      commentCount: 0,
      liked: false,
      userInfo: {},
      show: false,
      overlay: false,
      offset: 0,
      limit: 20,
      comment: [],
      total: 0,
      hasMore: true,
      pullup: true,
    };
  },
  components: {
    NavBar,
    BaseComment,
    NetLoading,
    BaseScroll,
  },
  mounted() {
    this._initPlayer();
  },
  methods: {
    async _getMvUrl() {
      const params = {
        id:this.$route.params.id
      }
      try {
        const res = await getMvUrl(params);
        if (res.code === 200) {
          this.url = res.data.url;
        }
      } catch (error) {
        this.$notify({
          message: "获取数据失败",
          color: "#FFFFFF",
          background: "#00A2E8",
        });
      }
    },
    loadMore() {
      this.offset++;
      if (this.comment.length < this.commentCount) {
        this._getMvComment();
      } else {
        this.hasMore = false;
      }
    },
    async _getMvComment() {
      const params = {
        id:this.$route.params.id,
        offset:this.offset,
        limit:this.limit
      }
      try {
        const res = await getMvComment(params);
        if (res.code === 200) {
          let hotComments = [];
          if (res.hotComments) {
            hotComments = res.hotComments.slice(0, 5);
          }
          this.comment = this.comment.concat(hotComments, res.comments);
          this.total = res.total;
          this.$nextTick(() => {
            this.$refs.comment.refresh();
          });
          if (this.total < 3) {
            this.hasMore = false;
          }
        }
      } catch (error) {
        this.$notify({
          message: "获取数据失败",
          color: "#FFFFFF",
          background: "#00A2E8",
        });
      }
    },
    showComment() {
      this.show = true;
      this.$refs.mvPlayer.style[transform] = "translateY(-100px)";
      clearTimeout(this.timeId);
      this.timeId = setTimeout(() => {
        this._getMvComment();
      }, 100);
    },
    closeComment() {
      this.show = false;
      this.$refs.mvPlayer.style[transform]= "translateY(0)";
    },
    close() {
      this.$refs.mvPlayer.style[transform]= "translateY(0)";
    },
    async _getMvDetail() {
       const params = {
        mvid:this.$route.params.id,
      }
      try {
        const res = await getMvDetail(params);
        if (res.code === 200) {
          this.userInfo = res.data;
        }
      } catch (error) {
        this.$notify({
          message: "获取数据失败",
          color: "#FFFFFF",
          background: "#00A2E8",
        });
      }
    },
    async _getMvInfo() {
      const params = {
        mvid:this.$route.params.id,
      }
      try {
        const res = await getMvInfo(params);
        if (res.code === 200) {
          this.likedCount = res.likedCount;
          this.shareCount = res.shareCount;
          this.commentCount = res.commentCount;
          this.liked = res.liked;
        }
      } catch (error) {
        this.$notify({
          message: "获取数据失败",
          color: "#FFFFFF",
          background: "#00A2E8",
        });
      }
    },
    _initPlayer() {
      if (!this.url) {
        return;
      }
      this.player = new Player({
        el: this.$refs.mvPlayer,
        url: this.url,
        fluid: true,
        controls: false,
        autoplay: true,
      });
    },
  },
  watch: {
    url(newUrl, oldUrl) {
      if (newUrl && newUrl !== oldUrl) {
        if (!this.player) {
          this._initPlayer();
        } else {
          this.player.url = newUrl;
          this.player.reload();
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../common/less/variable";
.mv-player {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(0, 0, 0);
  z-index: 101;
  .player {
    position: absolute;
    top: 27%;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    transition: all 0.5s;
  }
  .nav-bar-container {
    padding: 0 24px;
    color: @font-white;
  }
  .operation {
    position: fixed;
    bottom: 60px;
    right: 27px;
    color: @font-white;
    font-size: @font_size_small-s;
    .operator_item {
      display: flex;
      flex-direction: column;
      margin-bottom: 40px;
      &:last-child {
        margin-bottom: 0;
      }
      .icondianzan1 {
        font-size: 36px;
      }
      .iconicon_fapinglun-mian {
        font-size: 36px;
      }
      .iconshare-fill {
        font-size: 36px;
      }
      .icontianjia {
        font-size: 36px;
      }
      .num {
        color: @font-deep-gray;
      }
    }
  }
  .user {
    position: fixed;
    bottom: 60px;
    left: 27px;
    color: @font-white;
    font-size: @font_size_small-s;
    .watch {
      .iconsq {
        padding: 10px;
        display: inline-block;
        border-radius: 5px;
        border: 1px solid rgb(36, 36, 36);
        margin-right: 10px;
        margin-top: 10px;
      }
    }
    .desc {
      margin-top: 10px;
    }
    .avatar {
      display: flex;
      align-items: center;
      .img {
        width: 46px;
        height: 46px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .name {
        font-weight: 600;
        margin-right: 10px;
      }
      .iconhao {
        display: inline-block;
        padding: 5px 10px;
        border-radius: 8px;
        background-color: red;
      }
    }
  }
  .content-wrap {
    padding: 0 24px 0 24px;
    height: 400px;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    width: 100%;
    box-sizing: border-box;
    .title {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      .iconiconjia {
        font-size: 16px;
      }
    }
    .content {
      height: 100%;
      overflow: auto;
      .comment-list {
        padding: 0 24px;
        .no-result {
          width: 100%;
          line-height: 40px;
          font-size: 20px;
          padding-bottom: 30px;
          text-align: center;
        }
      }
    }
  }
}
</style>
