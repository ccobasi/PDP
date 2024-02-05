import {defineStore} from 'pinia';

export const useTrainingsStore = defineStore('trainings', {
  state: () => ({
    trainings: JSON.parse(localStorage.getItem('trainings')) || [],
    evidence: null,
  }),

  mutations: {
    setTrainings(trainings) {
      this.trainings = trainings;
    },
    setEvidence(file) {
      this.evidence = file;
    },
  },
  getters: {
    getTrainings() {
      return this.trainings;
    },
    getEvidence() {
      return this.evidence;
    },
  },
 
  actions: {
    addTraining(month, trainingTopic, learningOutcome, trainingMethod, trainingInitiator,skillMatrixMapping, dueDate, status, selectedRating, evidence) {
      try {
        const nextId = this.trainings.length + 1;
        this.trainings.push({
          id: nextId,
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
    setEvidence(file) {
      this.evidence = file;
    },
  },
});
