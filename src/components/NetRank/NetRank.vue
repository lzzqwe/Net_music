<template>
  <div ref="rank" class="rank">
    <slide-bar :title='title'></slide-bar>
    <base-scroll
     ref='topList'
     class="topList"
     :data='topList'
     >
     <div>
      <ul>
       <h1 class="official-title">官方榜</h1>
       <li
        class="item" 
        :key='index' v-for="(item,index) in officialList"
        @click="selectRankItem(item,index)"
        >
         <div class="icon">
           <img width="100" height="100" v-lazy="item.coverImgUrl">
         </div>
         <div class="songlist web-font">
           <ul>
             <li :key='index' class="songlist-item" v-for="(subItem,index) in item.tracks">
               <span class="songlist-index">{{index+1}}.</span>
               <span>{{subItem.first}}-{{subItem.second}}</span>
             </li>
           </ul>
         </div>
       </li>
      </ul>
      <h1 class="official-title">推荐榜</h1>
      <div class="rank-list">
        <div :key='index' @click="selectRankItem(item,index)" class="rank-list-item" v-for="(item,index) in topList">
          <img width="100%" v-lazy="item.coverImgUrl">
          <p class="rank-list-name">{{item.name}}</p>
          <p class="rank-update">{{item.updateFrequency}}</p>
        </div>
      </div> 
     </div> 
    </base-scroll>
    <div class="loading-container">
      <van-loading v-show="!this.topList.length" type="spinner" color="#1989fa">加载中...</van-loading>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>       
</template>
<script>
import {getToplist} from 'api/index.js'
import BaseScroll from "base/BaseScroll/BaseScroll";
import SlideBar from 'base/SlideBar/SlideBar'
import {mapMutations} from 'vuex'
import {playListMixin} from 'common/js/mixin.js'
export default {
    mixins:[playListMixin],
    name:'rank',
    data() {
     return {
       topList:[],
       title:'排行榜',
       officialList:[]
     }
    },
    methods:{
      async _getTopList() {
        const {code,list} = await getToplist()
        if(code === 200) {
          this.officialList = list.slice(0,4)
          this.topList = list.slice(4)
        }
      },
      rankBack() {
       this.$router.back()
      },
      selectRankItem(item,index) {
       this.$router.push({
         path:`/rank/${index}`
       })
       this.SET_TOPLIST(item)
      },
       handlePlaylist(playList) {
         // console.log(this.$refs.listView.$el)
        // const bottom = playList.length > 0 ? '60px' : 0
        // $el  Vue 实例使用的根 DOM 元素。理解为使用该组件的组件
        // this.$refs.topList.style.bottom = bottom
        // this.$refs.singer.refresh()
        setTimeout(() => {
         const bottom = playList.length > 0 ? '60px' : 0
         this.$refs.topList.$el.style.bottom = bottom
      },30)
      },  
      ...mapMutations(['SET_TOPLIST'])
    },
    components:{
      BaseScroll,
      SlideBar
    },
    created() {
      this._getTopList()
    },
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/mixin.styl'
@import '~common/stylus/variable.styl'
.rank
  position fixed
  top 0
  bottom 0
  width 100%
  background-color $color-background
  .topList
    width 100%
    position fixed
    top 50px
    bottom 0
    overflow hidden
    .rank-list
      display flex
      flex-wrap wrap
      justify-content space-between
      margin-top 15px
      padding 0 5px
      width 100%
      box-sizing border-box
      .rank-list-item
        width 32.5%
        position relative
        padding-bottom 10px
        .rank-list-name
          line-height 1.5
          font-size 12px
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
        .rank-update
          position absolute
          left 5px
          bottom 40px
          font-size 10px  
    .official-title
      line-height 50px
      padding-left 25px
      font-weight 600
      font-size 20px
    .item
      display flex
      padding 20px 20px 0
      overflow hidden
      .icon
        width 100px
        height 100px
        flex 0 0 100px
        img
          border-radius 5px
      .songlist
        flex 1
        margin-left 10px
        font-size 10px
        background #333
        padding 10px 0 0 10px
        color rgba(255,255,255,0.3)
        .songlist-item
          no-wrap()
          line-height 26px
          width 200px
          display flex
          .songlist-index
            margin-right 5px
  .loading-container
    position absolute
    top 50%
    left 50%
    transform translateX(-50%)
    transform translateY(-50%)
  .v-enter
    transform translate3d(0,-100%,0)
    opacity 0
  .v-leave-to
    transform translate3d(0,100%,0)
    opacity 1
  .v-enter-active,.v-leave-active
    transition all 0.5s ease                    
</style>
