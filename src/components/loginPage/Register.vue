<template>
  <login-page :items="items" :buttons="buttons">
    <template slot="title">Register</template>
  </login-page>
</template>

<script>
import LoginPage from "@/components/loginPage/LoginPage";
import axios from "axios";
export default {
  components: {
    LoginPage
  },
  data() {
    return {
      items: {
        username: { title: "UserName", icon: "account-circle", value: "" },
        email: { title: "Email", icon: "at", value: "" },
        password: { title: "Password", icon: "lock", value: "" },
        repassword: { title: "rePassword", icon: "lock", value: "" }
      },
      buttons: [
        {
          title: "Back",
          action: () => {
            this.$router.push("/login");
          }
        },
        {
          title: "Submit",
          action: this.login
        }
      ]
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

<style scoped></style>
