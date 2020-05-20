<template>
  <div class="list">
    <slide-bar :title="title"></slide-bar>
    <div class="lis">
      <keep-alive>
        <van-tabs type="line" border title-active-color='#f3a3a' @change="onChange" @click="onClick" v-model="active" swipeable>
        <van-tab :key="index" v-for="(item,index) in sub" :title="item.name">
          <div
            ref="listContent"
            class="list-content"
          >
            <base-list @select="selectItem" :list="playlist"></base-list>
          </div>
        </van-tab>
      </van-tabs>
      </keep-alive>
      
      <!-- <div class="loading-container" v-show="!playlist.length">
        <van-loading type="spinner" color="#1989fa">加载中...</van-loading>
      </div> -->
    </div>
    <transition name="van-slide-down">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import { getSongClassify, getPlayList } from "api/index.js";
import BaseList from "base/BaseList/BaseList.vue";
// import BaseScroll from "base/BaseScroll/BaseScroll.vue";
import SlideBar from "base/SlideBar/SlideBar.vue";
import { mapMutations } from "vuex";
import { playListMixin } from "common/js/mixin.js";
import MeScroll from 'mescroll.js'
import 'mescroll.js/mescroll.min.css'
export default {
  name: "NetList",
  mixins: [playListMixin],
  data() {
    return {
      active: 0,
      mescroll: null,
      sub: [],
      playlist: [],
      cat: "全部歌单",
      limit: 20,
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
  beforeMount() {
    
  },
  mounted() {
     // 创建MeScroll对象:为避免配置的id和父组件id重复,这里使用ref的方式初始化mescroll
    this.mescroll = new MeScroll(this.$refs.listContent, {// 在mounted生命周期初始化mescroll,以确保您配置的dom元素能够被找到.
      down: {
        auto: false, // 是否在初始化完毕之后自动执行下拉回调callback; 默认true
        callback: this.downCallback // 下拉刷新的回调
      },
      up: {
        auto: true, // 是否在初始化时以上拉加载的方式自动加载第一页数据; 默认false
        callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page) { upCallback(page); }
        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: 10 // 每页数据的数量
        },
        isBounce: false,
        noMoreSize: 5 // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        // toTop: { // 配置回到顶部按钮
        //   src: './static/mescroll/mescroll-totop.png'
        // }
      }
    })
  },
  beforeUpdate() {
    
  },
  updated() {
    
  },
  beforeDestroy() {
    
  },
  destroyed() {
    
  },
  components: {
    BaseList,
    // BaseScroll,
    SlideBar
  },
  methods: {
    downCallback() {
    console.log("下拉")
    this.$nextTick(() => {
          this.mescroll.endSuccess()// 结束下拉刷新,无参
        })
    },
    async upCallback(page) {
      console.log('上拉加载')

       const { playlists, code } = await getPlayList(
        this.cat,
        page.size,
        page.num
      );
      if (code === 200) {
         this.$nextTick(() => {
          this.mescroll.endSuccess(playlists.length)
        })
        this.playlist = this.playlist.concat(playlists);
        // this._hasMore(this.playlist);
      } else {
          this.mescroll.endErr()
      }
    

    },
    listBack() {
      this.$router.back();
    },
    handlePlaylist(playList) {
      // console.log(this.$refs.listContent)
      const bottom = playList.length > 0 ? "60px" : 0;
      // this.$refs.listContent.style.bottom = bottom
      document.querySelector(".list-content").style.bottom = bottom;
    },
    //上拉触发
    loadMore() {
      if (!this.hasMore) {
        this.$toast("哥 已经到底了,没有数据了");
        return;
      }
      this.offset = this.offset + 20;
      // this.$toast.loading({
      //   message: "加载中...",
      //   forbidClick: true //是否禁止背景点击
      // });
      this._getPlayList();
    },
    // 判断是否有更多的元素
    _hasMore(data) {
      if (!data.length) {
        this.hasMore = false;
      }
    },
    //获取歌单风格种类
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
        this.playlist = this.playlist.concat(playlists);
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
/deep/ .lis {
   .van-tab--active {
     color: red !important;
   }
 }
/deep/ [class*=van-hairline]::after {
  border-color:#e5e5e5;
}  
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
  height: auto;
  overflow-y: auto;
}

.loading-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
}
</style>