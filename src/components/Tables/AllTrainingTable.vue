<script setup>
    import { useGoalsStore } from "@/store/goals";
    import { ref, computed } from 'vue';


const items = ref([
  { 
    id: '1',
    name: 'Monsurat Adeniyi', 
    department: 'Procurement',
    months: '12/08/2023',
    trainTopic: 'Digital Marketing',
    learningOutcome: 'Digital Marketer',
    trainingMethod: 'Online', 
    skillMatrixMapping: 'Proficiency ',
    status: 'Completed',
    dueDate: '12/08/2023',
    evidence: 'Attached',
    },
    { 
    id: '2',
    name: 'Chinua Azibuke', 
    department: 'HR',
    months: '12/08/2023',
    trainTopic: 'Content Writing',
    learningOutcome: 'Digital Marketer',
    trainingMethod: 'Online', 
    skillMatrixMapping: 'Proficiency ',
    status: 'Ongoing',
    dueDate: '12/08/2023',
    evidence: 'Attached',
    },
    { 
    id: '3',
    name: 'Lola Oyebola', 
    department: 'Finance',
    months: '12/08/2023',
    trainTopic: 'SEO',
    learningOutcome: 'SEO Expert',
    trainingMethod: 'Physical', 
    skillMatrixMapping: 'Proficiency ',
    status: 'Not Started',
    dueDate: '12/08/2023',
    evidence: 'Attached',
    },
    { 
    id: '4',
    name: 'Uzo Okorp', 
    department: 'IT',
    months: '12/08/2023',
    trainTopic: 'Web Design',
    learningOutcome: 'Web Designer',
    trainingMethod: 'Physical', 
    skillMatrixMapping: 'Proficiency ',
    status: 'On going',
    dueDate: '12/08/2023',
    evidence: 'Attached',
    },
    { 
    id: '5',
    name: 'Olanike Salau', 
    department: 'Legal',
    months: '12/08/2023',
    trainTopic: 'Blogging',
    learningOutcome: 'Blogger',
    trainingMethod: 'Physical', 
    skillMatrixMapping: 'Proficiency ',
    status: 'Completed',
    dueDate: '12/08/2023',
    evidence: 'Attached',
    },
]);

const selectedItem = ref(null);

const selectItem = (item) => {
  selectedItem.value = item;
  console.log(selectedItem)
};


   const store = useGoalsStore();
    const goals = store.goals;

    console.log(goals);

const filterValue = ref('');
const filterBy = ref('all');

const filteredItems = computed(() => {
  return items.value.filter(item => {
    if (filterBy.value === 'all') {
      return item.name.toLowerCase().includes(filterValue.value.toLowerCase());
    } else {
      return item[filterBy.value].toLowerCase().includes(filterValue.value.toLowerCase());
    }
  });
});


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

        <tr v-for="item in filteredItems" :key="item.id" @click="selectItem(item)" @dblclick="$router.push({name: 'Detail', params: {id: item.id}})">
          <td>{{item.name}}</td>
          <td>{{item.department}}</td>
          <td>{{item.months}}</td>
          <td>{{item.trainTopic}}</td>
          <td>{{item.learningOutcome}}</td>

          <td>{{item.status}}</td>
          <td>{{item.dueDate}}</td>

        </tr>

      </tbody>
    </table>

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
@media screen and (max-width: 768px) {
  thead tr th {
    font-size: 10px;
  }

  tbody tr td {
    font-size: 10px;
  }
}
</style>