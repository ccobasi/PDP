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
      display: true,
    },
    title: {
      display: false,
      text: 'Chart.js Pie Chart',
    },
    datalabels: {
      color: 'white', // Text color
      display: 'auto',
      formatter: (value, context) => {
        // Combine the label and percentage
        const label = context.chart.data.labels[context.dataIndex];
        return `${label}\n${Math.round(value)}%`; // Show label and percentage
      },
      anchor: 'center', // Position label in the center of each segment
      align: 'center',  // Align text to the center
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => {
          return `${tooltipItem.label}: ${Math.round(tooltipItem.raw)}%`;
        },
      },
    },
  },
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

@media (max-width: 576px) {
  div {
    max-height: 300px;
  }
  canvas {
    width: 100% !important;
    height: auto !important;
  }
}
</style>