<script setup>
import TabMenu from '../../components/Tabs/TabMenuFour.vue';
import DoughNut from '../../components/DoughNut.vue'
import CareerGoal from '../../components/CareerGoal.vue'
// import KMidTerm from '../../components/Tables/KMidTerm.vue'
import KLongTerm from '../../components/Tables/KLongTerm.vue'
import HMidTerm from '../../components/Tables/HMidTerm.vue'
// import Table from '../../components/Tables/TableFive.vue'
import { ref, computed, onMounted } from 'vue'
import {useHODGoalsStore} from "@/store/goals"
import { useSelectedNameStore } from '@/store/goals.js';
import html2pdf from 'html2pdf.js';
import MissionVission from '../../components/Cards/MissionVission.vue'


const store = useHODGoalsStore();
var goals = store.hodGoals;
console.log(goals);

const selectedNameStore = useSelectedNameStore();
const selectedName = computed(() => selectedNameStore.name);


const plan = ref('')
  const term = ref('')
  const goal = ref('')
  const achieve = ref('')
  const resource = ref('')
  const success  = ref('')
  const potential = ref('')
  const solution = ref('')
  const date = ref('')
  const progress = ref('')
  const status = ref('')
  const feedback = ref('')
  const evidence = ref(null)
  const selectedValue = ref('')
  const loadingUpload = ref(false);

const addGoal = async () => {
  if (
    plan.value.trim() !== '' || term.value.trim() !== '' || goal.value.trim() !== '' || achieve.value.trim() !== '' ||
    resource.value.trim() !== '' || success.value.trim() !== '' || potential.value.trim() !== '' ||
    solution.value.trim() !== '' || date.value.trim() !== '' || progress.value.trim() !== '' ||
    status.value.trim() !== '' || feedback.value.trim() !== '' || evidence.value
  ) {
    await store.addGoal(
      plan.value.trim(), term.value.trim(), goal.value.trim(), achieve.value.trim(),
      resource.value.trim(), success.value.trim(), potential.value.trim(), solution.value.trim(),
      date.value.trim(), progress.value.trim(), status.value.trim(), feedback.value.trim(), evidence.value
    );

    plan.value = '';
    term.value = '';
    goal.value = '';
    achieve.value = '';
    resource.value = '';
    success.value = '';
    potential.value = '';
    solution.value = '';
    date.value = '';
    progress.value = '';
    status.value = '';
    feedback.value = '';
    evidence.value = null;

    console.log("Goal added");
  }
};


const handleSubmit = () => {
  addGoal();
  console.log("HOD Goal added")
};

onMounted(() => {
  
  store.fetchGoals();
});

 const onSelectChange = () => {
  // eslint-disable-next-line no-self-assign
  selectedValue.value = selectedValue.value
}

const itemsPerPage = 10; 
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

const openFileInput = () => {
  evidence.value.click();
};

const submitFile = () => {
  const file = evidence.value.files[0];

  if (file) {
    store.setEvidence(file);

    loadingUpload.value = true;
    setTimeout(() => {
      loadingUpload.value = false;
      console.log('File uploaded successfully:', file.name);
    }, 2000);
  }
};

const tab = ref(1);
</script>


