<script setup>
    import { ref, computed, onMounted, watch } from 'vue';
    import {useTrainingsStore} from "@/store/trainings"
    import html2pdf from 'html2pdf.js';
  
const store = useTrainingsStore();
const trainings = ref([]);
const editingTraining = ref(null);

  const trainingStartDate = ref('')
  const trainingTopic = ref('')
  const learningOutcome = ref('')
  const trainingMethod = ref('')
  const trainingInitiator  = ref('')
  const skillMatrixMapping = ref('')
  const dueDate = ref('')
  const status = ref('')
  const rating = ref(null)
  const evidenceURL = ref(null)
  const recordOwner = ref('')
const department = ref({ id: 3, name: 'Knowledge Management' });
  const createdBy = ref('')
  const lastModifiedBy = ref('')
const selectedItem = ref(null);

const fetchData = async () => {
  try {
    await store.fetchTrainingSchedules();

    trainings.value = store.trainings;

    console.log('Trainings:', trainings.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(async () => {
  try {
    await store.fetchTrainingSchedules();

    if (Array.isArray(store.trainings)) {
      trainings.value = store.trainings;
    } else {
      console.error('Error: store.trainings is not an array');
    }

    watch(
      () => store.trainings,
      (newTrainings) => {
        if (Array.isArray(newTrainings)) {
          trainings.value = newTrainings;
        } else {
          console.error('Error: store.trainings is not an array');
        }
      }
    );

    console.log('Trainings:', trainings.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

const editTraining = (training) => {
  editingTraining.value = { ...training };
  
  trainingStartDate.value = training.trainingStartDate;
  trainingTopic.value = training.trainingTopic;
  learningOutcome.value = training.learningOutcome;
  trainingMethod.value = training.trainingMethod;
  trainingInitiator.value = training.trainingInitiator;
  skillMatrixMapping.value = training.skillMatrixMapping;
  dueDate.value = training.dueDate;
  status.value = training.status;
  rating.value = training.rating;
  evidenceURL.value = training.evidenceURL;
  department.value = training.department;
  
  document.getElementById('myModal2').style.display = 'block';
};

const updateTraining = async () => {
  if (editingTraining.value) {
    editingTraining.value.trainingStartDate = trainingStartDate.value;
    editingTraining.value.trainingTopic = trainingTopic.value;
    editingTraining.value.learningOutcome = learningOutcome.value;
    editingTraining.value.trainingMethod = trainingMethod.value;
    editingTraining.value.trainingInitiator = trainingInitiator.value;
    editingTraining.value.skillMatrixMapping = skillMatrixMapping.value;
    editingTraining.value.dueDate = dueDate.value;
    editingTraining.value.status = status.value;
    editingTraining.value.rating = rating.value;
    editingTraining.value.evidenceURL = evidenceURL.value;
    editingTraining.value.department = department.value;

    await store.updateTraining(editingTraining.value);
    editingTraining.value = null;

    document.getElementById('myModal2').style.display = 'none';
  }
};

// const deleteTraining = async (trainingId) => {
//   if (confirm('Are you sure you want to delete this training?')) {
//     await store.deleteTraining(trainingId);
//   }
// };

const selectItem = (item) => {
  selectedItem.value = item;
  console.log(selectedItem)
};

const itemsPerPage = 15; 
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(trainings.value.length / itemsPerPage));

const paginatedTrainings = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return trainings.value.slice(startIndex, endIndex);
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
  <div class="title">
    <teleport to="body">
      <form method="post" action="" @submit.prevent="editingTraining ? updateTraining() : handleSubmit">
        <div class="modal" id="myModal2" tabindex="-1">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Training Request Form</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><b></b></button>
              </div>

              <div class="modal-body">

                <div class="first">
                  <div class="frame">
                    <h6>Month</h6>
                    <input type="date" v-model="trainingStartDate">
                  </div>
                  <div class="frame">
                    <h6>Training Topic</h6>

                    <input type="text" class="form-control inputField" id="trainingTopic" v-model="trainingTopic" placeholder="Digital marketing" />
                  </div>
                </div>
                <div class="second mt-3">
                  <div class="frame">
                    <h6>Learning Outcome</h6>

                    <input type="text" class="form-control inputField" id="learningOutcome" v-model="learningOutcome" placeholder="Learning Outcome" />
                  </div>
                  <div class="frame">
                    <h6>Training Method</h6>
                    <select v-model="trainingMethod" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
                      <option selected>Online</option>
                      <option value="Physical">Physical</option>
                      <option value="Online">Online</option>
                    </select>
                  </div>
                </div>
                <div class="third mt-3">
                  <div class="frame">
                    <h6>Training Initiator</h6>
                    <select v-model="trainingInitiator" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
                      <option selected>Self</option>
                      <option value="Self">Self</option>
                      <option value="Manager">Manager</option>
                      <option value="Knowledge Mgt">Knowledge Mgt</option>
                    </select>
                  </div>
                  <div class="frame">
                    <h6>Skill Matrix Mapping</h6>
                    <select v-model="skillMatrixMapping" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
                      <option selected>Select</option>
                      <option value="Matrix One">Matrix One</option>
                      <option value="Matrix Two">Matrix Two</option>
                    </select>
                  </div>
                </div>
                <div class="fourth mt-3">
                  <div class="frame">
                    <h6>Due Date</h6>
                    <input type="date" v-model="dueDate">
                  </div>
                  <div class="frame">
                    <h6>Status</h6>
                    <select v-model="status" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
                      <option class="opt" selected>Status</option>
                      <option class="opt" value="Completed">Completed</option>
                      <option class="opt" value="On-going">On-going</option>
                      <option class="opt" value="Not started">Not started</option>
                    </select>
                  </div>
                </div>
                <div class="fifth mt-3">
                  <div class="frame">
                    <h6>Rating</h6>
                    <div class="rating">
                      <input id="demo-1" type="radio" name="demo" value="1" v-model.number="selectedRating">
                      <label for="demo-1">1 star</label>
                      <input id="demo-2" type="radio" name="demo" value="2" v-model.number="selectedRating">
                      <label for="demo-2">2 stars</label>
                      <input id="demo-3" type="radio" name="demo" value="3" v-model.number="selectedRating">
                      <label for="demo-3">3 stars</label>
                      <input id="demo-4" type="radio" name="demo" value="4" v-model.number="selectedRating">
                      <label for="demo-4">4 stars</label>
                      <input id="demo-5" type="radio" name="demo" value="5" v-model.number="selectedRating">
                      <label for="demo-5">5 stars</label>

                      <div class="stars">
                        <label for="demo-1" aria-label="1 star" title="1 star"></label>
                        <label for="demo-2" aria-label="2 stars" title="2 stars"></label>
                        <label for="demo-3" aria-label="3 stars" title="3 stars"></label>
                        <label for="demo-4" aria-label="4 stars" title="4 stars"></label>
                        <label for="demo-5" aria-label="5 stars" title="5 stars"></label>
                      </div>

                    </div>
                  </div>
                  <div class="frame">
                    <h6>Evidence</h6>
                    <input type="file" class="form-control" @change="handleFileChange">
                  </div>
                </div>
                <div class="sixth mt-3">
                  <div class="frame">
                    <h6 class="department">Department</h6>
                    <select class="form-select" aria-label="Default select example" v-on:change="onSelectChange(e)" v-model="department">

                      <option class="opt" value="Administration">Administration</option>
                      <option class="opt" value="Procurement">Procurement</option>
                      <option class="opt" value="Knowledge Management">Knowledge Management</option>
                      <option class="opt" value="Credit Risk Management">Credit Risk Management</option>
                      <option class="opt" value="Information Technology">Information Technology</option>
                    </select>
                  </div>
                  <div class="frame">
                    <h6>Feedback</h6>

                    <textarea v-model="feedback" name="feedback" id="" cols="30" rows="50" placeholder="Feedback"></textarea>
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <button type="submit" data-bs-dismiss="modal">{{ editingTraining ? 'Update' : 'Submit' }}</button>
              </div>
            </div>
          </div>
        </div>

      </form>
    </teleport>
    <div class="modal" id="myModal1">
      <div class="modal-dialog">
        <div class="modal-content">

          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Training Schedule</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal">X</button>
          </div>

          <!-- Modal body -->
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
                        <span class="noshrink"> Month</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Training Topic</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Learning Outcome</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Training Method</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Training Initiator</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <!-- <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Skill Matrix Mapping </span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th> -->
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Due Date </span>

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
                        <span class="noshrink"> Rating</span>

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
                  <tr v-for="(item, index) in paginatedTrainings" :key="index">

                    <!-- <tr v-for="item in trainings" @click="selectItem(item)" @dblclick="$router.push({name: 'Skill Assessment Details', params: {id: item.id}})"> -->
                    <td>{{item.id}}</td>
                    <td>{{item.trainingStartDate}}</td>
                    <td>{{item.trainingTopic}}</td>
                    <td>{{item.learningOutcome}}</td>
                    <td>{{item.trainingMethod}}</td>
                    <td>{{item.trainingInitiator}}</td>
                    <!-- <td>{{item.skillMatrixMapping}}</td> -->
                    <td>{{item.dueDate}}</td>
                    <td>{{item.status}}</td>
                    <td>{{item.selectedRating}}</td>
                    <td>{{item.evidenceURL}}</td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>

        </div>
      </div>
    </div>

    <button class="view mb-2" data-bs-toggle="modal" data-bs-target="#myModal1" type="button">View All</button>
  </div>

  <div class="d-flex">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">
            <div class="adjustable-column d-flex align-center gap-1">
              <span class="noshrink">S/N</span>

            </div>
          </th>
          <th scope="col">
            <div class="adjustable-column d-flex align-center gap-1">
              <span class="noshrink"> Months</span>

            </div>
          </th>
          <th scope="col">
            <div class="adjustable-column d-flex align-center gap-1">
              <span class="noshrink"> Training Topics</span>

            </div>
          </th>
          <th scope="col">
            <div class="adjustable-column d-flex align-center gap-1">
              <span class="noshrink"> Training Methods</span>

            </div>
          </th>
          <th scope="col">
            <div class="adjustable-column d-flex align-center gap-1">
              <span class="noshrink"> Status </span>

            </div>
          </th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="item in trainings" @dblclick="editTraining(item)" :class="{'expanded-row': selectedItem && selectedItem.id === item.id}">
          <td scope="row">{{item.id}}</td>
          <td>{{item.trainingStartDate}}</td>
          <td>{{item.trainingTopic}}</td>
          <td>{{item.trainingMethod}}</td>
          <td>{{item.status}}</td>
          <td>

            <!-- <v-icon icon="mdi-delete" class="icon-danger" @click="deleteTraining(item.id)"></v-icon> -->
          </td>
        </tr>
      </tbody>
    </table>

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

.title {
  display: flex;
  justify-content: left;
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
  width: 70%;
  display: flex;
  flex-direction: row;
}
.full {
  width: 1200px;
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
tbody tr {
  height: 50px;
  overflow: hidden;
  white-space: nowrap;
}

tbody tr td {
  color: var(--grey-dark, #000);
  /* Caption */
  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
  padding: 15px;
  height: auto;
}

thead,
tr {
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}

.adjustable-column {
  min-width: 150px;
  max-width: 300px;
  width: auto;
  white-space: normal;
}
.expanded-row {
  height: 70px;
}

.noshrink {
  width: 60px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  height: 30px !important;
}

.modal-dialog {
  --bs-modal-width: 960px;
  width: 960px;
  height: 900px;
  margin-left: 13%;
  display: inline-flex;
  padding: 30px;
  border-radius: 10px;
  background: #fff;
}

.modal-body {
  gap: 20px;
  background: #fff;
  margin-top: 0px !important;
}

.modal-content {
  width: 900px;
  height: 850px;
  z-index: 1;
  --bs-backdrop-zindex: 1;
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 10px;
}

.first,
.second,
.third,
.fourth,
.fifth,
.sixth {
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
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.frame input {
  width: 390px;
  height: 40px;
}
.frame textarea {
  display: flex;
  width: 390px;
  height: 100px;
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
  width: 390px;
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

.rating {
  width: 390px;
}
.frame button {
  width: 145px;
  display: flex;
  padding: 5px 20px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  color: #fff;
  margin-top: 10px;
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
.rating input[type="radio"]:not(:nth-of-type(0)) {
  /* hide visually */
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
.rating [type="radio"]:not(:nth-of-type(0)) + label {
  display: none;
}

label[for]:hover {
  cursor: pointer;
}

.rating .stars label:before {
  content: "★";
  font-size: 24px;
}

.stars label {
  color: lightgray;
}

.stars label:hover {
  text-shadow: 0 0 1px #000;
}

.rating
  [type="radio"]:nth-of-type(1):checked
  ~ .stars
  label:nth-of-type(-n + 1),
.rating
  [type="radio"]:nth-of-type(2):checked
  ~ .stars
  label:nth-of-type(-n + 2),
.rating
  [type="radio"]:nth-of-type(3):checked
  ~ .stars
  label:nth-of-type(-n + 3),
.rating
  [type="radio"]:nth-of-type(4):checked
  ~ .stars
  label:nth-of-type(-n + 4),
.rating
  [type="radio"]:nth-of-type(5):checked
  ~ .stars
  label:nth-of-type(-n + 5) {
  color: orange;
}

.rating [type="radio"]:nth-of-type(1):focus ~ .stars label:nth-of-type(1),
.rating [type="radio"]:nth-of-type(2):focus ~ .stars label:nth-of-type(2),
.rating [type="radio"]:nth-of-type(3):focus ~ .stars label:nth-of-type(3),
.rating [type="radio"]:nth-of-type(4):focus ~ .stars label:nth-of-type(4),
.rating [type="radio"]:nth-of-type(5):focus ~ .stars label:nth-of-type(5) {
  color: darkorange;
}

.icon-warning {
  color: orange;
}

.icon-danger {
  color: red;
}
.filter {
  margin-bottom: 20px;
}

.filter label {
  margin-right: 10px;
}

.filter select {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

@media only screen and (max-width: 768px) {
  .d-flex {
    flex-direction: column;
  }
  .table-responsive {
    width: 88%;
    overflow-y: auto;
    overflow-x: hidden;
    flex-direction: column;
  }
  table {
    width: 50%;
  }
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
</style>