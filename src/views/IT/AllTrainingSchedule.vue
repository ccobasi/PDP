<script setup>
import TabMenu from '../../components/Tabs/TabMenuFive.vue';
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
.form-select {
  width: 100px;
  color: var(--Grey-Dark, #808080);
  font-family: Roboto;
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
</style>
