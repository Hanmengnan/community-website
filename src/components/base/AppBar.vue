<template>
  <div class="bar-container full-size">
    <v-btn plain color="white" v-on:click="$router.push('/')">
      Community Demo
    </v-btn>
    <div class="bar-right">
      <BaseInput
        :title="searchInfo.title"
        :icon="searchInfo.icon"
        :hideDetails="searchInfo.hideDetails"
        :rounded="searchInfo.rounded"
        :solo="searchInfo.solo"
        :dense="searchInfo.dense"
      ></BaseInput>
      <div class="btn-container">
        <Menus>
          <template slot="avatar-content">
            <v-icon medium color="white">
              {{ "mdi-" + "forum" }}
            </v-icon>
          </template>
          <template slot="menus-content">
            <List :list-items="messageMenus"></List>
          </template>
        </Menus>
        <Menus>
          <template slot="avatar-content">
            <img
              v-if="userState"
              :src="avatarContent.value"
              :alt="avatarContent.name"
            />
            <v-icon medium color="white" v-if="!userState">
              {{ "mdi-" + avatarContent.value }}
            </v-icon>
          </template>
          <template slot="menus-content">
            <list v-if="userState" :list-items="signedMenus"></list>
            <List v-if="!userState" :list-items="unsignedMenus"> </List>
          </template>
        </Menus>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from "@/components/base/BaseInput";
import Menus from "@/components/base/Menus";
import List from "@/components/base/List";
import { getCookie } from "@/assets/js/GlobalFunction";

export default {
  name: "AppBar",
  components: {
    BaseInput,
    Menus,
    List
  },
  data() {
    return {
      searchInfo: {
        title: "Search",
        icon: "magnify",
        hideDetails: true,
        rounded: true,
        solo: true,
        dense: true
      },
      messageMenus: [
        {
          title: "系统消息",
          icon: "message-bulleted",
          link: "/self/notifications/system",
          alarm: true
        },
        {
          title: "回复我的",
          icon: "comment-quote-outline",
          link: "/self/notifications/reply",
          alarm: false
        },
        {
          title: "我的关注",
          icon: "eye-outline",
          link: "/self/focus",
          alarm: false
        }
      ],
      unsignedMenus: [
        {
          title: "登录",
          icon: "login",
          link: "/login",
          alarm: false
        },
        {
          title: "注册",
          icon: "account-plus",
          link: "/register",
          alarm: false
        },
        {
          title: "帮助",
          icon: "account-question",
          link: "/help",
          alarm: true
        }
      ],
      signedMenus: [
        {
          title: "登出",
          icon: "logout",
          func: this.logOut,
          alarm: false
        },
        {
          title: "个人设置",
          icon: "account-cog",
          link: "/self/setting/security",
          alarm: true
        }
      ]
    };
  },
  computed: {
    userState: function() {
      return this.$store.state.authed;
    },
    avatarContent: function() {
      if (this.$store.state.authed) {
        return {
          value: this.$store.state.avatarUrl,
          name: this.$store.state.userName
        };
      } else {
        return {
          value: "account-circle-outline"
        };
      }
    }
  },
  methods: {
    logOut: function() {
      this.$store.state.authed = false;
      document.cookie = "userId= ;maxAge=0";
      document.location.reload(true);
    }
  },
  mounted() {
    if (getCookie("userId") !== "") {
      this.axios
        .get("/login")
        .then(res => {
          if (res.data.code === 200) {
            this.$store.state.authed = true;
            this.$store.state.avatarUrl = window.localStorage.getItem(
              "userAvatar"
            );
          }
        })
        .catch(res => {
          console.log(res);
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/common";
.bar-container:extend(.flex-layout) {
  .bar-right:extend(.flex-layout) {
    width: 25%;
    .btn-container:extend(.flex-layout) {
      width: 40%;
      margin-left: 8%;
    }
  }
}
</style>
