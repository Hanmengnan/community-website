import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/components/loginPage/Login";
import Register from "@/components/loginPage/Register";
import Home from "@/views/Home";
import NotFound from "@/views/NotFound";
import HomePage from "@/components/homePage/HomePage";
import SelfPage from "@/components/selfPage/SelfPage";
import ArticlePage from "@/components/articlePage/ArticlePage";
import SecuritySetting from "@/components/selfPage/SecuritySetting";
import SelfInfoSetting from "@/components/selfPage/SelfInfoSetting";
import ArticlePublishPage from "@/components/publishPage/ArticlePublishPage";
import publishPage from "@/components/publishPage/publishPage";
import VideoPublishPage from "@/components/publishPage/VideoPublishPage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/",
    name: "home",
    component: Home,
    children: [
      {
        path: "/",
        name: "homepage",
        component: HomePage
      },
      {
        path: "post",
        name: "post",
        component: ArticlePage
      },
      {
        path: "self",
        name: "self",
        component: SelfPage,
        children: [
          {
            path: "security",
            name: "security",
            component: SecuritySetting
          },
          {
            path: "info",
            name: "info",
            component: SelfInfoSetting
          }
        ]
      },
      {
        path: "publish",
        name: "publish",
        component: publishPage,
        children: [
          {
            name: "publishArticle",
            path: "article",
            component: ArticlePublishPage
          },
          {
            name: "publishVideo",
            path: "video",
            component: VideoPublishPage
          }
        ]
      }
    ]
  },
  {
    path: "*",
    name: "not-found",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
