// import { defineStore } from 'pinia';
// import axios from 'axios';

// export const useSkillsStore = defineStore('skills', {
//   state: () => ({
//     skills: [],
//     selectedFile: null,
//     baseUrl: 'https://infracredit.pythonanywhere.com/api/v1/skill-assessments',
//   }),

//   actions: {
//     async fetchSkills() {
//       console.log('fetchSkills called');
//       try {
//         const response = await axios.get(`${this.baseUrl}`);
//         this.skills = response.data;
//         console.log('Fetched skills:', this.skills);
//       } catch (error) {
//         console.error('Error fetching skills:', error.response?.data || error.message);
//       }
//     },

//     async addSkill({
//       skillDescription,
//       currentStageId,
//       skillGapDetails,
//       desiredStageId,
//       actionPlan,
//       comment,
//       createdBy,
//       lastModifiedBy,
//       recordOwner
//     }) {
//       try {
//         const payload = {
//           skillDescription,
//           currentStageId,
//           skillGapDetails,
//           desiredStageId,
//           actionPlan,
//           comment,
//           createdBy,
//           lastModifiedBy,
//           recordOwner
//         };

//         console.log('Submitting payload:', payload);

//         const formData = new FormData();
//         Object.keys(payload).forEach(key => {
//           if (payload[key] !== undefined && payload[key] !== null) {
//             formData.append(key, payload[key]);
//           }
//         });

//         const response = await axios.post(`${this.baseUrl}`, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           }
//         });

//         console.log('Server response:', response);

//         if (response.data) {

//           await this.fetchSkills();
//           console.log('Skill added and skills refetched.');
//         } else {
//           console.error('Server response data is empty');
//         }
//       } catch (error) {
//         console.error('Error adding skill:', error.response?.data || error.message);
//       }
//     },

//     async updateSkill(skill) {
//       try {
//         const url = `${this.baseUrl}/${skill.id}`;

//         const formData = new FormData();
//         Object.keys(skill).forEach(key => {
//           if (skill[key] !== undefined && skill[key] !== null) {
//             formData.append(key, skill[key]);
//           }
//         });

//         const response = await axios.put(url, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });

//         await this.fetchSkills();
//         console.log('Skill updated and skills refetched.');
//       } catch (error) {
//         console.error('Error updating skill:', error.response?.data || error);
//       }
//     },

//     async deleteSkill(skillId) {
//       console.log('deleteSkill called with id:', skillId);
//       try {
//         await axios.delete(`${this.baseUrl}/${skillId}`);
        
//         await this.fetchSkills();
//         console.log('Skill deleted and skills refetched.');
//       } catch (error) {
//         console.error('Error deleting skill:', error.response?.data || error.message);
//       }
//     },
//   },
// });

import { defineStore } from 'pinia';
import { skillsService } from '../services/skillsService';

