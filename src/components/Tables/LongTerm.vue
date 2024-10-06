<script setup>
    import { useGoalsStore } from "@/store/goals";
    import { ref, computed, onMounted/*, watchEffect*/ } from 'vue';
    import html2pdf from 'html2pdf.js';
    import { Modal } from 'bootstrap';

    

const store = useGoalsStore();
var goals = ref([])
const goals_ = ref([])
goals_.value = store.goals

const selectedItem = ref(null);
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


onMounted(async () => {
  try {
    await store.fetchGoals();

    if (Array.isArray(store.goals)) {
      goals.value = store.goals;
    } else {
      console.error('Error: store.goals is not an array');
    }

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

const selectedOption = ref('3');
const selectedTerm = ref('3');

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
  
  // document.getElementById('myModal2').style.display = 'block';
  const modalElement = document.getElementById('myModal3');
  const modalInstance = Modal.getOrCreateInstance(modalElement);
  modalInstance.show();
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

    document.getElementById('myModal2').style.display = 'none';
    
  }
};

// const deleteGoal = async (goalId) => {
//   if (confirm('Are you sure you want to delete this goal?')) {
//     await store.deleteGoal(goalId);
//   }
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
  <teleport to="body">

    <form method="post" action="" @submit.prevent="editingGoal ? updateGoal() : handleSubmit">
      <div class="modal" id="myModal3" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add Plan Form</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><b></b></button>
            </div>

            <div class="modal-body">

              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="planTypeId" class="form-label">Development Plan Type</label>
                  <select class="form-select" v-model="planTypeId">
                    <option value="Select Type">Select Type</option>
                    <option value="1">Area of Robotoest</option>
                    <option value="2">Career Goals and Aspirations</option>
                    <option value="3">Mentorship and Skill Building</option>
                  </select>
                </div>
                <div class="col-md-6">
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
                <div class="col-md-6">
                  <label for="goalSummary" class="form-label">Goal</label>
                  <textarea v-model="goalSummary" class="form-control" rows="3" placeholder="Goal"></textarea>
                  <button type="button" class="expand" @click="expandText('Goal', goalSummary, 'goalSummary')">Expand</button>
                </div>
                <div class="col-md-6">
                  <label for="achievementApproach" class="form-label">What I will do to achieve this</label>
                  <textarea v-model="achievementApproach" class="form-control" rows="3" placeholder="What I will do to achieve this"></textarea>
                  <button type="button" class="expand" @click="expandText('Achievement Approach', achievementApproach, 'achievementApproach')">Expand</button>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="requiredResources" class="form-label">Resources and Support Needed</label>
                  <textarea v-model="requiredResources" class="form-control" rows="3" placeholder="Resources and Support Needed"></textarea>
                  <button type="button" class="expand" @click="expandText('Required Resources', requiredResources, 'requiredResources')">Expand</button>
                </div>
                <div class="col-md-6">
                  <label for="successCriteria" class="form-label">What does success look like?</label>
                  <textarea v-model="successCriteria" class="form-control" rows="3" placeholder="What does success look like?"></textarea>
                  <button type="button" class="expand" @click="expandText('What does success look like?', successCriteria, 'successCriteria')">Expand</button>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="potentialChallenges" class="form-label">Potential Challenges</label>
                  <textarea v-model="potentialChallenges" class="form-control" rows="3" placeholder="Potential Challenges"></textarea>
                  <button type="button" class="expand" @click="expandText('Potential Challenges', potentialChallenges, 'potentialChallenges')">Expand</button>
                </div>
                <div class="col-md-6">
                  <label for="solutionToChallenges" class="form-label">Solution</label>
                  <textarea v-model="solutionToChallenges" class="form-control" rows="3" placeholder="Solution"></textarea>
                  <button type="button" class="expand" @click="expandText('Solution', solutionToChallenges, 'solutionToChallenges')">Expand</button>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-6 d-flex flex-column">
                  <label for="goalSummary" class="form-label">Target Date for Completion</label>
                  <input type="date" v-model="targetCompletionDate">
                </div>
                <div class="col-md-6">
                  <label for="progressMetrics" class="form-label">Progress Metrics(Outcome Based)</label>
                  <textarea v-model="progressMetrics" class="form-control" rows="3" placeholder="Progress Metrics"></textarea>
                  <button type="button" class="expand" @click="expandText('Solution', progressMetrics, 'progressMetrics')">Expand</button>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-6 d-flex flex-column">
                  <label for="goalSummary" class="form-label">Status</label>
                  <select class="form-select" v-model="status">
                    <option value="Select Type">Select Type</option>
                    <option class="opt" value="Completed">Completed</option>
                    <option class="opt" value="On-going">On-going</option>
                    <option class="opt" value="Not started">Not started</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="feedback" class="form-label">Feedback</label>
                  <textarea v-model="feedback" class="form-control" rows="3" placeholder="Feedback"></textarea>
                  <button type="button" class="expand" @click="expandText('Feedback', feedback, 'feedback')">Expand</button>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-6 d-flex flex-column">
                  <label for="Evidence" class="form-label">Evidence</label>
                  <input type="file" class="form-control" @change="handleFileChange">
                </div>
                <div class="col-md-6 d-flex flex-column">
                  <label for="Actual Completion Date" class="form-label">Actual Completion Date</label>
                  <input type="date" v-model="actualCompletionDate">
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
              <button type="submit" class="btn btn-success" data-bs-dismiss="modal">{{ editingGoal ? 'Update' : 'Submit' }}</button>
            </div>
          </div>
        </div>
      </div>
    </form>

  </teleport>
  <div class="title">
    <div class="modal" id="myModal1">
      <div class="modal-dialog">
        <div class="modal-content">
          <v-pagination v-model="currentPage" :length="totalPages"></v-pagination>
          <v-btn @click="downloadPDF">Download as PDF</v-btn>
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Development Plans</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
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

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Plan</span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Term</span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Achieve</span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Resources</span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Success</span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Potential</span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Solution </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Date </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Progress</span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Status</span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Feedback</span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Evidence</span>

                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in paginatedGoals" :key="index" @click="selectItem(item)" @dblclick="$router.push({ name: 'Skill Assessment Details', params: { id: item.id } })">

                    <!-- <tr v-for="item in skills" @click="selectItem(item)" @dblclick="$router.push({name: 'Skill Assessment Details', params: {id: item.id}})"> -->
                    <td>{{item.id}}</td>
                    <td>{{item.plan}}</td>
                    <td>{{item.term}}</td>
                    <td>{{item.goal}}</td>
                    <td>{{item.achieve}}</td>
                    <td>{{item.resource}}</td>
                    <td>{{item.potential}}</td>
                    <td>{{item.solution}}</td>
                    <td>{{item.date}}</td>
                    <td>{{item.progress}}</td>
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

    <button class="view mt-2" data-bs-toggle="modal" data-bs-target="#myModal1" type="button">View All</button>
  </div>
  <select class="form-select space mt-2" v-model="selectedOption">

    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.text }}
    </option>
  </select>
  <div class="d-flex">
    <div class="table-container flex-grow-1">
      <div class="table-responsive mt-3">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">
                <div class="d-flex align-center gap-1">
                  <span class="noshrink">S/N</span>

                </div>
              </th>
              <th scope="col">
                <div class="d-flex align-center gap-1">
                  <span class="noshrink"> Plan</span>

                </div>
              </th>
              <th scope="col">
                <div class="d-flex align-center gap-1">
                  <span class="noshrink"> Term</span>

                </div>
              </th>
              <th scope="col">
                <div class="d-flex align-center gap-1">
                  <span class="noshrink"> Goal</span>

                </div>
              </th>
              <th scope="col">
                <div class="d-flex align-center gap-1">
                  <span class="noshrink"> Status</span>

                </div>
              </th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in filteredGoals" :key="index" @dblclick="editGoal(item)">
              <td>{{item.id}}</td>
              <td>{{item.planTypeId}}</td>
              <td>{{item.planTermId}}</td>
              <td>{{item.goalSummary}}</td>
              <td>{{item.status}}</td>

            </tr>
          </tbody>
        </table>
      </div>
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

.modal {
  background-color: rgba(0, 0, 0, 0.5);
  overflow-y: auto;
}

.modal-dialog {
  --bs-modal-width: 900px;
  width: 900px;
  height: 1150px;
  margin-left: 13%;
  display: inline-flex;
  padding: 30px;
  border-radius: 10px;
  background: #fff;
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

.modal-footer .btn {
  width: 110px;
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  color: #fff;
}

input {
  width: 390px;
}

.space {
  width: 220px;
  color: var(--Grey-Dark, #000);
  font-family: "Roboto", sans-serif;
  font-size: 12px;
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
  padding: 10px;
}

thead,
tr {
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}

.wrap {
  width: 100%;
}

.modal {
  margin-left: 5%;
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