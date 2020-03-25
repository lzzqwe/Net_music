<template>
   <base-scroll
   :data='data'
   ref="listView" 
   class="list-view">
       <div ref="listGroup" class="list-group">
         <ul>
           <li
            class="item border-1px" 
            :key='index' 
            v-for="(item,index) in data"
            @click="selectItem(item)"
            >
             <img class="item-img" v-lazy="item.picUrl" alt="">
             <span class="name">{{ item.name }}</span>
           </li>
         </ul>
       </div>
     <div class="loading-container" v-show="!data.length">
       <van-loading type="spinner" color="#1989fa">加载中...</van-loading>
     </div>
   </base-scroll>
</template>
<script>
const ANCHOR_HEIGHT = 20
import BaseScroll from "base/BaseScroll/BaseScroll";
import {getData} from 'common/js/dom'
export default {
  props:{
    data:{
      type:Array,
      default:() => {
        return []
      }
    }
  },
  methods:{
    selectItem(item) {
      this.$emit('select',item)
    },
    scrollTo() {
      this.$refs.listView.scrollTo(0,0,300)
    }
  },
  components:{
    BaseScroll
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl';
.list-view
  width 100%
  overflow hidden
  position fixed
  top 140px
  bottom 0
  .list-group
    .title
      line-height 30px
      padding-left 20px
      color rgba(255,255,255,0.5)
      background #333
      font-size 12px
    .item
      margin 20px 20px 0 20px
      border-1px(#FFEC73)
      .item-img
        border-radius 50%
        vertical-align middle
        margin-right 20px
        width 50px
        height 50px
        margin-bottom 5px
      .name
        font-size 14px
  .shortcut-list
    position fixed
    top 50%
    right 0 
    width 20px
    text-align center
    background red
    transform translateY(-50%)
    padding 20px 0
    border-radius 10px
    z-index 101
    .shortcut
      line-height 20px
      font-size 10px
      &.current
        color blue
        font-weight 800
        transform scale(1.5)
  .loading-container
    position fixed
    top 50%
    left 50%
    transform translateX(-50%)
  .list-fixed
    position fixed
    top 91px
    z-index 100
    overflow hidden
    width 100%
    .fix-title
      line-height 30px
      padding-left 20px
      color rgba(255,255,255,0.5)
      background #333
      font-size 12px                
</style>

