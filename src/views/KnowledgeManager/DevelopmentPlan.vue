<!-- <script setup>
import authService from '../../services/authService';
import TabMenu from '../../components/Tabs/TabMenuTwo.vue';
import DoughNut from '../../components/DoughNut.vue'
import CareerGoal from '../../components/CareerGoal.vue'
import { ref, onMounted, computed, watch } from 'vue'
import { useGoalsStore } from "@/store/goals"
import MidTerm from "../../components/Tables/MidTerm.vue"
import LongTerm from "../../components/Tables/LongTerm.vue"
import html2pdf from 'html2pdf.js';

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
    await store.addGoal(payload);
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
const itemsPerPage = 10; 
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(goals.value.length / itemsPerPage));

const paginatedGoals = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return goals.value.slice(startIndex, endIndex);
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
    <TabMenu />
    <form method="post" action="" @submit.prevent="handleSubmit">
      <div class="modal" id="myModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add Plan Form</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><b>X</b></button>
            </div>

            <div class="modal-body">

              <div class="type">
                <div class="wrap d-flex">

                  <div class="planTypeId">
                    <h3>Development plan type</h3>

                    <select class="form-select" aria-label="Default select example" v-on:change="onSelectChange(e)" v-model="planTypeId">
                      <option value="Select Type">Select Type</option>
                      <option class="opt" value="1">Area of Interest</option>
                      <option class="opt" value="2">Career Goals and Aspirations</option>
                      <option class="opt" value="3">Mentorship and Skill Building</option>
                    </select>
                  </div>
                  <div class="term">
                    <h3>Duration</h3>
                    <select class="form-select" aria-label="Default select example" v-on:change="onSelectChange(e)" v-model="planTermId">
                      <option class="opt" value="Select Term">Select Term</option>
                      <option class="opt" value="1">Short Term Goal</option>
                      <option class="opt" value="2">Mid Term Goal</option>
                      <option class="opt" value="3">Long Term Goal</option>
                    </select>
                  </div>
                </div>

              </div>
              <div class="goal">
                <div class="left">
                  <h4>Goal</h4>
                  <textarea name="Goal" placeholder="Goal" id="" cols="30" rows="10" v-model="goalSummary"></textarea>
                </div>
                <div class="right">
                  <h4 class="">What I will do to achieve this</h4>
                  <textarea name="Goal" placeholder="What I will do to achieve this" id="" cols="30" rows="10" v-model="achievementApproach"></textarea>
                </div>
              </div>
              <div class="goal">
                <div class="left">
                  <h4>Resources and Support Needed</h4>
                  <textarea name="Resources and Support Needed" placeholder="Resources and Support Needed" id="" cols="30" rows="10" v-model="requiredResources"></textarea>
                </div>
                <div class="right">
                  <h4 class="">What does success look like?</h4>
                  <textarea name="Goal" placeholder="What does success look like?" id="" cols="30" rows="10" v-model="successCriteria"></textarea>
                </div>
              </div>
              <div class="goal">
                <div class="left">
                  <h4>Potential Challenges</h4>
                  <textarea name="Potential Challenges" placeholder="Potential Challenges" id="" cols="30" rows="10" v-model="potentialChallenges"></textarea>
                </div>
                <div class="right">
                  <h4 class="">Solution</h4>
                  <textarea name="Goal" placeholder="Solution" id="" cols="30" rows="10" v-model="solutionToChallenges"></textarea>
                </div>
              </div>
              <div class="goal">
                <div class="lefts mt-1">
                  <h4>Target Date for Completion</h4>
                  <input type="date" v-model="targetCompletionDate">
                </div>
                <div class="wright">
                  <h4>Progress Metrics(Outcome Based)</h4>
                  <textarea name="Progress" placeholder="Progress Metrics" id="" cols="30" rows="10" v-model="progressMetrics"></textarea>
                </div>

              </div>
              <div class="goal">
                <div class="lefts">
                  <h4>Status</h4>
                  <select v-model="status" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
                    <option class="opt" selected>Status</option>
                    <option class="opt" value="Completed">Completed</option>
                    <option class="opt" value="On-going">On-going</option>
                    <option class="opt" value="Not started">Not started</option>
                  </select>
                </div>
                <div class="wright">
                  <h4>Feedback</h4>
                  <textarea name="Feedback" placeholder="Feedback" id="" cols="30" rows="10" v-model="feedback"></textarea>
                </div>

              </div>

              <div class="goal">
                <div class="left">
                  <h4>Evidence</h4>

                  <input type="file" class="form-control" @change="handleFileChange">
                </div>
                <div class="right mt-1">
                  <h4>Actual Completion Date</h4>
                  <input type="date" v-model="actualCompletionDate">
                </div>
              </div>

            </div>
            <div class="modal-footer">

              <button type="submit" class="btn btn-success" data-bs-dismiss="modal" @click="$router.push('/')">Submit Request</button>
            </div>

          </div>
        </div>
      </div>
    </form>
    <div class="modal" id="myModal1">
      <div class="modal-dialog" id="two">
        <div class="modal-content">
          <v-pagination class="page" v-model="currentPage" :length="totalPages"></v-pagination>
          <v-btn class="download" @click="downloadPDF">Download as PDF</v-btn>

          <div class="modal-header">
            <h4 class="modal-title">Development Plans</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal">X</button>
          </div>

          <div class="modal-body overflow-y-auto">
            <div class="table-responsive d-flex flex-column">

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
                        <span class="noshrink"> Plan</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Term</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Achieve</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Resources</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Success</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Potential</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Solution </span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Date </span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Progress</span>

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
                        <span class="noshrink"> Feedback</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
               
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in paginatedGoals" :key="index" @click="selectItem(item)" @dblclick="$router.push({ name: 'Detail', params: { id: item.id } })">

                    <td>{{item.id}}</td>
                    <td>{{item.planTypeId}}</td>
                    <td>{{item.planTermId}}</td>
                    <td>{{item.goalSummary}}</td>
                    <td>{{item.achievementApproach}}</td>
                    <td>{{item.requiredResources}}</td>
                    <td>{{item.potentialChallenges}}</td>
                    <td>{{item.solutionToChallenges}}</td>
                    <td>{{item.targetCompletionDate}}</td>
                    <td>{{item.progressMetrics}}</td>
                    <td>{{item.status}}</td>
                    <td>{{item.feedback}}</td>
                    <td>{{item.evidenceURL}}</td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="modal" id="myModal2">
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-header">
            <h4 class="modal-title">Development Plans</h4>
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
                        <span class="noshrink"> Plan Type</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Plan Term</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Goal Summary</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Achievement Approach</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Required Resource</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Success Criteria </span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Potential Challenges </span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Target Completion Date </span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>

                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Progress Metrics </span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Status </span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Feedbacks </span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>

                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in paginatedGoals" :key="index" @click="selectItem(item)">

                    <td>{{item.id}}</td>
                    <td>{{item.planTypeId}}</td>
                    <td>{{item.planTermId}}</td>
                    <td>{{item.goalSummary}}</td>
                    <td>{{item.achievementApproach}}</td>
                    <td>{{item.requiredResources}}</td>
                    <td>{{item.successCriteria}}</td>
                    <td>{{item.potentialChallenges}}</td>
                  
                    <td>{{item.targetCompletionDate}}</td>
                    <td>{{item.progressMetrics}}</td>
                    <td>{{item.status}}</td>
                    <td>{{item.feedback}}</td>

                  </tr>
                </tbody>
              </table>

            </div>
          </div>

        </div>
      </div>
    </div>
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
  font-family: "Inter", sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 28.8px;
  width: 800px;
}
.dev {
  display: flex;
  padding: 10px 10px;
  align-items: center;
  gap: 10px;
}
.dev button {
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  width: 252px;
  height: 40px;
  color: #fff;
  font-family: "Inter", sans-serif;
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
  font-family: "Inter", sans-serif;
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
  margin-left: 20%;
  display: inline-flex;
  padding: 30px;
  border-radius: 10px;
  background: #fff;
}
#myModal .modal-content {
  width: 850px;
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
  width: 390px;
  height: 50px;
  color: var(--Grey-Dark, #808080);
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
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
  font-family: "Inter", sans-serif;
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
  font-family: "Inter", sans-serif;
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
#myModal1 .modal-body::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background-color: #f0f0f0; /* Change the scroll bar background color */
}

