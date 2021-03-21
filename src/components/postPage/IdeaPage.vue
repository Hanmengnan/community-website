<template>
  <div class="full-size">
    <div class="content-body">
      {{ contentData.ideaContent }}
    </div>
    <v-carousel v-model="aimImgIndex">
      <v-carousel-item
        v-for="(pic, index) in contentData.pics"
        :key="index"
        :src="pic"
      >
      </v-carousel-item>
    </v-carousel>
    <div class="image-list">
      <div
        v-for="(pic, index) in contentData.pics"
        :key="index"
        :class="[index === aimImgIndex ? 'image-picked' : 'image-box']"
        v-on:click="aimImgIndex = index"
      >
        <v-img :src="pic" :lazy-src="pic" width="80" height="80"></v-img>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticlePage",
  props: {
    contentData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      aimImgIndex: 0,
      ideaContent: "",
      tags: [],
      pics: [],
      author: null,
      publishTime: ""
    };
  },
  methods: {},
  created() {}
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/common.less";

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;

  &-header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 20px 0 20px 0;

    &-avatar {
    }

    &-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin-left: 10px;
    }
  }
  &-body {
    margin: 20px 0;
  }
  &-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-btn {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .image-list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 0 10px 0;

    .image-box {
      margin: 0 5px 0 5px;
    }

    .image-picked {
      margin: 0 3px 0 3px;
      border: 2px solid RoyalBlue;
    }
  }
}
</style>
