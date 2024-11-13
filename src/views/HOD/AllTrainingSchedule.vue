<!-- <script setup>
import TabMenu from '../../components/Tabs/TabMenuFour.vue';
import DoughnutChart from '../../components/Charts/DoughnutChart.vue'
import AllTrainingTable from '../../components/Tables/AllTrainingTable.vue'

</script>


<template>
  <main class="wrapper">
    <TabMenu />

    <div class="skill mt-4">
      <div class="header">
        <div class="title mb-4">
          <h3>All Training Schedule</h3>

        </div>

        <div class="lines"></div>
      </div>

      <div class="chart">
        <div class="auto">
          <DoughnutChart chart-id="regions" :doughnut="true" />
        </div>
      </div>

      <div class="table">
        <div class="filter">
        </div>
        <AllTrainingTable />
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
  font-family: "Inter", sans-serif;
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
  font-family: "Inter", sans-serif;
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
.form-select {
  width: 100px;
  color: var(--Grey-Dark, #808080);
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
  border: none;
}
.filter {
  display: flex;
  padding: 15px 20px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-radius: 5px 5px 0px 0px;
  border: 1px solid var(--gray-200, #e4e4e7);
  background: var(--Color-3, #fff);
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}
.filter label {
  display: flex;
  padding: 7px 10px;
  align-items: center;
  gap: 10px;
  border-radius: 5px;

  background: var(--White, #fff);
}
</style> -->
<script setup>
import TabMenu from '../../components/Tabs/TabMenuFour.vue';
import DoughnutChart from '../../components/Charts/DoughnutChart.vue'
import AllTrainingTable from '../../components/Tables/AllTrainingTable.vue'


</script>


<template>
  <main class="wrapper">
    <TabMenu />
    <div class="filters d-flex gap-2 mt-2">
      <select class="form-select" @change="handleDateChange">
        <option value="Level">Level</option>
        <option value="1">Manager</option>
        <option value="2">HOD</option>
        <option value="3">IT</option>
        <option value="4">User</option>
        <option value="5">Knowledge Manager</option>
      </select>

      <select class="form-select" @change="handleDateChange">
        <option value="Department">Department</option>
        <option value="1">IT</option>
        <option value="2">Finance</option>
        <option value="3">Accounting</option>
        <option value="4">Operation</option>
        <option value="5">Customer Service</option>
      </select>

      <select class="form-select" @change="handleDateChange">
        <option value="Quarterly">Quarterly</option>
        <option value="1">Q1</option>
        <option value="2">Q2</option>
        <option value="3">Q3</option>
        <option value="4">Q4</option>

      </select>

      <select class="form-select" @change="handleDateChange">
        <option value="Year">Year</option>
        <option value="1">2024</option>
        <option value="2">2025</option>
        <option value="3">2026</option>
        <option value="4">2027</option>

      </select>
    </div>
    <div class="skill mt-4">
      <div class="header">
        <div class="title mb-4">
          <h3>All Training Schedule</h3>

        </div>

        <div class="lines"></div>
      </div>

      <div class="chart">
        <div class="auto">
          <DoughnutChart chart-id="regions" :doughnut="true" />
        </div>
      </div>

      <div class="table">

        <AllTrainingTable />
      </div>

    </div>
  </main>
</template>

<style scoped>
main {
  height: 1750px;
}

.filters .form-select {
  width: 100px;
  border-radius: 10px;
  height: 40px;
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
  font-family: "Inter", sans-serif;
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
  font-family: "Inter", sans-serif;
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
.form-select {
  width: 100px;
  color: var(--Grey-Dark, #808080);
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
  border: none;
}
.filter {
  display: flex;
  padding: 15px 20px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-radius: 5px 5px 0px 0px;
  border: 1px solid var(--gray-200, #e4e4e7);
  background: var(--Color-3, #fff);
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}
.filter label {
  display: flex;
  padding: 7px 10px;
  align-items: center;
  gap: 10px;
  border-radius: 5px;

  background: var(--White, #fff);
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
</style>