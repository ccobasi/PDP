<script setup>
    // import { useGoalsStore } from "@/store/goals";
    import { ref, computed } from 'vue';
    import AccordionCardThree from '../Cards/AccordionCardThree.vue'
    import {useTrainingsStore} from "@/store/trainings"
    import html2pdf from 'html2pdf.js';
  
const store = useTrainingsStore();
const trainings = store.trainings;

const selectedItem = ref(null);

const selectItem = (item) => {
  selectedItem.value = item;
  console.log(selectedItem)
};

const itemsPerPage = 15; 
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(trainings.length / itemsPerPage));

const paginatedTrainings = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return trainings.slice(startIndex, endIndex);
});

const downloadPDF = () => {
  const table = document.querySelector('.table-responsive');

  html2pdf(table, {
    margin: 10,
    filename: 'table-data.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  });
};
</script>
<template>
  <div class="title">
    <div class="modal" id="myModal1">
      <div class="modal-dialog">
        <div class="modal-content">

          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Training Schedule Table</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <div class="table-responsive d-flex flex-column">

              <table class="full">
                <thead>
                  <tr>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink">S/N</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Month</span>

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
                        <span class="noshrink"> Learning Outcome</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Training Method</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Training Initiator</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Skill Matrix Mapping </span>

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
                        <span class="noshrink"> Status</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Rating</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Evidence</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in paginatedTrainings" :key="index">

                    <!-- <tr v-for="item in trainings" @click="selectItem(item)" @dblclick="$router.push({name: 'Skill Assessment Details', params: {id: item.id}})"> -->
                    <td>{{item.id}}</td>
                    <td>{{item.month}}</td>
                    <td>{{item.trainingTopic}}</td>
                    <td>{{item.learnOutcome}}</td>
                    <td>{{item.trainingMethod}}</td>
                    <td>{{item.initiator}}</td>
                    <td>{{item.skillMatrixMapping}}</td>
                    <td>{{item.dueDate}}</td>
                    <td>{{item.status}}</td>
                    <td>{{item.selectedRating}}</td>
                    <td>{{item.evidence}}</td>
                  </tr>
                </tbody>
              </table>
              <v-pagination v-model="currentPage" :length="totalPages"></v-pagination>
              <v-btn @click="downloadPDF">Download as PDF</v-btn>

            </div>
          </div>

        </div>
      </div>
    </div>

    <button class="view" data-bs-toggle="modal" data-bs-target="#myModal1" type="button">View All</button>
  </div>
  <div class="table-responsive d-flex">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span class="noshrink">S/N</span>

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
              <span class="noshrink"> Training Topics</span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span class="noshrink"> Training Methods</span>

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
        <tr v-for="item in trainings" @click="selectItem(item)" @dblclick="$router.push({name: 'Training Schedule Details', params: {id: item.id}})">
          <td scope="row">{{item.id}}</td>
          <td>{{item.month}}</td>
          <td>{{item.trainingTopic}}</td>
          <td>{{item.trainingMethod}}</td>
          <td>{{item.status}}</td>
          <td><svg xmlns="http://www.w3.org/2000/svg" width="87" height="14" viewBox="0 0 87 14" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.02745 1.3101C6.0735 1.16407 6.16491 1.03653 6.28839 0.945991C6.41187 0.855454 6.561 0.806641 6.71412 0.806641C6.86724 0.806641 7.01637 0.855454 7.13985 0.945991C7.26333 1.03653 7.35474 1.16407 7.40079 1.3101L8.64079 5.12343H12.6408C12.7994 5.11744 12.9556 5.16353 13.0855 5.25466C13.2154 5.34579 13.312 5.47696 13.3603 5.62811C13.4087 5.77927 13.4063 5.9421 13.3534 6.09174C13.3005 6.24137 13.2001 6.36958 13.0675 6.45677L9.82079 8.8101L11.0608 12.6301C11.1098 12.7756 11.1111 12.933 11.0643 13.0793C11.0176 13.2255 10.9253 13.353 10.8009 13.4431C10.6766 13.5332 10.5267 13.5812 10.3732 13.58C10.2196 13.5789 10.0704 13.5287 9.94745 13.4368L6.69412 11.0568L3.44745 13.4168C3.32446 13.5087 3.1753 13.5589 3.02175 13.56C2.8682 13.5612 2.71831 13.5132 2.59397 13.4231C2.46963 13.333 2.37734 13.2055 2.33059 13.0593C2.28384 12.913 2.28508 12.7556 2.33412 12.6101L3.57412 8.7901L0.327455 6.43677C0.194843 6.34958 0.0944225 6.22137 0.0415351 6.07174C-0.0113524 5.9221 -0.013798 5.75927 0.0345718 5.60811C0.0829416 5.45696 0.179467 5.32579 0.3094 5.23466C0.439333 5.14353 0.595528 5.09744 0.754121 5.10344H4.75412L6.02745 1.3101Z" fill="#FDBC15" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M24.4225 1.3101C24.4685 1.16407 24.5599 1.03653 24.6834 0.945991C24.8069 0.855454 24.956 0.806641 25.1091 0.806641C25.2623 0.806641 25.4114 0.855454 25.5349 0.945991C25.6584 1.03653 25.7498 1.16407 25.7958 1.3101L27.0358 5.12343H31.0358C31.1944 5.11744 31.3506 5.16353 31.4805 5.25466C31.6105 5.34579 31.707 5.47696 31.7554 5.62811C31.8037 5.77927 31.8013 5.9421 31.7484 6.09174C31.6955 6.24137 31.5951 6.36958 31.4625 6.45677L28.2158 8.8101L29.4558 12.6301C29.5048 12.7756 29.5061 12.933 29.4593 13.0793C29.4126 13.2255 29.3203 13.353 29.196 13.4431C29.0716 13.5332 28.9217 13.5812 28.7682 13.58C28.6146 13.5789 28.4655 13.5287 28.3425 13.4368L25.0891 11.0568L21.8425 13.4168C21.7195 13.5087 21.5703 13.5589 21.4168 13.56C21.2632 13.5612 21.1133 13.5132 20.989 13.4231C20.8646 13.333 20.7724 13.2055 20.7256 13.0593C20.6789 12.913 20.6801 12.7556 20.7291 12.6101L21.9691 8.7901L18.7225 6.43677C18.5899 6.34958 18.4894 6.22137 18.4366 6.07174C18.3837 5.9221 18.3812 5.75927 18.4296 5.60811C18.478 5.45696 18.5745 5.32579 18.7044 5.23466C18.8344 5.14353 18.9905 5.09744 19.1491 5.10344H23.1491L24.4225 1.3101Z" fill="#FDBC15" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M42.8175 1.3101C42.8635 1.16407 42.9549 1.03653 43.0784 0.945991C43.2019 0.855454 43.351 0.806641 43.5042 0.806641C43.6573 0.806641 43.8064 0.855454 43.9299 0.945991C44.0534 1.03653 44.1448 1.16407 44.1908 1.3101L45.4308 5.12343H49.4308C49.5894 5.11744 49.7456 5.16353 49.8755 5.25466C50.0055 5.34579 50.102 5.47696 50.1504 5.62811C50.1987 5.77927 50.1963 5.9421 50.1434 6.09174C50.0905 6.24137 49.9901 6.36958 49.8575 6.45677L46.6108 8.8101L47.8508 12.6301C47.8999 12.7756 47.9011 12.933 47.8544 13.0793C47.8076 13.2255 47.7153 13.353 47.591 13.4431C47.4666 13.5332 47.3167 13.5812 47.1632 13.58C47.0097 13.5789 46.8605 13.5287 46.7375 13.4368L43.4842 11.0568L40.2375 13.4168C40.1145 13.5087 39.9653 13.5589 39.8118 13.56C39.6582 13.5612 39.5084 13.5132 39.384 13.4231C39.2597 13.333 39.1674 13.2055 39.1206 13.0593C39.0739 12.913 39.0751 12.7556 39.1242 12.6101L40.3642 8.7901L37.1175 6.43677C36.9849 6.34958 36.8845 6.22137 36.8316 6.07174C36.7787 5.9221 36.7762 5.75927 36.8246 5.60811C36.873 5.45696 36.9695 5.32579 37.0994 5.23466C37.2294 5.14353 37.3856 5.09744 37.5442 5.10344H41.5442L42.8175 1.3101Z" fill="#FDBC15" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M61.212 1.3101C61.2581 1.16407 61.3495 1.03653 61.473 0.945991C61.5964 0.855454 61.7456 0.806641 61.8987 0.806641C62.0518 0.806641 62.2009 0.855454 62.3244 0.945991C62.4479 1.03653 62.5393 1.16407 62.5854 1.3101L63.8254 5.12343H67.8254C67.984 5.11744 68.1401 5.16353 68.2701 5.25466C68.4 5.34579 68.4965 5.47696 68.5449 5.62811C68.5933 5.77927 68.5908 5.9421 68.5379 6.09174C68.4851 6.24137 68.3846 6.36958 68.252 6.45677L65.0054 8.8101L66.2454 12.6301C66.2944 12.7756 66.2956 12.933 66.2489 13.0793C66.2021 13.2255 66.1099 13.353 65.9855 13.4431C65.8612 13.5332 65.7113 13.5812 65.5577 13.58C65.4042 13.5789 65.255 13.5287 65.132 13.4368L61.8787 11.0568L58.632 13.4168C58.509 13.5087 58.3599 13.5589 58.2063 13.56C58.0528 13.5612 57.9029 13.5132 57.7785 13.4231C57.6542 13.333 57.5619 13.2055 57.5152 13.0593C57.4684 12.913 57.4697 12.7556 57.5187 12.6101L58.7587 8.7901L55.512 6.43677C55.3794 6.34958 55.279 6.22137 55.2261 6.07174C55.1732 5.9221 55.1708 5.75927 55.2191 5.60811C55.2675 5.45696 55.364 5.32579 55.494 5.23466C55.6239 5.14353 55.7801 5.09744 55.9387 5.10344H59.9387L61.212 1.3101Z" fill="#FDBC15" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M79.607 1.3101C79.6531 1.16407 79.7445 1.03653 79.868 0.945991C79.9915 0.855454 80.1406 0.806641 80.2937 0.806641C80.4468 0.806641 80.596 0.855454 80.7194 0.945991C80.8429 1.03653 80.9343 1.16407 80.9804 1.3101L82.2204 5.12343H86.2204C86.379 5.11744 86.5352 5.16353 86.6651 5.25466C86.795 5.34579 86.8916 5.47696 86.9399 5.62811C86.9883 5.77927 86.9859 5.9421 86.933 6.09174C86.8801 6.24137 86.7797 6.36958 86.647 6.45677L83.4004 8.8101L84.6404 12.6301C84.6894 12.7756 84.6907 12.933 84.6439 13.0793C84.5972 13.2255 84.5049 13.353 84.3805 13.4431C84.2562 13.5332 84.1063 13.5812 83.9527 13.58C83.7992 13.5789 83.65 13.5287 83.527 13.4368L80.2737 11.0568L77.027 13.4168C76.904 13.5087 76.7549 13.5589 76.6013 13.56C76.4478 13.5612 76.2979 13.5132 76.1736 13.4231C76.0492 13.333 75.9569 13.2055 75.9102 13.0593C75.8634 12.913 75.8647 12.7556 75.9137 12.6101L77.1537 8.7901L73.907 6.43677C73.7744 6.34958 73.674 6.22137 73.6211 6.07174C73.5682 5.9221 73.5658 5.75927 73.6142 5.60811C73.6625 5.45696 73.7591 5.32579 73.889 5.23466C74.0189 5.14353 74.1751 5.09744 74.3337 5.10344H78.3337L79.607 1.3101Z" fill="#FDBC15" />
            </svg></td>
        </tr>
      </tbody>
    </table>
    <div class="side-panel">
      <h3> Details </h3>
      <AccordionCardThree :item="selectedItem" />

    </div>
  </div>
</template>

<style scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
}
.view {
  display: flex;
  padding: 10px 30px;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  background: var(--Secondary, #47b65c);

  color: var(--White, #fff);
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.full {
  width: 1120px;
}
table {
  width: 900px;
}
thead tr th {
  font-size: 12px;
  font-weight: 600;
  line-height: 14.4px;
  padding: 15px;
}

tbody tr td {
  color: var(--grey-dark, #808080);
  /* Caption */
  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
  padding: 20px;
}

thead,
tr {
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}
.side-panel {
  display: flex;
  width: 390px;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
  align-self: stretch;
  background: var(--Grey-Light, #eee);
}
.side-panel h4 {
  color: var(--Black, #000);
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 28.8px;
}
.modal {
  margin-left: 5%;
}
.modal-dialog {
  --bs-modal-width: 1280px;
  width: 1200px;
  height: 550px;
  display: inline-flex;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--Grey-Light, #eee);
}
</style>