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
    addUser(user, department, manager, email,level, status, role) {
      try {
        const nextId = this.users.length + 1;
        this.users.push({
          id: nextId,
          user: user,
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
