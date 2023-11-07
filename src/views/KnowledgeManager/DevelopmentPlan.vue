<script setup>
import TabMenu from '../../components/Tabs/TabMenuTwo.vue';
import DoughNut from '../../components/DoughNut.vue'
import CareerGoal from '../../components/CareerGoal.vue'
import Table from '../../components/Tables/TableFive.vue'


 import { ref, /*onMounted*/} from 'vue'
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
  const selectedValue = ref('')
 

const handleSubmit = () => {
  addGoal();
  console.log("Goal added")
};


// onMounted(() => {
  
//   store.fetchGoals();
// });

 

 const onSelectChange = () => {
  // eslint-disable-next-line no-self-assign
  selectedValue.value = selectedValue.value
}

const tab = ref(null);
    
</script>


<template>
  <main class="wrapper">
    <TabMenu />

    <div class="modal" id="myModal1" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Development Plan Request</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <v-card style="background:#eee">
            <v-tabs v-model="tab" bg-color="white" color="#227cbf" style="border-radius:50px">
              <v-tab value="one">My Request</v-tab>
              <v-tab value="two">Team Member</v-tab>
              <v-tab value="three">Requests pending approval</v-tab>
            </v-tabs>

            <v-card-text>
              <v-window v-model="tab">
                <v-window-item value="one">
                  <form method="post" action="" @submit.prevent="handleSubmit">
                    <div class="modal-body">

                      <div class="type">

                        <h3>Development plan type</h3>
                        <select class="form-select" aria-label="Default select example" v-on:change="onSelectChange(e)" v-model="plan">
                          <option class="opt" selected>Career Goals and Aspirations</option>
                          <option class="opt" value="Area of Interest">Area of Interest</option>
                          <option class="opt" value="Career Goals and Aspirations">Career Goals and Aspirations</option>
                          <option class="opt" value="Mentorship and Skill Build">Mentorship and Skill Build</option>
                        </select>

                      </div>
                      <div class="goal">
                        <div class="left">
                          <h4>Goal</h4>
                          <textarea v-model="goal" name="Goal" placeholder="Goal" id="" cols="30" rows="10"></textarea>
                        </div>
                        <div class="right">
                          <h4 class="">What I will do to achieve this</h4>
                          <textarea v-model="achieve" name="Achieve" placeholder="What I will do to achieve this" id="" cols="30" rows="10"></textarea>
                        </div>
                      </div>
                      <div class="goal">
                        <div class="left">
                          <h4>Resources and Support Needed</h4>
                          <textarea v-model="resource" name="Resources and Support Needed" placeholder="Resources and Support Needed" id="" cols="30" rows="10"></textarea>
                        </div>
                        <div class="right">
                          <h4 class="">What does success look like?</h4>
                          <textarea v-model="success" name="Goal" placeholder="What does success look like?" id="" cols="30" rows="10"></textarea>
                        </div>
                      </div>
                      <div class="goal">
                        <div class="left">
                          <h4>Potential Challenges</h4>
                          <textarea v-model="potential" name="Potential Challenges" placeholder="Potential Challenges" id="" cols="30" rows="10"></textarea>
                        </div>
                        <div class="right">
                          <h4 class="">Solution</h4>
                          <textarea v-model="solution" name="Goal" placeholder="Solution" id="" cols="30" rows="10"></textarea>
                        </div>
                      </div>
                      <div class="type mt-3">
                        <h3>Target Date for Completion</h3>
                        <input type="date" v-model="date">
                      </div>

                    </div>

                    <div class="modal-footer">

                      <button type="submit" class="btn">Submit Request</button>
                    </div>
                  </form>
                </v-window-item>

                <v-window-item value="two">
                  <form method="post" action="" @submit.prevent="handleSubmit">
                    <div class="modal-bodys">
                      <div class="type">
                        <div class="dynamic d-flex">
                          <div class="member">
                            <h3>Select Team Member</h3>
                            <select class="form-select" aria-label="Default select example" v-on:change="onSelectChange(e)" v-model="name">
                              <option class="opt" selected>Lola Oyebola</option>
                              <option class="opt" value="Lola Oyebola">Lola Oyebola</option>
                              <option class="opt" value="Mark Dean">Mark Dean</option>
                              <option class="opt" value="Uzo Okoro">Uzo Okoro</option>
                              <option class="opt" value="Daniel Muller">Daniel Muller</option>
                              <option class="opt" value="Jane Doe">Jane Doe</option>
                            </select>
                          </div>
                          <div class="plan">
                            <h3>Development plan type</h3>
                            <select class="form-select" aria-label="Default select example" v-on:change="onSelectChange(e)" v-model="plan">
                              <option class="opt" selected>Career Goals and Aspirations</option>
                              <option class="opt" value="Area of Interest">Area of Interest</option>
                              <option class="opt" value="Career Goals and Aspirations">Career Goals and Aspirations</option>
                              <option class="opt" value="Mentorship and Skill Build">Mentorship and Skill Build</option>
                            </select>
                          </div>
                        </div>

                      </div>
                      <div class="goal">
                        <div class="left">
                          <h4>Goal</h4>
                          <textarea v-model="goal" name="Goal" placeholder="Goal" id="" cols="30" rows="10"></textarea>
                        </div>
                        <div class="right">
                          <h4 class="">What I will do to achieve this</h4>
                          <textarea v-model="achieve" name="Goal" placeholder="What I will do to achieve this" id="" cols="30" rows="10"></textarea>
                        </div>
                      </div>
                      <div class="goal">
                        <div class="left">
                          <h4>Resources and Support Needed</h4>
                          <textarea v-model="resource" name="Resources and Support Needed" placeholder="Resources and Support Needed" id="" cols="30" rows="10"></textarea>
                        </div>
                        <div class="right">
                          <h4 class="">What does success look like?</h4>
                          <textarea v-model="success" name="Goal" placeholder="What does success look like?" id="" cols="30" rows="10"></textarea>
                        </div>
                      </div>
                      <div class="goal">
                        <div class="left">
                          <h4>Potential Challenges</h4>
                          <textarea v-model="potential" name="Potential Challenges" placeholder="Potential Challenges" id="" cols="30" rows="10"></textarea>
                        </div>
                        <div class="right">
                          <h4 class="">Solution</h4>
                          <textarea v-model="solution" name="Goal" placeholder="Solution" id="" cols="30" rows="10"></textarea>
                        </div>
                      </div>
                      <div class="type mt-3">
                        <h3>Target Date for Completion</h3>
                        <input type="date" v-model="date">
                      </div>
                    </div>

                    <div class="modal-footer">

                      <button type="submit" class="btn">Submit Request</button>
                    </div>
                  </form>
                </v-window-item>

                <v-window-item value="three">
                  <div class="pending">
                    <Table />
                  </div>
                </v-window-item>
              </v-window>
            </v-card-text>
          </v-card>
        </div>

      </div>
    </div>

    <div class="development mt-5">
      <div class="dev">
        <h3>Development Plan</h3>
        <button data-bs-toggle="modal" data-bs-target="#myModal1" type="button">Development Plan Request</button>
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
.dynamic {
  justify-content: space-between;
  gap: 35px;
}
.member,
.plan {
  width: 300px;
}
.dev button {
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  width: 252px;
  height: 40px;
  color: #fff;
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
hr {
  width: 100%;
  height: 1px;
  background: #808080;
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
.pending {
  display: flex;
  width: 650px;
  height: 705px;
  padding: 30px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 10px;
  background: #fff;
}
.team,
.approval {
  color: var(--Black, #000);
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.modal-body {
  gap: 20px;
  background: #fff;
  margin-top: 0px !important;
  border: 1px solid var(--Grey-Light, #fff);
  border-radius: 10px;
}
.modal-bodys {
  gap: 10px;
  background: #fff;
  margin-top: 0px !important;
  border: 1px solid var(--Grey-Light, #fff);
  border-radius: 10px;
}
.modal-dialog {
  width: 900px;
  height: 800px;
  margin-left: 20%;
  display: inline-flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 10px;
}
.modal-content {
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 10px;
  background: #eee;
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
  width: 300px;
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
.right h4 {
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
.modal-footer {
  display: flex;
  height: 60px;
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
</style>
