<template>
  <music-list :title="title" :bgImage="bgImage" :songs="songlist"></music-list>
</template>
<script>
const MAX = 500;
import MusicList from "base/MusicList/MusicList";
import { mapGetters } from "vuex";
import { getdetail, getSongDetail } from "api/index.js";
import { createSong } from "common/js/song";
export default {
  name: "Disc",
  components: {
    MusicList
  },
  created() {
    this._getDetailList();
  },
  data() {
    return {
      songlist: []
    };
  },
  methods: {
    async _getDetailList() {
      if (!this.disc.id) {
        return this.$router.push("/recommend");
      }
      //根据歌单id获取歌单详情 返回的trackIds是完整的 拿全部 trackIds 请求一次 song/detail 接口获取所有歌曲的详情
      const { code, playlist } = await getdetail(this.disc.id);
      if (code === 200) {
        // 格式化数据
        this._nomalizeSongs(playlist);
      }
    },
    async _nomalizeSongs(list) {
      //获取 trackIds
      const trackIds = list.trackIds.map(item => item.id);
      //浅拷贝（包括 begin，不包括end）。原始数组不会被改变。
      const copyTrackIds = trackIds.slice(0, MAX);
      //获取歌曲详情
      const { songs } = await getSongDetail(copyTrackIds);
      //获取歌曲必须的对象参数  解构赋值
      const songList = songs.map(({ id, name, ar, al, dt }) => {
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

      this.songlist = songList;
    }
  },
  computed: {
    ...mapGetters(["disc"]),
    title() {
      return this.disc.name;
    },
    bgImage() {
      return this.disc.coverImgUrl ? this.disc.coverImgUrl : this.disc.picUrl;
    }
  }
};
</script>
<style lang="less" scoped>
.disc {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 10;
  background: #333;
}
</style>
