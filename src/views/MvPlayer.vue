<template>
    <div class="mv-player">
       <div ref="mvPlayer" class="player"></div>
       <div class="nav-bar-container">
         <nav-bar></nav-bar>
       </div>
      <div class="operation">
        <ul>
          <li class="operator_item">
            <span class="iconfont icondianzan1"></span>
            <span class="num">{{likedCount}}</span>
          </li>
          <li @click="showComment" class="operator_item">
            <span class="iconfont iconicon_fapinglun-mian"></span>
            <span class="num">{{commentCount}}</span>
          </li>
          <li class="operator_item">
            <span class="iconfont iconshare-fill"></span>
            <span class="num">{{shareCount}}</span>
          </li>
          <li class="operator_item">
            <span class="iconfont icontianjia"></span>
            <span class="num">收藏</span>
          </li>
        </ul>
      </div>
      <div class="user">
        <div class="avatar">
          <img v-if="userInfo.artists" class="img" :src="userInfo.artists[0].img1v1Url" alt="">
          <span class="name">{{userInfo.artistName}}</span>
          <span class="iconfont iconhao"></span>
        </div>
        <div class="desc">{{userInfo.name}}</div>
        <div class="watch">
          <span class="iconfont iconsq">热点情报局</span><span class="number">{{userInfo.playCount}}次观看</span>
        </div>
      </div>
      <van-action-sheet @close="close" :overlay="overlay" v-model="show" title="标题">
        <div class="content">内容</div>
      </van-action-sheet>
    </div>
</template>

<script>
  import {getMvUrl,getMvDetail,getMvInfo} from '../api'
  import Player from 'xgplayer'
  import NavBar from "../components/NavBar";
    export default {
      name: "MvPlayer",
      created() {
        this._getMvUrl(this.$route.params.id)
        this._getMvDetail(this.$route.params.id)
        this._getMvInfo(this.$route.params.id)
      },
      data() {
        return {
          url:'',
          likedCount:0,
          shareCount:0,
          commentCount:0,
          liked:false,
          userInfo:{},
          show:false,
          overlay:false
        }
      },
      components:{
        NavBar
      },
      mounted() {
        this._initPlayer()
      },
      methods:{
       async _getMvUrl(id) {
         const res = await getMvUrl(id)
         if(res.code===200) {
           this.url = res.data.url
         }
       },
        showComment() {
         this.show=true
         this.$refs.mvPlayer.style.transform = 'translateY(-100px)'
        },
        close() {
          this.$refs.mvPlayer.style.transform = 'translateY(0)'
        },
        async _getMvDetail(mvid) {
         const res = await getMvDetail(mvid)
          if(res.code===200) {
            this.userInfo = res.data
          }
        },
        async _getMvInfo(mvid) {
         const res = await getMvInfo(mvid)
          if(res.code===200) {
              this.likedCount=res.likedCount
              this.shareCount=res.shareCount
              this.commentCount=res.commentCount
              this.liked=res.liked
          }
        },
        _normalNum(num,point) {
          console.log(num)
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
       _initPlayer() {
         if(!this.url) {
           return
         }
         this.player = new Player({
           el:this.$refs.mvPlayer,
           url:this.url,
           fluid: true,
           controls: false,
           autoplay: true
         })
       }
      },
      watch:{
        url(newUrl,oldUrl) {
          if(newUrl && newUrl !== oldUrl ) {
            if(!this.player) {
              this._initPlayer()
            } else {
              this.player.url = newUrl
              this.player.reload()
            }
          }
        }
      }
    }
</script>

<style lang="less" scoped>
@import '../common/less/variable';
.mv-player {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(0,0,0);
  z-index: 101;
  .player {
    position: absolute;
    top: 27%;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    transition: all 0.5s;
  }
  .nav-bar-container {
    padding: 0 24px;
    color: @font-white;
  }
  .operation {
    position: fixed;
    bottom: 60px;
    right: 27px;
    color:@font-white;
    font-size: @font_size_small-s;
    .operator_item {
      display: flex;
      flex-direction: column;
      margin-bottom: 40px;
      &:last-child {
        margin-bottom: 0;
      }
      .icondianzan1 {
        font-size: 36px;
      }
      .iconicon_fapinglun-mian {
        font-size: 36px;
      }
      .iconshare-fill {
        font-size: 36px;
      }
      .icontianjia {
        font-size: 36px;
      }
      .num {
        color:@font-deep-gray;
      }

    }
  }
  .user {
    position: fixed;
    bottom: 60px;
    left: 27px;
    color:@font-white;
    font-size: @font_size_small-s;
    .watch {
      .iconsq {
        padding: 10px;
        display: inline-block;
        border-radius: 5px;
        border: 1px solid rgb(36,36,36);
        margin-right: 10px;
        margin-top: 10px;
      }
    }
    .user {

    }
    .desc {
      margin-top: 10px;
    }
    .avatar {
      display: flex;
      align-items: center;
      .img {
        width: 46px;
        height: 46px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .name {
        font-weight: 600;
        margin-right: 10px;
      }
      .iconhao {
        display: inline-block;
        padding: 5px 10px;
        border-radius: 8px;
        background-color: red;
      }
    }
  }
  .content {
    padding: 0 24px 0 24px;
    height: 400px;
  }
}
</style>
