import { defineStore } from 'pinia';
import axios from 'axios';

export const useBusinessUnitsStore = defineStore('businessUnits', {
  state: () => ({
    businessUnits: [],
    selectedFile: null,
    baseUrl: 'https://infracreditpdp.azurewebsites.net/api/Settings',
    endpoints: {
      getBusinessUnits: '/getBusinessUnits',
      createBusinessUnits: '/createBusinessUnits',
      editBusinessUnits: '/editBusinessUnits',
      deleteBusinessUnits: '/deleteBusinessUnits',
    },
  }),

  actions: {
    async fetchBusinessUnits() {
      try {
        const response = await axios.get(`${this.baseUrl}${this.endpoints.getBusinessUnits}`);
        this.businessUnits = response.data;
        console.log(this.businessUnits); 
      } catch (error) {
        console.error('Error fetching business units:', error);
      }
    },

    async addBusinessUnit(shortCode, businessUnitDescription, lastModifiedBy) {
      try {
        const response = await axios.post(`${this.baseUrl}${this.endpoints.createBusinessUnits}`, { shortCode, businessUnitDescription, lastModifiedBy });
        this.businessUnits.push(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error adding business unit:', error);
      }
    },

    async updateBusinessUnit(businessUnit) {
      try {
        const businessUnitIndex = this.businessUnits.findIndex(d => d.id === businessUnit.id);
        console.log(businessUnitIndex);
        if (businessUnitIndex !== -1) {
          const response = await axios.put(`${this.baseUrl}${this.endpoints.editBusinessUnits}`, businessUnit);
          this.businessUnits.splice(businessUnitIndex, 1, response.data);
        } else {
          console.error('Business Unit to update not found:', businessUnit.id);
        }
      } catch (error) {
        console.error('Error updating business unit:', error);
      }
    },

    async deleteBusinessUnit(businessUnitId) {
      try {
        await axios.delete(`${this.baseUrl}${this.endpoints.deleteBusinessUnits}/${businessUnitId}`);
        this.businessUnits = this.businessUnits.filter(d => d.id !== businessUnitId);
      } catch (error) {
        console.error('Error deleting business unit:', error);
      }
    },
  },
});