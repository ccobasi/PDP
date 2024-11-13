import {defineStore} from 'pinia';
import axios from 'axios';

export const useGoalsStore = defineStore('goals', {
  state: () => ({
    goals: [],
    baseUrl: 'https://infracredit2.pythonanywhere.com/api/v1/development-plans/',
  }),
  actions: {
  async fetchGoals() {
  try {
    const response = await axios.get(`${this.baseUrl}`);
    console.log('API Response:', response); 

    if (response.data && Array.isArray(response.data.data)) {
      this.goals = response.data.data; 
    } else {
      console.error('Error: Response data is not in the expected format', response.data);
      this.goals = [];
    }

    console.log('Fetched Goals:', this.goals); 

  } catch (error) {
    console.error('Error fetching goals:', error);
    this.goals = [];
  }
},

    // async fetchGoals({ level = '', department = '', quarter = '', year = '' } = {}) {
    //   try {
    //     const response = await axios.get(this.baseUrl, {
    //       params: {
    //         recordOwner_role_option: level,      
    //         recordOwner_department_option: department,  
    //         quarter,                              
    //         year,                                
    //       },
    //     });
        
    //     this.goals = response.data;
    //     console.log(this.goals);
    //   } catch (error) {
    //     console.error('Error fetching goals:', error);
    //   }
    // },
    
   async addGoal({
  planType,
  planTerm,
  goalSummary,
  achievementApproach,
  requiredResources,
  successCriteria,
  potentialChallenges,
  solutionToChallenges,
  targetCompletionDate,
  actualCompletionDate,
  progressMetrics,
  status,
  feedback,
  evidenceURL,
  createdBy,
  lastModifiedBy,
  recordOwner,
}) {
  try {
    // Validation for planTypeId and planTermId
    if (planType === "Select Type" || planTerm === "Select Term") {
      console.error("Both plan type and plan term are required.");
      return; // Prevent form submission
    }

    

    if (isNaN(planType) || isNaN(planTerm)) {
      console.error("Both plan type and plan term are required.");
      return;
    }

    const payload = {
      planType: isNaN(planType) ? null : planType,
      planTerm: isNaN(planTerm) ? null : planTerm,
      goalSummary,
      achievementApproach,
      requiredResources,
      successCriteria,
      potentialChallenges,
      solutionToChallenges,
      targetCompletionDate,
      actualCompletionDate,
      progressMetrics,
      status,
      feedback,
      evidenceURL,
      createdBy,
      lastModifiedBy,
      recordOwner,
    };

    console.log('Submitting payload:', payload);
    const formData = this.createFormData(payload); 

    const response = await axios.post(this.baseUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data) {
      this.goals.push(response.data);
      console.log('Goal added:', response.data);
    } else {
      console.error('Server response data is empty');
    }
  } catch (error) {
    console.error('Error adding goal:', error.response?.data || error);
  }
},

// Add this method to your component or object
createFormData(payload) {
  const formData = new FormData();
  for (let key in payload) {
    if (payload.hasOwnProperty(key)) {
      // If the value is a file (e.g., evidenceURL), append it directly
      if (payload[key] instanceof File) {
        formData.append(key, payload[key]);
      } else {
        // Otherwise, append the value as text
        formData.append(key, payload[key]);
      }
    }
  }
  return formData;
},
    
   async modifyGoal(goal) { 
  try {
    const goalIndex = this.goals.findIndex(d => d.id === goal.id);
    if (goalIndex !== -1) {
      const formData = new FormData();

      // Append planType and planTerm as JSON strings to hint they are integers
      formData.append('planType', JSON.stringify(parseInt(goal.planType, 10)));
      formData.append('planTerm', JSON.stringify(parseInt(goal.planTerm, 10)));

      if (goal.evidenceURL && goal.evidenceURL instanceof File) {
        formData.append('evidenceURL', goal.evidenceURL);
      } else {
        console.log('No new file provided for evidenceURL, skipping');
      }

      // Append other fields, excluding evidenceURL
      for (const key in goal) {
        if (key !== 'planType' && key !== 'planTerm' && key !== 'evidenceURL' && goal[key] !== undefined && goal[key] !== null) {
          formData.append(key, goal[key]);
        }
      }

      console.log('FormData:', formData);

      const response = await axios.put(`${this.baseUrl}${goal.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      this.goals.splice(goalIndex, 1, response.data.data);
      console.log('Goal successfully updated:', response.data.data);
    } else {
      console.error('Goal to update not found:', goal.id);
    }
  } catch (error) {
    console.error('Error updating goal:', error.response?.data.data || error);
  }
},
    
    async deleteGoal(goalId) {
      try {
        await axios.delete(`${this.baseUrl}/${goalId}`);
        this.goals = this.goals.filter(d => d.id !== goalId);
      } catch (error) {
        console.error('Error deleting goal:', error);
      }
    },
  },
});
// import { defineStore } from 'pinia';
// import { goalsService } from '../services/goalsService';

// export const useGoalsStore = defineStore('goals', {
//   state: () => ({
//     goals: [],
//   }),

//   actions: {
//     async fetchGoals() {
//       try {
//         this.goals = await goalsService.fetchGoals();
//         console.log('Goals fetched:', this.goals);
//       } catch (error) {
//         console.error('Error fetching goals:', error);
//       }
//     },

//     async addGoal(goalData) {
//       try {
//         console.log('Sending goal data:', goalData); 
//         const addedGoal = await goalsService.addGoal(goalData);

//         if (addedGoal && addedGoal.id) {
//           this.goals.push(addedGoal);
//           console.log('Goal added successfully:', addedGoal);
//         } else {
//           console.error('Error: Invalid response from server:', addedGoal);
//         }
//       } catch (error) {
//         console.error('Error adding goal:', error.response ? error.response.data : error.message);
//       }
//     },

//     // async modifyGoal(goal) {
//     //   try {
//     //     const updatedGoal = await goalsService.updateGoal(goal);
//     //     const index = this.goals.findIndex(g => g.id === updatedGoal.id);
//     //     if (index !== -1) {
//     //       this.goals[index] = updatedGoal;
//     //       console.log('Goal updated:', updatedGoal);
//     //     }
//     //   } catch (error) {
//     //     console.error('Error updating goal:', error.response ? error.response.data : error);
//     //   }
//     // },

//   async modifyGoal(goal) {
//   console.log('Received goal for modification:', goal);

//   if (!goal.id) {
//     console.error('Goal ID is missing');
//     return;
//   }

//   const formData = new FormData();
//   Object.entries(goal).forEach(([key, value]) => {
//     if (key !== 'evidenceURL') {
//       formData.append(key, value);
//     }
//   });

//   if (goal.evidenceURL) {
//     formData.append('evidenceURL', goal.evidenceURL);
//   }

//   console.log('Data being sent for goal update:');
//   for (const pair of formData.entries()) {
//     console.log(`${pair[0]}:`, pair[1]);
//   }

//   try {
//     console.log(`Calling API: development-plans/${goal.id}`);
//     const response = await goalsService.updateGoal(goal);

//     console.log('API Response:', response);
//     if (response && response.data) {
//       const index = this.goals.findIndex(g => g.id === goal.id);
//       if (index !== -1) {
//         this.goals[index] = response.data;
//         console.log('Goal updated successfully:', response.data);
//       }
//     } else {
//       console.error('Invalid response format, no data field found:', response);
//     }
//   } catch (error) {
//     console.error('Error updating goal:', error.response ? error.response.data : error.message);
//   }
// },
//     async deleteGoal(goalId) {
//       try {
//         await goalsService.deleteGoal(goalId);
//         this.goals = this.goals.filter(goal => goal.id !== goalId);
//         console.log('Goal deleted with ID:', goalId);
//       } catch (error) {
//         console.error('Error deleting goal:', error);
//       }
//     },
//   },
// });


  
export const useSelectedNameStore = defineStore('selectedName', {
  state: () => ({
    name: '',
  }),
  actions: {
    setSelectedName(newName) {
      this.name = newName;
    },
  },
});

export const useHODGoalsStore = defineStore('goals', {
  state: () => ({
    hodGoals: JSON.parse(localStorage.getItem('goals')) || [],
    evidence: null,
  }),

  getters: {
    getGoals() {
      return this.goals;
    },
    getEvidence() {
      return this.evidence;
    },
  },
 
  actions: {
    addGoal(plan, term, goal, achieve, resource, success, potential, solution, date, progress,status,feedback,evidence) {
      try {
        const nextId = this.goals.length + 1;

        this.goals.push({
          id: nextId,
          plan: plan,
          term: term,
          goal: goal,
          achieve: achieve,
          resource: resource,
          success: success,
          potential: potential,
          solution: solution,
          date: date,
          progress: progress,
          status: status,
          feedback: feedback,
          evidence: evidence,
        });

        this.saveGoals();
      } catch (error) {
        console.error('Error adding goal:', error);
      }
    },

    fetchGoals() {
      return this.goals;
    },

    saveGoals() {
      try {
        localStorage.setItem('goals', JSON.stringify(this.goals));
      } catch (error) {
        console.error('Error saving goals to localStorage:', error);
      }
    },
    setEvidence(file) {
      this.evidence = file;
    },
  },
});


export const useITGoalsStore = defineStore('goals', {
  state: () => ({
    itGoals: JSON.parse(localStorage.getItem('goals')) || [],
    evidence: null,
  }),

  getters: {
    getGoals() {
      return this.goals;
    },
    getEvidence() {
      return this.evidence;
    },
  },
 
  actions: {
    addGoal(plan, term, goal, achieve, resource, success, potential, solution, date, progress,status,feedback,evidence) {
      try {
        const nextId = this.goals.length + 1;

        this.goals.push({
          id: nextId,
          plan: plan,
          term: term,
          goal: goal,
          achieve: achieve,
          resource: resource,
          success: success,
          potential: potential,
          solution: solution,
          date: date,
          progress: progress,
          status: status,
          feedback: feedback,
          evidence: evidence,
        });

        this.saveGoals();
      } catch (error) {
        console.error('Error adding goal:', error);
      }
    },

    fetchGoals() {
      return this.goals;
    },

    saveGoals() {
      try {
        localStorage.setItem('goals', JSON.stringify(this.goals));
      } catch (error) {
        console.error('Error saving goals to localStorage:', error);
      }
    },
    setEvidence(file) {
      this.evidence = file;
    },
  },
});

export const useTeamMemberStore = defineStore('teamMemberStore', {
  state: () => ({
    teamMemberData: [
      // Lola Oyebola's Records
  {
    achievementApproach: "Improved team efficiency through regular meetings",
    actualCompletionDate: "2024-07-15T00:00:00Z",
    createdBy: "defaultUser",
    createdDate: "2024-07-08T05:24:47.053071Z",
    evidenceURL: "http://example.com/evidence1",
    evidenceURLpath: "/evidence1",
    feedback: "Excellent performance in team coordination",
    goalSummary: "Enhanced team collaboration",
    id: 1,
    lastModifiedBy: "defaultUser",
    lastModifiedDate: "2024-07-10T09:35:21Z",
    planTermId: 2,
    planTypeId: 3,
    potentialChallenges: "Team communication gaps",
    progressMetrics: "Above expectations",
    recordOwner: "Lola Oyebola",
    requiredResources: "Time management tools",
    solutionCriteria: "Completion within timeline",
    status: "Completed",
    targetCompletionDate: "2024-07-30T00:00:00Z",
    fullName: "Lola Oyebola",
    dateOfEmployment: "23/08/2020",
    department: "User",
    level: "Associate",
    manager: "Chinua Azibuke",
    promotionsCount: 5
  },
  {
    achievementApproach: "Implemented a structured feedback process",
    actualCompletionDate: null,
    createdBy: "defaultUser",
    createdDate: "2024-08-01T08:14:32Z",
    evidenceURL: "http://example.com/evidence2",
    evidenceURLpath: "/evidence2",
    feedback: "Structured and timely feedback given",
    goalSummary: "Improve feedback loop",
    id: 2,
    lastModifiedBy: "defaultUser",
    lastModifiedDate: "2024-08-05T12:22:43Z",
    planTermId: 2,
    planTypeId: 2,
    potentialChallenges: "Resistance to feedback",
    progressMetrics: "On schedule",
    recordOwner: "Lola Oyebola",
    requiredResources: "Training sessions",
    solutionCriteria: "Increased feedback acceptance",
    status: "In Progress",
    targetCompletionDate: "2024-09-15T00:00:00Z",
    fullName: "Lola Oyebola",
    dateOfEmployment: "23/08/2020",
    department: "User",
    level: "Associate",
    manager: "Chinua Azibuke",
    promotionsCount: 5
  },
  // Mark Dean's Records
  {
    achievementApproach: "Optimized knowledge management repository",
    actualCompletionDate: null,
    createdBy: "defaultUser",
    createdDate: "2024-07-12T14:37:52Z",
    evidenceURL: "http://example.com/evidence3",
    evidenceURLpath: "/evidence3",
    feedback: "Knowledge management streamlined",
    goalSummary: "Enhance document accessibility",
    id: 3,
    lastModifiedBy: "defaultUser",
    lastModifiedDate: "2024-07-13T10:20:31Z",
    planTermId: 1,
    planTypeId: 4,
    potentialChallenges: "Technical limitations",
    progressMetrics: "Slightly delayed",
    recordOwner: "Mark Dean",
    requiredResources: "Repository tools",
    solutionCriteria: "Efficient document retrieval",
    status: "In Progress",
    targetCompletionDate: "2024-08-20T00:00:00Z",
    fullName: "Mark Dean",
    dateOfEmployment: "23/05/2019",
    department: "Knowledge Management",
    level: "Senior Associate",
    manager: "Daniel Clinton",
    promotionsCount: 3
  },
  {
    achievementApproach: "Developed new training modules",
    actualCompletionDate: "2024-08-10T00:00:00Z",
    createdBy: "defaultUser",
    createdDate: "2024-07-15T11:22:50Z",
    evidenceURL: "http://example.com/evidence4",
    evidenceURLpath: "/evidence4",
    feedback: "Training module feedback is positive",
    goalSummary: "Improve knowledge sharing",
    id: 4,
    lastModifiedBy: "defaultUser",
    lastModifiedDate: "2024-08-09T08:45:00Z",
    planTermId: 1,
    planTypeId: 2,
    potentialChallenges: "Low initial engagement",
    progressMetrics: "Ahead of schedule",
    recordOwner: "Mark Dean",
    requiredResources: "Learning management system",
    solutionCriteria: "Higher engagement",
    status: "Completed",
    targetCompletionDate: "2024-08-15T00:00:00Z",
    fullName: "Mark Dean",
    dateOfEmployment: "23/05/2019",
    department: "Knowledge Management",
    level: "Senior Associate",
    manager: "Daniel Clinton",
    promotionsCount: 3
  },
  // Uzo Okoro's Records
  {
    achievementApproach: "Led team in risk management practices",
    actualCompletionDate: "2024-07-25T00:00:00Z",
    createdBy: "defaultUser",
    createdDate: "2024-07-08T09:12:01Z",
    evidenceURL: "http://example.com/evidence5",
    evidenceURLpath: "/evidence5",
    feedback: "Improved risk awareness",
    goalSummary: "Reduce operational risks",
    id: 5,
    lastModifiedBy: "defaultUser",
    lastModifiedDate: "2024-07-22T13:18:19Z",
    planTermId: 3,
    planTypeId: 2,
    potentialChallenges: "Lack of resources",
    progressMetrics: "Significant progress",
    recordOwner: "Uzo Okoro",
    requiredResources: "Risk management tools",
    solutionCriteria: "Reduction in incidents",
    status: "Completed",
    targetCompletionDate: "2024-07-30T00:00:00Z",
    fullName: "Uzo Okoro",
    dateOfEmployment: "23/11/2015",
    department: "Manager",
    level: "AVP",
    manager: "Mosurat Adeniyi",
    promotionsCount: 1
  },
  {
    achievementApproach: "Implemented risk assessment training",
    actualCompletionDate: null,
    createdBy: "defaultUser",
    createdDate: "2024-07-30T14:05:47Z",
    evidenceURL: "http://example.com/evidence6",
    evidenceURLpath: "/evidence6",
    feedback: "High participation in training",
    goalSummary: "Enhance risk assessment skills",
    id: 6,
    lastModifiedBy: "defaultUser",
    lastModifiedDate: "2024-08-01T09:47:15Z",
    planTermId: 2,
    planTypeId: 4,
    potentialChallenges: "Time constraints",
    progressMetrics: "On track",
    recordOwner: "Uzo Okoro",
    requiredResources: "Training resources",
    solutionCriteria: "Greater risk assessment capability",
    status: "In Progress",
    targetCompletionDate: "2024-09-01T00:00:00Z",
    fullName: "Uzo Okoro",
    dateOfEmployment: "23/11/2015",
    department: "Manager",
    level: "AVP",
    manager: "Mosurat Adeniyi",
    promotionsCount: 1
  },
  // Jane Doe's Records
  {
    achievementApproach: "Upgraded network infrastructure",
    actualCompletionDate: "2024-06-28T00:00:00Z",
    createdBy: "defaultUser",
    createdDate: "2024-06-10T07:19:20Z",
    evidenceURL: "http://example.com/evidence7",
    evidenceURLpath: "/evidence7",
    feedback: "Network performance improved",
    goalSummary: "Optimize IT infrastructure",
    id: 7,
    lastModifiedBy: "defaultUser",
    lastModifiedDate: "2024-06-30T15:25:40Z",
    planTermId: 1,
    planTypeId: 3,
    potentialChallenges: "System downtime",
    progressMetrics: "On schedule",
    recordOwner: "Jane Doe",
    requiredResources: "Hardware and software",
    solutionCriteria: "Reduced downtime",
    status: "Completed",
    targetCompletionDate: "2024-07-01T00:00:00Z",
    fullName: "Jane Doe",
    dateOfEmployment: "23/05/2020",
    department: "IT",
    level: "Senior Associate",
    manager: "Segun Arinze",
    promotionsCount: 7
  },
  {
    achievementApproach: "Enhanced system security protocols",
    actualCompletionDate: null,
    createdBy: "defaultUser",
    createdDate: "2024-07-01T11:22:58Z",
    evidenceURL: "http://example.com/evidence8",
    evidenceURLpath: "/evidence8",
    feedback: "Security protocols well received",
    goalSummary: "Increase network security",
    id: 8,
    lastModifiedBy: "defaultUser",
    lastModifiedDate: "2024-07-05T10:34:00Z",
    planTermId: 2,
    planTypeId: 2,
    potentialChallenges: "Compatibility issues",
    progressMetrics: "Progressing smoothly",
    recordOwner: "Jane Doe",
    requiredResources: "Security software",
    solutionCriteria: "Improved security",
    status: "In Progress",
    targetCompletionDate: "2024-09-01T00:00:00Z",
    fullName: "Jane Doe",
    dateOfEmployment: "23/05/2020",
    department: "IT",
    level: "Senior Associate",
    manager: "Segun Arinze",
    promotionsCount: 7
  }
    ]
  }),
  getters: {
    // Get team member's data by name
    getTeamMemberData: (state) => (recordOwner) => {
      return state.teamMemberData.filter(data => data.recordOwner === recordOwner);
    },
    getByStatus: (state) => (status) => {
      return state.teamMemberData.filter(data => data.status === status);
    },
    getByDepartment: (state) => (department) => {
      return state.teamMemberData.filter(data => data.department === department);
    },
    getUpcomingTasks: (state) => (daysAhead) => {
      const today = new Date();
      return state.teamMemberData.filter(data => {
        const targetDate = new Date(data.targetCompletionDate);
        return (
          data.status === "In Progress" &&
          targetDate - today <= daysAhead * 24 * 60 * 60 * 1000
        );
      });
    }
  }
});