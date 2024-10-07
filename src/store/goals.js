import {defineStore} from 'pinia';
import axios from 'axios';

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

