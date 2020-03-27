<template>
  <div class="player" v-show="playList.length>0">
    <transition
      name="normal"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div class="normal-player" v-show="fullscreen">
        <div class="background">
          <img class="img" :src="currentSong.image" alt />
        </div>
        <div class="top">
          <h1 class="album">{{ currentSong.name }}</h1>
          <h2 class="singer">{{ currentSong.singer }}</h2>
          <div @click="back" class="back">
            <span class="iconfont iconshouqi"></span>
          </div>
        </div>
        <div
          @touchstart.prevent="middleTouchStart"
          @touchmove.prevent="middleTouchMove"
          @touchend.prevent="middleTouchEnd"
          class="middle"
        >
          <div ref="middleL" class="middle-l">
            <div ref="cdWrapper" class="cd-wrapper">
              <div :class="cdCls">
                <img class="currenImg" v-lazy="currentSong.image" alt />
              </div>
              <div class="baseCls" :class="neeldeCls">
                <img class="neeldeImg" src="./needle.png" alt />
              </div>
            </div>
            <div class="playing-lyric">
              <p class="txt">{{ playingLyric }}</p>
            </div>
          </div>
          <base-scroll :data="currentLyric&&currentLyric.lines" ref="lyricList" class="middle-r">
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <p
                  :class="{'current':currentLineNum===index}"
                  ref="lyricLine"
                  :key="index"
                  class="lyric-item"
                  v-for="(item,index) in this.currentLyric.lines"
                >{{ item.txt }}</p>
              </div>
            </div>
          </base-scroll>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span :class="{'active':currentShow==='cd'}" class="dot"></span>
            <span :class="{'active':currentShow==='lyric'}" class="dot"></span>
          </div>
          <div class="customer-handle">
            <span
              :class="getFavoriteCls(currentSong)"
              @click="handleFavorite(currentSong)"
              class="iconfont iconshoucangdianjihou"
            ></span>
            <span class="iconfont iconxiazai"></span>
            <span @click="_showComment" class="iconfont iconpinglun">
              <span class="tag">{{_totalCount()}}</span>
            </span>
          </div>
          <progress-bar
            :currentTime="currentTime"
            :percent="percent"
            @percentChange="onProgressBarChange"
          ></progress-bar>
          <div class="operateors">
            <div class="icon i_right">
              <span @click="changeMode" :class="modeIcon"></span>
            </div>
            <div class="icon i_right">
              <span @click="prev" class="iconfont iconvoiceleft"></span>
            </div>
            <div class="icon i_center">
              <span @click="togglePlaying" :class="playIcon"></span>
            </div>
            <div class="icon i_left">
              <span @click="next" class="iconfont iconicon_gequxiangqing_s"></span>
            </div>
            <div class="icon i_left">
              <span @click="showList" class="iconbofangliebiao iconfont"></span>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="van-slide-up">
      <div @click="open" class="mini-player" v-show="!fullscreen">
        <div class="icon">
          <img :class="cdCls" class="img-icon" :src="currentSong.image" alt />
        </div>
        <div class="text">
          <h2 class="name">{{ currentSong.name }}</h2>
          <p class="desc">{{ currentSong.singer }}</p>
        </div>
        <div class="control">
          <van-circle
            v-model="currentRate1"
            :speed="100"
            :color="color"
            :rate="rate"
            :stroke-width="60"
            class="circle"
          >
            <span class="icon-mini" @click.stop="togglePlaying" :class="miniPlayIcon"></span>
          </van-circle>
        </div>
        <div @click.stop="showList" class="list">
          <span class="iconfont iconbofangliebiao"></span>
        </div>
      </div>
    </transition>
    <play-list ref="playList"></play-list>
    <transition name="van-fade">
      <div v-show="flag" class="comment">
        <div class="back">
          <span @click="Back" class="iconfont iconyoujiantou"></span>
          <span class="back-title-sub" style="margin-left:15px">{{title}}</span>
        </div>
        <base-scroll :delayTime="delayTime" :data="comment" class="review">
          <div>
            <mv-comment :hotComments="hotComments"></mv-comment>
            <mv-comment title="最近评论" :hotComments="comment"></mv-comment>
          </div>
        </base-scroll>
      </div>
    </transition>
    <audio
      ref="audio"
      :src="currentSong.url"
      @play="ready"
      @timeupdate="updatetime"
      @ended="end"
      @error="stalled"
    ></audio>
  </div>
