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

// const selectedSkill = ref('');
// const selectedCurrentState = ref('');
// const selectedDesiredState = ref('');
// const selectedStatus = ref('');
// const selectedFeedback = ref('');

// // eslint-disable-next-line no-unused-vars
// watch(() => props.item, (first, second) => {
//     let newTransct = props.item
//     selectedSkill.value = newTransct.skillDescription
//     selectedCurrentState.value = newTransct.currentStageId
//     selectedDesiredState.value = newTransct.desiredStageId
//     selectedStatus.value = newTransct.status
//     selectedFeedback.value = newTransct.feedback
// });

// const accordionItems = ref([
//   { title: 'Skill', content: selectedSkill.value },
//   { title: 'Current State', content: selectedCurrentState.value },
//   { title: 'Desired State', content: selectedDesiredState.value },
//   { title: 'Status', content: selectedStatus.value },
//   { title: 'Feedback', content: selectedFeedback.value },
// ]);


// const isOpen = index => {
//   return accordionItems.value[index].isOpen || false;
// };

// const toggleAccordion = index => {
//   accordionItems.value[index].isOpen = !isOpen(index);
// };
const accordionItems = ref([
  { title: 'Skill', content: '' },
  { title: 'Current State', content: '' },
  { title: 'Desired State', content: '' },
  { title: 'Status', content: '' },
  { title: 'Feedback', content: '' },
]);

// Watch for changes in the props.item and update accordion items accordingly
watch(() => props.item, (newItem) => {
  if (newItem) {
    accordionItems.value = [
      { title: 'Skill', content: newItem.skillDescription },
      { title: 'Current State', content: newItem.currentStageId },
      { title: 'Desired State', content: newItem.desiredStageId },
      { title: 'Status', content: newItem.status },
      { title: 'Feedback', content: newItem.feedback },
    ];
  }
}, { immediate: true });

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
  max-height: 400px; /* Adjust the height as needed */
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
