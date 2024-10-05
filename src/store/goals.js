import { defineStore } from 'pinia';
import axios from 'axios';

// export const useGoalsStore = defineStore('goals', {
//   state: () => ({
//     goals: [],
//     baseUrl: 'https://infracreditpdp.azurewebsites.net/api/DevelopmentPlans',
//     endpoints: {
//       getDevelopmentPlans: '/getDevelopmentPlans',
//       createDevelopmentPlans: '/createDevelopmentPlans',
//       editDevelopmentPlans: '/editDevelopmentPlans',
//     },
//   }),


export const useGoalsStore = defineStore('goals', {
  state: () => ({
    goals: [],
    baseUrl: 'https://infracredit.pythonanywhere.com/api/v1/development-plans',
  }),

  actions: {
    async fetchGoals() {
      try {
        const response = await axios.get(`${this.baseUrl}`);
        this.goals = response.data;
        console.log(this.goals); 
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    },
    
  async addGoal({
  planTypeId,
  planTermId,
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
    // Convert planTypeId and planTermId to integers if they are strings
    planTypeId = parseInt(planTypeId, 10);
    planTermId = parseInt(planTermId, 10);

    const payload = {
      planTypeId: isNaN(planTypeId) ? null : planTypeId,
      planTermId: isNaN(planTermId) ? null : planTermId,
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

    // Log the payload to the console
    console.log('Submitting payload:', payload);

    // Construct FormData
    const formData = new FormData();
    for (const key in payload) {
      if (payload[key] !== undefined && payload[key] !== null) {
        formData.append(key, payload[key]);
      }
    }

    // Send POST request
    const response = await axios.post(`${this.baseUrl}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Server response:', response);

    if (response.data) {
      this.goals.push(response.data);
      console.log('Goal added:', response.data);
    } else {
      console.error('Server response data is empty');
    }
  } catch (error) {
    if (error.response) {
      console.error('Error adding goal:', error.response.data);
    } else {
      console.error('Error adding goal:', error);
    }
  }
},


    async updateGoal(goal) {
      try {
        const goalIndex = this.goals.findIndex(d => d.id === goal.id);
        if (goalIndex !== -1) {
          const response = await axios.put(`${this.baseUrl}/${goal.id}`, goal);
          this.goals.splice(goalIndex, 1, response.data);
        } else {
          console.error('Goal to update not found:', goal.id);
        }
      } catch (error) {
        console.error('Error updating goal:', error);
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

export const useKMGoalsStore = defineStore('goals', {
  state: () => ({
    goals: JSON.parse(localStorage.getItem('goals')) || [],
    evidenceURL: null,
  }),

  getters: {
    getGoals() {
      return this.goals;
    },
    getEvidence() {
      return this.evidenceURL;
    },
  },
 
  actions: {
    addGoal(planTypeId, planTermId, goalSummary, achievementApproach, requiredResources, successCriteria, potentialChallenges, solutionToChallenges, targetCompletionDate, progressMetrics,status,feedback,evidenceURL) {
      try {
        const nextId = this.goals.length + 1;

        this.goals.push({
          id: nextId,
          planTypeId: planTypeId,
          planTermId: planTermId,
          goal: goalSummary,
          achievementApproach: achievementApproach,
          requiredResources: requiredResources,
          successCriteria: successCriteria,
          potentialChallenges: potentialChallenges,
          solutionToChallenges: solutionToChallenges,
          targetCompletionDate: targetCompletionDate,
          progressMetrics: progressMetrics,
          status: status,
          feedback: feedback,
          evidenceURL: evidenceURL,
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
      this.evidenceURL = file;
    },
  },
});

export const useHODGoalsStore = defineStore('hodGoals', {
  state: () => ({
    hodGoals: JSON.parse(localStorage.getItem('hodGoals')) || [],
    evidenceURL: null,
  }),

  getters: {
    getGoals() {
      return this.hodGoals;
    },
    getEvidence() {
      return this.evidenceURL;
    },
  },
 
  actions: {
    addGoal(planTypeId, planTermId, goalSummary, achievementApproach, requiredResources, successCriteria, potentialChallenges, solutionToChallenges, targetCompletionDate, progressMetrics,status,feedback,evidenceURL) {
      try {
        const nextId = this.hodGoals.length + 1;
        if (Array.isArray(this.hodGoals)) {
          this.hodGoals.push({
          id: nextId,
          planTypeId: planTypeId,
          planTermId: planTermId,
          goal: goalSummary,
          achievementApproach: achievementApproach,
          requiredResources: requiredResources,
          successCriteria: successCriteria,
          potentialChallenges: potentialChallenges,
          solutionToChallenges: solutionToChallenges,
          targetCompletionDate: targetCompletionDate,
          progressMetrics: progressMetrics,
          status: status,
          feedback: feedback,
          evidenceURL: evidenceURL,
        });
      } else {
        console.error('hodGoals is not an array, cannot add goal!');
      }

        

        this.saveGoals();
      } catch (error) {
        console.error('Error adding goal:', error);
      }
    },

    fetchGoals() {
      return this.hodGoals;
    },

    saveGoals() {
      try {
        localStorage.setItem('hodGoals', JSON.stringify(this.hodGoals));
      } catch (error) {
        console.error('Error saving goals to localStorage:', error);
      }
    },
    setEvidence(file) {
      this.evidenceURL = file;
    },
  },
});

export const useITGoalsStore = defineStore('itGoals', {
  state: () => ({
    itGoals: JSON.parse(localStorage.getItem('itGoals')) || [],
    evidenceURL: null,
  }),

  getters: {
    getGoals() {
      return this.itGoals;
    },
    getEvidence() {
      return this.evidenceURL;
    },
  },
 
  actions: {
    addGoal(planTypeId, planTermId, goalSummary, achievementApproach, requiredResources, successCriteria, potentialChallenges, solutionToChallenges, targetCompletionDate, progressMetrics,status,feedback,evidenceURL) {
      try {
        const nextId = this.itGoals.length + 1;
        if (Array.isArray(this.itGoals)) {
          this.itGoals.push({
          id: nextId,
          planTypeId: planTypeId,
          planTermId: planTermId,
          goal: goalSummary,
          achievementApproach: achievementApproach,
          requiredResources: requiredResources,
          successCriteria: successCriteria,
          potentialChallenges: potentialChallenges,
          solutionToChallenges: solutionToChallenges,
          targetCompletionDate: targetCompletionDate,
          progressMetrics: progressMetrics,
          status: status,
          feedback: feedback,
          evidenceURL: evidenceURL,
        });
      } else {
        console.error('itGoals is not an array, cannot add goal!');
      }

        

        this.saveGoals();
      } catch (error) {
        console.error('Error adding goal:', error);
      }
    },

    fetchGoals() {
      return this.itGoals;
    },

    saveGoals() {
      try {
        localStorage.setItem('itGoals', JSON.stringify(this.itGoals));
      } catch (error) {
        console.error('Error saving goals to localStorage:', error);
      }
    },
    setEvidence(file) {
      this.evidenceURL = file;
    },
  },
});