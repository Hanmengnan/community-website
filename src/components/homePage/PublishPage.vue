<template>
  <v-card class="page-container">
    <v-card-title class="page-header">
      <div>标签 ：</div>
      <v-chip>{{ this.$route.params.tagName }}</v-chip>
    </v-card-title>
    <div class="page-body">
      <list :list-items="publishList"></list>
    </div>
  </v-card>
</template>

<script>
import List from "@/components/base/List";
import axios from "axios";
export default {
  name: "publishPage",
  components: { List },
  props: {},
  data() {
    return {
      publishList: []
    };
  },
  created() {
    axios.get(this.$route.path).then(
      function(res) {
        let tempList = res.data.publishList;
        let item;
        for (item of tempList) {
          if (item["type"] === 0) {
            item["icon"] = "book-open-outline";
          } else if (item["type"] === 1) {
            item["icon"] = "lightbulb-on-outline";
          } else if (item["type"] === 2) {
            item["icon"] = "video-box";
          }
          item["alarm"] = false;
          item["link"] = "/post/" + item["_id"];
        }
        this.publishList = tempList;
      }.bind(this)
    );
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/common.less";
.page-container {
  width: 60vw;
  min-height: 80vh;
  margin: 35px 0 35px 150px;
  .page-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .page-body {
  }
}
</style>
