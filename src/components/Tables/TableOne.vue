<script setup>
    import { useGoalsStore } from "@/store/goals";
    import { ref, computed, /*onMounted, watchEffect*/ } from 'vue';
    import AccordionCard from "../Cards/AccordionCard.vue"
    import { useRoute } from 'vue-router';
    import html2pdf from 'html2pdf.js';

    // import { options } from '@/store/filter';


const store = useGoalsStore();
var goals = store.goals;
const goals_ = ref([])
goals_.value = store.goals

const selectedItem = ref(null);
// const selectedPlan = ref(1);

const selectItem = (item) => {
  selectedItem.value = item;
  console.log(selectedItem)
};

const itemsPerPage = 15; 
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(goals.length / itemsPerPage));

const paginatedGoals = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return goals.slice(startIndex, endIndex);
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
   

    const isUserRoute = computed(() => {
  const route = useRoute();
  return route.path !== '/';
});

const options = ref([
  { value: 'Career Goals and Aspirations', text: 'Career Goals and Aspirations' },
  { value: 'Area of Interest', text: 'Areas of Interest' },
  { value: 'Mentorship and Skill Building', text: 'Mentorship and Skills Building' },
]);

const selectedOption = ref('Career Goals and Aspirations');
const selectedTerm = ref('Short Term Goal');

// const filteredGoals = computed(() => {
//   var filteredGoal = goals_.value.filter(item => item.plan == selectedOption.value);
// });

const filteredGoals = computed(() => {
  return goals_.value.filter(item => {
    return item.plan === selectedOption.value && item.term === selectedTerm.value;
  });
});

</script>
<template>
  <div class="modal" id="myModal1">
    <div class="modal-dialog">
      <div class="modal-content">
        <v-pagination v-model="currentPage" :length="totalPages"></v-pagination>
        <v-btn @click="downloadPDF">Download as PDF</v-btn>
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Development Plans</h4>
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
                      <span class="noshrink"> Plan</span>

                      <span class="d-flex flex-column align-center">
                        <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                        <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                      </span>

                    </div>
                  </th>
                  <th scope="col">
                    <div class="d-flex align-center gap-1">
                      <span class="noshrink"> Term</span>

                      <span class="d-flex flex-column align-center">
                        <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                        <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                      </span>

                    </div>
                  </th>
                  <th scope="col">
                    <div class="d-flex align-center gap-1">
                      <span class="noshrink"> Achieve</span>

                      <span class="d-flex flex-column align-center">
                        <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                        <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                      </span>

                    </div>
                  </th>
                  <th scope="col">
                    <div class="d-flex align-center gap-1">
                      <span class="noshrink"> Resources</span>

                      <span class="d-flex flex-column align-center">
                        <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                        <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                      </span>

                    </div>
                  </th>
                  <th scope="col">
                    <div class="d-flex align-center gap-1">
                      <span class="noshrink"> Success</span>

                      <span class="d-flex flex-column align-center">
                        <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                        <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                      </span>

                    </div>
                  </th>
                  <th scope="col">
                    <div class="d-flex align-center gap-1">
                      <span class="noshrink"> Potential</span>

                      <span class="d-flex flex-column align-center">
                        <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                        <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                      </span>

                    </div>
                  </th>
                  <th scope="col">
                    <div class="d-flex align-center gap-1">
                      <span class="noshrink"> Solution </span>

                      <span class="d-flex flex-column align-center">
                        <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                        <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                      </span>

                    </div>
                  </th>
                  <th scope="col">
                    <div class="d-flex align-center gap-1">
                      <span class="noshrink"> Date </span>

                      <span class="d-flex flex-column align-center">
                        <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                        <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                      </span>

                    </div>
                  </th>
                  <th scope="col">
                    <div class="d-flex align-center gap-1">
                      <span class="noshrink"> Progress</span>

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
                      <span class="noshrink"> Feedback</span>

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
                <tr v-for="(item, index) in paginatedGoals" :key="index" @click="selectItem(item)" @dblclick="$router.push({ name: 'Skill Assessment Details', params: { id: item.id } })">

                  <!-- <tr v-for="item in skills" @click="selectItem(item)" @dblclick="$router.push({name: 'Skill Assessment Details', params: {id: item.id}})"> -->
                  <td>{{item.id}}</td>
                  <td>{{item.plan}}</td>
                  <td>{{item.term}}</td>
                  <td>{{item.goal}}</td>
                  <td>{{item.achieve}}</td>
                  <td>{{item.resource}}</td>
                  <td>{{item.potential}}</td>
                  <td>{{item.solution}}</td>
                  <td>{{item.date}}</td>
                  <td>{{item.progress}}</td>
                  <td>{{item.status}}</td>
                  <td>{{item.feedback}}</td>
                  <td>{{item.evidence}}</td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>

      </div>
    </div>
  </div>
  <div class="title mb-3">

    <button class="view" data-bs-toggle="modal" data-bs-target="#myModal1" type="button">View All</button>
  </div>
  <select class="form-select" v-model="selectedOption">

    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.text }}
    </option>
  </select>
  <div class="table-responsive d-flex flex-row">

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
              <span class="noshrink"> Plan</span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span class="noshrink"> Term</span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span class="noshrink"> Goal</span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span class="noshrink"> Target Date for Completion</span>

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
              <span class="noshrink"> Feedbacks </span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>

        </tr>
      </thead>
      <tbody>

        <tr v-for="item in filteredGoals" :key="item.id" @click="selectItem(item)" @dblclick="$router.push({name: 'Detail', params: {id: item.id}})">
          <td>{{item.id}}</td>
          <td>{{item.plan}}</td>
          <td>{{item.term}}</td>
          <td>{{item.goal}}</td>
          <td>{{item.date}}</td>
          <td>{{item.status}}</td>
          <td>{{item.feedback}}</td>

        </tr>

      </tbody>
    </table>
    <div class="side-panel">

      <h3> Details </h3>
      <AccordionCard :item="selectedItem" />
      <div v-if="isUserRoute" class="delete"><button>Delete</button></div>
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
table {
  width: 800px;
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
  padding: 10px;
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
.accordion-item {
  display: flex;
  width: 350px;
  height: 57px;
  padding: 15px 0px;
  justify-content: space-between;
  align-items: center;
}
.accordion-button {
  width: 330px;
}
.wrap {
  width: 100%;
}
.accordion-body textarea {
  width: 300px;
  height: 100px;
  border: 1px solid #eee;

  border-radius: 5px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--Grey-Light, #eee);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
}
.accordion-body textarea::placeholder {
  color: var(--Grey-Dark, #808080);
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}
.accordion-body input {
  width: 300px;
}
.accordion-body button {
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
.modal-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  color: var(--Black, #000);
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
}
.modal-body {
  display: flex;
  padding: 20px 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 10px;
  background: #fff;
}

.form-select {
  width: 30%;
}
</style>