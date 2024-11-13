<script setup>
import authService from '../../services/authService';
import { useMentorshipStore } from "@/store/mentorship";
// import html2pdf from 'html2pdf.js';
import { ref, computed, onMounted, watch } from 'vue';
import { Modal } from 'bootstrap';
import { useUsersStore } from '@/store/users';

const store = useMentorshipStore();
const mentorships = ref([]);
const usersStore = useUsersStore();
const editingMentorship = ref(null);
// const selectedItem = ref(null);
  const month = ref('')
  const financialYear = ref('')
  const mentor = ref('')
  const goals = ref('')
  const actionPlans  = ref('')
  const targetCompletionDate = ref('')
  const actualCompletionDate = ref('')
  const progressMetrics = ref('')
  const feedback = ref('')
  const evidence = ref(null)
  const createdBy = ref(null)
  const status = ref('')
  const lastModifiedBy = ref(null)
  const selectedItem = ref(null);
  const recordOwner = ref(null)

const fetchData = async () => {
  try {
    await store.fetchMentorshipPlans();
    mentorships.value = store.mentorships;
    console.log('Mentorships:', store.mentorships);
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
      createdBy.value = accounts[0].username; 
      lastModifiedBy.value = accounts[0].username; 
    } else {
      createdBy.value = defaultUser;
      lastModifiedBy.value = defaultUser;
    }
  } catch (error) {
    console.error('Error during MSAL initialization:', error);
    createdBy.value = defaultUser;
    lastModifiedBy.value = defaultUser;
  }
});


const handleSubmit = () => {
  
  console.log("Mentorship added")
};

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

const editMentorship = (mentorship) => {
  const createdById = createdBy.value?.id || defaultUser.id
  editingMentorship.value = { ...mentorship };
  
  financialYear.value = mentorship.financialYear;
  month.value = mentorship.month;
  mentor.value = mentorship.mentor;
  goals.value = mentorship.goals;
  actionPlans.value = mentorship.actionPlans;
  targetCompletionDate.value = mentorship.targetCompletionDate;
  actualCompletionDate.value = mentorship.actualCompletionDate
  progressMetrics.value = mentorship.progressMetrics;
  feedback.value = mentorship.feedback;
  evidence.value = mentorship.evidence;
  createdBy.value = createdById;
  status.value = mentorship.status;
  recordOwner.value = mentorship.recordOwner.userId || createdById;
  
  console.log('Opening modal for editing:', mentorship);
  document.getElementById('myModal3').style.display = 'block';
  console.log('Modal opened');

};

const updateMentorship = async () => {
  const createdById = createdBy.value?.id || defaultUser.id
  if (editingMentorship.value) {
    editingMentorship.value.financialYear = financialYear.value;
    editingMentorship.value.month = month.value;
    editingMentorship.value.mentor = mentor.value;
    editingMentorship.value.goals = goals.value;
    editingMentorship.value.actionPlans = actionPlans.value;
    editingMentorship.value.targetCompletionDate = targetCompletionDate.value ? new Date(targetCompletionDate.value).toISOString() : null;
    editingMentorship.value.actualCompletionDate = actualCompletionDate.value ? new Date(actualCompletionDate.value).toISOString() : null;
    editingMentorship.value.progressMetrics = progressMetrics.value;
    editingMentorship.value.feedback = feedback.value;
    editingMentorship.value.evidence = evidence.value || '';
    editingMentorship.value.createdBy = createdById;
    editingMentorship.value.status = status.value;
    editingMentorship.value.recordOwner = recordOwner.value;

    // Log the payload
    console.log('Payload:', editingMentorship.value);

    await store.updateMentorship(editingMentorship.value);
    editingMentorship.value = null;

    document.getElementById('myModal3').style.display = 'none';

  }
};


// const deleteMentorship = async (mentorshipId) => {
//   if (confirm('Are you sure you want to delete this mentorship plan?')) {
//     await store.deleteMentorship(mentorshipId);
//   }
// };

const loading = ref(false);
const handleFileChange = async (event) => {
  loading.value = true;
  const file = event.target.files[0];
  evidence.value = file.name;

  loading.value = false;
};

