<script setup>
    import { ref, computed, onMounted, watch } from 'vue';
    import { Modal } from 'bootstrap';
    import {useSkillsStore} from "@/store/skills"
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

const store = useSkillsStore();
const skills = ref([]);
const editingSkill = ref(null);

console.log(store.skills);

const skillDescription = ref('')
const currentStageId = ref('')
const skillGapDetails = ref('')
const desiredStageId = ref('')
const initiatives  = ref('')
const requiredResources  = ref('')
const successCriteria  = ref('')
const potentialChallenges  = ref('')
const solutionToChallenges  = ref('')
const targetCompletionDate  = ref('')
// const createdBy  = ref('')
// const lastModifiedBy  = ref('')
const status = ref('')
const feedback = ref('')
// const evidenceURL = ref(null)
const selectedItem = ref(null);

// const fetchData = async () => {
//   try {
//     await store.fetchSkills();

//     skills.value = store.skills;

//     console.log('Skills:', skills.value);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };

onMounted(async () => {
  initializeModal()  
  try {
    await store.fetchSkills();

    if (Array.isArray(store.skills)) {
      skills.value = store.skills;
    } else {
      console.error('Error: store.skills is not an array');
    }

  watch(
      () => store.skills,
      (newSkills) => {
        if (Array.isArray(newSkills)) {
          skills.value = newSkills;
        } else {
          console.error('Error: store.skills is not an array');
        }
      });
    
        console.log('Skills:', skills.value);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
});

const editSkill = (skill) => {
  editingSkill.value = { ...skill };
  
  skillDescription.value = skill.skillDescription;
  skillGapDetails.value = skill.skillGapDetails;
  desiredStageId.value = skill.desiredStageId;
  initiatives.value = skill.initiatives;
  requiredResources.value = skill.requiredResources;
  successCriteria.value = skill.successCriteria;
  potentialChallenges.value = skill.potentialChallenges;
  solutionToChallenges.value = skill.solutionToChallenges;
  targetCompletionDate.value = skill.targetCompletionDate;
  status.value = skill.status;
  feedback.value = skill.feedback;
  // evidenceURL.value = skill.evidenceURL;
  
  // document.getElementById('myModal1').style.display = 'block';
   const modalElement = document.getElementById('myModal1');
  const modalInstance = Modal.getOrCreateInstance(modalElement);
  modalInstance.show();
};

const updateSkill = async () => {
  if (editingSkill.value) {
    editingSkill.value.skillDescription = skillDescription.value;
    editingSkill.value.skillGapDetails = skillGapDetails.value;
    editingSkill.value.desiredStageId = desiredStageId.value;
    editingSkill.value.initiatives = initiatives.value;
    editingSkill.value.requiredResources = requiredResources.value;
    editingSkill.value.successCriteria = successCriteria.value;
    editingSkill.value.potentialChallenges = potentialChallenges.value;
    editingSkill.value.solutionToChallenges = solutionToChallenges.value;
    editingSkill.value.targetCompletionDate = targetCompletionDate.value;
    editingSkill.value.status = status.value;
    editingSkill.value.feedback = feedback.value;
    // editingSkill.value.evidenceURL = evidenceURL.value;
    await store.updateSkill(editingSkill.value);
    editingSkill.value = null;

    document.getElementById('myModal1').style.display = 'none';
  }
};

// const deleteSkill = async (skillId) => {
//   if (confirm('Are you sure you want to delete this skill?')) {
//     await store.deleteSkill(skillId);
//   }
// };


// const selectItem = (item) => {
//   selectedItem.value = item;
//   console.log(selectedItem)
// };

const itemsPerPage = 15; 
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(skills.value.length / itemsPerPage));

const filteredSkills = computed(() => {
  const skillData = skills.value && Array.isArray(skills.value) ? skills.value : [];

  return skillData.filter(item => {
    const createdDate = item.createdDate ? new Date(item.createdDate) : null;
    const itemYear = createdDate ? createdDate.getFullYear() : null;
    const itemMonth = createdDate ? createdDate.getMonth() : null;
    const itemQuarter = itemMonth !== null ? Math.floor(itemMonth / 3) + 1 : null;

    const matchesYear = !props.year || (itemYear !== null && itemYear === parseInt(props.year));
    const matchesQuarter = !props.quarter || (itemQuarter !== null && itemQuarter === parseInt(props.quarter.slice(-1))); 

    const matchesDepartment = !props.department || (item.createdBy?.department === props.department);
    const matchesLevel = !props.level || (item.createdBy?.role?.option === props.level);

    const criteria = {
      item,
      matchesYear,
      matchesQuarter,
      matchesDepartment,
      matchesLevel,
    };

    console.log("Matching Criteria:", criteria);

    return matchesYear && matchesQuarter && matchesDepartment && matchesLevel;
  });
});

