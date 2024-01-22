import {defineStore} from 'pinia';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: JSON.parse(localStorage.getItem('users')) || [],
    selectedFile: null,
  }),

  mutations: {
    setUsers(users) {
      this.users = users;
    },
  },
  getters: {
    getUsers() {
      return this.users;
    },
  },
 
  actions: {
    addUser(name, department, manager, email,level, status, role) {
      try {
        this.users.push({
          id: Date.now(),
          name: name,
          department: department,
          manager: manager,
          email: email,
          level:level,
          status: status,
          role: role,
        });

        this.saveUsers();
      } catch (error) {
        console.error('Error adding user:', error);
      }
    },

    setSelectedFile(file) {
      this.selectedFile = file;
    },

    fetchUsers() {
      return this.users;
    },

    saveUsers() {
      try {
        localStorage.setItem('users', JSON.stringify(this.users));
      } catch (error) {
        console.error('Error saving users to localStorage:', error);
      }
    },
  },
});
