<template>
  <div class="full-size">
    <div v-for="(item, index) in focusUser" :key="index" class="row-container">
      <div class="user-info">
        <div class="avatar">
          <v-avatar>
            <img :src="item.avatarURL" alt="focusUser" />
          </v-avatar>
        </div>
        <div class="name">{{ item.userName }}</div>
      </div>
      <div class="btn">
        <v-btn v-if="item.focus" block color="grey">已关注</v-btn>
        <v-btn v-if="!item.focus" block color="primary">关注</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FocusUser",
  data() {
    return {
      focusUser: [
        {
          userName: "siegelion",
          userId: "siegelion",
          avatarURL: "http://kodo.wendau.com/icon1.png",
          focus: false
        },
        {
          userName: "siegelion",
          userId: "siegelion",
          avatarURL: "http://kodo.wendau.com/icon1.png",
          focus: true
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/common";

.row-container:extend(.flex-layout) {
  height: 12%;
  margin-left: 5%;
  margin-right: 5%;
  border-bottom: grey dotted 0.5px;
  .user-info:extend(.flex-layout) {
    width: 20%;
    .avatar {
      width: 30%;
    }
    .name {
      width: 50%;
      vertical-align: middle;
    }
  }
  .btn {
    width: 10%;
  }
}
</style>
