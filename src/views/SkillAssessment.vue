<script>
import TabMenu from '../components/TabMenu.vue';


export default {
    data: () => ({
        tab: null,
        
    }),
    components: {
        
        TabMenu: TabMenu,
    }
    
}
</script>


<template>
  <main class="wrapper">
    <TabMenu />
    <div class="skill mt-4">
      <h3>Skill Assessment</h3>
      <div class="lines"></div>
      <div class="chart">
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  height: 1150px;
}
.skill {
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  align-self: stretch;

  border-radius: 10px;
  background: #fff;
  height: 976px;
}
.skill h3 {
  color: var(--Black, #000);
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 28.8px;
}
.lines {
  width: 100%;
  height: 2px;
  background: #808080;
}
.chart {
  display: flex;
  padding: 30px;
  align-items: center;
  gap: 40px;
  align-self: stretch;
  border-radius: 7.622px;
  background: #fff;
  box-shadow: 1.52441px 1.52441px 15.24414px 0px rgba(0, 0, 0, 0.1);
}
</style>
