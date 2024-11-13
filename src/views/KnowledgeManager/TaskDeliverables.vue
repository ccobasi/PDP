<script setup>
import authService from '../../services/authService';
import TabMenu from '../../components/Tabs/TabMenuTwo.vue';
import TableFour from '../../components/Tables/TableFour.vue';
import { useRoute } from 'vue-router';
import { ref, onMounted, computed, watch} from 'vue'
import {useTasksStore} from "@/store/tasks"
// import html2pdf from 'html2pdf.js';
import emailjs from 'emailjs-com';
import { useUsersStore } from '@/store/users';

emailjs.init("WxvKMfIDsiWn1QUgM");

const usersStore = useUsersStore();
const store = useTasksStore();
const tasks = ref([]);
const deliverableType = 1;
  const taskDescription = ref('')
  const status = ref('')
  const startDate = ref('')
  const endDate = ref('')
  const comment  = ref('')
  const evidence = ref(null)
  const createdBy = ref('')
  const lastModifiedBy = ref('')
  const recordOwner = ref('')
  const selectedValue = ref('')

const selectedQuarter = ref('');
const selectedYear = ref('');
const selectedLevel = ref('');
const selectedDepartment = ref('');


watch([selectedLevel, selectedDepartment, selectedQuarter, selectedYear], handleFilterChange);

function handleFilterChange() {
  console.log('Filter parameters changed:', {
    level: selectedLevel.value,
    department: selectedDepartment.value,
    quarter: selectedQuarter.value,
    year: selectedYear.value,
  });
  
}

 const defaultUser = {
    id: 4, 
    username: 'James Bond',
  };

const addTask = async () => {
  console.log("Checking values before task addition:");
  console.log("DeliverableType:", deliverableType);
  console.log("TaskDescription:", taskDescription.value);
  console.log("Status:", status.value);
  console.log("StartDate:", startDate.value);
  console.log("EndDate:", endDate.value);
  console.log("Comment:", comment.value);
  console.log("Evidence:", evidence.value ? evidence.value || evidence.value.name : null); 
  console.log("CreatedBy:", createdBy.value || defaultUser.id);
  console.log("RecordOwner:", recordOwner.value);

    const taskData = {
      deliverableType,
      taskDescription: taskDescription.value,
      startDate: startDate.value,
      endDate: endDate.value,
      evidence: evidence.value.name, 
      comment: comment.value,
      status: status.value,
      createdBy: createdBy.value || defaultUser.id,
      recordOwner: recordOwner.value,
    };

  console.log('Submitting payload:', taskData);

  try {
    await store.addTask(taskData);
    await fetchData();

 taskDescription.value = '';
        status.value = '';
        startDate.value = '';
        endDate.value = '';
        comment.value = '';
        evidence.value = null;
        createdBy.value = '';
        recordOwner.value = '';

    console.log("Task added");
  } catch (error) {
    console.error("Error adding task:", error);
  }
};


const fetchData = async () => {
  try {
    await store.fetchTasks();

    if (store.tasks.length === 0) {
      console.log('No tasks found');
    } else {
      tasks.value = store.tasks;
      console.log('Tasks:', tasks.value);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    
  }
};

const handleSubmit =  async () => {
  console.log("handleSubmit called");
  await addTask();
  console.log("Task added")
};


onMounted(async() => {
  await usersStore.fetchUsers();
  await fetchData();
  console.log("Fetched Tasks")

   try {
    await authService.initialize();
    const msalInstance = authService.getMsalInstance();
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length) {
      createdBy.value = accounts[0].email; 
      lastModifiedBy.value = accounts[0].email; 
    }
  } catch (error) {
    console.error('Error during MSAL initialization:', error);
  }

});

 

 const onSelectChange = () => {
  // eslint-disable-next-line no-self-assign
  selectedValue.value = selectedValue.value
}
// const tab = null;
 const isUserRoute = computed(() => {
  const route = useRoute();
  return route.path !== '/taskdeliverables';
});

const loading = ref(false);

const handleFileChange = (event) => {
  loading.value = true;
  const file = event.target.files[0];
  if (file) {
    evidence.value = file;
  }
  loading.value = false;
};

const usersOptions = computed(() =>
  usersStore.users.map(user => ({
    label: user.userFullName,
    value: user.userId
  }))
);
createdBy.value = defaultUser.id;
// const userNamesMap = computed(() =>
//   usersStore.users.reduce((map, user) => {
//     map[user.id] = user.name;
//     return map;
//   }, {})
// );
</script>



