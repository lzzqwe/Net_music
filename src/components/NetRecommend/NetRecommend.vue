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
          <template v-for="(item,index) in this.navObj">
            <router-link :key="index" :to="item.path" tag="div" class="sub-item">
              <img class="sub-img" :src="item.imgUrl" alt />
              <p class="sub-title">{{item.title}}</p>
            </router-link>
          </template>
        </div>
        <div class="recommend-list">
          <h5 class="title">热门歌单推荐</h5>
          <div class="recommend-sub-title">
            <h3 class="good-listen-title">为你精挑细选</h3>
            <router-link tag="div" to="/list" class="moretext">查看更多</router-link>
          </div>
          <van-swipe :autoplay="5000" @change="onChange" :stop-propagation="false">
            <van-swipe-item :key="index" v-for="(item,index) in result">
              <base-list @select="selectItem" :key="index" :list="item"></base-list>
            </van-swipe-item>
            <div class="custom-indicator" slot="indicator">{{ current + 1 }}/2</div>
          </van-swipe>
          <div class="selection">
            <h5 class="title">风格推荐</h5>
            <div class="recommend-sub-title">
              <h3 class="good-listen-title">好听的话语歌曲精选</h3>
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
    this.navObj = navObj;
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
<style lang="less" scoped>
@import '~./NetRecommend.less';
</style>
