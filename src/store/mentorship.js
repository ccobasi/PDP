// import { defineStore } from 'pinia';
// import axios from 'axios';

// export const useMentorshipStore = defineStore('mentorships', {
//   state: () => ({
//     mentorships: [],
//     selectedFile: null,
//     baseUrl: 'https://infracreditpdp.azurewebsites.net/api/MentorshipPlans',
//     endpoints: {
//       getMentorshipPlans: '/getMentorshipPlans',
//       createMentorshipPlans: '/createMentorshipPlans',
//       editMentorshipPlans: '/editMentorshipPlan',
//       deleteMentorshipPlans: '/deleteMentorshipPlans',
//     },
//   }),

//   actions: {
//     async fetchMentorshipPlans() {
//       try {
//         const response = await axios.get(`${this.baseUrl}${this.endpoints.getMentorshipPlans}`);
//         this.mentorships = response.data;
//         console.log(this.mentorships); 
//       } catch (error) {
//         console.error('Error fetching mentorships:', error);
//       }
//     },

//     async addMentorship(financialYearId, month, mentor, goals, actionPlans, targetCompletionDate, progressMetrics, status, feedback, evidenceURL, createdBy, lastModifiedBy ) {
//       try {
//         const response = await axios.post(`${this.baseUrl}${this.endpoints.createMentorshipPlans}`, { financialYearId, month, mentor, goals, actionPlans, targetCompletionDate, progressMetrics, status, feedback, evidenceURL, createdBy, lastModifiedBy });
//         this.mentorships.push(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error adding mentorship:', error);
//       }
//     },

// async updateMentorship(mentorship) {
//       try {
//         const mentorshipIndex = this.mentorships.findIndex(d => d.id === mentorship.id);
//         if (mentorshipIndex !== -1) {
//           console.log('Updating mentorship with data:', mentorship); 
//           const response = await axios.put(`${this.baseUrl}${this.endpoints.editMentorshipPlans}/${mentorship.id}`, mentorship);
//           this.mentorships.splice(mentorshipIndex, 1, response.data);
//           console.log('Updated mentorship:', response.data); 
//         } else {
//           console.error('Mentorship to update not found:', mentorship.id);
//         }
//       } catch (error) {
//         console.error('Error updating mentorship:', error);
//         console.log('Error details:', error.response?.data); 
//       }
//     },

//     async deleteMentorship(mentorshipPlanId) {
//       try {
//         await axios.delete(`${this.baseUrl}${this.endpoints.deleteMentorshipPlans}/${mentorshipPlanId}`);
//         this.mentorships = this.mentorships.filter(d => d.id !== mentorshipPlanId);
//       } catch (error) {
//         console.error('Error deleting mentorship:', error);
//       }
//     },
//   },
// });

import { defineStore } from 'pinia';
import axios from 'axios';

export const useMentorshipStore = defineStore('mentorships', {
  state: () => ({
    mentorships: [],
    selectedFile: null,
    baseUrl: 'https://infracredit.pythonanywhere.com/api/v1/mentorship-plans',
  }),

  actions: {
    async fetchMentorshipPlans() {
      try {
        const response = await axios.get(`${this.baseUrl}`);
        this.mentorships = response.data;
        console.log(this.mentorships); 
      } catch (error) {
        console.error('Error fetching mentorships:', error);
      }
    },

    // async addMentorship(financialYearId, month, mentor, goals, actionPlans, targetCompletionDate, progressMetrics, status, feedback, evidenceURL, createdBy, lastModifiedBy, recordOwner ) {
    //   try {
    //     const response = await axios.post(`${this.baseUrl}`, { 
    //       financialYearId, 
    //       month, 
    //       mentor, 
    //       goals, 
    //       actionPlans, 
    //       targetCompletionDate, 
    //       progressMetrics, 
    //       status, 
    //       feedback, 
    //       evidenceURL, 
    //       createdBy, 
    //       lastModifiedBy, 
    //       recordOwner 
    //     });
    //     this.mentorships.push(response.data);
    //     console.log(response.data);
    //   } catch (error) {
    //     console.error('Error adding mentorship:', error);
    //     console.log('Error response data:', error.response?.data); 
    //   }
    // },
    async addMentorship(financialYearId, month, mentor, goals, actionPlans, targetCompletionDate, progressMetrics, status, feedback, evidenceURL, createdBy, lastModifiedBy, recordOwner) {
      try {
        const payload = {
          financialYearId, 
          month, 
          mentor, 
          goals, 
          actionPlans, 
          targetCompletionDate, 
          progressMetrics, 
          status, 
          feedback, 
          evidenceURL, 
          createdBy, 
          lastModifiedBy, 
          recordOwner 
        };

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
          console.log('Mentorship added:', response.data);
        } else {
          console.error('Server response data is empty');
        }
      } catch (error) {
        if (error.response) {
          console.error('Error adding mentorship:', error.response.data);
        } else {
          console.error('Error adding mentorship:', error);
        }
      }
    },

   async updateMentorship(mentorship) {
  try {
    const url = `${this.baseUrl}/${mentorship.id}`;
    const requestData = {
      financialYearId: mentorship.financialYearId,
      month: mentorship.month,
      mentor: mentorship.mentor,
      goals: mentorship.goals,
      actionPlans: mentorship.actionPlans,
      targetCompletionDate: mentorship.targetCompletionDate,
      progressMetrics: mentorship.progressMetrics,
      status: mentorship.status,
      feedback: mentorship.feedback,
      evidenceURL: mentorship.evidenceURL || '',
      createdBy: mentorship.createdBy,
      lastModifiedBy: mentorship.lastModifiedBy,
    };

    if (mentorship.evidenceURL) {
      requestData.evidenceURL = mentorship.evidenceURL;
    }

    const response = await axios.put(url, requestData);
    //...
  } catch (error) {
    console.error('Error updating mentorship:', error);
    console.log('Error response data:', error.response?.data);
  }
},



    async deleteMentorship(mentorshipId) {
      try {
        await axios.delete(`${this.baseUrl}/${mentorshipId}`);
        this.mentorships = this.mentorships.filter(d => d.id !== mentorshipId);
      } catch (error) {
        console.error('Error deleting mentorship:', error);
      }
    },
  },
});
