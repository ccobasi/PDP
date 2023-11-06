
<script setup>
import { ref, watch, computed } from 'vue';
 import { useRoute } from 'vue-router';

const props = defineProps(['item'])

const selectedSkill = ref('')
const selectedCurrentState = ref('')
const selectedDesiredState = ref('')
const selectedStatus = ref('')
const selectedFeedback = ref('')


watch(() => props.item, (first, second) => {
    let newTransct = props.item
    selectedSkill.value = newTransct.skill
    selectedCurrentState.value = newTransct.currentState
    selectedDesiredState.value = newTransct.desiredState
    selectedStatus.value = newTransct.status
    selectedFeedback.value = newTransct.feedback
});

  const isUserRoute = computed(() => {
  const route = useRoute();
  return route.path !== '/skillassessment';
});
</script>
<template>
  <div class="wrap">
    <div class="accordion" id="accordionPanelsStayOpenExample">
      <div class="accordion-item">

        <h2 class="accordion-header" id="panelsStayOpen-headingOne">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="false" aria-controls="panelsStayOpen-collapseOne">
            Skill
          </button>
        </h2>
        <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
          <div class="accordion-body">
            <textarea v-model="selectedSkill" name="skill" id="" placeholder="Type here" cols="30" rows="10"></textarea>
          </div>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
            Current State
          </button>
        </h2>
        <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
          <div class="accordion-body">
            <select class="form-select" aria-label="Default select example" v-model="selectedCurrentState">
              <option class="opt" selected>Beginner</option>
              <option class="opt" value="1">Beginner</option>
              <option class="opt" value="2">Intermediate</option>
              <option class="opt" value="3">Proficient</option>
              <option class="opt" value="4">Advanced</option>
              <option class="opt" value="5">Expert</option>
            </select>
          </div>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingThree">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
            Gap
          </button>
        </h2>
        <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
          <div class="accordion-body">
            <textarea name="goal" id="" placeholder="Type here" cols="30" rows="10"></textarea>
          </div>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingFour">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour " aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
            Desired State
          </button>
        </h2>
        <div id="panelsStayOpen-collapseFour" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFour">
          <div class="accordion-body">
            <select class="form-select" aria-label="Default select example" v-model="selectedDesiredState">
              <option class="opt" selected>Expert</option>
              <option class="opt" value="1">Beginner</option>
              <option class="opt" value="2">Intermediate</option>
              <option class="opt" value="3">Proficient</option>
              <option class="opt" value="4">Advanced</option>
              <option class="opt" value="5">Expert</option>
            </select>
          </div>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingFive">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFive" aria-expanded="false" aria-controls="panelsStayOpen-collapseFive">
            Initiatives
          </button>
        </h2>
        <div id="panelsStayOpen-collapseFive" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFive">
          <div class="accordion-body">
            <textarea name="goal" id="" placeholder="Type here" cols="30" rows="10"></textarea>

          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingSeven">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseSeven" aria-expanded="false" aria-controls="panelsStayOpen-collapseSeven">
            Status
          </button>
        </h2>
        <div id="panelsStayOpen-collapseSeven" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingSeven">
          <div class="accordion-body">
            <select class="form-select" aria-label="Default select example" v-model="selectedStatus">
              <option class="opt" selected>Status</option>
              <option class="opt" value="1">Not started</option>
              <option class="opt" value="2">On-going</option>
              <option class="opt" value="3">Completed</option>

            </select>

          </div>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingEight">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseEight" aria-expanded="false" aria-controls="panelsStayOpen-collapseEight">
            Feedback
          </button>
        </h2>
        <div id="panelsStayOpen-collapseEight" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingEight">
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
      <div v-if="isUserRoute" class="delete"><button>Delete</button></div>
    </div>
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