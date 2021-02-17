<template>
  <div class="full-size cards-container">
    <template v-for="(article, index) in articleList">
      <ArticleCard
        :class="['page-card', 'card-' + (index + 1)]"
        :title="article.title"
        :sub-tile="article.subTitle"
        :author="article.author"
        :time="article.time"
        :tags="article.tags"
        :key="index"
      ></ArticleCard>
    </template>
    <div class="side-bar">
      <v-card class="home-publish">
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
      <v-card class="tags-box">
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
      <v-card class="articles-box">
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
          <v-container>
            <v-form ref="ideaForm">
              <v-row>
                <v-col>
                  <v-textarea outlined ref="textarea"></v-textarea>
                </v-col>
              </v-row>
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
                  话题
                  <v-text-field dense outlined ref="topic"></v-text-field>
                </v-col>
                <v-col>
                  分类
                  <v-select dense outlined ref="classify"></v-select>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn depressed color="blue-grey lighten-4" v-on:click="cancel()"
            >取消</v-btn
          >
          <v-btn depressed color="primary" v-on:click="publish()">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ArticleCard from "@/components/homePage/ArticleCard";
import Pagination from "@/components/homePage/Pagination";
import axios from "axios";

export default {
  name: "HomePage",
  components: {
    ArticleCard,
    Pagination
  },
  data() {
    return {
      justify: ["start", "center", "end", "space-around", "space-between"],
      overlay: false,
      articleList: [
        {
          title: "测试",
          subTitle: "第一篇测试",
          author: "siegelion",
          time: "2021/02/07 20:47",
          tags: ["测试", "测试", "测试", "测试"]
        },
        {
          title: "测试",
          subTitle: "第一篇测试",
          author: "siegelion",
          time: "2021/02/07 20:47",
          tags: ["测试", "测试", "测试", "测试"]
        },
        {
          title: "测试",
          subTitle: "第一篇测试",
          author: "siegelion",
          time: "2021/02/07 20:47",
          tags: ["测试", "测试", "测试", "测试"]
        },
        {
          title: "测试",
          subTitle: "第一篇测试",
          author: "siegelion",
          time: "2021/02/07 20:47",
          tags: ["测试", "测试", "测试", "测试"]
        },
        {
          title: "测试",
          subTitle: "第一篇测试",
          author: "siegelion",
          time: "2021/02/07 20:47",
          tags: ["测试", "测试", "测试", "测试"]
        }
      ],
      publishButton: [
        {
          title: "发想法",
          icon: "lightbulb-on",
          color: "light-blue",
          event: this.changeOverlay
        },
        { title: "发视频", icon: "video", color: "teal accent-3" },
        { title: "发文章", icon: "clipboard-edit", color: "orange lighten-1" }
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
      pics: []
    };
  },
  methods: {
    changeOverlay: function() {
      this.overlay = true;
    },
    uploadPic: function() {
      this.pics.push({ src: "https://pic2.zhimg.com/da8e974dc_xll.jpg" });
      console.log(this.$refs.uploadPic.value);
    },
    publish: function() {
      console.log("");
    },
    cancel: function() {
      this.$refs.ideaForm.reset();
      this.pics.length = 0;
      this.overlay = false;
    }
  },
  mounted() {
    axios
      .get("/homePage")
      .then(function(res) {
        console.log(res);
      })
      .catch();
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/common.less";

.cards-container {
  display: grid;
  grid-template-columns: 10% 45% 25% 5%;
  grid-template-rows: 1.5fr repeat(5, 3fr) 2fr;
  grid-row-gap: 2%;
  grid-column-gap: 5%;

  .page-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 60vw;
    height: 30vh;
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

  .side-bar {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 15% 25% 50%;
    grid-row-gap: 3%;

    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 2;
    grid-row-end: 5;
    justify-items: center;

    .home-publish {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      width: 100%;

      .publish-button {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

  .tags-box {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-content: flex-start;
    width: 100%;

    .tag {
      margin: 3px;
    }
  }

  .articles-box {
    width: 100%;
  }

  .pagination {
    grid-row-start: 7;
    grid-row-end: 8;
    grid-column-start: 2;
    grid-column-end: 3;
    align-items: center;
  }

  .dialog-card {
    display: grid;
    grid-template-rows: 4fr 2fr 1fr 1fr;
    grid-template-columns: 1fr 4fr 1fr 1fr;
    grid-column-gap: 3%;
    grid-row-gap: 3%;

    .card-1 {
      grid-row-start: 1;
      grid-row-end: 2;
      grid-column-start: 1;
      grid-column-end: 4;
    }
    .card-2 {
      grid-row-start: 1;
      grid-row-end: 2;
      grid-column-start: 1;
      grid-column-end: 4;
    }
    .card-3 {
      grid-row-start: 1;
      grid-row-end: 2;
      grid-column-start: 1;
      grid-column-end: 4;
    }
  }
}
</style>
