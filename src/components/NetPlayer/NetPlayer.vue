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
          @touchend="middleTouchEnd"
          class="middle"
        >
          <div ref="middleL" class="middle-l">
            <div ref="cdWrapper" class="cd-wrapper">
              <div :class="cdCls">
                <img class="currenImg" v-lazy="currentSong.image" alt />
              </div>
              <div class="baseCls" :class="neeldeCls">
                <img class="neeldeImg" src="./needle.png" alt="">
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
            <span :class="getFavoriteCls(currentSong)"
                @click="handleFavorite(currentSong)" class="iconfont iconshoucangdianjihou"></span>
            <span class="iconfont iconxiazai"></span>
            <span  @click='_showComment' class="iconfont iconpinglun">
              <span class='tag'>{{_totalCount()}}</span>
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
          <img
            :class="cdCls"
            class="img-icon"
            width="40"
            height="40px"
            :src="currentSong.image"
            alt
          />
        </div>
        <div class="text">
          <h2 class="name">{{ currentSong.name }}</h2>
          <p class="desc">{{ currentSong.singer }}</p>
        </div>
        <div class="control">
          <van-circle 
          v-model="currentRate1"
          :speed="100" 
          :size='30'
          :color='color'
          :rate="rate"
          :stroke-width="60"
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
    <transition name='van-fade'>
    	<div v-show='flag' class='comment'>
        <div class="back">
           <span @click="Back" class="iconfont iconyoujiantou"></span>
           <span style="margin-left:15px">{{title}}</span>
        </div>
        <base-scroll :delayTime='delayTime' :data='comment' class="review">
          <div>
          	<mv-comment :hotComments='hotComments'></mv-comment>
        	  <mv-comment title="最近评论" :hotComments="comment">
            </mv-comment>
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
<script>
import animations from "create-keyframe-animation";
import Lyric from "lyric-parser";
import BaseScroll from "base/BaseScroll/BaseScroll";
import { prefixStyle } from "common/js/dom";
import { mapGetters, mapMutations, mapActions } from "vuex";
import MvComment from 'base/MvComment/MvComment'
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
      currentRate1:0,
      color:'red',
      rate:0,
      comment:[],
      total:null,
      title:'评论',
      flag:false,
      hotComments:[],
      delayTime:1000
    };
  },
  created() {
    this.touch = {};
  },
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
        this.flag = true
    },
    Back() {
        this.flag = false
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
      this.showComment()
    },
    _totalCount() {
      if(this.total>10000) {
        return '1w+'
      } else if(this.total>1000) {
        return '999+'
      }
      return this.total
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
      this.$refs.audio.currentTime = 0;
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
      this.currentSong._getLyric().then(res => {
      	// console.log('DSDSDSD')
        // if (this.currentSong.lyric !== res.lrc.lyric) {
        //   return;
        // }
        console.log(res)
        this.currentLyric = new Lyric(res.lrc.lyric, this.handleLyric);
        console.log(this.currentLyric);
        if (this.playing) {
          this.currentLyric.play();
        }
      }).catch((e) => {
         this.currentLyric = null
         this.playingLyric = ''
         this.currentLineNum = 0 
      })
    },
    getComment() {
    	this.comment=[]
      this.hotComments=[]
      this.currentSong._getComment().then((res) => {
        this.total = res.total
        this.hotComments = res.hotComments
        this.comment = res.comments
      })
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
      //初始化标识位
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
      this.$refs.lyricList.$el.style.transform = `translateX(${offsetWidth}px)`;
      this.$refs.lyricList.$el.style.transitionDuration = 0;
      this.$refs.middleL.style.opacity = 1 - this.touch.percent;

      this.$refs.middleL.style.transitionDuration = 0;
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
      this.$refs.lyricList.$el.style.transform = `translateX(${offsetWidth}px)`;
      this.$refs.lyricList.$el.style.transitionDuration = `${time}ms`;
      this.$refs.middleL.style.opacity = opacity;
      this.$refs.middleL.style.transitionDuration = `${time}ms`;
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
        this.getComment()
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
      this.rate = val*100
    }
  }
};
</script>
<style lang="stylus" scoped>
@import './NetPlayer.styl';
</style>