<template>
  <v-hover v-slot="{ hover }">
    <v-card :elevation="hover ? 24 : 6" @click="articleDetail">
      <v-card-title>{{ title }}</v-card-title>
      <v-card-subtitle>{{ subTile }}</v-card-subtitle>
      <v-card-text>
        <v-icon></v-icon>
        <div>{{ author }}</div>
        <div>{{ "时间：" + time }}</div>
        <div class="article-bottom">
          <div>
            分类:
            <v-chip v-for="(tag, index) in tags" :key="index" small>{{
              tag
            }}</v-chip>
          </div>
          <div class="article-btn">
            <v-btn fab small plain color="blue"
              ><v-icon>mdi-thumb-up-outline</v-icon></v-btn
            >
            <v-btn fab small plain color="blue"
              ><v-icon>mdi-thumb-down-outline</v-icon></v-btn
            >
            <v-btn fab small plain color="blue"
              ><v-icon>mdi-comment-edit-outline</v-icon></v-btn
            >
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "ArticleCard",
  props: {
    title: {
      type: String,
      required: true
    },
    subTile: {
      type: String,
      required: true
    },
    tags: {
      type: Array,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    }
  },
  methods: {
    articleDetail: function() {
      this.$router.push({ path: "/post" });
    }
  }
};
</script>

<style lang="less" scoped>
.article-bottom {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .article-btn {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
