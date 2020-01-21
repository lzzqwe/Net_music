<template>
  <div class="search-box">
    <span class="iconfont iconsousuo"></span>
    <input ref='query' v-model="query" placeholder="搜索歌曲歌手" class="query" type="text">
    <span @click="close" v-show="query" class="iconfont iconguanbi"></span>       
  </div> 
</template>
<script>
import { debounce } from 'common/js/until.js'
export default {
   name:'SearchBox',
   data() {
     return {
       query:''
     }
   },
   methods:{
     close() {
       this.query =''
     },
     setQuery(query) {
       this.query = query
     },
     blur() {
       this.$refs.query.blur()
     }
   },
   created() {
     this.$watch('query',debounce((query) => {
       this.$emit('onchangeQuery',query)
     },200))
   } 
}
</script>
<style lang="stylus" scoped>
.search-box
  display flex
  justify-content space-between
  padding 0 6px
  background #333
  height 40px
  box-sizing border-box
  align-items center
  border-radius 6px
  .query
    flex 1
    border-color yellow
    color #ffff
    background #333
    margin 0 5px
    font-size 14px
    line-height 18px
  .iconguanbi
    position relative
    z-index 20 
</style>
