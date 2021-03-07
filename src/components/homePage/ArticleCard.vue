<template>
  <div class="article-container full-size">
    <div>{{ subTitle }}</div>
    <div class="pic-area">
      <img class="cover" :src="cover" alt="cover" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleCard",
  props: {
    subTitle: {
      type: String,
      required: true
    },
    cover: {
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
@import "~@/assets/css/common";
.article-container:extend(.flex-layout) {
  flex-direction: column;
  align-items: flex-start;
  .pic-area {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 70%;
    .cover {
      max-width: 35vw;
      max-height: 25vh;
    }
    .pic {
      max-width: 13vw;
      max-height: 13vh;
      margin: 0.5%;
      padding: 0.5%;
      border: gray solid 0.1px;
    }
  }
}
</style>