const itemsPerPage = 20; 
const currentPage = ref(1);

const onSelectChange = (event) => {
  console.log('Selected value:', event.target.value);
};


const selectedStatus = ref('');

const filteredMentorship = computed(() => {
  if (selectedStatus.value === '') {
    return mentorships.value;
  } else {
    return mentorships.value.filter(mentorship => mentorship.status === selectedStatus.value);
  }
});

const paginatedFilteredMentorship = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredMentorship.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => Math.ceil(filteredMentorship.value.length / itemsPerPage));

const goToPage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const currentIndex = ref(0);

const loadMentorship = (index) => {
  if (index >= 0 && index < mentorships.value.length) {
    selectedItem.value = mentorships.value[index];
  }
};

const initializeModal = () => {
  const singleClickModalElement = document.getElementById('myModal4');
  const doubleClickModalElement = document.getElementById('myModal3');

  if (singleClickModalElement) {
    singleClickModal.value = Modal.getOrCreateInstance(singleClickModalElement);
  } else {
    console.error('Modal element "myModal4" not found.');
  }

  if (doubleClickModalElement) {
    doubleClickModal.value = Modal.getOrCreateInstance(doubleClickModalElement);
  } else {
    console.error('Modal element "myModal3" not found.');
  }
};

const nextMentorship = () => {
  if (currentIndex.value < mentorships.value.length - 1) {
    currentIndex.value++;
    loadMentorship(currentIndex.value);
  }
};

const prevMentorship = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    loadMentorship(currentIndex.value);
  }
};


watch(currentIndex, (newIndex) => {
  loadMentorship(newIndex);
});

const clickTimeout = ref(null);
const singleClickModal = ref(null);
const doubleClickModal = ref(null);

const closeModal = (modalRef) => {
  const modalInstance = modalRef === 'singleClickModal' ? singleClickModal.value : doubleClickModal.value;
  modalInstance.hide(); 
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
  editMentorship(item);
};

  const defaultUser = {
    id: 4, 
    username: 'James Bond',
  };
</script>

