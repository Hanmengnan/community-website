<template>
  <div class="publish-container ">
    <div class="upload-area" v-if="!uploaded">
      <label for="upload-pic" class="upload-area-label">
        <v-icon class="upload-area-icon" x-large>mdi-plus</v-icon>
      </label>
      <input
        type="file"
        id="upload-pic"
        accept="video/*"
        style="display: none;"
        multiple="multiple"
        ref="uploadPic"
        v-on:change="uploadPic()"
      />
    </div>
    <div class="upload-area" v-if="uploaded">
      <img
        class="video-cover"
        :src="videoURL + '?vframe/jpg/offset/1'"
        alt="cover"
      />
    </div>
    <div class="title-edit-area">
      <v-text-field
        ref="videoTitle"
        label="输入视频标题"
        hideDetails
        solo-inverted
      ></v-text-field>
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
      videoURL: "",
      uploaded: false,
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
            this.videoURL = JSON.parse(xhr.response).fileURL;
            this.uploaded = true;
          }
        }
      }.bind(this);
      let formData = new FormData();
      formData.append("file", file);
      formData.append("type", String(file.name).split(".")[1]);
      xhr.send(formData);
    },
    publish: function() {
      let formData = new FormData();
      formData.append("createTime", new Date().getTime());
      formData.append("title", this.$refs.videoTitle.internalValue);
      formData.append("tags", JSON.stringify(this.$refs.tags.internalValue));
      formData.append("classify", this.$refs.classify.internalValue);
      formData.append("videoUrl", this.videoURL);

      this.axios
        .post("/publishVideo", formData)
        .then()
        .catch();
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
  height: 50%;
  margin: 30px 50px 0 50px;

  .upload-area {
    position: relative;
    width: 95%;
    height: 50%;
    margin: 2%;
    border: gray solid 0.5px;
    .video-cover {
      width: 100%;
      height: 100%;
    }
    .upload-area-label {
      display: inline-block;
      width: 100%;
      height: 100%;
      .upload-area-icon {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
      }
    }
  }
  .title-edit-area {
    width: 95%;
    height: 10%;
  }
  .feature-edit-area:extend(.flex-layout) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 95%;
    height: 15%;
    .feature-set:extend(.flex-layout) {
      flex-direction: column;
      width: 48%;

      .setting-value {
        width: 100%;
      }
    }
  }
  .publish-btn {
    width: 40%;
  }
}
</style>
