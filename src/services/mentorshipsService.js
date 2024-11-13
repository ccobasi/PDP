import api from './api';

export const mentorshipsService = {
  async fetchMentorships() {
    const response = await api.get('mentorship-plans');
    return response.data;
  },
  async addMentorship(newMentorship) {
    const response = await api.post('mentorship-plans', newMentorship, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
  },
  // async updateMentorship(updatedMentorship) {
  //   const response = await api.put(`mentorship-plans/${updatedMentorship.id}`, updatedMentorship, {
  //       headers: {
  //           'Content-Type': 'multipart/form-data',
  //       },
  //   });
  //   return response.data;
  // },
  async updateMentorship(updatedMentorship) {
    const formData = new FormData();
    
    for (const key in updatedMentorship) {
        if (updatedMentorship[key] !== undefined && updatedMentorship[key] !== null) {
            if (key !== 'mentorshipPlanId') { 
                formData.append(key, updatedMentorship[key]);
            }
        }
    }

    const evidenceInput = document.querySelector('input[type="file"][name="evidenceURL"]');
    
    if (evidenceInput && evidenceInput.files.length > 0) {
        console.log("New file selected for evidenceURL:", evidenceInput.files[0]);
        formData.append('evidenceURL', evidenceInput.files[0]);
    } else {
        console.log('No new file selected for evidenceURL. Keeping existing URL:', updatedMentorship.evidenceURL);
    }

    try {
        const response = await api.put(`mentorship-plans/${updatedMentorship.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Update successful:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error updating mentorship:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        }
        throw error; 
    }
},
  async deleteMentorship(mentorshipId) {
    await api.delete(`mentorship-plans/${mentorshipId}`);
  },
};
