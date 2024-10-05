<script setup>
import {useTasksStore} from "@/store/tasks"
import { ref, computed, getCurrentInstance} from 'vue'
import { useRouter } from 'vue-router';


const { appContext } = getCurrentInstance();
const $route = appContext.config.globalProperties.$route;
const router = useRouter();


const store = useTasksStore();
const tasks = ref(store.tasks);

const detailsId = computed(() => parseInt($route.params.id));
const detail = computed(() => tasks.value.find(task => task.deliverableId === detailsId.value));


const task = ref(detail.value?.task || '');
const status = ref(detail.value?.status || '')
const startDate = ref(detail.value?.startDate || '')
const endDate = ref(detail.value?.endDate || '')
const comment = ref(detail.value?.comment || '')

const handleSubmit = () => {
  
  store.updateTask(detailsId.value, {
    task: task.value,
    status: status.value,
    startDate: startDate.value,
    endDate: endDate.value,
    comment: comment.value,
    
  });

  store.saveTasks();

  router.push('/taskdeliverables');
}

</script>
<template>
  <div class="details" v-if="detail.value">
    <div class="skills">
      <form method="post" action="" @submit.prevent="handleSubmit">
        <h3>Tasks/Deliverables</h3>
        <div class="line"></div>
        <div class="learn">
          <div class="frame">
            <div class="one">
              <div class="title">
                <caption>Tasks/Deliverables</caption>

              </div>
              <textarea v-model="task" name="goal" id="" placeholder="Type here" cols="30" rows="10" :readonly="true">{{detail.task}}</textarea>
            </div>
            <div class="one">
              <div class="title">
                <caption>Status</caption>

              </div>
              <select v-model="status" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
                <option class="opt" selected>{{detail.status}}</option>
                <option class="opt" value="Completed">Completed</option>
                <option class="opt" value="On-going">On-going</option>
                <option class="opt" value="Not started">Not started</option>
              </select>
            </div>
          </div>
          <div class="frame">
            <div class="one">
              <div class="title">
                <caption>Start Date</caption>

              </div>
              <textarea v-model="startDate" name="Resources and Support Needed" id="" placeholder="Type here" cols="30" rows="10" :readonly="true">{{detail.startDate}}</textarea>
            </div>
            <div class="one">
              <div class="title">
                <caption>End Date</caption>

              </div>
              <textarea v-model="endDate" name="What does success look like?" id="" placeholder="Type here" cols="30" rows="10" :readonly="true">{{detail.endDate}}</textarea>
            </div>
          </div>
          <div class="frame">
            <div class="one">
              <div class="title">
                <caption>Comment</caption>

              </div>
              <textarea v-model="comment" name="Comment" id="" placeholder="Type here" cols="30" rows="10" :readonly="true">{{detail.comment}}</textarea>
            </div>
            <div class="one">
              <div class="title">
                <caption>Evidence of Completion</caption>

              </div>
              <input type="file">
            </div>
          </div>
          <div class="save">
            <button class="back" @click="$router.push('/tasksdeliverables')">Back</button>
            <button type="submit" class="bsave">Save Changes</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped>
.details {
  display: flex;
  width: 1349px;
  height: 1100px;
  padding: 30px 50px;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  background: var(--Grey-Light, #eee);
}
.skills {
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  align-self: stretch;
  border-radius: 10px;
  background: #fff;
}
.skill h3 {
  color: var(--Black, #000);
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 28.8px;
}
.line {
  width: 1190px;
  height: 1px;
  background: #808080;
}
.learn {
  display: flex;
  padding: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 30px;
  align-self: stretch;
  border-radius: 5px;
  border: 0.885px solid var(--gray-200, #e4e4e7);
  background: var(--Color-3, #fff);
  box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.1);
}
.frame {
  display: flex;
  align-items: center;
  gap: 30px;
  align-self: stretch;
}
.one {
  display: flex;
  flex-direction: column;
}
.title {
  display: flex;
  height: 44px;
  padding: 10px 0px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  color: var(--Black, #000);
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.one textarea {
  width: 550px;
  height: 100px;
  border: 1px solid #eee;

  border-radius: 5px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--Grey-Light, #eee);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
}
.one textarea::placeholder {
  color: var(--Grey-Dark, #808080);
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}
.one input,
.form-select {
  width: 550px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--Grey-Light, #eee);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
}
.one button {
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
.save {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 30px;
  align-self: stretch;
}
.bsave {
  display: flex;
  padding: 10px 30px;
  align-items: center;
  gap: 10px;
  color: var(--White, #fff);
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
}
.back {
  display: flex;
  width: 159px;
  padding: 10px 30px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  background: var(--Grey-Light, #eee);
  color: var(--Black, #000);
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
</style>