<script setup>
import TabMenu from '../../components/Tabs/TabMenuTwo.vue';
import BarChart from '../../components/Charts/BarChart.vue'
import SkillMetrics from '../../components/SkillMetrics.vue'
import { ref, /*onMounted*/} from 'vue'
import {useSkillsStore} from "@/store/skills"
import {useKMSkillsStore} from "@/store/skills"


const store = useSkillsStore();
console.log(store.skills);
const stores = useKMSkillsStore();
console.log(stores.skills);

const addSkill = () => {
  if (skill.value.trim() !== '' || currentState.value.trim() !== '' || gap.value.trim() !== ''
      || desiredState.value.trim() !== ''
      || initiative.value.trim() !== '' ) {
    store.addSkill(skill.value.trim(), currentState.value.trim(), gap.value.trim(), desiredState.value.trim(), initiative.value.trim());
  
  }
}

const addKmSkill = () => {
  if (skill.value.trim() !== '' || currentState.value.trim() !== '' || gap.value.trim() !== ''
      || desiredState.value.trim() !== ''
      || initiative.value.trim() !== '' ) {
    stores.addKmSkill(skill.value.trim(), currentState.value.trim(), gap.value.trim(), desiredState.value.trim(), initiative.value.trim());
  
  }
}

// eslint-disable-next-line no-unused-vars
const skills = ref([])
  const skill = ref('')
  const currentState = ref('')
  const gap = ref('')
  const desiredState = ref('')
  const initiative  = ref('')
  const selectedValue = ref('')

const handleSubmit = () => {
  addSkill();
  addKmSkill();
  console.log("Skill added")
  console.log("KM Skill added")
};


// onMounted(() => {
  
//   store.fetchSkills();
// });

const onSelectChange = () => {
  // eslint-disable-next-line no-self-assign
  selectedValue.value = selectedValue.value
}

// const tab = ref(null);
</script>


<template>
  <main class="wrapper">
    <TabMenu />
    <form method="post" action="" @submit.prevent="handleSubmit">
      <div class="modal" id="myModal1">
        <div class="modal-dialog">
          <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header">
              <h4 class="modal-title">Skill Request Form</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">

              <div class="frame">
                <h6>Skill</h6>
                <textarea v-model="skill" name="skill" id="" cols="30" rows="10" placeholder="Skill"></textarea>
              </div>
              <div class="frame">
                <h6>Current state</h6>
                <select v-model="currentState" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
                  <option selected>Beginner</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Proficient">Proficient</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
              <div class="frame">
                <h6>Gap</h6>
                <textarea v-model="gap" name="Gap" id="" cols="30" rows="10" placeholder="Gap"></textarea>
              </div>
              <div class="frame">
                <h6>Desired state</h6>
                <select v-model="desiredState" class="form-select" aria-label="Default select example">
                  <option selected>Expert</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Proficient">Proficient</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
              <div class="frame">
                <h6>Initiatives</h6>
                <textarea v-model="initiative" name="Initiatives" id="" cols="30" rows="10" placeholder="Initiatives"></textarea>
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
              <div class="frame">
                <h6>Feedback</h6>
                <textarea name="Feedback" placeholder="Feedback" id="" cols="30" rows="10" v-model="feedback"></textarea>
              </div>
              <div class="frame">
                <h6>Evidence</h6>
                <input type="file" @change="handleFileChange">
                <button>Save Changes</button>
              </div>
            </div>

            <!-- Modal footer -->
            <div class="modal-footer">
              <button type="submit" @click="$router.push('/skillassessment')" data-bs-dismiss="modal">Submit Request</button>
            </div>

          </div>
        </div>
      </div>
    </form>
    <div class="skill mt-4">
      <div class="title">
        <h3>Skill Assessment</h3>
        <button data-bs-toggle="modal" data-bs-target="#myModal1" type="button">Request Skill</button>
      </div>
      <div class="lines"></div>
      <div class="chart">
        <BarChart />
      </div>
      <div class="table">
        <SkillMetrics />
      </div>

    </div>
  </main>
</template>

<style scoped>
main {
  height: 1450px;
}
.dynamic {
  justify-content: space-between;
  gap: 35px;
}
.member,
.plan {
  width: 300px;
}
.custom-tabs {
  border-radius: 50px;
}
.skill {
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  align-self: stretch;

  border-radius: 10px;
  background: #fff;
  height: 1276px;
}
.skill h3 {
  color: var(--Black, #000);
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 28.8px;
}
.lines {
  width: 100%;
  height: 1px;
  background: #808080;
}
.chart {
  display: flex;
  padding: 30px;
  align-items: center;
  gap: 40px;
  align-self: stretch;
  border-radius: 7.622px;
  background: #fff;
  box-shadow: 1.52441px 1.52441px 15.24414px 0px rgba(0, 0, 0, 0.1);
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
.modal {
  margin-left: 32%;
}
.modal-dialog {
  width: 650px;
  height: 860px;
  display: inline-flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  background: var(--Grey-Light, #eee);
  max-height: 100vh;
  overflow-y: auto;
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
.modal-content {
  border-radius: 10px;
  background: #eee;
  border: none;
  overflow-y: auto;
}

.team,
.approval {
  color: var(--Black, #000);
  font-family: Roboto;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.modal-body {
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 10px;
  background: #fff;
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
.frame textarea {
  display: flex;
  width: 350px;
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
  width: 350px;
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
