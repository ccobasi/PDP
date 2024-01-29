import {defineStore} from 'pinia';

export const useGoalsStore = defineStore('goals', {
  state: () => ({
    goals: JSON.parse(localStorage.getItem('goals')) || [],
  }),

  getters: {
    getGoals() {
      return this.goals;
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
  },
});
