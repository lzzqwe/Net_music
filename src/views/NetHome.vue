<template>
  <div class="net-home-wrap">
    <div class="search">
      <span @click="toggleSetting" class="iconfont iconliebiao"></span>
      <div @click="showSearch" class="search-input">
        <span class="iconfont iconsousuo"></span>
        <span>en</span>
      </div>
      <span class="iconfont icontinggeshiqu40x40"></span>
    </div>
    <Scroll
      ref="netHome"
      :update-data="[privateMusic]"
      @pullingDown="loadRefresh"
      class="net-home">
      <div class="net-home-content">
        <div ref="swiperContainer" class="swiper-container">
          <div class="swiper-content">
            <van-swipe  class="my-swipe" indicator-color="white">
              <van-swipe-item :key="item.bannerId" v-for="(item) in banners">
                <img class="swip-item-img" width="100%" v-lazy="item.pic" alt="">
              </van-swipe-item>
            </van-swipe>
          </div>
        </div>
        <base-scroll :scroll-x='scrollX' class="net-nav-wrap">
          <ul ref='navCotent' class="nav-content">
            <router-link
              :to="handleString(item.url)"
              tag="li"
              :key="item.id" v-for="(item) in navIcon"
              class="nav-item"
              ref="navItem"
            >
              <div class="nav-icon">
                <img v-lazy="item.iconUrl" class="img"  alt="">
              </div>
              <p class="text">{{item.name}}</p>
            </router-link>
          </ul>
        </base-scroll>
        <base-section :recommend-list="recommednList" title="推荐歌单"></base-section>
        <base-divder></base-divder>
        <div class="private-custom-made">
          <div class="custom-made-title">
            <h3 class="title">私人定制</h3>
            <div class="refresh">
              <span class="iconfont iconrefresh"></span>歌声里藏着故事
            </div>
          </div>
          <div @click="playAll" class="play-muisc">
            <span :class="_getIcon" class="iconfont"></span>播放
          </div>
          <div class="private-song-wrap">
            <div class="private-song-content">
              <ul class="private-song-list">
                <li @click="selectItem(index)" :key="item.id" v-for="(item,index) in privateMusic" class="item">
                  <div class="cover">
                    <img v-lazy="item.picUrl" class="cover-imgage" alt="">
                    <span class="iconfont iconbofangliang1"></span>
                  </div>
                  <div class="desc">
                    <div class="name">
                      <span class="text">{{item.name}}</span><span class="horizontal">-</span>{{item.singer}}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Scroll>
    <div v-show="!result.length" class="loading-wrap">
      <net-loading></net-loading>
    </div>
    <slider-bar @toggle="toggleSetting" :isShowSetting="isShowSetting"></slider-bar>
    <search-input @close="close" :is-show-search="isShowSearch"></search-input>
  </div>
</template>

