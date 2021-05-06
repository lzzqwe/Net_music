<template>
  <li @click="selectItem(songItem)" class="song-list-item">
    <div class="item-icon">
      <img class="img" v-lazy="songItem.coverImgUrl" alt="">
      <div class="play-count">
        <span class="iconfont iconbofangliang1"></span>{{songItem.playCount | parseNum(songItem.playCount,1)}}
      </div>
    </div>
    <p class="text">
      {{songItem.name}}
    </p>
  </li>
</template>

<script>
    export default {
      name: "SongList",
      methods:{
        selectItem(item) {
          this.$emit('select',item)
        }
      },
      props:{
        songItem:{
          type:Object
        }
      }
    }
</script>

<style lang="less" scoped>
  .song-list-item {
    margin-bottom: 33px;
    padding: 0 7px;
    &:last-child {
      margin-right: 0;
    }
    .item-icon {
      margin-bottom: 10px;
      position: relative;
      width: 155px;
      height: 155px;
      .img {
        width: 100%;
        height: 100%;
        border-radius: 12px;
      }
      .play-count {
        position: absolute;
        top: 6px;
        right: 6px;
        width: 81px;
        height: 26px;
        border-radius: 11px;
        background-color: rgba(164,184,198,0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgb(255,255,255);
        font-size: 12px;
        .iconbofangliang1 {
          font-size: 12px;
          margin-right: 5px;
        }
      }
    }
    .text {
      width: 145px;
      text-overflow: ellipsis;
      overflow: hidden;
      padding: 0 5px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      font-size: 16px;
      color: var(--font-color);
      line-height: 26px;
    }
  }
</style>
