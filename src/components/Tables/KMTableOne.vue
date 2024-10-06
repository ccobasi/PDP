<script setup>
     import { useKMGoalsStore } from "@/store/kmgoals";
    import { ref, computed, onMounted, watch } from 'vue';
    import AccordionCard from "../Cards/AccordionCard.vue"
    import { useRoute } from 'vue-router';
    import html2pdf from 'html2pdf.js';


const store = useKMGoalsStore();
// var goals = store.kmgoals;
const goals_ = ref([])
goals_.value = store.kmgoals


const selectedItem = ref(null);
const goals = ref([]);
const planTypeId = ref('');
const planTermId = ref('');
const goalSummary = ref('')
const achievementApproach = ref('')
const requiredResources = ref('')
const successCriteria  = ref('')
const potentialChallenges = ref('')
const solutionToChallenges = ref('')
const targetCompletionDate = ref('')
const progressMetrics = ref('')
const status = ref('')
const feedback = ref('')
const editingGoal = ref(null);


const fetchData = async () => {
  try {
    await store.fetchGoals();

    goals.value = store.goals;

    console.log('Goals:', goals.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(async () => {
  try {
    await store.fetchGoals();

    if (Array.isArray(store.kmgoals)) {
      goals.value = store.kmgoals;
    } else {
      console.error('Error: store.goals is not an array');
    }

    watch(
      () => store.kmgoals,
      (newGoals) => {
        if (Array.isArray(newGoals)) {
          goals.value = newGoals;
        } else {
          console.error('Error: store.goals is not an array');
        }
      }
    );

    console.log('Goals:', goals.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

const selectItem = (item) => {
  selectedItem.value = item;
  console.log(selectedItem)
};

const itemsPerPage = 15; 
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(goals.value.length / itemsPerPage));

const paginatedGoals = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // return goals.value.slice(startIndex, endIndex);
  return goals.value.length > 0 ? goals.value.slice(startIndex, endIndex) : [];
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

const options = ref([
  { value: '2', text: 'Career Goals and Aspirations' },
  { value: '1', text: 'Areas of Interest' },
  { value: '3', text: 'Mentorship and Skills Building' },
]);

const selectedOption = ref('2');
const selectedTerm = ref('1');

const filteredGoals = computed(() => {
  console.log('Selected Option:', selectedOption.value);
  console.log('Selected Term:', selectedTerm.value);
  console.log('Goals:', goals.value);

  return goals.value.length > 0 ? goals.value.filter(item => {
    console.log('Item PlanTypeId:', item.planTypeId, 'Item PlanTermId:', item.planTermId);
    return item.planTypeId === parseInt(selectedOption.value) && item.planTermId === parseInt(selectedTerm.value);
  }) : [];
});

const editGoal = (goal) => {
  console.log('Editing Goal:', goal);
  if (!goal) {
    console.error('Error: goal is undefined');
    return;
  }
  editingGoal.value = { ...goal };
  
  planTypeId.value = goal.planTypeId;
  planTermId.value = goal.planTermId;
  goalSummary.value = goal.goalSummary;
  achievementApproach.value = goal.achievementApproach;
  requiredResources.value = goal.requiredResources;
  successCriteria.value = goal.successCriteria;
  potentialChallenges.value = goal.potentialChallenges;
  solutionToChallenges.value = goal.solutionToChallenges;
  targetCompletionDate.value = goal.targetCompletionDate;
  progressMetrics.value = goal.progressMetrics;
  status.value = goal.status;
  feedback.value = goal.feedback;
  
  document.getElementById('myModal3').style.display = 'block';
};

const updateGoal = async () => {
  if (editingGoal.value) {
    editingGoal.value.planTypeId = planTypeId.value;
    editingGoal.value.planTermId = planTermId.value;
    editingGoal.value.goalSummary = goalSummary.value;
    editingGoal.value.achievementApproach = achievementApproach.value;
    editingGoal.value.requiredResources = requiredResources.value;
    editingGoal.value.successCriteria = successCriteria.value;
    editingGoal.value.potentialChallenges = potentialChallenges.value;
    editingGoal.value.solutionToChallenges = solutionToChallenges.value;
    editingGoal.value.targetCompletionDate = targetCompletionDate.value;
    editingGoal.value.progressMetrics = progressMetrics.value;
    editingGoal.value.status = status.value;
    editingGoal.value.feedback = feedback.value;

    await store.updateGoal(editingGoal.value);
    editingGoal.value = null;

    document.getElementById('myModal3').style.display = 'none';
  }
};

const deleteGoal = async (goalId) => {
  if (confirm('Are you sure you want to delete this goal?')) {
    await store.deleteGoal(goalId);
  }
};
    const isUserRoute = computed(() => {
  const route = useRoute();
  return route.path !== '/';
});

const deleteSelectedGoal = () => {
  if (selectedItem.value) {
    store.deleteGoal(selectedItem.value.id);
    selectedItem.value = null;
  } else {
    console.error('No goal selected for deletion.');
  }
};
</script>

<template>
  <form method="post" action="" @submit.prevent="editingGoal ? updateGoal() : handleSubmit">
    <div class="modal" id="myModal3" tabindex="-1">
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
                <select v-model="status" v-on:change="onSelectChange(e)" class="form-selects" aria-label="Default select example">
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

            <div class="types">
              <div class="upload">
                <v-btn :loading="loadingUpload" height="48" rounded="xl" size="small" @click="openFileInput" variant="flat">Upload Evidence</v-btn>

                <input type="file" id="getFile" style="display:none" @change="handleFileChange" accept="application/pdf" ref="evidenceURL">
              </div>
            </div>
          </div>
          <div class="modal-footer">

            <button type="submit" class="btn btn-success" data-bs-dismiss="modal" @click="$router.push('/')">{{ editingGoal ? 'Update' : 'Submit' }}</button>
          </div>

        </div>
      </div>
    </div>
  </form>
  <div class="modal" id="myModal1">
    <div class="modal-dialog">
      <div class="modal-content">
        <v-pagination v-model="currentPage" :length="totalPages"></v-pagination>
        <v-btn @click="downloadPDF">Download as PDF</v-btn>
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Development Plans</h4>
          <!-- <button type="button" class="btn-close" data-bs-dismiss="modal">X</button> -->
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
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
                <tr v-for="(item, index) in paginatedGoals" :key="index" @click="selectItem(item)">

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
                  <td>{{item.evidence}}</td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>

      </div>
    </div>
  </div>
  <div class="title mb-3">

    <button class="view" data-bs-toggle="modal" data-bs-target="#myModal1" type="button">View All</button>
  </div>
  <select class="form-select" v-model="selectedOption">

    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.text }}
    </option>
  </select>
  <div class="table-responsive">

    <table class="table">
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
              <span class="noshrink"> Goal</span>

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

        </tr>
      </thead>
      <tbody>

        <tr v-for="(item, index) in filteredGoals" :key="index" @click="selectItem(item)">
          <td>{{item.id}}</td>
          <td>{{item.planTypeId}}</td>
          <td>{{item.planTermId}}</td>
          <td>{{item.goalSummary}}</td>

          <td>{{item.status}}</td>
          <td>
            <v-icon icon="mdi-pencil" class="icon-warning" @click="editGoal(item)"></v-icon>
            <!-- <v-icon icon="mdi-delete" class="icon-danger" @click="deleteGoal(item.id)"></v-icon> -->
          </td>
        </tr>

      </tbody>
    </table>
    <div class="side-panel">

      <h3> Details </h3>
      <AccordionCard :item="selectedItem" />
      <div v-if="isUserRoute" class="delete"><button>Delete</button></div>
    </div>
  </div>
</template>

<style scoped>
.d-flex {
  display: flex;
  align-items: flex-start; /* Prevents vertical stretching of the table */
  align-items: flex-start;
}

.table-container {
  flex-grow: 1; /* Allows the table to grow and take up available space */
}

.table-responsive {
  flex-grow: 1; /* Let the table container take up available space */
}

.table-responsive {
  display: flex;
  flex-direction: row;
}
.title {
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
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
table {
  width: 800px;
}
thead tr th {
  font-size: 12px;
  font-weight: 600;
  line-height: 14.4px;
  padding: 15px;
}
tbody tr {
  height: 50px; /* Set a fixed height for table rows */
  overflow: hidden; /* Hide overflowing content */
}
tbody tr td {
  color: var(--grey-dark, #808080);
  /* Caption */
  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
  padding: 10px;
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
.side-panel h4 {
  color: var(--Black, #000);
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 28.8px;
}
.accordion-item {
  display: flex;
  width: 350px;
  height: 57px;
  padding: 15px 0px;
  justify-content: space-between;
  align-items: center;
}
.accordion-button {
  width: 330px;
}
.wrap {
  width: 100%;
}
.accordion-body textarea {
  width: 300px;
  height: 100px;
  border: 1px solid #eee;

  border-radius: 5px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--Grey-Light, #eee);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
}
.accordion-body textarea::placeholder {
  color: var(--Grey-Dark, #808080);
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}
.accordion-body input {
  width: 300px;
}
.accordion-body button {
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
.delete {
  display: flex;
  padding: 20px 0px;
  justify-content: flex-end;
  align-items: center;
  gap: 11px;
  align-self: stretch;
}
.delete button {
  display: flex;
  padding: 10px 30px;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  background: var(--Red, #f00);
  color: var(--White, #fff);
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
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
  height: 1025px;
  margin-left: 1%;
  display: inline-flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 10px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--Grey-Light, #eee);
}
.modal-backdrop {
  --bs-backdrop-zindex: -1;
}
.modal-content {
  width: 1228px;
  z-index: 1200;
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
  width: 320px;
  height: 70px;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border: 1px solid #808080;
  border-radius: 5px;
}
.type input {
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
.icon-warning {
  color: orange;
}

.icon-danger {
  color: red;
}
@media (max-width: 768px) {
  .table-responsive {
    flex-direction: column;
  }
  .modal-dialog {
    width: 100%;
    height: auto;
    padding: 10px;
  }

  .modal-body {
    padding: 10px;
  }

  .form-select {
    width: 100%;
  }

  .table {
    width: 100%;
  }

  thead tr th {
    font-size: 10px;
    padding: 10px;
  }

  tbody tr td {
    font-size: 10px;
    padding: 8px;
  }

  .side-panel {
    width: 100%;
  }

  .side-panel h3 {
    font-size: 18px;
  }

  .accordion-item {
    width: 100%;
    height: auto;
    padding: 10px;
  }

  .accordion-button {
    width: 100%;
  }

  .accordion-body textarea {
    width: 100%;
  }

  .accordion-body input {
    width: 100%;
  }

  .accordion-body button {
    width: 100%;
  }

  .delete {
    justify-content: center;
  }

  .delete button {
    width: 100%;
  }
}
</style>