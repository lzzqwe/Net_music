<template>
  <div class="login-wrap">
    <!--    <h1 class="login-logo"></h1>-->
    <div class="login">
      <van-form @submit="onSubmit">
        <van-field
          v-model="phone"
          name="手机号"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { getLogin } from "@/api/index.js";
import { getToken } from "@/common/js/auth";
import { saveUserInfo } from "@/common/js/cache";
import { mapActions } from "vuex";
export default {
  metaInfo() {
    return {
      title: "登录",
    };
  },
  name: "NetLogin",
  data() {
    return {
      phone: "",
      password: "",
      cookie: "",
    };
  },
  methods: {
    async onSubmit() {
      const params = {
        phone: this.phone,
        password: this.password,
      };
      try {
        const res = await getLogin(params);
        if (res.code === 200) {
          //保存在localstorage
          const userInfo = saveUserInfo(res.profile);
          console.log(getToken());
          //保存在vuex中
          this.save_user_info(userInfo);
          this.save_token(getToken());
          console.log(this.$route);
          if (this.$route.path === "/login") {
            this.$router.push("/");
          }
        }
      } catch (error) {
        this.$notify({
          message: "提交数据失败",
          color: "#FFFFFF",
          background: "#00A2E8",
        });
      }
    },
    ...mapActions(["save_user_info", "save_token"]),
  },
};
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
