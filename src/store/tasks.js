import {defineStore} from 'pinia';

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    selectedFile: null,
  }),

  mutations: {
    setTasks(tasks) {
      this.tasks = tasks;
    },
  },
  getters: {
    getTasks() {
      return this.tasks;
    },
  },
 
  actions: {
    addTask(task, status, startDate, endDate, comment, evidence) {
      try {
        // Ensure this.getTasks is an array
        if (!Array.isArray(this.getTasks)) {
          this.setTasks([]);
        }

        this.tasks.push({
          id: Date.now(),
          task: task,
          status: status,
          startDate: startDate,
          endDate: endDate,
          comment: comment,
          evidence: evidence,
        });

        this.saveTasks();
      } catch (error) {
        console.error('Error adding task:', error);
      }
    },
    updateTask(taskId, updatedData) {
      const index = this.tasks.findIndex(task => task.id === taskId);
      
      if (index !== -1) {
        // Update the task with the new data
        this.tasks[index] = { ...this.tasks[index], ...updatedData };
        this.saveTasks(); // Save the updated tasks to localStorage
      } else {
        console.error('Task not found for ID:', taskId);
      }
    },

    setSelectedFile(file) {
      this.selectedFile = file;
    },

    fetchTasks() {
      return this.tasks;
    },

    saveTasks() {
      try {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      } catch (error) {
        console.error('Error saving tasks to localStorage:', error);
      }
    },
  },
});

