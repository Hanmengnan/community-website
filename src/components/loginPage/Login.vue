<template>
  <login-page :items="items" :buttons="buttons">
    <template slot="title">Login</template>
    <template slot="banner">
      <div class="third-party">
        <template v-for="(thirdPartyName, index) in thirdParty">
          <v-btn :key="index" depressed text fab small color="white">
            <v-icon dark>
              {{ "mdi-" + thirdPartyName }}
            </v-icon>
          </v-btn>
        </template>
      </div>
    </template>
  </login-page>
</template>

<script>
import LoginPage from "@/components/loginPage/LoginPage";
import axios from "axios";
export default {
  name: "Login",
  components: {
    LoginPage
  },
  data() {
    return {
      items: {
        username: { title: "UserName", icon: "account-circle", value: "" },
        // email: { title: "Email", icon: "at", value: "" },
        password: { title: "Password", icon: "lock", value: "" }
      },
      buttons: [
        {
          title: "Register",
          action: () => {
            this.$router.push("/register");
          }
        },
        {
          title: "Submit",
          action: this.login
        }
      ],
      thirdParty: ["wechat", "qqchat", "github"]
    };
  },
  methods: {
    login: function() {
      axios
        .post("/login", {
          username: this.items.username.value,
          email: this.items.email.value,
          password: this.items.password.value
        })
        .then(res => {
          // 跳转并保存Cookie
          window.localStorage.setItem("userAvatar", res.data.avatarUrl);
          this.$router.push("/");
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
.third-party:extend(.flex-layout) {
  position: absolute;
  justify-content: space-around;
  width: 100%;
  bottom: 5%;
}
</style>
