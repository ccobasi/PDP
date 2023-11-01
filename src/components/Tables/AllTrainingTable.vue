<script setup>
    import { useGoalsStore } from "@/store/goals";
    import { ref } from 'vue';


const items = ref([
  { 
    id: '1',
    name: 'Monsurat Adeniyi', 
    department: 'Procurement',
    months: '12/08/2023',
    trainTopic: 'Digital Marketing',
    learningOutcome: 'Digital Marketer',
    trainingMethod: 'Online', 
    skillMatrixMapping: 'Proficiency ',
    status: 'Completed',
    dueDate: '12/08/2023',
    evidence: 'Attached',
    },
    { 
    id: '2',
    name: 'Chinua Azibuke', 
    department: 'HR',
    months: '12/08/2023',
    trainTopic: 'Content Writing',
    learningOutcome: 'Digital Marketer',
    trainingMethod: 'Online', 
    skillMatrixMapping: 'Proficiency ',
    status: 'Ongoing',
    dueDate: '12/08/2023',
    evidence: 'Attached',
    },
    { 
    id: '3',
    name: 'Lola Oyebola', 
    department: 'Finance',
    months: '12/08/2023',
    trainTopic: 'SEO',
    learningOutcome: 'SEO Expert',
    trainingMethod: 'Physical', 
    skillMatrixMapping: 'Proficiency ',
    status: 'Not Started',
    dueDate: '12/08/2023',
    evidence: 'Attached',
    },
    { 
    id: '4',
    name: 'Uzo Okorp', 
    department: 'IT',
    months: '12/08/2023',
    trainTopic: 'Web Design',
    learningOutcome: 'Web Designer',
    trainingMethod: 'Physical', 
    skillMatrixMapping: 'Proficiency ',
    status: 'On going',
    dueDate: '12/08/2023',
    evidence: 'Attached',
    },
    { 
    id: '5',
    name: 'Olanike Salau', 
    department: 'Legal',
    months: '12/08/2023',
    trainTopic: 'Blogging',
    learningOutcome: 'Blogger',
    trainingMethod: 'Physical', 
    skillMatrixMapping: 'Proficiency ',
    status: 'Completed',
    dueDate: '12/08/2023',
    evidence: 'Attached',
    },
]);

const selectedItem = ref(null);

const selectItem = (item) => {
  selectedItem.value = item;
  console.log(selectedItem)
};


   const store = useGoalsStore();
    const goals = store.goals;

    console.log(goals);


