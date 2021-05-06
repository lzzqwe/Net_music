<template>
  <transition name="van-slide-up">
    <div v-show="isShowSearch" class="search-input-wrap">
      <div class="input-content">
        <span @click="isClose" class="iconfont iconxia"></span>
        <div class="input-keyword">
          <input
            ref="keyword"
            v-model="keyword"
            class="input-value"
            type="text"
          />
          <span
            @click.stop="clearKeyword"
            v-show="keyword"
            class="iconfont iconiconjia"
          ></span>
        </div>
      </div>
      <base-scroll
        :data="searchDetail"
        ref="search"
        class="search-content-wrap"
      >
        <div v-show="result" class="search-content">
          <div class="advertising">
            <img
              class="advertising-image"
              src="http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/3402298.jpg"
              alt=""
            />
          </div>
          <div v-if="searches.length > 0" class="search-history">
            <h1 class="title">历史</h1>
            <base-scroll
              :data="searches"
              :scroll-x="scrollX"
              class="history-list-wrap"
            >
              <ul ref="searchHistoryList" class="search-history-list">
                <li
                  ref="historyItem"
                  :key="index"
                  v-for="(item, index) in searches"
                  class="search-history-item"
                >
                  {{ item }}
                </li>
              </ul>
            </base-scroll>
            <span @click="clearAllHistory" class="iconfont iconlajitong"></span>
          </div>
          <div class="hot-search">
            <div class="hot-in-search">
              <h1 class="hot-title">热搜榜</h1>
              <div class="hot-play">
                <span class="iconfont iconbofang4"></span>播放
              </div>
            </div>
            <div class="hot-in-list">
              <van-row type="flex" class="hot-in-item">
                <van-col
                  @click="searchKeyword(item.searchWord)"
                  :key="item.searchWord"
                  v-for="(item, index) in searchDetail"
                  class="item"
                  span="12"
                >
                  <span class="number">{{ index + 1 }}</span
                  ><span class="keyword">{{ item.searchWord }}</span>
                </van-col>
                <net-loading v-show="!searchDetail.length"></net-loading>
              </van-row>
            </div>
            <div class="Song-zone">
              <van-row class="song-zone-item" gutter="12">
                <van-col span="12">
                  <img
                    class="zone-image"
                    src="http://29e5534ea20a8.cdn.sohucs.com/c_zoom,h_213/c_cut,x_64,y_0,w_675,h_450/os/news/82a80033a6203bc81beaef33d250d398.jpg"
                    alt=""
                  />
                </van-col>
                <van-col span="12">
                  <img
                    class="zone-image"
                    src="http://29e5534ea20a8.cdn.sohucs.com/c_zoom,h_213/c_cut,x_64,y_0,w_675,h_450/os/news/82a80033a6203bc81beaef33d250d398.jpg"
                    alt=""
                  />
                </van-col>
              </van-row>
            </div>
          </div>
        </div>
      </base-scroll>
      <transition name="van-slide-down">
        <div v-show="keyword" class="search-suggest">
          <div class="search-suggest-content">
            <h1 class="keyword">搜索{{ keyword }}</h1>
            <ul>
              <li
                @click="_searchContent(item.keyword)"
                class="suggest-item"
                :key="index"
                v-for="(item, index) in allMatch"
              >
                <span class="iconfont iconsousuo"></span>{{ item.keyword }}
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
import BaseScroll from "./BaseScroll";
import NetLoading from "./NetLoading";
import { mapGetters, mapActions } from "vuex";
import { getHotSearchDetail, getSearchSuggest } from "@/api/index.js";
export default {
  name: "SearchInput",
  props: {
    isShowSearch: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scrollX: true,
      searchDetail: [],
      keyword: "",
      allMatch: [],
      result: {},
    };
  },
  computed: {
    ...mapGetters(["playList", "searches"]),
  },
  mounted() {
    this.handlePlaylist(this.playList);
  },
  methods: {
    handlePlaylist(playList) {
      const bottom = playList.length > 0 ? "82px" : 0;
      this.$refs.search.$el.style.bottom = bottom;
      this.$refs.search.refresh();
    },
    isClose() {
      this.$emit("close");
      this.keyword = "";
    },
    searchKeyword(keyword) {
      this.keyword = keyword;
    },
    clearKeyword() {
      this.keyword = "";
    },
    async _searchContent(searchWord) {
      this.$router.push(`/search?keyword=${searchWord}`);
      this.keyword = "";
    },
    async _getHotSearchDetail() {
      const res = await getHotSearchDetail();
      if (res.code === 200 && res.message === "success") {
        this.searchDetail = res.data;
      }
    },
    async _getSearchSuggest() {
      const params = {
        keywords: this.keyword,
        type: "mobile",
      };
      const res = await getSearchSuggest(params);
      if (res.code === 200) {
        /*
         * 如何判断一个对象是否为空   可以用JSON.stringify(res.result)!=="{}" 判断对象是否为空
         */
        if (JSON.stringify(res.result) !== "{}") {
          this.allMatch = res.result.allMatch;
        } else {
          this.$toast("目前还没有这类的搜索");
        }
      }
    },
    clearAllHistory() {
      this.$dialog
        .confirm({
          message: "确定要删除历史记录吗?",
        })
        .then(() => {
          this.clear_all_searches();
        });
    },
    ...mapActions(["clear_all_searches"]),
  },
  components: {
    BaseScroll,
    NetLoading,
  },
  watch: {
    isShowSearch(newValue, oldValue) {
      if (newValue) {
        this._getHotSearchDetail();
        this.$nextTick(() => {
          this.$refs.keyword.focus();
        });
      }
    },
    keyword(newValue, oldValue) {
      if (newValue === oldValue) {
        return;
      } else {
        this._getSearchSuggest();
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~../common/less/variable.less";
.search-input-wrap {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 21;
  background-color: var(--body-bgcolor);
  color: var(--font-color);
  .input-content {
    display: flex;
    padding-left: 27px;
    margin-right: 36px;
    margin-top: 26px;
    margin-bottom: 12px;
    align-items: center;
    position: relative;
    z-index: 10;
    overflow: hidden;
    .iconxia {
      font-size: @font_size_large;
      margin-right: 27px;
      flex: 0 0 26px;
    }
    .vertical-line {
      width: 2px;
      height: 27px;
      background-color: rgb(70, 70, 70);
    }
    .input-keyword {
      position: relative;
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:before {
        content: "";
        display: inline-block;
        width: 2px;
        height: 34px;
        background-color: rgb(70, 70, 70);
        position: absolute;
        top: 0;
        left: 0;
      }
      flex: 1;
      .input-value {
        font-size: @font_size_medium;
        line-height: 20px;
        color: rgb(179, 179, 179);
        box-sizing: border-box;
        width: 100%;
        padding: 6px 0 14px 6px;
        border-bottom: 2px solid rgb(133, 133, 133);
      }
    }
  }
  .search-content-wrap {
    position: fixed;
    top: 85px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .search-content {
      .advertising {
        padding: 15px 24px 22px 24px;
        height: 75px;
        .advertising-image {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          border: 1px solid rgb(224, 211, 216);
          border-radius: 10px;
        }
      }
      .search-history {
        display: flex;
        padding: 0 24px;
        justify-content: space-between;
        align-items: center;
        .title {
          font-size: @font_size_medium;
          font-weight: 600;
          margin-right: 24px;
        }
        .history-list-wrap {
          flex: 1;
          overflow: hidden;
          .search-history-list {
            display: flex;
            flex-wrap: nowrap;
            width: 1200px;
            .search-history-item {
              padding: 14px 18px;
              margin-right: 13px;
              background-color: rgb(243, 243, 243);
              color: rgb(49, 49, 49);
              border-radius: 20px;
              font-size: @font_size_medium-s;
              &:last-child {
                margin-right: 0;
              }
            }
          }
        }
        .iconlajitong {
          font-size: @font_size_large-s;
          margin-left: 24px;
        }
      }
      .hot-search {
        .hot-in-search {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0 24px;
          padding: 35px 0 17px 0;
          border-bottom: 1px solid rgb(230, 230, 230);
          .hot-title {
            font-size: @font_size_medium;
            font-weight: 600;
          }
          .hot-play {
            width: 82px;
            height: 35px;
            border: 1px solid rgb(230, 230, 230);
            border-radius: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            color: rgb(51, 51, 51);
            .iconbofang4 {
              font-size: 14px;
              margin-right: 6px;
            }
          }
        }
        .hot-in-list {
          padding: 18px 24px 0 24px;
          .hot-in-item {
            .item {
              font-size: 18px;
              margin-bottom: 34px;
              display: flex;
              justify-content: space-between;
              &:nth-last-child(2) {
                margin-bottom: 0;
              }
              &:nth-last-child(1) {
                margin-bottom: 0;
              }
              .number {
                margin-right: 23px;
                color: rgb(154, 154, 154);
              }
              .keyword {
                margin-right: 10px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                width: 230px;
              }
              .icon {
                width: 39px;
                height: 14px;
              }
            }
          }
        }
        .Song-zone {
          margin-top: 29px;
          padding: 0 24px;
          overflow: hidden;
          .song-zone-item {
            margin-bottom: 12px;
            .zone-image {
              width: 240px;
              height: 90px;
              border-radius: 8px;
            }
          }
        }
      }
    }
  }
  .search-suggest {
    position: fixed;
    left: 24px;
    right: 24px;
    top: 87px;
    height: 500px;
    overflow: hidden;
    background-color: rgb(255, 255, 255);
    z-index: 9;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
    .search-suggest-content {
      margin-left: 22px;
      line-height: 70px;
      font-size: 20px;
      .keyword {
        color: rgb(102, 126, 155);
      }
      .suggest-item {
        color: rgb(123, 123, 123);
        border-bottom: 1px solid rgb(248, 248, 248);
        &:last-child {
          border-bottom: none;
        }
        .iconsousuo {
          font-size: 20px;
          margin-right: 16px;
        }
      }
    }
  }
}
</style>
