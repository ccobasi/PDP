import {defineStore} from 'pinia';

export const useMentorshipStore = defineStore('mentorship', {
  state: () => ({
    mentorship: JSON.parse(localStorage.getItem('mentorship')) || [],
  }),

  getters: {
    getMentorship() {
      return this.mentorship;
    },
  },
 
  actions: {
    addMentorship(financialYear, month, goals, actionPlan, timeLine, status) {
      try {
        // Ensure this.getMentors is an array
        if (!Array.isArray(this.getMentorship)) {
          this.setMentorship([]);
        }

        this.mentorship.push({
          id: Date.now(),
          financialYear: financialYear,
          month: month,
          goals: goals,
          actionPlan: actionPlan,
          timeLine: timeLine,
          status: status,
        });

        this.saveMentorship();
      } catch (error) {
        console.error('Error adding mentorship:', error);
      }
    },

    updateMentorship(mentorshipId, updatedData) {
  const index = this.getMentorship.findIndex(mentorship => mentorship.id === mentorshipId);
  
  if (index !== -1) {
    // Update the mentorship with the new data
    this.getMentorship[index] = { ...this.getMentorship[index], ...updatedData };
    this.saveMentorship(); // Save the updated mentorships to localStorage
  } else {
    console.error('Mentorship not found for ID:', mentorshipId);
  }
},

    fetchMentorship() {
      return this.mentorship;
    },

    saveMentorship() {
      try {
        localStorage.setItem('mentorship', JSON.stringify(this.mentorship));
      } catch (error) {
        console.error('Error saving mentorship to localStorage:', error);
      }
    },
  },
});

