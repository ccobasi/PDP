<script setup>
import authService from '../../services/authService';
import TabMenu from '../../components/Tabs/TabMenu.vue';
import DoughnutChart from '../../components/Charts/DoughnutChart.vue'
import TrainingTable from '../../components/TrainingTable.vue'
import {useTrainingsStore} from "@/store/trainings"
import { ref, onMounted} from 'vue'

const store = useTrainingsStore();
console.log(store.trainings);

// eslint-disable-next-line no-unused-vars
const trainings = ref([])
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
const department = ref('');
const feedback = ref('');
  const createdBy = ref('')
  const lastModifiedBy = ref('')
  const selectedValue = ref('')
  const loadingUpload = ref(false);
  const selectedRating = ref(0)

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


const addTraining = async() => {
  if (trainingStartDate.value.trim() !== '' && trainingTopic.value.trim() !== '' && learningOutcome.value.trim() !== ''
    && trainingMethod.value.trim() !== '' && trainingInitiator.value.trim() !== '' && skillMatrixMapping.value.trim() !== '' 
    && dueDate.value.trim() !== '' && status.value.trim() !== '' && selectedRating.value !== 0 
    && department.value.trim() !== '' && feedback.value.trim() !== '' && createdBy.value.trim() !== '' && lastModifiedBy.value.trim() !== '' && recordOwner.value.trim() !== '') {
    
    try {
      await store.addTraining(
        trainingStartDate.value.trim(), 
        trainingTopic.value.trim(), 
        learningOutcome.value.trim(),
        trainingMethod.value.trim(), 
        trainingInitiator.value.trim(), 
        skillMatrixMapping.value.trim(), 
        dueDate.value.trim(), 
        status.value.trim(),
        selectedRating.value, 
        evidenceURL.value, 
        recordOwner.value.trim(), 
        department.value.trim(), 
        feedback.value.trim(), 
        createdBy.value.trim(), 
        lastModifiedBy.value.trim(),
        recordOwner.value.trim()
      );
      console.log("Training added successfully");
    } catch (error) {
      console.error("Error adding training:", error);
    }
  } else {
    console.error("All required fields must be filled out");
  }
};

const handleSubmit = () => {
  addTraining();
  console.log("Training added")
};

 const onSelectChange = () => {
  // eslint-disable-next-line no-self-assign
  selectedValue.value = selectedValue.value
}

const loading = ref(false);
const handleFileChange = (event) => {
  loading.value = true;
  const file = event.target.files[0];
  if (file) {
    evidenceURL.value = file;
  }
  loading.value = false;
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
              <h5 class="modal-title">Training Request Form</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><b></b></button>
            </div>

            <div class="modal-body">

              <div class="first">
                <div class="frame">
                  <h6>Month</h6>
                  <input class="month" type="date" v-model="trainingStartDate">
                </div>
                <div class="frame">
                  <h6>Training Topic</h6>

                  <input type="text" class="form-control inputField" id="trainingTopic" v-model="trainingTopic" placeholder="Digital marketing" />
                </div>
              </div>
              <div class="second mt-2">
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
              <div class="third mt-2">
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
              <div class="fourth mt-2">
                <div class="frame">
                  <h6>Due Date</h6>
                  <input class="month" type="date" v-model="dueDate">
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
              <div class="fifth mt-2">
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
              <div class="sixth mt-2">
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
              <button type="submit" data-bs-dismiss="modal">Submit Request</button>
            </div>
          </div>
        </div>
      </div>

    </form>
    <div class="skill mt-4">
      <div class="header">
        <div class="title mb-4">
          <h3>Training Schedule</h3>
          <button data-bs-toggle="modal" data-bs-target="#myModal" type="button">Add Training Request</button>

        </div>
        <div class="lines"></div>
      </div>

      <div class="chart">
        <div class="auto">
          <DoughnutChart chart-id="regions" :doughnut="true" />
        </div>
      </div>

      <div class="table">
        <TrainingTable />
      </div>

    </div>
  </main>
</template>

<style scoped>
main {
  height: 1450px;
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
  font-family: "Roboto", sans-serif;
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
  font-family: "Roboto", sans-serif;
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

.modal-dialog {
  --bs-modal-width: 960px;
  width: 960px;
  height: 900px;
  margin-left: 8%;
  display: inline-flex;
  padding: 30px;
  border-radius: 10px;
  background: #eee;
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
  height: 200px;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 5px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--White, #fff);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
}
.frame textarea::placeholder,
.frame input::placeholder {
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

.month {
  border: 1px solid var(--Grey-Light, #eee);
  padding: 10px;
  border-radius: 5px;
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

@media (max-width: 1200px) {
  .modal {
    margin-left: 3%;
  }
  .modal-dialog {
    --bs-modal-width: 700px;
    max-width: 80%;
    display: flex;
    flex-direction: column;
  }

  .modal-content {
    width: 100%;
  }

  .modal-body {
    width: 100%;
  }
  .form-select,
  .frame textarea,
  .frame input,
  .rating {
    width: 280px;
  }
}

@media screen and (max-width: 768px) {
  main {
    overflow-y: hidden;
  }
  .skill {
    height: 1300px;
  }
  .modal {
    margin-left: 5%;
  }
  .modal-dialog {
    --bs-modal-width: 700px;
  }

  .form-select,
  .frame textarea,
  .frame input,
  .rating {
    width: 200px;
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
}
</style>
