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
    baseUrl: 'https://infracredit2.pythonanywhere.com/api/v1/mentorship-plans/',
  }), 
  actions: {
    async fetchMentorshipPlans() {
      try {
        const response = await axios.get(`${this.baseUrl}`);
        this.mentorships = response.data.data;
        console.log('Fetched mentorships:', this.mentorships);
      } catch (error) {
        console.error('Error fetching mentorships:', error);
      }
    },
    
  
    async addMentorship({
      financialYear, month, mentor, goals, actionPlans,
      targetCompletionDate, progressMetrics, actualCompletionDate, status, feedback,
      evidence, createdBy, recordOwner
    }) {
      try {
        console.log('Mentorship Object:', {
          financialYear, month, mentor, goals, actionPlans,
          targetCompletionDate, progressMetrics, actualCompletionDate, status, feedback,
          evidence, createdBy,  recordOwner
        });

        const requiredFields = [
          financialYear, month, mentor, goals, targetCompletionDate
        ];

        const missingFields = requiredFields.filter(field => !field);
        if (missingFields.length > 0) {
          console.error('Missing required fields:', missingFields);
          return;
        }

        const formData = new FormData();
        formData.append('financialYear', financialYear);
        formData.append('month', month);
        formData.append('mentor', mentor);
        formData.append('goals', goals);
        formData.append('actionPlans', actionPlans);
        formData.append('targetCompletionDate', targetCompletionDate);
        formData.append('progressMetrics', progressMetrics);
        formData.append('actualCompletionDate', actualCompletionDate);
        formData.append('status', status);
        formData.append('feedback', feedback);

        if (evidence instanceof File) {
          formData.append('evidence', evidence);
        } else {
          console.warn('Evidence  is not a valid File object:', evidence);
        }

        formData.append('createdBy', createdBy);
        formData.append('recordOwner', recordOwner);

        const response = await axios.post(`${this.baseUrl}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Mentorship added:', response.data.data);
        await this.fetchMentorshipPlans();
      } catch (error) {
        console.error('Error adding mentorship:', error.response?.data.data || error);
      }
    },

   async updateMentorship(mentorship) {
  try {
    const formData = new FormData();

    console.log("Updating mentorship:", mentorship);

    for (const key in mentorship) {
      if (mentorship[key] !== undefined && mentorship[key] !== null) {
        if (key !== 'evidenceURL') {
          formData.append(key, mentorship[key]);
        }
      }
    }

    const evidenceInput = document.querySelector('input[type="file"][name="evidence"]');
    
    if (evidenceInput && evidenceInput.files.length > 0) {
      console.log("File selected for evidence:", evidenceInput.files[0]); 
      formData.append('evidenceURL', evidenceInput.files[0]);
    } else {
      console.warn('No new file selected for evidenceURL, keeping the old URL.');
    }

    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    const response = await axios.put(`${this.baseUrl}${mentorship.id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    await this.fetchMentorshipPlans();
    console.log('Mentorship updated successfully.');
  } catch (error) {
    console.error('Error updating mentorship:', error.response ? error.response.data : error);
  }
},
    async deleteMentorship(mentorshipId) {
      try {
        await axios.delete(`${this.baseUrl}/${mentorshipId}`);
        console.log('Mentorship deleted.');
        await this.fetchMentorshipPlans();
      } catch (error) {
        console.error('Error deleting mentorship:', error);
      }
    },
  },
});

// import { defineStore } from 'pinia';
// import { mentorshipsService } from '../services/mentorshipsService';

// export const useMentorshipStore = defineStore('mentorships', {
//   state: () => ({
//     mentorships: [],
//   }),
//   actions: {
//     async fetchMentorshipPlans() {
//       this.mentorships = await mentorshipsService.fetchMentorships();
//     },
//     async addMentorship(newMentorship) {
//       const addedMentorship = await mentorshipsService.addMentorship(newMentorship);
//       this.mentorships.push(addedMentorship);
//     },
//      async updateMentorship(updatedMentorship) {
//       const updated = await mentorshipsService.updateMentorship(updatedMentorship);
//       const index = this.mentorships.findIndex(mentorship => mentorship.id === updated.id);
      
//       if (index !== -1) {
//         this.mentorships.splice(index, 1, updated); 
//       }
//     },
//     async deleteMentorship(mentorshipId) {
//       await mentorshipsService.deleteMentorship(mentorshipId);
//       this.mentorships = this.mentorships.filter(mentorship => mentorship.id !== mentorshipId);
//     },
//   },
// });
