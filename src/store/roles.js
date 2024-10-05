import { defineStore } from 'pinia';
import axios from 'axios';

export const useRolesStore = defineStore('roles', {
  state: () => ({
    roles: [],
    selectedFile: null,
    baseUrl: 'https://infracreditpdp.azurewebsites.net/api/Administrations',
    endpoints: {
      getRoles: '/getRoles',
      createRoles: '/createRoles',
      editRoles: '/editRoles',
      deleteRoles: '/deleteRoles',
    },
  }),

  actions: {
    async fetchRoles() {
      try {
        const response = await axios.get(`${this.baseUrl}${this.endpoints.getRoles}`);
        this.roles = response.data;
        console.log(this.roles); 
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    },

    async addRole(name, description, userType) {
      try {
        const response = await axios.post(`${this.baseUrl}${this.endpoints.createRoles}`, { name, description, userType });
        this.roles.push(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error adding role:', error);
      }
    },

    async updateRole(role) {
      try {
        const roleIndex = this.roles.findIndex(d => d.id === role.id);
        if (roleIndex !== -1) {
          const response = await axios.put(`${this.baseUrl}${this.endpoints.editRoles}`, role);
          this.roles.splice(roleIndex, 1, response.data);
        } else {
          console.error('Role to update not found:', role.id);
        }
      } catch (error) {
        console.error('Error updating role:', error);
      }
    },

    async deleteRole(roleId) {
      try {
        await axios.delete(`${this.baseUrl}${this.endpoints.deleteRoles}/${roleId}`);
        this.roles = this.roles.filter(d => d.id !== roleId);
      } catch (error) {
        console.error('Error deleting role:', error);
      }
    },
  },
});
