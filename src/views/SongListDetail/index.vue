<template>
  <div class="song-list-detail">
    <music-list
      :songs="songs"
      :playlist="playlist"
      @comment="isShowComment"
      :bar-title="barTitle"
    ></music-list>
  </div>
</template>

<script>
import MusicList from "@/components/MusicList";
import { getSongListDetail, getAllSongs } from "@/api/index";
import { createSong } from "@/common/js/song";
import { mapActions } from "vuex";
export default {
  metaInfo() {
      return {
        title:"歌单详情"
      }
    },
  name: "SongListDetail",
  components: {
    MusicList,
  },
  created() {
    this._getSongListDetail();
  },
  data() {
    return {
      barTitle: "歌单",
      playlist: {},
      songs: [],
      id: parseInt(this.$route.params.id),
      bounce: {
        top: false,
        bottom: true,
        left: true,
        right: true,
      },
      list: [],
    };
  },
  methods: {
    isShowComment() {
      this.$router.push(`/comment?songListId=${this.id}`);
    },
    async _getSongListDetail() {
      const params = {
        id:this.id
      }
      try {
        const res = await getSongListDetail(params);
        if (res.code === 200) {
          this.playlist = res.playlist;
          const obj = createSong({
            picUrl: this.playlist.coverImgUrl,
            name: this.playlist.name,
            singer: this.playlist.creator.nickname,
          });
          this.save_obj({ obj });
        }
        this._normalizeSongs(res.playlist);
      } catch (e) {
        console.log(e);
      }
    },
    async _normalizeSongs(list) {
      const tracksId = [];
      list.trackIds.forEach((item) => {
        if (item.id) {
          tracksId.push(item.id);
        }
      });
      const params = {
        ids:tracksId.toString()
      }
      const res = await getAllSongs(params);
      if (res.code === 200) {
        this.songs = this._createSong(res.songs);
      }
    },
    _createSong(list) {
      if (list instanceof Array) {
        return list.map((item) => {
          return createSong({
            id: item.id,
            picUrl: item.al.picUrl,
            duration: item.dt,
            singer: item.ar[0].name,
            name: item.name,
            mvId: item.mv,
          });
        });
      }
    },
    ...mapActions(["select_play", "save_obj"]),
  },
};
</script>

