// import { defineStore } from 'pinia';
// import axios from 'axios';

// export const useTrainingsStore = defineStore('trainings', {
//   state: () => ({
//     trainings: [],
//     selectedFile: null,
//     baseUrl: 'https://infracreditpdp.azurewebsites.net/api/TrainingSchedules',
//     endpoints: {
//       getTrainingSchedules: '/getTrainingSchedules',
//       createTrainingSchedules: '/createTrainingSchedules',
//       editTrainingSchedules: '/editTrainingSchedule',
//     },
//   }),

//   actions: {
//     async fetchTrainingSchedules() {
//       try {
//         const response = await axios.get(`${this.baseUrl}${this.endpoints.getTrainingSchedules}`);
//         this.trainings = response.data;
//         console.log(this.trainings); 
//       } catch (error) {
//         console.error('Error fetching trainings:', error);
//       }
//     },

//     async addTraining(trainingStartDate, trainingTopic, learningOutcome, trainingMethod, trainingInitiator,skillMatrixMapping, dueDate, rating, recordOwner, department, createdBy, lastModifiedBy, status, selectedRating, evidenceURL ) {
//       try {
//         const response = await axios.post(`${this.baseUrl}${this.endpoints.createTrainingSchedules}`, { trainingStartDate, trainingTopic, learningOutcome, trainingMethod, trainingInitiator,skillMatrixMapping, dueDate, rating, recordOwner, department, createdBy, lastModifiedBy, status, selectedRating, evidenceURL });
//         this.trainings.push(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error adding user:', error);
//       }
//     },

//     async updateTraining(training) {
//       try {
//         const trainingIndex = this.trainings.findIndex(d => d.id === training.id);
//         if (trainingIndex !== -1) {
//           const response = await axios.put(`${this.baseUrl}${this.endpoints.editTrainingSchedules}/${training.id}`, training);
//           this.trainings.splice(trainingIndex, 1, response.data);
//         } else {
//           console.error('Training to update not found:', training.id);
//         }
//       } catch (error) {
//         console.error('Error updating training:', error);
//       }
//     },

//     async deleteTraining(trainingId) {
//       try {
//         await axios.delete(`${this.baseUrl}${this.endpoints.editTrainingSchedules}/${trainingId}`);
//         this.trainings = this.trainings.filter(d => d.id !== trainingId);
//       } catch (error) {
//         console.error('Error deleting training:', error);
//       }
//     },
//   },
// });
import { defineStore } from 'pinia';
import axios from 'axios';

