<template>
  <div>
    <!-- Create a canvas element for the chart -->
    <canvas ref="barChart" width="400" height="200"></canvas>
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
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          data: [0, 1, 2, 3, 4], // Values mapped to 'Beginner', 'Intermediate', 'Proficient', 'Advanced', 'Professional'
        },
        {
          label: 'Desired state',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          data: [2, 3, 1, 4, 0], // Values mapped to 'Beginner', 'Intermediate', 'Proficient', 'Advanced', 'Professional'
        },
      ],
    };

    // Chart configuration
    const config = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          x: { stacked: false },
          y: {
            stacked: false,
            beginAtZero: true,
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
/* Add any custom styles for your component here */
</style>
