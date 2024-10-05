<script setup>
import DChart from '../components/Charts/DChart.vue'
</script> 
<template>
  <div class="container mt-2">
    <h1 class="text-h5 font-weight-bold text--primary">
      Skills Gap Analysis
    </h1>
    <div class="d-flex justify-content-between align-center ">

      <div class=" chart-box-3 box-padded">

        <DChart chart-id="dealcategory" :doughnut="false" />
        <h4 class="box-title">Actually Vs Desired </h4>
      </div>

      <div class=" chart-box-3 box-padded">

        <DChart chart-id="filteredDealcategory" :doughnut="false" />

      </div>

    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  padding: 30px;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
  align-self: stretch;
  border-radius: 7.622px;
  background: #fff;
  box-shadow: 1.52441px 1.52441px 15.24414px 0px rgba(0, 0, 0, 0.1);
  width: 1180px;
  height: 460px;
}
.box-title {
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  margin: auto;
}

.box-padded {
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-top: 20px;
  background: #ffffff;
}

.chart-box-3 {
  width: 373px;
  height: 358px;
}
.form-select {
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
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    padding: 20px;
    align-items: center;
    width: auto;
    height: auto;
    border-radius: 0;
    box-shadow: none;
  }

  .box-padded {
    margin-top: 10px;
  }

  .chart-box-3 {
    width: 100%;
    height: auto;
  }
  .d-flex {
    flex-direction: column;
  }
}
</style>