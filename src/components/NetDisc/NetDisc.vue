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
      const { code, playlist } = await getdetail(this.disc.id);
      if (code === 200) {
        this._nomalizeSongs(playlist);
      }
    },
    async _nomalizeSongs(list) {
      const trackIds = list.trackIds.map(({ id }) => id);
      console.log(trackIds);
      const copyTrackIds = trackIds.slice(0, MAX);

      const { songs } = await getSongDetail(copyTrackIds);

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