const paginatedSkills = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredSkills.value.slice(startIndex, endIndex);
});

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

// const currentStageMap = {
//       1: 'Proficient',
//       2: 'Very Proficient',
//       3: 'Expert',
//       4: 'Advance',
//       5: 'Expert',
//     };

//     const desiredStageMap = {
//       1: 'Proficient',
//       2: 'Very Proficient',
//       3: 'Expert',
//       5: 'Expert',
//     };

const currentIndex = ref(0);

const initializeModal = () => {
  const singleClickModalElement = document.getElementById('myModal4');
  const doubleClickModalElement = document.getElementById('myModal1');

  singleClickModal.value = Modal.getOrCreateInstance(singleClickModalElement);
  doubleClickModal.value = Modal.getOrCreateInstance(doubleClickModalElement);
};

const loadSkill = (index) => {
  if (index >= 0 && index < skills.value.length) {
    selectedItem.value = skills.value[index];
  }
};

const nextSkill = () => {
  if (currentIndex.value < skills.value.length - 1) {
    currentIndex.value++;
    loadSkill(currentIndex.value);
  }
};

const prevSkill = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    loadSkill(currentIndex.value);
  }
};


watch(currentIndex, (newIndex) => {
  loadSkill(newIndex);
});

const clickTimeout = ref(null);
const singleClickModal = ref(null);
const doubleClickModal = ref(null);

