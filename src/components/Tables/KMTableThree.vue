<!-- <script setup>
    import { ref, computed } from 'vue';
    import AccordionCardThree from '../Cards/AccordionCardThree.vue'
    import {useKMTrainingsStore} from "@/store/trainings"
    import html2pdf from 'html2pdf.js';
    import { useRoute } from 'vue-router';
  
const store = useKMTrainingsStore();
const trainings = store.kmTrainings ?? [];

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

const deleteSelectedTraining = () => {
  if (selectedItem.value) {
    store.deleteTraining(selectedItem.value.id);
    selectedItem.value = null;
  } else {
    console.error('No training selected for deletion.');
  }
};

  const isUserRoute = computed(() => {
  const route = useRoute();
  return route.path !== '/trainingschedule';
});
</script>
<template>
  <div class="title">
    <div class="modal" id="myModal1">
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-header">
            <h4 class="modal-title">Training Schedule</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal">X</button>
          </div>

          <div class="modal-body">
            <div class="table-responsive d-flex flex-column">
              <v-pagination v-model="currentPage" :length="totalPages"></v-pagination>
              <v-btn @click="downloadPDF">Download as PDF</v-btn>
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

            </div>
          </div>

        </div>
      </div>
    </div>

    <button class="view" data-bs-toggle="modal" data-bs-target="#myModal1" type="button">View All</button>
  </div>
  <div class="table-responsive mt-3">
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
      <div @click="deleteSelectedTraining" v-if="isUserRoute" class="delete"><button>Delete</button></div>
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
  width: 1200px;
}
.table-responsive {
  display: flex;
  flex-direction: row;
}
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
  margin-left: 1%;
}
.modal-dialog {
  --bs-modal-width: 1280px;
  width: 100%;
  height: 550px;
  display: inline-flex;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 10px;
}
.modal-header .btn-close {
  background: transparent;
  color: #808080;
}
button:not(:disabled) {
  cursor: pointer;
  background: #47b65c;
  color: #fff;
}
.noshrink {
  width: 60px;
}
.delete {
  display: flex;
  padding: 20px 0px;
  justify-content: flex-end;
  align-items: center;
  gap: 11px;
  align-self: stretch;
}
.delete button {
  display: flex;
  padding: 10px 30px;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  background: var(--Red, #f00);
  color: var(--White, #fff);
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
@media only screen and (max-width: 768px) {
  .table-responsive {
    width: 100%;
    overflow-y: auto;
    flex-direction: column;
  }
  table,
  .full {
    width: 580px;
  }
  thead tr th {
    font-size: 10px;
    padding: 6px;
  }

  tbody tr td {
    font-size: 10px;
    padding: 10px;
  }
  .side-panel {
    max-width: 100%;
  }
}
</style> -->
<script setup>
    import { ref, computed, onMounted, watch } from 'vue';
    import {useTrainingsStore} from "@/store/trainings"
    // import html2pdf from 'html2pdf.js';
    import { Modal } from 'bootstrap';
    import { useUsersStore } from '@/store/users';
    import authService from '../../services/authService';
    
const props = defineProps({
  level: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  quarter: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  }
});

const store = useTrainingsStore();
const trainings = ref([]);
const editingTraining = ref(null);
const usersStore = useUsersStore();
  const trainingStartDate = ref('')
  const trainingTopic = ref('')
  const learningOutcome = ref('')
  const trainingMethod = ref('')
  const trainingInitiator  = ref('')
  const skillMatrixMapping = ref('')
  const dueDate = ref('')
  const status = ref('')
  const rating = ref(null)
  const evidenceURL = ref(null)
  const recordOwner = ref(null)
const department = ref('')
  const createdBy = ref(null)
  const lastModifiedBy = ref(null)
const selectedItem = ref(null);
const isApproved = ref(false);

const fetchData = async () => {
  try {
    await store.fetchTrainings();

    trainings.value = store.trainings;

    console.log('Trainings:', trainings.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(async () => {
  await usersStore.fetchUsers();
  initializeModal();
  await fetchData();

  try {
    await authService.initialize();
    const msalInstance = authService.getMsalInstance();
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length) {
      createdBy.value = accounts[0].username; 
      lastModifiedBy.value = accounts[0].username; 
      recordOwner.value = accounts[0].username; 
    }
  } catch (error) {
    console.error('Error during MSAL initialization:', error);
  }

  watch([() => props.level, () => props.department, () => props.quarter, () => props.year], fetchData);
});

const usersOptions = computed(() =>
  usersStore.users.map(user => ({
    label: user.userFullName,
    value: user.userId
  }))
);

const userNamesMap = computed(() =>
  usersStore.users.reduce((map, user) => {
    map[user.id] = user.name;
    return map;
  }, {})
);

 const defaultUser = {
    id: 4, 
    username: 'James Bond',
  };

const editTraining = (training) => {
  const createdById = createdBy.value?.id || defaultUser.id
  editingTraining.value = { ...training };
  
  trainingStartDate.value = training.trainingStartDate;
  trainingTopic.value = training.trainingTopic;
  learningOutcome.value = training.learningOutcome;
  trainingMethod.value = training.trainingMethod;
  trainingInitiator.value = training.trainingInitiator;
  skillMatrixMapping.value = training.skillMatrixMapping;
  dueDate.value = training.dueDate;
  status.value = training.status;
  rating.value = training.rating;
  evidenceURL.value = training.evidenceURL;
  department.value = training.department;
  createdBy.value = training.createdBy.userId;
  recordOwner.value = training.recordOwner.userId || createdById;
  isApproved.value = training.isApproved || false; 
  
  document.getElementById('myModal2').style.display = 'block';
};

const updateTraining = async () => {
  if (editingTraining.value) {
    editingTraining.value.trainingStartDate = trainingStartDate.value;
    editingTraining.value.trainingTopic = trainingTopic.value;
    editingTraining.value.learningOutcome = learningOutcome.value;
    editingTraining.value.trainingMethod = trainingMethod.value;
    editingTraining.value.trainingInitiator = trainingInitiator.value;
    editingTraining.value.skillMatrixMapping = skillMatrixMapping.value;
    editingTraining.value.dueDate = dueDate.value;
    editingTraining.value.status = status.value;
    editingTraining.value.rating = rating.value;
    editingTraining.value.evidenceURL = evidenceURL.value;
    editingTraining.value.department = department.value;
    editingTraining.value.isApproved = isApproved.value,
    editingTraining.value.createdBy = createdBy.value;

    await store.updateTraining(editingTraining.value);
    editingTraining.value = null;

    document.getElementById('myModal2').style.display = 'none';

  
  }
};

// const deleteTraining = async (trainingId) => {
//   if (confirm('Are you sure you want to delete this training?')) {
//     await store.deleteTraining(trainingId);
//   }
// };

const itemsPerPage = 10; 
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(trainings.value.length / itemsPerPage));

// const filteredTrainings = computed(() => {
//   console.log('KMTableThree Trainings:', trainings.value);

//   return trainings.value.filter(item => {
   
//     const trainingStartDate = new Date(item.trainingStartDate);
//     const itemYear = trainingStartDate.getFullYear();
//     const itemMonth = trainingStartDate.getMonth(); 
//     const itemQuarter = Math.floor(itemMonth / 3) + 1; 

//     console.log(`Extracted Year: ${itemYear}, Month: ${itemMonth}, Quarter: ${itemQuarter}`);

//     const matchesYear = !props.year || itemYear === parseInt(props.year);
//     const matchesQuarter = !props.quarter || itemQuarter === parseInt(props.quarter.slice(-1)); 
//     const matchesDepartment = !props.department || 
//     item.recordOwner?.department?.option === props.department;
//     const matchesLevel = !props.level || (item.recordOwner?.role?.option === props.level);

//     console.log("Matching Criteria", {
//       item,
//       matchesYear,
//       matchesQuarter,
//       matchesDepartment,
//       matchesLevel,
//     });

//     return matchesYear && matchesQuarter && matchesDepartment && matchesLevel;
//   });
// });

const filteredTrainings = computed(() => {
  console.log('KMTableThree Trainings:', trainings.value);

  return trainings.value.filter(item => {
    if (!item) {
      console.warn("Found undefined item in trainings array, skipping");
      return false;
    }

    const trainingStartDate = new Date(item.trainingStartDate);
    const itemYear = trainingStartDate.getFullYear();
    const itemMonth = trainingStartDate.getMonth(); 
    const itemQuarter = Math.floor(itemMonth / 3) + 1; 

    console.log(`Extracted Year: ${itemYear}, Month: ${itemMonth}, Quarter: ${itemQuarter}`);

    const matchesYear = !props.year || itemYear === parseInt(props.year);
    const matchesQuarter = !props.quarter || itemQuarter === parseInt(props.quarter.slice(-1)); 
    const matchesDepartment = !props.department || 
      item.recordOwner?.department?.option === props.department;
    const matchesLevel = !props.level || 
      (item.recordOwner?.role?.option === props.level);

    console.log("Matching Criteria", {
      item,
      matchesYear,
      matchesQuarter,
      matchesDepartment,
      matchesLevel,
    });

    return matchesYear && matchesQuarter && matchesDepartment && matchesLevel;
  });
});

const paginatedTrainings = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredTrainings.value.slice(startIndex, endIndex);
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0]; 
}

const currentIndex = ref(0);

const initializeModal = () => {
  const singleClickModalElement = document.getElementById('myModal4');
  const doubleClickModalElement = document.getElementById('myModal2');

  singleClickModal.value = Modal.getOrCreateInstance(singleClickModalElement);
  doubleClickModal.value = Modal.getOrCreateInstance(doubleClickModalElement);
};

const loadTraining = (index) => {
  if (index >= 0 && index < trainings.value.length) {
    selectedItem.value = trainings.value[index];
  }
};

const nextTraining = () => {
  if (currentIndex.value < trainings.value.length - 1) {
    currentIndex.value++;
    loadTraining(currentIndex.value);
  }
};

const prevTraining = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    loadTraining(currentIndex.value);
  }
};


