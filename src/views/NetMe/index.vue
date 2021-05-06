<template>
  <div class="net-me">
    <div :style="{ background: color }" ref="nav" class="nav-bar-container">
      <nav-bar :bar-title="barTitle"></nav-bar>
    </div>
    <base-scroll
      :data="songlist"
      :probe-type="scrollAttribute.probeType"
      :listenScroll="scrollAttribute.listenScroll"
      @onscroll="scroll"
      class="me-container"
    >
      <div>
        <div ref="meBackground" class="me-background">
          <img
            :style="{ opacity: opacity }"
            class="image"
            v-lazy="profile.backgroundUrl"
            alt=""
          />
          <div class="user-info">
            <div class="avatar">
              <van-uploader :after-read="afterRead">
                <img class="image" v-lazy="profile.avatarUrl" alt="" />
              </van-uploader>
            </div>
            <div class="desc">
              <h1 class="name">{{ profile.nickname }}</h1>
              <div class="fans">
                <span class="following"
                  >{{ profile.follows }}<span class="space">关注</span></span
                >
                <span class="followers"
                  >{{ profile.followeds }}<span class="space">粉丝</span></span
                >
                <span class="grade">Lv.6</span>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-wrap">
          <van-tabs v-model="active">
            <van-tab title="主页">
              <div class="basic-info">
                <h1 class="title">基本信息</h1>
                <div class="age">
                  <span class="village-age"
                    >村龄:<span class="num">1年</span></span
                  >
                </div>
                <div class="area">
                  <span class="area-value"
                    >地区:<span class="name">白沙</span></span
                  >
                </div>
              </div>
              <div class="music-taste">
                <h1 class="title">创建的歌单</h1>
                <ul class="taste-list">
                  <base-list
                    :song="item"
                    :key="item.id"
                    v-for="item in createList"
                    @select="selctItem(item.id)"
                  ></base-list>
                </ul>
              </div>
              <div class="music-taste">
                <h1 class="title">收藏的歌单</h1>
                <ul class="taste-list">
                  <base-list
                    :song="item"
                    :key="item.id"
                    v-for="item in favoriteList"
                    @select="selctItem(item.id)"
                  ></base-list>
                </ul>
              </div>
              <div class="loading-wrap">
                <net-loading v-show="!songlist"></net-loading>
              </div>
            </van-tab>
            <van-tab title="视频"> </van-tab>
            <van-tab title="动态"> </van-tab>
          </van-tabs>
        </div>
      </div>
    </base-scroll>
  </div>
</template>

<script>
let BASE;
const env = process.env.NODE_ENV;
if (env === "development") {
  BASE = "http://127.0.0.1:3000";
} else if (env === "production") {
  BASE = "";
}
import NavBar from "@/components/NavBar";
import { mapGetters } from "vuex";
import { getUserDetail, getUserSonglist } from "@/api";
import BaseScroll from "@/components/BaseScroll";
import NetLoading from "@/components/NetLoading";
import BaseList from "@/components/BaseList";
import axios from "axios";
export default {
  metaInfo() {
    return {
      title: "我的",
    };
  },
  name: "NetMe",
  computed: {
    ...mapGetters(["user"]),
    createList() {
      const result = [];
      this.songlist.forEach((item) => {
        if (item.creator.userId === this.user.userId) {
          result.push(item);
        }
      });
      return result;
    },
    favoriteList() {
      const result = [];
      this.songlist.forEach((item) => {
        if (item.creator.userId !== this.user.userId) {
          result.push(item);
        }
      });
      return result;
    },
  },
  created() {
    this._getUserDetail();
    this._getUserSonglist();
  },
  watch: {
    scrollY(newValue) {
      const bgcHeight = this.$refs.meBackground.clientHeight;
      const navHeight = this.$refs.nav.clientHeight;
      const percent = newValue / (bgcHeight - navHeight);
      this.opacity = Math.abs(1 - percent) > 1 ? 1 : Math.abs(1 - percent);
      this.color = newValue > bgcHeight - navHeight ? "#ffffff" : "";
      this.barTitle =
        newValue > bgcHeight - navHeight ? this.user.nickname : "";
    },
  },
  data() {
    return {
      active: 0,
      profile: {},
      songlist: [],
      url: "",
      barTitle: "",
      opacity: 1,
      scrollY: 0,
      color: "",
      scrollAttribute: {
        probeType: 3,
        listenScroll: true,
      },
    };
  },
  methods: {
    async _getUserDetail() {
      const params = {
        uid: this.user.userId,
      };
      try {
        const res = await getUserDetail(params);
        if (res.code === 200) {
          this.profile = res.profile;
        }
      } catch (error) {
        this.$notify({
          message: "获取数据失败",
          color: "#FFFFFF",
          background: "#00A2E8",
        });
      }
    },
    async _getUserSonglist() {
      const params = {
        uid: this.user.userId,
      };
      try {
        const res = await getUserSonglist(params);
        if (res.code === 200) {
          this.songlist = res.playlist;
        }
      } catch (error) {
        this.$notify({
          message: "获取数据失败",
          color: "#FFFFFF",
          background: "#00A2E8",
        });
      }
    },
    scroll(pos) {
      this.scrollY = Math.ceil(Math.abs(pos.y));
    },
    _normalNum(num, point) {
      let numStr = num.toString();
      if (numStr.length < 6) {
        return numStr;
      } else if (6 <= numStr.length && numStr.length <= 8) {
        return parseInt(num / 10000) + "万";
      } else if (numStr.length > 8) {
        //(1,3)
        let decimal = numStr.substring(
          numStr.length - 8,
          numStr.length - 8 + point
        );
        return parseFloat(parseInt(num / 100000000) + "." + decimal) + "亿";
      }
    },
    selctItem(id) {
      this.$router.push(`/playlistCollection/${id}`);
    },
    uploadAvatar(file) {
      //new 一个FormData格式的参数
      let params = new FormData();
      params.append("imgFile", file);
      let config = {
        headers: {
          //添加请求头
          "Content-Type": "multipart/form-data",
        },
      };
      //把 uploadUrl 换成自己的 上传路径
      axios
        .post(BASE + "/avatar/upload", params, config)
        .then((res) => {
          res = res.data.data;
          console.log(res);
          if (res.code === 200) {
            this.url = res.url;
            this._getUserDetail(this.user.userId);
          }
        })
        .catch((err) => {
          this.$notify({
            message: "更换头像失败",
            color: "#FFFFFF",
            background: "#00A2E8",
          });
        });
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      this.uploadAvatar(file.file);
    },
  },
  components: {
    NavBar,
    BaseScroll,
    NetLoading,
    BaseList,
  },
};
</script>

