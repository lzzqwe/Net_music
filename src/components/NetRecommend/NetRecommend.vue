<template>
  <div ref="recommend" class="recommend">
    <base-scroll ref="recommendContent" class="recommend-content" :data="newList">
      <div>
        <van-swipe v-if="banner.length" :autoplay="3000" indicator-color="white">
          <van-swipe-item :key="index" v-for="(item,index) in banner">
            <img @load="loadImage" class="img" width="100%" :src="item.pic" alt />
          </van-swipe-item>
        </van-swipe>
        <div class="sub">
          <template   v-for="(item,index) in this.navObj">
            <router-link :key='index' :to='item.path' tag="div" class="sub-item">
              <img class="sub-img" :src="item.imgUrl" alt />
              <p class="sub-title">{{item.title}}</p>
            </router-link>
          </template>
          <!-- <router-link to="/list" tag="div" class="sub-item">
            <img class="sub-img" src="http://indust-creation.icci.top/nav1.png" alt />
            <p class="sub-title">歌单</p>
          </router-link>
          <router-link to="/rank" tag="div" class="sub-item">
            <img class="sub-img" src="http://indust-creation.icci.top/nav2.png" alt />
            <p class="sub-title">排行榜</p>
          </router-link>
          <router-link to="/singer" tag="div" class="sub-item">
            <img class="sub-img" src="http://indust-creation.icci.top/nav3.png" alt />
            <p class="sub-title">歌手</p>
          </router-link>
          <a href="https://github.com/lzzqwe/Net_music.git" class="sub-item">
            <img class="sub-img" src="http://indust-creation.icci.top/nav4.png" alt />
            <p class="sub-title">项目地址</p>
          </a> -->
        </div>
        <div class="recommend-list">
          <h5 class="title">热门歌单推荐</h5>
          <div class="recommend-sub-title">
            <h3 class="good-listen-title">为你精挑细选</h3>
            <router-link tag="div" to="/list" class="moretext">查看更多</router-link>
          </div>
          <van-swipe :autoplay="5000" @change="onChange" :stop-propagation="false">
            <van-swipe-item :key="index" v-for="(item,index) in result">
              <!-- <div class="recommd-item">
                  <div :key='index'  @click="selectItem(lis)" class="disc-item" v-for="(lis,index) in item">
                    <img class="icon" :src="lis.picUrl" alt="">
                    <p class="text">{{ lis.name }}</p>
                    <span class="iconfont iconbofangliang"></span>
                    <span class="play-count">{{ _nomalNum(lis.playCount,2)}}</span>
                  </div>
              </div>-->
              <base-list @select="selectItem" :key="index" :list="item"></base-list>
            </van-swipe-item>
            <div class="custom-indicator" slot="indicator">{{ current + 1 }}/2</div>
          </van-swipe>
          <div class="selection">
            <h5 class="title">风格推荐</h5>
            <div class="recommend-sub-title">
              <h3 class="good-listen-title">好听的话语歌曲精选</h3>
              <!-- <router-link tag='div' to='/newSong' class='moretext'>更多新歌</router-link>  -->
            </div>
            <div
              @click="selectSongItem(item,index)"
              :key="index"
              class="song-select"
              v-for="(item,index) in newList"
            >
              <img class="song-img" :src="item.image" alt />
              <div class="sub-song">
                <div class="songs-name">
                  <span class="songs-title">{{ item.name }}</span>
                  <span class="singer-name">{{ item.singer }}</span>
                </div>
                <div class="play">
                  <span :class="{playShow:nowIndex===index}" class="iconfont iconbofang2"></span>
                  <span :class="{active:nowIndex===index}" class="iconfont iconbofang3"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="loading-container" v-show="!result.length">
          <van-loading type="spinner" color="#1989fa">加载中...</van-loading>
        </div>
      </div>
    </base-scroll>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import { getlunbo, getRecommend, getNewSong } from "api/index.js";

import BaseScroll from "base/BaseScroll/BaseScroll";

import BaseList from "base/BaseList/BaseList";

import { mapMutations, mapGetters, mapActions } from "vuex";

import { playListMixin } from "common/js/mixin.js";

import { createSong } from "common/js/song.js";

import { navObj } from "common/js/config.js";

