<template>
  <div class="recommend-content-wrap">
    <div ref="nav" class="nav-bar-wrap">
      <nav-bar  :bar-title="barTitle"></nav-bar>
      <div
        :style="{backgroundImage:`url(${banners[0].pic})`,opacity:opacity}"
        class="bgc"
      ></div>
    </div>
    <base-sticky @play="playAll" :style="paddingStyle" v-show="showPlay"></base-sticky>
    <base-scroll
      :bounce="bounce"
      :data="list"
      :probe-type="probeType"
      :listen-scroll="listenScroll"
      @onscroll="scroll"
      class="day-recommend-wrap"
      ref="recommend"
    >
      <div>
        <div ref="dayRecommend" :style="{backgroundImage:`url(${banners[0].pic})`,opacity:1-opacity}"  class="day-recommend">
          <div class="date">
            <div class="title">
              <span class="large">{{day}}</span>/
              <span class="small">{{month}}</span>
            </div>
            <div class="history-recommend">
              <span>历史日推</span>
              <span class="iconfont iconVIP-"></span>
            </div>
          </div>
        </div>
        <div class="recommend-content">
          <base-sticky @play="playAll"></base-sticky>
          <ul class="play-list">
            <li @click="playSong(index)" :key="item.id" class="play-item" v-for="(item,index) in list">
              <div class="Thumbnails">
                <img class="icon-img" v-lazy="item.picUrl" alt="">
              </div>
              <div class="text">
                <div class="content">
                  <h1 class="name">{{item.name}}</h1>
                  <div class="desc">
                    <span class="iconfont icondujia"></span>
                    <span class="iconfont iconsq"></span>
                    <span>{{item.singer}}-{{item.name}}</span>
                  </div>
                </div>
                <div class="play-icon">
                  <span v-show="item.mvId" class="iconfont iconbofang6"></span>
                  <span class="iconfont iconsandian"></span>
                </div>
              </div>
            </li>
          </ul>
          <net-loading v-show="!this.list.length"></net-loading>
        </div>
      </div>
    </base-scroll>
  </div>
</template>