<template>
  <main class="wrapper">
    <TabMenu />
    <form method="post" action="" @submit.prevent="handleSubmit">
      <div class="modal" id="myModaltwo" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add Plan Form</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">

              <div class="type">
                <div class="wrap d-flex">
                  <div class="plan">
                    <h3>Development plan type</h3>
                    <select class="form-select" aria-label="Default select example" v-on:change="onSelectChange(e)" v-model="plan">

                      <option class="opt" value="Area of Interest">Area of Interest</option>
                      <option class="opt" value="Career Goals and Aspirations">Career Goals and Aspirations</option>
                      <option class="opt" value="Mentorship and Skill Building">Mentorship and Skill Building</option>
                    </select>
                  </div>
                  <div class="term">
                    <h3>Duration</h3>
                    <select class="form-select" aria-label="Default select example" v-on:change="onSelectChange(e)" v-model="term">

                      <option class="opt" value="Short Term Goal">Short Term Goal</option>
                      <option class="opt" value="Mid Term Goal">Mid Term Goal</option>
                      <option class="opt" value="Long Term Goal">Long Term Goal</option>
                    </select>
                  </div>
                </div>

              </div>
              <div class="goal">
                <div class="left">
                  <h4>Goal</h4>
                  <textarea name="Goal" placeholder="Goal" id="" cols="30" rows="10" v-model="goal"></textarea>
                </div>
                <div class="right">
                  <h4 class="">What I will do to achieve this</h4>
                  <textarea name="Goal" placeholder="What I will do to achieve this" id="" cols="30" rows="10" v-model="achieve"></textarea>
                </div>
              </div>
              <div class="goal">
                <div class="left">
                  <h4>Resources and Support Needed</h4>
                  <textarea name="Resources and Support Needed" placeholder="Resources and Support Needed" id="" cols="30" rows="10" v-model="resource"></textarea>
                </div>
                <div class="right">
                  <h4 class="">What does success look like?</h4>
                  <textarea name="Goal" placeholder="What does success look like?" id="" cols="30" rows="10" v-model="success"></textarea>
                </div>
              </div>
              <div class="goal">
                <div class="left">
                  <h4>Potential Challenges</h4>
                  <textarea name="Potential Challenges" placeholder="Potential Challenges" id="" cols="30" rows="10" v-model="potential"></textarea>
                </div>
                <div class="right">
                  <h4 class="">Solution</h4>
                  <textarea name="Goal" placeholder="Solution" id="" cols="30" rows="10" v-model="solution"></textarea>
                </div>
              </div>
              <div class="goal">
                <div class="lefts mt-1">
                  <h4>Target Date for Completion</h4>
                  <input type="date" v-model="date">
                </div>
                <div class="wright">
                  <h4>Progress Metrics(Outcome Based)</h4>
                  <textarea name="Progress" placeholder="Progress Metrics" id="" cols="30" rows="10" v-model="progress"></textarea>
                </div>

              </div>
              <div class="goal">
                <div class="lefts">
                  <h4>Status</h4>
                  <select v-model="status" v-on:change="onSelectChange(e)" class="form-selects" aria-label="Default select example">
                    <option class="opt" selected>Status</option>
                    <option class="opt" value="Completed">Completed</option>
                    <option class="opt" value="On-going">On-going</option>
                    <option class="opt" value="Not started">Not started</option>
                  </select>
                </div>
                <div class="wright">
                  <h4>Feedback</h4>
                  <textarea name="Feedback" placeholder="Feedback" id="" cols="30" rows="10" v-model="feedback"></textarea>
                </div>

              </div>
              <div class="types">
                <div class="upload">
                  <v-btn :loading="loadingUpload" height="48" rounded="xl" size="small" onclick="document.getElementById('getFile').click()" @click="openFileInput" variant="flat">Upload Evidence</v-btn>
                  <input type='file' id="getFile" style="display:none" @change="submitFile()" accept="application/pdf" ref="evidence">
                </div>

              </div>
            </div>
            <div class="modal-footer">

              <button type="submit" class="btn btn-success" data-bs-dismiss="modal" @click="$router.push('/hod/')">Submit Request</button>
            </div>

          </div>
        </div>
      </div>
    </form>
    <div class="modal" id="myModal1">
      <div class="modal-dialogs">
        <div class="modal-content">
          <v-pagination style="margin:auto" v-model="currentPage" :length="totalPages"></v-pagination>
          <v-btn style="background: #47b65c;color:#fff;margin:auto" @click="downloadPDF">Download as PDF</v-btn>
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Development Plans</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal">X</button>
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
                  <tr v-for="(item, index) in paginatedGoals" :key="index" @click="selectItem(item)" @dblclick="$router.push({ name: 'Details', params: { id: item.id } })">

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
    <div class="development mt-5">
      <MissionVission />
      <div class="dev">
        <h3>Development Plan: <span class="text-success">{{ selectedName }}</span></h3>
        <button data-bs-toggle="modal" data-bs-target="#myModaltwo" type="button">Development Plan Request</button>
      </div>
      <hr>
      <div class="goals">
        <v-card>
          <v-tabs class="custom-tab" v-model="tab" color="deep-purple-accent-4" align-tabs="left">
            <v-tab class="link-tab" :value="1">Short term goals (3 - 6 Months)</v-tab>
            <v-tab class="link-tab" :value="2">Mid term goals (7 - 12 Months)</v-tab>
            <v-tab class="link-tab" :value="3">Long term goals (13 - 24 Months)</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">

            <v-tab-item :value="1">
              <v-container fluid v-if="tab === 1">
                <div class="chart">
                  <DoughNut />

                </div>
                <div class="table">
                  <CareerGoal />
                </div>
              </v-container>
            </v-tab-item>

            <v-tab-item :value="2">
              <v-container fluid v-if="tab === 2">
                <div class="chart">
                  <DoughNut />

                </div>
                <div class="table">
                  <HMidTerm />
                </div>
              </v-container>
            </v-tab-item>

            <v-tab-item :value="3">
              <v-container fluid v-if="tab === 3">
                <div class="chart">
                  <DoughNut />

                </div>
                <div class="table">
                  <KLongTerm />
                </div>
              </v-container>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </div>

    </div>
  </main>
