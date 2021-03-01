<template>
  <div class="publish-container full-size">
    <div class="title-edit-area">
      <v-text-field
        ref="title"
        label="输入文章标题"
        hideDetails
        solo-inverted
      ></v-text-field>
    </div>
    <div class="title-edit-area">
      <v-text-field
        ref="subTitle"
        label="输入文章摘要"
        hideDetails
        solo-inverted
      ></v-text-field>
    </div>
    <mavon-editor
      v-model="articleContent"
      class="content-edit-area"
      codeStyle="magula"
      ref="md"
      @imgAdd="$imgAdd"
    ></mavon-editor>
    <div class="feature-edit-area">
      <div class="feature-set">
        <div class="setting-title">
          设置封面
        </div>
        <div style="margin-right: 30px ">
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
        <div>
          <v-img
            :src="cover.src"
            :lazy-src="cover.src"
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
      cover: "",
      articleContent: "",
      publishIdea: {
        classify: ["琐碎吐槽", "感悟思考", "学习点滴", "仅是记录", "我不知道"],
        tags: []
      }
    };
  },
  methods: {
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("file", $file);
      formdata.append("type", String($file.name).split(".")[1]);
      this.axios({
        url: "/uploadFile",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 ``
         */
        this.$refs.md.$img2Url(pos, res.data);
      });
    },
    uploadPic: function() {
      let pic = this.$refs.uploadPic.files[0];
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "/uploadFile", true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            this.cover = { src: JSON.parse(xhr.response).fileURL };
          }
          return "";
        }
      }.bind(this);
      let formData = new FormData();
      formData.append("file", pic);
      xhr.send(formData);
    },
    publish: function() {
      let createTime = new Date().getTime();
      let articleContent = this.articleContent;
      let title = this.$refs.title.internalValue;
      let subTitle = this.$refs.subTitle.internalValue;
      let tags = this.$refs.tags.internalValue;
      let classify = this.$refs.classify.internalValue;

      this.axios
        .post("/publishArticle", {
          title: title,
          subTitle: subTitle,
          createTime: createTime,
          articleContent: articleContent,
          tags: tags,
          classify: classify,
          cover: this.cover
        })
        .then()
        .catch();
    }
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
    margin: 3px 0 3px 0;
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
