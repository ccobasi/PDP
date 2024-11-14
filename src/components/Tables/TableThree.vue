<script setup>
    import { ref, computed, onMounted, watch } from 'vue';
    import {useTrainingsStore} from "@/store/trainings"
    // import html2pdf from 'html2pdf.js';
    import { Modal } from 'bootstrap';
    import { useUsersStore } from '@/store/users';
    import authService from '../../services/authService';
  
const store = useTrainingsStore();
const trainings = ref([]);
const editingTraining = ref(null);
const usersStore = useUsersStore();
  const trainingStartDate = ref('')
  const trainingTopic = ref('')
  const learningOutcome = ref('')
  const trainingMethod = ref('')
  const trainingInitiator  = ref('')
  const skillMatrixMapping = ref('')
  const dueDate = ref('')
  const status = ref('')
  const rating = ref(null)
  const evidenceURL = ref(null)
  // const recordOwner = ref('')
const department = ref({ id: 3, name: 'Knowledge Management' });
const recordOwner = ref(null)
  const createdBy = ref(null)
  const lastModifiedBy = ref(null)
const selectedItem = ref(null);

const fetchData = async () => {
  try {
    await store.fetchTrainings();

    trainings.value = store.trainings;

    console.log('Trainings:', trainings.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(async () => {
  await usersStore.fetchUsers();
  initializeModal();
  await fetchData();

  try {
    await authService.initialize();
    const msalInstance = authService.getMsalInstance();
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length) {
      createdBy.value = accounts[0].email; 
      lastModifiedBy.value = accounts[0].email; 
      recordOwner.value = accounts[0].email; 
    }
  } catch (error) {
    console.error('Error during MSAL initialization:', error);
  }


});

const usersOptions = computed(() =>
  usersStore.users.map(user => ({
    label: user.userFullName,
    value: user.userId
  }))
);

const userNamesMap = computed(() =>
  usersStore.users.reduce((map, user) => {
    map[user.id] = user.name;
    return map;
  }, {})
);

 const defaultUser = {
    id: 4, 
    username: 'James Bond',
  };

const editTraining = (training) => {
  const createdById = createdBy.value?.id || defaultUser.id
  editingTraining.value = { ...training };
  
  trainingStartDate.value = training.trainingStartDate;
  trainingTopic.value = training.trainingTopic;
  learningOutcome.value = training.learningOutcome;
  trainingMethod.value = training.trainingMethod;
  trainingInitiator.value = training.trainingInitiator;
  skillMatrixMapping.value = training.skillMatrixMapping;
  dueDate.value = training.dueDate;
  status.value = training.status;
  rating.value = training.rating;
  evidenceURL.value = training.evidenceURL;
  department.value = training.department;
  createdBy.value = training.createdBy.userId;
  recordOwner.value = training.recordOwner.userId || createdById;
  
  document.getElementById('myModal2').style.display = 'block';
};

const updateTraining = async () => {
  if (editingTraining.value) {
    editingTraining.value.trainingStartDate = trainingStartDate.value;
    editingTraining.value.trainingTopic = trainingTopic.value;
    editingTraining.value.learningOutcome = learningOutcome.value;
    editingTraining.value.trainingMethod = trainingMethod.value;
    editingTraining.value.trainingInitiator = trainingInitiator.value;
    editingTraining.value.skillMatrixMapping = skillMatrixMapping.value;
    editingTraining.value.dueDate = dueDate.value;
    editingTraining.value.status = status.value;
    editingTraining.value.rating = rating.value;
    editingTraining.value.evidenceURL = evidenceURL.value;
    editingTraining.value.department = department.value;
    editingTraining.value.createdBy = createdBy.value;

    await store.updateTraining(editingTraining.value);
    editingTraining.value = null;

    document.getElementById('myModal2').style.display = 'none';

  
  }
};

const itemsPerPage = 10; 
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(trainings.value.length / itemsPerPage));

const paginatedTrainings = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return trainings.value.slice(startIndex, endIndex);
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0]; 
}

const currentIndex = ref(0);