<style lang="less" scoped>
@import "../../common/less/variable";
.net-me {
  width: 100%;
  height: 100%;
  .nav-bar-container {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    padding: 0 24px;
    z-index: 15;
  }
  .me-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(245, 245, 245);
    overflow: hidden;
    .me-background {
      height: 402px;
      width: 100%;
      position: relative;
      .user-info {
        position: absolute;
        bottom: -175px;
        left: 24px;
        right: 24px;
        height: 200px;
        margin: 0 24px;
        box-sizing: border-box;
        background-color: #ffffff;
        border-radius: 23px;
        z-index: 12;
        .avatar {
          width: 120px;
          height: 120px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1px solid @font-light-gray;
          .image {
            width: 118px;
            height: 118px;
            border-radius: 50%;
          }
        }
      }
      .image {
        width: 100%;
        height: 100%;
      }
    }
    .desc {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
      .name {
        font-size: 25px;
        color: @font-black;
        margin-bottom: 13px;
        font-weight: 600;
        text-align: center;
      }
      .fans {
        font-size: @font_size_small-s;
        display: flex;
        color: @font-black;
        .following {
          padding-right: 18px;
          .space {
            margin-left: 6px;
            color: @font-light-gray;
          }
        }
        .followers {
          padding: 0 18px;
          border-right: 1px solid @font-light-gray;
          border-left: 1px solid @font-light-gray;
          .space {
            margin-left: 6px;
            color: @font-light-gray;
          }
        }
        .grade {
          padding-left: 18px;
        }
      }
    }
    .tab-wrap {
      width: 100%;
      margin-top: 175px;
      .basic-info {
        margin: 0 24px;
        background-color: rgb(255, 255, 255);
        font-size: @font_size_medium-s;
        padding-left: 25px;
        padding-top: 30px;
        padding-bottom: 30px;
        border-radius: 12px;
        .title {
          font-size: @font_size_large-s;
          font-weight: 600;
        }
        .age {
          margin: 30px 0;
          .village-age {
            .num {
              margin-left: 20px;
            }
          }
        }
        .area {
          .area-value {
            .name {
              margin-left: 20px;
            }
          }
        }
      }
      .music-taste {
        margin: 24px 24px 0 24px;
        background-color: rgb(255, 255, 255);
        font-size: 0;
        padding-left: 25px;
        padding-top: 30px;
        padding-bottom: 30px;
        border-radius: 12px;
        .title {
          font-size: @font_size_large-s;
          font-weight: 600;
        }
        .taste-list {
          margin-top: 23px;
        }
      }
    }
  }
}
</style>
