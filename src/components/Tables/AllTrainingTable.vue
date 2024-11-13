<script setup>
    import {useTrainingsStore} from "@/store/trainings"
    import { ref, computed, watch, onMounted } from 'vue';

const props = defineProps({
  level: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  quarter: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  }
});

const store = useTrainingsStore();
const trainings = ref([]);
// const selectedItem = ref(null);

// const selectItem = (item) => {
//   selectedItem.value = item;
//   console.log(selectedItem)
// };

const fetchData = async () => {
  try {
    await store.fetchTrainings();

    trainings.value = store.trainings;

    console.log('Trainings:', trainings.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(async () => {

  try {
    await store.fetchTrainings();

    if (Array.isArray(store.trainings)) {
      trainings.value = store.trainings;
    } else {
      console.error('Error: store.trainings is not an array');
    }

    watch(
      () => store.trainings,
      (newTrainings) => {
        if (Array.isArray(newTrainings)) {
          trainings.value = newTrainings;
        } else {
          console.error('Error: store.trainings is not an array');
        }
      }
    );

    console.log('Trainings:', trainings.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  watch([() => props.level, () => props.department, () => props.quarter, () => props.year], fetchData);
});

const filterValue = ref('');
const filterBy = ref('all');

const filteredItems = computed(() => {
  return trainings.value.filter(item => {
    if (filterBy.value === 'all') {
      return item.recordOwner.userFullName.toLowerCase().includes(filterValue.value.toLowerCase());
    } else {
      return item[filterBy.value].toLowerCase().includes(filterValue.value.toLowerCase());
    }
  });
});

const currentPage = ref(1); 
const itemsPerPage = 15; 

const filteredTrainings = computed(() => {
  console.log('KMTableThree Trainings:', trainings.value);

  return trainings.value.filter(item => {
   
    const trainingStartDate = new Date(item.trainingStartDate);
    const itemYear = trainingStartDate.getFullYear();
    const itemMonth = trainingStartDate.getMonth(); 
    const itemQuarter = Math.floor(itemMonth / 3) + 1; 

    console.log(`Extracted Year: ${itemYear}, Month: ${itemMonth}, Quarter: ${itemQuarter}`);

    const matchesYear = !props.year || itemYear === parseInt(props.year);
    const matchesQuarter = !props.quarter || itemQuarter === parseInt(props.quarter.slice(-1)); 
    const matchesDepartment = !props.department || (item.department === props.department);
    const matchesLevel = !props.level || (item.recordOwner?.role?.option === props.level);

    console.log("Matching Criteria", {
      item,
      matchesYear,
      matchesQuarter,
      matchesDepartment,
      matchesLevel,
    });

    return matchesYear && matchesQuarter && matchesDepartment && matchesLevel;
  });
});

const paginatedTrainings = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredTrainings.value.slice(startIndex, endIndex);
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0]; 
}

const changePage = (page) => {
  currentPage.value = page;
};
</script>
<template>
  <div class="table-responsive d-flex flex-column">
    <div class="filter">
      <div class="left d-flex">
        <label for="filter">Filter by:</label>
        <select class="form-select" v-model="filterBy">
          <option class="opt" value="all">All</option>
          <option class="opt" value="department">Department</option>
          <option class="opt" value="months">Months</option>
        </select>
      </div>
      <div class="right">
        <div class="input-group rounded">
          <input type="search" class="form-control rounded" v-model="filterValue" placeholder="Search...">
          <span class="input-group-text border-0" id="search-addon">
            <i class="fa fa-search"></i>
          </span>
        </div>
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span class="noshrink">Name</span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span class="noshrink"> Department</span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span class="noshrink"> Months</span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span class="noshrink"> Training Topic</span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span class="noshrink"> Learning Outcome </span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span class="noshrink"> Approval Status</span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span class="noshrink"> Status </span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span class="noshrink"> Due Date </span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>

        </tr>
      </thead>
      <tbody>

        <tr v-for="(item, index) in paginatedTrainings" :key="index" @click="handleClick(item)" @dblclick="handleDoubleClick(item)">
          <td>{{item.recordOwner.userFullName}}</td>
          <td>{{item.department}}</td>
          <td>{{formatDate(item.trainingStartDate)}}</td>
          <td>{{item.trainingTopic}}</td>
          <td>{{item.learningOutcome}}</td>
          <td>{{item.isApproved}}</td>
          <td>{{item.status}}</td>
          <td>{{item.dueDate}}</td>

        </tr>

      </tbody>
    </table>
    <div class="pagination">
      <button @click="changePage(page)" v-for="page in Math.ceil(filteredItems.length / itemsPerPage)" :key="page" :class="{ active: page === currentPage }">
        {{ page }}
      </button>

    </div>
  </div>
</template>

<style scoped>
table {
  width: 1200px;
}
thead tr th {
  font-size: 12px;
  font-weight: 600;
  line-height: 14.4px;
  padding: 15px;
}

tbody tr td {
  color: var(--grey-dark, #808080);
  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
  padding: 20px;
}

thead,
tr {
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}
.filter {
  display: flex;
  padding: 15px 20px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-radius: 5px 5px 0px 0px;
  border: 1px solid var(--gray-200, #e4e4e7);
  background: var(--Color-3, #fff);
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}
.filter label {
  width: 150px;
  display: flex;
  padding: 7px 10px;
  align-items: center;
  gap: 10px;
  border-radius: 5px;

  background: var(--White, #fff);
}

.pagination {
  display: flex;
  gap: 5px;
  justify-content: center;
  margin-top: 10px;
}

.pagination button {
  padding: 5px 10px;
  border: 1px solid #ccc;
  background-color: #f4f4f4;
  cursor: pointer;
}

.pagination button.active {
  font-weight: bold;
  background-color: #007bff;
  color: white;
}

@media screen and (max-width: 768px) {
  .filter {
    display: none;
  }

  thead tr th {
    font-size: 10px;
  }

  tbody tr td {
    font-size: 10px;
  }
}
</style>