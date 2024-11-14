<!-- <template>
  <div>
    <canvas :id="pieChartId" style="width: 400px; height: 350px;"></canvas>
    <select v-model="selectedStatus" @change="updateChart">
      <option value="">All</option>
      <option v-for="(label, value) in statusLabels" :key="value" :value="value">{{ label }}</option>
    </select>
  </div>
</template>

<script setup>
import { onMounted, markRaw, ref, watch } from 'vue';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import axios from 'axios';

const props = defineProps({
  doughnut: {
    type: Boolean,
    default: false,
  },
  chartId: {
    type: [String, Number],
    required: true,
  },
  chartData: {
    type: [Object, Array],
    required: false,
  },
});

const chartRef = ref();
const pieChartId = `pie-${props.chartId}`;
const selectedStatus = ref(null);
const allDevelopmentPlans = ref([]);

const statusLabels = {
  1: 'Not started',
  2: 'On-going',
  3: 'Completed'
};

const backgroundColors = {
  1: '#26abe2',
  2: '#227CBF',
  3: '#47B65C'
};

const fetchData = async () => {
  try {
    const response = await axios.get('https://infracredit.pythonanywhere.com/api/v1/development-plans');
    allDevelopmentPlans.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const countStatuses = () => {
  const filteredPlans = allDevelopmentPlans.value.filter(plan => plan.planType === 2); // Filter by planTypeId for career goals and aspirations

  const statusCounts = {
    1: 0, // Not started
    2: 0, // On-going
    3: 0, // Completed
  };

  filteredPlans.forEach(plan => {
    switch (plan.status) {
      case 'Not started':
        statusCounts[1]++;
        break;
      case 'On-going':
        statusCounts[2]++;
        break;
      case 'Completed':
        statusCounts[3]++;
        break;
      default:
        break;
    }
  });

  return statusCounts;
};

const updateChart = () => {
  const chart = chartRef.value;
  const statusCounts = countStatuses();

  const total = Object.values(statusCounts).reduce((sum, count) => sum + count, 0);
  const labels = Object.keys(statusCounts).map(status => statusLabels[status]);
  const data = Object.values(statusCounts).map(count => ((count / total) * 100).toFixed(2));
  const backgroundColorsArray = Object.keys(statusCounts).map(status => backgroundColors[status]);

  chart.data.labels = labels;
  chart.data.datasets[0].data = data;
  chart.data.datasets[0].backgroundColor = backgroundColorsArray;
  chart.update();
};

onMounted(async () => {
  await fetchData();

  const ctx = document.getElementById(pieChartId);
  const data = {
    labels: Object.values(statusLabels),
    datasets: [
      {
        label: 'Dataset 1',
        data: [], // Initial data, will be updated dynamically
        backgroundColor: [], // Background colors will be updated dynamically
        datalabels: {
          anchor: 'center',
        },
        hoverOffset: 4,
      },
    ],
  };
  const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
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
    plugins: [ChartDataLabels],
  };

  const createdChart = new Chart(ctx, config);
  chartRef.value = markRaw(createdChart);

  updateChart(); // Initial chart update with fetched data
});

watch(selectedStatus, () => {
  updateChart(); // Update chart when selectedStatus changes
});
</script>


<style scoped>
div {
  position: relative;
  height: 100%;
  max-height: 400px;
  margin: auto;
  width: 90%;
}

@media (max-width: 1024px) {
  div {
    margin-left: 10px;
    width: 95%;
  }
}

@media (max-width: 768px) {
  div {
    margin-left: 33px;
  }
}
</style> -->
<template>
  <div>
    <canvas ref="chartCanvas" :id="pieChartId" style="width: 400px; height: 350px;"></canvas>
    <select v-model="selectedStatus" @change="updateChart">
      <option value="">All</option>
      <option v-for="(label, value) in statusLabels" :key="value" :value="value">{{ label }}</option>
    </select>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import axios from 'axios';

// Register necessary Chart.js components and the DataLabels plugin
Chart.register(DoughnutController, ArcElement, Tooltip, Legend, ChartDataLabels);

const chartCanvas = ref(null);
let chartInstance = null;
const allDevelopmentPlans = ref([]);

// Fetch data from the API
const fetchDevelopmentPlans = async () => {
  try {
    const response = await axios.get('https://infracredit2.pythonanywhere.com/api/v1/development-plans/');
    allDevelopmentPlans.value = response.data.data;

    console.log("Fetched development plans:", allDevelopmentPlans.value);

    allDevelopmentPlans.value.forEach(plan => {
      const planTypeId = plan.planType ? plan.planType.id : null;
      console.log(`Plan ID: ${plan.id}, Summary: ${plan.goalSummary}, Plan Type ID: ${planTypeId}, Status: ${plan.status}`);
    });

    // Ensure chartInstance exists before updating
    if (chartInstance) {
      updateChartData();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Update chart data based on fetched plans
const updateChartData = () => {
  // Ensure chartInstance exists before accessing its properties
  if (!chartInstance) return;

  const filteredPlans = allDevelopmentPlans.value.filter(plan => plan.planType && plan.planType.id === 2);
  console.log("Filtered plans (planType.id === 2):", filteredPlans);

  const statusCounts = { 1: 0, 2: 0, 3: 0 };

  filteredPlans.forEach(plan => {
    let statusKey;
    switch (plan.status) {
      case 'On-going':
        statusKey = 2;
        break;
      case 'Not started':
        statusKey = 1;
        break;
      case 'active':
      case 'Completed':
        statusKey = 3;
        break;
      default:
        console.warn(`Unrecognized status for Plan ID ${plan.id}:`, plan.status);
        return;
    }

    console.log(`Counting status ${plan.status} as ${statusKey} for Plan ID ${plan.id}`);
    if (statusCounts[statusKey] !== undefined) {
      statusCounts[statusKey]++;
    }
  });

  const total = statusCounts[1] + statusCounts[2] + statusCounts[3];
  const percentageData = [
    Math.round((statusCounts[1] / total) * 100),
    Math.round((statusCounts[2] / total) * 100),
    Math.round((statusCounts[3] / total) * 100),
  ];
   console.log(percentageData);
   
  console.log("Final Status counts:", statusCounts);

  // Update the chart data
  if (chartInstance) {
    chartInstance.data.datasets[0].data = [
      statusCounts[1],
      statusCounts[2],
      statusCounts[3]
    ];
    chartInstance.update();
  }
};

// Initial chart data
const data = {
  labels: ['Not Started', 'On-going', 'Completed'],
  datasets: [
    {
      label: 'Development Plan Statuses',
      data: [0, 0, 0],
      backgroundColor: ['#26abe2', '#227CBF', '#47B65C'],
      hoverOffset: 4,
    },
  ],
};

// Chart configuration
const config = {
  type: 'doughnut',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'buttom' },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const statusLabel = tooltipItem.label;
            const count = tooltipItem.raw;
            const percentage = Math.round((tooltipItem.raw / chartInstance.data.datasets[0].data.reduce((a, b) => a + b)) * 100);
            return `${statusLabel}: ${count} (${percentage}%)`;
          },
        },
      },
      datalabels: {
        formatter: (value, context) => {
          // Ensure chartInstance is defined before calculating percentage
          if (!chartInstance) return '';
          const percentage = Math.round((value / chartInstance.data.datasets[0].data.reduce((a, b) => a + b)) * 100);
          return `${percentage}%`;
        },
        color: '#fff',
        font: {
          weight: 'bold',
          size: 12,
        },
        anchor: 'center',
        align: 'center',
      },
    },
  },
};

// Initialize chart on component mount
onMounted(async () => {
  if (chartCanvas.value) {
    console.log("Initializing chart...");
    chartInstance = new Chart(chartCanvas.value, config);
    console.log("Chart initialized:", chartInstance);
  }

  await fetchDevelopmentPlans();
});
</script>

<style scoped>
div {
  position: relative;
  height: 100%;
  max-height: 400px;
  margin: auto;
  width: 90%;
}

canvas {
  width: 100%;
  height: auto;
}

@media (max-width: 1024px) {
  div {
    margin-left: 10px;
    width: 95%;
  }
  canvas {
    width: 90%;
    height: auto;
  }
}

@media (max-width: 768px) {
  div {
    margin-left: 33px;
    width: 100%;
  }
  canvas {
    width: 80%;
    height: auto;
  }
  select {
    width: 100%;
    margin-top: 15px;
  }
}

@media (max-width: 480px) {
  div {
    margin-left: 0;
    padding: 10px;
    width: 100%;
  }
  canvas {
    width: 100%;
    height: auto;
  }
  select {
    width: 100%;
    font-size: 14px;
  }
}
</style>
