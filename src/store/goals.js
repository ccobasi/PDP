import {defineStore} from 'pinia';


// export const useGoalsStore = defineStore('goals', {
//   state: () => ({
//     goals: JSON.parse(localStorage.getItem('goals')) || [],
//   }),

//   getters: {
//     getGoals() {
//       return this.goals;
//     },
//   },
 
//   actions: {
//     addGoal(plan,goal,achieve,resource,success,potential,solution,date,) {
//       this.getGoals.push({
//         id: Date.now(),
//         plan: plan,
//         goal: goal,
//         achieve: achieve,
//         resource: resource,
//         success: success,
//         potential: potential,
//         solution: solution,
//         date: date,
//       });

//       this.saveGoals();
//     },
//     fetchGoals() {
//       return this.getGoals();
//     },


//     saveGoals() {
//       localStorage.setItem('goals', JSON.stringify(this.goals));
//     },
//   },
// });
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
    addGoal(plan, goal, achieve, resource, success, potential, solution, date) {
      try {
        this.getGoals.push({
          id: Date.now(),
          plan: plan,
          goal: goal,
          achieve: achieve,
          resource: resource,
          success: success,
          potential: potential,
          solution: solution,
          date: date,
        });

        this.saveGoals();
      } catch (error) {
        console.error('Error adding goal:', error);
      }
    },

    fetchGoals() {
      return this.getGoals();
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