watch(currentIndex, (newIndex) => {
  loadTraining(newIndex);
});

const clickTimeout = ref(null);
const singleClickModal = ref(null);
const doubleClickModal = ref(null);

const closeModal = (modalRef) => {
  const modal = modalRef === 'singleClickModal' ? singleClickModal.value : doubleClickModal.value;
  modal.style.display = 'none';
};

const showModal = (modalInstance) => {
  if (modalInstance) {
    modalInstance.show(); 
  } else {
    console.error('Modal instance not found.');
  }
};

const handleClick = (item) => {
  if (clickTimeout.value) {
    clearTimeout(clickTimeout.value);
  }
  clickTimeout.value = setTimeout(() => {
    selectedItem.value = item;
    showModal(singleClickModal.value);
  }, 250); 
};

const handleDoubleClick = (item) => {
  if (clickTimeout.value) {
    clearTimeout(clickTimeout.value);
    clickTimeout.value = null;
  }
  selectedItem.value = item;
  showModal(doubleClickModal.value);
  editTraining(item);
};
</script>
<template>
  <main class="wrapper">
    <div class="title">
      <teleport to="body">
        <form method="post" action="" @submit.prevent="editingTraining ? updateTraining() : handleSubmit">
          <div class="modal" id="myModal2" tabindex="-1">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Training Request Form</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal('singleClickModal')"><b></b></button>
                </div>

                <div class="modal-body">

                  <div class="first">
                    <div class="frame">
                      <h6>Month</h6>
                      <input type="day" v-model="trainingStartDate">
                    </div>
                    <div class="frame">
                      <h6>Training Topic</h6>

                      <input type="text" class="form-control inputField" id="trainingTopic" v-model="trainingTopic" placeholder="Digital marketing" />
                    </div>
                  </div>
                  <div class="second mt-3">
                    <div class="frame">
                      <h6>Learning Outcome</h6>

                      <input type="text" class="form-control inputField" id="learningOutcome" v-model="learningOutcome" placeholder="Learning Outcome" />
                    </div>
                    <div class="frame">
                      <h6>Training Method</h6>
                      <select v-model="trainingMethod" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
                        <option selected>Online</option>
                        <option value="Physical">Physical</option>
                        <option value="Online">Online</option>
                      </select>
                    </div>
                  </div>
                  <div class="third mt-3">
                    <div class="frame">
                      <h6>Training Initiator</h6>
                      <select v-model="trainingInitiator" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
                        <option selected>Self</option>
                        <option value="Self">Self</option>
                        <option value="Manager">Manager</option>
                        <option value="Knowledge Mgt">Knowledge Mgt</option>
                      </select>
                    </div>
                    <div class="frame">
                      <h6>Skill Matrix Mapping</h6>
                      <select v-model="skillMatrixMapping" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
                        <option selected>Select</option>
                        <option value="Matrix One">Matrix One</option>
                        <option value="Matrix Two">Matrix Two</option>
                      </select>
                    </div>
                  </div>
                  <div class="fourth mt-3">
                    <div class="frame">
                      <h6>Due Date</h6>
                      <input type="date" v-model="dueDate">
                    </div>
                    <div class="frame">
                      <h6>Status</h6>
                      <select v-model="status" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
                        <option class="opt" selected>Status</option>
                        <option class="opt" value="Completed">Completed</option>
                        <option class="opt" value="On-going">On-going</option>
                        <option class="opt" value="Not started">Not started</option>
                      </select>
                    </div>
                  </div>
                  <div class="fifth mt-3">
                    <div class="frame">
                      <h6>Rating</h6>
                      <div class="rating">
                        <input id="demo-1" type="radio" name="demo" value="1" v-model.number="selectedRating">
                        <label for="demo-1">1 star</label>
                        <input id="demo-2" type="radio" name="demo" value="2" v-model.number="selectedRating">
                        <label for="demo-2">2 stars</label>
                        <input id="demo-3" type="radio" name="demo" value="3" v-model.number="selectedRating">
                        <label for="demo-3">3 stars</label>
                        <input id="demo-4" type="radio" name="demo" value="4" v-model.number="selectedRating">
                        <label for="demo-4">4 stars</label>
                        <input id="demo-5" type="radio" name="demo" value="5" v-model.number="selectedRating">
                        <label for="demo-5">5 stars</label>

                        <div class="stars">
                          <label for="demo-1" aria-label="1 star" title="1 star"></label>
                          <label for="demo-2" aria-label="2 stars" title="2 stars"></label>
                          <label for="demo-3" aria-label="3 stars" title="3 stars"></label>
                          <label for="demo-4" aria-label="4 stars" title="4 stars"></label>
                          <label for="demo-5" aria-label="5 stars" title="5 stars"></label>
                        </div>

                      </div>
                    </div>
                    <div class="frame">
                      <h6>Evidence</h6>
                      <input type="file" class="form-control" @change="handleFileChange">
                    </div>
                  </div>
                  <div class="sixth mt-3">
                    <div class="frame">
                      <h6 class="department">Department</h6>
                      <select class="form-select" aria-label="Default select example" v-on:change="onSelectChange(e)" v-model="department">

                        <option class="opt" value="Administration">Administration</option>
                        <option class="opt" value="Procurement">Procurement</option>
                        <option class="opt" value="Knowledge Management">Knowledge Management</option>
                        <option class="opt" value="Credit Risk Management">Credit Risk Management</option>
                        <option class="opt" value="Information Technology">Information Technology</option>
                      </select>
                    </div>
                    <div class="frame">
                      <h6>Feedback</h6>

                      <textarea v-model="feedback" name="feedback" id="" cols="30" rows="50" placeholder="Feedback"></textarea>
                    </div>
                  </div>
                  <div class="sixth mt-3">
                    <div class="frame">
                      <h6 class="department">Record Owner</h6>
                      <select v-model="recordOwner" class="form-select">
                        <option value="" disabled>Select Record Owner</option>
                        <option v-for="user in usersOptions" :key="user.value" :value="user.value">
                          {{ user.label }}
                        </option>
                      </select>
                    </div>
                    <div class="frame">
                      <h6>Created By</h6>

                      <input type="text" id="createdBy" class="form-control" :value="userNamesMap[createdBy] || defaultUser.id" disabled />
                    </div>
                  </div>
                  <div class="sixth mt-3">
                    <div class="frame">
                      <h6>Approval Status</h6>
                      <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" v-model="isApproved" id="isApproved">
                        <label class="form-check-label" for="isApproved">Approved</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="modal-footer">
                  <button type="submit" data-bs-dismiss="modal">{{ editingTraining ? 'Update' : 'Submit' }}</button>
                </div>
              </div>
            </div>
          </div>

        </form>
      </teleport>

      <teleport to="body">
        <form>
          <div class="modal" id="myModal4" tabindex="-1">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Training Request</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal('singleClickModal')"><b></b></button>
                </div>

                <div class="modal-body">

                  <div class="first">
                    <div class="frame">
                      <h6>Month</h6>
                      <input type="" v-if="selectedItem" v-model="selectedItem.trainingStartDate" disabled>
                    </div>
                    <div class="frame">
                      <h6>Training Topic</h6>

                      <input type="text" class="form-control inputField" id="trainingTopic" v-if="selectedItem" v-model="selectedItem.trainingTopic" placeholder="Digital marketing" disabled />
                    </div>
                  </div>
                  <div class="second mt-3">
                    <div class="frame">
                      <h6>Learning Outcome</h6>

                      <input type="text" class="form-control inputField" id="learningOutcome" v-if="selectedItem" v-model="selectedItem.learningOutcome" placeholder="Learning Outcome" disabled />
                    </div>
                    <div class="frame">
                      <h6>Training Method</h6>
                      <select v-if="selectedItem" v-model="selectedItem.trainingMethod" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example" disabled>
                        <option selected>Online</option>
                        <option value="Physical">Physical</option>
                        <option value="Online">Online</option>
                      </select>
                    </div>
                  </div>
                  <div class="third mt-3">
                    <div class="frame">
                      <h6>Training Initiator</h6>
                      <select v-if="selectedItem" v-model="selectedItem.trainingInitiator" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example" disabled>
                        <option selected>Self</option>
                        <option value="Self">Self</option>
                        <option value="Manager">Manager</option>
                        <option value="Knowledge Mgt">Knowledge Mgt</option>
                      </select>
                    </div>
                    <div class="frame">
                      <h6>Skill Matrix Mapping</h6>
                      <select v-if="selectedItem" v-model="selectedItem.skillMatrixMapping" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example" disabled>
                        <option selected>Select</option>
                        <option value="Matrix One">Matrix One</option>
                        <option value="Matrix Two">Matrix Two</option>
                      </select>
                    </div>
                  </div>
                  <div class="fourth mt-3">
                    <div class="frame">
                      <h6>Due Date</h6>
                      <input type="date" v-if="selectedItem" v-model="selectedItem.dueDate" disabled>
                    </div>
                    <div class="frame">
                      <h6>Status</h6>
                      <select v-if="selectedItem" v-model="selectedItem.status" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example" disabled>
                        <option class="opt" selected>Status</option>
                        <option class="opt" value="Completed">Completed</option>
                        <option class="opt" value="On-going">On-going</option>
                        <option class="opt" value="Not started">Not started</option>
                      </select>
                    </div>
                  </div>
                  <div class="fifth mt-3">
                    <div class="frame">
                      <h6>Rating</h6>
                      <div class="rating">
                        <input v-if="selectedItem" id="demo-1" type="radio" name="demo" value="1" v-model.number="selectedItem.selectedRating" disabled>
                        <label for="demo-1">1 star</label>
                        <input v-if="selectedItem" id="demo-2" type="radio" name="demo" value="2" v-model.number="selectedItem.selectedRating" disabled>
                        <label for="demo-2">2 stars</label>
                        <input v-if="selectedItem" id="demo-3" type="radio" name="demo" value="3" v-model.number="selectedItem.selectedRating" disabled>
                        <label for="demo-3">3 stars</label>
                        <input v-if="selectedItem" id="demo-4" type="radio" name="demo" value="4" v-model.number="selectedItem.selectedRating" disabled>
                        <label for="demo-4">4 stars</label>
                        <input v-if="selectedItem" id="demo-5" type="radio" name="demo" value="5" v-model.number="selectedItem.selectedRating" disabled>
                        <label for="demo-5">5 stars</label>

                        <div class="stars">
                          <label for="demo-1" aria-label="1 star" title="1 star"></label>
                          <label for="demo-2" aria-label="2 stars" title="2 stars"></label>
                          <label for="demo-3" aria-label="3 stars" title="3 stars"></label>
                          <label for="demo-4" aria-label="4 stars" title="4 stars"></label>
                          <label for="demo-5" aria-label="5 stars" title="5 stars"></label>
                        </div>

                      </div>
                    </div>
                    <div class="frame">
                      <h6>Evidence</h6>
                      <input type="file" class="form-control" @change="handleFileChange">
                    </div>
                  </div>
                  <div class="sixth mt-3">
                    <div class="frame">
                      <h6 class="department">Department</h6>
                      <select v-if="selectedItem" class="form-select" aria-label="Default select example" v-on:change="onSelectChange(e)" v-model="selectedItem.department" disabled>

                        <option class="opt" value="Administration">Administration</option>
                        <option class="opt" value="Procurement">Procurement</option>
                        <option class="opt" value="Knowledge Management">Knowledge Management</option>
                        <option class="opt" value="Credit Risk Management">Credit Risk Management</option>
                        <option class="opt" value="Information Technology">Information Technology</option>
                      </select>
                    </div>
                    <div class="frame">
                      <h6>Feedback</h6>

                      <textarea v-if="selectedItem" v-model="selectedItem.feedback" name="feedback" id="" cols="30" rows="50" placeholder="Feedback" readonly></textarea>
                    </div>
                  </div>
                </div>

                <div class="modal-footer">
                  <div class="prev">
                    <button type="button" class="btn btn-secondary" @click="prevTraining">Previous</button>
                  </div>
                  <div class="next">
                    <button type="button" class="btn btn-secondary" @click="nextTraining">Next</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </form>
      </teleport>
      <!-- <div class="modal" id="myModal1">
        <div class="modal-dialog">
          <div class="modal-content">

            <div class="modal-header">
              <h4 class="modal-title">Training Schedule</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal">X</button>
            </div>

            <div class="modal-body">
              <div class="table-responsive d-flex flex-column">
                <v-pagination v-model="currentPage" :length="totalPages"></v-pagination>
                <v-btn @click="downloadPDF">Download as PDF</v-btn>
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
                      <td>{{item.id}}</td>
                      <td>{{item.trainingStartDate}}</td>
                      <td>{{item.trainingTopic}}</td>
                      <td>{{item.learningOutcome}}</td>
                      <td>{{item.trainingMethod}}</td>
                      <td>{{item.trainingInitiator}}</td>
                     
                      <td>{{item.dueDate}}</td>
                      <td>{{item.status}}</td>
                      <td>{{item.selectedRating}}</td>
                      <td>{{item.evidenceURL}}</td>
                    </tr>
                  </tbody>
                </table>

              </div>
            </div>

          </div>
        </div>
      </div> -->

      <button class="view mb-2" data-bs-toggle="modal" data-bs-target="#myModal1" type="button">View All</button>
    </div>
    <div class="table-responsive mt-3">

      <table class="table">
        <thead>
          <tr>
            <th scope="col">
              <div class="adjustable-column d-flex align-center gap-1">
                <span class="noshrink" style="width:30px">S/N</span>

              </div>
            </th>
            <th scope="col">
              <div class="adjustable-column d-flex align-center gap-1">
                <span class="noshrink"> Months</span>

              </div>
            </th>
            <th scope="col">
              <div class="adjustable-column d-flex align-center gap-1">
                <span class="noshrink"> Training Topics</span>

              </div>
            </th>
            <th scope="col">
              <div class="adjustable-column d-flex align-center gap-1">
                <span class="noshrink"> Training Methods</span>

              </div>
            </th>
            <th scope="col">
              <div class="adjustable-column d-flex align-center gap-1">
                <span class="noshrink"> Status </span>

              </div>
            </th>
            <th scope="col">
              <div class="adjustable-column d-flex align-center gap-1">
                <span class="noshrink"> Approval Status </span>

              </div>
            </th>
          </tr>
        </thead>
        <tbody>

          <tr v-for="(item, index) in paginatedTrainings" :key="index" @click="handleClick(item)" @dblclick="handleDoubleClick(item)">
            <td scope="row">{{item.id}}</td>
            <td>{{formatDate(item.trainingStartDate)}}</td>
            <td>{{item.trainingTopic}}</td>
            <td>{{item.trainingMethod}}</td>
            <td>{{item.status}}</td>
            <td>{{item.isApproved}}</td>
            <td>

              <!-- <v-icon icon="mdi-delete" class="icon-danger" @click="deleteTraining(item.id)"></v-icon> -->
            </td>
          </tr>
        </tbody>
      </table>

    </div>
    <v-pagination v-model="currentPage" :length="totalPages"></v-pagination>
  </main>
