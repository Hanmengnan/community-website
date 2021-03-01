<template>
  <div class="full-size pages-container">
    <template v-for="(item, index) in publishList">
      <publish-card
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
            :content="item.content"
            :pics="item.pics"
            v-if="item.type === 0"
          ></idea-card>
          <video-card v-if="item.type === 1"></video-card>
          <article-card
            :sub-title="item.subTitle"
            :pics="item.pics"
            v-if="item.type === 2"
          ></article-card>
        </template>
      </publish-card>
    </template>
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
            color="primary"
            class="tag"
            v-for="(item, index) in tags"
            :key="index"
          >
            <v-icon left small>
              mdi-pound
            </v-icon>
            {{ item.name }}
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
                v-for="(article, index) in articles"
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
    <Pagination class="pagination"></Pagination>
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
              <v-col v-for="(pic, index) in pics" :key="index" md="2">
                <v-img
                  :src="pic.src"
                  :lazy-src="pic.src"
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
import Pagination from "@/components/base/Pagination";
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
    ArticleCard,
    Pagination
  },
  data() {
    return {
      overlay: false,
      pageNum: 0,
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
      publishList: [
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
          ]
        }
      ],
      tags: [
        {
          name: "说说"
        },
        {
          name: "哈哈"
        },
        {
          name: "测试"
        },
        {
          name: "日常"
        },
        {
          name: "说点什么"
        },
        {
          name: "就这样"
        },
        {
          name: "就这样"
        },
        {
          name: "就这样"
        }
      ],
      articles: [
        {
          title: "Debug模式和Release模式有什么区别？"
        },
        {
          title: "Debug模式和Release模式有什么区别？"
        },
        {
          title: "Debug模式和Release模式有什么区别？"
        },
        {
          title: "Debug模式和Release模式有什么区别？"
        },
        {
          title: "Debug模式和Release模式有什么区别？"
        }
      ],
      pics: [],
      publishIdea: {
        classify: ["琐碎吐槽", "感悟思考", "学习点滴", "仅是记录", "我不知道"],
        tags: []
      }
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
            this.pics.push({ src: JSON.parse(xhr.response).fileURL });
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
      let content = this.$refs.content.internalValue;
      let tags = this.$refs.tags.internalValue;
      let classify = this.$refs.classify.internalValue;
      console.log(content, tags, classify);
      this.axios
        .post("/publishIdea", {
          createTime: createTime,
          ideaContent: content,
          tags: tags,
          classify: classify,
          imgs: this.pics
        })
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
        .get("/homepage?page=" + this.pageNum++)
        .then(res => {
          console.log(res);
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
    window.addEventListener("scroll", throttle(this.isScrollBottom, 1000));
  },
  mounted: function() {},
  destroyed() {
    window.removeEventListener("scroll", throttle(this.isScrollBottom, 1000));
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/common.less";

.pages-container {
  display: grid;
  grid-template-columns: 10% 45% 25% 5%;
  grid-template-rows: 1fr repeat(3, 5fr) 2fr;
  grid-row-gap: 2%;
  grid-column-gap: 5%;

  .page-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 60vw;
    height: 60vh;
  }

  .loop(@counter) when (@counter<=7) {
    .card-@{counter} {
      grid-row-start: @counter+1;
      grid-row-end: @counter+2;
      grid-column-start: 2;
      grid-column-end: 3;
    }
    .loop((@counter+1));
  }
  .loop(1);

  .side-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 10% 20% 30%;
    grid-row-gap: 3%;

    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 2;
    grid-row-end: 5;
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
    grid-row-start: 5;
    grid-row-end: 6;
    grid-column-start: 2;
    grid-column-end: 3;
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
