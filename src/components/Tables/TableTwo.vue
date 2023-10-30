<script setup>
    import { useGoalsStore } from "@/store/goals";
    import { ref } from 'vue';

const items = ref([
  { 
    id: '1',
    skill: 'Public speaking', 
    currentState: 'Beginner',
    desiredState: 'Expert',
    status: 'On going',
    feedback: 'Satisfactory',
   },
   { 
    id: '2',
    skill: 'Public speaking', 
    currentState: 'Beginner',
    desiredState: 'Expert',
    status: 'On going',
    feedback: 'Satisfactory',
   },
   { 
    id: '3',
    skill: 'Public speaking', 
    currentState: 'Beginner',
    desiredState: 'Expert',
    status: 'On going',
    feedback: 'Satisfactory',
   },
   { 
    id: '4',
    skill: 'Public speaking', 
    currentState: 'Beginner',
    desiredState: 'Expert',
    status: 'On going',
    feedback: 'Satisfactory',
   },
   { 
    id: '5',
    skill: 'Public speaking', 
    currentState: 'Beginner',
    desiredState: 'Expert',
    status: 'On going',
    feedback: 'Satisfactory',
   },
   { 
    id: '6',
    skill: 'Public speaking', 
    currentState: 'Beginner',
    desiredState: 'Expert',
    status: 'On going',
    feedback: 'Satisfactory',
   },

]);


</script>
<template>
  <div class="table-responsive">

    <table class="table">
      <thead>
        <tr>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span class="noshrink">S/N</span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span class="noshrink"> Skills</span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span class="noshrink"> Current State</span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span class="noshrink"> Desired State</span>

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
              <span class="noshrink"> Feedbacks </span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>

        </tr>
      </thead>
      <tbody>
        <!-- <tr v-for="item in items" :key="item.id" @click="showDetails(item)" @dblclick="$router.push({name: 'Detail', params: {id: item.id}})"> -->
        <tr v-for="item in items" @dblclick="$router.push({name: 'Skill Assessment Details', params: {id: item.id}})">
          <td>{{item.id}}</td>
          <td>{{item.skill}}</td>
          <td>{{item.currentState}}</td>
          <td>{{item.desiredState}}</td>
          <td>{{item.status}}</td>
          <td>{{item.feedback}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  width: 800px;
}
thead tr th {
  font-size: 12px;
  font-weight: 600;
  line-height: 14.4px;
  padding: 15px;
}

tbody tr td {
  color: var(--grey-dark, #808080);
  /* Caption */
  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
  padding: 20px;
}

thead,
tr {
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.05);
}
</style>