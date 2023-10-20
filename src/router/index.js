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
      {
        path: "/taskdeliverables",
        name: "Task Deliverables",
        component: () => import("../views/TaskDeliverables.vue"),
      },
      {
        path: "/careergoaldetail",
        name: "Career Goal Detail",
        component: () => import("../components/CareerGoalDetail.vue"),
      },
      {
        path: "/skillassessmentdetails",
        name: "Skill Assessment Details",
        component: () => import("../components/SkillAssessmentDetails.vue"),
      },
      {
        path: "/trainingscheduledetails",
        name: "Training Schedule Details",
        component: () => import("../components/TrainingScheduleDetails.vue"),
      },
    ]}
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'active',
});

export default router;
