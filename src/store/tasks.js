// import {defineStore} from 'pinia';

// export const useTasksStore = defineStore('tasks', {
//   state: () => ({
//     tasks: JSON.parse(localStorage.getItem('tasks')) || [],
//     evidence: null,
//   }),

//   mutations: {
//     setTasks(tasks) {
//       this.tasks = tasks;
//     },
//   },
//   getters: {
//     getTasks() {
//       return this.tasks;
//     },
//     getEvidence() {
//       return this.evidence;
//     },
//   },
 
//   actions: {
//     addTask(task, status, startDate, endDate, comment, evidence) {
//       try {
//         const nextId = this.tasks.length + 1;

//         if (!Array.isArray(this.getTasks)) {
//           this.setTasks([]);
//         }

//         this.tasks.push({
//           id: nextId,
//           task: task,
//           status: status,
//           startDate: startDate,
//           endDate: endDate,
//           comment: comment,
//           evidence: evidence,
//         });

//         this.saveTasks();
//       } catch (error) {
//         console.error('Error adding task:', error);
//       }
//     },
//     updateTask(taskId, updatedData) {
//       const index = this.tasks.findIndex(task => task.id === taskId);
      
//       if (index !== -1) {
//         // Update the task with the new data
//         this.tasks[index] = { ...this.tasks[index], ...updatedData };
//         this.saveTasks(); // Save the updated tasks to localStorage
//       } else {
//         console.error('Task not found for ID:', taskId);
//       }
//     },

//     fetchTasks() {
//       return this.tasks;
//     },

//     saveTasks() {
//       try {
//         localStorage.setItem('tasks', JSON.stringify(this.tasks));
//       } catch (error) {
//         console.error('Error saving tasks to localStorage:', error);
//       }
//     },
//      setEvidence(file) {
//       this.evidence = file;
//     },
//     deleteTask(taskId) {
//       try {
//         const taskIndex = this.tasks.findIndex(task => task.id === taskId);

//         if (taskIndex !== -1) {
//           this.tasks.splice(taskIndex, 1);

//           this.saveTasks();

//           console.log('Task deleted:', taskId);
//         } else {
//           console.error('Task not found:', taskId);
//         }
//       } catch (error) {
//         console.error('Error deleting goal:', error);
//       }
//     },
//   },
// });


import { defineStore } from 'pinia';
import axios from 'axios';

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    selectedFile: null,
    baseUrl: 'https://infracreditpdp.azurewebsites.net/api/Deliverables',
    endpoints: {
      getDeliverables: '/getDeliverables',
      createDeliverables: '/createDeliverables',
      editDeliverables: '/editDeliverables',
    },
  }),

  actions: {
    async fetchTasks() {
      try {
        const response = await axios.get(`${this.baseUrl}${this.endpoints.getDeliverables}`);
        this.tasks = response.data;
        console.log(this.tasks); 
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },

    async addTask(deliverableTypeId, taskDescription, startDate, endDate, evidence, comment, status, createdBy, lastModifiedBy ) {
      try {
        const response = await axios.post(`${this.baseUrl}${this.endpoints.createUsers}`, { deliverableTypeId, taskDescription, startDate, endDate, evidence, comment, status, createdBy, lastModifiedBy });
        this.tasks.push(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error adding task:', error);
      }
    },

    async updateTask(task) {
      try {
        const taskIndex = this.tasks.findIndex(d => d.id === task.deliverableId);
        if (taskIndex !== -1) {
          const response = await axios.put(`${this.baseUrl}${this.endpoints.editDeliverables}/${task.deliverableId}`, task);
          this.tasks.splice(taskIndex, 1, response.data);
        } else {
          console.error('User to update not found:', task.deliverableId);
        }
      } catch (error) {
        console.error('Error updating task:', error);
      }
    },

    async deleteUser(taskId) {
      try {
        await axios.delete(`${this.baseUrl}${this.endpoints.editDeliverables}/${taskId}`);
        this.tasks = this.tasks.filter(d => d.id !== taskId);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    },
  },
});
