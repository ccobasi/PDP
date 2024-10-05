<script setup>
  import TableTwo from '../components/Tables/TableTwo.vue'
  import KMTableTwo from '../components/Tables/KMTableTwo.vue'
  import MTableTwo from '../components/Tables/MTableTwo.vue'
  import HODTableTwo from '../components/Tables/HODTableTwo.vue'
  import ITTableTwo from '../components/Tables/ITTableTwo.vue'
  import { useRoute } from 'vue-router';
  

const route = useRoute();
const isUserRoute = route.path === '/skillassessment';
const isKMRoute = route.path === '/km/skillassessment';
const isMRoute = route.path === '/m/skillassessment';
const isHODRoute = route.path === '/hod/skillassessment';
const isITRoute = route.path === '/it/skillassessment';
  
</script>
<template>
  <div class="career mt-3">

    <div class="d-flex justify-content-between mt-4  ">
      <div class="custom-table table-responsive-sm">
        <TableTwo v-if="isUserRoute" />
        <KMTableTwo v-if="isKMRoute" />
        <MTableTwo v-if="isMRoute" />
        <HODTableTwo v-if="isHODRoute" />
        <ITTableTwo v-if="isITRoute" />
      </div>

    </div>

  </div>
</template>

<style scoped>
body {
  font-family: 'lato', sans-serif;
}
h2 {
  font-size: 26px;
  margin: 20px 0;
  text-align: center;
}
h2 small {
  font-size: 0.5em;
}
.responsive-table li {
  border-radius: 3px;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
}
.responsive-table .table-header {
  background-color: #47b65c;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: #fff;
}
.responsive-table .table-row {
  background-color: #fff;
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
}
.responsive-table .col-1 {
  flex-basis: 10%;
}
.responsive-table .col-2 {
  flex-basis: 40%;
}
.responsive-table .col-3 {
  flex-basis: 25%;
}
.responsive-table .col-4 {
  flex-basis: 25%;
}
@media only screen and (max-width: 768px) {
  .career {
    height: 1700px;
  }
  .custom-table {
    width: 100%;
    overflow-x: hidden;
  }
}
</style>