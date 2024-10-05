<template>
  <div class="wrap">
    <div class="accordion accordion-flush" id="accordionFlushExample">
      <div v-for="(item, index) in accordionItems" :key="index" class="accordion-item">
        <h2 class="accordion-header" :id="'flush-heading' + index">
          <button class="accordion-button" type="button" @click="toggleAccordion(index)" :aria-expanded="isOpen(index)" :aria-controls="'flush-collapse' + index">
            {{ item.title }}
          </button>
        </h2>
        <div :id="'flush-collapse' + index" class="accordion-collapse" :class="{ collapse: !isOpen(index), show: isOpen(index) }" :aria-labelledby="'flush-heading' + index" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">{{ item.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['item']);

const selectedGoal = ref('');
const selectedDate = ref('');
const selectedStatus = ref('');
const selectedFeedback = ref('');
const selectedAchievement = ref('');
const selectedResource = ref('');
const selectedSuccess = ref('');
const selectedPotential = ref('');
const selectedSolution = ref('');
const selectedProgress = ref('');
const selectedEvidence = ref('');

// eslint-disable-next-line no-unused-vars
watch(() => props.item, (first, second) => {
  let newTransct = props.item;
  selectedGoal.value = newTransct.goalSummary;
  selectedDate.value = newTransct.targetCompletionDate;
  selectedStatus.value = newTransct.status;
  selectedFeedback.value = newTransct.feedback;
  selectedAchievement.value = newTransct.achievementApproach;
  selectedResource.value = newTransct.requiredResources;
  selectedSuccess.value = newTransct.successCriteria;
  selectedPotential.value = newTransct.potentialChallenges;
  selectedSolution.value = newTransct.solutionToChallenges;
  selectedProgress.value = newTransct.progressMetrics;
  selectedEvidence.value = newTransct.evidenceURL;
});

const accordionItems = ref([
  { title: 'Goal', content: selectedGoal },
  { title: 'What I will do to achieve this', content: selectedAchievement },
  { title: 'Resources and Support Needed', content: selectedResource },
  { title: 'What does success look like?', content: selectedSuccess },
  { title: 'Target Date for Completion', content: selectedDate },
  { title: 'Potential Challenges', content: selectedPotential },
  { title: 'Solution', content: selectedSolution },
  { title: 'Progress Metrics (Outcome Based)', content: selectedPotential },
  { title: 'Status', content: selectedStatus },
  { title: 'Feedback', content: selectedFeedback },
  { title: 'Evidence', content: selectedEvidence },
]);

const isOpen = index => {
  return accordionItems.value[index].isOpen || false;
};

const toggleAccordion = index => {
  accordionItems.value[index].isOpen = !isOpen(index);
};
</script>

<style scoped>
.wrap {
  width: 100%;

  overflow-y: auto;
}
.accordion-body {
  background: #fff;
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
.accordion-button:not(.collapsed) {
  background-color: #fff;
}
.accordion-body button {
  display: flex;
  padding: 10px 50px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 5px;
  background-color: #fff;
  color: #fff;
  margin-top: 10px;
}
</style>