</template>
<!-- onplay 当媒介数据将要开始播放时运行脚本
onended 当媒介已抵达结尾时运行脚本
ontimeupdate 当媒介改变其播放位置时运行脚本 -->
<script>
import animations from "create-keyframe-animation";

import Lyric from "lyric-parser";

import BaseScroll from "base/BaseScroll/BaseScroll";

import { prefixStyle } from "common/js/dom";

import { mapGetters, mapMutations, mapActions } from "vuex";

import MvComment from "base/MvComment/MvComment";

import { getLyric } from "api/index.js";

import ProgressBar from "base/ProgressBar/ProgressBar";

import { playMode } from "common/js/config";

import { shuffle } from "common/js/until";

import PlayList from "base/PlayList/PlayList";

const transform = prefixStyle("transform");

const transitionDuration = prefixStyle("transitionDuration");

const format = rate => Math.min(Math.max(rate, 0), 100);
export default {
  name: "player",
  data() {
    return {
      currentTime: 0,
      currentLineNum: 0, //当前歌词所在行
      currentLyric: null,
      songReady: false, // 标识位
      playingLyric: "",
      currentShow: "cd",
      currentRate1: 0,
      color: "red",
      rate: 0,
      comment: [],
      total: null,
      title: "评论",
      flag: false,
      hotComments: [],
      delayTime: 1000
    };
  }, // 为什么要在create中定义 因为不需要getter 和setter 函数
  created() {
    this.touch = {};
  },
  /*
  *对于任何复杂逻辑，你都应当使用计算属性。
  不同的是计算属性是基于它们的响应式依赖进行缓存的。
  只在相关响应式依赖发生改变时它们才会重新求值。
  这就意味着只要 message 还没有发生改变，多次访问 reversedMessage
  计算属性会立即返回之前的计算结果，而不必再次执行函数。

  我们为什么需要缓存？假设我们有一个性能开销比较大的计算属性 A，
  它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 A 。
  如果没有缓存，我们将不可避免的多次执行 A 的 getter！
  如果你不希望有缓存，请用方法来替代。
  */
  computed: {
    percent() {
      return this.currentTime / this.currentSong.duration;
    },
    playIcon() {
      return this.playing ? "iconfont iconbofang3" : "iconfont iconbofang2";
    },
    miniPlayIcon() {
      return this.playing ? "iconfont iconzanting" : "iconfont iconbofang4";
    },
    cdCls() {
      return this.playing ? "cd cd_play" : "cd cd_play cd_pause";
    },
    neeldeCls() {
      return this.playing ? "neeldeCls" : "rateCls";
    },
    modeIcon() {
      return this.mode == playMode.sequence
        ? "iconfont iconliebiaoxunhuan1"
        : this.mode == playMode.loop
        ? "iconfont iconliebiaoxunhuan"
        : "iconfont icon-suiji";
    },
    ...mapGetters([
      "playList",
      "fullscreen",
      "currentSong",
      "playing",
      "currentIndex",
      "mode",
      "sequenceList",
      "favoriteList"
    ])
  },
  methods: {
    showComment() {
      this.flag = true;
    },
    Back() {
      this.flag = false;
    },
    back() {
      this.SET_FULLSCREEN(false);
    }, //timeupdate事件  元素的currentTime属性表示的时间已经改变。
    onProgressBarChange(percent) {
      this.$refs.audio.currentTime = this.currentSong.duration * percent;
      if (this.currentLyric) {
        this.currentLyric.seek(this.currentSong.duration * percent * 1000);
      }
    },
    _showComment() {
      this.showComment();
    },
    _totalCount() {
      if (this.total > 10000) {
        return "1w+";
      } else if (this.total > 1000) {
        return "999+";
      }
      return this.total;
    },
    _getPosAndScale() {
      // mini播放器中的唱片的宽度 这是css中定义的
      const targetWidth = 40;
      // mini播放器中的唱片的中心位置 距离左边的距离
      const paddingLeft = 40;
      // mini播放器中的唱片的中心位置 距离底部的距离
      const paddingBottom = 30;
      // 大唱片容器到顶部的距离 即class="middle"到顶部的距离 css定义的
      const paddingTop = 80;
      // 大唱片容器的宽度 即class="cd-wrapper" css定义的
      const width = window.innerWidth * 0.8;
      // 初始的缩放比列
      const scale = targetWidth / width;
      // 初始的x坐标 即小唱片的中心到大唱片中心的距离 -147.5
      const x = -(window.innerWidth / 2 - paddingLeft);
      // 初始的y坐标 即小唱片的中心到大唱片中心的距离 667-80-375/2-30=369.5
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
      return {
        x,
        y,
        scale
      };
    },
    enter(el, done) {
      const { x, y, scale } = this._getPosAndScale();
      let animation = {
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0,0,0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0,0,0) scale(1)`
        }
      };
      animations.registerAnimation({
        name: "move",
        animation,
        presets: {
          duration: 400,
          easing: "linear"
        }
      });
      animations.runAnimation(this.$refs.cdWrapper, "move", done);
    },
    afterEnter() {
      animations.unregisterAnimation("move");
      this.$refs.cdWrapper.style.animation = "";
    },
    leave(el, done) {
      this.$refs.cdWrapper.style.transition = "all 0.4s";
      const { x, y, scale } = this._getPosAndScale();
      this.$refs.cdWrapper.style[
        transform
      ] = `translate3d(${x}px,${y}px,0) scale(${scale})`;
      this.$refs.cdWrapper.addEventListener("transitionend", done);
    },
    afterLeave() {
      this.$refs.cdWrapper.style.transition = "";
      this.$refs.cdWrapper.style[transform] = "";
    },
    stalled() {
      this.$toast.fail("因为版权问题不能播放");
      this.songReady = true;
    },
    handleFavorite(song) {
      if (this.isFavorite(song)) {
        this.$toast.fail("取消收藏");
        this.deleteFavoriteList(song);
      } else {
        this.$toast.success("收藏成功");
        this.saveFavoriteList(song);
      }
    },
    isFavorite(song) {
      const index = this.favoriteList.findIndex(item => {
        return item.id === song.id;
      });
      return index > -1;
    },
    getFavoriteCls(song) {
      if (this.isFavorite(song)) {
        return "icon-favorite";
      } else {
        return "";
      }
    },
    open() {
      this.SET_FULLSCREEN(true);
    },
    togglePlaying() {
      if (!this.songReady) {
        return;
      }
      this.SET_PLAYING_STATE(!this.playing);
      if (this.currentLyric) {
        this.currentLyric.togglePlay();
      }
    },
    updatetime(e) {
      this.currentTime = e.target.currentTime;
    },
    next() {
      if (!this.songReady) {
        return;
      }
      if (this.playList.length == 1) {
        this.loop();
        return;
      } else {
        let index = this.currentIndex + 1;
        if (index == this.playList.length) {
          index = 0;
        }
        this.SET_CURRENTINDEX(index);
        if (!this.playing) {
          this.togglePlaying();
        }
      }
      this.songReady = false;
    },
    prev() {
      if (!this.songReady) {
        return;
      }
      if (this.playList.length == 1) {
        this.loop();
        return;
      } else {
        let index = this.currentIndex - 1;
        if (index == -1) {
          index = this.playList.length - 1;
        }
        this.SET_CURRENTINDEX(index);
      }
      this.songReady = false;
    },
    loop() {
      // 当前音乐的播放时长
      this.$refs.audio.currentTime = 0;
      // 播放当前音乐
      this.$refs.audio.play();

      if (this.currentLyric) {
        this.currentLyric.seek(0);
      }
    },
    ready() {
      this.songReady = true;
      this.savePlayHistory(this.currentSong);
    },
    end() {
      if (this.mode == playMode.loop) {
        this.loop();
      } else {
        this.next();
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
    showList() {
      this.$refs.playList.show();
    },
    getLyric() {
      this.currentSong
        ._getLyric()
        .then(res => {
          // console.log('DSDSDSD')
          // if (this.currentSong.lyric !== res.lrc.lyric) {
          //   return;
          // }
          console.log(res);
          this.currentLyric = new Lyric(res.lrc.lyric, this.handleLyric);
          console.log(this.currentLyric);
          if (this.playing) {
            this.currentLyric.play();
          }
        })
        .catch(e => {
          this.currentLyric = null;
          this.playingLyric = "";
          this.currentLineNum = 0;
        });
    },
    getComment() {
      this.comment = [];
      this.hotComments = [];
      this.currentSong._getComment().then(res => {
        this.total = res.total;
        this.hotComments = res.hotComments;
        this.comment = res.comments;
      });
    },
    handleLyric({ lineNum, txt }) {
      this.currentLineNum = lineNum;
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5];
        this.$refs.lyricList.scrollToElement(lineEl, 1000);
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000);
      }
      this.playingLyric = txt;
    },
    middleTouchStart(e) {
      //初始化标识位 标识已经初始化过了
      this.touch.initiated = true;
      const touch = e.touches[0];
      this.touch.startX = touch.pageX;
      this.touch.startY = touch.pageY;
    },
    middleTouchMove(e) {
      if (!this.touch.initiated === true) {
        return;
      }
      const touch = e.touches[0];
      const deltaX = touch.pageX - this.touch.startX;
      console.log(deltaX);
      const deltaY = touch.pageY - this.touch.startY;
      if (Math.abs(deltaX) < Math.abs(deltaY)) {
        return;
      }
      const left = this.currentShow === "cd" ? 0 : -window.innerWidth;
      console.log(left);
      const offsetWidth = Math.min(
        0,
        Math.max(-window.innerWidth, left + deltaX)
      );
      console.log(offsetWidth);
      this.touch.percent = Math.abs(offsetWidth / window.innerWidth);
      this.$refs.lyricList.$el.style[
        transform
      ] = `translateX(${offsetWidth}px)`;
      this.$refs.lyricList.$el.style[transitionDuration] = 0;
      this.$refs.middleL.style.opacity = 1 - this.touch.percent;

      this.$refs.middleL.style[transitionDuration] = 0;
    },
    middleTouchEnd(e) {
      let offsetWidth;
      let opacity;
      if (this.currentShow === "cd") {
        if (this.touch.percent > 0.1) {
          offsetWidth = -window.innerWidth;
          this.currentShow = "lyric";
          opacity = 0;
        } else {
          offsetWidth = 0;
          opacity = 1;
        }
      } else {
        if (this.touch.percent > 0.5) {
          offsetWidth = 0;
          this.currentShow = "cd";
          opacity = 1;
        } else {
          //没有滑动
          offsetWidth = -window.innerWidth;
          opacity = 0;
        }
      }
      const time = 300;
      this.$refs.lyricList.$el.style[
        transform
      ] = `translateX(${offsetWidth}px)`;
      this.$refs.lyricList.$el.style[transitionDuration] = `${time}ms`;
      this.$refs.middleL.style.opacity = opacity;
      this.$refs.middleL.style[transitionDuration] = `${time}ms`;
      this.touch.initiated = false;
    },
    ...mapMutations([
      "SET_FULLSCREEN",
      "SET_PLAYING_STATE",
      "SET_CURRENTINDEX",
      "SET_MODE",
      "SET_PLAYLIST"
    ]),
    ...mapActions(["savePlayHistory", "deleteFavoriteList", "saveFavoriteList"])
  },
  components: {
    ProgressBar,
    PlayList,
    BaseScroll,
    MvComment
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!newSong.id) {
        return;
      }
      if (newSong.id === oldSong.id) {
        return;
      }
      //   this.rate = this.percent *100
      // 需要理解
      if (this.currentLyric) {
        this.currentLyric.stop();
        this.currentTime = 0;
        this.playingLyric = "";
        this.currentLineNum = 0;
      }
      this.$nextTick(() => {
        this.$refs.audio.play();
        this.getLyric();
        this.getComment();
      });
      // clearTimeout(this.timer)
      // this.timer = setTimeout(() => {
      //   this.$refs.audio.play();
      //   this.getLyric();
      //   this.getComment()
      // },1000)
    },
    playing(newPlaying) {
      // if (!newPlaying) { return }
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        newPlaying ? this.$refs.audio.play() : this.$refs.audio.pause();
      }, 1000);
    },
    percent(val) {
      this.rate = val * 100;
    }
  }
};
</script>
<style lang="less" scoped>
@import '~common/less/mixin.less';
@import '~common/less/variable.less';

.player {
  .normal-player {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: #222;
    z-index: 150;

    &.normal-enter {
      opacity: 0;

      .top {
        transform: translate3d(0, -100%, 0);
      }

      .bottom {
        transform: translate3d(0, 100%, 0);
      }
    }

    &.normal-leave-to {
      opacity: 0;

      .top {
        transform: translate3d(0, -100%, 0);
      }

      .bottom {
        transform: translate3d(0, 100%, 0);
      }
    }

    &.normal-enter-active {
      transition: all 0.4s;

      .top, .bottom {
        transition: all 0.4s cubic-bezier(0.34, 0.3, 1, 0.13);
      }
    }

    &.normal-leave-active {
      transition: all 0.4s;

      .top, .bottom {
        transition: all 0.4s cubic-bezier(0.34, 0.3, 1, 0.13);
      }
    }

    .background {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      filter: blur(25px);
      z-index: -1;

      .img {
        height: 100%;
        width: 100%;
      }
    }

    .top {
      position: relative;
      margin-bottom: 20px;

      .album {
        text-align: left;
        line-height: 40px;
        font-size: 16px;
        width: 70%;
        margin: 0 auto;
        .no-wrap;
      }

      .singer {
        font-size: 12px;
        padding-left: 60px;
      }

      .back {
        position: absolute;
        top: 0;
        left: 6px;

        .iconshouqi {
          display: block;
          font-size: 22px;
          padding: 10px;
        }
      }
    }

    .middle {
      position: fixed;
      top: 80px;
      bottom: 170px;
      width: 100%;
      white-space: nowrap;

      .middle-r {
        width: 100%;
        display: inline-block;
        height: 100%;
        vertical-align: top;
        overflow: hidden;

        .lyric-wrapper {
          text-align: center;
          width: 80%;
          margin: 0 auto;
          overflow: hidden;

          .lyric-item {
            font-size: 14px;
            line-height: 32px;
            color: hsla(0, 0%, 100%, 0.5);

            &.current {
              color: #fff;
              font-weight: 600;
            }
          }
        }
      }

      .middle-l {
        width: 100%;
        display: inline-block;
        vertical-align: top;
        height: 0;
        padding-top: 80%;
        position: relative;

        .playing-lyric {
          text-align: center;
          margin: 60px auto 0;
          width: 80%;
          overflow: hidden;

          .txt {
            font-size: 14px;
            font-weight: 600;
            line-height: 20px;
            color: #ffffff;
          }
        }

        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 33px;
          width: 80%;
          height: 100%;

          .baseCls {
            width: 60px;
            height: 144px;
            position: absolute;
            top: -65px;
            left: 135px;
            transform-origin: 0 0;
            transition: transform 0.5s ease;

            &.neeldeCls {
              transform: rotate(-8deg);
            }

            &.rateCls {
              transform: rotate(-40deg);
            }

            .neeldeImg {
              width: 100%;
              height: 100%;
            }
          }

          .cd {
            width: 100%;
            height: 100%;
            // border 10px solid rgba(255,255,255,0.1)
            box-sizing: border-box;
            border-radius: 50%;
            background-image: url('./disc.png');
            background-repeat: no-repeat;
            background-size: cover;
            position: relative;

            &.cd_play {
              animation: rotate 20s linear infinite;
            }

            &.cd_pause {
              animation-play-state: paused;
            }

            .currenImg {
              width: 60%;
              height: 60%;
              box-sizing: border-box;
              border-radius: 50%;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
        }
      }
    }

    .bottom {
      position: absolute;
      bottom: 30px;
      width: 100%;

      .customer-handle {
        height: 40px;
        width: 100%;
        line-height: 40px;
        display: flex;
        justify-content: space-around;
        box-sizing: border-box;
        padding: 0 10%;

        .iconshoucangdianjihou {
          font-size: 25px;
          color: @color-theme;

          &.icon-favorite {
            color: red;
          }
        }

        .iconxiazai {
          font-size: 25px;
          color: @color-theme;
        }

        .iconpinglun {
          font-size: 25px;
          color: @color-theme;
          position: relative;

          .tag {
            position: absolute;
            font-size: 10px;
            top: -13px;
            right: -22px;
          }
        }
      }

      .dot-wrapper {
        text-align: center;
        font-size: 0;

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
          background-color: rgba(255, 255, 255, 0.5);
          margin: 0 4px;
          vertical-align: cnter;

          &.active {
            background-color: hsla(0, 0%, 100%, 0.5);
            width: 20px;
            border-radius: 5px;
          }
        }
      }

      .progress-wrapper {
        display: flex;
        width: 80%;
        margin: 0 auto;
        justify-content: space-between;
        padding: 10px;
        align-items: center;
        font-size: 12px;

        .progress-bar-wrapper {
          flex: 1;

          .progress-bar {
            height: 30px;

            .bar-inner {
              height: 4px;
              margin: 0 5px;
              background: rgba(0, 0, 0, 0.3);
              position: relative;
              top: 10px;

              .progress {
                position: absolute;
                top: 0;
                height: 100%;
              }

              .btn-wrapper {
                position: absolute;
                top: -13px;
                left: -7px;
                width: 30px;
                height: 30px;

                .btn {
                  position: relative;
                  width: 16px;
                  height: 16px;
                  border-radius: 50%;
                  background: #ffcd32;
                  box-sizing: border-box;
                  border: 3px solid #fff;
                  left: 7px;
                  top: 7px;
                }
              }
            }
          }
        }
      }

      .operateors {
        display: flex;
        align-items: center;

        .icon {
          flex: 1;
          color: #ffcd32;

          span {
            font-size: 30px;
          }
        }

        .i_right {
          text-align: right;
        }

        .i_left {
          text-align: left;

          .icon-favorite {
            color: red;
          }
        }

        .i_center {
          text-align: center;

          .iconbofang3 {
            font-size: 40px;
          }

          .iconbofang2 {
            font-size: 40px;
          }
        }
      }
    }
  }

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

      .iconyoujiantou {
        color: @color-theme;
        margin-left: 20px;
        font-size: 20px;
      }

      .back-title-sub {
        font-size: 16px;
      }
    }

    .review {
      position: fixed;
      top: 50px;
      bottom: 0;
      width: 100%;
    }
  }

  .mini-player {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 60px;
    width: 100%;
    background: #333;
    z-index: 151;
    display: flex;
    align-items: center;

    &.mini-enter {
      opacity: 0;
    }

    &.mini-leave-to {
      opacity: 0;
    }

    &.mini-enter-active {
      transition: all 0.4s;
    }

    &.mini-leave-active {
      transition: all 0.4s;
    }

    .icon {
      flex: 0 0 40px;
      width: 40px;
      padding: 0 10px 0 20px;

      .img-icon {
        border-radius: 50%;
        width: 40px;
        height: 40px;

        &.cd_play {
          animation: rotate 20s linear infinite;
        }

        &.cd_pause {
          animation-play-state: paused;
        }
      }
    }

    .text {
      flex: 1;
      line-height: 20px;

      .name {
        font-size: 14px;
        width: 200px;
        .no-wrap;
      }

      .desc {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.3);
      }
    }

    .control {
      flex: 0 0 30px;
      width: 30px;
      margin-right: 15px;

      .circle {
        width: 30px !important;
        height: 30px !important;
      }

      .icon-mini {
        position: absolute;
        top: 6px;
        left: 7px;
        font-size: 16px;
      }
    }

    .list {
      flex: 0 0 30px;
      width: 30px;
      padding-right: 6px;

      .iconbofangliebiao {
        font-size: 30px;
      }
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
