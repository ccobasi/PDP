<script setup>
    import { useGoalsStore } from "@/store/goals";
    import { ref, computed } from 'vue';
    import AccordionCard from "../Cards/AccordionCard.vue"
    import { useRoute } from 'vue-router';

const items = ref([
  { 
    id: '1',
    goal: 'Learn to improve content writing skill', 
    date: '12/10/2023',
    status: 'On going',
    feedback: 'Satisfactory' },

]);

const selectedItem = ref(null);

const selectItem = (item) => {
  selectedItem.value = item;
  console.log(selectedItem)
};


   const store = useGoalsStore();
    const goals = store.goals;

    console.log(goals);

    const isUserRoute = computed(() => {
  const route = useRoute();
  return route.path !== '/';
});
</script>
<template>
  <div class="table-responsive d-flex flex-row">
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
              <span class="noshrink"> Goals</span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span class="noshrink"> Target Date for Completion</span>

              <span class="d-flex flex-column align-center">
                <v-icon icon="mdi-chevron-up" size="x-small" class="mb-n1"></v-icon>
                <v-icon icon="mdi-chevron-down" size="x-small"></v-icon>
              </span>

            </div>
          </th>
          <th scope="col">
            <div class="d-flex align-center gap-1">
              <span class="noshrink"> Status</span>

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

        <tr v-for="item in items" :key="item.id" @click="selectItem(item)" @dblclick="$router.push({name: 'Detail', params: {id: item.id}})">
          <td>{{item.id}}</td>
          <td>{{item.goal}}</td>
          <td>{{item.date}}</td>
          <td>{{item.status}}</td>
          <td>{{item.feedback}}</td>

        </tr>

      </tbody>
    </table>
    <div class="side-panel">

      <h3> Details </h3>
      <AccordionCard :item="selectedItem" />
      <div v-if="isUserRoute" class="delete"><button>Delete</button></div>
    </div>
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
.side-panel {
  display: flex;
  width: 390px;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
  align-self: stretch;
  background: var(--Grey-Light, #eee);
}
.side-panel h4 {
  color: var(--Black, #000);
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 28.8px;
}
.accordion-item {
  display: flex;
  width: 350px;
  height: 57px;
  padding: 15px 0px;
  justify-content: space-between;
  align-items: center;
}
.accordion-button {
  width: 330px;
}
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