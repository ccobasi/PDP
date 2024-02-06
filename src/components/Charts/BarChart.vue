<template>
  <div>
    <!-- Create a canvas element for the chart -->
    <canvas class="bar" ref="barChart" width="1000" height="300"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  mounted() {
    // Sample data for two datasets
    const data = {
      labels: ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5', 'Skill 6'],
      datasets: [
        {
          label: 'Current state',
          backgroundColor: '#FFBF1A',
          borderColor: '#FFBF1A',
          borderWidth: 1,
          data: [0.4, 2, 2.85, 1.5, 2.4, 2.7], // Values mapped to 'Beginner', 'Intermediate', 'Proficient', 'Advanced', 'Professional'
          barThickness: 30,
          borderRadius: 10
        },
        {
          label: 'Desired state',
          backgroundColor: '#47B65C',
          borderColor: '#47B65C',
          borderWidth: 1,
          data: [2, 2.8, 4.3, 2.6, 2.9, 4.3], // Values mapped to 'Beginner', 'Intermediate', 'Proficient', 'Advanced', 'Professional'
          barThickness: 30,
          borderRadius: 10
        },
      ],
    };

    // Chart configuration
    const config = {
      type: 'bar',
      data: data,
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
    new Chart(ctx, config);
  },
};
</script>

<style>
@media (max-width: 768px) {
  .bar {
    width: 600px;
    height: 300px;
  }
}
</style>