<template>
  <main class="wrapper">
    <TabMenu />

    <div class="filters d-flex gap-2 mt-2">
      <select class="form-select" v-model="selectedLevel" @change="handleFilterChange">
        <option value="Level">Level</option>
        <option value="Manager">Manager</option>
        <option value="HOD">HOD</option>
        <option value="IT">IT</option>
        <option value="User">User</option>
        <option value="Knowledge Manager">Knowledge Manager</option>
      </select>

      <select class="form-select" v-model="selectedDepartment" @change="handleFilterChange">
        <option value="Department">Department</option>
        <option value="IT">IT</option>
        <option value="Finance">Finance</option>
        <option value="Accounting">Accounting</option>
        <option value="Operation">Operation</option>
        <option value="Customer Service">Customer Service</option>
      </select>

      <select class="form-select" v-model="selectedQuarter" @change="handleFilterChange">
        <option value="">Quarterly</option>
        <option value="Q1">Q1</option>
        <option value="Q2">Q2</option>
        <option value="Q3">Q3</option>
        <option value="Q4">Q4</option>
      </select>

      <select class="form-select" v-model="selectedYear" @change="handleFilterChange">
        <option value="">Year</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
        <option value="2026">2026</option>
        <option value="2027">2027</option>
      </select>
    </div>
    <div class="titles mt-3">
      <!-- <div class="modal" id="myModal1">
        <div class="modal-dialog">
          <div class="modal-content">

            <div class="modal-header">
              <h4 class="modal-title">Tasks/Deliverables</h4>
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
                          <span class="noshrink"> Tasks/Deliverables</span>

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
                          <span class="noshrink"> Start date</span>

                          <span class="d-flex flex-column align-center">
                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                          </span>

                        </div>
                      </th>
                      <th scope="col">
                        <div class="d-flex align-center gap-1">
                          <span class="noshrink"> End Date</span>

                          <span class="d-flex flex-column align-center">
                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                          </span>

                        </div>
                      </th>
                      <th scope="col">
                        <div class="d-flex align-center gap-1">
                          <span class="noshrink"> Comment</span>

                          <span class="d-flex flex-column align-center">
                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                          </span>

                        </div>
                      </th>
                      <th scope="col">
                        <div class="d-flex align-center gap-1">
                          <span class="noshrink"> Evidence of Completion </span>

                          <span class="d-flex flex-column align-center">
                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                          </span>

                        </div>
                      </th>

                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in paginatedTasks" :key="index" @click="selectItem(item)">
                      <td>{{item.id}}</td>
                      <td>{{item.taskDescription}}</td>
                      <td>{{item.status}}</td>
                      <td>{{item.startDate}}</td>
                      <td>{{item.endDate}}</td>
                      <td>{{item.comment}}</td>
                      <td>{{item.evidence}}</td>

                    </tr>
                  </tbody>
                </table>

              </div>
            </div>

          </div>
        </div>
      </div> -->

      <button class="view" data-bs-toggle="modal" data-bs-target="#myModal1" type="button">View All</button>
    </div>
    <form method="post" action="" @submit.prevent="handleSubmit">
      <div class="modal" id="myModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Tasks/Deliverables Form</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">X</button>
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

              <button type="submit" class="btn btn-success" data-bs-dismiss="modal" @click="$router.push('/km/taskdeliverables')">Submit Request</button>
            </div>

          </div>
        </div>
      </div>
    </form>

    <div class="task mt-5">
      <div class="header">
        <div class="title mb-4">
          <h3>Task Deliverables</h3>
          <button data-bs-toggle="modal" data-bs-target="#myModal" type="button" v-if="isUserRoute">Add Task/Deliverables</button>

        </div>

        <div class="lines"></div>
      </div>
      <TableFour :level="selectedLevel" :department="selectedDepartment" :quarter="selectedQuarter" :year="selectedYear" />
    </div>
  </main>
</template>

<style scoped>
main {
  height: 1200px;
}

.filters .form-select {
  width: 100px;
  border-radius: 10px;
  font-size: 14px;
  color: #000;
}

.title h3 {
  font-family: "Roboto", sans-serif;
}
.titles {
  display: flex;
  justify-content: space-between;
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
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.full {
  width: 1080px;
}
.header {
  display: flex;
  flex-direction: column;
  align-self: stretch;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
}
.title button {
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
.lines {
  width: 100%;
  height: 1px;
  background: #808080;
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