<script>
  import {getDayRecommend} from '../api/index.js'
  import moment from 'moment'
  import {createSong} from '../common/js/song'
  import BaseScroll from "./BaseScroll";
  import BaseSticky from "./BaseSticky";
  import NavBar from "./NavBar";
  import NetLoading from "./NetLoading";
  import {mapActions,mapGetters} from 'vuex'
  export default {
    name: "RecommendContent",
    components:{
      NavBar,
      BaseScroll,
      BaseSticky,
      NetLoading
    },
    data() {
      return {
        list:[],
        showPlay:false,
        listenScroll:true,
        probeType:3,
        bounce: {
          top: false,
          bottom: true,
          left: true,
          right: true
        },
        barTitle:'',
        paddingStyle:{
          padding:'22px 24px 22px 24px'
        },
        scrollY:0,
        opacity:0,
        day:0,
        month:0
      }
    },
    created() {
      this._getDayRecommend()
      this.getNowtime()
    },
    mounted() {
      this.handlePlaylist(this.playList)
    },
    computed:{
      ...mapGetters(['banners','playList'])
    },
    methods:{
      playAll() {
        this.select_play({playlist:this.list,index:0})
      },
      getNowtime() {
        const seconds = Date.now()
        const date = new Date(seconds)
        this.day = date.getDate()
        this.month = date.getMonth()+1
      },
      handlePlaylist(playList) {
        if(playList.length>0) {
          this.$refs.recommend.$el.classList.add('bottom')
        } else {
          this.$refs.recommend.$el.classList.remove('bottom')
        }
        this.$refs.recommend.refresh()
      },
      async _getDayRecommend() {
        const res = await getDayRecommend()
        if(res.code===200) {
          this.list = this._createSong(res.data.dailySongs)
        }
      },
      playSong(index) {
        this.select_play({playlist:this.list,index})
      },
      ...mapActions(['select_play']),
      _createSong (list) {
        const result= []
        list.forEach((item) => {
          result.push(createSong({id:item.id,
            picUrl:item.al.picUrl,
            duration:item.dt,
            singer:item.ar[0].name,
            name:item.name,
            mvId:item.mv
          }))
        })
        return result
      },
      scroll(pos) {
        this.scrollY = Math.abs(pos.y)
      }
    },
    watch:{
      scrollY(newValue,oldValue) {
        const height = this.$refs.dayRecommend.clientHeight-this.$refs.nav.clientHeight
        const percent = newValue/height
        if(percent>1) {
          this.opacity =1
          this.showPlay = true
          this.barTitle='每日推荐'
        } else {
          this.opacity = 1*percent
          this.showPlay = false
          this.barTitle =''
        }
      },
      playList(newValue) {
        this.handlePlaylist(newValue)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../common/less/mixin.less';
  .recommend-content-wrap {
    position: fixed;
    top:0;
    bottom: 0;
    width: 100%;
    background-color: var(--body-bgcolor);
    color: var(--font-color);
    .nav-bar-wrap {
      position: fixed;
      top:0;
      left: 0;
      right: 0;
      z-index:15;
      padding: 0 24px;
      overflow: hidden;
      color: #ffffff;
      .bgc {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        filter: blur(10px);
        background-position: 50%;
        background-size: cover;
        background-repeat: no-repeat;
        opacity: 0;
        transform: scale(3);
        z-index: -1;
      }
    }
    .backgroud {
      height: 32px;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 15;
    }
    .day-recommend-wrap {
      position: fixed;
      top: 0;
      bottom: 0;
      width: 100%;
      &.bottom {
        bottom: 82px;
      }
      .day-recommend {
        height: 300px;
        box-sizing: border-box;
        padding: 32px 24px 0 24px;
        background-size: cover;
        background-repeat: no-repeat;
        color: rgb(233,255,255);
        .date {
          margin-top: 123px;
          .title {
            font-size: 20px;
            .large {
              font-size: 38px;
            }
          }
          .history-recommend {
            margin-top: 15px;
            width: 140px;
            height: 37px;
            font-size: 18px;
            background-color: rgb(252,228,223);
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgb(49,47,45);
            border-radius: 15px;
            .iconVIP- {
              margin-left: 5px;
            }
          }
        }
      }
      .recommend-content {
        padding: 0 24px;
        .play-all {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 22px 0 22px 0;
          position: sticky;
          top: 82px;
          .play {
            font-size: 23px;
            .iconbofang7 {
              font-size: 30px;
              margin-right: 23px;
              background-color: rgb(255,64,49);
              color: rgb(255,255,255);
              border-radius: 50%;
            }
          }
          .iconquanxuan {
            color: rgb(51,51,51);
            font-size: 30px;
          }
        }
        .play-list {
          margin-top: 14px;
          .play-item {
            display: flex;
            margin-bottom: 30px;
            &:last-child {
              margin-bottom: 0;
            }
            .Thumbnails {
              width: 61px;
              height: 61px;
              flex: 0 0 61px;
              .icon-img {
                width: 100%;
                height: 100%;
                border-radius: 5px;
              }
            }
            .text {
              flex: 1;
              display: flex;
              justify-content: space-between;
              .content {
                margin-left: 15px;
                .name {
                  font-size: 20px;
                  margin-top: 6px;
                  margin-bottom: 14px;
                  width: 330px;
                  .no-wrap();
                }
                .desc {
                  font-size: 16px;
                  color: rgb(128,128,128);
                  width: 330px;
                  .no-wrap();
                  .icondujia {
                    margin-right: 5px;
                    color: rgb(246,162,159);
                  }
                  .iconsq {
                    color: rgb(225,113,71);
                  }
                }
              }
              .play-icon {
                .iconbofang6 {
                  font-size: 27px;
                  margin-right: 34px;
                  color: rgb(179,179,179);
                }
                .iconsandian {
                  font-size: 27px;
                  color: rgb(179,179,179);
                }
              }
            }
          }
        }
      }
    }

  }
</style>
