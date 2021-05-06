<template>
  <div class="music-list">
    <div ref="navWrap" class="nav-bar-wrap">
      <nav-bar :bar-title="barTitle"></nav-bar>
      <div
        :style="{
          backgroundImage: `url(${playlist.coverImgUrl})`,
          opacity: opacity,
        }"
        class="background"
      ></div>
      <span @click="showSearch" class="iconfont iconsousuo"></span>
    </div>
    <base-scroll
      :listen-scroll="listenScroll"
      ref="songs"
      @onscroll="scroll"
      :bounce="bounce"
      :probe-type="probeType"
      :data="songs"
      class="song-list-wrap"
    >
      <div>
        <div ref="cover" class="background-wrap">
          <div
            :style="{ backgroundImage: `url(${playlist.coverImgUrl})` }"
            class="song-list-background"
          ></div>
        </div>
        <div class="song-detail-cover">
          <div class="detail-cover-content">
            <div class="cover-img">
              <img class="icon-album" v-lazy="playlist.coverImgUrl" alt="" />
            </div>
            <div class="description">
              <p class="song-list-title">{{ playlist.name }}</p>
              <div v-if="playlist.creator" class="attention">
                <img
                  class="avatar"
                  v-lazy="playlist.creator.avatarUrl"
                  alt=""
                />
                <span class="user-name">{{ playlist.creator.nickname }}</span>
                <div class="increase">
                  <span class="iconfont iconhao"></span>
                </div>
              </div>
              <div class="song-list-content">
                <p class="text">{{ playlist.description }}</p>
                <span class="iconfont icongengduo1"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="song-detail-operation">
          <ul class="operation-list">
            <li
              @click="$toast('待开发')"
              class="operator-item"
              v-if="playlist.subscribedCount"
            >
              <span class="iconfont iconjiatianjiakuangxuanduoxuan-8"></span
              ><span>{{
                playlist.subscribedCount | parseNum(playlist.subscribedCount, 1)
              }}</span>
            </li>
            <li @click="isShowComment" class="operator-item">
              <span class="iconfont iconpinglun1"></span>
              <span v-if="playlist.commentCount">{{
                playlist.commentCount | parseNum(playlist.commentCount, 1)
              }}</span>
              <span v-else>评论</span>
            </li>
            <li class="operator-item" v-if="playlist.shareCount">
              <span class="iconfont iconfenxiang1"></span
              ><span>{{
                playlist.shareCount | parseNum(playlist.shareCount, 1)
              }}</span>
            </li>
          </ul>
        </div>
        <div class="open-vip">
          <div class="vip-song">
            <span class="iconfont iconVIP-"></span>
            <span>含有14首VIP专享歌曲</span>
          </div>
          <div class="price">
            <span>首开vip仅仅5元</span>
            <span class="iconfont icongengduo1"></span>
          </div>
        </div>
        <div class="play-all">
          <div @click="playAll" class="play">
            <span :class="getPlayIcon" class="iconfont"></span>
            <span class="all">播放全部</span>
            <span class="num">({{ this.songs.length }})</span>
          </div>
          <div class="down-select">
            <span class="iconfont iconxiazai"></span
            ><span class="iconfont iconquanxuan"></span>
          </div>
        </div>
        <div class="list">
          <ul>
            <base-songs
              :index="index"
              :key="item.id"
              v-for="(item, index) in songs"
              @play="playSong(index)"
              :song="item"
            ></base-songs>
            <div v-show="!this.songs.length" class="net-loading-wrap">
              <net-loading></net-loading>
            </div>
          </ul>
        </div>
      </div>
    </base-scroll>
    <songs-search
      :songs="songs"
      @hide="hide"
      :pic-url="playlist.coverImgUrl"
      v-show="isShowSearch"
    ></songs-search>
  </div>
</template>