export const useSkillsStore = defineStore('skills', {
  state: () => ({
    skills: [],
  }),
  actions: {
    async fetchSkills() {
      // this.skills = await skillsService.fetchSkills();
      const data = await skillsService.fetchSkills();
      this.skills = data; 
    },
    async addSkill(newSkill) {
      const addedSkill = await skillsService.addSkill(newSkill);
      this.skills.push(addedSkill);
    },
    async updateSkill(updatedSkill) {
      console.log(updatedSkill);
      
      const updated = await skillsService.updateSkill(updatedSkill);
      const index = this.skills.findIndex(skill => skill.id === updated.id);
      if (index !== -1) {
        this.skills[index] = updated;
      }
      console.log(updatedSkill);
      
    },
    async deleteSkill(skillId) {
      await skillsService.deleteSkill(skillId);
      this.skills = this.skills.filter(skill => skill.id !== skillId);
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
    addKmSkill(skillDescription, currentStageId, skillGapDetails, desiredStageId, initiatives, status, feedback, evidenceURL) {
      try {
         const nextId = this.kmSkills.length + 1;

        this.kmSkills.push({
          id: nextId,
          skillDescription: skillDescription,
          currentStageId: currentStageId,
          skillGapDetails: skillGapDetails,
          desiredStageId: desiredStageId,
          initiatives: initiatives,
          status: status,
          feedback: feedback,
          evidenceURL: evidenceURL,
        });

        this.saveKmSkills();
      } catch (error) {
        console.error('Error adding skill:', error);
      }
    },

    fetchKmSkills() {
      return this.kmSkills; 
    },

    saveKmSkills() {
      try {
        localStorage.setItem('kmSkills', JSON.stringify(this.kmSkills)); 

      } catch (error) {
        console.error('Error saving kmSkills to localStorage:', error); 
      }
    },
    deleteSkill(skillId) {
      try {
        const skillIndex = this.kmSkills.findIndex(skill => skill.id === skillId);

        if (skillIndex !== -1) {
          this.kmSkills.splice(skillIndex, 1);

          this.saveKmSkills();

          console.log('Skill deleted:', skillId);
        } else {
          console.error('Skill not found:', skillId);
        }
      } catch (error) {
        console.error('Error deleting skill:', error);
      }
    },
  },
});

export const useMSkillsStore = defineStore('mSkills', {
  state: () => ({
    mSkills: JSON.parse(localStorage.getItem('mSkills')) || [],
  }),

  getters: {
    getMSkills() {
      return this.mSkills;
    },
  },
 
  actions: {
    addMSkill(skillDescription, currentStageId, skillGapDetails, desiredStageId, initiatives, status, feedback, evidenceURL) {
      try {
         const nextId = this.mSkills.length + 1;

        this.mSkills.push({
          id: nextId,
          skillDescription: skillDescription,
          currentStageId: currentStageId,
          skillGapDetails: skillGapDetails,
          desiredStageId: desiredStageId,
          initiatives: initiatives,
          status: status,
          feedback: feedback,
          evidenceURL: evidenceURL,
        });

        this.saveMSkills();
      } catch (error) {
        console.error('Error adding skill:', error);
      }
    },

    fetchMSkills() {
      return this.mSkills; 
    },

    saveMSkills() {
      try {
        localStorage.setItem('mSkills', JSON.stringify(this.mSkills)); 

      } catch (error) {
        console.error('Error saving mSkills to localStorage:', error); 
      }
    },
    deleteSkill(skillId) {
      try {
        const skillIndex = this.kmSkills.findIndex(skill => skill.id === skillId);

        if (skillIndex !== -1) {
          this.mSkills.splice(skillIndex, 1);

          this.saveMSkills();

          console.log('Skill deleted:', skillId);
        } else {
          console.error('Skill not found:', skillId);
        }
      } catch (error) {
        console.error('Error deleting skill:', error);
      }
    },
  },
});

export const useHODSkillsStore = defineStore('hodSkills', {
  state: () => ({
    hodSkills: JSON.parse(localStorage.getItem('hodSkills')) || [],
  }),

  getters: {
    getHodSkills() {
      return this.hodSkills;
    },
  },
 
  actions: {
    addHodSkill(skillDescription, currentStageId, skillGapDetails, desiredStageId, initiatives, status, feedback, evidenceURL) {
      try {
         const nextId = this.hodSkills.length + 1;

        this.hodSkills.push({
          id: nextId,
          skillDescription: skillDescription,
          currentStageId: currentStageId,
          skillGapDetails: skillGapDetails,
          desiredStageId: desiredStageId,
          initiatives: initiatives,
          status: status,
          feedback: feedback,
          evidenceURL: evidenceURL,
        });

        this.saveHodSkills();
      } catch (error) {
        console.error('Error adding skill:', error);
      }
    },

    fetchHodSkills() {
      return this.hodSkills; 
    },

    saveHodSkills() {
      try {
        localStorage.setItem('hodSkills', JSON.stringify(this.hodSkills)); 

      } catch (error) {
        console.error('Error saving hodSkills to localStorage:', error); 
      }
    },
    deleteSkill(skillId) {
      try {
        const skillIndex = this.hodSkills.findIndex(skill => skill.id === skillId);

        if (skillIndex !== -1) {
          this.hodSkills.splice(skillIndex, 1);

          this.saveHodSkills();

          console.log('Skill deleted:', skillId);
        } else {
          console.error('Skill not found:', skillId);
        }
      } catch (error) {
        console.error('Error deleting skill:', error);
      }
    },
  },
});

export const useITSkillsStore = defineStore('itSkills', {
  state: () => ({
    itSkills: JSON.parse(localStorage.getItem('itSkills')) || [],
  }),

  getters: {
    getITSkills() {
      return this.itSkills;
    },
  },
 
  actions: {
    addITSkill(skillDescription, currentStageId, skillGapDetails, desiredStageId, initiatives, status, feedback, evidenceURL) {
      try {
         const nextId = this.itSkills.length + 1;

        this.itSkills.push({
          id: nextId,
          skillDescription: skillDescription,
          currentStageId: currentStageId,
          skillGapDetails: skillGapDetails,
          desiredStageId: desiredStageId,
          initiatives: initiatives,
          status: status,
          feedback: feedback,
          evidenceURL: evidenceURL,
        });

        this.saveITSkills();
      } catch (error) {
        console.error('Error adding skill:', error);
      }
    },

    fetchITSkills() {
      return this.itSkills; 
    },

    saveITSkills() {
      try {
        localStorage.setItem('itSkills', JSON.stringify(this.itSkills)); 

      } catch (error) {
        console.error('Error saving itSkills to localStorage:', error); 
      }
    },
    deleteSkill(skillId) {
      try {
        const skillIndex = this.itSkills.findIndex(skill => skill.id === skillId);

        if (skillIndex !== -1) {
          this.itSkills.splice(skillIndex, 1);

          this.saveITSkills();

          console.log('Skill deleted:', skillId);
        } else {
          console.error('Skill not found:', skillId);
        }
      } catch (error) {
        console.error('Error deleting skill:', error);
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