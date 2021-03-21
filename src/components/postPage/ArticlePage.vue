<template>
  <mavon-editor
    class="md"
    :value="contentData.articleContent"
    :subfield="false"
    :defaultOpen="'preview'"
    :toolbarsFlag="false"
    :editable="false"
    :scrollStyle="true"
    :ishljs="true"
  ></mavon-editor>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "ArticlePage",
  props: {
    contentData: {
      type: Object,
      required: true
    }
  },
  components: {
    mavonEditor
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {}
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