</template>

<style scoped>
.development {
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;

  border-radius: 10px;
  background: #fff;
}
.dev h3 {
  color: var(--Black, #000);
  font-family: "Inter", sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 28.8px;
  width: 800px;
}
.dev {
  display: flex;
  padding: 10px 10px;
  align-items: center;
  gap: 10px;
}
.dev button {
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  width: 252px;
  height: 40px;
  color: #fff;
  font-family: "Inter", sans-serif;
}
.dynamic {
  justify-content: space-between;
  gap: 35px;
}
.member,
.plan {
  width: 300px;
}
hr {
  width: 100%;
  height: 1px;
  background: #808080;
}
.goals {
  display: flex;
  justify-content: flex-start !important;
  align-items: flex-start;
  gap: 30px;
  margin-left: 10px;
  margin-top: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 15px;
  border-radius: 50px;
  background: var(--Grey-Light, #eee);
  align-self: stretch;
}
.short {
  display: flex;
  padding: 5px 15px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  background: var(--Primary, #227cbf);
  color: var(--White, #fff);
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.chart {
  width: 100%;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  height: 30px !important;
}
.team,
.approval {
  color: var(--Black, #000);
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.modal-body {
  gap: 20px;
  background: #fff;
  margin-top: 0px !important;
  border: 1px solid var(--Grey-Light, #fff);
  border-radius: 10px;
}
.modal-dialog {
  width: 900px;
  height: 800px;
  margin-left: 20%;
  display: inline-flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 10px;
}
.modal-content {
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 10px;
  background: #eee;
}
.type {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}
.type h3 {
  color: var(--Black, #000);
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.form-select {
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
.goal {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  margin-top: 20px;
}
.left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}
.right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}
.left h4,
.right h4 {
  color: var(--Black, #000);
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.goal textarea {
  display: flex;
  width: 320px;
  height: 70px;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border: 1px solid #808080;
  border-radius: 5px;
}
.type input {
  display: flex;
  width: 400px;
  height: 40px;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--White, #fff);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
}
.modal-footer {
  display: flex;
  height: 40px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;
  margin-bottom: 20px;
}
.modal-footer .btn {
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  color: #fff;
}
.modal-bodys {
  gap: 10px;
  background: #fff;
  margin-top: 0px !important;
  border: 1px solid var(--Grey-Light, #fff);
  border-radius: 10px;
  padding: 10px;
}
.pending {
  display: flex;
  width: 685px;
  height: 705px;
  padding: 30px 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 10px;
  background: #fff;
}
.left h4,
.right h4,
.wright h4,
.lefts h4 {
  color: var(--Black, #000);
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.lefts input {
  width: 320px;
  height: 40px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--White, #fff);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
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
</style>
