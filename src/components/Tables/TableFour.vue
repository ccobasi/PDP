<script setup>
// import GradeButton from '../GradeButton.vue';
import authService from '../../services/authService';
import { computed, ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router';
import {useTasksStore} from "@/store/tasks"
import emailjs from 'emailjs-com';
import { useUsersStore } from '@/store/users';
import { Modal } from 'bootstrap';

emailjs.init("WxvKMfIDsiWn1QUgM");

const props = defineProps({
  level: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  quarter: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  }
});

 const isUserRoute = computed(() => {
  const route = useRoute();
  return route.path !== '/taskdeliverables';
});

const store = useTasksStore();
const tasks = ref([]); 
const usersStore = useUsersStore()
const deliverableType = 1;
  const taskDescription = ref('')
  const status = ref('')
  const startDate = ref('')
  const endDate = ref('')
  const comment  = ref('')
  const evidence = ref(null)
  const createdBy = ref(null)
  // const lastModifiedBy = ref('')
  const recordOwner = ref(null)
  const selectedItem = ref(null);
// const route = useRoute();
// const taskId = ref(null);
// const taskDetails = ref(null);
const editingTask = ref(null)

const fetchData = async () => {
  try {
    await store.fetchTasks();

    tasks.value = store.tasks;

    console.log('tasks:', tasks.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(async () => {
  await usersStore.fetchUsers();
  await fetchData();
  initializeModal();
  // emailInterval = setInterval(() => {
  //   if (taskStatus.value !== 'Completed') {
  //     sendWeeklyReminder();
  //   } else {
  //     clearInterval(emailInterval);
  //   }
  // }, 7 * 24 * 60 * 60 * 1000); 

  try {
    await store.fetchTasks();
    console.log('Store Tasks:', store.tasks); 

    if (Array.isArray(store.tasks)) {
      tasks.value = store.tasks; 
    } else {
      console.error('Error: store.tasks is not an array');
    }

    await authService.initialize();
    const msalInstance = authService.getMsalInstance();
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length) {
      createdBy.value = accounts[0].email; 
    }
  } catch (error) {
    console.error('Error during initialization or fetching data:', error);
  }

  watch(
    () => store.tasks,
    (newTasks) => {
      if (Array.isArray(newTasks)) {
        tasks.value = newTasks; 
      } else {
        console.error('Error: store.tasks is not an array');
      }
    }
  );

  fetchData();
  console.log('Tasks:', tasks.value);
  watch([() => props.level, () => props.department, () => props.quarter, () => props.year], fetchData);
});

const getStatusColor = (status) => {
  switch (status) {
    case 'Not started':
      return 'background-color: rgb(246, 180, 180); border-radius: 40px; width: 60%; padding: 5px;';
    case 'On-going':
      return 'background-color: rgb(254, 249, 195); border-radius: 40px; width: 80%; padding: 10px;';

    case 'Completed':
      return 'background-color: rgb(220, 252, 231); border-radius: 40px; width: 80%; padding: 10px;';

    
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'Not started':
      return 'background-color: rgb(240, 15, 15); display: inline-block; border-radius: 50%; padding: 5px;';
    case 'On-going':
      return 'background-color: #ffbf1a; display: inline-block; border-radius: 50%; padding: 5px;';

    case 'Completed':
      return 'background-color: #47b65c; display: inline-block; border-radius: 50%; padding: 5px;';
  }
};

const deleteTask = (id) => {
  store.deleteTask(id);
};


const showDeleteConfirmation = (item) => {
  if (confirm(`Are you sure you want to delete task "${item.task}"?`)) {
    deleteTask(item.id);
    selectedItem.value = null;
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0]; 
}

// const taskStatus = ref('Not started'); 
// let emailInterval = null;

// onUnmounted(() => {
//   clearInterval(emailInterval); 
// });

// const sendWeeklyReminder = () => {
//   const templateParams = {
//     task: 'Your task description here',
//     user_name: 'User', 
//     message: 'This is your weekly reminder to complete the task.',
//   };

//   emailjs.send('service_m2mjawc', 'template_1d0qqkb', templateParams, 'YOUR_USER_ID')
//     .then(response => {
//       console.log('Weekly email reminder sent!', response.status, response.text);
//     })
//     .catch(error => {
//       console.error('Error sending weekly reminder:', error);
//     });
// };

const filteredTasks = computed(() => {
  console.log('TableFour Tasks:', tasks.value);

  return tasks.value.filter(item => {
   
    const createdDate = new Date(item.createdDate);
    const itemYear = createdDate.getFullYear();
    const itemMonth = createdDate.getMonth(); 
    const itemQuarter = Math.floor(itemMonth / 3) + 1; 

    console.log(`Extracted Year: ${itemYear}, Month: ${itemMonth}, Quarter: ${itemQuarter}`);

     const matchesYear = !props.year || (itemYear !== null && itemYear === parseInt(props.year));
    const matchesQuarter = !props.quarter || (itemQuarter !== null && itemQuarter === parseInt(props.quarter.slice(-1))); 

    const matchesDepartment = !props.department || 
      (item.recordOwner?.department && item.recordOwner.department.option === props.department);
    
    const matchesLevel = !props.level || (item.recordOwner?.role?.option === props.level);


    console.log("Matching Criteria", {
      item,
      matchesYear,
      matchesQuarter,
      matchesDepartment,
      matchesLevel,
    });

    return matchesYear && matchesQuarter  && matchesDepartment && matchesLevel;
  });
});

const itemsPerPage = 20; 
const currentPage = ref(1);

const paginatedTasks = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredTasks.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => Math.ceil(filteredTasks.value.length / itemsPerPage));

const goToPage = (pageNumber) => {
  if (pageNumber >= 1 && pageNumber <= totalPages.value) {
    currentPage.value = pageNumber;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const editTask = (task) => {
  const createdById = createdBy.value?.id || defaultUser.id
  editingTask.value = { ...task };
  
  deliverableType.value = task.deliverableType;
  taskDescription.value = task.taskDescription;
  status.value = task.status;
  startDate.value = task.startDate;
  endDate.value = task.endDate;
  comment.value = task.comment;
  evidence.value = task.evidence;
  recordOwner.value = task.recordOwner.userId || createdById;
  createdBy.value = task.createdBy.userId;

  document.getElementById('myModal3').style.display = 'block';
  //  const modalElement = document.getElementById('myModal3');
  // const modalInstance = Modal.getOrCreateInstance(modalElement);
  // modalInstance.show();
};

const updateTask = async () => {
  if (editingTask.value) {

    editingTask.value.deliverableType = deliverableType.value;
    editingTask.value.taskDescription = taskDescription.value;
    editingTask.value.status = status.value;
    editingTask.value.startDate = startDate.value;
    editingTask.value.endDate = endDate.value;
    editingTask.value.comment = comment.value;
    editingTask.value.evidence = evidence.value;
    editingTask.value.recordOwner = recordOwner.value;
    editingTask.value.createdBy = createdBy.value;

    await store.modifyGoal(editingTask.value);
    editingTask.value = null;

    document.getElementById('myModal3').style.display = 'none';
  }
};

const currentIndex = ref(0);
const modalInstance = ref(null);
const initializeModal = () => {
  const modalElement = document.getElementById('myModal4');
  modalInstance.value = Modal.getOrCreateInstance(modalElement);
};

const loadTask = (index) => {
  if (index >= 0 && index < tasks.value.length) {
    selectedItem.value = tasks.value[index];
  }
};

const nextTask = () => {
  if (currentIndex.value < tasks.value.length - 1) {
    currentIndex.value++;
    loadTask(currentIndex.value);
  }
};

const prevTask = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    loadTask(currentIndex.value);
  }
};


watch(currentIndex, (newIndex) => {
  loadTask(newIndex);
});

const clickTimeout = ref(null);
const singleClickModal = ref(null);
const doubleClickModal = ref(null);

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
  editTask(item);  
};

