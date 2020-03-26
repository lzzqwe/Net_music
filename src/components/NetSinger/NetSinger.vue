<template>
  <div ref="singer" class="singer">
    <slide-bar :title='alias'></slide-bar>
    <div class="singer-tab">
      <classify-tab @onClick='handleCalick' :tabs='this.tabs'>
      </classify-tab>
      <classify-tab :width='width' :title="title" @onClick='letterCalick' :tabs='this.letters'>
      </classify-tab>
    </div>
    <list-view ref="artists" @select='selectSinger' :data="artists"></list-view>
    <transition>
      <router-view></router-view>
    </transition>
  </div>       
</template>
<script>
import {getSinger,getHotSinger} from 'api/index.js'
import ListView from 'base/ListView/ListView'
import ClassifyTab from 'base/ClassifyTab/ClassifyTab'
import SlideBar from 'base/SlideBar/SlideBar'
import {mapMutations} from 'vuex'
import {playListMixin} from 'common/js/mixin.js'
import {tabs,letters} from 'common/js/config.js'
export default {
    name:'singer',
    mixins:[playListMixin],
    data() {
     return {
       artists:[],
       cat:1001,
       title:'首字母',
       width:530,
       initial:-1,
       isClick:true,
       alias:'歌手'
     }
    },
    components:{
     ListView,
     ClassifyTab,
     SlideBar
    },
    created() {
      this.tabs = tabs
      this.letters = letters
      this._getHotSinger() 
    },
    methods:{
      async _getHotSinger() {
        const {artists} = await getHotSinger()
        this.artists = artists
      },
      async _getSinger() {
        const {artists} = await getSinger(this.cat,this.initial)
         this.artists = artists
      },
     handlePlaylist(playList) {
         // console.log(this.$refs.listView.$el)
        const bottom = playList.length > 0 ? '60px' : 0
        // $el  Vue 实例使用的根 DOM 元素。理解为使用该组件的组件
        this.$refs.artists.$el.style.bottom = bottom
        // this.$refs.singer.refresh()
      },
      handleCalick(index) {
       if(this.tabs[index].id) {
          this.cat = this.tabs[index].id
       }
      //  this._getSinger()
       this.$refs.artists.scrollTo()
    },
     letterCalick(index) {
       if(this.letters[index].id) {
          this.initial = this.letters[index].id
       }
       this.$refs.artists.scrollTo()
    },
    singerBack() {
      this.$router.back()
    },
    selectSinger(item) {
     this.SET_SINGER(item) 
     this.$router.push({
       path:`/singer/${item.id}`
     })
    },
    ...mapMutations([
       'SET_SINGER'
     ]
    )
  },
  watch:{
    cat(newValue,oldValue) {
       if(newValue=== oldValue) {
          return 
       }
       this._getSinger()
    },
    initial(newValue,oldValue) {
       if(newValue=== oldValue) {
          return 
       }
       this._getSinger()
    }

  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.singer
  position fixed
  width 100%
  top 0
  bottom 0
  background-color $color-background
  .singer-back
    height 50px
    line-height 50px
    position absolute
    top 0
    left 0
    z-index 10
    background-color $color-background
    width 100%
    .iconyoujiantou
      color $color-theme
      margin-left 20px
      font-size 20px
  .singer-tab 
    position fixed
    top 45px
    width 100%
    overflow hidden
    z-index 56
    box-sizing border-box
    padding 0 15px
  .v-enter
    opacity: 0;
    transform: translateY(100%);
  .v-leave-to
    opacity: 0;
    transform: translateY(-100%);
    position: absolute;
  .v-enter-active,.v-leave-active
    transition: all 0.5s ease;
</style>
