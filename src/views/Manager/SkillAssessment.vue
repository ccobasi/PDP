<!-- <script setup>
import TabMenu from '../../components/Tabs/TabMenuThree.vue';
import BarChart from '../../components/Charts/BarChart.vue'
import SkillMetrics from '../../components/SkillMetrics.vue'
import { ref } from 'vue'
import {useMSkillsStore} from "@/store/skills"


const store = useMSkillsStore();
console.log(store.mSkills);

const addMSkill = () => {
  if (skill.value.trim() !== '' || currentState.value.trim() !== '' || gap.value.trim() !== ''
      || desiredState.value.trim() !== ''
      || initiative.value.trim() !== '' ) {
    store.addMSkill(skill.value.trim(), currentState.value.trim(), gap.value.trim(), desiredState.value.trim(), initiative.value.trim());
  
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
  addMSkill();
  console.log("Skill added")
};

const onSelectChange = () => {
  // eslint-disable-next-line no-self-assign
  selectedValue.value = selectedValue.value
}

</script>


<template>
  <main class="wrapper">
    <TabMenu />
    <form method="post" action="" @submit.prevent="handleSubmit">
      <div class="modal" id="myModal1">
        <div class="modal-dialog">
          <div class="modal-content">

            <div class="modal-header">
              <h4 class="modal-title">Add Skill Form</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

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

            <div class="modal-footer">
              <button type="submit" @click="$router.push('/m/skillassessment')" data-bs-dismiss="modal">Submit Request</button>
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
</style> -->

<script setup>
import authService from '../../services/authService';
import TabMenu from '../../components/Tabs/TabMenuThree.vue';
import BarChart from '../../components/Charts/BarChart.vue';
import SkillMetrics from '../../components/SkillMetrics.vue';
import { ref, onMounted, watch } from 'vue';
import { useSkillsStore } from "@/store/skills";

const store = useSkillsStore();
console.log('Store initialized:', store.skills);

const skills = ref([]);
const skillDescription = ref('');
const currentStageId = ref('');
const skillGapDetails = ref('');
const desiredStageId = ref('');
const actionPlan = ref('');
const comment = ref('');
const createdBy = ref('');
const lastModifiedBy = ref('');
const recordOwner = ref('');
const selectedValue = ref('')

const fetchData = async () => {
  try {
    await store.fetchSkills();
    skills.value = store.skills;
    console.log('Skills fetched:', skills.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(async () => {
  await fetchData();
  try {
    await authService.initialize();
    const msalInstance = authService.getMsalInstance();
    const accounts = msalInstance.getAllAccounts();
    console.log('MSAL accounts fetched:', accounts);
    if (accounts.length) {
      createdBy.value = accounts[0].username;
      lastModifiedBy.value = accounts[0].username;
      recordOwner.value = accounts[0].username;
      console.log('createdBy:', createdBy.value);
      console.log('lastModifiedBy:', lastModifiedBy.value);
      console.log('recordOwner:', recordOwner.value);
    } else {
      console.log('No accounts found');
    }
  } catch (error) {
    console.error('Error during MSAL initialization:', error);
  }
});

const addSkill = async () => {
  console.log('addSkill function called');

  const fieldsToValidate = {
    skillDescription: skillDescription.value.trim(),
    currentStageId: currentStageId.value.trim(),
    skillGapDetails: skillGapDetails.value.trim(),
    desiredStageId: desiredStageId.value.trim(),
    actionPlan: actionPlan.value.trim(),
    comment: comment.value.trim(),
    createdBy: createdBy.value.trim(),
    lastModifiedBy: lastModifiedBy.value.trim(),
    recordOwner: recordOwner.value.trim(),
  };

  let isValid = true;
  for (const [key, value] of Object.entries(fieldsToValidate)) {
    if (value === '' || value === null || value === undefined) {
      console.log(`Validation failed at: ${key}`);
      isValid = false;
    }
  }

 if (isValid) {
    const parsedDesiredStageId = parseInt(desiredStageId.value, 10);
    const skillData = {
      skillDescription: skillDescription.value.trim(),
      currentStageId: currentStageId.value.trim(),
      skillGapDetails: skillGapDetails.value.trim(),
      desiredStageId: parsedDesiredStageId,
      actionPlan: actionPlan.value.trim(),
      comment: comment.value.trim(),
      createdBy: createdBy.value.trim(),
      lastModifiedBy: lastModifiedBy.value.trim(),
      recordOwner: recordOwner.value.trim(),
    };

    console.log('Preparing to add skill:', skillData);

    await store.addSkill(skillData); 

    console.log('Skill added successfully');

    // await store.addSkill(
    //   skillDescription.value.trim(),
    //   currentStageId.value.trim(),
    //   skillGapDetails.value.trim(),
    //   parsedDesiredStageId,
    //   actionPlan.value.trim(),
    //   comment.value.trim(),
    //   createdBy.value.trim(),
    //   lastModifiedBy.value.trim(),
    //   recordOwner.value.trim()
    // );

    // console.log('Skill added successfully');
    
    skillDescription.value = '';
    currentStageId.value = '';
    skillGapDetails.value = '';
    desiredStageId.value = '';
    actionPlan.value = '';
    comment.value = '';
    createdBy.value = '';
    lastModifiedBy.value = '';
    recordOwner.value = '';
  } else {
    console.log('Validation failed');
  }
};

const handleSubmit = async () => {
  console.log('handleSubmit called');
  await addSkill();
  console.log('Skill submitted');
};

watch(
  () => store.skills,
  (newSkills) => {
    skills.value = newSkills;
    console.log('Skills updated:', newSkills);
  },
  { deep: true }
);

 const onSelectChange = () => {
  // eslint-disable-next-line no-self-assign
  selectedValue.value = selectedValue.value
}
</script>

<template>
  <main class="wrapper">
    <TabMenu />
    <div class="filters d-flex gap-2 mt-2">
      <select class="form-select" @change="handleDateChange">
        <option value="Level">Level</option>
        <option value="1">Manager</option>
        <option value="2">HOD</option>
        <option value="3">IT</option>
        <option value="4">User</option>
        <option value="5">Knowledge Manager</option>
      </select>

      <select class="form-select" @change="handleDateChange">
        <option value="Department">Department</option>
        <option value="1">IT</option>
        <option value="2">Finance</option>
        <option value="3">Accounting</option>
        <option value="4">Operation</option>
        <option value="5">Customer Service</option>
      </select>

      <select class="form-select" @change="handleDateChange">
        <option value="Quarterly">Quarterly</option>
        <option value="1">Q1</option>
        <option value="2">Q2</option>
        <option value="3">Q3</option>
        <option value="4">Q4</option>

      </select>

      <select class="form-select" @change="handleDateChange">
        <option value="Year">Year</option>
        <option value="1">2024</option>
        <option value="2">2025</option>
        <option value="3">2026</option>
        <option value="4">2027</option>

      </select>
    </div>
    <form method="post" action="" @submit.prevent="handleSubmit">
      <div class="modal" id="myModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add Skill Form</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><b></b></button>
            </div>

            <div class="modal-body">
              <div class="one">
                <div class="frame">
                  <h6>Skill</h6>
                  <select v-model="skillDescription" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
                    <option selected>Select Skill</option>
                    <option value="Skill One">Skill One</option>
                    <option value="Skill Two">Skill Two</option>
                    <option value="Skill Three">Skill Three</option>
                  </select>
                </div>
                <div class="frame">
                  <h6>Current state</h6>
                  <select v-model="currentStageId" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
                    <option selected>Proficient</option>
                    <option value="1">Proficient</option>
                    <option value="2">Highly Proficient</option>
                    <option value="3">Expert</option>
                  </select>
                </div>
              </div>
              <div class="one mt-3">
                <div class="frame">
                  <h6>Gap</h6>
                  <textarea v-model="skillGapDetails" name="Gap" id="" cols="30" rows="10" placeholder="Gap"></textarea>
                </div>
                <div class="frame">
                  <h6>Desired state</h6>
                  <select v-model="desiredStageId" class="form-select" aria-label="Default select example">
                    <option selected>Proficient</option>
                    <option value="1">Proficient</option>
                    <option value="2">Highly Proficient</option>
                    <option value="3">Expert</option>
                  </select>
                </div>
              </div>
              <div class="one mt-3">
                <div class="frame">
                  <h6>Action Plan</h6>
                  <textarea v-model="actionPlan" name="Action Plan" id="" cols="30" rows="50" placeholder="Action Plan"></textarea>
                </div>
                <div class="frame">
                  <h6>Comment</h6>
                  <textarea v-model="comment" name="Comment" id="" cols="30" rows="50" placeholder="Comment"></textarea>
                </div>
              </div>

            </div>

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
        <button data-bs-toggle="modal" data-bs-target="#myModal" type="button">Add Skill</button>
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

.filters .form-select {
  width: 100px;
  border-radius: 10px;
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
  font-family: "Roboto", sans-serif;
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
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
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

.modal-dialog {
  --bs-modal-width: 900px;
  width: 900px;
  height: 740px;
  margin-left: 13%;
  display: inline-flex;
  padding: 30px;
  border-radius: 10px;
  background: #eeeeee;
}

.modal-content {
  width: 840px;
  height: 680px;
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
  width: 320px;
  height: 40px;
  color: var(--Grey-Dark, #808080);
  font-family: "Roboto", sans-serif;
  font-size: 16px;
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

.one {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.frame {
  flex: 1;
}

.frame input {
  width: 370px;
}
.frame h6 {
  color: var(--Black, #000);
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.frame textarea {
  display: flex;
  width: 370px;
  height: 150px;
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
  width: 370px;
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
.frame button {
  width: 210px;
  display: flex;
  padding: 10px 40px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  color: #fff;
  margin-top: 30px;
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

  .form-select,
  .frame textarea {
    width: 320px;
  }
}

@media screen and (max-width: 768px) {
  .skill {
    height: 2400px;
  }
  .modal {
    margin: auto;
  }
  .one {
    flex-direction: column;
    gap: 0.5rem;
  }

  .modal-dialog {
    max-width: 90%;
    height: 1040px;
  }

  .modal-content {
    height: 980px;
  }

  .frame textarea,
  .form-select {
    width: 480px;
  }
}

@media screen and (max-width: 576px) {
  .skill h3 {
    font-size: 14px;
  }

  .title button {
    width: 80px;
    padding: 10px;
    font-size: 14px;
  }

  .chart {
    padding: 0;
  }

  .one {
    flex-direction: column;
  }

  .modal-dialog {
    max-width: 100%;
    margin: 0 1rem;
  }

  .modal-header,
  .modal-footer {
    text-align: center;
  }

  h5.modal-title {
    font-size: 1.2rem;
  }

  button {
    width: 100%;
  }

  .filters .form-select {
    display: none;
  }
}

@media screen and (max-width: 400px) {
  .modal-header,
  .modal-footer {
    text-align: center;
  }

  h5.modal-title {
    font-size: 1rem;
  }

  button {
    width: 100%;
  }

  .filters .form-select {
    display: none;
  }

  .frame textarea,
  .form-select {
    width: 100%;
  }
}
</style>