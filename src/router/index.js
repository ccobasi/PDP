import { createRouter, createWebHistory } from "vue-router";
import Base from "../views/BaseView.vue";
import KMBase from "../views/KnowledgeManager/KMBase.vue"



const routes =  [
  {
    path: "/",
    name: "home",
    component: Base,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("../views/User/HomeView.vue"),
      },
      {
        path: "/skillassessment",
        name: "Skill Assessment",
        component: () => import("../views/User/SkillAssessment.vue"),
      },
      {
        path: "/trainingschedule",
        name: "Training Schedule",
        component: () => import("../views/User/TrainingSchedule.vue"),
      },
      {
        path: "/taskdeliverables",
        name: "Task Deliverables",
        component: () => import("../views/User/TaskDeliverables.vue"),
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
      {
    path: "/km/",
    name: "Knowledge Manager",
    component: KMBase,
    children: [
      {
        path: "",
        name: "KM Development Plan",
        component: () => import("../views/KnowledgeManager/DevelopmentPlan.vue"),
      },
      
    ],
  },
    ]}
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'active',
});

export default router;