export default {
  name: "Recommend",
  mixins: [playListMixin],
  data() {
    return {
      banner: [],
      result: [],
      current: 0,
      newList: [],
      nowIndex: -1,
      type: 0
    };
  },
  components: {
    BaseScroll,
    BaseList
  },
  created() {
    this._getNewSong();
    this._getRecommend();
    this._getLunbo();
    this.navObj = navObj
  },
  methods: {
    async _getLunbo() {
      const { banners } = await getlunbo();
      this.banner = banners;
    },
    handlePlaylist(playList) {
      const bottom = playList.length > 0 ? "60px" : 0;
      this.$refs.recommend.style.bottom = bottom;
    },
    onChange(index) {
      this.current = index;
    },
    selectSongItem(item, index) {
      this.nowIndex = index;
      this.selectPlay({
        list: this.newList,
        index
      });
    },
    async _getNewSong() {
      const { data, code } = await getNewSong(this.type);
      if (code === 200) {
        const lis = data.slice(0, 10);
        const list = lis;
        // this.newList = list
        this.newList = this._nomalize(list);
      }
    },
    _nomalize(list) {
      let songlist = list.map(item => {
        if (item.album && item.artists) {
          return createSong({
            id: item.id,
            name: item.name,
            mid: item.album.id,
            singer: item.artists[0].name,
            album: item.album.name,
            image: item.album.picUrl,
            duration: item.duration / 1000
          });
        }
      });
      return songlist;
    },
    async _getRecommend() {
      const { result } = await getRecommend();
      // this.result = this.result.concat(result)
      let arr1 = [];
      let a = result.slice(0, 3);
      let b = result.slice(3);
      arr1.push(a, b);
      this.result = arr1;
    },
    selectItem(item) {
      this.$router.push({
        path: `/recommend/${item.id}`
      });
      this.setDisc(item);
    },
    loadImage() {
      if (!this.checkloaded) {
        this.checkloaded = true;
        this.$refs.recommendContent.refresh();
      }
    },
    ...mapMutations({
      setDisc: "SET_DISC"
    }),
    ...mapActions(["selectPlay"])
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';

.recommend >>> .img {
  display: block;
  border-radius: 5px;
}

.recommend-list >>> .van-card__thumb {
  width: 60px;
  height: 60px;
}

.recommend >>> .custom-indicator {
  position: absolute;
  right: 0;
  bottom: 5px;
  color: $color-theme-d;
  font-size: 12px;
}

.recommend {
  position: fixed;
  top: 55px;
  bottom: 0;
  width: 100%;

  .recommend-content {
    height: 100%;
    overflow: hidden;
    padding: 0 15px;

    .sub {
      display: flex;
      justify-content: space-around;
      margin: 10px 0 30px 0;

      .sub-item {
        width: 55px;
        height: 55px;

        .sub-img {
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }

        .sub-title {
          font-size: 12px;
          line-height: 20px;
          margin-top: 5px;
          text-align: center;
          color: #FFFF;
        }
      }
    }

    .recommend-list {
      .title {
        text-align: left;
        line-height: 40px;
        font-size: $font-size-small-s;
        color: #B6B6B6;
      }

      .recommend-sub-title {
        display: flex;
        justify-content: space-between;
        line-height: 40px;
        box-sizing: border-box;
        height: 40px;
        align-items: center;

        .good-listen-title {
          font-size: 18px;
        }

        .moretext {
          border: 1px solid $color-theme-d;
          padding: 0 5px;
          font-size: 12px;
          border-radius: 5px;
          height: 30px;
          line-height: 30px;
          color: $color-dialog-background;
        }
      }

      .selection {
        .song-select {
          display: flex;
          padding: 10px;

          .song-img {
            margin-right: 10px;
            width: 60px;
            height: 60px;
            flex: 0 0 60px;
            border-radius: 5px;
          }

          .sub-song {
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .songs-name {
              line-height: 35px;

              .songs-title {
                margin-right: 10px;
                font-size: 14px;
              }

              .singer-name {
                font-size: 10px;
                color: $color-theme-d;
              }
            }

            .play {
              .iconbofang2 {
                font-size: 25px;
                color: $color-sub-theme;

                &.playShow {
                  display: none;
                }
              }

              .iconbofang3 {
                font-size: 25px;
                display: none;
                color: $color-theme;

                &.active {
                  display: block;
                }
              }
            }
          }
        }
      }
    }

    .loading-container {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .fade-enter {
    opacity: 0;
    transform: translateX(100%);
  }

  .fade-leave-to {
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all 0.5s ease;
  }
}
</style>