const initializeModal = () => {
  const singleClickModalElement = document.getElementById('myModal4');
  const doubleClickModalElement = document.getElementById('myModal2');

  singleClickModal.value = Modal.getOrCreateInstance(singleClickModalElement);
  doubleClickModal.value = Modal.getOrCreateInstance(doubleClickModalElement);
};

const loadTraining = (index) => {
  if (index >= 0 && index < trainings.value.length) {
    selectedItem.value = trainings.value[index];
  }
};

const nextTraining = () => {
  if (currentIndex.value < trainings.value.length - 1) {
    currentIndex.value++;
    loadTraining(currentIndex.value);
  }
};

const prevTraining = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    loadTraining(currentIndex.value);
  }
};


watch(currentIndex, (newIndex) => {
  loadTraining(newIndex);
});

const clickTimeout = ref(null);
const singleClickModal = ref(null);
const doubleClickModal = ref(null);

const closeModal = (modalRef) => {
  const modal = modalRef === 'singleClickModal' ? singleClickModal.value : doubleClickModal.value;
  modal.style.display = 'none';
};

const showModal = (modalInstance) => {
  if (modalInstance) {
    modalInstance.show(); 
  } else {
    console.error('Modal instance not found.');
  }
};

const handleClick = (item) => {
  if (clickTimeout.value) {
    clearTimeout(clickTimeout.value);
  }
  clickTimeout.value = setTimeout(() => {
    selectedItem.value = item;
    showModal(singleClickModal.value);
  }, 250); 
};

