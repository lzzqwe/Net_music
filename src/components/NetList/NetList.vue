<template>
  <div class="list">
    <slide-bar :title="title"></slide-bar>
    <div class="lis">
      <van-tabs @change="onChange" @click="onClick" v-model="active" swipeable>
        <van-tab :key="index" v-for="(item,index) in sub" :title="item.name">
          <base-scroll
            :pullup="pullup"
            ref="listContent"
            :data="playlist"
            class="list-content"
            @scrollToEnd="loadMore"
          >
            <base-list @select="selectItem" :list="playlist"></base-list>
          </base-scroll>
        </van-tab>
      </van-tabs>
      <div class="loading-container" v-show="!playlist.length">
        <van-loading type="spinner" color="#1989fa">加载中...</van-loading>
      </div>
    </div>
    <transition name="van-slide-down">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import { getSongClassify, getPlayList } from "api/index.js";
import BaseList from "base/BaseList/BaseList";
import BaseScroll from "base/BaseScroll/BaseScroll";
import SlideBar from "base/SlideBar/SlideBar";
import { mapMutations } from "vuex";
import { playListMixin } from "common/js/mixin.js";
export default {
  name: "NetList",
  mixins: [playListMixin],
  data() {
    return {
      active: 0,
      sub: [],
      playlist: [],
      cat: "全部歌单",
      limit: 50,
      offset: 0,
      title: "歌单",
      pullup: true,
      hasMore: true
    };
  },
  created() {
    this._getSongClassify();
    this._getPlayList();
  },
  components: {
    BaseList,
    BaseScroll,
    SlideBar
  },
  methods: {
    listBack() {
      this.$router.back();
    },
    handlePlaylist(playList) {
      // console.log(this.$refs.listContent)
      const bottom = playList.length > 0 ? "60px" : 0;
      // this.$refs.listContent.style.bottom = bottom
      document.querySelector(".list-content").style.bottom = bottom;
    },
    loadMore() {
      if (!this.hasMore) {
        this.$toast("哥 已经到底了,没有数据了");
        return;
      }
      this.offset = this.offset + 50;
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      this._getPlayList();
    },
    _hasMore(data) {
      if (!data.length) {
        this.hasMore = false;
      }
    },
    async _getSongClassify() {
      const { all, sub, code } = await getSongClassify();
      if (code === 200) {
        this.sub = this.sub.concat(all, sub).slice(0, 10);
      }
    },
    async _getPlayList() {
      const { playlists, code } = await getPlayList(
        this.cat,
        this.limit,
        this.offset
      );
      if (code === 200) {
        this.playlist = this.playlist = this.playlist.concat(playlists);
        this._hasMore(this.playlist);
      }
    },
    onClick(name, title) {
      this.cat = title;
    },
    onChange(name, title) {
      this.cat = title;
    },
    selectItem(item) {
      this.$router.push({
        path: `/list/${item.id}`
      });
      this.setDisc(item);
    },
    ...mapMutations({
      setDisc: "SET_DISC"
    })
  },
  watch: {
    cat(newValue, oldValue) {
      if (newValue === oldValue) {
        return;
      }
      this.playlist = [];
      this._getPlayList();
    }
  }
};
</script>
<style lang="less" scoped>
@import '~common/less/variable.less';

.list {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: @color-background;

  .lis {
    position: fixed;
    top: 50px;
    width: 100%;
  }
}

.list-content {
  position: fixed;
  top: 94px;
  bottom: 0;
  width: 100%;
  z-index: -1;
}

.loading-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
}
</style>