<template>
  <div class="article-container full-size">
    <div class="article-content">{{ content }}</div>
    <div class="pic-area">
      <img
        class="pic"
        v-for="(pic, index) in pics"
        :key="index"
        :src="pic"
        alt="图像"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleCard",
  props: {
    content: {
      type: String,
      required: true
    },
    pics: {
      type: Array,
      required: true
    }
  },
  methods: {
    articleDetail: function() {
      this.$router.push({ path: "/post" });
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/common";
@import "~@/assets/css/varibale";

.article-container:extend(.flex-layout) {
  flex-direction: column;
  align-items: flex-start;

  .article-content {
    color: @default-font-color;
    font-size: @default-font;
  }

  .pic-area {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 70%;

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
