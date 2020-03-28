<template>
  <div ref="search" class="search">
    <div class="search-box-wrapper">
      <div @click="searchBack" class="search-back">
        <span class="iconfont iconfanhui"></span>
      </div>
      <search-box class="box" @onchangeQuery="changeQuery" ref="searchBox"></search-box>
    </div>
    <div ref="shortCutWrapper" v-show="!query" class="shortCut-wrapper">
      <base-scroll :delayTime="refreshDelay" ref="shortCut" class="shortCut">
        <div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span @click="deleteAll" class="iconfont iconlajitong1"></span>
            </h1>
            <div class="search-list">
              <ul>
                <li class="search-item" :key="index" v-for="(item,index) in this.searchHistory">
                  <span @click="addQuery(item)">{{ item }}</span>
                  <span @click="deletOne(item)" class="iconfont iconiconjia"></span>
                </li>
              </ul>
            </div>
          </div>
          <div class="hotKey">
            <h1 class="title">热搜榜</h1>
            <ul>
              <li
                :key="index"
                v-for="(item,index) in hotkey"
                class="hot-item"
                @click="addQuery(item.searchWord)"
              >
                <span class="rank-index">{{index+1}}</span>
                <div class="hot-title">
                  <div>
                    <span>{{item.searchWord}}</span>
                  </div>
                  <span>{{ item.content }}</span>
                </div>
                <span>{{ item.score }}</span>
              </li>
            </ul>
          </div>
        </div>
      </base-scroll>
    </div>
    <div ref="searchResult" class="search-result">
      <search-suggest
        ref="suggest"
        @listScroll="blurInput"
        @select="_saveSeachHistory"
        :query="query"
      ></search-suggest>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

import SearchBox from "base/SearchBox/SearchBox";

import { getHotKey } from "api/index.js";

import SearchSuggest from "base/SearchSuggest/SearchSuggest";

import BaseScroll from "base/BaseScroll/BaseScroll";

import { playListMixin } from "common/js/mixin";

export default {
  name: "search",
  mixins: [playListMixin],
  data() {
    return {
      hotkey: [],
      query: "",
      refreshDelay: 120
    };
  },
  components: {
    SearchBox,
    SearchSuggest,
    BaseScroll
  },
  computed: {
    ...mapGetters(["searchHistory"])
  },
  created() {
    this._getHotKey();
  },
  methods: {
    async _getHotKey() {
      const { code, data } = await getHotKey();
      if (code === 200) {
        // const { data } = result;
        this.hotkey = data;
      }
    },
    // 监听query变化 顺便将query传过来
    changeQuery(query) {
      this.query = query;
    },
    blurInput() {
      this.$refs.searchBox.blur();
    },
    searchBack() {
      this.$router.back();
    },
    handlePlaylist(playList) {
      const bottom = playList.length > 0 ? "60px" : 0;
      this.$refs.shortCutWrapper.style.bottom = bottom;
      this.$refs.shortCut.refresh();
      this.$refs.searchResult.style.bottom = bottom;
      this.$refs.suggest.refresh();
    },
    addQuery(query) {
      this.$refs.searchBox.setQuery(query);
    },
    deletOne(item) {
      this.deleteSearchHistory(item);
    },
    deleteAll() {
      this.$dialog();
    },
    _saveSeachHistory() {
      this.saveSearchHistory(this.query);
    },
    ...mapActions([
      "saveSearchHistory",
      "deleteSearchHistory",
      "clearSearchHistory"
    ])
  },
  watch: {
    query(newQuery) {
      if (!newQuery) {
        // suggest 切换到search 从有到无的变化
        setTimeout(() => {
          this.$refs.shortCut.refresh();
        }, 20);
      }
    }
  }
};
</script>
<style lang="less" scoped>
body {
  /deep/ .van-dialog__header {
    padding-top: 0;
  }
}

@import "~common/less/variable.less";

.search {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 100;
  background-color: @color-background;

  .search-box-wrapper {
    padding: 10px;
    display: flex;

    .search-back {
      width: 30px;
      flex: 0 0 30px;
      display: flex;
      align-items: center;
      justify-content: center;

      .iconfanhui {
        font-size: 20px;
      }
    }

    .box {
      flex: 1;
    }
  }

  .shortCut-wrapper {
    position: fixed;
    top: 80px;
    bottom: 0;
    width: 100%;
    z-index: 5;

    .shortCut {
      height: 100%;
      overflow: hidden;

      .hotKey {
        margin: 20px 20px 0 20px;

        .hot-item {
          display: flex;
          padding: 0 10px;
          line-height: 24px;
          background: #3f00ff;
          margin-right: 5px;
          margin-bottom: 10px;
          border-radius: 5px;
          font-size: 14px;

          .rank-index {
            margin-right: 6px;
          }

          .hot-title {
            flex: 1;
          }
        }

        .title {
          margin-bottom: 10px;
          font-size: 18px;
        }
      }

      .search-history {
        margin: 20px 20px 0 20px;

        .title {
          display: flex;
          justify-content: space-between;
          line-height: 40px;

          .text {
            font-size: 14px;
          }
        }

        .search-list {
          .search-item {
            display: flex;
            justify-content: space-between;
            line-height: 40px;
            font-size: 14px;
          }
        }
      }
    }
  }

  .search-result {
    position: fixed;
    top: 74px;
    bottom: 0;
    width: 100%;
  }
}
</style>