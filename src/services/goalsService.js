import api from './api';

export const goalsService = {
  async fetchGoals() {
    const response = await api.get('development-plans');
    return response.data;
  },
  async addGoal(newGoal) {
    const response = await api.post('development-plans', newGoal);
    return response.data;
  },
  // async updateGoal(updatedGoal) {
  //   const response = await api.put(`development-plans/${updatedGoal.id}`, updatedGoal, {
  //       headers: {
  //           'Content-Type': 'multipart/form-data',
  //       },
  //   });
  //   return response.data;
  // },
  async updateGoal(updatedGoal) {
  // Check for undefined or invalid ID
  if (!updatedGoal.id) {
    console.error('Error: Goal ID is missing or undefined.');
    throw new Error('Goal ID is missing or undefined.');
  }

  const formData = new FormData();
  Object.entries(updatedGoal).forEach(([key, value]) => {
    if (key !== 'evidenceURL') {
      formData.append(key, value);
    }
  });

  if (updatedGoal.evidenceURL) {
    formData.append('evidenceURL', updatedGoal.evidenceURL);
  }

  console.log('Data being sent for goal update:');
  for (const pair of formData.entries()) {
    console.log(`${pair[0]}:`, pair[1]);
  }

  try {
    console.log(`Calling API: development-plans/${updatedGoal.id}`);
    const response = await api.put(`development-plans/${updatedGoal.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('API Response:', response);

    return response.data;  // Ensure you return the correct data
  } catch (error) {
    console.error('Error updating Goal:', error.response ? error.response.data : error.message);
    throw error;
  }
},
  async deleteGoal(goalId) {
    await api.delete(`development-plans/${goalId}`);
  },
};
