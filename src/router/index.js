import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/User/HomeView.vue'
import SkillAssessment from '../views/User/SkillAssessment.vue'
import TrainingSchedule from '../views/User/TrainingSchedule.vue'
import TaskDeliverables from '../views/User/TaskDeliverables.vue'
import CareerGoalDetail from '../components/CareerGoalDetail.vue'
import SkillAssessmentDetails from '../components/SkillAssessmentDetails.vue'
import TrainingScheduleDetails from '../components/TrainingScheduleDetails.vue'
import DevelopmentPlan from '../views/KnowledgeManager/DevelopmentPlan.vue'
import KMSkillAssessment from '../views/KnowledgeManager/SkillAssessment.vue'
import KMTrainingSchedule from '../views/KnowledgeManager/TrainingSchedule.vue'
import KMTaskDeliverables from '../views/KnowledgeManager/TaskDeliverables.vue'
import MyProfile from '../views/KnowledgeManager/MyProfile.vue'
import  ProfileSkillAssessment from '../views/KnowledgeManager/ProfileSkillAssessment.vue'
import ProfileTrainingSchedule from '../views/KnowledgeManager/ProfileTrainingSchedule.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      
    },
     {
      path: '/skillassessment',
      name: 'Skill Assessment',
      component: SkillAssessment,
    
    },
    {
      path: '/trainingschedule',
      name: 'Training Schedule',
      component: TrainingSchedule,
    
    },
    {
      path: '/taskdeliverables',
      name: 'Task Deliverables',
      component: TaskDeliverables,
     
    },
    {
      path: '/careergoaldetail',
      name: 'Career Goal Detail',
      component: CareerGoalDetail,
     
    },
    {
      path: '/skillassessmentdetails',
      name: 'Skill Assessment Details',
      component: SkillAssessmentDetails,
     
    },
    {
      path: '/trainingscheduledetails',
      name: 'Training Schedule Details',
      component: TrainingScheduleDetails,
     
    },
    {
    path: "/km/",
    name: "Knowledge Manager Development Plan",
    component: DevelopmentPlan,
    },
    {
    path: "/km/skillassessment",
    name: "Knowledge Manager Skill Assessment",
    component: KMSkillAssessment,
    },
    {
    path: "/km/trainingschedule",
    name: "Knowledge Manager Training Schedule",
    component: KMTrainingSchedule,
    },
    {
    path: "/km/taskdeliverables",
    name: "Knowledge Manager Task Deliverables",
    component: KMTaskDeliverables,
    },
    {
    path: "/km/myprofile",
    name: "Knowledge Manager Profile",
    component: MyProfile,
    },
    {
    path: "/km/profileskillassessment",
    name: "Knowledge Manager Profile Skill Assessment",
    component: ProfileSkillAssessment,
    },
    {
    path: "/km/profiletrainingschedule",
    name: "Knowledge Manager Profile Training Schedule",
    component: ProfileTrainingSchedule,
    },
  ]
})


export default router;
