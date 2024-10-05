<template>
  <div>
    <div class="chart-box-3 box-padded">
      <canvas class="bar" ref="barChart" width="500" height="300"></canvas>
      <div class="d-flex mt-5">
        <h4 class="box-title pt-5">Filtered </h4>
        <select class="form-select mt-5" v-on:change="onSelectChange" v-model="selectedSkillLevel">
          <option class="opt" value="All">All</option>
          <option class="opt" value="Beginning">Beginning</option>
          <option class="opt" value="Intermediate">Intermediate</option>
          <option class="opt" value="Proficient">Proficient</option>
          <option class="opt" value="Advanced">Advanced</option>
          <option class="opt" value="Expert">Expert</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels';

export default {
    
  data() {
    return {
      selectedSkillLevel: 'All',
      chartInstance: null, // Added chartInstance to keep track of the chart
    };
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      // Sample data for two datasets
      const data = {
        labels: ['Lola Oyebola', 'Mark Dean', 'Uzo Okoro', 'Daniel Muller', 'Jane Doe'],
        datasets: [
          {
            label: 'Current state',
            backgroundColor: '#FFBF1A',
            borderColor: '#FFBF1A',
            borderWidth: 1,
            data: [0.4, 2, 2.85, 1.5, 2.4, 2.7],
            barThickness: 20,
            borderRadius: 10,
          },
          {
            label: 'Desired state',
            backgroundColor: '#47B65C',
            borderColor: '#47B65C',
            borderWidth: 1,
            data: [2, 2.8, 4.3, 2.6, 2.9, 4.3],
            barThickness: 20,
            borderRadius: 10,
          },
        ],
      };

      // Filter data based on selected skill level
      const filteredData = this.filterChartData(data);

      // Chart configuration
      const config = {
        type: 'bar',
        data: filteredData,
        options: {
          scales: {
            x: {
              stacked: false
            },
            y: {
              stacked: false,
              beginAtZero: false,
              title: {
                display: true,
                text: 'Skill Level',
              },
              ticks: {
                callback: function (value) {
                  // Map numeric values to corresponding skill levels
                  const skillLevels = ['Beginner', 'Intermediate', 'Proficient', 'Advanced', 'Professional'];
                  return skillLevels[value];
                },
              },
            },
          },
        },
      };

      // Get the canvas element and render the chart
      const ctx = this.$refs.barChart.getContext('2d');

      // Destroy the previous chart instance if it exists
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      this.chartInstance = new Chart(ctx, config);
    },
    onSelectChange() {
      this.renderChart();
    },
    filterChartData(data) {
      if (this.selectedSkillLevel === 'All') {
        return data;
      }

      const skillIndex = ['Beginning', 'Intermediate', 'Proficient', 'Advanced', 'Expert'].indexOf(this.selectedSkillLevel);
      const filteredData = {
        labels: data.labels,
        datasets: data.datasets.map(dataset => ({
          ...dataset,
          data: dataset.data.map((value, index) => (index === skillIndex ? value : 0)),
        })),
      };

      return filteredData;
    },
  },
};
</script>

<style>
@media (max-width: 768px) {
  .bar {
    width: 550px;
    height: 300px;
  }
}
</style>
