<template>
  <div class="full-size pages-container">
    <div class="content-container">
      <template v-for="(item, index) in publishList">
        <publish-card
          :type="item.type"
          :id="item.publishId"
          :title="item.title"
          :authorName="item.authorName"
          :avatarUrl="item.avatarUrl"
          :tags="item.tags"
          :classify="item.classify"
          :class="['page-card', 'card-' + (index + 1)]"
          :key="index"
        >
          <template slot="body">
            <idea-card
              :content="item.ideaContent"
              :pics="item.pics"
              v-if="item.type == 1"
            ></idea-card>
            <video-card
              :cover="item.videoUrl"
              v-if="item.type === 2"
            ></video-card>
            <article-card
              :sub-title="item.subTitle"
              :pics="item.pics"
              :cover="item.cover"
              v-if="item.type === 0"
            ></article-card>
          </template>
        </publish-card>
      </template>
      <div class="progress-circular" v-if="newContentFlag">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
    </div>
    <div class="side-container">
      <v-card class="publish-container">
        <div
          class="publish-button"
          v-for="(item, key) in publishButton"
          :key="key"
        >
          <v-btn fab plain large :color="item.color" @click="item.event()">
            <v-icon>{{ "mdi-" + item.icon }}</v-icon>
          </v-btn>
          <div>{{ item.title }}</div>
        </div>
      </v-card>
      <v-card class="tags-container">
        <v-card-title>
          标签们
        </v-card-title>
        <v-card-text>
          <v-chip
            small
            outlined
            link
            color="primary"
            class="tag"
            v-for="(item, index) in hotTags"
            :to="{ name: 'tagQuery', params: { tagName: item } }"
            :key="index"
          >
            <v-icon left small>
              mdi-pound
            </v-icon>
            {{ item }}
          </v-chip>
        </v-card-text>
      </v-card>
      <v-card class="hot-articles-container">
        <v-card-title>
          文章们
        </v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item-group>
              <v-list-item
                color="primary"
                v-for="(article, index) in hotArticles"
                :key="index"
              >
                <v-list-item-content>{{ article.title }}</v-list-item-content>
                <v-list-item-icon>
                  <v-icon>mdi-dots-horizontal</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>
      </v-card>
    </div>
    <v-dialog v-model="overlay" width="50%">
      <v-card>
        <v-card-title>发想法</v-card-title>
        <v-card-text>
          <v-form ref="ideaForm">
            <v-textarea outlined ref="content"></v-textarea>
            <v-row justify="start">
              <v-col md="2">
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
              </v-col>
              <v-col
                v-for="(pic, index) in publishIdea.pics"
                :key="index"
                md="2"
              >
                <v-img
                  :src="pic"
                  :lazy-src="pic"
                  width="80"
                  height="80"
                ></v-img>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-divider></v-divider>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div class="tag-input-tip">
                  <div>
                    话题
                  </div>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon small v-bind="attrs" v-on="on">
                        mdi-help-circle
                      </v-icon>
                    </template>
                    <span>输入标签，回车确定</span>
                  </v-tooltip>
                </div>
                <v-combobox
                  chips
                  dense
                  multiple
                  outlined
                  clearable
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
              </v-col>
              <v-col>
                分类
                <v-select
                  dense
                  outlined
                  ref="classify"
                  :items="publishIdea.classify"
                ></v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn depressed color="blue-grey lighten-4" v-on:click="cancel()">
            取消
          </v-btn>
          <v-btn depressed color="primary" v-on:click="publish()">
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ArticleCard from "@/components/homePage/ArticleCard";
import { throttle } from "@/assets/js/GlobalFunction";
import VideoCard from "@/components/homePage/VideoCard";
import PublishCard from "@/components/homePage/PublishCard";
import IdeaCard from "@/components/homePage/IdeaCard";

