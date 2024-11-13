import { defineStore } from 'pinia';
import axios from 'axios';

export const useTrainingsStore = defineStore('trainings', {
  state: () => ({
    trainings: [],
    selectedFile: null,
    baseUrl: 'https://infracredit2.pythonanywhere.com/api/v1/training-schedules/',
  }),

  actions: {
  
    async fetchTrainings() {
      try {
        const response = await axios.get(`${this.baseUrl}`);
        
        if (Array.isArray(response.data.data)) {
          this.trainings = response.data.data;
        } else {
          console.error('Error: response.data.data is not an array', response);
          this.trainings = []; 
        }
      } catch (error) {
        console.error('Error fetching trainings:', error);
        this.trainings = [];
      }
    },

    async addTraining(trainingData) {
      try {
        const formData = new FormData();
        Object.keys(trainingData).forEach((key) => {
          if (trainingData[key] !== undefined && trainingData[key] !== null) {
            if (key === 'evidenceURL' && trainingData[key] instanceof File) {
              formData.append(key, trainingData[key], trainingData[key].name);
            } else {
              formData.append(key, trainingData[key]);
            }
          }
        });

        const response = await axios.post(`${this.baseUrl}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Server response:', response);

        if (response.data.data && Array.isArray(response.data.data)) {
          console.log('Training added successfully');
          await this.fetchTrainings();
        } else {
          console.error('Error: response data is not as expected');
        }
      } catch (error) {
        console.error('Error adding training:', error);
      }
    },

    async updateTraining(training) {
  try {
    const trainingIndex = this.trainings.findIndex(d => d.id === training.id);
    if (trainingIndex !== -1) {
      const formData = new FormData();

      // Check if evidenceURL is a file before appending
      if (training.evidenceURL && training.evidenceURL instanceof File) {
        formData.append('evidenceURL', training.evidenceURL);
      } else {
        console.log('No new file provided for evidenceURL, skipping');
      }

      // Loop through training properties and append to formData
      for (const key in training) {
        if (key === 'recordOwner' && training[key]?.userId !== undefined) {
          // Append userId if recordOwner is valid
          formData.append(key, training[key].userId);
        } else if (key === 'createdBy' && training[key] !== null && training[key]?.userId !== undefined) {
          // Append userId if createdBy is valid
          formData.append(key, training[key].userId);
        } else if (key !== 'evidenceURL' && training[key] !== undefined && training[key] !== null) {
          // Append other fields
          formData.append(key, training[key]);
        }
      }

      console.log(formData);

      // Make the PUT request to update training data
      const response = await axios.put(`${this.baseUrl}${training.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update training entry in the store
      this.trainings.splice(trainingIndex, 1, response.data.data);
      console.log('Training successfully updated:', response.data.data);
    } else {
      console.error('Training to update not found:', training.id);
    }
  } catch (error) {
    console.error('Error updating training:', error.response?.data?.data || error);
  }
},


//     async updateTraining(training) {
//   try {
//     const trainingIndex = this.trainings.findIndex(d => d.id === training.id);
//     if (trainingIndex !== -1) {
//       const formData = new FormData();

//       if (training.evidenceURL && training.evidenceURL instanceof File) {
//         formData.append('evidenceURL', training.evidenceURL);
//       } else {
//         console.log('No new file provided for evidenceURL, skipping');
//       }

//       for (const key in training) {
//         if (key === 'recordOwner' && training[key] && training[key].userId !== undefined) {

//           formData.append(key, training[key].userId);
//         } else if (key !== 'evidenceURL' && training[key] !== undefined && training[key] !== null) {
//           formData.append(key, training[key]);
//         }
//       }
      
//       console.log(formData);
      
//       const response = await axios.put(`${this.baseUrl}${training.id}/`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       // Update training entry in the store
//       this.trainings.splice(trainingIndex, 1, response.data.data);
//       console.log('Training successfully updated:', response.data.data);
//     } else {
//       console.error('Training to update not found:', training.id);
//     }
//   } catch (error) {
//     console.error('Error updating training:', error.response?.data.data || error);
//   }
// },

//   async updateTraining(training) {
//   try {
//     const trainingIndex = this.trainings.findIndex(d => d.id === training.id);
//     if (trainingIndex !== -1) {
//       const formData = new FormData();

//       if (training.evidenceURL && training.evidenceURL instanceof File) {
//         formData.append('evidenceURL', training.evidenceURL);
//       } else {
//         console.log('No new file provided for evidenceURL, skipping');
//       }

//       for (const key in training) {
//         if (key !== 'evidenceURL' && training[key] !== undefined && training[key] !== null) {
//           formData.append(key, training[key]);
//         }
//       }
//        console.log(formData);
       
//       const response = await axios.put(`${this.baseUrl}${training.id}/`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       this.trainings.splice(trainingIndex, 1, response.data);
//       console.log('Goal successfully updated:', response.data);
//     } else {
//       console.error('Training to update not found:', training.id);
//     }
//   } catch (error) {
//     console.error('Error updating training:', error.response?.data || error);
//   }
// },

    async deleteTraining(trainingId) {
      try {
        await axios.delete(`${this.baseUrl}/${trainingId}`);
        
        await this.fetchTrainings();
        console.log('Training deleted and trainings refetched.');
      } catch (error) {
        console.error('Error deleting training:', error);
      }
    },
  },
    })
  
// import { defineStore } from 'pinia';
// import { trainingsService } from '../services/trainingsService';

// export const useTrainingsStore = defineStore('trainings', {
//   state: () => ({
//     trainings: [],
//   }),
//   actions: {
//     async fetchTrainings() {
//       this.trainings = await trainingsService.fetchTrainings();
//     },
//     async addTraining(newTraining) {
//       // const addedTraining = await trainingsService.addTraining(newTraining);
//       // this.trainings.push(addedTraining);
//       try {
//         console.log('Sending training data:', newTraining); 
//         const addedTraining = await trainingsService.addTraining(newTraining);

//         if (addedTraining && addedTraining.id) {
//           this.trainings.push(addedTraining);
//           await this.fetchTraining();
//           console.log('Training added successfully:', addedTraining);
//         } else {
//           console.error('Error: Invalid response from server:', addedTraining);
//         }
//       } catch (error) {
//         console.error('Error adding goal:', error.response ? error.response.data : error.message);
//       }
//     },
//     async updateTraining(updatedTraining) {
//       const updated = await trainingsService.updateTraining(updatedTraining);
//       const index = this.trainings.findIndex(training => training.id === updated.id);
//       if (index !== -1) {
//         this.trainings[index] = updated;
//       }
//     },
//     async deleteTraining(trainingId) {
//       await trainingsService.deleteTraining(trainingId);
//       this.trainings = this.trainings.filter(training => training.id !== trainingId);
//     },
//   },
// });



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
