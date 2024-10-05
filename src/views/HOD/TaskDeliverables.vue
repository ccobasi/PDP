<script setup>
import TabMenu from '../../components/Tabs/TabMenuFour.vue';
import TableFour from '../../components/Tables/TableFour.vue'
import { ref, onMounted } from 'vue'
import {useTasksStore} from "@/store/tasks"
// import {ref} from "vue";

// const tab = ref(null)
const store = useTasksStore();
const tasks = store.tasks;
console.log(tasks);


  const task = ref('')
  const status = ref('')
  const startDate = ref('')
  const endDate = ref('')
  const comment  = ref('')
  const evidence = ref(null)
  const selectedValue = ref('')
  // const loadingUpload = ref(false);

const addTask = async () => {
  if (
    task.value.trim() !== '' || status.value.trim() !== '' || startDate.value.trim() !== '' ||
    endDate.value.trim() !== '' || comment.value.trim() !== '' || evidence.value
  ) {
    await store.addTask(
      task.value.trim(), status.value.trim(), startDate.value.trim(),
      endDate.value.trim(), comment.value.trim(), evidence.value
    );

    // Clear form inputs after submission
    task.value = '';
    status.value = '';
    startDate.value = '';
    endDate.value = '';
    comment.value = '';
    evidence.value = null;

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
</script>


<template>
  <main class="wrapper">
    <TabMenu />
    <form method="post" action="" @submit.prevent="handleSubmit">
      <div class="modal" id="myModal2" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add Task/Deliverables</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><b>X</b></button>
            </div>

            <div class="modal-body">

              <div class="goal">
                <div class="left">
                  <h4>Task/Deliverables</h4>
                  <textarea name="Task" placeholder="Task" id="" cols="30" rows="10" v-model="task"></textarea>
                </div>
                <div class="right">
                  <h4>Status</h4>
                  <select v-model="status" v-on:change="onSelectChange(e)" class="form-selects" aria-label="Default select example">
                    <option class="opt" selected>Status</option>
                    <option class="opt" value="Completed">Completed</option>
                    <option class="opt" value="On-going">On-going</option>
                    <option class="opt" value="Not started">Not started</option>
                  </select>
                </div>
              </div>
              <div class="goal">
                <div class="left">
                  <h4>Start Time</h4>
                  <input type="date" v-model="startDate">
                </div>
                <div class="right">
                  <h4 class="">End Time</h4>
                  <input type="date" v-model="endDate">
                </div>
              </div>
              <div class="goal">
                <div class="left">
                  <h4>Comment</h4>
                  <textarea name="Comment" placeholder="Comment" id="" cols="30" rows="10" v-model="comment"></textarea>
                </div>
                <div class="right" style="width:320px">

                </div>
              </div>
            </div>
            <div class="modal-footer">

              <button type="submit" class="btn btn-success" data-bs-dismiss="modal" @click="$router.push('/hod/taskdeliverables')">Submit Request</button>
            </div>

          </div>
        </div>
      </div>
    </form>
    <div class="task mt-5">
      <div class="header">
        <div class="title mb-4">
          <h3>Task Deliverables</h3>
          <button data-bs-toggle="modal" data-bs-target="#myModal2" type="button">Add Task/Deliverables</button>

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
.title h3 {
  font-family: 'Inter', sans-serif;
}
.title button {
  display: flex;
  padding: 10px 30px;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  background: var(--Secondary, #47b65c);

  color: var(--White, #fff);
  font-family: 'Inter', sans-serif;
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
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  height: 30px !important;
}
.modal-body {
  gap: 20px;
  background: #fff;
  margin-top: 0px !important;
}
form .modal-dialog {
  width: 900px;
  height: 600px;
  margin-left: 20%;
  display: inline-flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 10px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--Grey-Light, #eee);
}
.modal-content {
  z-index: 1;
  --bs-backdrop-zindex: 1;
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 10px;
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
  justify-content: flex-end;
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
.left input,
.right input {
  width: 320px;
  height: 40px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--White, #fff);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
}
.right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}
.left h4,
.right h4,
.wright h4,
.lefts h4 {
  color: var(--Black, #000);
  font-family: 'Inter', sans-serif;
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
.wright textarea {
  width: 320px;
  height: 70px;
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
#myModal1,
#dialog {
  margin-left: 2.5%;
}
#two {
  --bs-modal-width: 1280px;
  width: 1280px;
  height: 550px;
  display: inline-flex;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 10px;
  margin-left: 2%;
  border: none;
  background: none;
}
.modal-header .btn-close {
  background: transparent;
  color: #808080;
}
</style>
