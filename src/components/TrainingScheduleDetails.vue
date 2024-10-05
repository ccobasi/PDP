<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useTrainingsStore } from "@/store/trainings";
import { ref } from 'vue';

const route = useRoute()
const router = useRouter();
const store = useTrainingsStore();
var items = store.trainings

const detailsId = parseInt(route.params.id);
const detail = items.find(item => item.id === detailsId);


const editedMonth = ref(detail.month);
const editedTrainingTopic = ref(detail.trainingTopic)
const editedLearningOutcome = ref(detail.learningOutcome);
const editedTrainingMethod = ref(detail.trainingMethod);
const editedTrainingInitiator = ref(detail.trainingInitiator);
const editedSkillMatrixMapping = ref(detail.skillMatrixMapping);
const editedDueDate = ref(detail.dueDate);
const editedStatus = ref(detail.status);
const editedSelectedRating = ref(detail.selectedRating);

const saveChanges = () => {
  detail.month = editedMonth.value;
  detail.trainingTopic = editedTrainingTopic.value;
  detail.learningOutcome = editedLearningOutcome.value;
  detail.trainingMethod = editedTrainingMethod.value;
  detail.trainingInitiator = editedTrainingInitiator.value;
  detail.skillMatrixMapping = editedSkillMatrixMapping.value;
  detail.dueDate = editedDueDate.value;
  detail.status = editedStatus.value;
  detail.editedSelectedRating = editedSelectedRating.value;

  store.saveTrainings();

  router.push('/trainingschedule');
}

