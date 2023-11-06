<script setup>
import { ref, watch } from 'vue';


const props = defineProps(['item'])

const selectedGoal = ref('')
const selectedDate = ref('')
const selectedStatus = ref('')
const selectedFeedback = ref('')


watch(() => props.item, (first, second) => {
    let newTransct = props.item
    selectedGoal.value = newTransct.goal
    selectedDate.value = newTransct.date
    selectedStatus.value = newTransct.status
    selectedFeedback.value = newTransct.feedback
});


</script>
<template>
  <div class="wrap">
    <div class="accordion" id="accordionPanelsStayOpenExample">
      <div class="accordion-item">

        <h2 class="accordion-header" id="panelsStayOpen-headingOne">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="false" aria-controls="panelsStayOpen-collapseOne">
            Goal
          </button>
        </h2>
        <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
          <div class="accordion-body">
            <textarea v-model="selectedGoal" name="goal" id="" placeholder="Type here" cols="30" rows="10"></textarea>
          </div>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
            What I will do to achieve this
          </button>
        </h2>
        <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
          <div class="accordion-body">
            <textarea v-model="selectedAchievement" name="goal" id="" placeholder="Type here" cols="30" rows="10"></textarea>
          </div>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingThree">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
            Resources and Support Needed
          </button>
        </h2>
        <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
          <div class="accordion-body">
            <textarea v-model="resourses" name="goal" id="" placeholder="Type here" cols="30" rows="10"></textarea>
          </div>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingFour">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour " aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
            What does success look like?
          </button>
        </h2>
        <div id="panelsStayOpen-collapseFour" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFour">
          <div class="accordion-body">
            <textarea v-model="success" name="goal" id="" placeholder="Type here" cols="30" rows="10"></textarea>
          </div>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingFive">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFive" aria-expanded="false" aria-controls="panelsStayOpen-collapseFive">
            Target Date for Completion
          </button>
        </h2>
        <div id="panelsStayOpen-collapseFive" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFive">
          <div class="accordion-body">
            <input type="date" v-model="date">
          </div>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingSix">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseSix" aria-expanded="false" aria-controls="panelsStayOpen-collapseSix">
            Potential Challenges
          </button>
        </h2>
        <div id="panelsStayOpen-collapseSix" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingSix">
          <div class="accordion-body">
            <textarea name="goal" id="" placeholder="Type here" cols="30" rows="10"></textarea>

          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingSeven">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseSeven" aria-expanded="false" aria-controls="panelsStayOpen-collapseSeven">
            Solution
          </button>
        </h2>
        <div id="panelsStayOpen-collapseSeven" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingSeven">
          <div class="accordion-body">
            <textarea name="goal" id="" placeholder="Type here" cols="30" rows="10"></textarea>

          </div>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingEight">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseEight" aria-expanded="false" aria-controls="panelsStayOpen-collapseEight">
            Progress Metrics (Outcome Based)
          </button>
        </h2>
        <div id="panelsStayOpen-collapseEight" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingEight">
          <div class="accordion-body">
            <textarea name="goal" id="" placeholder="Type here" cols="30" rows="10"></textarea>

          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingNine">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseNine" aria-expanded="false" aria-controls="panelsStayOpen-collapseNine">
            Status
          </button>
        </h2>
        <div id="panelsStayOpen-collapseNine" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingNine">
          <div class="accordion-body">
            <select v-model="selectedStatus" class="form-select" aria-label="Default select example">
              <option class="opt" selected>Status</option>
              <option class="opt" value="1">Completed</option>
              <option class="opt" value="2">On-going</option>
              <option class="opt" value="3">Not started</option>
            </select>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingEleven">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseEleven" aria-expanded="false" aria-controls="panelsStayOpen-collapseEleven">
            Feedback
          </button>
        </h2>
        <div id="panelsStayOpen-collapseEleven" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingEleven">
          <div class="accordion-body">
            <textarea v-model="selectedFeedback" name="goal" id="" placeholder="Type here" cols="30" rows="10"></textarea>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingTen">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTen" aria-expanded="false" aria-controls="panelsStayOpen-collapseTen">
            Evidence
          </button>
        </h2>
        <div id="panelsStayOpen-collapseTen" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTen">
          <div class="accordion-body">
            <input type="file">
            <button>Save Changes</button>
          </div>
        </div>
      </div>

    </div>
    <div v-if="isUserRoute" class="delete"><button>Delete</button></div>
  </div>
</template>
<style scoped>
.wrap {
  width: 100%;
}
.accordion-body textarea {
  width: 300px;
  height: 100px;
  border: 1px solid #eee;

  border-radius: 5px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--Grey-Light, #eee);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
}
.accordion-body textarea::placeholder {
  color: var(--Grey-Dark, #808080);
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}
.accordion-body input {
  width: 300px;
}
.accordion-body button {
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
.delete {
  display: flex;
  padding: 20px 0px;
  justify-content: flex-end;
  align-items: center;
  gap: 11px;
  align-self: stretch;
}
.delete button {
  display: flex;
  padding: 10px 30px;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  background: var(--Red, #f00);
  color: var(--White, #fff);
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
</style>