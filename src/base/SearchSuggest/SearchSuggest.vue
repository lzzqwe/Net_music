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
    <ul class="suggest-list">
      <li
        class="suggest-item"
        :key="index"
        v-for="(item,index) in result"
        @click="selectItem(item)"
      >
        <div class="icon">
          <span :class="getIconCls()"></span>
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
      // 重置scroll参数，以防数据积累,scroll破环
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
      if(item) {
       return "iconfont iconicon-test";
      }
      
    },
    getDisplayName(item) {
      if(item) {
        return `${item.name}-${item.artists[0].name}`;
      } 
    },
    async selectItem(item) {
      const { songs } = await getSongDetail(item.id);
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
