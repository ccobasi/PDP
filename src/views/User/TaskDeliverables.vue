<script setup>
import TabMenu from '../../components/Tabs/TabMenu.vue';
import TableFour from '../../components/Tables/TableFour.vue';
import { useRoute } from 'vue-router';
import { ref, onMounted, computed} from 'vue'
import {useTasksStore} from "@/store/tasks"
 import html2pdf from 'html2pdf.js';


const store = useTasksStore();
const tasks = store.tasks;

console.log(store.tasks);


  const task = ref('')
  const status = ref('')
  const startDate = ref('')
  const endDate = ref('')
  const comment  = ref('')
  const evidence = ref('')
  const selectedValue = ref('')

const addTask = async () => {
  if (
    task.value.trim() !== '' || status.value.trim() !== '' || startDate.value.trim() !== '' ||
    endDate.value.trim() !== '' || comment.value.trim() !== '' || evidence.value.trim() !== ''
  ) {
    await store.addTask(
      task.value.trim(), status.value.trim(), startDate.value.trim(),
      endDate.value.trim(), comment.value.trim(), evidence.value.trim()
    );

    // Clear form inputs after submission
    task.value = '';status.value = '';
    status.value = '';
    startDate.value = '';
    endDate.value = '';
    comment.value = '';
    evidence.value = '';

    console.log("Task added");
  }
};


const handleSubmit = () => {
  addTask();
  console.log("Task added")
};


onMounted(() => {
  
  store.fetchTasks();
  console.log("Fetched Tasks")
});

 

 const onSelectChange = () => {
  // eslint-disable-next-line no-self-assign
  selectedValue.value = selectedValue.value
}

const selectedFile = ref(null);

const handleFileChange = (task) => {
  const file = task.target.files[0];
  
  selectedFile.value = file;
};



// const tab = null;
 const isUserRoute = computed(() => {
  const route = useRoute();
  return route.path !== '/taskdeliverables';
});

const itemsPerPage = 15; 
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(tasks.length / itemsPerPage));

const paginatedTasks = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return tasks.slice(startIndex, endIndex);
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
  <main class="wrapper">
    <TabMenu />
    <div class="titles mt-3">
      <div class="modal" id="myModal1">
        <div class="modal-dialog">
          <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header">
              <h4 class="modal-title">Tasks/Deliverables Table</h4>
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
                          <span class="noshrink"> Tasks/Deliverables</span>

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
                          <span class="noshrink"> Start date</span>

                          <span class="d-flex flex-column align-center">
                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                          </span>

                        </div>
                      </th>
                      <th scope="col">
                        <div class="d-flex align-center gap-1">
                          <span class="noshrink"> End Date</span>

                          <span class="d-flex flex-column align-center">
                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                          </span>

                        </div>
                      </th>
                      <th scope="col">
                        <div class="d-flex align-center gap-1">
                          <span class="noshrink"> Comment</span>

                          <span class="d-flex flex-column align-center">
                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                          </span>

                        </div>
                      </th>
                      <th scope="col">
                        <div class="d-flex align-center gap-1">
                          <span class="noshrink"> Evidence of Completion </span>

                          <span class="d-flex flex-column align-center">
                            <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                            <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
                          </span>

                        </div>
                      </th>

                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in paginatedTasks" :key="index" @click="selectItem(item)" @dblclick="$router.push({ name: 'Skill Assessment Details', params: { id: item.id } })">

                      <!-- <tr v-for="item in skills" @click="selectItem(item)" @dblclick="$router.push({name: 'Skill Assessment Details', params: {id: item.id}})"> -->
                      <td>{{item.id}}</td>
                      <td>{{item.task}}</td>
                      <td>{{item.status}}</td>
                      <td>{{item.startDate}}</td>
                      <td>{{item.endDate}}</td>
                      <td>{{item.comment}}</td>
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
    <form method="post" action="" @submit.prevent="handleSubmit">
      <div class="modal" id="myModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Tasks/Deliverables Form</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">

              <div class="first">
                <div class="frame">
                  <h6>Tasks/Deliverables</h6>
                  <textarea v-model="task" name="training topic" id="" cols="30" rows="10" placeholder="Tasks/Deliverables"></textarea>
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
              <div class="second">
                <div class="frame">
                  <h6>Start Time</h6>
                  <input type="date" v-model="startDate">
                </div>
                <div class="frame">
                  <h6>End Time</h6>
                  <input type="date" v-model="endDate">
                </div>
              </div>
              <div class="third">
                <div class="frame">
                  <h6>Comment</h6>
                  <textarea v-model="comment" name="Comment" id="" cols="30" rows="10" placeholder="Comment"></textarea>
                </div>
                <div class="frame">
                  <h6>Evidence of Completion</h6>
                  <input type="file" @change="handleFileChange">

                </div>
              </div>
            </div>

            <div class="modal-footer mb-3">

              <button type="submit" class="btn btn-success" data-bs-dismiss="modal" @click="$router.push('/taskdeliverables')">Submit Request</button>
            </div>

          </div>
        </div>
      </div>
    </form>
    <div class="task mt-5">
      <div class="header">
        <div class="title mb-4">
          <h3>Task Deliverables</h3>
          <button data-bs-toggle="modal" data-bs-target="#myModal" type="button" v-if="isUserRoute">Add Task/Deliverables</button>

        </div>

        <div class="lines"></div>
      </div>
      <TableFour />
    </div>
  </main>
</template>

<style scoped>
main {
  height: 800px;
}
.titles {
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
  width: 1080px;
}
.header {
  display: flex;
  flex-direction: column;
  align-self: stretch;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
}
.title button {
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
.lines {
  width: 100%;
  height: 1px;
  background: #808080;
}
.modal {
  margin-left: 7%;
}
.modal-dialog {
  --bs-modal-width: 1200px;
  width: 1200px;
  height: 500px;
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
.first,
.second,
.third,
.fourth,
.fifth {
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
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.frame input {
  width: 320px;
  height: 40px;
}
.frame textarea {
  display: flex;
  width: 320px;
  height: 50px;
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
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}
.form-select {
  width: 320px;
  color: var(--Grey-Dark, #808080);
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}
.modal-footer {
  display: flex;
  height: 60px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;
}
.modal-footer button {
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
</style>
