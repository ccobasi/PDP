// import { defineStore } from 'pinia';
// import axios from 'axios';

// export const useUsersStore = defineStore('users', {
//   state: () => ({
//     users: [],
//     selectedFile: null,
//     baseUrl: 'https://infracreditpdp.azurewebsites.net/api/Administrations',
//     endpoints: {
//       getUsers: '/getUsers',
//       createUsers: '/createUsers',
//       editUsers: '/editUsers',
//     },
//   }),

//   actions: {
//     async fetchUsers() {
//       try {
//         const response = await axios.get(`${this.baseUrl}${this.endpoints.getUsers}`);
//         this.users = response.data;
//         console.log(this.users); 
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     },

//     async addUser(userId, userFullName, roleId, jobTitle, phoneNumber, address, departmentId, businessUnitId, createdBy ) {
//       try {
//         const response = await axios.post(`${this.baseUrl}${this.endpoints.createUsers}`, { userId, userFullName, roleId, jobTitle, phoneNumber, address, departmentId, businessUnitId, createdBy });
//         this.users.push(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error adding user:', error);
//       }
//     },

//     async updateUser(user) {
//       try {
//         const userIndex = this.users.findIndex(d => d.id === user.id);
//         if (userIndex !== -1) {
//           const response = await axios.put(`${this.baseUrl}${this.endpoints.editUsers}/${user.id}`, user);
//           this.users.splice(userIndex, 1, response.data);
//         } else {
//           console.error('User to update not found:', user.id);
//         }
//       } catch (error) {
//         console.error('Error updating user:', error);
//       }
//     },

//     async deleteUser(userId) {
//       try {
//         await axios.delete(`${this.baseUrl}${this.endpoints.editUsers}/${userId}`);
//         this.users = this.users.filter(d => d.id !== userId);
//       } catch (error) {
//         console.error('Error deleting user:', error);
//       }
//     },
//   },
// });

import { defineStore } from 'pinia';
import axios from 'axios';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [], 
    selectedFile: null,
    baseUrl: 'https://infracredit2.pythonanywhere.com/api/v1/users/', 
  }),

  actions: {
  
    async fetchUsers() {
      try {
        const response = await axios.get(`${this.baseUrl}`);
        this.users = response.data.data;
        console.log('Users fetched:', this.users); 
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },

    async addUser(role, email, userFullName, jobTitle, phoneNumber, address, department, businessUnit, createdBy) {
  try {
    const response = await axios.post(`${this.baseUrl}`, { 
      role,
      email,
      userFullName,
      jobTitle,
      phoneNumber,
      address,
      department,
      businessUnit,
      createdBy
    });

    console.log('User added:', response.data);

    // Optionally refresh the user list after adding a new user
    await this.fetchUsers();
  } catch (error) {
    console.error('Error adding user:', error);
  }
},


    async updateUser(user) {
      try {
        const userIndex = this.users.findIndex(d => d.id === user.id);
        if (userIndex !== -1) {
          await axios.put(`${this.baseUrl}/${user.id}`, user);
          console.log('User updated:', user);

          await this.fetchUsers();
        } else {
          console.error('User to update not found:', user.id);
        }
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },

    async deleteUser(userId) {
      try {
        await axios.delete(`${this.baseUrl}/${userId}`);
        console.log('User deleted:', userId);

        await this.fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
  },
});
