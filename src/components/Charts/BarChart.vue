<!-- <template>
  <div class="wrap">
    <canvas class="bar" ref="barChart"></canvas>
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
            barThickness: 15,
            borderRadius: 10
          },
          {
            label: 'Desired state',
            backgroundColor: '#47B65C',
            borderColor: '#47B65C',
            borderWidth: 1,
            data: desiredStages,
            barThickness: 15,
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
</script> -->
<template>
  <div class="wrap">
    <canvas class="bar" ref="barChart"></canvas>
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
  // methods: {
  //   async fetchData() {
  //     try {
  //       const response = await axios.get('https://infracredit2.pythonanywhere.com/api/v1/skill-assessments/');
  //       this.skills = response.data.data;
  //       this.createChart();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   },
  //   createChart() {
  //     const labels = this.skills.map(skill => skill.skillDescription);

  //     // Map skill stages to only three levels
  //     const mapSkillStage = (stageId) => {
  //       switch (stageId) {
  //         case 3: return 1; // Proficient
  //         case 4: return 2; // Highly Proficient
  //         case 5: return 3; // Expert
  //         default: return 0; // Other stages not shown
  //       }
  //     };

  //     const currentStages = this.skills.map(skill => mapSkillStage(skill.currentStageId));
  //     const desiredStages = this.skills.map(skill => mapSkillStage(skill.desiredStageId));

  //     // Function to check screen size (adjust breakpoint as needed)
  //     const isMobile = () => window.innerWidth <= 576;

  //     let config;
  //     if (isMobile()) {
  //       // Mobile configuration
  //       config = {
  //         type: 'bar',
  //         data: {
  //           labels,
  //           datasets: [
  //             {
  //               label: 'Current state',
  //               backgroundColor: '#FFBF1A',
  //               borderColor: '#FFBF1A',
  //               borderWidth: 1,
  //               data: currentStages,
  //               barThickness: 3, // Adjust bar thickness for mobile
  //               borderRadius: 10
  //             },
  //             {
  //               label: 'Desired state',
  //               backgroundColor: '#47B65C',
  //               borderColor: '#47B65C',
  //               borderWidth: 1,
  //               data: desiredStages,
  //               barThickness: 3, 
  //               borderRadius: 10
  //             },
  //           ],
  //         },
  //         options: {
  //           plugins: {
  //     legend: {
  //       display: false,  
  //     },
  //   },
  //           scales: {
  //             x: {
  //               stacked: false,
  //                display: false,
  //                barPercentage: 0.5,       
  //                categoryPercentage: 0.5, 
  //             },
  //             y: {
  //               beginAtZero: true,
  //               max: 3, 
  //               title: {
  //                 display: false,
  //                 text: 'Skill Level',
  //                 fontSize: 4 // Adjust font size for mobile
  //               },
  //               // ticks: {
  //               //   callback: function (value) {
  //               //     const skillLevels = ['None', 'Proficient', 'Highly Proficient', 'Expert'];
  //               //     return skillLevels[value] || ''; // Display skill levels only for 1, 2, and 3
  //               //   },
  //               //   stepSize: 1, // Each step represents one level
  //               // },
  //             },
  //           },
  //         },
  //       };
  //     } else {
  //       // Larger screen configuration
  //       config = {
  //         type: 'bar',
  //         data: {
  //           labels,
  //           datasets: [
  //             {
  //               label: 'Current state',
  //               backgroundColor: '#FFBF1A',
  //               borderColor: '#FFBF1A',
  //               borderWidth: 1,
  //               data: currentStages,
  //               barThickness: 15, // Adjust bar thickness for larger screens
  //               borderRadius: 10
  //             },
  //             {
  //               label: 'Desired state',
  //               backgroundColor: '#47B65C',
  //               borderColor: '#47B65C',
  //               borderWidth: 1,
  //               data: desiredStages,
  //               barThickness: 15, // Adjust bar thickness for larger screens
  //               borderRadius: 10
  //             },
  //           ],
  //         },
  //         options: {
  //           scales: {
  //             x: {
  //               stacked: false
  //             },
  //             y: {
  //               beginAtZero: true,
  //               max: 3, // Set max to match the three levels
  //               title: {
  //                 display: true,
  //                 text: 'Skill Level',
  //                 fontSize: 14 // Adjust font size for larger screens
  //               },
  //               ticks: {
  //                 callback: function (value) {
  //                   const skillLevels = ['None', 'Proficient', 'Highly Proficient', 'Expert'];
  //                   return skillLevels[value] || ''; // Display skill levels only for 1, 2, and 3
  //                 },
  //                 stepSize: 1, // Each step represents one level
  //               },
  //             },
  //           },
  //         },
  //       };
  //     }

  //     const ctx = this.$refs.barChart.getContext('2d');
  //     if (Chart.getChart(ctx)) Chart.getChart(ctx).destroy(); 
  //     new Chart(ctx, config);


  //   }
  // }
  methods: {
  async fetchData() {
    try {
      const response = await axios.get('https://infracredit2.pythonanywhere.com/api/v1/skill-assessments/');
      this.skills = response.data.data;
      console.log('Fetched data:', this.skills); // Log fetched data to check if it's populated correctly
      this.createChart();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
createChart() {
  if (this.skills.length === 0) {
    console.warn('No data available for chart creation');
    return;
  }

  const labels = this.skills.map(skill => skill.skillDescription);
  console.log('Labels for chart:', labels); // Log labels to ensure they are correctly derived

  // Map skill stages to only three levels
  const mapSkillStage = (stageId) => {
    console.log('Mapping stageId:', stageId); // Log the stageId being passed
    switch (stageId) {
      case 3: return 1; // Proficient
      case 4: return 2; // Highly Proficient
      case 5: return 3; // Expert
      default: return 0; // Other stages not shown
    }
  };

 // Assuming you have a method or function to map skill stages
const currentStages = this.skills.map(skill => {
  return skill.currentStage ? skill.currentStage.id : 0; // Default to 0 if currentStage is missing
});

const desiredStages = this.skills.map(skill => {
  return skill.desiredStage ? skill.desiredStage.id : 0; // Default to 0 if desiredStage is missing
});

// Log the stages to confirm they are being mapped correctly
console.log('Current stages:', currentStages);
console.log('Desired stages:', desiredStages);


  const isMobile = () => window.innerWidth <= 576;

  let config;
  if (isMobile()) {
    config = {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Current state',
            backgroundColor: '#FFBF1A',
            borderColor: '#FFBF1A',
            borderWidth: 1,
            data: currentStages,
            barThickness: 3,
            borderRadius: 10
          },
          {
            label: 'Desired state',
            backgroundColor: '#47B65C',
            borderColor: '#47B65C',
            borderWidth: 1,
            data: desiredStages,
            barThickness: 3,
            borderRadius: 10
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,  
          },
        },
        scales: {
          x: {
            stacked: false,
            display: false,
            barPercentage: 0.5,       
            categoryPercentage: 0.5, 
          },
          y: {
            beginAtZero: true,
            max: 3,
            title: {
              display: false,
              text: 'Skill Level',
              fontSize: 4
            },
          },
        },
      },
    };
  } else {
    config = {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Current state',
            backgroundColor: '#FFBF1A',
            borderColor: '#FFBF1A',
            borderWidth: 1,
            data: currentStages,
            barThickness: 15,
            borderRadius: 10
          },
          {
            label: 'Desired state',
            backgroundColor: '#47B65C',
            borderColor: '#47B65C',
            borderWidth: 1,
            data: desiredStages,
            barThickness: 15,
            borderRadius: 10
          },
        ],
      },
      options: {
        scales: {
          x: {
            stacked: false
          },
          y: {
            beginAtZero: true,
            max: 3,
            title: {
              display: true,
              text: 'Skill Level',
              fontSize: 14
            },
            ticks: {
              callback: function (value) {
                const skillLevels = ['None', 'Proficient', 'Highly Proficient', 'Expert'];
                return skillLevels[value] || ''; 
              },
              stepSize: 1,
            },
          },
        },
      },
    };
  }

  const ctx = this.$refs.barChart.getContext('2d');
  if (Chart.getChart(ctx)) Chart.getChart(ctx).destroy(); // Destroy existing chart to prevent duplication
  new Chart(ctx, config);
}

}

};
</script>

<style>
.bar {
  width: 1000px;
  height: 300px;
}

@media screen and (max-width: 1200px) {
  .bar {
    width: 800px;
    height: 250px;
  }
}

@media screen and (max-width: 992px) {
  .bar {
    width: 600px;
    height: 200px;
  }
}

@media screen and (max-width: 768px) {
  .bar {
    width: 100%;
    height: 150px;
  }
}

@media screen and (max-width: 576px) {
  .wrap {
    width: 240px;
    padding: 0;
  }
  .bar {
    width: 200px;
    height: 100px;
  }
}
</style>