</script>
<template>
  <div class="table-responsive d-flex flex-row">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span class="noshrink">Name</span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span class="noshrink"> Department</span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span class="noshrink"> Months</span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span class="noshrink"> Training Topic</span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span class="noshrink"> Learning Outcome </span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span class="noshrink"> Training Method </span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span class="noshrink"> Skills Matrix Mapping </span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span class="noshrink"> Status </span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span class="noshrink"> Due Date </span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span class="noshrink"> Evidence </span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span class="noshrink"> Rate </span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>

        </tr>
      </thead>
      <tbody>

        <tr v-for="item in items" :key="item.id" @click="selectItem(item)" @dblclick="$router.push({name: 'Detail', params: {id: item.id}})">
          <td>{{item.name}}</td>
          <td>{{item.department}}</td>
          <td>{{item.months}}</td>
          <td>{{item.trainTopic}}</td>
          <td>{{item.learningOutcome}}</td>
          <td>{{item.trainingMethod}}</td>
          <td>{{item.skillMatrixMapping}}</td>
          <td>{{item.status}}</td>
          <td>{{item.dueDate}}</td>
          <td>{{item.evidence}}</td>
          <td><svg xmlns="http://www.w3.org/2000/svg" width="87" height="14" viewBox="0 0 87 14" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.02745 1.3101C6.0735 1.16407 6.16491 1.03653 6.28839 0.945991C6.41187 0.855454 6.561 0.806641 6.71412 0.806641C6.86724 0.806641 7.01637 0.855454 7.13985 0.945991C7.26333 1.03653 7.35474 1.16407 7.40079 1.3101L8.64079 5.12343H12.6408C12.7994 5.11744 12.9556 5.16353 13.0855 5.25466C13.2154 5.34579 13.312 5.47696 13.3603 5.62811C13.4087 5.77927 13.4063 5.9421 13.3534 6.09174C13.3005 6.24137 13.2001 6.36958 13.0675 6.45677L9.82079 8.8101L11.0608 12.6301C11.1098 12.7756 11.1111 12.933 11.0643 13.0793C11.0176 13.2255 10.9253 13.353 10.8009 13.4431C10.6766 13.5332 10.5267 13.5812 10.3732 13.58C10.2196 13.5789 10.0704 13.5287 9.94745 13.4368L6.69412 11.0568L3.44745 13.4168C3.32446 13.5087 3.1753 13.5589 3.02175 13.56C2.8682 13.5612 2.71831 13.5132 2.59397 13.4231C2.46963 13.333 2.37734 13.2055 2.33059 13.0593C2.28384 12.913 2.28508 12.7556 2.33412 12.6101L3.57412 8.7901L0.327455 6.43677C0.194843 6.34958 0.0944225 6.22137 0.0415351 6.07174C-0.0113524 5.9221 -0.013798 5.75927 0.0345718 5.60811C0.0829416 5.45696 0.179467 5.32579 0.3094 5.23466C0.439333 5.14353 0.595528 5.09744 0.754121 5.10344H4.75412L6.02745 1.3101Z" fill="#FDBC15" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M24.4225 1.3101C24.4685 1.16407 24.5599 1.03653 24.6834 0.945991C24.8069 0.855454 24.956 0.806641 25.1091 0.806641C25.2623 0.806641 25.4114 0.855454 25.5349 0.945991C25.6584 1.03653 25.7498 1.16407 25.7958 1.3101L27.0358 5.12343H31.0358C31.1944 5.11744 31.3506 5.16353 31.4805 5.25466C31.6105 5.34579 31.707 5.47696 31.7554 5.62811C31.8037 5.77927 31.8013 5.9421 31.7484 6.09174C31.6955 6.24137 31.5951 6.36958 31.4625 6.45677L28.2158 8.8101L29.4558 12.6301C29.5048 12.7756 29.5061 12.933 29.4593 13.0793C29.4126 13.2255 29.3203 13.353 29.196 13.4431C29.0716 13.5332 28.9217 13.5812 28.7682 13.58C28.6146 13.5789 28.4655 13.5287 28.3425 13.4368L25.0891 11.0568L21.8425 13.4168C21.7195 13.5087 21.5703 13.5589 21.4168 13.56C21.2632 13.5612 21.1133 13.5132 20.989 13.4231C20.8646 13.333 20.7724 13.2055 20.7256 13.0593C20.6789 12.913 20.6801 12.7556 20.7291 12.6101L21.9691 8.7901L18.7225 6.43677C18.5899 6.34958 18.4894 6.22137 18.4366 6.07174C18.3837 5.9221 18.3812 5.75927 18.4296 5.60811C18.478 5.45696 18.5745 5.32579 18.7044 5.23466C18.8344 5.14353 18.9905 5.09744 19.1491 5.10344H23.1491L24.4225 1.3101Z" fill="#FDBC15" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M42.8175 1.3101C42.8635 1.16407 42.9549 1.03653 43.0784 0.945991C43.2019 0.855454 43.351 0.806641 43.5042 0.806641C43.6573 0.806641 43.8064 0.855454 43.9299 0.945991C44.0534 1.03653 44.1448 1.16407 44.1908 1.3101L45.4308 5.12343H49.4308C49.5894 5.11744 49.7456 5.16353 49.8755 5.25466C50.0055 5.34579 50.102 5.47696 50.1504 5.62811C50.1987 5.77927 50.1963 5.9421 50.1434 6.09174C50.0905 6.24137 49.9901 6.36958 49.8575 6.45677L46.6108 8.8101L47.8508 12.6301C47.8999 12.7756 47.9011 12.933 47.8544 13.0793C47.8076 13.2255 47.7153 13.353 47.591 13.4431C47.4666 13.5332 47.3167 13.5812 47.1632 13.58C47.0097 13.5789 46.8605 13.5287 46.7375 13.4368L43.4842 11.0568L40.2375 13.4168C40.1145 13.5087 39.9653 13.5589 39.8118 13.56C39.6582 13.5612 39.5084 13.5132 39.384 13.4231C39.2597 13.333 39.1674 13.2055 39.1206 13.0593C39.0739 12.913 39.0751 12.7556 39.1242 12.6101L40.3642 8.7901L37.1175 6.43677C36.9849 6.34958 36.8845 6.22137 36.8316 6.07174C36.7787 5.9221 36.7762 5.75927 36.8246 5.60811C36.873 5.45696 36.9695 5.32579 37.0994 5.23466C37.2294 5.14353 37.3856 5.09744 37.5442 5.10344H41.5442L42.8175 1.3101Z" fill="#FDBC15" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M61.212 1.3101C61.2581 1.16407 61.3495 1.03653 61.473 0.945991C61.5964 0.855454 61.7456 0.806641 61.8987 0.806641C62.0518 0.806641 62.2009 0.855454 62.3244 0.945991C62.4479 1.03653 62.5393 1.16407 62.5854 1.3101L63.8254 5.12343H67.8254C67.984 5.11744 68.1401 5.16353 68.2701 5.25466C68.4 5.34579 68.4965 5.47696 68.5449 5.62811C68.5933 5.77927 68.5908 5.9421 68.5379 6.09174C68.4851 6.24137 68.3846 6.36958 68.252 6.45677L65.0054 8.8101L66.2454 12.6301C66.2944 12.7756 66.2956 12.933 66.2489 13.0793C66.2021 13.2255 66.1099 13.353 65.9855 13.4431C65.8612 13.5332 65.7113 13.5812 65.5577 13.58C65.4042 13.5789 65.255 13.5287 65.132 13.4368L61.8787 11.0568L58.632 13.4168C58.509 13.5087 58.3599 13.5589 58.2063 13.56C58.0528 13.5612 57.9029 13.5132 57.7785 13.4231C57.6542 13.333 57.5619 13.2055 57.5152 13.0593C57.4684 12.913 57.4697 12.7556 57.5187 12.6101L58.7587 8.7901L55.512 6.43677C55.3794 6.34958 55.279 6.22137 55.2261 6.07174C55.1732 5.9221 55.1708 5.75927 55.2191 5.60811C55.2675 5.45696 55.364 5.32579 55.494 5.23466C55.6239 5.14353 55.7801 5.09744 55.9387 5.10344H59.9387L61.212 1.3101Z" fill="#FDBC15" />

            </svg></td>
        </tr>

      </tbody>
    </table>

  </div>
</template>

<style scoped>
table {
  width: 1200px;
}
thead tr th {
  font-size: 12px;
  font-weight: 600;
  line-height: 14.4px;
  padding: 15px;
}

tbody tr td {
  color: var(--grey-dark, #808080);
  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
  padding: 20px;
}

thead,
tr {
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}
</style>