const handleDoubleClick = (item) => {
  if (clickTimeout.value) {
    clearTimeout(clickTimeout.value);
    clickTimeout.value = null;
  }
  selectedItem.value = item;
  showModal(doubleClickModal.value);
  editTraining(item);
};
</script>
<template>
  <main class="wrapper">
    <div class="title">
      <teleport to="body">
        <form method="post" action="" @submit.prevent="editingTraining ? updateTraining() : handleSubmit">
          <div class="modal" id="myModal2" tabindex="-1">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Training Request Form</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal('singleClickModal')"><b></b></button>
                </div>

                <div class="modal-body">

                  <div class="first">
                    <div class="frame">
                      <h6>Month</h6>
                      <input type="day" v-model="trainingStartDate">
                    </div>
                    <div class="frame">
                      <h6>Training Topic</h6>

                      <input type="text" class="form-control inputField" id="trainingTopic" v-model="trainingTopic" placeholder="Digital marketing" />
                    </div>
                  </div>
                  <div class="second mt-3">
                    <div class="frame">
                      <h6>Learning Outcome</h6>

                      <input type="text" class="form-control inputField" id="learningOutcome" v-model="learningOutcome" placeholder="Learning Outcome" />
                    </div>
                    <div class="frame">
                      <h6>Training Method</h6>
                      <select v-model="trainingMethod" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
                        <option selected>Online</option>
                        <option value="Physical">Physical</option>
                        <option value="Online">Online</option>
                      </select>
                    </div>
                  </div>
                  <div class="third mt-3">
                    <div class="frame">
                      <h6>Training Initiator</h6>
                      <select v-model="trainingInitiator" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
                        <option selected>Self</option>
                        <option value="Self">Self</option>
                        <option value="Manager">Manager</option>
                        <option value="Knowledge Mgt">Knowledge Mgt</option>
                      </select>
                    </div>
                    <div class="frame">
                      <h6>Skill Matrix Mapping</h6>
                      <select v-model="skillMatrixMapping" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
                        <option selected>Select</option>
                        <option value="Matrix One">Matrix One</option>
                        <option value="Matrix Two">Matrix Two</option>
                      </select>
                    </div>
                  </div>
                  <div class="fourth mt-3">
                    <div class="frame">
                      <h6>Due Date</h6>
                      <input type="date" v-model="dueDate">
                    </div>
                    <div class="frame">
                      <h6>Status</h6>
                      <select v-model="status" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
                        <option class="opt" selected>Status</option>
                        <option class="opt" value="Completed">Completed</option>
                        <option class="opt" value="On-going">On-going</option>
                        <option class="opt" value="Not started">Not started</option>
                      </select>
                    </div>
                  </div>
                  <div class="fifth mt-3">
                    <div class="frame">
                      <h6>Rating</h6>
                      <div class="rating">
                        <input id="demo-1" type="radio" name="demo" value="1" v-model.number="selectedRating">
                        <label for="demo-1">1 star</label>
                        <input id="demo-2" type="radio" name="demo" value="2" v-model.number="selectedRating">
                        <label for="demo-2">2 stars</label>
                        <input id="demo-3" type="radio" name="demo" value="3" v-model.number="selectedRating">
                        <label for="demo-3">3 stars</label>
                        <input id="demo-4" type="radio" name="demo" value="4" v-model.number="selectedRating">
                        <label for="demo-4">4 stars</label>
                        <input id="demo-5" type="radio" name="demo" value="5" v-model.number="selectedRating">
                        <label for="demo-5">5 stars</label>

                        <div class="stars">
                          <label for="demo-1" aria-label="1 star" title="1 star"></label>
                          <label for="demo-2" aria-label="2 stars" title="2 stars"></label>
                          <label for="demo-3" aria-label="3 stars" title="3 stars"></label>
                          <label for="demo-4" aria-label="4 stars" title="4 stars"></label>
                          <label for="demo-5" aria-label="5 stars" title="5 stars"></label>
                        </div>

                      </div>
                    </div>
                    <div class="frame">
                      <h6>Evidence</h6>
                      <input type="file" class="form-control" @change="handleFileChange">
                    </div>
                  </div>
                  <div class="sixth mt-3">
                    <div class="frame">
                      <h6 class="department">Department</h6>
                      <select class="form-select" aria-label="Default select example" v-on:change="onSelectChange(e)" v-model="department">

                        <option class="opt" value="Administration">Administration</option>
                        <option class="opt" value="Procurement">Procurement</option>
                        <option class="opt" value="Knowledge Management">Knowledge Management</option>
                        <option class="opt" value="Credit Risk Management">Credit Risk Management</option>
                        <option class="opt" value="Information Technology">Information Technology</option>
                      </select>
                    </div>
                    <div class="frame">
                      <h6>Feedback</h6>

                      <textarea v-model="feedback" name="feedback" id="" cols="30" rows="50" placeholder="Feedback"></textarea>
                    </div>
                  </div>
                  <div class="sixth mt-3">
                    <div class="frame">
                      <h6 class="department">Record Owner</h6>
                      <select v-model="recordOwner" class="form-select">
                        <option value="" disabled>Select Record Owner</option>
                        <option v-for="user in usersOptions" :key="user.value" :value="user.value">
                          {{ user.label }}
                        </option>
                      </select>
                    </div>
                    <div class="frame">
                      <h6>Created By</h6>

                      <input type="text" id="createdBy" class="form-control" :value="userNamesMap[createdBy] || defaultUser.id" disabled />
                    </div>
                  </div>
                </div>

                <div class="modal-footer">
                  <button type="submit" data-bs-dismiss="modal">{{ editingTraining ? 'Update' : 'Submit' }}</button>
                </div>
              </div>
            </div>
          </div>

        </form>
      </teleport>

      <teleport to="body">
        <form>
          <div class="modal" id="myModal4" tabindex="-1">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Training Request</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal('singleClickModal')"><b></b></button>
                </div>

                <div class="modal-body">

                  <div class="first">
                    <div class="frame">
                      <h6>Month</h6>
                      <input type="" v-if="selectedItem" v-model="selectedItem.trainingStartDate" disabled>
                    </div>
                    <div class="frame">
                      <h6>Training Topic</h6>

                      <input type="text" class="form-control inputField" id="trainingTopic" v-if="selectedItem" v-model="selectedItem.trainingTopic" placeholder="Digital marketing" disabled />
                    </div>
                  </div>
                  <div class="second mt-3">
                    <div class="frame">
                      <h6>Learning Outcome</h6>

                      <input type="text" class="form-control inputField" id="learningOutcome" v-if="selectedItem" v-model="selectedItem.learningOutcome" placeholder="Learning Outcome" disabled />
                    </div>
                    <div class="frame">
                      <h6>Training Method</h6>
                      <select v-if="selectedItem" v-model="selectedItem.trainingMethod" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example" disabled>
                        <option selected>Online</option>
                        <option value="Physical">Physical</option>
                        <option value="Online">Online</option>
                      </select>
                    </div>
                  </div>
                  <div class="third mt-3">
                    <div class="frame">
                      <h6>Training Initiator</h6>
                      <select v-if="selectedItem" v-model="selectedItem.trainingInitiator" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example" disabled>
                        <option selected>Self</option>
                        <option value="Self">Self</option>
                        <option value="Manager">Manager</option>
                        <option value="Knowledge Mgt">Knowledge Mgt</option>
                      </select>
                    </div>
                    <div class="frame">
                      <h6>Skill Matrix Mapping</h6>
                      <select v-if="selectedItem" v-model="selectedItem.skillMatrixMapping" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example" disabled>
                        <option selected>Select</option>
                        <option value="Matrix One">Matrix One</option>
                        <option value="Matrix Two">Matrix Two</option>
                      </select>
                    </div>
                  </div>
                  <div class="fourth mt-3">
                    <div class="frame">
                      <h6>Due Date</h6>
                      <input type="date" v-if="selectedItem" v-model="selectedItem.dueDate" disabled>
                    </div>
                    <div class="frame">
                      <h6>Status</h6>
                      <select v-if="selectedItem" v-model="selectedItem.status" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example" disabled>
                        <option class="opt" selected>Status</option>
                        <option class="opt" value="Completed">Completed</option>
                        <option class="opt" value="On-going">On-going</option>
                        <option class="opt" value="Not started">Not started</option>
                      </select>
                    </div>
                  </div>
                  <div class="fifth mt-3">
                    <div class="frame">
                      <h6>Rating</h6>
                      <div class="rating">
                        <input v-if="selectedItem" id="demo-1" type="radio" name="demo" value="1" v-model.number="selectedItem.selectedRating" disabled>
                        <label for="demo-1">1 star</label>
                        <input v-if="selectedItem" id="demo-2" type="radio" name="demo" value="2" v-model.number="selectedItem.selectedRating" disabled>
                        <label for="demo-2">2 stars</label>
                        <input v-if="selectedItem" id="demo-3" type="radio" name="demo" value="3" v-model.number="selectedItem.selectedRating" disabled>
                        <label for="demo-3">3 stars</label>
                        <input v-if="selectedItem" id="demo-4" type="radio" name="demo" value="4" v-model.number="selectedItem.selectedRating" disabled>
                        <label for="demo-4">4 stars</label>
                        <input v-if="selectedItem" id="demo-5" type="radio" name="demo" value="5" v-model.number="selectedItem.selectedRating" disabled>
                        <label for="demo-5">5 stars</label>

                        <div class="stars">
                          <label for="demo-1" aria-label="1 star" title="1 star"></label>
                          <label for="demo-2" aria-label="2 stars" title="2 stars"></label>
                          <label for="demo-3" aria-label="3 stars" title="3 stars"></label>
                          <label for="demo-4" aria-label="4 stars" title="4 stars"></label>
                          <label for="demo-5" aria-label="5 stars" title="5 stars"></label>
                        </div>

                      </div>
                    </div>
                    <div class="frame">
                      <h6>Evidence</h6>
                      <input type="file" class="form-control" @change="handleFileChange">
                    </div>
                  </div>
                  <div class="sixth mt-3">
                    <div class="frame">
                      <h6 class="department">Department</h6>
                      <select v-if="selectedItem" class="form-select" aria-label="Default select example" v-on:change="onSelectChange(e)" v-model="selectedItem.department" disabled>

                        <option class="opt" value="Administration">Administration</option>
                        <option class="opt" value="Procurement">Procurement</option>
                        <option class="opt" value="Knowledge Management">Knowledge Management</option>
                        <option class="opt" value="Credit Risk Management">Credit Risk Management</option>
                        <option class="opt" value="Information Technology">Information Technology</option>
                      </select>
                    </div>
                    <div class="frame">
                      <h6>Feedback</h6>

                      <textarea v-if="selectedItem" v-model="selectedItem.feedback" name="feedback" id="" cols="30" rows="50" placeholder="Feedback" readonly></textarea>
                    </div>
                  </div>
                </div>

                <div class="modal-footer">
                  <div class="prev">
                    <button type="button" class="btn btn-secondary" @click="prevTraining">Previous</button>
                  </div>
                  <div class="next">
                    <button type="button" class="btn btn-secondary" @click="nextTraining">Next</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </form>
      </teleport>
      <!-- <div class="modal" id="myModal1">
        <div class="modal-dialog">
          <div class="modal-content">

            <div class="modal-header">
              <h4 class="modal-title">Training Schedule</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal">X</button>
            </div>

            <div class="modal-body">
              <div class="table-responsive d-flex flex-column">
                <v-pagination v-model="currentPage" :length="totalPages"></v-pagination>
                <v-btn @click="downloadPDF">Download as PDF</v-btn>
                <table class="full">
                  <thead>
                    <tr>
                      <th scope="col">
                        <div class="d-flex align-center gap-1">
                          <span class="noshrink">S/N</span>

                          <span class="d-flex flex-column align-center">
                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                          </span>

                        </div>
                      </th>
                      <th scope="col">
                        <div class="d-flex align-center gap-1">
                          <span class="noshrink"> Month</span>

                          <span class="d-flex flex-column align-center">
                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                          </span>

                        </div>
                      </th>
                      <th scope="col">
                        <div class="d-flex align-center gap-1">
                          <span class="noshrink"> Training Topic</span>

                          <span class="d-flex flex-column align-center">
                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                          </span>

                        </div>
                      </th>
                      <th scope="col">
                        <div class="d-flex align-center gap-1">
                          <span class="noshrink"> Learning Outcome</span>

                          <span class="d-flex flex-column align-center">
                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                          </span>

                        </div>
                      </th>
                      <th scope="col">
                        <div class="d-flex align-center gap-1">
                          <span class="noshrink"> Training Method</span>

                          <span class="d-flex flex-column align-center">
                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                          </span>

                        </div>
                      </th>
                      <th scope="col">
                        <div class="d-flex align-center gap-1">
                          <span class="noshrink"> Training Initiator</span>

                          <span class="d-flex flex-column align-center">
                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                          </span>

                        </div>
                      </th>
                      
                      <th scope="col">
                        <div class="d-flex align-center gap-1">
                          <span class="noshrink"> Due Date </span>

                          <span class="d-flex flex-column align-center">
                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                          </span>

                        </div>
                      </th>
                      <th scope="col">
                        <div class="d-flex align-center gap-1">
                          <span class="noshrink"> Status</span>

                          <span class="d-flex flex-column align-center">
                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                          </span>

                        </div>
                      </th>
                      <th scope="col">
                        <div class="d-flex align-center gap-1">
                          <span class="noshrink"> Rating</span>

                          <span class="d-flex flex-column align-center">
                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                          </span>

                        </div>
                      </th>
                      <th scope="col">
                        <div class="d-flex align-center gap-1">
                          <span class="noshrink"> Evidence</span>

                          <span class="d-flex flex-column align-center">
                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                          </span>

                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in paginatedTrainings" :key="index">
                      <td>{{item.id}}</td>
                      <td>{{item.trainingStartDate}}</td>
                      <td>{{item.trainingTopic}}</td>
                      <td>{{item.learningOutcome}}</td>
                      <td>{{item.trainingMethod}}</td>
                      <td>{{item.trainingInitiator}}</td>
                     
                      <td>{{item.dueDate}}</td>
                      <td>{{item.status}}</td>
                      <td>{{item.selectedRating}}</td>
                      <td>{{item.evidenceURL}}</td>
                    </tr>
                  </tbody>
                </table>

              </div>
            </div>

          </div>
        </div>
      </div> -->

      <button class="view mb-2" data-bs-toggle="modal" data-bs-target="#myModal1" type="button">View All</button>
    </div>
    <div class="table-responsive mt-3">

      <table class="table">
        <thead>
          <tr>
            <th scope="col">
              <div class="adjustable-column d-flex align-center gap-1">
                <span class="noshrink" style="width:30px">S/N</span>

              </div>
            </th>
            <th scope="col">
              <div class="adjustable-column d-flex align-center gap-1">
                <span class="noshrink"> Months</span>

              </div>
            </th>
            <th scope="col">
              <div class="adjustable-column d-flex align-center gap-1">
                <span class="noshrink"> Training Topics</span>

              </div>
            </th>
            <th scope="col">
              <div class="adjustable-column d-flex align-center gap-1">
                <span class="noshrink"> Training Methods</span>

              </div>
            </th>
            <th scope="col">
              <div class="adjustable-column d-flex align-center gap-1">
                <span class="noshrink"> Status </span>

              </div>
            </th>

          </tr>
        </thead>
        <tbody>
          <!-- <tr v-for="item in skills" @click="selectItem(item)"> -->
          <!-- <tr v-for="item in trainings" @dblclick="editTraining(item)" :class="{'expanded-row': selectedItem && selectedItem.id === item.id}"> -->
          <tr v-for="(item, index) in paginatedTrainings" :key="index" @click="handleClick(item)" @dblclick="handleDoubleClick(item)">
            <td scope="row" style="width:30px">{{item.id}}</td>
            <td>{{formatDate(item.trainingStartDate)}}</td>
            <td>{{item.trainingTopic}}</td>
            <td>{{item.trainingMethod}}</td>
            <td>{{item.status}}</td>
            <td>

              <!-- <v-icon icon="mdi-delete" class="icon-danger" @click="deleteTraining(item.id)"></v-icon> -->
            </td>
          </tr>
        </tbody>
      </table>

    </div>
    <v-pagination v-model="currentPage" :length="totalPages"></v-pagination>
  </main>
