<template>
  <div class="full-size">
    <div v-for="(item, index) in focusTag" :key="index" class="row-container">
      <div class="user-info">
        <v-chip :color="randomColor()" text-color="white">
          <v-icon left> mdi-label </v-icon>{{ item.name }}
        </v-chip>
      </div>
      <div class="btn">
        <v-btn v-if="item.focus" block color="grey">已关注</v-btn>
        <v-btn v-if="!item.focus" block color="primary">关注</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { randomColor } from "@/assets/js/GlobalFunction";

export default {
  name: "FocusTag",
  data() {
    return {
      focusTag: [
        {
          name: "第一个标签",
          focus: false
        },
        {
          name: "第一个标签",
          focus: true
        }
      ]
    };
  },
  methods: {
    randomColor: function() {
      return randomColor();
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/common";
.row-container:extend(.flex-layout) {
  box-sizing: border-box;
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
