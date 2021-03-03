<template>
  <login-page :items="items" :buttons="buttons">
    <template slot="title">Register</template>
  </login-page>
</template>

<script>
import LoginPage from "@/components/loginPage/LoginPage";
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
          action: this.register
        }
      ]
    };
  },
  methods: {
    register: function() {
      let formData = new FormData();
      formData.append("userName", this.items.username.value);
      formData.append("email", this.items.email.value);
      formData.append("password", this.items.password.value);
      formData.append("repassword", this.items.repassword.value);

      this.axios
        .post("/register", formData)
        .then(res => {
          // 跳转
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
