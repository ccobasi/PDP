<script>
import TabMenu from '../../components/Tabs/TabMenuTwo.vue';
import DoughNut from '../../components/DoughNut.vue'
import CareerGoal from '../../components/CareerGoal.vue'


export default {
    data: () => ({
        tab: null,
        
    }),
    components: {
        
        TabMenu: TabMenu,DoughNut,CareerGoal,
    }
    
}
</script>


<template>
  <main class="wrapper">
    <TabMenu />
    <div class="modal" id="myModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Development Plan Request</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="request">
            <button class="blue">My Request</button>
            <button class="team">Team Member</button>
            <button class="approval">Requests pending approval</button>
          </div>
          <div class="modal-body">
            <div class="type">
              <h3>Development plan type</h3>
              <select class="form-select" aria-label="Default select example">
                <option class="opt" selected>Career Goals and Aspirations</option>
                <option class="opt" value="1">Option 1</option>
                <option class="opt" value="2">Option 2</option>
                <option class="opt" value="3">Option 3</option>
                <option class="opt" value="4">Option 4</option>
                <option class="opt" value="5">Option 5</option>
                <option class="opt" value="6">Option 6</option>
              </select>
            </div>
            <div class="goal">
              <div class="left">
                <h4>Goal</h4>
                <textarea name="Goal" placeholder="Goal" id="" cols="30" rows="10"></textarea>
              </div>
              <div class="right">
                <h4 class="">What I will do to achieve this</h4>
                <textarea name="Goal" placeholder="What I will do to achieve this" id="" cols="30" rows="10"></textarea>
              </div>
            </div>
            <div class="goal">
              <div class="left">
                <h4>Resources and Support Needed</h4>
                <textarea name="Resources and Support Needed" placeholder="Resources and Support Needed" id="" cols="30" rows="10"></textarea>
              </div>
              <div class="right">
                <h4 class="">What does success look like?</h4>
                <textarea name="Goal" placeholder="What does success look like?" id="" cols="30" rows="10"></textarea>
              </div>
            </div>
            <div class="goal">
              <div class="left">
                <h4>Potential Challenges</h4>
                <textarea name="Potential Challenges" placeholder="Potential Challenges" id="" cols="30" rows="10"></textarea>
              </div>
              <div class="right">
                <h4 class="">Solution</h4>
                <textarea name="Goal" placeholder="Solution" id="" cols="30" rows="10"></textarea>
              </div>
            </div>
            <div class="type mt-3">
              <h3>Target Date for Completion</h3>
              <input type="date">
            </div>
          </div>
          <div class="modal-footer">

            <button type="button" class="btn">Submit Request</button>
          </div>
        </div>
      </div>
    </div>
    <div class="development mt-5">
      <div class="dev">
        <h3>Development Plan</h3>
        <button data-bs-toggle="modal" data-bs-target="#myModal" type="button">Development Plan Request</button>
      </div>
      <hr>
      <div class="goal">
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
.request {
  display: flex;
  height: 50px;
  padding: 10px 15px;
  align-items: flex-start;
  gap: 30px;
  align-self: stretch;
  border-radius: 50px;
  background: var(--White, #fff);
}
.blue {
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
  padding: 30px;
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
</style>
