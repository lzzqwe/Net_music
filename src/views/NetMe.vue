<template>
    <div class="net-me">
      <div class="nav-bar-container">
        <nav-bar></nav-bar>
      </div>
      <base-scroll :data="songlist" class="me-container">
        <div>
          <div class="me-background">
            <img class="image" v-lazy="profile.backgroundUrl" alt="">
            <div class="user-info">
              <div class="avatar">
                <img class="image" v-lazy="profile.avatarUrl" alt="">
              </div>
              <div class="desc">
                <h1 class="name">{{profile.nickname}}</h1>
                <div class="fans">
                  <span class="following">{{profile.follows}}<span class="space">关注</span></span>
                  <span class="followers">{{profile.followeds}}<span class="space">粉丝</span></span>
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
                    <span class="village-age">村龄:<span class='num'>1年</span></span>
                  </div>
                  <div class="area">
                    <span class="area-value">地区:<span class="name">白沙</span></span>
                  </div>
                </div>
                <div class="music-taste">
                  <h1 class="title">创建的歌单</h1>
                  <ul class="taste-list">
                    <base-list
                      :song="item"
                      :key="item.id"
                      v-for="(item) in createList"
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
                      v-for="(item) in favoriteList"
                      @select="selctItem(item.id)"
                    ></base-list>
                  </ul>
                </div>
                <div class="loading-wrap">
                  <net-loading v-show="!songlist"></net-loading>
                </div>
              </van-tab>
              <van-tab title="视频">

              </van-tab>
              <van-tab title="动态">

              </van-tab>
            </van-tabs>
          </div>
        </div>
      </base-scroll>
    </div>
</template>

<script>
  import NavBar from "../components/NavBar";
  import {mapGetters} from 'vuex'
  import {getUserDetail,getUserSonglist} from '../api'
  import BaseScroll from "../components/BaseScroll";
  import NetLoading from "../components/NetLoading";
  import BaseList from "../components/BaseList";
    export default {
      name: "NetMe",
      computed:{
        ...mapGetters(['user']),
        createList() {
          const result = []
          this.songlist.forEach((item) => {
            if(item.creator.userId === this.user.userId) {
               result.push(item)
            }
          })
          return result
        },
        favoriteList() {
          const result = []
          this.songlist.forEach((item) => {
            if(item.creator.userId !== this.user.userId) {
              result.push(item)
            }
          })
          return result
        }
      },
      created() {
        this._getUserDetail(this.user.userId)
        this._getUserSonglist(this.user.userId)
      },
      data() {
        return {
          active:0,
          profile:{},
          songlist:[]
        }
      },
      methods:{
        async _getUserDetail(uid) {
          const res = await getUserDetail(uid)
          if(res.code === 200) {
            this.profile = res.profile
          }
        },
        async _getUserSonglist(uid) {
          const res = await getUserSonglist(uid)
          if(res.code === 200) {
            this.songlist = res.playlist
          }
        },
        _normalNum(num,point) {
          let numStr = num.toString();
          if(numStr.length<6) {
            return numStr
          } else if(6<=numStr.length && numStr.length<=8) {
            return parseInt(num/10000)+"万"
          } else if(numStr.length>8) {//(1,3)
            let decimal = numStr.substring(numStr.length-8,numStr.length-8+point)
            return parseFloat(parseInt(num/100000000)+"."+decimal)+"亿"
          }
        },
        selctItem(id) {
          this.$router.push(`/playlistCollection/${id}`)
        }
      },
      components:{
        NavBar,
        BaseScroll,
        NetLoading,
        BaseList
      }
    }
</script>

<style lang="less" scoped>
  @import '~../common/less/variable.less';
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
    background-color: rgb(245,245,245);
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
          border: 1px solid @font-light-gray ;
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
      transform: translate3d(-50%,-50%,0);
      .name {
        font-size: 25px;
        color: @font-black;
        margin-bottom: 13px;
        font-weight: 600;
        text-align: center;
      }
      .fans {
        font-size:@font_size_small-s;
        display: flex;
        color: @font-black;
        .following {
          padding-right: 18px;
          .space {
            margin-left: 6px;
            color:@font-light-gray;
          }
        }
        .followers {
          padding:0 18px;
          border-right: 1px solid @font-light-gray;
          border-left: 1px solid @font-light-gray;
          .space {
            margin-left: 6px;
            color:@font-light-gray;
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
        background-color: rgb(255,255,255);
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
        background-color: rgb(255,255,255);
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
