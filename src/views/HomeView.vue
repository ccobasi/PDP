<script>
import TabMenu from '../components/TabMenu.vue';
import DoughNut from '../components/DoughNut.vue'
import CareerGoal from '../components/CareerGoal.vue'

export default {
    data: () => ({
        tab: null,
        
    }),
    components: {
        
        TabMenu: TabMenu,DoughNut,CareerGoal
    }
    
}
</script>


<template>
  <main class="wrapper">
    <TabMenu />
    <div class="development mt-5">
      <h3>Development Plan</h3>
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
        <CareerGoal />
      </div>

    </div>
  </main>
</template>

<style scoped>
main {
  height: 2300px;
}
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
.development h3 {
  color: var(--Black, #000);
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 28.8px;
}
hr {
  width: 100%;
  height: 1px;
  background: #808080;
}
.goal {
  display: flex;
  width: 100%;
  padding: 10px 15px;
  align-items: flex-start;
  gap: 30px;
  border-radius: 50px;
  background: var(--Grey-Light, #eee);
}
.short {
  display: flex;
  padding: 5px 15px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 20px;
  background: var(--Primary, #227cbf);
}
.short h5 {
  color: var(--White, #fff);
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.mid {
  display: flex;
  padding: 5px 15px;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.mid h5,
.long h5 {
  color: var(--Black, #000);
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.long {
  display: flex;
  padding: 5px 15px;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.chart {
  width: 100%;
}
</style>
