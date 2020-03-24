<template>
	<div class="no-result">
		<img src="./timg.jpg" alt="">
		<p class="no-title">{{ title }}</p>
	</div>
</template>
<script>
export default {
  name:'noresult',
  props:{
  	title:{
  		type:String,
  		default:'暂无收藏歌曲'
  	}
  }
}
</script>
<style lang="stylus" scoped>
.no-result
  position fixed
  left 50%
  top 50%
  margin-left -50px
  margin-top -50px
  width 100px
  height 100px
  img {
    width 100%
    height 100%
  }
  .no-title {
    font-size 18px
    line-height 35px
  }
</style>