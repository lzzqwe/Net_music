<template>
    <div class="project">
        <slide-bar :title="title"></slide-bar>
        <h1 class="project-title">点击以下文字访问</h1>
        <img class="imgstyl" src="https://qq.yh31.com/tp/zjbq/202003131232201016.gif" alt="">
        <a class='address' href="https://github.com/lzzqwe/Net_music.git">项目地址</a>
    </div>
</template>
<script>
import SlideBar from 'base/SlideBar/SlideBar'
export default {
    name:'NetProject',
    data() {
        return{
            title:'项目地址'
        }
    },
    components:{
        SlideBar
    }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.project
    position fixed
    top 0
    bottom 0
    right 0
    left 0
    background-color $color-background
    .project-title
      font-size 20px
      margin 50px
      font-weight normal
    .address
      text-align center
      width 300px
      margin 0 auto
      display block
      color pink
    .imgstyl
      width 150px
      height 150px            
</style>