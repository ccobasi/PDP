import { createRouter, createWebHistory } from "vue-router";
import Base from "../views/BaseView.vue";



const routes =  [
  {
    path: "/",
    name: "home",
    component: Base,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("../views/HomeView.vue"),
      },
    ]}
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'active',
});

export default router;
