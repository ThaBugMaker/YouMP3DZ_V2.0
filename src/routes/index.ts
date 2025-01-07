// src/router.ts
import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Home from "@/views/HomeView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  {
    path: "/docs",
    name: "Docs",
    component: () => import("@/views/Docs.vue"),
    beforeEnter() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  // about route
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About.vue"),
    beforeEnter() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  // tos route
  {
    path: "/terms-and-privacy",
    name: "TermsAndPrivacy",
    component: () => import("@/views/Tos.vue"),
    beforeEnter() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  // 404 route
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
    beforeEnter() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
});

export default router;
