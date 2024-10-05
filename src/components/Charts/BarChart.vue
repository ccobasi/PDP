<template>
  <div>
    <canvas class="bar" ref="barChart" width="1000" height="300"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import axios from 'axios';

export default {
  data() {
    return {
      skills: []
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('https://infracredit.pythonanywhere.com/api/v1/skill-assessments');
        this.skills = response.data;
        this.createChart();
      } catch (error) {
        console.error(error);
      }
    },
    createChart() {
      const labels = this.skills.map(skill => skill.skillDescription);
      
      // Map skill stages to only three levels: Proficient, Highly Proficient, Expert
      const mapSkillStage = (stageId) => {
        switch (stageId) {
          case 3: return 1;   // Proficient
          case 4: return 2;   // Highly Proficient
          case 5: return 3;   // Expert
          default: return 0;  // Other stages not shown
        }
      };

      const currentStages = this.skills.map(skill => mapSkillStage(skill.currentStageId));
      const desiredStages = this.skills.map(skill => mapSkillStage(skill.desiredStageId));

      const data = {
        labels,
        datasets: [
          {
            label: 'Current state',
            backgroundColor: '#FFBF1A',
            borderColor: '#FFBF1A',
            borderWidth: 1,
            data: currentStages,
            barThickness: 30,
            borderRadius: 10
          },
          {
            label: 'Desired state',
            backgroundColor: '#47B65C',
            borderColor: '#47B65C',
            borderWidth: 1,
            data: desiredStages,
            barThickness: 30,
            borderRadius: 10
          },
        ],
      };

      const config = {
        type: 'bar',
        data,
        options: {
          scales: {
            x: { 
              stacked: false
            },
            y: {
              beginAtZero: true,
              max: 3, // Set max to match the three levels
              title: {
                display: true,
                text: 'Skill Level',
              },
              ticks: {
                callback: function (value) {
                  // Map numeric values to corresponding skill levels
                  const skillLevels = ['None', 'Proficient', 'Highly Proficient', 'Expert'];
                  return skillLevels[value] || ''; // Display skill levels only for 1, 2, and 3
                },
                stepSize: 1, // Each step represents one level
              },
            },
          },
        },
      };

      const ctx = this.$refs.barChart.getContext('2d');
      new Chart(ctx, config);
    }
  }
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

