<template>
  <div class="publish-container full-size">
    <div class="title-edit-area">
      <v-text-field
        label="输入文章标题"
        hideDetails
        solo-inverted
      ></v-text-field>
    </div>
    <mavon-editor class="content-edit-area"></mavon-editor>
    <div class="feature-edit-area">
      <div class="feature-set">
        <div class="setting-title">
          设置封面
        </div>
        <div>
          <v-avatar color="blue-grey lighten-4" size="80" rounded>
            <label for="upload-pic" class="full-size">
              <v-icon x-large>mdi-plus</v-icon>
              <input
                type="file"
                id="upload-pic"
                accept="image/*"
                style="display: none;"
                multiple="multiple"
                ref="uploadPic"
                v-on:change="uploadPic()"
              />
            </label>
          </v-avatar>
        </div>
        <div v-for="(pic, index) in pics" :key="index">
          <v-img
            v-for="(pic, index) in pics"
            :key="index"
            :src="pic.src"
            :lazy-src="pic.src"
            width="80"
            height="80"
          ></v-img>
        </div>
      </div>
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
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";

export default {
  name: "ArticlePublishPage",
  components: {
    mavonEditor
  },
  data() {
    return {
      pics: [],
      publishIdea: {
        classify: ["琐碎吐槽", "感悟思考", "学习点滴", "仅是记录", "我不知道"],
        tags: []
      }
    };
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/common.less";
.publish-container {
  display: flex;
  flex-direction: column;

  .title-edit-area {
    box-sizing: border-box;
    align-items: flex-start;
    width: 100%;
    margin: 10px 0 10px 0;
  }
  .content-edit-area {
    width: 100%;
    height: 80vh;
  }
  .feature-edit-area {
    margin-top: 20px;
    height: 40%;
    .feature-set:extend(.flex-layout) {
      justify-content: flex-start;
      align-items: center;
      width: 50%;
      height: 30%;
      .setting-title {
        width: 20%;
        margin: 0 10px 0 10px;
      }
      .setting-value {
        width: 60%;
      }
    }
    .tag-input-tip {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .publish-btn {
    position: absolute;
    bottom: 5px;
    right: 10px;
    width: 12%;
  }
}
</style>
