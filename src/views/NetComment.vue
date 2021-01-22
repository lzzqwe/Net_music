<template>
  <div class="net-comment">
    <div class="nav-bar-wrap">
      <nav-bar :bar-title="barTitle"></nav-bar>
    </div>
    <base-scroll :pullup="pullup" @scrollToEnd="loadMore" ref="comment" :data="comment" class="comment-content">
      <div>
        <div class="playlist-cover">
          <div class="cover">
            <img  class="image-cover" v-lazy="cover.picUrl" alt="">
          </div>
          <div class="title">
            <div class="desc">
              <p class="content">{{cover.name}}</p>
              <span class="name"><span class="from">by</span> {{cover.singer}}</span>
            </div>
            <span class="iconfont icongengduo1"></span>
          </div>
        </div>
        <base-divder></base-divder>
        <div class="comment-zone">
          <h1 class="title">评论区</h1>
          <div class="comment-option">
            <ul class="comment-option-list">
              <li class="item active">推荐</li>
              <li class="item">最热</li>
              <li class="item">最新</li>
            </ul>
          </div>
        </div>
        <div class="comment-list-wrap">
          <ul class="comment-list">
            <li :key="index" class="item" v-for="(item,index) in comment">
              <div class="avatar">
                <img class="avatar-img" v-lazy="item.user.avatarUrl" alt="">
              </div>
              <div class="comment-info van-hairline--bottom">
                <div class="user">
                  <div class="name">
                    <span class="nickname">{{item.user.nickname}}</span>
                    <span class="time">{{parseTime(item.time)}}</span>
                  </div>
                  <div class="count">
                    <span>{{item.likedCount}}</span>
                    <span class="iconfont icondianzan"></span>
                  </div>

                </div>
                <p class="text">{{item.content}}</p>
              </div>
            </li>
            <net-loading v-show="hasMore"></net-loading>
            <div class="no-result" v-show="!hasMore">已经没有了更多了</div>
          </ul>
        </div>
      </div>
    </base-scroll>
  </div>
</template>

<script>
  import moment from 'moment'
  import {getCommentPlaylist,getSongComment} from '../api/index.js'
  import {mapGetters} from 'vuex'
  import BaseDivder from "../components/BaseDivder";
  import NavBar from "../components/NavBar";
  import BaseScroll from "../components/BaseScroll";
  import NetLoading from "../components/NetLoading";
  export default {
    name: "NetComment",
    data() {
      return {
        comment:[],
        total:0,
        cover:{},
        hasMore:true,
        offset:0,
        limit:20,
        pullup:true
      }
    },
    computed:{
      barTitle() {
        return `评论(${this.total})`
      },
      ...mapGetters(['playList','obj','currentSong','fullscreen'])
    },
    components:{
      NavBar,
      BaseDivder,
      BaseScroll,
      NetLoading
    },
    created() {
      this._getCommentPlaylist()
    },
    methods:{
      async _getCommentPlaylist() {
        let id=0
        let res
        if(this.$route.query.hasOwnProperty('songListId')) {
            id=this.$route.query.songListId
            this.cover = this.obj
            res = await getCommentPlaylist(id,this.offset,this.limit)
        } else {
          id = this.$route.query.id
          this.cover = this.currentSong
          res = await getSongComment(id,this.offset,this.limit)
        }
        if(res.code === 200) {
          let hotComments = []
          if(res.hotComments) {
            hotComments=res.hotComments.slice(0,5)
          }
          this.comment = this.comment.concat(hotComments,res.comments)
          this.total = res.total
          if(this.total<3) {
            this.hasMore = false
          }
        }
      },
      parseTime(value) {
        const date = new Date(value)
        const year = date.getFullYear()
        if(year>=2021) {
          return moment(value).format('MM-DD')
        } else {
          return moment(value).format('YYYY-MM-DD')
        }
      },
      loadMore() {
        this.offset++
        if(this.comment.length<this.total) {
          this._getCommentPlaylist()
        } else {
          this.hasMore = false
        }
      },
    }
  }
</script>

<style lang="less" scoped>
  .net-comment {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index:101;
    background-color: var(--body-bgcolor);
    color: var(--font-color);
    .nav-bar-wrap {
      padding: 32px 24px 0 24px;
    }
    .comment-content {
      position: fixed;
      top: 114px;
      bottom: 0;
      width: 100%;
      overflow: hidden;
      &.bottom {
        bottom: 82px;
      }
      .playlist-cover {
        display: flex;
        padding: 0 24px;
        margin-bottom: 15px;
        .cover {
          width: 106px;
          flex: 0 0 106px;
          font-size: 0;
          .image-cover {
            width: 106px;
            height: 106px;
            border-radius: 10px;
          }
        }
        .title {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .desc {
            margin-left: 15px;
            padding-right: 26px;
            .content {
              font-size: 22px;
              line-height: 28px;
            }
            .name {
              font-size: 18px;
              margin-top: 13px;
              color: rgb(87,124,161);
              .from {
                color: rgb(102,102,102);
              }
            }
          }
          .icongengduo1 {
            font-size: 20px;
            color: rgb(179,179,179);
          }
        }
      }
      .comment-zone {
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 24px;
        .title {
          font-size: 20px;
          font-weight: 600 ;
        }
        .comment-option {
          .comment-option-list {
            display: flex;
            font-size: 18px;
            .item {
              padding-right: 15px;
              border-right: 1px solid rgb(245,245,245);
              margin-right: 15px;
              color: rgb(153,153,153);
              &:last-child {
                border: 0;
                margin-right: 0;
                padding-right: 0;
              }
              &.active {
                color: rgb(51,51,51);
                font-weight: 600;
              }
            }
          }
        }
      }
      .comment-list-wrap {
        margin-top: 16px;
        .comment-list {
          padding: 0 24px;
          .item {
            display: flex;
            margin-bottom: 15px;
            .avatar {
              width: 55px;
              flex: 0 0 55px;
              font-size: 0;
              .avatar-img {
                width: 55px;
                height: 55px;
                border-radius: 50%;
              }
            }
            .comment-info {
              margin-left: 15px;
              flex: 1;
              padding-bottom: 25px;
              .user {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 8px;
                .name {
                  display: flex;
                  flex-direction: column;
                  .nickname {
                    font-size: 16px;
                    color: rgb(102,102,102);
                  }
                  .time {
                    font-size: 12px;
                    color: rgb(175,175,175);
                    margin-top: 12px;
                  }
                }
                .count {
                  font-size: 14px;
                  color: rgb(153,153,153);
                  .icondianzan {
                    font-size: 22px;
                    margin-left: 8px;
                  }
                }
              }
              .text {
                font-size: 18px;
                margin-top: 23px;
                line-height: 32px;
              }
            }
          }
          .no-result {
            width: 100%;
            line-height: 40px;
            font-size: 20px;
            padding-bottom: 30px;
            text-align: center;
          }
        }
      }
    }
  }
</style>
