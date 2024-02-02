import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/User/HomeView.vue'
import SkillAssessment from '../views/User/SkillAssessment.vue'
import TrainingSchedule from '../views/User/TrainingSchedule.vue'
import TaskDeliverables from '../views/User/TaskDeliverables.vue'
import MentorshipPlan from '../views/User/MentorshipPlan.vue'
import Settings from '../views/User/SettingsView.vue'
import CareerGoalDetail from '../components/CareerGoalDetail.vue'
import SkillAssessmentDetails from '../components/SkillAssessmentDetails.vue'
import TrainingScheduleDetails from '../components/TrainingScheduleDetails.vue'
import TasksDetails from '../components/TasksDetails.vue'
import MentorshipDetails from '../components/MentorshipDetails.vue'
import DevelopmentPlan from '../views/KnowledgeManager/DevelopmentPlan.vue'
import KMSkillAssessment from '../views/KnowledgeManager/SkillAssessment.vue'
import KMTrainingSchedule from '../views/KnowledgeManager/TrainingSchedule.vue'
import KMAllTrainingSchedule from '../views/KnowledgeManager/AllTrainingSchedule.vue'
import KMTaskDeliverables from '../views/KnowledgeManager/TaskDeliverables.vue'
import KMMentorship from '../views/KnowledgeManager/MentorshipPlan.vue'
import MyProfile from '../views/KnowledgeManager/MyProfile.vue'
import  ProfileSkillAssessment from '../views/KnowledgeManager/ProfileSkillAssessment.vue'
import ProfileTrainingSchedule from '../views/KnowledgeManager/ProfileTrainingSchedule.vue'
import MDevelopmentPlan from '../views/Manager/DevelopmentPlan.vue'
import MSkillAssessment from '../views/Manager/SkillAssessment.vue'
// import MTrainingSchedule from '../views/Manager/TrainingSchedule.vue'
import MAllTrainingSchedule from '../views/Manager/AllTrainingSchedule.vue'
import MTaskDeliverables from '../views/Manager/TaskDeliverables.vue'
import MMyProfile from '../views/Manager/MyProfile.vue'
import MProfileSkillAssessment from '../views/Manager/ProfileSkillAssessment.vue'
import MProfileTrainingSchedule from '../views/Manager/ProfileTrainingSchedule.vue'
import HODDevelopmentPlan from '../views/HOD/DevelopmentPlan.vue'
import HODSkillAssessment from '../views/HOD/SkillAssessment.vue'
import HODTrainingSchedule from '../views/HOD/TrainingSchedule.vue'
import AllHODTrainingSchedule from '../views/HOD/AllTrainingSchedule.vue'
import HODTaskDeliverables from '../views/HOD/TaskDeliverables.vue'
import HODProfile from '../views/HOD/MyProfile.vue'
import HODProfileSkillAssessment from '../views/HOD/ProfileSkillAssessment.vue'
import HODProfileTrainingSchedule from '../views/HOD/ProfileTrainingSchedule.vue'
import ITDevelopmentPlan from '../views/IT/DevelopmentPlan.vue'
import ITSkillAssessment from '../views/IT/SkillAssessment.vue'
import ITTrainingSchedule from '../views/IT/TrainingSchedule.vue'
import ITAllTrainingSchedule from '../views/IT/AllTrainingSchedule.vue'
import ITTaskDeliverables from '../views/IT/TaskDeliverables.vue'
import ITProfile from '../views/IT/MyProfile.vue'
import ITProfileSkillAssessment from '../views/IT/ProfileSkillAssessment.vue'
import ITProfileTrainingSchedule from '../views/IT/ProfileTrainingSchedule.vue'

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
      path: '/mentorshipplan',
      name: 'Mentorship Plan',
      component: MentorshipPlan,
     
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
     
    },
    {
      path: '/careergoaldetail/:id',
      name: 'Detail',
      component: CareerGoalDetail,
     
    },

    {
      path: '/skillassessmentdetails/:id',
      name: 'Skill Assessment Details',
      component: SkillAssessmentDetails,
     
    },
    {
      path: '/trainingscheduledetails/:id',
      name: 'Training Schedule Details',
      component: TrainingScheduleDetails,
     
    },
    {
      path: '/tasksdetails/:id',
      name: 'Tasks Details',
      component: TasksDetails,
     
    },
    {
      path: '/mentorshipdetails/:id',
      name: 'Mentorship Details',
      component: MentorshipDetails,
     
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
    path: "/km/alltrainingschedule",
    name: "All Knowledge Manager Training Schedule",
    component: KMAllTrainingSchedule,
    },
    {
    path: "/km/taskdeliverables",
    name: "Knowledge Manager Task Deliverables",
    component: KMTaskDeliverables,
    },
    {
    path: "/km/mentorshipplan",
    name: "Knowledge Manager Mentorship",
    component: KMMentorship,
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
    {
    path: "/m/",
    name: "Manager Development Plan",
    component: MDevelopmentPlan,
    },
    {
    path: "/m/skillassessment",
    name: "Manager Skill Assessment",
    component: MSkillAssessment,
    },
    {
    path: "/m/trainingschedule",
    name: "Manager Training Schedule",
    component: () => import("../views/Manager/TrainingSchedule.vue"),
    },
    {
    path: "/m/alltrainingschedule",
    name: "All Manager Training Schedule",
    component: MAllTrainingSchedule,
    },
    {
    path: "/m/taskdeliverables",
    name: "Manager Task Deliverables",
    component: MTaskDeliverables,
    },
    {
    path: "/m/myprofile",
    name: "Manager Profile",
    component: MMyProfile,
    },
    {
    path: "/m/profileskillassessment",
    name: "Manager Profile Skill Assessment",
    component: MProfileSkillAssessment,
    },
    {
    path: "/m/profiletrainingschedule",
    name: "Manager Profile Training Schedule",
    component: MProfileTrainingSchedule,
    },
    {
    path: "/hod/",
    name: "HOD Development Plan",
    component: HODDevelopmentPlan,
    },
    {
    path: "/hod/skillassessment",
    name: "HOD Skill Assessment",
    component: HODSkillAssessment,
    },
    {
    path: "/hod/trainingschedule",
    name: "HOD Training Schedule",
    component: HODTrainingSchedule,
    },
    {
    path: "/hod/alltrainingschedule",
    name: "All HOD Training Schedule",
    component: AllHODTrainingSchedule,
    },
    {
    path: "/hod/taskdeliverables",
    name: "HOD Task Deliverables",
    component: HODTaskDeliverables,
    },
    {
    path: "/hod/myprofile",
    name: "HOD Profile",
    component: HODProfile,
    },
    {
    path: "/hod/profileskillassessment",
    name: "HOD Profile Skill Assessment",
    component: HODProfileSkillAssessment,
    },
    {
    path: "/hod/profiletrainingschedule",
    name: "HOD Profile Training Schedule",
    component: HODProfileTrainingSchedule,
    },
    {
    path: "/it/",
    name: "IT Development Plan",
    component: ITDevelopmentPlan,
    },
    {
    path: "/it/skillassessment",
    name: "IT Skill Assessment",
    component: ITSkillAssessment,
    },
    {
    path: "/it/trainingschedule",
    name: "IT Training Schedule",
    component: ITTrainingSchedule,
    },
    {
    path: "/it/alltrainingschedule",
    name: "All IT Training Schedule",
    component: ITAllTrainingSchedule,
    },
    {
    path: "/it/taskdeliverables",
    name: "IT Task Deliverables",
    component: ITTaskDeliverables,
    },
    {
    path: "/it/myprofile",
    name: "IT Profile",
    component: ITProfile,
    },
    {
    path: "/it/profileskillassessment",
    name: "IT Profile Skill Assessment",
    component: ITProfileSkillAssessment,
    },
    {
    path: "/it/profiletrainingschedule",
    name: "IT Profile Training Schedule",
    component: ITProfileTrainingSchedule,
    },

  ]
})


export default router;
