<script setup>
import TabMenu from '../../components/Tabs/TabMenuThree.vue';
import DoughnutChart from '../../components/Charts/DoughnutChart.vue'
// import TrainingTable from '../../components/TrainingTable.vue'
import {useTrainingsStore} from "@/store/trainings"
import { ref, watch} from 'vue'
import KMTrainingTable from '../../components/Tables/KMTableThree.vue'

const store = useTrainingsStore();
console.log(store.trainings);
console.log(store);


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

</script>


<template>
  <main class="wrapper">
    <TabMenu />

    <div class="filters d-flex gap-2">
      <select class="form-select" v-model="selectedLevel" @change="handleDateChange">
        <option value="Level">Level</option>
        <option value="Manager">Manager</option>
        <option value="HOD">HOD</option>
        <option value="IT">IT</option>
        <option value="User">User</option>
        <option value="Knowledge Manager">Knowledge Manager</option>
      </select>

      <select class="form-select" v-model="selectedDepartment" @change="handleDateChange">
        <option value="Department">Department</option>
        <option value="IT">IT</option>
        <option value="Finance">Finance</option>
        <option value="Accounting">Accounting</option>
        <option value="Operation">Operation</option>
        <option value="Customer Service">Customer Service</option>
      </select>

      <select class="form-select" v-model="selectedQuarter" @change="handleDateChange">
        <option value="Quarterly">Quarterly</option>
        <option value="Q1">Q1</option>
        <option value="Q2">Q2</option>
        <option value="Q3">Q3</option>
        <option value="Q4">Q4</option>

      </select>

      <select class="form-select" v-model="selectedYear" @change="handleDateChange">
        <option value="Year">Year</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
        <option value="2026">2026</option>
        <option value="2027">2027</option>

      </select>
    </div>
    <div class="skill mt-4">

      <div class="chart">
        <div class="auto">
          <DoughnutChart chart-id="regions" :doughnut="true" />
        </div>
      </div>

      <div class="table">
        <!-- <TrainingTable /> -->
        <KMTrainingTable :level="selectedLevel" :department="selectedDepartment" :quarter="selectedQuarter" :year="selectedYear" />
      </div>

    </div>
  </main>
</template>

<style scoped>
main {
  height: 1450px;
}

.filters .form-select {
  width: 100px;
  border-radius: 10px;
  margin-top: 10px;
  color: #000;
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
  height: 970px;
  margin-left: 12%;
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
  height: 920px;
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
  width: 370px;
  height: 40px;
}
.frame textarea {
  display: flex;
  width: 370px;
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
.modal-footer .btn {
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  color: #fff;
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
  width: 370px;
  border: 1px solid var(--Grey-Light, #eee);
  padding: 0px 10px;
  border-radius: 5px;
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
    width: 370px;
  }
  /*.form-select,
  .frame textarea,
  .frame input,
  .rating {
    width: 280px;
  }*/
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

  .modal-body {
    width: 100%;
  }

  .form-select,
  .frame textarea {
    width: 270px;
  }

  .frame input,
  .frame .rating {
    width: 270px;
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

  .modal-body {
    height: 650px;
  }

  .form-select,
  .frame textarea,
  .frame input,
  .rating {
    width: 200px;
  }

  .six .frame {
    height: 110px;
  }
}
@media (max-width: 576px) {
  .filters .form-select {
    display: none;
  }
  .title h3 {
    font-size: 13px;
    width: 120px;
  }

  .title button {
    width: 120px;
    padding: 5px;
    font-size: 10px;
  }
  .modal-dialog {
    max-width: 80%;
    margin-left: 7%;
    height: 1700px;
  }

  .modal-content {
    padding: 10px;
    height: 1830px;
  }

  .first,
  .second,
  .third,
  .fourth,
  .fifth,
  .sixth {
    flex-direction: column;
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
  .title h3 {
    font-size: 10px;
    width: 120px;
  }

  .title button {
    width: 125px;
    padding: 5px;
    font-size: 8px;
  }

  .modal-dialog {
    max-width: 80%;
    margin-left: 7%;
    height: 1700px;
  }

  .modal-content {
    padding: 10px;
    height: 1730px;
  }

  .modal-title {
    font-size: 12px;
  }

  .form-select,
  .frame textarea,
  .frame input,
  .rating {
    width: 170px;
  }

  .first,
  .second,
  .third,
  .fourth,
  .fifth,
  .sixth {
    flex-direction: column;
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