</template>

<style scoped>
.wrapper {
  margin: 0;
  padding: 0;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1040;
}

.modal {
  background-color: rgba(0, 0, 0, 0.5);
  overflow-y: auto;
}

.title {
  display: flex;
  justify-content: left;
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
.table-responsive {
  width: 100%;
}
.full {
  width: 1200px;
}
table {
  width: 100%;
  table-layout: auto;
  border-collapse: collapse;
}

thead th,
tbody td {
  text-align: left;
  white-space: nowrap;
  padding: 15px;
  vertical-align: middle;
}

thead th {
  font-size: 12px;
  font-weight: 600;
  background-color: #fff;
}

tbody td {
  font-size: 12px;
  color: #000;
}

thead,
tbody tr {
  border-bottom: 1px solid #ddd;
}

.adjustable-column {
  min-width: 150px;
  max-width: 300px;
  white-space: normal;
  gap: 0;
}

.expanded-row {
  height: 70px;
}

.noshrink {
  width: 60px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  height: 30px !important;
}

#myModal2 .modal-dialog {
  --bs-modal-width: 960px;
  width: 960px;
  height: 950px;
  margin-left: 8%;
  display: inline-flex;
  padding: 30px;
  border-radius: 10px;
  background: #eee;
}

.modal-dialog {
  --bs-modal-width: 960px;
  width: 960px;
  height: 910px;
  margin-left: 8%;
  display: inline-flex;
  padding: 30px;
  border-radius: 10px;
  background: #eee;
}

