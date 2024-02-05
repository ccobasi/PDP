import {defineStore} from 'pinia';

export const useSkillsStore = defineStore('skills', {
  state: () => ({
    skills: JSON.parse(localStorage.getItem('skills')) || [],
    evidence: null,
  }),

  getters: {
    getSkills() {
      return this.skills;
    },
    getEvidence() {
      return this.evidence;
    },
  },
 
  actions: {
    addSkill(skill, currentState, gap, desiredState, initiative, status, feedback, evidence) {
      try {
        const nextId = this.skills.length + 1;

        this.skills.push({
          id: nextId,
          skill: skill,
          currentState: currentState,
          gap: gap,
          desiredState: desiredState,
          initiative: initiative,
          status: status,
          feedback: feedback,
          evidence: evidence,
        });

        this.saveSkills();
      } catch (error) {
        console.error('Error adding skill:', error);
      }
    },

    fetchSkills() {
      return this.skills;
    },

    saveSkills() {
      try {
        localStorage.setItem('skills', JSON.stringify(this.skills));
      } catch (error) {
        console.error('Error saving skills to localStorage:', error);
      }
    },
    setEvidence(file) {
      this.evidence = file;
    },
  },
});
export const useKMSkillsStore = defineStore('kmSkills', {
  state: () => ({
    kmSkills: JSON.parse(localStorage.getItem('kmSkills')) || [],
  }),

  getters: {
    getKmSkills() {
      return this.kmSkills;
    },
  },
 
  actions: {
    addKmSkill(skill, currentState, gap, desiredState, initiative, status, feedback, evidence) {
      try {
        this.kmSkills.push({
          id: Date.now(),
          skill: skill,
          currentState: currentState,
          gap: gap,
          desiredState: desiredState,
          initiative: initiative,
          status: status,
          feedback: feedback,
          evidence: evidence,
        });

        this.saveKmSkills();
      } catch (error) {
        console.error('Error adding skill:', error);
      }
    },

    fetchKmSkills() {
      return this.kmSkills; // Corrected from this.skills to this.kmSkills
    },

    saveKmSkills() {
      try {
        localStorage.setItem('kmSkills', JSON.stringify(this.kmSkills)); // Corrected from this.skills to this.kmSkills
      } catch (error) {
        console.error('Error saving kmSkills to localStorage:', error); // Corrected from 'skills' to 'kmSkills'
      }
    },
  },
});