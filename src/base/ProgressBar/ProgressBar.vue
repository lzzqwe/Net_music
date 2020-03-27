<template>
  <div class="progress-wrapper">
    <span>{{ format(currentTime) }}</span>
    <div ref="progressBar" @click="progressClick" class="progress-bar-wrapper">
      <div class="progress-bar">
        <div ref="barInner" class="bar-inner">
          <div ref="progress" class="progress"></div>
          <div
            ref="btnWrapper"
            class="btn-wrapper"
            @touchstart.prevent="progressTouchStart"
            @touchmove.prevent="progressTouchMove"
            @touchend.prevent="progressTouchEnd"
          >
            <div ref="btn" class="btn"></div>
          </div>
        </div>
      </div>
    </div>
    <span>{{ format(currentSong.duration) }}</span>
  </div>
</template>
<script>
// @touchstart.prevent="progressTouchStart"
// @touchmove.prevent="progressTouchMove"
// @touchend.prevent="progressTouchEnd"
// 阻止移动端的默认事件 比如复制 黏贴 橡皮筋效果
const progressBtnWidth = 16;
import { mapGetters } from "vuex";
export default {
  name: "ProgressBar",
  props: {
    currentTime: {
      type: Number,
      default: 0
    },
    percent: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.touch = {};
  },
  computed: {
    ...mapGetters(["currentSong"])
  },
  methods: {
    format(time) {
      time = Math.floor(time);
      const minute = Math.floor(time / 60);
      const second = this._pad(time % 60);
      return `${minute}:${second}`;
    },
    _pad(num, n = 2) {
      let len = num.toString().length;
      while (len < n) {
        num = "0" + num;
        len++;
      }
      return num;
    },
    progressClick(e) {
      const offsetWidth =
        e.pageX - this.$refs.progressBar.getBoundingClientRect().left;

      this.$refs.progress.style.width = `${offsetWidth}px`;

      this.$refs.btnWrapper.style[
        "transform"
      ] = `translate3d(${offsetWidth}px,0,0)`;

      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;

      const percent = this.$refs.progress.clientWidth / barWidth;

      this.$emit("percentChange", percent);
    },
    progressTouchStart(e) {
      this.touch.inintStatus = true;
      //记录第一次触摸时的位置
      this.touch.startX = e.touches[0].pageX;
      //记录初始滚动条宽度
      this.touch.width = this.$refs.progress.clientWidth;
    },
    progressTouchMove(e) {
      if (!this.touch.inintStatus) {
        return;
      }
      const distance = e.touches[0].pageX - this.touch.startX;
      // 防止歌曲滚动条滚到外面 所以划定手指触摸滑动范围
      const offsetWidth = Math.min(
        this.$refs.progressBar.clientWidth - progressBtnWidth,
        Math.max(0, this.touch.width + distance)
      );

      this.$refs.progress.style.width = `${offsetWidth}px`;

      this.$refs.btnWrapper.style[
        "transform"
      ] = `translate3d(${offsetWidth}px,0,0)`;
    },
    progressTouchEnd() {
      this.touch.inintStatus = false;

      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;

      const percent = this.$refs.progress.clientWidth / barWidth;

      this.$emit("percentChange", percent);
    }
  },
  watch: {
    percent(newPercent) {
      let progressWith = (this.$refs.barInner.clientWidth - 16) * newPercent;

      this.$refs.progress.style.width = `${progressWith}px`;

      this.$refs.btnWrapper.style[
        "transform"
      ] = `translate3d(${progressWith}px,0,0)`;
    }
  }
};
</script>
<style lang="less" scoped>
.progress-wrapper {
  display: flex;
  width: 80%;
  margin: 0 auto;
  justify-content: space-between;
  padding: 10px;
  align-items: center;

  .progress-bar-wrapper {
    flex: 1;

    .progress-bar {
      height: 30px;

      .bar-inner {
        height: 4px;
        margin: 0 5px;
        background: rgba(0, 0, 0, 0.3);
        position: relative;
        top: 10px;

        .progress {
          position: absolute;
          top: 0;
          height: 100%;
          background: red;
        }

        .btn-wrapper {
          position: absolute;
          top: -13px;
          left: -7px;
          width: 30px;
          height: 30px;

          .btn {
            position: relative;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #ffcd32;
            box-sizing: border-box;
            border: 3px solid #fff;
            left: 7px;
            top: 7px;
          }
        }
      }
    }
  }
}
</style>
