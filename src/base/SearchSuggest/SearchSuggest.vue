<template>
  <base-scroll
    ref="suggest"
    :data="result"
    v-show="query"
    class="suggest"
    :pullup="pullup"
    @scrollToEnd="searchMore"
    :beforeScroll="beforeScroll"
    @beforeScroll="listScroll"
  >
    <!-- <div :key="index" v-for="(item,index) in artist" class="singer">
      <img width="60" height="60" :src="item.picUrl" alt="">
      <span>{{ item.name }}</span>
    </div>-->
    <ul class="suggest-list">
      <li
        class="suggest-item"
        :key="index"
        v-for="(item,index) in result"
        @click="selectItem(item)"
      >
        <div class="icon">
          <span :class="getIconCls(item)"></span>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <van-loading v-show="hasMore" type="spinner" color="#1989fa">加载中...</van-loading>
    </ul>
    <div v-show="!hasMore && !result.length">
      <no-result title="没有搜到任何歌曲"></no-result>
    </div>
  </base-scroll>
</template>
<script>
import NoResult from "base/NoResult/NoResult";
import { getSearch, getSongDetail } from "api/index.js";
import { createSong } from "common/js/song";
import BaseScroll from "base/BaseScroll/BaseScroll";
import { mapMutations, mapActions } from "vuex";
// import Singer from 'common/js/singer'
// const TYPE_SINGER = 'TYPE_SINGER'
export default {
  name: "Suggest",
  components: {
    BaseScroll,
    NoResult
  },
  data() {
    return {
      offset: 0,
      result: [],
      vkey: "",
      hasMore: true,
      pullup: true,
      limit: 15,
      type: 1,
      beforeScroll: true,
      artist: []
    };
  },
  props: {
    query: {
      type: String,
      default: ""
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    async _search() {
      this.offset = 0;
      this.hasMore = true;
      this.result = [];
      const { code, result } = await getSearch(
        this.query,
        this.limit,
        this.offset,
        this.type
      );
      this.result = this.result.concat(result.songs);
      this._hasMore(this.result);
    },
    listScroll() {
      this.$emit("listScroll");
    },
    refresh() {
      this.$refs.suggest.refresh();
    },
    _hasMore(data) {
      // const songs = data.songs
      // 如果没有数组 或是 歌曲数量大于总数
      // this.hasMore = false
      // console.log(songs)
      if (!data.length) {
        this.hasMore = false;
      }
    },
    searchMore() {
      if (!this.hasMore) {
        this.$toast("哥 已经到底了,没有数据了");
        return;
      }
      this.offset++;
      this._search();
    },
    getIconCls(item) {
      if (item.type == "TYPE_SINGER") {
        return "iconfont iconyonghu";
      } else {
        return "iconfont iconicon-test";
      }
    },
    getDisplayName(item) {
      if (item.type == "TYPE_SINGER") {
        return item.singername;
      } else {
        return `${item.name}-${item.artists[0].name}`;
      }
    },
    async selectItem(item) {
      const { songs } = await getSongDetail(item.id);
      // console.log(songs)
      const songItem = songs.map(({ id, name, ar, al, dt }) => {
        return createSong({
          id,
          mid: al.id,
          singer: ar[0].name,
          name,
          album: al.name,
          duration: dt / 1000,
          image: al.picUrl
        });
      });
      // console.log(songList)
      // console.log(item)
      // this.songlist = songList
      this.insertSong(songItem[0]);

      //派发和搜素历史相关的事件
      this.$emit("select");
    },
    ...mapMutations(["SET_SINGER"]),
    ...mapActions(["insertSong"])
  },
  watch: {
    query(newQuery) {
      if (!newQuery) {
        return;
      }
      this._search();
    }
  }
};
</script>
<style lang="less" scoped>
@import "~common/less/mixin.less";

.suggest {
  height: 100%;
  overflow: hidden;

  .suggest-list {
    padding: 0 30px;

    .suggest-item {
      display: flex;
      line-height: 22px;
      padding-bottom: 20px;

      .icon {
        margin-right: 10px;
      }

      .name {
        font-size: 14px;
        .no-wrap;
      }
    }
  }
}

.suggest {
  /deep/ .van-loading {
    text-align: center;
  }
}
</style>
