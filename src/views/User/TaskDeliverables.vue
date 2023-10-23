<script>
import TabMenu from '../../components/TabMenu.vue';
import TableFour from '../../components/Tables/TableFour.vue'

export default {
    data: () => ({
        tab: null,
        
    }),
    components: {
        
        TabMenu: TabMenu,TableFour,
    }
    
}
</script>


<template>
  <main class="wrapper">
    <TabMenu />
    <div class="task mt-5">
      <TableFour />
    </div>
  </main>
</template>

<style scoped>
main {
  height: 800px;
}
</style>
