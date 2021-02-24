<template>
  <div class="publish-container ">
    <div>
      <v-avatar color="blue-grey lighten-4" size="80" rounded>
        <label for="upload-pic" class="full-size">
          <v-icon x-large>mdi-plus</v-icon>
          <input
            type="file"
            id="upload-pic"
            accept="video/*"
            style="display: none;"
            multiple="multiple"
            ref="uploadPic"
            v-on:change="uploadPic()"
          />
        </label>
      </v-avatar>
    </div>
    <div class="feature-edit-area">
      <div class="feature-set">
        <div class="setting-title">
          <div class="tag-input-tip">
            设置话题
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon small v-bind="attrs" v-on="on">
                  mdi-help-circle
                </v-icon>
              </template>
              <span>输入标签，回车确定</span>
            </v-tooltip>
          </div>
        </div>
        <div class="setting-value">
          <v-combobox
            chips
            dense
            multiple
            outlined
            clearable
            hide-details
            :items="publishIdea.tags"
            ref="tags"
          >
            <template v-slot:selection="data">
              <v-chip
                :key="JSON.stringify(data.item)"
                v-bind="data.attrs"
                @click:close="data.parent.selectItem(data.item)"
              >
                <v-avatar
                  class="accent white--text"
                  left
                  v-text="data.item.slice(0, 1).toUpperCase()"
                ></v-avatar>
                {{ data.item }}
              </v-chip>
            </template>
          </v-combobox>
        </div>
      </div>
      <div class="feature-set">
        <div class="setting-title">
          设置分类
        </div>
        <div class="setting-value">
          <v-select
            dense
            outlined
            hide-details
            ref="classify"
            :items="publishIdea.classify"
          ></v-select>
        </div>
      </div>
    </div>
    <div class="publish-btn">
      <v-btn depressed block color="primary" v-on:click="publish()">
        确定
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoPublishPage",
  data() {
    return {
      pics: [],
      publishIdea: {
        classify: ["琐碎吐槽", "感悟思考", "学习点滴", "仅是记录", "我不知道"],
        tags: []
      }
    };
  },
  methods: {
    uploadPic: function() {
      let file = this.$refs.uploadPic.files[0];
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "/uploadFile", true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log(xhr.response);
          }
        }
      };
      var formData = new FormData();
      formData.append("file", file);
      formData.append("type", String(file.name).split(".")[1]);
      xhr.send(formData);
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/common";
.publish-container:extend(.flex-layout) {
  position: relative;
  flex-direction: column;
  justify-content: space-around;
  height: 30%;
  border: gray dashed 3px;
  margin: 30px 50px 0 50px;

  .feature-edit-area:extend(.flex-layout) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 60%;
    height: 40%;
    .feature-set:extend(.flex-layout) {
      flex-direction: column;
      width: 50%;

      .setting-value {
        width: 100%;
      }
    }
  }
  .publish-btn {
    width: 30%;
  }
}
</style>
