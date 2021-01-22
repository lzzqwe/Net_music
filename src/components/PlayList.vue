<template>
  <transition name="van-slide-up">
    <div @click="showPlaylist" v-show="show" class="playlist-wrap">
      <div  class="content">
        <div class="name">
          <h1 class="title">当前播放({{this.list.length}})</h1>
          <span @click.stop="clearAll" class="iconfont iconlajitong1"></span>
        </div>
        <base-scroll :data="list" class="playlist">
          <ul>
            <li @click.stop="selectItem(index)" :key="item.id" v-for="(item,index) in list" class="item">
              <div :class="{current:currentIndex===index}" class="singer-name">
                {{item.name}}<span :class="{current:currentIndex===index}" class="txt">-{{item.singer}}</span>
              </div>
              <span class="iconfont iconiconjia"></span>
            </li>
          </ul>
        </base-scroll>
      </div>
    </div>
  </transition>
</template>

<script>
  import BaseScroll from "./BaseScroll";
  import {mapActions} from 'vuex'
    export default {
      name: "PlayList",
      props:{
        list:{
          type:Array
        },
        show:{
          type:Boolean
        }
      },
      data() {
        return {
          currentIndex:-1
        }
      },
      methods:{
        showPlaylist() {
          this.$emit('show')
        },
        selectItem(index) {
          this.$emit('select',index)
          this.currentIndex = index
        },
        clearAll() {
          this.$dialog.confirm({
            message:'是要清除所有的歌曲吗?'
          }).then(() => {
            this.clear_playlist()
            this.$emit('show')
          })

        },
        ...mapActions(['clear_playlist'])
      },
      components:{
        BaseScroll
      }
    }
</script>

<style lang="less" scoped>
  @import '../common/less/variable.less';
  @import '../common/less/mixin.less';
  .playlist-wrap {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    background-color: rgba(0,0,0,0.5);
    .content {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 400px;
      background-color: var(--body-bgcolor);
      color: var(--font-color);
      z-index: 2025;
      .name {
        display: flex;
        justify-content: space-between;
        padding: 0 24px;
        height: 60px;
        align-items: center;
        .title {
          font-size: 25px;
          font-weight: 600;
          color: @font-black;
        }
        .iconlajitong1 {
          font-size: 25px;
        }
      }
      .playlist {
        height: 100%;
        margin-top: 35px;
        padding: 0 24px;
        overflow: hidden;
        .item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 45px;
          font-size: 0;
          .singer-name {
            font-size: 20px;
            width: 400px;
            .no-wrap;
            &.current {
              color: red;
            }
            .txt {
              font-size: 14px;
              color: @font-deep-gray;
              &.current {
                color: red;
              }
            }
          }
          .iconiconjia {
            font-size: 20px;
            color:  @font-deep-gray;
          }
        }
      }
    }
  }
</style>
