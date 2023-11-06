import {defineStore} from 'pinia';

export const useSkillsStore = defineStore('skills', {
  state: () => ({
    skills: JSON.parse(localStorage.getItem('skills')) || [],
  }),

  getters: {
    getSkills() {
      return this.skills;
    },
  },
 
  actions: {
    addSkill(skill, currentState, gap, desiredState, initiative) {
      try {
        this.getSkills.push({
          id: Date.now(),
          skill: skill,
          currentState: currentState,
          gap: gap,
          desiredState: desiredState,
          initiative: initiative,
          
        });

        this.saveSkills();
      } catch (error) {
        console.error('Error adding skill:', error);
      }
    },

    fetchSkills() {
      return this.getSkills();
    },

    saveSkills() {
      try {
        localStorage.setItem('skills', JSON.stringify(this.skills));
      } catch (error) {
        console.error('Error saving skills to localStorage:', error);
      }
    },
  },
});
