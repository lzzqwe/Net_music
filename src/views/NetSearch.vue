<template>
    <div class="search">
      <div class="search-input-container">
        <div @click="back" class="left-arrow">
          <span class="iconfont iconyoujiantou"></span>
        </div>
        <div class="input-content">
          <input v-model="value" class="input" type="text">
          <span @click="clear" v-show="value" class="iconfont iconiconjia"></span>
        </div>
      </div>
      <div class="tab-wrap">
        <van-tabs @click="onClick" v-model="active">
          <van-tab title="综合">
            <scroll
              :update-data="[songs]"
              @pullingDown="loadRefresh"
              class="search-content-wrap">
              <div>
                <net-card :data="songs" :title="songTitle">
                  <ul class="single-song-list">
                    <li :key="item.id" v-for="(item) in songs" class="item">
                      <div class="content">
                        <p class="name">{{item.name}}</p>
                        <div class="desc">{{item.name}}-{{item.singer}}</div>
                      </div>
                      <span class="iconfont iconsandian"></span>
                    </li>
                  </ul>
                  <div @click="getMore" class="look-over-more">
                    {{song.moreText}}
                  </div>
                </net-card>
                <net-card :data="playLists" :title="title">
                  <ul class="single-song-list">
                    <base-list @select="selectItem(item.id)" :song="item" :key="item.id" v-for="(item) in playLists"></base-list>
                  </ul>
                  <div class="look-over-more">
                    {{playList.moreText}}
                  </div>
                </net-card>
                <net-card :data="videos" :title="videoTitle">
                  <ul class="video-list">
                    <li  @click="selectVideo(item.id)" :key="item.id" v-for="(item) in videos" class="item">
                      <div class="video-album-cover">
                        <img class="image" :src="item.coverUrl" alt="">
                      </div>
                      <div class="content">
                        <h1 class="video-title">{{item.title}}</h1>
                        <div class="video-info">
                          <span>00:16,</span><span>黑猫-警长,</span><span>12万播放</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div class="look-over-more">
                    {{video.moreText}}
                  </div>
                </net-card>
                <div v-show="!this.videos.length" class="net-loading-wrap">
                  <net-loading></net-loading>
                </div>
              </div>
            </scroll>
          </van-tab>
          <van-tab title="单曲">
            <base-scroll :data="songs_1" class="song-list">
              <ul>
                <base-songs
                  :index="index"
                  :song="item"
                  :key="item.id" v-for="(item,index) in songs_1"
                  @play="playSong(index)"
                  ></base-songs>
                <div v-show="!this.songs_1.length" class="net-loading-wrap">
                  <net-loading></net-loading>
                </div>
              </ul>
            </base-scroll>
          </van-tab>
          <van-tab title="歌单">
            <base-scroll class="list" :data="playLists_1">
              <ul class="single-song-list">
                <base-list @select="selectItem(item.id)" :song="item" :key="item.id" v-for="(item) in playLists_1"></base-list>
                <div v-show="!this.playLists_1.length" class="net-loading-wrap">
                  <net-loading></net-loading>
                </div>
              </ul>
            </base-scroll>
          </van-tab>
          <van-tab title="视频">
            <base-scroll :data="videos_1" class="video_1">
              <ul class="video-list">
                <li @click="selectVideo(item.id)" :key="item.id" v-for="(item) in videos_1" class="item">
                  <div class="video-album-cover">
                    <img class="image" :src="item.coverUrl" alt="">
                  </div>
                  <div class="content">
                    <h1 class="video-title">{{item.title}}</h1>
                    <div class="video-info">
                      <span>00:16,</span><span>黑猫-警长,</span><span>12万播放</span>
                    </div>
                  </div>
                </li>
                <div v-show="!this.videos_1.length" class="net-loading-wrap">
                  <net-loading></net-loading>
                </div>
              </ul>
            </base-scroll>
          </van-tab>
        </van-tabs>
      </div>
    </div>
</template>

