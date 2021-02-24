<template>
  <div class="full-size cards-container">
    <v-card class="side-bar">
      <v-navigation-drawer>
        <div class="side-bar-menus">
          <div class="menu-item" v-for="(item, index) in menus" :key="index">
            <v-btn block x-large text v-on:click="changeMenu(index)">{{
              item.title
            }}</v-btn>
          </div>
        </div>
      </v-navigation-drawer>
    </v-card>
    <v-card class="main-content">
      <router-view :menu="aimMenu"></router-view>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "SelfPage",
  data() {
    return {
      aimMenu: "",
      menus: {
        setting: {
          title: "个人设置",
          path: "setting",
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
          title: "我的关注",
          path: "focus",
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
          title: "我的消息",
          path: "message",
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
          title: "我的发布",
          path: "publish",
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
    changeMenu: function(menu) {
      this.$router.push("/self/" + menu);
      this.aimMenu = Math.random();
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/varibale.less";
.cards-container {
  display: grid;
  grid-template-columns: 7% 15% 65% 10%;
  grid-template-rows: 0.5fr 6fr 2fr 2fr;
  grid-row-gap: 2%;
  grid-column-gap: 1%;

  .main-content {
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 2;
    grid-row-end: 4;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 65vw;
    height: 80vh;
  }
  .side-bar {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
    justify-items: center;
    .side-bar-menus {
      .menu-item {
        width: 100%;
      }
    }
  }
}
</style>
