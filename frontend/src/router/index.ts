import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import LoginView from "../views/auth/LoginView.vue";
import RegisterView from "../views/auth/RegisterView.vue";

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
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  // We'll add other routes as we create their components
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Navigation guard for auth routes
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (
    token &&
    (to.name === "login" || to.name === "register" || to.name === "landing")
  ) {
    // If user is logged in, redirect to profile
    next({ name: "profile" });
  } else {
    next();
  }
});

export default router;
