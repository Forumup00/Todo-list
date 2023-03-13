import { createRouter, createWebHistory } from "vue-router";
import defaultLayouts from "./Layouts/defaultLayouts.vue";
import auth from "./Layouts/auth.vue";
import Home from "./view/Home.vue";
import Login from "./view/Login.vue";
import SignUp from "./view/SignUp.vue";
import _board from "./view/_board.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      layout: defaultLayouts,
    },
  },
  {
    path: "/auth/login",
    name: "login",
    component: Login,
    meta: {
      layout: auth,
    },
  },
  {
    path: "/auth/signup",
    name: "signup",
    component: SignUp,
    meta: {
      layout: auth,
    },
  },
  {
    path: "/board/:id",
    name: "_board",
    component: _board,
    meta: {
      layout: defaultLayouts,
    },
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
