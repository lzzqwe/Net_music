<template>
  <div class="progress">
    <span class="time">{{format(time)}}</span>
    <div @click="jump" ref="progerssBar" class="progress-bar">
      <div ref="progressInnerBar" class="progress-inner-bar"></div>
      <div
        @touchstart.prevent="handleStart"
        @touchmove.prevent="handleMove"
        @touchend.prevent="handleEnd"
        ref="progressCircle" class="progress-circle-wrap">
        <div class="progress-circle"></div>
      </div>
    </div>
    <span class="time">{{format(currentSong.duration)}}</span>
  </div>
</template>

<script>
    export default {
      name: "ProgressBar",
      props:{
        currentSong:{
          type:Object
        },
        time:{
          type:Number
        },
        percent:{
          type:Number
        }
      },
      created() {
        this.touch= {}
      },
      methods:{
        handleStart(e) {
          this.touch.initStatus =true
          this.touch.startX = e.touches[0].pageX
          /*
          * 记录初始滚动条宽度
          * */
          this.touch.width = this.$refs.progressInnerBar.clientWidth
          console.log('this.touch.width'+this.touch.width)
        },
        handleMove(e) {
          if(!this.touch.initStatus) {
            return
          }
          const progerssBarWidth =this.$refs.progerssBar.clientWidth
          const progressCircleWidth = this.$refs.progressCircle.clientWidth/2
          const distance = e.touches[0].pageX-this.touch.startX
          const minDistance = Math.min(progerssBarWidth-progressCircleWidth,Math.max(0,distance+this.touch.width))
          this._offsetDistance(minDistance)
        },
        _triggerPercent() {
          const percent =  this.$refs.progressInnerBar.clientWidth/ (this.$refs.progerssBar.clientWidth-16)
          this.$emit('onPercentChange',percent)
        },
        handleEnd() {
          this.touch.initStatus =false
          this._triggerPercent()
        },
        jump(e) {
          const rect = this.$refs.progerssBar.getBoundingClientRect()
          const left =rect.left
          const distance = e.pageX-left
          this._offsetDistance(distance)
          this._triggerPercent()
        },
        _offsetDistance(h) {
          this.$refs.progressInnerBar.style.width =`${h}px`
          this.$refs.progressCircle.style.transform =`translate3d(${h}px,0,0)`
        },
        format(time) {
          time = Math.floor(time)
          const minute = Math.floor(time/60)
          const second = this._pad(time%60)
          return `0${minute}:${second}`
        },
        _pad(time,n=2) {
          let len = time.toString().length
          while (len<n) {
            time = '0' +time
            len++
          }
          return time
        }
      },
      watch:{
        percent(newPercent) {
          const progerssBarWidth =this.$refs.progerssBar.clientWidth
          const progressCircleWidth = this.$refs.progressCircle.clientWidth/2
          const innnerProgressWidth = (progerssBarWidth-progressCircleWidth)*newPercent
          this._offsetDistance(innnerProgressWidth)
        }
      },
    }
</script>

<style lang="less" scoped>
  .progress {
    display: flex;
    justify-content: space-between;
    color: rgb(185,191,200);
    margin-top: 25px;
    align-items: center;
    /*position: relative;*/
    .time {
      font-size: 10px;
      flex: 0 0 33px;
      width: 33px;
    }
    .progress-bar {
      flex: 1;
      height: 3px;
      background-color: rgb(94,105,125);
      margin: 0 17px;
      position: relative;
      font-size: 0;
      .progress-circle-wrap {
        width: 30px;
        height: 30px;
        position: absolute;
        bottom: -15px;
        left: 0;
        padding: 2px;
        display: flex;
        align-items: center;
        .progress-circle {
          border-radius: 50%;
          background-color:rgb(254,254,254);
          width: 16px;
          height: 16px;
        }
      }
      .progress-inner-bar {
        height: 3px;
        top: 0;
        position: absolute;
        left: 0;
        background-color: red;
      }
    }
  }
</style>
