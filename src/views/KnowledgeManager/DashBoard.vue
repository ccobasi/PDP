<script setup>
import TabMenu from '../../components/Tabs/TabMenuTwo.vue';
import AnalysisChart from '../../components/AnalysisChart.vue'
import GoalAnalysis from '../../components/GoalAnalysis.vue'
import FeedbackAnalysis from '../../components/FeedbackAnalysis.vue'

</script>


<template>
  <main class="wrapper">
    <TabMenu />

    <div class="skill mt-4">
      <div class="header">
        <div class="title mb-4">
          <h3>Dashboard</h3>

        </div>

        <div class="lines"></div>
      </div>

      <div class="chart">
        <div class="auto">
          <AnalysisChart chart-id="regions" :doughnut="false" />
        </div>
      </div>

      <div class="chart">
        <div class="auto">
          <GoalAnalysis chart-id="regions" :doughnut="true" />
        </div>
      </div>

      <div class="chart">
        <div class="auto">
          <FeedbackAnalysis chart-id="regions" :doughnut="true" />
        </div>
      </div>

    </div>
  </main>
</template>

<style scoped>
main {
  height: 2000px;
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
  height: 1800px;
}
.skill h3 {
  color: var(--Black, #000);
  font-family: 'Inter', sans-serif;
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
  font-family: 'Inter', sans-serif;
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

@media screen and (max-width: 768px) {
}
</style>
