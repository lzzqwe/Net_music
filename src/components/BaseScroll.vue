<template>
  <div ref="scroll">
    <slot></slot>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'BaseScroll',
    props: {
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      probeType: {
        type: Number,
        default: 0
      },
      scrollX: {
        type: Boolean,
        default: false
      },
      data: {
        type: [Array, Object],
        default: () => {
          return []
        }
      },
      delayTime: {
        type: Number,
        default: 20
      },
      pullup: {
        type: Boolean,
        default: false
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      bounce: {
        type: Object,
        default: () => {
          return {
            top: true,
            bottom: true,
            left: true,
            right: true
          }
        }
      }
    },
    mounted() {
      // console.log('son-mounted')
      this.$nextTick(() => {
        this._initScroll()
      })
    },
    methods: {
      _initScroll() {
        if (!this.$refs.scroll) {
          return
        }
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.scroll, {
            click: this.click,
            probeType: this.probeType,
            scrollX: this.scrollX,
            bounce: this.bounce
          })
          if (this.listenScroll) {
            this.scroll.on('scroll', (pos) => {
              this.$emit('onscroll', pos)
            })
          }
          if (this.pullup) {
            //滚动结束触发 回调函数
            this.scroll.on('scrollEnd', (pos) => {
              //scroll 纵向滚动的位置区间是 0 - maxScrollY，并且 maxScrollY 是负值。
              if (pos.y <= this.scroll.maxScrollY + 50) {
                this.$emit('scrollToEnd')
              }
            })
          }
          if (this.beforeScroll) {
            this.scroll.on('beforeScrollStart', () => {
              this.$emit('beforeScroll')
            })
          }
        } else {
          this.refresh()
        }

      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },

    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.delayTime)
      }
    }
  }
</script>
<style lang="less" scoped>
</style>