.modal-body {
  gap: 20px;
  background: #fff;
  margin-top: 0px !important;
}

.modal-content {
  width: 900px;
  height: 900px;
  z-index: 1;
  --bs-backdrop-zindex: 1;
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 10px;
}

.first,
.second,
.third,
.fourth,
.fifth,
.sixth {
  display: flex;
  gap: 30px;
}
.frame {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}
.frame h6 {
  color: var(--Black, #000);
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.frame input {
  width: 390px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
}
.frame textarea {
  display: flex;
  width: 390px;
  height: 100px;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 5px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--White, #fff);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
}
.frame textarea::placeholder {
  color: var(--Grey-Dark, #808080);
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}

.form-select {
  width: 390px;
  height: 40px;
  color: var(--Grey-Dark, #808080);
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}

.modal-footer {
  display: flex;
  height: 40px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;
}
.modal-footer .btn {
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  color: #fff;
}

#myModal4 .area,
#myModal4 textarea {
  width: 390px;
  height: 110px;
  border-radius: 5px;
  background: #eeeeee;
  padding: 10px;
}

#myModal4 p {
  width: 390px;
  height: 40px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
}

#myModal4 .modal-footer {
  display: flex;
  width: 100%;
  margin: 0;
  gap: 20px;
}

.prev {
  float: left;
  width: 370px;
  height: 110px;
  display: flex;
  justify-content: start;
}

.next {
  float: right;
  width: 370px;
  height: 110px;
  display: flex;
  justify-content: end;
}

.form-selects {
  display: flex;
  width: 320px;
  height: 40px;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--White, #fff);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
}
.types button {
  display: flex;
  padding: 10px 50px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  color: #fff;
  margin-top: 10px;
}

.rating {
  width: 390px;
}
.frame button {
  width: 145px;
  display: flex;
  padding: 5px 20px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  color: #fff;
  margin-top: 10px;
}
.modal-footer button,
.one button {
  display: flex;
  padding: 8px 30px;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  color: var(--White, #fff);
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
  border: none;
}
.rating input[type="radio"]:not(:nth-of-type(0)) {
  /* hide visually */
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
.rating [type="radio"]:not(:nth-of-type(0)) + label {
  display: none;
}

label[for]:hover {
  cursor: pointer;
}

.rating .stars label:before {
  content: "★";
  font-size: 24px;
}

.stars label {
  color: lightgray;
}

.stars label:hover {
  text-shadow: 0 0 1px #000;
}

.rating
  [type="radio"]:nth-of-type(1):checked
  ~ .stars
  label:nth-of-type(-n + 1),
.rating
  [type="radio"]:nth-of-type(2):checked
  ~ .stars
  label:nth-of-type(-n + 2),
.rating
  [type="radio"]:nth-of-type(3):checked
  ~ .stars
  label:nth-of-type(-n + 3),
.rating
  [type="radio"]:nth-of-type(4):checked
  ~ .stars
  label:nth-of-type(-n + 4),
.rating
  [type="radio"]:nth-of-type(5):checked
  ~ .stars
  label:nth-of-type(-n + 5) {
  color: orange;
}

.rating [type="radio"]:nth-of-type(1):focus ~ .stars label:nth-of-type(1),
.rating [type="radio"]:nth-of-type(2):focus ~ .stars label:nth-of-type(2),
.rating [type="radio"]:nth-of-type(3):focus ~ .stars label:nth-of-type(3),
.rating [type="radio"]:nth-of-type(4):focus ~ .stars label:nth-of-type(4),
.rating [type="radio"]:nth-of-type(5):focus ~ .stars label:nth-of-type(5) {
  color: darkorange;
}

.icon-warning {
  color: orange;
}

.icon-danger {
  color: red;
}
.filter {
  margin-bottom: 20px;
}

.filter label {
  margin-right: 10px;
}

.filter select {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 1rem;
}

@media (max-width: 350px) {
  .frame input,
  .frame .form-select,
  .frame textarea {
    width: 150px !important;
  }

  #myModal4 textarea {
    width: 150 !important;
    height: 110px;
  }
}

@media (max-width: 400px) {
  .frame input,
  .frame .form-select,
  .frame textarea {
    width: 210px !important;
  }

  #myModal4 .modal-dialog {
    width: 95%;
    height: 1450px;
    margin-left: 5%;
  }

  .modal-content {
    height: 1400px;
  }

  .modal-body {
    width: 100%;
  }

  #myModal4 .area,
  #myModal4 textarea {
    width: 100%;
    height: 110px;
  }

  .first,
  .second,
  .third,
  .fourth,
  .fifth,
  .sixth {
    flex-direction: column;
  }

  #myModal4 .modal-footer {
    width: 100%;
    margin: 0;
    gap: 5px;
    flex-direction: column;
  }

  .prev {
    width: 80px !important;
    height: 110px;
    font-size: 8px;
  }

  .next {
    width: 100px;
    height: 110px;
  }
}

