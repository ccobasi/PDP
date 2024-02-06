<script setup>
import PieChart from '../components/Charts/PieChart.vue';
</script> 
<template>
  <div class="container mt-2">
    <div class="d-flex justify-content-between align-center ">
      <div class=" chart-box-3 box-padded">

        <PieChart chart-id="dealcategory" :doughnut="true" />
        <h4 class="box-title">Career Goals and Aspirations </h4>
      </div>

      <div class=" chart-box-3 box-padded">
        <PieChart chart-id="regions" :doughnut="true" />
        <h4 class="box-title"> Areas of Interest </h4>

      </div>
      <div class=" chart-box-3 box-padded">
        <PieChart chart-id="products" :doughnut="true" />
        <h4 class="box-title"> Mentorship and Skills Building </h4>

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