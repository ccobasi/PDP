<script>
import TabMenu from '../../components/Tabs/TabMenuTwo.vue';
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
      <div class="header">
        <div class="title mb-4">
          <h3>Task Deliverables</h3>
          <button data-bs-toggle="modal" data-bs-target="#myModal1" type="button">Add Task/Deliverables</button>

        </div>

        <div class="lines"></div>
      </div>

      <TableFour />
    </div>
  </main>
</template>

<style scoped>
main {
  height: 950px;
}
.header {
  display: flex;
  flex-direction: column;
  align-self: stretch;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
}
.title button {
  display: flex;
  padding: 10px 30px;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  background: var(--Secondary, #47b65c);

  color: var(--White, #fff);
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.2px;
}
.lines {
  width: 100%;
  height: 1px;
  background: #808080;
}
</style>
