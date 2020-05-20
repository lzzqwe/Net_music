<template>
  <div class="music-list">
    <div class="back" @click="back">
      <span class="iconfont iconyoujiantou"></span>
    </div>
    <h2 class="title">{{ title }}</h2>
    <div ref="bgImage" :style="bgStyle" class="bg-img">
      <div @click="random" v-show="songs.length" ref="playBtn" class="play-wrapper">
        <div class="button">随机播放全部</div>
      </div>
      <div ref="filter" class="filter"></div>
    </div>
    <div ref="layer" class="bg-layer"></div>
    <base-scroll
      class="list"
      ref="list"
      :data="songs"
      :probeType="probeType"
      :listenScroll="listenScroll"
      @onscroll="scroll"
    >
      <div ref="songList" class="song-list-wrapper">
        <song-list @select="selectItem" :songs="songs"></song-list>
      </div>
    </base-scroll>
    <div class="loading-container">
      <van-loading v-show="!songs.length" type="spinner" color="#1989fa">加载中...</van-loading>
    </div>
  </div>
</template>
<script>
import SongList from "base/SongList/SongList.vue";
import { playListMixin } from "common/js/mixin.js";
import BaseScroll from "base/BaseScroll/BaseScroll.vue";
import { prefixStyle } from "common/js/dom";
const transform = prefixStyle("transform");
// const backdrop = prefixStyle('backdrop-filter')
import { mapActions } from "vuex";
export default {
  name: "MusicList",
  mixins: [playListMixin],
  created() {
    this.probeType = 3;
    this.listenScroll = true;
  },
  data() {
    return {
      scrollY: 0
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    bgImage: {
      type: String,
      default: ""
    },
    songs: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`;
    }
  },
  components: {
    SongList,
    BaseScroll
  },
  methods: {
    back() {
      this.$router.back();
    },
    handlePlaylist(playList) {
      const bottom = playList.length > 0 ? "60px" : 0;
      // $el  Vue 实例使用的根 DOM 元素。理解为使用该组件的组件
      this.$refs.list.$el.style.bottom = bottom;
      this.$refs.list.refresh();
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    selectItem(item, index) {
      this.selectPlay({
        list: this.songs,
        index
      });
    },
    random() {
      this.randomPlay({
        list: this.songs
      });
    },
    ...mapActions(["selectPlay", "randomPlay"])
  },
  mounted() {
    this.bgImageHeight = this.$refs.bgImage.clientHeight;
    //  -262.5+40 = -222.5
    this.minTranlateY = -this.bgImageHeight + 40;

    this.$refs.list.$el.style.top = `${this.bgImageHeight}px`;
  },
  watch: {
    scrollY(newY) {
      let translateY = Math.max(this.minTranlateY, newY);

      let zindex = 0;

      let scale = 1;

      this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`;

      const percent = Math.abs(newY / this.bgImageHeight);
      // 滚动的 值 大于0
      if (newY > 0) {
        scale = 1 + percent;

        zindex = 10;
        // -222.5
      } else if (newY < this.minTranlateY) {
        zindex = 10;

        this.$refs.bgImage.style.paddingTop = 0; // 40

        this.$refs.bgImage.style.height = "40px";

        this.$refs.playBtn.style.display = "none";
      } else {
        this.$refs.bgImage.style.paddingTop = "70%";

        this.$refs.bgImage.style.height = 0;

        this.$refs.playBtn.style.display = "";
      }

      this.$refs.bgImage.style.zIndex = zindex;

      this.$refs.bgImage.style[transform] = `scale(${scale})`;
    }
  }
};
</script>
<style lang="less" scoped>
@import '~common/less/variable.less';
.music-list {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 105;
  background: @color-background;

  .back {
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 15;

    .iconyoujiantou {
      font-size: 22px;
      font-weight: 600;
      color: #f5f9f3;
    }
  }

  .title {
    position: absolute;
    width: 100%;
    line-height: 40px;
    text-align: center;
    z-index: 14;
    font-size: 16px;
  }

  .bg-img {
    padding-top: 70%;
    height: 0;
    width: 100%;
    background-size: cover;
    position: relative;

    .play-wrapper {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10;

      .button {
        padding: 8px 20px;
        border: 1px solid #ffffff;
        border-radius: 10px;
        font-size: 10px;
        color: #ffcd32;
      }
    }

    .filter {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }

  .list {
    position: fixed;
    bottom: 0;
    top: 0;
    width: 100%;
    background: @color-background;

    .song-list-wrapper {
      padding: 20px 30px;
    }
  }

  .loading-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
  }

  .bg-layer {
    height: 100%;
    background: @color-background;
    position: relative;
  }
}
</style>