<script>
// @ is an alias to /src
import BaseScroll from '../components/BaseScroll';
import NetLoading from "../components/NetLoading";
import BaseSection from "../components/BaseSection";
import BaseDivder from "../components/BaseDivder";
import SearchInput from "../components/SearchInput";
import SliderBar from "../components/SliderBar";
import {getRecommendList,getPrivateMusic,getHomeCircleIcon} from '../api/index.js';
import {createSong} from '../common/js/song';
import {mapActions,mapGetters} from 'vuex';
export default {
  name: 'NetHome',
  components:{
    BaseScroll,
    BaseSection,
    BaseDivder,
    SearchInput,
    SliderBar,
    NetLoading
  },
  created() {
    this.set_banners();
    this._getHomeCircleIcon();
    this.getHomeData()
  },
  mounted() {
    this.handlePlaylist(this.playList);
  },
  data() {
    return {
      scrollX:true,
      isShowSetting:false,
      isShowSearch:false,
      recommednList:[],
      privateMusic:[],
      navIcon:[],
      bacUrl:'',
      delayTime:30,
      result:[]
    }
  },
  computed:{
    _getIcon() {
      return this.playing?'iconzanting':'iconbofang4'
    },
    ...mapGetters(['banners','fullscreen','playList','playing'])
  },
  methods:{
    loadRefresh() {
      setTimeout(() => {
        this.getHomeData();
        this.$refs.netHome.refresh();
      },3000)
    },
    async getHomeData() {
      const res_1 = await getRecommendList()
      const res_2 = await getPrivateMusic()
      const res_3 = await getHomeCircleIcon()
      Promise.all([res_1,res_2,res_3]).then((res) => {
        this.result = res
        this.recommednList =  this.result[0].result;
        this.privateMusic = this._createSong(this.result[1].result);
      })
    },
    handlePlaylist(playList) {
      if(playList.length>0) {
        this.$refs.netHome.$el.classList.add('bottom');
      } else {
        this.$refs.netHome.$el.classList.remove('bottom');
      }
        this.$refs.netHome.refresh();
    },
    playAll() {
      this.select_play({playlist:this.privateMusic,index:0});
    },
    _createSong(res) {
      let result = [];
      res.forEach((item) => {
        result.push(createSong({
          id:item.id,
          picUrl:item.picUrl,
          duration:item.song.duration,
          singer:item.song.artists[0].name,
          name:item.name,
          mvId:item.mv
        }))
      });
      return result;
    },
    selectItem(index) {
      this.select_play({playlist:this.privateMusic,index});
    },
    async _getHomeCircleIcon() {
      const res = await getHomeCircleIcon();
      if(res.code===200) {
        const nav = res.data;
        nav[4].name='mv';
        nav[4].url='orpheus://mv';
        nav[3].url='orpheus://rank';
        this.navIcon = nav;
      }
    },
    handleString(str) {
      return str.slice(9);
    },
    toggleSetting() {
      this.isShowSetting = !this.isShowSetting;
    },
    showSearch() {
      this.isShowSearch = true;
    },
    close() {
      this.isShowSearch = false;
    },
    ...mapActions(['set_banners','select_play'])
  },
  watch:{
    fullscreen() {
      this.$refs.netHome.refresh();
    },
    playList(newValue) {
      this.handlePlaylist(newValue);
    }
  }
}
</script>
<style lang="less" scoped>
@import '~../common/less/variable.less';
.net-home-wrap {
  width: 100%;
  height: 100%;
  background-color: var(--body-bgcolor);
  color: var(--font-color);
  .search {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    box-sizing: border-box;
    display: flex;
    padding: 16px 24px 28px 24px;
    align-items: center;
    color: var(--font-color);
    background-color: var(--body-bgcolor);
    z-index: 10;
    .iconliebiao {
      font-size: 28px;
    }
    .search-input {
      height: 53px;
      flex: 1;
      margin: 0 24px;
      background-color: #fcfcfc;
      border-radius: 25px;
      display: flex;
      align-items: center;
      padding-left: 23px;
      font-size:@font_size_small-s;
      color: #989898;
      .iconsousuo {
        font-size: 30px;
        margin-right: 6px;
      }
    }
    .icontinggeshiqu40x40 {
      font-size: 28px;
    }
  }
  .loading-wrap {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%,-50%,0);
    width: 300px;
  }
  .net-home {
    overflow: hidden;
    position: fixed;
    top: 97px;
    bottom: 0;
    left: 0;
    right: 0;
    &.bottom {
      bottom: 82px;
    }
    .net-home-content {
      .swiper-container {
        background-color: var(--body-bgcolor);
        color: var(--font-color);
        position: relative;
        &:after {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          /*background-image: var(--bacUrl);*/
          filter: blur(200px);
          background-size: 100% 100%;
        }
        .swiper-content {
          padding: 0 24px 0 24px;
          .my-swipe {
            width: 100%;
            overflow: hidden;
            border-radius: 5px;
            .van-swipe-item {
              color: #fff;
              font-size: 20px;
              text-align: center;
              display: inline-block;
              border-radius: 5px;
              overflow: hidden;
              .swip-item-img {
                width: 100%;
                height: 200px;
                border-radius: 5px;
              }
            }
          }
        }
      }
      .net-nav-wrap {
        padding: 24px 0 24px 0;
        margin-left: 24px;
        margin-right: 24px;
        overflow: hidden;
        .nav-content {
          display: flex;
          width: 840px;
          .nav-item {
            padding-right:30px;
            text-align: center;
            &:last-child {
              padding-right: 0;
            }
            .nav-icon {
              width: 75px;
              height: 75px;
              background-color:#8f342d;
              border-radius: 50%;
              margin-bottom: 10px;
              display: flex;
              justify-content: center;
              align-items: center;
              .img {
                width: 33px;
                height: 33px;
              }
            }
            .text {
              font-size: @font_size_small-s;
              width: 75px;
            }
          }
        }
      }
      .private-custom-made {
        margin: 0 24px 0 24px;
        padding-top: 38px;
        position: relative;
        .custom-made-title {
          .title {
            font-size: @font_size_small;
            margin-bottom: 10px;
            color: rgb(179,179,179);
          }
          .refresh {
            font-size: 26px;
            font-weight: 600;
            .iconrefresh {
              font-size: @font_size_large;
              margin-right: 11px;
            }
          }
        }
        .play-muisc {
          position: absolute;
          top: 58px;
          right: 0;
          width: 85px;
          height: 37px;
          border: 1px solid var(--btn-border-color);
          border-radius: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: @font_size_medium-s;
          .iconbofang4 {
            margin-right: 5px;
          }
          .iconzanting {
            margin-right: 5px;
          }
        }
        .private-song-wrap {
          padding: 23px 0;
          .private-song-content {
            .private-song-list {
              .item {
                display: flex;
                width: 468px;
                margin-bottom: 8px;
                &:last-child {
                  margin-bottom: 0;
                }
                .cover {
                  width: 76px;
                  height: 76px;
                  margin-right: 15px;
                  flex: 0 0 76px;
                  position: relative;
                  .cover-imgage {
                    width: 100%;
                    height: 100%;
                    border-radius: 7px;
                  }
                  .iconbofangliang1 {
                    font-size: 24px;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate3d(-50%,-50%,0);
                    color: rgb(255,255,255);
                  }
                }
                .desc {
                  flex: 1;
                  border-bottom: 1px solid rgb(230,230,230);
                  &:last-child {
                    border-bottom: 0;
                  }
                  .name {
                    font-size: @font_size_small;
                    display: flex;
                    align-items: center;
                    color: rgb(153,153,153);
                    margin-top: 15px;
                    margin-bottom: 15px;
                    .text {
                      font-size: @font_size_medium-l;
                      color: rgb(51,51,51);
                    }
                    .horizontal {
                      margin: 0 5px;
                    }
                  }
                  .lyric-overview {
                    padding-bottom: 18px;
                    font-size: @font_size_medium-s;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}



.net-home {
  /deep/ .van-swipe__indicator {
    width: 12px;
    height: 3px;
    border-radius:1px;
  }
}




</style>

