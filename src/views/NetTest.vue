<template>
    <Scroll
      ref="scroll"
      :autoUpdate="true"
      @pullingDown="loadRefresh"
      class="test">
      <ul>
        <li :key="index" v-for="(item,index) in list">{{item}}</li>
      </ul>
    </Scroll>
</template>

<script>
  import moment from 'moment'
  import Scroll from 'vue-slim-better-scroll'
    export default {
      name: "NetTest",
      components:{
        Scroll
      },
      data() {
        return {
          list:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27]
        }
      },
      mounted() {
        this.getDate()
        try {
          throw new Error("Whoops!");
        } catch (e) {
          console.log(e.name + ": " + e.message)
        }
      },
      methods:{
        loadRefresh() {
          console.log('sadasd')
          setTimeout(() => {
            this.$refs.scroll.update(true)
          },3000)

        },
        getDate() {
          let date = new Date(1610959896617)
          console.log(date.getFullYear())
        }
      }
    }
</script>

<style lang="less" scoped>
.test {
  width: 100%;
  height: 100%;
  font-size: 30px;
  line-height: 50px;
  padding: 0 24px;
  box-sizing: border-box;
  }
</style>
