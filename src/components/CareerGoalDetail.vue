<!-- eslint-disable vue/no-textarea-mustache -->
<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useGoalsStore } from "@/store/goals";
import { ref } from 'vue';

const route = useRoute()
const router = useRouter();
const store = useGoalsStore();
var items = store.goals

const detailsId = parseInt(route.params.id);
const detail = items.find(item => item.id === detailsId);

const editedGoal = ref(detail.goal);
const editedAchieve = ref(detail.achieve);
const editedResource = ref(detail.resource);
const editedSuccess = ref(detail.success);
const editedPotential = ref(detail.potential);
const editedSolution = ref(detail.solution);
const editedProgress = ref(detail.progress);
const editedFeedback = ref(detail.feedback);
const editedStatus = ref(detail.status);

const saveChanges = () => {
  detail.goal = editedGoal.value;
  detail.achieve = editedAchieve.value;
  detail.resource = editedResource.value;
  detail.success = editedSuccess.value;
  detail.potential = editedPotential.value;
  detail.solution = editedSolution.value;
  detail.status = editedStatus.value;
  detail.progress = editedProgress.value;
  detail.feedback = editedFeedback.value;

  store.saveGoals();

  router.push('/');
}

</script>

<template>
  <div class="details">
    <div class="skill">
      <h3>Learn to improve content writing skill</h3>
      <div class="line"></div>
      <div class="learn">
        <div class="frame">
          <div class="one">
            <div class="title">
              <caption>Goal</caption>

            </div>

            <textarea v-model="editedGoal" name="goal" id="" placeholder="Type here" cols="30" rows="10">{{detail.goal}}</textarea>
          </div>
          <div class="one">
            <div class="title">
              <caption>What I will do to achieve this</caption>

            </div>
            <textarea v-model="editedAchieve" name="What I will do to achieve this" id="" placeholder="Type here" cols="30" rows="10">{{detail.achieve}}</textarea>
          </div>
        </div>
        <div class="frame">
          <div class="one">
            <div class="title">
              <caption>Resources and Support Needed</caption>

            </div>
            <textarea v-model="editedResource" name="Resources and Support Needed" id="" placeholder="Type here" cols="30" rows="10">{{detail.resource}}</textarea>
          </div>
          <div class="one">
            <div class="title">
              <caption>What does success look like?</caption>

            </div>
            <textarea v-model="editedSuccess" name="What does success look like?" id="" placeholder="Type here" cols="30" rows="10">{{detail.success}}</textarea>
          </div>
        </div>
        <div class="frame">
          <div class="one">
            <div class="title">
              <caption>Potential Challenges</caption>

            </div>
            <textarea v-model="editedPotential" name="Potential Challenges" id="" placeholder="Type here" cols="30" rows="10">{{detail.potential}}</textarea>
          </div>
          <div class="one">
            <div class="title">
              <caption>Solution</caption>

            </div>
            <textarea v-model="editedSolution" name="Solution" id="" placeholder="Type here" cols="30" rows="10">{{detail.solution}}</textarea>
          </div>
        </div>
        <div class="frame">
          <div class="one">
            <div class="title">
              <caption>Target Date for Completion</caption>

            </div>
            <input type="date">
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
          <div class="one">
            <div class="title">
              <caption>Progress Metrics (Outcome Based)</caption>

            </div>
            <textarea v-model="editedProgress" name="Progress" id="" placeholder="Type here" cols="30" rows="10">{{detail.progress}}</textarea>
          </div>
          <div class="one">
            <div class="title">
              <caption>Evidence</caption>

            </div>
            <input type="file">
          </div>
        </div>
        <div class="frame">
          <div class="one">
            <div class="title">
              <caption>Feedback</caption>

            </div>
            <textarea v-model="editedFeedback" name="Feedback" id="" placeholder="Type here" cols="30" rows="10">{{detail.feedback}}</textarea>
          </div>

        </div>
        <div class="save">
          <button class="back" @click="$router.push('/')">Back</button>
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
  height: 1400px;
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