</script>
<template>
  <div class="details">
    <div class="skill">
      <h3>{{detail.trainingTopic}}</h3>
      <div class="line"></div>
      <div class="learn">
        <div class="frame">
          <div class="one">
            <div class="title">
              <caption>Month</caption>

            </div>
            <input v-model="editedMonth" type="date">
          </div>
          <div class="one">
            <div class="title">
              <caption>Training Topic</caption>

            </div>
            <textarea v-model="editedTrainingTopic" name="What I will do to achieve this" id="" placeholder="Type here" cols="30" rows="10">{{detail.trainingTopic}}</textarea>
          </div>
        </div>
        <div class="frame">
          <div class="one">
            <div class="title">
              <caption>Learning Outcome</caption>

            </div>
            <textarea v-model="editedLearningOutcome" name="Learning Outcome" id="" placeholder="Type here" cols="30" rows="10">{{detail.learningOutcome}}</textarea>
          </div>
          <div class="one">
            <div class="title">
              <caption>Training Method</caption>

            </div>
            <textarea v-model="editedTrainingMethod" name="Training Method" id="" placeholder="Type here" cols="30" rows="10">{{detail.trainingMethod}}</textarea>
          </div>
        </div>
        <div class="frame">
          <div class="one">
            <div class="title">
              <caption>Training Initiator</caption>

            </div>
            <select v-model="editedTrainingInitiator" class="form-select" aria-label="Default select example">
              <option selected>{{detail.trainingInitiator}}</option>
              <option value="Manager">Manager</option>
              <option value="Self">Self</option>
              <option value="HOD">HOD</option>
            </select>
          </div>
          <div class="one">
            <div class="title">
              <caption>Skill Metrix Mapping</caption>

            </div>
            <textarea v-model="editedSkillMatrixMapping" name="Skill Metrix Mapping" id="" placeholder="Type here" cols="30" rows="10">{{detail.skillMatrixMapping}}</textarea>
          </div>
        </div>
        <div class="frame">
          <div class="one">
            <div class="title">
              <caption>Due Date</caption>

            </div>
            <input v-model="editedDueDate" type="date">
          </div>
          <div class="one">
            <div class="title">
              <caption>Status</caption>

            </div>
            <select v-model="editedStatus" class="form-select" aria-label="Default select example">
              <option selected>{{detail.status}}</option>
              <option value="Not started">Not started</option>
              <option value="On-going">
                On-going
              </option>

              <option value="Completed">Completed</option>

            </select>
          </div>
        </div>
        <div class="frame">
          <div class="one" style="width:550px">
            <div class="title">
              <caption>Rate</caption>

            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="87" height="14" viewBox="0 0 87 14" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.02745 1.1353C6.0735 0.989269 6.16491 0.861723 6.28839 0.771186C6.41187 0.680649 6.561 0.631836 6.71412 0.631836C6.86724 0.631836 7.01637 0.680649 7.13985 0.771186C7.26333 0.861723 7.35474 0.989269 7.40079 1.1353L8.64079 4.94863H12.6408C12.7994 4.94263 12.9556 4.98872 13.0855 5.07986C13.2154 5.17099 13.312 5.30215 13.3603 5.45331C13.4087 5.60446 13.4063 5.7673 13.3534 5.91693C13.3005 6.06657 13.2001 6.19477 13.0675 6.28196L9.82079 8.6353L11.0608 12.4553C11.1098 12.6008 11.1111 12.7582 11.0643 12.9044C11.0176 13.0507 10.9253 13.1782 10.8009 13.2683C10.6766 13.3584 10.5267 13.4064 10.3732 13.4052C10.2196 13.4041 10.0704 13.3539 9.94745 13.262L6.69412 10.882L3.44745 13.242C3.32446 13.3339 3.1753 13.3841 3.02175 13.3852C2.8682 13.3864 2.71831 13.3384 2.59397 13.2483C2.46963 13.1582 2.37734 13.0307 2.33059 12.8844C2.28384 12.7382 2.28508 12.5808 2.33412 12.4353L3.57412 8.6153L0.327455 6.26196C0.194843 6.17477 0.0944225 6.04657 0.0415351 5.89693C-0.0113524 5.7473 -0.013798 5.58446 0.0345718 5.43331C0.0829416 5.28215 0.179467 5.15099 0.3094 5.05985C0.439333 4.96872 0.595528 4.92263 0.754121 4.92863H4.75412L6.02745 1.1353Z" fill="#FDBC15" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M24.4225 1.1353C24.4685 0.989269 24.5599 0.861723 24.6834 0.771186C24.8069 0.680649 24.956 0.631836 25.1091 0.631836C25.2623 0.631836 25.4114 0.680649 25.5349 0.771186C25.6584 0.861723 25.7498 0.989269 25.7958 1.1353L27.0358 4.94863H31.0358C31.1944 4.94263 31.3506 4.98872 31.4805 5.07986C31.6105 5.17099 31.707 5.30215 31.7554 5.45331C31.8037 5.60446 31.8013 5.7673 31.7484 5.91693C31.6955 6.06657 31.5951 6.19477 31.4625 6.28196L28.2158 8.6353L29.4558 12.4553C29.5048 12.6008 29.5061 12.7582 29.4593 12.9044C29.4126 13.0507 29.3203 13.1782 29.196 13.2683C29.0716 13.3584 28.9217 13.4064 28.7682 13.4052C28.6146 13.4041 28.4655 13.3539 28.3425 13.262L25.0891 10.882L21.8425 13.242C21.7195 13.3339 21.5703 13.3841 21.4168 13.3852C21.2632 13.3864 21.1133 13.3384 20.989 13.2483C20.8646 13.1582 20.7724 13.0307 20.7256 12.8844C20.6789 12.7382 20.6801 12.5808 20.7291 12.4353L21.9691 8.6153L18.7225 6.26196C18.5899 6.17477 18.4894 6.04657 18.4366 5.89693C18.3837 5.7473 18.3812 5.58446 18.4296 5.43331C18.478 5.28215 18.5745 5.15099 18.7044 5.05985C18.8344 4.96872 18.9905 4.92263 19.1491 4.92863H23.1491L24.4225 1.1353Z" fill="#FDBC15" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M42.8175 1.1353C42.8635 0.989269 42.9549 0.861723 43.0784 0.771186C43.2019 0.680649 43.351 0.631836 43.5042 0.631836C43.6573 0.631836 43.8064 0.680649 43.9299 0.771186C44.0534 0.861723 44.1448 0.989269 44.1908 1.1353L45.4308 4.94863H49.4308C49.5894 4.94263 49.7456 4.98872 49.8755 5.07986C50.0055 5.17099 50.102 5.30215 50.1504 5.45331C50.1987 5.60446 50.1963 5.7673 50.1434 5.91693C50.0905 6.06657 49.9901 6.19477 49.8575 6.28196L46.6108 8.6353L47.8508 12.4553C47.8999 12.6008 47.9011 12.7582 47.8544 12.9044C47.8076 13.0507 47.7153 13.1782 47.591 13.2683C47.4666 13.3584 47.3167 13.4064 47.1632 13.4052C47.0097 13.4041 46.8605 13.3539 46.7375 13.262L43.4842 10.882L40.2375 13.242C40.1145 13.3339 39.9653 13.3841 39.8118 13.3852C39.6582 13.3864 39.5084 13.3384 39.384 13.2483C39.2597 13.1582 39.1674 13.0307 39.1206 12.8844C39.0739 12.7382 39.0751 12.5808 39.1242 12.4353L40.3642 8.6153L37.1175 6.26196C36.9849 6.17477 36.8845 6.04657 36.8316 5.89693C36.7787 5.7473 36.7762 5.58446 36.8246 5.43331C36.873 5.28215 36.9695 5.15099 37.0994 5.05985C37.2294 4.96872 37.3856 4.92263 37.5442 4.92863H41.5442L42.8175 1.1353Z" fill="#FDBC15" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M61.212 1.1353C61.2581 0.989269 61.3495 0.861723 61.473 0.771186C61.5964 0.680649 61.7456 0.631836 61.8987 0.631836C62.0518 0.631836 62.2009 0.680649 62.3244 0.771186C62.4479 0.861723 62.5393 0.989269 62.5854 1.1353L63.8254 4.94863H67.8254C67.984 4.94263 68.1401 4.98872 68.2701 5.07986C68.4 5.17099 68.4965 5.30215 68.5449 5.45331C68.5933 5.60446 68.5908 5.7673 68.5379 5.91693C68.4851 6.06657 68.3846 6.19477 68.252 6.28196L65.0054 8.6353L66.2454 12.4553C66.2944 12.6008 66.2956 12.7582 66.2489 12.9044C66.2021 13.0507 66.1099 13.1782 65.9855 13.2683C65.8612 13.3584 65.7113 13.4064 65.5577 13.4052C65.4042 13.4041 65.255 13.3539 65.132 13.262L61.8787 10.882L58.632 13.242C58.509 13.3339 58.3599 13.3841 58.2063 13.3852C58.0528 13.3864 57.9029 13.3384 57.7785 13.2483C57.6542 13.1582 57.5619 13.0307 57.5152 12.8844C57.4684 12.7382 57.4697 12.5808 57.5187 12.4353L58.7587 8.6153L55.512 6.26196C55.3794 6.17477 55.279 6.04657 55.2261 5.89693C55.1732 5.7473 55.1708 5.58446 55.2191 5.43331C55.2675 5.28215 55.364 5.15099 55.494 5.05985C55.6239 4.96872 55.7801 4.92263 55.9387 4.92863H59.9387L61.212 1.1353Z" fill="#FDBC15" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M79.607 1.1353C79.6531 0.989269 79.7445 0.861723 79.868 0.771186C79.9915 0.680649 80.1406 0.631836 80.2937 0.631836C80.4468 0.631836 80.596 0.680649 80.7194 0.771186C80.8429 0.861723 80.9343 0.989269 80.9804 1.1353L82.2204 4.94863H86.2204C86.379 4.94263 86.5352 4.98872 86.6651 5.07986C86.795 5.17099 86.8916 5.30215 86.9399 5.45331C86.9883 5.60446 86.9859 5.7673 86.933 5.91693C86.8801 6.06657 86.7797 6.19477 86.647 6.28196L83.4004 8.6353L84.6404 12.4553C84.6894 12.6008 84.6907 12.7582 84.6439 12.9044C84.5972 13.0507 84.5049 13.1782 84.3805 13.2683C84.2562 13.3584 84.1063 13.4064 83.9527 13.4052C83.7992 13.4041 83.65 13.3539 83.527 13.262L80.2737 10.882L77.027 13.242C76.904 13.3339 76.7549 13.3841 76.6013 13.3852C76.4478 13.3864 76.2979 13.3384 76.1736 13.2483C76.0492 13.1582 75.9569 13.0307 75.9102 12.8844C75.8634 12.7382 75.8647 12.5808 75.9137 12.4353L77.1537 8.6153L73.907 6.26196C73.7744 6.17477 73.674 6.04657 73.6211 5.89693C73.5682 5.7473 73.5658 5.58446 73.6142 5.43331C73.6625 5.28215 73.7591 5.15099 73.889 5.05985C74.0189 4.96872 74.1751 4.92263 74.3337 4.92863H78.3337L79.607 1.1353Z" fill="#FDBC15" />
            </svg>
          </div>
          <div class="one">
            <div class="title">
              <caption>Evidence</caption>

            </div>
            <input type="file">
          </div>
        </div>

        <div class="save">
          <button class="back" @click="$router.push('/trainingschedule')">Back</button>
          <button class="bsave" @click="saveChanges">Save Changes</button>
        </div>
      </div>
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
.skill {
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