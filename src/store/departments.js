import { defineStore } from 'pinia';
import axios from 'axios';

export const useDepartmentsStore = defineStore('departments', {
  state: () => ({
    departments: [],
    selectedFile: null,
    baseUrl: 'https://infracredit2.pythonanywhere.com/api/v1/departments/',
    endpoints: {
      getDepartments: '/getDepartments',
      createDepartments: '/createDepartments',
      editDepartments: '/editDepartments',
      deleteDepartments: '/deleteDepartments',
    },
  }),

  actions: {
    async fetchDepartments() {
      try {
        const response = await axios.get(`${this.baseUrl}`);
        this.departments = response.data;
        console.log(this.departments); 
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    },

    async addDepartment(option) {
      try {
        const response = await axios.post(`${this.baseUrl}`, { option });
        this.departments.push(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error adding department:', error);
      }
    },

    async updateDepartment(department) {
      try {
        const departmentIndex = this.departments.findIndex(d => d.id === department.id);
        if (departmentIndex !== -1) {
          const response = await axios.put(`${this.baseUrl}${this.endpoints.editDepartments}`, department);
          this.departments.splice(departmentIndex, 1, response.data);
        } else {
          console.error('Department to update not found:', department.id);
        }
      } catch (error) {
        console.error('Error updating department:', error);
      }
    },

    async deleteDepartment(departmentId) {
      try {
        await axios.delete(`${this.baseUrl}${this.endpoints.deleteDepartments}/${departmentId}`);
        this.departments = this.departments.filter(d => d.id !== departmentId);
      } catch (error) {
        console.error('Error deleting department:', error);
      }
    },
  },
});