</template>

<style scoped>
.wrapper {
  margin: 0;
  padding: 0;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1040;
}

.modal {
  background-color: rgba(0, 0, 0, 0.5);
  overflow-y: auto;
}

.title {
  display: flex;
  justify-content: left;
  align-items: center;
  align-self: stretch;
}
.view {
  display: flex;
  padding: 10px 30px;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  background: var(--Secondary, #47b65c);

  color: var(--White, #fff);
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.table-responsive {
  width: 100%;
}
.full {
  width: 1200px;
}
table {
  width: 100%;
  table-layout: auto;
  border-collapse: collapse;
}

thead th,
tbody td {
  text-align: left;
  white-space: nowrap;
  padding: 15px;
  vertical-align: middle;
}

thead th {
  font-size: 12px;
  font-weight: 600;
  background-color: #fff;
}

tbody td {
  font-size: 12px;
  color: #000;
}

thead,
tbody tr {
  border-bottom: 1px solid #ddd;
}

.adjustable-column {
  min-width: 150px;
  max-width: 300px;
  white-space: normal;
  gap: 0;
}

.expanded-row {
  height: 70px;
}

.noshrink {
  width: 60px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  height: 30px !important;
}

#myModal2 .modal-dialog {
  --bs-modal-width: 960px;
  width: 960px;
  height: 900px;
  margin-left: 8%;
  display: inline-flex;
  padding: 30px;
  border-radius: 10px;
  background: #eee;
}

.modal-dialog {
  --bs-modal-width: 960px;
  width: 960px;
  height: 910px;
  margin-left: 8%;
  display: inline-flex;
  padding: 30px;
  border-radius: 10px;
  background: #eee;
}

.modal-body {
  gap: 20px;
  background: #fff;
  margin-top: 0px !important;
}

.modal-content {
  width: 900px;
  height: 850px;
  z-index: 1;
  --bs-backdrop-zindex: 1;
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 10px;
}

.first,
.second,
.third,
.fourth,
.fifth,
.sixth {
  display: flex;
  gap: 30px;
}
.frame {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}
.frame h6 {
  color: var(--Black, #000);
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.frame input {
  width: 390px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
}
.frame textarea {
  display: flex;
  width: 390px;
  height: 100px;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 5px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--White, #fff);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
}
.frame textarea::placeholder {
  color: var(--Grey-Dark, #808080);
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}

.form-select {
  width: 390px;
  height: 40px;
  color: var(--Grey-Dark, #808080);
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}

.modal-footer {
  display: flex;
  height: 40px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;
}
.modal-footer .btn {
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  color: #fff;
}

#myModal4 .area,
#myModal4 textarea {
  width: 390px;
  height: 110px;
  border-radius: 5px;
  background: #eeeeee;
  padding: 10px;
}

#myModal4 p {
  width: 390px;
  height: 40px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
}

#myModal4 .modal-footer {
  display: flex;
  width: 100%;
  margin: 0;
  gap: 20px;
}

.prev {
  float: left;
  width: 370px;
  height: 110px;
  display: flex;
  justify-content: start;
}

.next {
  float: right;
  width: 370px;
  height: 110px;
  display: flex;
  justify-content: end;
}

.form-selects {
  display: flex;
  width: 320px;
  height: 40px;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--White, #fff);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
}
.types button {
  display: flex;
  padding: 10px 50px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  color: #fff;
  margin-top: 10px;
}

.rating {
  width: 390px;
}
.frame button {
  width: 145px;
  display: flex;
  padding: 5px 20px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  color: #fff;
  margin-top: 10px;
}
.modal-footer button,
.one button {
  display: flex;
  padding: 8px 30px;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  color: var(--White, #fff);
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
  border: none;
}
.rating input[type="radio"]:not(:nth-of-type(0)) {
  /* hide visually */
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
.rating [type="radio"]:not(:nth-of-type(0)) + label {
  display: none;
}

label[for]:hover {
  cursor: pointer;
}

.rating .stars label:before {
  content: "★";
  font-size: 24px;
}

.stars label {
  color: lightgray;
}

.stars label:hover {
  text-shadow: 0 0 1px #000;
}

.rating
  [type="radio"]:nth-of-type(1):checked
  ~ .stars
  label:nth-of-type(-n + 1),
.rating
  [type="radio"]:nth-of-type(2):checked
  ~ .stars
  label:nth-of-type(-n + 2),
.rating
  [type="radio"]:nth-of-type(3):checked
  ~ .stars
  label:nth-of-type(-n + 3),
.rating
  [type="radio"]:nth-of-type(4):checked
  ~ .stars
  label:nth-of-type(-n + 4),
.rating
  [type="radio"]:nth-of-type(5):checked
  ~ .stars
  label:nth-of-type(-n + 5) {
  color: orange;
}

.rating [type="radio"]:nth-of-type(1):focus ~ .stars label:nth-of-type(1),
.rating [type="radio"]:nth-of-type(2):focus ~ .stars label:nth-of-type(2),
.rating [type="radio"]:nth-of-type(3):focus ~ .stars label:nth-of-type(3),
.rating [type="radio"]:nth-of-type(4):focus ~ .stars label:nth-of-type(4),
.rating [type="radio"]:nth-of-type(5):focus ~ .stars label:nth-of-type(5) {
  color: darkorange;
}

.icon-warning {
  color: orange;
}

.icon-danger {
  color: red;
}
.filter {
  margin-bottom: 20px;
}

.filter label {
  margin-right: 10px;
}

.filter select {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 1rem;
}

@media (max-width: 350px) {
  .frame input,
  .frame .form-select,
  .frame textarea {
    width: 150px !important;
  }

  #myModal4 textarea {
    width: 150 !important;
    height: 110px;
  }
}

@media (max-width: 400px) {
  .frame input,
  .frame .form-select,
  .frame textarea {
    width: 210px !important;
  }

  #myModal4 .modal-dialog {
    width: 95%;
    height: 1450px;
    margin-left: 5%;
  }

  .modal-content {
    height: 1400px;
  }

  .modal-body {
    width: 100%;
  }

  #myModal4 .area,
  #myModal4 textarea {
    width: 100%;
    height: 110px;
  }

  .first,
  .second,
  .third,
  .fourth,
  .fifth,
  .sixth {
    flex-direction: column;
  }

  #myModal4 .modal-footer {
    width: 100%;
    margin: 0;
    gap: 5px;
    flex-direction: column;
  }

  .prev {
    width: 80px !important;
    height: 110px;
    font-size: 8px;
  }

  .next {
    width: 100px;
    height: 110px;
  }
}

@media (max-width: 576px) {
  .frame input,
  .frame textarea {
    width: 210px !important;
  }

  table {
    width: 100%;
    table-layout: fixed;
  }

  thead th,
  tbody td {
    font-size: 10px;
    padding: 8px;
    text-align: center;
  }

  .adjustable-column {
    min-width: 100px;
    max-width: 150px;
    white-space: normal;
  }

  .noshrink {
    width: 40px;
  }

  /* Stack table rows on small screens */
  tbody td {
    display: block;
    text-align: right;
    padding-left: 50%;
    position: relative;
  }

  tbody td:before {
    content: attr(data-label);
    position: absolute;
    left: 0;
    width: 45%;
    padding-left: 15px;
    font-weight: bold;
    text-align: left;
    font-size: 10px;
  }

  #myModal4 .modal-dialog {
    width: 90%;
    height: 1450px;
    margin-left: 5%;
  }

  .modal-content {
    height: 1400px;
  }

  .modal-body {
    width: 100%;
  }

  #myModal4 .area,
  #myModal4 textarea {
    width: 100%;
    height: 110px;
  }

  .first,
  .second,
  .third,
  .fourth,
  .fifth,
  .sixth {
    flex-direction: column;
  }

  .frame input {
    width: 200px;
  }

  .frame .form-select {
    width: 200px;
  }

  #myModal4 .modal-footer {
    width: 100%;
    margin: 0;
    gap: 20px;
  }

  .prev {
    width: 100px;
    height: 110px;
  }

  .next {
    width: 100px;
    height: 110px;
  }
}

