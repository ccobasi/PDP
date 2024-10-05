<script setup>
import TabMenuTwo from '../../components/Tabs/TabMenuTwo.vue';
import BarChart from '../../components/Charts/BarChart.vue'
import SkillMetrics from '../../components/SkillMetrics.vue'
import { ref, onMounted, computed } from 'vue'
import {useSkillsStore} from "@/store/skills"
import { useSelectedNameStore } from '@/store/skills.js';

const selectedNameStore = useSelectedNameStore();
const selectedName = computed(() => selectedNameStore.name);

const store = useSkillsStore();
console.log(store.skills);

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

    console.log('Preparing to add skill:', {
      skillDescription: skillDescription.value.trim(),
      currentStageId: currentStageId.value.trim(),
      skillGapDetails: skillGapDetails.value.trim(),
      desiredStageId: parsedDesiredStageId,
      actionPlan: actionPlan.value.trim(),
      comment: comment.value.trim(),
      createdBy: createdBy.value.trim(),
      lastModifiedBy: lastModifiedBy.value.trim(),
      recordOwner: recordOwner.value.trim(),
    });

    await store.addSkill(
      skillDescription.value.trim(),
      currentStageId.value.trim(),
      skillGapDetails.value.trim(),
      parsedDesiredStageId,
      actionPlan.value.trim(),
      comment.value.trim(),
      createdBy.value.trim(),
      lastModifiedBy.value.trim(),
      recordOwner.value.trim()
    );

    console.log('Skill added successfully');
    
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

// eslint-disable-next-line no-unused-vars
const kmSkills = ref([])
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
  const loadingUpload = ref(false);

const handleSubmit = () => {
  addSkill();
  console.log("KM Skill added")
};


onMounted(() => {
  
  store.fetchSkills();
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
    <TabMenuTwo />
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
  font-family: 'Inter', sans-serif;
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
  font-family: 'Inter', sans-serif;
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
  font-family: 'Inter', sans-serif;
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
  font-family: 'Inter', sans-serif;
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
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}
.form-select {
  width: 400px;
  color: var(--Grey-Dark, #808080);
  font-family: 'Inter', sans-serif;
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
  font-family: 'Inter', sans-serif;
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
  main {
    width: 100%;
    height: stretch;
    overflow-x: hidden;
  }

  .table {
    width: 100%;
    background: bisque;
  }
}
</style>