<script>
import NetLoading from "./NetLoading";
import SongsSearch from "./SongsSearch";
import NavBar from "./NavBar";
import BaseScroll from "./BaseScroll";
import BaseSongs from "./BaseSongs";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "MusicList",
  props: {
    playlist: {
      type: Object,
    },
    songs: {
      type: Array,
    },
    barTitle: {
      type: String,
    },
  },
  mounted() {
    this.handlePlaylist(this.playList);
  },
  computed: {
    getPlayIcon() {
      return this.playing ? "iconbofang3" : "iconbofang7";
    },
    ...mapGetters(["playing", "playList"]),
  },
  data() {
    return {
      bounce: {
        top: false,
        bottom: true,
        left: true,
        right: true,
      },
      listenScroll: true,
      scrollY: 0,
      opacity: 0,
      probeType: 3,
      isShowSearch: false,
    };
  },
  components: {
    NetLoading,
    BaseScroll,
    BaseSongs,
    NavBar,
    SongsSearch,
  },
  methods: {
    handlePlaylist(playList) {
      if (playList.length > 0) {
        this.$refs.songs.$el.classList.add("bottom");
      } else {
        this.$refs.songs.$el.classList.remove("bottom");
      }
    },
    playAll() {
      this.select_play({ playlist: this.songs, index: 0 });
    },
    showSearch() {
      this.isShowSearch = true;
    },
    hide() {
      this.isShowSearch = false;
    },
    scroll(pos) {
      this.scrollY = Math.abs(pos.y);
    },
    playSong(index) {
      this.select_play({ playlist: this.songs, index });
    },
    isShowComment() {
      this.$emit("comment");
    },
    ...mapActions(["select_play"]),
  },
  watch: {
    scrollY(newValue) {
      const height =
        this.$refs.cover.clientHeight - this.$refs.navWrap.clientHeight;
      const percent = newValue / height;
      if (newValue > this.$refs.navWrap.clientHeight) {
        this.$parent.barTitle = this.playlist.name;
      } else {
        this.$parent.barTitle = "歌单";
      }
      if (percent > 1) {
        this.opacity = 1;
      } else {
        this.opacity = 1 * percent;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.music-list {
  .nav-bar-wrap {
    padding: 0 24px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    overflow: hidden;
    color: rgb(255, 255, 255);
    .background {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: 50%;
      z-index: -1;
      filter: blur(13px);
      transform: scale(3);
    }
    .iconsousuo {
      font-size: 30px;
      color: #ffffff;
      position: absolute;
      right: 50px;
      top: 26px;
    }
  }
  .song-list-wrap {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    &.bottom {
      bottom: 82px;
    }
    .background-wrap {
      overflow: hidden;
      .song-list-background {
        height: 400px;
        width: 100%;
        position: relative;
        background-size: cover;
        filter: blur(20px);
        background-repeat: no-repeat;
        transform: scale(3);
        background-position: 50%;
        &:after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(0, 0, 0, 0.25);
          z-index: 1;
        }
      }
    }
    .song-detail-cover {
      position: absolute;
      top: 145px;
      left: 0;
      right: 0;
      .detail-cover-content {
        padding: 0 24px;
        display: flex;
        .cover-img {
          flex: 0 0 181px;
          width: 181px;
          .icon-album {
            width: 181px;
            height: 181px;
            border-radius: 12px;
          }
        }
        .description {
          flex: 1;
          margin-left: 28px;
          .song-list-title {
            font-size: 20px;
            line-height: 36px;
            color: rgba(255, 255, 255);
          }
          .attention {
            display: flex;
            margin: 24px 0 32px 0;
            font-size: 16px;
            align-items: center;
            .avatar {
              width: 37px;
              height: 37px;
              border-radius: 50%;
            }
            .user-name {
              margin: 0 4px 0 12px;
              color: rgb(182, 175, 178);
              font-weight: 600;
            }
            .increase {
              padding: 8px 16px;
              background-color: rgb(161, 151, 155);
              border-radius: 13px;
              .iconhao {
                color: rgb(216, 213, 214);
              }
            }
          }
          .song-list-content {
            display: flex;
            font-size: 16px;
            justify-content: space-between;
            color: rgb(182, 175, 178);
            .icongengduo1 {
              font-size: 16px;
            }
            .text {
              white-space: nowrap;
              text-overflow: ellipsis;
              width: 200px;
              overflow: hidden;
              font-weight: 600;
            }
          }
        }
      }
    }
    .song-detail-operation {
      background-color: var(--song-detail-operation-color);
      height: 60px;
      position: absolute;
      top: 365px;
      left: 75px;
      right: 75px;
      border-radius: 30px;
      padding: 0 41px;
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
      color: var(--font-color);
      .operation-list {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        .operator-item {
          font-size: 14px;
          display: flex;
          align-items: center;
          border-right: 1px solid var(--border-right-color);
          padding-right: 23px;
          &:last-child {
            padding-right: 0;
            border-right: 0;
          }
          .iconjiatianjiakuangxuanduoxuan-8 {
            font-size: 26px;
            margin-right: 12px;
          }
          .iconpinglun1 {
            font-size: 26px;
            margin-right: 12px;
          }
          .iconfenxiang1 {
            font-size: 26px;
            margin-right: 12px;
          }
        }
      }
    }
    .open-vip {
      margin: 60px 18px 0 18px;
      display: flex;
      height: 65px;
      align-items: center;
      justify-content: space-between;
      padding: 0 15px;
      border: 1px solid rgb(233, 233, 233);
      border-radius: 12px;
      .vip-song {
        font-size: 20px;
        .iconVIP- {
          margin-right: 17px;
          font-size: 20px;
        }
      }
      .price {
        font-size: 18px;
        color: rgb(154, 154, 154);
        .icongengduo1 {
          font-size: 18px;
          margin-left: 12px;
        }
      }
    }
    .play-all {
      padding: 0 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 12px 0 20px 0;
      height: 75px;
      .play {
        display: flex;
        align-items: center;
        .iconbofang7 {
          font-size: 30px;
          color: rgb(255, 65, 30);
        }
        .iconbofang3 {
          font-size: 30px;
          color: rgb(255, 65, 30);
        }
        .num {
          font-size: 18px;
          color: rgb(153, 153, 153);
        }
        .all {
          font-size: 23px;
          font-weight: 600;
          margin: 0 14px 0 23px;
        }
      }
      .down-select {
        .iconxiazai {
          font-size: 25px;
          margin-right: 25px;
        }
        .iconquanxuan {
          font-size: 25px;
        }
      }
    }
    .list {
      padding: 0 33px;
      .list-content {
        .list-item {
          display: flex;
          align-items: center;
          margin-bottom: 38px;
          .item-index {
            flex: 0 0 7px;
            width: 7px;
            font-size: 16px;
            color: rgb(153, 153, 153);
            font-weight: 600;
          }
          .desc {
            flex: 1;
            display: flex;
            justify-content: space-between;
            margin-left: 37px;
            align-items: center;
            .song-name-text {
              margin-right: 39px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              .song-name-content {
                flex: 0 0 320px;
                width: 320px;
                .name {
                  width: 100%;
                  font-size: 20px;
                  margin-bottom: 16px;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                }
                .text {
                  font-size: 12px;
                  color: rgb(179, 179, 179);
                  .icondujia {
                    margin-right: 5px;
                    color: rgb(246, 162, 159);
                  }
                  .iconsq {
                    color: rgb(225, 113, 71);
                    margin-right: 5px;
                  }
                }
              }
              .iconbofang6 {
                font-size: 22px;
                margin-left: 34px;
                color: rgb(179, 179, 179);
              }
            }
            .play-icon {
              flex: 0 0 22px;
              width: 22px;
              .iconsandian {
                font-size: 22px;
                color: rgb(179, 179, 179);
              }
            }
          }
        }
      }
    }
  }
}
</style>