const showModal = (modal) => {
  modal.style.display = 'block';
};

const closeModal = (modalRef) => {
  const modal = modalRef === 'singleClickModal' ? singleClickModal.value : doubleClickModal.value;
  modal.style.display = 'none';
};



const usersOptions = computed(() =>
  usersStore.users.map(user => ({
    label: user.userFullName,
    value: user.userId
  }))
);

  const defaultUser = {
    id: 4, 
    username: 'James Bond',
  };
</script>
<template>
  <div class="table-responsive">
    <teleport to="body">
      <form method="post" action="" @submit.prevent="editingTask ? updateTask() : handleSubmit">
        <div class="modal" id="myModal3" tabindex="-1" ref="doubleClickModal">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Tasks/Deliverables Form</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal('doubleClickModal')">X</button>
              </div>

              <div class="modal-body">

                <div class="first">
                  <div class="frame">
                    <h6>Tasks/Deliverables</h6>
                    <textarea v-model="taskDescription" name="training topic" id="" cols="30" rows="10" placeholder="Tasks/Deliverables"></textarea>
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
                <div class="second">
                  <div class="frame">
                    <h6>Start Time</h6>
                    <input type="date" v-model="startDate">
                  </div>
                  <div class="frame">
                    <h6>End Time</h6>
                    <input type="date" v-model="endDate">
                  </div>
                </div>
                <div class="third">
                  <div class="frame">
                    <h6>Comment</h6>
                    <textarea v-model="comment" name="Comment" id="" cols="30" rows="10" placeholder="Comment"></textarea>
                  </div>
                  <div class="frame">
                    <h6>Evidence of Completion</h6>
                    <input type="file" class="form-control" @change="handleFileChange">
                    <h6>Deliverable Type</h6>
                    <input type="text" id="deliverableType" class="form-control" v-model="deliverableType" />
                  </div>
                </div>
                <div class="third">
                  <div class="frame">
                    <h6>Record Owner</h6>
                    <select v-model="recordOwner" class="form-select">
                      <option value="" disabled>Select Record Owner</option>
                      <option v-for="user in usersOptions" :key="user.value" :value="user.value">
                        {{ user.label }}
                      </option>
                    </select>
                  </div>
                  <div class="frame">
                    <h6>Created By</h6>
                    <input type="text" id="createdBy" class="form-control" v-model="createdBy" />
                  </div>

                </div>

              </div>

              <div class="modal-footer mb-3">

                <button type="submit" class="btn btn-success" data-bs-dismiss="modal">{{ editingTask ? 'Update' : 'Submit' }}</button>
              </div>

            </div>
          </div>
        </div>
      </form>
    </teleport>
    <teleport to="body">
      <form method="post">
        <div class="modal" id="myModal4" tabindex="-1">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Tasks/Deliverables Form</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal('singleClickModal')">X</button>
              </div>

              <div class="modal-body">

                <div class="first">
                  <div class="frame">
                    <h6>Tasks/Deliverables</h6>
                    <textarea v-if="selectedItem" v-model="selectedItem.taskDescription" name="training topic" id="" cols="30" rows="10" placeholder="Tasks/Deliverables"></textarea>
                  </div>
                  <div class="frame">
                    <h6>Status</h6>
                    <select v-if="selectedItem" v-model="selectedItem.status" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
                      <option class="opt" selected>Status</option>
                      <option class="opt" value="Completed">Completed</option>
                      <option class="opt" value="On-going">On-going</option>
                      <option class="opt" value="Not started">Not started</option>
                    </select>
                  </div>
                </div>
                <div class="second">
                  <div class="frame">
                    <h6>Start Time</h6>
                    <input type="date" v-if="selectedItem" v-model="selectedItem.startDate">
                  </div>
                  <div class="frame">
                    <h6>End Time</h6>
                    <input type="date" v-if="selectedItem" v-model="selectedItem.endDate">
                  </div>
                </div>
                <div class="third">
                  <div class="frame">
                    <h6>Comment</h6>
                    <textarea v-if="selectedItem" v-model="selectedItem.comment" name="Comment" id="" cols="30" rows="10" placeholder="Comment"></textarea>
                  </div>
                  <div class="frame">
                    <h6>Evidence of Completion</h6>
                    <input type="file" class="form-control" @change="handleFileChange">
                    <h6>Deliverable Type</h6>
                    <input type="text" id="deliverableType" class="form-control" v-model="deliverableType" disabled />
                  </div>
                </div>
                <div class="third">
                  <div class="frame">
                    <h6>Record Owner</h6>
                    <select v-if="selectedItem" v-model="selectedItem.recordOwner" class="form-select" disabled>
                      <option value="" disabled>Select Record Owner</option>
                      <option v-for="user in usersOptions" :key="user.value" :value="user.value">
                        {{ user.label }}
                      </option>
                    </select>
                  </div>
                  <div class="frame">
                    <h6>Created By</h6>
                    <input type="text" v-if="selectedItem" id="createdBy" class="form-control" v-model="selectedItem.createdBy" />
                  </div>

                </div>

              </div>

              <div class="modal-footer mb-3">

                <div class="prev">
                  <button type="button" class="btn btn-secondary" @click="prevTask">Previous</button>
                </div>
                <div class="next">
                  <button type="button" class="btn btn-secondary" @click="nextTask">Next</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </form>
    </teleport>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span class="noshrink"> S/N</span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span> Task/Deliverables </span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span> Status </span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span> Start Time</span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span> End Time</span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>
          <th scope="col">

            <div class="d-flex align-center gap-1">
              <span> Action </span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>

        </tr>
      </thead>
      <tbody>

        <tr v-for="(item, index) in paginatedTasks" :key="index" @click="handleClick(item)" @dblclick="handleDoubleClick(item)">
          <td scope="row">{{ item.id }}</td>
          <td>{{item.taskDescription}}</td>
          <td>
            <p class="status" :style="getStatusColor(item.status)">
              <i class="dot" :style="getStatusIcon(item.status)"></i>
              {{ item.status }}
            </p>
          </td>
          <td>{{ formatDate(item.startDate) }}</td>
          <td>{{ formatDate(item.endDate) }}</td>

          <td>
            <div class="del" v-if="isUserRoute" @click="showDeleteConfirmation(item)">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 456 511.82">
                <path fill="#FD3B3B" d="M48.42 140.13h361.99c17.36 0 29.82 9.78 28.08 28.17l-30.73 317.1c-1.23 13.36-8.99 26.42-25.3 26.42H76.34c-13.63-.73-23.74-9.75-25.09-24.14L20.79 168.99c-1.74-18.38 9.75-28.86 27.63-28.86zM24.49 38.15h136.47V28.1c0-15.94 10.2-28.1 27.02-28.1h81.28c17.3 0 27.65 11.77 27.65 28.01v10.14h138.66c.57 0 1.11.07 1.68.13 10.23.93 18.15 9.02 18.69 19.22.03.79.06 1.39.06 2.17v42.76c0 5.99-4.73 10.89-10.62 11.19-.54 0-1.09.03-1.63.03H11.22c-5.92 0-10.77-4.6-11.19-10.38 0-.72-.03-1.47-.03-2.23v-39.5c0-10.93 4.21-20.71 16.82-23.02 2.53-.45 5.09-.37 7.67-.37zm83.78 208.38c-.51-10.17 8.21-18.83 19.53-19.31 11.31-.49 20.94 7.4 21.45 17.57l8.7 160.62c.51 10.18-8.22 18.84-19.53 19.32-11.32.48-20.94-7.4-21.46-17.57l-8.69-160.63zm201.7-1.74c.51-10.17 10.14-18.06 21.45-17.57 11.32.48 20.04 9.14 19.53 19.31l-8.66 160.63c-.52 10.17-10.14 18.05-21.46 17.57-11.31-.48-20.04-9.14-19.53-19.32l8.67-160.62zm-102.94.87c0-10.23 9.23-18.53 20.58-18.53 11.34 0 20.58 8.3 20.58 18.53v160.63c0 10.23-9.24 18.53-20.58 18.53-11.35 0-20.58-8.3-20.58-18.53V245.66z" />
              </svg>
            </div>
          </td>
        </tr>

      </tbody>
    </table>
    <div class="pagination-controls">
      <button @click="prevPage" :disabled="currentPage === 1" class="pagination-btn">
        Prev
      </button>

      <span v-for="page in totalPages" :key="page">
        <button @click="goToPage(page)" :class="{'active': currentPage === page}" class="pagination-btn">
          {{ page }}
        </button>
      </span>

      <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-btn">
        Next
      </button>
    </div>
  </div>
