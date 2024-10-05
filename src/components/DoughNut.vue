<script setup>
import PieChart from '../components/Charts/PieChart.vue';
import PieChartTwo from '../components/Charts/PieChartTwo.vue';
import PieChartThree from '../components/Charts/PieChartThree.vue';
</script> 
<template>
  <div class="container mt-2">
    <div class="tab d-flex justify-content-between align-center ">
      <div class=" chart-box-3 box-padded">

        <h4 class="box-title first">Career Goals and Aspirations </h4>
        <PieChart chart-id="dealcategory" :doughnut="true" />
      </div>

      <div class=" chart-box-3 box-padded">
        <h4 class="box-title"> Areas of Interest </h4>
        <PieChartTwo chart-id="regions" :doughnut="true" />
      </div>
      <div class=" chart-box-3 box-padded last">
        <h4 class="box-titles"> Mentorship and Skills Building </h4>
        <PieChartThree chart-id="products" :doughnut="true" />

      </div>

    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 7.622px;
  box-shadow: 1.52441px 1.52441px 15.24414px 0px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 460px;
  margin-left: 0;
  flex-wrap: wrap;
}

.box-title {
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  margin: auto;
}

.box-titles {
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  margin-left: 2px;
}

.box-padded {
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-top: 20px;
  background: #ffffff;
}

.chart-box-3 {
  width: 380px;
  height: 358px;
  margin: 10px;
}

.first {
  margin-left: 73px;
}

.box-titles {
  margin-left: 30px;
}

@media (max-width: 1024px) {
  .container {
    flex-direction: column;
    padding: 10px;
    align-items: center;
    width: auto;
  }

  .chart-box-3 {
    width: 70%;
    height: auto;
    margin-left: 0;
    padding-left: 0;
  }

  .box-padded {
    margin-top: 15px;
    width: 100%;
  }

  .last {
    margin-right: 0;
    height: 90%;
    padding-left: 10px;
  }

  .box-titles,
  .box-title,
  .first {
    font-size: 14px;
    margin: auto;
  }
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

  .box-titles,
  .box-title,
  .first {
    font-family: Roboto;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    margin: auto;
  }
}
</style>