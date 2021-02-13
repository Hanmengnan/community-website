import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Home from "@/views/Home";
import NotFound from "@/views/NotFound";
import HomePage from "@/components/HomePage";
import SelfPage from "@/components/SelfPage";

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
        path: "/self",
        name: "self",
        components: SelfPage
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
