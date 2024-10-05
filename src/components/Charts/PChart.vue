<!-- <script setup>
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



onMounted(() => {

    const ctx = document.getElementById(pieChartId);
    const data = {
        labels: [],
        datasets: [
            {
                label: 'Dataset 1',
                data: [30, 37, 90],
                backgroundColor: ['#FFBF1A', '#227CBF', '#47B65C'],
                datalabels: {
                    anchor: 'center'
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
                position: 'top',
            },
            title: {
                display: false,
                text: 'Chart.js Pie Chart'
            },
            datalabels: {
                color: 'white',
                display: 'auto',
            }
        }
    }
    const config = {
        type: props.doughnut? 'doughnut': 'pie',
        data: data,
        options: options,
        plugins: [ChartDataLabels]
    };

    const createdChart = new Chart(ctx, config);
    chartRef.value = markRaw(createdChart)

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
</style> -->
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
    chartData: {
        type: [Object, Array],
        required: false,
    },
});

const chartRef = ref();
const pieChartId = `pie-${props.chartId}`;

onMounted(() => {
    const ctx = document.getElementById(pieChartId);
    const data = {
        labels: ['Not Started', 'Started', 'Completed'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [30, 37, 90],
                backgroundColor: ['#FFBF1A', '#227CBF', '#47B65C'],
                datalabels: {
                    anchor: 'center',
                    color: 'white',
                    display: 'auto',
                    formatter: (value, context) => {
                        const label = context.chart.data.labels[context.dataIndex];
                        return `${label}: ${value}`;
                    },
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
                position: 'top',
            },
            title: {
                display: false,
                text: 'Chart.js Pie Chart',
            },
            datalabels: {
                color: 'white',
                display: 'auto',
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
});

const updateChart = () => {
    return new Promise((resolve, reject) => {
        const chart = chartRef.value;
        chart.data.datasets[0].data = [newGurantees.value, newMandates.value, followMandates.value];
        chart.update('none');
        resolve();
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
