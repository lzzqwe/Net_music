<template>
  <div class="net-rank">
    <div class="nav-bar-wrap">
      <nav-bar :bar-title="barTitle"></nav-bar>
    </div>
    <base-scroll :data="top" ref="netRank" class="net-rank-wrap">
      <div class="net-rank-content">
        <div class="rank-official">
          <h1 v-if="top.length>0" class="rank-title">官方榜</h1>
          <ul class="rank-official-list">
            <li @click="selectDetail(item.id)" :key="item.id" class="rank-official-item" v-for="(item) in top.slice(0,4)">
              <div class="song-cover">
                <img class="song-cover-img" :src="item.coverImgUrl" alt="">
              </div>
              <ul class="tracks-list" v-if="item.tracks">
                <li :key="index" v-for="(song,index) in item.tracks" class="tracks-item">
                  <span class="index">{{index+1}}.</span>
                  <span class="name">{{song.first}}-{{song.second}}</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <rank-list :data="top.slice(4)"></rank-list>
        <net-loading v-show="!this.top.length"></net-loading>
      </div>
    </base-scroll>
    <transition name="van-slide-right">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
  import {getTop} from '../api'
  import NavBar from "../components/NavBar";
  import RankList from "../components/RankList";
  import BaseScroll from "../components/BaseScroll";
  import NetLoading from "../components/NetLoading";
  import {mapActions,mapGetters} from 'vuex'
  export default {
    name: "NetRank",
    components:{
      NavBar,
      RankList,
      BaseScroll,
      NetLoading
    },
    created() {
      this._getTop()
    },
    mounted() {
      this.handlePlaylist(this.playList)
    },
    computed: {
      ...mapGetters(['playList'])
    },
    methods:{
      async _getTop() {
        const res = await getTop()
        if(res.code===200) {
          this.top = res.list
        }
      },
      selectDetail(id) {
        this.$router.push(`/rank/${id}`)
      },
      handlePlaylist(playList) {
        if(playList.length>0) {
          this.$refs.netRank.$el.classList.add('bottom')
        } else {
          this.$refs.netRank.$el.classList.remove('bottom')
        }
        this.$refs.netRank.refresh()
      }
    },
    data() {
      return {
        barTitle:'排行榜',
        top:[]
      }
    }
  }
</script>

<style lang="less" scoped>
.net-rank {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: var(--body-bgcolor);
  color: var(--font-color);
  .nav-bar-wrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 32px 24px 0 24px;
  }
  .net-rank-wrap {
    position: fixed;
    top: 114px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    &.bottom {
      bottom: 82px;
    }
    .net-rank-content {
      .rank-official {
        padding: 0 24px;
        margin-top: 66px;
        .rank-title {
          font-size:24px ;
          font-weight: 600;
        }
        .rank-official-list {
          margin-top: 30px;
          .rank-official-item {
            display: flex;
            margin-bottom: 15px;
            &:last-child {
              margin-bottom: 0;
            }
            .song-cover {
              width: 155px;
              height: 155px;
              flex: 0 0 155px;
              .song-cover-img {
                width: 100%;
                height: 100%;
                border-radius: 20px;
              }
            }
            .tracks-list {
              flex: 1;
              font-size: 16px;
              color: rgb(102,102,102);
              margin-top: 21px;
              .tracks-item {
                margin-left: 16px;
                margin-bottom: 29px;
                &:last-child {
                  margin-bottom: 0;
                }
                .index {

                }
                .name {

                }
              }
            }
          }
        }
      }
    }
  }
  .rank-recommend {
    padding: 0 16.5px;
    .rank-title {
      font-size: 24px;
      font-weight: 600;
      color: rgb(51,51,51);
      margin-left: 7.5px;
      margin-bottom: 18px;
    }
    .rank-list {
      display: flex;
      flex-wrap: wrap;
      .rank-item {
        margin-top: 30px;
        .song-cover {
          width: 155px;
          height: 155px;
          padding: 0 7px;
          .song-cover-img {
            width: 100%;
            height: 100%;
          }
        }
        .text {
          font-size: 14px;
          margin-top: 13px;
          text-align: left;
          padding-left: 7px;
        }
      }
    }
  }
}
</style>
