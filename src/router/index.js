import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress"; // Progress 进度条
import "nprogress/nprogress.css";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/pages/home")
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/pages/about")
  }
];
const router = new Router({
  mode: "history",
  routes,
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    };
  }
});
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach((to, from) => {
  NProgress.done(); // 结束Progress
});
export default router;
