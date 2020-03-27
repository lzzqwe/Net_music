<template>
  <transition name="van-slide-up">
    <div @click="hide" v-show="showFlag" class="play-list">
      <div @click.stop class="list-wrapper">
        <div class="list-header">
          <div class="title">
            <span @click="changeMode" :class="modeIcon"></span>
            <span class="text">{{ modeText }}</span>
            <span @click="clearList" class="iconfont iconlajitong1"></span>
          </div>
        </div>
        <base-scroll :data="sequenceList" ref="listContent" class="list-content">
          <ul>
            <li
              ref="listItem"
              @click="selectSequence(song,index)"
              class="list-item"
              :key="index"
              v-for="(song,index) in sequenceList"
            >
              <span :class="getCurrentIcon(song)" class="iconfont"></span>
              <span class="songName">{{ song.name }}</span>
              <span @click.stop="toggleFavorite(song)" :class="getFavoriteIcon(song)"></span>
              <span @click.stop="deleteOne(song)" class="iconfont iconiconjia"></span>
            </li>
          </ul>
        </base-scroll>
        <div class="list-operate">
          <!-- <div class="add">
                        <span class="iconfont iconhao"></span>
                        <span>添加歌曲到队列</span>
          </div>-->
        </div>
        <!-- <div @click="hide" class="list-close">
                    <span>关闭</span>
        </div>-->
      </div>
    </div>
  </transition>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { playMode } from "common/js/config";
import BaseScroll from "base/BaseScroll/BaseScroll";
import { shuffle } from "common/js/until.js";
export default {
  name: "playList",
  data() {
    return {
      showFlag: false
    };
  },
  methods: {
    show() {
      this.showFlag = true;
    },
    hide() {
      this.showFlag = false;
    },
    clearList() {
      this.$dialog_1();
    },
    selectSequence(item, index) {
      if (this.mode === playMode.random) {
        index = this.playList.findIndex(song => {
          return item.id === song.id;
        });
      }
      this.SET_CURRENTINDEX(index);
      this.SET_PLAYING_STATE(true);
    },
    isFavorite(song) {
      const index = this.favoriteList.findIndex(item => {
        return item.id === song.id;
      });
      return index > -1;
    },
    getFavoriteIcon(song) {
      if (this.isFavorite(song)) {
        return "iconfont iconshoucangdianjihou color";
      } else {
        return "iconfont iconshoucangdianjihou";
      }
    },
    toggleFavorite(song) {
      if (this.isFavorite(song)) {
        this.$toast.fail("取消收藏");
        this.deleteFavoriteList(song);
      } else {
        this.$toast.success("收藏成功");
        this.saveFavoriteList(song);
      }
    },
    deleteOne(song) {
      this.deleteSong(song);
      if (!this.playList.length) {
        this.hide();
      }
    },
    getCurrentIcon(item) {
      if (item.id === this.currentSong.id) {
        return "iconbofang2";
      } else {
        return "";
      }
    },
    resetCurrentIndex(list) {
      let index = list.findIndex(item => {
        return item.id === this.currentSong.id;
      });
      this.SET_CURRENTINDEX(index);
    },
    changeMode() {
      const mode = (this.mode + 1) % 3;
      this.SET_MODE(mode);
      let list = null;
      if (mode == playMode.random) {
        list = shuffle(this.sequenceList);
      } else {
        list = this.sequenceList;
      }
      this.resetCurrentIndex(list);
      this.SET_PLAYLIST(list);
    },
    scrollToCurrent(current) {
      const index = this.sequenceList.findIndex(item => {
        return item.id === current.id;
      });
      this.$refs.listContent.scrollToElement(this.$refs.listItem[index], 300);
    },
    ...mapMutations([
      "SET_CURRENTINDEX",
      "SET_PLAYING_STATE",
      "SET_PLAYLIST",
      "SET_MODE"
    ]),
    ...mapActions(["deleteFavoriteList", "saveFavoriteList", "deleteSong"])
  },
  computed: {
    modeIcon() {
      return this.mode == playMode.sequence
        ? "iconfont iconpaixu"
        : this.mode == playMode.loop
        ? "iconfont iconliebiaoxunhuan"
        : "iconfont icon-suiji";
    },
    modeText() {
      return this.mode === playMode.sequence
        ? "顺序播放"
        : this.mode === playMode.random
        ? "随机播放"
        : "循环播放";
    },
    ...mapGetters([
      "sequenceList",
      "favoriteList",
      "playList",
      "currentSong",
      "mode"
    ])
  },
  components: {
    BaseScroll
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!this.showFlag || newSong.id === oldSong.id) {
        return;
      }
      this.scrollToCurrent(newSong);
    }
  }
};
</script>
<style lang="less" scoped>
@import '~common/less/mixin.less';
@import '~common/less/variable.less';

.play-list {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 200;
  background: rgba(0, 0, 0, 0.3);

  .list-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: @color-background;

    .list-header {
      padding: 20px 30px 10px 20px;

      .title {
        display: flex;

        .iconpaixu {
          line-height: 30px;
          margin-right: 10px;
          color: #ffcd32;
          font-size: 25px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.2);
        }

        .iconliebiaoxunhuan {
          line-height: 30px;
          margin-right: 10px;
          color: #ffcd32;
          font-size: 25px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.2);
        }

        .icon-suiji {
          line-height: 30px;
          margin-right: 10px;
          color: #ffcd32;
          font-size: 25px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.2);
        }

        .text {
          flex: 1;
          line-height: 30px;
          font-size: 14px;
          font-weight: 600;
          color: red;
        }

        .iconlajitong1 {
          color: rgba(255, 255, 255, 0.3);
          line-height: 30px;
        }
      }
    }

    .list-content {
      max-height: 240px;
      overflow: hidden;

      .list-item {
        line-height: 40px;
        display: flex;
        margin: 0 20px;

        .iconfont {
          flex: 0 0 30px;
          width: 30px;
          text-align: center;
          color: #ffcd32;
        }

        .songName {
          flex: 1;
          margin-right: 20px;
          font-size: 14px;
          .no-wrap;
        }

        .iconshoucangdianjihou {
          margin-right: 10px;
          color: #ffcd32;

          &.color {
            color: red;
          }
        }

        .iconiconjia {
          color: #ffcd32;
        }
      }
    }

    .list-operate {
      margin: 20px auto 30px auto;
      width: 140px;

      .add {
        padding: 5px 10px;
        font-size: 10px;
        border: 1px solid red;
        text-align: center;
        border-radius: 50px;

        .iconhao {
          font-size: 12px;
          margin-right: 5px;
          font-weight: 600;
        }
      }
    }

    .list-close {
      line-height: 40px;
      text-align: center;
      background: #222;
      color: rgba(255, 255, 255, 0.5);
    }
  }
}
</style>