<script>
  import BaseScroll from "../components/BaseScroll";
  import BaseList from "../components/BaseList";
  import BaseSongs from "../components/BaseSongs";
  import NetCard from "../components/NetCard";
  import NetLoading from "../components/NetLoading";
  import {getSearch} from '../api'
  import {createSong} from "../common/js/song";
  import {mapActions} from 'vuex'
    export default {
      name: "NetSearch",
      props:{
        keyword:String
      },
      components:{
        BaseScroll,
        BaseList,
        NetCard,
        BaseSongs,
        NetLoading
      },
      data() {
        return {
          list: [],
          active:0,
          result:{},
          songTitle:"单曲",
          title:"歌单",
          videoTitle:'视频',
          songs:[],
          songs_1:[],
          song:{},
          playList:{},
          playLists:[],
          playLists_1:[],
          video:{},
          videos:[],
          videos_1:[],
          value:''|| this.$route.query.keyword
        };
      },
      methods: {
        back() {
          this.$router.back()
        },
        loadRefresh() {
          this._getSearch(this.$route.query.keyword,1018)
        },
        selectItem(id) {
          this.$router.push(`/playlistCollection/${id}`)
        },
        selectVideo(id) {
          console.log(id)
          this.$router.push(`/mv/${id}`)
        },
        playSong(index) {
          this.select_play({playlist:this.songs,index})
        },
        clear() {
          this.value=''
        },
        onClick(name,title) {
          console.log(name)
          if(name===1) {
            this._getSearch(this.$route.query.keyword,1)
            this.active=name
          }
          if(name===2) {
            this._getSearch(this.$route.query.keyword,1000)
            this.active=name
          }
          if(name===3) {
            this._getSearch(this.$route.query.keyword,1014)
            this.active=name
          }
        },
        getMore() {
          this._getSearch(this.$route.query.keyword,1)
          this.active=1
        },
        async _getSearch(keywords,type) {
          const res = await getSearch(keywords,type)
          if(type===1018) {
            if(res.code===200) {
              this.result = res.result
              this.playList = res.result.playList
              this.playLists = res.result.playList.playLists
              this.video = res.result.video
              this.videos = res.result.video.videos
              this.song = res.result.song
              this.songs =this._createSong(res.result.song.songs)
            }
          } else if(type===1) {
            if(res.code===200) {
              this.songs_1 =this._createSong_1(res.result.songs)
            }
          } else if(type===1000) {
            if(res.code===200) {
              this.playLists_1 =res.result.playlists
            }
          } else if(type===1014 ) {
            if(res.code===200) {
              this.videos_1 =res.result.videos
            }
          }
        },
        _createSong_1(list) {
          const songs = []
          list.forEach((item) => {
            songs.push(createSong({
              id:item.id,
              picUrl:item.artists[0].img1v1Url,
              duration:item.dt,
              singer:item.artists[0].name,
              name:item.name,
              mvId:item.mv
            }))
          })
          return songs
        },
        _createSong(list) {
          const songs = []
          list.forEach((item) => {
            songs.push(createSong({
              id:item.id,
              picUrl:item.picUrl,
              duration:item.dt,
              singer:item.ar[0].name,
              name:item.name,
              mvId:item.mv
            }))
          })
          return songs
        },
        ...mapActions(['select_play'])
      },
      created() {
        console.log(this.$route.query.keyword)
        this._getSearch(this.$route.query.keyword,1018)

      }
    }
</script>
<style lang="less" scoped>
@import '~../common/less/variable.less';
.search {
  width: 100%;
  height: 100%;
  background-color: rgb(245,245,245);
  /deep/ .van-field__control {
    font-size: 20px;
  }
  .search-input-container {
    display: flex;
    height: 70px;
    align-items: center;
    margin: 0 24px;
    overflow: hidden;
    font-size: 0;
    .left-arrow {
      flex: 0 0 @font_size_large-l;
      width: @font_size_large-l;
      .iconyoujiantou {
        font-size:@font_size_large-l;
      }
    }
    .input-content {
      flex: 1;
      position: relative;
      margin-left: 27px;
      .input {
        width: 100%;
        border-bottom: 1px solid @font-deep-gray;
        font-size: @font_size_large-s;
        padding-bottom: 13px;
      }
      .iconiconjia {
        position: absolute;
        bottom: 10px;
        right: 0;
        font-size:@font_size_large-l;
      }
    }
  }
  .tab-wrap {
    .search-content-wrap {
      position: fixed;
      top: 156px;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: hidden;
      .single-song-list {
        .item {
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid @font-light-gray;
          .content {
            flex: 0 0 410px;
            width: 410px;
            .name {
              font-size: @font_size_medium-l;
              color:@font-black;
              margin-bottom: 10px;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }
            .desc {
              font-size: @font_size_small;
              color: @font-deep-gray;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }
          }
          .iconsandian {
            font-size:@font_size_medium-l;
            color: @font-deep-gray;
          }
        }
      }
      .video-list {
        .item {
          display: flex;
          margin-bottom: 15px;
          .video-album-cover {
            width: 114px;
            height: 76px;
            flex: 0 0 114px;
            border-radius: 11px;
            overflow: hidden;
            .image {
              width: 100%;
              height: 100%;
            }
          }
          .content {
            flex: 1;
            margin-left: 15px;
            .video-title {
              font-size: 20px;
              width: 310px;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              margin-top: 15px;
            }
            .video-info {
              font-size: 14px;
              margin-top: 15px;
            }
          }
        }
      }
      .look-over-more {
        height: 60px;
        font-size: @font_size_small;
        color: @font-deep-gray;
        text-align: center;
        line-height: 60px;
      }
    }
    .song-list {
      padding: 0 24px;
      position: fixed;
      top: 156px;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: hidden;
    }
    .list {
      padding: 0 24px;
      position: fixed;
      top: 156px;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: hidden;
    }
    .video_1 {
      padding: 0 24px;
      position: fixed;
      top: 156px;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: hidden;
      .item {
        display: flex;
        margin-bottom: 15px;
        .video-album-cover {
          width: 114px;
          height: 76px;
          flex: 0 0 114px;
          border-radius: 11px;
          overflow: hidden;
          .image {
            width: 100%;
            height: 100%;
          }
        }
        .content {
          flex: 1;
          margin-left: 15px;
          .video-title {
            font-size: 20px;
            width: 310px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            margin-top: 15px;
          }
          .video-info {
            font-size: 14px;
            margin-top: 15px;
          }
        }
      }
    }
  }
}
</style>