export default {
  name: "HomePage",
  components: {
    IdeaCard,
    PublishCard,
    VideoCard,
    ArticleCard
  },
  data() {
    return {
      overlay: false,
      newContentFlag: true,
      scrollFunc: null,
      pageNum: 0,
      publishList: [],
      publishListTemp: [
        {
          type: 0,
          title: "测试",
          authorName: "siegelion",
          avatarUrl: "http://kodo.wendau.com/icon1.png",
          tags: ["说说", "说说", "说说"],
          classify: "想法",
          content:
            "MIUI不断的迭代更新，越来越强大，越来越好用了。深色模式目前已更新到2.0版本。\n" +
            "2.0版本的深色模式有如下特色：\n" +
            "\n" +
            "① 全局覆盖：42个系统应用深度适配，20个主流应用深度定制；\n" +
            "② 强大的非线性反色算法，精准识别界面元素，针对每个界面对象动态反色，海量第三方应用现已支持非线性反色算法；\n" +
            "③ 反色算法基于Lab、HSV色彩空间，适配更广更自然。",
          pics: [
            "http://kodo.wendau.com/%E7%9B%B8%E4%BF%A1%E6%9C%AA%E6%9D%A5.jpg",
            "http://kodo.wendau.com/icon1.png",
            "http://kodo.wendau.com/%E7%9B%B8%E4%BF%A1%E6%9C%AA%E6%9D%A5.jpg",
            "http://kodo.wendau.com/%E7%9B%B8%E4%BF%A1%E6%9C%AA%E6%9D%A5.jpg",
            "http://kodo.wendau.com/%E9%A2%9C%E8%89%B23.jpg"
          ]
        },
        {
          type: 1,
          title: "测试",
          authorName: "siegelion",
          avatarUrl: "http://kodo.wendau.com/icon1.png",
          tags: ["视频", "说说", "说说"],
          classify: "视频",
          cover: "http://kodo.wendau.com/icon1.png"
        },
        {
          type: 2,
          title: "测试",
          subTitle:
            "MIUI不断的迭代更新，越来越强大，越来越好用了。深色模式目前已更新到2.0版本。\n" +
            "2.0版本的深色模式有如下特色：\n" +
            "\n" +
            "① 全局覆盖：42个系统应用深度适配，20个主流应用深度定制；\n" +
            "② 强大的非线性反色算法，精准识别界面元素，针对每个界面对象动态反色，海量第三方应用现已支持非线性反色算法；\n" +
            "③ 反色算法基于Lab、HSV色彩空间，适配更广更自然。",
          authorName: "siegelion",
          avatarUrl: "http://kodo.wendau.com/icon1.png",
          tags: ["文章", "说说", "说说"],
          classify: "文章",
          pics: [
            "http://kodo.wendau.com/icon1.png",
            "http://kodo.wendau.com/icon1.png",
            "http://kodo.wendau.com/icon1.png"
          ],
          cover:
            "http://kodo.wendau.com/%E7%9B%B8%E4%BF%A1%E6%9C%AA%E6%9D%A5.jpg"
        }
      ],
      hotTags: [],
      publishButton: [
        {
          title: "发想法",
          icon: "lightbulb-on",
          color: "light-blue",
          event: this.changeOverlay
        },
        {
          title: "发视频",
          icon: "video",
          color: "teal accent-3",
          event: () => {
            this.$router.push("/publish/video");
          }
        },
        {
          title: "发文章",
          icon: "clipboard-edit",
          color: "orange lighten-1",
          event: () => {
            this.$router.push("/publish/article");
          }
        }
      ],
      publishIdea: {
        classify: ["琐碎吐槽", "感悟思考", "学习点滴", "仅是记录", "我不知道"],
        tags: [],
        pics: []
      },
      hotArticles: []
    };
  },
  methods: {
    changeOverlay: function() {
      this.overlay = true;
    },
    uploadPic: function() {
      let pic = this.$refs.uploadPic.files[0];
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "/uploadFile", true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            this.pics.push(JSON.parse(xhr.response).fileURL);
          }
          return "";
        }
      }.bind(this);
      let formData = new FormData();
      formData.append("file", pic);
      formData.append("type", String(pic.name).split(".")[1]);
      xhr.send(formData);
    },
    publish: function() {
      let formData = new FormData();
      formData.append("createTime", new Date().getTime());
      formData.append("content", this.$refs.content.internalValue);
      formData.append("tags", JSON.stringify(this.$refs.tags.internalValue));
      formData.append("classify", this.$refs.classify.internalValue);
      formData.append("pics", JSON.stringify(this.pics));

      this.axios
        .post("/publishIdea", formData)
        .then()
        .catch();
    },
    cancel: function() {
      this.$refs.ideaForm.reset();
      this.pics.length = 0;
      this.overlay = false;
    },
    getNewContent: function() {
      this.axios
        .get("/homepage?page=" + this.pageNum)
        .then(res => {
          if (res.data.code === 200) {
            this.publishList.push(...res.data.publishList);
            this.pageNum++;
            this.newContentFlag = true;
          } else {
            this.newContentFlag = false;
          }
        })
        .catch();
    },
    isScrollBottom: function() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      let clientHeight = document.documentElement.clientHeight;
      let scrollHeight = document.documentElement.scrollHeight;
      if (scrollTop + clientHeight >= scrollHeight) {
        this.getNewContent();
      }
    }
  },
  created: function() {
    this.scrollThrottle = throttle(this.isScrollBottom, 1000);
    window.addEventListener("scroll", this.scrollThrottle);
  },
  mounted: function() {
    this.axios
      .get("/tags")
      .then(
        function(res) {
          this.hotTags = res.data.tagList;
        }.bind(this)
      )
      .catch();
    this.axios
      .get("/homepage?page=0")
      .then(
        function(res) {
          if (res.data.code === 200) {
            this.publishList.push(...res.data.publishList);
            this.pageNum++;
          } else {
            console.log(res.data);
          }
        }.bind(this)
      )
      .catch();
    this.axios
      .get("/popularArticle")
      .then(
        function(res) {
          this.hotArticles = res.data.articleList;
        }.bind(this)
      )
      .catch();
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollThrottle);
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/common.less";

.pages-container {
  display: flex;
  justify-content: space-around;

  .content-container {
    display: flex;
    flex-direction: column;
    min-width: 50vw;
    margin-top: 30px;

    .page-card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      width: 50vw;
      height: 50vh;
      margin: 30px 0 30px 0;
    }

    .progress-circular {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      margin: 0 0 50px 0;
    }
  }

  .side-container {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 10% 20% 30%;
    grid-row-gap: 3%;

    width: 25%;
    height: 150vh;
    margin-top: 60px;
    justify-items: center;

    .publish-container:extend(.flex-layout) {
      justify-content: space-around;
      width: 100%;

      .publish-button:extend(.flex-layout) {
        flex-direction: column;
      }
    }

    .tags-container {
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      align-content: flex-start;
      width: 100%;

      .tag {
        margin: 3px;
      }
    }

    .hot-articles-container {
      width: 100%;
    }
  }

  .pagination {
    align-items: center;
  }
}

.tag-input-tip {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>