</template>

<style scoped>
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

thead tr th {
  font-size: 12px;
  font-weight: 600;
  line-height: 14.4px;
  padding: 15px;
}

tbody tr td {
  color: var(--grey-dark, #000);
  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
  padding: 20px 15px;
  cursor: pointer;
}
thead,
tr {
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}
.noshrink {
  display: flex;
  flex-shrink: 0;
}
button:not(:disabled) {
  cursor: pointer;
  background: #47b65c;
  color: #fff;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination-btn {
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination-btn:hover {
  background-color: #007bff;
  color: white;
}

.pagination-btn.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.modal {
  margin-left: 1%;
}
#myModal1 .modal-dialog {
  --bs-modal-width: 1200px;
}
.modal-dialog {
  --bs-modal-width: 900px;
  width: 100%;
  height: 810px;
  margin-left: 14% !important;
  display: inline-flex;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  background: #eee;
  border-radius: 10px;
}

.modal-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  color: var(--Black, #000);
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
}
.modal-body {
  display: flex;
  padding: 20px 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 10px;
  background: #fff;
}
.first,
.second,
.third,
.fourth,
.fifth {
  display: flex;
  gap: 30px;
}
.frame {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
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
}
.frame textarea {
  display: flex;
  width: 390px;
  height: 150px;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.frame textarea::placeholder {
  color: var(--Grey-Dark, #808080);
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}

.frame .form-select {
  width: 390px !important;
  height: 40px;
  color: var(--Grey-Dark, #000);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
  padding: 10px;
  border-radius: 5px;
  border: 1px 0px 0px 0px;
  justify-content: space-between;
  display: flex;
  width: 320px;
  height: 40px;
  align-items: flex-start;
  gap: 20px;
}

input {
  width: 390px !important;
  height: 40px;
  border: 1px solid var(--Grey-Light, #ddd);
  background: var(--White, #fff);
  border-radius: 5px;
  padding: 10px;
}

.modal-footer {
  display: flex;
  height: 60px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;
}
.modal-footer button {
  display: flex;
  padding: 10px 30px;
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
}
.modal-header .btn-close {
  background: transparent;
  color: #808080;
}
button:not(:disabled) {
  cursor: poRoboto;
  background: #47b65c;
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

@media (max-width: 1200px) {
  .modal-dialog {
    width: 700px;
    margin-left: 10%;
  }

  .modal-content {
    width: 100%;
  }

  .frame textarea,
  .frame input,
  .frame .form-select {
    width: 290px !important;
  }
}

@media (max-width: 860px) {
  .modal-dialog {
    width: 700px;
    margin-left: 2%;
  }

  .modal-content {
    width: 100%;
  }

  .frame textarea,
  .frame input,
  .frame .form-select {
    width: 290px !important;
  }
}

@media screen and (max-width: 768px) {
  thead tr th,
  tbody tr td {
    font-size: 7px;
  }
}

@media (max-width: 576px) {
  .modal-title {
    font-size: 16px;
  }
  .modal-dialog {
    width: 300px;
    height: 1100px;
    margin-left: 8%;
  }

  .modal-content {
    width: 100%;
  }

  h3 {
    font-size: 12px;
  }

  .title button {
    font-size: 12px;
  }

  .filters .form-select {
    display: none;
  }

  .first,
  .second,
  .third {
    width: 100%;
    flex-direction: column;
  }

  .frame textarea,
  .frame input,
  .frame .form-select {
    width: 100% !important;
  }
}

@media (max-width: 400px) {
  h3 {
    font-size: 12px;
  }

  .title button {
    font-size: 12px;
    padding: 5px;
  }
}
</style>