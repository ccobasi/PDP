<script setup>
  import TableOne from '../components/Tables/TableOne.vue'
  import { selectedOption, filterOptions, filteredOptions } from '@/store/filter';

  // import KMTableOne from '../components/Tables/KMTableOne.vue'
  // import { useRoute } from 'vue-router'
  // import { ref,computed } from 'vue'

//    const isUserRoute = computed(() => {
//   const route = useRoute();
//   return route.path !== '/';
// });
 
//  const options = ref([
//   { value: '1', text: 'Career Goals and Aspirations' },
//   { value: '2', text: 'Areas of Interest' },
//   { value: '3', text: 'Mentorship and Skills Building' },
// ]);

// const selectedOption = ref('1');

// const filterOptions = () => {
//   if (selectedOption.value === '1') {
//     console.log('option 1');
//     return options.value.filter((option) => option.value === '1');
//   } else if (selectedOption.value === '2') {
//     console.log('option 2');
//     return options.value.filter((option) => option.value === '2');
//   } else {
//     console.log('option 3');
//     return options.value.filter((option) => option.value === '3');
//   }
// };

// const filteredOptions = ref(options.value);


</script>
<template>
  <div class="career mt-3">

    <form action="">
      <div class="d-goal">
        Development Plan:
        <!-- <select class="form-select" aria-label="Default select example" v-model="selectedOption" @change="filterOptions">
          <option class="opt" v-for="option in filteredOptions" :key="option.value" :value="option.value">
            {{ option.text }}
          </option>
        </select> -->
        <select class="form-select" aria-label="Default select example" v-model="selectedOption" @change="filterOptions">
          <option class="opt" v-for="option in filteredOptions" :key="option.value" :value="option.value">
            {{ option.text }}
          </option>
        </select>

      </div>
      <div class="d-flex justify-content-between mt-4">
        <div class="custom-table table-responsive-sm">
          <TableOne />
          <!-- <KMTableOne v-if="isUserRoute" /> -->
        </div>

      </div>

    </form>
  </div>
</template>

<style scoped>
.intro h3 {
  font-size: 20px;
  font-weight: 600;
}

.intro p {
  font-size: 12px;
}

.custom-table {
  width: 100%;
}

.accordion-body {
  padding: 10px;
}

.submit-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 35px;
  padding: 10px;
  gap: 10px;
  border-radius: 50px;
  background: var(--gradient, linear-gradient(90deg, #227cbf 0%, #47b65c 100%));

  color: #fff;
  /* Body Text */
  font-size: 16px;
  font-weight: 400;
  line-height: 19.2px;
}
.career {
  width: 100%;
  padding-left: 20px;
}
.career h4 {
  color: var(--Secondary, #47b65c);
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
}
form {
  margin: auto;
}
.d-goal {
  display: flex;
  padding: 7px 20px;
  align-items: flex-start;
  gap: 20px;
}
.form-select {
  color: var(--Secondary, #000);
  text-align: left;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
  width: 265px;
  height: 35px;
}
.accordion-item {
  display: flex;
  width: 350px;
  height: 57px;
  padding: 15px 20px;
  justify-content: space-between;
  align-items: center;
}
.accordion-button {
  width: 330px;
}
</style>