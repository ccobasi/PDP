<script setup>
import TabMenu from '../../components/Tabs/TabMenu.vue';
import TableFour from '../../components/Tables/TableFour.vue';
import { useRoute } from 'vue-router';
import { ref, onMounted, computed} from 'vue'
import {useTasksStore} from "@/store/tasks"


const store = useTasksStore();
console.log(store.tasks);

// eslint-disable-next-line no-unused-vars
const tasks = ref([])
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

</script>



<template>
  <main class="wrapper">
    <TabMenu />
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
  margin-left: 21%;
}
.modal-dialog {
  --bs-modal-width: 800px;
  width: 800px;
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
