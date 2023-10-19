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
      {
        path: "/skillassessment",
        name: "Skill Assessment",
        component: () => import("../views/SkillAssessment.vue"),
      },
      {
        path: "/trainingschedule",
        name: "Training Schedule",
        component: () => import("../views/TrainingSchedule.vue"),
      },
    ]}
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'active',
});

export default router;
