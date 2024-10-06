<script setup>
import TabMenu from '../../components/Tabs/TabMenuFour.vue';
import BarChart from '../../components/Charts/BarChart.vue'
import SkillMetrics from '../../components/SkillMetrics.vue'
// import Table from '../../components/Tables/TableFive.vue'
import { ref, computed, onMounted } from 'vue'
import {useHODSkillsStore} from "@/store/skills"
import { useSelectedNameStore } from '@/store/skills.js';
// import html2pdf from 'html2pdf.js';

const selectedNameStore = useSelectedNameStore();
const selectedName = computed(() => selectedNameStore.name);

const store = useHODSkillsStore();
console.log(store.hodSkills);

const addHodSkill = () => {
  if (skill.value.trim() !== '' || currentState.value.trim() !== '' || gap.value.trim() !== ''
      || desiredState.value.trim() !== ''
      || initiative.value.trim() !== '' || status.value.trim() !== '' 
      || evidence.value) {
    store.addHodSkill(skill.value.trim(), currentState.value.trim(), gap.value.trim(), desiredState.value.trim(), initiative.value.trim(), status.value.trim(), 
    feedback.value.trim(), evidence.value,);
  
  }
}

// eslint-disable-next-line no-unused-vars
const hodSkills = ref([])
  const skill = ref('')
  const currentState = ref('')
  const gap = ref('')
  const desiredState = ref('')
  const initiative  = ref('')
  const status = ref('')
  const feedback = ref('')
  const evidence = ref(null)
  const selectedValue = ref('')
  const loadingUpload = ref(false);

const handleSubmit = () => {
  addHodSkill();
  console.log("HOD Skill added")
};


onMounted(() => {
  
  store.fetchHodSkills();
});

const onSelectChange = () => {
  // eslint-disable-next-line no-self-assign
  selectedValue.value = selectedValue.value
}

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
              <h4 class="modal-title">Add Skill Form</h4>
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
                <div class="upload">
                  <v-btn :loading="loadingUpload" height="48" rounded="xl" size="small" onclick="document.getElementById('getFile').click()" @click="openFileInput" variant="flat">Upload Evidence</v-btn>
                  <input type='file' id="getFile" style="display:none" @change="submitFile()" accept="application/pdf" ref="evidence">
                </div>
              </div>
            </div>

            <!-- Modal footer -->
            <div class="modal-footer">
              <button type="submit" @click="$router.push('/hod/skillassessment')" data-bs-dismiss="modal">Submit Request</button>
            </div>

          </div>
        </div>
      </div>
    </form>
    <div class="skill mt-4">
      <div class="title">
        <h3>Skill Assessment:<span class="text-success">{{ selectedName }}</span></h3>
        <button data-bs-toggle="modal" data-bs-target="#myModal1" type="button">Add Skill</button>
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
  height: auto;
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
  height: auto;
}
.skill h3 {
  color: var(--Black, #000);
  font-family: "Inter", sans-serif;
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
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.modal {
  margin-left: 32%;
}
.modal-dialog {
  width: 500px;
  height: 900px;
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
  font-family: "Inter", sans-serif;
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
.frame {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}
.frame h6 {
  color: var(--Black, #000);
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.frame textarea {
  display: flex;
  width: 400px;
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
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}
.form-select {
  width: 400px;
  color: var(--Grey-Dark, #808080);
  font-family: "Inter", sans-serif;
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
  padding: 8px 30px;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  color: var(--White, #fff);
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
  border: none;
}
.frame button {
  width: 190px;
  display: flex;
  padding: 5px 40px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  color: #fff;
  margin-top: 10px;
}
@media only screen and (max-width: 768px) {
  .modal {
    margin-left: 18%;
  }
}
</style>
