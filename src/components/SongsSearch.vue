<template>
  <div class="song-search">
    <div class="search-input-wrap">
      <div class="search-input">
        <span @click="hide" class="iconfont iconxia"></span>
        <div class="input">
          <input v-model="keyword" placeholder="搜索歌单内的歌曲" type="text" class="txt">
        </div>
      </div>
      <div :style="{backgroundImage:`url(${picUrl})`}" class="search-background"></div>
    </div>
    <base-scroll :data="list" class="song-wrap">
      <div>
        <base-songs @play="play" :songs="list"></base-songs>
      </div>
    </base-scroll>
  </div>
</template>

<script>
  import BaseSongs from "./BaseSongs";
  import BaseScroll from "./BaseScroll";
  import {mapActions} from 'vuex'
    export default {
      name: "SongsSearch",
      props:{
        picUrl:{
          type:String
        },
        songs:{
          type:Array
        }
      },
      components:{
        BaseSongs,
        BaseScroll
      },
      data() {
        return {
          keyword:'',
          list:[]
        }
      },
      methods:{
        hide() {
          this.$emit('hide')
          this.keyword =''
        },
        play(index) {
          this.select_play({playlist:this.list,index})
        },
        getKeywordlist(keyword) {
          let result = []
          this.songs.forEach((item) => {
            if(keyword) {
              if(item.name.indexOf(keyword)>-1) {
                result.push(item)
              }
            }
          })
          return result
        },
        ...mapActions(['select_play'])
      },
      watch:{
        keyword(newValue) {
          this.list = this.getKeywordlist(newValue)
        }
      }
    }
</script>

<style lang="less" scoped>
.song-search {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--body-bgcolor);
  z-index: 2;
  .search-input-wrap {
    position: relative;
    overflow: hidden;
    .search-input {
      display: flex;
      align-items: center;
      padding: 20px 12px 12px 27px;
      .iconxia {
        font-size: 28px;
        display: inline-block;
        flex: 0 0 28px;
        width: 28px;
        margin-right: 27px;
        color: rgb(255,255,255);
      }
      .input {
        flex: 1;
        border-bottom: 1px solid rgb(187,187,184);
        .txt {
          width: 100%;
          margin-bottom: 10px;
          border-left: 1px solid rgb(70,70,70);
          font-size: 22px;
          color: rgb(137,136,136);
        }
      }
    }
    .search-background {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      filter: blur(40px);
      opacity: 1;
      transform: scale(3);
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 50%;
      z-index: -1;
    }
  }
  .song-wrap {
    position: fixed;
    top: 130px;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0 24px;
    overflow: hidden;
  }

}
</style>
