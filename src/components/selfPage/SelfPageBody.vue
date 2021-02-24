<template>
  <div class="full-size">
    <div class="main-content-navbar">
      <v-tabs v-model="aimTab">
        <v-tab
          v-for="(sub, index) in menus[menuName].items"
          :key="index"
          @click="changeTag(sub.path)"
        >
          {{ sub.subTitle }}
        </v-tab>
      </v-tabs>
    </div>
    <div class="main-content-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelfPageBody",
  props: {
    menu: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {
      aimTab: 0,
      menus: {
        setting: {
          items: [
            {
              subTitle: "账号安全",
              path: "security"
            },
            {
              subTitle: "修改资料",
              path: "info"
            }
          ]
        },
        focus: {
          items: [
            {
              subTitle: "用户",
              path: "user"
            },
            {
              subTitle: "标签",
              path: "tag"
            }
          ]
        },
        message: {
          items: [
            {
              subTitle: "@我的",
              path: "reply"
            },
            {
              subTitle: "系统消息",
              path: "system"
            }
          ]
        },
        publish: {
          items: [
            {
              subTitle: "文章",
              path: "article"
            },
            {
              subTitle: "想法",
              path: "idea"
            },
            {
              subTitle: "视频",
              path: "video"
            },
            {
              subTitle: "评论",
              path: "comment"
            }
          ]
        }
      }
    };
  },
  methods: {
    changeTag: function(tag) {
      this.$router.push("/self/" + this.menuName + "/" + tag);
    }
  },
  computed: {
    menuName: function() {
      return this.$route.fullPath.split("/")[2];
    }
  },
  watch: {
    menu: function() {
      this.aimTab = 0;
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/common";
.main-content-navbar {
  display: block;
  width: 100%;
  height: 10%;
}
.main-content-body {
  display: block;
  width: 100%;
  height: 90%;
}
</style>
