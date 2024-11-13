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
    const response = await axios.get('https://infracredit2.pythonanywhere.com/api/v1/development-plans/');
    allDevelopmentPlans.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const countStatuses = () => {
  const filteredPlans = allDevelopmentPlans.value.filter(plan => plan.planTypeId === 2); // Filter by planTypeId for career goals and aspirations

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
</script> -->
<template>
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
    const response = await axios.get('https://infracredit2.pythonanywhere.com/api/v1/development-plans/');
    allDevelopmentPlans.value = response.data.data;
    console.log(allDevelopmentPlans);
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const countStatuses = () => {
  const filteredPlans = allDevelopmentPlans.value.filter(plan => plan.planType === 2);
  const statusCounts = { 1: 0, 2: 0, 3: 0 };

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

  console.log('Updating chart with data:', {
    labels,
    data,
    backgroundColorsArray,
  });

  chart.data.labels = labels;
  chart.data.datasets[0].data = data;
  chart.data.datasets[0].backgroundColor = backgroundColorsArray;
  chart.update();
};

const chartRef = ref();

onMounted(async () => {
  await fetchData();

  const ctx = document.getElementById(pieChartId);
  const data = {
    labels: Object.values(statusLabels),
    datasets: [{
      label: 'Status Distribution',
      data: [],
      backgroundColor: [],
      datalabels: { anchor: 'center' },
      hoverOffset: 4,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      datalabels: {
        color: 'white',
        display: 'auto',
        formatter: (value, context) => `${context.chart.data.labels[context.dataIndex]}\n${Math.round(value)}%`,
        anchor: 'center',
        align: 'center',
      },
      tooltip: {
        callbacks: {
          label: tooltipItem => `${tooltipItem.label}: ${Math.round(tooltipItem.raw)}%`,
        },
      },
    },
  };

  const config = {
    type: props.doughnut ? 'doughnut' : 'pie',
    data,
    options,
    plugins: [ChartDataLabels],
  };

  chartRef.value = markRaw(new Chart(ctx, config));

  updateChart();
});

watch(selectedStatus, updateChart);
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
</style>
