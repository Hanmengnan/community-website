<template>
  <div class="banner-container">
    <v-btn plain color="white">
      Community Demo
    </v-btn>
    <BaseInput
      :title="searchInfo.title"
      :icon="searchInfo.icon"
      :hideDetails="searchInfo.hideDetails"
      :rounded="searchInfo.rounded"
      :solo="searchInfo.solo"
      :dense="searchInfo.dense"
    ></BaseInput>
    <div class="banner-container banner-right ">
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
</template>

<script>
import BaseInput from "@/components/BaseInput";
import Menus from "@/components/Menus";
import List from "@/components/List";
import axios from "axios";

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
          link: "/self/notifications/focus",
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
          title: "个人中心",
          icon: "account-details",
          link: "/self",
          alarm: true
        },
        {
          title: "个人设置",
          icon: "account-cog",
          link: "/self/setting",
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
    getCookie: function(cname) {
      let name = cname + "=";
      let ca = document.cookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
      }
      return "";
    },
    logOut: function() {
      this.$store.state.authed = false;
      document.cookie = "userId= ;maxAge=0";
      document.location.reload(true);
    }
  },
  mounted() {
    if (this.getCookie("userId") !== "") {
      axios
        .get("/login")
        .then(res => {
          console.log(res);
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
.banner-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  .banner-right {
    width: 8%;
  }
}
</style>
