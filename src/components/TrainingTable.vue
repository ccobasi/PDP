<script setup>
  import TableThree from '../components/Tables/TableThree.vue'
  import KMTableThree from '../components/Tables/KMTableThree.vue'
  import MTableThree from '../components/Tables/MTableThree.vue'
  import HODTableThree from '../components/Tables/HODTableThree.vue'
  import ITTableThree from '../components/Tables/ITTableThree.vue'
  import { useRoute } from 'vue-router';
  

const route = useRoute();
const isUserRoute = route.path === '/trainingschedule';
const isKMRoute = route.path === '/km/trainingschedule';
const isMRoute = route.path === '/m/trainingschedule';  
const isHODRoute = route.path === '/hod/trainingschedule'; 
const isITRoute = route.path === '/it/trainingschedule';    
</script>
<template>
  <div class="career mt-3">

    <form action="">
      <div class="d-flex justify-content-between mt-4  ">
        <div class="custom-table table-responsive-sm">
          <TableThree v-if="isUserRoute" />
          <KMTableThree v-if="isKMRoute" />
          <MTableThree v-if="isMRoute" />
          <HODTableThree v-if="isHODRoute" />
          <ITTableThree v-if="isITRoute" />
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
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;

  color: var(--Grey-Dark, #808080);
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
}
.form-select {
  color: var(--Black, #000);
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14.4px;
  width: 265px;
  height: 35px;
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
  padding: 15px 20px;
  justify-content: space-between;
  align-items: center;
}
.accordion-button {
  width: 330px;
}
@media only screen and (max-width: 768px) {
  .career {
    height: 1300px;
  }
  .custom-table {
    width: 100%;
    overflow-x: hidden;
  }
}
</style>