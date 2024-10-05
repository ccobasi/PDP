// import { defineStore } from 'pinia';
// import axios from 'axios';

// export const useSkillsStore = defineStore('skills', {
//   state: () => ({
//     skills: [],
//     selectedFile: null,
//     baseUrl: 'https://infracreditpdp.azurewebsites.net/api/SkillAssessments',
//     endpoints: {
//       getSkillAssessments: '/getSkillAssessments',
//       createSkillAssessments: '/createSkillAssessments',
//       editSkillAssessments: '/editSkillAssessments',
//     },
//   }),

//   actions: {
//     async fetchSkills() {
//       try {
//         const response = await axios.get(`${this.baseUrl}${this.endpoints.getSkillAssessments}`);
//         this.skills = response.data;
//         console.log(this.skills); 
//       } catch (error) {
//         console.error('Error fetching skills:', error);
//       }
//     },

//     async addSkill(skillDescription, currentStageId, desiredStageId, skillGapDetails, initiatives, requiredResources, successCriteria, potentialChallenges, solutionToChallenges, targetCompletionDate, status, feedback, evidenceURL, createdBy, lastModifiedBy  ) {
//       try {
//         const response = await axios.post(`${this.baseUrl}${this.endpoints.createSkillAssessments}`, { skillDescription, currentStageId, desiredStageId, skillGapDetails, initiatives, requiredResources, successCriteria, potentialChallenges, solutionToChallenges, targetCompletionDate, status, feedback, evidenceURL, createdBy, lastModifiedBy  });
//         this.skills.push(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error adding user:', error);
//       }
//     },

//     async updateSkill(skill) {
//       try {
//         const skillIndex = this.skills.findIndex(d => d.id === skill.id);
//         if (skillIndex !== -1) {
//           const response = await axios.put(`${this.baseUrl}${this.endpoints.editSkillAssessments}/${skill.id}`, skill);
//           this.skills.splice(skillIndex, 1, response.data);
//         } else {
//           console.error('Skill to update not found:', skill.id);
//         }
//       } catch (error) {
//         console.error('Error updating skill:', error);
//       }
//     },

//     async deleteSkill(skillId) {
//       try {
//         await axios.delete(`${this.baseUrl}${this.endpoints.editSkillAssessments}/${skillId}`);
//         this.skills = this.skills.filter(d => d.id !== skillId);
//       } catch (error) {
//         console.error('Error deleting skill:', error);
//       }
//     },
//   },
// });

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
//       try {
//         const response = await axios.get(`${this.baseUrl}`);
//         this.skills = response.data;
//         console.log(this.skills); 
//       } catch (error) {
//         console.error('Error fetching skills:', error);
//       }
//     },

//     async addSkill(
//       skillDescription,
//       currentStageId,
//       skillGapDetails,
//       desiredStageId,
//       initiatives,
//       status,
//       feedback,
//       evidenceURL,
//       requiredResources,
//       successCriteria,
//       potentialChallenges,
//       solutionToChallenges,
//       targetCompletionDate,
//       createdBy,
//       lastModifiedBy,
//       recordOwner
//     ) {
//       try {
//         const response = await axios.post(`${this.baseUrl}`, {
//           skillDescription,
//           currentStageId,
//           skillGapDetails,
//           desiredStageId,
//           initiatives,
//           status,
//           feedback,
//           evidenceURL,
//           requiredResources,
//           successCriteria,
//           potentialChallenges,
//           solutionToChallenges,
//           targetCompletionDate,
//           createdBy,
//           lastModifiedBy,
//           recordOwner
//         });
//         console.log('Skill submitted:', response.data);
//         this.skills.push(response.data);
//         console.log('Skill added successfully:', response.data);
//       } catch (error) {
//         if (error.response) {
//           console.error('Error adding skill:', error.response?.data || error.message);
//         } else {
//           console.error('Error adding skill:', error.message);
//         }
//       }
//     },
   

//     async updateSkill(skill) {
//       try {
//         const skillIndex = this.skills.findIndex(d => d.id === skill.id);
//         if (skillIndex !== -1) {
//           const response = await axios.put(`${this.baseUrl}/${skill.id}`, skill);
//           this.skills.splice(skillIndex, 1, response.data);
//         } else {
//           console.error('Skill to update not found:', skill.id);
//         }
//       } catch (error) {
//         console.error('Error updating skill:', error);
//         console.log('Error details:', error.response?.data); 
//       }
//     },

//     async deleteSkill(skillId) {
//       try {
//         await axios.delete(`${this.baseUrl}/${skillId}`);
//         this.skills = this.skills.filter(d => d.id !== skillId);
//       } catch (error) {
//         console.error('Error deleting skill:', error);
//       }
//     },
//   },
// });

import { defineStore } from 'pinia';
import axios from 'axios';

export const useSkillsStore = defineStore('skills', {
  state: () => ({
    skills: [],
    selectedFile: null,
    baseUrl: 'https://infracredit.pythonanywhere.com/api/v1/skill-assessments',
  }),

  actions: {
    async fetchSkills() {
      console.log('fetchSkills called');
      try {
        const response = await axios.get(`${this.baseUrl}`);
        this.skills = response.data;
        console.log('Fetched skills:', this.skills);
      } catch (error) {
        console.error('Error fetching skills:', error.response?.data || error.message);
      }
    },
    async addSkill(skillDescription,
      currentStageId,
      skillGapDetails,
      desiredStageId,
      actionPlan,
      comment,
      createdBy,
      lastModifiedBy,
      recordOwner) {
      try {

        const payload = {
          skillDescription,
      currentStageId,
      skillGapDetails,
      desiredStageId,
      actionPlan,
      comment,
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
          this.skills.push(response.data);
          console.log('Skill added:', response.data);
        } else {
          console.error('Server response data is empty');
        }
      } catch (error) {
        if (error.response) {
          console.error('Error adding skill:', error.response.data);
        } else {
          console.error('Error adding skill:', error);
        }
      }
    },

    
    async updateSkill(skill) {
      console.log('updateSkill called with', skill);
      try {
        const skillIndex = this.skills.findIndex(d => d.id === skill.id);
        if (skillIndex !== -1) {
          const response = await axios.put(`${this.baseUrl}/${skill.id}`, skill);
          this.skills.splice(skillIndex, 1, response.data);
          console.log('Skill updated successfully:', response.data);
        } else {
          console.error('Skill to update not found:', skill.id);
        }
      } catch (error) {
        console.error('Error updating skill:', error.response?.data || error.message);
      }
    },

    async deleteSkill(skillId) {
      console.log('deleteSkill called with id:', skillId);
      try {
        await axios.delete(`${this.baseUrl}/${skillId}`);
        this.skills = this.skills.filter(d => d.id !== skillId);
        console.log('Skill deleted successfully:', skillId);
      } catch (error) {
        console.error('Error deleting skill:', error.response?.data || error.message);
      }
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