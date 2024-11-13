<script setup>
import TabMenu from '../../components/Tabs/TabMenuTwo.vue';
import DoughNut from '../../components/DoughNut.vue'
import CareerGoal from '../../components/CareerGoal.vue'
import { defineProps } from 'vue';
import TableOne from '../../components/Tables/TableOne.vue'
import { useTeamMemberStore } from '../../store/goals'
import { ref, computed, onMounted } from 'vue';
import { useRoute  } from 'vue-router';

const props = defineProps({
  selectedName: String,
  recordOwner: String,
});

const store =  useTeamMemberStore()
var teams = ref(store.teamMemberData)

console.log(teams.value);

const route = useRoute();

const teamMemberDetails = computed(() => {
  return store.getTeamMemberData(props.selectedName)?.[0] || {};
});



onMounted(() => {
  const overlay = document.getElementById("myModal5"); // Replace "overlay" with the actual ID or class
  if (overlay) overlay.style.display = "none"; // Hide or remove overlay
});
</script>


<template>
  <main class="wrapper">
    <TabMenu />

    <div class="development mt-5">
      <div class="dev">
        <div class="d-flex">
          <h3>Development Plan:<span> {{ selectedName }}</span></h3>
          <p>Level: {{ teamMemberDetails.level }}</p>
          <p>Record Owner: {{ teamMemberDetails.recordOwner }}</p>
        </div>

      </div>
      <hr>
      <div class="goal">
        <div class="short">
          <h5>Short term goals (3 - 6 Months)</h5>
        </div>
        <div class="mid">
          <h5>Mid term goals (7 - 12 Months)</h5>
        </div>
        <div class="long">
          <h5>Long term goals (13 - 24 Months)</h5>
        </div>
      </div>
      <div class="chart">
        <DoughNut />

      </div>
      <div class="table">
        <!-- <CareerGoal /> -->
        <TableOne />
      </div>

    </div>
  </main>
</template>

<style scoped>
.development {
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;

  border-radius: 10px;
  background: #fff;
}
.dev {
  display: flex;
  padding: 10px 30px;
  align-items: center;
  gap: 10px;
}
.dev button {
  border-radius: 5px;
  background: var(--Secondary, #47b65c);
  width: 252px;
  height: 40px;
  color: #fff;
}
.dev h3 {
  color: var(--Black, #000);
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 28.8px;
  width: 900px;
}
.d-flex {
  align-items: flex-start;
}
.d-flex span {
  color: var(--Secondary, #47b65c);
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
}
hr {
  width: 100%;
  height: 1px;
  background: #808080;
}
.chart {
  width: 100%;
}

.goal {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 30px;
  margin-left: 10px;
  margin-top: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 25px;
  border-radius: 50px;
  background: var(--Grey-Light, #eee);
  align-self: stretch;
}
.short {
  display: flex;
  padding: 5px 15px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  background: var(--Primary, #227cbf);
  color: var(--White, #fff);
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}
.right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}
.left h4,
.right h4 {
  color: var(--Black, #000);
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.goal textarea {
  display: flex;
  width: 320px;
  height: 70px;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border: 1px solid #808080;
  border-radius: 5px;
}
.type input {
  display: flex;
  width: 400px;
  height: 40px;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  border: 1px solid var(--Grey-Light, #eee);
  background: var(--White, #fff);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
}
</style>
