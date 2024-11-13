import { defineStore } from 'pinia';
import axios from 'axios';

// export const useTasksStore = defineStore('tasks', {
//   state: () => ({
//     tasks: [],
//     selectedFile: null,
//     baseUrl: 'https://infracreditpdp.azurewebsites.net/api/Deliverables',
//     endpoints: {
//       getDeliverables: '/getDeliverables',
//       createDeliverables: '/createDeliverables',
//       editDeliverables: '/editDeliverables',
//     },
//   }),

//   actions: {
 
//     async fetchTasks() {
//       try {
//         const response = await axios.get(`${this.baseUrl}${this.endpoints.getDeliverables}`);
//         this.tasks = response.data;
//         console.log('Fetched tasks:', this.tasks);
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//       }
//     },

//     async addTask({ /*deliverableTypeId,*/ taskDescription, startDate, endDate, evidence, comment, status, createdBy, lastModifiedBy }) {
//       try {
//         const response = await axios.post(`${this.baseUrl}${this.endpoints.createDeliverables}`, { 
//           /*deliverableTypeId*/
//           taskDescription, 
//           startDate, 
//           endDate, 
//           evidence, 
//           comment, 
//           status, 
//           createdBy, 
//           lastModifiedBy 
//         });
        
//         console.log('Server response:', response.data);

//         await this.fetchTasks();
//         console.log('Task added and tasks refetched.');
//       } catch (error) {
//         console.error('Error adding task:', error.response?.data || error);
//       }
//     },

//     async updateTask(task) {
//       try {
//         const response = await axios.put(`${this.baseUrl}${this.endpoints.editDeliverables}/${task.deliverableId}`, task);

//         console.log('Updated task:', response.data);

//         await this.fetchTasks();
//         console.log('Task updated and tasks refetched.');
//       } catch (error) {
//         console.error('Error updating task:', error.response?.data || error);
//       }
//     },    

//     async deleteTask(taskId) {
//       try {
//         await axios.delete(`${this.baseUrl}${this.endpoints.editDeliverables}/${taskId}`);

//         await this.fetchTasks();
//         console.log('Task deleted and tasks refetched.');
//       } catch (error) {
//         console.error('Error deleting task:', error);
//       }
//     },
//   },
// });

// Store setup with Pinia
export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    selectedFile: null,
    baseUrl: 'https://infracredit2.pythonanywhere.com/api/v1/deliverables/',
    endpoints: {
    getDeliverables: '/',
    createDeliverables: '/createDeliverables',
    editDeliverables: '/editDeliverables',
    },
  }),
  actions: {
     async fetchTasks({ level = '', department = '', quarter = '', year = '' } = {}) {
      // try {
      //   const response = await axios.get(`${this.baseUrl}${this.endpoints.getDeliverables}`);
      //   this.tasks = response.data;
      //   console.log("Fetched tasks:", this.tasks);
      // } 
      try {
        const response = await axios.get(`${this.baseUrl}`, {
          params: {
            recordOwner_role_option: level,      
            recordOwner_department_option: department,  
            quarter,                              
            year,                                
          },
        });
        
        this.tasks = response.data.data;
        console.log("Fetched tasks:", this.tasks);
      }catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },
    async addTask(taskData) {
  
  console.log("Adding task with data:", taskData);

  try {
    const response = await axios.post(`${this.baseUrl}`, taskData);

    if (response.data) {
      this.tasks.push(response.data);
      console.log("Task added to store:", response.data);
      return response.data; 
    } else {
      console.error("Unexpected response structure:", response);
      return null; 
    }
  } catch (error) {
    console.error("Error adding task:", error);
    return null; 
  }
},
    // async updateTask(taskId, updatedData) {
    //   try {
    //     const response = await axios.put(`${this.baseUrl}${this.endpoints.editDeliverables}/${taskId}`, updatedData);
    //     const index = this.tasks.findIndex(task => task.id === taskId);
    //     if (index !== -1) {
    //       this.tasks[index] = response.data;
    //       console.log("Task updated in store:", response.data);
    //     }
    //   } catch (error) {
    //     console.error("Error updating task:", error);
    //   }
    // },
    async deleteTask(taskId) {
      try {
        await axios.delete(`${this.baseUrl}${this.endpoints.editDeliverables}/${taskId}`);
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        console.log("Task deleted from store:", taskId);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    },
  }
});
