<script setup>
import { onMounted, markRaw, ref } from 'vue';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const props = defineProps({
    doughnut: {
        type: Boolean,
        default: false,
    },
    chartId: {
        type: [String, Number],
        required: true,
    },
    chartData:{
        type: [Object ,
        Array],
        required: false
    }
});
// const { chartId, chartData,  } = defineProps(["chartId", "chartData"])

const chartRef = ref()
const pieChartId = `pie-${props.chartId}`


onMounted(async () => {
  const response = await fetch('https://infracredit.pythonanywhere.com/api/v1/training-schedules'); 
  const trainings = await response.json();

  const statusCounts = trainings.reduce((acc, training) => {
    acc[training.status] = (acc[training.status] || 0) + 1;
    return acc;
  }, {});

  const totalTrainings = trainings.length;
  const data = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: 'Status',
        data: Object.keys(statusCounts).map((status) => {
          return ((statusCounts[status] / totalTrainings) * 100).toFixed(0);
        }),
        backgroundColor: ['#26abe2', '#227CBF', '#47B65C'],
        datalabels: {
          anchor: 'center',
          formatter: (value) => `${value}%`
        },
        hoverOffset: 4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: false,
        text: 'Training Status'
      },
      datalabels: {
        color: 'white',
        display: 'auto',
      }
    }
  };

  const config = {
    type: props.doughnut ? 'doughnut' : 'pie',
    data: data,
    options: options,
    plugins: [ChartDataLabels]
  };

  const ctx = document.getElementById(pieChartId);
  const createdChart = new Chart(ctx, config);
  chartRef.value = markRaw(createdChart);
})

const updateChart = () => {
    return new Promise((resolve, reject) => {
        const chart = chartRef.value;
        chart.data.datasets[0].data = [newGurantees.value, newMandates.value, followMandates.value]
        chart.update('none');
        resolve()
    });
};

</script>

<template>
  <div>
    <canvas :id="pieChartId"></canvas>
  </div>
</template>

<style scoped>
div {
  position: relative;
  height: 100%;
  max-height: 400px;
}
</style>