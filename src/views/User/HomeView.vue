<script setup>
import TabMenu from '../../components/Tabs/TabMenu.vue';
import DoughNut from '../../components/DoughNut.vue'
import CareerGoal from '../../components/CareerGoal.vue'
import { ref, onMounted} from 'vue'
import {useGoalsStore} from "@/store/goals"


const store = useGoalsStore();
console.log(store.goals);

const addGoal = () => {
  if (plan.value.trim() !== '' || goal.value.trim() !== '' || achieve.value.trim() !== ''
      || resource.value.trim() !== ''
      || success.value.trim() !== '' || date.value.trim() !== '') {
    store.addGoal(plan.value.trim(), goal.value.trim(), achieve.value.trim(),
      achieve.value.trim(), resource.value.trim(), success.value.trim(), date.value.trim());
  
  }
};


// eslint-disable-next-line no-unused-vars
const goals = ref([])
  const plan = ref('')
  const goal = ref('')
  const achieve = ref('')
  const resource = ref('')
  const success  = ref('')
  const potential = ref('')
  const solution = ref('')
  const date = ref('')
  const progress = ref('')
  const status = ref('')
  const feedback = ref('')
  // const evidence = ref('')
  const selectedValue = ref('')
 

const handleSubmit = () => {
  addGoal();
  console.log("Goal added")
};


onMounted(() => {
  
  store.fetchGoals();
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
      <div class="modal" id="myModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Development Plan Request Form</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">

              <div class="type">
                <h3>Development plan type</h3>
                <select class="form-select" aria-label="Default select example" v-on:change="onSelectChange(e)" v-model="plan">
                  <option class="opt" selected>Career Goals and Aspirations</option>
                  <option class="opt" value="Area of Interest">Area of Interest</option>
                  <option class="opt" value="Care Goals and Aspirations">Care Goals and Aspirations</option>
                  <option class="opt" value="Mentorship and Skill Building<">Mentorship and Skill Building</option>
                </select>
              </div>
              <div class="goal">
                <div class="left">
                  <h4>Goal</h4>
                  <textarea name="Goal" placeholder="Goal" id="" cols="30" rows="10" v-model="goal"></textarea>
                </div>
                <div class="right">
                  <h4 class="">What I will do to achieve this</h4>
                  <textarea name="Goal" placeholder="What I will do to achieve this" id="" cols="30" rows="10" v-model="achieve"></textarea>
                </div>
              </div>
              <div class="goal">
                <div class="left">
                  <h4>Resources and Support Needed</h4>
                  <textarea name="Resources and Support Needed" placeholder="Resources and Support Needed" id="" cols="30" rows="10" v-model="resource"></textarea>
                </div>
                <div class="right">
                  <h4 class="">What does success look like?</h4>
                  <textarea name="Goal" placeholder="What does success look like?" id="" cols="30" rows="10" v-model="success"></textarea>
                </div>
              </div>
              <div class="goal">
                <div class="left">
                  <h4>Potential Challenges</h4>
                  <textarea name="Potential Challenges" placeholder="Potential Challenges" id="" cols="30" rows="10" v-model="potential"></textarea>
                </div>
                <div class="right">
                  <h4 class="">Solution</h4>
                  <textarea name="Goal" placeholder="Solution" id="" cols="30" rows="10" v-model="solution"></textarea>
                </div>
              </div>
              <div class="goal">
                <div class="lefts mt-1">
                  <h4>Target Date for Completion</h4>
                  <input type="date" v-model="date">
                </div>
                <div class="wright">
                  <h4>Progress Metrics(Outcome Based)</h4>
                  <textarea name="Progress" placeholder="Progress Metrics" id="" cols="30" rows="10" v-model="progress"></textarea>
                </div>

              </div>
              <div class="goal">
                <div class="lefts">
                  <h4>Status</h4>
                  <select v-model="status" class="form-selects" aria-label="Default select example">
                    <option class="opt" selected>Status</option>
                    <option class="opt" value="1">Completed</option>
                    <option class="opt" value="2">On-going</option>
                    <option class="opt" value="3">Not started</option>
                  </select>
                </div>
                <div class="wright">
                  <h4>Feedback</h4>
                  <textarea name="Progress" placeholder="Feedback" id="" cols="30" rows="10" v-model="feedback"></textarea>
                </div>

              </div>
              <div class="types">
                <input type="file">
                <button>Save Changes</button>
              </div>
            </div>
            <div class="modal-footer">

              <button type="submit" class="btn btn-success" data-bs-dismiss="modal" @click="$router.push('/')">Submit Request</button>
            </div>

          </div>
        </div>
      </div>
    </form>
    <div class="development mt-5">
      <div class="dev">
        <h3>Development Plan</h3>
        <button data-bs-toggle="modal" data-bs-target="#myModal" type="button">Development Plan Request</button>
      </div>
      <hr>
      <div class="goals">
        <div class="short">
          <h5>Short term goals (3 - 6 Months)</h5>
        </div>
        <div class="mid">
          <h5>Mid term goals (7 - 12 Months)</h5>
        </div>
        <div class="long">
          <h5>Long term goals (13 - 24 Months)</h5>
        </div>
      </div>
      <div class="chart">
        <DoughNut />

      </div>
      <div class="table">
        <CareerGoal />
      </div>

    </div>
  </main>
</template>

<style scoped>
.development {
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: 10px;
  background: #fff;
}
.dev h3 {
  color: var(--Black, #000);
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 28.8px;
  width: 900px;
}
.dev {
  display: flex;
  padding: 10px 30px;
  align-items: center;
  gap: 10px;
}
.dev button {
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  width: 252px;
  height: 40px;
  color: #fff;
}
hr {
  width: 100%;
  height: 1px;
  background: #808080;
}
.goals {
  display: flex;
  justify-content: flex-start !important;
  align-items: flex-start;
  gap: 30px;
  margin-left: 10px;
  margin-top: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 15px;
  border-radius: 50px;
  background: var(--Grey-Light, #eee);
  align-self: stretch;
}
.short {
  display: flex;
  padding: 5px 15px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  background: var(--Primary, #227cbf);
  color: var(--White, #fff);
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.chart {
  width: 100%;
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
  width: 900px;
  height: 1025px;
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
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 10px;
  background: #fff;
}
.type {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}
.type h3 {
  color: var(--Black, #000);
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.form-select {
  display: flex;
  width: 400px;
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
  font-family: Roboto;
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
</style>
