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
      || trainingInitiator.value.trim() !== '' || skillMatrixMapping.value.trim() !== '') {
    store.addTraining(month.value.trim(), trainingTopic.value.trim(), learningOutcome.value.trim(),
       trainingMethod.value.trim(), trainingInitiator.value.trim(), skillMatrixMapping.value.trim());
  
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
   const selectedValue = ref('')
 

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
              <button type="button" class="btn-close" data-bs-dismiss="modal">X</button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">

              <div class="frame">
                <h6>Month</h6>
                <input type="date" v-model="month">
              </div>
              <div class="frame">
                <h6>Training Topic</h6>

                <textarea v-model="trainingTopic" name="training topic" id="" cols="30" rows="10" placeholder="Digital marketing"></textarea>
              </div>
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
  margin-left: 32%;
}
.modal-dialog {
  width: 500px;
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
  width: 400px;
  height: 40px;
}
.frame textarea {
  display: flex;
  width: 400px;
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
  width: 400px;
  color: var(--Grey-Dark, #808080);
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}
.modal-footer {
  display: flex;
  height: 50px;
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
</style>
