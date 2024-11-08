import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import LoginView from "../views/auth/LoginView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "landing",
    component: LandingPage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  // We'll add other routes as we create their components
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