const closeModal = (modalRef) => {
  const modal = modalRef === 'singleClickModal' ? singleClickModal.value : doubleClickModal.value;
  modal.style.display = 'none';
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
  editSkill(item);
};
</script>
<template>
  <div class="scrollable-container">
    <div class="d-goal">

      <teleport to="body">
        <form method="post" action="" @submit.prevent="editingSkill ? updateSkill() : handleSubmit">
          <div class="modal" id="myModal1" tabindex="-1">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Add Skill Form</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><b></b></button>
                </div>

                <div class="modal-body">
                  <div class="one">
                    <div class="frame">
                      <h6>Skill</h6>
                      <select v-model="skillDescription" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
                        <option selected>Select Skill</option>
                        <option value="Skill One">Skill One</option>
                        <option value="Skill Two">Skill Two</option>
                        <option value="Skill Three">Skill Three</option>
                      </select>
                    </div>
                    <div class="frame">
                      <h6>Current state</h6>
                      <select v-model="currentStageId" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
                        <option selected>Proficient</option>
                        <option value="1">Proficient</option>
                        <option value="2">Highly Proficient</option>
                        <option value="3">Expert</option>
                      </select>
                    </div>
                  </div>
                  <div class="one mt-3">
                    <div class="frame">
                      <h6>Gap</h6>
                      <textarea v-model="skillGapDetails" name="Gap" id="" cols="30" rows="10" placeholder="Gap"></textarea>
                    </div>
                    <div class="frame">
                      <h6>Desired state</h6>
                      <select v-model="desiredStageId" class="form-select" aria-label="Default select example">
                        <option selected>Proficient</option>
                        <option value="1">Proficient</option>
                        <option value="2">Highly Proficient</option>
                        <option value="3">Expert</option>
                      </select>
                    </div>
                  </div>
                  <div class="one mt-3">
                    <div class="frame">
                      <h6>Action Plan</h6>
                      <textarea v-model="actionPlan" name="Action Plan" id="" cols="30" rows="50" placeholder="Action Plan"></textarea>
                    </div>
                    <div class="frame">
                      <h6>Comment</h6>
                      <textarea v-model="comment" name="Comment" id="" cols="30" rows="50" placeholder="Comment"></textarea>
                    </div>
                  </div>

                </div>

                <div class="modal-footer">
                  <button type="submit" @click="$router.push('/skillassessment')" data-bs-dismiss="modal">{{ editingSkill ? 'Update' : 'Submit' }}</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </teleport>

      <teleport to="body">
        <form>
          <div class="modal" id="myModal4" tabindex="-1">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Skill Assessment</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal('singleClickModal')"><b></b></button>
                </div>

                <div class="modal-body">
                  <div class="one">
                    <div class="frame">
                      <h6>Skill</h6>
                      <select v-if="selectedItem" v-model="selectedItem.skillDescription" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example" disabled>
                        <option selected>Select Skill</option>
                        <option value="Skill One">Skill One</option>
                        <option value="Skill Two">Skill Two</option>
                        <option value="Skill Three">Skill Three</option>
                      </select>
                    </div>
                    <div class="frame">
                      <h6>Current state</h6>
                      <select v-if="selectedItem" v-model="selectedItem.currentStageId" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example" disabled>
                        <option selected>Proficient</option>
                        <option value="1">Proficient</option>
                        <option value="2">Highly Proficient</option>
                        <option value="3">Expert</option>
                      </select>
                    </div>
                  </div>
                  <div class="one mt-3">
                    <div class="frame">
                      <h6>Gap</h6>
                      <textarea v-if="selectedItem" v-model="selectedItem.skillGapDetails" name="Gap" id="" cols="30" rows="10" placeholder="Gap" readonly></textarea>
                    </div>
                    <div class="frame">
                      <h6>Desired state</h6>
                      <select v-if="selectedItem" v-model="selectedItem.desiredStageId" class="form-select" aria-label="Default select example" disabled>
                        <option selected>Proficient</option>
                        <option value="1">Proficient</option>
                        <option value="2">Highly Proficient</option>
                        <option value="3">Expert</option>
                      </select>
                    </div>
                  </div>
                  <div class="one mt-3">
                    <div class="frame">
                      <h6>Action Plan</h6>
                      <textarea v-if="selectedItem" v-model="selectedItem.actionPlan" name="Action Plan" id="" cols="30" rows="50" placeholder="Action Plan" readonly></textarea>
                    </div>
                    <div class="frame">
                      <h6>Comment</h6>
                      <textarea v-if="selectedItem" v-model="selectedItem.comment" name="Comment" id="" cols="30" rows="50" placeholder="Comment" readonly></textarea>
                    </div>
                  </div>

                </div>

                <div class="modal-footer">
                  <div class="prev">
                    <button type="button" class="btn btn-secondary" @click="prevSkill">Previous</button>
                  </div>
                  <div class="next">
                    <button type="button" class="btn btn-secondary" @click="nextSkill">Next</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </teleport>
      <div class="container">

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
                    <span class="noshrink"> Skills</span>

                  </div>
                </th>

                <th scope="col">
                  <div class="d-flex align-center gap-1">
                    <span class="noshrink"> Gap</span>

                  </div>
                </th>

              </tr>
            </thead>
            <tbody>
              <!-- <tr v-for="item in skills" @click="selectItem(item)"> -->
              <tr v-for="(item, index) in paginatedSkills" :key="index" @dblclick="editSkill(item)">
                <td>{{item.id}}</td>
                <td>{{item.skillDescription}}</td>
                <td>{{item.skillGapDetails}}</td>
                <td>

                  <!-- <v-icon icon="mdi-delete" class="icon-danger" @click="deleteSkill(item.id)"></v-icon> -->
                </td>
              </tr>
            </tbody>
          </table>

        </div>
        <v-pagination v-model="currentPage" :length="totalPages"></v-pagination>
      </div>
    </div>
    <div class="title">

      <button class="view" data-bs-toggle="modal" data-bs-target="#myModal2" type="button">View All</button>
    </div>
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
                <span class="noshrink"> Skills</span>

              </div>
            </th>
            <th scope="col">
              <div class="d-flex align-center gap-1">
                <span class="noshrink"> Current State</span>

              </div>
            </th>
            <th scope="col">
              <div class="d-flex align-center gap-1">
                <span class="noshrink"> Gap</span>

              </div>
            </th>
            <th scope="col">
              <div class="d-flex align-center gap-1">
                <span class="noshrink"> Desired State</span>

              </div>
            </th>

          </tr>
        </thead>
        <tbody>
          <!-- <tr v-for="item in skills" @click="selectItem(item)"> -->
          <tr v-for="(item, index) in paginatedSkills" :key="index" @click="handleClick(item)" @dblclick="handleDoubleClick(item)">
            <td>{{item.id}}</td>
            <td>{{item.skillDescription}}</td>
            <td>{{ item.currentStage ? item.currentStage.option : 'N/A' }}</td>
            <!-- <td>{{currentStageMap[item.currentStage]}}</td> -->
            <td>{{item.skillGapDetails}}</td>
            <td>{{ item.desiredStage ? item.desiredStage.option : 'N/A' }}</td>
            <!-- <td>{{desiredStageMap[item.desiredStage]}}</td> -->
            <td>

              <!-- <v-icon icon="mdi-delete" class="icon-danger" @click="deleteSkill(item.id)"></v-icon> -->
            </td>
          </tr>
        </tbody>
      </table>

    </div>
    <v-pagination v-model="currentPage" :length="totalPages"></v-pagination>
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
  /* Caption */
  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
  padding: 10px;
  height: auto;
}

