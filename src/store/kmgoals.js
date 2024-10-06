import { defineStore } from 'pinia';
import axios from 'axios';

export const useKMGoalsStore = defineStore('kmgoals', {
  state: () => ({
    kmgoals: [],
    baseUrl: 'https://infracredit.pythonanywhere.com/api/v1/development-plans',
  }),

  actions: {
       async fetchGoals(recordOwner = null) {
      try {
        const response = await axios.get(`${this.baseUrl}`);
        let fetchedGoals = response.data;

        if (recordOwner) {
          fetchedGoals = fetchedGoals.filter(goal => goal.recordOwner === recordOwner);
        }

        this.kmgoals = fetchedGoals;
        console.log(this.kmgoals); 
      } catch (error) {
        console.error('Error fetching kmgoals:', error);
      }
    },

    async addGoal(planTypeId, planTermId, goalSummary, achievementApproach, requiredResources, successCriteria, potentialChallenges, solutionToChallenges, targetCompletionDate, progressMetrics, status, feedback, evidenceURL, createdBy, lastModifiedBy, recordOwner) {
      try {
        // Convert planTypeId and planTermId to integers if they are strings
        planTypeId = parseInt(planTypeId);
        planTermId = parseInt(planTermId);

        const payload = {
          planTypeId: planTypeId === 'Select Type' ? null : planTypeId,
          planTermId: planTermId === 'Select Term' ? null : planTermId,
          goalSummary,
          achievementApproach,
          requiredResources,
          successCriteria,
          potentialChallenges,
          solutionToChallenges,
          targetCompletionDate,
          progressMetrics,
          status,
          feedback,
          evidenceURL,
          createdBy,
          lastModifiedBy,
          recordOwner
        };

        // Log the payload to the console
        console.log('Submitting payload:', payload);

        const formData = new FormData();
        Object.keys(payload).forEach(key => {
          if (payload[key] !== undefined && payload[key] !== null) {
            formData.append(key, payload[key]);
          }
        });

        const response = await axios.post(`${this.baseUrl}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
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
        const goalIndex = this.kmgoals.findIndex(d => d.id === goal.id);
        if (goalIndex !== -1) {
          const response = await axios.put(`${this.baseUrl}/${goal.id}`, goal);
          this.kmgoals.splice(goalIndex, 1, response.data);
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
        this.kmgoals = this.kmgoals.filter(d => d.id !== goalId);
      } catch (error) {
        console.error('Error deleting goal:', error);
      }
    },
  },
});

export const useMGoalsStore = defineStore('mgoals', {
  state: () => ({
    mgoals: JSON.parse(localStorage.getItem('mgoals')) || [],
    evidence: null,
  }),

  getters: {
    getGoals() {
      return this.mgoals;
    },
    getEvidence() {
      return this.evidence;
    },
  },
 
  actions: {
    addGoal(plan, term, goal, achieve, resource, success, potential, solution, date, progress,status,feedback,evidence) {
      try {
        const nextId = this.mgoals.length + 1;

        this.mgoals.push({
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
      return this.mgoals;
    },

    saveGoals() {
      try {
        localStorage.setItem('kmgoals', JSON.stringify(this.mgoals));
      } catch (error) {
        console.error('Error saving goals to localStorage:', error);
      }
    },
    setEvidence(file) {
      this.evidence = file;
    },
    deleteGoal(goalId) {
      try {
        const goalIndex = this.mgoals.findIndex(goal => goal.id === goalId);

        if (goalIndex !== -1) {
          this.mgoals.splice(goalIndex, 1);

          this.saveGoals();

          console.log('Goal deleted:', goalId);
        } else {
          console.error('Goal not found:', goalId);
        }
      } catch (error) {
        console.error('Error deleting goal:', error);
      }
    },
  },
});

export const useHGoalsStore = defineStore('hgoals', {
  state: () => ({
    hgoals: JSON.parse(localStorage.getItem('hgoals')) || [],
    evidence: null,
  }),

  getters: {
    getGoals() {
      return this.hgoals;
    },
    getEvidence() {
      return this.evidence;
    },
  },
 
  actions: {
    addGoal(plan, term, goal, achieve, resource, success, potential, solution, date, progress,status,feedback,evidence) {
      try {
        const nextId = this.hgoals.length + 1;

        this.hgoals.push({
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
      return this.hgoals;
    },

    saveGoals() {
      try {
        localStorage.setItem('hgoals', JSON.stringify(this.hgoals));
      } catch (error) {
        console.error('Error saving goals to localStorage:', error);
      }
    },
    setEvidence(file) {
      this.evidence = file;
    },
    deleteGoal(goalId) {
      try {
        const goalIndex = this.hgoals.findIndex(goal => goal.id === goalId);

        if (goalIndex !== -1) {
          this.hgoals.splice(goalIndex, 1);

          this.saveGoals();

          console.log('Goal deleted:', goalId);
        } else {
          console.error('Goal not found:', goalId);
        }
      } catch (error) {
        console.error('Error deleting goal:', error);
      }
    },
  },
});

export const useIGoalsStore = defineStore('igoals', {
  state: () => ({
    igoals: JSON.parse(localStorage.getItem('igoals')) || [],
    evidence: null,
  }),

  getters: {
    getGoals() {
      return this.igoals;
    },
    getEvidence() {
      return this.evidence;
    },
  },
 
  actions: {
    addGoal(plan, term, goal, achieve, resource, success, potential, solution, date, progress,status,feedback,evidence) {
      try {
        const nextId = this.igoals.length + 1;

        this.igoals.push({
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
      return this.igoals;
    },

    saveGoals() {
      try {
        localStorage.setItem('igoals', JSON.stringify(this.igoals));
      } catch (error) {
        console.error('Error saving goals to localStorage:', error);
      }
    },
    setEvidence(file) {
      this.evidence = file;
    },
    deleteGoal(goalId) {
      try {
        const goalIndex = this.igoals.findIndex(goal => goal.id === goalId);

        if (goalIndex !== -1) {
          this.hgoals.splice(goalIndex, 1);

          this.saveGoals();

          console.log('Goal deleted:', goalId);
        } else {
          console.error('Goal not found:', goalId);
        }
      } catch (error) {
        console.error('Error deleting goal:', error);
      }
    },
  },
});
