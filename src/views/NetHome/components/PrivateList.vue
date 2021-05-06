<template>
  <div class="private-custom-made">
    <div class="custom-made-title">
      <h3 class="title">私人定制</h3>
      <div class="refresh">
        <span class="iconfont iconrefresh"></span>歌声里藏着故事
      </div>
    </div>
    <div @click="playAll" class="play-muisc">
      <span :class="_getIcon" class="iconfont"></span>播放
    </div>
    <div class="private-song-wrap">
      <div class="private-song-content">
        <ul class="private-song-list">
          <li
            @click="selectItem(index)"
            :key="item.id"
            v-for="(item, index) in privateMusic"
            class="item"
          >
            <div class="cover">
              <img v-lazy="item.picUrl" class="cover-imgage" alt="" />
              <span class="iconfont iconbofangliang1"></span>
            </div>
            <div class="desc">
              <div class="name">
                <span class="text">{{ item.name }}</span
                ><span class="horizontal">-</span>{{ item.singer }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "NetMusicPrivatelist",
  props: {
    privateMusic: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  computed: {
    _getIcon() {
      return this.playing ? "iconzanting" : "iconbofang4";
    },
    ...mapGetters(["playing"]),
  },
  mounted() {},
  methods: {
    playAll() {},
    selectItem() {},
  },
};
</script>

<style lang="less" scoped>
@import "../../../common/less/variable";
.private-custom-made {
  margin: 0 24px 0 24px;
  padding-top: 38px;
  position: relative;

  .custom-made-title {
    .title {
      font-size: @font_size_small;
      margin-bottom: 10px;
      color: rgb(179, 179, 179);
    }

    .refresh {
      font-size: 26px;
      font-weight: 600;

      .iconrefresh {
        font-size: @font_size_large;
        margin-right: 11px;
      }
    }
  }

  .play-muisc {
    position: absolute;
    top: 58px;
    right: 0;
    width: 85px;
    height: 37px;
    border: 1px solid var(--btn-border-color);
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: @font_size_medium-s;

    .iconbofang4 {
      margin-right: 5px;
    }

    .iconzanting {
      margin-right: 5px;
    }
  }

  .private-song-wrap {
    padding: 23px 0;

    .private-song-content {
      .private-song-list {
        .item {
          display: flex;
          width: 468px;
          margin-bottom: 8px;

          &:last-child {
            margin-bottom: 0;
          }

          .cover {
            width: 76px;
            height: 76px;
            margin-right: 15px;
            flex: 0 0 76px;
            position: relative;

            .cover-imgage {
              width: 100%;
              height: 100%;
              border-radius: 7px;
            }

            .iconbofangliang1 {
              font-size: 24px;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate3d(-50%, -50%, 0);
              color: rgb(255, 255, 255);
            }
          }

          .desc {
            flex: 1;
            border-bottom: 1px solid rgb(230, 230, 230);

            &:last-child {
              border-bottom: 0;
            }

            .name {
              font-size: @font_size_small;
              display: flex;
              align-items: center;
              color: rgb(153, 153, 153);
              margin-top: 15px;
              margin-bottom: 15px;

              .text {
                font-size: @font_size_medium-l;
                color: rgb(51, 51, 51);
              }

              .horizontal {
                margin: 0 5px;
              }
            }

            .lyric-overview {
              padding-bottom: 18px;
              font-size: @font_size_medium-s;
            }
          }
        }
      }
    }
  }
}
</style>