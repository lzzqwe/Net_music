<template>
    <div class="back">
       <span @click="Back" class="iconfont iconyoujiantou"></span>
       <span style="margin-left:15px">{{title}}</span>
    </div>
</template>
<script>
export default {
  name:'SlideBar',
  props:{
    title:{
      type:String,
    }
  },
  methods:{
    Back() {
      this.$router.back()
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.back
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
</style>