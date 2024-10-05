<script setup>
import authService from '../../services/authService';
import TabMenu from '../../components/Tabs/TabMenu.vue';
import DoughNut from '../../components/DoughNut.vue'
import CareerGoal from '../../components/CareerGoal.vue'
import { ref, onMounted, watch } from 'vue'
import { useGoalsStore } from "@/store/goals"
import MidTerm from "../../components/Tables/MidTerm.vue"
import LongTerm from "../../components/Tables/LongTerm.vue"
// import html2pdf from 'html2pdf.js';
//import axios from 'axios';
// import MissionVission from "../../components/Cards/MissionVission.vue";

const store = useGoalsStore();
var goals = ref(store.goals);
console.log(store.goals);

const goal = ref([])
// const planTypeId = ref('Select Type')
// const planTermId = ref('Select Term')
const planTypeId = ref('')
const planTermId = ref('')
const goalSummary = ref('')
const achievementApproach = ref('')
const requiredResources = ref('')
const successCriteria  = ref('')
const potentialChallenges = ref('')
const solutionToChallenges = ref('')
const targetCompletionDate = ref('')
const actualCompletionDate = ref('')
const progressMetrics = ref('')
const status = ref('')
const feedback = ref('')
const evidenceURL = ref(null);
const createdBy = ref('')
const lastModifiedBy = ref('')
const recordOwner = ref('')
const selectedValue = ref('')

