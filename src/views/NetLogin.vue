<template>
  <div class="login-wrap">
<!--    <h1 class="login-logo"></h1>-->
    <div class="login">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>

</template>

<script>
  import {getLogin} from '../api/index.js'
  import {saveUserInfo} from '../common/js/cache'
  import {mapActions} from 'vuex'
    export default {
      name: "NetLogin",
      data() {
        return {
          username: '',
          password: ''
        };
      },
      methods: {
      async onSubmit() {
          const res = await getLogin(this.username,this.password)
          if(res.code===200) {
            //保存在localstorage
            const userInfo = saveUserInfo(res.profile)
            //保存在vuex中
            this.save_user_info({userInfo})
            console.log(this.$route)
            if(this.$route.path==='/login') {
              this.$router.push('/')
            }
          }
        },
        ...mapActions(['save_user_info'])
      }
    }
</script>

<style lang="less" scoped>
.login-wrap {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  .login {
    padding: 150px 24px 0 24px;
  }
}

</style>
