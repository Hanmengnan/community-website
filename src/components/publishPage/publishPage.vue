<template>
  <div class="full-size page-container">
    <v-card class="edit-card">
      <div class="edit-card-navbar">
        <v-tabs v-model="aimTab">
          <v-tab @click="$router.push('/publish/article')">文章</v-tab>
          <v-tab @click="$router.push('/publish/video')">视频</v-tab>
        </v-tabs>
      </div>
      <div class="edit-card-body">
        <router-view></router-view>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "PublishPage",
  data() {
    return {
      aimTab: 0
    };
  },
  created() {
    if (this.$route.path === "/publish/article") {
      console.log(this.$route.path);
      this.aimTab = 0;
    } else {
      this.aimTab = 1;
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/varibale.less";
@import "~@/assets/css/common.less";
.page-container {
  position: relative;
  display: grid;
  grid-template-columns: 18% 64% 18%;
  grid-template-rows: 6fr 2fr;
  grid-row-gap: 2%;

  .edit-card {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
    margin-top: 20px;

    .edit-card-navbar {
      width: 100%;
    }
    .edit-card-body {
      width: 100%;
      height: 140vh;
    }
  }
}
</style>
