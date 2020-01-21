<template>
	<div ref="mine" class="mine">
		<div class="back" @click="back">
      <span class="iconfont iconfanhui"></span>
    </div>
		<van-tabs v-model="active" swipeable>
     <van-tab title="我喜欢的">
      <div ref="listWrapper" class="list-wrapper">
        <base-scroll ref='favorite' class="mine-item" :data="favoriteList">
          <song-list @select="selectSong" :songs='favoriteList'></song-list>
          <no-result v-show="!favoriteList.length"></no-result>   
        </base-scroll>
      </div>
     </van-tab>
     <van-tab title="最近听听">
      <div ref="listWrapper" class="list-wrapper">
        <base-scroll ref='mineItem' class="mine-item" :data="playHistory">
          <song-list @select="selectSong" :songs='playHistory'></song-list>
          <no-result :title='title' v-show="!playHistory.length"></no-result> 
        </base-scroll>
      </div>
     </van-tab>
   </van-tabs>
	</div>
</template>
<script>
import SongList from 'base/SongList/SongList'
import BaseScroll from "base/BaseScroll/BaseScroll";
import {mapGetters,mapActions} from 'vuex'
import NoResult from 'base/NoResult/NoResult'
import {playListMixin}from 'common/js/mixin.js'
import Song from 'common/js/song.js'
	export default {
		name:'mine',
    mixins:[playListMixin],
		data() {
			return {
				active:0,
				title:'暂无播放历史'
			}
		},
		computed:{
     ...mapGetters(['favoriteList','playHistory'])
		},
		methods:{
			back() {
				this.$router.back()
			},
      handlePlaylist(playList) {
         // console.log(this.$refs.listView.$el)
        const bottom = playList.length > 0 ? '60px' : 0
        // $el  Vue 实例使用的根 DOM 元素。理解为使用该组件的组件
        // this.$refs.listWrapper.style.bottom = bottom
        document.querySelector('.list-wrapper').style.bottom = bottom
        console.log(document.querySelector('.list-wrapper'))
      },  
			selectSong(song) {
        console.log(song)
        this.insertSong(new Song(song))
			},
			...mapActions(['insertSong'])
		},
		components:{
			SongList,
			BaseScroll,
			NoResult
		}
	}
</script>
<style lang='stylus' scoped>
@import '~common/stylus/variable.styl'
.mine >>> .van-tabs 
  overflow hidden
.mine >>> .van-tabs__wrap
  width 50%
  margin 10px auto
  z-index 100
.mine >>>.van-tabs__nav
  border-radius 5px
  overflow hidden
.mine 
	position fixed
	top 0
	bottom 0
	width 100%
	z-index 50
	background-color $color-background
	.back
    position absolute
    left 10px
    top 10px
    z-index 15
    .iconfont
      font-size 22px
      color red
      font-weight 600
      color #ffcd32
.list-wrapper
  position fixed
  top 60px
  bottom 0
  width 100%
  padding 0 20px
  box-sizing border-box       
  .mine-item
    width 100%
    height 100%     
</style>