<style lang="less" scoped>
.song-list-detail {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 5;
  background-color: var(--body-bgcolor);
  color: var(--font-color);
  .nav-bar-wrap {
    padding: 32px 24px 0 24px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .song-list-wrap {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    &.bottom {
      bottom: 82px;
    }
    .background-wrap {
      overflow: hidden;
      .song-list-background {
        height: 400px;
        width: 100%;
        position: relative;
        background-size: cover;
        filter: blur(20px);
        background-repeat: no-repeat;
        transform: scale(3);
        background-position: 50%;
        &:after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(0, 0, 0, 0.25);
          z-index: 1;
        }
      }
    }
    .song-detail-cover {
      position: absolute;
      top: 145px;
      left: 0;
      right: 0;
      .detail-cover-content {
        padding: 0 24px;
        display: flex;
        .cover-img {
          flex: 0 0 181px;
          width: 181px;
          .icon-album {
            width: 181px;
            height: 181px;
            border-radius: 12px;
          }
        }
        .description {
          flex: 1;
          margin-left: 28px;
          .song-list-title {
            font-size: 20px;
            line-height: 36px;
            color: rgba(255, 255, 255);
          }
          .attention {
            display: flex;
            margin: 24px 0 32px 0;
            font-size: 16px;
            align-items: center;
            .avatar {
              width: 37px;
              height: 37px;
              border-radius: 50%;
            }
            .user-name {
              margin: 0 4px 0 12px;
              color: rgb(182, 175, 178);
              font-weight: 600;
            }
            .increase {
              padding: 8px 16px;
              background-color: rgb(161, 151, 155);
              border-radius: 13px;
              .iconhao {
                color: rgb(216, 213, 214);
              }
            }
          }
          .song-list-content {
            display: flex;
            font-size: 16px;
            justify-content: space-between;
            color: rgb(182, 175, 178);
            .icongengduo1 {
              font-size: 16px;
            }
            .text {
              white-space: nowrap;
              text-overflow: ellipsis;
              width: 200px;
              overflow: hidden;
              font-weight: 600;
            }
          }
        }
      }
    }
    .song-detail-operation {
      background-color: var(--song-detail-operation-color);
      height: 60px;
      position: absolute;
      top: 365px;
      left: 75px;
      right: 75px;
      border-radius: 30px;
      padding: 0 41px;
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
      color: var(--font-color);
      .operation-list {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        .operator-item {
          font-size: 14px;
          display: flex;
          align-items: center;
          border-right: 1px solid var(--border-right-color);
          padding-right: 23px;
          &:last-child {
            padding-right: 0;
            border-right: 0;
          }
          .iconjiatianjiakuangxuanduoxuan-8 {
            font-size: 26px;
            margin-right: 12px;
          }
          .iconpinglun1 {
            font-size: 26px;
            margin-right: 12px;
          }
          .iconfenxiang1 {
            font-size: 26px;
            margin-right: 12px;
          }
        }
      }
    }
    .open-vip {
      margin: 60px 18px 0 18px;
      display: flex;
      height: 65px;
      align-items: center;
      justify-content: space-between;
      padding: 0 15px;
      border: 1px solid rgb(233, 233, 233);
      border-radius: 12px;
      .vip-song {
        font-size: 20px;
        .iconVIP- {
          margin-right: 17px;
          font-size: 20px;
        }
      }
      .price {
        font-size: 18px;
        color: rgb(154, 154, 154);
        .icongengduo1 {
          font-size: 18px;
          margin-left: 12px;
        }
      }
    }
    .play-all {
      padding: 0 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 12px 0 20px 0;
      height: 75px;
      .play {
        display: flex;
        align-items: center;
        .iconbofang7 {
          font-size: 30px;
          color: rgb(255, 65, 30);
        }
        .num {
          font-size: 18px;
          color: rgb(153, 153, 153);
        }
        .all {
          font-size: 23px;
          font-weight: 600;
          margin: 0 14px 0 23px;
        }
      }
      .down-select {
        .iconxiazai {
          font-size: 25px;
          margin-right: 25px;
        }
        .iconquanxuan {
          font-size: 25px;
        }
      }
    }
    .list {
      padding: 0 33px;
      .list-content {
        .list-item {
          display: flex;
          align-items: center;
          margin-bottom: 38px;
          .item-index {
            flex: 0 0 7px;
            width: 7px;
            font-size: 16px;
            color: rgb(153, 153, 153);
            font-weight: 600;
          }
          .desc {
            flex: 1;
            display: flex;
            justify-content: space-between;
            margin-left: 37px;
            align-items: center;
            .song-name-text {
              margin-right: 39px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              .song-name-content {
                flex: 0 0 320px;
                width: 320px;
                .name {
                  width: 100%;
                  font-size: 20px;
                  margin-bottom: 16px;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                }
                .text {
                  font-size: 12px;
                  color: rgb(179, 179, 179);
                  .icondujia {
                    margin-right: 5px;
                    color: rgb(246, 162, 159);
                  }
                  .iconsq {
                    color: rgb(225, 113, 71);
                    margin-right: 5px;
                  }
                }
              }
              .iconbofang6 {
                font-size: 22px;
                margin-left: 34px;
                color: rgb(179, 179, 179);
              }
            }
            .play-icon {
              flex: 0 0 22px;
              width: 22px;
              .iconsandian {
                font-size: 22px;
                color: rgb(179, 179, 179);
              }
            }
          }
        }
      }
    }
  }
}
</style>