thead,
tr {
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}

.pagination-controls {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination-controls button {
  padding: 5px 10px;
  margin: 0 5px;
}

.pagination-controls span {
  margin: 0 10px;
}

.v-btn button {
  background: #47b65c;
}

.container {
  width: 1050px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
}

.icon-warning {
  color: orange;
}

.icon-danger {
  color: red;
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
  height: 740px;
  margin-left: 13%;
  display: inline-flex;
  padding: 30px;
  border-radius: 10px;
  background: #eeeeee;
}

.modal-content {
  width: 840px;
  height: 680px;
  z-index: 1;
  --bs-backdrop-zindex: 1;
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 10px;
}

.form-select {
  width: 320px;
  height: 40px;
  color: var(--Grey-Dark, #808080);
  font-family: "Roboto", sans-serif;
  font-size: 16px;
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

#myModal4 .area,
#myModal4 textarea {
  width: 370px;
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

.one {
  display: flex;
  gap: 30px;
}
.frame {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}
.frame input {
  width: 370px;
}
.frame h6 {
  color: var(--Black, #000);
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.frame textarea {
  display: flex;
  width: 370px;
  height: 150px;
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
.form-select {
  width: 370px;
  height: 40px;
  color: var(--Grey-Dark, #808080);
  font-family: "Roboto", sans-serif;
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
.modal-footer button,
.one button {
  display: flex;
  padding: 8px 30px;
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
  border: none;
}
.frame button {
  width: 210px;
  display: flex;
  padding: 10px 40px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  color: #fff;
  margin-top: 30px;
}

.col-1 {
  flex: 1;
  min-width: 50px;
}

.col-2,
.col-3 {
  flex: 2;
  min-width: 200px;
}

@media screen and (max-width: 992px) {
  .modal-dialog {
    width: 800px;
    margin-top: 10%;
    margin-left: 60px;
  }

  .modal-content {
    width: 100%;
  }

  .form-select,
  .frame textarea {
    width: 320px;
  }
}

@media screen and (max-width: 768px) {
  .skill {
    height: 2400px;
  }
  .modal {
    margin: auto;
  }
  .one {
    flex-direction: column;
    gap: 0.5rem;
  }

  .modal-dialog {
    max-width: 90%;
    height: 1040px;
    margin-left: 35px;
  }

  .modal-content {
    height: 980px;
  }

  .frame textarea,
  .form-select {
    width: 480px;
  }

  .table-responsive {
    width: 88%;
    overflow-y: auto;
    overflow-x: hidden;
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
}

@media screen and (max-width: 576px) {
  .view {
    width: 120px;
    padding: 10px;
  }
  .one {
    flex-direction: column;
  }

  .modal-dialog {
    max-width: 100%;
    margin: 0 1rem;
  }

  .modal-header,
  .modal-footer {
    text-align: center;
  }

  h5.modal-title {
    font-size: 13px;
    width: 200px;
  }

  button {
    width: 100%;
  }

  #myModal4 .modal-dialog {
    height: 1050px;
  }

  #myModal4 .area,
  #myModal4 textarea {
    width: 100%;
    height: 110px;
  }

  .form-select {
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