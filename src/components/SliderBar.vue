<template>
  <transition name="van-slide-left">
    <div @click.self="toggle" v-show="isShowSetting" class="setting-wrap">
      <div class="setting">
        <div v-if="user.userId" class="avatar">
            <div @click="goToMe" class="avatar-image">
              <van-image
                fit="cover"
                round
                :src="user.avatarUrl"
              ></van-image>
            </div>
            <div @click="goToMe" class="user-name">
              <div class="name">
                <span>{{user.nickname}}</span>
                <span class="iconfont icongengduo1"></span>
              </div>
              <div class="scan-code">
                <span class="iconfont iconsaoma"></span>
              </div>
            </div>
          </div>
        <div v-else class="avatar">
          <div class="avatar-image">
            <van-image
              fit="cover"
              round
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F69%2F80%2F595f67c2aff1e_610.jpg&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612273689&t=46717d3dee2e757e5f1c0f7794bd112e"
            ></van-image>
          </div>
          <div class="user-name">
            <router-link to="/login" tag="div" class="name">
              <span>立即登录</span>
              <span class="iconfont icongengduo1"></span>
            </router-link>
            <div class="scan-code">
              <span class="iconfont iconsaoma"></span>
            </div>
          </div>
        </div>
        <base-scroll class="setting-content">
          <div>
            <div class="music-package">
              <div class="prerogative">
                <div class="exclusive">
                  <h1 class="title web-font">音乐包</h1>
                  <div class="desc">
                    <p class="text">立享17项专属特权</p>
                    <span class="iconfont icongengduo1"></span>
                  </div>
                </div>
                <div class="member-center ">会员中心</div>
              </div>
              <div class="member-system">
                <p>会员成长体系攻略,解锁专属特权</p>
                <van-image
                  src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1113177382,1537582296&fm=26&gp=0.jpg"
                ></van-image>
              </div>
            </div>
            <div class="info-center">
              <ul class="info-center-list">
                <li class="list-item">
                  <div class="infomation">
                    <span class="iconfont iconcomiisyejianmoshi"></span>
                    <span class="text">夜间模式</span>
                  </div>
                  <van-switch @change="change" v-model="checked" />
                </li>
                <li @click="logout" class="list-item">
                  <div class="infomation">
                    <span class="iconfont icontuichudenglu"></span>
                    <span class="text">退出登录</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </base-scroll>
      </div>
    </div>
  </transition>
</template>

<script>
  import BaseScroll from "./BaseScroll";
  import {delUserInfo} from '../common/js/cache'
  import storage from 'good-storage'
  import variables from "../common/themes/variables";
  import variablesBlack from '../common/themes/variables-black'
  import {mapGetters,mapActions} from 'vuex'
  const themes = {
    white:'white',
    dark:'dark'
  }
  const THEME_KEY = '__theme__'
  const CHECK_KEY = '__check__'
    export default {
      name: "SliderBar",
      props:{
        isShowSetting:{
          type:Boolean
        }
      },
      components:{
        BaseScroll
      },
      computed:{
        ...mapGetters(['user'])
      },
      created() {
        this.themeMap = {
          [themes.white]:{
            file:variables,
            title:'浅色'
          },
          [themes.dark]:{
            file: variablesBlack,
            title:'黑色'
          }
        }
        this.initTheme()
      },
      data() {
        return {
          checked:false || storage.get(CHECK_KEY)
        }
      },
      methods:{
        toggle() {
          this.$emit('toggle')
        },
        goToMe() {
          this.toggle()
          this.$router.push('/me')
        },
        initTheme() {
          if(!storage.get(THEME_KEY)) {
            this.changeThems(storage.get(THEME_KEY,themes.white))
          } else {
            this.changeThems(storage.get(THEME_KEY))
          }
        },
        changeThems(themeKey) {
          storage.set(THEME_KEY,themeKey)
          const theme = this.themeMap[themeKey].file
          Object.keys(theme).forEach((key) => {
            const value = theme[key]
            document.documentElement.style.setProperty(key,value)
          })
        },
        //退出登录
        logout() {
          this.$dialog.confirm({
            message:'确定退出当前账号吗?'
          }).then(() => {
            delUserInfo()
            this.clear_user_info()
          })
        },
        change(flag) {
          if(flag) {
            storage.set(CHECK_KEY,flag)
            this.changeThems(themes.dark)
          } else {
            storage.set(CHECK_KEY,false)
            this.changeThems(themes.white)
          }

        },
        ...mapActions(['clear_user_info'])
      }
    }
</script>

<style lang="less" scoped>
  @import '~../common/less/variable.less';
  .setting-wrap {
    position: fixed;
    top: 0;
    bottom: 0;
    width:100%;
    background-color: rgba(102,102,102,0.5);
    z-index: 101;
    .setting {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 454px;
      background-color: var(--body-bgcolor);
      color: var(--font-color);
      .setting-content {
        position: fixed;
        top: 64px;
        bottom: 0;
        width: 454px;
        overflow: hidden;
        .music-package {
          margin: 34px 24px 24px 24px;
          height: 163px;
          background-color: rgb(153,153,153);
          border-radius: 23px;
          .prerogative {
            padding: 20px 0 22px 0;
            margin: 0 23px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid rgb(174,174,174);
            .exclusive {
              margin-top: 2px;
              .title {
                margin-bottom: 9px;
                color: rgb(255,255,255);
              }
              .web-font {
                font-family: "webfont" !important;
                font-size: @font_size_large-l;
                font-style: normal;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }
              .desc {
                font-size: @font_size_small;
                color: rgb(216,216,216);
                display: flex;
                .text {
                  margin-right: 2px;
                }
              }
            }
            .member-center {
              width: 95px;
              height: 36px;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 17px;
              border: 1px solid rgb(238,238,238);
              color: rgb(238,238,238);
              font-size: @font_size_medium-s;
            }
          }
          .member-system {
            display: flex;
            padding: 0 23px;
            justify-content: space-between;
            margin-top: 15px;
            align-items: center;
            color: rgb(215,215,215);
            font-size: @font_size_medium-s;
          }
        }
        .info-center {
          padding: 0 24px;
          .info-center-list {
            .list-item {
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: 74px;
              border-bottom: 1px solid rgb(230,230,230);
              &:last-child {
                border-bottom: 0;
              }
              .infomation {
                font-size: @font_size_medium;
                .iconicon-test1 {
                  font-size: @font_size_medium-l;
                }
                .text {
                  margin-left: 18px;
                }
              }
              .icongengduo1 {
                font-size: @font_size_medium-l;
                color: rgb(204,204,204);
              }
            }
          }
        }
      }
      .avatar {
        padding: 22px 24px 0 24px;
        display: flex;
        .avatar-image {
          width: 42px;
          height: 42px;
          flex: 0 0 42px;
        }
        .user-name {
          flex: 1;
          margin-left: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .name {
            font-size: @font_size_medium-s;
            .icongengduo1 {
              margin-left: 9px;
              font-size: @font_size_medium-s;
            }
          }
          .scan-code {
            width: 32px;
            height: 32px;
            .iconsaoma {
              font-size: @font_size_giant;
            }
          }
        }
      }
    }
  }
  .setting {
    /deep/ .van-image {
      width:42px ;
      height: 42px;
    }
  }
  .member-system {
    /deep/ .van-image {
      width: 33px;
      height: 33px;
    }
  }
</style>
