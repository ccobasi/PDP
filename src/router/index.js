import { createRouter, createWebHistory } from "vue-router";
import Base from "../views/User/BaseView.vue";
import KMBase from "../views/KnowledgeManager/KMBase.vue"
// import ManagerBase from "../views/Manager/ManagerBase.vue"



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
      {
        path: "/km/skillassessment",
        name: "Skill Assessment",
        component: () => import("../views/KnowledgeManager/SkillAssessment.vue"),
      },
      {
        path: "/km/careergoaldetail",
        name: "Career Goal Detail",
        component: () => import("../components/KM/CareerGoalDetails.vue"),
      },
      {
        path: "/km/skillassessmentdetails",
        name: "Skill Assessment Details",
        component: () => import("../components/KM/SkillAssessmentDetails.vue"),
      },
      {
        path: "/km/trainingschedule",
        name: "Training Schedule",
        component: () => import("../views/KnowledgeManager/TrainingSchedule.vue"),
      },
      {
        path: "/km/taskdeliverables",
        name: "Task Deliverables",
        component: () => import("../views/KnowledgeManager/TaskDeliverables.vue"),
      },
      {
        path: "/km/myprofile",
        name: "Profile Dev Plan",
        component: () => import("../views/KnowledgeManager/MyProfile.vue"),
      },
      {
        path: "/km/myprofileskill",
        name: "Profile Skill Assessment",
        component: () => import("../views/KnowledgeManager/ProfileSkillAssessment.vue"),
      },
      {
        path: "/km/profiletraining",
        name: "Training Schedule",
        component: () => import("../views/KnowledgeManager/ProfileTrainingSchedule.vue"),
      },
      {
        path: "/km/trainingscheduledetails",
        name: "Training Schedule Details",
        component: () => import("../components/KM/TrainingScheduleDetails.vue"),
      },
    ],
  },
  // {
  //   path: "/m/",
  //   name: "Manager",
  //   component: ManagerBase,
  //   children: [
  //     {
  //       path: "",
  //       name: "Manager Development Plan",
  //       component: () => import("../views/Manager/DevelopmentPlan.vue"),
  //     },
  //     {
  //       path: "/m/skillassessment",
  //       name: "Skill Assessment",
  //       component: () => import("../views/Manager/SkillAssessment.vue"),
  //     },
  //     {
  //       path: "/m/careergoaldetail",
  //       name: "Career Goal Detail",
  //       component: () => import("../components/KM/CareerGoalDetails.vue"),
  //     },
  //     {
  //       path: "/m/skillassessmentdetails",
  //       name: "Skill Assessment Details",
  //       component: () => import("../components/KM/SkillAssessmentDetails.vue"),
  //     },
  //     {
  //       path: "/m/trainingschedule",
  //       name: "Training Schedule",
  //       component: () => import("../views/Manager/TrainingSchedule.vue"),
  //     },
  //     {
  //       path: "/m/taskdeliverables",
  //       name: "Task Deliverables",
  //       component: () => import("../views/Manager/TaskDeliverables.vue"),
  //     },
  //     {
  //       path: "/m/myprofile",
  //       name: "Profile Dev Plan",
  //       component: () => import("../views/Manager/MyProfile.vue"),
  //     },
  //     {
  //       path: "/m/myprofileskill",
  //       name: "Profile Skill Assessment",
  //       component: () => import("../views/Manager/ProfileSkillAssessment.vue"),
  //     },
  //     {
  //       path: "/m/profiletraining",
  //       name: "Training Schedule",
  //       component: () => import("../views/Manager/ProfileTrainingSchedule.vue"),
  //     },
  //     {
  //       path: "/m/trainingscheduledetails",
  //       name: "Training Schedule Details",
  //       component: () => import("../components/KM/TrainingScheduleDetails.vue"),
  //     },
  //   ],
  // },
  // {
  //   path: "/hod/",
  //   name: "Manager",
  //   component: ManagerBase,
  //   children: [
  //     {
  //       path: "",
  //       name: "Manager Development Plan",
  //       component: () => import("../views/HOD/DevelopmentPlan.vue"),
  //     },
  //     {
  //       path: "/hod/skillassessment",
  //       name: "Skill Assessment",
  //       component: () => import("../views/HOD/SkillAssessment.vue"),
  //     },
  //     {
  //       path: "/hod/careergoaldetail",
  //       name: "Career Goal Detail",
  //       component: () => import("../components/KM/CareerGoalDetails.vue"),
  //     },
  //     {
  //       path: "/hod/skillassessmentdetails",
  //       name: "Skill Assessment Details",
  //       component: () => import("../components/KM/SkillAssessmentDetails.vue"),
  //     },
  //     {
  //       path: "/hod/trainingschedule",
  //       name: "Training Schedule",
  //       component: () => import("../views/HOD/TrainingSchedule.vue"),
  //     },
  //     {
  //       path: "/hod/taskdeliverables",
  //       name: "Task Deliverables",
  //       component: () => import("../views/HOD/TaskDeliverables.vue"),
  //     },
  //     {
  //       path: "/hod/myprofile",
  //       name: "Profile Dev Plan",
  //       component: () => import("../views/HOD/MyProfile.vue"),
  //     },
  //     {
  //       path: "/hod/myprofileskill",
  //       name: "Profile Skill Assessment",
  //       component: () => import("../views/HOD/ProfileSkillAssessment.vue"),
  //     },
  //     {
  //       path: "/hod/profiletraining",
  //       name: "Training Schedule",
  //       component: () => import("../views/HOD/ProfileTrainingSchedule.vue"),
  //     },
  //     {
  //       path: "/hod/trainingscheduledetails",
  //       name: "Training Schedule Details",
  //       component: () => import("../components/KM/TrainingScheduleDetails.vue"),
  //     },
  //   ],
  // },
    ]}
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'active',
});

export default router;
