<script setup>
    import { ref, computed } from 'vue';
    import AccordionCardTwo from '../Cards/AccordionCardTwo.vue'
    import {useITSkillsStore} from "@/store/skills"
    import html2pdf from 'html2pdf.js';
    import { useRoute } from 'vue-router';


const store = useITSkillsStore();
const skills = store.itSkills;

console.log(skills);

const selectedItem = ref(null);

const selectItem = (item) => {
  selectedItem.value = item;
  console.log(selectedItem)
};

const itemsPerPage = 15; 
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(skills.length / itemsPerPage));

const paginatedSkills = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return skills.slice(startIndex, endIndex);
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

const deleteSelectedGoal = () => {
  if (selectedItem.value) {
    store.deleteSkill(selectedItem.value.id);
    selectedItem.value = null;
  } else {
    console.error('No goal selected for deletion.');
  }
};

  const isUserRoute = computed(() => {
  const route = useRoute();
  return route.path !== '/skillassessment';
});
</script>
<template>
  <div class="d-goal">

    <div class="container">

      <ul class="responsive-table">
        <li class="table-header">
          <div class="col col-1">S/N</div>
          <div class="col col-1">Skill</div>
          <div class="col col-2">Gaps</div>

        </li>
        <li class="table-row" v-for="(skill, index) in paginatedSkills" :key="index">
          <div class="col col-1" data-label="Skill">{{ skill.id }}</div>
          <div class="col col-1" data-label="Skill">{{ skill.skill }}</div>
          <div class="col col-2" data-label="Gaps">{{ skill.gap }}</div>
        </li>

      </ul>
      <v-pagination v-model="currentPage" :length="totalPages"></v-pagination>
    </div>
  </div>
  <div class="title">
    <div class="modal" id="myModal3">
      <div class="modal-dialog">
        <div class="modal-content">

          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Skill Assessment</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal">X</button>
          </div>

          <!-- Modal body -->
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
                        <span class="noshrink"> Skills</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Current State</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Gap</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Desired State</span>

                        <span class="d-flex flex-column align-center">
                          <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                          <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                        </span>

                      </div>
                    </th>
                    <th scope="col">
                      <div class="d-flex align-center gap-1">
                        <span class="noshrink"> Initiatives</span>

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
                        <span class="noshrink"> Feedbacks </span>

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
                  <tr v-for="(item, index) in paginatedSkills" :key="index" @click="selectItem(item)" @dblclick="$router.push({ name: 'Skill Assessment Details', params: { id: item.id } })">

                    <!-- <tr v-for="item in skills" @click="selectItem(item)" @dblclick="$router.push({name: 'Skill Assessment Details', params: {id: item.id}})"> -->
                    <td>{{item.id}}</td>
                    <td>{{item.skill}}</td>
                    <td>{{item.currentState}}</td>
                    <td>{{item.gap}}</td>
                    <td>{{item.desiredState}}</td>
                    <td>{{item.initiative}}</td>
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

    <button class="view" data-bs-toggle="modal" data-bs-target="#myModal3" type="button">View All</button>
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
              <span class="noshrink"> Skills</span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span class="noshrink"> Current State</span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span class="noshrink"> Gap</span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span class="noshrink"> Desired State</span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="item in skills" @click="selectItem(item)" @dblclick="$router.push({name: 'Skill Assessment Details', params: {id: item.id}})">
          <td>{{item.id}}</td>
          <td>{{item.skill}}</td>
          <td>{{item.currentState}}</td>
          <td>{{item.gap}}</td>
          <td>{{item.desiredState}}</td>

        </tr>
      </tbody>
    </table>

    <div class="side-panel">
      <h3> Details </h3>
      <AccordionCardTwo :item="selectedItem" />
      <div @click="deleteSelectedGoal" v-if="isUserRoute" class="delete"><button>Delete</button></div>
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
.table-responsive {
  width: 100%;
  display: flex;
  flex-direction: row;
}

table {
  width: 780px;
}
.full {
  width: 1080px;
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
  height: auto;
  display: inline-flex;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 10px;
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
.v-btn button {
  background: #47b65c;
}
.modal-header .btn-close {
  background: transparent;
  color: #808080;
}
.container {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
}
.responsive-table li {
  border-radius: 3px;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
}
.responsive-table .table-header {
  background-color: #47b65c;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: #fff;
}
.responsive-table .table-row {
  background-color: #fff;
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
}
.responsive-table .col-1 {
  flex-basis: 10%;
}
.responsive-table .col-2 {
  flex-basis: 40%;
}
.responsive-table .col-3 {
  flex-basis: 25%;
}
.responsive-table .col-4 {
  flex-basis: 25%;
}
button:not(:disabled) {
  cursor: pointer;
  background: #47b65c;
  color: #fff;
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
</style>