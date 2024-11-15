<script setup>
import authService from '../../services/authService';
import TabMenu from '../../components/Tabs/TabMenuThree.vue';
import BarChart from '../../components/Charts/BarChart.vue';
// import SkillMetrics from '../../components/SkillMetrics.vue';
import { ref, onMounted, watch, computed } from 'vue';
import { useSkillsStore } from "@/store/skills";
// import emailjs from 'emailjs-com';
import KMTableTwo from '../../components/Tables/KMTableTwo.vue'
import { useUsersStore } from '@/store/users';


const store = useSkillsStore();
console.log('Store initialized:', store.skills);
const usersStore = useUsersStore();
const skills = ref([]);
const skillDescription = ref('');
const currentStageId = ref('');
const skillGapDetails = ref('');
const desiredStageId = ref('');
const actionPlan = ref('');
const comment = ref('');
const createdBy = ref(null)
const recordOwner = ref(null)
const selectedValue = ref('')
const selectedDate = ref(new Date());  

const selectedQuarter = ref('');
const selectedYear = ref('');
const selectedLevel = ref('');
const selectedDepartment = ref('');


watch([selectedLevel, selectedDepartment, selectedQuarter, selectedYear], handleFilterChange);

function handleFilterChange() {
  console.log('Filter parameters changed:', {
    level: selectedLevel.value,
    department: selectedDepartment.value,
    quarter: selectedQuarter.value,
    year: selectedYear.value,
  });
  
}

const getQuarter = (date) => {
  const month = date.getMonth() + 1;
  return Math.ceil(month / 3);  
};

watch(selectedDate, (newDate) => {
  selectedYear.value = newDate.getFullYear();
  selectedQuarter.value = getQuarter(newDate);
});

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
  await usersStore.fetchUsers();
  await fetchData();
  try {
    await authService.initialize();
    const msalInstance = authService.getMsalInstance();
    const accounts = msalInstance.getAllAccounts();

    if (accounts.length) {
      createdBy.value = accounts[0].username;
    } else {
       console.warn("No accounts found; using default user.");
      createdBy.value = defaultUser.id;
    }
  } catch (error) {
    console.error("Error during MSAL initialization:", error);
    createdBy.value = defaultUser.id;
  }
});

  const defaultUser = {
    id: 4, 
    username: 'James Bond',
  };

const addSkill = async () => {
  console.log('addSkill function called');

  const fieldsToValidate = {
    skillDescription: skillDescription.value.trim(),
    currentStageId: currentStageId.value.trim(),
    skillGapDetails: skillGapDetails.value.trim(),
    desiredStageId: desiredStageId.value.trim(),
    actionPlan: actionPlan.value.trim(),
    comment: comment.value.trim(),
    createdBy: createdBy.value || defaultUser.id,
    recordOwner: recordOwner.value,
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
      createdBy: createdBy.value || defaultUser.id,
      recordOwner: recordOwner.value,
    };

    console.log('Preparing to add skill:', skillData);

    try {

      await store.addSkill(skillData);
      console.log('Skill added successfully');

      // sendNotificationEmail(skillData);
    } catch (error) {
      console.error('Failed to add skill:', error);
    }
  } else {
    console.log('Skill submission failed due to validation errors.');
  }
};


// function sendNotificationEmail(skillData) {
//   const emailParams = {
//     to_name: skillData.createdBy,
//     skill_description: skillData.skillDescription,
//     current_stage: skillData.currentStageId,
//     desired_stage: skillData.desiredStageId,
//     action_plan: skillData.actionPlan,
//   };

//   emailjs.send('service_m2mjawc', 'template_1d0qqkb', emailParams, 'WxvKMfIDsiWn1QUgM')
//     .then((response) => {
//       console.log('Email sent successfully:', response);
//     })
//     .catch((error) => {
//       console.error('Error sending email:', error);
//     });
// }

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

const usersOptions = computed(() =>
  usersStore.users.map(user => ({
    label: user.userFullName,
    value: user.userId
  }))
);

const userNamesMap = computed(() =>
  usersStore.users.reduce((map, user) => {
    map[user.id] = user.name;
    return map;
  }, {})
);

</script>

<template>
  <main class="wrapper">
    <TabMenu />
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
              <div class="one mt-3">
                <div class="frame">
                  <h6>Record Owner</h6>
                  <select v-model="recordOwner" class="form-select">
                    <option value="" disabled>Select Record Owner</option>
                    <option v-for="user in usersOptions" :key="user.value" :value="user.value">
                      {{ user.label }}
                    </option>
                  </select>
                </div>
                <div class="frame">
                  <h6>Created By</h6>
                  <input type="text" id="createdBy" class="form-control" :value="userNamesMap[createdBy] || defaultUser.id" disabled />
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <button type="submit" @click="$router.push('/km/skillassessment')" data-bs-dismiss="modal">Submit Request</button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="filters d-flex mt-2">
      <select class="form-select" v-model="selectedLevel" @change="handleDateChange">
        <option value="Level">Level</option>
        <option value="Manager">Manager</option>
        <option value="HOD">HOD</option>
        <option value="IT">IT</option>
        <option value="User">User</option>
        <option value="Knowledge Manager">Knowledge Manager</option>
      </select>

      <select class="form-select" v-model="selectedDepartment" @change="handleDateChange">
        <option value="Department">Department</option>
        <option value="IT">IT</option>
        <option value="Finance">Finance</option>
        <option value="Accounting">Accounting</option>
        <option value="Operation">Operation</option>
        <option value="Customer Service">Customer Service</option>
      </select>

      <select class="form-select" v-model="selectedQuarter" @change="handleDateChange">
        <option value="Quarterly">Quarterly</option>
        <option value="Q1">Q1</option>
        <option value="Q2">Q2</option>
        <option value="Q3">Q3</option>
        <option value="4">Q4</option>

      </select>

      <select class="form-select" v-model="selectedYear" @change="handleDateChange">
        <option value="Year">Year</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
        <option value="2026">2026</option>
        <option value="2027">2027</option>

      </select>
    </div>
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
        <!-- <SkillMetrics /> -->
        <KMTableTwo :level="selectedLevel" :department="selectedDepartment" :quarter="selectedQuarter" :year="selectedYear" />
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
  font-size: 10px;
  color: #000;
  gap: 20px;
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
  height: 780px;
  margin-left: 13%;
  display: inline-flex;
  padding: 30px;
  border-radius: 10px;
  background: #eeeeee;
}

.modal-content {
  width: 840px;
  height: 720px;
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
  .frame input,
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
}

@media (max-width: 400px) {
  .filters .form-select {
    width: 70px;
    font-size: 8px;
    gap: 5px;
  }
}
</style>