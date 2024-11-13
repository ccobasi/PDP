<script setup>
  import TableOne from './Tables/TableOne.vue'
  import KMTableOne from '../components/Tables/KMTableOne.vue'
  import MTableOne from '../components/Tables/MTableOne.vue'
  import HODTableOne from '../components/Tables/HODTableOne.vue'
  import ITTableOne from '../components/Tables/ITTableOne.vue'
  import { useRoute } from 'vue-router';
 
  

const route = useRoute();
const isUserRoute = route.path === '/';
const isKMRoute = route.path === '/km/';
const isManagerRoute = route.path === '/m/';
const isHodRoute = route.path === '/hod/';
const isITRoute = route.path === '/it/';
</script>
<template>
  <div class="career mt-3">

    <div class="d-flex justify-content-between mt-4">
      <div class="custom-table table-responsive-sm">
        <TableOne :year="selectedYear" :quarter="selectedQuarter" v-if="isUserRoute" />
        <KMTableOne v-if="isKMRoute" />
        <MTableOne v-if="isManagerRoute" />
        <HODTableOne v-if="isHodRoute" />
        <ITTableOne v-if="isITRoute" />

      </div>

    </div>
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
@media (max-width: 768px) {
  .career {
    height: 1400px;
  }
}
</style>