<template>
  <teleport to="body">
    <form method="post" @submit.prevent="editMentorship ? updateMentorship() : handleSubmit">
      <div class="modal" id="myModal3" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Mentorship Request Form</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal('doubleClickModal')"><b></b></button>
            </div>

            <div class="modal-body">

              <div class="first">
                <div class="frame">
                  <h6>Financial Year</h6>
                  <select v-model="financialYear" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
                    <option selected>Select Financial Year</option>
                    <option value="2023">FY23</option>
                    <option value="2024">FY24</option>
                    <option value="2025">FY25</option>
                    <option value="2026">FY26</option>
                  </select>
                </div>
                <div class="frame">
                  <h6>Month</h6>
                  <div class="fallbackDatePicker">
                    <div>
                      <span>
                        <select class="form-select" v-model="month" id="month" name="month">
                          <option selected>January</option>
                          <option>February</option>
                          <option>March</option>
                          <option>April</option>
                          <option>May</option>
                          <option>June</option>
                          <option>July</option>
                          <option>August</option>
                          <option>September</option>
                          <option>October</option>
                          <option>November</option>
                          <option>December</option>
                        </select>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="second">
                <div class="frame">
                  <h6>Mentors</h6>
                  <select v-model="mentor" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
                    <option selected>Select Mentor</option>
                    <option value="Isaac">Isaac</option>
                    <option value="Chido">Chido</option>
                    <option value="Lola">Lola</option>
                  </select>
                </div>
                <div class="frame">
                  <h6>Goals</h6>
                  <textarea v-model="goals" name="Goals" id="" cols="30" rows="10" placeholder="Goals"></textarea>
                </div>
              </div>

              <div class="third">
                <div class="frame">
                  <h6>Action Plan</h6>
                  <textarea v-model="actionPlans" name="Action Plan" id="" cols="30" rows="10" placeholder="Action Plan"></textarea>

                </div>
                <div class="frame">
                  <h6>Timeline</h6>
                  <input v-model="targetCompletionDate" type="date">
                </div>
              </div>

              <div class="fourth">
                <div class="frame">
                  <h6>Status</h6>
                  <select v-model="status" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
                    <option selected>Select Status</option>
                    <option value="Not started">Not started</option>
                    <option value="On-going">On-going</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div class="frame">
                  <h6>Evidence</h6>
                  <input type="file" class="form-control" @change="handleFileChange" accept="image">
                </div>

              </div>

              <div class="fifth">
                <div class="frame">
                  <h6>Progress Metrics</h6>
                  <textarea v-model="progressMetrics" name="Progress Metrics" id="" cols="30" rows="10" placeholder="Progress Metrics"></textarea>
                </div>
                <div class="frame">
                  <h6>Feedback</h6>
                  <textarea v-model="feedback" name="Feedback" id="" cols="30" rows="10" placeholder="Feedback"></textarea>
                </div>
              </div>
              <div class="fifth">
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
                  <input type="text" id="createdBy" class="form-control" :value="createdBy?.value?.id ? userNamesMap[createdBy.value.id] : userNamesMap[defaultUser.id]" disabled />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" @click="closeModal('doubleClickModal')" class="btn btn-success">{{ editingMentorship ? 'Update' : 'Submit' }}</button>
            </div>
          </div>
        </div>

        <div v-if="showExpandModal" class="modal-overlay">
          <div class="expanded-modal-content">
            <h5>{{ expandTitle }}</h5>
            <textarea v-model="expandValue" class="form-control" rows="10"></textarea>
            <button @click="saveExpandedText" class="btn btn-success mt-2">Save</button>
          </div>
        </div>
      </div>

    </form>
  </teleport>

  <teleport to="body">
    <form>
      <div class="modal" id="myModal4" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Mentorship Request</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal('singleClickModal')"><b></b></button>
            </div>

            <div class="modal-body">

              <div class="first">
                <div class="frame">
                  <h6>Financial Year</h6>
                  <select v-if="selectedItem" v-model="selectedItem.financialYear" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example" disabled>
                    <option selected>Select Financial Year</option>
                    <option value="2023">FY23</option>
                    <option value="2024">FY24</option>
                    <option value="2025">FY25</option>
                    <option value="2026">FY26</option>
                  </select>
                </div>
                <div class="frame">
                  <h6>Month</h6>
                  <div class="fallbackDatePicker">
                    <div>
                      <span>
                        <select v-if="selectedItem" class="form-select" v-model="selectedItem.month" id="month" name="month" disabled>
                          <option selected>January</option>
                          <option>February</option>
                          <option>March</option>
                          <option>April</option>
                          <option>May</option>
                          <option>June</option>
                          <option>July</option>
                          <option>August</option>
                          <option>September</option>
                          <option>October</option>
                          <option>November</option>
                          <option>December</option>
                        </select>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="second">
                <div class="frame">
                  <h6>Mentors</h6>
                  <select v-if="selectedItem" v-model="selectedItem.mentor" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example" disabled>
                    <option selected>Select Mentor</option>
                    <option value="Isaac">Isaac</option>
                    <option value="Chido">Chido</option>
                    <option value="Lola">Lola</option>
                  </select>
                </div>
                <div class="frame">
                  <h6>Goals</h6>
                  <textarea v-if="selectedItem" v-model="selectedItem.goals" name="Goals" id="" cols="30" rows="10" placeholder="Goals" readonly></textarea>
                </div>
              </div>

              <div class="third">
                <div class="frame">
                  <h6>Action Plan</h6>
                  <textarea v-if="selectedItem" v-model="selectedItem.actionPlans" name="Action Plan" id="" cols="30" rows="10" placeholder="Action Plan" readonly></textarea>

                </div>
                <div class="frame">
                  <h6>Timeline</h6>
                  <input v-if="selectedItem" v-model="selectedItem.targetCompletionDate" type="date" disabled>
                </div>
              </div>

              <div class="fourth">
                <div class="frame">
                  <h6>Status</h6>
                  <select v-if="selectedItem" v-model="selectedItem.status" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example" disabled>
                    <option selected>Select Status</option>
                    <option value="Not started">Not started</option>
                    <option value="On-going">On-going</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div class="frame">
                  <h6>Evidence</h6>
                  <input type="file" class="form-control" @change="handleFileChange" disabled>
                </div>

              </div>

              <div class="fifth">
                <div class="frame">
                  <h6>Progress Metrics</h6>
                  <textarea v-if="selectedItem" v-model="selectedItem.progressMetrics" name="Progress Metrics" id="" cols="30" rows="10" placeholder="Progress Metrics" readonly></textarea>
                </div>
                <div class="frame">
                  <h6>Feedback</h6>
                  <textarea v-if="selectedItem" v-model="selectedItem.feedback" name="Feedback" id="" cols="30" rows="10" placeholder="Feedback" readonly></textarea>
                </div>
              </div>
              <div class="fifth">
                <div class="frame">
                  <h6>CreatedBy</h6>
                  <input type="text" v-if="selectedItem" v-model="selectedItem.createdBy" placeholder="Created By" disabled>
                </div>
                <div class="frame">
                  <h6>Modified By</h6>
                  <input type="text" v-if="selectedItem" v-model="selectedItem.lastModifiedBy" placeholder="Last Modified By" disabled>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <div class="prev">
                <button type="button" class="btn btn-secondary" @click="prevMentorship">Previous</button>
              </div>
              <div class="next">
                <button type="button" class="btn btn-secondary" @click="nextMentorship">Next</button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="showExpandModal" class="modal-overlay">
          <div class="expanded-modal-content">
            <h5>{{ expandTitle }}</h5>
            <textarea v-model="expandValue" class="form-control" rows="10"></textarea>
            <button @click="saveExpandedText" class="btn btn-success mt-2">Save</button>
          </div>
        </div>
      </div>

    </form>
  </teleport>
  <div class="table-responsive">

    <div class="filter mt-3 d-flex">
      <label for="statusFilter">Filter by Status: </label>
      <select id="statusFilter" v-model="selectedStatus" class="form-select mt-1" aria-label="Default select example">
        <option value="">All</option>
        <option value="Completed">Completed</option>
        <option value="On-going">On-going</option>
        <option value="Not started">Not started</option>
      </select>
    </div>
    <div class="table-responsive d-flex mt-3">

      <table class="table">
        <thead>
          <tr>
            <th scope="col">S/N</th>
            <th scope="col">Financial Year</th>
            <th scope="col">Month</th>
            <th scope="col">Mentor</th>
            <th scope="col">Goals</th>
            <th scope="col">Action Plan</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedFilteredMentorship" :key="index" @click="handleClick(item)" @dblclick="handleDoubleClick(item)">

            <td>{{item.id}}</td>
            <td>{{item.financialYear}}</td>
            <td>{{item.month}}</td>
            <td>{{item.mentor}}</td>
            <td>{{item.goals}}</td>
            <td>{{item.actionPlans}}</td>
            <td>
              <!-- <v-icon icon="mdi-delete" color="red" @click="deleteMentorship(item.id)" /> -->
            </td>
          </tr>
        </tbody>
      </table>

    </div>

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

