<script setup>
  import TableTwo from '../components/Tables/TableTwo.vue'
  import { ref, computed } from 'vue'
  import {useSkillsStore} from "@/store/skills"


const store = useSkillsStore();
const skills = store.skills;


  
  
  const skillsPerPage = 10; 
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(skills.length / skillsPerPage));

const paginatedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * skillsPerPage;
  const endIndex = startIndex + skillsPerPage;
  return skills.slice(startIndex, endIndex);
});
  
</script>
<template>
  <div class="career mt-3">

    <form action="">
      <div class="d-goal">
        <div class="container">

          <ul class="responsive-table">
            <li class="table-header">
              <div class="col col-1">S/N</div>
              <div class="col col-1">Skill</div>
              <div class="col col-2">Gaps</div>

            </li>
            <li class="table-row" v-for="(skill, index) in paginatedItems" :key="index">
              <div class="col col-1" data-label="Skill">{{ skill.id }}</div>
              <div class="col col-1" data-label="Skill">{{ skill.skill }}</div>
              <div class="col col-2" data-label="Gaps">{{ skill.gap }}</div>
            </li>

          </ul>
          <v-pagination v-model="currentPage" :length="totalPages"></v-pagination>
        </div>
      </div>
      <div class="d-flex justify-content-between mt-4  ">
        <div class="custom-table table-responsive-sm">
          <TableTwo />

        </div>

      </div>

    </form>
  </div>
</template>

<style scoped>
body {
  font-family: 'lato', sans-serif;
}
.container {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
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
@media all and (max-width: 767px) {
  .responsive-table .table-header {
    display: none;
  }
  .responsive-table li {
    display: block;
  }
  .responsive-table .col {
    flex-basis: 100%;
  }
  .responsive-table .col {
    display: flex;
    padding: 10px 0;
  }
  .responsive-table .col:before {
    color: #47b65c;
    padding-right: 10px;
    content: attr(data-label);
    flex-basis: 50%;
    text-align: right;
  }
}

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
</style>