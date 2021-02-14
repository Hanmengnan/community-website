import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Home from "@/views/Home";
import NotFound from "@/views/NotFound";
import HomePage from "@/components/homePage/HomePage";
import SelfPage from "@/components/selfPage/SelfPage";
import ArticlePage from "@/components/articlePage/ArticlePage";
import SecuritySetting from "@/components/selfPage/SecuritySetting";
import SelfInfoSetting from "@/components/selfPage/SelfInfoSetting";

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
        path: "/post",
        name: "post",
        component: ArticlePage
      },
      {
        path: "/self",
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
