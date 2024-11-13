<script setup>
    import authService from '../../services/authService';
    import { useGoalsStore } from "@/store/goals";
    import { ref, computed, onMounted, watch } from 'vue';
    import { Modal } from 'bootstrap';
    import { useUsersStore } from '@/store/users';

    // import { useRoute } from 'vue-router';
    // import html2pdf from 'html2pdf.js';

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

const store = useGoalsStore();
const usersStore = useUsersStore()
const goals = ref([]);
const goals_ = ref([])
goals_.value = store.goals
console.log(goals_);
const planType = ref(null);
const planTerm = ref(null);
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
const selectedItem = ref(null);
const editingGoal = ref(null);
const createdBy = ref(null)
const recordOwner = ref(null)

const fetchData = async () => {
  try {
    await store.fetchGoals();

    goals.value = store.goals;

    console.log('Goals:', goals.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


// const selectedOwner = ref('');

onMounted(async () => {
  initializeModal();

  try {
    await store.fetchGoals();
    console.log('Store Goals:', store.goals); // Log the goals to check their value

    if (Array.isArray(store.goals)) {
      goals.value = store.goals; // Assign the array to goals.value
    } else {
      console.error('Error: store.goals is not an array');
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
    () => store.goals,
    (newGoals) => {
      if (Array.isArray(newGoals)) {
        goals.value = newGoals; // Update the goals when store.goals changes
      } else {
        console.error('Error: store.goals is not an array');
      }
    }
  );

  fetchData();
  console.log('Goals:', goals.value);
  watch([() => props.level, () => props.department, () => props.quarter, () => props.year], fetchData);
});

const itemsPerPage = 20; 
const currentPage = ref(1);
   

const options = ref([
  { value: '2', text: 'Career Goals and Aspirations' },
  { value: '1', text: 'Areas of Interest' },
  { value: '3', text: 'Mentorship and Skills Building' },
]);

const selectedOption = ref('2');
const selectedTerm = ref('1');

const filteredGoals = computed(() => {
  const goalData = goals.value && Array.isArray(goals.value) ? goals.value : [];

  return goalData.filter(item => {
    const createdDate = item.createdDate ? new Date(item.createdDate) : null;
    const itemYear = createdDate ? createdDate.getFullYear() : null;
    const itemMonth = createdDate ? createdDate.getMonth() : null;
    const itemQuarter = itemMonth !== null ? Math.floor(itemMonth / 3) + 1 : null;

    const matchesYear = !props.year || (itemYear !== null && itemYear === parseInt(props.year));
    const matchesQuarter = !props.quarter || (itemQuarter !== null && itemQuarter === parseInt(props.quarter.slice(-1))); 

    // Adjusted to access nested `id` fields in planType and planTerm
    const matchesOption = selectedOption.value === null || (item.planType?.id === parseInt(selectedOption.value));
    const matchesTerm = selectedTerm.value === null || (item.planTerm?.id === parseInt(selectedTerm.value));

    const matchesDepartment = !props.department || (item.recordOwner?.department.option === props.department);
    const matchesLevel = !props.level || (item.recordOwner?.role?.option === props.level);

    const matchesRecordOwner = !props.recordOwner || (item.recordOwner === props.recordOwner);

    const criteria = {
      item,
      matchesYear,
      matchesQuarter,
      matchesOption,
      matchesTerm,
      matchesDepartment,
      matchesLevel,
      matchesRecordOwner,
    };

    console.log("Matching Criteria:", criteria);

    return matchesYear && matchesQuarter && matchesOption && matchesTerm && matchesDepartment && matchesLevel && matchesRecordOwner;
  });
});


const paginatedGoals = computed(() => {
  console.log("Filtered Goals:", filteredGoals.value);
  console.log("Goals Data:", goals.value);

  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredGoals.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => Math.ceil(filteredGoals.value.length / itemsPerPage));

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

const editGoal = (goal) => {
  console.log('Editing Goal:', goal);
  if (!goal) {
    console.error('Error: goal is undefined');
    return;
  }
  editingGoal.value = { ...goal };
  
  planType.value = parseInt(goal.planType, 10);
  planTerm.value = parseInt(goal.planTerm, 10);
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
  recordOwner.value = goal.recordOwner.userId;
  createdBy.value = goal.createdBy;
  // document.getElementById('myModal3').style.display = 'block';
   const modalElement = document.getElementById('myModal3');
  const modalInstance = Modal.getOrCreateInstance(modalElement);
  modalInstance.show();
};

const updateGoal = async () => {
  if (editingGoal.value) {
    editingGoal.value.planType = parseInt(planType.value, 10);
    editingGoal.value.planTerm = parseInt(planTerm.value, 10);
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
    editingGoal.value.recordOwner = recordOwner.value;
    editingGoal.value.createdBy = createdBy.value;

    console.log(planTerm.value);
    console.log(planType.value);

    await store.modifyGoal(editingGoal.value);
    editingGoal.value = null;

    document.getElementById('myModal3').style.display = 'none';
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

const planTypeMap = {
      1: 'Area of Interest',
      2: 'Career Goals and Aspirations',
      3: 'Mentorship and Skill Building',
    };

    const planTermMap = {
      1: 'Short Term Goal',
      2: 'Mid Term Goal',
      3: 'Long Term Goal',
    };

const currentIndex = ref(0);
const modalInstance = ref(null);
const initializeModal = () => {
  const modalElement = document.getElementById('myModal4');
  modalInstance.value = Modal.getOrCreateInstance(modalElement);
};

const loadGoal = (index) => {
  if (index >= 0 && index < goals.value.length) {
    selectedItem.value = goals.value[index];
  }
};

const nextGoal = () => {
  if (currentIndex.value < goals.value.length - 1) {
    currentIndex.value++;
    loadGoal(currentIndex.value);
  }
};

const prevGoal = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    loadGoal(currentIndex.value);
  }
};


watch(currentIndex, (newIndex) => {
  loadGoal(newIndex);
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
  editGoal(item);  
};

const showModal = (modal) => {
  modal.style.display = 'block';
};

const closeModal = (modalRef) => {
  const modal = modalRef === 'singleClickModal' ? singleClickModal.value : doubleClickModal.value;
  modal.style.display = 'none';
};

  const defaultUser = {
    id: 4, 
    username: 'James Bond',
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
</script>
<template>
  <div class="scrollable-container">
    <div class="d-goal">
      <teleport to="body">

        <form method="post" action="" @submit.prevent="editingGoal ? updateGoal() : handleSubmit">
          <div class="modal" id="myModal3" tabindex="-1" ref="doubleClickModal">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Update Development Plan Form</h4>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal('doubleClickModal')"><b></b></button>
                </div>

                <div class="modal-body">

                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label for="planTypeId" class="form-label">Development Plan Type</label>
                      <select class="form-select" v-model="planType">
                        <option value="Select Type">Select Type</option>
                        <option value="1">Area of Interest</option>
                        <option value="2">Career Goals and Aspirations</option>
                        <option value="3">Mentorship and Skill Building</option>
                      </select>
                    </div>
                    <div class="col-md-6">
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
                      <input type="file" class="form-control" @change="handleFileChange" style="height:40px;padding:10px">
                    </div>
                    <div class="col-md-6 d-flex flex-column">
                      <label for="Actual Completion Date" class="form-label">Actual Completion Date</label>
                      <input type="date" v-model="actualCompletionDate">
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

      <teleport to="body">
        <form method="post">
          <div class="modal" id="myModal4" tabindex="-1" ref="singleClickModal">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Development Plan</h4>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal('singleClickModal')"></button>
                </div>

                <div class="modal-body">
                  <div class="row mb-2">
                    <div class="col-md-6">
                      <label for="planTypeId" class="form-label">Development Plan Type</label>
                      <select class="form-select" v-if="selectedItem" v-model="selectedItem.planType" disabled>
                        <option value="">Select Type</option>
                        <option value="1">Area of Interest</option>
                        <option value="2">Career Goals and Aspirations</option>
                        <option value="3">Mentorship and Skill Building</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label for="planTermId" class="form-label">Duration</label>
                      <select class="form-select" v-if="selectedItem" v-model="selectedItem.planTerm" disabled>
                        <option value="">Select Term</option>
                        <option value="1">Short Term Goal</option>
                        <option value="2">Mid Term Goal</option>
                        <option value="3">Long Term Goal</option>
                      </select>
                    </div>
                  </div>

                  <div class="row mb-2">
                    <div class="col-md-6">
                      <label for="goalSummary" class="form-label">Goal</label>
                      <textarea readonly v-if="selectedItem" v-model="selectedItem.goalSummary" class="form-control" rows="3" placeholder="Goal"></textarea>
                    </div>
                    <div class="col-md-6">
                      <label for="achievementApproach" class="form-label">What I will do to achieve this</label>
                      <textarea readonly v-if="selectedItem" v-model="selectedItem.achievementApproach" class="form-control" rows="3" placeholder="What I will do to achieve this"></textarea>
                    </div>
                  </div>

                  <div class="row mb-2">
                    <div class="col-md-6">
                      <label for="requiredResources" class="form-label">Resources and Support Needed</label>
                      <textarea readonly v-if="selectedItem" v-model="selectedItem.requiredResources" class="form-control" rows="3" placeholder="Resources and Support Needed"></textarea>
                    </div>
                    <div class="col-md-6">
                      <label for="successCriteria" class="form-label">What does success look like?</label>
                      <textarea readonly v-if="selectedItem" v-model="selectedItem.successCriteria" class="form-control" rows="3" placeholder="What I will do to achieve this"></textarea>
                    </div>
                  </div>

                  <div class="row mb-2">
                    <div class="col-md-6">
                      <label for="potentialChallenges" class="form-label">Potential Challenges</label>
                      <textarea readonly v-if="selectedItem" v-model="selectedItem.potentialChallenges" class="form-control" rows="3" placeholder="Potential Challenges"></textarea>
                    </div>
                    <div class="col-md-6">
                      <label for="solutionToChallenges" class="form-label">Solution</label>
                      <textarea readonly v-if="selectedItem" v-model="selectedItem.solutionToChallenges" class="form-control" rows="3" placeholder="Solution"></textarea>
                    </div>
                  </div>

                  <div class="row mb-2">
                    <div class="col-md-6 d-flex flex-column">
                      <label for="goalSummary" class="form-label">Target Date for Completion</label>
                      <div v-if="selectedItem">
                        <p>{{ selectedItem.targetCompletionDate }}</p>

                      </div>
                    </div>
                    <div class="col-md-6">
                      <label for="progressMetrics" class="form-label">Progress Metrics(Outcome Based)</label>
                      <textarea readonly v-if="selectedItem" v-model="selectedItem.progressMetrics" class="form-control" rows="3" placeholder="Progress Metrics"></textarea>
                    </div>
                  </div>

                  <div class="row mb-2">
                    <div class="col-md-6 d-flex flex-column">
                      <label for="goalSummary" class="form-label">Status</label>
                      <select class="form-select" v-if="selectedItem" v-model="selectedItem.status" disabled>
                        <option value="Select Type">Select Type</option>
                        <option class="opt" value="Completed">Completed</option>
                        <option class="opt" value="On-going">On-going</option>
                        <option class="opt" value="Not started">Not started</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label for="feedback" class="form-label">Feedback</label>
                      <textarea readonly v-if="selectedItem" v-model="feedback" class="form-control" rows="3" placeholder="Feedback"></textarea>
                    </div>
                  </div>

                  <div class="row mb-2">
                    <div class="col-md-6 d-flex flex-column">
                      <label for="Evidence" class="form-label">Evidence</label>
                      <input readonly type="file" class="form-control" @change="handleFileChange" style="height:40px;padding:10px">
                    </div>
                    <div class="col-md-6 d-flex flex-column">
                      <label for="Actual Completion Date" class="form-label">Actual Completion Date</label>
                      <div v-if="selectedItem">
                        <p>{{ selectedItem.actualCompletionDate }}</p>

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
                  <div class="prev">
                    <button type="button" class="btn btn-secondary" @click="prevGoal">Previous</button>
                  </div>
                  <div class="next">
                    <button type="button" class="btn btn-secondary" @click="nextGoal">Next</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </teleport>
    </div>

    <div class="title">

      <button class="view" data-bs-toggle="modal" data-bs-target="#myModal2" type="button">View All</button>
    </div>
    <select class="form-select space mt-2" v-model="selectedOption">

      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.text }}
      </option>
    </select>

    <div class="d-flex">
      <div class="table-container">
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
              <!-- <tr v-for="(item, index) in paginatedGoals" :key="index" @click="selectItem(item, index)" @dblclick="editGoal(item)"> -->
              <tr v-for="(item, index) in paginatedGoals" :key="index" @click="handleClick(item)" @dblclick="handleDoubleClick(item)">
                <td>{{item.id}}</td>
                <td>{{ planTypeMap[item.planType?.id] || 'N/A' }}</td>
                <td>{{ planTermMap[item.planTerm?.id] || 'N/A' }}</td>

                <td>
                  <div class="goal-summary" :title="item.goalSummary">
                    {{ item.goalSummary.length > 50 ? item.goalSummary.substring(0, 50) + '...' : item.goalSummary }}
                  </div>
                </td>
                <td>{{item.status}}</td>
                <td>

                  <!-- <v-icon icon="mdi-delete" class="icon-danger" @click="deleteGoal(item.id)"></v-icon> -->
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
  height: 40px;
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
  height: 1250px;
  margin-left: 13%;
  display: inline-flex;
  padding: 30px;
  border-radius: 10px;
  background: #eeeeee;
}

.modal-title {
  font-family: Roboto;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  text-align: left;
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

.wrap {
  gap: 10px;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
}

input {
  width: 390px;
  height: 40px;
  padding: 10px;
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
  align-items: flex-start;
  align-items: flex-start;
}

.table-container {
  width: 100%;
}

.goal-summary {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
}

.goal-summary-wrap {
  word-wrap: break-word;
  max-width: 250px;
}

.table-responsive {
  flex-grow: 1;
}

.table-responsive {
  width: 100%;
  display: flex;
  flex-direction: row;
}

table {
  width: 100%;
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

tbody tr {
  height: 50px;
  overflow: hidden;
}

.container {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
}

.responsive-table li {
  border-radius: 3px;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
}

.responsive-table .table-header {
  background-color: #47b65c;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: #fff;
}

.responsive-table .table-row {
  background-color: #fff;
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
}

.responsive-table .col-1 {
  flex-basis: 10%;
}

.responsive-table .col-2 {
  flex-basis: 40%;
}

.responsive-table .col-3 {
  flex-basis: 25%;
}

.responsive-table .col-4 {
  flex-basis: 25%;
}

button:not(:disabled) {
  cursor: pointer;
}

.form-select,
.form-selects {
  width: 390px;
  height: 40px;
  color: var(--Grey-Dark, #000);
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}

.space {
  width: 220px;
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
  }
  .modal-body {
    width: 100%;
  }
  .form-select {
    width: 100%;
  }

  #myModal4 .area,
  #myModal4 textarea {
    width: 100%;
    height: 110px;
  }

  #myModal4 p {
    width: 100%;
  }

  .prev {
    width: 300px;
    height: 110px;
  }

  .next {
    width: 300px;
    height: 110px;
  }

  input {
    width: 100%;
  }
}

@media only screen and (max-width: 820px) {
  .modal-dialog {
    height: 1850px;
  }
}

@media only screen and (max-width: 768px) {
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

  #myModal4 .area,
  #myModal4 textarea {
    width: 100%;
    height: 110px;
  }

  #myModal4 p {
    width: 100%;
  }

  #myModal4 .modal-footer {
    width: 100%;
    margin: 0;
    gap: 20px;
  }

  .prev {
    width: 230px;
    height: 110px;
  }

  .next {
    width: 230px;
    height: 110px;
  }

  input {
    width: 100%;
  }
}

@media only screen and (max-width: 576px) {
  .view {
    font-size: 14px;
    height: 30px;
  }

  .form-select {
    width: 150px;
    font-size: 10px;
  }

  #myModal4 .modal-dialog {
    height: 1850px;
  }

  #myModal4 .area,
  #myModal4 textarea {
    width: 100%;
    height: 110px;
  }

  #myModal4 p {
    width: 100%;
  }

  input {
    width: 100%;
  }

  #myModal4 .modal-footer {
    width: 100%;
    margin: 0;
    gap: 20px;
  }

  .prev {
    width: 100px;
    height: 110px;
  }

  .next {
    width: 100px;
    height: 110px;
  }
}
</style>