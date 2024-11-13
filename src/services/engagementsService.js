import api from './api';

export const engagementService = {
  async fetchEngagements() {
    const response = await api.get('speaking-engagements/');
    return response.data.data;
  },
  async addEngagement(newEngagement) {
    const response = await api.post('speaking-engagements/', newEngagement);
    return response.data;
  },
  async updateEngagement(updatedEngagement) {
    const response = await api.put(`speaking-engagements/${updatedEngagement.id}/`, updatedEngagement);
    return response.data;
  },
  async deleteEngagement(engagementId) {
    await api.delete(`speaking-engagements/${engagementId}`);
  },
};
