// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/At-The-Car-Wash/",
    component: () => import("@/views/HomePage.vue"),
    children: [],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