.modal-body::-webkit-scrollbar-thumb {
  background-color: #337ab7; /* Change the scroll bar thumb color */
  border-radius: 10px;
  border: 2px solid #f0f0f0; /* Add a border to the scroll bar thumb */
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
  color: var(--grey-dark, #808080);
  /* Caption */
  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
  padding: 20px;
}

thead,
tr {
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}
.side-panel {
  display: flex;
  width: 390px;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
  align-self: stretch;
  background: var(--Grey-Light, #eee);
}
@media (max-width: 768px) {
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
    --bs-modal-width: 700px;
    margin-left: 5%;
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
</style>-->
<script setup>
import authService from '../../services/authService';
import TabMenu from '../../components/Tabs/TabMenuTwo.vue';
import DoughNut from '../../components/DoughNut.vue'
// import CareerGoal from '../../components/CareerGoal.vue'
import { ref, onMounted, watch, computed } from 'vue'
import { useGoalsStore } from "@/store/goals"
import MidTerm from "../../components/Tables/MidTerm.vue"
import LongTerm from "../../components/Tables/LongTerm.vue"
import TableOne from "../../components/Tables/TableOne.vue"
import { useUsersStore } from '@/store/users';


const store = useGoalsStore();
var goals = ref(store.goals);
console.log(store.goals);
const usersStore = useUsersStore();
const goal = ref([])
const planType = ref('')
const planTerm = ref('')
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
const createdBy = ref(null)
const lastModifiedBy = ref('')
const recordOwner = ref(null)
// const selectedValue = ref('')
const selectedDate = ref(new Date());  

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

const getQuarter = (date) => {
  const month = date.getMonth() + 1;
  return Math.ceil(month / 3);  
};

watch(selectedDate, (newDate) => {
  selectedYear.value = newDate.getFullYear();
  selectedQuarter.value = getQuarter(newDate);
});


const fetchData = async () => {
  try {
    await store.fetchGoals();

    goal.value = store.goals;
    console.log('Goals:', goal.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

  const defaultUser = {
    id: 4, 
    username: 'James Bond',
  };

const addGoal = async () => {


  const payload = {
    planType: +planType.value,
    planTerm: +planTerm.value, 
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
    createdBy: createdBy.value || defaultUser.id,
    recordOwner: recordOwner.value,
  };

  console.log('Submitting payload:', payload);

  try {
    await store.addGoal(payload);
    await fetchData();

    // Clear form inputs after submission
    planType.value = null;
    planTerm.value = null;
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
    createdBy.value = null;
    lastModifiedBy.value = '';
    recordOwner.value = null;

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

const handleSubmit = async () => {
  try {
    await addGoal(); 

    console.log("Form submitted");

    const modalElement = document.getElementById('myModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
      modal.hide();
    }
  } catch (error) {
    console.error("Error submitting the form:", error);
    
  }
  };

onMounted(async () => {
  await usersStore.fetchUsers();
  await fetchData();
  console.log("Fetched goals")

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

const tab = ref(1);

const showExpandModal = ref(false);
const expandTitle = ref('');
const expandValue = ref('');
const activeField = ref('');

const expandText = (title, value, field) => {
  expandTitle.value = title;
  expandValue.value = value;
  activeField.value = field; 
  showExpandModal.value = true;
};

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
                  <select class="form-select" v-model="planType">
                    <option value="Select Type">Select Type</option>
                    <option value="1">Area of Interest</option>
                    <option value="2">Career Goals and Aspirations</option>
                    <option value="3">Mentorship and Skill Building</option>
                  </select>
                </div>
                <div class="col-sm-12 col-md-6">
                  <label for="planTermId" class="form-label">Duration</label>
                  <select class="form-select" v-model="planTerm">
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

              <div class="row mb-3">
                <div class="col-sm-12 col-md-6">
                  <label for="RecordOwner" class="form-label">Record Owner</label>
                  <select v-model="recordOwner" class="form-select">
                    <option value="" disabled>Select Record Owner</option>
                    <option v-for="user in usersOptions" :key="user.value" :value="user.value">
                      {{ user.label }}
                    </option>
                  </select>
                </div>
                <div class="col-sm-12 col-md-6">
                  <label for="actualCompletionDate" class="form-label">Created By</label>
                  <input type="text" id="createdBy" class="form-control" :value="userNamesMap[createdBy] || defaultUser.id" disabled />
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

            <div class="modal-footer">
              <button type="submit" class="btn btn-success">Submit Request</button>
            </div>
          </div>

        </div>
      </div>
    </form>

    <div class="filters d-flex gap-2">
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
                  <!-- <CareerGoal :year="selectedYear" :quarter="selectedQuarter" /> -->
                  <TableOne :level="selectedLevel" :department="selectedDepartment" :quarter="selectedQuarter" :year="selectedYear" />

                </div>
              </v-container>
            </v-tab-item>

            <v-tab-item :value="2">
              <v-container fluid v-if="tab === 2">
                <div class="chart">
                  <DoughNut />

                </div>
                <div class="table">
                  <MidTerm :level="selectedLevel" :department="selectedDepartment" :quarter="selectedQuarter" :year="selectedYear" />
                </div>
              </v-container>
            </v-tab-item>

            <v-tab-item :value="3">
              <v-container fluid v-if="tab === 3">
                <div class="chart">
                  <DoughNut />

                </div>
                <div class="table">
                  <LongTerm :level="selectedLevel" :department="selectedDepartment" :quarter="selectedQuarter" :year="selectedYear" />
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
  height: 40px;
}

.col-md-6 .form-select {
  width: 400px;
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

.filters .form-select {
  width: 100px;
  border-radius: 10px;
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
  font-family: Roboto, sans-serif;
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

.form-control {
  height: 100px;
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
  font-family: Roboto, sans-serif;
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
  margin-top: 0px;
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
  font-family: Roboto, sans-serif;
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

  .filters .form-select {
    margin-top: 20px;
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
  .dev {
    width: 100%;
  }

  .dev h3 {
    font-size: 12px;
    width: 150px;
    margin-top: 9px;
  }

  .dev button {
    width: 62px;
    height: 25px;
    margin-left: 13px;
    font-size: 11px;
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

@media (max-width: 400px) {
  .filters .form-select {
    display: none;
  }
  .dev {
    width: 100%;
  }
  .dev h3 {
    font-size: 10px;
    width: 130px;
    margin-top: 9px;
  }

  .dev button {
    width: 62px;
    height: 25px;
    margin-left: 0px;
    font-size: 10px;
  }
}
</style>