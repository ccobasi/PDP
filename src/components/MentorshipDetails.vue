<script setup>
import {useMentorshipStore} from "@/store/mentorship"
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';


const router = useRouter();
const route = useRoute()
const store = useMentorshipStore();
var items = store.mentorship


const detailsId = parseInt(route.params.id);
const detail = items.find(item => item.id === detailsId);
console.log(detail);

// // Initialize local data variables
const editedFinancialYear = ref(detail.financialYear);
const editedMonth = ref(detail.month);
const editedMentor = ref(detail.mentor);
const editedGoals = ref(detail.goals);
const editedActionPlan = ref(detail.actionPlan);
const editedTimeLine = ref(detail.timeLine);
const editedStatus = ref(detail.status);


const saveChanges = () => {
  detail.financialYear = editedFinancialYear.value;
  detail.month = editedMonth.value;
  detail.mentor = editedMentor.value;
  detail.goals = editedGoals.value;
  detail.actionPlan = editedActionPlan.value;
  detail.timeLine = editedTimeLine.value;
  detail.status = editedStatus.value;

  store.saveMentorship();

  router.push('/mentorshipplan');
}


</script>

<template>
  <div class="details">
    <div class="skills">

      <h3>Mentorship</h3>
      <div class="line"></div>
      <div class="learn">
        <div class="frame">
          <div class="one">
            <div class="title">
              <caption>Financial Year</caption>

            </div>
            <select v-model="editedFinancialYear" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
              <option class="opt" selected>{{detail.financialYear}}</option>
              <option class="opt" value="FY23">FY23</option>
              <option class="opt" value="FY24">FY24</option>
              <option class="opt" value="FY25">FY25</option>
            </select>
          </div>
          <div class="one">
            <div class="title">
              <caption>Month</caption>

            </div>
            <input v-model="editedMonth" id="bday-month" type="month" name="bday-month" min="2023-01" max="2026-12" />{{detail.month}}

          </div>
        </div>
        <div class="frame">
          <div class="one">
            <div class="title">
              <caption>Mentor</caption>

            </div>
            <select v-model="editedMentor" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
              <option selected>{{detail.mentor}}</option>
              <option value="Isaac">Isaac</option>
              <option value="Chido">Chido</option>
              <option value="Lola">Lola</option>
            </select>
          </div>
          <div class="one">
            <div class="title">
              <caption>Goals</caption>

            </div>
            <textarea v-model="editedGoals" name="Goals" id="" cols="30" rows="10" :readonly="true">{{detail.goals}}</textarea>
          </div>
        </div>
        <div class="frame">
          <div class="one">
            <div class="title">
              <caption>Action Plan</caption>

            </div>
            <textarea v-model="editedActionPlan" name="Action Plan" id="" cols="30" rows="10" :readonly="true">{{detail.actionPlan}}</textarea>
          </div>
          <div class="one">
            <div class="title">
              <caption>Timeline</caption>

            </div>
            <input v-model="editedTimeLine" type="date">
          </div>
        </div>
        <div class="frame">
          <div class="one">
            <div class="title">
              <caption>Status</caption>

            </div>
            <select v-model="editedStatus" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
              <option selected>{{detail.status}}</option>
              <option value="Not started">Not started</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

        </div>
        <div class="save">
          <button class="back" @click="$router.push('/mentorshipplan')">Back</button>
          <button type="submit" class="bsave" @click="saveChanges">Save Changes</button>
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