@media (max-width: 576px) {
  .frame input,
  .frame textarea {
    width: 210px !important;
  }

  table {
    width: 100%;
    table-layout: fixed;
  }

  thead th,
  tbody td {
    font-size: 10px;
    padding: 8px;
    text-align: center;
  }

  .adjustable-column {
    min-width: 100px;
    max-width: 150px;
    white-space: normal;
  }

  .noshrink {
    width: 40px;
  }

  /* Stack table rows on small screens */
  tbody td {
    display: block;
    text-align: right;
    padding-left: 50%;
    position: relative;
  }

  tbody td:before {
    content: attr(data-label);
    position: absolute;
    left: 0;
    width: 45%;
    padding-left: 15px;
    font-weight: bold;
    text-align: left;
    font-size: 10px;
  }

  #myModal4 .modal-dialog {
    width: 90%;
    height: 1450px;
    margin-left: 5%;
  }

  .modal-content {
    height: 1400px;
  }

  .modal-body {
    width: 100%;
  }

  #myModal4 .area,
  #myModal4 textarea {
    width: 100%;
    height: 110px;
  }

  .first,
  .second,
  .third,
  .fourth,
  .fifth,
  .sixth {
    flex-direction: column;
  }

  .frame input {
    width: 200px;
  }

  .frame .form-select {
    width: 200px;
  }

  #myModal4 .modal-footer {
    width: 100%;
    margin: 0;
    gap: 20px;
  }

  .prev {
    width: 100px;
    height: 110px;
  }

  .next {
    width: 100px;
    height: 110px;
  }
}

