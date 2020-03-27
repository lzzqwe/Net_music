<template>
  <div ref="player" class="video-player"></div>
</template>
<script>
import Player from "xgplayer";
export default {
  name: "disc",
  props: {
    url: {
      type: String
    },
    cover: {
      type: String
    },
    autoplay: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this._initPlayer();
  },
  methods: {
    _initPlayer() {
      if (!this.url && !this.cover) return;
      this.player = new Player({
        el: this.$refs.player,
        url: this.url,
        fluid: true,
        poster: this.cover,
        autoplay: this.autoplay
      });
    }
  },
  watch: {
    url(url, oldUrl) {
      if (url && url !== oldUrl) {
        if (!this.player) {
          this._initPlayer();
        } else {
          this.player.src = url;
          this.player.reload();
        }
      }
    }
  }
};
</script>
<style lang='less' scoped>
.video-player {
  margin-top: 50px;
}
</style>
