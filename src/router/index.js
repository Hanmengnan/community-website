import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/components/loginPage/Login";
import Register from "@/components/loginPage/Register";
import Home from "@/views/Home";
import NotFound from "@/views/NotFound";
import HomePage from "@/components/homePage/HomePage";
import SelfPage from "@/components/selfPage/SelfPage";
import ArticlePage from "@/components/articlePage/ArticlePage";
import SecuritySetting from "@/components/selfPage/setting/SecuritySetting";
import SelfInfoSetting from "@/components/selfPage/setting/SelfInfoSetting";
import ArticlePublishPage from "@/components/publishPage/ArticlePublishPage";
import publishPage from "@/components/publishPage/publishPage";
import VideoPublishPage from "@/components/publishPage/VideoPublishPage";
import SelfPageBody from "@/components/selfPage/SelfPageBody";
import FocusUser from "@/components/selfPage/focus/FocusUser";
import FocusTag from "@/components/selfPage/focus/FocusTag";
import PublishPage from "@/components/homePage/PublishPage";

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
        path: "tagQuery/:tagName",
        name: "tagQuery",
        component: PublishPage
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
      },
      {
        path: "self",
        name: "self",
        component: SelfPage,
        children: [
          {
            path: "setting",
            name: "setting",
            component: SelfPageBody,
            children: [
              {
                path: "/",
                redirect: "security"
              },
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
            path: "focus",
            name: "focus",
            component: SelfPageBody,
            children: [
              {
                path: "/",
                redirect: "user"
              },
              {
                path: "user",
                name: "FocusUser",
                component: FocusUser
              },
              {
                path: "tag",
                name: "FocusTag",
                component: FocusTag
              }
            ]
          },
          {
            path: "message",
            name: "message",
            component: SelfPageBody
          },
          {
            path: "publish",
            name: "publish",
            component: SelfPageBody
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
