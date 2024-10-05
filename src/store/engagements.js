// import { defineStore } from 'pinia';
// import axios from 'axios';

// export const useEngagementStore = defineStore('engagements', {
//   state: () => ({
//     engagements: [],
//     selectedFile: null,
//     baseUrl: 'https://infracreditpdp.azurewebsites.net/api/SpeakingEngagements',
//     endpoints: {
//       getSpeakingEngagements: '/getSpeakingEngagements',
//       createSpeakingEngagements: '/createSpeakingEngagements',
//       editSpeakingEngagements: '/editSpeakingEngagement',
//     },
//   }),

//   actions: {
//     async fetchEngagements() {
//       try {
//         const response = await axios.get(`${this.baseUrl}${this.endpoints.getSpeakingEngagements}`);
//         this.engagements = response.data;
//         console.log(this.engagements); 
//       } catch (error) {
//         console.error('Error fetching engagements:', error);
//       }
//     },

//     async addEngagement(eventDescription, eventDate, country, eventCountry, representative, contactPerson, contactPhone, contactEmail, topicTheme, sponsporship, status, createdBy, lastModifiedBy ) {
//       try {
//         const response = await axios.post(`${this.baseUrl}${this.endpoints.createEngagements}`, { eventDescription, eventDate, country, eventCountry, representative, contactPerson, contactPhone, contactEmail, topicTheme, sponsporship, status, createdBy, lastModifiedBy });
//         this.engagements.push(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error adding engagement:', error);
//       }
//     },

//     async updateEngagement(engagement) {
//       try {
//         const engagementIndex = this.engagements.findIndex(d => d.id === engagement.id);
//         if (engagementIndex !== -1) {
//           const response = await axios.put(`${this.baseUrl}${this.endpoints.editEngagements}/${engagement.id}`, engagement);
//           this.engagements.splice(engagementIndex, 1, response.data);
//         } else {
//           console.error('Engagement to update not found:', engagement.id);
//         }
//       } catch (error) {
//         console.error('Error updating engagement:', error);
//       }
//     },

//     async deleteEngagement(id) {
//       try {
//         await axios.delete(`${this.baseUrl}${this.endpoints.editEngagements}/${id}`);
//         this.engagements = this.engagements.filter(d => d.id !== id);
//       } catch (error) {
//         console.error('Error deleting user:', error);
//       }
//     },
//   },
// });

// import { defineStore } from 'pinia';
// import axios from 'axios';

// export const useEngagementStore = defineStore('engagements', {
//   state: () => ({
//     engagements: [],
//     selectedFile: null,
//     baseUrl: 'https://infracredit.pythonanywhere.com/api/v1/speaking-engagements',
//   }),

//   actions: {
//     async fetchEngagements() {
//       try {
//         const response = await axios.get(`${this.baseUrl}`);
//         this.engagements = response.data;
//         console.log(this.engagements); 
//       } catch (error) {
//         console.error('Error fetching engagements:', error);
//       }
//     },

//     async addEngagement(eventDescription, eventDate, country, eventCountry, representative, contactPerson, contactPhone, contactEmail, topicTheme, sponsporship, status, createdBy, lastModifiedBy ) {
//       try {
//         const response = await axios.post(`${this.baseUrl}`, { eventDescription, eventDate, country, eventCountry, representative, contactPerson, contactPhone, contactEmail, topicTheme, sponsporship, status, createdBy, lastModifiedBy });
//         this.engagements.push(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error adding engagement:', error);
//       }
//     },

//     async updateEngagement(engagement) {
//       try {
//         const engagementIndex = this.engagements.findIndex(d => d.id === engagement.id);
//         if (engagementIndex !== -1) {
//           const response = await axios.put(`${this.baseUrl}${engagement.id}`, engagement);
//           this.engagements.splice(engagementIndex, 1, response.data);
//         } else {
//           console.error('Engagement to update not found:', engagement.id);
//         }
//       } catch (error) {
//         console.error('Error updating engagement:', error);
//       }
//     },

//     async deleteEngagement(id) {
//       try {
//         await axios.delete(`${this.baseUrl}/${id}`);
//         this.engagements = this.engagements.filter(d => d.id !== id);
//       } catch (error) {
//         console.error('Error deleting user:', error);
//       }
//     },
//   },
// });

import { defineStore } from 'pinia';
import axios from 'axios';

export const useEngagementStore = defineStore('engagements', {
  state: () => ({
    engagements: [],
    selectedFile: null,
    baseUrl: 'https://infracredit.pythonanywhere.com/api/v1/speaking-engagements',
  }),

  actions: {
    async fetchEngagements() {
      try {
        const response = await axios.get(`${this.baseUrl}`);
        this.engagements = response.data;  
        console.log(this.engagements); 
      } catch (error) {
        console.error('Error fetching engagements:', error);
      }
    },

       async addEngagement(eventDescription, eventDate, country, eventCountry, representative, contactPerson, contactPhone, contactEmail, topicTheme, sponsporship, status, createdBy, lastModifiedBy, recordOwner ) {
      try {
        const response = await axios.post(`${this.baseUrl}`, { eventDescription, eventDate, country, eventCountry, representative, contactPerson, contactPhone, contactEmail, topicTheme, sponsporship, status, createdBy, lastModifiedBy, recordOwner });
        this.engagements.push(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error adding engagement:', error);
      }
    },

    async updateEngagement(engagement) {
      try {
        const engagementIndex = this.engagements.findIndex(d => d.id === engagement.id);
        if (engagementIndex !== -1) {
          const response = await axios.put(`${this.baseUrl}/${engagement.id}`, engagement);
          this.engagements.splice(engagementIndex, 1, response.data);
        } else {
          console.error('Engagement to update not found:', engagement.id);
        }
      } catch (error) {
        console.error('Error updating engagement:', error);
        console.log('Request data:', engagement);
      }
    },

    async deleteEngagement(engagementId) {
      try {
        await axios.delete(`${this.baseUrl}/${engagementId}`);
        this.engagements = this.engagements.filter(d => d.id !== engagementId);
      } catch (error) {
        console.error('Error deleting engagement:', error);
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

