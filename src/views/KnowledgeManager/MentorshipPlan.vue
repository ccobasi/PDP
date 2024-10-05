<script setup>
import TabMenu from '../../components/Tabs/TabMenuTwo.vue';
import TableSix from '../../components/Tables/TableSix.vue'
import {useMentorshipStore} from "@/store/mentorship"
import { ref, onMounted} from 'vue'

const store = useMentorshipStore();
console.log(store.mentorship);

const addMentorship = () => {
  if (financialYear.value.trim() !== '' || month.value.trim() !== '' || mentor.value.trim() !== ''
    || goals.value.trim() !== ''
    || actionPlan.value.trim() !== '' || timeLine.value.trim() !== '' || status.value.trim() !== '' ) {
    store.addMentorship(financialYear.value.trim(), month.value.trim(), mentor.value.trim(),
       goals.value.trim(), actionPlan.value.trim(), timeLine.value.trim(), status.value.trim());
  
  }
};


// eslint-disable-next-line no-unused-vars
const mentorship = ref([])
  const month = ref('')
  const financialYear = ref('')
  const mentor = ref('')
  const goals = ref('')
  const actionPlan  = ref('')
  const timeLine = ref('')
  const status = ref('')
  const selectedValue = ref('')

const handleSubmit = () => {
  addMentorship();
  console.log("Mentorship added")
};


onMounted(() => {
  
  store.fetchMentorship();
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
      <div class="modal" id="myModal1">
        <div class="modal-dialog">
          <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header">
              <h4 class="modal-title">Mentorship request form</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">

              <div class="first">
                <div class="frame">
                  <h6>Financial Year</h6>
                  <select v-model="financialYear" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
                    <option selected>Select Financial Year</option>
                    <option value="FY23">FY23</option>
                    <option value="FY24">FY24</option>
                    <option value="FY25">FY25</option>
                    <option value="FY26">FY26</option>
                  </select>
                </div>
                <div class="frame">
                  <h6>Month</h6>

                  <input v-model="month" id="bday-month" type="month" name="bday-month" min="2023-01" max="2026-12" />
                </div>
              </div>
              <div class="second">
                <div class="frame">
                  <h6>Mentors</h6>
                  <select v-model="mentor" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
                    <option selected>Select Mentor</option>
                    <option value="Isaac">Isaac</option>
                    <option value="Chido">Chido</option>
                    <option value="Lola">Lola</option>
                  </select>
                </div>
                <div class="frame">
                  <h6>Goals</h6>
                  <textarea v-model="goals" name="Goals" id="" cols="30" rows="10" placeholder="Goals"></textarea>
                </div>
              </div>

              <div class="third">
                <div class="frame">
                  <h6>Action Plan</h6>
                  <textarea v-model="actionPlan" name="Action Plan" id="" cols="30" rows="10" placeholder="Action Plan"></textarea>

                </div>
                <div class="frame">
                  <h6>Timeline</h6>
                  <input v-model="timeLine" type="date">
                </div>
              </div>
              <div class="fourth">
                <div class="frame">
                  <h6>Status</h6>
                  <select v-model="status" v-on:change="onSelectChange(e)" class="form-select" aria-label="Default select example">
                    <option selected>Select Status</option>
                    <option value="Not started">Not started</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

              </div>

            </div>

            <!-- Modal footer -->
            <div class="modal-footer">
              <button type="submit" data-bs-dismiss="modal">Submit Request</button>
            </div>

          </div>
        </div>
      </div>
    </form>
    <div class="skill mt-4">
      <div class="header">
        <div class="title mb-4">
          <h3>Mentorship Plan</h3>
          <button data-bs-toggle="modal" data-bs-target="#myModal1" type="button">Mentorship Request</button>

        </div>
        <div class="lines"></div>
      </div>

      <div class="table">
        <TableSix />
      </div>

    </div>
  </main>
</template>

<style scoped>
main {
  height: 1450px;
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
  height: 1300px;
}
.skill h3 {
  color: var(--Black, #000);
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 28.8px;
}
.header {
  display: flex;
  flex-direction: column;
  align-self: stretch;
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
.auto {
  margin: auto;
}

.modal {
  margin-left: 21%;
}
.modal-dialog {
  --bs-modal-width: 800px;
  width: 800px;
  height: 700px;
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
  font-family: Roboto;
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
.first,
.second,
.third,
.fourth,
.fifth {
  display: flex;
  gap: 30px;
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
.frame input {
  width: 320px;
  height: 40px;
}
.frame textarea {
  display: flex;
  width: 320px;
  height: 70px;
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
  height: 40px;
  width: 320px;
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
.rating {
  width: 320px;
}
.frame button {
  width: 145px;
  display: flex;
  padding: 5px 20px;
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
    margin-left: 5%;
  }
  .modal-dialog {
    width: 700px;
  }
  .frame input,
  .frame textarea,
  .frame .form-select {
    width: 290px;
  }
}
</style>
