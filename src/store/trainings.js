import {defineStore} from 'pinia';

export const useTrainingsStore = defineStore('trainings', {
  state: () => ({
    trainings: JSON.parse(localStorage.getItem('trainings')) || [],
  }),

  getters: {
    getTrainings() {
      return this.trainings;
    },
  },
 
  actions: {
    addTraining(month, trainingTopic, learningOutcome, trainingMethod, trainingInitiator,skillMatrixMapping) {
      try {
        this.getTrainings.push({
          id: Date.now(),
          month: month,
          trainingTopic: trainingTopic,
          learningOutcome: learningOutcome,
          trainingMethod: trainingMethod,
          trainingInitiator: trainingInitiator,
          skillMatrixMapping:skillMatrixMapping,
          
        });

        this.saveTrainings();
      } catch (error) {
        console.error('Error adding training:', error);
      }
    },

    fetchTrainings() {
      return this.getTrainings();
    },

    saveTrainings() {
      try {
        localStorage.setItem('trainings', JSON.stringify(this.trainings));
      } catch (error) {
        console.error('Error saving trainings to localStorage:', error);
      }
    },
  },
});
