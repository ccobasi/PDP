<script setup>
import { useMentorshipStore } from "@/store/mentorship";
// import html2pdf from 'html2pdf.js';
import { ref, computed, onMounted } from 'vue';


const store = useMentorshipStore();
const mentorships = ref([]);
const editingMentorship = ref(null);
// const selectedItem = ref(null);
  const month = ref('')
  const financialYearId = ref('')
  const mentor = ref('')
  const goals = ref('')
  const actionPlans  = ref('')
  const targetCompletionDate = ref('')
  const progressMetrics = ref('')
  const feedback = ref('')
  const evidenceURL = ref('')
  const createdBy = ref('')
  const lastModifiedBy = ref('')
  const status = ref('')
  const mentorshipPlanId = ref('')

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
  await fetchData();
});

const addMentorship = async () => {
  if (financialYearId.value.trim() !== '' || month.value.trim() !== '' || mentor.value.trim() !== ''
    || goals.value.trim() !== ''
    || actionPlans.value.trim() !== '' || targetCompletionDate.value.trim() !== '' || progressMetrics.value.trim() !== '' || feedback.value.trim() !== '' || evidenceURL.value.trim() !== '' || status.value.trim() !== '' || createdBy.value.trim() !== '' || lastModifiedBy.value.trim() !== '') {
    await store.addMentorship(financialYearId.value.trim(), month.value.trim(), mentor.value.trim(),
       goals.value.trim(), actionPlans.value.trim(), targetCompletionDate.value.trim(), status.value.trim(), progressMetrics.value.trim(), feedback.value.trim(), evidenceURL.value.trim(), createdBy.value.trim(), lastModifiedBy.value.trim());
  
  }
};

const handleSubmit = () => {
  addMentorship();
  console.log("Mentorship added")
};


const editMentorship = (mentorship) => {
  editingMentorship.value = { ...mentorship };
  
  mentorshipPlanId.value = mentorship.mentorshipPlanId;
  financialYearId.value = mentorship.financialYearId;
  month.value = mentorship.month;
  mentor.value = mentorship.mentor;
  goals.value = mentorship.goals;
  actionPlans.value = mentorship.actionPlans;
  targetCompletionDate.value = mentorship.targetCompletionDate;
  progressMetrics.value = mentorship.progressMetrics;
  feedback.value = mentorship.feedback;
  evidenceURL.value = mentorship.evidenceURL;
  createdBy.value = mentorship.createdBy;
  lastModifiedBy.value = mentorship.lastModifiedBy;
  status.value = mentorship.status;
  
  console.log('Opening modal for editing:', mentorship);
  document.getElementById('myModal3').style.display = 'block';
  console.log('Modal opened');

};

const updateMentorship = async () => {
  if (editingMentorship.value) {
    editingMentorship.value.mentorshipPlanId = mentorshipPlanId.value;
    editingMentorship.value.financialYearId = financialYearId.value;
    editingMentorship.value.month = month.value;
    editingMentorship.value.mentor = mentor.value;
    editingMentorship.value.goals = goals.value;
    editingMentorship.value.actionPlans = actionPlans.value;
    editingMentorship.value.targetCompletionDate = targetCompletionDate.value ? new Date(targetCompletionDate.value).toISOString() : null;
    editingMentorship.value.progressMetrics = progressMetrics.value;
    editingMentorship.value.feedback = feedback.value;
    editingMentorship.value.evidenceURL = evidenceURL.value || '';
    editingMentorship.value.createdBy = createdBy.value;
    editingMentorship.value.lastModifiedBy = lastModifiedBy.value;
    editingMentorship.value.status = status.value;

    // Log the payload
    console.log('Payload:', editingMentorship.value);

    try {
      await store.updateMentorship(editingMentorship.value);
      editingMentorship.value = null;
      document.getElementById('myModal3').style.display = 'none';
    } catch (error) {
      console.error('Error updating mentorship:', error);
      console.error('Error response data:', error.response?.data);
    }

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
  evidenceURL.value = file.name;

  loading.value = false;
};

const itemsPerPage = 20; 
const currentPage = ref(1);
// const totalPages = computed(() => Math.ceil(mentorships.value.length / itemsPerPage));
// const paginatedMentorship = computed(() => {
//   const startIndex = (currentPage.value - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   return mentorships.value.slice(startIndex, endIndex);
// });

// const downloadPDF = () => {
//   const table = document.querySelector('.table-responsive');
//   html2pdf(table, {
//     margin: 10,
//     filename: 'table-data.pdf',
//     image: { type: 'jpeg', quality: 0.98 },
//     html2canvas: { scale: 2 },
//     jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
//   });
// };



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
</script>

<template>
  <teleport to="body">
    <form method="post" @submit.prevent="editMentorship ? updateMentorship() : handleSubmit">
      <div class="modal" id="myModal3" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Mentorship Request Form</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><b></b></button>
            </div>

            <div class="modal-body">

              <div class="first">
                <div class="frame">
                  <h6>Financial Year</h6>
                  <select v-model="financialYearId" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
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
                  <input type="file" class="form-control" @change="handleFileChange">
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
                  <h6>CreatedBy</h6>
                  <input type="text" v-model="createdBy" placeholder="Created By" disabled>
                </div>
                <div class="frame">
                  <h6>Modified By</h6>
                  <input type="text" v-model="lastModifiedBy" placeholder="Last Modified By" disabled>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-success">{{ editingMentorship ? 'Update' : 'Submit' }}</button>
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
          <tr v-for="(item, index) in paginatedFilteredMentorship" :key="index" @dblclick="editMentorship(item)">

            <td>{{item.id}}</td>
            <td>{{item.financialYearId}}</td>
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
  .form-select,
  .frame textarea,
  .frame input {
    width: 280px;
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
    max-width: 80%;
    margin: 5px;
  }

  .modal-body {
    padding: 10px;
  }

  .form-control,
  .form-select,
  .btn {
    font-size: 14px;
  }

  .modal-header h4 {
    font-size: 18px;
  }
}
</style>