.modal {
  background-color: rgba(0, 0, 0, 0.5);
  overflow-y: auto;
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
table {
  width: 100%;
}
thead tr th {
  font-size: 12px;
  font-weight: 600;
  line-height: 14.4px;
  padding: 15px;
}

tbody tr td {
  color: var(--grey-dark, #000);
  /* Caption */
  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
  padding: 15px;
}

thead,
tr {
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}
tbody tr {
  height: 50px;
  overflow: hidden;
}
.wrap {
  width: 100%;
}

.v-btn button {
  background: #47b65c;
}

.modal-footer {
  display: flex;
  height: 50px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;
  padding: 0 20px 20px 0;
}

.modal-footer button {
  width: 110px;
  height: 40px;
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  color: #fff;
}

#myModal4 .modal-dialog {
  height: 920px;
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

.modal-dialog {
  --bs-modal-width: 900px;
  width: 900px;
  height: 930px;
  margin-left: 11%;
  display: inline-flex;
  padding: 30px;
  border-radius: 10px;
  background: #eee;
}

.modal-footer {
  display: flex;
  height: 50px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;
  padding: 0 20px 20px 0;
}

.modal-footer button {
  width: 110px;
  height: 40px;
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  color: #fff;
}

#statusFilter {
  width: 120px;
  height: 30px;
  color: var(--Grey-Dark, #000);
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}
.first,
.second,
.third,
.fourth,
.fifth {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
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
  border: 1px solid var(--Grey-Dark, #ddd);
  padding: 10px;
  border-radius: 5px;
}
.frame textarea {
  display: flex;
  width: 390px;
  height: 90px;
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
.modal-footer {
  display: flex;
  height: 60px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;
}

.wright textarea {
  width: 320px;
  height: 70px;
}
.lefts input {
  width: 320px;
  height: 40px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--White, #fff);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
}
.form-select {
  display: flex;
  width: 390px;
  height: 40px;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
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

.filter {
  margin-bottom: 20px;
}

.filter label {
  margin-right: 10px;
}

.filter select {
  width: 250px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
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

@media (max-width: 1200px) {
  .modal {
    margin: auto;
  }
  .modal-dialog {
    --bs-modal-width: 700px;
    max-width: 80%;
    display: flex;
    flex-direction: column;
    height: 870px;
  }
  .modal-body {
    width: 100%;
  }
  #myModal4 .form-select {
    width: 305px !important;
  }

  .frame textarea,
  .frame input {
    width: 305px !important;
  }

  .prev {
    width: 300px;
    height: 110px;
  }

  .next {
    width: 300px;
    height: 110px;
  }
}

@media (max-width: 860px) {
  #myModal4 .modal-dialog {
    height: 1000px;
  }

  .frame input {
    width: 100% !important;
  }

  #myModal4 .form-select {
    width: 100% !important;
  }

  .frame .rating {
    width: 100% !important;
  }

  #myModal4 textarea {
    width: 100% !important;
    height: 110px;
  }

  .prev {
    width: 220px !important;
    height: 110px;
  }

  .next {
    width: 220px !important;
    height: 110px;
  }
}

@media only screen and (max-width: 768px) {
  .modal .modal-dialog {
    margin-left: 10%;
    height: 1000px;
  }

  #myModal .modal-content {
    width: 100%;
  }
  .first,
  .second,
  .third,
  .fourth,
  .fifth {
    flex-direction: column;
  }

  .modal-body {
    gap: 10px;
    overflow-y: auto;
    width: 100%;
    height: 770px;
  }

  .modal-footer {
    height: 100px;
  }

  .frame .form-select,
  .frame textarea,
  .frame input {
    width: 480px;
  }

  .table-responsive {
    width: 100%;
    overflow-y: auto;
    flex-direction: column;
  }
  table,
  .full {
    width: 580px;
  }
  thead tr th {
    font-size: 10px;
    padding: 6px;
  }

  tbody tr td {
    font-size: 10px;
    padding: 10px;
  }
  .side-panel {
    max-width: 100%;
  }
}

@media (max-width: 576px) {
  .modal-dialog {
    height: 1000px !important;
    max-width: 80%;
    margin: 5px;
  }

  .modal-body {
    padding: 10px;
  }

  #myModal4 input,
  #myModal4 .form-select,
  #myModal4 textarea {
    width: 100% !important;
  }

  .form-control,
  .form-select,
  .btn {
    font-size: 14px;
  }

  .modal-header h4 {
    font-size: 18px;
  }

  #myModal4 .modal-footer {
    width: 100%;
    margin: 0;
    gap: 5px;
  }

  .prev {
    width: 120px !important;
    height: 110px;
    font-size: 8px;
    margin: 0;
  }

  .next {
    width: 120px !important;
    height: 110px;
    padding-left: 0;
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
    width: 230px;
    margin: 0;
    gap: 5px;
  }

  .prev {
    width: 90px !important;
    height: 110px;
    font-size: 8px;
    margin: 0;
  }

  .next {
    width: 90px !important;
    height: 110px;
    padding-left: 0;
  }
}
</style>