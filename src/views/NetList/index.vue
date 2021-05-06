<template>
  <div class="song-piazza">
    <div class="nav-bar-wrap">
      <nav-bar :bar-title="barTitle"></nav-bar>
    </div>
    <van-tabs @click="changeTag">
      <van-tab
        :key="item.name"
        v-for="(item, index) in tags"
        :title="item.name"
      >
        <base-scroll
          @scrollToEnd="loadMore"
          :pullup="pullup"
          :data="songList"
          :key="index"
          class="song-list-wrap"
        >
          <div class="song-list-content">
            <div class="song-swiper">
              <swiper
                v-show="needOne(index)"
                ref="mySwiper"
                :options="swiperOptions"
              >
                <swiper-slide
                  :id="item.id"
                  ref="slide"
                  @click="selectItem(item.id)"
                  :key="item.id"
                  v-for="item in songList.slice(0, 3)"
                >
                  <div class="slide-container">
                    <img class="img" :src="item.coverImgUrl" alt="" />
                  </div>
                </swiper-slide>
              </swiper>
            </div>
            <keep-alive>
              <div class="songs-wrap">
                <song-list
                  @select="selectItem(item)"
                  :song-item="item"
                  :key="index"
                  v-for="(item, index) in songList.slice(3)"
                ></song-list>
                <net-loading v-show="hasMore"></net-loading>
                <div class="no-result" v-show="!hasMore">已经没有了</div>
              </div>
            </keep-alive>
          </div>
        </base-scroll>
      </van-tab>
    </van-tabs>
    <transition name="van-slide-right">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
let vm = null;
import NavBar from "@/components/NavBar";
import SongList from "@/components/SongList";
import BaseScroll from "@/components/BaseScroll";
import NetLoading from "@/components/NetLoading";
import { getSongsTags, getSongList } from "@/api/index";
export default {
  metaInfo() {
    return {
      title: "歌单广场",
    };
  },
  name: "NetList",
  data() {
    return {
      barTitle: "歌单广场",
      tags: [],
      cat: "全部",
      songList: [],
      pullup: true,
      limit: 50,
      offset: 0,
      loading: false,
      hasMore: true,
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
        },
        on: {
          click: function () {
            // 这里有坑，需要注意的是：this 指向的是 swpier 实例，而不是当前的 vue， 因此借助 vm，来调用 methods 里的方法
            // console.log(this); // -> Swiper
            // 当前活动块的索引，与activeIndex不同的是，在loop模式下不会将 复制的块 的数量计算在内。
            const realIndex = this.realIndex;
            vm.handleClickSlide(realIndex);
          },
        },
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        preventClicks: false,
        initialSlide: 1,
        effect: "coverflow",
        slidesPerView: 3,
        centeredSlides: true,
        loop: true,
      },
    };
  },
  created() {
    vm = this;
    this._getSongsTags();
    this._getSongList();
  },
  methods: {
    handleClickSlide(index) {
      const id = this.$refs.slide[index].$el.id;
      this.$router.push(`/playlistCollection/${id}`);
    },
    needOne(index) {
      if (index === 0) {
        return true;
      } else {
        return false;
      }
    },
    selectItem(item) {
      this.$router.push(`/playlistCollection/${item.id}`);
    },
    loadMore() {
      this.loading = true;
      this.offset++;
      this._getSongList();
    },
    changeTag(name, title) {
      console.log(name, title);
      this.cat = title;
    },
    async _getSongsTags() {
      try {
        const res = await getSongsTags();
        if (res.code === 200) {
          res.sub.unshift(res.all);
          this.tags = res.sub;
        }
      } catch (error) {
        this.$notify({
          message: "获取数据失败",
          color: "#FFFFFF",
          background: "#00A2E8",
        });
      }
    },
    async _getSongList() {
      const params = {
        cat: this.cat,
        limit: 50,
        offset: this.offset,
      };
      try {
        const res = await getSongList(params);
        if (res.code === 200) {
          this.songList = this.songList.concat(res.playlists);
          this._checkMore(res.playlists);
        }
      } catch (error) {
        this.$notify({
          message: "获取数据失败",
          color: "#FFFFFF",
          background: "#00A2E8",
        });
      }
    },
    _checkMore(list) {
      if (!list.length) {
        this.hasMore = false;
      }
    },
  },
  watch: {
    cat: function (newvalue, oldValue) {
      if (newvalue !== oldValue) {
        console.log(newvalue);
        this.songList = [];
        this.offset = 0;
        this._getSongList();
      }
    },
  },
  components: {
    NavBar,
    SongList,
    BaseScroll,
    NetLoading,
  },
};
</script>
<style lang="less" scoped>
.song-piazza {
  width: 100%;
  height: 100%;
  background-color: var(--body-bgcolor);
  color: var(--font-color);
  .nav-bar-wrap {
    padding: 0 24px;
  }
  .song-list-wrap {
    position: fixed;
    top: 178px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    .song-list-content {
      .song-swiper {
        padding: 0 24px;
        .slide-container {
          width: 240px;
          height: 280px;
          .img {
            width: 240px;
            height: 240px;
          }
          .dec {
            font-size: 18px;
            margin-top: 20px;
            line-height: 26px;
          }
        }
      }
      .songs-wrap {
        display: flex;
        flex-wrap: wrap;
        padding: 0 16.5px;
        .no-result {
          width: 100%;
          line-height: 40px;
          font-size: 20px;
        }
      }
    }
  }
}
.song-piazza {
  /deep/ .van-tabs__wrap {
    height: 60px;
    border-bottom: 1px solid rgb(181, 186, 187);
    background-color: rgb(193, 197, 201);
  }
  /deep/ .van-tab {
    font-size: 20px;
    color: rgb(81, 84, 84);
  }
  /deep/ .van-tabs__nav--complete {
    padding: 0 12px;
  }
  /deep/ .van-tab--active {
    color: rgb(38, 41, 41);
    font-weight: 600;
  }
}
.loading-wrap {
  width: 100%;
  height: 30px;
  .loader {
    width: 60px;
    height: 30px;
    margin: 0 auto;
  }
}
</style>
