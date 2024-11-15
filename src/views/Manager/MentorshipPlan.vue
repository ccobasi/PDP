<script setup>
import authService from '../../services/authService';
import TabMenu from '../../components/Tabs/TabMenuThree.vue';
import TableSix from '../../components/Tables/TableSix.vue'
import {useMentorshipStore} from "@/store/mentorship"
import { ref, onMounted, computed } from 'vue'
import { useUsersStore } from '@/store/users';
// import html2pdf from 'html2pdf.js';

const store = useMentorshipStore();
console.log(store.mentorships);
const usersStore = useUsersStore();

// eslint-disable-next-line no-unused-vars
const mentorships = ref([])
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
  const lastModifiedBy = ref('')
  const recordOwner = ref(null)
  const status = ref('')
  const selectedValue = ref('')

const fetchData = async () => {
  try {
    await store.fetchMentorshipPlans();

    mentorships.value = store.mentorships;
    console.log(mentorships);
    

    console.log('Mentorships:', mentorships.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(async () => {
  await fetchData();
  await usersStore.fetchUsers();
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

const addMentorship = async () => {
    const createdById = createdBy.value?.id || defaultUser.id

  console.log('Preparing to add mentorship with the following details:', {
    financialYear: financialYear.value,
    month: month.value,
    mentor: mentor.value,
    goals: goals.value,
    actionPlans: actionPlans.value,
    targetCompletionDate: targetCompletionDate.value,
    actualCompletionDate: actualCompletionDate.value,
    progressMetrics: progressMetrics.value,
    feedback: feedback.value,
    evidence: evidence.value,
    status: status.value,
    createdBy: createdById,
    recordOwner: recordOwner.value
  });

  if (
    financialYear.value.trim() !== '' &&
    month.value.trim() !== '' &&
    mentor.value.trim() !== '' &&
    goals.value.trim() !== '' &&
    actionPlans.value.trim() !== '' &&
    targetCompletionDate.value.trim() !== ''
  ) {
    await store.addMentorship({
      financialYear: financialYear.value.trim(),
      month: month.value.trim(),
      mentor: mentor.value.trim(),
      goals: goals.value.trim(),
      actionPlans: actionPlans.value.trim(),
      targetCompletionDate: targetCompletionDate.value.trim(),
      actualCompletionDate: actualCompletionDate.value.trim(),
      progressMetrics: progressMetrics.value.trim(),
      feedback: feedback.value.trim(),
      evidence: evidence.value,
      status: status.value.trim(),
      createdBy: createdById,
      recordOwner: recordOwner.value
    });
  }
};


const loading = ref(false);
const handleFileChange = (event) => {
  loading.value = true;
  const file = event.target.files[0];
  if (file) {
    evidence.value = file;
  }
  loading.value = false;
};


const handleSubmit = () => {
  addMentorship();
  console.log("Mentorship added")
};
 

 const onSelectChange = () => {
  // eslint-disable-next-line no-self-assign
  selectedValue.value = selectedValue.value
}

  const defaultUser = {
    id: 4, 
    username: 'James Bond',
  };
</script>


<template>
  <main class="wrapper">
    <!-- <div class="modal" id="myModal2">
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-header">
            <h4 class="modal-title">Mentorship Plan</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>

       
          <div class="modal-body">
            <div class="table-responsive d-flex flex-column">
              <v-pagination v-model="currentPage" :length="totalPages"></v-pagination>
              <v-btn color="#47b65c" @click="downloadPDF">Download as PDF</v-btn>
              <table class="full">
                <thead>
                  <tr>
                    <th scope="col" style="font-size: 12px;">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink">S/N</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col" style="font-size: 12px;">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Month</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col" style="font-size: 12px;">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Financial Year</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col" style="font-size: 12px;">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Mentor</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col" style="font-size: 12px;">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Goals</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col" style="font-size: 12px;">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Action Plans</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col" style="font-size: 12px;">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Target Completion Date </span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col" style="font-size: 12px;">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Progress Metrics </span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col" style="font-size: 12px;">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Feedback </span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>

                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in paginatedMentorship" :key="index" @click="selectItem(item)" style="font-size: 14px;">
                    <td>{{item.id}}</td>
                    <td>{{item.month}}</td>
                    <td>{{item.financialYearId}}</td>
                    <td>{{item.mentor}}</td>
                    <td>{{item.goals}}</td>
                    <td>{{item.actionPlans}}</td>
                    <td>{{item.targetCompletionDate}}</td>
                    <td>{{item.progressMetrics}}</td>
                    <td>{{item.feedback}}</td>

                  </tr>
                </tbody>
              </table>

            </div>
          </div>

        </div>
      </div>
    </div> -->
    <TabMenu />

    <form method="post" action="" @submit.prevent="handleSubmit">
      <div class="modal" id="myModal" tabindex="-1">
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
                  <!-- <input type="text" id="createdBy" class="form-control" :value="userNamesMap[createdBy] || defaultUser.id" disabled /> -->
                  <input type="text" id="createdBy" class="form-control" :value="createdBy?.value?.id ? userNamesMap[createdBy.value.id] : userNamesMap[defaultUser.id]" disabled />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-success">Submit Request</button>
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

    <div class="skill mt-4">
      <div class="header">
        <div class="title mb-4">
          <h3>Mentorship Plan</h3>
          <button data-bs-toggle="modal" data-bs-target="#myModal" type="button">Mentorship Request</button>

        </div>
        <div class="lines"></div>
      </div>

      <div class="table">
        <button class="view" data-bs-toggle="modal" data-bs-target="#myModal2" type="button">View All</button>
        <TableSix :level="selectedLevel" :department="selectedDepartment" :quarter="selectedQuarter" :year="selectedYear" />

      </div>

    </div>
  </main>
</template>

<style scoped>
main {
  height: 1450px;
}

.filters .form-select {
  width: 100px;
  border-radius: 10px;
  margin-top: 10px;
  color: #000;
}

.view {
  display: flex;
  padding: 10px 30px;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  color: var(--White, #fff);
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}

.skill {
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  align-self: stretch;
  border-radius: 10px;
  background: #fff;
  height: 1300px;
}
.skill h3 {
  color: var(--Black, #000);
  font-family: "Inter", sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 28.8px;
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
  font-family: "Inter", sans-serif;
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
.v-btn button {
  background: #47b65c;
}
.chart {
  display: flex;

  padding: 30px;
  align-items: center;
  gap: 40px;
  align-self: stretch;
  border-radius: 7.622px;
  background: #fff;
  box-shadow: 1.52441px 1.52441px 15.24414px 0px rgba(0, 0, 0, 0.1);
}
.auto {
  margin: auto;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  height: 30px !important;
}
.modal-body {
  gap: 20px;
  background: #fff;
  margin-top: 0px !important;
}
.modal-dialog {
  --bs-modal-width: 900px;
  width: 900px;
  height: 930px;
  margin-left: 15%;
  display: inline-flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 10px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--Grey-Light, #eee);
}
.modal-content {
  z-index: 1;
  --bs-backdrop-zindex: 1;
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 10px;
}

.type {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}
.type h3 {
  color: var(--Black, #000);
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.form-select {
  width: 370px;
  height: 40px;
  color: var(--Grey-Dark, #808080);
  font-family: "Inter", sans-serif;
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
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.frame input {
  width: 370px;
  height: 40px;
  border: 1px solid var(--Grey-Dark, #ddd);
  padding: 10px;
  border-radius: 5px;
}
.frame textarea {
  display: flex;
  width: 370px;
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
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}
.form-select {
  width: 370px;
  color: var(--Grey-Dark, #808080);
  font-family: "Inter", sans-serif;
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
#myModal2 .modal-dialog {
  --bs-modal-width: 1250px;
  width: 1250px;
  margin-left: 5%;
}
#myModal2 .modal-content {
  width: 1200px;
}
#myModal2 .table-header {
  font-style: 10px;
}

@media (max-width: 2000px) {
  .form-select,
  .frame textarea,
  .frame input {
    width: 370px !important;
  }
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

@media (max-width: 860px) {
  .form-select,
  .frame textarea,
  .frame input {
    width: 220px !important;
  }
}

@media (max-width: 768px) {
  .modal .modal-dialog {
    margin-left: 11%;
    height: 1070px;
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
    width: 400px;
  }
}

@media (max-width: 576px) {
  .filters .form-select {
    display: none;
  }

  .title h3 {
    font-size: 12px;
  }

  .title button {
    width: 115px;
    padding: 10px;
    font-size: 10px;
  }

  .view {
    display: flex;
    padding: 10px;
    font-size: 14px;
  }

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
