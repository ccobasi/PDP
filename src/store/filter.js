// store/filter.js
import { ref, computed } from 'vue';

const options = ref([
  { value: '1', text: 'Career Goals and Aspirations' },
  { value: '2', text: 'Areas of Interest' },
  { value: '3', text: 'Mentorship and Skills Building' },
]);

const selectedOption = ref('1');

const filterOptions = () => {
  return options.value.filter((option) => option.value === selectedOption.value);
};

const filteredOptions = computed(() => filterOptions());

export { options, selectedOption, filterOptions, filteredOptions };
