import api from './api';

export const skillsService = {
  async fetchSkills({ level = '', department = '', quarter = '', year = '' } = {}) {

    try {
        const response = await api.get('skill-assessments/', {
          params: {
            recordOwner_role_option: level,      
            recordOwner_department_option: department,  
            quarter,                              
            year,                                
          },
        });

        // return response.data;
        return Array.isArray(response.data.data) ? response.data.data : [];
        } catch (error) {
        console.error('Error fetching skills:', error);
        return []; 
      }
    
  },
  // async addSkill(newSkill) {
  //   const response = await api.post('skill-assessments', newSkill);
  //   return response.data;
  // },
  async addSkill(newSkill) {
    console.log('Adding skill with data:', newSkill);
    const response = await api.post('skill-assessments/', newSkill);
    console.log('Skill added response:', response.data);
    return response.data;
  },
  // async updateSkill(updatedSkill) {
  //   const response = await api.put(`skill-assessments/${updatedSkill.id}`, updatedSkill);
  //   return response.data;
  // },
  async updateSkill(updatedSkill) {
    const response = await api.put(`skill-assessments/${updatedSkill.id}/`, updatedSkill, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
},
  async deleteSkill(skillId) {
    await api.delete(`skill-assessments/${skillId}`);
  },
};
