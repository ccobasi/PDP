import {defineStore} from 'pinia';

export const useDepartmentsStore = defineStore('departments', {
  state: () => ({
    departments: JSON.parse(localStorage.getItem('departments')) || [],
    selectedFile: null,
  }),

  mutations: {
    setDepartments(departments) {
      this.departments = departments;
    },
  },
  getters: {
    getDepartments() {
      return this.departments;
    },
  },
 
  actions: {
    addDepartment(dept) {
      try {
        const nextId = this.departments.length + 1;
        this.departments.push({
          id: nextId,
          dept: dept,
        });

        this.saveDepartments();
      } catch (error) {
        console.error('Error adding department:', error);
      }
    },

    setSelectedFile(file) {
      this.selectedFile = file;
    },

    fetchDepartments() {
      return this.departments;
    },

    saveDepartments() {
      try {
        localStorage.setItem('departments', JSON.stringify(this.departments));
      } catch (error) {
        console.error('Error saving departments to localStorage:', error);
      }
    },
  },
});