@media (max-width: 768px) {
  #myModal4 .modal-dialog {
    width: 90%;
    margin-left: 5%;
  }

  .modal-body {
    width: 100%;
  }

  #myModal4 .area,
  #myModal4 textarea {
    width: 260px;
    height: 110px;
  }

  .frame input {
    width: 260px;
  }

  .frame .form-select,
  .frame .rating {
    width: 270px;
  }

  #myModal4 .modal-footer {
    width: 100%;
    margin: 0;
    gap: 20px;
  }

  .prev {
    width: 250px;
    height: 110px;
  }

  .next {
    width: 250px;
    height: 110px;
  }

  .table thead th {
    font-size: 10px;
    padding: 15px 5px;
    width: 120px;
  }

  .table tbody td {
    font-size: 10px;
    padding: 15px 5px;
    width: auto;
  }

  .adjustable-column[data-v-5ac5b9c5] {
    min-width: 30px;
    max-width: 150px;
    white-space: nowrap;
  }

  .noshrink {
    font-size: 13px;
  }

  .table-responsive {
    width: 850px;
    overflow-x: auto;
    margin: 0;
  }

  .pagination-btn {
    font-size: 14px;
    padding: 10px 15px;
  }
}

@media (max-width: 820px) {
  .frame input {
    width: 240px !important;
  }

  .frame .form-select,
  .frame .rating {
    width: 240px !important;
  }

  #myModal4 textarea {
    width: 240px !important;
    height: 110px;
  }

  .prev {
    width: 240px !important;
    height: 110px;
  }

  .next {
    width: 240px !important;
    height: 110px;
  }
}

@media screen and (max-width: 992px) {
  .modal-dialog {
    width: 800px;
    margin-top: 10%;
    margin-left: 60px;
  }

  .modal-content {
    width: 100%;
  }

  .modal-body {
    width: 100%;
  }

  .form-select {
    width: 270px !important;
  }

  .frame textarea {
    width: 270px;
  }

  .frame input,
  .frame .rating {
    width: 270px;
  }

  #myModal4 textarea {
    width: 270px;
    height: 110px;
  }

  #myModal4 .modal-footer {
    width: 100%;
    margin: 0;
    gap: 20px;
  }

  .prev {
    width: 270px;
    height: 110px;
  }

  .next {
    width: 270px;
    height: 110px;
  }

  .table-responsive {
    width: 100%;
  }

  table {
    width: 800px;
    overflow-x: hidden;
  }

  thead tr th {
    min-width: 100px;
    padding: 10px 5px;
    gap: 0;
  }

  tbody tr td {
    min-width: 100px;
    padding: 10px 5px;
    gap: 0;
  }

  thead,
  tr {
    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
  }

  tbody tr {
    height: 50px;
    overflow: hidden;
  }
}
</style>