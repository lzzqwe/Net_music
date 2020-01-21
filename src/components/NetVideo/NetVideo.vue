<template>
  <div ref='videos' class="videos" v-if="mv.length > 0">
    <base-scroll 
    :data="mv"
    :pullup='pullup' 
    class="video-content"
    @scrollToEnd='loadMoreVideo'
    >
      <div>
        <div v-show="updateTime" class="update-time">
          <span>更新时间:</span><span>{{  updateTime|formateDate }}</span>
        </div>
        <div @click="handleClick(item)" :key="index+ '-only'" v-for="(item,index) in mv" class="mv-image">
          <img :src="item.cover" alt="">
          <div class="play-count">
             <span class="iconfont iconbofang2"></span>{{ parseInt(item.playCount/10000) }}万
          </div>
          <div class="title">
            <span class="song-name">{{ item.name }}</span><span class="singer-name">{{ item.artistName }}</span>
          </div>
        </div>
      </div>
    </base-scroll>
     <div class="loading-container" v-show='!mv.length'>
       <van-loading type="spinner" color="#1989fa">加载中...</van-loading>
     </div>
    <transition name="van-slide-up">
    	<router-view></router-view>
    </transition>
  </div>
</template>
<script>
import BaseScroll from 'base/BaseScroll/BaseScroll'
import { getMvRank } from 'api/index.js'
import { getDate } from 'common/js/until.js'
import {playListMixin} from 'common/js/mixin.js'
export default {
  name: 'NetVideo',
  mixins:[playListMixin],
  data() {
    return {
      mv: [],
      limit: 20,
      offset: 0,
      poster: '',
      updateTime:'',
      pullup:true,
      hasMore:true
    }
  },
  components: {
    BaseScroll
  },
  created() {
    this._getMvRank()
  },
  filters:{
    formateDate(time) {
    	let date = new Date(time)
    	return getDate(date)
    }
  },
  methods: {
    async _getMvRank() {
      const { data,updateTime } = await getMvRank({ limit: this.limit, offset: this.offset })
      this.mv = this.mv.concat(data)
      this.updateTime = updateTime
      this._hasMore(this.mv)
    },
    _hasMore(data) {
      if(!data.length) {
        this.hasMore = false
      }
    },
    loadMoreVideo() {
      if(!this.hasMore) {
        this.$toast('哥 已经到底了,没有数据了')
        return
      }
      this.offset++
      this.$toast.loading({
        message:'加载中...',
        forbidClick:true
      })
      this._getMvRank()
    },
     handlePlaylist(playList) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        const bottom = playList.length > 0 ? '60px' : 0
        document.querySelector('.videos').style.bottom = bottom
      },90)
      
    },
    _getDate() {
    	getDate(this.updateTime)
    },
    handleClick(item) {
     this.$router.push({
     	path:`/videos/${item.id}`
     })
    }
  }
}

</script>
<style lang='stylus' scoped>
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';
.videos 
  position: fixed;
  top: 100px;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  .loading-container
    position fixed
    top 50%
    left 50%
    transform translateX(-50%)
  .video-content 
    width: 100%;
    height: 100%;
    .update-time 
    	padding-left: 20px;
    	line-height:40px;
    	font-weight:600;
    	font-size:$font-size-medium;
    .mv-image 
      padding: 0 20px 20px 20px;
      position:relative;
      img 
        width: 100%;
        border-radius: 5px;
      .play-count 
      	position:absolute;
      	top:5px;
      	right:25px;
      	font-size:$font-size-small;
      	.iconbofang2 
      		margin-right:5px;
      .title 
      	display:flex;
      	flex-direction:column;
      	overflow:hidden;
      	.song-name 
      		font-size:$font-size-medium;
      		no-wrap();
      		font-weight:600;
      		line-height:40px;
      		color:$color-theme;
      	.singer-name 
      		font-size:$font-size-small;
      		color:$color-text-d;
</style>
