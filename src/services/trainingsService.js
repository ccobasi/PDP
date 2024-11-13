import api from './api';

export const trainingsService = {
  async fetchTrainings() {
    const response = await api.get('training-schedules');
    return response.data;
  },
  async addTraining(newTraining) {
    const response = await api.post('training-schedules', newTraining, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
    
  },
  async updateTraining(updatedTraining) {
    // const response = await api.put(`training-schedules/${updatedTraining.id}`, updatedTraining);
    // return response.data;
    const formData = new FormData();
    Object.entries(updatedTraining).forEach(([key, value]) => {
      if (key !== 'evidenceURL') {
        formData.append(key, value);
      }
    });

    if (updatedTraining.evidenceURL) {
      formData.append('evidenceURL', updatedTraining.evidenceURL);
    }

    console.log('Data being sent for training update:');
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    try {
      const response = await api.put(`training-schedules/${updatedTraining.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
     
      console.error('Error updating training:', error.response ? error.response.data : error.message);
      throw error;
    }
  },
  async deleteTraining(trainingId) {
    await api.delete(`training-schedules/${trainingId}`);
  },
};

