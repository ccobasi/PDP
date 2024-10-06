<script setup>
import authService from '../../services/authService';
import TabMenu from '../../components/Tabs/TabMenu.vue';
import TableSix from '../../components/Tables/TableSix.vue'
import {useMentorshipStore} from "@/store/mentorship"
import { ref, onMounted, watch, computed} from 'vue'
import html2pdf from 'html2pdf.js';

const store = useMentorshipStore();
console.log(store.mentorships);
const editingMentorship = ref(null);


// eslint-disable-next-line no-unused-vars
const mentorships = ref([])
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
  const recordOwner = ref('')
  const status = ref('')
  const selectedValue = ref('')
  const mentorshipPlanId = ref('');

const fetchData = async () => {
  try {
    await store.fetchMentorshipPlans();

    mentorships.value = store.mentorships;


    console.log('Mentorships:', mentorships.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(async () => {
  await fetchData();

  try {
    await authService.initialize();
    const msalInstance = authService.getMsalInstance();
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length) {
      createdBy.value = accounts[0].username; 
      lastModifiedBy.value = accounts[0].username; 
      recordOwner.value = accounts[0].username;
    }
  } catch (error) {
    console.error('Error during MSAL initialization:', error);
  }
});

const addMentorship = async () => {
  console.log('Preparing to add mentorship with the following details:', {
    financialYearId: financialYearId.value,
    month: month.value,
    mentor: mentor.value,
    goals: goals.value,
    actionPlans: actionPlans.value,
    targetCompletionDate: targetCompletionDate.value,
    progressMetrics: progressMetrics.value,
    feedback: feedback.value,
    evidenceURL: evidenceURL.value,
    status: status.value,
    createdBy: createdBy.value,
    lastModifiedBy: lastModifiedBy.value,
    recordOwner: recordOwner.value
  });

  if (financialYearId.value.trim() !== '' || month.value.trim() !== '' || mentor.value.trim() !== ''
    || goals.value.trim() !== ''
    || actionPlans.value.trim() !== '' || targetCompletionDate.value.trim() !== '' || progressMetrics.value.trim() !== '' || feedback.value.trim() !== '' || evidenceURL.value || status.value.trim() !== '' || createdBy.value.trim() !== '' || lastModifiedBy.value.trim() !== '' || recordOwner.value.trim() !== '') {
    await store.addMentorship(financialYearId.value.trim(), month.value.trim(), mentor.value.trim(),
       goals.value.trim(), actionPlans.value.trim(), targetCompletionDate.value.trim(), status.value.trim(), progressMetrics.value.trim(), feedback.value.trim(), evidenceURL.value, createdBy.value.trim(), lastModifiedBy.value.trim(), recordOwner.value.trim());
  
  }
};

const loading = ref(false);
const handleFileChange = (event) => {
  loading.value = true;
  const file = event.target.files[0];
  if (file) {
    evidenceURL.value = file;
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

const itemsPerPage = 10; 
const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(mentorships.value.length / itemsPerPage));
const paginatedMentorship = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return mentorships.value.slice(startIndex, endIndex);
});

const downloadPDF = () => {
  const table = document.querySelector('.table-responsive');
  html2pdf(table, {
    margin: 10,
    filename: 'table-data.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  });
};

</script>


<template>
  <main class="wrapper">
    <div class="modal" id="myModal2">
      <div class="modal-dialog">
        <div class="modal-content">

          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Mentorship Plan</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <!-- Modal body -->
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

                    <!-- <tr v-for="item in skills" @click="selectItem(item)" @dblclick="$router.push({name: 'Skill Assessment Details', params: {id: item.id}})"> -->
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
    </div>
    <TabMenu />
    <form method="post" action="" @submit.prevent="handleSubmit()">
      <div class="modal" id="myModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Mentorship Request Form</h5>
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
              <button type="submit" class="btn btn-success" data-bs-dismiss="modal">Submit</button>
            </div>

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
        <TableSix />

      </div>

    </div>
  </main>
</template>

<style scoped>
main {
  height: 1450px;
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
  width: 900px;
  height: 850px;
  margin-left: 20%;
  display: inline-flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 10px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--Grey-Light, #fff);
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
  height: 50px;
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
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.frame input {
  width: 320px;
  height: 40px;
}
.frame textarea {
  display: flex;
  width: 320px;
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
  width: 320px;
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
@media only screen and (max-width: 768px) {
  .modal {
    margin-left: 5%;
  }
  .modal-dialog {
    width: 700px;
  }
  .frame input,
  .frame textarea,
  .frame .form-select {
    width: 290px;
  }
}
</style>
