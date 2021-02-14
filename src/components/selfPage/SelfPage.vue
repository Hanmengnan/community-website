<template>
  <div class="full-size cards-container">
    <v-card class="side-bar">
      <v-navigation-drawer>
        <div class="side-bar-menus">
          <div class="menu-item" v-for="(item, index) in menus" :key="index">
            <v-btn block x-large text v-on:click="aimMenu = index">{{
              item.title
            }}</v-btn>
          </div>
        </div>
      </v-navigation-drawer>
    </v-card>
    <v-card class="main-content">
      <div class="main-content-navbar">
        <v-tabs v-model="aimTab">
          <v-tab
            v-for="(sub, index) in menus[aimMenu].items"
            :key="index"
            :to="sub.link"
          >
            {{ sub.subTitle }}
          </v-tab>
        </v-tabs>
      </div>
      <div class="main-content-body">
        <router-view></router-view>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "SelfPage",
  data() {
    return {
      aimMenu: 0,
      aimTab: 0,
      menus: [
        {
          title: "个人设置",
          items: [
            {
              subTitle: "账号安全",
              link: "/self/security"
            },
            {
              subTitle: "修改资料",
              link: "/self/info"
            }
          ]
        },
        {
          title: "我的关注",
          items: [
            {
              subTitle: "用户",
              link: "/self/user"
            },
            {
              subTitle: "分类",
              link: "/self/classify"
            }
          ]
        },
        {
          title: "我的消息",
          items: [
            {
              subTitle: "@我的",
              link: "/self/reply"
            },
            {
              subTitle: "系统消息",
              link: "/self/system"
            }
          ]
        },
        {
          title: "我的发布",
          items: [
            {
              subTitle: "文章",
              link: "/self/article"
            },
            {
              subTitle: "想法",
              link: "/self/idea"
            },
            {
              subTitle: "视频",
              link: "/self/video"
            },
            {
              subTitle: "评论",
              link: "/self/publish/comment"
            }
          ]
        }
      ]
    };
  }
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

    .main-content-body {
      width: 100%;
      height: 90%;
    }
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
