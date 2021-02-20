<template>
  <div class="full-size login-page">
    <v-card class="login-page-card" elevation="10">
      <div class="banner-container">
        <v-card class="input-banner" color="primary">
          <div class="banner-title">Register</div>
        </v-card>
      </div>
      <div class="input-container">
        <template v-for="(item, index) in items">
          <BaseInput
            v-on:change="item.value = $event"
            :title="item.title"
            :icon="item.icon"
            :key="index"
          ></BaseInput>
        </template>
      </div>
      <div class="button-container">
        <v-btn depressed tile width="50%" to="/login">
          Back
        </v-btn>
        <v-btn depressed tile color="primary" width="50%" @click="register">
          Submit
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import BaseInput from "@/components/BaseInput";
import axios from "axios";

export default {
  name: "Register",
  components: {
    BaseInput
  },
  data() {
    return {
      items: {
        username: { title: "UserName", icon: "account-circle", value: "" },
        email: { title: "Email", icon: "at", value: "" },
        password: { title: "Password", icon: "lock", value: "" },
        repassword: { title: "rePassword", icon: "lock", value: "" }
      }
    };
  },
  methods: {
    register: function() {
      axios
        .post("/register", {
          userName: this.items.username.value,
          email: this.items.email.value,
          password: this.items.password.value,
          repassword: this.items.repassword.value
        })
        .then(res => {
          // 跳转
          console.log(res);
          if (res.data.code === 200) {
            this.$router.push({ path: "/login" });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/common";
@import "~@/assets/css/varibale";

.login-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .login-page-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 25%;
    height: 50%;

    .banner-container {
      display: block;
      width: 100%;
      height: 10%;
      .input-banner {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 90%;
        height: 40%;
        top: -30%;
        left: 5%;
        .banner-title {
          margin-bottom: 10%;
          color: white;
          font-size: @default-font*1.5;
        }
        .third-party {
          position: absolute;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
          width: 100%;
          bottom: 5%;
        }
      }
    }

    .input-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 60%;
    }
    .button-container {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      width: 90%;
      height: 20%;
    }
  }
}
</style>