const fetchData = async () => {
  try {
    await store.fetchGoals();

    goal.value = store.goals;
    console.log('Goals:', goal.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


const addGoal = async () => {
  const payload = {
    // planTypeId: parseInt(planTypeId.value),
    // planTermId: parseInt(planTermId.value),
    planTypeId: parseInt(planTypeId.value, 10),
    planTermId: parseInt(planTermId.value, 10),
    goalSummary: goalSummary.value,
    achievementApproach: achievementApproach.value,
    requiredResources: requiredResources.value,
    successCriteria: successCriteria.value,
    potentialChallenges: potentialChallenges.value,
    solutionToChallenges: solutionToChallenges.value,
    targetCompletionDate: targetCompletionDate.value,
    actualCompletionDate: actualCompletionDate.value,
    progressMetrics: progressMetrics.value,
    status: status.value,
    feedback: feedback.value,
    evidenceURL: evidenceURL.value,
    createdBy: createdBy.value,
    lastModifiedBy: lastModifiedBy.value,
    recordOwner: recordOwner.value,
  };

  console.log('Submitting payload:', payload);

  try {
    await store.createGoal(payload);
    await fetchData();

    // Clear form inputs after submission
    planTypeId.value = null;
    planTermId.value = null;
    goalSummary.value = '';
    achievementApproach.value = '';
    requiredResources.value = '';
    successCriteria.value = '';
    potentialChallenges.value = '';
    solutionToChallenges.value = '';
    targetCompletionDate.value = '';
    actualCompletionDate.value = '';
    progressMetrics.value = '';
    status.value = '';
    feedback.value = '';
    evidenceURL.value = null;

    console.log("Goal added");
  } catch (error) {
    console.error("Error adding goal:", error);
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

watch(() => store.goals, (newGoals) => {
  goals.value = newGoals;
  console.log("Goals updated:", newGoals);
}, { deep: true });

const handleSubmit = () => {
  addGoal();
  console.log("Form submitted")
};

onMounted(async () => {
  await fetchData();
  console.log("Fetched goals")

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

const onSelectChange = () => {
  // eslint-disable-next-line no-self-assign
  selectedValue.value = selectedValue.value;
}

const tab = ref(1);
// const itemsPerPage = 10; 
// const currentPage = ref(1);

// const totalPages = computed(() => Math.ceil(goals.value.length / itemsPerPage));

// const paginatedGoals = computed(() => {
//   const startIndex = (currentPage.value - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   return goals.value.slice(startIndex, endIndex);
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

const showExpandModal = ref(false);
const expandTitle = ref('');
const expandValue = ref('');
const activeField = ref(''); // To track which field is being edited

// Function to open the expand modal for textarea
const expandText = (title, value, field) => {
  expandTitle.value = title;
  expandValue.value = value;
  activeField.value = field; // Store the field that is being edited
  showExpandModal.value = true;
};

// Function to save the expanded text back to the appropriate textarea
const saveExpandedText = () => {
  if (activeField.value === 'goalSummary') {
    goalSummary.value = expandValue.value;
  } else if (activeField.value === 'achievementApproach') {
    achievementApproach.value = expandValue.value;
  }  else if (activeField.value === 'requiredResources') {
    requiredResources.value = expandValue.value;
  } else if (activeField.value === 'successCriteria') {
    successCriteria.value = expandValue.value;
  } else if (activeField.value === 'potentialChallenges') {
    potentialChallenges.value = expandValue.value;
  } else if (activeField.value === 'solutionToChallenges') {
    solutionToChallenges.value = expandValue.value;
  } else if (activeField.value === 'progressMetrics') {
    progressMetrics.value = expandValue.value;
  } else if (activeField.value === 'feedback') {
    feedback.value = expandValue.value;
  }
  

  // Close the expand modal
  showExpandModal.value = false;
};
</script>

<template>
  <main class="wrapper">
    <TabMenu />

    <form method="post" action="" @submit.prevent="handleSubmit">
      <div class="modal" id="myModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Development Plan Request Form</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><b>X</b></button>
            </div>

            <div class="modal-body">

              <div class="row mb-3">
                <div class="col-sm-12 col-md-6">
                  <label for="planTypeId" class="form-label">Development Plan Type</label>
                  <select class="form-select" v-model="planTypeId">
                    <option value="Select Type">Select Type</option>
                    <option value="1">Area of Robotoest</option>
                    <option value="2">Career Goals and Aspirations</option>
                    <option value="3">Mentorship and Skill Building</option>
                  </select>
                </div>
                <div class="col-sm-12 col-md-6">
                  <label for="planTermId" class="form-label">Duration</label>
                  <select class="form-select" v-model="planTermId">
                    <option value="Select Term">Select Term</option>
                    <option value="1">Short Term Goal</option>
                    <option value="2">Mid Term Goal</option>
                    <option value="3">Long Term Goal</option>
                  </select>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-sm-12 col-md-6">
                  <label for="goalSummary" class="form-label">Goal</label>
                  <textarea v-model="goalSummary" class="form-control" rows="3" placeholder="Goal"></textarea>
                  <button type="button" class="expand" @click="expandText('Goal', goalSummary, 'goalSummary')">Expand</button>
                </div>
                <div class="col-sm-12 col-md-6">
                  <label for="achievementApproach" class="form-label">What I will do to achieve this</label>
                  <textarea v-model="achievementApproach" class="form-control" rows="3" placeholder="What I will do to achieve this"></textarea>
                  <button type="button" class="expand" @click="expandText('Achievement Approach', achievementApproach, 'achievementApproach')">Expand</button>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-sm-12 col-md-6">
                  <label for="requiredResources" class="form-label">Resources and Support Needed</label>
                  <textarea v-model="requiredResources" class="form-control" rows="3" placeholder="Resources and Support Needed"></textarea>
                  <button type="button" class="expand" @click="expandText('Required Resources', requiredResources, 'requiredResources')">Expand</button>
                </div>
                <div class="col-sm-12 col-md-6">
                  <label for="successCriteria" class="form-label">What does success look like?</label>
                  <textarea v-model="successCriteria" class="form-control" rows="3" placeholder="What does success look like?"></textarea>
                  <button type="button" class="expand" @click="expandText('What does success look like?', successCriteria, 'successCriteria')">Expand</button>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-sm-12 col-md-6">
                  <label for="targetCompletionDate" class="form-label">Target Date for Completion</label>
                  <input type="date" v-model="targetCompletionDate" class="form-control">
                </div>
                <div class="col-sm-12 col-md-6">
                  <label for="progressMetrics" class="form-label">Progress Metrics (Outcome Based)</label>
                  <textarea v-model="progressMetrics" class="form-control" rows="3" placeholder="Progress Metrics"></textarea>
                  <button type="button" class="expand" @click="expandText('Progress Metrics', progressMetrics, 'progressMetrics')">Expand</button>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-sm-12 col-md-6">
                  <label for="status" class="form-label">Status</label>
                  <select class="form-select" v-model="status">
                    <option value="Select Type">Select Type</option>
                    <option value="Completed">Completed</option>
                    <option value="On-going">On-going</option>
                    <option value="Not started">Not started</option>
                  </select>
                </div>
                <div class="col-sm-12 col-md-6">
                  <label for="feedback" class="form-label">Feedback</label>
                  <textarea v-model="feedback" class="form-control" rows="3" placeholder="Feedback"></textarea>
                  <button type="button" class="expand" @click="expandText('Feedback', feedback, 'feedback')">Expand</button>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-sm-12 col-md-6">
                  <label for="Evidence" class="form-label">Evidence</label>
                  <input type="file" class="form-control" @change="handleFileChange">
                </div>
                <div class="col-sm-12 col-md-6">
                  <label for="actualCompletionDate" class="form-label">Actual Completion Date</label>
                  <input type="date" v-model="actualCompletionDate" class="form-control">
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

          <div class="modal-footer">
            <button type="submit" class="btn btn-success">Submit Request</button>
          </div>
        </div>
      </div>
    </form>
    <div class="development mt-5">

      <div class="dev">
        <h3>Personal Development Plan</h3>
        <button data-bs-toggle="modal" data-bs-target="#myModal" type="button">Add Goals</button>
      </div>
      <hr>
      <div class="goals">

        <v-card>
          <v-tabs class="custom-tab" v-model="tab" color="deep-purple-accent-4" align-tabs="left">
            <v-tab class="link-tab" :value="1">Short term goals (3 - 6 Months)</v-tab>
            <v-tab class="link-tab" :value="2">Mid term goals (7 - 12 Months)</v-tab>
            <v-tab class="link-tab" :value="3">Long term goals (13 - 24 Months)</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">

            <v-tab-item :value="1">
              <v-container fluid v-if="tab === 1">
                <div class="chart">
                  <DoughNut />

                </div>
                <div class="table">
                  <CareerGoal />
                </div>
              </v-container>
            </v-tab-item>

            <v-tab-item :value="2">
              <v-container fluid v-if="tab === 2">
                <div class="chart">
                  <DoughNut />

                </div>
                <div class="table">
                  <MidTerm />
                </div>
              </v-container>
            </v-tab-item>

            <v-tab-item :value="3">
              <v-container fluid v-if="tab === 3">
                <div class="chart">
                  <DoughNut />

                </div>
                <div class="table">
                  <LongTerm />
                </div>
              </v-container>
            </v-tab-item>
          </v-tabs-items>
        </v-card>

      </div>
      <button style="visibility: hidden;" class="view" data-bs-toggle="modal" data-bs-target="#myModal2" type="button">View All</button>
    </div>
  </main>
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

.expanded-modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  z-index: 1060;
}

.col-md-6 input {
  border: 1px solid #808080;
  border-radius: 5px;
  height: 30px;
}

.expand {
  font-family: Roboto;
  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
  text-align: right;
  color: #47b65c;
  padding-right: 15px;
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
.development {
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: 10px;
  background: #fff;
}
.dev h3 {
  color: var(--Black, #000);
  font-family: "Roboto", sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 28.8px;
  width: 800px;
}
.dev {
  width: 100%;
  display: flex;
  padding: 10px 10px;
  align-items: center;
  gap: 10px;
}
.dev button {
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  width: 152px;
  height: 40px;
  color: #fff;
  font-family: "Roboto", sans-serif;
  margin-left: 100px;
}
hr {
  width: 100%;
  height: 1px;
  background: #808080;
}
.wrap {
  gap: 20px;
}
.goals {
  display: flex;
  justify-content: flex-start !important;
  align-items: flex-start;
  gap: 30px;
  margin-left: 1px;
  margin-top: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 0px;
  border-radius: 10px;
  background: var(--Grey-Light, #eee);
  align-self: stretch;
}
.short {
  display: flex;
  padding: 5px 15px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  background: var(--Primary, #227cbf);
  color: var(--White, #fff);
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}

.chart {
  width: 100%;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  height: 30px !important;
}
#myModal .modal-dialog {
  --bs-modal-width: 900px;
  width: 900px;
  height: 1110px;
  margin-left: 13%;
  display: inline-flex;
  padding: 30px;
  border-radius: 10px;
  background: #eeeeee;
}
#myModal .modal-content {
  width: 100%;
}
.modal-title {
  font-family: Roboto;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  text-align: left;
}
.modal-body {
  gap: 20px;
  background: #fff;
  margin-top: 0px !important;
  padding: 5px;
}
#myModal .modal-content[data-v-5b89ab46][data-v-5b89ab46] {
  z-index: 1;
  --bs-backdrop-zindex: 1;
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 10px;
  height: 1050px;
}
#myModal2 .modal-content {
  width: 1250px;
  z-index: 1;
  --bs-backdrop-zindex: 1;
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 10px;
}
.form-label {
  font-family: Roboto;
  font-size: 16px;
  font-weight: 400;
  line-height: 19.2px;
  text-align: left;
}
.type {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}
.type h3 {
  color: var(--Black, #000);
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.form-select {
  width: 390px;
  height: 40px;
  color: var(--Grey-Dark, #000);
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
  padding: 10px;
  border-radius: 5px;
  border: 1px 0px 0px 0px;
  justify-content: space-between;
}
.goal {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 20px;
  margin-top: 20px;
}
.left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}
.right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}
.left h4,
.right h4,
.wright h4,
.lefts h4 {
  color: var(--Black, #000);
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.goal textarea {
  display: flex;
  width: 390px;
  height: 100px;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border: 1px solid #808080;
  border-radius: 5px;
}
textarea::placeholder {
  font-family: Roboto;
  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
  text-align: left;
  color: #808080;
}
.type input {
  display: flex;
  width: 390px;
  height: 40px;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--White, #fff);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
}
.target {
  height: 40px;
}
input {
  height: 40px;
}
.modal-footer {
  display: flex;
  height: 40px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;
  padding: 0;
}
.modal-footer .btn {
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  color: #fff;
}
.wright textarea {
  width: 390px;
  height: 100px;
}
.lefts input,
.left input,
.right input {
  width: 390px;
  height: 40px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--White, #fff);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
}
.form-selects {
  width: 390px;
  height: 50px;
  color: var(--Grey-Dark, #808080);
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
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
#myModal1 {
  margin-left: 1%;
  height: 800px;
}

#two {
  --bs-modal-width: 1280px;
  width: 1280px;
  height: 550px;
  display: inline-flex;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 10px;
  margin-left: 2%;
  border: none;
  background: none;
}
.modal-header .btn-close {
  background: transparent;
  color: #808080;
}
.download {
  cursor: pointer;
  margin: auto;
  background: #47b65c;
  color: #fff;
}
#myModal2 .v-btn.v-btn--density-default {
  background: #47b65c;
  color: #fff;
}
.page {
  margin: auto;
}
#myModal2 .modal-dialog {
  margin-left: 5%;
}
.modal[data-v-2366ac16] {
  margin-left: 6%;
}
.download {
  width: 100%;
}
table {
  width: 780px;
}
.full {
  width: 1080px;
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
  padding: 20px;
}

thead,
tr {
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}

@media (max-width: 768px) {
  .col-sm-12 {
    width: 100%;
    padding-left: 0;
    padding-right: 0;
  }

  .form-select,
  .form-control,
  .btn {
    width: 95%;
    margin: auto;
  }

  label {
    margin-left: 10px;
    margin-top: 5px;
  }

  .modal-content {
    padding: 15px;
    width: 80%;
  }

  .modal-header,
  .modal-footer {
    padding: 10px;
  }

  .expand {
    font-size: 14px;
    padding-right: 10px;
    margin-left: 10px;
  }

  .dev {
    width: 600px;
    padding: 10px;
  }

  .dev h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }
  .dev button {
    font-size: 14px;
  }
  .modal-body {
    gap: 10px;
    overflow-y: auto;
  }
  .modal-dialog {
    display: flex;
    flex-direction: column;
    max-width: 75%;
    --bs-modal-width: 700px;
    margin-left: 2%;
    padding: 10px;
    gap: 10px;
  }

  .modal-body {
    width: 100%;
    height: 770px;
  }
  .goal {
    justify-content: flex-start;
    gap: 7px;
  }
  .goal textarea {
    width: 290px;
  }
  .type .form-select {
    display: flex;
    width: 290px;
  }
  .wright textarea {
    width: 290px;
    height: 70px;
  }
  .lefts input {
    width: 290px;
  }
  .form-selects {
    width: 290px;
  }
  .modal-footer {
    height: 100px;
  }
  .custom-tab {
    align-items: flex-start;
    width: 600px;
    margin-left: 40px;
  }
  .v-slide-group__container {
    width: 600px;
  }
  .link-tab {
    width: 180px;
    font-size: 10px;
    letter-spacing: 0.01px;
  }
  .v-slide-group__content {
    width: 600px;
  }
  .table-responsive {
    width: 100%;
    overflow-y: auto;
  }
  table,
  .full {
    width: 580px;
  }
  thead tr th {
    font-size: 8px;
    padding: 6px;
  }

  tbody tr td {
    font-size: 5px;
    padding: 10px;
  }
  #myModal1 {
    margin-left: 2px;
  }
  #two {
    --bs-modal-width: 760px;
  }
  .modal-header .btn-close {
    background: transparent;
    color: #808080;
  }
  .download {
    cursor: pointer;
    margin: auto;
    background: #47b65c;
    color: #fff;
  }
  .page {
    margin: auto;
  }
}

@media (min-width: 768px) {
  #modal .modal-dialog[data-v-5b89ab46] {
    max-width: 55%;
    display: flex;
    flex-direction: column;
  }

  #myModal .modal-content[data-v-5b89ab46][data-v-5b89ab46][data-v-5b89ab46] {
    width: 100%;
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
  .form-select {
    width: 100%;
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
