<template>
  <v-hover v-slot="{ hover }">
    <v-card :elevation="hover ? 24 : 6">
      <div class="card-header">
        <div>{{ title }}</div>
        <div class="header-author">
          <span>{{ authorName }}</span>
          <v-avatar size="35" style="margin-left: 10px">
            <img :src="avatarUrl" alt="头像" />
          </v-avatar>
        </div>
      </div>
      <div class="card-body" @click="articleDetail">
        <slot name="body"></slot>
      </div>
      <div class="card-footer">
        <div>
          <v-chip
            small
            outlined
            color="primary"
            v-for="(item, index) in tags"
            :key="index"
          >
            {{ "#" + item }}
          </v-chip>
        </div>
        <div>
          <v-chip
            small
            outlined
            color="amber darken-2"
            style="margin-right: 10px"
            >{{ "#" + classify }}
          </v-chip>
          <v-btn text @click="articleDetail">
            <v-icon>
              mdi-dots-horizontal
            </v-icon>
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "PublishCard",
  props: {
    type: {
      type: Number,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: false,
      default: "hahaha"
    },
    authorName: {
      type: String,
      required: true
    },
    avatarUrl: {
      type: String,
      required: false,
      default: "http://kodo.wendau.com/icon1.png"
    },
    tags: {
      type: Array,
      required: false,
      default: () => []
    },
    classify: {
      type: String,
      required: true
    }
  },
  methods: {
    articleDetail: function() {
      this.$router.push({ path: "/post/" + this.type + "/" + this.id });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/common";
@import "~@/assets/css/varibale";
.card-header:extend(.flex-layout) {
  width: 100%;
  height: 15%;
  padding: 0 20px 0 20px;
  font-size: @default-font*1.5;
  .header-author {
    font-size: @default-font;
  }
}
.card-body {
  width: 100%;
  height: 80%;
  padding: 0 20px 0 20px;
  font-size: @default-font;
  color: gray;
}
.card-footer:extend(.flex-layout) {
  width: 100%;
  height: 10%;
  padding: 0 20px 0 20px;
}
</style>