export const useTrainingsStore = defineStore('trainings', {
  state: () => ({
    trainings: [],
    selectedFile: null,
    baseUrl: 'https://infracredit.pythonanywhere.com/api/v1/training-schedules',
  }),

  actions: {
    async fetchTrainingSchedules() {
      try {
        const response = await axios.get(`${this.baseUrl}`);
        this.trainings = response.data;
        console.log(this.trainings); 
      } catch (error) {
        console.error('Error fetching trainings:', error);
      }
    },

    async addTraining(
  trainingStartDate,
  trainingTopic,
  learningOutcome,
  trainingMethod,
  trainingInitiator,
  skillMatrixMapping,
  dueDate,
  status,
  rating,
  evidenceURL, // This should be a File object
  recordOwner,
  department,
  feedback,
  createdBy,
  lastModifiedBy
) {
  try {
    const payload = {
      trainingStartDate,
      trainingTopic,
      learningOutcome,
      trainingMethod,
      trainingInitiator,
      skillMatrixMapping,
      dueDate,
      status,
      rating,
      evidenceURL, // Keeping this for logging/debugging purposes
      recordOwner,
      department,
      feedback,
      createdBy,
      lastModifiedBy,
    };

    console.log('Submitting payload:', payload);

    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      if (payload[key] !== undefined && payload[key] !== null) {
        // Check if the key is 'evidenceURL' and ensure it's a File or Blob
        if (key === 'evidenceURL' && payload[key] instanceof File) {
          formData.append(key, payload[key], payload[key].name);
        } else {
          formData.append(key, payload[key]);
        }
      }
    });

    const response = await axios.post(`${this.baseUrl}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Server response:', response);

    if (response.data) {
      if (Array.isArray(this.trainings)) {
        this.trainings.push(response.data);
      } else {
        console.error('Error adding training: trainings is not an array');
      }
      console.log('Training added:', response.data);
    } else {
      console.error('Server response data is empty');
    }
  } catch (error) {
    if (error.response) {
      console.error('Error adding training:', error.response.data);
    } else {
      console.error('Error adding training:', error);
    }
  }
},

    async updateTraining(training) {
      try {
        const trainingIndex = this.trainings.findIndex(d => d.id === training.id);
        if (trainingIndex !== -1) {
          const response = await axios.put(`${this.baseUrl}/${training.id}`, training);
          this.trainings.splice(trainingIndex, 1, response.data);
        } else {
          console.error('Training to update not found:', training.id);
        }
      } catch (error) {
        console.error('Error updating training:', error);
      }
    },

    async deleteTraining(trainingId) {
      try {
        await axios.delete(`${this.baseUrl}/${trainingId}`);
        this.trainings = this.trainings.filter(d => d.id !== trainingId);
      } catch (error) {
        console.error('Error deleting training:', error);
      }
    },
  },
});

export const useSelectedNameStore = defineStore('selectedName', {
  state: () => ({
    name: '',
  }),
  actions: {
    setSelectedName(newName) {
      this.name = newName;
    },
  },
});

export const useKMTrainingsStore = defineStore('kmTrainings', {
  state: () => ({
    kmTrainings: JSON.parse(localStorage.getItem('kmTrainings')) || [],
    evidenceURL: null,
  }),

  mutations: {
    setTrainings(kmTrainings) {
      this.kmTrainings = kmTrainings;
    },
    setEvidence(file) {
      this.evidenceURL = file;
    },
  },
  getters: {
    getTrainings() {
      return this.kmTrainings;
    },
    getEvidence() {
      return this.evidenceURL;
    },
  },
 
  actions: {
    addTraining(trainingStartDate, trainingTopic, learningOutcome, trainingMethod, trainingInitiator,skillMatrixMapping, dueDate, status, selectedRating, evidenceURL) {
      try {
        const nextId = this.kmTrainings.length + 1;
        this.kmTrainings.push({
          id: nextId,
          trainingStartDate: trainingStartDate,
          trainingTopic: trainingTopic,
          learningOutcome: learningOutcome,
          trainingMethod: trainingMethod,
          trainingInitiator: trainingInitiator,
          skillMatrixMapping:skillMatrixMapping,
          dueDate: dueDate,
          status: status,
          selectedRating: selectedRating,
          evidenceURL: evidenceURL,
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
      return this.kmTrainings;
    },

    saveTrainings() {
      try {
        localStorage.setItem('kmTrainings', JSON.stringify(this.kmTrainings));
      } catch (error) {
        console.error('Error saving trainings to localStorage:', error);
      }
    },
    setEvidence(file) {
      this.evidenceURL = file;
    },
    deleteTraining(trainingId) {
      try {
        const trainingIndex = this.kmTrainings.findIndex(kmTraining => kmTraining.id === trainingId);

        if (trainingIndex !== -1) {
          this.kmTrainings.splice(trainingIndex, 1);

          this.saveTrainings();

          console.log('Training deleted:', trainingId);
        } else {
          console.error('Training not found:', trainingId);
        }
      } catch (error) {
        console.error('Error deleting training:', error);
      }
    },
  },
});

export const useMTrainingsStore = defineStore('mTrainings', {
  state: () => ({
    kmTrainings: JSON.parse(localStorage.getItem('mTrainings')) || [],
    evidenceURL: null,
  }),

  mutations: {
    setTrainings(mTrainings) {
      this.kmTrainings = mTrainings;
    },
    setEvidence(file) {
      this.evidenceURL = file;
    },
  },
  getters: {
    getTrainings() {
      return this.mTrainings;
    },
    getEvidence() {
      return this.evidenceURL;
    },
  },
 
  actions: {
    addTraining(trainingStartDate, trainingTopic, learningOutcome, trainingMethod, trainingInitiator,skillMatrixMapping, dueDate, status, selectedRating, evidenceURL) {
      try {
        const nextId = this.mTrainings.length + 1;
        this.mTrainings.push({
          id: nextId,
          trainingStartDate: trainingStartDate,
          trainingTopic: trainingTopic,
          learningOutcome: learningOutcome,
          trainingMethod: trainingMethod,
          trainingInitiator: trainingInitiator,
          skillMatrixMapping:skillMatrixMapping,
          dueDate: dueDate,
          status: status,
          selectedRating: selectedRating,
          evidenceURL: evidenceURL,
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
      return this.mTrainings;
    },

    saveTrainings() {
      try {
        localStorage.setItem('kmTrainings', JSON.stringify(this.mTrainings));
      } catch (error) {
        console.error('Error saving trainings to localStorage:', error);
      }
    },
    setEvidence(file) {
      this.evidenceURL = file;
    },
    deleteTraining(trainingId) {
      try {
        const trainingIndex = this.mTrainings.findIndex(mTraining => mTraining.id === trainingId);

        if (trainingIndex !== -1) {
          this.mTrainings.splice(trainingIndex, 1);

          this.saveTrainings();

          console.log('Training deleted:', trainingId);
        } else {
          console.error('Training not found:', trainingId);
        }
      } catch (error) {
        console.error('Error deleting training:', error);
      }
    },
  },
});

export const useHODTrainingsStore = defineStore('hodTrainings', {
  state: () => ({
    hodTrainings: JSON.parse(localStorage.getItem('hodTrainings')) || [],
    evidenceURL: null,
  }),

  mutations: {
    setTrainings(hodTrainings) {
      this.hodTrainings = hodTrainings;
    },
    setEvidence(file) {
      this.evidenceURL = file;
    },
  },
  getters: {
    getTrainings() {
      return this.hodTrainings;
    },
    getEvidence() {
      return this.evidenceURL;
    },
  },
 
  actions: {
    addTraining(trainingStartDate, trainingTopic, learningOutcome, trainingMethod, trainingInitiator,skillMatrixMapping, dueDate, status, selectedRating, evidenceURL) {
      try {
        const nextId = this.hodTrainings.length + 1;
        this.hodTrainings.push({
          id: nextId,
          trainingStartDate: trainingStartDate,
          trainingTopic: trainingTopic,
          learningOutcome: learningOutcome,
          trainingMethod: trainingMethod,
          trainingInitiator: trainingInitiator,
          skillMatrixMapping:skillMatrixMapping,
          dueDate: dueDate,
          status: status,
          selectedRating: selectedRating,
          evidenceURL: evidenceURL,
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
      return this.hodTrainings;
    },

    saveTrainings() {
      try {
        localStorage.setItem('hodTrainings', JSON.stringify(this.hodTrainings));
      } catch (error) {
        console.error('Error saving trainings to localStorage:', error);
      }
    },
    setEvidence(file) {
      this.evidenceURL = file;
    },
    deleteTraining(trainingId) {
      try {
        const trainingIndex = this.hodTrainings.findIndex(hodTraining => hodTraining.id === trainingId);

        if (trainingIndex !== -1) {
          this.hodTrainings.splice(trainingIndex, 1);

          this.saveTrainings();

          console.log('Training deleted:', trainingId);
        } else {
          console.error('Training not found:', trainingId);
        }
      } catch (error) {
        console.error('Error deleting training:', error);
      }
    },
  },
});

export const useITTrainingsStore = defineStore('itTrainings', {
  state: () => ({
    itTrainings: JSON.parse(localStorage.getItem('itTrainings')) || [],
    evidenceURL: null,
  }),

  mutations: {
    setTrainings(itTrainings) {
      this.itTrainings = itTrainings;
    },
    setEvidence(file) {
      this.evidenceURL = file;
    },
  },
  getters: {
    getTrainings() {
      return this.itTrainings;
    },
    getEvidence() {
      return this.evidenceURL;
    },
  },
 
  actions: {
    addTraining(trainingStartDate, trainingTopic, learningOutcome, trainingMethod, trainingInitiator,skillMatrixMapping, dueDate, status, selectedRating, evidenceURL) {
      try {
        const nextId = this.itTrainings.length + 1;
        this.itTrainings.push({
          id: nextId,
          trainingStartDate: trainingStartDate,
          trainingTopic: trainingTopic,
          learningOutcome: learningOutcome,
          trainingMethod: trainingMethod,
          trainingInitiator: trainingInitiator,
          skillMatrixMapping:skillMatrixMapping,
          dueDate: dueDate,
          status: status,
          selectedRating: selectedRating,
          evidenceURL: evidenceURL,
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
      return this.itTrainings;
    },

    saveTrainings() {
      try {
        localStorage.setItem('itTrainings', JSON.stringify(this.itTrainings));
      } catch (error) {
        console.error('Error saving trainings to localStorage:', error);
      }
    },
    setEvidence(file) {
      this.evidenceURL = file;
    },
    deleteTraining(trainingId) {
      try {
        const trainingIndex = this.itTrainings.findIndex(itTraining => itTraining.id === trainingId);

        if (trainingIndex !== -1) {
          this.itTrainings.splice(trainingIndex, 1);

          this.saveTrainings();

          console.log('Training deleted:', trainingId);
        } else {
          console.error('Training not found:', trainingId);
        }
      } catch (error) {
        console.error('Error deleting training:', error);
      }
    },
  },
});