@media (max-width: 768px) {
  #myModal4 .modal-dialog {
    width: 90%;
    margin-left: 5%;
  }

  .modal-body {
    width: 100%;
  }

  #myModal4 .area,
  #myModal4 textarea {
    width: 260px;
    height: 110px;
  }

  .frame input {
    width: 260px;
  }

  .frame .form-select,
  .frame .rating {
    width: 270px;
  }

  #myModal4 .modal-footer {
    width: 100%;
    margin: 0;
    gap: 20px;
  }

  .prev {
    width: 250px;
    height: 110px;
  }

  .next {
    width: 250px;
    height: 110px;
  }

  .table thead th {
    font-size: 10px;
    padding: 15px 5px;
    width: 120px;
  }

  .table tbody td {
    font-size: 10px;
    padding: 15px 5px;
    width: auto;
  }

  .adjustable-column[data-v-5ac5b9c5] {
    min-width: 30px;
    max-width: 150px;
    white-space: nowrap;
  }

  .noshrink {
    font-size: 13px;
  }

  .table-responsive {
    width: 850px;
    overflow-x: auto;
    margin: 0;
  }

  .pagination-btn {
    font-size: 14px;
    padding: 10px 15px;
  }
}

@media (max-width: 820px) {
  .frame input {
    width: 240px !important;
  }

  .frame .form-select,
  .frame .rating {
    width: 240px !important;
  }

  #myModal4 textarea {
    width: 240px !important;
    height: 110px;
  }

  .prev {
    width: 240px !important;
    height: 110px;
  }

  .next {
    width: 240px !important;
    height: 110px;
  }
}

@media screen and (max-width: 992px) {
  .modal-dialog {
    width: 800px;
    margin-top: 10%;
    margin-left: 60px;
  }

  .modal-content {
    width: 100%;
  }

  .modal-body {
    width: 100%;
  }

  .form-select {
    width: 270px !important;
  }

  .frame textarea {
    width: 270px;
  }

  .frame input,
  .frame .rating {
    width: 270px;
  }

  #myModal4 textarea {
    width: 270px;
    height: 110px;
  }

  #myModal4 .modal-footer {
    width: 100%;
    margin: 0;
    gap: 20px;
  }

  .prev {
    width: 270px;
    height: 110px;
  }

  .next {
    width: 270px;
    height: 110px;
  }

  .table-responsive {
    width: 100%;
  }

  table {
    width: 800px;
    overflow-x: hidden;
  }

  thead tr th {
    min-width: 100px;
    padding: 10px 5px;
    gap: 0;
  }

  tbody tr td {
    min-width: 100px;
    padding: 10px 5px;
    gap: 0;
  }

  thead,
  tr {
    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
  }

  tbody tr {
    height: 50px;
    overflow: hidden;
  }
}
</style>