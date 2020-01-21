<template>
	<div class="no-result">
		<img src="./timg.jpg" height="100" width="100" alt="">
		<p>{{ title }}</p>
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
</style>