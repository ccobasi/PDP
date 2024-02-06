<script setup>
import TabMenu from '../../components/Tabs/TabMenu.vue';
import DoughnutChart from '../../components/Charts/DoughnutChart.vue'
import TrainingTable from '../../components/TrainingTable.vue'
import {useTrainingsStore} from "@/store/trainings"
import { ref, onMounted} from 'vue'

const store = useTrainingsStore();
console.log(store.trainings);

const addTraining = () => {
  if (month.value.trim() !== '' || trainingTopic.value.trim() !== '' || learningOutcome.value.trim() !== ''
    || trainingMethod.value.trim() !== ''
    || trainingInitiator.value.trim() !== '' || skillMatrixMapping.value.trim() !== '' || dueDate.value.trim() !== '' || status.value.trim() !== '' || selectedRating.value || evidence.value) {
    store.addTraining(month.value.trim(), trainingTopic.value.trim(), learningOutcome.value.trim(),
       trainingMethod.value.trim(), trainingInitiator.value.trim(), skillMatrixMapping.value.trim(), dueDate.value.trim(), status.value.trim(),
       selectedRating.value, evidence.value);
  
  }
};


// eslint-disable-next-line no-unused-vars
const trainings = ref([])
  const month = ref('')
  const trainingTopic = ref('')
  const learningOutcome = ref('')
  const trainingMethod = ref('')
  const trainingInitiator  = ref('')
  const skillMatrixMapping = ref('')
  const dueDate = ref('')
  const status = ref('')
  const selectedRating = ref(null)
  const evidence = ref(null)
  const selectedValue = ref('')
  const loadingUpload = ref(false);
  
const handleSubmit = () => {
  addTraining();
  console.log("Training added")
};


onMounted(() => {
  
  store.fetchTrainings();
}); 

 const onSelectChange = () => {
  // eslint-disable-next-line no-self-assign
  selectedValue.value = selectedValue.value
}

const openFileInput = () => {
  evidence.value.click();
};

const submitFile = () => {
  const file = evidence.value.files[0];

  if (file) {
    store.setEvidence(file);

    loadingUpload.value = true;
    setTimeout(() => {
      loadingUpload.value = false;
      console.log('File uploaded successfully:', file.name);
    }, 2000);
  }
};
</script>


<template>
  <main class="wrapper">
    <TabMenu />
    <form method="post" action="" @submit.prevent="handleSubmit">
      <div class="modal" id="myModal">
        <div class="modal-dialog">
          <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header">
              <h4 class="modal-title">Training request form</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">

              <div class="first">
                <div class="frame">
                  <h6>Month</h6>
                  <input type="date" v-model="month">
                </div>
                <div class="frame">
                  <h6>Training Topic</h6>

                  <textarea v-model="trainingTopic" name="training topic" id="" cols="30" rows="10" placeholder="Digital marketing"></textarea>
                </div>
              </div>
              <div class="second">
                <div class="frame">
                  <h6>Learning Outcome</h6>
                  <textarea v-model="learningOutcome" name="Learning Outcome" id="" cols="30" rows="10" placeholder="Digital marketer"></textarea>
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
              <div class="third">
                <div class="frame">
                  <h6>Training Initiator</h6>
                  <select v-model="trainingInitiator" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
                    <option selected>Self</option>
                    <option value="Manager">Manager</option>
                    <option value="Self">Self</option>
                  </select>
                </div>
                <div class="frame">
                  <h6>Skill Matrix Mapping</h6>
                  <textarea v-model="skillMatrixMapping" name="Skill Matrix Mapping" id="" cols="30" rows="10" placeholder="Skill Matrix Mapping"></textarea>
                </div>
              </div>
              <div class="fourth">
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
              <div class="fifth">
                <div class="frame">
                  <h6>Rating</h6>
                  <div class="rating">

                    <input id="demo-1" type="radio" name="demo" value="1" v-model="selectedRating">
                    <label for="demo-1">1 star</label>
                    <input id="demo-2" type="radio" name="demo" value="2" v-model="selectedRating">
                    <label for="demo-2">2 stars</label>
                    <input id="demo-3" type="radio" name="demo" value="3" v-model="selectedRating">
                    <label for="demo-3">3 stars</label>
                    <input id="demo-4" type="radio" name="demo" value="4" v-model="selectedRating">
                    <label for="demo-4">4 stars</label>
                    <input id="demo-5" type="radio" name="demo" value="5" v-model="selectedRating">
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
                  <div class="upload">
                    <v-btn :loading="loadingUpload" height="48" rounded="xl" size="small" onclick="document.getElementById('getFile').click()" @click="openFileInput" variant="flat">Upload Evidence</v-btn>
                    <input type='file' id="getFile" style="display:none" @change="submitFile()" accept="application/pdf" ref="evidence">
                  </div>
                </div>
              </div>
            </div>

            <!-- Modal footer -->
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
          <button data-bs-toggle="modal" data-bs-target="#myModal" type="button">Training Request</button>

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
  font-family: Roboto;
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
  font-family: Roboto;
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

.modal {
  margin-left: 21%;
}
.modal-dialog {
  --bs-modal-width: 800px;
  width: 800px;
  height: 700px;
  display: inline-flex;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--Grey-Light, #eee);
}

.modal-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  color: var(--Black, #000);
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
}
.modal-body {
  display: flex;
  padding: 20px 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 10px;
  background: #fff;
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
  font-family: Roboto;
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
  height: 50px;
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
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}
.form-select {
  width: 320px;
  color: var(--Grey-Dark, #808080);
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}
.modal-footer {
  display: flex;
  height: 60px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;
}
.modal-footer button {
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
.rating {
  width: 320px;
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
.rating input[type='radio']:not(:nth-of-type(0)) {
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
.rating [type='radio']:not(:nth-of-type(0)) + label {
  display: none;
}

label[for]:hover {
  cursor: pointer;
}

.rating .stars label:before {
  content: '★';
  font-size: 24px;
}

.stars label {
  color: lightgray;
}

.stars label:hover {
  text-shadow: 0 0 1px #000;
}

.rating [type='radio']:nth-of-type(1):checked ~ .stars label:nth-of-type(-n + 1),
.rating [type='radio']:nth-of-type(2):checked ~ .stars label:nth-of-type(-n + 2),
.rating [type='radio']:nth-of-type(3):checked ~ .stars label:nth-of-type(-n + 3),
.rating [type='radio']:nth-of-type(4):checked ~ .stars label:nth-of-type(-n + 4),
.rating [type='radio']:nth-of-type(5):checked ~ .stars label:nth-of-type(-n + 5) {
  color: orange;
}

.rating [type='radio']:nth-of-type(1):focus ~ .stars label:nth-of-type(1),
.rating [type='radio']:nth-of-type(2):focus ~ .stars label:nth-of-type(2),
.rating [type='radio']:nth-of-type(3):focus ~ .stars label:nth-of-type(3),
.rating [type='radio']:nth-of-type(4):focus ~ .stars label:nth-of-type(4),
.rating [type='radio']:nth-of-type(5):focus ~ .stars label:nth-of-type(5) {
  color: darkorange;
}
@media screen and (max-width: 768px) {
  .modal {
    margin-left: 5%;
  }
  .modal-dialog {
    --bs-modal-width: 700px;
  }

  .frame input,
  .frame textarea,
  .form-select {
    width: 290px;
  }
}
</style>
