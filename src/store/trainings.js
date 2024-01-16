import {defineStore} from 'pinia';

export const useTrainingsStore = defineStore('trainings', {
  state: () => ({
    trainings: JSON.parse(localStorage.getItem('trainings')) || [],
    selectedFile: null,
  }),

  mutations: {
    setTrainings(trainings) {
      this.trainings = trainings;
    },
  },
  getters: {
    getTrainings() {
      return this.trainings;
    },
  },
 
  actions: {
    addTraining(month, trainingTopic, learningOutcome, trainingMethod, trainingInitiator,skillMatrixMapping, dueDate, status, selectedRating, evidence) {
      try {
        this.trainings.push({
          id: Date.now(),
          month: month,
          trainingTopic: trainingTopic,
          learningOutcome: learningOutcome,
          trainingMethod: trainingMethod,
          trainingInitiator: trainingInitiator,
          skillMatrixMapping:skillMatrixMapping,
          dueDate: dueDate,
          status: status,
          selectedRating: selectedRating,
          evidence: evidence,
        });

        this.saveTrainings();
      } catch (error) {
        console.error('Error adding training:', error);
      }
    },

    setSelectedFile(file) {
      this.selectedFile = file;
    },

    fetchTrainings() {
      return this.trainings;
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
